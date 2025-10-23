import { useEffect, useState } from 'react';
import { supabase, Hobby } from '../lib/supabase';
import { Heart } from 'lucide-react';

export default function Hobbies() {
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHobbies();
  }, []);

  const fetchHobbies = async () => {
    const { data, error } = await supabase
      .from('hobbies')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching hobbies:', error);
    } else {
      setHobbies(data || []);
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

  if (hobbies.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400 text-lg">No hobbies added yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {hobbies.map((hobby, index) => (
        <article
          key={hobby.id}
          className="group"
          style={{
            animation: `slideUp 0.6s ease-out ${index * 0.2}s both`,
          }}
        >
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700/50 hover:border-amber-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-8 h-8 text-amber-500 group-hover:scale-110 group-hover:fill-amber-500 transition-all duration-300" />
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                {hobby.title}
              </h2>
            </div>

            {hobby.images && hobby.images.length > 0 && (
              <div className={`grid gap-4 mb-8 ${
                hobby.images.length === 1 ? 'grid-cols-1' :
                hobby.images.length === 2 ? 'grid-cols-2' :
                'grid-cols-2 lg:grid-cols-3'
              }`}>
                {hobby.images.map((image, imgIndex) => (
                  <div
                    key={imgIndex}
                    className="relative overflow-hidden rounded-xl aspect-video group/img"
                  >
                    <img
                      src={image}
                      alt={`${hobby.title} ${imgIndex + 1}`}
                      className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </div>
            )}

            <div className="prose prose-invert prose-amber max-w-none">
              <div className="text-slate-300 leading-relaxed whitespace-pre-wrap text-lg">
                {hobby.content}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
              <Heart className="w-4 h-4 text-amber-500/50 fill-amber-500/50" />
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
