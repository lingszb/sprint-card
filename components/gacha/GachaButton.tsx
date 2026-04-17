'use client';
import { motion } from 'framer-motion';

interface GachaButtonProps {
  onPull: () => void;
  disabled: boolean;
  isPulling: boolean;
}

export default function GachaButton({ onPull, disabled, isPulling }: GachaButtonProps) {
  return (
    <motion.button
      onClick={onPull}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className="relative px-8 py-3 text-sm font-bold tracking-widest uppercase disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      style={{
        fontFamily: 'var(--font-mono-display)',
        color: disabled ? 'rgba(0,255,65,0.4)' : '#030a03',
        background: disabled ? 'transparent' : '#00ff41',
        border: `1px solid ${disabled ? 'rgba(0,255,65,0.3)' : '#00ff41'}`,
        boxShadow: disabled ? 'none' : '0 0 20px rgba(0,255,65,0.4), 0 0 40px rgba(0,255,65,0.15)',
        letterSpacing: '0.25em',
      }}
    >
      {isPulling ? (
        <span className="flex items-center gap-2">
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          >
            ▮
          </motion.span>
          SUMMONING...
        </span>
      ) : (
        '> EXECUTE SUMMON'
      )}
    </motion.button>
  );
}
