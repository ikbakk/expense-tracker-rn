import type { ReceiptData } from '@/types/ocr';

export function validateReceipt(r: ReceiptData) {
  const issues: string[] = [];
  const sumItems = r.items.reduce(
    (s, it) => s + it.price * (it.quantity || 1),
    0,
  );
  if (
    r.total != null &&
    sumItems > 0 &&
    Math.abs(sumItems - (r.total || 0)) / Math.max(1, r.total || 1) > 0.05
  ) {
    issues.push('total_mismatch');
  }
  if (r.date) {
    const t = Date.parse(r.date.replace(/\./g, '/'));
    if (!isNaN(t) && t > Date.now() + 1000 * 60 * 60 * 24)
      issues.push('future_date');
  }
  return { ok: issues.length === 0, issues };
}
