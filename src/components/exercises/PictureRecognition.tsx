import { motion } from 'framer-motion';
import { useState } from 'react';
import { Check, X } from 'lucide-react';

interface PictureRecognitionProps {
    germanWord: string;
    audioUrl?: string;
    options: {
        id: string;
        imageEmoji: string; // Or URL in a real app
        isCorrect: boolean;
    }[];
    onComplete: (success: boolean) => void;
}

export const PictureRecognition = ({ germanWord, audioUrl, options, onComplete }: PictureRecognitionProps) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isEvaluated, setIsEvaluated] = useState(false);

    const handleSelect = (id: string) => {
        if (isEvaluated) return;
        setSelectedId(id);
    };

    const handleCheck = () => {
        if (!selectedId) return;
        setIsEvaluated(true);
        const correct = options.find(o => o.id === selectedId)?.isCorrect || false;
        
        setTimeout(() => {
            onComplete(correct);
        }, 2000);
    };

    const playAudio = () => {
        if (audioUrl) {
            new Audio(audioUrl).play();
        } else if ('speechSynthesis' in window) {
            const u = new SpeechSynthesisUtterance(germanWord);
            u.lang = 'de-DE';
            window.speechSynthesis.speak(u);
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Select the matching image</h2>
                <button 
                    onClick={playAudio}
                    className="inline-flex items-center gap-3 px-6 py-4 bg-slate-900 border border-white/10 rounded-2xl hover:bg-slate-800 transition-colors shadow-lg active:scale-95 group"
                >
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
                        <span className="text-amber-400 text-xl">🔊</span>
                    </div>
                    <span className="text-2xl font-bold text-white">{germanWord}</span>
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
                {options.map((opt) => {
                    const isSelected = selectedId === opt.id;
                    let stateClass = "bg-slate-900 border-white/10 hover:border-amber-400/50";
                    
                    if (isEvaluated) {
                        if (opt.isCorrect) {
                            stateClass = "bg-emerald-500/20 border-emerald-500";
                        } else if (isSelected && !opt.isCorrect) {
                            stateClass = "bg-red-500/20 border-red-500";
                        } else {
                            stateClass = "bg-slate-900/50 border-white/5 opacity-50";
                        }
                    } else if (isSelected) {
                        stateClass = "bg-amber-500/10 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]";
                    }

                    return (
                        <motion.button
                            key={opt.id}
                            whileHover={!isEvaluated ? { scale: 1.05 } : {}}
                            whileTap={!isEvaluated ? { scale: 0.95 } : {}}
                            onClick={() => handleSelect(opt.id)}
                            className={`aspect-square rounded-3xl border-2 flex items-center justify-center text-6xl transition-all relative overflow-hidden ${stateClass}`}
                        >
                            <span className="relative z-10 drop-shadow-2xl">{opt.imageEmoji}</span>
                            
                            {isEvaluated && opt.isCorrect && (
                                <motion.div 
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="absolute top-3 right-3 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white"
                                >
                                    <Check className="w-5 h-5" />
                                </motion.div>
                            )}
                            
                            {isEvaluated && isSelected && !opt.isCorrect && (
                                <motion.div 
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="absolute top-3 right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white"
                                >
                                    <X className="w-5 h-5" />
                                </motion.div>
                            )}
                        </motion.button>
                    );
                })}
            </div>

            <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleCheck}
                disabled={!selectedId || isEvaluated}
                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
                    !selectedId 
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        : isEvaluated
                            ? options.find(o => o.id === selectedId)?.isCorrect
                                ? 'bg-emerald-500 text-white'
                                : 'bg-red-500 text-white'
                            : 'bg-amber-500 hover:bg-amber-400 text-black shadow-[0_0_30px_rgba(245,158,11,0.3)]'
                }`}
            >
                {isEvaluated 
                    ? options.find(o => o.id === selectedId)?.isCorrect ? 'Richtig! (Correct!)' : 'Falsch (Wrong)'
                    : 'Überprüfen (Check)'}
            </motion.button>
        </div>
    );
};
