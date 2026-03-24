export type MonthGroup = '0-1' | '2-3' | '4-6' | '7-9' | '10-12';

export interface Concern {
  id: string;
  group: MonthGroup;
  months: number[];
  title: string;
  searchKeyword: string;
  summary: string;
  tips: string[];
  relatedTopics: string[];
}

export type RankedConcern = Concern & { rank: number };

export interface RankingEntry {
  id: string;
  rank: number;
  score: number;
}
