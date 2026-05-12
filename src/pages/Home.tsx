import Hero from '@/components/sections/Hero';
import FavoriteBooks from '@/components/sections/FavoriteBooks';
import GitHubRepos from '@/components/sections/GitHubRepos';

export default function Home() {
  return (
    <div className="space-y-8">
      <Hero />
      <GitHubRepos />
      <FavoriteBooks />
    </div>
  );
}
