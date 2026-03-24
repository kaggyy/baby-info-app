import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#4C4343] px-4 lg:px-6 py-5">
      <div className="flex items-center justify-between gap-3 min-w-0">
        <img
          src="/logo.svg"
          alt="Sokka!"
          className="shrink min-w-0"
          style={{ height: '15px', maxWidth: '80px', width: 'auto', filter: 'brightness(0) invert(1)' }}
        />
        <nav className="flex items-center gap-3 flex-nowrap shrink-0">
          <Link href="/about" className="text-[#FDF9EF] text-[11px] whitespace-nowrap hover:opacity-70 transition-opacity">
            Sokka!について
          </Link>
          <Link href="/terms" className="text-[#FDF9EF] text-[11px] whitespace-nowrap hover:opacity-70 transition-opacity">
            ご利用にあたって
          </Link>
          <Link href="/contact" className="text-[#FDF9EF] text-[11px] whitespace-nowrap hover:opacity-70 transition-opacity">
            お問い合わせ
          </Link>
        </nav>
      </div>
    </footer>
  );
}
