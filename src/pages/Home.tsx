import Hero from '@/components/sections/Hero';
import FavoriteBooks from '@/components/sections/FavoriteBooks';
import SelectedWork from '@/components/sections/SelectedWork';

export default function Home() {
  return (
    <div className="space-y-8">
      <Hero />
      <SelectedWork />
      <FavoriteBooks />
    </div>
  );
}
