/**
 * Tests voor stripStateLeak — het filter dat gelekte administratie uit een
 * zichtbaar interviewantwoord haalt.
 *
 * Achtergrond: stap 2 van een beurt krijgt geen tools mee, maar het model
 * schreef zijn update_state-aanroep soms alsnog als platte tekst in het
 * antwoord. Omdat stap 2 de hele conversatie herhaalt, kopieerde het daarna
 * zijn eigen patroon en werd het elke beurt erger. Elk geval hieronder is
 * letterlijk zo uit een testinterview gekomen.
 *
 * Draaien: npx tsx src/lib/ai-scan/prompt.test.mjs
 */

import assert from "node:assert/strict";
import { stripStateLeak } from "./prompt.ts";

const cases = [
  // --- Uitgeschreven tool-calls, in de notaties die we in het wild zagen ---
  {
    name: "xml-achtige function_calls",
    input:
      '<function_calls>\n<invoke name="update_state">\n<parameter name="fase">context</parameter>\n</invoke>\n</function_calls>\n\nWie doet het werk?',
    expected: "Wie doet het werk?",
  },
  {
    name: "backtick met json-object",
    input:
      '`update_state`({\n  "bedrijf": "X",\n  "pijn": { "naam": "bon", "n": 2 }\n})\n\nWat heb je geprobeerd?',
    expected: "Wat heb je geprobeerd?",
  },
  {
    name: "kwargs zonder accolades",
    input:
      'update_state(\n  phase="pijnpunten",\n  primary={ name="bon" }\n)\n\nHoeveel uur kost dat?',
    expected: "Hoeveel uur kost dat?",
  },
  {
    name: "kale vermelding met backticks",
    input: "`update_state`\n\nJe hebt mails geprobeerd. Werkt dat?",
    expected: "Je hebt mails geprobeerd. Werkt dat?",
  },
  {
    name: "kale vermelding met 'call:'",
    input: "`update_state` call:\n\nDus je stuurt mails. Hoeveel reageren er?",
    expected: "Dus je stuurt mails. Hoeveel reageren er?",
  },

  // --- Los JSON-object, met of zonder verzonnen omhulsel ---
  {
    name: "json in <>…</>-wrapper",
    input:
      '<>\n{\n  "company": { "size": 12 },\n  "painpoints": [ { "name": "bon", "cost": "20 uur" } ]\n}\n</>\n\nTwintig uur per maand. Wat heb je geprobeerd?',
    expected: "Twintig uur per maand. Wat heb je geprobeerd?",
  },
  {
    name: "lege <>-wrapper laat niets achter",
    input: "<>  </>\n\nDus klanten reageren pas na drie keer. Wat heb je geprobeerd?",
    expected: "Dus klanten reageren pas na drie keer. Wat heb je geprobeerd?",
  },
  {
    name: "lege <>-wrapper over meerdere regels",
    input: "<>\n\n</>\n\nHet portaal is geschrapt. Welke andere klussen kostten veel tijd?",
    expected: "Het portaal is geschrapt. Welke andere klussen kostten veel tijd?",
  },
  {
    name: "kaal json-object zonder wrapper",
    input:
      '{\n  "fase": "pijnpunten",\n  "primary": "bonnetjes"\n}\n\nWie heeft daar het meeste last van?',
    expected: "Wie heeft daar het meeste last van?",
  },

  // --- Opsomming van interne veldnamen ---
  {
    name: "bullets met veldnamen",
    input:
      'met:\n- primary_painpoint: "Opvragen bonnetjes"\n- frequency: "20 uur per maand"\n- why_failed: "Portaal niet gebruikt"\n- who_suffers: "Twee medewerkers"\n\nWat ging daar mis?',
    expected: "Wat ging daar mis?",
  },
  {
    name: "veldnamen zonder streepjes",
    input:
      'phase: afronden\nverdict: sterke_case\n\nWat zou er moeten veranderen om dit op te lossen?',
    expected: "Wat zou er moeten veranderen om dit op te lossen?",
  },

  // --- Markdown-restanten ---
  {
    name: "markdown-kop met code-blok",
    input: "# State update\n\n```\nfase: context\n```\n\n---\n\nWie doet de administratie?",
    expected: "Wie doet de administratie?",
  },
  {
    name: "weesbackticks",
    input: "```\n\nJe hebt 20 uur per maand. Wie beslist daarover?",
    expected: "Je hebt 20 uur per maand. Wie beslist daarover?",
  },

  // --- Aankondigingen in gewone taal ---
  {
    name: "losse 'aanroepen:'",
    input: "aanroepen:\n\nDus je bent accountant. Wat kostte veel tijd?",
    expected: "Dus je bent accountant. Wat kostte veel tijd?",
  },
  {
    name: "'Je aanroepen...'",
    input: "Je aanroepen...\n\nDus twintig uur per maand. Wat heb je geprobeerd?",
    expected: "Dus twintig uur per maand. Wat heb je geprobeerd?",
  },
  {
    name: "'Ik update even wat ik weet.'",
    input: "Ik update even wat ik tot nu toe weet.\n\nWie doet het opvolgen?",
    expected: "Wie doet het opvolgen?",
  },
  {
    name: "'Ik zal de state bijwerken en dan doorgaan.'",
    input: "Ik zal de state bijwerken en dan doorgaan.\n\nWelke klussen kostten tijd?",
    expected: "Welke klussen kostten tijd?",
  },

  // --- Mag NIET sneuvelen: echte interviewtekst ---
  {
    name: "schoon antwoord blijft heel",
    input: "Dus twaalf mensen. Wie doet het meeste administratieve werk?",
    expected: "Dus twaalf mensen. Wie doet het meeste administratieve werk?",
  },
  {
    name: "'updaten' als echt werkwoord van de klant",
    input: "Dus jullie moeten die klantgegevens elke maand handmatig updaten. Wie doet dat?",
    expected: "Dus jullie moeten die klantgegevens elke maand handmatig updaten. Wie doet dat?",
  },
  {
    name: "'systeem updaten' midden in een zin",
    input: "Je zei dat jullie het systeem willen updaten. Hoeveel tijd kost dat nu?",
    expected: "Je zei dat jullie het systeem willen updaten. Hoeveel tijd kost dat nu?",
  },
  {
    name: "het woord 'tool' in gewone betekenis",
    input: "We gebruiken geen enkele tool daarvoor. Wat kost dat je?",
    expected: "We gebruiken geen enkele tool daarvoor. Wat kost dat je?",
  },
  {
    name: "accolade in gewone tekst blijft staan",
    input: "Je noemde {Exact} als pakket. Hoeveel tijd kost dat per maand?",
    expected: "Je noemde {Exact} als pakket. Hoeveel tijd kost dat per maand?",
  },
  {
    name: "'status' als gewoon woord in een vraag",
    input: "Wat is de status van dat portaal nu? Gebruiken klanten het nog?",
    expected: "Wat is de status van dat portaal nu? Gebruiken klanten het nog?",
  },
  {
    name: "'fase' als gewoon woord in een vraag",
    input: "In welke fase zit dat project nu? Hoeveel tijd kost het je?",
    expected: "In welke fase zit dat project nu? Hoeveel tijd kost het je?",
  },
  {
    name: "zin die met 'Met' begint blijft staan",
    input: "Met twaalf mensen is dat veel werk. Wie coördineert dat?",
    expected: "Met twaalf mensen is dat veel werk. Wie coördineert dat?",
  },
];

let failed = 0;
for (const { name, input, expected } of cases) {
  try {
    assert.equal(stripStateLeak(input), expected);
    console.log(`  ok   ${name}`);
  } catch (err) {
    failed += 1;
    console.log(`  FAIL ${name}`);
    console.log(`       verwacht: ${JSON.stringify(expected)}`);
    console.log(`       kreeg:    ${JSON.stringify(err.actual)}`);
  }
}

console.log(`\n${cases.length - failed}/${cases.length} geslaagd`);
process.exit(failed === 0 ? 0 : 1);
