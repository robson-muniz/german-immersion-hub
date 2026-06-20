'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
    Tv,
    Flame,
    Clock,
    Search,
    Award,
    Volume2,
    Info,
    X,
    Sparkles,
    BookOpen,
    RotateCcw,
    CheckCircle2,
    ChevronRight,
    Play,
    Plus,
    Heart,
    TrendingUp,
    SlidersHorizontal
} from 'lucide-react';

const SHOWS_DB = [
    {
        id: "peppa",
        title: "Peppa Wutz",
        englishTitle: "Peppa Pig",
        level: "A1",
        tier: "Absolute Beginner",
        description: "The gold standard of beginner comprehensible input. Peppa and her family describe every physical action explicitly as they perform them.",
        keyBenefits: "Slow speech patterns, intense visual reinforcement, short 5-minute segments.",
        recommendations: "Watch 'Der Spielplatz' (The Playground) or 'Schlammige Pfützen' (Muddy Puddles). Listen to how they use 'springen' (to jump) and 'Matschpfütze' (muddy puddle) on repeat.",
        whereToWatch: "Official YouTube Channel (Peppa Wutz Deutsch), Netflix, ZDFtivi",
        youtubeSearch: "Peppa+Wutz+Deutsch"
    },
    {
        id: "sesamstrasse",
        title: "Sesamstraße",
        englishTitle: "Sesame Street",
        level: "A1",
        tier: "Absolute Beginner",
        description: "A highly interactive German adaptation featuring puppets and human actors exploring fundamental objects, shapes, and numbers.",
        keyBenefits: "Excellent phonetics training. Puppets move their mouths clearly. Broad repetition of basic everyday words.",
        recommendations: "Look for episodes focusing on colors (Farben) or basic greeting routines. High value for listening to simple dialogues.",
        whereToWatch: "ZDF / KiKa official websites and media library (Mediathek)",
        youtubeSearch: "Sesamstrasse+Folgen"
    },
    {
        id: "bob",
        title: "Bob der Baumeister",
        englishTitle: "Bob the Builder",
        level: "A2",
        tier: "Advanced Beginner",
        description: "Features construction tasks and team planning dialogues. Slightly faster pacing but utilizes identical vocabulary sets repeatedly.",
        keyBenefits: "Introduces task-oriented action verbs, spatial prepositions, and standard tools.",
        recommendations: "The classic catchphrase is: 'Können wir das schaffen? Ja, wir schaffen das!' (Can we do it? Yes, we can!). Perfect phrase to understand the helper verb 'schaffen'.",
        whereToWatch: "YouTube, Super RTL, Netflix",
        youtubeSearch: "Bob+der+Baumeister+Deutsch"
    },
    {
        id: "maus",
        title: "Die Sendung mit der Maus",
        englishTitle: "The Show with the Mouse",
        level: "A2",
        tier: "Advanced Beginner",
        description: "One of the most famous educational German TV shows ever made. Features structured scientific segments explaining how things are built.",
        keyBenefits: "Narrators explain complicated manufacturing processes using highly simplified, slow German, alongside step-by-step close-up video.",
        recommendations: "The 'Sachgeschichten' (factual stories) segments. Watch how they make something simple like crayons or plastic bottles.",
        whereToWatch: "WDR Mediathek App, official website (wdrmaus.de), ARD Mediathek",
        youtubeSearch: "Sachgeschichten+mit+der+Maus"
    },
    {
        id: "loewenzahn",
        title: "Löwenzahn",
        englishTitle: "Dandelion",
        level: "A2",
        tier: "Advanced Beginner",
        description: "A legendary live-action exploration show. A charismatic host explains nature, mechanics, and science directly to the camera.",
        keyBenefits: "Clear standard German (Hochdeutsch) with a friendly, highly expressive host who addresses the audience like a peer.",
        recommendations: "Any episode about animals, forest exploration, or simple physics. The visual support is always pristine and engaging.",
        whereToWatch: "ZDFtivi, YouTube, KiKa App",
        youtubeSearch: "Loewenzahn+Klassiker"
    },
    {
        id: "logo",
        title: "Logo! Kinder-Nachrichten",
        englishTitle: "Logo! News for Kids",
        level: "B1",
        tier: "Intermediate Anchor",
        description: "Daily actual news reported in a simplified format with animated infographics and slower, clearer pacing than adult news broadcasts.",
        keyBenefits: "Essential bridge from kids' fantasy language to real-world political, social, and cultural German vocabulary.",
        recommendations: "Watch the daily 10-minute broadcast. It helps you grasp current events in German without getting overwhelmed by abstract terminology.",
        whereToWatch: "ZDFtivi official website, KiKa, ZDF Mediathek",
        youtubeSearch: "logo+Kindernachrichten"
    }
];

const PHRASES_DB = [
    { phrase: "Guck mal! / Schau mal!", meaning: "Look! / Check this out!", context: "Used constantly when a character is trying to capture another's attention.", soundLike: "Gook mahl / Show mahl" },
    { phrase: "Au weia!", meaning: "Oh dear! / Uh oh!", context: "Said immediately after a minor accident, falling down, or spilling juice.", soundLike: "Ow wy-ah" },
    { phrase: "Das macht Spaß!", meaning: "That is fun!", context: "Accompanies smiles, laughter, playing with a toy, or jumping around.", soundLike: "Dahs mahcht Shpahss" },
    { phrase: "Warte mal!", meaning: "Hold on! / Wait a minute!", context: "Used when stopping someone from running off or making a move too quickly.", soundLike: "Vahr-teh mahl" },
    { phrase: "Alles klar?", meaning: "All good? / Understood?", context: "Check-in statement to confirm comprehension or agreement.", soundLike: "Ah-less klahr" },
    { phrase: "Keine Sorge!", meaning: "Don't worry!", context: "Comforting phrase said after a mistake or spill.", soundLike: "Ky-neh zor-geh" }
];

const INITIAL_CHALLENGES = [
    { id: "ch1", task: "Hear the word 'springen' in Peppa Wutz", points: 15, completed: false },
    { id: "ch2", task: "Catch the phrase 'Au weia!' during a mishap", points: 20, completed: false },
    { id: "ch3", task: "Watch a full 10-minute 'Sachgeschichte' on Die Maus", points: 25, completed: false },
    { id: "ch4", task: "Identify three colors described in Sesamstraße", points: 15, completed: false },
    { id: "ch5", task: "Hear someone say 'Warte mal!' to pause action", points: 20, completed: false }
];

export default function App() {
    // State variables
    const [shows, setShows] = useState(SHOWS_DB);
    const [selectedShow, setSelectedShow] = useState(null);
    const [filterLevel, setFilterLevel] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [customMins, setCustomMins] = useState('');
    const [selectedLogShow, setSelectedLogShow] = useState('Peppa Wutz');
    const [toastMessage, setToastMessage] = useState(null);
    const [activeTab, setActiveTab] = useState('shows'); // 'shows' | 'phrases' | 'challenges'

    // Progress metrics state
    const [trackerData, setTrackerData] = useState({
        totalMinutes: 0,
        streak: 0,
        lastLoggedDate: null,
        weeklyMinutes: 0,
        loggedDays: { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 }
    });

    // Active Listening Challenges State
    const [challenges, setChallenges] = useState(INITIAL_CHALLENGES);
    const [scoreXP, setScoreXP] = useState(0);

    useEffect(() => {
        // Load progress data
        const savedData = localStorage.getItem('german_immersion_next_data');
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                // Verify if it's a new week and reset weekly tracking if necessary
                if (parsed.lastLoggedDate) {
                    const lastLog = new Date(parsed.lastLoggedDate);
                    const today = new Date();
                    const oneWeek = 7 * 24 * 60 * 60 * 1000;
                    if (today - lastLog > oneWeek) {
                        parsed.weeklyMinutes = 0;
                        parsed.loggedDays = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
                    }
                }
                setTrackerData(parsed);
            } catch (e) {
                console.error("Error loading local data", e);
            }
        }

        // Load XP state
        const savedXP = localStorage.getItem('german_immersion_xp');
        if (savedXP) {
            setScoreXP(parseInt(savedXP) || 0);
        }

        // Load Challenge list
        const savedChallenges = localStorage.getItem('german_immersion_challenges');
        if (savedChallenges) {
            try {
                setChallenges(JSON.parse(savedChallenges));
            } catch (e) {
                console.error("Error loading challenges", e);
            }
        }
    }, []);

    const saveTracker = (newData) => {
        setTrackerData(newData);
        localStorage.setItem('german_immersion_next_data', JSON.stringify(newData));
    };

    const saveXP = (newXP) => {
        setScoreXP(newXP);
        localStorage.setItem('german_immersion_xp', newXP.toString());
    };

    const saveChallenges = (newChallenges) => {
        setChallenges(newChallenges);
        localStorage.setItem('german_immersion_challenges', JSON.stringify(newChallenges));
    };

    const triggerToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => {
            setToastMessage(null);
        }, 4500);
    };

    const handleLogSubmit = (e) => {
        e.preventDefault();
        const mins = parseInt(customMins);
        if (!mins || mins <= 0 || mins > 480) {
            triggerToast("Bitte geben Sie eine gültige Minutenzahl ein (1 - 480).");
            return;
        }

        const updatedData = { ...trackerData };
        updatedData.totalMinutes += mins;
        updatedData.weeklyMinutes += mins;

        // Map day of the week
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const todayIndex = new Date().getDay();
        const currentDayName = days[todayIndex];

        // Fallback if Sunday is tracked outside Mon-Sat array representation
        const dayKey = currentDayName === "Sun" ? "Sun" : currentDayName;
        updatedData.loggedDays[dayKey] = (updatedData.loggedDays[dayKey] || 0) + mins;

        // Handle Streaks
        const todayStr = new Date().toDateString();
        if (updatedData.lastLoggedDate) {
            const lastDate = new Date(updatedData.lastLoggedDate);
            const diffTime = Math.abs(new Date(todayStr) - lastDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                updatedData.streak += 1;
            } else if (diffDays > 1) {
                updatedData.streak = 1; // Reset broke streak
            }
        } else {
            updatedData.streak = 1; // First day log
        }

        updatedData.lastLoggedDate = todayStr;
        saveTracker(updatedData);
        saveXP(scoreXP + Math.round(mins / 2)); // Earn 1 XP per 2 minutes watched
        setCustomMins('');

        triggerToast(`Erfolg! Added ${mins} minutes to ${selectedLogShow}. Earned +${Math.round(mins / 2)} XP!`);
    };

    const handleChallengeToggle = (id) => {
        const updated = challenges.map(ch => {
            if (ch.id === id) {
                const nextState = !ch.completed;
                if (nextState) {
                    saveXP(scoreXP + ch.points);
                    triggerToast(`Hervorragend! Completed task: "${ch.task}" (+${ch.points} XP)`);
                } else {
                    saveXP(Math.max(0, scoreXP - ch.points));
                }
                return { ...ch, completed: nextState };
            }
            return ch;
        });
        saveChallenges(updated);
    };

    const handleResetProgress = () => {
        const fresh = {
            totalMinutes: 0,
            streak: 0,
            lastLoggedDate: null,
            weeklyMinutes: 0,
            loggedDays: { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 }
        };
        saveTracker(fresh);
        saveXP(0);
        saveChallenges(INITIAL_CHALLENGES);
        triggerToast("Your immersion logs, XP, and challenges have been reset successfully.");
    };

    const filteredShows = useMemo(() => {
        return shows.filter(show => {
            const matchesLevel = filterLevel === 'All' || show.level === filterLevel;
            const matchesSearch = show.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                show.englishTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                show.description.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesLevel && matchesSearch;
        });
    }, [shows, filterLevel, searchTerm]);

    // Compute stats
    const weeklyGoalPercent = Math.min(Math.round((trackerData.weeklyMinutes / 150) * 100), 100);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/20 via-slate-950 to-slate-950 flex flex-col justify-between selection:bg-indigo-500/30 selection:text-white">

            {/* Toast Notification */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 bg-slate-900 border border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.2)] text-indigo-200 text-sm py-3 px-5 rounded-xl z-50 flex items-center gap-3 animate-bounce transition-all">
                    <Sparkles className="h-5 w-5 text-indigo-400 animate-pulse" />
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Main Container */}
            <div className="container mx-auto px-4 py-8 max-w-6xl flex-grow">

                {/* PREMIUM HEADER */}
                <header className="mb-10 flex flex-col lg:flex-row lg:items-center lg:justify-between border-b border-slate-900 pb-8 gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase bg-indigo-950/50 px-3 py-1.5 rounded-full border border-indigo-900/60 flex items-center gap-1.5">
                                <Award className="h-3.5 w-3.5 text-indigo-400" /> Active Comprehensible Input Tracker
                            </span>
                            <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase bg-amber-950/50 px-3 py-1.5 rounded-full border border-amber-900/60 flex items-center gap-1.5">
                                <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" /> {scoreXP} XP
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-1 text-white">
                            German TV <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-500">Immersion Hub</span>
                        </h1>
                        <p className="text-slate-400 mt-2 max-w-2xl text-sm leading-relaxed">
                            Ditch artificial vocabulary drills. Build natural fluency by watching curated, visual children's programs, monitoring your daily inputs, and tracking high-repetition contextual language.
                        </p>
                    </div>

                    {/* Dashboard HUD statistics panel */}
                    <div className="flex gap-4 sm:gap-6 bg-slate-900/40 border border-slate-900 p-5 rounded-2xl shadow-2xl backdrop-blur-md self-start lg:self-auto w-full lg:w-auto justify-around">
                        <div className="text-center px-2">
                            <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-widest mb-1">Weekly Goal</span>
                            <div className="flex items-center justify-center gap-1.5">
                                <TrendingUp className="h-4 w-4 text-cyan-400" />
                                <span className="text-xl font-bold text-white">{weeklyGoalPercent}%</span>
                            </div>
                            <span className="text-[10px] text-slate-500 block mt-0.5">{trackerData.weeklyMinutes} / 150 min</span>
                        </div>
                        <div className="border-r border-slate-900"></div>
                        <div className="text-center px-2">
                            <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-widest mb-1">Watch Time</span>
                            <div className="flex items-center justify-center gap-1.5">
                                <Clock className="h-4 w-4 text-indigo-400" />
                                <span className="text-xl font-bold text-white">{trackerData.totalMinutes}m</span>
                            </div>
                            <span className="text-[10px] text-slate-500 block mt-0.5">cumulative</span>
                        </div>
                        <div className="border-r border-slate-900"></div>
                        <div className="text-center px-2">
                            <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-widest mb-1">Daily Streak</span>
                            <div className="flex items-center justify-center gap-1.5">
                                <Flame className={`h-5 w-5 ${trackerData.streak > 0 ? 'text-amber-500 animate-pulse' : 'text-slate-600'}`} />
                                <span className="text-xl font-bold text-white">{trackerData.streak} Day{trackerData.streak === 1 ? '' : 's'}</span>
                            </div>
                            <span className="text-[10px] text-slate-500 block mt-0.5">consecutive</span>
                        </div>
                    </div>
                </header>

                {/* MAIN BODY GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">

                    {/* LEFT PANEL: INPUT LOGGER & STUDY GRAPH (4 COLS) */}
                    <div className="lg:col-span-4 space-y-6">

                        {/* Quick Log Form */}
                        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-9 w-9 bg-indigo-950/50 text-indigo-400 flex items-center justify-center rounded-xl border border-indigo-900/50">
                                    <Play className="h-4 w-4" />
                                </div>
                                <div>
                                    <h2 className="text-md font-bold text-white">Log Immersion Time</h2>
                                    <p className="text-xs text-slate-400">Add watch sessions directly</p>
                                </div>
                            </div>

                            <form onSubmit={handleLogSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-2">Quick presets</label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {[10, 20, 30, 45].map((preset) => (
                                            <button
                                                key={preset}
                                                type="button"
                                                onClick={() => setCustomMins(preset.toString())}
                                                className={`py-2 rounded-lg text-xs font-semibold border transition duration-150 ${customMins === preset.toString()
                                                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                                                        : 'bg-slate-950 hover:bg-slate-900 border-slate-800 text-slate-300'
                                                    }`}
                                            >
                                                {preset}m
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="custom-minutes" className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-2">Custom Minutes</label>
                                    <input
                                        type="number"
                                        id="custom-minutes"
                                        min="1"
                                        max="480"
                                        placeholder="E.g., 15"
                                        value={customMins}
                                        onChange={(e) => setCustomMins(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800/80 rounded-xl py-2.5 px-4 text-white text-sm focus:outline-none focus:border-indigo-500 transition duration-150"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="show-watched" className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-2">Source Medium</label>
                                    <select
                                        id="show-watched"
                                        value={selectedLogShow}
                                        onChange={(e) => setSelectedLogShow(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800/80 rounded-xl py-2.5 px-3 text-white text-sm focus:outline-none focus:border-indigo-500 transition duration-150"
                                    >
                                        {SHOWS_DB.map(s => (
                                            <option key={s.id} value={s.title}>{s.title} ({s.level})</option>
                                        ))}
                                        <option value="Independent Video">Other / YouTube Channel</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 transition duration-200"
                                >
                                    Save Watch Log
                                </button>
                            </form>
                        </div>

                        {/* Weekly Goal Progress Widget */}
                        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Weekly Target Loop</h3>
                                <span className="text-xs font-semibold text-cyan-400">{trackerData.weeklyMinutes} / 150 Min</span>
                            </div>
                            <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800/80 p-0.5">
                                <div
                                    className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-400 h-full rounded-full transition-all duration-500"
                                    style={{ width: `${weeklyGoalPercent}%` }}
                                ></div>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-2.5 leading-relaxed">
                                Aim for 150 minutes of active viewing per week. Spacing your study out into 15-20 minute daily chunks maximizes cognitive acquisition.
                            </p>

                            {/* Daily Dot Status Cards */}
                            <div className="grid grid-cols-7 gap-2 pt-5 border-t border-slate-900 mt-4 text-center">
                                {Object.entries(trackerData.loggedDays).map(([day, min]) => (
                                    <div key={day} className="flex flex-col items-center">
                                        <span className="text-[9px] font-bold text-slate-500 uppercase">{day}</span>
                                        <div
                                            className={`h-2 w-2 rounded-full mt-2 transition-all duration-300 ${min > 0
                                                    ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]'
                                                    : 'bg-slate-850 border border-slate-800'
                                                }`}
                                            title={`${min} minutes logged`}
                                        ></div>
                                        <span className="text-[8px] text-slate-600 mt-1">{min > 0 ? `${min}m` : '-'}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Advanced Analytical Framework Info Box */}
                        <div className="bg-indigo-950/20 border border-indigo-900/30 rounded-2xl p-6">
                            <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                <Sparkles className="h-4 w-4 text-amber-400" /> Pure CI Methodology
                            </h3>
                            <p className="text-xs leading-relaxed text-indigo-200/70">
                                Do not pause the video to look up obscure words. Your brain builds primary lexical connections when you look at an object and hear the sound directly, totally skipping translation steps. Focus on physical reactions, contextual prompts, and body language.
                            </p>
                        </div>

                        {/* Danger Zone Utilities */}
                        <div className="pt-2">
                            <button
                                onClick={() => {
                                    if (confirm("Are you sure you want to reset all your learning tracking metrics?")) {
                                        handleResetProgress();
                                    }
                                }}
                                className="text-[10px] text-slate-600 hover:text-rose-400 transition flex items-center gap-1.5 mx-auto font-semibold uppercase tracking-wider"
                            >
                                <RotateCcw className="h-3.5 w-3.5" /> Reset Local Analytics
                            </button>
                        </div>

                    </div>

                    {/* RIGHT PANEL: CATALOG / LISTENING DESK / TABBED CONTAINER (8 COLS) */}
                    <div className="lg:col-span-8 space-y-6">

                        {/* Premium Tab Bar Controls */}
                        <div className="flex border-b border-slate-900">
                            <button
                                onClick={() => setActiveTab('shows')}
                                className={`pb-4 px-6 text-sm font-bold tracking-wide transition-all border-b-2 flex items-center gap-2 ${activeTab === 'shows'
                                        ? 'text-indigo-400 border-indigo-500'
                                        : 'text-slate-400 border-transparent hover:text-white'
                                    }`}
                            >
                                <Tv className="h-4 w-4" /> Recommended Kids' Shows
                            </button>
                            <button
                                onClick={() => setActiveTab('phrases')}
                                className={`pb-4 px-6 text-sm font-bold tracking-wide transition-all border-b-2 flex items-center gap-2 ${activeTab === 'phrases'
                                        ? 'text-indigo-400 border-indigo-500'
                                        : 'text-slate-400 border-transparent hover:text-white'
                                    }`}
                            >
                                <Volume2 className="h-4 w-4" /> Listening Phrases Desk
                            </button>
                            <button
                                onClick={() => setActiveTab('challenges')}
                                className={`pb-4 px-6 text-sm font-bold tracking-wide transition-all border-b-2 flex items-center gap-2 ${activeTab === 'challenges'
                                        ? 'text-indigo-400 border-indigo-500'
                                        : 'text-slate-400 border-transparent hover:text-white'
                                    }`}
                            >
                                <Award className="h-4 w-4" /> Active Challenges
                            </button>
                        </div>

                        {/* TAB CONTENT: SHOWS CATALOG */}
                        {activeTab === 'shows' && (
                            <div className="space-y-6">

                                {/* Search & Filter Header */}
                                <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 backdrop-blur-md">

                                    {/* Custom Search Box */}
                                    <div className="relative flex-grow max-w-md">
                                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                                        <input
                                            type="text"
                                            placeholder="Suchen nach Titeln..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl py-2 px-10 text-white text-xs focus:outline-none focus:border-indigo-500 transition duration-150"
                                        />
                                    </div>

                                    {/* Filter Badges group */}
                                    <div className="flex items-center gaGerman Immersion TV Explorer & Daily Tracker web applicationp-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800/80">
                                        {['All', 'A1', 'A2', 'B1'].map((lvl) => (
                                            <button
                                                key={lvl}
                                                onClick={() => setFilterLevel(lvl)}
                                                className={`text-[10px] font-bold tracking-wider px-3 py-1.5 rounded-lg uppercase transition-all duration-150 ${filterLevel === lvl
                                                        ? 'bg-indigo-600 text-white shadow-md'
                                                        : 'text-slate-400 hover:text-slate-200'
                                                    }`}
                                            >
                                                {lvl}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Shows Grid */}
                                {filteredShows.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {filteredShows.map((show) => {
                                            let tagStyles = "bg-emerald-950/40 text-emerald-400 border-emerald-900/40";
                                            if (show.level === 'A2') tagStyles = "bg-amber-950/40 text-amber-400 border-amber-900/40";
                                            if (show.level === 'B1') tagStyles = "bg-rose-950/40 text-rose-400 border-rose-900/40";

                                            return (
                                                <div
                                                    key={show.id}
                                                    onClick={() => setSelectedShow(show)}
                                                    className="bg-slate-900/40 hover:bg-slate-900/60 border border-slate-900 hover:border-indigo-500/30 p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 shadow-lg cursor-pointer group hover:-translate-y-1"
                                                >
                                                    <div>
                                                        <div className="flex items-center justify-between mb-4">
                                                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md border tracking-wider uppercase ${tagStyles}`}>
                                                                {show.level} • {show.tier}
                                                            </span>
                                                            <div className="h-8 w-8 bg-slate-950 text-indigo-400 flex items-center justify-center rounded-lg border border-slate-800 group-hover:border-indigo-500/30 group-hover:text-white transition duration-200">
                                                                <Tv className="h-4 w-4" />
                                                            </div>
                                                        </div>

                                                        <h3 className="font-extrabold text-white text-md tracking-tight group-hover:text-indigo-400 transition-colors duration-200">{show.title}</h3>
                                                        <p className="text-[11px] text-slate-500 italic mt-0.5">{show.englishTitle}</p>

                                                        <p className="text-xs text-slate-400 mt-3 line-clamp-2 leading-relaxed">{show.description}</p>
                                                    </div>

                                                    <div className="border-t border-slate-950/60 pt-4 mt-5 flex items-center justify-between text-xs text-indigo-400 font-bold tracking-wide">
                                                        <span className="flex items-center gap-1">
                                                            <Info className="h-3.5 w-3.5" /> Study guide & stream tips
                                                        </span>
                                                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition duration-200" />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="bg-slate-900/20 border border-slate-900 rounded-2xl p-10 text-center">
                                        <p className="text-slate-400 text-sm">Keine Shows entsprechen Ihren Filterkriterien.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* TAB CONTENT: PHRASES DESK */}
                        {activeTab === 'phrases' && (
                            <div className="space-y-6">

                                <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 backdrop-blur-md">
                                    <h3 className="text-md font-bold text-white mb-2">High-Frequency Kids' TV Expressions</h3>
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                        Children's characters operate on heavy repetition to build speech blocks in native infants. Recognizing these visual anchors helps your brain instantly structure the context around them without translation mapping.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {PHRASES_DB.map((item, idx) => (
                                        <div key={idx} className="bg-slate-900/40 border border-slate-900 p-5 rounded-2xl hover:border-slate-800 transition duration-150">
                                            <div className="flex justify-between items-start gap-4">
                                                <span className="font-extrabold text-indigo-400 text-base tracking-tight">"{item.phrase}"</span>
                                                <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">High Frequency</span>
                                            </div>

                                            <div className="mt-4 space-y-2">
                                                <p className="text-xs text-slate-200">
                                                    <strong className="text-slate-400 uppercase text-[10px] tracking-wider block">Conceptual Meaning:</strong>
                                                    {item.meaning}
                                                </p>
                                                <p className="text-[11px] text-slate-400 italic">
                                                    {item.context}
                                                </p>
                                                <div className="pt-2 border-t border-slate-950/50 flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                                                    <Volume2 className="h-3 w-3 text-indigo-400/70" /> Sounds roughly like: <span className="text-indigo-300">{item.soundLike}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* TAB CONTENT: CHALLENGES LIST */}
                        {activeTab === 'challenges' && (
                            <div className="space-y-6">

                                <div className="bg-slate-900/40 border border-slate-900 p-6 rounded-2xl backdrop-blur-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div>
                                        <h3 className="text-md font-bold text-white">Active Listening Challenges</h3>
                                        <p className="text-xs text-slate-400 leading-relaxed">
                                            Transform passive watching into conscious skill acquisition. Keep these goals in mind during your immersion session. Check them off to secure bonus XP!
                                        </p>
                                    </div>
                                    <div className="bg-indigo-950/40 border border-indigo-900/50 px-4 py-3 rounded-xl text-center shrink-0">
                                        <span className="text-[10px] text-indigo-400 block uppercase font-bold tracking-widest">Global XP</span>
                                        <span className="text-xl font-bold text-white">{scoreXP}</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {challenges.map((ch) => (
                                        <div
                                            key={ch.id}
                                            onClick={() => handleChallengeToggle(ch.id)}
                                            className={`border p-4 rounded-xl flex items-center justify-between gap-4 cursor-pointer transition-all duration-200 ${ch.completed
                                                    ? 'bg-slate-900/20 border-indigo-500/50 text-slate-400'
                                                    : 'bg-slate-900/40 hover:bg-slate-900/60 border-slate-900 text-white'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`h-5 w-5 rounded-md border flex items-center justify-center transition-all ${ch.completed
                                                        ? 'bg-indigo-600 border-indigo-500 text-white'
                                                        : 'bg-slate-950 border-slate-800'
                                                    }`}>
                                                    {ch.completed && <CheckCircle2 className="h-4 w-4" />}
                                                </div>
                                                <span className={`text-xs ${ch.completed ? 'line-through text-slate-500' : 'font-semibold'}`}>
                                                    {ch.task}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2 shrink-0">
                                                <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${ch.completed
                                                        ? 'bg-slate-950 text-slate-600 border border-slate-900'
                                                        : 'bg-indigo-950/50 text-indigo-400 border border-indigo-900/60'
                                                    }`}>
                                                    +{ch.points} XP
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                </div>

            </div>

            {/* FOOTER METRICS AND CREDITS */}
            <footer className="bg-slate-950/60 border-t border-slate-900 py-8 mt-10 text-center text-xs text-slate-500 backdrop-blur-md">
                <div className="container mx-auto px-4 space-y-2">
                    <p>© 2026 German Immersion Hub. Designed as a direct utility for comprehensible input analyses.</p>
                    <p className="text-slate-600 max-w-xl mx-auto">
                        Strive to watch children's content with zero translation subtitles; target standard German audio directly to enforce native ear training.
                    </p>
                </div>
            </footer>

            {/* PREMIUM DETAILS DRAWER / MODAL */}
            {selectedShow && (
                <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800/80 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">

                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedShow(null)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white transition p-1 hover:bg-slate-800 rounded-lg"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        {/* Show Meta */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-12 w-12 bg-indigo-950 text-indigo-400 flex items-center justify-center rounded-2xl border border-indigo-900/60">
                                <Tv className="h-6 w-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white tracking-tight">{selectedShow.title}</h2>
                                <span className="text-xs text-slate-400 italic">{selectedShow.englishTitle}</span>
                            </div>
                        </div>

                        <div className="space-y-5 text-xs sm:text-sm">
                            <div>
                                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Immersion Tier</span>
                                <div className="mt-1.5">
                                    <span className="font-semibold text-indigo-400 uppercase text-[10px] tracking-wider bg-indigo-950/30 px-3 py-1.5 rounded-lg border border-indigo-900/50">
                                        {selectedShow.level} Difficulty
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">Functional Overview</h4>
                                    <p className="text-slate-300 leading-relaxed bg-slate-950/50 p-3.5 rounded-xl border border-slate-850">
                                        {selectedShow.description}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">Cognitive Benefits</h4>
                                    <p className="text-slate-300 leading-relaxed flex items-start gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                                        <span>{selectedShow.keyBenefits}</span>
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">Recommended Approach</h4>
                                    <p className="text-indigo-200 leading-relaxed bg-indigo-950/20 p-4 rounded-xl border border-indigo-900/30">
                                        {selectedShow.recommendations}
                                    </p>
                                </div>

                                <div className="pt-2">
                                    <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">Where to stream</h4>
                                    <p className="text-slate-400 text-xs">
                                        {selectedShow.whereToWatch}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Action Buttons inside drawer */}
                        <div className="mt-8 pt-6 border-t border-slate-800 flex items-center gap-3">
                            <a
                                href={`https://www.youtube.com/results?search_query=${selectedShow.youtubeSearch}`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-grow bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-bold py-3 px-4 rounded-xl text-xs text-center uppercase tracking-wider transition duration-150 shadow-md"
                            >
                                Search on YouTube
                            </a>
                            <button
                                onClick={() => {
                                    setSelectedLogShow(selectedShow.title);
                                    setCustomMins("20");
                                    setSelectedShow(null);
                                    triggerToast(`Pre-filled logger with 20 minutes for ${selectedShow.title}.`);
                                }}
                                className="bg-slate-950 hover:bg-slate-850 text-slate-300 border border-slate-800 font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition duration-150"
                            >
                                Log watching
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}