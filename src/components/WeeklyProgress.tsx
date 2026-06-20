interface WeeklyProgressProps {
    weeklyMinutes: number;
    goalMinutes: number;
}

export const WeeklyProgress = ({ weeklyMinutes, goalMinutes }: WeeklyProgressProps) => {
    const progress = Math.min(100, Math.round((weeklyMinutes / goalMinutes) * 100));

    return (
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 mb-8">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">Wochenziel</h3>
                    <div className="text-2xl font-bold text-white">
                        {weeklyMinutes} <span className="text-sm text-slate-500 font-medium">/ {goalMinutes} min</span>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-amber-400 font-bold">{progress}%</span>
                </div>
            </div>
            
            <div className="h-3 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                <div 
                    className="h-full bg-gradient-to-r from-red-600 to-amber-400 rounded-full transition-all duration-1000 ease-out relative"
                    style={{ width: `${progress}%` }}
                >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
            </div>
            
            {progress >= 100 && (
                <p className="text-amber-400 text-xs font-medium mt-3 text-center">
                    🎉 Wochenziel erreicht! Weiter so!
                </p>
            )}
        </div>
    );
};
