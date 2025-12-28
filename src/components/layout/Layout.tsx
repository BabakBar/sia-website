import { Outlet } from 'react-router';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <>
      <Helmet>
        <title>Babak Barghi</title>
        <meta
          name="description"
          content="Babak Barghi — Cloud & AI Engineer. Architecting intelligent systems."
        />
      </Helmet>

      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        Skip to content
      </a>

      <div className="min-h-screen px-6 md:px-12 lg:px-24 max-w-3xl mx-auto">
        <Header />
        <main id="content" className="py-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
