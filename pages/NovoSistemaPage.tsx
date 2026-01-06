import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X, CheckCircle2, AlertTriangle } from 'lucide-react';
import { StatusSistema, TipoSistema } from '../types';

const NovoSistemaPage: React.FC = () => {
  const navigate = useNavigate();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (status: StatusSistema) => {
    setFormData(prev => ({ ...prev, status }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Sistema cadastrado com sucesso! (Mock)');
    navigate('/catalogo');
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
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">
        {step}
      </span>
      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Novo Sistema</h2>
          <p className="text-slate-500">Preencha as informações para cadastrar um novo sistema no catálogo.</p>
        </div>
        <button onClick={() => navigate('/catalogo')} className="p-2 text-slate-400 hover:text-slate-600">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Bloco 1: Identificação */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <SectionTitle title="Identificação Básica" step={1} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Nome do Sistema *</label>
              <input
                required
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ex: Sistema de Gestão Financeira"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Sigla *</label>
              <input
                required
                name="sigla"
                value={formData.sigla}
                onChange={handleChange}
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none uppercase"
                placeholder="Ex: SGF"
              />
            </div>
            <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Tipo *</label>
               <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
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
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Breve descrição do objetivo do sistema..."
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
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ex: Financeiro"
              />
            </div>
             <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Fornecedor</label>
              <input
                name="fornecedor"
                value={formData.fornecedor}
                onChange={handleChange}
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Interno ou Nome da Empresa"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Dono do Negócio (Business Owner)</label>
              <input
                name="dono"
                value={formData.dono}
                onChange={handleChange}
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Líder Técnico (Tech Lead)</label>
              <input
                name="techLead"
                value={formData.techLead}
                onChange={handleChange}
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
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
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ex: React, Java, Oracle..."
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
                        ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}
                      `}
                     >
                        <div className={`w-3 h-3 rounded-full mr-3 ${getStatusColor(status).split(' ')[0]}`}></div>
                        <span className={`text-sm font-medium ${isSelected ? 'text-blue-700' : 'text-slate-700'}`}>
                          {status}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="w-5 h-5 text-blue-600 absolute right-3" />
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
                      onClick={() => setFormData(prev => ({ ...prev, criticidade: level }))}
                      className={`
                        flex items-center justify-center px-4 py-3 rounded-lg border-2 font-medium transition-all
                        ${getCriticidadeStyle(level, isSelected)}
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
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-4 pb-8">
          <button
            type="button"
            onClick={() => navigate('/catalogo')}
            className="px-6 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar Sistema
          </button>
        </div>

      </form>
    </div>
  );
};

export default NovoSistemaPage;