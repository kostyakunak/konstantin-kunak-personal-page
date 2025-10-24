import { useEffect, useRef, useState } from 'react';
import { Sparkles, Code, Users } from 'lucide-react';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cometOffsets, setCometOffsets] = useState<Array<{ x: number; y: number }>>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  const cometRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Вычисляем отталкивание для каждой кометы
    const newOffsets = cometRefs.current.map((cometRef) => {
      if (!cometRef) return { x: 0, y: 0 };

      const cometRect = cometRef.getBoundingClientRect();
      const heroRect = heroRef.current?.getBoundingClientRect();
      
      if (!heroRect) return { x: 0, y: 0 };

      // Центр кометы относительно Hero контейнера
      const cometX = cometRect.left - heroRect.left + cometRect.width / 2;
      const cometY = cometRect.top - heroRect.top + cometRect.height / 2;

      // Расстояние до курсора
      const dx = cometX - mousePosition.x;
      const dy = cometY - mousePosition.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Радиус влияния магнита (в 3 раза больше)
      const magnetRadius = 600;
      
      if (distance < magnetRadius && distance > 0) {
        // Очень мягкая сила отталкивания (как кисть с жесткостью 0)
        // Используем кубическую функцию для максимальной плавности
        const normalizedDistance = distance / magnetRadius;
        const softness = Math.pow(1 - normalizedDistance, 3);
        const force = softness * 30; // Уменьшена максимальная сила
        
        // Направление отталкивания (от курсора)
        const angle = Math.atan2(dy, dx);
        
        return {
          x: Math.cos(angle) * force,
          y: Math.sin(angle) * force,
        };
      }

      return { x: 0, y: 0 };
    });

    setCometOffsets(newOffsets);
  }, [mousePosition]);

  return (
    <div
      ref={heroRef}
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(251, 191, 36, 0.15), transparent 40%)`,
        }}
      />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => {
          const animationName = `shootingStar${(i % 5) + 1}`;
          const duration = 6 + (i * 1.5);
          const delay = i * 2.5;
          const offset = cometOffsets[i] || { x: 0, y: 0 };
          
          return (
            <div
              key={i}
              className="absolute"
              style={{
                animation: `${animationName} ${duration}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
                top: '-50px',
                left: '-50px',
              }}
            >
              <div 
                ref={(el) => (cometRefs.current[i] = el)}
                className="relative transition-transform duration-300 ease-out"
                style={{
                  transform: `translate(${offset.x}px, ${offset.y}px)`,
                }}
              >
                {/* Голова кометы */}
                <div className="w-2 h-2 bg-amber-400 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.6)]" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20 flex flex-col lg:flex-row items-center justify-between min-h-screen">
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <div className="space-y-2">
            <h1 className="text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 animate-gradient">
              Konstantin Kunak
            </h1>
            <p className="text-2xl lg:text-3xl text-slate-300 font-light">
              Full Stack Developer & Tech Enthusiast
            </p>
          </div>

          <div className="flex items-center gap-2 text-slate-400 justify-center lg:justify-start">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500"></div>
            <span className="text-sm uppercase tracking-wider">Certified Specialist</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500"></div>
          </div>

          <p className="text-slate-400 text-sm">
            DNU University • Collegium Civitas
          </p>

          <div className="space-y-6 max-w-2xl mx-auto lg:mx-0">
            <h2 className="text-2xl font-semibold text-slate-300 justify-center lg:justify-start">
              From a Bird's Eye View
            </h2>

            <div className="space-y-4 text-slate-300">
              <div className="group hover:translate-x-2 transition-transform duration-300">
                <div className="flex items-start gap-3">
                  <Code className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1 group-hover:rotate-12 transition-transform" />
                  <div>
                    <h3 className="font-semibold text-amber-300 mb-1">A Tech Optimist</h3>
                    <p className="text-slate-400 leading-relaxed">
                      I think that salvation lies in technological growth, and that continuing to build
                      on the advancements of our forefathers will solve most of our problems.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group hover:translate-x-2 transition-transform duration-300">
                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1 group-hover:rotate-12 transition-transform" />
                  <div>
                    <h3 className="font-semibold text-amber-300 mb-1">A Socialite</h3>
                    <p className="text-slate-400 leading-relaxed">
                      I'm great at meeting people, delivering talks, and building relationships.
                      My friends often marvel at how easily I strike up conversations with strangers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group hover:translate-x-2 transition-transform duration-300">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1 group-hover:rotate-12 transition-transform" />
                  <div>
                    <h3 className="font-semibold text-amber-300 mb-1">An Opportunist</h3>
                    <p className="text-slate-400 leading-relaxed">
                      Most of my successes involve me stumbling on, and then taking advantage of,
                      short term opportunities. In simple terms, I act first, and figure things out later.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 mt-12 lg:mt-0 lg:ml-16">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <div className="relative">
              <img
                src="/WAN01082.png"
                alt="Konstantin Kunak"
                className="w-80 h-[32rem] lg:w-96 lg:h-[36rem] rounded-2xl object-cover border-4 border-slate-800 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-amber-500 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-amber-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
