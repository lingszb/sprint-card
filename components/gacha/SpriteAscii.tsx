'use client';
import { useState, useEffect } from 'react';
import type { Rarity } from '@/types';

// 18种基础形态库
const BASE_SPRITES: Record<string, [string, string, string]> = {
  鸭子: [
    `  __\n<(o )___\n ( ._> /\n  \`---'`,
    `  __\n<(o )___\n (  _> /\n  \`---'`,
    `  __\n<(- )___\n ( ._> /\n  \`---'`
  ],
  鹅: [
    `   __\n <=o )____\n  ( ._> /\n   \`---'`,
    `   __\n <=o )____\n  (  _> /\n   \`---'`,
    `   __\n <=- )____\n  ( ._> /\n   \`---'`
  ],
  史莱姆: [
    `   ____\n  / o o \\\n (   -   )\n  \\_____/`,
    `    ___\n  / - - \\\n (   o   )\n  \\_____/`,
    `   ____\n  / o o \\\n (   o   )\n  \\_____/`
  ],
  猫: [
    ` /\\_/\\\n( o.o )\n > ^ <`,
    ` /\\_/\\\n( -.- )\n > ^ <`,
    ` /\\_/\\\n( o.o )\n > - <`
  ],
  龙: [
    `  /\\___/\\\n (  🔥  )>\n  \\~*~*/\n  |=====|\n  /|   |\\\n /_|   |_\\`,
    `  /\\___/\\\n<(  🔥  )\n  \\~*~*/\n  |=====|\n  /|   |\\\n /_|   |_\\`,
    `  /\\___/\\\n (  🔥  )\n  \\~+~*/\n  |=====|\n  /|   |\\\n /_|   |_\\`
  ],
  章鱼: [
    `   _\n  / \\\n /o o\\\n(  =  )\n /|||\\\n/ ||| \\`,
    `   _\n  / \\\n /o o\\\n(  =  )\n \\|||/\n\\ ||| /`,
    `   _\n  / \\\n /- -\\\n(  =  )\n /|||\\\n/ ||| \\`
  ],
  猫头鹰: [
    `   /\\_/\\\n  ( o.o )\n  (   )\n   ^ ^`,
    `   /\\_/\\\n  ( -.- )\n  (   )\n   ^ ^`,
    `   /\\_/\\\n  ( o.o )\n  (   )\n   ^ ^`
  ],
  企鹅: [
    `   _\n  (o)>\n /(_)\\\n  ^ ^`,
    `   _\n  (o)>\n \\(_)/\n  ^ ^`,
    `   _\n  (-)>\n /(_)\\\n  ^ ^`
  ],
  乌龟: [
    `  ____\n /o o \\_\n(    __ )\n \\__/  U`,
    `  ____\n /o o \\_\n(    __ )\n \\__/  \\`,
    `  ____\n /- - \\_\n(    __ )\n \\__/  U`
  ],
  蜗牛: [
    `   _\\/_\n  (o o )\n  (  ~  )\n   \\___/`,
    `   _\\/_\n  (- - )\n  (  ~  )\n   \\___/`,
    `   _\\/_\n  (o o )\n  (  -  )\n   \\___/`
  ],
  幽灵: [
    ` .-.-.-.\n(  o   o )\n \\  ∪  /\n  \`-.-\'\n  |   |\n  ~   ~ `,
    ` .-.-.-.\n(  -   - )\n \\  ∪  /\n  \`-.-\'\n  |   |\n  ~   ~  `,
    ` .-.-.-.\n(  o   - )\n \\  ∪  /\n  \`-.-\'\n  ~   |\n  |   ~  `
  ],
  蝾螈: [
    `   _  _\n  (o\\/o)\n  ( >< )\n   \\__/\n  ~||||~`,
    `   _  _\n  (o\\/o)\n  (  o )\n   \\__/\n  ~||||~`,
    `   _  _\n  (-\\/o)\n  ( >< )\n   \\__/\n  ~||||~`
  ],
  水豚: [
    `  /\\_/\\\n ( o.o )\n (  =  )\n  |   |\n  U   U`,
    `  /\\_/\\\n ( -.- )\n (  =  )\n  |   |\n  U   U`,
    `  /\\_/\\\n ( o.o )\n (  o  )\n  |   |\n  U   U`
  ],
  仙人掌: [
    `   _\\/_\n  (o o)\n  ( | )\n  __|__`,
    `   _\\/_\n  (- -)\n  ( | )\n  __|__`,
    `   _\\/_\n  (o o)\n  ( / )\n  __|__`
  ],
  机器人: [
    `  [o_o]\n /|   |\\\n  |___|\n  /   \\`,
    `  [-_-]\n /|   |\\\n  |___|\n  /   \\`,
    `  [o_o]\n \\|   |/\n  |___|\n  /   \\`
  ],
  兔子: [
    `  (\\(\\\n  ( -.-)\n  o_(")_(")`,
    `  (\\(\\\n  ( o.o)\n  o_(")_(")`,
    `  (\\(\\\n  ( ^.^)\n  o_(")_(")`
  ],
  蘑菇: [
    `  ____\n /    \\\n |____|\n  |__|`,
    `  ____\n / o  \\\n |____|\n  |__|`,
    `  ____\n /  o \\\n |____|\n  |__|`
  ],
  胖胖: [
    `  ____\n (o  o)\n (    )\n  \\__/\n  U  U`,
    `  ____\n (-  -)\n (    )\n  \\__/\n  U  U`,
    `  ____\n (o  o)\n (  o )\n  \\__/\n  U  U`
  ],
};

// 随机分配形态给当前元素
const ASCII_SPRITES: Record<string, [string, string, string]> = {
  火: BASE_SPRITES['鸭子'],
  水: BASE_SPRITES['企鹅'],
  草: BASE_SPRITES['蘑菇'],
  电: BASE_SPRITES['猫'],
  幽灵: BASE_SPRITES['幽灵'],
  冰: BASE_SPRITES['机器人'],
  龙: BASE_SPRITES['龙'],
  光: BASE_SPRITES['猫头鹰'],
  暗: BASE_SPRITES['章鱼'],
};

// 高稀有度专属 ASCII
const SSR_ASCII: [string, string, string] = [
  `  ╔═══════╗
  ║ ◈ ◈ ◈ ║
  ║ (☯_☯) ║
  ║ ╠═╪═╣ ║
  ║ ╠═╪═╣ ║
  ╚═══════╝
    ★ ★ ★ `,
  `  ╔═══════╗
  ║ ◈ ◈ ◈ ║
  ║ (☯‿☯) ║
  ║ ╠═╪═╣ ║
  ║ ╠═╪═╣ ║
  ╚═══════╝
     ★ ★  `,
  `  ╔═══════╗
  ║ ◈ ◈ ◈ ║
  ║ (☯^☯) ║
  ║ ╠═╪═╣ ║
  ║ ╠═╪═╣ ║
  ╚═══════╝
   ★ ★ ★  `,
];

const UR_ASCII: [string, string, string] = [
  `▓▓▓▓▓▓▓▓▓▓▓
▓ ╔═══════╗ ▓
▓ ║ ☀ ☀ ☀║ ▓
▓ ║(⚡⊙⚡)║ ▓
▓ ║ ╠═╪═╣║ ▓
▓ ╚═══════╝ ▓
▓▓▓▓▓▓▓▓▓▓▓
 ✦ ✦ ✦ ✦ ✦`,
  `▓▓▓▓▓▓▓▓▓▓▓
▓ ╔═══════╗ ▓
▓ ║ ☀  ☀ ║ ▓
▓ ║(⚡◉⚡)║ ▓
▓ ║ ╠═╪═╣║ ▓
▓ ╚═══════╝ ▓
▓▓▓▓▓▓▓▓▓▓▓
  ✦ ✦  ✦ ✦ `,
  `▓▓▓▓▓▓▓▓▓▓▓
▓ ╔═══════╗ ▓
▓ ║☀ ☀  ☀║ ▓
▓ ║(⚡⊙⚡)║ ▓
▓ ║ ╠═╪═╣║ ▓
▓ ╚═══════╝ ▓
▓▓▓▓▓▓▓▓▓▓▓
✦  ✦ ✦  ✦  `,
];

const DEFAULT_ASCII: [string, string, string] = [
  `  (\\(\\
  ( -.-)
  o_(")_(")`,
  `  (\\(\\
  ( o.o)
  o_(")_(")`,
  `  (\\(\\
  ( ^.^)
  o_(")_(")`,
];

const rarityColors: Record<Rarity, string> = {
  N:   '#6b8c6b',
  R:   '#00ff41',
  SR:  '#00c8ff',
  SSR: '#ffb700',
  UR:  '#ff44cc',
};

interface SpriteAsciiProps {
  element: string | null;
  rarity: Rarity;
  active?: boolean;
}

export default function SpriteAscii({ element, rarity, active = true }: SpriteAsciiProps) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % 3);
    }, 400);
    return () => clearInterval(interval);
  }, [active]);

  let frames: [string, string, string];
  if (rarity === 'UR') frames = UR_ASCII;
  else if (rarity === 'SSR') frames = SSR_ASCII;
  else frames = (element && ASCII_SPRITES[element]) ? ASCII_SPRITES[element] : DEFAULT_ASCII;

  const color = rarityColors[rarity];
  const isUR = rarity === 'UR';
  const isSSR = rarity === 'SSR';
  const isSR = rarity === 'SR';

  return (
    <pre
      className="text-center leading-tight select-none"
      style={{
        fontFamily: 'var(--font-mono-display), monospace',
        fontSize: '0.7rem',
        color,
        textShadow: isUR
          ? `0 0 8px ${color}, 0 0 16px ${color}`
          : isSSR
          ? `0 0 6px ${color}, 0 0 12px rgba(255,183,0,0.5)`
          : isSR
          ? `0 0 4px ${color}`
          : 'none',
        animation: isUR
          ? 'ur-rainbow 2s linear infinite'
          : isSSR
          ? 'ssr-pulse 1.5s ease-in-out infinite'
          : 'none',
        minHeight: '7rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {frames[frame]}
    </pre>
  );
}
