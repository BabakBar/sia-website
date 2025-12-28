import Hero from '@/components/sections/Hero';
import GitHubRepos from '@/components/sections/GitHubRepos';

export default function Home() {
  return (
    <div className="space-y-8">
      <Hero />
      <GitHubRepos />
    </div>
  );
}
