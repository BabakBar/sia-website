'use client';

import { useEffect, useState } from 'react';

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const observers = new Map();
    const sections = ['about', 'experience'];

    // Create observers for each section
    sections.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                setActiveSection(sectionId);
              }
            });
          },
          {
            rootMargin: '-50% 0px -50% 0px' // Trigger when section is in middle of viewport
          }
        );

        observer.observe(section);
        observers.set(sectionId, observer);
      }
    });

    // Cleanup observers
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  return (
    <nav className="space-y-6 lg:space-y-10">
      <a 
        href="#about" 
        className={`group relative flex items-center text-sm lg:text-base hover:text-slate-200 transition-all duration-300 h-[32px] ${
          activeSection === 'about' ? 'text-orange-400' : 'text-slate-400'
        }`}
      >
        {/* Active section background effect */}
        <div className="relative flex items-center">
          <span 
            className={`absolute -inset-y-2 -left-3 -right-3 bg-orange-400/10 rounded-lg transition-all duration-300 ${
              activeSection === 'about' 
                ? 'opacity-100 scale-100 nav-active-bg' 
                : 'opacity-0 scale-95'
            }`}
          />
          <span className="font-mono text-orange-400 opacity-60 mr-4 text-sm relative z-10">01.</span>
          <span className="relative z-10 uppercase tracking-wider">
            ABOUT
          </span>
        </div>
      </a>
      <a 
        href="#experience" 
        className={`group relative flex items-center text-sm lg:text-base hover:text-slate-200 transition-all duration-300 h-[32px] ${
          activeSection === 'experience' ? 'text-orange-400' : 'text-slate-400'
        }`}
      >
        {/* Active section background effect */}
        <div className="relative flex items-center">
          <span 
            className={`absolute -inset-y-2 -left-3 -right-3 bg-orange-400/10 rounded-lg transition-all duration-300 ${
              activeSection === 'experience' 
                ? 'opacity-100 scale-100 nav-active-bg' 
                : 'opacity-0 scale-95'
            }`}
          />
          <span className="font-mono text-orange-400 opacity-60 mr-4 text-sm relative z-10">02.</span>
          <span className="relative z-10 uppercase tracking-wider">
            EXPERIENCE
          </span>
        </div>
      </a>
    </nav>
  );
}
