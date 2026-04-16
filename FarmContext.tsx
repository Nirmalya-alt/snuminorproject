
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, LocationData, SoilData, ClimateData, CropPredictionResult } from './types';

interface FarmContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  location: LocationData;
  setLocation: (location: LocationData) => void;
  soil: SoilData;
  setSoil: (soil: SoilData) => void;
  climate: ClimateData;
  setClimate: (climate: ClimateData) => void;
  predictionResult: CropPredictionResult | null;
  setPredictionResult: (result: CropPredictionResult | null) => void;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const FarmProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('en');
  const [location, setLocation] = useState<LocationData>({ state: '', district: '' });
  const [soil, setSoil] = useState<SoilData>({ nitrogen: 0, phosphorus: 0, potassium: 0, type: 'Loamy' });
  const [climate, setClimate] = useState<ClimateData>({ rainfall: 0, temperature: 0, humidity: 0 });
  const [predictionResult, setPredictionResult] = useState<CropPredictionResult | null>(null);

  return (
    <FarmContext.Provider value={{
      lang, setLang,
      location, setLocation,
      soil, setSoil,
      climate, setClimate,
      predictionResult, setPredictionResult
    }}>
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => {
  const context = useContext(FarmContext);
  if (context === undefined) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
};
