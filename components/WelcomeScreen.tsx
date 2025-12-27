import React from 'react';
import { Stethoscope, ShieldAlert } from 'lucide-react';

const WelcomeScreen: React.FC<{ onStart: (msg: string) => void }> = ({ onStart }) => {
  const suggestions = [
    "I have a throbbing headache and sensitivity to light.",
    "My throat is sore and I have a mild fever.",
    "I have a sharp pain in my lower back when I bend over.",
    "I've been feeling unusually tired for two weeks."
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto px-6 text-center overflow-y-auto">
      <div className="bg-medical-50 p-6 rounded-full mb-6">
        <Stethoscope className="w-16 h-16 text-medical-600" />
      </div>
      
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
        How can I help you today?
      </h2>
      <p className="text-slate-600 mb-8 max-w-md">
        I can help check your symptoms, answer medical questions, and guide you on next steps.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full mb-8">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onStart(suggestion)}
            className="p-4 text-left bg-white border border-slate-200 rounded-xl hover:border-medical-400 hover:shadow-md transition-all text-sm text-slate-700 active:scale-95"
          >
            "{suggestion}"
          </button>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3 text-left w-full max-w-lg">
        <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-amber-800">
          <p className="font-semibold mb-1">Disclaimer</p>
          I am an AI assistant, not a human doctor. My insights are for informational purposes only. In case of emergency, call your local emergency number immediately.
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;