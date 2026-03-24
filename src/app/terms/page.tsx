import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = { title: 'ご利用にあたって | Sokka!' };

export default function TermsPage() {
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
            <h1 className="text-base font-bold text-[#292524]">ご利用にあたって</h1>
          </div>
        </header>

        <main className="max-w-md md:max-w-none mx-auto px-4 md:px-6 pt-8 pb-12 divide-y divide-[#F7F1E3]">

          <section className="py-8 first:pt-0 space-y-3">
            <h2 className="text-[16px] font-bold text-[#3F2828]">免責事項</h2>
            <p className="text-sm text-[#3F2828] leading-[1.7]">
              Sokka!に掲載されている情報は、一般的な育児の参考情報として提供しています。掲載内容の正確性・完全性・最新性については万全を期しておりますが、これを保証するものではありません。
            </p>
            <p className="text-sm text-[#3F2828] leading-[1.7]">
              本サービスの情報を利用したことによって生じたいかなる損害についても、当サービスは責任を負いかねます。
            </p>
          </section>

          <section className="py-8 space-y-3">
            <h2 className="text-[16px] font-bold text-[#3F2828]">医療・健康情報について</h2>
            <p className="text-sm text-[#3F2828] leading-[1.7]">
              本サービスで提供する情報は、医療行為や診断・治療の代替となるものではありません。お子さまの健康状態や症状について不安がある場合は、必ずかかりつけの小児科医または医療機関にご相談ください。
            </p>
            <p className="text-sm text-[#3F2828] leading-[1.7]">
              AI要約・実践のポイントは生成AIによって作成された参考情報であり、専門家の医学的見解とは異なる場合があります。
            </p>
          </section>

          <section className="py-8 space-y-3">
            <h2 className="text-[16px] font-bold text-[#3F2828]">著作権</h2>
            <p className="text-sm text-[#3F2828] leading-[1.7]">
              Sokka!に掲載されているテキスト・画像・デザイン等のコンテンツは、当サービスまたは正当な権利を有する第三者に帰属します。無断での転載・複製・改変・商用利用を禁じます。
            </p>
          </section>

          <section className="py-8 space-y-3">
            <h2 className="text-[16px] font-bold text-[#3F2828]">外部リンクについて</h2>
            <p className="text-sm text-[#3F2828] leading-[1.7]">
              関連記事として表示されるリンクは外部サイトへのリンクです。リンク先のコンテンツ・サービスについて当サービスは責任を負いかねます。また、リンク先サービスの利用規約・プライバシーポリシーをご確認のうえご利用ください。
            </p>
          </section>

          <section className="py-8 space-y-3">
            <h2 className="text-[16px] font-bold text-[#3F2828]">プライバシーについて</h2>
            <p className="text-sm text-[#3F2828] leading-[1.7]">
              本サービスでは、サービス改善を目的としてアクセス解析ツールを使用する場合があります。収集した情報は個人を特定するものではなく、第三者への提供は行いません。
            </p>
          </section>

        </main>

        <Footer />
      </div>
    </div>
  );
}
