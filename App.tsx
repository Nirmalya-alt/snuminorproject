
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FarmProvider } from './FarmContext';
import Layout from './Layout';

// Pages
import PredictorPage from './pages/PredictorPage';
import RecommendationPage from './pages/RecommendationPage';
import DiseasePage from './pages/DiseasePage';
import ReportPage from './pages/ReportPage';
import WeatherPage from './pages/WeatherPage';
import IrrigationPage from './pages/IrrigationPage';
import FertilizerPage from './pages/FertilizerPage';
import RiskPage from './pages/RiskPage';
import CalendarPage from './pages/CalendarPage';
import ExpensesPage from './pages/ExpensesPage';
import FAQPage from './pages/FAQPage';

const App: React.FC = () => {
  return (
    <FarmProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<PredictorPage />} />
            <Route path="/recommendation" element={<RecommendationPage />} />
            <Route path="/disease" element={<DiseasePage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/irrigation" element={<IrrigationPage />} />
            <Route path="/fertilizer" element={<FertilizerPage />} />
            <Route path="/risk" element={<RiskPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="/faq" element={<FAQPage />} />
          </Routes>
        </Layout>
      </Router>
    </FarmProvider>
  );
};

export default App;
