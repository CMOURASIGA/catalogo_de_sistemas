import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Save, X, CheckCircle2, AlertTriangle, Pencil } from 'lucide-react';
import { StatusSistema, TipoSistema } from '../types';
import { MOCK_SISTEMAS } from '../constants';
import PageTitlebar from '../components/PageTitlebar';

const NovoSistemaPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sistemaId = searchParams.get('id');
  const isReadonly = searchParams.get('readonly') === '1';
  const from = searchParams.get('from');
  const backTo = from === 'sistema' && sistemaId ? `/sistema/${encodeURIComponent(sistemaId)}` : '/catalogo';

  const sistema = useMemo(() => {
    if (!sistemaId) return null;
    return MOCK_SISTEMAS.find((s) => s.id === sistemaId) || null;
  }, [sistemaId]);

  const isEdit = Boolean(sistema);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    sigla: '',
    descricao: '',
    status: StatusSistema.IMPLANTACAO,
    tipo: TipoSistema.WEB,
    area: '',
    dono: '',
    techLead: '',
    fornecedor: '',
    tecnologias: '',
    dataImplantacao: '',
    criticidade: 'Baixa'
  });

  useEffect(() => {
    if (!sistema) return;

    setFormData({
      nome: sistema.nome || '',
      sigla: sistema.sigla || '',
      descricao: sistema.descricao || '',
      status: sistema.status,
      tipo: sistema.tipo,
      area: sistema.areaNegocio || '',
      dono: sistema.donoNegocio || '',
      techLead: sistema.liderTecnico || '',
      fornecedor: sistema.fornecedor || '',
      tecnologias: sistema.tecnologias?.join(', ') || '',
      dataImplantacao: sistema.dataImplantacao || '',
      criticidade: sistema.criticidade || 'Baixa',
    });
  }, [sistema]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (status: StatusSistema) => {
    if (isReadonly) return;
    setFormData(prev => ({ ...prev, status }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isReadonly) return;

    setSubmitted(true);
    if (!formData.nome.trim() || !formData.sigla.trim()) return;

    alert(isEdit ? 'Sistema atualizado com sucesso! (Mock)' : 'Sistema cadastrado com sucesso! (Mock)');
    navigate(backTo);
  };

  const getStatusColor = (status: StatusSistema) => {
    switch (status) {
      case StatusSistema.EM_USO: return 'bg-green-500 border-green-200';
      case StatusSistema.IMPLANTACAO: return 'bg-amber-500 border-amber-200';
      case StatusSistema.DESCONTINUADO: return 'bg-red-500 border-red-200';
      case StatusSistema.SUBSTITUICAO: return 'bg-purple-500 border-purple-200';
      default: return 'bg-slate-500 border-slate-200';
    }
  };

  const getCriticidadeStyle = (level: string, isSelected: boolean) => {
    if (!isSelected) return 'bg-white border-slate-200 text-slate-600 hover:border-slate-300';
    
    switch (level) {
      case 'Baixa': return 'bg-slate-100 text-slate-800 border-slate-400 ring-1 ring-slate-400';
      case 'Média': return 'bg-yellow-50 text-yellow-800 border-yellow-400 ring-1 ring-yellow-400';
      case 'Alta': return 'bg-orange-50 text-orange-800 border-orange-400 ring-1 ring-orange-400';
      case 'Crítica': return 'bg-red-50 text-red-800 border-red-400 ring-1 ring-red-400';
      default: return '';
    }
  };

  const SectionTitle = ({ title, step }: { title: string, step: number }) => (
    <div className="flex items-center gap-3 mb-6 pb-2 border-b border-slate-200">
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-extrabold text-sm">
        {step}
      </span>
      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
    </div>
  );

  const pageTitle = !isEdit ? 'Novo sistema' : isReadonly ? 'Visualizar sistema' : 'Editar sistema';
  const pageSubtitle = !isEdit
    ? 'Preencha as informações para cadastrar um novo sistema no catálogo.'
    : isReadonly
      ? 'Modo consulta: os campos ficam bloqueados para evitar alterações.'
      : 'Atualize as informações do sistema e salve as alterações.';

  const inputBase =
    'w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-primary disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed';

  return (
    <div className="max-w-4xl mx-auto">
      <PageTitlebar
        title={pageTitle}
        subtitle={pageSubtitle}
        backTo={backTo}
        actions={
          isReadonly && isEdit ? (
            <Link
              to={`/novo?id=${encodeURIComponent(sistemaId!)}&from=${encodeURIComponent(from || 'catalogo')}`}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors"
              title="Editar"
            >
              <Pencil className="w-4 h-4 mr-2" />
              Editar
            </Link>
          ) : (
            <button
              onClick={() => navigate(backTo)}
              className="p-2 text-slate-400 hover:text-slate-600"
              aria-label="Fechar"
              title="Fechar"
              type="button"
            >
              <X size={22} />
            </button>
          )
        }
      />

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Bloco 1: Identificação */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <SectionTitle title="Identificação Básica" step={1} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Nome do Sistema *</label>
              <input
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                type="text"
                className={inputBase}
                placeholder="Ex: Sistema de Gestão Financeira"
                disabled={isReadonly}
              />
              {submitted && !formData.nome.trim() ? (
                <p className="mt-1 text-xs text-red-600">Informe o nome do sistema.</p>
              ) : null}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Sigla *</label>
              <input
                name="sigla"
                value={formData.sigla}
                onChange={handleChange}
                type="text"
                className={`${inputBase} uppercase`}
                placeholder="Ex: SGF"
                disabled={isReadonly}
              />
              {submitted && !formData.sigla.trim() ? (
                <p className="mt-1 text-xs text-red-600">Informe a sigla do sistema.</p>
              ) : null}
            </div>
            <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Tipo *</label>
               <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className={`${inputBase} bg-white`}
                disabled={isReadonly}
               >
                 {Object.values(TipoSistema).map(t => (
                   <option key={t} value={t}>{t}</option>
                 ))}
               </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Descrição</label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                rows={3}
                className={inputBase}
                placeholder="Breve descrição do objetivo do sistema..."
                disabled={isReadonly}
              />
            </div>
          </div>
        </div>

        {/* Bloco 2: Responsáveis */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <SectionTitle title="Responsáveis e Governança" step={2} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">Área de Negócio</label>
              <input
                name="area"
                value={formData.area}
                onChange={handleChange}
                type="text"
                className={inputBase}
                placeholder="Ex: Financeiro"
                disabled={isReadonly}
              />
            </div>
             <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Fornecedor</label>
              <input
                name="fornecedor"
                value={formData.fornecedor}
                onChange={handleChange}
                type="text"
                className={inputBase}
                placeholder="Interno ou Nome da Empresa"
                disabled={isReadonly}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Dono do Negócio (Business Owner)</label>
              <input
                name="dono"
                value={formData.dono}
                onChange={handleChange}
                type="text"
                className={inputBase}
                disabled={isReadonly}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Líder Técnico (Tech Lead)</label>
              <input
                name="techLead"
                value={formData.techLead}
                onChange={handleChange}
                type="text"
                className={inputBase}
                disabled={isReadonly}
              />
            </div>
          </div>
        </div>

        {/* Bloco 3: Técnico */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <SectionTitle title="Detalhes Técnicos" step={3} />
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tecnologias (Separar por vírgula)</label>
              <input
                name="tecnologias"
                value={formData.tecnologias}
                onChange={handleChange}
                type="text"
                className={inputBase}
                placeholder="Ex: React, Java, Oracle..."
                disabled={isReadonly}
              />
            </div>
          </div>
        </div>

        {/* Bloco 4: Status */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <SectionTitle title="Ciclo de Vida" step={4} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Status */}
             <div className="md:col-span-2">
               <label className="block text-sm font-medium text-slate-700 mb-3">Status Atual</label>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                 {Object.values(StatusSistema).map((status) => {
                   const isSelected = formData.status === status;
                   return (
                     <div 
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      className={`
                        relative flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200
                        ${isReadonly ? 'cursor-not-allowed opacity-75' : ''}
                        ${isSelected ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}
                      `}
                     >
                        <div className={`w-3 h-3 rounded-full mr-3 ${getStatusColor(status).split(' ')[0]}`}></div>
                        <span className={`text-sm font-medium ${isSelected ? 'text-primary' : 'text-slate-700'}`}>
                          {status}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="w-5 h-5 text-primary absolute right-3" />
                        )}
                     </div>
                   );
                 })}
               </div>
            </div>

            {/* Criticidade */}
            <div className="md:col-span-2 pt-2">
              <label className="block text-sm font-medium text-slate-700 mb-3">Nível de Criticidade</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Baixa', 'Média', 'Alta', 'Crítica'].map((level) => {
                  const isSelected = formData.criticidade === level;
                  return (
                    <button
                      key={level}
                      type="button"
                      onClick={() => !isReadonly && setFormData(prev => ({ ...prev, criticidade: level }))}
                      disabled={isReadonly}
                      aria-disabled={isReadonly}
                      className={`
                        flex items-center justify-center px-4 py-3 rounded-lg border-2 font-medium transition-all
                        ${getCriticidadeStyle(level, isSelected)}
                        ${isReadonly ? 'cursor-not-allowed opacity-75' : ''}
                      `}
                    >
                      {level === 'Crítica' && <AlertTriangle className="w-4 h-4 mr-2" />}
                      {level}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Data de Implantação</label>
              <input
                name="dataImplantacao"
                value={formData.dataImplantacao}
                onChange={handleChange}
                type="date"
                className={inputBase}
                disabled={isReadonly}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-4 pb-8">
          <button
            type="button"
            onClick={() => navigate(backTo)}
            className="px-6 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            {isReadonly ? 'Voltar' : 'Cancelar'}
          </button>
          {!isReadonly ? (
            <button
              type="submit"
              className="inline-flex items-center px-6 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors shadow-sm"
            >
              <Save className="w-4 h-4 mr-2" />
              {isEdit ? 'Salvar alterações' : 'Salvar sistema'}
            </button>
          ) : null}
        </div>

      </form>
    </div>
  );
};

export default NovoSistemaPage;
