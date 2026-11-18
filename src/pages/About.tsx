import { Helmet } from 'react-helmet-async';
import { profile } from '@/content/profile';
import { ABOUT_META } from '@/lib/seo';

export default function About() {
  return (
    <article className="space-y-6">
      <Helmet>
        <title>{ABOUT_META.title}</title>
        <meta name="description" content={profile.description} />
      </Helmet>
      <h1 className="text-3xl font-bold">About me</h1>
      <p className="text-muted-light">
        I’m {profile.name}, also known as {profile.alternateName}, a {profile.role} based in {profile.location}. I work
        on the infrastructure behind enterprise data and AI platforms.
      </p>
      <p className="text-muted-light">
        At {profile.employer}, I own the global Salesforce–Azure–SAP integration platform, which securely feeds AI and
        data platforms such as Databricks for teams across 57 countries. I lead a small global team across the USA,
        Germany, India, and Malaysia.
      </p>
      <h2 className="text-xl font-bold">What I work on</h2>
      <p className="text-muted-light">
        Secure APIs, AKS, private networking, identity, and the automation that keeps platforms moving. I’m interested
        in the decisions that make a system easier to operate and useful to the people relying on it.
      </p>
      <p className="text-muted-light">
        Over 9 years, I’ve worked across infrastructure, automation, data, and AI—from mining operations in Iran to
        automotive R&amp;D in Germany. Outside work, I build side projects, experiment with AI development tools, and
        read about systems, delivery, and decision-making.
      </p>
      <p>
        <a href="/#work" className="text-accent-light underline underline-offset-4">
          See selected work
        </a>
        {' · '}
        <a href={profile.linkedin} className="text-accent-light underline underline-offset-4">
          LinkedIn
        </a>
        {' · '}
        <a href={profile.email} className="text-accent-light underline underline-offset-4">
          Get in touch
        </a>
      </p>
    </article>
  );
}
