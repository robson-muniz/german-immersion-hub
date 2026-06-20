import { motion } from 'framer-motion';
import { useState } from 'react';
import { Volume2 } from 'lucide-react';

interface Hotspot {
    id: string;
    x: number; // percentage 0-100
    y: number; // percentage 0-100
    germanWord: string;
    translation: string;
    audioUrl?: string;
    examples: string[];
    pronunciation: string;
}

interface InteractiveSceneProps {
    title: string;
    imageUrl: string;
    hotspots: Hotspot[];
}

export const InteractiveScene = ({ title, imageUrl, hotspots }: InteractiveSceneProps) => {
    const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

    const handleHotspotClick = (hotspot: Hotspot) => {
        setActiveHotspot(hotspot);
        if (hotspot.audioUrl) {
            const audio = new Audio(hotspot.audioUrl);
            audio.play().catch(e => console.error("Audio play failed", e));
        } else if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(hotspot.germanWord);
            utterance.lang = 'de-DE';
            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <div className="w-full bg-slate-900 rounded-3xl border border-white/10 overflow-hidden relative shadow-2xl">
            <div className="p-4 bg-slate-950/80 backdrop-blur border-b border-white/5 flex justify-between items-center relative z-10">
                <h3 className="font-bold text-lg text-white">{title}</h3>
                <span className="text-xs font-medium text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full uppercase tracking-wider">
                    Interactive Scene
                </span>
            </div>

            <div className="relative aspect-video w-full bg-slate-800 flex items-center justify-center overflow-hidden group">
                {/* Fallback pattern if no image */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-400/20 via-slate-900 to-black pointer-events-none"></div>
                
                {imageUrl ? (
                    <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
                ) : (
                    <div className="text-slate-500 font-medium">Scene Image Placeholder</div>
                )}

                {/* Hotspots */}
                {hotspots.map((spot) => (
                    <motion.button
                        key={spot.id}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.2 }}
                        onClick={() => handleHotspotClick(spot)}
                        className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full flex items-center justify-center border-2 shadow-lg transition-colors ${
                            activeHotspot?.id === spot.id 
                                ? 'bg-amber-400 border-white text-black z-20 shadow-amber-400/50' 
                                : 'bg-white/20 border-white/50 text-white hover:bg-white/40 backdrop-blur-md'
                        }`}
                        style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    >
                        <div className="w-2 h-2 bg-current rounded-full" />
                        
                        {/* Pulse effect */}
                        {activeHotspot?.id !== spot.id && (
                            <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping"></div>
                        )}
                    </motion.button>
                ))}
            </div>

            {/* Premium Information Panel */}
            <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                    height: activeHotspot ? 'auto' : 0, 
                    opacity: activeHotspot ? 1 : 0 
                }}
                className="bg-slate-950 overflow-hidden"
            >
                {activeHotspot && (
                    <div className="p-6 border-t border-white/5 relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-amber-400"></div>
                        
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-3xl font-bold text-white tracking-tight mb-1">
                                    {activeHotspot.germanWord}
                                </h2>
                                <p className="text-amber-400 font-medium flex items-center gap-2">
                                    {activeHotspot.translation}
                                    <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                                    <span className="text-slate-400 text-sm font-normal">[{activeHotspot.pronunciation}]</span>
                                </p>
                            </div>
                            <button 
                                onClick={() => handleHotspotClick(activeHotspot)}
                                className="w-12 h-12 bg-slate-900 border border-white/10 hover:border-amber-400/50 rounded-2xl flex items-center justify-center text-slate-300 hover:text-amber-400 transition-all shadow-lg active:scale-95"
                            >
                                <Volume2 className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Examples in Context</h4>
                            {activeHotspot.examples.map((ex, idx) => (
                                <div key={idx} className="bg-slate-900/50 p-3 rounded-xl border border-white/5">
                                    <p className="text-slate-200 font-medium">{ex}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};
