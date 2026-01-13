
import { Linkedin, ShieldCheck, Code2, Database, Terminal } from "lucide-react"; // Extra iconen voor tech-vibe
import { Button } from "@/components/ui/button";



import optiekglasLogo from "@/assets/liebenbergoptiekglaslogo.PNG";
import founderPortrait from "@/assets/LiebenbergAI_portrait_Christian.jpeg";
import logo from "@/assets/logo.svg";
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
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20">
      <header className="px-6 py-6 border-b border-white/5 backdrop-blur-sm fixed top-0 w-full z-40 bg-background/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <img
            src={logo}
            alt="Liebenberg AI"
            className="h-6 w-auto brightness-0 invert"
          />
          <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
             <a href="#diensten" className="hover:text-foreground transition-colors">Expertise</a>
             <a href="#werkwijze" className="hover:text-foreground transition-colors">Werkwijze</a>
             <a href="#cases" className="hover:text-foreground transition-colors">Cases</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-32 md:py-40 lg:py-48 relative overflow-hidden">
        {/* Abstract background element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-6 hero-animate">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            Software Development for AI-driven Solutions
          </div>
          
          <h1 className="hero-animate mb-6 text-5xl font-medium tracking-tight text-foreground md:text-6xl lg:text-7xl font-heading leading-[1.1]">
            Maatwerk Software.<br />
            <span className="text-muted-foreground/80">Gedreven door AI.</span>
          </h1>
          
          <p className="hero-animate hero-delay-2 mb-10 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto leading-relaxed">
            Wij bouwen robuuste AI-systemen met econometrische precisie. We verzorgen het gehele traject en bouwen traditionele software gecombineerd met AI die integreert met jouw bedrijfskritische processen.
          </p>
          
          <div className="hero-animate hero-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="default" 
              size="xl"
              asChild
              className="px-8 h-12 text-base font-medium"
            >
              <a href="https://cal.com/christianliebenberg" target="_blank" rel="noopener noreferrer">
                Plan kennismaking
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              asChild
              className="px-8 h-12 text-base font-medium bg-transparent border-white/10 hover:bg-white/5"
            >
              <a href="#cases">
                Bekijk Cases
              </a>
            </Button>
          </div>

          {/* Value Props Row - More technical */}
          <div className="hero-animate hero-delay-3 mt-16 flex justify-center text-sm text-muted-foreground">
            <div className="flex flex-wrap justify-center gap-y-4 gap-x-8 md:gap-x-12">
              <div className="flex items-center gap-2.5">
                <Code2 className="h-4 w-4 text-primary" />
                <span className="font-medium">In-house Engineering</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span className="font-medium">Security & Compliance</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Database className="h-4 w-4 text-primary" />
                <span className="font-medium">Schaalbare Architectuur</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <div className="border-y border-white/5 bg-white/[0.02]">
        <TechStack />
      </div>

      {/* Custom Solutions Section */}
      <section id="diensten" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 md:text-center max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-medium md:text-4xl text-foreground mb-4">
              Onze Expertise
            </h2>
            <p className="text-muted-foreground text-lg">
              Wij leveren complete oplossingen. Onze achtergrond in econometrie garandeert dat we de fundamentele wiskunde en data achter AI begrijpen en dit kunnen toepassen op bedrijfskritische processen. 
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                icon: <Terminal className="h-6 w-6 text-primary" />,
                title: "Intelligent Document Processing",
                desc: "Unstructured data omzetten naar structured output. Wij bouwen pipelines die documenten, facturen en rapporten uitlezen, verwerken en direct wegschrijven in uw ERP of CRM systemen."
              },
              {
                icon: <Code2 className="h-6 w-6 text-primary" />,
                title: "Workflow Automation & Architectuur",
                desc: "End-to-end procesoptimalisatie. We analyseren uw huidige processen en bouwen maatwerk AI-software om repititief werk grotendeels te automatiseren. Met human-in-the-loop voor controle."
              },
              {
                icon: <Database className="h-6 w-6 text-primary" />,
                title: "Semantic Search & RAG Systems",
                desc: "Retrieval-Augmented Generation (RAG) op uw eigen data en documenten. Veilig en afgeschermd. Maak uw interne kennisbank doorzoekbaar met AI die bronverwijzingen geeft en halluciniaties minimaliseert."
              },
              {
                icon: <ShieldCheck className="h-6 w-6 text-primary" />,
                title: "Generative AI Integration",
                desc: "Het trainen van generatieve AI-modellen op uw bedrijfsspecifieke tone-of-voice en data. Voor geautomatiseerde klantcommunicatie of content generatie die bijna niet van menselijk te onderscheiden is."
              }
            ].map((service, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-secondary/5 p-8 transition-all hover:bg-secondary/10 hover:border-primary/20">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                  {service.icon}
                </div>
                <h3 className="text-xl font-medium text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section - More "Development Lifecycle" oriented */}
      <section id="werkwijze" className="px-6 py-24 bg-secondary/5 border-y border-white/5">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 md:text-center">
            <h2 className="font-heading text-3xl font-medium md:text-4xl mb-4">
              Werkwijze
            </h2>
            <p className="text-muted-foreground">
              Geen verassingen of verwarring, maar een transparant engineering proces.
            </p>
          </div>
          
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            {[
              { step: "01", title: "Processanalyse & Audit", desc: "We duiken diep in uw huidige situatie, processen en wensen. Waar zit de inefficiëntie? Wat is technisch haalbaar? We leveren een voorstel met duidelijk gedefinieerde scope en een budget." },
              { step: "02", title: "Proof of Concept (PoC)", desc: "Binnen 2-4 weken bouwen we een werkend prototype in een afgeschermde omgeving. We valideren de output-kwaliteit met statistische methoden. We kijken samen naar de resultaten en bespreken de volgende stappen." },
              { step: "03", title: "Production Deployment", desc: "Na validatie bouwen we in iteraties de productie-versie. Focus op security, rate-limiting, error-handling en integratie met bestaande systemen." },
              { step: "04", title: "Monitoring & Maintenance", desc: "Software leeft. Wij monitoren de performance van de modellen, updaten dependencies en zorgen dat het systeem stabiel blijft draaien en met uw organisatie meeschaalt." }
            ].map((item, i) => (
              <div key={i} className="relative flex items-start gap-6 md:gap-10 group">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background border border-white/10 shadow-sm z-10 group-hover:border-primary/50 transition-colors">
                  <span className="text-xs font-mono text-muted-foreground group-hover:text-primary">{item.step}</span>
                </div>
                <div className="rounded-xl border border-white/5 bg-background/50 p-6 shadow-sm flex-1 transition-all group-hover:bg-background/80 group-hover:border-white/10">
                  <h3 className="text-lg font-medium text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="cases" className="px-6 py-24 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-16">
            <h2 className="font-heading text-3xl font-medium md:text-4xl text-foreground">
              Case Studies
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              AI-gedreven software die bedrijfswaarde levert in de praktijk.
            </p>
          </div>

          <div className="border border-white/10 rounded-3xl bg-secondary/5 overflow-hidden">
            <div className="grid md:grid-cols-[1.2fr,2fr] gap-0">
              <div className="p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 bg-secondary/5">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                     <img src={optiekglasLogo} alt="Logo" className="h-10 w-auto opacity-80" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">
                    Inbox AI Architecture
                  </h3>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    "We hebben het geprobeerd met chatGPT maar dat leverde mails van te lage kwaliteit." Voor een high-volume optometrie praktijk ontwikkelden we een AI-gedreven inbox-applicatie. Het systeem is getraind op de kennisbank en tone-of-voice van de praktijk. Door de traditionele software die om de AI heen is gebouwd is deze applicatie geoptimaliseerd voor zijn specifieke use-case. Email concepten kunnen makkelijk handmatig en met AI-edit worden bijgesteld tot het gewenste resultaat is bereikt.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                     <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        <span>75% reductie in tijd</span>
                     </div>
                     <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
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

              <div className="relative p-8 md:p-12 flex items-center justify-center">
                 <div className="relative group w-full max-w-md">
                    <MacbookMockup className="transition-transform duration-300 group-hover:scale-[1.01]">
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

          <div className="border border-white/10 rounded-3xl bg-secondary/5 overflow-hidden mt-12">
            <div className="grid md:grid-cols-[1.2fr,2fr] gap-0">
               <div className="p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 bg-secondary/5 order-last md:order-first">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">
                    AI Debatwijzer 2025
                  </h3>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                     Een showcase van LLM en RAG technologie op grote schaal. We hebben een debat chatbot ontwikkeld die zijn informatie alleen haalt uit partijprogramma's, inclusief bronnen en citaten. Tijdens de verkiezingen in 2025 zijn er 300+ debatten gevoerd met onze software. Dit soort toepassingen werken uitstekend voor interne chatbots om met uw eigen data te praten. 
                  </p>
                  
                  <div className="space-y-4 mb-8">
                     <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        <span>Real-time fact retrieval</span>
                     </div>
                     <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        <span>AI integratie</span>
                     </div>
                     <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
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

              <div className="relative p-8 md:p-12 flex items-center justify-center bg-black/5">
                 <div className="relative group w-full max-w-md">
                    <MacbookMockup className="transition-transform duration-300 group-hover:scale-[1.01]">
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
          

        </div>
      </section>



      {/* About Section - The "Why Us" */}
      <section className="px-6 py-24 bg-gradient-to-b from-background to-secondary/10">
        <div className="mx-auto max-w-4xl">
           <div className="rounded-3xl border border-white/10 bg-background/50 p-8 md:p-12 shadow-sm">
              <div className="flex flex-col md:flex-row gap-10 items-stretch">
                 <div className="shrink-0 w-full md:w-64 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                    <img src={founderPortrait} alt="Christian Liebenberg" className="w-full h-full object-cover" />
                 </div>
                 <div className="space-y-6">
                    <div>
                       <h2 className="font-heading text-2xl font-medium md:text-3xl mb-2">
                          Waarom kiezen voor ons?
                       </h2>
                       <p className="text-sm font-mono text-primary/80">
                          Christian Liebenberg | Founder & Lead Engineer | MSc Econometrics 
                       </p>
                    </div>
                    
                    <div className="prose prose-invert text-muted-foreground leading-relaxed">
                       <p>
                          De AI-markt wordt overspoeld door 'agencies' die simpele prompts verkopen zonder fundamentele kennis. Wij doen dat anders. Liebenberg AI is gebaseerd op een achtergrond in <strong>Econometrie</strong> en data-analyse.
                       </p>
                       <p>
                          Wij begrijpen de wiskunde en data achter de modellen. Dat betekent dat we weten wanneer een model betrouwbaar is, en wanneer niet. We bouwen traditionele software gecombineerd met AI die niet alleen 'werkt' in een demo, maar die <strong>veilig, schaalbaar en statistisch onderbouwd</strong> is in een productie-omgeving.
                       </p>
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                       <Button variant="ghost" size="sm" asChild className="gap-2 pl-0 hover:bg-transparent hover:text-primary">
                          <a href="https://linkedin.com/in/christian-liebenberg-a0511060" target="_blank" rel="noopener noreferrer">
                             <Linkedin className="h-4 w-4" />
                             Connect op LinkedIn
                          </a>
                       </Button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-medium mb-10 text-center">Veelgestelde vragen</h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              { q: "Wat is het verschil tussen jullie en een standaard AI-agency?", a: "Wij zijn developers en econometristen, geen marketeers. Wij bouwen custom software en integraties in eigen beheer. Wij hebben een unieke combinatie van wiskunde, data, AI, en business kennis. Allemaal in-house. Hierdoor leveren wij oplossingen van een ander kaliber." },
              { q: "Is mijn data veilig?", a: "Absoluut. Dit is onze topprioriteit. Wij bouwen systemen waar data uw omgeving niet hoeft te verlaten (local deployment) of werken met enterprise-grade versleuteling bij gerenommeerde providers." },
              { q: "Werkt dit met mijn verouderde software (legacy)?", a: "Vaak wel. Wij zijn gespecialiseerd in het bouwen van API-koppelingen en 'middleware' die moderne AI laat praten met oudere systemen zoals boekhoudpakketten of ERP's." },
              { q: "Hoe ziet het kostenplaatje eruit?", a: "Wij werken projectmatig of op retainer-basis. Na de technische intake ontvangt u een vaste prijsopgave voor de development, en een overzicht van de running costs (API-kosten/hosting)." }
            ].map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-white/10 bg-secondary/5 px-6 rounded-lg data-[state=open]:bg-secondary/10">
                <AccordionTrigger className="text-base font-medium hover:no-underline hover:text-primary py-4 text-left">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-32 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-[100px] pointer-events-none" />
        <div className="mx-auto max-w-3xl text-center relative z-10">
          <h2 className="mb-8 font-heading text-4xl font-medium md:text-5xl">
            Klaar voor serieuze procesoptimalisatie?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Plan een gesprek om te kijken of uw use-case technisch haalbaar is en wat de ROI zal zijn.
          </p>
          <div className="flex flex-col items-center gap-4">
             <Button 
               variant="default" 
               size="xl"
               asChild
               className="px-12 h-14 text-lg"
             >
               <a href="https://cal.com/christianliebenberg" target="_blank" rel="noopener noreferrer">
               Plan Kennismaking
               </a>
             </Button>
             <p className="text-sm text-muted-foreground mt-4">
                Direct contact: <a href="mailto:christian@liebenberg.ai" className="hover:text-primary transition-colors">christian@liebenberg.ai</a>
             </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;