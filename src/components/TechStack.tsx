
interface Technology {
  name: string;
  slug: string;
  localSrc?: string;
}

const technologies: Technology[] = [
  { name: "Vercel", slug: "vercel" },
  { name: "Railway", slug: "railway" },
  { name: "LangChain", slug: "langchain" },
  { name: "Python", slug: "python" },
  { name: "Gemini", slug: "google" },
  { name: "Anthropic", slug: "anthropic" },
  { name: "OpenAI", slug: "openai", localSrc: "/openai.svg" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "FastAPI", slug: "fastapi" },
  { name: "Azure", slug: "microsoftazure", localSrc: "/azure.svg" },
  { name: "Supabase", slug: "supabase" },
];

export const TechStack = () => {
  return (
    <section className="py-10 overflow-hidden">
      <div className="container mx-auto px-6 mb-6 text-center">
        <p className="label-uppercase text-muted-foreground">
          Powered by best-in-class technology
        </p>
      </div>

      <div className="relative flex w-full overflow-hidden mask-linear-fade">
        <div className="flex animate-marquee gap-12 sm:gap-24 w-max items-center px-6">
          {technologies.map((tech) => (
            <div key={tech.name} className="flex items-center gap-3 shrink-0 opacity-40 grayscale">
              <img
                src={tech.localSrc ?? `https://cdn.simpleicons.org/${tech.slug}/1b1d12`}
                alt={tech.name}
                className="h-5 w-auto sm:h-7"
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
            <div key={`${tech.name}-duplicate`} className="flex items-center gap-3 shrink-0 opacity-40 grayscale">
              <img
                src={tech.localSrc ?? `https://cdn.simpleicons.org/${tech.slug}/1b1d12`}
                alt={tech.name}
                className="h-5 w-auto sm:h-7"
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
