export default function Hero() {
  return (
    <section className="py-8">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
        Hi, I'm Babak
      </h1>
      <p className="mt-4 text-muted leading-relaxed max-w-xl">
        I'm a Cloud engineer at{' '}
        <a
          href="https://www.continental.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-accent-light transition-colors"
        >
          Continental
        </a>{' '}
        working on enterprise-scale solutions with Python, AWS, Azure and Databricks.
        I started my career working across Iran, Spain, and Mexico before settling
        in Germany. Lately, I've been exploring AI developer tools and building
        side projects.
      </p>
    </section>
  );
}
