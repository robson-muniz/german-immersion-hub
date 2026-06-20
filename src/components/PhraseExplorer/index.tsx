'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import { PhraseUnit, PhraseToken } from '../../types';
import { useAudio } from '../../hooks/useAudio';

export function PhraseExplorer({ phrases }: { phrases: PhraseUnit[] }) {
  const [selected, setSelected] = useState<PhraseToken>(phrases[0].tokens[0]);
  const { play } = useAudio();

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[.045] p-6">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[.25em] text-[#f2c76b]">Phrase explorer</p>
          <h2 className="mt-2 text-3xl font-semibold">Meaning through tokens</h2>
        </div>
        <p className="max-w-md text-sm text-white/50">Tap each word to hear it, see a visual anchor, and understand its role without leaving the scene.</p>
      </div>

      {phrases.map((phrase) => (
        <div key={phrase.id} className="mb-5 rounded-3xl bg-black/20 p-5">
          <button onClick={() => play(phrase.audioFile)} className="mb-4 inline-flex items-center gap-2 text-white/60 hover:text-white">
            <Volume2 size={16} /> {phrase.phrase}
          </button>
          <div className="flex flex-wrap gap-3">
            {phrase.tokens.map((token) => (
              <motion.button
                key={`${phrase.id}-${token.text}`}
                onClick={() => {
                  setSelected(token);
                  play(token.audioFile);
                }}
                className="rounded-2xl border border-white/10 bg-[#111113] px-5 py-3 text-lg hover:border-[#d95c55]/70 hover:text-[#f2c76b]"
                whileHover={{ y: -2 }}
              >
                {token.text}
              </motion.button>
            ))}
          </div>
        </div>
      ))}

      <div className="rounded-3xl border border-[#f2c76b]/20 bg-[#f2c76b]/8 p-5">
        <div className="text-5xl">{selected.image}</div>
        <h3 className="mt-3 text-2xl font-semibold">{selected.text}</h3>
        <p className="text-white/55">{selected.meaning}</p>
        <div className="mt-3 space-y-1 text-sm text-white/58">
          {selected.examples.map((example) => <p key={example}>“{example}”</p>)}
        </div>
      </div>
    </section>
  );
}
