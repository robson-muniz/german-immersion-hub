import { PlayCircle } from 'lucide-react';
import { Show } from '../types';

interface ShowCardProps {
    show: Show;
    onClick: (show: Show) => void;
}

export const ShowCard = ({ show, onClick }: ShowCardProps) => {
    return (
        <button
            onClick={() => onClick(show)}
            className={`w-full text-left bg-gradient-to-br ${show.colorAccent} border rounded-2xl p-5 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden group`}
        >
            <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                <PlayCircle className="w-8 h-8 text-white/50" />
            </div>
            
            <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-xs font-bold backdrop-blur-sm">
                    {show.level}
                </span>
                <span className="text-white/70 text-xs font-medium uppercase tracking-wider">
                    {show.tier}
                </span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-1 tracking-tight">{show.title}</h3>
            <p className="text-sm text-white/60 mb-4 font-medium">{show.englishTitle}</p>
            
            <div className="flex items-center gap-1.5 text-xs text-white/80 bg-black/20 self-start px-3 py-1.5 rounded-lg backdrop-blur-sm inline-flex">
                <span className="font-bold">{show.vocabValue}</span>
                <span>Vocab Score</span>
            </div>
        </button>
    );
};
