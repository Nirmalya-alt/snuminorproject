
import React from 'react';
import FertilizerAdvisory from '../components/FertilizerAdvisory';
import { useFarm } from '../FarmContext';

const FertilizerPage: React.FC = () => {
  const { lang, soil } = useFarm();
  return (
    <div className="max-w-2xl mx-auto">
      <FertilizerAdvisory lang={lang} soil={soil} />
    </div>
  );
};

export default FertilizerPage;
