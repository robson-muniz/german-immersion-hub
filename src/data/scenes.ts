import { Scene } from '../types';

export const SCENES: Scene[] = [
  {
    id: 'family-garden',
    language: 'de',
    moduleName: 'LumaLingua German',
    title: 'The Garden Visit',
    world: 'Family & Home',
    level: 'A1 Explorer',
    description: 'A quiet illustrated garden scene for discovering family words, everyday objects, and short contextual phrases.',
    immersionPrompt: 'Listen first. Then explore the glowing details and let meaning emerge from the scene.',
    palette: 'from-[#29201a] via-[#161517] to-[#111113]',
    hotspots: [
      { id: 'vater', label: 'Father', german: 'der Vater', english: 'the father', sentence: 'Das ist mein Vater.', audioFile: '/sounds/vater.mp3', x: 18, y: 34, width: 17, height: 32, visual: '👨', related: ['die Familie', 'mein', 'zu Hause'] },
      { id: 'auto', label: 'Car', german: 'das Auto', english: 'the car', sentence: 'Das Auto ist rot.', audioFile: '/sounds/das_auto.mp3', x: 61, y: 56, width: 25, height: 20, visual: '🚗', related: ['rot', 'fahren', 'warten'] },
      { id: 'haus', label: 'House', german: 'das Haus', english: 'the house', sentence: 'Das Haus ist warm.', audioFile: '/sounds/das.mp3', x: 38, y: 18, width: 24, height: 30, visual: '🏡', related: ['die Tür', 'das Fenster', 'zu Hause'] },
      { id: 'blume', label: 'Flower', german: 'die Blume', english: 'the flower', sentence: 'Guck mal, die Blume!', audioFile: '/sounds/guck_mal.mp3', x: 42, y: 68, width: 13, height: 17, visual: '🌼', related: ['der Garten', 'gelb', 'schön'] },
    ],
  },
];

export const getSceneById = (sceneId: string) => SCENES.find((scene) => scene.id === sceneId) ?? SCENES[0];
