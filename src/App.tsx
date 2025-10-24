import Hero from './components/Hero';
import SectionCard from './components/SectionCard';
import Projects from './components/Projects';
import WorkExperience from './components/WorkExperience';
import Hobbies from './components/Hobbies';
import { useState } from 'react';

function App() {
  const [hobbiesHasSelected, setHobbiesHasSelected] = useState(false);
  const [projectsHasSelected, setProjectsHasSelected] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900">
      <Hero />

      <section className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 mb-4">
              Explore My World
            </h2>
          </div>

          <div className="space-y-6">
            <SectionCard
              title="My Projects"
              backgroundImage="https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1920"
              hideTitle={projectsHasSelected}
            >
              <Projects onStateChange={setProjectsHasSelected} />
            </SectionCard>

            <SectionCard
              title="Work Experience"
              backgroundImage="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920"
            >
              <WorkExperience />
            </SectionCard>

            <SectionCard
              title="My Hobbies"
              backgroundImage="https://images.pexels.com/photos/1415268/pexels-photo-1415268.jpeg?auto=compress&cs=tinysrgb&w=1920"
              hideTitle={hobbiesHasSelected}
            >
              <Hobbies onStateChange={setHobbiesHasSelected} />
            </SectionCard>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-slate-950 border-t border-slate-800">
        <div className="container mx-auto px-6 text-center">
          <p className="text-slate-400 mb-6">
            Designed and built by <span className="text-amber-400 font-semibold">Konstantin Kunak</span>
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="https://www.instagram.com/otes_konstantin/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-amber-400 transition-colors duration-300 hover:scale-110 transform"
            >
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/in/konstantyn-kunak-59a96a348/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-amber-400 transition-colors duration-300 hover:scale-110 transform"
            >
              LinkedIn
            </a>
            <a
              href="https://www.upwork.com/freelancers/~011a68a6f2b0f4ccb2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-amber-400 transition-colors duration-300 hover:scale-110 transform"
            >
              Upwork
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
