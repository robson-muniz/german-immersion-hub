'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, EyeOff } from 'lucide-react';
import { Scene, Hotspot } from '../../types';
import { ObjectHotspot } from '../ObjectHotspot';
import { useAudio } from '../../hooks/useAudio';

export function SceneViewer({ scene, onDiscover }: { scene: Scene; onDiscover?: (xp: number) => void }) {
  const [active, setActive] = useState<Hotspot>(scene.hotspots[0]);
  const [showMeaning, setShowMeaning] = useState(false);
  const { play } = useAudio();

  const selectHotspot = (hotspot: Hotspot) => {
    setActive(hotspot);
    play(hotspot.audioFile);
    onDiscover?.(10);
  };

  return (
    <section className="grid gap-6 lg:grid-cols-[1.45fr_.85fr]">
      <motion.div className={`relative min-h-[470px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br ${scene.palette} shadow-2xl`} initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .7, ease: 'easeOut' }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_20%,rgba(242,199,107,.20),transparent_28%),radial-gradient(circle_at_72%_62%,rgba(217,92,85,.20),transparent_26%)]" />
        <div className="absolute inset-x-12 top-20 h-36 rounded-[2rem] bg-[#221b17] shadow-[inset_0_0_0_1px_rgba(255,255,255,.08)]" />
        <div className="absolute left-[42%] top-[18%] h-28 w-20 rounded-t-full bg-[#3b2b20]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#1d2a1c] to-transparent" />
        <div className="absolute bottom-16 left-16 text-7xl">👨</div><div className="absolute bottom-20 right-24 text-8xl">🚗</div><div className="absolute left-[43%] top-[19%] text-8xl">🏡</div><div className="absolute bottom-24 left-[45%] text-6xl">🌼</div>
        {scene.hotspots.map((hotspot) => <ObjectHotspot key={hotspot.id} hotspot={hotspot} active={active.id === hotspot.id} onSelect={selectHotspot} />)}
        <div className="absolute left-6 top-6 max-w-sm rounded-3xl border border-white/10 bg-[#111113]/55 p-5 backdrop-blur-xl"><p className="text-xs uppercase tracking-[.28em] text-[#f2c76b]">{scene.moduleName}</p><h2 className="mt-2 text-3xl font-semibold text-white">{scene.title}</h2><p className="mt-2 text-sm text-white/62">{scene.immersionPrompt}</p></div>
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.aside key={active.id} className="rounded-[2rem] border border-white/10 bg-white/[.055] p-6 shadow-2xl backdrop-blur-xl" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
          <div className="text-5xl">{active.visual}</div><p className="mt-6 text-sm uppercase tracking-[.24em] text-[#d95c55]">Discovered object</p><h3 className="mt-2 text-4xl font-semibold text-white">{active.german}</h3>
          <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#f2c76b] px-4 py-2 text-sm font-semibold text-[#111113]" onClick={() => play(active.audioFile)}><Volume2 size={16} /> Repeat pronunciation</button>
          <div className="mt-6 rounded-2xl bg-black/20 p-4"><p className="text-white/70">{active.sentence}</p>{showMeaning ? <p className="mt-2 text-sm text-white/45">{active.english}</p> : <button onClick={() => setShowMeaning(true)} className="mt-3 inline-flex items-center gap-2 text-sm text-white/45 hover:text-white"><EyeOff size={14}/> Reveal meaning gently</button>}</div>
          <div className="mt-5 flex flex-wrap gap-2">{active.related.map((word) => <span key={word} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/55">{word}</span>)}</div>
        </motion.aside>
      </AnimatePresence>
    </section>
  );
}
