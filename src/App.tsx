import Hero from './components/Hero';
import SectionCard from './components/SectionCard';
import Projects from './components/Projects';
import WorkExperience from './components/WorkExperience';
import Hobbies from './components/Hobbies';
import { Folder, Briefcase, Heart } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Hero />

      <section className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 mb-4">
              Explore My World
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Click on any section to dive deeper into my professional work, experience, and personal interests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <SectionCard
              title="My Projects"
              icon={<Folder className="w-16 h-16" />}
              gradient="bg-gradient-to-br from-amber-600 to-orange-600"
            >
              <Projects />
            </SectionCard>

            <SectionCard
              title="Work Experience"
              icon={<Briefcase className="w-16 h-16" />}
              gradient="bg-gradient-to-br from-orange-600 to-red-600"
            >
              <WorkExperience />
            </SectionCard>

            <SectionCard
              title="My Hobbies"
              icon={<Heart className="w-16 h-16" />}
              gradient="bg-gradient-to-br from-yellow-600 to-amber-600"
            >
              <Hobbies />
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
