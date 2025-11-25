import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import voiceAssistantImage from "@/assets/voice-assistant.png";
import debatwijzerImage from "@/assets/debat.png";
import snelleSchrijverImage from "@/assets/snelle_schrijver.png";
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
        "Een slimme debatwijzer die kiezers helpt om standpunten te ontdekken.",
        "Stel een vraag en start het debat. Inclusief citaten uit verkiezingsprogramma's.",
      ],
      ctaLabel: "Start een debat",
      ctaHref: "https://debat.liebenberg.ai",
      image: debatwijzerImage,
      imageAlt: "AI Debatwijzer 2025",
      link: "https://debat.liebenberg.ai",
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

  const handleToggleDemo = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => undefined);
    }
  };

  const handleNextProject = () =>
    setActiveProjectIndex((prevIndex) => (prevIndex + 1) % projects.length);

  const handlePreviousProject = () =>
    setActiveProjectIndex((prevIndex) =>
      (prevIndex - 1 + projects.length) % projects.length,
    );

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
          <h1 className="mb-6 text-6xl font-bold md:text-7xl lg:text-8xl">
            AI tools die direct werken.
            <span className="mx-auto inline-block font-heading text-muted-foreground">
              Dag en nacht.
              <img
                src={underlineStroke}
                alt=""
                className="mt-4 h-auto w-full"
              />
            </span>
          </h1>
          <p className="mb-6 text-lg text-muted-foreground md:text-xl lg:text-2xl">
          Van WhatsApp agents tot voice AI - custom oplossingen die tijd besparen en processen automatiseren
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
            className="mt-2"
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
                      className="w-full rounded-xl shadow-medium transition-transform duration-200 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex h-64 items-center justify-center rounded-xl bg-[#dcdccb] shadow-medium transition-transform duration-200 group-hover:scale-[1.02]">
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
                  className="w-full rounded-xl shadow-medium"
                />
              ) : (
                <div className="flex h-64 items-center justify-center rounded-xl bg-[#dcdccb] shadow-medium">
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
      </section>

      {/* Custom Solutions Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl bg-[#E6E6D1] p-8 shadow-soft md:p-12">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-semibold md:text-3xl">Maatwerk voor jouw bedrijf</h2>
            </div>
            <ul className="mt-4 list-disc space-y-3 text-left text-base leading-relaxed text-foreground md:text-lg md:pl-6">
              <li>AI webapplicaties</li>
              <li>WhatsApp &amp; Voice AI agents en automations</li>
              <li>Klantenservice AI (chat, voice, WhatsApp)</li>
              <li>Process automisation</li>
            </ul>
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
