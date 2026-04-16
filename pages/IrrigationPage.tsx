
import React from 'react';
import IrrigationAdvisory from '../components/IrrigationAdvisory';
import { useFarm } from '../FarmContext';

const IrrigationPage: React.FC = () => {
  const { lang, soil, climate, predictionResult } = useFarm();
  return (
    <div className="max-w-2xl mx-auto">
      <IrrigationAdvisory 
        lang={lang} 
        soilType={soil.type} 
        crop={predictionResult?.predictedCrop || 'Rice'} 
        weather={climate} 
      />
    </div>
  );
};

export default IrrigationPage;
