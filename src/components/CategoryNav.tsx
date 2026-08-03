import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Category } from '../types';

interface CategoryNavProps {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (id: string) => void;
  language: 'pt' | 'en';
}

export const CategoryNav = ({ categories, activeCategory, setActiveCategory, language }: CategoryNavProps) => {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeElement = document.getElementById(`cat-${activeCategory}`);
    if (activeElement) {
      activeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeCategory]);

  return (
    <div className="sticky top-0 z-30 w-full bg-black/50 backdrop-blur-xl border-b border-white/5">
      <div className="relative">
        {/* Left Shadow/Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
        
        {/* Right Shadow/Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black via-black/40 to-transparent z-20 pointer-events-none flex items-center justify-end pr-2">
          <Icons.ChevronRight size={16} className="text-gold/40 animate-pulse" />
        </div>
        
        <nav 
          ref={navRef}
          className="py-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory"
        >
          <div className="flex gap-3 px-6 min-w-max">
            {categories.map((cat) => {
              const Icon = (Icons as any)[cat.icon] || Icons.GlassWater;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  id={`cat-${cat.id}`}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full transition-all duration-300 border snap-center ${
                    isActive 
                    ? 'bg-gold border-gold text-black shadow-lg shadow-gold/20 scale-105' 
                    : 'glass border-white/5 text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-black' : 'text-gold/40'} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap">
                    {cat.name[language]}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
      
      {/* Visual Swipe Indicator */}
      <div className="flex justify-center pb-2">
        <div className="flex gap-1">
          <div className="w-8 h-0.5 rounded-full bg-gold/20 relative overflow-hidden">
            <motion.div 
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gold/60 w-1/2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
