'use client';
import { useState, useEffect } from 'react';
import type { Rarity } from '@/types';

// 每种元素 3 帧 ASCII art（帧间有细微动作变化）
const ASCII_SPRITES: Record<string, [string, string, string]> = {
  火: [
    `  (\\(\\
  ( -.-)
  o_(")_(")
   |  |~
  /| ~|\\
 /_|  |_\\`,
    `  (\\(\\
  ( o.o)
  o_(")_(")
   |  |
  /| ~|\\
 /_|  |_\\`,
    `  (\\(\\
  ( -.-)
  o_(")_(")
   | ~|
  /|  |\\
 /_|  |_\\`,
  ],
  水: [
    ` ><(((°>
~  ~ ~ ~
 ·  ·  ·`,
    ` ><(((°>
 ~ ~ ~ ~
·  ·  ·  `,
    ` ><(((°>
~  ~  ~ ~
  ·  ·  · `,
  ],
  草: [
    `   /\\  /\\
  (  °ω°)
  |  づ♣
  |_|~~~
   U U `,
    `   /\\  /\\
  (  >ω<)
  |♣ づ
  |_|~~~
   U U `,
    `   /\\  /\\
  (  °ω°)
  づ |♣
  |_|~~~
   U U `,
  ],
  电: [
    `  ⚡ ⚡ ⚡
  (=^·^=)
  ~~|__|~~
   ⚡  ⚡`,
    `  ⚡  ⚡
  (=^-^=)
  ~~|__|~~
   ⚡ ⚡ `,
    `   ⚡ ⚡
  (=^·^=)
  ~~|__|~~
  ⚡   ⚡ `,
  ],
  幽灵: [
    ` .-.-.-.
(  o   o )
 \\  ∪  /
  \`-.-'
  |   |
  ~   ~ `,
    ` .-.-.-.
(  -   - )
 \\  ∪  /
  \`-.-'
  |   |
  ~   ~  `,
    ` .-.-.-.
(  o   - )
 \\  ∪  /
  \`-.-'
  ~   |
  |   ~  `,
  ],
  冰: [
    `  *  *  *
  (•̀ᴗ•́)
  / ❄  \\
  |_____|
  *  *  *`,
    `  *    *
  (•̀ᴗ•́)
  \\ ❄  /
  |_____|
   *  *  `,
    `   *  *
  (•̀ᴗ•́)
  / ❄  \\
  |_____|
  *    *  `,
  ],
  龙: [
    `  /\\___/\\
 (  🔥  )>
  \\~*~*/
  |=====|
  /|   |\\
 /_|   |_\\`,
    `  /\\___/\\
<(  🔥  )
  \\~*~*/
  |=====|
  /|   |\\
 /_|   |_\\`,
    `  /\\___/\\
 (  🔥  )
  \\~+~*/
  |=====|
  /|   |\\
 /_|   |_\\`,
  ],
  光: [
    ` ✦  ✦  ✦
  (✨ᴗ✨)
 ✦ |★| ✦
   |___|
 ✦  ✦  ✦ `,
    ` ✦   ✦ ✦
  (✨ᴗ✨)
  ✦|★|✦
   |___|
  ✦  ✦  ✦`,
    `✦  ✦   ✦
  (✨ᴗ✨)
 ✦  |★| ✦
   |___|
  ✦ ✦  ✦ `,
  ],
  暗: [
    ` ░░░░░░░
░(▓▓▓▓▓)░
 ░\\███/░
  ░|_|░
 ░░░░░░░ `,
    ` ░░░░░░░
░(▓▓▓▓▓)░
 ░/███\\░
  ░|_|░
 ░░░░░░░ `,
    `  ░░░░░░
░(▓▓▓▓▓)░
 ░\\███/░
  ░|_|░
 ░░░░░░   `,
  ],
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
