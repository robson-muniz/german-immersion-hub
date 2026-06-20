export interface Show {
    id: string;
    title: string;
    englishTitle: string;
    level: string;
    tier: string;
    description: string;
    keyBenefits: string;
    recommendations: string;
    whereToWatch: string;
    youtubeSearch: string;
    colorAccent: string;
    vocabValue: number;
}

export interface Phrase {
    phrase: string;
    meaning: string;
    context: string;
    soundLike: string;
    audioFile?: string;
}

export interface Challenge {
    id: string;
    task: string;
    points: number;
    difficulty: 'Leicht' | 'Mittel' | 'Schwer';
    category: 'Hören' | 'Sehen' | 'Verstehen';
    completed?: boolean; // Used for tracking state
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    xpThreshold?: number;
    minutesThreshold?: number;
    isUnlocked: boolean;
}

export interface Mission {
    id: string;
    title: string;
    description: string;
    targetShowId: string;
    targetPhrases: string[];
    xpReward: number;
}

export interface Level {
    level: number;
    name: string;
    minXp: number;
    color: string;
}

export interface TrackerData {
    totalMinutes: number;
    streak: number;
    lastLoggedDate: string | null;
    weeklyMinutes: number;
    loggedDays: Record<string, number>;
    completedMissions: string[];
    unlockedAchievements: string[];
}
