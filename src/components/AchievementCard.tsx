import { Lock } from 'lucide-react';
import { Achievement } from '../types';

interface AchievementCardProps {
    achievement: Achievement;
}

export const AchievementCard = ({ achievement }: AchievementCardProps) => {
    return (
        <div className={`p-4 rounded-2xl border transition-all ${
            achievement.isUnlocked 
                ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/5 border-amber-500/20' 
                : 'bg-slate-900/50 border-white/5 opacity-50 grayscale'
        }`}>
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner ${
                    achievement.isUnlocked ? 'bg-white/10' : 'bg-black/20'
                }`}>
                    {achievement.isUnlocked ? achievement.icon : <Lock className="w-5 h-5 text-slate-500" />}
                </div>
                <div>
                    <h3 className={`font-bold mb-0.5 ${achievement.isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                        {achievement.title}
                    </h3>
                    <p className="text-xs text-slate-500">
                        {achievement.description}
                    </p>
                </div>
            </div>
        </div>
    );
};
