import { useEffect, useRef } from 'react';
import { Outlet, useLocation, useMatch, useNavigationType } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import { posts } from '@/content/posts';

export default function Layout() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  const blogIndex = useMatch('/blog');
  const article = useMatch('/blog/:slug');
  const isBlog = blogIndex || posts.some(post => post.slug === article?.params.slug);
  const main = useRef<HTMLElement>(null);
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (previousPath.current !== pathname && navigationType !== 'POP') {
      main.current?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    previousPath.current = pathname;
  }, [pathname, navigationType]);

  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        Skip to content
      </a>

      <div className={isBlog ? 'blog-shell' : undefined}>
        <div className={`min-h-screen px-6 md:px-12 ${isBlog ? 'lg:px-16' : 'lg:px-24'} max-w-3xl mx-auto`}>
          <Header />
          <main ref={main} id="content" tabIndex={-1} className="py-8">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
