
import React from 'react';
import DiseaseDetector from '../components/DiseaseDetector';
import { useFarm } from '../FarmContext';

const DiseasePage: React.FC = () => {
  const { lang } = useFarm();
  return <DiseaseDetector lang={lang} />;
};

export default DiseasePage;
