import React, { useMemo, useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MOCK_SISTEMAS } from '../constants';
import StatusBadge from '../components/StatusBadge';
import { Search, Filter, ArrowRight, AlertCircle, Eye, Pencil, RotateCcw } from 'lucide-react';
import { TipoSistema } from '../types';
import PageTitlebar from '../components/PageTitlebar';
import EmptyState from '../components/EmptyState';

const CatalogoPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get('q') || '';
  const urlType = searchParams.get('tipo') || 'all';

  const [draftSearchTerm, setDraftSearchTerm] = useState(urlQuery);
  const [draftFilterType, setDraftFilterType] = useState<string>(urlType);
  const [appliedSearchTerm, setAppliedSearchTerm] = useState(urlQuery);
  const [appliedFilterType, setAppliedFilterType] = useState<string>(urlType);

  useEffect(() => {
    setDraftSearchTerm(urlQuery);
    setAppliedSearchTerm(urlQuery);
    setDraftFilterType(urlType);
    setAppliedFilterType(urlType);
  }, [urlQuery, urlType]);

  const filteredSistemas = useMemo(() => {
    return MOCK_SISTEMAS.filter((sistema) => {
      const query = appliedSearchTerm.trim().toLowerCase();
      const matchesSearch =
        !query ||
        sistema.nome.toLowerCase().includes(query) ||
        sistema.sigla.toLowerCase().includes(query) ||
        sistema.tecnologias.some((t) => t.toLowerCase().includes(query));

      const matchesType = appliedFilterType === 'all' || sistema.tipo === appliedFilterType;

      return matchesSearch && matchesType;
    });
  }, [appliedFilterType, appliedSearchTerm]);

  const applyFilters = () => {
    const nextQuery = draftSearchTerm.trim();
    setAppliedSearchTerm(nextQuery);
    setAppliedFilterType(draftFilterType);

    const nextParams = new URLSearchParams();
    if (nextQuery) nextParams.set('q', nextQuery);
    if (draftFilterType !== 'all') nextParams.set('tipo', draftFilterType);
    setSearchParams(nextParams, { replace: true });
  };

  const clearFilters = () => {
    setDraftSearchTerm('');
    setAppliedSearchTerm('');
    setDraftFilterType('all');
    setAppliedFilterType('all');
    setSearchParams(new URLSearchParams(), { replace: true });
  };

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
      <PageTitlebar
        title="Catálogo de Sistemas"
        subtitle="Explore os sistemas disponíveis na corporação."
        actions={
          <Link
            to="/novo"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors"
          >
            Novo sistema
          </Link>
        }
      />

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Filtrar por nome, sigla ou tecnologia..."
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            value={draftSearchTerm}
            onChange={(e) => setDraftSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="text-slate-400 w-5 h-5" />
          <select 
            className="flex-1 md:w-56 py-2 px-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary outline-none bg-white text-slate-700"
            value={draftFilterType}
            onChange={(e) => setDraftFilterType(e.target.value)}
          >
            <option value="all">Todos os Tipos</option>
            {Object.values(TipoSistema).map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto md:justify-end">
          <button
            type="button"
            onClick={applyFilters}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors w-full md:w-auto"
          >
            Pesquisar
          </button>
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors w-full md:w-auto"
            title="Limpar filtros"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Limpar
          </button>
        </div>
        </div>

        <div className="text-sm text-slate-500 flex items-center justify-between gap-2">
          <span>
            Resultados: <span className="font-semibold text-slate-700">{filteredSistemas.length}</span> de{' '}
            <span className="font-semibold text-slate-700">{MOCK_SISTEMAS.length}</span>
          </span>
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
                    <span key={tech} className="text-xs bg-primary/5 text-primary px-2 py-1 rounded border border-primary/10">
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
              
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-xl flex items-center justify-between gap-3">
                <Link
                  to={`/sistema/${sistema.id}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                  title="Visualizar detalhes"
                >
                  <Eye className="w-4 h-4" />
                  Visualizar
                </Link>
                <Link
                  to={`/novo?id=${encodeURIComponent(sistema.id)}&from=catalogo`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors"
                  title="Editar sistema"
                >
                  <Pencil className="w-4 h-4" />
                  Editar
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full">
            <EmptyState
              icon={Search}
              title="Nenhum sistema encontrado"
              description="Ajuste os filtros ou cadastre um novo sistema."
              action={
                <Link
                  to="/novo"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Cadastrar novo sistema
                </Link>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogoPage;
