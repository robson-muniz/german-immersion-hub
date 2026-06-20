import { CheckCircle2, Circle } from 'lucide-react';
import { Challenge } from '../types';

interface ChallengeCardProps {
    challenge: Challenge;
    onComplete: (challenge: Challenge) => void;
}

export const ChallengeCard = ({ challenge, onComplete }: ChallengeCardProps) => {
    const isCompleted = challenge.completed;

    return (
        <button
            onClick={() => !isCompleted && onComplete(challenge)}
            disabled={isCompleted}
            className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                isCompleted 
                    ? 'bg-slate-900/40 border-white/5 opacity-50' 
                    : 'bg-slate-900 border-white/10 hover:border-emerald-500/30 hover:bg-slate-800/80 active:scale-[0.98]'
            }`}
        >
            <div className={`mt-0.5 transition-colors ${isCompleted ? 'text-emerald-500' : 'text-slate-500 group-hover:text-emerald-400'}`}>
                {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
            </div>
            <div className="flex-1">
                <p className={`text-sm mb-2 leading-relaxed ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-200'}`}>
                    {challenge.task}
                </p>
                <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        challenge.difficulty === 'Leicht' ? 'bg-emerald-500/10 text-emerald-400' :
                        challenge.difficulty === 'Mittel' ? 'bg-amber-500/10 text-amber-400' :
                        'bg-rose-500/10 text-rose-400'
                    }`}>
                        {challenge.difficulty}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400">
                        {challenge.category}
                    </span>
                    {!isCompleted && (
                        <span className="ml-auto text-xs font-bold text-amber-400">
                            +{challenge.points} XP
                        </span>
                    )}
                </div>
            </div>
        </button>
    );
};
