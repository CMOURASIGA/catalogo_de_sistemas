
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_SISTEMAS, MOCK_INTEGRACOES } from '../constants';
import { Share2, ArrowLeft, Info, Network, Building2, User } from 'lucide-react';

const CNCLogo = ({ light = false }: { light?: boolean }) => (
  <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${light ? 'bg-white shadow-sm' : 'bg-blue-600'} flex-shrink-0 border ${light ? 'border-blue-100' : 'border-blue-500'}`}>
    <span className={`font-black text-xs leading-none text-center ${light ? 'text-blue-600' : 'text-white'}`}>
      CNC<br/><span className={`text-[8px] font-bold ${light ? 'text-slate-400' : 'text-blue-200'}`}>CORP</span>
    </span>
  </div>
);

const DetalhePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('visao-geral');
  
  const sistema = MOCK_SISTEMAS.find(s => s.id === id);
  
  const integracoes = MOCK_INTEGRACOES.filter(
    i => i.sistemaOrigemId === id || i.sistemaDestinoId === id
  );

  if (!sistema) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-700">Sistema não encontrado</h2>
        <Link to="/catalogo" className="text-blue-600 hover:underline mt-4 block">Voltar ao catálogo</Link>
      </div>
    );
  }

  const tabs = [
    { id: 'visao-geral', label: 'Visão Geral' },
    { id: 'acesso', label: 'Acesso e Uso' },
    { id: 'ciclo', label: 'Ciclo de Vida' },
    { id: 'indicadores', label: 'Indicadores' },
    { id: 'qualidade', label: 'Qualidade' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      <Link to="/catalogo" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 mb-2 transition-colors">
        <ArrowLeft size={16} className="mr-1" />
        Voltar para o catálogo
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden font-sans">
        
        {/* Cabeçalho Hero Azul com Logo CNC */}
        <div className="bg-blue-600 px-8 py-10 text-white">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <CNCLogo light />
            <div className="flex-1">
              <div className="text-blue-200 text-xs font-bold tracking-widest uppercase mb-1">{sistema.sigla}</div>
              <h1 className="text-4xl font-bold tracking-tight">{sistema.nome}</h1>
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-sm border border-white/20">
                  {sistema.status}
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-700/50 text-blue-100 border border-blue-500/50 text-xs font-semibold">
                  {sistema.tipo}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu de Abas */}
        <div className="border-b border-slate-200 px-8 bg-white sticky top-0 z-10">
          <nav className="flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  py-4 px-1 inline-flex items-center border-b-2 font-semibold text-sm transition-colors
                  ${activeTab === tab.id 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-200'}
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-8 bg-white min-h-[500px]">
          {activeTab === 'visao-geral' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
              
              {/* COLUNA PRINCIPAL (2/3): Dados Iniciais e Integração */}
              <div className="md:col-span-2 space-y-12">
                
                {/* Seção 1: Dados Iniciais */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                      <Info size={20} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">Dados Iniciais</h3>
                  </div>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-xl text-slate-600 leading-relaxed font-light italic border-l-4 border-blue-200 pl-4 mb-8">
                      {sistema.descricao}
                    </p>
                    <div className="space-y-4 text-slate-600 text-sm md:text-base">
                      <p>
                        O sistema <strong>{sistema.nome}</strong> é peça chave na operação de <strong>{sistema.areaNegocio}</strong>. 
                        Sua função primordial é centralizar e otimizar os fluxos de trabalho da área, garantindo que as políticas corporativas da CNC sejam aplicadas com rigor técnico.
                      </p>
                      <p>
                        Mantido sob governança da TI Central, o sistema passa por ciclos regulares de atualização e auditoria de segurança para garantir a integridade dos dados institucionais.
                      </p>
                    </div>
                  </div>
                </section>

                <hr className="border-slate-100" />

                {/* Seção 2: Integração */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                      <Network size={20} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">Integração</h3>
                  </div>
                  
                  {integracoes.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {integracoes.map((int) => {
                        const isOrigem = int.sistemaOrigemId === sistema.id;
                        const connectedId = isOrigem ? int.sistemaDestinoId : int.sistemaOrigemId;
                        const connectedSys = MOCK_SISTEMAS.find(s => s.id === connectedId);
                        
                        return (
                          <div key={int.id} className="flex items-center gap-4 p-5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-blue-200 hover:shadow-sm transition-all">
                            <div className={`p-3 rounded-full ${isOrigem ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}`}>
                              <Building2 size={18} />
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className="font-bold text-slate-800">{connectedSys ? connectedSys.nome : connectedId}</span>
                                <span className="text-[10px] uppercase px-1.5 py-0.5 bg-slate-200 text-slate-600 rounded font-bold">{int.tipo}</span>
                              </div>
                              <div className="text-xs md:text-sm text-slate-500">{int.descricao}</div>
                            </div>
                            <div className="text-right hidden sm:block">
                              <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${isOrigem ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'}`}>
                                {isOrigem ? 'Saída' : 'Entrada'}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="bg-slate-50 rounded-xl p-10 text-center border-2 border-dashed border-slate-200">
                      <p className="text-slate-400 font-medium">Nenhum fluxo de integração mapeado para este sistema.</p>
                    </div>
                  )}
                </section>
              </div>

              {/* COLUNA LATERAL (1/3): Demais Informações */}
              <div className="md:col-span-1 md:sticky md:top-24">
                <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 space-y-8 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                    Demais Informações
                  </h3>
                  
                  <div className="space-y-6">
                    <InfoItem label="Área de Negócio" value={sistema.areaNegocio} />
                    
                    <InfoItem 
                      label="Responsável (Business)" 
                      value={sistema.donoNegocio} 
                      avatar={sistema.donoNegocio.charAt(0)}
                    />

                    <InfoItem label="Líder Técnico" value={sistema.liderTecnico} />
                    
                    <InfoItem label="Fornecedor / Origem" value={sistema.fornecedor} />

                    <div>
                      <span className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-3">Stack Tecnológico</span>
                      <div className="flex flex-wrap gap-2">
                        {sistema.tecnologias.map(tech => (
                          <span key={tech} className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 font-semibold shadow-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-200">
                       <InfoItem 
                        label="Data de Implantação" 
                        value={sistema.dataImplantacao ? new Date(sistema.dataImplantacao).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Não disponível'} 
                       />
                       <div className="mt-4">
                         <span className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Criticidade</span>
                         <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${sistema.criticidade === 'Crítica' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                           {sistema.criticidade.toUpperCase()}
                         </span>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeTab !== 'visao-geral' && (
            <div className="py-24 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 text-blue-200 mb-6">
                <Share2 size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 italic">Módulo em construção</h3>
              <p className="text-slate-400 mt-2 max-w-sm mx-auto">As informações de {tabs.find(t => t.id === activeTab)?.label.toLowerCase()} estão sendo validadas pela governança.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value, avatar }: { label: string, value: string, avatar?: string }) => (
  <div>
    <span className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">{label}</span>
    <div className="flex items-center gap-2">
      {avatar && (
        <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
          {avatar}
        </div>
      )}
      <span className="text-slate-800 font-semibold text-sm">{value}</span>
    </div>
  </div>
);

export default DetalhePage;
