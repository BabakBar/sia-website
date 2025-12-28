import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-4 -mx-4 rounded-lg hover:bg-foreground/5 transition-colors"
    >
      <h3 className="font-medium text-foreground group-hover:text-blue-400 transition-colors">
        {project.title}
      </h3>
      <p className="text-sm text-muted mt-1">{project.description}</p>
    </a>
  );
}
