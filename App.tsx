
import React, { useState } from 'react';
import { Language } from './types';
import { TRANSLATIONS } from './constants';
import LanguageSelector from './components/LanguageSelector';
import CropPredictor from './components/CropPredictor';
import DiseaseDetector from './components/DiseaseDetector';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<'predictor' | 'disease'>('predictor');
  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white text-2xl">
              🌱
            </div>
            <div>
              <h1 className="text-2xl font-black text-green-900 tracking-tight">{t.title}</h1>
              <p className="text-xs text-green-600 font-medium">{t.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <LanguageSelector currentLang={lang} onLanguageChange={setLang} />
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 flex">
          <button
            onClick={() => setActiveTab('predictor')}
            className={`px-8 py-4 text-sm font-bold transition-all border-b-2 ${
              activeTab === 'predictor' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.nav.predictor}
          </button>
          <button
            onClick={() => setActiveTab('disease')}
            className={`px-8 py-4 text-sm font-bold transition-all border-b-2 ${
              activeTab === 'disease' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.nav.disease}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
        <div className="animate-fade-in">
          {activeTab === 'predictor' && <CropPredictor lang={lang} />}
          {activeTab === 'disease' && <DiseaseDetector lang={lang} />}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 text-center">
        <p className="text-sm text-gray-500">
          © 2025 <span className="text-green-600 font-bold">{t.title}</span>. All rights reserved. 
          <br />
          Built for the farmers of India.
        </p>
      </footer>
    </div>
  );
};

export default App;
