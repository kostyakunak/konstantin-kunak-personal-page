import { ReactNode, useState } from 'react';
import { X } from 'lucide-react';

interface SectionCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  gradient: string;
}

export default function SectionCard({ title, icon, children, gradient }: SectionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsExpanded(true)}
        className={`
          relative overflow-hidden rounded-2xl cursor-pointer
          transition-all duration-500 transform hover:scale-105
          group h-64
          ${gradient}
        `}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40 group-hover:from-black/10 group-hover:to-black/30 transition-all duration-500" />

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `pulse ${2 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-white">
          <div className="transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 mb-4">
            {icon}
          </div>
          <h2 className="text-3xl font-bold text-center transform group-hover:translate-y-2 transition-transform duration-500">
            {title}
          </h2>
          <div className="mt-4 w-16 h-1 bg-white/50 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        </div>

        <div className="absolute inset-0 border-2 border-white/20 rounded-2xl group-hover:border-white/40 transition-colors duration-500" />
      </div>

      {isExpanded && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-sm animate-fadeIn"
          style={{ animation: 'fadeIn 0.3s ease-out' }}
        >
          <div className="relative h-full overflow-y-auto">
            <button
              onClick={() => setIsExpanded(false)}
              className="fixed top-6 right-6 z-50 p-3 bg-slate-800 hover:bg-slate-700 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-90 group"
            >
              <X className="w-6 h-6 text-amber-400" />
            </button>

            <div className="container mx-auto px-6 py-12">
              <div className="mb-8 flex items-center gap-4">
                <div className="text-amber-400">
                  {icon}
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                  {title}
                </h1>
              </div>

              <div className="animate-slideUp">
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
