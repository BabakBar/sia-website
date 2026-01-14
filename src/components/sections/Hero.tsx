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
            <span className="text-foreground">Cloud engineer</span> who builds
            platforms that data and AI teams actually want to use. Currently at
            Continental, where I architect Azure/AWS solutions and
            automate the boring stuff so engineers can focus on the interesting
            problems.
          </p>
          <p className="mt-3 text-muted-light leading-relaxed">
            8+ years shipping infra, automation, and Data/ML systems, from
            mining operations in Iran to tire R&D in Germany, with stops in Spain
            and Mexico along the way. Outside of work, you'll usually find me
            building a side project or experimenting with AI dev tools.
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
