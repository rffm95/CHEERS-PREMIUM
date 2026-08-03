import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { SearchBar } from './components/SearchBar';
import { MenuItemCard } from './components/MenuItemCard';
import { ItemModal } from './components/ItemModal';
import { categories, menuItems } from './data/menu';
import { MenuItem } from './types';
import { Instagram, Phone, MapPin, Beer, Sparkles, Flame } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = item.category === activeCategory;
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.ingredients && item.ingredients[language].toLowerCase().includes(searchQuery.toLowerCase()));
      
      return searchQuery ? matchesSearch : matchesCategory;
    });
  }, [activeCategory, searchQuery, language]);

  return (
    <div className="min-h-screen bg-dark-bg text-white font-sans selection:bg-gold/30">
      {/* Premium Dark Overlay */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(197,160,89,0.05)_0%,rgba(0,0,0,0)_50%)] pointer-events-none" />

      <Header language={language} setLanguage={setLanguage} />

      <main className="relative z-10 max-w-2xl mx-auto pb-24">
        <CategoryNav 
          categories={categories} 
          activeCategory={activeCategory} 
          setActiveCategory={(id) => {
            setActiveCategory(id);
            setSearchQuery('');
          }}
          language={language}
        />

        <SearchBar query={searchQuery} setQuery={setSearchQuery} language={language} />

        {/* Section Title */}
        <div className="px-6 py-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
            {searchQuery 
              ? (language === 'pt' ? 'Resultados' : 'Results') 
              : categories.find(c => c.id === activeCategory)?.name[language]}
          </h2>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 gap-4 px-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <MenuItemCard 
                  key={item.id} 
                  item={item} 
                  language={language} 
                  onClick={() => setSelectedItem(item)}
                />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center text-zinc-600"
              >
                <p className="text-sm uppercase tracking-widest font-bold">
                  {language === 'pt' ? 'Nenhuma bebida encontrada.' : 'No drinks found.'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Brands Showcase (Subtle) */}
        <section className="mt-20 px-6 py-12 border-t border-white/5 bg-zinc-900/10 rounded-[3rem]">
          <h3 className="text-[10px] uppercase tracking-[0.4em] text-center font-black text-gold/40 mb-10">
            {language === 'pt' ? 'Parceiros Premium' : 'Premium Partners'}
          </h3>
          <div className="flex flex-wrap justify-center gap-12 opacity-20 grayscale hover:grayscale-0 transition-all duration-700">
            <div className="flex flex-col items-center gap-2">
              <Beer size={28} />
              <span className="text-[8px] font-black uppercase tracking-widest">Heineken</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Sparkles size={28} />
              <span className="text-[8px] font-black uppercase tracking-widest">Nordés</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Flame size={28} />
              <span className="text-[8px] font-black uppercase tracking-widest text-gold">Jack Daniel's</span>
            </div>
          </div>
        </section>

        {/* Footer Info */}
        <footer className="mt-12 px-8 py-12 text-center border-t border-white/5">
          <div className="flex justify-center gap-6 mb-8">
            <a href="#" className="p-4 rounded-2xl glass text-zinc-500 hover:text-gold transition-all">
              <Instagram size={18} />
            </a>
            <a href="#" className="p-4 rounded-2xl glass text-zinc-500 hover:text-gold transition-all">
              <Phone size={18} />
            </a>
            <a href="#" className="p-4 rounded-2xl glass text-zinc-500 hover:text-gold transition-all">
              <MapPin size={18} />
            </a>
          </div>
          <p className="text-zinc-600 text-[10px] uppercase tracking-widest font-bold mb-2">
            © 2024 Cheers O Bar • Viseu
          </p>
          <p className="text-zinc-800 text-[9px] italic">
            {language === 'pt' 
              ? 'IVA incluído à taxa legal em vigor. Dispomos de livro de reclamações.' 
              : 'VAT included. Complaint book available.'}
          </p>
        </footer>
      </main>

      <ItemModal 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
        language={language} 
      />
    </div>
  );
}
