import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = { title: 'お問い合わせ | Sokka!' };

const FAQS = [
  {
    q: '掲載情報の誤りを見つけました',
    a: 'お手数ですが、お問い合わせフォームより該当ページのURLとお気づきの点をお知らせください。内容を確認のうえ、速やかに対応いたします。',
  },
  {
    q: 'ランキングはどのように決まりますか？',
    a: '月齢ごとの育児に関する検索傾向をもとに構成しています。特定の調査機関や企業とは提携しておりません。',
  },
  {
    q: 'AI要約の内容が気になります',
    a: 'AI要約は生成AIによる参考情報です。医療的な判断が必要な場合は、必ずかかりつけの小児科医にご相談ください。内容の修正依頼はお問い合わせフォームからお送りください。',
  },
  {
    q: 'サービスの掲載・取材について',
    a: 'メディア掲載・取材・コラボレーションなどのご相談は、お問い合わせフォームよりご連絡ください。',
  },
];

export default function ContactPage() {
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
            <h1 className="text-base font-bold text-[#292524]">お問い合わせ</h1>
          </div>
        </header>

        <main className="max-w-md md:max-w-none mx-auto px-4 md:px-6 pt-8 pb-12 divide-y divide-[#F7F1E3]">

          <section className="py-8 first:pt-0 space-y-3">
            <h2 className="text-[16px] font-bold text-[#3F2828]">お問い合わせ</h2>
            <p className="text-sm text-[#3F2828] leading-[1.7]">
              ご意見・ご要望・掲載内容に関するご指摘など、お気軽にお送りください。いただいたお問い合わせには、通常3営業日以内にご返答いたします。
            </p>
            <a
              href="mailto:hello@sokka.example.com"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#ec75aa] text-white text-sm font-bold rounded-full hover:bg-[#d9619a] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              メールで問い合わせる
            </a>
          </section>

          <section className="py-8 space-y-5">
            <h2 className="text-[16px] font-bold text-[#3F2828]">よくある質問</h2>
            <div className="divide-y divide-[#F7F1E3]">
              {FAQS.map((faq, i) => (
                <div key={i} className="py-4 first:pt-0 space-y-1.5">
                  <p className="text-sm font-bold text-[#3F2828] leading-[1.7]">Q. {faq.q}</p>
                  <p className="text-sm text-[#3F2828] leading-[1.7]">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </div>
  );
}
