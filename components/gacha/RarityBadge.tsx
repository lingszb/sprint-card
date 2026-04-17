'use client';
import { Badge } from '@/components/ui/badge';
import type { Rarity } from '@/types';

const rarityConfig: Record<Rarity, { label: string; className: string }> = {
  N:   { label: 'N',   className: 'bg-gray-500 text-white border-gray-400' },
  R:   { label: 'R',   className: 'bg-green-600 text-white border-green-400' },
  SR:  { label: 'SR',  className: 'bg-indigo-600 text-white border-indigo-400' },
  SSR: { label: 'SSR', className: 'bg-amber-500 text-white border-amber-300' },
  UR:  { label: 'UR',  className: 'bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white border-fuchsia-300' },
};

export default function RarityBadge({ rarity }: { rarity: Rarity }) {
  const config = rarityConfig[rarity];
  return (
    <Badge className={`text-xs font-bold px-2 py-0.5 border ${config.className}`}>
      {config.label}
    </Badge>
  );
}
