export default function Hero() {
  return (
    <section className="py-8">
      <div className="flex flex-col md:flex-row md:items-start gap-8 max-w-3xl">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Hi, I'm Babak{' '}
            <span className="text-muted-light font-normal text-lg md:text-xl">
              (Sia)
            </span>
          </h1>
          <p className="mt-4 text-muted-light leading-relaxed">
            I'm a <span className="text-foreground">Cloud Architect</span>{' '}
            working on the infrastructure behind enterprise data and AI platforms.
            At Continental, I connect Salesforce, Azure, and SAP with platforms
            such as Databricks, helping teams across 57 countries build and
            operate with confidence.
          </p>
          <p className="mt-3 text-muted-light leading-relaxed">
            I lead a small global team across the USA, Germany, India, and
            Malaysia. Together, we work on the less-visible but essential parts
            of modern platforms: secure APIs, AKS, private networking, identity,
            and the automation that keeps everything moving.
          </p>
          <p className="mt-3 text-muted-light leading-relaxed">
            Over 9+ years, I've worked across infrastructure, automation, data,
            and AI—from mining operations in Iran to automotive R&D in Germany.
            Outside of work, you'll usually find me building a side project,
            experimenting with AI dev tools, or reading books that make
            engineering feel a bit more human.
          </p>
        </div>
        <div className="mt-2 md:mt-0 flex-shrink-0">
          <img
            src="/IMG-website_edited.jpg"
            alt="Babak presenting at DevCord"
            className="w-full md:w-48 rounded-lg shadow-md"
          />
        </div>
      </div>
    </section>
  );
}
