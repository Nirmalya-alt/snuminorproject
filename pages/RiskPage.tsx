
import React from 'react';
import DiseaseRiskAdvisory from '../components/DiseaseRiskAdvisory';
import { useFarm } from '../FarmContext';

const RiskPage: React.FC = () => {
  const { lang, climate, predictionResult } = useFarm();
  return (
    <div className="max-w-2xl mx-auto">
      <DiseaseRiskAdvisory 
        lang={lang} 
        humidity={climate.humidity || 60} 
        temperature={climate.temperature || 25} 
        crop={predictionResult?.predictedCrop || 'Rice'} 
      />
    </div>
  );
};

export default RiskPage;
