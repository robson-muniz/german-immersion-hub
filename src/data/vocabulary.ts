import { PhraseUnit } from '../types';

export const PHRASE_UNITS: PhraseUnit[] = [
  {
    id: 'das-ist-mein-vater',
    phrase: 'Das ist mein Vater',
    meaning: 'This is my father',
    context: 'Family introduction inside a scene',
    audioFile: '/sounds/das_ist_mein_vater.mp3',
    tokens: [
      { text: 'Das', meaning: 'this / that', image: '✨', audioFile: '/sounds/das.mp3', examples: ['Das ist rot.', 'Das ist warm.'], related: ['dieses', 'hier'] },
      { text: 'ist', meaning: 'is', image: '〰️', audioFile: '/sounds/ist.mp3', examples: ['Er ist hier.', 'Das ist gut.'], related: ['sein', 'bin'] },
      { text: 'mein', meaning: 'my', image: '🤲', audioFile: '/sounds/mein.mp3', examples: ['Mein Haus.', 'Mein Auto.'], related: ['dein', 'meine'] },
      { text: 'Vater', meaning: 'father', image: '👨', audioFile: '/sounds/vater.mp3', examples: ['Der Vater wartet.', 'Mein Vater ist hier.'], related: ['Familie', 'Mutter'] },
    ],
  },
  {
    id: 'warte-mal',
    phrase: 'Warte mal',
    meaning: 'Wait a moment',
    context: 'A gentle pause cue before something happens',
    audioFile: '/sounds/warte_mal.mp3',
    tokens: [
      { text: 'Warte', meaning: 'wait', image: '✋', audioFile: '/sounds/warte_mal.mp3', examples: ['Warte mal hier.'], related: ['halten', 'Pause'] },
      { text: 'mal', meaning: 'a moment / just', image: '⏱️', examples: ['Guck mal!', 'Hör mal.'], related: ['kurz', 'jetzt'] },
    ],
  },
];
