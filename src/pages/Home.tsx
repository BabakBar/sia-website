import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import GitHubRepos from '@/components/sections/GitHubRepos';

export default function Home() {
  return (
    <div className="space-y-8">
      <Hero />
      <Projects />
      <GitHubRepos />
    </div>
  );
}
