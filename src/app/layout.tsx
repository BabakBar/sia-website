import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sia | Python Developer',
  description: 'Personal portfolio website showcasing my work and experience as a Python Developer',
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
                  <h1 className="text-6xl font-bold text-slate-200 mb-4">Sia</h1>
                  <h2 className="text-2xl text-orange-400 mb-6">Python Developer</h2>
                  <p className="text-lg text-slate-400 leading-relaxed">
                    I build scalable applications and data solutions.
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

                {/* Social Links */}
                <div className="mt-auto flex space-x-8">
                  <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" 
                     className="text-slate-400 hover:text-orange-400 transition-all duration-300 hover:-translate-y-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                  <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" 
                     className="text-slate-400 hover:text-orange-400 transition-all duration-300 hover:-translate-y-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                  <a href="mailto:your.email@example.com" 
                     className="text-slate-400 hover:text-orange-400 transition-all duration-300 hover:-translate-y-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
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
