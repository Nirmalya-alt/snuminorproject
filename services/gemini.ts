
import { GoogleGenAI, Type } from "@google/genai";
import { SoilData, ClimateData, LocationData, CropPredictionResult, DiseaseDetectionResult } from "../types";

// Standard initialization as per guidelines.
// Assume process.env.API_KEY is pre-configured and accessible in the deployment context.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getCropPrediction = async (
  location: LocationData,
  soil: SoilData,
  climate: ClimateData
): Promise<CropPredictionResult> => {
  const prompt = `Act as an Indian agricultural expert. Based on the following data, predict the best crops for the farmer.
  Location: ${location.district}, ${location.state}
  Soil: Type=${soil.type}, pH=${soil.ph}, N=${soil.nitrogen}, P=${soil.phosphorus}, K=${soil.potassium}
  Climate: Avg Rainfall=${climate.rainfall}mm, Avg Temp=${climate.temperature}°C
  
  Provide results in JSON format matching the schema.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          bestCrops: { type: Type.ARRAY, items: { type: Type.STRING } },
          estimatedYield: { type: Type.STRING, description: "yield in tons per hectare" },
          suitabilityScore: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
          riskFactors: { type: Type.ARRAY, items: { type: Type.STRING } },
          improvementTips: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["bestCrops", "estimatedYield", "suitabilityScore", "riskFactors", "improvementTips"]
      }
    }
  });

  if (!response.text) throw new Error("AI failed to provide a prediction.");
  return JSON.parse(response.text);
};

export const detectCropDisease = async (
  imageData: string
): Promise<DiseaseDetectionResult> => {
  const prompt = `Identify the crop disease from this image and provide treatment and preventive advice. 
  Respond strictly in JSON format matching the schema.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { mimeType: "image/jpeg", data: imageData.split(',')[1] } },
        { text: prompt }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          diseaseName: { type: Type.STRING },
          severity: { type: Type.STRING },
          treatment: { type: Type.ARRAY, items: { type: Type.STRING } },
          preventiveSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
          advice: { type: Type.STRING }
        },
        required: ["diseaseName", "severity", "treatment", "preventiveSteps", "advice"]
      }
    }
  });

  if (!response.text) throw new Error("AI failed to analyze the disease image.");
  return JSON.parse(response.text);
};
