import { NavLink } from 'react-router';
import SocialIcons from '../ui/SocialIcons';

export default function Header() {
  return (
    <header className="flex items-center justify-between py-6">
      <nav className="flex items-center gap-6 text-sm">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'text-foreground underline underline-offset-4'
              : 'text-muted hover:text-foreground transition-colors'
          }
        >
          home
        </NavLink>
        <NavLink
          to="/blog"
          className={({ isActive }) =>
            isActive
              ? 'text-foreground underline underline-offset-4'
              : 'text-muted hover:text-foreground transition-colors'
          }
        >
          blog
        </NavLink>
      </nav>
      <SocialIcons />
    </header>
  );
}
