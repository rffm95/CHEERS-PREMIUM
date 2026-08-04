import { motion, AnimatePresence } from 'motion/react';
import * as Icons from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Category } from '../types';

interface CategoryNavProps {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (id: string) => void;
  language: 'pt' | 'en';
}

export const CategoryNav = ({ categories, activeCategory, setActiveCategory, language }: CategoryNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const activeCat = categories.find(c => c.id === activeCategory) || categories[0];
  const ActiveIcon = (Icons as any)[activeCat.icon] || Icons.GlassWater;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="sticky top-0 z-40 w-full bg-black border-b border-white/10 px-6 py-3 shadow-xl" ref={containerRef}>
      <div className="relative">
        {/* Active Category Trigger */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between bg-zinc-900 border border-white/10 px-6 py-3 rounded-2xl group transition-all duration-300 hover:border-gold/30 active:scale-95"
        >
          <div className="flex items-center gap-4">
            <div className="p-2 bg-gold/10 rounded-xl group-hover:bg-gold/20 transition-colors">
              <ActiveIcon size={20} className="text-gold" />
            </div>
            <div className="flex flex-col items-start text-left">
              <span className="text-[8px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-0.5">
                {language === 'pt' ? 'Secção Atual' : 'Current Section'}
              </span>
              <span className="text-sm font-black uppercase tracking-[0.1em] text-white">
                {activeCat.name[language]}
              </span>
            </div>
          </div>
          
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "circOut" }}
          >
            <Icons.ChevronDown size={20} className="text-gold" />
          </motion.div>
        </button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50 p-2"
              >
                <div className="grid grid-cols-1 gap-1 max-h-[60vh] overflow-y-auto no-scrollbar">
                  {categories.map((cat) => {
                    const Icon = (Icons as any)[cat.icon] || Icons.GlassWater;
                    const isActive = activeCategory === cat.id;

                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setActiveCategory(cat.id);
                          setIsOpen(false);
                        }}
                        className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 ${
                          isActive 
                          ? 'bg-gold text-black' 
                          : 'hover:bg-white/5 text-zinc-400 hover:text-white'
                        }`}
                      >
                        <Icon size={18} className={isActive ? 'text-black' : 'text-gold/60'} />
                        <span className="text-xs font-bold uppercase tracking-[0.1em]">
                          {cat.name[language]}
                        </span>
                        {isActive && (
                          <div className="ml-auto">
                            <Icons.Check size={14} className="text-black" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
              
              {/* Backdrop for mobile to handle taps outside better */}
              <div 
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm pointer-events-auto"
                onClick={() => setIsOpen(false)}
              />
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
