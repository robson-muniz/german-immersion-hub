import { useMemo, useState } from 'react';

export const XP_LEVELS = [
  { name: 'A1 Explorer', minXp: 0 },
  { name: 'A1 Listener', minXp: 350 },
  { name: 'A2 Builder', minXp: 900 },
  { name: 'A2 Navigator', minXp: 1600 },
  { name: 'B1 Communicator', minXp: 2600 },
];

export const useXP = (initialXp = 420) => {
  const [xp, setXp] = useState(initialXp);
  const addXp = (amount: number) => setXp((value) => value + amount);
  const level = useMemo(() => [...XP_LEVELS].reverse().find((item) => xp >= item.minXp) ?? XP_LEVELS[0], [xp]);
  const next = XP_LEVELS.find((item) => item.minXp > xp);
  const progress = next ? Math.min(100, ((xp - level.minXp) / (next.minXp - level.minXp)) * 100) : 100;
  return { xp, addXp, level, next, progress };
};
