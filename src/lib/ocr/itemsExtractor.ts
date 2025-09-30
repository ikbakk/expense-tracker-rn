import { parsePrice } from './priceUtils';
import type { EnhancedOcrBlock, ReceiptItem } from '@/types/ocr';

const QTY_PATTERNS = [/^(\d+)x$/i, /^qty[:\s]*(\d+)/i, /\b(\d+)\s*x\b/i];

export function extractItems(blocks: EnhancedOcrBlock[]): ReceiptItem[] {
  const items: ReceiptItem[] = [];
  const lineMap = new Map<number, EnhancedOcrBlock[]>();
  blocks.forEach(b => {
    const arr = lineMap.get(b.lineNumber) || [];
    arr.push(b);
    lineMap.set(b.lineNumber, arr);
  });

  const maxLine = Math.max(...blocks.map(b => b.lineNumber));

  for (let i = 0; i <= maxLine; i++) {
    const lineBlocks = lineMap.get(i);
    if (!lineBlocks || !lineBlocks.length) continue;
    const lineText = lineBlocks
      .map(b => b.text)
      .join(' ')
      .trim();

    // simple heuristics to skip headers/footers quickly
    if (isLikelyHeaderFooter(lineText, i, maxLine)) continue;

    // find price candidates (rightmost positive parse)
    const priceCandidates = lineBlocks
      .map(b => ({
        text: b.text,
        val: parsePrice(b.text),
        left: b.bounding.left,
      }))
      .filter(p => p.val !== null)
      .sort((a, b) => b.left - a.left);

    if (!priceCandidates.length) continue;
    const price = priceCandidates[0];

    // assume item name is everything left of the price block
    let splitIndex = lineBlocks.findIndex(lb => lb.text === price.text);
    if (splitIndex < 0) splitIndex = Math.max(0, lineBlocks.length - 2);

    const nameParts = lineBlocks
      .slice(0, splitIndex)
      .map(l => l.text)
      .filter(Boolean);
    let qty = 1;
    // detect quantity in nameParts or via patterns
    for (const p of QTY_PATTERNS) {
      const m = nameParts.join(' ').match(p);
      if (m) {
        qty = parseInt(m[1]);
        break;
      }
    }

    const name = nameParts
      .join(' ')
      .replace(/\b(qty|x)[:]?\s*\d+\b/i, '')
      .trim();
    if (!name || name.length < 2) continue;

    items.push({
      name,
      quantity: qty,
      price: price.val as number,
      priceText: price.text,
      line: i,
      rawLine: lineText,
    });
  }

  return items;
}

function isLikelyHeaderFooter(
  text: string,
  lineIndex: number,
  maxLine: number,
) {
  const lower = text.toLowerCase();
  if (lineIndex < 2) return true; // treat top 2 lines as header candidates
  if (
    lineIndex > maxLine - 3 &&
    /(total|subtotal|paid|change|terima kasih|thank)/i.test(lower)
  )
    return true;
  return false;
}
