
import React from 'react';
import { TRANSLATIONS } from '../constants';
import { Language, LocationData, SoilData, ClimateData, CropPredictionResult } from '../types';
import { FileText, MapPin, FlaskConical, CloudRain, Sprout, CheckCircle2 } from 'lucide-react';

interface FarmerReportProps {
  lang: Language;
  location: LocationData;
  soil: SoilData;
  climate: ClimateData;
  result: CropPredictionResult;
  onClose: () => void;
  isStandalone?: boolean;
}

const FarmerReport: React.FC<FarmerReportProps> = ({ lang, location, soil, climate, result, onClose, isStandalone = false }) => {
  const t = TRANSLATIONS[lang];

  const handlePrint = () => {
    try {
      window.focus();
      if (typeof window.print === 'function') {
        window.print();
      }
    } catch (error) {
      console.error("Print error:", error);
    }
  };

  const content = (
    <div className={`bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden printable-content ${isStandalone ? '' : 'animate-scale-in'}`}>
      <div className="bg-green-600 p-6 text-white flex justify-between items-center no-print">
        <div className="flex items-center gap-3">
          <FileText size={24} />
          <h2 className="text-xl font-bold">{t.nav.report}</h2>
        </div>
        {!isStandalone && <button onClick={onClose} className="text-white/80 hover:text-white text-2xl font-bold">&times;</button>}
      </div>

      <div className={`p-8 space-y-8 ${isStandalone ? '' : 'max-h-[80vh] overflow-y-auto'}`}>
        {/* Header Info */}
        <div className="flex justify-between items-start border-b border-gray-100 pb-6">
          <div>
            <h3 className="text-2xl font-black text-gray-900">{result.predictedCrop}</h3>
            <p className="text-green-600 font-bold">{location.district}, {location.state}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Date</p>
            <p className="font-bold text-gray-700">{new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <MapPin size={14} /> {t.labels.locationDetails}
            </h4>
            <div className="bg-gray-50 p-4 rounded-xl space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{t.labels.state}</span>
                <span className="font-bold text-gray-700">{location.state}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{t.labels.district}</span>
                <span className="font-bold text-gray-700">{location.district}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <FlaskConical size={14} /> {t.labels.soilHealth}
            </h4>
            <div className="bg-gray-50 p-4 rounded-xl space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{t.labels.soilType}</span>
                <span className="font-bold text-gray-700">{soil.type}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">NPK</span>
                <span className="font-bold text-gray-700">{soil.nitrogen}-{soil.phosphorus}-{soil.potassium}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Prediction Summary */}
        <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
          <div className="flex items-center gap-3 mb-4">
            <Sprout className="text-green-600" />
            <h4 className="font-bold text-green-900">Prediction Summary</h4>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <p className="text-xs text-gray-400 font-bold uppercase mb-1">{t.results.predictedYield}</p>
              <p className="text-xl font-black text-green-700">{result.predictedYield} <span className="text-xs font-normal text-gray-500">kg/ha</span></p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <p className="text-xs text-gray-400 font-bold uppercase mb-1">Climate Match</p>
              <p className="text-xl font-black text-blue-700">High</p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="space-y-4">
          <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <CheckCircle2 size={14} /> Next Steps & Advice
          </h4>
          <div className="space-y-3">
            <div className="flex gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <CloudRain className="text-blue-600 shrink-0" size={20} />
              <div>
                <p className="text-sm font-bold text-blue-900">{t.labels.irrigation}</p>
                <p className="text-xs text-blue-700">Based on {soil.type} soil and {climate.rainfall}mm rainfall, maintain moderate moisture.</p>
              </div>
            </div>
            <div className="flex gap-3 p-4 bg-purple-50 rounded-xl border border-purple-100">
              <FlaskConical className="text-purple-600 shrink-0" size={20} />
              <div>
                <p className="text-sm font-bold text-purple-900">{t.labels.fertilizer}</p>
                <p className="text-xs text-purple-700">Apply nitrogen-rich fertilizer if growth appears stunted.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gray-50 border-t border-gray-100 flex gap-4 no-print">
        <button 
          onClick={handlePrint}
          className="flex-1 bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-100"
        >
          Print Report
        </button>
        {!isStandalone && (
          <button 
            onClick={onClose}
            className="flex-1 bg-white border border-gray-200 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-50 transition-all"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );

  if (isStandalone) {
    return content;
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 no-print">
      {content}
    </div>
  );
};

export default FarmerReport;
