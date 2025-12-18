import React, { useState } from 'react';
import { Menu, Search, Bell, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/catalogo?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-slate-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 text-slate-600 rounded-md lg:hidden hover:bg-slate-100"
            aria-label="Abrir menu"
            title="Abrir menu"
            type="button"
          >
            <Menu size={24} />
          </button>
          <div className="hidden sm:flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary text-white flex items-center justify-center font-extrabold text-xs">
              CNC
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-slate-800">CNC</div>
              <div className="text-xs text-slate-500">Catálogo de Sistemas</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end flex-1 gap-4 lg:gap-8">
          <form onSubmit={handleSearch} className="relative w-full max-w-md hidden md:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-10 pr-4 text-sm text-slate-700 bg-slate-100 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-primary placeholder-slate-400"
              placeholder="Buscar sistema por sigla, nome ou tecnologia..."
            />
          </form>

          <div className="flex items-center gap-3">
            <button
              className="p-2 text-slate-500 rounded-full hover:bg-slate-100 relative"
              aria-label="Notificações"
              title="Notificações"
              type="button"
            >
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button
              className="p-2 text-slate-500 rounded-full hover:bg-slate-100"
              aria-label="Ajuda"
              title="Ajuda"
              type="button"
            >
              <HelpCircle size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
