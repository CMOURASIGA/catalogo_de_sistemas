import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { MOCK_SISTEMAS } from '../constants';
import { StatusSistema } from '../types';
import { Server, Activity, AlertTriangle, ArrowUpRight } from 'lucide-react';
import PageTitlebar from '../components/PageTitlebar';

const DashboardPage: React.FC = () => {
  // Calculate Stats
  const total = MOCK_SISTEMAS.length;
  const emUso = MOCK_SISTEMAS.filter(s => s.status === StatusSistema.EM_USO).length;
  const implantacao = MOCK_SISTEMAS.filter(s => s.status === StatusSistema.IMPLANTACAO).length;
  const criticos = MOCK_SISTEMAS.filter(s => s.criticidade === 'Crítica' || s.criticidade === 'Alta').length;

  // Data for Status Pie Chart
  const statusData = [
    { name: 'Em Uso', value: emUso, color: '#22c55e' },
    { name: 'Implantação', value: implantacao, color: '#f59e0b' },
    { name: 'Substituição', value: MOCK_SISTEMAS.filter(s => s.status === StatusSistema.SUBSTITUICAO).length, color: '#a855f7' },
    { name: 'Descontinuado', value: MOCK_SISTEMAS.filter(s => s.status === StatusSistema.DESCONTINUADO).length, color: '#ef4444' },
    { name: 'Legado', value: MOCK_SISTEMAS.filter(s => s.status === StatusSistema.LEGADO).length, color: '#64748b' },
  ].filter(d => d.value > 0);

  // Data for Area Bar Chart
  const areaCount: Record<string, number> = {};
  MOCK_SISTEMAS.forEach(s => {
    areaCount[s.areaNegocio] = (areaCount[s.areaNegocio] || 0) + 1;
  });
  const areaData = Object.keys(areaCount).map(area => ({
    name: area,
    sistemas: areaCount[area],
  }));

  const StatCard = ({ title, value, icon: Icon, color, subtitle }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span className="text-3xl font-bold text-slate-800">{value}</span>
      </div>
      <h3 className="text-slate-500 font-medium text-sm">{title}</h3>
      {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
    </div>
  );

  return (
    <div className="space-y-6">
      <PageTitlebar title="Dashboard" subtitle="Visão geral do ecossistema de sistemas." />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total de Sistemas" 
          value={total} 
          icon={Server} 
          color="bg-primary"
          subtitle="Cadastrados no catálogo"
        />
        <StatCard 
          title="Em Operação" 
          value={emUso} 
          icon={Activity} 
          color="bg-accent" 
          subtitle="Sistemas ativos"
        />
        <StatCard 
          title="Em Implantação" 
          value={implantacao} 
          icon={ArrowUpRight} 
          color="bg-secondary" 
          subtitle="Projetos em andamento"
        />
        <StatCard 
          title="Alta Criticidade" 
          value={criticos} 
          icon={AlertTriangle} 
          color="bg-red-500" 
          subtitle="Requerem atenção constante"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Distribuição por Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Area Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Sistemas por Área de Negócio</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={areaData} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="sistemas" fill="#00247D" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
