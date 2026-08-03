import { motion } from 'motion/react';
import { Sparkles, Info } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuItemCardProps {
  key?: string;
  item: MenuItem;
  language: 'pt' | 'en';
  onClick: () => void;
}

export const MenuItemCard = ({ item, language, onClick }: MenuItemCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative group bg-zinc-900/40 border border-white/5 rounded-2xl p-4 cursor-pointer hover:border-amber-500/30 transition-all overflow-hidden ${
        item.isHighlighted ? 'ring-1 ring-amber-500/20 bg-zinc-900/60' : ''
      }`}
    >
      {/* Glow Effect for Highlighted Items */}
      {item.isHighlighted && (
        <div className="absolute -top-12 -right-12 w-24 h-24 bg-gold/10 blur-3xl rounded-full pointer-events-none" />
      )}

      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="text-base font-bold text-white tracking-tight group-hover:text-gold transition-colors">{item.name}</h3>
            {item.badges?.map((badge) => (
              <span 
                key={badge} 
                className="px-2 py-0.5 rounded bg-gold text-black text-[9px] font-black uppercase tracking-tighter"
              >
                {badge}
              </span>
            ))}
          </div>
          
          <p className="text-[11px] text-zinc-500 line-clamp-2 mb-3 leading-tight">
            {item.description[language]}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <span className="text-base font-medium text-zinc-200 group-hover:text-white transition-colors">
              {item.price.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}
            </span>
            <button className="p-2 rounded-full bg-white/5 text-zinc-500 group-hover:text-gold group-hover:bg-gold/10 transition-all">
              <Info size={14} />
            </button>
          </div>
        </div>
      </div>

      {item.ingredients && (
        <div className="mt-3 pt-3 border-t border-white/5">
          <p className="text-[10px] text-zinc-600 italic">
            <span className="text-gold/60 uppercase font-black not-italic mr-1 text-[8px] tracking-widest">{language === 'pt' ? 'Composição' : 'Composition'}</span>
            {item.ingredients[language]}
          </p>
        </div>
      )}
    </motion.div>
  );
};
