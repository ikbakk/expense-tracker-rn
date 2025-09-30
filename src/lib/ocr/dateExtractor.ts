import type { EnhancedOcrBlock } from '@/types/ocr';

const DATE_PATTERNS: RegExp[] = [
  /\b\d{1,2}[\-/]\d{1,2}[\-/]\d{2,4}\b/, // 29/09/2025
  /\b\d{4}[\-/]\d{1,2}[\-/]\d{1,2}\b/, // 2025-09-29
  /\b\d{1,2}\s+[A-Za-z]{3,}\s+\d{2,4}\b/, // 29 September 2025
];
const DATE_KEYWORDS = /tanggal|date|tgl|issued|printed|tanggal/i;

export function extractDate(blocks: EnhancedOcrBlock[]): string | null {
  for (const b of blocks) {
    for (const p of DATE_PATTERNS) {
      const m = b.text.match(p);
      if (m) {
        // check context: prefer lines with date keywords nearby
        if (
          DATE_KEYWORDS.test(b.text) ||
          lookForKeywordNearby(blocks, b.lineNumber, DATE_KEYWORDS)
        ) {
          return m[0];
        }
        // if no keyword but pattern looks very like a date (year present), accept
        if (/\d{4}/.test(m[0])) return m[0];
      }
    }
  }
  return null;
}

function lookForKeywordNearby(
  blocks: EnhancedOcrBlock[],
  line: number,
  rx: RegExp,
  window = 2,
): boolean {
  for (
    let i = Math.max(0, line - window);
    i <= Math.min(line + window, blocks[blocks.length - 1].lineNumber);
    i++
  ) {
    const group = blocks
      .filter(b => b.lineNumber === i)
      .map(b => b.text)
      .join(' ');
    if (rx.test(group)) return true;
  }
  return false;
}
