'use client';
import { motion } from 'framer-motion';

interface GachaButtonProps {
  onPull: () => void;
  disabled: boolean;
  isPulling: boolean;
}

export default function GachaButton({ onPull, disabled, isPulling }: GachaButtonProps) {
  return (
    <div className="relative">
      {/* 旋转光圈（pulling 时显示）*/}
      {isPulling && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent"
          style={{ borderTopColor: '#f59e0b', borderRightColor: '#e879f9' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      )}
      <motion.button
        onClick={onPull}
        disabled={disabled}
        whileHover={!disabled ? { scale: 1.05 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
        className="relative px-10 py-4 rounded-full font-bold text-lg text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-900/50 transition-colors"
      >
        {isPulling ? '抽取中...' : '✦ 召唤精灵 ✦'}
      </motion.button>
    </div>
  );
}
