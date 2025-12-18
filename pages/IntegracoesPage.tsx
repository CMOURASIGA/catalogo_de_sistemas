import React from 'react';
import { MOCK_INTEGRACOES, MOCK_SISTEMAS } from '../constants';
import { ArrowRight, Database, Globe, FileText, Server } from 'lucide-react';
import PageTitlebar from '../components/PageTitlebar';
import EmptyState from '../components/EmptyState';

const IntegracoesPage: React.FC = () => {
  const getSystemName = (id: string) => MOCK_SISTEMAS.find(s => s.id === id)?.nome || 'Desconhecido';
  const getSystemSigla = (id: string) => MOCK_SISTEMAS.find(s => s.id === id)?.sigla || '???';

  const getIcon = (tipo: string) => {
    if (tipo.includes('Banco')) return <Database className="w-4 h-4" />;
    if (tipo.includes('API') || tipo.includes('SOAP')) return <Globe className="w-4 h-4" />;
    if (tipo.includes('Arquivo')) return <FileText className="w-4 h-4" />;
    return <Server className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      <PageTitlebar
        title="Mapa de Integrações"
        subtitle="Visualização de dependências e fluxo de dados entre sistemas."
      />

      <div className="grid grid-cols-1 gap-4">
        {MOCK_INTEGRACOES.length > 0 ? (
          MOCK_INTEGRACOES.map((int) => (
            <div key={int.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow">
            
            {/* Origem */}
            <div className="flex-1 flex items-center gap-4 w-full md:w-auto">
              <div className="w-12 h-12 bg-primary/5 text-primary rounded-lg flex items-center justify-center font-bold text-sm border border-primary/10 shrink-0">
                {getSystemSigla(int.sistemaOrigemId)}
              </div>
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase">Origem</span>
                <h3 className="font-medium text-slate-800">{getSystemName(int.sistemaOrigemId)}</h3>
              </div>
            </div>

            {/* Connection Info */}
            <div className="flex flex-col items-center justify-center w-full md:w-1/3 px-4 relative">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -z-10"></div>
              <div className="bg-white px-2 z-0 flex flex-col items-center">
                 <div className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium border border-slate-200 flex items-center gap-2 mb-1">
                  {getIcon(int.tipo)}
                  {int.tipo}
                </div>
                <span className="text-xs text-slate-400 text-center">{int.descricao}</span>
              </div>
            </div>

            {/* Destino */}
            <div className="flex-1 flex items-center gap-4 w-full md:w-auto md:justify-end">
              <div className="text-right order-2 md:order-1">
                <span className="text-xs text-slate-400 font-semibold uppercase">Destino</span>
                <h3 className="font-medium text-slate-800">{getSystemName(int.sistemaDestinoId)}</h3>
              </div>
              <div className="w-12 h-12 bg-accent/10 text-accent rounded-lg flex items-center justify-center font-bold text-sm border border-accent/20 shrink-0 order-1 md:order-2">
                {getSystemSigla(int.sistemaDestinoId)}
              </div>
            </div>

          </div>
        ))
        ) : (
          <EmptyState
            icon={Server}
            title="Nenhuma integração cadastrada"
            description="Assim que houver mapeamentos, eles aparecerão aqui."
          />
        )}
      </div>
    </div>
  );
};

export default IntegracoesPage;
