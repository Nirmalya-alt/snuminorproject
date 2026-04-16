
import React from 'react';
import WeatherAdvisory from '../components/WeatherAdvisory';
import { useFarm } from '../FarmContext';

const WeatherPage: React.FC = () => {
  const { lang, location } = useFarm();
  return (
    <div className="max-w-4xl mx-auto">
      <WeatherAdvisory lang={lang} location={location.state ? location : { state: 'Maharashtra', district: 'Pune' }} />
    </div>
  );
};

export default WeatherPage;
