'use client';
import { motion } from 'framer-motion';
import { Flame, Gem, Trophy } from 'lucide-react';

export function GamificationHUD({ xp, streak, level, progress }: { xp: number; streak: number; level: string; progress: number }) {
  return <div className="grid gap-3 sm:grid-cols-3"><div className="rounded-3xl border border-white/10 bg-white/[.05] p-4"><Gem className="text-[#f2c76b]"/><p className="mt-3 text-2xl font-semibold">{xp.toLocaleString()} LumaXP</p><p className="text-sm text-white/45">Earned through immersion</p></div><div className="rounded-3xl border border-white/10 bg-white/[.05] p-4"><Trophy className="text-[#d95c55]"/><p className="mt-3 text-2xl font-semibold">{level}</p><div className="mt-3 h-2 rounded-full bg-white/10"><motion.div className="h-full rounded-full bg-[#f2c76b]" initial={{ width: 0 }} animate={{ width: `${progress}%` }} /></div></div><div className="rounded-3xl border border-white/10 bg-white/[.05] p-4"><Flame className="text-[#f2c76b]"/><p className="mt-3 text-2xl font-semibold">{streak} day streak</p><p className="text-sm text-white/45">A quiet daily rhythm</p></div></div>;
}
