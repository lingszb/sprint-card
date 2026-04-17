'use client';
import type { Rarity } from '@/types';

const rarityConfig: Record<Rarity, { label: string; color: string; bg: string }> = {
  N:   { label: '[N]',   color: '#6b8c6b',  bg: 'rgba(107,140,107,0.15)' },
  R:   { label: '[R]',   color: '#00ff41',  bg: 'rgba(0,255,65,0.1)' },
  SR:  { label: '[SR]',  color: '#00c8ff',  bg: 'rgba(0,200,255,0.1)' },
  SSR: { label: '[SSR]', color: '#ffb700',  bg: 'rgba(255,183,0,0.1)' },
  UR:  { label: '[UR]',  color: '#ff44cc',  bg: 'rgba(255,68,204,0.1)' },
};

export default function RarityBadge({ rarity }: { rarity: Rarity }) {
  const cfg = rarityConfig[rarity];
  return (
    <span
      className="text-xs font-bold px-1.5 py-0.5"
      style={{
        fontFamily: 'var(--font-mono-display)',
        color: cfg.color,
        background: cfg.bg,
        border: `1px solid ${cfg.color}`,
        textShadow: `0 0 6px ${cfg.color}`,
        letterSpacing: '0.1em',
        animation:
          rarity === 'UR'
            ? 'ur-rainbow 2s linear infinite'
            : rarity === 'SSR'
            ? 'ssr-pulse 1.5s ease-in-out infinite'
            : 'none',
      }}
    >
      {cfg.label}
    </span>
  );
}
