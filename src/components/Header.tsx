import { motion } from 'motion/react';
import { Languages, MapPin } from 'lucide-react';
import heroImage from '../assets/images/cheers_bar_hero_1785714870856.jpg';

interface HeaderProps {
  language: 'pt' | 'en';
  setLanguage: (lang: 'pt' | 'en') => void;
}

export const Header = ({ language, setLanguage }: HeaderProps) => {
  return (
    <header className="relative h-[40vh] min-h-[300px] flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url("${heroImage}")` 
        }}
      />

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 px-6 flex flex-col items-center"
      >
        {/* Logo Typography Container */}
        <div className="flex flex-col items-center mb-6 group">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <h1 className="serif text-6xl md:text-8xl font-bold tracking-tighter gold-gradient uppercase leading-none">
              Cheers
            </h1>
            <div className="flex items-center gap-3 w-full mt-1">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/40 to-gold/20" />
              <span className="serif italic text-gold text-2xl md:text-3xl lowercase px-2">o bar</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gold/40 to-gold/20" />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-1 h-1 rounded-full bg-gold/40" />
              <span className="text-[8px] uppercase tracking-[0.8em] text-gold/40 font-black">
                Since 2014
              </span>
              <div className="w-1 h-1 rounded-full bg-gold/40" />
            </div>
          </motion.div>
        </div>

        <div className="flex items-center justify-center gap-2 text-gold/30 text-[9px] uppercase tracking-[0.4em] mb-8 font-semibold">
          <MapPin size={10} />
          <span>Viseu • Portugal</span>
        </div>
      </motion.div>

      {/* Language Switcher */}
      <div className="absolute top-6 right-6 z-20 flex gap-2">
        <button 
          onClick={() => setLanguage('pt')}
          className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${
            language === 'pt' 
            ? 'bg-gold border-gold text-black' 
            : 'glass text-white hover:border-gold/50'
          }`}
        >
          PT
        </button>
        <button 
          onClick={() => setLanguage('en')}
          className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${
            language === 'en' 
            ? 'bg-gold border-gold text-black' 
            : 'glass text-white hover:border-gold/50'
          }`}
        >
          EN
        </button>
      </div>

      {/* Decorative Gradient Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
    </header>
  );
};
