import type { FavoriteBook } from '@/types';

interface BookCardProps {
  book: FavoriteBook;
  index: number;
}

export default function BookCard({ book, index }: BookCardProps) {
  const authors = book.authors.join(', ');
  const Wrapper = book.openLibraryUrl ? 'a' : 'article';

  return (
    <Wrapper
      {...(book.openLibraryUrl
        ? {
            href: book.openLibraryUrl,
            target: '_blank',
            rel: 'noopener noreferrer',
          }
        : {})}
      className="group flex gap-4 rounded-2xl border border-foreground/10 bg-foreground/5 p-4 transition-colors hover:bg-foreground/8 md:items-start md:gap-6"
    >
      <div className="flex w-20 shrink-0 flex-col items-center gap-3 pt-1 md:w-24">
        <div className="text-[0.7rem] font-semibold tracking-[0.28em] text-muted">
          {(index + 1).toString().padStart(2, '0')}
        </div>

        <div className="relative h-28 w-20 overflow-hidden rounded-xl bg-[#14342c] shadow-sm md:h-32 md:w-24">
          {book.coverUrl ? (
            <img
              src={book.coverUrl}
              alt={`Cover of ${book.title}`}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              width="96"
              height="128"
            />
          ) : (
            <div className="flex h-full items-end bg-linear-to-br from-[#1f4a3f] via-[#17332b] to-[#0d1d19] p-3 text-[0.7rem] font-medium text-[#f3efe4]">
              {book.title}
            </div>
          )}
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[0.7rem] uppercase tracking-[0.28em] text-muted">Favorite read</p>
        <div className="mt-2 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-4">
          <h3 className="text-lg font-semibold leading-tight text-foreground group-hover:text-accent-light md:text-[1.7rem]">
            {book.title}
          </h3>
          {book.firstPublishYear && (
            <p className="shrink-0 text-[0.7rem] uppercase tracking-[0.24em] text-muted">
              {book.firstPublishYear}
            </p>
          )}
        </div>
        {authors && <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-light">by {authors}</p>}
        {book.subtitle && (
          <p className="mt-2 text-[0.95rem] text-muted">{book.subtitle}</p>
        )}
        <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-muted-light">{book.note}</p>
      </div>
    </Wrapper>
  );
}