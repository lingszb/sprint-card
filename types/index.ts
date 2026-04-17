export type Rarity = 'N' | 'R' | 'SR' | 'SSR' | 'UR';

export interface Sprite {
  id: string;
  name: string;
  rarity: Rarity;
  image_url: string;
  description: string | null;
  element: string | null;
}

export interface GachaResult {
  sprite: Sprite;
  rarity: Rarity;
}

export type GachaPhase = 'idle' | 'pulling' | 'flash' | 'reveal' | 'glow' | 'done';
