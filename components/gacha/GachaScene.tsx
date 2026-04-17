'use client';
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CardFlip from './CardFlip';
import GachaButton from './GachaButton';
import RarityGlow from './RarityGlow';
import ParticleEffect from './ParticleEffect';
import type { GachaPhase, GachaResult } from '@/types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function GachaScene() {
  const [phase, setPhase] = useState<GachaPhase>('idle');
  const [result, setResult] = useState<GachaResult | null>(null);

  const handlePull = useCallback(async () => {
    if (phase !== 'idle' && phase !== 'done') return;

    setPhase('pulling');
    setResult(null);

    // API 请求与最短等待时间并发
    const [data] = await Promise.all([
      fetch('/api/gacha', { method: 'POST' }).then((r) => r.json()),
      delay(600),
    ]);

    if (data.error) {
      setPhase('idle');
      return;
    }

    setResult(data.result);

    // 动效时间轴
    setPhase('flash');
    await delay(400);

    setPhase('reveal');
    await delay(700);

    setPhase('glow');
    await delay(1000);

    setPhase('done');
  }, [phase]);

  const isFlashing = phase === 'flash';
  const isRevealed = phase === 'reveal' || phase === 'glow' || phase === 'done';
  const isGlowing = phase === 'glow' || phase === 'done';
  const isPulling = phase === 'pulling' || phase === 'flash';
  const isDone = phase === 'done';

  return (
    <div className="flex flex-col items-center gap-12">
      {/* 卡片区域 */}
      <div className="relative">
        {/* 全屏白光 flash */}
        <AnimatePresence>
          {isFlashing && (
            <motion.div
              className="fixed inset-0 bg-white z-50 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0] }}
              transition={{ duration: 0.4, times: [0, 0.3, 1] }}
            />
          )}
        </AnimatePresence>

        {/* 光晕层 */}
        <RarityGlow rarity={result?.rarity ?? 'N'} active={isGlowing} />

        {/* 粒子层 */}
        <ParticleEffect rarity={result?.rarity ?? 'N'} active={isGlowing} />

        {/* 卡片翻转 */}
        <CardFlip flipped={isRevealed} sprite={result?.sprite ?? null} />
      </div>

      {/* 精灵名称（done 时弹出） */}
      <AnimatePresence>
        {isDone && result && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <p className="text-slate-400 text-sm mb-1">获得精灵</p>
            <p className="text-white text-2xl font-bold">{result.sprite.name}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 操作按钮 */}
      <div className="flex flex-col items-center gap-3">
        <GachaButton
          onPull={handlePull}
          disabled={isPulling || phase === 'reveal' || phase === 'glow'}
          isPulling={isPulling}
        />
        <AnimatePresence>
          {isDone && (
            <motion.button
              className="text-slate-400 text-sm hover:text-white transition-colors underline underline-offset-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              onClick={() => setPhase('idle')}
            >
              重置
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
