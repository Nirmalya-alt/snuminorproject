
import React from 'react';
import ExpenseTracker from '../components/ExpenseTracker';
import { useFarm } from '../FarmContext';

const ExpensesPage: React.FC = () => {
  const { lang } = useFarm();
  return <ExpenseTracker lang={lang} />;
};

export default ExpensesPage;
