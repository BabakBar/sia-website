import { Outlet, useLocation } from 'react-router';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';
import { ABOUT_META, BLOG_META, HOME_META, SITE_URL, buildProfileJsonLd, serializeJsonLd } from '@/lib/seo';

export default function Layout() {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/$/, '') || '/';
  const isBlog = path === '/blog' || path.startsWith('/blog/');
  const meta = path === '/about' ? ABOUT_META : path === '/blog' ? BLOG_META : HOME_META;
  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={`${SITE_URL}${path}`} />
        <meta property="og:type" content="website" />
        <meta property="twitter:title" content={meta.title} />
        <meta property="twitter:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={`${SITE_URL}${path}`} />
        {(path === '/' || path === '/about') && (
          <script type="application/ld+json">{serializeJsonLd(buildProfileJsonLd(path))}</script>
        )}
      </Helmet>

      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        Skip to content
      </a>

      <div className={isBlog ? 'blog-shell' : undefined}>
        <div className={`min-h-screen px-6 md:px-12 ${isBlog ? 'lg:px-16' : 'lg:px-24'} max-w-3xl mx-auto`}>
          <Header />
          <main id="content" className="py-8">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
