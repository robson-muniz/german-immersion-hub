import { Target, Gift } from 'lucide-react';
import { Mission } from '../types';

interface DailyMissionProps {
    mission: Mission;
    onComplete: (missionId: string, reward: number) => void;
    isCompleted: boolean;
}

export const DailyMission = ({ mission, onComplete, isCompleted }: DailyMissionProps) => {
    return (
        <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900/60 border border-indigo-500/20 rounded-2xl p-6 relative overflow-hidden mb-8">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
            
            <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                        <Target className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-indigo-400 uppercase tracking-wider">Tagesziel</h3>
                        <h2 className="text-xl font-bold text-white">{mission.title}</h2>
                    </div>
                </div>
                <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full border border-white/5">
                    <Gift className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-bold text-amber-400">+{mission.xpReward} XP</span>
                </div>
            </div>
            
            <p className="text-slate-300 mb-6 relative z-10">{mission.description}</p>
            
            <button 
                onClick={() => !isCompleted && onComplete(mission.id, mission.xpReward)}
                disabled={isCompleted}
                className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 relative z-10 ${
                    isCompleted 
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 cursor-not-allowed'
                        : 'bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/25 active:scale-[0.98]'
                }`}
            >
                {isCompleted ? 'Mission Erfüllt!' : 'Mission Abschließen'}
            </button>
        </div>
    );
};
