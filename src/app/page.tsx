export default function Home() {
  return (
    <div className="space-y-40">
      {/* About Section */}
      <section id="about" className="space-y-12">
        <div className="space-y-8">
          <p className="text-xl leading-relaxed">
            I'm a developer passionate about crafting accessible, pixel-perfect
            applications that blend thoughtful design with robust engineering.
            My favorite work lies at the intersection of scalable architecture and
            efficient solutions, creating experiences that are meticulously
            built for performance and usability.
          </p>

          <p className="text-xl leading-relaxed">
            Currently, I'm a Senior Python Developer at{' '}
            <a href="#" className="text-orange-400 hover:text-red-400 transition-colors duration-300 font-medium">
              Company Name
            </a>
            , specializing in building scalable microservices and data pipelines.
            I contribute to the development and maintenance of robust backend systems,
            ensuring our platform meets high performance standards and best practices.
          </p>

          <p className="text-xl leading-relaxed">
            In the past, I've had the opportunity to develop software across
            various settings — from{' '}
            <span className="text-orange-400 font-medium">advertising agencies</span> and{' '}
            <span className="text-orange-400 font-medium">large corporations</span> to{' '}
            <span className="text-orange-400 font-medium">start-ups</span>. Additionally,
            I also released a{' '}
            <a href="#" className="text-orange-400 hover:text-red-400 transition-colors duration-300 font-medium">
              comprehensive video course
            </a>
            {' '}guiding learners through building scalable Python applications.
          </p>
        </div>

        <div className="space-y-6">
          <h3 className="font-mono text-orange-400 text-lg">Technologies I work with:</h3>
          <div className="grid grid-cols-3 gap-4 max-w-[600px]">
            {[
              'Python', 'Django', 'FastAPI', 'PostgreSQL',
              'Docker', 'AWS', 'Redis', 'Elasticsearch'
            ].map((tech) => (
              <div key={tech} 
                   className="group relative px-4 py-2 bg-orange-400/5 rounded-full border border-orange-400/20 
                            hover:border-orange-400/40 transition-all duration-300">
                <div className="absolute inset-0 bg-orange-400/5 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <span className="relative text-lg font-mono text-slate-300 group-hover:text-orange-400 transition-colors duration-300">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="space-y-20">
        <div className="space-y-16">
          <div className="group space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold">
                <span className="text-slate-200">Senior Python Developer</span>{' '}
                <span className="text-orange-400">@ Current Company</span>
              </h3>
              <p className="font-mono text-orange-400/75">2022 — Present</p>
            </div>
            <ul className="space-y-6">
              {[
                'Architected and implemented scalable microservices using Python and FastAPI, improving system performance by 40%',
                'Led the development of automated testing pipelines, reducing deployment time by 60% and improving code quality',
                'Designed and maintained cloud infrastructure on AWS using Infrastructure as Code principles'
              ].map((point, i) => (
                <li key={i} className="flex items-start space-x-4 group/item">
                  <span className="text-orange-400 mt-2 transform group-hover/item:translate-x-2 transition-transform duration-300">▹</span>
                  <span className="text-lg leading-relaxed group-hover/item:text-slate-200 transition-colors duration-300">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="group space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold">
                <span className="text-slate-200">Python Developer</span>{' '}
                <span className="text-orange-400">@ Previous Company</span>
              </h3>
              <p className="font-mono text-orange-400/75">2020 — 2022</p>
            </div>
            <ul className="space-y-6">
              {[
                'Developed and maintained high-traffic Django applications serving thousands of users daily',
                'Optimized database queries and implemented caching strategies, resulting in 50% faster page load times',
                'Collaborated with cross-functional teams to implement new features and improve existing functionality'
              ].map((point, i) => (
                <li key={i} className="flex items-start space-x-4 group/item">
                  <span className="text-orange-400 mt-2 transform group-hover/item:translate-x-2 transition-transform duration-300">▹</span>
                  <span className="text-lg leading-relaxed group-hover/item:text-slate-200 transition-colors duration-300">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
