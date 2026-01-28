
import { Language } from './types';

export const INDIAN_STATES: Record<string, string[]> = {
  "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna"],
  "Bihar": ["Araria", "Begusarai", "Bhagalpur", "Gaya", "Muzaffarpur", "Patna"],
  "Gujarat": ["Ahmedabad", "Amreli", "Anand", "Bharuch", "Bhavnagar", "Kutch", "Rajkot", "Surat"],
  "Haryana": ["Ambala", "Bhiwani", "Faridabad", "Gurugram", "Hisar", "Panipat", "Rohtak"],
  "Karnataka": ["Bagalkot", "Ballari", "Belagavi", "Bengaluru", "Bidar", "Dharwad", "Mysuru"],
  "Maharashtra": ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Kolhapur", "Mumbai", "Nagpur", "Nashik", "Pune"],
  "Punjab": ["Amritsar", "Bathinda", "Faridkot", "Firozpur", "Ludhiana", "Patiala"],
  "Rajasthan": ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bikaner", "Jaipur", "Jodhpur"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Erode", "Madurai", "Salem"],
  "Uttar Pradesh": ["Agra", "Aligarh", "Allahabad", "Ambedkar Nagar", "Bareilly", "Ghaziabad", "Kanpur", "Lucknow", "Varanasi"],
  "West Bengal": ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Darjeeling", "Hooghly", "Howrah", "Kolkata", "Nadia", "Purulia"]
};

export const TRANSLATIONS: Record<Language, any> = {
  en: {
    title: "KisanSight",
    tagline: "Empowering Farmers with AI",
    nav: {
      predictor: "Crop Predictor",
      disease: "Disease Detector",
      report: "Farm Report",
      location: "Location Analysis"
    },
    labels: {
      state: "Select State",
      district: "Select District",
      soilType: "Soil Type",
      ph: "Soil pH",
      nitrogen: "Nitrogen (N)",
      phosphorus: "Phosphorus (P)",
      potassium: "Potassium (K)",
      rainfall: "Avg. Rainfall (mm)",
      temperature: "Avg. Temperature (°C)",
      upload: "Upload Leaf Image",
      detect: "Detect Disease",
      predict: "Get Prediction",
      reset: "Clear Form"
    },
    placeholders: {
      searchDistrict: "Search district...",
      enterValue: "Enter value"
    },
    results: {
      recommended: "Recommended Crops",
      yield: "Estimated Yield",
      suitability: "Suitability Score",
      risks: "Risk Factors",
      tips: "Improvement Tips",
      severity: "Severity",
      treatment: "Treatment Methods",
      prevention: "Preventive Steps"
    },
    loading: {
      fetching: "Fetching weather data...",
      analyzingSoil: "Analyzing soil conditions...",
      processingRain: "Processing rainfall history...",
      estimatingYield: "Estimating crop yield...",
      generatingReport: "Generating farm report...",
      uploading: "Uploading image...",
      analyzingImage: "Analyzing crop image...",
      detectingDisease: "Detecting disease...",
      preparingAdvice: "Preparing solution & advice..."
    }
  },
  hi: {
    title: "किसानसाइट",
    tagline: "AI के साथ किसानों को सशक्त बनाना",
    nav: {
      predictor: "फसल भविष्यवक्ता",
      disease: "रोग पहचान",
      report: "खेत रिपोर्ट",
      location: "स्थान विश्लेषण"
    },
    labels: {
      state: "राज्य चुनें",
      district: "ज़िला चुनें",
      soilType: "मिट्टी का प्रकार",
      ph: "मिट्टी का pH",
      nitrogen: "नाइट्रोजन (N)",
      phosphorus: "फास्फोरस (P)",
      potassium: "पोटैशियम (K)",
      rainfall: "औसत वर्षा (मिमी)",
      temperature: "औसत तापमान (°C)",
      upload: "पत्ती की छवि अपलोड करें",
      detect: "रोग का पता लगाएं",
      predict: "भविष्यवाणी प्राप्त करें",
      reset: "फॉर्म साफ करें"
    },
    placeholders: {
      searchDistrict: "ज़िला खोजें...",
      enterValue: "मान दर्ज करें"
    },
    results: {
      recommended: "अनुशंसित फसलें",
      yield: "अनुमानित उपज",
      suitability: "उपयुक्तता स्कोर",
      risks: "जोखिम कारक",
      tips: "सुधार के सुझाव",
      severity: "गंभीरता",
      treatment: "उपचार के तरीके",
      prevention: "निवारक कदम"
    },
    loading: {
      fetching: "मौसम डेटा प्राप्त किया जा रहा है...",
      analyzingSoil: "मिट्टी की स्थिति का विश्लेषण...",
      processingRain: "वर्षा के इतिहास का प्रसंस्करण...",
      estimatingYield: "फसल की उपज का अनुमान...",
      generatingReport: "खेत की रिपोर्ट तैयार की जा रही है...",
      uploading: "छवि अपलोड हो रही है...",
      analyzingImage: "फसल की छवि का विश्लेषण...",
      detectingDisease: "रोग का पता लगाया जा रहा है...",
      preparingAdvice: "समाधान और सलाह तैयार की जा रही है..."
    }
  },
  bn: {
    title: "কিষাণসাইট",
    tagline: "AI এর মাধ্যমে কৃষকদের ক্ষমতায়ন",
    nav: {
      predictor: "ফসল পূর্বাভাস",
      disease: "রোগ নির্ণয়",
      report: "খামার রিপোর্ট",
      location: "স্থান বিশ্লেষণ"
    },
    labels: {
      state: "রাজ্য নির্বাচন করুন",
      district: "জেলা নির্বাচন করুন",
      soilType: "মাটির ধরন",
      ph: "মাটির pH",
      nitrogen: "নাইট্রোজেন (N)",
      phosphorus: "ফসফরাস (P)",
      potassium: "পটাশিয়াম (K)",
      rainfall: "গড় বৃষ্টিপাত (মিমি)",
      temperature: "গড় তাপমাত্রা (°C)",
      upload: "পাতার ছবি আপলোড করুন",
      detect: "রোগ শনাক্ত করুন",
      predict: "পূর্বাভাস পান",
      reset: "ফর্ম মুছুন"
    },
    placeholders: {
      searchDistrict: "জেলা খুঁজুন...",
      enterValue: "মান লিখুন"
    },
    results: {
      recommended: "প্রস্তাবিত ফসল",
      yield: "আনুমানিক ফলন",
      suitability: "উপযুক্ততা স্কোর",
      risks: "ঝুঁকির কারণ",
      tips: "উন্নতির টিপস",
      severity: "তীব্রতা",
      treatment: "চিকিৎসা পদ্ধতি",
      prevention: "প্রতিরোধমূলক ব্যবস্থা"
    },
    loading: {
      fetching: "আবহাওয়া তথ্য আনা হচ্ছে...",
      analyzingSoil: "মাটির অবস্থা বিশ্লেষণ করা হচ্ছে...",
      processingRain: "বৃষ্টিপাতের ইতিহাস প্রক্রিয়া করা হচ্ছে...",
      estimatingYield: "ফসলের ফলন অনুমান করা হচ্ছে...",
      generatingReport: "খামার রিপোর্ট তৈরি করা হচ্ছে...",
      uploading: "ছবি আপলোড হচ্ছে...",
      analyzingImage: "ফসলের ছবি বিশ্লেষণ করা হচ্ছে...",
      detectingDisease: "রোগ শনাক্ত করা হচ্ছে...",
      preparingAdvice: "সমাধান ও পরামর্শ প্রস্তুত করা হচ্ছে..."
    }
  }
};
