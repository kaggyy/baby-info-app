import Link from 'next/link';
import { RankedConcern } from '@/types';

interface ConcernCardProps {
  concern: RankedConcern;
}

const BADGE_COLORS: Record<number, { fill: string; text: string }> = {
  1: { fill: '#D4A017', text: '#fff' },
  2: { fill: '#8F9BAE', text: '#fff' },
  3: { fill: '#A0632A', text: '#fff' },
};

function RankBadge({ rank }: { rank: number }) {
  const { fill, text } = BADGE_COLORS[rank] ?? { fill: '#FFF1F7', text: '#9A4B6E' };
  return (
    <div className="relative shrink-0 w-[34px] h-[44px]">
      <svg
        width="24"
        height="32"
        viewBox="0 0 24 32"
        fill="none"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <path
          d="M20.5714 0H3.42857C1.54286 0 0 1.6 0 3.55556V32L12 26.6667L24 32V3.55556C24 1.6 22.4571 0 20.5714 0Z"
          fill={fill}
        />
      </svg>
      <span
        className="absolute left-1/2 -translate-x-1/2 font-rounded font-bold text-[14px] leading-none"
        style={{ top: '13px', color: text }}
      >
        {rank}
      </span>
    </div>
  );
}

export default function ConcernCard({ concern }: ConcernCardProps) {
  const isTop3 = concern.rank <= 3;

  return (
    <Link
      href={`/concerns/${concern.id}`}
      className={`flex items-center justify-between bg-white rounded-2xl border border-[#F8F4EA] active:bg-[#F7F1E3] transition-colors lg:hover:bg-[#F7F1E3] ${
        isTop3 ? 'px-5 py-6' : 'px-5 py-[10px]'
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <RankBadge rank={concern.rank} />
        <span
          className={`font-bold text-[#292524] leading-snug ${isTop3 ? 'text-base' : 'text-sm'}`}
        >
          {concern.title}
        </span>
      </div>
      <svg
        className="shrink-0 ml-2 w-5 h-5"
        fill="none"
        stroke="#C2BDB2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
