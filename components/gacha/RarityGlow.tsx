'use client';
import { motion, AnimatePresence } from 'framer-motion';
import type { Rarity } from '@/types';

const glowConfig: Record<Rarity, { shadow: string; extra?: boolean }> = {
  N:   { shadow: 'none' },
  R:   { shadow: '0 0 20px 5px rgba(34,197,94,0.4)' },
  SR:  { shadow: '0 0 40px 15px rgba(129,140,248,0.6)' },
  SSR: { shadow: '0 0 60px 20px rgba(245,158,11,0.7)', extra: true },
  UR:  { shadow: '0 0 80px 30px rgba(232,121,249,0.8)', extra: true },
};

interface RarityGlowProps {
  rarity: Rarity;
  active: boolean;
}

export default function RarityGlow({ rarity, active }: RarityGlowProps) {
  if (rarity === 'N') return null;

  const config = glowConfig[rarity];

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={{ boxShadow: '0 0 0px 0px transparent' }}
          animate={
            rarity === 'UR'
              ? { boxShadow: [config.shadow, '0 0 80px 30px rgba(129,140,248,0.8)', config.shadow] }
              : rarity === 'SSR'
              ? { boxShadow: [config.shadow, '0 0 80px 30px rgba(245,158,11,0.9)', config.shadow] }
              : { boxShadow: config.shadow }
          }
          transition={
            rarity === 'SSR' || rarity === 'UR'
              ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.5 }
          }
          exit={{ boxShadow: '0 0 0px 0px transparent', transition: { duration: 0.5 } }}
        />
      )}
    </AnimatePresence>
  );
}
