import type { EnhancedOcrBlock } from '@/types/ocr';
import { parsePrice } from './priceUtils';

export function extractAmount(
  blocks: EnhancedOcrBlock[],
  keywords: string[],
): number | null {
  const kw = new RegExp(keywords.join('|'), 'i');
  // Create fast map of lines
  const lineMap = new Map<number, EnhancedOcrBlock[]>();
  blocks.forEach(b => {
    const arr = lineMap.get(b.lineNumber) || [];
    arr.push(b);
    lineMap.set(b.lineNumber, arr);
  });

  for (const b of blocks) {
    if (kw.test(b.text)) {
      const sameLine = lineMap.get(b.lineNumber) || [];
      // prefer rightmost number on same line
      const rightMost = [...sameLine]
        .reverse()
        .map(s => parsePrice(s.text))
        .find(v => v !== null);
      if (rightMost) return rightMost;
      const nextLine = lineMap.get(b.lineNumber + 1) || [];
      const next = nextLine.map(s => parsePrice(s.text)).find(v => v !== null);
      if (next) return next;
    }
  }
  return null;
}
