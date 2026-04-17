import type { Metadata } from 'next';
import { Share_Tech_Mono, VT323 } from 'next/font/google';
import './globals.css';

const shareTechMono = Share_Tech_Mono({
  weight: '400',
  variable: '--font-mono-display',
  subsets: ['latin'],
});

const vt323 = VT323({
  weight: '400',
  variable: '--font-pixel',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '精灵召唤终端 // SPRITE GACHA SYS',
  description: '[ SYSTEM ONLINE ] 召唤你的精灵',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className={`${shareTechMono.variable} ${vt323.variable} h-full dark`}>
      <body className="terminal-body min-h-screen flex flex-col overflow-x-hidden">
        <div className="scanlines" aria-hidden="true" />
        <div className="noise" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
