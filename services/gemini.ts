
import { GoogleGenAI, Type } from "@google/genai";
import { SoilData, ClimateData, LocationData, CropPredictionResult, DiseaseDetectionResult, DynamicCropCalendar } from "../types";

const getAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing. Please ensure it is set in your environment variables.");
  }
  return new GoogleGenAI({ apiKey });
};

export const getCropPrediction = async (
  location: LocationData,
  soil: SoilData,
  climate: ClimateData
): Promise<CropPredictionResult> => {
  const ai = getAI();
  const prompt = `Act as an Indian agricultural expert. Based on the following data, predict the best crop and provide yield estimation.
  Location: ${location.district}, ${location.state}
  Soil: Type=${soil.type}, N=${soil.nitrogen}, P=${soil.phosphorus}, K=${soil.potassium}
  Climate: Rainfall=${climate.rainfall}mm, Temp=${climate.temperature}°C, Humidity=${climate.humidity}%
  
  Provide:
  1. Predicted Crop Name
  2. Predicted Yield in kg/hectare
  3. Simple explanation of why this crop is suitable based on weather, soil, and NPK.
  4. Top 3 recommended crops with their expected yield and reason.
  
  Respond strictly in JSON format matching the schema.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            predictedCrop: { type: Type.STRING },
            predictedYield: { type: Type.STRING, description: "yield in kg/hectare" },
            explanation: { type: Type.STRING },
            topCrops: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  yield: { type: Type.STRING },
                  reason: { type: Type.STRING }
                },
                required: ["name", "yield", "reason"]
              }
            }
          },
          required: ["predictedCrop", "predictedYield", "explanation", "topCrops"]
        }
      }
    });

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
  const ai = getAI();
  const prompt = `Act as a world-class plant pathologist trained on the PlantVillage dataset. 
  Analyze the provided image of a crop leaf and identify any diseases.
  
  Provide:
  1. Disease name (be specific, e.g., 'Tomato Early Blight' instead of just 'Blight')
  2. Confidence percentage (0-100) based on visual symptoms
  3. Simple cause of the disease (fungal, bacterial, viral, or environmental)
  4. Detailed treatment/solution suitable for an Indian farmer (organic and chemical options if applicable)
  
  Respond strictly in JSON format matching the schema.`;

  try {
    const [header, base64Data] = imageData.split(',');
    const mimeType = header.match(/:(.*?);/)?.[1] || "image/jpeg";

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { mimeType, data: base64Data } },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            diseaseName: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
            cause: { type: Type.STRING },
            treatment: { type: Type.STRING }
          },
          required: ["diseaseName", "confidence", "cause", "treatment"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("EMPTY_RESPONSE");
    return JSON.parse(text.trim());
  } catch (error: any) {
    console.error("Gemini Disease Detection Error:", error);
    throw new Error(`Disease Detection Failed: ${error.message || "Unknown Error"}`);
  }
};

export const getDynamicCropCalendar = async (
  crop: string,
  location: LocationData,
  climate: ClimateData
): Promise<DynamicCropCalendar> => {
  const ai = getAI();
  const prompt = `Act as an Indian agricultural expert. Generate a dynamic crop calendar for ${crop} in ${location.district}, ${location.state}.
  Current Climate: Temp=${climate.temperature}°C, Humidity=${climate.humidity}%, Rainfall=${climate.rainfall}mm.
  
  Incorporate:
  1. NDVI-based logic (simulated) to suggest optimal sowing and harvesting windows.
  2. Weather-adjusted monthly activity calendar (next 6 months).
  3. Specific weather alerts or risks for this season.
  
  Respond strictly in JSON format matching the schema.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            crop: { type: Type.STRING },
            sowingDate: { type: Type.STRING, description: "Suggested sowing window" },
            harvestingDate: { type: Type.STRING, description: "Suggested harvesting window" },
            ndviStatus: { type: Type.STRING, description: "Simulated NDVI health status" },
            weatherImpact: { type: Type.STRING, description: "Summary of weather impact on current season" },
            monthlyActivities: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  month: { type: Type.STRING },
                  activities: { type: Type.ARRAY, items: { type: Type.STRING } },
                  weatherAlerts: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["month", "activities", "weatherAlerts"]
              }
            }
          },
          required: ["crop", "sowingDate", "harvestingDate", "ndviStatus", "weatherImpact", "monthlyActivities"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("EMPTY_RESPONSE");
    return JSON.parse(text.trim());
  } catch (error: any) {
    console.error("Gemini Calendar Error:", error);
    throw new Error(`Failed to generate dynamic calendar: ${error.message || "Unknown Error"}`);
  }
};
