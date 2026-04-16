
import React from 'react';
import FAQ from '../components/FAQ';
import { useFarm } from '../FarmContext';

const FAQPage: React.FC = () => {
  const { lang } = useFarm();
  return <FAQ lang={lang} />;
};

export default FAQPage;
