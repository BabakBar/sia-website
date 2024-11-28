import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Babak Barghi | AI Solutions Architect',
  description: 'Digital Transformation Expert with expertise in AI, machine learning, and software development',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#0a192f] text-slate-400 antialiased">
        <div className="min-h-screen max-w-[1200px] mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-[1fr_1.5fr]">
            {/* Sidebar */}
            <aside className="fixed h-screen py-20 pr-12">
              <div className="flex flex-col h-full">
                {/* Logo/Name */}
                <div className="mb-32">
                  <h1 className="text-6xl font-bold text-slate-200 mb-4">Babak Barghi</h1>
                  <h2 className="text-2xl text-orange-400 mb-6">AI Solutions Architect</h2>
                  <p className="text-lg text-slate-400 leading-relaxed">
                    Digital Transformation Expert
                  </p>
                </div>

                {/* Navigation */}
                <nav className="space-y-10">
                  <a href="#about" className="group flex items-start text-lg text-slate-400 hover:text-slate-200 transition-colors duration-300">
                    <span className="font-mono text-orange-400 opacity-60 mr-4 text-sm pt-1.5">01.</span>
                    <span className="relative uppercase tracking-wider">
                      ABOUT
                      <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </a>
                  <a href="#experience" className="group flex items-start text-lg text-slate-400 hover:text-slate-200 transition-colors duration-300">
                    <span className="font-mono text-orange-400 opacity-60 mr-4 text-sm pt-1.5">02.</span>
                    <span className="relative uppercase tracking-wider">
                      EXPERIENCE
                      <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </a>
                </nav>

                {/* Contact Info */}
                <div className="mt-auto space-y-4">
                  <a href="mailto:babak.barghi@conti.de" 
                     className="flex items-center space-x-3 text-slate-400 hover:text-orange-400 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span>babak.barghi@conti.de</span>
                  </a>
                  <a href="tel:+4915758271210" 
                     className="flex items-center space-x-3 text-slate-400 hover:text-orange-400 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span>+49-15758271210</span>
                  </a>
                  <div className="flex items-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>Hannover, Germany</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 flex space-x-8">
                  <a href="https://github.com/BabakBar" target="_blank" rel="noopener noreferrer" 
                     className="text-slate-400 hover:text-orange-400 transition-all duration-300 hover:-translate-y-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                  <a href="https://linkedin.com/in/babakbarghi" target="_blank" rel="noopener noreferrer" 
                     className="text-slate-400 hover:text-orange-400 transition-all duration-300 hover:-translate-y-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                  <a href="https://babakbar.github.io" target="_blank" rel="noopener noreferrer" 
                     className="text-slate-400 hover:text-orange-400 transition-all duration-300 hover:-translate-y-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="col-start-2 py-20 pl-16">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
