import { Level } from '../types';

export const LEVELS: Level[] = [
    { level: 1, name: "A1 Entdecker", minXp: 0, color: "text-slate-400" },
    { level: 2, name: "A1 Zuhörer", minXp: 200, color: "text-red-400" },
    { level: 3, name: "A1 Überlebender", minXp: 500, color: "text-red-500" },
    { level: 4, name: "A2 Erbauer", minXp: 900, color: "text-orange-400" },
    { level: 5, name: "A2 Navigator", minXp: 1400, color: "text-orange-500" },
    { level: 6, name: "B1 Kommunikator", minXp: 2000, color: "text-amber-400" },
    { level: 7, name: "B2 Erzähler", minXp: 3000, color: "text-amber-500" },
    { level: 8, name: "C1 Denker", minXp: 4500, color: "text-yellow-400" },
    { level: 9, name: "C2 Muttersprachler", minXp: 7000, color: "text-yellow-500" }
];

export const getLevelForXp = (xp: number): Level => {
    let currentLevel = LEVELS[0];
    for (const level of LEVELS) {
        if (xp >= level.minXp) {
            currentLevel = level;
        } else {
            break;
        }
    }
    return currentLevel;
};

export const getNextLevel = (xp: number): Level | null => {
    for (const level of LEVELS) {
        if (xp < level.minXp) {
            return level;
        }
    }
    return null; // Max level
};
