import { Search, X } from 'lucide-react';

interface SearchBarProps {
  query: string;
  setQuery: (val: string) => void;
  language: 'pt' | 'en';
}

export const SearchBar = ({ query, setQuery, language }: SearchBarProps) => {
  return (
    <div className="px-6 py-4">
      <div className="relative flex items-center">
        <div className="absolute left-4 text-zinc-500">
          <Search size={18} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={language === 'pt' ? 'Pesquisar bebidas...' : 'Search drinks...'}
          className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-12 text-white placeholder:text-zinc-600 focus:outline-none focus:border-gold/30 transition-all shadow-inner text-sm"
        />
        {query && (
          <button 
            onClick={() => setQuery('')}
            className="absolute right-4 text-zinc-500 hover:text-white transition-all"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
};
