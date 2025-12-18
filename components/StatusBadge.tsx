import React from 'react';
import { StatusSistema } from '../types';

interface StatusBadgeProps {
  status: StatusSistema;
  size?: 'sm' | 'md';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getStatusStyle = (s: StatusSistema) => {
    switch (s) {
      case StatusSistema.EM_USO:
        return 'bg-green-100 text-green-700 border-green-200';
      case StatusSistema.IMPLANTACAO:
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case StatusSistema.DESCONTINUADO:
        return 'bg-red-100 text-red-700 border-red-200';
      case StatusSistema.SUBSTITUICAO:
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case StatusSistema.LEGADO:
        return 'bg-slate-100 text-slate-600 border-slate-200';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-0.5 text-sm';

  return (
    <span className={`inline-flex items-center font-medium rounded-full border ${sizeClasses} ${getStatusStyle(status)}`}>
      {status}
    </span>
  );
};

export default StatusBadge;