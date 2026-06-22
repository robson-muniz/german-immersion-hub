'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, BookOpen, Check, Lock, MessageCircle, Mic, Sparkles, Volume2 } from 'lucide-react';
import { SceneViewer } from '../components/SceneViewer';
import { PhraseExplorer } from '../components/PhraseExplorer';
import { ExerciseEngine } from '../components/ExerciseEngine';
import { GamificationHUD } from '../components/GamificationHUD';
import { useScenes } from '../hooks/useScenes';
import { useXP } from '../hooks/useXP';
import { PHRASE_UNITS } from '../data/vocabulary';
import { EXERCISES } from '../data/exercises';
import { aiTutorModes, futureModules, immersionLibrary, metrics, premiumBenefits, pricingPlans, roadmapLevels, schemaBlueprints, vocabularyVault } from '../data/monetization';

const card = 'rounded-[2rem] border border-white/10 bg-white/[.045] p-6 shadow-2xl shadow-black/10';

function PremiumPill({ children = 'Premium' }: { children?: string }) {
  return <span className="inline-flex items-center gap-1 rounded-full border border-[#f2c76b]/30 bg-[#f2c76b]/10 px-3 py-1 text-xs font-medium text-[#f2c76b]"><Lock size={12} />{children}</span>;
}

function SectionHeader({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <div className="mb-6 flex flex-wrap items-end justify-between gap-5"><div><p className="text-sm uppercase tracking-[.25em] text-[#f2c76b]">{eyebrow}</p><h2 className="mt-2 max-w-3xl text-3xl font-semibold tracking-[-.03em] md:text-5xl">{title}</h2></div><p className="max-w-xl text-sm leading-6 text-white/52 md:text-base">{copy}</p></div>;
}

export default function App() {
  const { featuredScene } = useScenes();
  const { xp, addXp, level, progress } = useXP();

  return (
    <main className="min-h-screen overflow-hidden bg-[#111113] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(242,199,107,.16),transparent_34%),radial-gradient(circle_at_80%_12%,rgba(217,92,85,.12),transparent_32%)]" />
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div><p className="text-xl font-semibold tracking-tight">LumaLingua</p><p className="text-xs uppercase tracking-[.28em] text-white/42">AI German fluency platform</p></div>
        <div className="hidden gap-6 text-sm text-white/55 lg:flex"><a href="#ai-tutor">AI Tutor</a><a href="#immersion">Immersion</a><a href="#roadmap">Roadmap</a><a href="#pricing">Pricing</a></div>
        <a href="#pricing" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#111113]">Upgrade</a>
      </nav>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16">
        <motion.header className="grid gap-8 py-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div><span className="rounded-full border border-[#f2c76b]/25 bg-[#f2c76b]/10 px-4 py-2 text-sm text-[#f2c76b]">Freemium SaaS for immersive German acquisition</span><h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-[-.05em] md:text-7xl">Build real German confidence with AI, immersion, and smart progress.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-white/58">LumaLingua now combines interactive scenes, an AI tutor, premium content, vocabulary intelligence, and conversion-aware upgrade moments that appear only after learners feel value.</p><div className="mt-7 flex flex-wrap gap-3"><a href="#immersion" className="inline-flex items-center gap-2 rounded-full bg-[#f2c76b] px-5 py-3 font-semibold text-[#111113]">Start immersion <ArrowRight size={17} /></a><a href="#ai-tutor" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-white/75">Try AI Tutor <Sparkles size={17} /></a></div></div>
          <GamificationHUD xp={xp} streak={7} level={level.name} progress={progress} />
        </motion.header>

        <section className="mb-8 rounded-[2rem] border border-[#f2c76b]/20 bg-[#f2c76b]/10 p-5"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="font-semibold text-[#f2c76b]">Natural milestone prompt</p><p className="text-sm text-white/60">You completed your first lesson. Premium unlocks your personal AI tutor and unlimited explanations when you are ready.</p></div><button className="rounded-full border border-[#f2c76b]/30 px-4 py-2 text-sm text-[#f2c76b]">Preview Premium</button></div></section>

        <section id="immersion" className="space-y-5"><SectionHeader eyebrow="Core immersion system" title="Click, listen, save, and ask AI from context." copy="The scene remains useful for free learners while premium affordances clearly preview unlimited explanations, pronunciation, and content depth." /><SceneViewer scene={featuredScene} onDiscover={addXp} /></section>

        <section className="mt-8 grid gap-4 md:grid-cols-5">{immersionLibrary.map((item) => <div key={item.title} className="rounded-3xl border border-white/10 bg-white/[.04] p-5"><div className="mb-4 flex items-center justify-between"><span className="text-sm text-white/45">{item.type}</span>{item.premium && <PremiumPill />}</div><h3 className="font-semibold">{item.title}</h3><p className="mt-2 text-sm text-white/45">{item.level} · {item.minutes} min · click any word for translation, grammar, audio, and AI context.</p></div>)}</section>

        <div id="ai-tutor" className="mt-10"><SectionHeader eyebrow="AI Tutor" title="Explain, practice, and roleplay without breaking flow." copy="Free users get a meaningful daily sample. Premium removes limits for unlimited guidance, conversation, and realistic scenarios." /><div className="grid gap-5 lg:grid-cols-3">{aiTutorModes.map((mode, index) => <div key={mode.title} className={card}><div className="mb-5 flex items-center justify-between"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#d95c55]/15 text-[#d95c55]">{index === 0 ? <BookOpen /> : index === 1 ? <MessageCircle /> : <Mic />}</div><PremiumPill>{mode.badge}</PremiumPill></div><h3 className="text-2xl font-semibold">{mode.title}</h3><p className="mt-3 text-sm leading-6 text-white/55">{mode.copy}</p><div className="mt-5 rounded-2xl bg-black/25 p-4 text-sm text-white/70">{mode.prompt}</div></div>)}</div></div>

        <div className="mt-8 grid gap-8 xl:grid-cols-[.9fr_1.1fr]"><section id="roadmap" className={card}><SectionHeader eyebrow="Learning roadmap" title="A1 to C1 progression" copy="A premium roadmap clarifies the next best skill, weekly goals, vocabulary growth, and level confidence." />{roadmapLevels.map((level) => <div key={level.level} className="mb-4"><div className="mb-2 flex justify-between text-sm"><span className="font-semibold">{level.level}</span><span className="text-white/45">{level.progress}% · {level.words} words</span></div><div className="h-3 rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-[#f2c76b] to-[#d95c55]" style={{ width: `${level.progress}%` }} /></div><p className="mt-2 text-xs text-white/42">{level.skills.join(' · ')}</p></div>)}</section><section className={card}><SectionHeader eyebrow="Analytics dashboard" title="Retention metrics learners understand" copy="Study time, streak quality, and milestones make daily progress visible without noisy gamification." /><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{metrics.map((metric) => <div key={metric.label} className="rounded-2xl bg-black/20 p-4"><BarChart3 className="mb-3 text-[#f2c76b]" size={20}/><p className="text-2xl font-semibold">{metric.value}</p><p className="text-sm text-white/45">{metric.label}</p></div>)}</div><div className="mt-5 rounded-2xl border border-[#d95c55]/25 bg-[#d95c55]/10 p-4"><p className="font-semibold text-[#f2c76b]">7-day streak milestone</p><p className="text-sm text-white/55">Keep the momentum going with personalized learning plans and smart review scheduling.</p></div></section></div>

        <div className="mt-8"><PhraseExplorer phrases={PHRASE_UNITS} /></div>
        <div className="mt-8"><ExerciseEngine exercises={EXERCISES} scene={featuredScene} onReward={addXp} /></div>

        <section className="mt-10"><SectionHeader eyebrow="Vocabulary vault" title="Saved words become a smart review queue." copy="Premium vocabulary tracking groups words by category, difficulty, example sentence, audio, grammar notes, and spaced repetition priority." /><div className="grid gap-4 lg:grid-cols-3">{vocabularyVault.map((word) => <div key={word.german} className={card}><div className="flex items-center justify-between"><PremiumPill>Smart review</PremiumPill><Volume2 size={18} className="text-white/45" /></div><h3 className="mt-5 text-2xl font-semibold">{word.german}</h3><p className="text-white/55">{word.english}</p><p className="mt-4 text-sm text-white/70">{word.example}</p><p className="mt-3 text-xs text-white/42">{word.category} · {word.difficulty} · {word.notes}</p></div>)}</div></section>

        <section id="pricing" className="mt-10"><SectionHeader eyebrow="Pricing architecture" title="Freemium now has clear recurring revenue paths." copy="Plans are centrally configurable and include Free, Premium Monthly, Premium Yearly, and Lifetime support for future Stripe integration." /><div className="grid gap-4 lg:grid-cols-4">{pricingPlans.map((plan) => <div key={plan.id} className={`rounded-[2rem] border p-6 ${plan.featured ? 'border-[#f2c76b]/40 bg-[#f2c76b]/10' : 'border-white/10 bg-white/[.04]'}`}><p className="text-sm text-white/50">{plan.name}</p><p className="mt-3 text-4xl font-semibold">{plan.price}</p><p className="text-sm text-white/45">/{plan.cadence}</p><button className={`mt-5 w-full rounded-full px-4 py-3 text-sm font-semibold ${plan.featured ? 'bg-[#f2c76b] text-[#111113]' : 'border border-white/10 text-white/75'}`}>{plan.cta}</button><div className="mt-5 space-y-3">{plan.features.map((feature) => <p key={feature} className="flex gap-2 text-sm text-white/58"><Check size={16} className="text-[#f2c76b]" />{feature}</p>)}</div></div>)}</div><div className="mt-6 flex flex-wrap gap-2">{premiumBenefits.map((benefit) => <span key={benefit} className="rounded-full border border-white/10 px-3 py-2 text-sm text-white/55">{benefit}</span>)}</div></section>

        <section className="mt-10 grid gap-5 lg:grid-cols-3">{futureModules.map(({ icon: Icon, title, copy }) => <div key={title} className={card}><Icon className="text-[#d95c55]" /><h3 className="mt-4 text-xl font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-white/52">{copy}</p></div>)}</section>
        <section className="mt-8 rounded-[2rem] border border-white/10 bg-black/20 p-6"><p className="text-sm uppercase tracking-[.25em] text-[#f2c76b]">Database preparation</p><p className="mt-3 text-white/60">Schema blueprint prepared for: {schemaBlueprints.join(', ')}.</p></section>
      </div>
    </main>
  );
}
