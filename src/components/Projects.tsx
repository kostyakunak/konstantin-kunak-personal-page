import { useEffect, useState } from 'react';
import { supabase, Project } from '../lib/supabase';
import { ExternalLink, ArrowLeft } from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching projects:', error);
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (selectedProject) {
    return (
      <div className="animate-slideUp">
        <button
          onClick={() => setSelectedProject(null)}
          className="mb-8 flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </button>

        <div className="max-w-4xl">
          {selectedProject.image_url && (
            <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={selectedProject.image_url}
                alt={selectedProject.title}
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          <h2 className="text-4xl font-bold text-white mb-4">{selectedProject.title}</h2>

          <div className="flex flex-wrap gap-2 mb-6">
            {selectedProject.technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium border border-amber-500/30"
              >
                {tech}
              </span>
            ))}
          </div>

          {selectedProject.demo_url && (
            <a
              href={selectedProject.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 mb-8"
            >
              <ExternalLink className="w-5 h-5" />
              View Live Demo
            </a>
          )}

          <div className="prose prose-invert prose-amber max-w-none">
            <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
              {selectedProject.full_description}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {projects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-400 text-lg">No projects yet. Check back soon!</p>
        </div>
      ) : (
        projects.map((project, index) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 cursor-pointer hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 border border-slate-700/50 hover:border-amber-500/50"
            style={{
              animation: `slideUp 0.5s ease-out ${index * 0.1}s both`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

            <div className="relative flex flex-col md:flex-row gap-6">
              {project.image_url && (
                <div className="md:w-48 h-48 flex-shrink-0 rounded-xl overflow-hidden">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}

              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-slate-400 mb-4 line-clamp-3">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-slate-700/50 text-amber-400 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="px-3 py-1 bg-slate-700/50 text-slate-400 rounded-full text-xs">
                      +{project.technologies.length - 5} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <ExternalLink className="w-6 h-6 text-amber-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
