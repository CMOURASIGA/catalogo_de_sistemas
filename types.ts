export enum StatusSistema {
  EM_USO = 'Em Uso',
  IMPLANTACAO = 'Em Implantação',
  DESCONTINUADO = 'Descontinuado',
  SUBSTITUICAO = 'Em Substituição',
  LEGADO = 'Legado'
}

export enum TipoSistema {
  WEB = 'Web App',
  DESKTOP = 'Desktop',
  MOBILE = 'Mobile App',
  API = 'API/Service',
  ERP = 'Módulo ERP'
}

export interface Integracao {
  id: string;
  sistemaOrigemId: string;
  sistemaDestinoId: string;
  tipo: 'API REST' | 'SOAP' | 'Banco de Dados' | 'Arquivo' | 'Mensageria' | 'API / Feed';
  descricao: string;
}

export interface Sistema {
  id: string;
  sigla: string;
  nome: string;
  descricao: string;
  status: StatusSistema;
  tipo: TipoSistema;
  areaNegocio: string; // Ex: Financeiro, RH, Logística
  donoNegocio: string; // Business Owner
  liderTecnico: string; // Tech Lead
  fornecedor: string; // Interno ou Nome da Empresa
  tecnologias: string[];
  linkProducao?: string;
  linkDocumentacao?: string;
  dataImplantacao?: string;
  criticidade: 'Baixa' | 'Média' | 'Alta' | 'Crítica';
}

export interface DashboardStats {
  total: number;
  emUso: number;
  implantacao: number;
  descontinuado: number;
  substituicao: number;
}