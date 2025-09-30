import MlkitOcr from 'react-native-mlkit-ocr';
import type { ReceiptData } from '@/types/ocr';
import { extractAmount } from './amountExtractor';
import { detectCurrency } from './currencyDetector';
import { extractDate } from './dateExtractor';
import { extractItems } from './itemsExtractor';
import { sortBlocks } from './sorter';
import { extractStoreName } from './storeNameExtractor';
import { validateReceipt } from './validator';

const TOTAL_KEYWORDS = [
  'total',
  'grand total',
  'amount',
  'bayar',
  'jumlah',
  'total belanja',
];
const SUBTOTAL_KEYWORDS = [
  'subtotal',
  'sub total',
  'sub-total',
  'jumlah sebelum',
];
const TAX_KEYWORDS = ['tax', 'ppn', 'pajak'];

export async function parseReceipt(imageUri: string): Promise<ReceiptData> {
  const ocrResult = await MlkitOcr.detectFromUri(imageUri);
  const sorted = sortBlocks(ocrResult);
  const rawText = sorted.map(b => b.text).join('\n');

  const data: ReceiptData = {
    storeName: extractStoreName(sorted),
    date: extractDate(sorted),
    currency: detectCurrency(rawText),
    items: extractItems(sorted),
    subtotal: extractAmount(sorted, SUBTOTAL_KEYWORDS),
    tax: extractAmount(sorted, TAX_KEYWORDS),
    total: extractAmount(sorted, TOTAL_KEYWORDS),
    rawText,
    allBlocks: sorted,
  };

  const validation = validateReceipt(data);
  // attach validation flags if needed (or throw/log)
  if (!validation.ok) {
    // lightweight fallback hints can be triggered here (e.g. call AI for difficult receipts)
    console.warn('receipt validation issues', validation.issues);
  }

  return data;
}
