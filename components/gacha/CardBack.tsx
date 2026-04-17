export default function CardBack() {
  return (
    <div
      className="w-64 h-96 flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #030a03 0%, #050f05 100%)',
        border: '1px solid rgba(0,255,65,0.2)',
        boxShadow: '0 0 15px rgba(0,255,65,0.05), inset 0 0 30px rgba(0,0,0,0.8)',
      }}
    >
      {/* 矩阵雨背景字符 */}
      <div
        className="absolute inset-0 flex flex-col justify-center items-center opacity-10 overflow-hidden"
        style={{
          fontFamily: 'var(--font-mono-display)',
          fontSize: '0.6rem',
          color: '#00ff41',
          lineHeight: '1.2',
        }}
      >
        {Array.from({ length: 18 }, (_, i) => (
          <div key={i} style={{ letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
            {Array.from({ length: 32 }, (_, j) =>
              String.fromCharCode(33 + ((i * 7 + j * 13) % 90))
            ).join('')}
          </div>
        ))}
      </div>

      {/* 中央图案 */}
      <div className="relative z-10 text-center">
        <pre
          className="text-sm leading-tight"
          style={{
            fontFamily: 'var(--font-mono-display)',
            color: 'rgba(0,255,65,0.6)',
            textShadow: '0 0 8px rgba(0,255,65,0.4)',
          }}
        >
{`╔══════════╗
║ ██████ ║
║ █ SG █ ║
║ ██████ ║
║ SYSTEM ║
╚══════════╝`}
        </pre>
        <p
          className="text-xs mt-3"
          style={{
            color: 'rgba(0,255,65,0.3)',
            fontFamily: 'var(--font-mono-display)',
            letterSpacing: '0.3em',
          }}
        >
          SPRITE·GACHA
        </p>
        <p
          className="text-xs"
          style={{
            color: 'rgba(0,255,65,0.2)',
            fontFamily: 'var(--font-mono-display)',
            letterSpacing: '0.2em',
          }}
        >
          v2.4.1 // CLASSIFIED
        </p>
      </div>

      {/* 角落装饰 */}
      <div className="absolute top-2 left-2 w-4 h-4" style={{ borderTop: '1px solid rgba(0,255,65,0.3)', borderLeft: '1px solid rgba(0,255,65,0.3)' }} />
      <div className="absolute top-2 right-2 w-4 h-4" style={{ borderTop: '1px solid rgba(0,255,65,0.3)', borderRight: '1px solid rgba(0,255,65,0.3)' }} />
      <div className="absolute bottom-2 left-2 w-4 h-4" style={{ borderBottom: '1px solid rgba(0,255,65,0.3)', borderLeft: '1px solid rgba(0,255,65,0.3)' }} />
      <div className="absolute bottom-2 right-2 w-4 h-4" style={{ borderBottom: '1px solid rgba(0,255,65,0.3)', borderRight: '1px solid rgba(0,255,65,0.3)' }} />
    </div>
  );
}
