import GachaScene from '@/components/gacha/GachaScene';

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center min-h-screen px-4 py-12 relative">
      {/* 顶部系统状态栏 */}
      <div className="fixed top-0 left-0 right-0 z-40 px-4 py-1.5 flex justify-between items-center text-xs"
           style={{ borderBottom: '1px solid rgba(0,255,65,0.15)', background: 'rgba(3,10,3,0.9)', color: 'rgba(0,255,65,0.5)', fontFamily: 'var(--font-mono-display)' }}>
        <span>SYS:SPRITE_GACHA_v2.4.1</span>
        <span>MEM:OK &nbsp;|&nbsp; DB:CONNECTED &nbsp;|&nbsp; AUTH:ANON</span>
        <span className="cursor">RDY</span>
      </div>

      {/* 主标题区 */}
      <div className="mb-12 text-center">
        <div className="text-xs mb-3" style={{ color: 'rgba(0,255,65,0.4)', fontFamily: 'var(--font-mono-display)', letterSpacing: '0.3em' }}>
          {'[ SUMMONING SYSTEM ONLINE ]'}
        </div>
        <h1
          className="text-6xl md:text-8xl font-bold tracking-widest glow-text"
          style={{ fontFamily: 'var(--font-pixel)', color: 'var(--terminal-green)', letterSpacing: '0.1em' }}
        >
          精灵召唤
        </h1>
        <div className="text-xs mt-3" style={{ color: 'rgba(0,255,65,0.4)', fontFamily: 'var(--font-mono-display)', letterSpacing: '0.2em' }}>
          {'SPRITE  //  GACHA  //  TERMINAL'}
        </div>
      </div>

      {/* 抽卡场景 */}
      <GachaScene />

      {/* 底部状态 */}
      <div className="fixed bottom-0 left-0 right-0 px-4 py-1.5 flex justify-between items-center text-xs"
           style={{ borderTop: '1px solid rgba(0,255,65,0.15)', background: 'rgba(3,10,3,0.9)', color: 'rgba(0,255,65,0.35)', fontFamily: 'var(--font-mono-display)' }}>
        <span>SPRITES:30 &nbsp;|&nbsp; POOL:ACTIVE</span>
        <span>N:60% R:25% SR:10% SSR:4% UR:1%</span>
        <span>© SPRITE SYS 2026</span>
      </div>
    </main>
  );
}
