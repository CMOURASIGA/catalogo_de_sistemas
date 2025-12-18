import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type PageTitlebarProps = {
  title: string;
  subtitle?: string;
  backTo?: string;
  actions?: React.ReactNode;
};

const PageTitlebar: React.FC<PageTitlebarProps> = ({ title, subtitle, backTo, actions }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          {backTo ? (
            <button
              type="button"
              onClick={() => navigate(backTo)}
              className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              aria-label="Voltar"
              title="Voltar"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          ) : null}
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 truncate">{title}</h1>
        </div>
        {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
      </div>

      {actions ? <div className="flex items-center gap-2 flex-wrap justify-start sm:justify-end">{actions}</div> : null}
    </div>
  );
};

export default PageTitlebar;
