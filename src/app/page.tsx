export default function Home() {
  return (
    <div className="space-y-40">
      {/* About Section */}
      <section id="about" className="space-y-12">
        <div className="space-y-8">
          <p className="text-xl leading-relaxed">
            {"I'm an AI Solutions Architect and Digital Transformation Expert with a robust 6-year track record in driving Industry 4.0 innovations. My expertise lies in designing and automating complex processes, with a focus on practical AI applications, machine learning models, and intuitive software development."}
          </p>

          <p className="text-xl leading-relaxed">
            Currently, I&apos;m an{' '}
            <span className="text-orange-400 font-medium">
              AI Production Planning Strategist
            </span>{' '}
            at Continental Tires IT in Hannover, where I conduct strategic analysis of AI applications in production planning, focusing on improving accuracy and operational efficiency aligned with the company&apos;s 2030 vision.
          </p>

          <p className="text-xl leading-relaxed">
            My journey spans from software implementation at{' '}
            <span className="text-orange-400 font-medium">Auto IT</span> to AI research at{' '}
            <span className="text-orange-400 font-medium">TechTalentLab</span>. I&apos;m AWS Cloud Practitioner certified and passionate about creating innovative, scalable intelligent systems that drive business transformation.
          </p>
        </div>

        <div className="space-y-6">
          <h3 className="font-mono text-orange-400 text-lg">Core Tech Stack:</h3>
          <div className="grid grid-cols-3 gap-4 max-w-[600px]">
            {[
              'Python', 'AWS', 'LLMs', 'ASP.NET', 'Angular', 'C#',
              'Docker', 'Terraform', 'Git', 'SQL', 'SAP', 'REST APIs'
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
                <span className="text-slate-200">AI Production Planning Strategist</span>{' '}
                <span className="text-orange-400">@ Continental Tires IT</span>
              </h3>
              <p className="font-mono text-orange-400/75">09/2022 — Present</p>
            </div>
            <ul className="space-y-6">
              {[
                'Leading strategic analysis of AI applications in production planning, focusing on accuracy and operational efficiency improvements',
                'Developing and implementing machine learning models for production optimization',
                'Aligning AI initiatives with Continental\'s 2030 vision for digital transformation'
              ].map((point, index) => (
                <li key={index} className="flex items-start space-x-4 group/item">
                  <span className="text-orange-400 mt-2 transform group-hover/item:translate-x-2 transition-transform duration-300">▹</span>
                  <span className="text-lg leading-relaxed group-hover/item:text-slate-200 transition-colors duration-300">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="group space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold">
                <span className="text-slate-200">Data Scientist</span>{' '}
                <span className="text-orange-400">@ Tires R&D</span>
              </h3>
              <p className="font-mono text-orange-400/75">2020 — 2022</p>
            </div>
            <ul className="space-y-6">
              {[
                'Developed innovative data pipelines for Rubber Technology Group, enhancing machine learning processes',
                'Led AI research in e-recruitment with focus on Natural Language Understanding',
                'Created advanced chatbots for Ph.D. candidate enrollments using cutting-edge NLP techniques'
              ].map((point, index) => (
                <li key={index} className="flex items-start space-x-4 group/item">
                  <span className="text-orange-400 mt-2 transform group-hover/item:translate-x-2 transition-transform duration-300">▹</span>
                  <span className="text-lg leading-relaxed group-hover/item:text-slate-200 transition-colors duration-300">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="group space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold">
                <span className="text-slate-200">Software Implementation Expert</span>{' '}
                <span className="text-orange-400">@ Fanap</span>
              </h3>
              <p className="font-mono text-orange-400/75">2018 — 2020</p>
            </div>
            <ul className="space-y-6">
              {[
                'Led ERP supply chain module deployment for MIDHCO Mining holdings',
                'Managed data migration and system integration for 7,000+ employees',
                'Streamlined processes and optimized data systems in Iran\'s largest IT project "MIDRP"'
              ].map((point, index) => (
                <li key={index} className="flex items-start space-x-4 group/item">
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
