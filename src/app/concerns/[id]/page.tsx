import { notFound } from 'next/navigation';
import Link from 'next/link';
import { concerns, getConcernById } from '@/data/concerns';
import Footer from '@/components/Footer';

export async function generateStaticParams() {
  return concerns.map((c) => ({ id: c.id }));
}

interface Article {
  title: string;
  url: string;
  source: string;
}

function parseRSS(xml: string): Article[] {
  const articles: Article[] = [];
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];

  for (const item of items) {
    const titleRaw = item.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '';
    // "記事タイトル - メディア名" の末尾サフィックスを除去
    const title = titleRaw.replace(/<!\[CDATA\[|\]\]>/g, '').trim().replace(/\s[-–—]\s[^-–—]+$/, '');

    // description 内の href を全て抽出し、Google 以外の最初の URL を元記事 URL として使う
    const descRaw = item.match(/<description>([\s\S]*?)<\/description>/)?.[1] ?? '';
    const descHtml = descRaw.replace(/<!\[CDATA\[|\]\]>/g, '');
    const allHrefs = [...descHtml.matchAll(/href=["']([^"']+)["']/g)].map(
      (m) => m[1].replace(/&amp;/g, '&')
    );
    const articleUrl = allHrefs.find((h) => !h.includes('google.com')) ?? '';

    // 取得できなければ <link> / <guid> にフォールバック
    const linkRaw =
      item.match(/<link>([\s\S]*?)<\/link>/)?.[1] ??
      item.match(/<guid[^>]*>([\s\S]*?)<\/guid>/)?.[1] ??
      '';
    const url = articleUrl || linkRaw.trim();

    const sourceRaw = item.match(/<source[^>]*>([\s\S]*?)<\/source>/)?.[1] ?? '';
    const source = sourceRaw.replace(/<!\[CDATA\[|\]\]>/g, '').trim();

    if (title && url) articles.push({ title, url, source });
  }

  return articles.slice(0, 5);
}

async function getRelatedArticles(keyword: string): Promise<Article[]> {
  try {
    const query = encodeURIComponent(`${keyword} 育児`);
    const res = await fetch(
      `https://news.google.com/rss/search?q=${query}&hl=ja&gl=JP&ceid=JP:ja`,
      { next: { revalidate: 3600 } }
    );
    const xml = await res.text();
    return parseRSS(xml);
  } catch {
    return [];
  }
}

interface Props {
  params: { id: string };
}

const GROUP_LABELS: Record<string, string> = {
  '0-1': '0-1ヶ月',
  '2-3': '2-3ヶ月',
  '4-6': '4-6ヶ月',
  '7-9': '7-9ヶ月',
  '10-12': '10-12ヶ月',
};

function SparklesIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  );
}

function NewspaperIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
  );
}

export default async function ConcernPage({ params }: Props) {
  const concern = getConcernById(params.id);
  if (!concern) notFound();

  const articles = await getRelatedArticles(concern.searchKeyword);

  return (
    <div className="min-h-screen bg-[#fdf9ef] lg:flex lg:bg-[url('/bg-pc.png')] lg:bg-cover lg:bg-center lg:bg-no-repeat lg:bg-fixed">

      {/* 左パネル: logo_pc（PC専用・sticky） */}
      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:sticky lg:top-0 lg:h-screen">
        <img src="/logo-pc.svg" alt="Sokka!" width={291} height={89} />
      </div>

      {/* 右パネル */}
      <div className="lg:w-[600px] lg:shrink-0 lg:mr-[10%] lg:border-2 lg:border-white lg:shadow-[0_0_60px_rgba(0,0,0,0.05)] lg:bg-[#fdf9ef]">

      {/* Header */}
      <header className="bg-[#fdf9ef] border-b border-[#F7F1E3] sticky top-0 z-20">
        <div className="max-w-md mx-auto lg:max-w-none px-4 py-3 flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-[#f6dff0] transition-colors text-[#ec75aa] shrink-0"
            aria-label="ホームへ戻る"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="min-w-0">
            <p className="text-xs text-[#745f5f]">{GROUP_LABELS[concern.group]}</p>
            <h1 className="text-base font-bold text-[#292524] leading-tight truncate">{concern.title}</h1>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto lg:max-w-none px-4 lg:px-6 py-6 space-y-12 pb-12">

        {/* AI による要約 + 実践のポイント */}
        <section className="bg-white rounded-2xl p-5 border border-[#F8F4EA]">
          <div className="mb-5">
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-[#ec75aa]"><SparklesIcon /></span>
              <span className="text-xs font-bold bg-gradient-to-r from-[#ec75aa] to-violet-400 bg-clip-text text-transparent">
                AI による要約
              </span>
            </div>
            <p className="text-[18px] font-bold text-[#292524] leading-[1.7]">{concern.summary}</p>
          </div>

          <div className="h-1 bg-[#fdf9ef] -mx-5 mb-6" />

          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-[#ec75aa]"><LightbulbIcon /></span>
              <h2 className="text-xs font-bold text-[#ec75aa] uppercase tracking-wide">実践のポイント</h2>
            </div>
            <ul className="space-y-2">
              {concern.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-[7px] w-2 h-2 rounded-full bg-[#ec75aa] shrink-0" />
                  <span className="text-base font-medium text-[#292524] leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 関連記事 */}
        {articles.length > 0 && (
          <section className="px-3">
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-[#ec75aa]"><NewspaperIcon /></span>
              <h2 className="text-xs font-bold text-[#ec75aa] uppercase tracking-wide">関連記事</h2>
            </div>
            <div className="flex flex-col divide-y divide-[#F7F1E3]">
              {articles.map((article, i) => (
                <a
                  key={i}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 first:pt-0 last:pb-0 flex items-start justify-between gap-3 group"
                >
                  <div className="min-w-0">
                    <p className="text-base font-medium text-[#3F2828] group-hover:text-[#ec75aa] transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </p>
                    {article.source && (
                      <p className="text-xs text-[#745f5f] mt-1">{article.source}</p>
                    )}
                  </div>
                  <svg className="w-4 h-4 text-[#C2BDB2] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* 関連するお悩み */}
        {concern.relatedTopics.length > 0 && (
          <section className="px-3">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-[#ec75aa]"><ChatIcon /></span>
              <h2 className="text-xs font-bold text-[#ec75aa] uppercase tracking-wide">関連するお悩み</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {concern.relatedTopics.map((topic) => {
                const related = concerns.find((c) => c.title === topic);
                return related ? (
                  <Link
                    key={topic}
                    href={`/concerns/${related.id}`}
                    className="px-3 py-1.5 bg-[#F7F1E3] text-[#3F2828] text-sm rounded-full font-medium min-h-[36px] flex items-center hover:bg-[#ede7d5] transition-colors"
                  >
                    {topic}
                  </Link>
                ) : (
                  <span key={topic} className="px-3 py-1.5 bg-[#F7F1E3] text-[#3F2828] text-sm rounded-full font-medium">
                    {topic}
                  </span>
                );
              })}
            </div>
          </section>
        )}
      </main>

      <Footer />

      </div>
    </div>
  );
}
