
import React from 'react';
import { TRANSLATIONS } from '../constants';
import { Language, FertilizerAdvisory as FertilizerType } from '../types';
import { FlaskConical, Info } from 'lucide-react';

interface FertilizerAdvisoryProps {
  lang: Language;
  soil: { nitrogen: number; phosphorus: number; potassium: number };
}

const FertilizerAdvisory: React.FC<FertilizerAdvisoryProps> = ({ lang, soil }) => {
  const t = TRANSLATIONS[lang];

  // Simple logic for fertilizer based on NPK
  const getAdvisory = (): FertilizerType => {
    const advice: string[] = [];
    let status: 'Low' | 'Sufficient' | 'Balanced' = 'Balanced';

    if (soil.nitrogen < 50) {
      advice.push("Nitrogen low → add urea or organic compost.");
      status = 'Low';
    } else if (soil.nitrogen > 150) {
      advice.push("Nitrogen high → avoid adding more urea.");
    }

    if (soil.phosphorus < 30) {
      advice.push("Phosphorus low → add DAP or superphosphate.");
      status = 'Low';
    } else if (soil.phosphorus > 100) {
      advice.push("Phosphorus high → avoid adding more DAP.");
    }

    if (soil.potassium < 40) {
      advice.push("Potassium low → add MOP or wood ash.");
      status = 'Low';
    } else if (soil.potassium > 120) {
      advice.push("Potassium high → avoid adding more MOP.");
    }

    if (advice.length === 0) {
      advice.push("Balanced soil condition. Continue regular organic maintenance.");
      status = 'Balanced';
    }

    return { advice, status };
  };

  const advisory = getAdvisory();

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <FlaskConical className="text-green-500" /> {t.labels.fertilizer}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 p-6 rounded-xl flex flex-col items-center justify-center text-center">
          <FlaskConical className="w-12 h-12 text-green-500 mb-2" />
          <div className="text-sm text-green-700 font-medium uppercase tracking-wider">Soil Status</div>
          <div className={`text-2xl font-black ${
            advisory.status === 'Low' ? 'text-red-700' :
            advisory.status === 'Sufficient' ? 'text-green-700' :
            'text-blue-700'
          }`}>{advisory.status}</div>
        </div>

        <div className="flex flex-col justify-center space-y-4">
          <ul className="space-y-2">
            {advisory.advice.map((a, i) => (
              <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 shrink-0" /> {a}
              </li>
            ))}
          </ul>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-start gap-2">
            <Info size={16} className="text-gray-400 mt-1 shrink-0" />
            <p className="text-xs text-gray-600">
              Based on NPK values: {soil.nitrogen}N, {soil.phosphorus}P, {soil.potassium}K.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FertilizerAdvisory;
