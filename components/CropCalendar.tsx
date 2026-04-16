
import React, { useState, useEffect } from 'react';
import { TRANSLATIONS } from '../constants';
import { Language, LocationData, ClimateData, DynamicCropCalendar } from '../types';
import { Calendar, Info, AlertTriangle, CheckCircle, Leaf, CloudSun, TrendingUp } from 'lucide-react';
import { getDynamicCropCalendar } from '../services/gemini';
import LoadingScreen from './LoadingScreen';

interface CropCalendarProps {
  lang: Language;
  crop: string;
  location: LocationData;
  climate: ClimateData;
}

const CropCalendar: React.FC<CropCalendarProps> = ({ lang, crop, location, climate }) => {
  const t = TRANSLATIONS[lang];
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DynamicCropCalendar | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCalendar = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getDynamicCropCalendar(crop, location, climate);
        setData(result);
      } catch (err) {
        console.error(err);
        setError("Failed to load dynamic calendar. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCalendar();
  }, [crop, location, climate]);

  if (loading) {
    return <LoadingScreen messages={["Analyzing seasonal patterns...", "Integrating weather data...", "Calculating NDVI trends...", "Generating activity calendar..."]} />;
  }

  if (error || !data) {
    return (
      <div className="bg-white p-12 rounded-3xl border border-red-100 text-center shadow-sm">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
          <AlertTriangle size={32} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Calendar Unavailable</h3>
        <p className="text-gray-500 mb-6">{error || "Something went wrong while generating your calendar."}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-green-600 text-white font-bold px-6 py-2 rounded-xl hover:bg-green-700 transition-all"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Calendar size={120} />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
              <Calendar size={24} />
            </div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              {t.labels.calendar}: {data.crop}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-green-50 p-5 rounded-2xl border border-green-100">
              <div className="flex items-center gap-2 text-green-700 font-bold mb-2">
                <Leaf size={18} />
                <span>Sowing Window</span>
              </div>
              <p className="text-green-900 font-medium">{data.sowingDate}</p>
            </div>
            
            <div className="bg-orange-50 p-5 rounded-2xl border border-orange-100">
              <div className="flex items-center gap-2 text-orange-700 font-bold mb-2">
                <TrendingUp size={18} />
                <span>Harvesting Window</span>
              </div>
              <p className="text-orange-900 font-medium">{data.harvestingDate}</p>
            </div>

            <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100">
              <div className="flex items-center gap-2 text-blue-700 font-bold mb-2">
                <CloudSun size={18} />
                <span>NDVI Health Index</span>
              </div>
              <p className="text-blue-900 font-medium">{data.ndviStatus}</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
            <Info className="text-slate-400 mt-1 shrink-0" size={18} />
            <p className="text-sm text-slate-600 italic">
              <span className="font-bold text-slate-800 not-italic">Weather Impact:</span> {data.weatherImpact}
            </p>
          </div>
        </div>
      </div>

      {/* Monthly Activities */}
      <div className="space-y-6">
        <h3 className="text-2xl font-black text-gray-900 px-2">Monthly Activity Guide</h3>
        
        <div className="grid grid-cols-1 gap-6">
          {data.monthlyActivities.map((monthData, idx) => (
            <div key={idx} className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden group hover:border-green-200 transition-all">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-48 bg-slate-900 p-6 flex flex-col items-center justify-center text-white">
                  <span className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">Month</span>
                  <span className="text-2xl font-black">{monthData.month}</span>
                </div>
                
                <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <CheckCircle size={14} className="text-green-500" /> Key Activities
                    </h4>
                    <ul className="space-y-2">
                      {monthData.activities.map((act, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                          {act}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {monthData.weatherAlerts.length > 0 && (
                    <div className="bg-red-50/50 p-4 rounded-2xl border border-red-100">
                      <h4 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <AlertTriangle size={14} /> Weather Alerts
                      </h4>
                      <ul className="space-y-2">
                        {monthData.weatherAlerts.map((alert, i) => (
                          <li key={i} className="text-red-700 text-xs font-medium leading-relaxed">
                            • {alert}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CropCalendar;
