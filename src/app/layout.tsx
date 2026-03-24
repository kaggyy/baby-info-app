import type { Metadata } from 'next';
import './globals.css';
import LeafBackground from '@/components/LeafBackground';

export const metadata: Metadata = {
  title: 'Sokka!',
  description: '月齢ごとの赤ちゃん・新生児のよくある困りごとと解決策をまとめたサービスです。',
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
      </body>
    </html>
  );
}
