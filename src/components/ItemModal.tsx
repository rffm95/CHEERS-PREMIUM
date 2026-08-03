import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, MapPin, Share2 } from 'lucide-react';
import { MenuItem } from '../types';
import cocktailDetailImage from '../assets/images/premium_cocktail_detail_1785714891781.jpg';

interface ItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
  language: 'pt' | 'en';
}

export const ItemModal = ({ item, onClose, language }: ItemModalProps) => {
  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white border border-white/10 hover:bg-white hover:text-black transition-all"
          >
            <X size={20} />
          </button>

          {/* Hero Image Section */}
          <div className="h-64 bg-zinc-800 relative overflow-hidden">
            <img 
              src={cocktailDetailImage} 
              alt={item.name}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
              {item.badges?.map((badge) => (
                <span key={badge} className="px-3 py-1 rounded bg-gold text-black text-[10px] font-black uppercase tracking-widest">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="serif text-4xl font-bold text-white mb-2">{item.name}</h2>
                <span className="text-2xl font-bold text-gold">
                  {item.price.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}
                </span>
              </div>
              <button className="p-3 rounded-2xl bg-zinc-800 text-zinc-400 hover:text-white transition-all">
                <Share2 size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-black text-gold/60 mb-2">
                  {language === 'pt' ? 'Sobre' : 'About'}
                </h4>
                <p className="text-zinc-400 leading-relaxed font-light">
                  {item.description[language]}
                </p>
              </div>

              {item.ingredients && (
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-black text-gold/60 mb-2">
                    {language === 'pt' ? 'Composição' : 'Composition'}
                  </h4>
                  <p className="text-zinc-300 glass p-4 rounded-xl italic text-sm">
                    {item.ingredients[language]}
                  </p>
                </div>
              )}

              <div className="pt-6 border-t border-white/5 flex gap-4">
                <button 
                  onClick={onClose}
                  className="flex-1 bg-gold hover:bg-gold-dark text-black font-bold py-4 rounded-2xl transition-all shadow-lg shadow-gold/20 uppercase tracking-widest text-xs"
                >
                  {language === 'pt' ? 'Explorar mais' : 'Explore more'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
