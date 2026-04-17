import type { Rarity } from '@/types';

export const RARITY_WEIGHTS: Record<Rarity, number> = {
  N:   6000,
  R:   2500,
  SR:  1000,
  SSR:  400,
  UR:   100,
};

export const TOTAL_WEIGHT = Object.values(RARITY_WEIGHTS).reduce(
  (sum, w) => sum + w,
  0,
); // 10000
