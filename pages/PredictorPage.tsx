
import React from 'react';
import CropPredictor from '../components/CropPredictor';
import { useFarm } from '../FarmContext';

const PredictorPage: React.FC = () => {
  const { lang, location, setLocation, soil, setSoil, climate, setClimate, predictionResult, setPredictionResult } = useFarm();

  return (
    <CropPredictor 
      lang={lang} 
      initialMode="yield"
      location={location}
      setLocation={setLocation}
      soil={soil}
      setSoil={setSoil}
      climate={climate}
      setClimate={setClimate}
      result={predictionResult}
      setResult={setPredictionResult}
    />
  );
};

export default PredictorPage;
