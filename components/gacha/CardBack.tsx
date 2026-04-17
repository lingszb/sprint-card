export default function CardBack() {
  return (
    <div className="w-64 h-96 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-600 flex items-center justify-center relative overflow-hidden shadow-2xl">
      {/* 背景几何纹样 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #6366f1 0%, transparent 60%)' }} />
        <div className="absolute top-4 left-4 right-4 bottom-4 border border-indigo-500/30 rounded-xl" />
        <div className="absolute top-8 left-8 right-8 bottom-8 border border-indigo-500/20 rounded-xl" />
      </div>
      {/* 中央 Pokéball 风格图案 */}
      <div className="relative z-10 w-32 h-32 rounded-full border-4 border-slate-600 bg-gradient-to-b from-slate-700 to-slate-900 flex items-center justify-center shadow-inner">
        <div className="w-28 h-0.5 bg-slate-500 absolute" />
        <div className="w-10 h-10 rounded-full bg-slate-800 border-4 border-slate-600 z-10" />
      </div>
      {/* 角落装饰 */}
      <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-indigo-500/50 rounded-tl-lg" />
      <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-indigo-500/50 rounded-tr-lg" />
      <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-indigo-500/50 rounded-bl-lg" />
      <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-indigo-500/50 rounded-br-lg" />
    </div>
  );
}
