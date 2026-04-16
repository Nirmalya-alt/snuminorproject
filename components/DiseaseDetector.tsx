
import React, { useState, useRef, useEffect } from 'react';
import { TRANSLATIONS } from '../constants';
import { Language, DiseaseDetectionResult } from '../types';
import { detectCropDisease } from '../services/gemini';
import LoadingScreen from './LoadingScreen';
import { Camera, Upload, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

interface DiseaseDetectorProps {
  lang: Language;
}

const DiseaseDetector: React.FC<DiseaseDetectorProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<DiseaseDetectionResult | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    setCameraError(null);
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setCameraError("Could not access camera. Please check permissions.");
      setShowCamera(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setImage(dataUrl);
        setResult(null);
        stopCamera();
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDetect = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const res = await detectCropDisease(image);
      setResult(res);
    } catch (error) {
      alert("Could not analyze image. Try a clearer photo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  if (loading) {
    return (
      <LoadingScreen messages={[
        t.loading.uploading,
        t.loading.analyzingImage,
        t.loading.detectingDisease,
        t.loading.preparingAdvice
      ]} />
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">{t.nav.disease}</h2>
            <p className="text-gray-500 mt-1">AI-powered diagnosis for your crops</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-green-600 font-semibold bg-green-50 px-4 py-2 rounded-full border border-green-100">
            <CheckCircle size={18} />
            <span className="text-sm">PlantVillage Dataset Trained</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="relative group">
              {showCamera ? (
                <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-black relative border-4 border-green-500 shadow-2xl">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 px-6">
                    <button 
                      onClick={capturePhoto}
                      className="bg-white text-green-600 p-5 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95"
                    >
                      <Camera size={32} strokeWidth={2.5} />
                    </button>
                    <button 
                      onClick={stopCamera}
                      className="bg-red-500 text-white p-5 rounded-full shadow-2xl hover:bg-red-600 transition-colors"
                    >
                      <RefreshCw size={32} className="rotate-45" />
                    </button>
                  </div>
                </div>
              ) : (
                <div 
                  className={`aspect-[4/3] rounded-3xl border-3 border-dashed flex flex-col items-center justify-center transition-all duration-300 relative overflow-hidden ${
                    image ? 'border-green-400 bg-green-50/30' : 'border-gray-200 hover:border-green-400 hover:bg-green-50/50'
                  }`}
                >
                  {image ? (
                    <>
                      <img src={image} alt="Crop Leaf" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <button 
                          onClick={startCamera}
                          className="bg-white/90 p-3 rounded-full text-green-600 hover:bg-white"
                        >
                          <Camera size={24} />
                        </button>
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-white/90 p-3 rounded-full text-green-600 hover:bg-white"
                        >
                          <Upload size={24} />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-10">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                        <Camera size={40} />
                      </div>
                      <p className="text-xl font-bold text-gray-800 mb-2">Capture or Upload</p>
                      <p className="text-gray-500 text-sm mb-8">Take a clear photo of the infected leaf</p>
                      
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                          onClick={startCamera}
                          className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-md"
                        >
                          <Camera size={20} />
                          Use Camera
                        </button>
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center justify-center gap-2 bg-white text-green-600 border-2 border-green-600 px-6 py-3 rounded-xl font-bold hover:bg-green-50 transition-all"
                        >
                          <Upload size={20} />
                          Upload File
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <canvas ref={canvasRef} className="hidden" />
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageUpload} 
              />
            </div>

            {cameraError && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl border border-red-100 text-sm">
                <AlertCircle size={18} />
                {cameraError}
              </div>
            )}
            
            <button
              onClick={handleDetect}
              disabled={!image || showCamera}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-black text-lg py-5 rounded-2xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-xl shadow-green-200 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
            >
              {t.labels.detect}
            </button>
          </div>

          <div className="bg-gray-50/50 rounded-3xl p-6 sm:p-8 border border-gray-100">
            {result ? (
              <div className="space-y-8 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1 block">Diagnosis Result</span>
                    <h3 className="text-3xl font-black text-gray-900 leading-tight">{result.diseaseName}</h3>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex flex-col items-center bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Confidence</span>
                      <span className={`text-2xl font-black ${result.confidence > 80 ? 'text-green-600' : result.confidence > 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {result.confidence}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-green-200 transition-colors group">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                        <AlertCircle size={20} />
                      </div>
                      <h4 className="font-bold text-gray-800 text-lg">{t.results.cause || 'Root Cause'}</h4>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{result.cause}</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-green-200 transition-colors group">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                        <CheckCircle size={20} />
                      </div>
                      <h4 className="font-bold text-gray-800 text-lg">{t.results.treatment || 'Recommended Solution'}</h4>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{result.treatment}</p>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
                  <div className="text-blue-600 mt-0.5">ℹ️</div>
                  <p className="text-xs text-blue-700 leading-normal">
                    This diagnosis is based on AI analysis. For severe infestations, please consult your local agricultural extension officer.
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-gray-400 text-center px-6">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-inner mb-6 opacity-60">
                  <span className="text-5xl">🔬</span>
                </div>
                <h4 className="text-xl font-bold text-gray-700 mb-2">Ready for Analysis</h4>
                <p className="max-w-xs text-sm leading-relaxed">
                  Upload or capture a photo of the affected plant leaf. Our AI model will analyze it for diseases and provide treatment options.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetector;
