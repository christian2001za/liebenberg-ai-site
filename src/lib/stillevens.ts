/**
 * Stillevens als tussenbeeld per case (src/assets/huisstijl/stillevens/, zie de README daar).
 * Bestandsnaam: `<naam>-stilleven.jpg` (3:2), met dezelfde naam als de gravure van de case.
 * Een nieuw bestand komt er vanzelf bij; ontbreekt het, dan valt het tussenbeeld weg.
 */
import type { ImageMetadata } from "astro";

const files = import.meta.glob<{ default: ImageMetadata }>("../assets/huisstijl/stillevens/*-stilleven.jpg", { eager: true });

export function findStilleven(name: string | undefined): ImageMetadata | undefined {
  if (!name) return undefined;
  return files[`../assets/huisstijl/stillevens/${name}-stilleven.jpg`]?.default;
}
