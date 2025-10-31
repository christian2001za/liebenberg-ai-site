import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import voiceAssistantImage from "@/assets/voice-assistant.png";
import debatwijzerImage from "@/assets/debat.png";
import demoVapiAudio from "@/assets/demo-vapi.wav";
import logo from "@/assets/logo.svg";

const Index = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggleDemo = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => undefined);
    }
  };

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
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-6xl font-bold md:text-7xl lg:text-8xl">
            Slimme Voice Assistenten voor bedrijven
          </h1>
          <p className="mb-6 text-lg text-muted-foreground md:text-xl lg:text-2xl">
            Onze AI assistenten nemen 24/7 de telefoon op en klinken net als echte mensen.
          </p>
          <div className="mt-8 mb-12 flex items-center justify-center gap-3">
            <Button
              variant="secondary"
              size="lg"
              onClick={handleToggleDemo}
              aria-label={
                isPlaying
                  ? "Pauzeer voice assistent demo"
                  : "Speel voice assistent demo af"
              }
            >
              {isPlaying ? "Pause" : "Play"}
            </Button>
            <span className="text-base text-muted-foreground md:text-lg">
              Hoor zelf een assistent in actie
            </span>
          </div>
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
            className="mb-4"
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
            <div className="mb-8">
              <h2 className="font-heading text-2xl font-semibold md:text-3xl">Projecten</h2>
              <p className="mt-3 text-muted-foreground">
                Ontdek waar AI het verschil maakt in onze recente projecten.
              </p>
            </div>
            <a
              href="https://debat.liebenberg.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="group mx-auto mb-6 block max-w-sm"
            >
              <img
                src={debatwijzerImage}
                alt="AI Debatwijzer 2025"
                className="w-full rounded-xl shadow-medium transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </a>
            <h3 className="text-xl font-medium">AI Debatwijzer 2025</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Een slimme debatwijzer die kiezers helpt om standpunten te ontdekken.
            </p>
            <Button
              variant="secondary"
              size="lg"
              asChild
              className="mt-6"
            >
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
      </section>

      {/* How it works Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl bg-[#E6E6D1] p-8 shadow-soft md:p-12">
            <div className="mb-8 flex flex-col items-center gap-6 md:flex-row md:items-start">
              <div className="flex-shrink-0">
                <img 
                  src={voiceAssistantImage} 
                  alt="Voice AI Assistent met headset" 
                  className="h-48 w-48 object-contain md:h-56 md:w-56"
                />
              </div>
              <div className="flex-1">
                <div className="mb-6">
                  <h2 className="font-heading text-2xl font-semibold md:text-3xl">Hoe het werkt</h2>
                </div>
                <div className="space-y-4 text-base leading-relaxed text-foreground md:text-lg">
              <p>
                Onze Voice AI Assistent neemt gesprekken aan als jij even niet kunt of wilt opnemen.
              </p>
              <p>
                Het is jouw antwoordapparaat op steroïden. Zij begrijpt vragen van klanten, boekt afspraken, 
                stuurt SMSjes, en beantwoordt veelgestelde vragen.
              </p>
              <p>
                Als een klant liever met een echt persoon wil spreken of de vraag te moeilijk is, 
                schakelen we door of sturen we je een alert om terug te bellen.
              </p>
              <p>
                Na elk gesprek ontvang je automatisch een e-mail met de samenvatting.
              </p>
              <p className="font-medium">
                Alles is aanpasbaar aan jouw bedrijf.
              </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Benefit 1 */}
            <div className="rounded-2xl bg-[#E6E6D1] p-8 shadow-soft transition-all duration-200 hover:shadow-medium">
              <h3 className="mb-3 text-xl font-semibold">Bespaart tijd</h3>
              <p className="text-muted-foreground">
                Geen gemiste oproepen meer. Jouw AI-assistent werkt 24/7 zonder pauzes of vrije dagen.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="rounded-2xl bg-[#E6E6D1] p-8 shadow-soft transition-all duration-200 hover:shadow-medium">
              <h3 className="mb-3 text-xl font-semibold">Helpt meer klanten</h3>
              <p className="text-muted-foreground">
                Behandel meerdere oproepen tegelijk en help elke klant direct, zonder wachttijd.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="rounded-2xl bg-[#E6E6D1] p-8 shadow-soft transition-all duration-200 hover:shadow-medium">
              <h3 className="mb-3 text-xl font-semibold">Geeft rust</h3>
              <p className="text-muted-foreground">
                Focus op wat belangrijk is. De AI handelt routine-vragen af, jij concentreert je op groei.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Solutions Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl bg-[#E6E6D1] p-8 shadow-soft md:p-12">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-semibold md:text-3xl">Maatwerk voor jouw bedrijf</h2>
            </div>
            <div className="space-y-4 text-base leading-relaxed text-foreground md:text-lg">
              <p>
                Naast Voice AI bouwen we ook andere automatiseringen.
              </p>
              <p>
                Samen kijken we waar technologie het meeste verschil kan maken in jouw bedrijf en 
                implementeren dat met aandacht.
              </p>
              <p className="font-medium text-[#1A1A1A]">
                Niet tevreden? Dan krijg je gewoon je geld terug.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 pb-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 inline-flex items-center justify-center rounded-full bg-primary/10 px-6 py-3">
            <span className="font-medium text-primary">Klaar om te beginnen?</span>
          </div>
          
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
