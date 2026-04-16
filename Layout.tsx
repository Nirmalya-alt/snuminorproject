
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TRANSLATIONS } from './constants';
import LanguageSelector from './components/LanguageSelector';
import { MoreVertical, X, TrendingUp, Sprout, ShieldAlert, FileText, Cloud, Droplets, FlaskConical, AlertTriangle, Calendar, Receipt, MessageCircle } from 'lucide-react';
import { useFarm } from './FarmContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { lang, setLang } = useFarm();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const t = TRANSLATIONS[lang];

  const navbarItems = [
    { id: 'predictor', path: '/', label: t.nav.predictor, icon: TrendingUp },
    { id: 'recommendation', path: '/recommendation', label: t.nav.recommendation, icon: Sprout },
    { id: 'disease', path: '/disease', label: t.nav.disease, icon: ShieldAlert },
    { id: 'report', path: '/report', label: t.nav.report, icon: FileText },
  ];

  const sidebarItems = [
    { id: 'weather', path: '/weather', label: t.nav.weather, icon: Cloud },
    { id: 'irrigation', path: '/irrigation', label: t.nav.irrigation, icon: Droplets },
    { id: 'fertilizer', path: '/fertilizer', label: t.nav.fertilizer, icon: FlaskConical },
    { id: 'risk', path: '/risk', label: t.nav.risk, icon: AlertTriangle },
    { id: 'calendar', path: '/calendar', label: t.nav.calendar, icon: Calendar },
    { id: 'expenses', path: '/expenses', label: t.nav.expenses, icon: Receipt },
    { id: 'faq', path: '/faq', label: t.nav.faq, icon: MessageCircle },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg shadow-green-100">
              🌱
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-black text-green-900 tracking-tight leading-none">{t.title}</h1>
              <p className="text-[10px] text-green-600 font-bold uppercase tracking-wider mt-0.5">{t.tagline}</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <LanguageSelector currentLang={lang} onLanguageChange={setLang} />
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600"
            >
              <MoreVertical size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs (Navbar) */}
      <nav className="bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto no-scrollbar">
          {navbarItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`px-6 py-4 text-sm font-bold transition-all border-b-2 whitespace-nowrap flex items-center gap-2 ${
                location.pathname === item.path 
                  ? 'border-green-600 text-green-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Menu */}
      <aside className={`fixed top-0 right-0 h-full w-80 bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest">More Features</h2>
            <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <X size={24} className="text-slate-500" />
            </button>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto pr-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all font-bold text-left ${
                  location.pathname === item.path
                    ? 'bg-green-50 text-green-700'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className={`p-2 rounded-lg ${location.pathname === item.path ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  <item.icon size={20} />
                </div>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400 font-medium">© 2025 Indian Farmer Assistant</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center text-white text-xs">🌱</div>
            <span className="text-lg font-black text-slate-900">{t.title}</span>
          </div>
          <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Empowering Indian farmers with cutting-edge AI technology for sustainable agriculture and better livelihoods.
          </p>
          <div className="mt-8 pt-8 border-t border-slate-100">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
              © 2025 All rights reserved. Built with ❤️ for India.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
