
const technologies = [
  { name: "Vercel", slug: "vercel" },
  { name: "Railway", slug: "railway" },
  { name: "LangChain", slug: "langchain" },
  { name: "Python", slug: "python" },
  { name: "Gemini", slug: "google" },
  { name: "Anthropic", slug: "anthropic" },
  { name: "OpenAI", slug: "openai", localSrc: "/openai.svg" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "FastAPI", slug: "fastapi" },
  { name: "n8n", slug: "n8n" },
  { name: "Supabase", slug: "supabase" },
];

export const TechStack = () => {
  return (
    <section className="border-y border-border/40 bg-secondary/20 py-10 overflow-hidden">
      <div className="container mx-auto px-6 mb-6 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Powered by best-in-class technology
        </p>
      </div>
      
      <div className="relative flex w-full overflow-hidden mask-linear-fade">
        <div className="flex animate-marquee gap-12 sm:gap-24 w-max items-center px-6">
          {technologies.map((tech) => (
            <div key={tech.name} className="flex items-center gap-3 shrink-0 opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0">
              <img 
                src={tech.localSrc ?? `https://cdn.simpleicons.org/${tech.slug}/FFFFFF`}
                alt={tech.name}
                className="h-6 w-auto sm:h-8"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerText = tech.name;
                }}
              />
              <span className="sr-only text-sm font-medium">{tech.name}</span>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {technologies.map((tech) => (
             <div key={`${tech.name}-duplicate`} className="flex items-center gap-3 shrink-0 opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0">
              <img 
                src={tech.localSrc ?? `https://cdn.simpleicons.org/${tech.slug}/FFFFFF`}
                alt={tech.name}
                className="h-6 w-auto sm:h-8"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerText = tech.name;
                }}
              />
              <span className="sr-only text-sm font-medium">{tech.name}</span>
            </div>
          ))}
        </div>
        
        
      </div>
    </section>
  );
};
