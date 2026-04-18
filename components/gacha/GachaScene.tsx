'use client';
import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import CardFlip from './CardFlip';
import GachaButton from './GachaButton';
import RarityGlow from './RarityGlow';
import ParticleEffect from './ParticleEffect';
import type { GachaPhase, GachaResult } from '@/types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function getOrCreateAnonToken(): Promise<string | null> {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.access_token) return session.access_token;
  const { data, error } = await supabase.auth.signInAnonymously();
  if (error || !data.session) return null;
  return data.session.access_token;
}

const LOG_MESSAGES = [
  '> INITIALIZING SUMMON PROTOCOL...',
  '> CONNECTING TO SPIRIT DATABASE...',
  '> CALCULATING PROBABILITY MATRIX...',
  '> EXECUTING RANDOM SEED ALGORITHM...',
  '> RETRIEVING ENTITY FROM POOL...',
  '> DECRYPTING SPRITE DATA...',
  '> RENDERING ENTITY...',
];

export default function GachaScene() {
  const [phase, setPhase] = useState<GachaPhase>('idle');
  const [result, setResult] = useState<GachaResult | null>(null);
  const [logLine, setLogLine] = useState(0);
  const [authError, setAuthError] = useState(false);

  // 页面加载时预先完成匿名登录
  useEffect(() => {
    getOrCreateAnonToken().catch(() => setAuthError(true));
  }, []);

  const handlePull = useCallback(async () => {
    if (phase !== 'idle' && phase !== 'done') return;

    setPhase('pulling');
    setResult(null);
    setLogLine(0);

    const token = await getOrCreateAnonToken();
    if (!token) {
      setAuthError(true);
      setPhase('idle');
      return;
    }

    // 模拟日志滚动
    const logInterval = setInterval(() => {
      setLogLine((l) => Math.min(l + 1, LOG_MESSAGES.length - 1));
    }, 120);

    const [data] = await Promise.all([
      fetch('/api/gacha', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => r.json()),
      delay(600),
    ]);

    clearInterval(logInterval);
    setLogLine(LOG_MESSAGES.length - 1);

    if (data.error) {
      setPhase('idle');
      return;
    }

    setResult(data.result);
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
  const isIdle = phase === 'idle';

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-sm">
      {/* 终端日志区（pulling 时显示） */}
      <AnimatePresence>
        {isPulling && (
          <motion.div
            className="w-full text-xs p-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              border: '1px solid rgba(0,255,65,0.2)',
              background: 'rgba(0,0,0,0.5)',
              fontFamily: 'var(--font-mono-display)',
              color: 'rgba(0,255,65,0.6)',
            }}
          >
            {LOG_MESSAGES.slice(0, logLine + 1).map((msg, i) => (
              <div key={i} style={{ color: i === logLine ? '#00ff41' : 'rgba(0,255,65,0.35)' }}>
                {msg}
              </div>
            ))}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              style={{ color: '#00ff41' }}
            >
              █
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 卡片区域 */}
      <div className="relative">
        <AnimatePresence>
          {isFlashing && (
            <motion.div
              className="fixed inset-0 z-50 pointer-events-none"
              style={{ background: 'rgba(0,255,65,0.15)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.4, times: [0, 0.3, 1] }}
            />
          )}
        </AnimatePresence>

        <RarityGlow rarity={result?.rarity ?? 'N'} active={isGlowing} />
        <ParticleEffect rarity={result?.rarity ?? 'N'} active={isGlowing} />
        <CardFlip flipped={isRevealed} sprite={result?.sprite ?? null} />
      </div>

      {/* 结果输出（done 时） */}
      <AnimatePresence>
        {isDone && result && (
          <motion.div
            className="w-full text-xs p-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              border: '1px solid rgba(0,255,65,0.25)',
              background: 'rgba(0,0,0,0.6)',
              fontFamily: 'var(--font-mono-display)',
            }}
          >
            <div style={{ color: 'rgba(0,255,65,0.4)' }}>{'> ENTITY IDENTIFIED'}</div>
            <div style={{ color: '#00ff41' }}>
              {'> NAME  :: '}
              <span style={{ color: '#ffb700', fontFamily: 'var(--font-pixel)', fontSize: '1rem' }}>
                {result.sprite.name}
              </span>
            </div>
            <div style={{ color: 'rgba(0,255,65,0.6)' }}>{'> RARITY:: '}{result.rarity}</div>
            <div style={{ color: 'rgba(0,255,65,0.6)' }}>{'> TYPE  :: '}{result.sprite.element ?? 'UNKNOWN'}</div>
            <div style={{ color: 'rgba(0,255,65,0.3)' }}>{'> STATUS:: CAPTURED \u2713'}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 按钮区 */}
      <div className="flex flex-col items-center gap-3">
        <GachaButton
          onPull={handlePull}
          disabled={isPulling || phase === 'reveal' || phase === 'glow'}
          isPulling={isPulling}
        />
        <AnimatePresence>
          {isDone && (
            <motion.button
              className="text-xs tracking-widest"
              style={{
                color: 'rgba(0,255,65,0.4)',
                fontFamily: 'var(--font-mono-display)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPhase('idle')}
            >
              {'[ RESET TERMINAL ]'}
            </motion.button>
          )}
        </AnimatePresence>

        {/* 待机状态提示 */}
        {isIdle && (
          <p
            className="text-xs"
            style={{
              color: authError ? '#ff4444' : 'rgba(0,255,65,0.3)',
              fontFamily: 'var(--font-mono-display)',
              letterSpacing: '0.15em',
            }}
          >
            {authError ? 'ERR: AUTH FAILED — CHECK SUPABASE ANON' : 'AWAITING COMMAND...'}
          </p>
        )}
      </div>
    </div>
  );
}
