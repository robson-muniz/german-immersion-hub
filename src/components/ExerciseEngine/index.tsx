'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Volume2 } from 'lucide-react';
import { Exercise, Scene } from '../../types';
import { useAudio } from '../../hooks/useAudio';

export function ExerciseEngine({ exercises, scene, onReward }: { exercises: Exercise[]; scene: Scene; onReward: (xp: number) => void }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [solved, setSolved] = useState<string[]>([]);
  const { playSuccess } = useAudio();
  const exercise = exercises[index];
  const options = useMemo(() => exercise.options.map((id) => scene.hotspots.find((h) => h.id === id)).filter(Boolean), [exercise, scene]);

  const choose = (id: string) => {
    setSelected(id);
    if (id === exercise.answer && !solved.includes(exercise.id)) {
      setSolved([...solved, exercise.id]);
      onReward(exercise.rewardXp);
      playSuccess();
    }
  };

  return (
    <section className="rounded-[2rem] border border-white/10 bg-[#151517] p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[.25em] text-[#d95c55]">Practice studio</p>
          <h2 className="mt-2 text-3xl font-semibold">{exercise.title}</h2>
          <p className="mt-1 text-white/50">{exercise.instruction}</p>
        </div>
        <span className="rounded-full bg-[#f2c76b]/15 px-4 py-2 text-sm text-[#f2c76b]">+{exercise.rewardXp} LumaXP</span>
      </div>

      <div className="mt-6 rounded-3xl bg-black/20 p-5">
        <button className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-white/70">
          <Volume2 size={16} /> {exercise.prompt}
        </button>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {options.map((option) => option && (
            <motion.button
              key={option.id}
              onClick={() => choose(option.id)}
              className={`rounded-3xl border p-5 text-left ${selected === option.id ? option.id === exercise.answer ? 'border-[#f2c76b] bg-[#f2c76b]/12' : 'border-[#d95c55] bg-[#d95c55]/12' : 'border-white/10 bg-white/[.04]'}`}
              whileHover={{ y: -3 }}
            >
              <div className="text-5xl">{option.visual}</div>
              <p className="mt-3 font-semibold">{option.german}</p>
            </motion.button>
          ))}
        </div>
        {selected === exercise.answer && <p className="mt-4 flex items-center gap-2 text-[#f2c76b]"><Check size={18} /> Soft success — the scene is becoming familiar.</p>}
      </div>

      <div className="mt-5 flex gap-2">
        {exercises.map((item, i) => (
          <button key={item.id} onClick={() => { setIndex(i); setSelected(null); }} className={`h-2 flex-1 rounded-full ${i === index ? 'bg-[#f2c76b]' : solved.includes(item.id) ? 'bg-[#f2c76b]/50' : 'bg-white/10'}`} />
        ))}
      </div>
      <button onClick={() => { setIndex((index + 1) % exercises.length); setSelected(null); }} className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#111113]">
        <Sparkles size={16} /> Continue practice
      </button>
    </section>
  );
}
