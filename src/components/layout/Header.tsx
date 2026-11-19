import { NavLink } from 'react-router';
import { posts } from '@/content/posts';
import SocialIcons from '../ui/SocialIcons';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'inline-flex min-h-11 items-center text-foreground underline underline-offset-4'
    : 'inline-flex min-h-11 items-center text-muted hover:text-accent-light transition-colors';

export default function Header() {
  return (
    <header className="flex items-center justify-between py-6">
      <nav aria-label="Main" className="flex items-center gap-4 sm:gap-6 text-sm">
        <NavLink to="/" className={navLinkClass}>
          home
        </NavLink>
        <NavLink to="/about" className={navLinkClass}>
          about
        </NavLink>
        {posts.length > 0 && (
          <NavLink to="/blog" className={navLinkClass}>
            posts
          </NavLink>
        )}
      </nav>
      <SocialIcons />
    </header>
  );
}
