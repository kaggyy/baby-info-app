'use client';

import { MonthGroup } from '@/types';

const GROUPS: { value: MonthGroup }[] = [
  { value: '0-1' },
  { value: '2-3' },
  { value: '4-6' },
  { value: '7-9' },
  { value: '10-12' },
];

interface TabNavProps {
  selected: MonthGroup;
  onChange: (group: MonthGroup) => void;
}

export default function TabNav({ selected, onChange }: TabNavProps) {
  return (
    <div className="overflow-x-auto scrollbar-hide lg:overflow-visible pt-3 pb-2">
      <div className="flex gap-[6px] px-4 min-w-max lg:min-w-0 lg:justify-center">
        {GROUPS.map((g) => (
          <button
            key={g.value}
            onClick={() => onChange(g.value)}
            className={`flex items-center justify-center lg:flex-1 px-5 py-[9px] text-[14px] font-medium rounded-full whitespace-nowrap transition-colors min-h-[38px] border-2 ${
              selected === g.value
                ? 'bg-[#ec75aa] border-[#ec75aa] text-white'
                : 'bg-transparent border-[#ec75aa] text-[#ec75aa] hover:bg-[#fdf0f7]'
            }`}
            aria-selected={selected === g.value}
            role="tab"
          >
            <span className="font-rounded">{g.value}</span>
            <span className="font-bold">ヶ月</span>
          </button>
        ))}
      </div>
    </div>
  );
}
