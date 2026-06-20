import { useState, useEffect } from 'react';
import { TrackerData } from '../types';
import { getLevelForXp } from '../data/levels';

const STORAGE_KEY = 'german_immersion_data';

const DEFAULT_DATA: TrackerData = {
    totalMinutes: 0,
    streak: 0,
    lastLoggedDate: null,
    weeklyMinutes: 0,
    loggedDays: {},
    completedMissions: [],
    unlockedAchievements: []
};

export const useProgress = () => {
    const [data, setData] = useState<TrackerData>(DEFAULT_DATA);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setData(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse progress data", e);
            }
        }
        setIsLoaded(true);
    }, []);

    const saveData = (newData: TrackerData) => {
        setData(newData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    };

    const addMinutes = (minutes: number) => {
        const today = new Date().toISOString().split('T')[0];
        const newData = { ...data };

        newData.totalMinutes += minutes;
        newData.weeklyMinutes += minutes;
        
        if (newData.lastLoggedDate !== today) {
            // Check streak
            if (newData.lastLoggedDate) {
                const lastDate = new Date(newData.lastLoggedDate);
                const currentDate = new Date(today);
                const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                if (diffDays === 1) {
                    newData.streak += 1;
                } else if (diffDays > 1) {
                    newData.streak = 1; // Reset streak
                }
            } else {
                newData.streak = 1;
            }
            newData.lastLoggedDate = today;
        }

        newData.loggedDays[today] = (newData.loggedDays[today] || 0) + minutes;
        
        saveData(newData);
    };

    // Calculate XP: 1 minute = 10 XP
    const totalXp = data.totalMinutes * 10;
    const currentLevel = getLevelForXp(totalXp);

    return {
        data,
        totalXp,
        currentLevel,
        isLoaded,
        addMinutes,
        saveData
    };
};
