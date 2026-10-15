/**
 * Embleem-gravures per case (src/assets/huisstijl/gravures/, zie de README daar).
 * Bestandsnaam: `<naam>-480.png` voor de kop van de case (160 px), `<naam>-192.png` voor de
 * case-lijst (64 px). De naam staat per case in de pagina (prop `gravure`).
 * Een nieuw bestand met die naam komt er vanzelf bij; ontbreekt het, dan valt de plek weg.
 */
import type { ImageMetadata } from "astro";

const files = import.meta.glob<{ default: ImageMetadata }>("../assets/huisstijl/gravures/*-{480,192}.png", { eager: true });

export type GravureSize = "kop" | "lijst";
export const GRAVURE_PX: Record<GravureSize, number> = { kop: 160, lijst: 64 };

export function findGravure(name: string | undefined, size: GravureSize): ImageMetadata | undefined {
  if (!name) return undefined;
  const w = size === "kop" ? 480 : 192;
  return files[`../assets/huisstijl/gravures/${name}-${w}.png`]?.default;
}
