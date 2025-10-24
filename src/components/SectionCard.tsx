import { ReactNode, useState } from 'react';
import { X } from 'lucide-react';

interface SectionCardProps {
  title: string;
  children: ReactNode;
  backgroundImage?: string;
}

export default function SectionCard({ title, children, backgroundImage }: SectionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsExpanded(true)}
        className="relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500 transform hover:translate-x-2 group h-32"
      >
        {backgroundImage && (
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/85 to-slate-900/60 group-hover:from-slate-900/90 group-hover:via-slate-900/70 group-hover:to-slate-900/40 transition-all duration-500" />

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent" />
        </div>

        <div className="relative z-10 h-full flex items-center px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white transform group-hover:translate-x-4 transition-transform duration-500">
            {title}
          </h2>
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="w-8 h-0.5 bg-amber-400"></div>
          </div>
        </div>

        <div className="absolute left-0 bottom-0 w-1 h-0 bg-gradient-to-t from-amber-400 to-orange-500 group-hover:h-full transition-all duration-500" />
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
              <div className="mb-8">
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
