
import React from 'react';
import { TRANSLATIONS } from '../constants';
import { Language, IrrigationAdvisory as IrrigationType } from '../types';
import { Droplets, Info } from 'lucide-react';

interface IrrigationAdvisoryProps {
  lang: Language;
  soilType: string;
  crop: string;
  weather: { temperature: number; humidity: number; rainfall: number };
}

const IrrigationAdvisory: React.FC<IrrigationAdvisoryProps> = ({ lang, soilType, crop, weather }) => {
  const t = TRANSLATIONS[lang];

  // Simple logic for irrigation based on soil, crop, and weather
  const getAdvisory = (): IrrigationType => {
    const isHot = weather.temperature > 30;
    const isDry = weather.humidity < 40;
    const isRaining = weather.rainfall > 10;

    if (isRaining) {
      return { when: "No irrigation needed (rain expected)", waterLevel: 'Low' };
    }

    if (soilType === 'Sandy') {
      return { when: isHot ? "Every 2 days" : "Every 3-4 days", waterLevel: 'Medium' };
    }

    if (soilType === 'Clay') {
      return { when: isHot ? "Every 5-6 days" : "Every 7-8 days", waterLevel: 'Low' };
    }

    return { when: isHot ? "Every 3-4 days" : "Every 5-6 days", waterLevel: 'Medium' };
  };

  const advisory = getAdvisory();

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Droplets className="text-blue-500" /> {t.labels.irrigation}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-xl flex flex-col items-center justify-center text-center">
          <Droplets className="w-12 h-12 text-blue-500 mb-2" />
          <div className="text-sm text-blue-700 font-medium uppercase tracking-wider">{t.results.waterLevel}</div>
          <div className="text-2xl font-black text-blue-900">{advisory.waterLevel}</div>
        </div>

        <div className="flex flex-col justify-center space-y-4">
          <div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">{t.results.whenToIrrigate}</h3>
            <p className="text-xl font-bold text-gray-900">{advisory.when}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-start gap-2">
            <Info size={16} className="text-gray-400 mt-1 shrink-0" />
            <p className="text-xs text-gray-600">
              Based on {soilType} soil and current weather conditions ({weather.temperature}°C, {weather.humidity}% humidity).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IrrigationAdvisory;
