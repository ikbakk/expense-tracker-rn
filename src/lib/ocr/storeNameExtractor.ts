import type { EnhancedOcrBlock } from '@/types/ocr';

const STORE_BLACKLIST = [
  /invoice/i,
  /no\.?/i,
  /struk/i,
  /receipt/i,
  /tanggal/i,
  /date/i,
];

export function extractStoreName(blocks: EnhancedOcrBlock[]): string | null {
  if (!blocks.length) return null;

  // candidate lines from first 6 logical lines (to be forgiving on large headers)
  const candidates = blocks
    .filter(b => b.lineNumber < 6)
    .reduce((acc: Map<number, string>, b) => {
      const prev = acc.get(b.lineNumber) || '';
      acc.set(b.lineNumber, (prev + ' ' + b.text).trim());
      return acc;
    }, new Map<number, string>());

  // score candidates and pick the best
  let best: { text: string; score: number } | null = null;

  for (const [ln, text] of candidates) {
    const lower = text.toLowerCase();
    if (STORE_BLACKLIST.some(rx => rx.test(lower))) continue;
    const words = text.split(/\s+/).filter(Boolean);
    // heuristics: longer words, presence of uppercase words, not predominantly numeric
    const uppercaseCount = words.filter(w => /^[A-Z\d\-]{2,}$/.test(w)).length;
    const numericRatio =
      text.replace(/[^\d]/g, '').length / Math.max(1, text.length);
    const score =
      words.length * 2 + uppercaseCount * 3 - Math.round(numericRatio * 10);
    if (!best || score > best.score) best = { text: text.trim(), score };
  }

  return best ? best.text : null;
}
