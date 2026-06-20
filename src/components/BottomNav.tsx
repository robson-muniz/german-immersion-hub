import { Home, Tv, Library, User } from 'lucide-react';

interface BottomNavProps {
    activeTab: 'home' | 'shows' | 'phrases' | 'profile';
    onTabChange: (tab: 'home' | 'shows' | 'phrases' | 'profile') => void;
}

export const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
    const tabs = [
        { id: 'home', icon: Home, label: 'Übersicht' },
        { id: 'shows', icon: Tv, label: 'Medien' },
        { id: 'phrases', icon: Library, label: 'Vokabeln' },
        { id: 'profile', icon: User, label: 'Profil' }
    ] as const;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden pb-safe">
            <div className="bg-slate-950/90 backdrop-blur-xl border-t border-white/10 px-6 py-3 flex justify-between items-center relative">
                {/* Active indicator bar */}
                <div 
                    className="absolute top-0 h-0.5 bg-red-600 transition-all duration-300 ease-out"
                    style={{ 
                        width: '20%', 
                        left: `${tabs.findIndex(t => t.id === activeTab) * 25 + 2.5}%` 
                    }}
                />
                
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`flex flex-col items-center gap-1 transition-colors ${
                                isActive ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'
                            }`}
                        >
                            <div className={`p-1 rounded-full transition-all duration-300 ${isActive ? 'bg-amber-500/10' : ''}`}>
                                <Icon className={`w-6 h-6 ${isActive ? 'fill-amber-500/20' : ''}`} />
                            </div>
                            <span className="text-[10px] font-medium">{tab.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
