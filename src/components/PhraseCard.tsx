import { Volume2 } from 'lucide-react';
import { Phrase } from '../types';

interface PhraseCardProps {
    phrase: Phrase;
}

export const PhraseCard = ({ phrase }: PhraseCardProps) => {
    const playAudio = () => {
        if (phrase.audioFile) {
            const audio = new Audio(phrase.audioFile);
            audio.play().catch(e => console.error("Error playing audio:", e));
        } else if ('speechSynthesis' in window) {
            // Fallback
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(phrase.phrase);
            utterance.lang = 'de-DE';
            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-5 hover:border-amber-500/30 transition-colors group">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-white tracking-tight">{phrase.phrase}</h3>
                <button 
                    onClick={playAudio}
                    className="text-slate-500 hover:text-amber-400 transition-colors p-1"
                    title="Anhören"
                >
                    <Volume2 className="w-5 h-5" />
                </button>
            </div>
            
            <p className="text-amber-400 font-medium mb-4">{phrase.meaning}</p>
            
            <div className="space-y-3 text-sm">
                <div className="bg-slate-950 rounded-xl p-3 border border-white/5">
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block mb-1">Context</span>
                    <span className="text-slate-300">{phrase.context}</span>
                </div>
                
                <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Sounds like:</span>
                    <span className="text-slate-400 italic font-medium">{phrase.soundLike}</span>
                </div>
            </div>
        </div>
    );
};
