import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface SentenceBuilderProps {
    correctSentence: string;
    englishTranslation: string;
    onComplete: (success: boolean) => void;
}

export const SentenceBuilder = ({ correctSentence, englishTranslation, onComplete }: SentenceBuilderProps) => {
    // Split and shuffle
    const correctTokens = correctSentence.split(' ');
    const [availableTokens, setAvailableTokens] = useState(() => 
        [...correctTokens].sort(() => Math.random() - 0.5).map((t, i) => ({ id: `t_${i}`, word: t }))
    );
    const [selectedTokens, setSelectedTokens] = useState<{id: string, word: string}[]>([]);
    const [isEvaluated, setIsEvaluated] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleSelect = (token: {id: string, word: string}) => {
        if (isEvaluated) return;
        setAvailableTokens(prev => prev.filter(t => t.id !== token.id));
        setSelectedTokens(prev => [...prev, token]);
    };

    const handleDeselect = (token: {id: string, word: string}) => {
        if (isEvaluated) return;
        setSelectedTokens(prev => prev.filter(t => t.id !== token.id));
        setAvailableTokens(prev => [...prev, token]);
    };

    const handleCheck = () => {
        const formedSentence = selectedTokens.map(t => t.word).join(' ');
        const correct = formedSentence === correctSentence;
        
        setIsEvaluated(true);
        setIsCorrect(correct);

        setTimeout(() => {
            onComplete(correct);
        }, 2000);
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-white mb-2">Translate this sentence</h2>
                <p className="text-xl text-amber-400 font-medium">"{englishTranslation}"</p>
            </div>

            {/* Drop Zone */}
            <div className="min-h-[100px] w-full bg-slate-900 border-2 border-dashed border-white/20 rounded-3xl p-4 mb-8 flex flex-wrap gap-3 items-center justify-start relative">
                <AnimatePresence>
                    {selectedTokens.map(token => (
                        <motion.button
                            layout
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            key={token.id}
                            onClick={() => handleDeselect(token)}
                            className={`px-5 py-3 bg-white text-black font-bold rounded-2xl shadow-md transition-colors ${
                                isEvaluated 
                                    ? isCorrect ? 'bg-emerald-400 text-slate-900' : 'bg-red-400 text-white' 
                                    : 'hover:bg-slate-200'
                            }`}
                        >
                            {token.word}
                        </motion.button>
                    ))}
                </AnimatePresence>
                {selectedTokens.length === 0 && (
                    <span className="text-slate-500 font-medium mx-auto absolute inset-0 flex items-center justify-center pointer-events-none">
                        Tap words to build the sentence
                    </span>
                )}
            </div>

            {/* Available Words */}
            <div className="min-h-[120px] flex flex-wrap gap-3 justify-center mb-12">
                <AnimatePresence>
                    {availableTokens.map(token => (
                        <motion.button
                            layout
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            whileTap={{ scale: 0.95 }}
                            key={token.id}
                            onClick={() => handleSelect(token)}
                            className="px-5 py-3 bg-slate-800 border border-white/10 text-white font-bold rounded-2xl shadow-sm hover:bg-slate-700 transition-colors"
                        >
                            {token.word}
                        </motion.button>
                    ))}
                </AnimatePresence>
            </div>

            <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleCheck}
                disabled={selectedTokens.length === 0 || isEvaluated}
                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
                    selectedTokens.length === 0
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        : isEvaluated
                            ? isCorrect
                                ? 'bg-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.3)]'
                                : 'bg-red-500 text-white'
                            : 'bg-amber-500 hover:bg-amber-400 text-black shadow-[0_0_30px_rgba(245,158,11,0.3)]'
                }`}
            >
                {isEvaluated 
                    ? isCorrect ? 'Perfekt!' : 'Versuch es noch einmal'
                    : 'Überprüfen (Check)'}
            </motion.button>
        </div>
    );
};
