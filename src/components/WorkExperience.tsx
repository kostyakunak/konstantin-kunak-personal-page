import { useEffect, useState } from 'react';
import { supabase, WorkExperience as WorkExp } from '../lib/supabase';
import { Briefcase, Calendar } from 'lucide-react';

export default function WorkExperience() {
  const [experiences, setExperiences] = useState<WorkExp[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    const { data, error } = await supabase
      .from('work_experiences')
      .select('*')
      .order('start_date', { ascending: false });

    if (error) {
      console.error('Error fetching work experiences:', error);
    } else {
      setExperiences(data || []);
    }
    setLoading(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (experiences.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400 text-lg">No work experience added yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-1 space-y-6">
        <h2 className="text-3xl font-bold text-white mb-6">My Journey</h2>
        <p className="text-slate-400 leading-relaxed">
          A timeline of my professional experience, showcasing the diverse roles and
          responsibilities I've undertaken throughout my career.
        </p>
      </div>

      <div className="lg:col-span-2 relative">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500 via-orange-500 to-transparent hidden md:block" />

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="relative pl-0 md:pl-12 group"
              style={{
                animation: `slideUp 0.5s ease-out ${index * 0.15}s both`,
              }}
            >
              <div className="absolute left-0 top-6 w-4 h-4 bg-amber-500 rounded-full border-4 border-slate-900 hidden md:block group-hover:scale-150 transition-transform duration-300" />

              <div className="absolute left-0 top-6 w-4 h-4 bg-amber-500 rounded-full animate-ping hidden md:block opacity-0 group-hover:opacity-75" />

              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700/50 hover:border-amber-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-amber-500/10">
                <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {exp.position}
                    </h3>
                    <div className="flex items-center gap-2 text-amber-400 mt-1">
                      <Briefcase className="w-4 h-4" />
                      <span className="font-medium">{exp.company}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400 bg-slate-800/50 px-4 py-2 rounded-full">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : 'Present'}
                    </span>
                  </div>
                </div>

                <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {exp.description}
                </div>

                <div className="mt-4 h-1 w-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full group-hover:w-full transition-all duration-700" />
              </div>
            </div>
          ))}
        </div>

        <div className="absolute left-0 bottom-0 w-4 h-4 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full hidden md:block animate-pulse" />
      </div>
    </div>
  );
}
