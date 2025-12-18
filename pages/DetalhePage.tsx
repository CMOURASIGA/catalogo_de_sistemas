
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_SISTEMAS, MOCK_INTEGRACOES } from '../constants';
import { Share2, ArrowLeft, Info, Network } from 'lucide-react';

const DetalhePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('visao-geral');
  
  const sistema = MOCK_SISTEMAS.find(s => s.id === id);
  
  // Buscar integrações reais deste sistema
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
      {/* Breadcrumb simples */}
      <Link to="/catalogo" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 mb-2 transition-colors">
        <ArrowLeft size={16} className="mr-1" />
        Voltar para o catálogo
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden font-sans">
        
        {/* 1. Header Azul (Identidade Visual) */}
        <div className="bg-blue-600 px-8 py-10 text-white">
          <div className="flex justify-between items-start">
            <div className="max-w-3xl">
              <div className="text-blue-200 text-sm font-semibold tracking-wider uppercase mb-2">{sistema.sigla}</div>
              <h1 className="text-4xl font-bold mb-6 tracking-tight">{sistema.nome}</h1>
              
              <div className="flex items-center gap-3">
                {/* Badge Status */}
                <span className="px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium backdrop-blur-sm border border-white/20">
                  {sistema.status}
                </span>
                
                {/* Badge Tipo */}
                <span className="px-3 py-1 rounded-full bg-blue-700/50 text-blue-100 border border-blue-500/50 text-sm font-medium">
                  {sistema.tipo}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Abas de Navegação */}
        <div className="border-b border-slate-200 px-8 bg-white sticky top-0 z-10">
          <nav className="flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm transition-colors
                  ${activeTab === tab.id 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* 3. Conteúdo Principal dividido em colunas */}
        <div className="p-8 bg-white min-h-[500px]">
          {activeTab === 'visao-geral' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              
              {/* COLUNA ESQUERDA (2/3) - Dados Iniciais e Integrações */}
              <div className="md:col-span-2 space-y-10">
                
                {/* Seção: Dados Iniciais / Descrição */}
                <section>
                  <div className="flex items-center gap-2 mb-4 text-slate-800">
                    <Info className="w-5 h-5 text-blue-600" />
                    <h3 className="text-xl font-bold">Sobre o Sistema</h3>
                  </div>
                  <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                    <p className="text-lg text-slate-700 mb-4">{sistema.descricao}</p>
                    <p>
                      Este sistema desempenha um papel fundamental na área de <strong>{sistema.areaNegocio}</strong>, 
                      sendo a ferramenta oficial para seus processos específicos. Ele foi projetado para garantir 
                      integridade, segurança e alta disponibilidade das informações corporativas.
                    </p>
                    <p>
                      Atualmente encontra-se na fase de <strong>{sistema.status}</strong> e é mantido pela equipe 
                      técnica designada, seguindo os padrões de governança de TI da corporação.
                    </p>
                  </div>
                </section>

                <hr className="border-slate-100" />

                {/* Seção: Integrações */}
                <section>
                  <div className="flex items-center gap-2 mb-5 text-slate-800">
                    <Network className="w-5 h-5 text-blue-600" />
                    <h3 className="text-xl font-bold">Integrações e Fluxo de Dados</h3>
                  </div>
                  
                  {integracoes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {integracoes.map((int) => {
                        const isOrigem = int.sistemaOrigemId === sistema.id;
                        const connectedId = isOrigem ? int.sistemaDestinoId : int.sistemaOrigemId;
                        const connectedSys = MOCK_SISTEMAS.find(s => s.id === connectedId);
                        
                        return (
                          <div key={int.id} className="group p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all duration-200">
                            <div className="flex justify-between items-start mb-2">
                              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${isOrigem ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                                {isOrigem ? 'Envia para' : 'Recebe de'}
                              </span>
                              <span className="text-xs text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-100">{int.tipo}</span>
                            </div>
                            <div className="font-semibold text-slate-800 mb-1">
                              {connectedSys ? connectedSys.nome : connectedId}
                            </div>
                            <div className="text-xs text-slate-500 line-clamp-2">
                              {int.descricao}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="bg-slate-50 rounded-lg p-6 text-center border border-dashed border-slate-200">
                      <p className="text-slate-500 text-sm">Nenhuma integração direta mapeada para este sistema.</p>
                    </div>
                  )}
                </section>
              </div>

              {/* COLUNA DIREITA (1/3) - Demais Informações */}
              <div className="md:col-span-1 sticky top-24">
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200">
                    Ficha Técnica
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <span className="block text-xs uppercase tracking-wide text-slate-400 font-semibold mb-1">Área de Negócio</span>
                      <span className="block font-medium text-slate-800">{sistema.areaNegocio}</span>
                    </div>
                    
                    <div>
                      <span className="block text-xs uppercase tracking-wide text-slate-400 font-semibold mb-1">Ponto Focal (Business)</span>
                      <span className="block font-medium text-slate-800 flex items-center gap-2">
                         <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                            {sistema.donoNegocio.charAt(0)}
                         </div>
                         {sistema.donoNegocio}
                      </span>
                    </div>

                     <div>
                      <span className="block text-xs uppercase tracking-wide text-slate-400 font-semibold mb-1">Líder Técnico</span>
                      <span className="block font-medium text-slate-800">{sistema.liderTecnico}</span>
                    </div>

                    <div>
                      <span className="block text-xs uppercase tracking-wide text-slate-400 font-semibold mb-1">Fornecedor / Desenvolvedor</span>
                      <span className="block font-medium text-slate-800">{sistema.fornecedor}</span>
                    </div>

                    <div>
                      <span className="block text-xs uppercase tracking-wide text-slate-400 font-semibold mb-2">Stack Tecnológico</span>
                      <div className="flex flex-wrap gap-2">
                        {sistema.tecnologias.map(tech => (
                          <span key={tech} className="px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-600 font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200">
                       <span className="block text-xs uppercase tracking-wide text-slate-400 font-semibold mb-1">Início da Operação</span>
                       <span className="block text-sm text-slate-700">
                         {sistema.dataImplantacao ? new Date(sistema.dataImplantacao).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Data não informada'}
                       </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeTab !== 'visao-geral' && (
            <div className="py-20 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                <Share2 className="text-slate-400" size={32} />
              </div>
              <h3 className="text-lg font-medium text-slate-900">Em desenvolvimento</h3>
              <p className="text-slate-500 mt-2">O conteúdo da aba <strong>{tabs.find(t => t.id === activeTab)?.label}</strong> será implementado em breve.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalhePage;
