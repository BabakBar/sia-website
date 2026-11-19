import Hero from '@/components/sections/Hero';
import PageMetadata from '@/components/layout/PageMetadata';
import FavoriteBooks from '@/components/sections/FavoriteBooks';
import SelectedWork from '@/components/sections/SelectedWork';

export default function Home() {
  return (
    <div className="space-y-8">
      <PageMetadata page="home" />
      <Hero />
      <SelectedWork />
      <FavoriteBooks />
    </div>
  );
}
