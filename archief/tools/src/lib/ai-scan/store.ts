/**
 * Persistentie van AI-scan-interviews.
 *
 * LET OP: dit bestand gebruikt de service-role key, die RLS volledig omzeilt.
 * Het mag daarom ALLEEN geïmporteerd worden vanuit src/pages/api/ — nooit
 * vanuit een component of iets anders dat in de browser terechtkomt.
 *
 * De browser praat nooit rechtstreeks met Supabase. Dat is waarom de tabel RLS
 * aan heeft staan zonder enkele policy: anon en authenticated komen er niet bij.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { ScanState } from "./schema";

export type ConversationMessage = { role: "assistant" | "user"; content: string };

export type InterviewRow = {
  id: string;
  conversation: ConversationMessage[];
  state: ScanState;
  turn_count: number;
  status: "in_progress" | "completed" | "abandoned";
  email: string | null;
  report_diagnosis: string | null;
  report_plan: string | null;
};

const TABLE = "ai_scan_interviews";

let cached: SupabaseClient | null = null;

/**
 * Geeft de client, of null als de env-vars ontbreken.
 *
 * Bewust null in plaats van een throw: opslag is voor ons waardevol maar voor
 * de bezoeker bijzaak. Een interview moet gewoon door kunnen lopen als de
 * database even niet bereikbaar is.
 */
export function getStore(): SupabaseClient | null {
  if (cached) return cached;

  const url = import.meta.env.SUPABASE_URL;
  const key = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.warn("SUPABASE_URL of SUPABASE_SERVICE_ROLE_KEY ontbreekt — interviews worden niet opgeslagen.");
    return null;
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

export async function createInterview(meta: {
  referrer?: string | null;
  userAgent?: string | null;
}): Promise<string | null> {
  const store = getStore();
  if (!store) return null;

  const { data, error } = await store
    .from(TABLE)
    .insert({
      referrer: meta.referrer ?? null,
      user_agent: meta.userAgent?.slice(0, 500) ?? null,
    })
    .select("id")
    .single();

  if (error) {
    console.error("createInterview:", error.message);
    return null;
  }
  return data.id;
}

/** Werkt het interview bij na een beurt. Faalt stil — het gesprek gaat voor. */
export async function saveTurn(
  id: string,
  payload: {
    conversation: ConversationMessage[];
    state: ScanState;
    turnCount: number;
    status?: InterviewRow["status"];
  }
): Promise<void> {
  const store = getStore();
  if (!store) return;

  const { error } = await store
    .from(TABLE)
    .update({
      conversation: payload.conversation,
      state: payload.state,
      turn_count: payload.turnCount,
      ...(payload.status ? { status: payload.status } : {}),
    })
    .eq("id", id);

  if (error) console.error("saveTurn:", error.message);
}

export async function saveReport(
  id: string,
  payload: { diagnosis: string; plan: string }
): Promise<void> {
  const store = getStore();
  if (!store) return;

  const { error } = await store
    .from(TABLE)
    .update({
      report_diagnosis: payload.diagnosis,
      report_plan: payload.plan,
      status: "completed",
    })
    .eq("id", id);

  if (error) console.error("saveReport:", error.message);
}

export async function saveEmail(id: string, email: string): Promise<void> {
  const store = getStore();
  if (!store) return;

  const { error } = await store.from(TABLE).update({ email }).eq("id", id);
  if (error) console.error("saveEmail:", error.message);
}

/**
 * Haalt een interview op ter verificatie.
 *
 * Het rapport-endpoint vertrouwt niet op wat de browser meestuurt: die kan een
 * verzonnen gesprek posten om een gratis rapport te krijgen. We lezen de
 * conversatie daarom uit de database, niet uit de request body.
 */
export async function loadInterview(id: string): Promise<InterviewRow | null> {
  const store = getStore();
  if (!store) return null;

  const { data, error } = await store
    .from(TABLE)
    .select("id, conversation, state, turn_count, status, email, report_diagnosis, report_plan")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("loadInterview:", error.message);
    return null;
  }
  return (data as InterviewRow | null) ?? null;
}
