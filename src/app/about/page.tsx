import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = { title: 'Sokka!について | Sokka!' };

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fdf9ef] lg:flex lg:bg-[url('/bg-pc.png')] lg:bg-cover lg:bg-center lg:bg-no-repeat lg:bg-fixed">

      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:sticky lg:top-0 lg:h-screen">
        <img src="/logo-pc.svg" alt="Sokka!" width={291} height={89} />
      </div>

      <div className="lg:w-[600px] lg:shrink-0 lg:mr-[10%] lg:border-2 lg:border-white lg:shadow-[0_0_60px_rgba(0,0,0,0.05)] lg:bg-[#fdf9ef]">

        <header className="bg-[#fdf9ef] border-b border-[#F7F1E3] sticky top-0 z-20">
          <div className="max-w-md md:max-w-none mx-auto px-4 md:px-6 py-3 flex items-center gap-3">
            <Link href="/" className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-[#f6dff0] transition-colors text-[#ec75aa] shrink-0" aria-label="ホームへ戻る">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-base font-bold text-[#292524]">Sokka!について</h1>
          </div>
        </header>

        <main className="max-w-md md:max-w-none mx-auto px-4 md:px-6 pt-8 pb-12 divide-y divide-[#F7F1E3]">

          <section className="py-8 first:pt-0 space-y-3">
            <h2 className="text-[16px] font-bold text-[#3F2828]">サービス概要</h2>
            <p className="text-sm text-[#3F2828] leading-[1.7]">
              Sokka!（そっか！）は、育児中に多くの方が検索している「赤ちゃんの困りごと」を月齢別にランキング形式でお届けするサービスです。「なぜ泣き止まないの？」「これって正常？」——毎日の育児で生まれる小さな疑問に、すこし寄り添えるヒントを届けたいという思いで生まれました。
            </p>
          </section>

          <section className="py-8 space-y-3">
            <h2 className="text-[16px] font-bold text-[#3F2828]">コンセプト</h2>
            <p className="text-sm text-[#3F2828] leading-[1.7]">
              赤ちゃんのいる生活は、正解がないことだらけです。ネットで検索するたびに情報があふれ、かえって不安になることも。Sokka!では「みんなも同じことで悩んでいる」と気づけるよう、実際の検索データをもとにしたランキングを月齢別にご覧いただけます。
            </p>
            <p className="text-sm text-[#3F2828] leading-[1.7]">
              ひとりで抱え込まなくていい。そのひとことが届けばと思っています。
            </p>
          </section>

          <section className="py-8 space-y-3">
            <h2 className="text-[16px] font-bold text-[#3F2828]">ランキングデータについて</h2>
            <p className="text-sm text-[#3F2828] leading-[1.7]">
              各月齢のランキングは、育児に関する検索傾向をもとに構成しています。特定の時期に多くの方が気にしているお悩みを知ることで、「自分だけじゃない」という安心感につながることを目指しています。
            </p>
          </section>

          <section className="py-8 space-y-3">
            <h2 className="text-[16px] font-bold text-[#3F2828]">AI要約について</h2>
            <p className="text-sm text-[#3F2828] leading-[1.7]">
              各お悩みページのAI要約と実践のポイントは、生成AIを用いて作成しています。内容はあくまで参考情報であり、医療的な診断や治療の代わりとなるものではありません。気になる症状がある場合は、かかりつけの小児科医にご相談ください。
            </p>
          </section>

        </main>

        <Footer />
      </div>
    </div>
  );
}
