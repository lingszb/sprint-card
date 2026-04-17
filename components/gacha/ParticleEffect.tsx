'use client';
import { motion, AnimatePresence } from 'framer-motion';
import type { Rarity } from '@/types';

const rarityColors: Record<Rarity, string[]> = {
  N:   ['#9ca3af'],
  R:   ['#22c55e', '#86efac'],
  SR:  ['#818cf8', '#c4b5fd', '#60a5fa'],
  SSR: ['#f59e0b', '#fcd34d', '#fb923c'],
  UR:  ['#e879f9', '#818cf8', '#f59e0b', '#22c55e', '#60a5fa'],
};

// 预先生成固定粒子数据，避免渲染时调用 Math.random（ESLint react-hooks/purity）
function buildParticles(rarity: Rarity) {
  const colors = rarityColors[rarity];
  // 使用确定性分布：角度均匀分布 + 固定偏移表模拟随机性
  const offsets = [5, 11, 3, 9, 1, 7, 12, 4, 8, 2, 10, 6, 0, 11, 5, 3, 9, 7, 1, 4, 8, 2, 6, 10, 0, 12, 5, 11, 3, 9];
  const distances = [120, 150, 110, 140, 130, 160, 105, 145, 125, 155, 115, 135, 170, 108, 148, 138, 118, 158, 128, 143, 113, 153, 123, 163, 107, 147, 137, 117, 157, 127];
  const sizes     = [5, 8, 6, 9, 4, 7, 5, 8, 6, 9, 4, 7, 5, 8, 6, 9, 4, 7, 5, 8, 6, 9, 4, 7, 5, 8, 6, 9, 4, 7];
  const durations = [0.7, 0.9, 0.8, 1.0, 0.65, 0.85, 0.75, 0.95, 0.7, 0.9, 0.8, 1.0, 0.65, 0.85, 0.75, 0.95, 0.7, 0.9, 0.8, 1.0, 0.65, 0.85, 0.75, 0.95, 0.7, 0.9, 0.8, 1.0, 0.65, 0.85];
  const delays    = [0, 0.1, 0.05, 0.15, 0.08, 0.12, 0.03, 0.18, 0, 0.1, 0.05, 0.15, 0.08, 0.12, 0.03, 0.18, 0, 0.1, 0.05, 0.15, 0.08, 0.12, 0.03, 0.18, 0, 0.1, 0.05, 0.15, 0.08, 0.12];

  return Array.from({ length: 30 }, (_, i) => ({
    id: i,
    angle: (i / 30) * 360 + offsets[i],
    distance: distances[i],
    color: colors[i % colors.length],
    size: sizes[i],
    duration: durations[i],
    delay: delays[i],
  }));
}

const PARTICLES: Partial<Record<Rarity, ReturnType<typeof buildParticles>>> = {
  SR:  buildParticles('SR'),
  SSR: buildParticles('SSR'),
  UR:  buildParticles('UR'),
};

interface ParticleEffectProps {
  rarity: Rarity;
  active: boolean;
}

export default function ParticleEffect({ rarity, active }: ParticleEffectProps) {
  if (rarity === 'N' || rarity === 'R') return null;

  const particles = PARTICLES[rarity] ?? [];

  return (
    <AnimatePresence>
      {active && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {particles.map((p) => {
            const rad = (p.angle * Math.PI) / 180;
            const x = Math.cos(rad) * p.distance;
            const y = Math.sin(rad) * p.distance;
            return (
              <motion.div
                key={p.id}
                className="absolute rounded-full"
                style={{ width: p.size, height: p.size, backgroundColor: p.color }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ x, y, opacity: 0, scale: 0 }}
                transition={{ duration: p.duration, delay: p.delay, ease: 'easeOut' }}
              />
            );
          })}
        </div>
      )}
    </AnimatePresence>
  );
}
