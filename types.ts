
export type Language = 'en' | 'hi' | 'bn';

export interface SoilData {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  type: string;
}

export interface ClimateData {
  rainfall: number;
  temperature: number;
  humidity: number;
}

export interface LocationData {
  state: string;
  district: string;
}

export interface CropPredictionResult {
  predictedCrop: string;
  predictedYield: string; // kg/hectare
  explanation: string;
  topCrops: {
    name: string;
    yield: string;
    reason: string;
  }[];
}

export interface DiseaseDetectionResult {
  diseaseName: string;
  confidence: number;
  cause: string;
  treatment: string;
}

export interface WeatherData {
  current: {
    temp: number;
    humidity: number;
    rainfall: number;
    condition: string;
  };
  forecast: {
    day: string;
    temp: number;
    condition: string;
  }[];
  suggestions: string[];
}

export interface IrrigationAdvisory {
  when: string;
  waterLevel: 'Low' | 'Medium' | 'High';
}

export interface FertilizerAdvisory {
  advice: string[];
  status: 'Low' | 'Sufficient' | 'Balanced';
}

export interface DiseaseRisk {
  level: 'Low' | 'Medium' | 'High';
  reason: string;
}

export interface CropStage {
  stage: string;
  guidance: string;
  duration: string;
}

export interface DynamicCropCalendar {
  crop: string;
  sowingDate: string;
  harvestingDate: string;
  ndviStatus: string;
  weatherImpact: string;
  monthlyActivities: {
    month: string;
    activities: string[];
    weatherAlerts: string[];
  }[];
}

export type ExpenseCategory = 'Seeds' | 'Fertilizer' | 'Pesticides' | 'Labor' | 'Machinery' | 'Irrigation' | 'Others';

export interface FarmingActivity {
  id: string;
  category: ExpenseCategory;
  type: string;
  date: string;
  cost: number;
  notes: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
