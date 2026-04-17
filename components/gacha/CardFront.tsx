import Image from 'next/image';
import RarityBadge from './RarityBadge';
import type { Sprite } from '@/types';

const elementEmoji: Record<string, string> = {
  '火': '🔥', '水': '💧', '草': '🌿', '电': '⚡',
  '幽灵': '👻', '冰': '❄️', '龙': '🐉', '光': '✨', '暗': '🌑',
};

const rarityBg: Record<string, string> = {
  N:   'from-slate-700 to-slate-800',
  R:   'from-green-900 to-slate-800',
  SR:  'from-indigo-900 to-slate-800',
  SSR: 'from-amber-900 to-slate-800',
  UR:  'from-fuchsia-900 via-purple-900 to-slate-800',
};

export default function CardFront({ sprite }: { sprite: Sprite }) {
  return (
    <div className={`w-64 h-96 rounded-2xl bg-gradient-to-br ${rarityBg[sprite.rarity]} border border-slate-600 flex flex-col items-center justify-between p-4 shadow-2xl relative overflow-hidden`}>
      {/* 顶部稀有度 */}
      <div className="w-full flex justify-between items-center">
        <RarityBadge rarity={sprite.rarity} />
        <span className="text-lg">{sprite.element ? elementEmoji[sprite.element] ?? '✦' : '✦'}</span>
      </div>
      {/* 精灵图片 */}
      <div className="relative w-40 h-40 flex-shrink-0">
        <Image
          src={sprite.image_url}
          alt={sprite.name}
          fill
          className="object-contain drop-shadow-lg"
          onError={(e) => {
            // 图片不存在时隐藏 img 标签，显示 emoji 占位
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        {/* 占位符（图片加载失败时显示） */}
        <div className="absolute inset-0 flex items-center justify-center text-7xl select-none pointer-events-none">
          {sprite.element ? elementEmoji[sprite.element] ?? '✦' : '✦'}
        </div>
      </div>
      {/* 底部信息 */}
      <div className="w-full text-center">
        <p className="text-white font-bold text-xl mb-1">{sprite.name}</p>
        {sprite.element && <p className="text-slate-400 text-xs">{sprite.element}系</p>}
        {sprite.description && (
          <p className="text-slate-400 text-xs mt-2 line-clamp-2">{sprite.description}</p>
        )}
      </div>
    </div>
  );
}
