import { Exercise } from '../types';

export const EXERCISES: Exercise[] = [
  { id: 'find-vater', type: 'visual-recognition', title: 'Visual Recognition', instruction: 'Hear the word, then choose the object in the scene.', sceneId: 'family-garden', prompt: 'der Vater', answer: 'vater', options: ['vater', 'auto', 'haus'], rewardXp: 30 },
  { id: 'hear-auto', type: 'audio-recognition', title: 'Audio Recognition', instruction: 'Listen and select the matching visual.', sceneId: 'family-garden', prompt: 'das Auto', answer: 'auto', options: ['auto', 'blume', 'haus'], rewardXp: 25 },
  { id: 'build-vater', type: 'sentence-builder', title: 'Sentence Builder', instruction: 'Arrange the words into a natural German sentence.', sceneId: 'family-garden', prompt: 'This is my father.', answer: 'Das ist mein Vater', options: ['Vater', 'mein', 'ist', 'Das'], rewardXp: 40 },
  { id: 'match-scene', type: 'match-mode', title: 'Match Mode', instruction: 'Connect the word to its scene reference.', sceneId: 'family-garden', prompt: 'die Blume', answer: 'blume', options: ['vater', 'auto', 'blume'], rewardXp: 25 },
  { id: 'memory-family', type: 'memory-mode', title: 'Memory Mode', instruction: 'Reveal pairs and keep the scene language active.', sceneId: 'family-garden', prompt: 'der Vater', answer: 'vater', options: ['vater', 'haus', 'auto'], rewardXp: 35 },
];
