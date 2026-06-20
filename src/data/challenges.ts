import { Challenge } from '../types';

export const INITIAL_CHALLENGES: Challenge[] = [
    { id: "ch1", task: "Hear the word 'springen' in Peppa Wutz", points: 15, difficulty: 'Leicht', category: 'Hören' },
    { id: "ch2", task: "Catch the phrase 'Au weia!' during a mishap", points: 20, difficulty: 'Leicht', category: 'Verstehen' },
    { id: "ch3", task: "Watch a full 10-minute 'Sachgeschichte' on Die Maus", points: 25, difficulty: 'Mittel', category: 'Sehen' },
    { id: "ch4", task: "Identify three colors described in Sesamstraße", points: 15, difficulty: 'Leicht', category: 'Verstehen' },
    { id: "ch5", task: "Hear someone say 'Warte mal!' to pause action", points: 20, difficulty: 'Mittel', category: 'Hören' }
];
