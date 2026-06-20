import { X, ExternalLink, PlayCircle, BookOpen, Star } from 'lucide-react';
import { Show } from '../types';

interface ShowModalProps {
    show: Show | null;
    onClose: () => void;
}

export const ShowModal = ({ show, onClose }: ShowModalProps) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>
            <div className={`relative w-full max-w-lg bg-slate-900 border ${show.colorAccent.split(' ')[2]} rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200`}>
                {/* Header Graphic */}
                <div className={`h-32 bg-gradient-to-br ${show.colorAccent} relative`}>
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 w-8 h-8 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-4 left-6 flex items-center gap-2">
                        <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-bold backdrop-blur-md shadow-sm">
                            {show.level}
                        </span>
                        <span className="px-3 py-1 bg-black/30 text-white rounded-full text-sm font-medium backdrop-blur-md shadow-sm">
                            {show.tier}
                        </span>
                    </div>
                </div>

                <div className="p-6">
                    <h2 className="text-3xl font-bold text-white mb-1 tracking-tight">{show.title}</h2>
                    <p className="text-slate-400 font-medium mb-6 flex items-center gap-2">
                        {show.englishTitle}
                        <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                        Vocab Score: {show.vocabValue}
                    </p>

                    <div className="space-y-6">
                        <div>
                            <h4 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider mb-2">
                                <BookOpen className="w-4 h-4 text-emerald-400" /> 
                                Warum es hilft
                            </h4>
                            <p className="text-slate-300 text-sm leading-relaxed bg-slate-800/50 p-4 rounded-xl border border-white/5">
                                {show.description}
                                <br/><br/>
                                <strong className="text-emerald-400">Key Benefits:</strong> {show.keyBenefits}
                            </p>
                        </div>

                        <div>
                            <h4 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider mb-2">
                                <Star className="w-4 h-4 text-amber-400" /> 
                                Empfehlungen
                            </h4>
                            <p className="text-slate-300 text-sm leading-relaxed bg-slate-800/50 p-4 rounded-xl border border-white/5">
                                {show.recommendations}
                            </p>
                        </div>

                        <div className="pt-4 border-t border-white/10">
                            <h4 className="text-sm font-medium text-slate-400 mb-3">Verfügbar auf: {show.whereToWatch}</h4>
                            <a 
                                href={`https://www.youtube.com/results?search_query=${show.youtubeSearch}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-2 py-3.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold transition-colors shadow-lg shadow-red-600/20"
                            >
                                <PlayCircle className="w-5 h-5" />
                                Auf YouTube suchen
                                <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
