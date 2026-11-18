import { selectedWork } from '@/content/profile';

export default function SelectedWork() {
  return (
    <section id="work" className="scroll-mt-8 py-8" aria-labelledby="work-title">
      <h2 id="work-title" className="text-xl font-bold">
        Selected work
      </h2>
      <p className="mt-3 text-muted-light">Practical systems for cities and manufacturing.</p>
      <div className="mt-6 divide-y divide-foreground/10">
        {selectedWork.map(work => (
          <article key={work.title} className="py-6 first:pt-0">
            <p className="text-xs text-muted">{work.context}</p>
            <h3 className="mt-2 text-lg font-semibold">{work.title}</h3>
            <p className="mt-2 text-foreground">{work.problem}</p>
            <p className="mt-2 text-sm text-muted-light">{work.approach}</p>
            <a href={work.url} className="mt-3 inline-block text-sm text-accent-light underline underline-offset-4">
              {work.linkLabel} ↗
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
