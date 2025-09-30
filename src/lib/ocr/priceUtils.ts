export function parsePrice(text: string): number | null {
  if (!text) return null;
  const cleaned = text.replace(/[Rp\$€£¥,\s]/g, '').replace(/\.(?=\d{3})/g, '');
  const num = Number(cleaned.replace(',', '.'));
  if (!isNaN(num) && isFinite(num) && num > 0) return num;
  return null;
}

export function formatCurrency(amount: number | null | undefined): string {
  if (amount == null) return '-';
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
