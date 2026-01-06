import { useState } from "react";
import { Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import debatwijzerImage from "@/assets/debat.png";
import emailDrafterUiImage from "@/assets/UI email drafter.png";
import optiekglasLogo from "@/assets/liebenbergoptiekglaslogo.PNG";
import founderPortrait from "@/assets/LiebenbergAI_portrait_Christian.jpeg";
import logo from "@/assets/logo.svg";
import underlineStroke from "@/assets/streep.png";
import { TechStack } from "@/components/TechStack";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Index = () => {
  const [isCaseStudyImageOpen, setIsCaseStudyImageOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="px-6 py-6">
        <div className="mx-auto flex max-w-6xl items-center">
          <img
            src={logo}
            alt="Liebenberg AI"
            className="h-5 w-auto brightness-0 invert"
          />
        </div>
      </header>

      {/* Hero Section */}
      {/* Hero Section */}
      <section className="px-6 py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="hero-animate mb-8 text-6xl font-medium tracking-tight text-foreground md:text-7xl lg:text-8xl font-heading leading-[1.1]">
            Minder Admin.
            <span className="block text-muted-foreground/80 hero-delay-1 hero-animate mt-2">
              Meer Output.
            </span>
          </h1>
          <p className="hero-animate hero-delay-2 mb-8 text-lg text-muted-foreground md:text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed">
            Custom AI-oplossingen voor administratieve processen. Gebouwd met econometrische precisie. Geen standaard tools, maar maatwerk dat direct tijd vrijmaakt.
          </p>
          <div className="hero-animate hero-delay-3 flex flex-col items-center gap-4">
            <Button 
              variant="hero" 
              size="xl"
              asChild
              className="px-12 h-14"
            >
              <a href="https://cal.com/christian2001za" target="_blank" rel="noopener noreferrer">
                Plan procesanalyse
              </a>
            </Button>
            <p className="text-sm text-muted-foreground/80">
              Vrijblijvend en 30 minuten
            </p>
          </div>

          {/* Value Props Row */}
          {/* Value Props Row */}
          <div className="hero-animate hero-delay-3 mt-12 flex justify-center text-sm text-muted-foreground md:text-base">
            <div className="flex flex-col gap-y-4 gap-x-8 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="font-medium">Pilot in 2-4 weken</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="font-medium">Jij behoudt controle</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="font-medium">Meetbaar resultaat</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <TechStack />

      {/* Custom Solutions Section */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-medium md:text-4xl text-foreground">
              Diensten
            </h2>
          </div>
          <div className="grid gap-6 text-left sm:grid-cols-2">
            {[
              {
                title: "Document processing",
                desc: "Stop met overtypen. Laat AI je facturen, contracten en rapporten lezen, begrijpen en verwerken in je systemen."
              },
              {
                title: "Intelligente communicatie",
                desc: "Je inbox onder controle. AI die e-mails klaarzet in jouw tone-of-voice, klantvragen direct beantwoordt en team-uren bespaart."
              },
              {
                title: "Interne kennis & support",
                desc: "Stel vragen aan je eigen documenten. Snel antwoord met bronverwijzing. Onboard sneller, zoek korter, meer overzicht."
              },
              {
                title: "Process automation",
                desc: "We tekenen je processen uit en automatiseren het, zodat niets blijft liggen. Human-in-the-loop voor volledige controle."
              }
            ].map((service, i) => (
              <div key={i} className="group rounded-xl border border-border/50 bg-secondary/10 p-8 shadow-sm transition-all hover:shadow-md hover:bg-secondary/20 backdrop-blur-sm">
                <p className="text-lg font-medium text-foreground">
                  {service.title}
                </p>
                <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-24 bg-secondary/30">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-medium md:text-4xl">
              Hoe het werkt
            </h2>
          </div>
          <div className="space-y-6">
            {[
              { step: "01", title: "Procesanalyse", desc: "Welke processen kosten tijd? We analyseren en stellen een aanpak voor." },
              { step: "02", title: "Pilot ontwikkeling (2-4 weken)", desc: "We bouwen een werkende versie. Je test mee, geeft feedback, wij passen aan." },
              { step: "03", title: "Optimalisatie (1-2 weken)", desc: "Intensieve begeleiding en finetuning tot alles soepel draait." },
              { step: "04", title: "Onderhoud", desc: "Maandelijkse service om het systeem stabiel te houden. Doorontwikkeling op maat." }
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-6 rounded-xl border border-border/40 bg-secondary/10 p-6 shadow-sm md:flex-row md:items-start transition-colors hover:bg-secondary/20">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-sm font-semibold text-foreground border border-white/5">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground md:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-base text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
            
            <div className="mt-8 rounded-xl bg-primary/10 p-6 text-left border border-primary/20">
              <p className="text-sm text-foreground md:text-base">
                <span className="font-semibold text-primary">💡 Geen onduidelijke trajecten.</span>{" "}
                Je weet vooraf wat je krijgt, wanneer, en wat de volgende stap is.
              </p>
            </div>
            
            <div className="mt-8 text-center md:text-left">
              <Button variant="outline" size="lg" className="border-secondary-foreground/20" asChild>
                <a
                  href="https://cal.com/christian2001za"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Plan procesanalyse
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="px-6 py-24">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-medium md:text-4xl text-foreground">
              Case Studies
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Een korte inkijk in projecten waar we direct impact maken.
            </p>
          </div>
          <div className="border-y border-border/40">
            <div className="grid gap-8 py-10 md:grid-cols-[1.1fr,2fr]">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Case study
                </p>
                <h3 className="mt-2 text-xl font-semibold md:text-2xl">
                  Inbox AI voor optometrie praktijk
                </h3>
                <p className="mt-3 text-sm text-muted-foreground md:text-base">
                  AI-software voor een optometrie praktijk die concepten genereert op inkomende mails. Onze AI is getraind op hun kennisbank en tone-of-voice, en de concepten zijn makkelijk handmatig of met AI-edit te finetunen. “Na meerdere tools te hebben getest, is dit de eerste oplossing die echt emails schrijft zoals ik.”
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCaseStudyImageOpen(true)}
                    className="group flex w-full max-w-[280px] cursor-zoom-in items-center justify-center"
                    aria-label="Vergroot UI Email Drafter"
                  >
                    <img
                      src={emailDrafterUiImage}
                      alt="UI Email Drafter"
                      className="h-32 w-full rounded-2xl border border-border/60 object-cover shadow-medium blur-[1.5px] transition-all duration-200 group-hover:scale-[1.02] group-hover:blur-[0.8px]"
                    />
                  </button>
                  <img
                    src={optiekglasLogo}
                    alt="Optiekglas logo"
                    className="h-16 w-auto"
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  
                </p>
                <div className="mt-4">
                  <Button variant="secondary" size="lg" asChild>
                    <a
                      href="https://email-drafter-nine.vercel.app/home"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Bekijk de app
                    </a>
                  </Button>
                </div>
              </div>
              <div className="space-y-6">
                <div className="border-b border-border/60 pb-6">
                  <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Situatie
                  </h4>
                  <p className="mt-2 text-sm text-foreground md:text-base">
                    Veel ingewikkelde herhaalvragen van klanten en handmatig typen en formuleren.
                  </p>
                </div>
                <div className="border-b border-border/60 pb-6">
                  <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Aanpak
                  </h4>
                  <p className="mt-2 text-sm text-foreground md:text-base">
                    Onze AI, getraind op hun kennisbank en tone-of-voice, genereert concepten op inkomende mails.
                    Makkelijk te finetunen, handmatig of met AI-edit.
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Resultaat
                  </h4>
                  <p className="mt-2 text-sm text-foreground md:text-base">
                    Snellere antwoorden, consistentere communicatie, minder werkdruk.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {isCaseStudyImageOpen ? (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8"
              role="dialog"
              aria-modal="true"
              aria-label="UI Email Drafter"
              onClick={() => setIsCaseStudyImageOpen(false)}
            >
              <div
                className="max-h-[85vh] w-full max-w-5xl cursor-zoom-out"
                onClick={(event) => event.stopPropagation()}
              >
                <img
                  src={emailDrafterUiImage}
                  alt="UI Email Drafter"
                  className="h-full w-full rounded-2xl object-contain shadow-2xl"
                />
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* Builds & Prototypes Section */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-xl bg-secondary/30 p-8 shadow-sm md:p-12 border border-secondary">
            <div className="mb-12 text-center">
              <h2 className="font-heading text-3xl font-medium md:text-4xl">
                Publieke Projecten
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Publieke projecten (geen klantwerk) die laten zien hoe wij AI-ervaringen bouwen en shippen.
              </p>
            </div>
            <div className="flex flex-col items-center gap-10 md:flex-row md:items-start">
              <a
                href="https://debat.liebenberg.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full max-w-sm block"
              >
                <div className="overflow-hidden rounded-xl shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.02]">
                  <img
                    src={debatwijzerImage}
                    alt="AI Debatwijzer 2025"
                    className="h-[320px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </a>
              <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
                <h3 className="text-2xl font-serif text-foreground">AI Debatwijzer 2025</h3>
                <div className="mt-4 space-y-3 text-base text-muted-foreground leading-relaxed">
                  <p>
                    Een slimme debatwijzer die kiezers helpt om standpunten te ontdekken.
                    (300+ debatten geanalyseerd)
                  </p>
                  <p>
                    Stel een vraag en start het debat. Inclusief citaten uit
                    verkiezingsprogramma's.
                  </p>
                </div>
                <div className="pt-8">
                  <Button variant="default" size="lg" className="rounded-full px-8" asChild>
                    <a
                      href="https://debat.liebenberg.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Start een debat
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 rounded-xl bg-secondary/30 p-8 shadow-sm md:grid-cols-[1fr,1.2fr] md:p-12 border border-secondary">
            <div className="overflow-hidden rounded-xl bg-secondary/10 shadow-sm ring-1 ring-white/10">
              <img
                src={founderPortrait}
                alt="Christian Liebenberg"
                className="h-full w-full object-cover grayscale transition-all duration-500 hover:grayscale-0 opacity-80 hover:opacity-100"
              />
            </div>
            <div className="flex flex-col space-y-6 justify-center">
              <h2 className="font-heading text-3xl font-medium md:text-4xl">
                Over ons
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                <p>
                  Liebenberg AI bouwt custom AI-oplossingen voor bedrijven die slimmer willen werken.
                </p>
                <p>
                  Geen standaard tools, maar maatwerk dat past bij jouw processen. Onze oplossingen versnellen je werk, maar jij houdt de controle.
                </p>
                <p>
                  Nog te veel mensen doen robotwerk. Wij bouwen AI die dat overneemt — zodat jij weer mens kunt zijn in je werk.
                </p>
              </div>
              
              <div className="pt-4 border-t border-border/60">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-medium text-foreground">
                      Christian Liebenberg
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Oprichter | AI Engineer & Consultant
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-white/10">
                    <a
                      href="https://linkedin.com/in/christian-liebenberg-a0511060"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/80 hover:text-foreground"
                    >
                      <Linkedin className="h-5 w-5" aria-hidden="true" />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                  </Button>
                </div>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Achtergrond in econometrie (MSc) en consultancy. Ik duik in jouw processen, zoek uit waar tijd verloren gaat, en bouw iets dat echt werkt.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center text-center">
            <Button variant="outline" size="lg" className="border-primary/20 hover:bg-primary/5" asChild>
              <a
                href="https://cal.com/christian2001za"
                target="_blank"
                rel="noopener noreferrer"
              >
                Plan procesanalyse
              </a>
            </Button>
            <p className="mt-3 text-sm text-muted-foreground">
              Vrijblijvend en 30 minuten
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-24 bg-secondary/10">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-medium md:text-4xl">
              FAQ
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              { q: "Hoe lang duurt het voordat het werkt?", a: "Een pilot draait binnen 2-4 weken. Daarna 1-2 weken optimalisatie. Totaal: 4-8 weken van start tot finish." },
              { q: "Kan ik na de pilot stoppen?", a: "Ja. De pilot is bedoeld om te testen of AI iets voor je bedrijf is. Geen verplichtingen daarna." },
              { q: "Wat als het niet werkt zoals verwacht?", a: "Dan passen we aan in de optimalisatiefase, of stoppen we." },
              { q: "Is mijn data veilig?", a: "Ja. We werken met gerenommeerde AI-providers en volgen privacy-richtlijnen. Je data wordt niet gedeeld." },
              { q: "Werkt het met mijn huidige systemen?", a: "Meestal wel. We koppelen aan veelgebruikte tools zoals Gmail, Excel, Google Drive, en de meeste boekhoudsoftware." },
              { q: "Hoe weet ik of AI geschikt is voor mijn proces?", a: "Goed voor: repetitief werk, veel data verwerken, standaardvragen beantwoorden. Twijfel? Plan een analyse." }
            ].map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-border/40 bg-secondary/10 px-6 py-2 rounded-xl shadow-sm transition-all hover:bg-secondary/20 data-[state=open]:bg-secondary/20 data-[state=open]:shadow-md">
                <AccordionTrigger className="text-lg font-medium text-foreground hover:no-underline text-left">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-4">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-8 font-heading text-4xl font-medium md:text-5xl">
            Klaar om tijd te besparen?
          </h2>
          <Button 
            variant="hero" 
            size="xl"
            asChild
            className="mb-6 px-12 h-14"
          >
            <a href="https://cal.com/christian2001za" target="_blank" rel="noopener noreferrer">
            Plan procesanalyse
            </a>
          </Button>
          <p className="mb-8 text-sm text-muted-foreground">
            Vrijblijvend en 30 minuten
          </p>
          <p className="text-muted-foreground">
            Of mail naar{" "}
            <a 
              href="mailto:christian@liebenberg.ai" 
              className="font-medium text-foreground underline decoration-muted-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground hover:text-foreground"
            >
              christian@liebenberg.ai
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;
