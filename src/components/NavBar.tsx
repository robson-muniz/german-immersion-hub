import { Compass, Sparkles, Home, Tv, Library, User } from 'lucide-react';

interface NavBarProps {
    activeTab: 'home' | 'shows' | 'phrases' | 'profile';
    onTabChange: (tab: 'home' | 'shows' | 'phrases' | 'profile') => void;
}

export const NavBar = ({ activeTab, onTabChange }: NavBarProps) => {
    const tabs = [
        { id: 'home', icon: Home, label: 'Übersicht' },
        { id: 'shows', icon: Tv, label: 'Medien' },
        { id: 'phrases', icon: Library, label: 'Vokabeln' },
        { id: 'profile', icon: User, label: 'Profil' }
    ] as const;

    return (
        <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <Compass className="text-white w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-white tracking-tight leading-tight">
                        Immersion<span className="text-emerald-400">Hub</span>
                    </h1>
                    <p className="hidden sm:block text-xs text-slate-400 font-medium tracking-wide uppercase">German Edition</p>
                </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 bg-slate-900/50 p-1.5 rounded-2xl border border-white/5">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                            activeTab === tab.id 
                                ? 'bg-emerald-500/10 text-emerald-400' 
                                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                        }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            <button className="hidden sm:flex items-center gap-2 bg-white/5 hover:bg-white/10 transition-colors px-4 py-2 rounded-full border border-white/10">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium text-white">Upgrade</span>
            </button>
        </nav>
    );
};
