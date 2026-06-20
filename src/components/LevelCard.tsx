import { Trophy } from 'lucide-react';
import { Level } from '../types';
import { getNextLevel } from '../data/levels';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';

interface LevelCardProps {
    totalXp: number;
    currentLevel: Level;
}

export const LevelCard = ({ totalXp, currentLevel }: LevelCardProps) => {
    const nextLevel = getNextLevel(totalXp);
    const animatedXp = useAnimatedCounter(totalXp);
    
    // Calculate progress percentage
    let progressPercentage = 100;
    if (nextLevel) {
        const xpInCurrentLevel = totalXp - currentLevel.minXp;
        const xpNeededForNext = nextLevel.minXp - currentLevel.minXp;
        progressPercentage = Math.min(100, Math.max(0, (xpInCurrentLevel / xpNeededForNext) * 100));
    }

    return (
        <div className="relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 shadow-2xl mb-8">
            <div className="bg-slate-950 rounded-xl p-6 relative overflow-hidden">
                {/* Background ambient glow */}
                <div className={`absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none`}></div>
                
                <div className="flex justify-between items-end mb-6 relative z-10">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Trophy className={`w-5 h-5 ${currentLevel.color.replace('text-', 'text-')}`} />
                            <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">Aktuelles Level</span>
                        </div>
                        <h2 className={`text-3xl sm:text-4xl font-bold ${currentLevel.color}`}>
                            {currentLevel.name}
                        </h2>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold text-white tracking-tight">
                            {animatedXp} <span className="text-lg text-slate-500 font-medium">XP</span>
                        </div>
                    </div>
                </div>

                <div className="relative z-10">
                    <div className="flex justify-between text-xs font-medium text-slate-400 mb-2">
                        <span>{currentLevel.minXp} XP</span>
                        {nextLevel ? (
                            <span>Ziel: {nextLevel.name} ({nextLevel.minXp} XP)</span>
                        ) : (
                            <span>Max Level erreicht!</span>
                        )}
                    </div>
                    <div className="h-4 bg-slate-900 rounded-full overflow-hidden border border-white/5 shadow-inner">
                        <div 
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full relative transition-all duration-1000 ease-out"
                            style={{ width: `${progressPercentage}%` }}
                        >
                            <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/20 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
