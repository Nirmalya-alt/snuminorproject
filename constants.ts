
import { Language, FAQItem, CropStage } from './types';

export const INDIAN_STATES: Record<string, string[]> = {
  "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"],
  "Arunachal Pradesh": ["Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kamle", "Kra Daadi", "Kurung Kumey", "Lepa Rada", "Lohit", "Longding", "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", "Namsai", "Pakke Kessang", "Papum Pare", "Shi Yomi", "Siang", "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"],
  "Assam": ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"],
  "Bihar": ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
  "Chhattisgarh": ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Gaurela-Pendra-Marwahi", "Janjgir-Champa", "Jashpur", "Kanker", "Kawardha", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"],
  "Goa": ["North Goa", "South Goa"],
  "Gujarat": ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udepur", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"],
  "Haryana": ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
  "Himachal Pradesh": ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],
  "Jharkhand": ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahibganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"],
  "Karnataka": ["Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"],
  "Kerala": ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],
  "Madhya Pradesh": ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Niwari", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"],
  "Maharashtra": ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],
  "Manipur": ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"],
  "Meghalaya": ["East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", "Ri Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"],
  "Mizoram": ["Aizawl", "Champhai", "Hnahthial", "Khawzawl", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Saitual", "Serchhip"],
  "Nagaland": ["Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Noklak", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"],
  "Odisha": ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Sonepur", "Sundargarh"],
  "Punjab": ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Muktsar", "Pathankot", "Patiala", "Rupnagar", "Sahibzada Ajit Singh Nagar", "Sangrur", "Shahid Bhagat Singh Nagar", "Sri Muktsar Sahib", "Tarn Taran"],
  "Rajasthan": ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"],
  "Sikkim": ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
  "Tamil Nadu": ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"],
  "Telangana": ["Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Kumuram Bheem", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal-Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Rangareddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal Rural", "Warangal Urban", "Yadadri Bhuvanagiri"],
  "Tripura": ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"],
  "Uttar Pradesh": ["Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Ayodhya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kushinagar", "Lakhimpur Kheri", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"],
  "Uttarakhand": ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"],
  "West Bengal": ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"]
};

export const SOIL_TYPES = ["Loamy", "Sandy", "Clay", "Black", "Red", "Alluvial"];

export const TRANSLATIONS: Record<Language, any> = {
  en: {
    title: "Indian Farmer Assistant",
    tagline: "Your AI Partner for Better Harvest",
    nav: {
      predictor: "Crop Yield Prediction",
      recommendation: "Crop Recommendation",
      disease: "Disease Detection",
      report: "Farmer Report",
      weather: "Weather Advisory",
      irrigation: "Irrigation Suggestion",
      fertilizer: "Fertilizer Advisory",
      risk: "Disease Risk Prediction",
      calendar: "Crop Calendar",
      expenses: "Activity & Expense Tracker",
      faq: "FAQ / Query"
    },
    labels: {
      state: "State",
      district: "District",
      soilType: "Soil Type",
      nitrogen: "Nitrogen (N)",
      phosphorus: "Phosphorus (P)",
      potassium: "Potassium (K)",
      rainfall: "Rainfall (mm)",
      temperature: "Temperature (°C)",
      humidity: "Humidity (%)",
      predict: "Predict Crop & Yield",
      detect: "Detect Disease",
      capture: "Capture Image",
      addActivity: "Add Activity",
      addExpense: "Add Expense",
      generateReport: "Generate Report",
      irrigation: "Irrigation Suggestion",
      fertilizer: "Fertilizer Advisory",
      risk: "Disease Risk",
      calendar: "Crop Calendar",
      reset: "Reset",
      back: "Back to Form",
      locationDetails: "Location Details",
      soilHealth: "Soil Health",
      climateConditions: "Climate Conditions",
      totalCost: "Total Cost",
      recentActivities: "Recent Activities",
      kgPerHectare: "kg / hectare",
      upload: "Upload Image"
    },
    placeholders: {
      selectState: "Select State",
      selectDistrict: "Select District",
      selectSoil: "Select Soil Type",
      enterValue: "Enter value",
      activityNotes: "Notes about activity...",
      expenseAmount: "Amount in ₹"
    },
    results: {
      predictedCrop: "Predicted Crop",
      predictedYield: "Predicted Yield",
      explanation: "Why this crop?",
      topRecommendations: "Top Recommendations",
      diseaseName: "Disease Name",
      confidence: "Confidence",
      cause: "Cause",
      treatment: "Treatment",
      riskLevel: "Risk Level",
      waterLevel: "Water Level",
      whenToIrrigate: "When to irrigate"
    },
    loading: {
      fetching: "Fetching weather data...",
      analyzingSoil: "Analyzing soil conditions...",
      processingRain: "Processing rainfall history...",
      estimatingYield: "Estimating crop yield...",
      generatingReport: "Generating farm report...",
      uploading: "Uploading image...",
      analyzingImage: "Analyzing image content...",
      detectingDisease: "Identifying potential diseases...",
      preparingAdvice: "Preparing expert advice..."
    }
  },
  hi: {
    title: "भारतीय किसान सहायक",
    tagline: "बेहतर फसल के लिए आपका AI साथी",
    nav: {
      predictor: "फसल उपज पूर्वानुमान",
      recommendation: "फसल अनुशंसा",
      disease: "रोग पहचान",
      report: "किसान रिपोर्ट",
      weather: "मौसम सलाह",
      irrigation: "सिंचाई सुझाव",
      fertilizer: "उर्वरक सलाह",
      risk: "रोग जोखिम पूर्वानुमान",
      calendar: "फसल कैलेंडर",
      expenses: "गतिविधि और खर्च ट्रैकर",
      faq: "प्रश्नोत्तरी / पूछताछ"
    },
    labels: {
      state: "राज्य",
      district: "ज़िला",
      soilType: "मिट्टी का प्रकार",
      nitrogen: "नाइट्रोजन (N)",
      phosphorus: "फास्फोरस (P)",
      potassium: "पोटैशियम (K)",
      rainfall: "वर्षा (मिमी)",
      temperature: "तापमान (°C)",
      humidity: "आर्द्रता (%)",
      predict: "फसल और उपज की भविष्यवाणी",
      detect: "रोग का पता लगाएं",
      capture: "छवि कैप्चर करें",
      addActivity: "गतिविधि जोड़ें",
      addExpense: "खर्च जोड़ें",
      generateReport: "रिपोर्ट तैयार करें",
      irrigation: "सिंचाई सुझाव",
      fertilizer: "उर्वरक सलाह",
      risk: "रोग जोखिम",
      calendar: "फसल कैलेंडर",
      reset: "रीसेट",
      back: "फॉर्म पर वापस",
      locationDetails: "स्थान विवरण",
      soilHealth: "मिट्टी का स्वास्थ्य",
      climateConditions: "जलवायु की स्थिति",
      totalCost: "कुल लागत",
      recentActivities: "हाल की गतिविधियाँ",
      kgPerHectare: "किग्रा / हेक्टेयर",
      upload: "छवि अपलोड करें"
    },
    placeholders: {
      selectState: "राज्य चुनें",
      selectDistrict: "ज़िला चुनें",
      selectSoil: "मिट्टी का प्रकार चुनें",
      enterValue: "मान दर्ज करें",
      activityNotes: "गतिविधि के बारे में नोट...",
      expenseAmount: "₹ में राशि"
    },
    results: {
      predictedCrop: "अनुमानित फसल",
      predictedYield: "अनुमानित उपज",
      explanation: "यह फसल क्यों?",
      topRecommendations: "शीर्ष सिफारिशें",
      diseaseName: "रोग का नाम",
      confidence: "विश्वास",
      cause: "कारण",
      treatment: "उपचार",
      riskLevel: "जोखिम स्तर",
      waterLevel: "जल स्तर",
      whenToIrrigate: "सिंचाई कब करें"
    },
    loading: {
      fetching: "मौसम डेटा प्राप्त किया जा रहा है...",
      analyzingSoil: "मिट्टी की स्थिति का विश्लेषण...",
      processingRain: "वर्षा के इतिहास का प्रसंस्करण...",
      estimatingYield: "फसल की उपज का अनुमान...",
      generatingReport: "खेत की रिपोर्ट तैयार की जा रही है...",
      uploading: "छवि अपलोड की जा रही है...",
      analyzingImage: "छवि सामग्री का विश्लेषण...",
      detectingDisease: "संभावित रोगों की पहचान...",
      preparingAdvice: "विशेषज्ञ सलाह तैयार की जा रही है..."
    }
  },
  bn: {
    title: "ভারতীয় কৃষক সহকারী",
    tagline: "উন্নত ফসলের জন্য আপনার AI সঙ্গী",
    nav: {
      predictor: "ফসল ফলন পূর্বাভাস",
      recommendation: "ফসল সুপারিশ",
      disease: "রোগ নির্ণয়",
      report: "কৃষক রিপোর্ট",
      weather: "আবহাওয়া পরামর্শ",
      irrigation: "সেচ পরামর্শ",
      fertilizer: "সার পরামর্শ",
      risk: "রোগের ঝুঁকি পূর্বাভাস",
      calendar: "ফসল ক্যালেন্ডার",
      expenses: "কার্যকলাপ এবং খরচ ট্র্যাকার",
      faq: "প্রশ্ন / জিজ্ঞাসা"
    },
    labels: {
      state: "রাজ্য",
      district: "জেলা",
      soilType: "মাটির ধরন",
      nitrogen: "নাইট্রোজেন (N)",
      phosphorus: "ফসফরাস (P)",
      potassium: "পটাশিয়াম (K)",
      rainfall: "বৃষ্টিপাত (মিমি)",
      temperature: "তাপমাত্রা (°C)",
      humidity: "আর্দ্রতা (%)",
      predict: "ফসল ও ফলন পূর্বাভাস",
      detect: "রোগ শনাক্ত করুন",
      capture: "ছবি তুলুন",
      addActivity: "কার্যকলাপ যোগ করুন",
      addExpense: "খরচ যোগ করুন",
      generateReport: "রিপোর্ট তৈরি করুন",
      irrigation: "সেচ পরামর্শ",
      fertilizer: "সার পরামর্শ",
      risk: "রোগের ঝুঁকি",
      calendar: "ফসল ক্যালেন্ডার",
      reset: "রিসেট",
      back: "ফর্মে ফিরে যান",
      locationDetails: "অবস্থান বিবরণ",
      soilHealth: "মাটির স্বাস্থ্য",
      climateConditions: "জলবায়ু পরিস্থিতি",
      totalCost: "মোট খরচ",
      recentActivities: "সাম্প্রতিক কার্যকলাপ",
      kgPerHectare: "কেজি / হেক্টর",
      upload: "ছবি আপলোড করুন"
    },
    placeholders: {
      selectState: "রাজ্য নির্বাচন করুন",
      selectDistrict: "জেলা নির্বাচন করুন",
      selectSoil: "মাটির ধরন নির্বাচন করুন",
      enterValue: "মান লিখুন",
      activityNotes: "কার্যকলাপ সম্পর্কে নোট...",
      expenseAmount: "₹ এ পরিমাণ"
    },
    results: {
      predictedCrop: "পূর্বাভাসিত ফসল",
      predictedYield: "পূর্বাভাসিত ফলন",
      explanation: "কেন এই ফসল?",
      topRecommendations: "শীর্ষ সুপারিশ",
      diseaseName: "রোগের নাম",
      confidence: "নিশ্চয়তা",
      cause: "কারণ",
      treatment: "চিকিৎসা",
      riskLevel: "ঝুঁকির মাত্রা",
      waterLevel: "জলের স্তর",
      whenToIrrigate: "কখন সেচ দেবেন"
    },
    loading: {
      fetching: "আবহাওয়া তথ্য আনা হচ্ছে...",
      analyzingSoil: "মাটির অবস্থা বিশ্লেষণ করা হচ্ছে...",
      processingRain: "বৃষ্টিপাতের ইতিহাস প্রক্রিয়া করা হচ্ছে...",
      estimatingYield: "ফসলের ফলন অনুমান করা হচ্ছে...",
      generatingReport: "খামার রিপোর্ট তৈরি করা হচ্ছে...",
      uploading: "ছবি আপলোড করা হচ্ছে...",
      analyzingImage: "ছবির বিষয়বস্তু বিশ্লেষণ করা হচ্ছে...",
      detectingDisease: "সম্ভাব্য রোগ শনাক্ত করা হচ্ছে...",
      preparingAdvice: "বিশেষজ্ঞ পরামর্শ প্রস্তুত করা হচ্ছে..."
    }
  }
};

export const FAQ_DATA: Record<Language, FAQItem[]> = {
  en: [
    { question: "How to improve soil fertility?", answer: "Use organic compost, rotate crops, and add balanced NPK fertilizers based on soil tests." },
    { question: "When is the best time for sowing rice?", answer: "Rice is typically sown during the onset of the monsoon (June-July) in most parts of India." },
    { question: "How to prevent pest attacks?", answer: "Practice intercropping, use neem-based pesticides, and monitor crop health regularly." }
  ],
  hi: [
    { question: "मिट्टी की उर्वरता कैसे सुधारें?", answer: "जैविक खाद का उपयोग करें, फसल चक्र अपनाएं और मिट्टी परीक्षण के आधार पर संतुलित NPK उर्वरक डालें।" },
    { question: "चावल बोने का सबसे अच्छा समय कब है?", answer: "भारत के अधिकांश हिस्सों में चावल आमतौर पर मानसून की शुरुआत (जून-जुलाई) के दौरान बोया जाता है।" },
    { question: "कीटों के हमलों को कैसे रोकें?", answer: "अंतःफसल खेती का अभ्यास करें, नीम आधारित कीटनाशकों का उपयोग करें और नियमित रूप से फसल स्वास्थ्य की निगरानी करें।" }
  ],
  bn: [
    { question: "মাটির উর্বরতা কীভাবে বাড়ানো যায়?", answer: "জৈব সার ব্যবহার করুন, ফসল আবর্তন করুন এবং মাটি পরীক্ষার ভিত্তিতে সুষম NPK সার যোগ করুন।" },
    { question: "ধান বোনার উপযুক্ত সময় কখন?", answer: "ভারতের বেশিরভাগ অংশে সাধারণত বর্ষার শুরুতে (জুন-জুলাই) ধান বোনা হয়।" },
    { question: "কীটপতঙ্গের আক্রমণ কীভাবে রোধ করবেন?", answer: "সাথী ফসল চাষ করুন, নিম-ভিত্তিক কীটনাশক ব্যবহার করুন এবং নিয়মিত ফসলের স্বাস্থ্য পর্যবেক্ষণ করুন।" }
  ]
};

export const CROP_CALENDAR: Record<string, CropStage[]> = {
  "Rice": [
    { stage: "Sowing", duration: "1-15 Days", guidance: "Prepare nursery beds and sow seeds with proper spacing." },
    { stage: "Transplanting", duration: "25-30 Days", guidance: "Move seedlings to the main field with standing water." },
    { stage: "Tillering", duration: "40-60 Days", guidance: "Maintain water levels and apply first dose of nitrogen." },
    { stage: "Flowering", duration: "90-100 Days", guidance: "Ensure adequate moisture; avoid water stress." },
    { stage: "Harvesting", duration: "120-150 Days", guidance: "Drain water 10 days before harvest; harvest when grains turn golden." }
  ],
  "Wheat": [
    { stage: "Sowing", duration: "1-10 Days", guidance: "Sow in well-prepared moist soil during November." },
    { stage: "Crown Root Initiation", duration: "20-25 Days", guidance: "Critical stage for first irrigation." },
    { stage: "Tillering", duration: "40-45 Days", guidance: "Apply urea and ensure weed control." },
    { stage: "Flowering", duration: "80-90 Days", guidance: "Maintain soil moisture for grain development." },
    { stage: "Harvesting", duration: "120-130 Days", guidance: "Harvest when grains are hard and straw is dry." }
  ]
};
