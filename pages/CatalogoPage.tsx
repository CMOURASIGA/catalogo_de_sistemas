import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MOCK_SISTEMAS } from '../constants';
import StatusBadge from '../components/StatusBadge';
import { Search, Filter, ArrowRight, AlertCircle } from 'lucide-react';
import { TipoSistema } from '../types';

const CatalogoPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    setSearchTerm(initialQuery);
  }, [initialQuery]);

  const filteredSistemas = MOCK_SISTEMAS.filter((sistema) => {
    const matchesSearch = 
      sistema.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sistema.sigla.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sistema.tecnologias.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = filterType === 'all' || sistema.tipo === filterType;

    return matchesSearch && matchesType;
  });

  const getCriticidadeStyle = (c: string) => {
    switch(c) {
      case 'Crítica': return 'bg-red-50 text-red-700 border-red-200';
      case 'Alta': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Média': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Catálogo de Sistemas</h2>
          <p className="text-slate-500">Explore os sistemas disponíveis na corporação.</p>
        </div>
        <Link 
          to="/novo" 
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Novo Sistema
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Filtrar por nome, sigla ou tecnologia..."
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="text-slate-400 w-5 h-5" />
          <select 
            className="flex-1 md:w-48 py-2 px-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-700"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">Todos os Tipos</option>
            {Object.values(TipoSistema).map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredSistemas.length > 0 ? (
          filteredSistemas.map((sistema) => (
            <div key={sistema.id} className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col">
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
                    {sistema.sigla}
                  </div>
                  <StatusBadge status={sistema.status} size="sm" />
                </div>
                
                <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-1">{sistema.nome}</h3>
                
                {/* Badge de Criticidade - NOVO */}
                <div className="mb-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border ${getCriticidadeStyle(sistema.criticidade)}`}>
                    {sistema.criticidade === 'Crítica' || sistema.criticidade === 'Alta' ? <AlertCircle className="w-3 h-3 mr-1"/> : null}
                    Criticidade {sistema.criticidade}
                  </span>
                </div>

                <p className="text-slate-500 text-sm mb-4 line-clamp-2 h-10">{sistema.descricao}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {sistema.tecnologias.slice(0, 3).map((tech) => (
                    <span key={tech} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100">
                      {tech}
                    </span>
                  ))}
                  {sistema.tecnologias.length > 3 && (
                    <span className="text-xs text-slate-400 px-1 py-1">+{sistema.tecnologias.length - 3}</span>
                  )}
                </div>

                <div className="text-xs text-slate-500 grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100">
                  <div>
                    <span className="block font-semibold">Responsável</span>
                    {sistema.donoNegocio}
                  </div>
                  <div>
                    <span className="block font-semibold">Área</span>
                    {sistema.areaNegocio}
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-xl flex justify-end">
                <Link 
                  to={`/sistema/${sistema.id}`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                >
                  Ver detalhes <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-xl border border-dashed border-slate-300">
            <p>Nenhum sistema encontrado com os filtros atuais.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogoPage;