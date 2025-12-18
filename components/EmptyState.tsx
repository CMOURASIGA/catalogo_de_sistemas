import React from 'react';
import { LucideIcon } from 'lucide-react';

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
};

const EmptyState: React.FC<EmptyStateProps> = ({ title, description, icon: Icon, action }) => {
  return (
    <div className="py-10 text-center bg-white rounded-xl border border-dashed border-slate-300">
      {Icon ? (
        <div className="mx-auto mb-3 inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-500">
          <Icon className="w-6 h-6" />
        </div>
      ) : null}
      <p className="font-semibold text-slate-700">{title}</p>
      {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
      {action ? <div className="mt-4 flex items-center justify-center">{action}</div> : null}
    </div>
  );
};

export default EmptyState;
