
import React, { useState, useEffect } from 'react';
import { TRANSLATIONS, INDIAN_STATES } from '../constants';
import { Language, LocationData, SoilData, ClimateData, CropPredictionResult } from '../types';
import { getCropPrediction } from '../services/gemini';
import LoadingScreen from './LoadingScreen';

interface CropPredictorProps {
  lang: Language;
}

const CropPredictor: React.FC<CropPredictorProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<LocationData>({ state: '', district: '' });
  const [soil, setSoil] = useState<SoilData>({ nitrogen: '', phosphorus: '', potassium: '', ph: '', type: 'Alluvial' });
  const [climate, setClimate] = useState<ClimateData>({ rainfall: '', temperature: '' });
  const [result, setResult] = useState<CropPredictionResult | null>(null);
  
  // District autocomplete state
  const [districtQuery, setDistrictQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const districts = location.state ? INDIAN_STATES[location.state] : [];
  const filteredDistricts = districts.filter(d => 
    d.toLowerCase().includes(districtQuery.toLowerCase())
  );

  useEffect(() => {
    // Reset district when state changes
    setDistrictQuery(location.district);
  }, [location.district]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.state || !location.district) {
      alert("Please select both State and District");
      return;
    }
    setLoading(true);
    try {
      const res = await getCropPrediction(location, soil, climate);
      setResult(res);
    } catch (error) {
      console.error(error);
      alert("Error predicting crop. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <LoadingScreen messages={[
        t.loading.fetching,
        t.loading.analyzingSoil,
        t.loading.processingRain,
        t.loading.estimatingYield,
        t.loading.generatingReport
      ]} />
    );
  }

  return (
    <div className="space-y-6">
      {!result ? (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.nav.predictor}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location with Autocomplete District */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.labels.state}</label>
                <select
                  required
                  value={location.state}
                  onChange={(e) => {
                    setLocation({ ...location, state: e.target.value, district: '' });
                    setDistrictQuery('');
                  }}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                >
                  <option value="">{t.labels.state}</option>
                  {Object.keys(INDIAN_STATES).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.labels.district}</label>
                <input
                  type="text"
                  required
                  disabled={!location.state}
                  value={districtQuery}
                  placeholder={t.placeholders.searchDistrict}
                  autoComplete="off"
                  onFocus={() => setShowSuggestions(true)}
                  onChange={(e) => {
                    setDistrictQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none disabled:opacity-50"
                />
                {showSuggestions && location.state && filteredDistricts.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                    {filteredDistricts.map(d => (
                      <div
                        key={d}
                        onClick={() => {
                          setLocation({ ...location, district: d });
                          setDistrictQuery(d);
                          setShowSuggestions(false);
                        }}
                        className="p-3 hover:bg-green-50 cursor-pointer text-sm text-gray-700 font-medium border-b border-gray-50 last:border-0"
                      >
                        {d}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Soil */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.labels.soilType}</label>
                <select
                  value={soil.type}
                  onChange={(e) => setSoil({ ...soil, type: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                >
                  <option value="Alluvial">Alluvial</option>
                  <option value="Black">Black (Regur)</option>
                  <option value="Red">Red</option>
                  <option value="Laterite">Laterite</option>
                  <option value="Arid">Arid / Sandy</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.labels.ph}</label>
                  <input
                    type="number" step="0.1" required
                    value={soil.ph} onChange={(e) => setSoil({ ...soil, ph: e.target.value })}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="e.g. 6.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.labels.nitrogen}</label>
                  <input
                    type="number" required
                    value={soil.nitrogen} onChange={(e) => setSoil({ ...soil, nitrogen: e.target.value })}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="mg/kg"
                  />
                </div>
              </div>
            </div>

            {/* More Soil & Climate */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.labels.phosphorus}</label>
                <input
                  type="number" required
                  value={soil.phosphorus} onChange={(e) => setSoil({ ...soil, phosphorus: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="P"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.labels.potassium}</label>
                <input
                  type="number" required
                  value={soil.potassium} onChange={(e) => setSoil({ ...soil, potassium: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="K"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.labels.rainfall}</label>
                <input
                  type="number" required
                  value={climate.rainfall} onChange={(e) => setClimate({ ...climate, rainfall: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="mm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.labels.temperature}</label>
                <input
                  type="number" required
                  value={climate.temperature} onChange={(e) => setClimate({ ...climate, temperature: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="°C"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-200"
            >
              {t.labels.predict}
            </button>
            <button
              type="button"
              onClick={() => { 
                setLocation({ state: '', district: '' }); 
                setSoil({ nitrogen: '', phosphorus: '', potassium: '', ph: '', type: 'Alluvial' }); 
                setClimate({ rainfall: '', temperature: '' }); 
                setDistrictQuery('');
              }}
              className="px-6 bg-white border border-gray-200 text-gray-600 font-medium py-4 rounded-xl hover:bg-gray-50 transition-colors"
            >
              {t.labels.reset}
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-green-100">
          <div className="flex justify-between items-start mb-8">
            <h2 className="text-3xl font-bold text-gray-900">{t.nav.report}</h2>
            <div className={`px-4 py-1 rounded-full text-sm font-bold ${
              result.suitabilityScore === 'High' ? 'bg-green-100 text-green-700' :
              result.suitabilityScore === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {t.results.suitability}: {result.suitabilityScore}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-green-50 p-6 rounded-xl border border-green-100">
              <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
                🌾 {t.results.recommended}
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.bestCrops.map((crop, i) => (
                  <span key={i} className="bg-white px-4 py-2 rounded-lg border border-green-200 font-medium text-green-900">
                    {crop}
                  </span>
                ))}
              </div>
              <div className="mt-6">
                <p className="text-sm text-green-700 font-medium uppercase tracking-wider">{t.results.yield}</p>
                <p className="text-2xl font-bold text-green-900">{result.estimatedYield}</p>
              </div>
            </div>

            <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
              <h3 className="text-lg font-bold text-amber-800 mb-4 flex items-center gap-2">
                ⚠️ {t.results.risks}
              </h3>
              <ul className="space-y-2">
                {result.riskFactors.map((risk, i) => (
                  <li key={i} className="flex items-start gap-2 text-amber-900">
                    <span className="text-amber-500">•</span> {risk}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-8">
            <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center gap-2">
              💡 {t.results.tips}
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.improvementTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-blue-900">
                  <div className="mt-1 w-5 h-5 bg-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">{i+1}</div>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setResult(null)}
              className="flex-1 bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 transition-colors shadow-lg"
            >
              ← Back to Analysis
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropPredictor;
