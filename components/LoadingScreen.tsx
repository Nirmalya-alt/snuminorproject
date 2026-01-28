
import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  messages: string[];
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ messages }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < messages.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentStep, messages]);

  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-sm border border-green-100">
      <div className="relative w-16 h-16 mb-6">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-green-100 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-green-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <div className="space-y-3 w-full max-w-xs">
        {messages.map((msg, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${idx <= currentStep ? 'bg-green-600' : 'bg-gray-200'}`} />
            <p className={`text-sm ${idx === currentStep ? 'text-green-700 font-semibold' : idx < currentStep ? 'text-gray-400' : 'text-gray-300'}`}>
              {msg}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
