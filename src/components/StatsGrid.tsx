import { TrackerData } from '../types';

interface StatsGridProps {
    data: TrackerData;
}

export const StatsGrid = ({ data }: StatsGridProps) => {
    // Generate last 7 days for the chart
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        const dateStr = d.toISOString().split('T')[0];
        const dayName = d.toLocaleDateString('de-DE', { weekday: 'short' });
        return {
            dateStr,
            dayName,
            minutes: data.loggedDays[dateStr] || 0
        };
    });

    const maxMinutes = Math.max(...last7Days.map(d => d.minutes), 30); // minimum scale of 30

    return (
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Letzte 7 Tage</h3>
            
            <div className="flex items-end justify-between gap-2 h-32 mb-4">
                {last7Days.map((day, i) => {
                    const height = Math.max(5, (day.minutes / maxMinutes) * 100);
                    const isToday = i === 6;
                    
                    return (
                        <div key={day.dateStr} className="flex flex-col items-center flex-1 gap-2 group">
                            <div className="relative w-full flex justify-center h-full items-end">
                                {/* Tooltip */}
                                <div className="absolute -top-8 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                    {day.minutes} min
                                </div>
                                {/* Bar */}
                                <div 
                                    className={`w-full max-w-[32px] rounded-t-sm transition-all duration-500 ease-out ${
                                        day.minutes > 0 
                                            ? isToday ? 'bg-amber-400' : 'bg-amber-500/50 group-hover:bg-amber-400/80' 
                                            : 'bg-slate-800'
                                    }`}
                                    style={{ height: `${height}%` }}
                                ></div>
                            </div>
                            <span className={`text-[10px] font-medium uppercase tracking-wider ${
                                isToday ? 'text-amber-400' : 'text-slate-500'
                            }`}>
                                {day.dayName}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
