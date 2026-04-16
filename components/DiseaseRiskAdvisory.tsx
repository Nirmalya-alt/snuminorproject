
import React from 'react';
import { TRANSLATIONS } from '../constants';
import { Language, DiseaseRisk } from '../types';
import { ShieldAlert, Info } from 'lucide-react';

interface DiseaseRiskAdvisoryProps {
  lang: Language;
  humidity: number;
  temperature: number;
  crop: string;
}

const DiseaseRiskAdvisory: React.FC<DiseaseRiskAdvisoryProps> = ({ lang, humidity, temperature, crop }) => {
  const t = TRANSLATIONS[lang];

  // Simple logic to predict disease risk
  const getRisk = (): DiseaseRisk => {
    if (humidity > 80 && temperature > 25) {
      return { level: 'High', reason: `High humidity (${humidity}%) and temperature (${temperature}°C) are ideal for fungal growth in ${crop}.` };
    } else if (humidity > 60 || temperature > 30) {
      return { level: 'Medium', reason: `Moderate humidity and temperature may increase risk of pests in ${crop}.` };
    }
    return { level: 'Low', reason: `Current conditions are stable for ${crop}.` };
  };

  const risk = getRisk();

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High': return 'text-red-600 bg-red-50 border-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-100';
      default: return 'text-green-600 bg-green-50 border-green-100';
    }
  };

  return (
    <div className={`p-6 rounded-2xl border ${getRiskColor(risk.level)} shadow-sm`}>
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <ShieldAlert /> {t.labels.risk}
      </h3>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold uppercase tracking-wider">{t.results.riskLevel}</span>
          <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${
            risk.level === 'High' ? 'bg-red-600 text-white' : 
            risk.level === 'Medium' ? 'bg-yellow-500 text-white' : 
            'bg-green-600 text-white'
          }`}>
            {risk.level}
          </span>
        </div>
        <div className="flex gap-3 items-start p-3 bg-white/50 rounded-xl">
          <Info size={18} className="shrink-0 mt-0.5" />
          <p className="text-sm leading-relaxed">{risk.reason}</p>
        </div>
      </div>
    </div>
  );
};

export default DiseaseRiskAdvisory;
