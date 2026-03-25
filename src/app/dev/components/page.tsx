'use client';

import { useState } from 'react';
import TabNav from '@/components/TabNav';
import ConcernCard from '@/components/ConcernCard';
import Footer from '@/components/Footer';
import { MonthGroup } from '@/types';

const SAMPLE_CONCERNS = [
  { id: 'jaundice',              group: '0-1' as MonthGroup, months: [0],    rank: 1, title: '黄疸が出ているけど大丈夫？',              searchKeyword: '', summary: '', tips: [], relatedTopics: [] },
  { id: 'breastfeeding',         group: '0-1' as MonthGroup, months: [0, 1], rank: 2, title: '母乳がうまく出ないけどどうすればいい？',   searchKeyword: '', summary: '', tips: [], relatedTopics: [] },
  { id: 'crying',                group: '0-1' as MonthGroup, months: [0, 1], rank: 3, title: '赤ちゃんがずっと泣き止まないのはなぜ？',   searchKeyword: '', summary: '', tips: [], relatedTopics: [] },
  { id: 'weight',                group: '0-1' as MonthGroup, months: [0, 1], rank: 4, title: '赤ちゃんの体重が増えないけど大丈夫？',     searchKeyword: '', summary: '', tips: [], relatedTopics: [] },
  { id: 'navel',                 group: '0-1' as MonthGroup, months: [0],    rank: 5, title: 'おへそがじゅくじゅくしているけど大丈夫？', searchKeyword: '', summary: '', tips: [], relatedTopics: [] },
];

function SectionLabel({ name }: { name: string }) {
  return (
    <p className="text-[11px] font-bold text-[#745f5f] uppercase tracking-widest mb-3 px-4">
      {name}
    </p>
  );
}

function Divider() {
  return <div className="h-8 bg-[#f0ebe0]" />;
}

export default function ComponentsPage() {
  const [tab, setTab] = useState<MonthGroup>('0-1');

  return (
    <div className="bg-[#fdf9ef] min-h-screen" style={{ maxWidth: 375 }}>

      {/* ── Header ── */}
      <Divider />
      <SectionLabel name="Header" />
      <div id="component-header">
        <header className="bg-[#fdf9ef] border-b border-[#F7F1E3]">
          <div className="px-4 py-4 flex items-center justify-between">
            <img src="/logo.svg" alt="Sokka!" width={103} height={20} />
            <p className="text-[11px] font-medium text-[#745F5F]" style={{ letterSpacing: '-0.05em' }}>
              みんなが検索した、赤ちゃんの困りごと辞典
            </p>
          </div>
        </header>
      </div>

      {/* ── Header (detail page) ── */}
      <Divider />
      <SectionLabel name="Header / Detail" />
      <div id="component-header-detail">
        <header className="bg-[#fdf9ef] border-b border-[#F7F1E3]">
          <div className="px-4 py-3 flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#f6dff0] text-[#ec75aa] shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-xs text-[#745f5f]">0-1ヶ月</p>
              <h1 className="text-base font-bold text-[#292524] leading-tight truncate">黄疸が出ているけど大丈夫？</h1>
            </div>
          </div>
        </header>
      </div>

      {/* ── Hero Banner ── */}
      <Divider />
      <SectionLabel name="Hero Banner" />
      <div id="component-hero" className="px-3">
        <div className="relative bg-[#f7f1e3] rounded-2xl overflow-hidden h-[250px]">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-[48%]" style={{ fontFeatureSettings: "'palt' 1" }}>
            {['授乳後は背中を', 'やさしくトントン。', 'ゲップを出すと、', '吐き戻しが', '減りますよ。'].map((line, i) => (
              <p key={i} className="font-bold text-[#3f2828] text-[16px] leading-[1.6] tracking-[-0.02em] whitespace-nowrap">
                {line}
              </p>
            ))}
            <p className="text-[#745f5f] text-[11px] mt-1.5"># 今日のちいさなヒント</p>
          </div>
          <img src="/hero-sp.png" alt="" className="absolute right-0 top-0 h-full w-auto pointer-events-none select-none" />
        </div>
      </div>

      {/* ── TabNav ── */}
      <Divider />
      <SectionLabel name="TabNav" />
      <div id="component-tabnav" className="bg-[#fdf9ef]">
        <TabNav selected={tab} onChange={setTab} />
      </div>

      {/* ── ConcernCard / Rank 1-3 ── */}
      <Divider />
      <SectionLabel name="ConcernCard / Rank 1–3" />
      <div id="component-cards-top3" className="px-4 flex flex-col gap-2">
        {SAMPLE_CONCERNS.slice(0, 3).map((c) => (
          <ConcernCard key={c.id} concern={c} />
        ))}
      </div>

      {/* ── ConcernCard / Rank 4+ ── */}
      <Divider />
      <SectionLabel name="ConcernCard / Rank 4+" />
      <div id="component-cards-rest" className="px-4 flex flex-col gap-2">
        {SAMPLE_CONCERNS.slice(3).map((c) => (
          <ConcernCard key={c.id} concern={c} />
        ))}
      </div>

      {/* ── AI Summary Card ── */}
      <Divider />
      <SectionLabel name="AI Summary Card" />
      <div id="component-ai-summary" className="px-4">
        <div className="bg-white rounded-2xl p-5 border border-[#F8F4EA]">
          <div className="mb-5">
            <div className="flex items-center gap-1.5 mb-3">
              <svg className="w-4 h-4 shrink-0 text-[#ec75aa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
              </svg>
              <span className="text-xs font-bold bg-gradient-to-r from-[#ec75aa] to-violet-400 bg-clip-text text-transparent">
                AI による要約
              </span>
            </div>
            <p className="text-[18px] font-bold text-[#292524] leading-[1.7]">
              生理的黄疸は生後2〜3日に現れ、通常1〜2週間で自然に改善します。肌や白目の黄色みが強い・範囲が広い場合は早めに医師へ相談しましょう。
            </p>
          </div>
          <div className="h-1 bg-[#fdf9ef] -mx-5 mb-6" />
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <svg className="w-4 h-4 shrink-0 text-[#ec75aa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
              </svg>
              <h2 className="text-xs font-bold text-[#ec75aa] uppercase tracking-wide">実践のポイント</h2>
            </div>
            <ul className="space-y-2">
              {['母乳をしっかり飲ませて排便・排尿を促す', '1日8〜12回の授乳を心がける', '黄色みが胸・腹・足へ広がる場合はすぐ受診', '光線療法は安全で効果的な治療法'].map((tip, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-[7px] w-2 h-2 rounded-full bg-[#ec75aa] shrink-0" />
                  <span className="text-base font-medium text-[#292524] leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Related Articles ── */}
      <Divider />
      <SectionLabel name="Related Articles" />
      <div id="component-related-articles" className="px-4">
        <div className="px-3">
          <div className="flex items-center gap-1.5 mb-3">
            <svg className="w-4 h-4 shrink-0 text-[#ec75aa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
            </svg>
            <h2 className="text-xs font-bold text-[#ec75aa] uppercase tracking-wide">関連記事</h2>
          </div>
          <div className="flex flex-col divide-y divide-[#F7F1E3]">
            {[
              { title: '新生児黄疸とは？原因・症状・治療法を小児科医が解説', source: 'こそだてハック' },
              { title: '赤ちゃんの黄疸、いつまで続く？自宅でできるケアと受診の目安', source: 'mamari' },
              { title: '母乳性黄疸ってどんな状態？ミルクに切り替えるべき？', source: 'ベビーカレンダー' },
            ].map((a, i) => (
              <div key={i} className="py-3 first:pt-0 last:pb-0 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-base font-medium text-[#3F2828] leading-snug line-clamp-2">{a.title}</p>
                  <p className="text-xs text-[#745f5f] mt-1">{a.source}</p>
                </div>
                <svg className="w-4 h-4 text-[#C2BDB2] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Related Topics ── */}
      <Divider />
      <SectionLabel name="Related Topics" />
      <div id="component-related-topics" className="px-4">
        <div className="px-3">
          <div className="flex items-center gap-1.5 mb-2">
            <svg className="w-4 h-4 shrink-0 text-[#ec75aa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
            <h2 className="text-xs font-bold text-[#ec75aa] uppercase tracking-wide">関連するお悩み</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {['母乳がうまく出ないけどどうすればいい？', '赤ちゃんの体重が増えないけど大丈夫？'].map((topic) => (
              <span key={topic} className="px-3 py-1.5 bg-[#F7F1E3] text-[#3F2828] text-sm rounded-full font-medium min-h-[36px] flex items-center">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <Divider />
      <SectionLabel name="Footer" />
      <div id="component-footer">
        <Footer />
      </div>

      <div className="h-8" />
    </div>
  );
}
