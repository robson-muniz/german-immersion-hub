'use client';

import { motion } from 'framer-motion';
import { Hotspot } from '../../types';

interface Props { hotspot: Hotspot; active: boolean; onSelect: (hotspot: Hotspot) => void; }

export function ObjectHotspot({ hotspot, active, onSelect }: Props) {
  return (
    <motion.button
      type="button"
      className={`absolute rounded-[2rem] border transition ${active ? 'border-[#f2c76b] bg-[#f2c76b]/15 shadow-[0_0_34px_rgba(242,199,107,.45)]' : 'border-white/10 bg-white/[.04] hover:border-[#d95c55]/80 hover:bg-[#d95c55]/10 hover:shadow-[0_0_28px_rgba(217,92,85,.34)]'}`}
      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%`, width: `${hotspot.width}%`, height: `${hotspot.height}%` }}
      onClick={() => onSelect(hotspot)}
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.96 }}
      aria-label={`Explore ${hotspot.german}`}
    >
      <span className="sr-only">{hotspot.german}</span>
      <motion.span className="absolute -right-2 -top-2 grid h-8 w-8 place-items-center rounded-full bg-[#111113]/80 text-lg shadow-lg backdrop-blur" animate={{ opacity: active ? 1 : 0.72 }}>{hotspot.visual}</motion.span>
    </motion.button>
  );
}
