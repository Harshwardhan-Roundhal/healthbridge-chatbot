import React from 'react';
import { Activity, ShieldCheck } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="bg-medical-600 p-2 rounded-lg shadow-lg shadow-medical-200">
          <Activity className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">HealthBridge AI Assistant</h1>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <p className="text-xs text-slate-500 font-medium">Online & Ready to Help</p>
          </div>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-200">
        <ShieldCheck className="w-4 h-4 text-medical-600" />
        <span className="text-xs text-slate-600 font-medium">HIPAA Compliant Protocol (Simulated)</span>
      </div>
    </header>
  );
};

export default Header;