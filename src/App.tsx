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
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Click on any section to dive deeper into my professional work, experience, and personal interests.
            </p>
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
          <p className="text-slate-400">
            Designed and built by <span className="text-amber-400 font-semibold">Konstantin Kunak</span>
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Tech optimist • Socialite • Opportunist
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
