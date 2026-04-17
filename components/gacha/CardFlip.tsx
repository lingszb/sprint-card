'use client';
import { motion } from 'framer-motion';
import CardBack from './CardBack';
import CardFront from './CardFront';
import type { Sprite } from '@/types';

interface CardFlipProps {
  flipped: boolean;
  sprite: Sprite | null;
}

export default function CardFlip({ flipped, sprite }: CardFlipProps) {
  return (
    <div style={{ perspective: '1200px' }} className="relative">
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d', position: 'relative', width: 256, height: 384 }}
      >
        {/* 背面（初始显示） */}
        <div style={{ backfaceVisibility: 'hidden', position: 'absolute', inset: 0 }}>
          <CardBack />
        </div>
        {/* 正面（翻转后显示） */}
        <div style={{ backfaceVisibility: 'hidden', position: 'absolute', inset: 0, transform: 'rotateY(180deg)' }}>
          {sprite && <CardFront sprite={sprite} />}
        </div>
      </motion.div>
    </div>
  );
}
