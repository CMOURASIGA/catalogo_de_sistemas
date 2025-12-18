import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Database, PlusCircle, Network, Settings, X, LogOut } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Catálogo', path: '/catalogo', icon: Database },
    { name: 'Novo Sistema', path: '/novo', icon: PlusCircle },
    { name: 'Integrações', path: '/integracoes', icon: Network },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ backgroundColor: 'var(--primary-color)' }}
      >
        <div className="flex items-center justify-between h-16 px-6" style={{ backgroundColor: 'var(--primary-dark)' }}>
          <span className="text-xl font-extrabold tracking-wide" style={{ color: 'var(--secondary-color)' }}>
            CNC<span className="text-white">SYS</span>
          </span>
          <button
            onClick={onClose}
            className="lg:hidden hover:text-white"
            style={{ color: 'rgba(255,255,255,0.85)' }}
            aria-label="Fechar menu"
            title="Fechar menu"
            type="button"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => { if(window.innerWidth < 1024) onClose(); }}
              className={[
                'flex items-center px-4 py-3 rounded-lg transition-colors duration-200 group',
                isActive(item.path) ? 'bg-white' : 'hover:bg-white/10',
              ].join(' ')}
              aria-current={location.pathname === item.path ? 'page' : undefined}
              style={{
                color: isActive(item.path) ? 'var(--primary-color)' : 'rgba(255,255,255,0.85)',
              }}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
          
          <div className="pt-6 mt-6 border-t border-white/20">
             <Link
              to="#"
              className="flex items-center px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
              style={{ color: 'rgba(255,255,255,0.85)' }}
            >
              <Settings className="w-5 h-5 mr-3" />
              <span className="font-medium">Configurações</span>
            </Link>
             <Link
              to="#"
              className="flex items-center px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
              style={{ color: 'rgba(255,255,255,0.85)' }}
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span className="font-medium">Sair</span>
            </Link>
          </div>
        </nav>
        
        <div className="p-4" style={{ backgroundColor: 'var(--primary-dark)' }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold text-white" style={{ backgroundColor: 'var(--accent-color)' }}>
              AD
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Admin User</span>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.70)' }}>admin@cnc.corp</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
