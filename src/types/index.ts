export type LanguageCode = 'de';

export interface Hotspot {
  id: string;
  label: string;
  german: string;
  english: string;
  sentence: string;
  audioFile?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  visual: string;
  related: string[];
}

export interface Scene {
  id: string;
  language: LanguageCode;
  moduleName: string;
  title: string;
  world: string;
  level: string;
  description: string;
  immersionPrompt: string;
  palette: string;
  hotspots: Hotspot[];
}

export interface PhraseToken {
  text: string;
  meaning: string;
  image: string;
  audioFile?: string;
  examples: string[];
  related: string[];
}

export interface PhraseUnit {
  id: string;
  phrase: string;
  meaning: string;
  context: string;
  audioFile?: string;
  tokens: PhraseToken[];
}

export type ExerciseType = 'visual-recognition' | 'audio-recognition' | 'sentence-builder' | 'match-mode' | 'memory-mode';

export interface Exercise {
  id: string;
  type: ExerciseType;
  title: string;
  instruction: string;
  sceneId: string;
  prompt: string;
  answer: string;
  options: string[];
  rewardXp: number;
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
