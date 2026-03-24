'use client';

import { useState, useEffect } from 'react';
import { MonthGroup, Concern, RankedConcern, RankingEntry } from '@/types';
import TabNav from './TabNav';
import ConcernList from './ConcernList';
import Footer from './Footer';

interface HomeClientProps {
  allConcerns: Concern[];
  catchphrase: string[];
}

export default function HomeClient({ allConcerns, catchphrase }: HomeClientProps) {
  const [selectedGroup, setSelectedGroup] = useState<MonthGroup>('0-1');
  const [rankings, setRankings] = useState<RankingEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fallback = allConcerns
      .filter((c) => c.group === selectedGroup)
      .map((c, i) => ({ id: c.id, rank: i + 1, score: 0 }));
    setRankings(fallback);
    setIsLoading(false);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    fetch(`/api/rankings?group=${selectedGroup}`, { signal: controller.signal })
      .then((res) => { if (!res.ok) throw new Error(); return res.json(); })
      .then((data: RankingEntry[]) => setRankings(data))
      .catch(() => {})
      .finally(() => clearTimeout(timeoutId));

    return () => { controller.abort(); clearTimeout(timeoutId); };
  }, [selectedGroup, allConcerns]);

  const rankedConcerns: RankedConcern[] = allConcerns
    .filter((c) => c.group === selectedGroup)
    .map((c) => {
      const entry = rankings.find((r) => r.id === c.id);
      return { ...c, rank: entry?.rank ?? 999 };
    })
    .sort((a, b) => a.rank - b.rank);

  return (
    <div className="lg:flex lg:min-h-screen lg:bg-[url('/bg-pc.png')] lg:bg-cover lg:bg-center lg:bg-no-repeat lg:bg-fixed">

      {/* 左パネル: logo_pc（PC専用・sticky） */}
      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:sticky lg:top-0 lg:h-screen">
        <img src="/logo-pc.svg" alt="Sokka!" width={291} height={89} />
      </div>

      {/* 右パネル: コンテンツ（タブ幅 + 左右24px） */}
      <div className="lg:w-[600px] lg:shrink-0 lg:mr-[10%] lg:border-2 lg:border-white lg:shadow-[0_0_60px_rgba(0,0,0,0.05)] lg:bg-[#fdf9ef]">

        {/* ヘッダー（SP専用） */}
        <header className="sticky top-0 z-20 bg-[#fdf9ef] border-b border-[#F7F1E3] lg:hidden">
          <div className="max-w-md md:max-w-none mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
            <img src="/logo.svg" alt="Sokka!" width={103} height={20} />
            <p className="text-[11px] font-medium text-[#745F5F]" style={{ letterSpacing: '-0.05em' }}>
              みんなが検索した、赤ちゃんの困りごと辞典
            </p>
          </div>
        </header>

        {/* ヒーローバナー */}
        <div className="max-w-md md:max-w-none mx-auto px-3 md:px-6 pt-3">
          <div className="relative bg-[#f7f1e3] rounded-2xl overflow-hidden h-[250px]">
            <div
              className="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-[48%] lg:w-[44%]"
              style={{ fontFeatureSettings: "'palt' 1" }}
            >
              {/* SP: 各行を個別に表示 */}
              <div className="lg:hidden">
                {catchphrase.map((line, i) => (
                  <p key={i} className="font-bold text-[#3f2828] text-[16px] leading-[1.6] tracking-[-0.02em] whitespace-nowrap">
                    {line}
                  </p>
                ))}
              </div>
              {/* PC: 結合してコンテナ幅で自然に折り返す */}
              <p className="hidden lg:block font-bold text-[#3f2828] text-[20px] leading-[1.6] tracking-[-0.02em]">
                {catchphrase.join('')}
              </p>
              <p className="text-[#745f5f] text-[11px] mt-1.5"># 今日のちいさなヒント</p>
            </div>
            <img
              src="/hero-sp.png"
              alt=""
              className="md:hidden absolute right-0 top-0 h-full w-auto pointer-events-none select-none"
            />
            <img
              src="/hero-pc.png"
              alt=""
              className="hidden md:block absolute right-0 top-0 h-full w-auto pointer-events-none select-none"
            />
          </div>
        </div>

        {/* タブ（SP: top-[53px]、PC: top-0） */}
        <div className="sticky top-[53px] lg:top-0 z-[15] bg-[#fdf9ef]">
          <TabNav selected={selectedGroup} onChange={setSelectedGroup} />
        </div>

        {/* リスト */}
        <main className="max-w-md md:max-w-none mx-auto px-4 md:px-6 pb-10 pt-0">
          <ConcernList concerns={rankedConcerns} isLoading={isLoading} />
        </main>

        <Footer />

      </div>
    </div>
  );
}
