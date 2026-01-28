
import { GoogleGenAI, Type } from "@google/genai";
import { SoilData, ClimateData, LocationData, CropPredictionResult, DiseaseDetectionResult } from "../types";

// Always initialize GoogleGenAI with a named parameter.
// The API key is assumed to be available in process.env.API_KEY as per system requirements.
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
    // Using gemini-3-pro-preview for complex reasoning and STEM-related agricultural analysis.
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
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

    // Access the text property directly on the response object.
    const text = response.text;
    if (!text) throw new Error("EMPTY_RESPONSE");
    return JSON.parse(text.trim());
  } catch (error: any) {
    console.error("Gemini Prediction Error:", error);
    throw new Error(`AI Prediction Failed: ${error.message || "Unknown Error"}`);
  }
};

export const detectCropDisease = async (
  imageData: string
): Promise<DiseaseDetectionResult> => {
  const prompt = `Identify the crop disease from this image and provide treatment and preventive advice. 
  Respond strictly in JSON format matching the schema.`;

  try {
    // Using gemini-3-pro-preview for multimodal complex analysis of crop diseases.
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
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

    // Access the text property directly on the response object.
    const text = response.text;
    if (!text) throw new Error("EMPTY_RESPONSE");
    return JSON.parse(text.trim());
  } catch (error: any) {
    console.error("Gemini Disease Detection Error:", error);
    throw new Error(`Disease Detection Failed: ${error.message || "Unknown Error"}`);
  }
};
