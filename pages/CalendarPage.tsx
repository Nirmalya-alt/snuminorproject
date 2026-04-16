
import React from 'react';
import CropCalendar from '../components/CropCalendar';
import { useFarm } from '../FarmContext';

const CalendarPage: React.FC = () => {
  const { lang, location, climate, predictionResult } = useFarm();
  return (
    <div className="max-w-4xl mx-auto">
      <CropCalendar 
        lang={lang} 
        crop={predictionResult?.predictedCrop || 'Rice'} 
        location={location.state ? location : { state: 'Maharashtra', district: 'Pune' }}
        climate={climate}
      />
    </div>
  );
};

export default CalendarPage;
