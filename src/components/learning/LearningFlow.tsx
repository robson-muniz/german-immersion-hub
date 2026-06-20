import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractiveScene } from './InteractiveScene';
import { PhraseExplorer } from './PhraseExplorer';
import { PictureRecognition } from '../exercises/PictureRecognition';
import { SentenceBuilder } from '../exercises/SentenceBuilder';

// Mock data for the flow
const SCENE_DATA = {
    title: "Peppa's House",
    imageUrl: "",
    hotspots: [
        {
            id: 'h1', x: 20, y: 50, germanWord: 'der Vater', translation: 'the father', 
            examples: ['Das ist mein Vater.', 'Wo ist dein Vater?'], pronunciation: 'FAH-ter'
        },
        {
            id: 'h2', x: 80, y: 60, germanWord: 'das Auto', translation: 'the car', 
            examples: ['Das Auto ist rot.', 'Wir fahren im Auto.'], pronunciation: 'OW-toh'
        }
    ]
};

const PHRASE_DATA = {
    phrase: "Das ist mein Vater",
    englishTranslation: "That is my father",
    tokens: [
        { id: 't1', german: 'Das', english: 'That', type: 'pronoun' as const },
        { id: 't2', german: 'ist', english: 'is', type: 'verb' as const },
        { id: 't3', german: 'mein', english: 'my', type: 'pronoun' as const },
        { id: 't4', german: 'Vater', english: 'father', type: 'noun' as const }
    ]
};

const PIC_RECOGNITION_DATA = {
    germanWord: 'der Vater',
    options: [
        { id: 'o1', imageEmoji: '👨', isCorrect: true },
        { id: 'o2', imageEmoji: '👩', isCorrect: false },
        { id: 'o3', imageEmoji: '🐶', isCorrect: false },
        { id: 'o4', imageEmoji: '🚗', isCorrect: false }
    ]
};

type Step = 'intro' | 'scene' | 'explorer' | 'pic_exercise' | 'sentence_exercise' | 'mastery';

export const LearningFlow = () => {
    const [currentStep, setCurrentStep] = useState<Step>('intro');
    const [progress, setProgress] = useState(0);

    const advanceStep = (nextStep: Step, progAdd: number) => {
        setProgress(p => Math.min(100, p + progAdd));
        setCurrentStep(nextStep);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 'intro':
                return (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                        className="flex flex-col items-center justify-center min-h-[60vh] text-center"
                    >
                        <div className="w-24 h-24 bg-gradient-to-tr from-amber-500 to-orange-400 rounded-3xl shadow-2xl shadow-amber-500/20 mb-8 flex items-center justify-center text-4xl">
                            🎬
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-4">Episode 1: Familie</h1>
                        <p className="text-xl text-slate-400 max-w-md mx-auto mb-10">
                            Let's discover vocabulary directly from the scene. No translations needed.
                        </p>
                        <button 
                            onClick={() => advanceStep('scene', 10)}
                            className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black rounded-2xl font-bold text-lg shadow-[0_0_40px_rgba(245,158,11,0.3)] transition-all active:scale-95"
                        >
                            Start Learning
                        </button>
                    </motion.div>
                );

            case 'scene':
                return (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-white">Explore the Scene</h2>
                            <p className="text-slate-400">Tap the hotspots to discover new words.</p>
                        </div>
                        <InteractiveScene {...SCENE_DATA} />
                        <div className="flex justify-center mt-8">
                            <button 
                                onClick={() => advanceStep('explorer', 20)}
                                className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-bold transition-all"
                            >
                                Continue to Phrase
                            </button>
                        </div>
                    </motion.div>
                );

            case 'explorer':
                return (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-white">Phrase Explorer</h2>
                            <p className="text-slate-400">Break down the phrase we just heard.</p>
                        </div>
                        <PhraseExplorer {...PHRASE_DATA} />
                        <div className="flex justify-center mt-8">
                            <button 
                                onClick={() => advanceStep('pic_exercise', 20)}
                                className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black rounded-xl font-bold transition-all"
                            >
                                Practice Vocabulary
                            </button>
                        </div>
                    </motion.div>
                );

            case 'pic_exercise':
                return (
                    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
                        <PictureRecognition 
                            {...PIC_RECOGNITION_DATA}
                            onComplete={(success) => {
                                if(success) advanceStep('sentence_exercise', 25);
                            }}
                        />
                    </motion.div>
                );

            case 'sentence_exercise':
                return (
                    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
                        <SentenceBuilder 
                            correctSentence="Das ist mein Vater"
                            englishTranslation="That is my father"
                            onComplete={(success) => {
                                if(success) advanceStep('mastery', 25);
                            }}
                        />
                    </motion.div>
                );

            case 'mastery':
                return (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center min-h-[50vh] text-center"
                    >
                        <div className="text-8xl mb-6">🎉</div>
                        <h2 className="text-4xl font-bold text-white mb-4">Lesson Complete!</h2>
                        <p className="text-amber-400 font-medium text-xl mb-8">+50 XP Earned</p>
                        <button 
                            onClick={() => {
                                setCurrentStep('intro');
                                setProgress(0);
                            }}
                            className="px-8 py-4 bg-slate-800 border border-white/10 hover:bg-slate-700 text-white rounded-2xl font-bold text-lg transition-all active:scale-95"
                        >
                            Back to Overview
                        </button>
                    </motion.div>
                );
        }
    };

    return (
        <div className="max-w-4xl mx-auto w-full">
            {/* Progress Bar Header */}
            {currentStep !== 'intro' && currentStep !== 'mastery' && (
                <div className="mb-12 sticky top-24 z-40 bg-slate-950/80 backdrop-blur-xl py-4 -mx-4 px-4 sm:mx-0 sm:px-0">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setCurrentStep('intro')}
                            className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                        >
                            ✕
                        </button>
                        <div className="flex-1 h-3 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                            <motion.div 
                                className="h-full bg-gradient-to-r from-red-600 to-amber-400 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            />
                        </div>
                    </div>
                </div>
            )}

            <AnimatePresence mode="wait">
                {renderStep()}
            </AnimatePresence>
        </div>
    );
};
