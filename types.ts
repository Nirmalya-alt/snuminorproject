
export type Language = 'en' | 'hi' | 'bn';

export interface SoilData {
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  ph: string;
  type: string;
}

export interface ClimateData {
  rainfall: string;
  temperature: string;
}

export interface LocationData {
  state: string;
  district: string;
}

export interface CropPredictionResult {
  bestCrops: string[];
  estimatedYield: string;
  suitabilityScore: 'Low' | 'Medium' | 'High';
  riskFactors: string[];
  improvementTips: string[];
}

export interface DiseaseDetectionResult {
  diseaseName: string;
  severity: string;
  treatment: string[];
  preventiveSteps: string[];
  advice: string;
}

export interface FarmReport {
  timestamp: string;
  location: LocationData;
  soil: SoilData;
  climate: ClimateData;
  prediction: CropPredictionResult;
}
