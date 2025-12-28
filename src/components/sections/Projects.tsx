import type { Project } from '@/types';
import ProjectCard from '../ui/ProjectCard';

const projects: Project[] = [
  {
    title: 'BoringHannover',
    description: 'Weekly events aggregator for Hannover',
    url: 'https://boringhannover.de',
  },
  {
    title: 'AutoSpendTracker',
    description: 'AI-powered finance tracker',
    url: 'https://github.com/BabakBar/AutoSpendTracker',
  },
  {
    title: 'Orixa',
    description: 'LLM-based marketing analysis',
    url: 'https://github.com/BabakBar/Orixa',
  },
];

export default function Projects() {
  return (
    <section className="py-8">
      <h2 className="text-xl font-bold mb-4">Projects</h2>
      <div className="grid gap-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
