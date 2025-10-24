import { Button } from "@/components/ui/button";
import { Clock, Users, Heart, Phone, Sparkles, Shield } from "lucide-react";
import voiceAssistantImage from "@/assets/voice-assistant.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Slimme Voice Assistenten voor bedrijven
          </h1>
          <p className="mb-10 text-lg text-muted-foreground md:text-xl lg:text-2xl">
            Onze AI-stemassistenten nemen 24/7 de telefoon op en klinken net als echte mensen.
          </p>
          <Button 
            variant="hero" 
            size="xl"
            asChild
            className="mb-4"
          >
            <a href="https://cal.com/christian2001za" target="_blank" rel="noopener noreferrer">
              Boek een demo
            </a>
          </Button>
        </div>
      </section>

      {/* How it works Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl bg-card p-8 shadow-soft md:p-12">
            <div className="mb-8 flex flex-col items-center gap-6 md:flex-row md:items-start">
              <div className="flex-shrink-0">
                <img 
                  src={voiceAssistantImage} 
                  alt="Voice AI Assistent met headset" 
                  className="h-48 w-48 object-contain md:h-56 md:w-56"
                />
              </div>
              <div className="flex-1">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold md:text-3xl">Hoe het werkt</h2>
                </div>
                <div className="space-y-4 text-base leading-relaxed text-foreground md:text-lg">
              <p>
                Onze Voice AI Assistent neemt gesprekken aan als jij even niet kunt opnemen.
              </p>
              <p>
                Het is jouw antwoordapparaat op steroïden — hij begrijpt vragen van klanten, boekt afspraken, 
                stuurt WhatsApp-links, en beantwoordt veelgestelde vragen.
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
            <div className="rounded-2xl bg-card p-8 shadow-soft transition-all duration-200 hover:shadow-medium">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <Clock className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Bespaart tijd</h3>
              <p className="text-muted-foreground">
                Geen gemiste oproepen meer. Jouw AI-assistent werkt 24/7 zonder pauzes of vrije dagen.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="rounded-2xl bg-card p-8 shadow-soft transition-all duration-200 hover:shadow-medium">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Helpt meer klanten</h3>
              <p className="text-muted-foreground">
                Behandel meerdere oproepen tegelijk en help elke klant direct, zonder wachttijd.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="rounded-2xl bg-card p-8 shadow-soft transition-all duration-200 hover:shadow-medium">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <Heart className="h-7 w-7 text-primary" />
              </div>
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
          <div className="rounded-2xl bg-card p-8 shadow-soft md:p-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold md:text-3xl">Maatwerk voor jouw bedrijf</h2>
            </div>
            <div className="space-y-4 text-base leading-relaxed text-foreground md:text-lg">
              <p>
                Naast Voice AI bouwen we ook andere automatiseringen.
              </p>
              <p>
                Samen kijken we waar technologie het meeste verschil kan maken in jouw bedrijf en 
                implementeren dat met aandacht.
              </p>
              <p className="font-medium text-primary">
                Niet tevreden? Dan krijg je gewoon je geld terug.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 pb-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 inline-flex items-center justify-center gap-3 rounded-full bg-primary/10 px-6 py-3">
            <Phone className="h-5 w-5 text-primary" />
            <span className="font-medium text-primary">Klaar om te beginnen?</span>
          </div>
          
          <Button 
            variant="hero" 
            size="xl"
            asChild
            className="mb-6"
          >
            <a href="https://cal.com/christian2001za" target="_blank" rel="noopener noreferrer">
              Boek een gesprek
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
