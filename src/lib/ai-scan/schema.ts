/**
 * Het state-schema van de AI-scan.
 *
 * Dit is de scorekaart die het model elke beurt terugkrijgt en opnieuw invult.
 * Zonder deze state drift een taalmodel weg van de Mom Test: het wordt aardig,
 * gaat valideren en vergeet welke bewijsvelden nog leeg zijn. Door de state
 * elke beurt mee terug te sturen leest het model letterlijk zijn eigen
 * checklist, en kunnen wij in code afdwingen wanneer er geconcludeerd mag
 * worden.
 */

/** Interviewfases. De volgorde is betekenisvol: hoger = verder in het gesprek. */
export const PHASES = [
  "context", // Wat voor bedrijf, hoe groot, wie doet wat
  "pijnpunten", // Kandidaat-pijnpunten ophalen (meervoud!)
  "uitdiepen", // Primair pijnpunt volledig uitvragen
  "contrast", // Secundair pijnpunt oppervlakkig toetsen
  "afronden", // Haalbaarheid + wie beslist
  "klaar", // Genoeg bewijs; conclusie mag getrokken worden
] as const;
export type Phase = (typeof PHASES)[number];

/**
 * De vijf Mom Test-bewijsvelden per pijnpunt.
 *
 * `attempted` (wat heb je al geprobeerd) is het scherpste signaal: iemand die
 * nooit iets geprobeerd heeft, heeft per definitie geen groot probleem. Daarom
 * is dat veld verplicht voordat een pijnpunt als bewezen telt.
 */
export const EVIDENCE_FIELDS = [
  "frequency", // Hoe vaak in de afgelopen maand?
  "cost", // Hoeveel uur / wie doet het / wat kost dat?
  "attempted", // Wat heb je al gedaan om dit op te lossen?  <-- verplicht
  "why_failed", // Waarom werkte dat niet?
  "who_suffers", // Wie merkt het als dit misgaat?
] as const;
export type EvidenceField = (typeof EVIDENCE_FIELDS)[number];

/** Verplicht bewijsveld: zonder dit telt een pijnpunt nooit als bewezen. */
export const REQUIRED_EVIDENCE_FIELD: EvidenceField = "attempted";

/** Aantal ingevulde bewijsvelden dat een pijnpunt "bewezen" maakt. */
export const EVIDENCE_THRESHOLD = 3;

/**
 * Eén bewijsveld. `unknown` is een volwaardige uitkomst: als de klant het na
 * één keer doorvragen nog steeds niet weet, noteren we dat eerlijk in plaats
 * van door te blijven vissen. Dat wordt in het rapport een haakje naar een
 * echt gesprek.
 */
export type Evidence = {
  /** Wat de klant zei, in zijn eigen woorden en feitelijk samengevat. */
  value: string;
  /** true = we hebben het gevraagd maar er kwam geen bruikbaar antwoord uit. */
  unknown: boolean;
};

export type PainPoint = {
  /** Stabiele id, zodat het model naar hetzelfde pijnpunt kan blijven verwijzen. */
  id: string;
  /** Korte omschrijving in de woorden van de klant, bv. "inkoopfacturen inboeken". */
  label: string;
  /** primary = diep uitvragen, secondary = alleen frequency + attempted, dropped = afgevallen. */
  role: "primary" | "secondary" | "dropped";
  /** Ingevulde bewijsvelden. Ontbrekende sleutels = nog niet gevraagd. */
  evidence: Partial<Record<EvidenceField, Evidence>>;
  /** Waarom dit pijnpunt is afgevallen (alleen bij role === "dropped"). */
  dropped_reason?: string;
};

/** De drie mogelijke uitkomsten. "geen_case" is een gewenste uitkomst, geen mislukking. */
export type Verdict = "sterke_case" | "te_vroeg" | "geen_case";

export type ScanState = {
  phase: Phase;
  /** Bedrijfscontext uit fase 1: sector, omvang, wie doet het werk. */
  company: {
    description: string;
    size: string;
    /** Alles wat verder relevant bleek maar niet in de twee velden hierboven past. */
    notes: string;
  };
  painPoints: PainPoint[];
  /**
   * Hoe vaak er op het huidige onderwerp is doorgevraagd zonder bruikbaar
   * antwoord. Bij 1 schakelt het model over op een concreet anker
   * (ja/nee of keuze uit drie), bij 2 noteert het `unknown` en gaat door.
   */
  followUpCount: number;
  /** Alleen ingevuld als phase === "klaar". */
  verdict?: Verdict;
  /** Interne notities van het model; komt niet bij de klant in beeld. */
  scratchpad: string;
};

export function emptyState(): ScanState {
  return {
    phase: "context",
    company: { description: "", size: "", notes: "" },
    painPoints: [],
    followUpCount: 0,
    scratchpad: "",
  };
}

/** Aantal ingevulde (niet-unknown) bewijsvelden van een pijnpunt. */
export function evidenceCount(pain: PainPoint): number {
  return EVIDENCE_FIELDS.filter((field) => {
    const item = pain.evidence[field];
    return Boolean(item) && !item!.unknown && item!.value.trim().length > 0;
  }).length;
}

/**
 * Een pijnpunt is bewezen bij minimaal EVIDENCE_THRESHOLD ingevulde velden,
 * waarvan "attempted" er altijd één moet zijn.
 *
 * "attempted" telt ook als het antwoord "niets geprobeerd" is — dat is
 * informatie, niet een leeg veld. Het model markeert dat als een gevulde
 * waarde en gebruikt het juist als reden om te pivotten.
 */
export function isProven(pain: PainPoint): boolean {
  const required = pain.evidence[REQUIRED_EVIDENCE_FIELD];
  const hasRequired = Boolean(required) && !required!.unknown && required!.value.trim().length > 0;
  return hasRequired && evidenceCount(pain) >= EVIDENCE_THRESHOLD;
}

export function primaryPain(state: ScanState): PainPoint | undefined {
  return state.painPoints.find((p) => p.role === "primary");
}

export function secondaryPain(state: ScanState): PainPoint | undefined {
  return state.painPoints.find((p) => p.role === "secondary");
}

/**
 * Mag het interview afgerond worden?
 *
 * Eén bewezen primair pijnpunt is de harde eis. Het secundaire pijnpunt dient
 * alleen als contrast in het rapport en hoeft niet bewezen te zijn.
 */
export function canConclude(state: ScanState): boolean {
  const primary = primaryPain(state);
  return Boolean(primary && isProven(primary));
}

/**
 * JSON Schema voor de tool-call waarmee het model de state bijwerkt.
 *
 * Bewust een tool-call en geen "geef JSON terug in je antwoord": dat laatste
 * breekt zodra het model een zin voor of na de JSON zet, en het mengt de
 * klantinput met onze datastructuur. Via een tool-call valideert de API-laag
 * het schema en kan een injectiepoging in de klantinput hooguit een rare vraag
 * opleveren, geen gekaapte state.
 */
/**
 * Schema voor het zichtbare antwoord (stap 2 van een beurt).
 *
 * Om dezelfde reden een tool-call als hierboven, maar dan omgekeerd: we willen
 * hier juist gewone tekst, en die kregen we met vrije tekstgeneratie niet
 * schoon. Het model schreef zijn administratie telkens in een ander formaat
 * mee in het antwoord — JSON, opsommingen, <>…</>, kale key: value-regels — en
 * omdat elke beurt de hele conversatie herhaalt, kopieerde het daarna zijn
 * eigen patroon. Filteren achteraf bleef dweilen. Binnen een tool-call bestaat
 * het probleem niet: er is precies één veld, en daar hoort de zin in.
 */
export const SAY_TOOL_SCHEMA = {
  type: "object" as const,
  properties: {
    text: {
      type: "string",
      description:
        "Wat je tegen de ondernemer zegt, als gewone lopende tekst. Eén korte spiegelende zin, daarna één vraag. Geen kopjes, opsommingen, JSON, veldnamen of uitleg over je eigen werkwijze.",
    },
  },
  required: ["text"],
} as const;

export const STATE_TOOL_SCHEMA = {
  type: "object" as const,
  properties: {
    phase: {
      type: "string",
      enum: [...PHASES],
      description:
        "De fase waarin het gesprek zich ná deze beurt bevindt. Zet op 'klaar' zodra het primaire pijnpunt bewezen is én de afrondfase is gedaan.",
    },
    company: {
      type: "object",
      properties: {
        description: {
          type: "string",
          description: "Wat het bedrijf doet, in feitelijke termen.",
        },
        size: {
          type: "string",
          description: "Omvang: aantal medewerkers, en wie het administratieve werk doet.",
        },
        notes: {
          type: "string",
          description: "Overige relevante context over het bedrijf.",
        },
      },
      required: ["description", "size", "notes"],
    },
    painPoints: {
      type: "array",
      description:
        "Alle genoemde kandidaat-pijnpunten. Precies één heeft role 'primary'. Maximaal één 'secondary'.",
      items: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "Korte stabiele id, bv. 'facturen'. Hergebruik dezelfde id tussen beurten.",
          },
          label: {
            type: "string",
            description: "Korte omschrijving in de woorden van de klant.",
          },
          role: {
            type: "string",
            enum: ["primary", "secondary", "dropped"],
            description:
              "primary = diep uitvragen. secondary = alleen frequency en attempted toetsen. dropped = afgevallen.",
          },
          evidence: {
            type: "object",
            description:
              "Bewijsvelden. Laat een veld weg als er nog niet naar gevraagd is. Vul alleen in wat de klant echt gezegd heeft — nooit invullen wat je zelf aanneemt.",
            properties: Object.fromEntries(
              EVIDENCE_FIELDS.map((field) => [
                field,
                {
                  type: "object",
                  properties: {
                    value: {
                      type: "string",
                      description: "Feitelijke samenvatting van wat de klant zei.",
                    },
                    unknown: {
                      type: "boolean",
                      description:
                        "true als er is doorgevraagd maar er geen bruikbaar antwoord kwam.",
                    },
                  },
                  required: ["value", "unknown"],
                },
              ])
            ),
          },
          dropped_reason: {
            type: "string",
            description: "Alleen bij role 'dropped': waarom dit pijnpunt afviel.",
          },
        },
        required: ["id", "label", "role", "evidence"],
      },
    },
    followUpCount: {
      type: "integer",
      description:
        "Hoe vaak je op het huidige onderwerp hebt doorgevraagd zonder bruikbaar antwoord. Zet terug op 0 zodra je naar een nieuw onderwerp gaat.",
    },
    verdict: {
      type: "string",
      enum: ["sterke_case", "te_vroeg", "geen_case"],
      description:
        "Alleen invullen als phase 'klaar' is. geen_case is een volwaardige, gewenste uitkomst.",
    },
    scratchpad: {
      type: "string",
      description:
        "Jouw eigen notities: wat je nog wilt weten, twijfels, signalen dat een antwoord fluff is. De klant ziet dit niet.",
    },
  },
  required: ["phase", "company", "painPoints", "followUpCount", "scratchpad"],
};
