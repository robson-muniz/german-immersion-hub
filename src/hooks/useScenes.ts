import { useMemo } from 'react';
import { SCENES } from '../data/scenes';

export const useScenes = () => useMemo(() => ({ scenes: SCENES, featuredScene: SCENES[0] }), []);
