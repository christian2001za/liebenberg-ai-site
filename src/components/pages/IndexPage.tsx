
import { Linkedin, ShieldCheck, Code2, Database, Terminal, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

import optiekglasLogo from "@/assets/liebenbergoptiekglaslogo.PNG?url";
import founderPortrait from "@/assets/LiebenbergAI_portrait_Christian.jpeg?url";
import { TechStack } from "@/components/TechStack";
import { MacbookMockup } from "@/components/MacbookMockup";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-foreground/10">

      {/* ═══════════════════════════════════════════════════
          HERO — Asymmetric editorial layout
          Left-heavy headline, offset body text
      ═══════════════════════════════════════════════════ */}
      <section className="px-6 pt-[10rem] pb-section-lg relative">
        <div className="mx-auto max-w-6xl relative z-10">
          {/* Quiet label — no pill, no pulse, just text */}
          <p className="hero-animate label-uppercase text-muted-foreground mb-10">
            Maatwerk Software &mdash; Gedreven door AI
          </p>

          {/* Asymmetric headline */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            <div className="md:col-span-10 lg:col-span-9">
              <h1 className="hero-animate text-[clamp(2.8rem,7vw,5.5rem)] font-heading font-normal leading-[1.05] tracking-[-0.02em] text-foreground">
                Minder Handwerk.
                <br />
                <span className="italic">Meer Resultaat.</span>
              </h1>
            </div>
          </div>

          {/* Body text — offset to the right for editorial asymmetry */}
          <div className="grid grid-cols-1 md:grid-cols-12 mt-12">
            <div className="md:col-start-5 md:col-span-7 lg:col-start-5 lg:col-span-6">
              <p className="hero-animate hero-delay-2 text-lg text-muted-foreground leading-[1.6] max-w-xl">
                Wij bouwen AI-systemen die uw team uren per week besparen, wiskundig onderbouwd en klaar voor productie.
              </p>

              <div className="hero-animate hero-delay-3 flex flex-col sm:flex-row items-start gap-4 mt-10">
                <Button
                  variant="default"
                  size="xl"
                  asChild
                  className="px-10 h-14 text-base font-medium"
                >
                  <a href="https://cal.com/christianliebenberg" target="_blank" rel="noopener noreferrer">
                    Plan kennismaking
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  asChild
                  className="px-10 h-14 text-base font-medium"
                >
                  <a href="#cases">
                    Bekijk Cases
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Value props — understated, typographic */}
          <div className="hero-animate hero-delay-3 mt-20 flex flex-wrap gap-x-12 gap-y-4 label-uppercase text-muted-foreground">
            <span>In-house Engineering</span>
            <span>GDPR / AVG Compliant</span>
            <span>Schaalbare Architectuur</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          TECH STACK — Tonal shift, no borders
      ═══════════════════════════════════════════════════ */}
      <div className="bg-surface-high">
        <TechStack />
      </div>

      {/* ═══════════════════════════════════════════════════
          EXPERTISE — Stone blocks on vellum
      ═══════════════════════════════════════════════════ */}
      <section id="diensten" className="px-6 py-section-lg">
        <div className="mx-auto max-w-6xl">
          {/* Asymmetric section header */}
          <div className="grid grid-cols-1 md:grid-cols-12 mb-20">
            <div className="md:col-span-5">
              <p className="label-uppercase text-muted-foreground mb-4">Onze expertise</p>
              <h2 className="font-heading text-3xl font-normal md:text-[2.75rem] leading-[1.1] text-foreground">
                <em className="italic">Specialisaties</em>
              </h2>
            </div>
            <div className="md:col-start-7 md:col-span-6 flex items-end mt-6 md:mt-0">
              <p className="text-muted-foreground text-lg leading-[1.6]">
                Wij leveren complete oplossingen. Onze achtergrond in econometrie garandeert dat we de fundamentele wiskunde en data achter AI begrijpen en dit kunnen toepassen op bedrijfskritische processen.
              </p>
            </div>
          </div>

          {/* Service grid — white "stone blocks" on cream */}
          <div className="grid gap-[2px] md:grid-cols-2">
            {[
              {
                icon: <Terminal className="h-5 w-5" />,
                title: "Intelligent Document Processing",
                desc: "Unstructured data omzetten naar structured output. Wij bouwen pipelines die documenten, facturen en rapporten uitlezen, verwerken en direct wegschrijven in uw ERP of CRM systemen."
              },
              {
                icon: <Code2 className="h-5 w-5" />,
                title: "Workflow Automation & Architectuur",
                desc: "End-to-end procesoptimalisatie. We analyseren uw huidige processen en bouwen maatwerk AI-software om repititief werk grotendeels te automatiseren. Met human-in-the-loop voor controle."
              },
              {
                icon: <Database className="h-5 w-5" />,
                title: "Semantic Search & RAG Systems",
                desc: "Retrieval-Augmented Generation (RAG) op uw eigen data en documenten. Veilig en afgeschermd. Maak uw interne kennisbank doorzoekbaar met AI die bronverwijzingen geeft en halluciniaties minimaliseert."
              },
              {
                icon: <ShieldCheck className="h-5 w-5" />,
                title: "Generative AI Integration",
                desc: "Het trainen van generatieve AI-modellen op uw bedrijfsspecifieke tone-of-voice en data. Voor geautomatiseerde klantcommunicatie of content generatie die bijna niet van menselijk te onderscheiden is."
              }
            ].map((service, i) => (
              <div key={i} className="bg-surface-low p-10 md:p-12 group transition-colors duration-500 hover:bg-background">
                <div className="mb-6 text-foreground">
                  {service.icon}
                </div>
                <h3 className="text-xl font-normal text-foreground mb-4 leading-snug">
                  {service.title}
                </h3>
                <p className="text-[0.95rem] text-muted-foreground leading-[1.6]">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          WERKWIJZE — Typographic numerals, no timeline
          Tonal background shift for section boundary
      ═══════════════════════════════════════════════════ */}
      <section id="werkwijze" className="px-6 py-section-lg bg-surface-high">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-12 mb-20">
            <div className="md:col-span-5">
              <p className="label-uppercase text-muted-foreground mb-4">Werkwijze</p>
              <h2 className="font-heading text-3xl font-normal md:text-[2.75rem] leading-[1.1] text-foreground">
                <em className="italic">Ons Proces</em>
              </h2>
            </div>
          </div>

          <div className="space-y-0">
            {[
              { step: "01", title: "Procesanalyse & Audit", desc: "We duiken diep in uw huidige situatie, processen en wensen. Waar zit de inefficiëntie? Wat is technisch haalbaar? We leveren een voorstel met duidelijk gedefinieerde scope en een budget." },
              { step: "02", title: "Proof of Concept (PoC)", desc: "Binnen 2-4 weken bouwen we een werkend prototype in een afgeschermde omgeving. We valideren de output-kwaliteit met statistische methoden. We kijken samen naar de resultaten en bespreken de volgende stappen." },
              { step: "03", title: "Production Deployment", desc: "Na validatie bouwen we in iteraties de productie-versie. Focus op security, rate-limiting, error-handling en integratie met bestaande systemen." },
              { step: "04", title: "Monitoring & Maintenance", desc: "Software leeft. Wij monitoren de performance van de modellen, updaten dependencies en zorgen dat het systeem stabiel blijft draaien en met uw organisatie meeschaalt." }
            ].map((item, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-12 py-10 md:py-14 group" style={i > 0 ? { borderTop: '1px solid hsl(0 0% 78% / 0.12)' } : undefined}>
                {/* Large typographic numeral */}
                <div className="md:col-span-2">
                  <span className="font-heading text-5xl md:text-6xl font-normal text-foreground/10 group-hover:text-foreground/20 transition-colors duration-500">
                    {item.step}
                  </span>
                </div>
                <div className="md:col-span-3 mt-4 md:mt-2">
                  <h3 className="text-xl font-normal text-foreground leading-snug">
                    {item.title}
                  </h3>
                </div>
                <div className="md:col-start-7 md:col-span-6 mt-4 md:mt-2">
                  <p className="text-[0.95rem] text-muted-foreground leading-[1.6]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CASE STUDIES — Tonal cards, no borders
      ═══════════════════════════════════════════════════ */}
      <section id="cases" className="px-6 py-section-lg">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-20">
            <p className="label-uppercase text-muted-foreground mb-4">Projecten</p>
            <h2 className="font-heading text-3xl font-normal md:text-[2.75rem] leading-[1.1] text-foreground">
              <em className="italic">Case Studies</em>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-[1.6]">
              AI-gedreven software die bedrijfswaarde levert in de praktijk.
            </p>
          </div>

          {/* Case 1 — Inbox AI */}
          <div className="bg-surface-low overflow-hidden">
            <div className="grid md:grid-cols-[1.2fr,2fr] gap-0">
              <div className="p-10 md:p-14 flex flex-col justify-between bg-surface-low">
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <img src={optiekglasLogo} alt="Logo" className="h-10 w-auto opacity-70 brightness-0" />
                  </div>
                  <h3 className="font-heading text-2xl font-normal mb-5 leading-snug">
                    Inbox AI Architecture
                  </h3>
                  <p className="text-muted-foreground mb-10 leading-[1.6]">
                    "We hebben het geprobeerd met chatGPT maar dat leverde mails van te lage kwaliteit." Voor een high-volume optometrie praktijk ontwikkelden we een AI-gedreven inbox-applicatie. Het systeem is getraind op de kennisbank en tone-of-voice van de praktijk. Door de traditionele software die om de AI heen is gebouwd is deze applicatie geoptimaliseerd voor zijn specifieke use-case. Email concepten kunnen makkelijk handmatig en met AI-edit worden bijgesteld tot het gewenste resultaat is bereikt.
                  </p>

                  <div className="space-y-4 mb-10">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="text-foreground">&mdash;</span>
                      <span>75% reductie in tijd</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="text-foreground">&mdash;</span>
                      <span>Flexibel aanpasbaar door klant</span>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-fit" asChild>
                  <a href="https://email-drafter-nine.vercel.app/home" target="_blank" rel="noopener noreferrer">
                    Hoe ziet het eruit?
                  </a>
                </Button>
              </div>

              <div className="relative p-8 md:p-14 flex items-center justify-center bg-surface-high">
                <div className="relative group w-full max-w-md">
                  <MacbookMockup className="transition-transform duration-500 group-hover:scale-[1.01]">
                    <div style={{ position: 'relative', paddingBottom: '64.86161251504213%', height: 0 }}>
                      <iframe
                        src="https://www.loom.com/embed/3b2657c3394a4b589e276967c56147a0"
                        frameBorder="0"
                        allowFullScreen
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      />
                    </div>
                  </MacbookMockup>
                </div>
              </div>
            </div>
          </div>

          {/* Case 2 — Debatwijzer */}
          <div className="bg-surface-low overflow-hidden mt-section">
            <div className="grid md:grid-cols-[1.2fr,2fr] gap-0">
              <div className="p-10 md:p-14 flex flex-col justify-between bg-surface-low order-last md:order-first">
                <div>
                  <h3 className="font-heading text-2xl font-normal mb-5 leading-snug">
                    AI Debatwijzer 2025
                  </h3>
                  <p className="text-muted-foreground mb-10 leading-[1.6]">
                    Een showcase van LLM en RAG technologie op grote schaal. We hebben een debat chatbot ontwikkeld die zijn informatie alleen haalt uit partijprogramma's, inclusief bronnen en citaten. Tijdens de verkiezingen in 2025 zijn er 300+ debatten gevoerd met onze software. Dit soort toepassingen werken uitstekend voor interne chatbots om met uw eigen data te praten.
                  </p>

                  <div className="space-y-4 mb-10">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="text-foreground">&mdash;</span>
                      <span>Real-time fact retrieval</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="text-foreground">&mdash;</span>
                      <span>AI integratie</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="text-foreground">&mdash;</span>
                      <span>Bronnen</span>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-fit" asChild>
                  <a href="https://debat.liebenberg.ai" target="_blank" rel="noopener noreferrer">
                    Probeer de applicatie
                  </a>
                </Button>
              </div>

              <div className="relative p-8 md:p-14 flex items-center justify-center bg-surface-high">
                <div className="relative group w-full max-w-md">
                  <MacbookMockup className="transition-transform duration-500 group-hover:scale-[1.01]">
                    <div style={{ position: 'relative', paddingBottom: '64.86161251504213%', height: 0 }}>
                      <iframe
                        src="https://www.loom.com/embed/ab1576ce21094b31acb0c8969efb1a0d"
                        frameBorder="0"
                        allowFullScreen
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      />
                    </div>
                  </MacbookMockup>
                </div>
              </div>
            </div>
          </div>

          {/* Case 3 — CV Generator */}
          <div className="bg-surface-low overflow-hidden mt-section">
            <div className="grid md:grid-cols-[1.2fr,2fr] gap-0">
              <div className="p-10 md:p-14 flex flex-col justify-between bg-surface-low">
                <div>
                  <h3 className="font-heading text-2xl font-normal mb-5 leading-snug">
                    Consultancy CV Generator
                  </h3>
                  <p className="text-muted-foreground mb-10 leading-[1.6]">
                    Vanuit mijn tijd in consultancy zag ik dat consultants en managers continu bezig zijn om
                    projectervaringen te herschrijven en in de juiste huisstijl te krijgen. Daarom heb ik een platform gebouwd waar iedere
                    consultant zijn ervaring ongestructureerd kan dumpen op een eigen account. Vul de projectomschrijving in en rolt er automatisch een CV uit in
                    je huisstijl. Vervolgens kun je die handmatig of met AI bijstellen, waarbij het model
                    alle context van je eerdere projecten begrijpt. Managers kunnen vanuit een overzicht
                    consultants en projectomschrijving selecteren en direct concept-CV's genereren die de
                    consultants alleen nog hoeven te controleren. Dit bespaart consultancy partijen veel tijd en geld.
                  </p>

                  <div className="space-y-4 mb-10">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="text-foreground">&mdash;</span>
                      <span>Automatische CV's in klant-huisstijl</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="text-foreground">&mdash;</span>
                      <span>Snelle selectie en reviewflow voor managers</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="text-foreground">&mdash;</span>
                      <span>Grote tijds- en kostenbesparing voor consultancy teams</span>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-fit" asChild>
                  <a href="https://www.loom.com/embed/634a958d7f0341ef8f26b9a7d7b09876" target="_blank" rel="noopener noreferrer">
                    Bekijk de demo
                  </a>
                </Button>
              </div>

              <div className="relative p-8 md:p-14 flex items-center justify-center bg-surface-high">
                <div className="relative group w-full max-w-md">
                  <MacbookMockup className="transition-transform duration-500 group-hover:scale-[1.01]">
                    <div style={{ position: 'relative', paddingBottom: '64.86161251504213%', height: 0 }}>
                      <iframe
                        src="https://www.loom.com/embed/634a958d7f0341ef8f26b9a7d7b09876"
                        frameBorder="0"
                        allowFullScreen
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      />
                    </div>
                  </MacbookMockup>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          ABOUT — Editorial portrait layout
      ═══════════════════════════════════════════════════ */}
      <section className="px-6 py-section-lg bg-surface-high">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
            {/* Portrait — sharp edges, no shadow */}
            <div className="md:col-span-4 lg:col-span-3">
              <div className="overflow-hidden">
                <img src={founderPortrait} alt="Christian Liebenberg" className="w-full h-auto object-cover" />
              </div>
              <div className="mt-6">
                <p className="label-uppercase text-muted-foreground">
                  Christian Liebenberg
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Founder & Lead Engineer
                </p>
                <p className="text-sm text-muted-foreground">
                  MSc Econometrics
                </p>
              </div>
            </div>

            {/* Bio — offset for asymmetry */}
            <div className="md:col-start-6 md:col-span-7">
              <p className="label-uppercase text-muted-foreground mb-4">Over ons</p>
              <h2 className="font-heading text-3xl font-normal md:text-[2.75rem] leading-[1.1] text-foreground mb-8">
                Waarom kiezen voor <em className="italic">ons?</em>
              </h2>

              <div className="space-y-5 text-muted-foreground leading-[1.6]">
                <p>
                  De AI-markt wordt overspoeld door 'agencies' die simpele prompts verkopen zonder fundamentele kennis. Wij doen dat anders. Liebenberg AI is gebaseerd op een achtergrond in <strong className="text-foreground font-medium">Econometrie</strong> en data-analyse.
                </p>
                <p>
                  Wij begrijpen de wiskunde en data achter de modellen. Dat betekent dat we weten wanneer een model betrouwbaar is, en wanneer niet. We bouwen traditionele software gecombineerd met AI die niet alleen 'werkt' in een demo, maar die <strong className="text-foreground font-medium">veilig, schaalbaar en statistisch onderbouwd</strong> is in een productie-omgeving.
                </p>
              </div>

              <div className="mt-12">
                <p className="label-uppercase text-muted-foreground mb-5">
                  Ervaring opgedaan bij
                </p>
                <div className="flex items-center gap-10 opacity-40 grayscale">
                  <img src="/ING.svg" alt="ING" className="h-12 w-auto md:h-14" />
                  <img src="/bunq.svg" alt="Bunq" className="h-20 w-auto md:h-24" />
                </div>
              </div>

              <div className="mt-8">
                <Button variant="ghost" size="sm" asChild className="gap-2 pl-0 text-muted-foreground hover:text-foreground">
                  <a href="https://linkedin.com/in/christian-liebenberg-a0511060" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                    Connect op LinkedIn
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FAQ — Clean accordion, spacing separation
      ═══════════════════════════════════════════════════ */}
      <section className="px-6 py-section-lg">
        <div className="mx-auto max-w-3xl">
          <div className="mb-16">
            <p className="label-uppercase text-muted-foreground mb-4">Vragen</p>
            <h2 className="font-heading text-3xl font-normal md:text-[2.75rem] leading-[1.1] text-foreground">
              Veelgestelde <em className="italic">vragen</em>
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-6">
            {[
              { q: "Wat is het verschil tussen jullie en een standaard AI-agency?", a: "Wij zijn developers en econometristen, geen marketeers. Wij bouwen custom software en integraties in eigen beheer. Wij hebben een unieke combinatie van wiskunde, data, AI, en business kennis. Allemaal in-house. Hierdoor leveren wij oplossingen van een ander kaliber." },
              { q: "Is mijn data veilig?", a: (
                <div className="space-y-4">
                  <p className="font-medium text-foreground">Veiligheid en Privacy staan voorop bij Liebenberg AI</p>
                  <p>Wij begrijpen dat uw bedrijfsdata gevoelig is. Daarom hebben wij ons platform gebouwd met 'Privacy by Design' als uitgangspunt.</p>
                  <ul className="space-y-3">
                    <li><strong className="text-foreground">100% Europese Hosting:</strong> Uw data verlaat de Europese Unie niet. Wij maken gebruik van beveiligde servers in Amsterdam en Frankfurt.</li>
                    <li><strong className="text-foreground">Uw data blijft van u:</strong> Wij gebruiken uw invoer nooit om onze AI-modellen te trainen. Wat u bespreekt, blijft strikt vertrouwelijk.</li>
                    <li><strong className="text-foreground">AVG/GDPR Compliant:</strong> Onze infrastructuur en processen voldoen aan de strenge Europese privacywetgeving.</li>
                  </ul>
                </div>
              ) },
              { q: "Werkt dit met mijn verouderde software (legacy)?", a: "Vaak wel. Wij zijn gespecialiseerd in het bouwen van API-koppelingen en 'middleware' die moderne AI laat praten met oudere systemen zoals boekhoudpakketten of ERP's." },
              { q: "Hoe ziet het kostenplaatje eruit?", a: (
                <div className="space-y-4">
                  <p>Bij ons zijn we heel transparant. Op basis van het project analyseren we wat er gedaan moet worden en maken we samen een duidelijk plan, fases en een offerte die uitkomstgericht is.</p>
                  <p>Wij geloven niet in <strong className="text-foreground">"uurtje, factuurtje."</strong> Wij vinden dat de doelen dan niet hetzelfde zijn. Daarom prijzen wij op uitkomst, op een project.</p>
                  <p>Zo weet de klant precies waar hij aan toe is, in plaats van dat je achteraf een factuur krijgt met een heleboel uren.</p>
                </div>
              ) }
            ].map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-surface-low px-8 py-1 data-[state=open]:bg-surface-high transition-colors duration-300">
                <AccordionTrigger className="text-base font-medium hover:no-underline py-5 text-left text-foreground">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-[1.6]">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CONTACT — Editorial CTA
      ═══════════════════════════════════════════════════ */}
      <section id="contact" className="px-6 py-section-lg bg-surface-high relative">
        <div className="mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-7 lg:col-span-6">
              <p className="label-uppercase text-muted-foreground mb-4">Contact</p>
              <h2 className="mb-8 font-heading text-3xl font-normal md:text-[2.75rem] leading-[1.1]">
                Klaar voor serieuze <em className="italic">procesoptimalisatie?</em>
              </h2>
              <p className="text-lg text-muted-foreground mb-12 leading-[1.6] max-w-lg">
                Plan een gesprek om te kijken of uw use-case technisch haalbaar is en wat de ROI zal zijn.
              </p>

              <Button
                variant="default"
                size="xl"
                asChild
                className="px-12 h-14 text-base font-medium"
              >
                <a href="https://cal.com/christianliebenberg" target="_blank" rel="noopener noreferrer">
                  Plan Kennismaking
                </a>
              </Button>

              <div className="flex flex-col sm:flex-row flex-wrap gap-8 sm:gap-12 mt-14">
                <a
                  href="mailto:info@liebenberg.ai"
                  className="flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors font-medium group"
                >
                  <Mail className="h-4 w-4" />
                  info@liebenberg.ai
                </a>
                <a
                  href="tel:+31637220535"
                  className="flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors font-medium group"
                >
                  <Phone className="h-4 w-4" />
                  +31 6 37220535
                </a>
                <a
                  href="https://wa.me/31637220535"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors font-medium group"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
