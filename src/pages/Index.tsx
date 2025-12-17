import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import voiceAssistantImage from "@/assets/voice-assistant.png";
import debatwijzerImage from "@/assets/debat.png";
import emailDrafterImage from "@/assets/email_drafter.png";
import snelleSchrijverImage from "@/assets/snelle_schrijver.png";
import founderPortrait from "@/assets/LiebenbergAI_portrait_Christian.jpeg";
import demoVapiAudio from "@/assets/demo-vapi.wav";
import logo from "@/assets/logo.svg";
import underlineStroke from "@/assets/streep.png";

const Index = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const projects = [
    {
      title: "AI Debatwijzer 2025",
      description: [
        "Een slimme debatwijzer die kiezers helpt om standpunten te ontdekken. (al 300+ debatten)",
        "Stel een vraag en start het debat. Inclusief citaten uit verkiezingsprogramma's.",
      ],
      ctaLabel: "Start een debat",
      ctaHref: "https://debat.liebenberg.ai",
      image: debatwijzerImage,
      imageAlt: "AI Debatwijzer 2025",
      link: "https://debat.liebenberg.ai",
    },
    {
      title: "AI email drafter",
      description: [
        "Deze AI tool wordt getraind op uw bedrijfsdata en is flexibel en gemakkelijk zelf aan te passen naar uw smaak.",
        "Denk nooit meer uren lang na over hoe je een ingewikkelde mail van een klant gaat beantwoorden.",
      ],
      ctaLabel: "Bekijk de app",
      ctaHref: "https://email-drafter-nine.vercel.app/",
      image: emailDrafterImage,
      imageAlt: "AI email drafter",
      link: "https://email-drafter-nine.vercel.app/",
    },
    {
      title: "Optometrie AI receptionist",
      description: [
        "Een antwoordapparaat. Op steroïden.",
        "Onze AI-assistent springt bij in deze praktijk wanneer het druk is:",
        "beantwoordt vragen, boekt afspraken en stuurt berichtjes naar klanten.",
      ],
      ctaLabel: "Hoor de assistent",
      ctaType: "toggleAudio" as const,
      image: voiceAssistantImage,
      imageAlt: "Voice AI Assistent",
      link: null,
    },
    {
      title: "Luisterend Oor",
      description: [
        "Forward je spraakbericht naar dit WhatsApp nummer en ontvang binnen seconden een samenvatting + transcriptie.",
      ],
      ctaLabel: "Plan een demo",
      ctaHref: "https://cal.com/christian2001za",
      image: snelleSchrijverImage,
      imageAlt: "Luisterend Oor WhatsApp samenvatter",
      link: null,
    },
  ];
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const autoRotateRef = useRef<number | null>(null);

  const stopAutoRotate = () => {
    if (autoRotateRef.current) {
      window.clearInterval(autoRotateRef.current);
      autoRotateRef.current = null;
    }
  };

  const startAutoRotate = () => {
    if (autoRotateRef.current) return;
    autoRotateRef.current = window.setInterval(
      () => setActiveProjectIndex((prevIndex) => (prevIndex + 1) % projects.length),
      5000,
    );
  };

  useEffect(() => {
    startAutoRotate();
    return () => stopAutoRotate();
  }, [projects.length]);

  const handleToggleDemo = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => undefined);
    }
  };

  const handleNextProject = () => {
    stopAutoRotate();
    setActiveProjectIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const handlePreviousProject = () => {
    stopAutoRotate();
    setActiveProjectIndex(
      (prevIndex) => (prevIndex - 1 + projects.length) % projects.length,
    );
  };

  const activeProject = projects[activeProjectIndex];

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
            Laat AI werken voor je bedrijf.
            <span className="mx-auto inline-block font-heading text-muted-foreground hero-delay-1 hero-animate">
              Dag en nacht.
              <img
                src={underlineStroke}
                alt=""
                className="hero-underline mt-4 h-auto w-full"
              />
            </span>
          </h1>
          <p className="hero-animate hero-delay-2 mb-6 text-lg text-muted-foreground md:text-xl lg:text-2xl">
            Custom AI-oplossingen die administratief werk overnemen. Jij houdt de controle.
          </p>
          <audio
            ref={audioRef}
            src={demoVapiAudio}
            preload="auto"
            className="hidden"
            aria-hidden="true"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          />
          <Button 
            variant="hero" 
            size="xl"
            asChild
            className="hero-animate hero-delay-3 mt-2"
          >
            <a href="https://cal.com/christian2001za" target="_blank" rel="noopener noreferrer">
              Boek een intro gesprek
            </a>
          </Button>
        </div>
      </section>

      {/* Projects Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl bg-[#E6E6D1] p-8 text-center shadow-soft md:p-12">
            <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="text-center md:text-left">
                <h2 className="font-heading text-2xl font-semibold md:text-3xl">Projecten</h2>
                <p className="mt-3 text-muted-foreground">
                  Ontdek waar AI het verschil maakt in onze recente projecten.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePreviousProject}
                  aria-label="Vorige project"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNextProject}
                  aria-label="Volgende project"
                >
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div
              key={activeProject.title}
              className="project-animate flex min-h-[540px] flex-col items-center md:min-h-[620px]"
            >
              <div className="group mx-auto mb-6 block max-w-sm">
                {activeProject.link ? (
                  <a
                    href={activeProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {activeProject.image ? (
                      <img
                        src={activeProject.image}
                        alt={activeProject.imageAlt}
                        className="h-[320px] w-full rounded-xl object-cover shadow-medium transition-transform duration-200 group-hover:scale-[1.02] md:h-[360px]"
                      />
                    ) : (
                      <div className="flex h-[320px] items-center justify-center rounded-xl bg-[#dcdccb] shadow-medium transition-transform duration-200 group-hover:scale-[1.02] md:h-[360px]">
                        <span className="text-sm font-medium text-muted-foreground">
                          Foto wordt hier geplaatst
                        </span>
                      </div>
                    )}
                  </a>
                ) : activeProject.image ? (
                  <img
                    src={activeProject.image}
                    alt={activeProject.imageAlt}
                    className="h-[320px] w-full rounded-xl object-cover shadow-medium md:h-[360px]"
                  />
                ) : (
                  <div className="flex h-[320px] items-center justify-center rounded-xl bg-[#dcdccb] shadow-medium md:h-[360px]">
                    <span className="text-sm font-medium text-muted-foreground">
                      Foto wordt hier geplaatst
                    </span>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-medium">{activeProject.title}</h3>
              <div className="mt-2 space-y-2 text-sm text-muted-foreground">
                {activeProject.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {activeProject.ctaType === "toggleAudio" ? (
                <Button
                  variant="secondary"
                  size="lg"
                  className="mt-6"
                  onClick={handleToggleDemo}
                  aria-label={
                    isPlaying
                      ? "Pauzeer voice assistent demo"
                      : "Speel voice assistent demo af"
                  }
                >
                  {isPlaying ? "Pause" : activeProject.ctaLabel}
                </Button>
              ) : activeProject.ctaHref ? (
                <Button
                  variant="secondary"
                  size="lg"
                  asChild
                  className="mt-6"
                >
                  <a
                    href={activeProject.ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {activeProject.ctaLabel}
                  </a>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Custom Solutions Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-block text-left">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-semibold md:text-3xl">Maatwerk voor jouw bedrijf</h2>
            </div>
            <ul className="mt-4 list-disc space-y-3 pl-6 text-base leading-relaxed text-foreground md:text-lg md:pl-6">
              <li>Custom AI software</li>
              <li>AI (voice) agents</li>
              <li>Klantenservice AI (chat, email,voice, WhatsApp)</li>
              <li>Process automation</li>
            </ul>
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
              <div className="pt-2">
                <p className="text-sm font-semibold text-foreground md:text-base">
                  Christian Liebenberg{" "}
                  <span className="font-normal text-muted-foreground">- Oprichter</span>
                </p>
                <p className="mt-2 text-base leading-relaxed text-foreground md:text-lg">
                  Achtergrond in econometrie (MSc) en consultancy. Ik duik in jouw processen, zoek uit waar tijd verloren gaat, en bouw iets dat echt werkt. Ik sta altijd open voor een gesprek of koffietje.
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
              Boek een intro gesprek
            </a>
          </Button>
          <p className="text-muted-foreground">
            Of mail naar{" "}
            <a 
              href="mailto:christian2001za@gmail.com" 
              className="font-medium text-primary underline-offset-4 transition-colors hover:underline"
            >
              christian2001za@gmail.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;
