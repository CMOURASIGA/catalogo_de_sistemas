import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Info, Network, Pencil, Share2 } from 'lucide-react';
import { MOCK_INTEGRACOES, MOCK_SISTEMAS } from '../constants';
import EmptyState from '../components/EmptyState';
import PageTitlebar from '../components/PageTitlebar';
import StatusBadge from '../components/StatusBadge';

const DetalhePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'dados' | 'integracoes' | 'acesso' | 'ciclo' | 'indicadores' | 'qualidade'>('dados');

  const sistema = useMemo(() => MOCK_SISTEMAS.find((s) => s.id === id), [id]);
  const integracoes = useMemo(
    () => MOCK_INTEGRACOES.filter((i) => i.sistemaOrigemId === id || i.sistemaDestinoId === id),
    [id]
  );

  if (!sistema) {
    return (
      <div className="space-y-6">
        <PageTitlebar title="Sistema" subtitle="Detalhes do sistema selecionado." backTo="/catalogo" />
        <EmptyState
          icon={Info}
          title="Sistema não encontrado"
          description="Verifique se o link está correto ou volte ao catálogo."
          action={
            <Link
              to="/catalogo"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors"
            >
              Voltar ao catálogo
            </Link>
          }
        />
      </div>
    );
  }

  const tabs: Array<{ id: typeof activeTab; label: string; enabled: boolean }> = [
    { id: 'dados', label: 'Dados principais', enabled: true },
    { id: 'integracoes', label: 'Integrações', enabled: integracoes.length > 0 },
    { id: 'acesso', label: 'Acesso e uso', enabled: true },
    { id: 'ciclo', label: 'Ciclo de vida', enabled: true },
    { id: 'indicadores', label: 'Indicadores', enabled: true },
    { id: 'qualidade', label: 'Qualidade', enabled: true },
  ];

  const summaryBadges = (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wide">
        {sistema.sigla}
      </span>
      <StatusBadge status={sistema.status} size="sm" />
      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary/5 text-primary border border-primary/10 text-xs font-semibold">
        {sistema.tipo}
      </span>
      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold">
        Criticidade {sistema.criticidade}
      </span>
    </div>
  );

  return (
    <div className="space-y-6">
      <PageTitlebar
        title={sistema.nome}
        subtitle="Visualização (consulta) do cadastro do sistema."
        backTo="/catalogo"
        actions={
          <Link
            to={`/novo?id=${encodeURIComponent(sistema.id)}&from=sistema`}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors"
            title="Editar sistema"
          >
            <Pencil className="w-4 h-4 mr-2" />
            Editar
          </Link>
        }
      />

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">{summaryBadges}</div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 px-5">
          <nav className="flex flex-wrap gap-6" aria-label="Abas">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => tab.enabled && setActiveTab(tab.id)}
                disabled={!tab.enabled}
                aria-disabled={!tab.enabled}
                className={[
                  'py-4 px-1 inline-flex items-center border-b-2 font-semibold text-sm transition-colors',
                  tab.enabled ? '' : 'opacity-50 cursor-not-allowed',
                  activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300',
                ].join(' ')}
                type="button"
                title={tab.enabled ? tab.label : 'Sem dados para exibir'}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-5 md:p-8 bg-white min-h-[420px]">
          {activeTab === 'dados' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="md:col-span-2 space-y-6">
                <section className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                  <div className="flex items-center gap-2 mb-3 text-slate-900">
                    <Info className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-extrabold">Sobre o sistema</h2>
                  </div>
                  <p className="text-slate-700">{sistema.descricao}</p>
                  <p className="text-sm text-slate-500 mt-3">
                    Área de negócio: <span className="font-semibold text-slate-700">{sistema.areaNegocio}</span>
                  </p>
                </section>

                <section className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                  <div className="flex items-center gap-2 mb-4 text-slate-900">
                    <Network className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-extrabold">Integrações e fluxo de dados</h2>
                  </div>

                  {integracoes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {integracoes.map((int) => {
                        const isOrigem = int.sistemaOrigemId === sistema.id;
                        const connectedId = isOrigem ? int.sistemaDestinoId : int.sistemaOrigemId;
                        const connectedSys = MOCK_SISTEMAS.find((s) => s.id === connectedId);

                        return (
                          <div
                            key={int.id}
                            className="p-4 rounded-xl border border-slate-200 bg-white hover:border-primary/30 hover:shadow-sm transition-all duration-200"
                          >
                            <div className="flex justify-between items-start mb-2 gap-2">
                              <span
                                className={[
                                  'text-[10px] uppercase font-extrabold px-2 py-0.5 rounded',
                                  isOrigem ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent',
                                ].join(' ')}
                              >
                                {isOrigem ? 'Envia para' : 'Recebe de'}
                              </span>
                              <span className="text-xs text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                                {int.tipo}
                              </span>
                            </div>
                            <div className="font-semibold text-slate-800 mb-1">{connectedSys ? connectedSys.nome : connectedId}</div>
                            <div className="text-xs text-slate-500 line-clamp-2">{int.descricao}</div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <EmptyState title="Nenhuma integração mapeada" description="Este sistema ainda não possui integrações cadastradas." />
                  )}
                </section>
              </div>

              <aside className="md:col-span-1">
                <div className="bg-white rounded-xl p-5 border border-slate-200">
                  <h2 className="text-base font-extrabold text-slate-900 pb-3 border-b border-slate-200">Ficha técnica</h2>

                  <div className="mt-4 space-y-4 text-sm">
                    <div>
                      <div className="text-xs uppercase tracking-wide text-slate-400 font-semibold">Área de negócio</div>
                      <div className="font-semibold text-slate-800">{sistema.areaNegocio}</div>
                    </div>

                    <div>
                      <div className="text-xs uppercase tracking-wide text-slate-400 font-semibold">Ponto focal (Business)</div>
                      <div className="font-semibold text-slate-800">{sistema.donoNegocio}</div>
                    </div>

                    <div>
                      <div className="text-xs uppercase tracking-wide text-slate-400 font-semibold">Líder técnico</div>
                      <div className="font-semibold text-slate-800">{sistema.liderTecnico}</div>
                    </div>

                    <div>
                      <div className="text-xs uppercase tracking-wide text-slate-400 font-semibold">Fornecedor</div>
                      <div className="font-semibold text-slate-800">{sistema.fornecedor}</div>
                    </div>

                    <div>
                      <div className="text-xs uppercase tracking-wide text-slate-400 font-semibold mb-2">Stack tecnológico</div>
                      <div className="flex flex-wrap gap-2">
                        {sistema.tecnologias.map((tech) => (
                          <span key={tech} className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 font-semibold">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200">
                      <div className="text-xs uppercase tracking-wide text-slate-400 font-semibold">Início da operação</div>
                      <div className="text-sm text-slate-700">
                        {sistema.dataImplantacao
                          ? new Date(sistema.dataImplantacao).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
                          : 'Data não informada'}
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          ) : (
            <EmptyState
              icon={Share2}
              title="Em desenvolvimento"
              description={`O conteúdo da aba "${tabs.find((t) => t.id === activeTab)?.label}" será implementado em breve.`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalhePage;
