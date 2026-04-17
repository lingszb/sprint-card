import GachaScene from '@/components/gacha/GachaScene';

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center min-h-screen px-4 py-12">
      <h1 className="text-5xl font-extrabold mb-10 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent drop-shadow-lg tracking-wide">
        精灵抽卡
      </h1>
      <GachaScene />
    </main>
  );
}
