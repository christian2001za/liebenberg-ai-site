import { useState } from "react";
import { Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import debatwijzerImage from "@/assets/debat.png";
import emailDrafterUiImage from "@/assets/UI email drafter.png";
import optiekglasLogo from "@/assets/liebenbergoptiekglaslogo.PNG";
import founderPortrait from "@/assets/LiebenbergAI_portrait_Christian.jpeg";
import logo from "@/assets/logo.svg";
import underlineStroke from "@/assets/streep.png";

const Index = () => {
  const [isCaseStudyImageOpen, setIsCaseStudyImageOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="px-6 py-6">
        <div className="mx-auto flex max-w-6xl items-center">
          <img
            src={logo}
            alt="Liebenberg AI"
            className="h-5 w-auto"
          />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24 lg:py-32">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="hero-animate mb-6 text-6xl font-bold md:text-7xl lg:text-8xl">
            Minder Admin.
            <span className="mx-auto inline-block font-heading text-muted-foreground hero-delay-1 hero-animate">
              Meer Output.
              <img
                src={underlineStroke}
                alt=""
                className="hero-underline mt-4 h-auto w-full"
              />
            </span>
          </h1>
          <p className="hero-animate hero-delay-2 mb-6 text-lg text-muted-foreground md:text-xl lg:text-2xl">
          Custom AI-oplossingen voor administratieve processen. Gebouwd met econometrische precisie en AI-expertise. Geen standaard tools, maar maatwerk dat direct tijd vrijmaakt voor wat echt telt.
          </p>
          <ul className="hero-animate hero-delay-2 mx-auto mb-6 max-w-2xl list-disc space-y-2 pl-6 text-left text-base text-muted-foreground md:text-lg">
            <li>
              <strong>Pilot draait binnen in 2-4 weken.</strong> 
            </li>
            <li>
              <strong>Jij behoudt volledige controle.</strong> 
            </li>
            <li>
              <strong>Transparant en meetbaar resultaat.</strong> 
            </li>
          </ul>
          <Button 
            variant="hero" 
            size="xl"
            asChild
            className="hero-animate hero-delay-3 mt-2"
          >
            <a href="https://cal.com/christian2001za" target="_blank" rel="noopener noreferrer">
              Plan procesanalyse
            </a>
          </Button>
          <p className="mt-3 text-sm text-muted-foreground">
            Vrijblijvend en 30 minuten
          </p>
        </div>
      </section>

      {/* Custom Solutions Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <div>
            <div className="mb-8">
              <h2 className="font-heading text-2xl font-semibold md:text-3xl">
                Diensten
              </h2>
            </div>
            <div className="grid gap-4 text-left sm:grid-cols-2">
              <div className="rounded-2xl bg-[#E6E6D1] p-6 shadow-soft">
                <p className="text-base font-medium text-foreground md:text-lg">
                  Document processing
                </p>
                <p className="mt-2 text-sm text-muted-foreground md:text-base">
                Stop met overtypen. Laat AI je facturen, contracten en rapporten lezen, begrijpen en verwerken in je systemen.
                </p>
              </div>
              <div className="rounded-2xl bg-[#E6E6D1] p-6 shadow-soft">
                <p className="text-base font-medium text-foreground md:text-lg">
                  Intelligente communicatie
                </p>
                <p className="mt-2 text-sm text-muted-foreground md:text-base">
                Je inbox onder controle. AI die e-mails klaatzet in jouw tone-of-voice, klantvragen direct beantwoordt en je team uren per week bespaart.
                </p>
              </div>
              <div className="rounded-2xl bg-[#E6E6D1] p-6 shadow-soft">
                <p className="text-base font-medium text-foreground md:text-lg">
                Interne kennis & support
                </p>
                <p className="mt-2 text-sm text-muted-foreground md:text-base">
                  Stel je vragen aan je eigen documenten en procedures. Snel antwoord met bronverwijzing. Onboard sneller, zoek korter, meer overzicht.
                </p>
              </div>
              <div className="rounded-2xl bg-[#E6E6D1] p-6 shadow-soft">
                <p className="text-base font-medium text-foreground md:text-lg">
                  Process automation
                </p>
                <p className="mt-2 text-sm text-muted-foreground md:text-base">
                  We tekenen je processen uit en automatiseren het, zodat niets blijft liggen. Gecombineerd met human-in-the-loop zodat jij ten alle tijden controle houdt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-2xl font-semibold md:text-3xl">
              Hoe het werkt
            </h2>
          </div>
          <div className="rounded-3xl bg-[#F3F1E3] p-8 shadow-soft md:p-12">
            <div className="space-y-5">
              <div className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-white/80 p-6 shadow-medium md:flex-row md:items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E6E6D1] text-sm font-semibold text-foreground">
                  01
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Stap 1
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-foreground md:text-xl">
                    Procesanalyse
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground md:text-base">
                    Welke processen kosten tijd? We analyseren en stellen een aanpak voor.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-white/80 p-6 shadow-medium md:flex-row md:items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E6E6D1] text-sm font-semibold text-foreground">
                  02
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Stap 2
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-foreground md:text-xl">
                    Pilot ontwikkeling (2-4 weken)
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground md:text-base">
                    We bouwen een werkende versie. Je test mee, geeft feedback, wij passen aan.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-white/80 p-6 shadow-medium md:flex-row md:items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E6E6D1] text-sm font-semibold text-foreground">
                  03
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Stap 3
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-foreground md:text-xl">
                    Optimalisatie (1-2 weken)
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground md:text-base">
                    Intensieve begeleiding en finetuning tot alles soepel draait.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-white/80 p-6 shadow-medium md:flex-row md:items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E6E6D1] text-sm font-semibold text-foreground">
                  04
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Stap 4
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-foreground md:text-xl">
                    Onderhoud
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground md:text-base">
                    Maandelijkse service om het systeem stabiel te houden. Doorontwikkeling
                    en nieuwe features bespreken we op basis van je wensen.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 rounded-2xl border border-border/60 bg-white/70 p-6 text-left shadow-medium">
              <p className="text-sm text-foreground md:text-base">
                <span className="font-semibold">💡 Geen maandenlange projecten of onduidelijke trajecten.</span>{" "}
                Je weet vooraf wat je krijgt, wanneer, en wat de volgende stap is.
              </p>
            </div>
            <div className="mt-6 text-left">
              <Button variant="secondary" size="lg" asChild>
                <a
                  href="https://cal.com/christian2001za"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Plan procesanalyse
                </a>
              </Button>
              <p className="mt-2 text-xs text-muted-foreground">
                Vrijblijvend en 30 minuten
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="px-6 py-16 bg-[#F6F4E8]">
        <div className="mx-auto w-full max-w-none">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-2xl font-semibold md:text-3xl">
              Case Studies
            </h2>
            <p className="mt-3 text-muted-foreground">
              Een korte inkijk in projecten waar we direct impact maken.
            </p>
          </div>
          <div className="border-y border-border/60">
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
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl bg-[#E6E6D1] p-8 shadow-soft md:p-12">
            <div className="mb-8 text-center">
              <h2 className="font-heading text-2xl font-semibold md:text-3xl">
                Publieke Projecten
              </h2>
              <p className="mt-3 text-muted-foreground">
              Publieke projecten (geen klantwerk) die laten zien hoe wij AI-ervaringen bouwen en shippen.
              </p>
            </div>
            <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
              <a
                href="https://debat.liebenberg.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full max-w-sm"
              >
                <img
                  src={debatwijzerImage}
                  alt="AI Debatwijzer 2025"
                  className="h-[320px] w-full rounded-xl object-cover shadow-medium transition-transform duration-200 group-hover:scale-[1.02] md:h-[360px]"
                />
              </a>
              <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
                <h3 className="text-xl font-medium">AI Debatwijzer 2025</h3>
                <div className="mt-2 space-y-2 text-sm text-muted-foreground md:text-base">
                  <p>
                    Een slimme debatwijzer die kiezers helpt om standpunten te ontdekken.
                    (300+ debatten)
                  </p>
                  <p>
                    Stel een vraag en start het debat. Inclusief citaten uit
                    verkiezingsprogramma's.
                  </p>
                </div>
                <div className="pt-6">
                  <Button variant="secondary" size="lg" asChild>
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
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 rounded-2xl bg-[#E6E6D1] p-8 shadow-soft md:grid-cols-[1fr,1.1fr] md:p-12">
            <div className="overflow-hidden rounded-xl bg-white/70 shadow-medium">
              <img
                src={founderPortrait}
                alt="Christian Liebenberg"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col space-y-4">
              <h2 className="font-heading text-2xl font-semibold md:text-3xl">
                Over ons
              </h2>
              <p className="text-base leading-relaxed text-foreground md:text-lg">
                Liebenberg AI bouwt custom AI-oplossingen voor bedrijven die slimmer willen werken.
              </p>
              <p className="text-base leading-relaxed text-foreground md:text-lg">
                Geen standaard tools, maar maatwerk dat past bij jouw processen. Onze oplossingen versnellen je werk, maar jij houdt de controle.
              </p>
              <p className="text-base leading-relaxed text-foreground md:text-lg">
              Nog te veel mensen doen robotwerk. Wij bouwen AI die dat overneemt — zodat jij weer mens kunt zijn in je werk.
              </p>
              <div className="pt-2">
                <p className="text-sm font-semibold text-foreground md:text-base">
                  Christian Liebenberg{" "}
                  <span className="font-normal text-muted-foreground">- Oprichter | AI engineer & consultant</span>
                </p>
                <p className="mt-2 text-base leading-relaxed text-foreground md:text-lg">
                  Achtergrond in econometrie (MSc) en consultancy. Ik duik in jouw processen, zoek uit waar tijd verloren gaat, en bouw iets dat echt werkt. Ik sta altijd open voor een kennismaking — online of in persoon.
                </p>
                <div className="pt-4">
                  <Button variant="secondary" size="lg" asChild>
                    <a
                      href="https://linkedin.com/in/christian-liebenberg-a0511060"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <Linkedin className="h-5 w-5" aria-hidden="true" />
                      LinkedIn
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-col items-center text-center">
            <Button variant="secondary" size="lg" asChild>
              <a
                href="https://cal.com/christian2001za"
                target="_blank"
                rel="noopener noreferrer"
              >
                Plan procesanalyse
              </a>
            </Button>
            <p className="mt-2 text-xs text-muted-foreground">
              Vrijblijvend en 30 minuten
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-2xl font-semibold md:text-3xl">
              FAQ
            </h2>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-border/60 bg-white/70 p-6 shadow-medium">
              <h3 className="text-base font-semibold text-foreground md:text-lg">
                ❓ Hoe lang duurt het voordat het werkt?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                Een pilot draait binnen 2-4 weken. Daarna 1-2 weken optimalisatie.
                Totaal: 4-8 weken van start tot finish.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-white/70 p-6 shadow-medium">
              <h3 className="text-base font-semibold text-foreground md:text-lg">
                ❓ Kan ik na de pilot stoppen?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                Ja. De pilot is bedoeld om te testen of AI iets voor je bedrijf is.
                Geen verplichtingen daarna.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-white/70 p-6 shadow-medium">
              <h3 className="text-base font-semibold text-foreground md:text-lg">
                ❓ Wat als het niet werkt zoals verwacht?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                → Dan passen we aan in de optimalisatiefase, of stoppen we.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-white/70 p-6 shadow-medium">
              <h3 className="text-base font-semibold text-foreground md:text-lg">
                ❓ Is mijn data veilig?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                Ja. We werken met gerenommeerde AI-providers en volg privacy-richtlijnen.
                Je data wordt niet gedeeld of gebruikt voor andere doeleinden.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-white/70 p-6 shadow-medium">
              <h3 className="text-base font-semibold text-foreground md:text-lg">
                ❓ Werkt het met mijn huidige systemen?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                Meestal wel. We koppelen aan veelgebruikte tools zoals Gmail, Excel,
                Google Drive, en de meeste boekhoudsoftware. Tijdens de procesanalyse
                checken we compatibiliteit.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-white/70 p-6 shadow-medium">
              <h3 className="text-base font-semibold text-foreground md:text-lg">
                ❓ Hoe weet ik of AI geschikt is voor mijn proces?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                Goed voor: repetitief werk, veel data verwerken, standaardvragen
                beantwoorden, documenten doorzoeken. Twijfel? Plan een gratis
                procesanalyse en we geven eerlijk advies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <Button 
            variant="hero" 
            size="xl"
            asChild
            className="mb-6"
          >
            <a href="https://cal.com/christian2001za" target="_blank" rel="noopener noreferrer">
            Plan procesanalyse
            </a>
          </Button>
          <p className="mb-6 text-sm text-muted-foreground">
            Vrijblijvend en 30 minuten
          </p>
          <p className="text-muted-foreground">
            Of mail naar{" "}
            <a 
              href="mailto:christian@liebenberg.nl" 
              className="font-medium text-primary underline-offset-4 transition-colors hover:underline"
            >
              christian@liebenberg.nl
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;
