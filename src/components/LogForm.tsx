import { useState } from 'react';
import { Check } from 'lucide-react';

interface LogFormProps {
    onLog: (minutes: number) => void;
}

export const LogForm = ({ onLog }: LogFormProps) => {
    const [minutes, setMinutes] = useState<string>('15');

    const presets = [15, 30, 45, 60];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const mins = parseInt(minutes, 10);
        if (!isNaN(mins) && mins > 0) {
            onLog(mins);
            setMinutes('15');
        }
    };

    return (
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl"></div>
            
            <h3 className="text-lg font-bold text-white mb-4 relative z-10">Immersion Eintragen</h3>
            
            <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                {presets.map(preset => (
                    <button
                        key={preset}
                        onClick={() => setMinutes(preset.toString())}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                            minutes === preset.toString()
                                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/25'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                    >
                        {preset} min
                    </button>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-3 relative z-10">
                <div className="relative flex-1">
                    <input
                        type="number"
                        value={minutes}
                        onChange={(e) => setMinutes(e.target.value)}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all appearance-none"
                        placeholder="Minutes"
                        min="1"
                    />
                    <span className="absolute right-4 top-3 text-slate-500 font-medium pointer-events-none">
                        min
                    </span>
                </div>
                <button
                    type="submit"
                    disabled={!minutes || parseInt(minutes) <= 0}
                    className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-slate-200 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-white/10"
                >
                    <Check className="w-5 h-5" />
                    <span className="hidden sm:inline">Speichern</span>
                </button>
            </form>
        </div>
    );
};
