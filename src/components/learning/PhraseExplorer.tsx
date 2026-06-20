import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Volume2, Play } from 'lucide-react';

interface Token {
    id: string;
    german: string;
    english: string;
    type: 'noun' | 'verb' | 'article' | 'pronoun' | 'adjective' | 'other';
    grammarNote?: string;
}

interface PhraseExplorerProps {
    phrase: string;
    englishTranslation: string;
    tokens: Token[];
    fullAudioUrl?: string;
}

export const PhraseExplorer = ({ phrase, englishTranslation, tokens, fullAudioUrl }: PhraseExplorerProps) => {
    const [activeToken, setActiveToken] = useState<Token | null>(null);

    const playFullPhrase = () => {
        if (fullAudioUrl) {
            const audio = new Audio(fullAudioUrl);
            audio.play();
        } else if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(phrase);
            utterance.lang = 'de-DE';
            window.speechSynthesis.speak(utterance);
        }
    };

    const playWord = (word: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.lang = 'de-DE';
            window.speechSynthesis.speak(utterance);
        }
    };

    const getTypeColor = (type: string) => {
        switch(type) {
            case 'noun': return 'border-blue-500/50 text-blue-400 bg-blue-500/10';
            case 'verb': return 'border-red-500/50 text-red-400 bg-red-500/10';
            case 'article': return 'border-amber-500/50 text-amber-400 bg-amber-500/10';
            case 'pronoun': return 'border-purple-500/50 text-purple-400 bg-purple-500/10';
            default: return 'border-white/20 text-slate-300 bg-white/5';
        }
    };

    return (
        <div className="w-full bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex justify-between items-start mb-8 relative z-10">
                <div>
                    <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-1">Phrase Explorer</h3>
                    <p className="text-slate-400 font-medium">Click on any word to break it down.</p>
                </div>
                <button 
                    onClick={playFullPhrase}
                    className="w-12 h-12 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center text-white transition-colors border border-white/10 shadow-lg"
                >
                    <Play className="w-5 h-5 ml-1" />
                </button>
            </div>

            <div className="flex flex-wrap gap-3 mb-8 relative z-10">
                {tokens.map((token) => {
                    const isActive = activeToken?.id === token.id;
                    return (
                        <motion.button
                            key={token.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                setActiveToken(token);
                                playWord(token.german);
                            }}
                            className={`px-5 py-3 rounded-2xl text-xl font-bold border-2 transition-all ${
                                isActive 
                                    ? getTypeColor(token.type).replace('/50', '').replace('/10', '/30') + ' shadow-lg scale-105'
                                    : 'bg-slate-950 border-white/10 text-white hover:border-white/30'
                            }`}
                        >
                            {token.german}
                        </motion.button>
                    );
                })}
            </div>

            <div className="bg-slate-950 rounded-2xl p-5 border border-white/5 relative z-10">
                <p className="text-slate-300 text-lg font-medium italic">"{englishTranslation}"</p>
            </div>

            <AnimatePresence>
                {activeToken && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-6 pt-6 border-t border-white/10"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h4 className="text-2xl font-bold text-white">{activeToken.german}</h4>
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getTypeColor(activeToken.type)}`}>
                                        {activeToken.type}
                                    </span>
                                </div>
                                <p className="text-amber-400 text-lg font-medium mb-3">{activeToken.english}</p>
                                
                                {activeToken.grammarNote && (
                                    <p className="text-sm text-slate-400 bg-slate-800 p-3 rounded-xl inline-block">
                                        <strong className="text-slate-300">Note:</strong> {activeToken.grammarNote}
                                    </p>
                                )}
                            </div>
                            <button 
                                onClick={() => playWord(activeToken.german)}
                                className="p-3 bg-slate-800 rounded-xl hover:bg-amber-500/20 hover:text-amber-400 text-slate-400 transition-colors border border-white/5"
                            >
                                <Volume2 className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
