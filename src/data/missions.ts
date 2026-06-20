import { Mission } from '../types';

export const DAILY_MISSIONS: Mission[] = [
    {
        id: "dm_1",
        title: "Peppa Time",
        description: "Watch 15 minutes of Peppa Wutz and listen carefully.",
        targetShowId: "peppa",
        targetPhrases: ["springen", "spielen", "laufen"],
        xpReward: 50
    },
    {
        id: "dm_2",
        title: "Sachgeschichten",
        description: "Watch a story about how things are made on Die Sendung mit der Maus.",
        targetShowId: "maus",
        targetPhrases: ["bauen", "machen", "funktionieren"],
        xpReward: 60
    },
    {
        id: "dm_3",
        title: "Builder Vocabulary",
        description: "Tune in to Bob der Baumeister to catch action verbs.",
        targetShowId: "bob",
        targetPhrases: ["schaffen", "helfen", "fertig"],
        xpReward: 55
    }
];

export const getDailyMission = (): Mission => {
    // Simple deterministic mission based on the day of the year
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    return DAILY_MISSIONS[dayOfYear % DAILY_MISSIONS.length];
};
