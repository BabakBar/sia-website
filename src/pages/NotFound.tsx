import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <div>
      <Helmet>
        <title>Page not found | Babak Barghi</title>
      </Helmet>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
        Page not found
      </h1>
      <p className="text-muted-light">
        Nothing lives at this URL.{' '}
        <Link to="/" className="text-foreground underline">
          Back to home
        </Link>
      </p>
    </div>
  );
}
