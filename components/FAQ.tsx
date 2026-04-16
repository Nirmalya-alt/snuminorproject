
import React, { useState, useMemo } from 'react';
import { TRANSLATIONS, FAQ_DATA } from '../constants';
import { Language } from '../types';
import { 
  HelpCircle, ChevronDown, ChevronUp, Search, Sparkles, 
  MessageSquare, Send, Loader2, Info, BookOpen, ExternalLink
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface FAQProps {
  lang: Language;
}

const FAQ: React.FC<FAQProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const faqs = FAQ_DATA[lang];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // AI Query State
  const [userQuery, setUserQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqs;
    const query = searchQuery.toLowerCase();
    return faqs.filter(
      f => f.question.toLowerCase().includes(query) || f.answer.toLowerCase().includes(query)
    );
  }, [faqs, searchQuery]);

  const askAI = async () => {
    if (!userQuery.trim()) return;
    
    setIsLoading(true);
    setAiResponse(null);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `As an expert Indian agricultural advisor, answer this farmer's question in ${lang === 'hi' ? 'Hindi' : lang === 'bn' ? 'Bengali' : 'English'}: "${userQuery}". Provide practical, low-cost, and sustainable advice.`,
        config: {
          systemInstruction: "You are 'Kisan Sight AI', a helpful and empathetic agricultural expert. Use simple language that a farmer can understand. Focus on Indian context, local crops, and sustainable practices.",
        }
      });
      
      setAiResponse(response.text || "I'm sorry, I couldn't generate an answer. Please try again.");
    } catch (error) {
      console.error("AI Error:", error);
      setAiResponse("Sorry, I'm having trouble connecting to my knowledge base. Please check your internet or try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <HelpCircle size={160} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-4xl font-black mb-4 flex items-center gap-3">
            <BookOpen size={32} className="text-purple-200" />
            {t.nav.faq}
          </h2>
          <p className="text-purple-100 text-lg font-medium opacity-90">
            Find answers to common farming questions or ask our AI expert for personalized advice.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: AI Assistant */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-lg border border-purple-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles className="text-purple-500" size={20} />
              Ask Kisan Sight AI
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Type any question about crops, pests, or techniques.
            </p>

            <div className="space-y-4">
              <textarea
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder="e.g. How to grow organic tomatoes in clay soil?"
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none h-32 resize-none text-sm font-medium"
              />
              <button
                onClick={askAI}
                disabled={isLoading || !userQuery.trim()}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white font-black py-4 rounded-2xl shadow-lg shadow-purple-100 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                {isLoading ? 'Consulting Expert...' : 'Get AI Advice'}
              </button>
            </div>

            {aiResponse && (
              <div className="mt-6 p-5 bg-purple-50 rounded-2xl border border-purple-100 animate-fade-in">
                <div className="flex items-center gap-2 mb-3 text-purple-700 font-bold text-sm">
                  <MessageSquare size={16} /> AI Response
                </div>
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {aiResponse}
                </div>
                <button 
                  onClick={() => {setUserQuery(''); setAiResponse(null);}}
                  className="mt-4 text-xs font-bold text-purple-600 hover:underline"
                >
                  Ask another question
                </button>
              </div>
            )}
          </div>

          <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
            <h4 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
              <Info size={18} /> Pro Tip
            </h4>
            <p className="text-sm text-indigo-700 leading-relaxed">
              Be specific with your questions. Mention your crop, soil type, and location for the most accurate AI advice.
            </p>
          </div>
        </div>

        {/* Right Column: FAQ List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
            <h3 className="text-2xl font-black text-gray-900">Common Questions</h3>
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none shadow-sm font-medium"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredFaqs.length === 0 ? (
              <div className="bg-white p-16 rounded-3xl border border-dashed border-gray-200 text-center">
                <HelpCircle size={48} className="mx-auto text-gray-200 mb-4" />
                <p className="text-gray-400 font-bold">No matching questions found.</p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-2 text-purple-600 font-bold hover:underline"
                >
                  Clear search
                </button>
              </div>
            ) : (
              filteredFaqs.map((faq, i) => (
                <div 
                  key={i} 
                  className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden ${
                    openIndex === i ? 'border-purple-200 shadow-xl ring-1 ring-purple-100' : 'border-gray-100 shadow-sm hover:border-gray-200'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className={`font-bold text-lg pr-8 ${openIndex === i ? 'text-purple-700' : 'text-gray-800'}`}>
                      {faq.question}
                    </span>
                    <div className={`p-2 rounded-xl transition-colors ${openIndex === i ? 'bg-purple-100 text-purple-600' : 'bg-gray-50 text-gray-400'}`}>
                      {openIndex === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </button>
                  
                  {openIndex === i && (
                    <div className="px-6 pb-6 animate-fade-in">
                      <div className="h-px bg-gray-100 mb-6"></div>
                      <div className="text-gray-600 leading-relaxed font-medium">
                        {faq.answer}
                      </div>
                      <div className="mt-6 flex items-center gap-4">
                        <button className="text-xs font-bold text-gray-400 hover:text-purple-600 flex items-center gap-1">
                          Was this helpful?
                        </button>
                        <button className="text-xs font-bold text-gray-400 hover:text-purple-600 flex items-center gap-1 ml-auto">
                          <ExternalLink size={12} /> Learn More
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 text-center">
            <p className="text-gray-500 font-medium mb-4">Still have questions?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="px-6 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                Contact Support
              </a>
              <a href="#" className="px-6 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                Community Forum
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
