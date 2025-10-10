import { Helmet } from 'react-helmet-async'
import Navigation from './components/Navigation'
import Home from './pages/Home'

export default function App() {
  return (
    <>
      <Helmet>
        <title>Babak Barghi | Software Solutions Architect</title>
        <meta name="description" content="AI | Data | Cloud" />
      </Helmet>

      <div className="min-h-screen max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-16">
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1.5fr]">
          {/* Sidebar - Mobile: Full width at top, Desktop: Fixed side */}
          <aside className="relative lg:fixed lg:h-screen py-8 lg:py-20 lg:pr-12 w-full lg:w-auto">
            <div className="flex flex-col h-full lg:max-w-none">
              {/* Logo/Name */}
              <div className="mb-8 lg:mb-32">
                <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-slate-200 mb-2 lg:mb-4">Babak Barghi</h1>
                <h2 className="text-lg lg:text-xl text-orange-400 mb-3 lg:mb-6">Software Solutions Architect</h2>
                <p className="text-sm lg:text-base text-slate-400 leading-relaxed">
                  AI | Data | Cloud
                </p>
              </div>

              {/* Navigation */}
              <Navigation />

              {/* Contact Info */}
              <div className="mt-8 lg:mt-auto space-y-4">
                <div className="flex items-center space-x-3 min-h-[44px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                       className="flex-shrink-0">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>Germany</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 flex space-x-6 sm:space-x-8">
                <a href="https://github.com/BabakBar" target="_blank" rel="noopener noreferrer"
                   className="text-slate-400 hover:text-orange-400 transition-all duration-300 hover:-translate-y-1 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a href="https://linkedin.com/in/babakbarghi" target="_blank" rel="noopener noreferrer"
                   className="text-slate-400 hover:text-orange-400 transition-all duration-300 hover:-translate-y-1 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="mt-12 lg:mt-0 lg:col-start-2 py-8 lg:py-20 lg:pl-16">
            <div className="prose prose-invert max-w-none">
              <Home />
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
