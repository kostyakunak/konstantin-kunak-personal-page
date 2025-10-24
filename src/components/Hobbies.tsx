import { useEffect, useState } from 'react';
import { supabase, Hobby } from '../lib/supabase';
import { ArrowLeft } from 'lucide-react';

interface HobbiesProps {
  onStateChange?: (hasSelectedHobby: boolean) => void;
}

export default function Hobbies({ onStateChange }: HobbiesProps) {
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [selectedHobby, setSelectedHobby] = useState<Hobby | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHobbies();
  }, []);

  useEffect(() => {
    onStateChange?.(!!selectedHobby);
  }, [selectedHobby, onStateChange]);

  const fetchHobbies = async () => {
    try {
      // Временно отключаем Supabase для тестирования
      setHobbies(getSampleHobbies());
      setLoading(false);
      return;
      
      const { data, error } = await supabase
        .from('hobbies')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) {
        console.error('Error fetching hobbies:', error);
        setHobbies(getSampleHobbies());
      } else {
        setHobbies(data && data.length > 0 ? data : getSampleHobbies());
      }
    } catch (error) {
      console.error('Error:', error);
      setHobbies(getSampleHobbies());
    }
    setLoading(false);
  };


  const getSampleHobbies = (): Hobby[] => [
    {
      id: '1',
      title: 'Photography',
      content: 'I have a passion for capturing moments and telling stories through photography. I enjoy exploring different techniques and styles, from landscape to portrait photography.\n\nMy favorite subjects include:\n- Urban landscapes\n- Street photography\n- Nature and wildlife\n- Portrait sessions\n\nI believe photography is a powerful medium for expressing creativity and preserving memories. Over the years, I\'ve developed my own unique style that combines technical precision with artistic vision. I particularly enjoy working with natural light and finding beauty in everyday moments that others might overlook.\n\nMy journey in photography began during my travels, where I discovered how different cultures and environments can dramatically change the way we see the world. This experience taught me to always look for the extraordinary in the ordinary, and to approach each shot with fresh eyes and an open mind.\n\nI\'ve had the privilege of exhibiting my work in several local galleries and have received recognition for my street photography series. The feedback from viewers has been incredibly rewarding, as it confirms that my images are able to connect with people on an emotional level.',
      images: [
        'https://images.pexels.com/photos/1415268/pexels-photo-1415268.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      order_index: 1,
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Cooking',
      content: 'Cooking is both an art and a science for me. I love experimenting with different cuisines and creating new recipes. It\'s a great way to relax and be creative.\n\nMy specialties include:\n- Italian cuisine\n- Asian fusion\n- Baking and pastries\n- Healthy meal prep\n\nI enjoy hosting dinner parties and sharing my culinary creations with friends and family. The kitchen has become my sanctuary, a place where I can express my creativity while nourishing the people I care about.\n\nMy culinary journey started when I was young, helping my grandmother prepare traditional dishes. Those early experiences taught me that cooking is about more than just following recipes - it\'s about understanding ingredients, respecting traditions, and creating something that brings people together.\n\nI\'ve spent countless hours perfecting techniques like knife skills, sauce making, and bread baking. Each new skill I learn opens up endless possibilities for experimentation. I particularly enjoy the challenge of recreating restaurant-quality dishes at home, often spending weeks perfecting a single recipe until it meets my standards.\n\nRecently, I\'ve been exploring fermentation and preservation techniques, learning to make my own sourdough starter, kimchi, and pickled vegetables. These traditional methods have deepened my appreciation for the patience and care that goes into truly great food.',
      images: [
        'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      order_index: 2,
      created_at: new Date().toISOString()
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (selectedHobby) {
    return (
      <div className="animate-slideUp">
        <button
          onClick={() => setSelectedHobby(null)}
          className="mb-8 flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Hobbies
        </button>

        <div className="max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              {selectedHobby.title}
            </h1>
          </div>

          {selectedHobby.images && selectedHobby.images.length > 0 && (
            <div className={`grid gap-6 mb-8 ${
              selectedHobby.images.length === 1 ? 'grid-cols-1' :
              selectedHobby.images.length === 2 ? 'grid-cols-2' :
              'grid-cols-2 lg:grid-cols-3'
            }`}>
              {selectedHobby.images.map((image, imgIndex) => (
                <div
                  key={imgIndex}
                  className="relative overflow-hidden rounded-2xl aspect-video"
                >
                  <img
                    src={image}
                    alt={`${selectedHobby.title} ${imgIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="prose prose-invert prose-amber max-w-none">
            <div className="text-slate-300 leading-relaxed whitespace-pre-wrap text-lg">
              {selectedHobby.content}
            </div>
          </div>
        </div>
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
    <div className="space-y-12">
      {hobbies.map((hobby, index) => (
        <article
          key={hobby.id}
          className="group"
          style={{
            animation: `slideUp 0.6s ease-out ${index * 0.2}s both`,
          }}
        >
          <div 
            onClick={() => setSelectedHobby(hobby)}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700/50 hover:border-amber-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10 cursor-pointer"
          >
            <div className="mb-6">
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
                {hobby.content.split('\n\n').slice(0, 2).join('\n\n')}
              </div>
              
              {hobby.content.split('\n\n').length > 2 && (
                <div className="mt-4 flex items-center justify-center">
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-amber-400/70 rounded-full animate-pulse"></div>
                    <div className="w-1 h-1 bg-amber-400/70 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1 h-1 bg-amber-400/70 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </article>
      ))}
    </div>
  );
}
