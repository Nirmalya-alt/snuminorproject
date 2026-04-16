
import React from 'react';
import FarmerReport from '../components/FarmerReport';
import { useFarm } from '../FarmContext';
import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';

const ReportPage: React.FC = () => {
  const { lang, location, soil, climate, predictionResult } = useFarm();
  const navigate = useNavigate();

  if (!predictionResult) {
    return (
      <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center shadow-sm max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileText size={40} className="text-slate-300" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">No Report Available</h3>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">Please use the Crop Yield Prediction feature first to generate a comprehensive farm report.</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-green-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-green-700 transition-all"
        >
          Go to Predictor
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <FarmerReport 
        lang={lang}
        location={location}
        soil={soil}
        climate={climate}
        result={predictionResult}
        onClose={() => navigate('/')}
        isStandalone={true}
      />
    </div>
  );
};

export default ReportPage;
