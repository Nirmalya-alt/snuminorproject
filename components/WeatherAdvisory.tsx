
import React, { useState, useEffect } from 'react';
import { TRANSLATIONS } from '../constants';
import { Language, WeatherData } from '../types';
import { Cloud, Sun, CloudRain, Thermometer, Droplets, Wind } from 'lucide-react';

interface WeatherAdvisoryProps {
  lang: Language;
  location: { state: string; district: string };
}

const WeatherAdvisory: React.FC<WeatherAdvisoryProps> = ({ lang, location }) => {
  const t = TRANSLATIONS[lang];
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mocking weather data since we don't have a real API key provided in the prompt
    // In a real app, we would fetch from OpenWeatherMap or similar
    const fetchWeather = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockWeather: WeatherData = {
        current: {
          temp: 28,
          humidity: 65,
          rainfall: 5,
          condition: 'Partly Cloudy'
        },
        forecast: [
          { day: 'Mon', temp: 29, condition: 'Sunny' },
          { day: 'Tue', temp: 30, condition: 'Sunny' },
          { day: 'Wed', temp: 27, condition: 'Rainy' },
          { day: 'Thu', temp: 26, condition: 'Rainy' },
          { day: 'Fri', temp: 28, condition: 'Cloudy' },
        ],
        suggestions: [
          "Good day for irrigation",
          "Suitable for sowing",
          "Avoid spraying (rain expected on Wednesday)"
        ]
      };
      setWeather(mockWeather);
      setLoading(false);
    };

    fetchWeather();
  }, [location]);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading weather data...</div>;
  }

  if (!weather) return null;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Cloud className="text-blue-500" /> {t.nav.weather}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Current Weather */}
          <div className="md:col-span-1 bg-blue-50 p-6 rounded-xl flex flex-col items-center justify-center text-center">
            <Sun className="w-16 h-16 text-yellow-500 mb-2" />
            <div className="text-4xl font-black text-blue-900">{weather.current.temp}°C</div>
            <div className="text-blue-700 font-medium">{weather.current.condition}</div>
            <div className="mt-4 flex gap-4 text-sm text-blue-600">
              <span className="flex items-center gap-1"><Droplets size={16} /> {weather.current.humidity}%</span>
              <span className="flex items-center gap-1"><CloudRain size={16} /> {weather.current.rainfall}mm</span>
            </div>
          </div>

          {/* Forecast */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-bold text-gray-700">7-Day Forecast</h3>
            <div className="flex justify-between overflow-x-auto pb-2 gap-4">
              {weather.forecast.map((f, i) => (
                <div key={i} className="flex flex-col items-center min-w-[60px] p-3 bg-gray-50 rounded-lg">
                  <span className="text-xs text-gray-500 font-bold">{f.day}</span>
                  {f.condition === 'Sunny' ? <Sun className="text-yellow-500 my-2" size={24} /> : 
                   f.condition === 'Rainy' ? <CloudRain className="text-blue-500 my-2" size={24} /> : 
                   <Cloud className="text-gray-400 my-2" size={24} />}
                  <span className="text-sm font-bold text-gray-800">{f.temp}°C</span>
                </div>
              ))}
            </div>

            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
              <h4 className="text-sm font-bold text-green-800 mb-2">Smart Suggestions</h4>
              <ul className="space-y-1">
                {weather.suggestions.map((s, i) => (
                  <li key={i} className="text-sm text-green-700 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherAdvisory;
