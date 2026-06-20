'use client';

import React, { useState, useEffect } from 'react';
import { NavBar } from '../components/NavBar';
import { BottomNav } from '../components/BottomNav';
import { HeroStats } from '../components/HeroStats';
import { LevelCard } from '../components/LevelCard';
import { DailyMission } from '../components/DailyMission';
import { LogForm } from '../components/LogForm';
import { WeeklyProgress } from '../components/WeeklyProgress';
import { StatsGrid } from '../components/StatsGrid';
import { ShowCard } from '../components/ShowCard';
import { ShowModal } from '../components/ShowModal';
import { PhraseCard } from '../components/PhraseCard';
import { ChallengeCard } from '../components/ChallengeCard';
import { AchievementCard } from '../components/AchievementCard';
import { Toast } from '../components/Toast';

// Hooks
import { useProgress } from '../hooks/useProgress';
import { useToast } from '../hooks/useToast';

// Data
import { SHOWS_DB } from '../data/shows';
import { PHRASES_DB } from '../data/phrases';
import { INITIAL_CHALLENGES } from '../data/challenges';
import { ACHIEVEMENTS } from '../data/achievements';
import { getDailyMission } from '../data/missions';
import { Show, Challenge, Achievement } from '../types';

export default function App() {
    const { data, totalXp, currentLevel, isLoaded, addMinutes, saveData } = useProgress();
    const { toast, showToast, hideToast } = useToast();
    
    const [activeTab, setActiveTab] = useState<'home' | 'shows' | 'phrases' | 'profile'>('home');
    const [selectedShow, setSelectedShow] = useState<Show | null>(null);
    const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES);
    const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS);
    const [dailyMission, setDailyMission] = useState(getDailyMission());

    // Initialize challenges and achievements state from stored data
    useEffect(() => {
        if (isLoaded) {
            // Achievements sync
            const updatedAchievements = achievements.map(ach => ({
                ...ach,
                isUnlocked: data.unlockedAchievements.includes(ach.id) ||
                            (ach.xpThreshold ? totalXp >= ach.xpThreshold : false) ||
                            (ach.minutesThreshold ? data.totalMinutes >= ach.minutesThreshold : false)
            }));
            
            // Check if new achievements unlocked
            const newUnlocks = updatedAchievements.filter(a => a.isUnlocked && !data.unlockedAchievements.includes(a.id));
            if (newUnlocks.length > 0) {
                newUnlocks.forEach(ach => {
                    setTimeout(() => {
                        showToast({
                            title: 'Achievement Unlocked!',
                            description: ach.title,
                            icon: ach.icon
                        });
                    }, 500); // Slight delay for emphasis
                });
                
                const newData = { ...data, unlockedAchievements: [...data.unlockedAchievements, ...newUnlocks.map(a => a.id)] };
                saveData(newData);
            }
            
            setAchievements(updatedAchievements);
        }
    }, [isLoaded, totalXp, data.totalMinutes, data.unlockedAchievements]);

    const handleLogMinutes = (minutes: number) => {
        addMinutes(minutes);
        showToast({
            title: 'Klasse!',
            description: `${minutes} Minuten Immersion hinzugefügt (+${minutes * 10} XP)`,
            type: 'success'
        });
    };

    const completeChallenge = (challenge: Challenge) => {
        setChallenges(prev => prev.map(c => 
            c.id === challenge.id ? { ...c, completed: true } : c
        ));
        
        // Reward XP equivalent to points (handled differently in a real app, here we just simulate via minutes for now, or we can adjust progress hook. Let's just show toast for UI showcase)
        showToast({
            title: 'Herausforderung Abgeschlossen!',
            description: `Du hast ${challenge.points} XP verdient.`,
            icon: '⭐'
        });
    };

    const completeMission = (missionId: string, reward: number) => {
        const newData = { ...data, completedMissions: [...data.completedMissions, missionId] };
        saveData(newData);
        
        showToast({
            title: 'Mission Erfüllt!',
            description: `Du hast deine Tagesmission abgeschlossen! +${reward} XP`,
            icon: '🏆'
        });
    };

    if (!isLoaded) {
        return <div className="min-h-screen bg-slate-950 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>;
    }

    const isMissionCompleted = data.completedMissions.includes(dailyMission.id);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30 pb-safe md:pb-0">
            <NavBar />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
                {activeTab === 'home' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <HeroStats 
                            streak={data.streak} 
                            totalMinutes={data.totalMinutes} 
                            totalXp={totalXp} 
                            currentLevel={currentLevel} 
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <LevelCard totalXp={totalXp} currentLevel={currentLevel} />
                                <DailyMission 
                                    mission={dailyMission} 
                                    onComplete={completeMission} 
                                    isCompleted={isMissionCompleted} 
                                />
                                <LogForm onLog={handleLogMinutes} />
                            </div>
                            
                            <div>
                                <WeeklyProgress weeklyMinutes={data.weeklyMinutes} goalMinutes={300} />
                                <StatsGrid data={data} />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'shows' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-white mb-2">Medien-Bibliothek</h2>
                            <p className="text-slate-400">Curated comprehensible input for your level.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {SHOWS_DB.map(show => (
                                <ShowCard key={show.id} show={show} onClick={setSelectedShow} />
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'phrases' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-white mb-2">Aktive Vokabeln</h2>
                            <p className="text-slate-400">Phrases you should listen for in your immersion.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {PHRASES_DB.map((phrase, idx) => (
                                <PhraseCard key={idx} phrase={phrase} />
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'profile' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-white mb-2">Dein Profil</h2>
                            <p className="text-slate-400">Track your milestones and challenges.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <span className="text-emerald-500">🎯</span> Herausforderungen
                                </h3>
                                <div className="space-y-3">
                                    {challenges.map(challenge => (
                                        <ChallengeCard 
                                            key={challenge.id} 
                                            challenge={challenge} 
                                            onComplete={completeChallenge} 
                                        />
                                    ))}
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <span className="text-amber-500">🏆</span> Erfolge
                                </h3>
                                <div className="space-y-3">
                                    {achievements.map(achievement => (
                                        <AchievementCard key={achievement.id} achievement={achievement} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
            
            <ShowModal show={selectedShow} onClose={() => setSelectedShow(null)} />
            
            {toast && (
                <Toast 
                    {...toast} 
                    onClose={hideToast} 
                />
            )}
        </div>
    );
}