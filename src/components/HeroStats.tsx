import { Flame, Clock, Zap } from 'lucide-react';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';
import { Level } from '../types';

interface HeroStatsProps {
    streak: number;
    totalMinutes: number;
    totalXp: number;
    currentLevel: Level;
}

export const HeroStats = ({ streak, totalMinutes, totalXp, currentLevel }: HeroStatsProps) => {
    const animatedXp = useAnimatedCounter(totalXp);
    const animatedMinutes = useAnimatedCounter(totalMinutes);

    return (
        <div className="grid grid-cols-3 gap-3 md:gap-6 mb-8">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden group hover:border-orange-500/30 transition-colors">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all"></div>
                <Flame className={`w-8 h-8 mb-2 ${streak > 0 ? 'text-orange-500' : 'text-slate-600'}`} />
                <span className="text-3xl font-bold text-white tracking-tight">{streak}</span>
                <span className="text-xs text-slate-400 font-medium mt-1">Tage Streak</span>
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden group hover:border-red-600/30 transition-colors">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-red-600/10 rounded-full blur-2xl group-hover:bg-red-600/20 transition-all"></div>
                <Clock className="w-8 h-8 text-red-600 mb-2" />
                <span className="text-3xl font-bold text-white tracking-tight">{animatedMinutes}</span>
                <span className="text-xs text-slate-400 font-medium mt-1">Minuten</span>
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden group hover:border-amber-500/30 transition-colors">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all"></div>
                <Zap className="w-8 h-8 text-amber-500 mb-2" />
                <span className="text-3xl font-bold text-white tracking-tight">{animatedXp}</span>
                <span className="text-xs text-slate-400 font-medium mt-1">XP Total</span>
            </div>
        </div>
    );
};
