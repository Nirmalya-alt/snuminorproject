import { GoogleGenAI, Type } from "@google/genai";
import { SoilData, ClimateData, LocationData, CropPredictionResult, DiseaseDetectionResult } from "../types";

// The Gemini client must be initialized using the environment variable process.env.API_KEY.
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
  
  Provide results in JSON format matching the schema exactly.`;

  try {
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

    const text = response.text;
    if (!text) throw new Error("The AI returned an empty response.");
    return JSON.parse(text.trim());
  } catch (error: any) {
    console.error("Gemini Prediction Error:", error);
    // Clearer error reporting for deployment issues
    if (error.message?.includes("API_KEY") || !process.env.API_KEY) {
      throw new Error("Configuration Error: API_KEY is missing or invalid. Please check Vercel environment variables and trigger a NEW deployment.");
    }
    throw new Error(`AI Prediction Failed: ${error.message}`);
  }
};

export const detectCropDisease = async (
  imageData: string
): Promise<DiseaseDetectionResult> => {
  const prompt = `Identify the crop disease from this image and provide treatment and preventive advice. 
  Respond strictly in JSON format matching the schema.`;

  try {
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

    const text = response.text;
    if (!text) throw new Error("The AI returned an empty response.");
    return JSON.parse(text.trim());
  } catch (error: any) {
    console.error("Gemini Disease Detection Error:", error);
    throw new Error(`Disease Detection Failed: ${error.message}`);
  }
};