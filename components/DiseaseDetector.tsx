
import React, { useState, useRef } from 'react';
import { TRANSLATIONS } from '../constants';
import { Language, DiseaseDetectionResult } from '../types';
import { detectCropDisease } from '../services/gemini';
import LoadingScreen from './LoadingScreen';

interface DiseaseDetectorProps {
  lang: Language;
}

const DiseaseDetector: React.FC<DiseaseDetectorProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<DiseaseDetectionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDetect = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const res = await detectCropDisease(image);
      setResult(res);
    } catch (error) {
      alert("Could not analyze image. Try a clearer photo.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <LoadingScreen messages={[
        t.loading.uploading,
        t.loading.analyzingImage,
        t.loading.detectingDisease,
        t.loading.preparingAdvice
      ]} />
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.nav.disease}</h2>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${
                image ? 'border-green-200' : 'border-gray-300 hover:border-green-400'
              }`}
            >
              {image ? (
                <img src={image} alt="Crop Leaf" className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <div className="text-center p-6">
                  <div className="text-4xl mb-2">📸</div>
                  <p className="text-gray-500 font-medium">{t.labels.upload}</p>
                </div>
              )}
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageUpload} 
            />
            
            <button
              onClick={handleDetect}
              disabled={!image}
              className="w-full mt-6 bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t.labels.detect}
            </button>
          </div>

          <div className="flex-1">
            {result ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-red-600 mb-1">{result.diseaseName}</h3>
                  <p className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full uppercase tracking-wider">
                    {t.results.severity}: {result.severity}
                  </p>
                </div>

                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-700 mb-2">{t.results.treatment}</h4>
                  <ul className="space-y-1">
                    {result.treatment.map((step, i) => (
                      <li key={i} className="text-sm text-gray-600 flex gap-2">
                        <span className="text-green-500 font-bold">✓</span> {step}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-700 mb-2">{t.results.prevention}</h4>
                  <ul className="space-y-1">
                    {result.preventiveSteps.map((step, i) => (
                      <li key={i} className="text-sm text-gray-600 flex gap-2">
                        <span className="text-blue-500 font-bold">🛡️</span> {step}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-green-50 border border-green-100 rounded-xl">
                  <p className="text-sm text-green-800 italic">" {result.advice} "</p>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center py-12">
                <div className="text-6xl mb-4 opacity-20">🍃</div>
                <p className="max-w-xs">Upload an image of the affected plant leaf to get a detailed diagnosis and solution.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetector;
