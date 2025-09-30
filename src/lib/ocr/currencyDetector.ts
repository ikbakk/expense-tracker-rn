export function detectCurrency(blocksText: string): string | null {
  const match = blocksText.match(/\b(Rp|IDR|USD|EUR|GBP|¥|\$|£)\b/i);
  return match ? match[1] : null;
}
