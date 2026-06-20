import { Achievement } from '../types';

export const ACHIEVEMENTS: Achievement[] = [
    { id: "ach_first_30", title: "First Steps", description: "Log your first 30 minutes of immersion.", icon: "🌱", minutesThreshold: 30, isUnlocked: false },
    { id: "ach_100_xp", title: "A1 Starter", description: "Reach 100 XP.", icon: "⭐", xpThreshold: 100, isUnlocked: false },
    { id: "ach_streak_3", title: "Habit Builder", description: "Reach a 3-day streak.", icon: "🔥", isUnlocked: false },
    { id: "ach_1000_min", title: "Immersion Master", description: "Log 1000 total minutes.", icon: "🎧", minutesThreshold: 1000, isUnlocked: false },
    { id: "ach_level_5", title: "A2 Navigator", description: "Reach Level 5.", icon: "🧭", xpThreshold: 1400, isUnlocked: false },
];
