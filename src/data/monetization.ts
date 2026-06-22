import { Crown, Lock, Sparkles, TrendingUp, Users, BriefcaseBusiness } from 'lucide-react';

export const pricingPlans = [
  { id: 'free', name: 'Free', price: '€0', cadence: 'forever', cta: 'Start learning', featured: false, features: ['3 daily lessons', '5 AI tutor prompts/day', 'Basic vocabulary tracking', 'Starter immersion library'] },
  { id: 'premium-monthly', name: 'Premium Monthly', price: '€9.99', cadence: 'month', cta: 'Upgrade to Premium', featured: true, features: ['Unlimited AI tutor', 'Unlimited immersion content', 'Personalized roadmap', 'Smart review scheduling', 'Progress analytics', 'Pronunciation coaching'] },
  { id: 'premium-yearly', name: 'Premium Yearly', price: '€99', cadence: 'year', cta: 'Save with yearly', featured: false, features: ['Everything in Premium', 'Two months free', 'Priority content drops', 'Advanced streak insights'] },
  { id: 'lifetime', name: 'Lifetime Access', price: '€249', cadence: 'one time', cta: 'Get lifetime', featured: false, features: ['Permanent Premium access', 'Future roadmap modules', 'Founder badge', 'All future lesson libraries'] },
] as const;

export const premiumBenefits = ['Unlimited AI explanations', 'Conversation practice', 'Premium lesson library', 'Advanced vocabulary vault', 'Pronunciation coaching', 'Study streak insights'];

export const aiTutorModes = [
  { title: 'Explain', copy: 'Select a word, phrase, or sentence for translation, grammar breakdowns, examples, and pronunciation guidance.', prompt: 'Warum sagt man „Ich hätte gern…”?', badge: '5 free/day' },
  { title: 'Practice', copy: 'Speak with an adaptive German partner across beginner, intermediate, and advanced modes.', prompt: 'Reise · Alltag · Arbeit · Kultur', badge: 'Premium unlimited' },
  { title: 'Roleplay', copy: 'Simulate realistic restaurant, airport, hotel, interview, office, and doctor interactions.', prompt: 'Guten Tag, haben Sie reserviert?', badge: 'Premium' },
] as const;

export const immersionLibrary = [
  { type: 'Story', title: 'Ein Morgen in Berlin', level: 'A1', premium: false, minutes: 6 },
  { type: 'Dialogue', title: 'Im Café bestellen', level: 'A1', premium: false, minutes: 4 },
  { type: 'Podcast', title: 'Langsam gesprochen: Arbeit', level: 'B1', premium: true, minutes: 12 },
  { type: 'Article', title: 'Mieten in deutschen Städten', level: 'B2', premium: true, minutes: 9 },
  { type: 'Video', title: 'Wohnung besichtigen', level: 'A2', premium: true, minutes: 8 },
] as const;

export const roadmapLevels = [
  { level: 'A1', progress: 82, skills: ['Introductions', 'Articles', 'Core verbs'], words: 420 },
  { level: 'A2', progress: 46, skills: ['Travel', 'Past tense', 'Directions'], words: 760 },
  { level: 'B1', progress: 18, skills: ['Opinions', 'Workplace', 'Narration'], words: 1180 },
  { level: 'B2', progress: 6, skills: ['Arguments', 'Media', 'Nuance'], words: 1540 },
  { level: 'C1', progress: 0, skills: ['Fluency', 'Academic', 'Professional'], words: 2100 },
] as const;

export const metrics = [
  { label: 'Daily study time', value: '24m' },
  { label: 'Weekly study time', value: '3h 15m' },
  { label: 'Monthly study time', value: '14h' },
  { label: 'Words learned', value: '420' },
  { label: 'Sentences mastered', value: '86' },
  { label: 'Lessons completed', value: '31' },
  { label: 'Speaking sessions', value: '9' },
] as const;

export const vocabularyVault = [
  { german: 'die Besprechung', english: 'meeting', category: 'Work', difficulty: 'B1', example: 'Die Besprechung beginnt um neun Uhr.', notes: 'Feminine noun; plural: die Besprechungen.' },
  { german: 'sich bewerben', english: 'to apply', category: 'Jobs', difficulty: 'B1', example: 'Ich bewerbe mich um die Stelle.', notes: 'Reflexive verb with accusative reflexive pronoun.' },
  { german: 'zuverlässig', english: 'reliable', category: 'Personality', difficulty: 'A2', example: 'Meine Kollegin ist sehr zuverlässig.', notes: 'Adjective often used in professional contexts.' },
] as const;

export const futureModules = [
  { icon: Users, title: 'Community foundation', copy: 'Prepared for study groups, learning circles, boards, weekly challenges, and leaderboards.' },
  { icon: BriefcaseBusiness, title: 'Job preparation', copy: 'Prepared for workplace communication, interviews, meetings, emails, presentations, and simulators.' },
  { icon: TrendingUp, title: 'Stripe-ready growth', copy: 'Plan identifiers support Free, Monthly, Yearly, and Lifetime subscriptions from one config.' },
] as const;

export const schemaBlueprints = ['users', 'subscriptions', 'vocabulary_items', 'lessons', 'progress_events', 'achievements', 'ai_sessions', 'immersion_content', 'roadmaps'] as const;

export const UpgradeIcon = Crown;
export const LockedIcon = Lock;
export const ValueIcon = Sparkles;
