import { Link } from 'react-router';
import { profile } from '@/content/profile';

export default function Hero() {
  return (
    <section className="py-8">
      <div className="flex flex-col md:flex-row md:items-start gap-8 max-w-3xl">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Hi, I'm Babak <span className="text-muted-light font-normal text-lg md:text-xl">(Sia)</span>
          </h1>
          <p className="mt-4 text-muted-light leading-relaxed">
            I’m a <span className="text-foreground">{profile.role}</span> in Hannover, building the infrastructure
            behind enterprise data and AI platforms.
          </p>
          <p className="mt-3 text-muted-light leading-relaxed">
            At {profile.employer}, I own the global Salesforce–Azure–SAP integration platform, securely feeding
            platforms such as Databricks across 57 countries. Outside work, I build practical tools for cities and
            manufacturing.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <a href="#work" className="text-accent-light underline underline-offset-4">
              Explore my work ↓
            </a>
            <Link to="/about" className="text-muted-light underline underline-offset-4">
              More about me
            </Link>
          </div>
        </div>
        <div className="mt-2 md:mt-0 flex-shrink-0">
          <img
            src="/IMG-website_edited.jpg"
            srcSet="/IMG-website_edited-384.webp 384w, /IMG-website_edited-768.webp 768w, /IMG-website_edited-1280.webp 1280w"
            sizes="(min-width: 768px) 192px, calc(100vw - 3rem)"
            alt="Babak presenting at DevCord"
            className="w-full md:w-48 rounded-lg shadow-md"
            width="2268"
            height="3083"
            decoding="async"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
