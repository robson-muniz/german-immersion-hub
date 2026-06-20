'use client';

import { motion } from 'framer-motion';
import { SceneViewer } from '../components/SceneViewer';
import { PhraseExplorer } from '../components/PhraseExplorer';
import { ExerciseEngine } from '../components/ExerciseEngine';
import { ProgressDashboard } from '../components/ProgressDashboard';
import { GamificationHUD } from '../components/GamificationHUD';
import { useScenes } from '../hooks/useScenes';
import { useXP } from '../hooks/useXP';
import { PHRASE_UNITS } from '../data/vocabulary';
import { EXERCISES } from '../data/exercises';

export default function App() {
  const { featuredScene } = useScenes();
  const { xp, addXp, level, progress } = useXP();

  return (
    <main className="min-h-screen overflow-hidden bg-[#111113] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(242,199,107,.16),transparent_34%),radial-gradient(circle_at_80%_12%,rgba(217,92,85,.12),transparent_32%)]" />
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div>
          <p className="text-xl font-semibold tracking-tight">LumaLingua</p>
          <p className="text-xs uppercase tracking-[.28em] text-white/42">LumaLingua German</p>
        </div>
        <div className="hidden gap-6 text-sm text-white/55 md:flex">
          <a href="#scene">Explore</a>
          <a href="#phrases">Phrases</a>
          <a href="#practice">Practice</a>
        </div>
      </nav>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16">
        <motion.header
          className="grid gap-8 py-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <span className="rounded-full border border-[#f2c76b]/25 bg-[#f2c76b]/10 px-4 py-2 text-sm text-[#f2c76b]">
              Premium visual language universe
            </span>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-[-.04em] md:text-7xl">
              Absorb German by exploring living scenes.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/58">
              LumaLingua turns immersion into tactile illustrated worlds. Click objects, hear pronunciation, discover phrases, and build comprehension from context — not vocabulary lists.
            </p>
          </div>
          <GamificationHUD xp={xp} streak={7} level={level.name} progress={progress} />
        </motion.header>

        <section id="scene" className="space-y-5">
          <SceneViewer scene={featuredScene} onDiscover={addXp} />
        </section>

        <div className="mt-8 grid gap-8 xl:grid-cols-[.9fr_1.1fr]">
          <ProgressDashboard />
          <section className="rounded-[2rem] border border-white/10 bg-white/[.04] p-6">
            <p className="text-sm uppercase tracking-[.25em] text-[#f2c76b]">Empty states</p>
            <h2 className="mt-2 text-3xl font-semibold">Your first scene is waiting to be explored.</h2>
            <p className="mt-3 text-white/50">Start watching to unlock your first words. No vocabulary discovered yet — begin immersion.</p>
          </section>
        </div>

        <div id="phrases" className="mt-8">
          <PhraseExplorer phrases={PHRASE_UNITS} />
        </div>

        <div id="practice" className="mt-8">
          <ExerciseEngine exercises={EXERCISES} scene={featuredScene} onReward={addXp} />
        </div>
      </div>
    </main>
  );
}
