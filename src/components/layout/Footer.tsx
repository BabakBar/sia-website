export default function Footer() {
  return (
    <footer className="py-8 mt-16 border-t border-muted/20">
      <div className="flex items-center justify-between text-sm text-muted">
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/BabakBar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-light transition-colors"
          >
            ↗ github
          </a>
        </div>
        <span>© {new Date().getFullYear()} Babak Barghi</span>
      </div>
    </footer>
  );
}
