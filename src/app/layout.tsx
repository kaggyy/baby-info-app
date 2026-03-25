import type { Metadata } from 'next';
import './globals.css';
import LeafBackground from '@/components/LeafBackground';
import { Agentation } from 'agentation';

export const metadata: Metadata = {
  title: 'Sokka! - みんなが検索した、赤ちゃんの困りごと辞典',
  description: '毎日更新！育児のよくある困りごとを、ランキング形式でお届けします。今日いちばん多いお悩みから、順番に確認できます。',
  icons: { icon: '/favicon.png' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script>
      </head>
      <body className="antialiased bg-[#fdf9ef] min-h-screen">
        <LeafBackground />
        {children}
        {process.env.NODE_ENV === 'development' && <Agentation />}
      </body>
    </html>
  );
}
