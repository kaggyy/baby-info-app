import { RankedConcern } from '@/types';
import ConcernCard from './ConcernCard';

interface ConcernListProps {
  concerns: RankedConcern[];
  isLoading?: boolean;
}

export default function ConcernList({ concerns, isLoading = false }: ConcernListProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl px-5 py-6 shadow-sm animate-pulse flex items-center gap-2"
          >
            <div className="shrink-0 w-[34px] h-[44px] flex items-center justify-center">
              <div className="w-6 h-8 bg-stone-200 rounded" />
            </div>
            <div className="flex-1 h-4 bg-stone-200 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  if (concerns.length === 0) {
    return (
      <p className="text-center text-stone-400 py-12 text-sm">この月齢のお悩みはありません</p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {concerns.map((concern) => (
        <ConcernCard key={concern.id} concern={concern} />
      ))}
    </div>
  );
}
