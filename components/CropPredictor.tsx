
import React, { useState, useEffect } from 'react';
import { TRANSLATIONS, INDIAN_STATES, SOIL_TYPES } from '../constants';
import { Language, LocationData, SoilData, ClimateData, CropPredictionResult } from '../types';
import { getCropPrediction } from '../services/gemini';
import LoadingScreen from './LoadingScreen';
import WeatherAdvisory from './WeatherAdvisory';
import IrrigationAdvisory from './IrrigationAdvisory';
import FertilizerAdvisory from './FertilizerAdvisory';
import CropCalendar from './CropCalendar';
import FarmerReport from './FarmerReport';
import DiseaseRiskAdvisory from './DiseaseRiskAdvisory';
import { MapPin, Thermometer, Droplets, CloudRain, FlaskConical, Sprout, TrendingUp, Info, ChevronLeft, FileText, ArrowRight, AlertTriangle, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CropPredictorProps {
  lang: Language;
  initialMode?: 'yield' | 'recommendation';
  location: LocationData;
  setLocation: (loc: LocationData) => void;
  soil: SoilData;
  setSoil: (soil: SoilData) => void;
  climate: ClimateData;
  setClimate: (climate: ClimateData) => void;
  result: CropPredictionResult | null;
  setResult: (res: CropPredictionResult | null) => void;
}

const CropPredictor: React.FC<CropPredictorProps> = ({ 
  lang, 
  initialMode = 'yield',
  location,
  setLocation,
  soil,
  setSoil,
  climate,
  setClimate,
  result,
  setResult
}) => {
  const t = TRANSLATIONS[lang];
  const [loading, setLoading] = useState(false);
  const [showReport, setShowReport] = useState(false);
  
  const [districtQuery, setDistrictQuery] = useState(location.district);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const districts = location.state ? INDIAN_STATES[location.state] : [];
  const filteredDistricts = districts.filter(d => 
    d.toLowerCase().includes(districtQuery.toLowerCase())
  );

  useEffect(() => {
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
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to get prediction. Please check your internet and API settings.");
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
        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
            {initialMode === 'yield' ? (
              <><TrendingUp className="text-green-600" /> {t.nav.predictor}</>
            ) : (
              <><Sprout className="text-green-600" /> {t.nav.recommendation}</>
            )}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Location Section */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <MapPin size={16} /> {t.labels.locationDetails}
              </h3>
              <div className="grid grid-cols-1 gap-4">
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
                    <option value="">{t.placeholders.selectState}</option>
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
                    placeholder={t.placeholders.selectDistrict}
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
            </div>

            {/* Soil Section */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <FlaskConical size={16} /> {t.labels.soilHealth}
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.labels.soilType}</label>
                  <select
                    value={soil.type}
                    onChange={(e) => setSoil({ ...soil, type: e.target.value })}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                  >
                    {SOIL_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">{t.labels.nitrogen}</label>
                    <input
                      type="number" required
                      value={soil.nitrogen || ''} onChange={(e) => setSoil({ ...soil, nitrogen: Number(e.target.value) })}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                      placeholder="N"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">{t.labels.phosphorus}</label>
                    <input
                      type="number" required
                      value={soil.phosphorus || ''} onChange={(e) => setSoil({ ...soil, phosphorus: Number(e.target.value) })}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                      placeholder="P"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">{t.labels.potassium}</label>
                    <input
                      type="number" required
                      value={soil.potassium || ''} onChange={(e) => setSoil({ ...soil, potassium: Number(e.target.value) })}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                      placeholder="K"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Climate Section */}
            <div className="space-y-6 md:col-span-2">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <CloudRain size={16} /> {t.labels.climateConditions}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.labels.rainfall}</label>
                  <div className="relative">
                    <CloudRain className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <input
                      type="number" required
                      value={climate.rainfall || ''} onChange={(e) => setClimate({ ...climate, rainfall: Number(e.target.value) })}
                      className="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                      placeholder="mm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.labels.temperature}</label>
                  <div className="relative">
                    <Thermometer className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <input
                      type="number" required
                      value={climate.temperature || ''} onChange={(e) => setClimate({ ...climate, temperature: Number(e.target.value) })}
                      className="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                      placeholder="°C"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.labels.humidity}</label>
                  <div className="relative">
                    <Droplets className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <input
                      type="number" required
                      value={climate.humidity || ''} onChange={(e) => setClimate({ ...climate, humidity: Number(e.target.value) })}
                      className="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                      placeholder="%"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col md:flex-row gap-4">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-200 flex items-center justify-center gap-2"
            >
              <Sprout size={20} /> {t.labels.predict}
            </button>
            <button
              type="button"
              onClick={() => { 
                setLocation({ state: '', district: '' }); 
                setSoil({ nitrogen: 0, phosphorus: 0, potassium: 0, type: 'Loamy' }); 
                setClimate({ rainfall: 0, temperature: 0, humidity: 0 }); 
                setDistrictQuery('');
              }}
              className="px-8 bg-white border border-gray-200 text-gray-600 font-bold py-4 rounded-xl hover:bg-gray-50 transition-colors"
            >
              {t.labels.reset}
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-8 animate-fade-in">
          {/* Back Button */}
          <button
            onClick={() => setResult(null)}
            className="flex items-center gap-2 text-green-700 font-bold hover:gap-3 transition-all"
          >
            <ChevronLeft size={20} /> {t.labels.back}
          </button>

          {/* Main Prediction Card */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-green-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <button
                onClick={() => setShowReport(true)}
                className="bg-green-50 text-green-700 font-bold px-4 py-2 rounded-xl hover:bg-green-100 transition-all flex items-center gap-2"
              >
                <FileText size={18} /> {t.labels.generateReport}
              </button>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
              <div>
                <h2 className="text-sm font-bold text-green-600 uppercase tracking-widest mb-1">{t.results.predictedCrop}</h2>
                <h3 className="text-4xl font-black text-gray-900">{result.predictedCrop}</h3>
              </div>
              <div className="bg-green-600 text-white p-6 rounded-2xl shadow-lg shadow-green-200 text-center min-w-[200px]">
                <div className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">{t.results.predictedYield}</div>
                <div className="text-3xl font-black">{result.predictedYield}</div>
                <div className="text-xs font-medium">{t.labels.kgPerHectare}</div>
              </div>
            </div>

            <div className="p-6 bg-green-50 rounded-2xl border border-green-100 flex items-start gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                <Info size={20} className="text-green-600" />
              </div>
              <div>
                <h4 className="font-bold text-green-900 mb-1">{t.results.explanation}</h4>
                <p className="text-green-800 leading-relaxed">{result.explanation}</p>
              </div>
            </div>
          </div>

          {/* Top Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {result.topCrops.map((crop, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-green-200 transition-all">
                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center font-black mb-4">
                  {i + 1}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">{crop.name}</h4>
                <div className="text-sm font-bold text-green-600 mb-3">{crop.yield} kg/ha</div>
                <p className="text-sm text-gray-600 leading-relaxed">{crop.reason}</p>
              </div>
            ))}
          </div>

          {/* Next Steps / Advisories Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <TrendingUp className="text-green-600" size={24} /> {t.nav.recommendation} & Advisories
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link to="/weather" className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-green-300 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CloudRain size={20} />
                  </div>
                  <span className="font-bold text-gray-700">{t.nav.weather}</span>
                </div>
                <ArrowRight size={18} className="text-gray-300 group-hover:text-green-500 transition-colors" />
              </Link>

              <Link to="/irrigation" className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-green-300 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyan-50 text-cyan-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Droplets size={20} />
                  </div>
                  <span className="font-bold text-gray-700">{t.nav.irrigation}</span>
                </div>
                <ArrowRight size={18} className="text-gray-300 group-hover:text-green-500 transition-colors" />
              </Link>

              <Link to="/fertilizer" className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-green-300 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FlaskConical size={20} />
                  </div>
                  <span className="font-bold text-gray-700">{t.nav.fertilizer}</span>
                </div>
                <ArrowRight size={18} className="text-gray-300 group-hover:text-green-500 transition-colors" />
              </Link>

              <Link to="/risk" className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-green-300 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <AlertTriangle size={20} />
                  </div>
                  <span className="font-bold text-gray-700">{t.nav.risk}</span>
                </div>
                <ArrowRight size={18} className="text-gray-300 group-hover:text-green-500 transition-colors" />
              </Link>

              <Link to="/calendar" className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-green-300 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Calendar size={20} />
                  </div>
                  <span className="font-bold text-gray-700">{t.nav.calendar}</span>
                </div>
                <ArrowRight size={18} className="text-gray-300 group-hover:text-green-500 transition-colors" />
              </Link>

              <Link to="/report" className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-green-300 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText size={20} />
                  </div>
                  <span className="font-bold text-gray-700">{t.nav.report}</span>
                </div>
                <ArrowRight size={18} className="text-gray-300 group-hover:text-green-500 transition-colors" />
              </Link>
            </div>
          </div>

          {showReport && (
            <FarmerReport 
              lang={lang}
              location={location}
              soil={soil}
              climate={climate}
              result={result}
              onClose={() => setShowReport(false)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CropPredictor;