import SpriteAscii from './SpriteAscii';
import RarityBadge from './RarityBadge';
import type { Sprite } from '@/types';

const rarityBorderColor: Record<string, string> = {
  N:   'rgba(107,140,107,0.4)',
  R:   'rgba(0,255,65,0.5)',
  SR:  'rgba(0,200,255,0.6)',
  SSR: 'rgba(255,183,0,0.7)',
  UR:  'rgba(255,68,204,0.8)',
};

const rarityBg: Record<string, string> = {
  N:   'linear-gradient(135deg, #050f05 0%, #071007 100%)',
  R:   'linear-gradient(135deg, #030f05 0%, #041508 100%)',
  SR:  'linear-gradient(135deg, #030812 0%, #050a1a 100%)',
  SSR: 'linear-gradient(135deg, #100a00 0%, #180e00 100%)',
  UR:  'linear-gradient(135deg, #120008 0%, #1a0012 100%)',
};

const elementCode: Record<string, string> = {
  '火': 'FIRE', '水': 'AQUA', '草': 'LEAF', '电': 'ELEC',
  '幽灵': 'GHST', '冰': 'CRYO', '龙': 'DRGN', '光': 'LGTH', '暗': 'DARK',
};

export default function CardFront({ sprite }: { sprite: Sprite }) {
  const borderColor = rarityBorderColor[sprite.rarity];
  const bg = rarityBg[sprite.rarity];

  return (
    <div
      className="w-64 h-96 flex flex-col relative overflow-hidden"
      style={{
        background: bg,
        border: `1px solid ${borderColor}`,
        boxShadow: `0 0 20px ${borderColor}, inset 0 0 20px rgba(0,0,0,0.5)`,
      }}
    >
      {/* 顶部状态栏 */}
      <div
        className="flex justify-between items-center px-3 py-1.5 text-xs flex-shrink-0"
        style={{
          borderBottom: `1px solid ${borderColor}`,
          background: 'rgba(0,0,0,0.4)',
          fontFamily: 'var(--font-mono-display)',
        }}
      >
        <RarityBadge rarity={sprite.rarity} />
        <span style={{ color: borderColor, letterSpacing: '0.15em', opacity: 0.8 }}>
          {sprite.element ? (elementCode[sprite.element] ?? '????') : '????'}
        </span>
      </div>

      {/* ASCII 精灵区 */}
      <div
        className="flex-1 flex items-center justify-center px-2 py-3"
        style={{ background: 'rgba(0,0,0,0.2)' }}
      >
        <SpriteAscii element={sprite.element} rarity={sprite.rarity} />
      </div>

      {/* 底部信息 */}
      <div
        className="px-3 py-2 flex-shrink-0"
        style={{ borderTop: `1px solid ${borderColor}`, background: 'rgba(0,0,0,0.5)' }}
      >
        <p
          className="font-bold text-lg tracking-widest truncate"
          style={{
            fontFamily: 'var(--font-pixel)',
            color: borderColor,
            textShadow: `0 0 8px ${borderColor}`,
            letterSpacing: '0.2em',
          }}
        >
          {sprite.name}
        </p>
        {sprite.element && (
          <p
            className="text-xs mt-0.5"
            style={{ color: 'rgba(0,255,65,0.4)', fontFamily: 'var(--font-mono-display)' }}
          >
            TYPE::{sprite.element}系 &nbsp; ID:{sprite.id.slice(0, 8).toUpperCase()}
          </p>
        )}
        {sprite.description && (
          <p
            className="text-xs mt-1.5 line-clamp-2 leading-relaxed"
            style={{ color: 'rgba(0,255,65,0.5)', fontFamily: 'var(--font-mono-display)' }}
          >
            &gt; {sprite.description}
          </p>
        )}
      </div>

      {/* 角落装饰：CRT 扫描角 */}
      <div className="absolute top-0 left-0 w-3 h-3" style={{ borderTop: `2px solid ${borderColor}`, borderLeft: `2px solid ${borderColor}` }} />
      <div className="absolute top-0 right-0 w-3 h-3" style={{ borderTop: `2px solid ${borderColor}`, borderRight: `2px solid ${borderColor}` }} />
      <div className="absolute bottom-0 left-0 w-3 h-3" style={{ borderBottom: `2px solid ${borderColor}`, borderLeft: `2px solid ${borderColor}` }} />
      <div className="absolute bottom-0 right-0 w-3 h-3" style={{ borderBottom: `2px solid ${borderColor}`, borderRight: `2px solid ${borderColor}` }} />
    </div>
  );
}
