import { NextRequest, NextResponse } from 'next/server';
import googleTrends from 'google-trends-api';
import { concerns } from '@/data/concerns';
import { MonthGroup, RankingEntry } from '@/types';

const cache = new Map<string, { data: RankingEntry[]; expiry: number }>();
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
const VALID_GROUPS: MonthGroup[] = ['0-1', '2-3', '4-6', '7-9', '10-12'];

async function fetchBatch(keywords: string[]): Promise<number[]> {
  const rawJson = await googleTrends.interestOverTime({
    keyword: keywords,
    geo: 'JP',
    hl: 'ja',
  });
  const parsed = JSON.parse(rawJson);
  const timelineData: Array<{ value: number[] }> = parsed?.default?.timelineData ?? [];
  if (timelineData.length === 0) return keywords.map(() => 0);

  const sums = new Array(keywords.length).fill(0);
  for (const point of timelineData) {
    point.value.forEach((v: number, i: number) => {
      sums[i] += v;
    });
  }
  return sums.map((s) => Math.round(s / timelineData.length));
}

async function fetchTrendsScores(keywords: string[]): Promise<number[]> {
  if (keywords.length === 0) return [];
  if (keywords.length === 1) return [100];
  if (keywords.length <= 5) return fetchBatch(keywords);

  // Anchor normalization for >5 keywords
  const anchor = keywords[0];
  const rest = keywords.slice(1);
  const BATCH_SIZE = 4;

  const firstBatch = [anchor, ...rest.slice(0, BATCH_SIZE)];
  const firstScores = await fetchBatch(firstBatch);
  const anchorBase = firstScores[0] || 1;

  const allScores: number[] = new Array(keywords.length).fill(0);
  allScores[0] = anchorBase;
  for (let i = 0; i < Math.min(BATCH_SIZE, rest.length); i++) {
    allScores[i + 1] = firstScores[i + 1];
  }

  for (let batchStart = BATCH_SIZE; batchStart < rest.length; batchStart += BATCH_SIZE) {
    await new Promise((r) => setTimeout(r, 400));
    const batchKeywords = rest.slice(batchStart, batchStart + BATCH_SIZE);
    const batchScores = await fetchBatch([anchor, ...batchKeywords]);
    const anchorInBatch = batchScores[0] || 1;
    const ratio = anchorBase / anchorInBatch;
    batchKeywords.forEach((_, i) => {
      allScores[1 + batchStart + i] = Math.round(batchScores[i + 1] * ratio);
    });
  }

  return allScores;
}

export async function GET(request: NextRequest) {
  const group = request.nextUrl.searchParams.get('group') as MonthGroup;

  if (!VALID_GROUPS.includes(group)) {
    return NextResponse.json({ error: 'Invalid group' }, { status: 400 });
  }

  const cached = cache.get(group);
  if (cached && Date.now() < cached.expiry) {
    return NextResponse.json(cached.data);
  }

  const groupConcerns = concerns.filter((c) => c.group === group);

  try {
    const keywords = groupConcerns.map((c) => c.searchKeyword);
    const scores = await fetchTrendsScores(keywords);

    const ranked: RankingEntry[] = groupConcerns
      .map((c, i) => ({ id: c.id, score: scores[i] ?? 0 }))
      .sort((a, b) => b.score - a.score)
      .map((entry, idx) => ({ ...entry, rank: idx + 1 }));

    cache.set(group, { data: ranked, expiry: Date.now() + CACHE_TTL_MS });
    return NextResponse.json(ranked);
  } catch (err) {
    console.error('Google Trends error:', err);
    const fallback: RankingEntry[] = groupConcerns.map((c, i) => ({
      id: c.id,
      rank: i + 1,
      score: 0,
    }));
    return NextResponse.json(fallback);
  }
}
