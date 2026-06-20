import { useCallback, useRef } from 'react';

export const useAudio = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback((src?: string) => {
    if (!src || typeof window === 'undefined') return;
    audioRef.current?.pause();
    const audio = new Audio(src);
    audio.volume = 0.72;
    audioRef.current = audio;
    audio.play().catch(() => undefined);
  }, []);

  const playSuccess = useCallback(() => {
    if (typeof window === 'undefined') return;
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.frequency.setValueAtTime(660, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(990, context.currentTime + 0.18);
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, context.currentTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.24);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.25);
  }, []);

  return { play, playSuccess };
};
