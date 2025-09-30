export interface BoundingBox {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface OcrBlock {
  text: string;
  bounding: BoundingBox;
}

export interface EnhancedOcrBlock extends OcrBlock {
  lineNumber: number;
  lineBlocks: number;
  distanceFromOrigin: number;
}

export interface ReceiptItem {
  name: string;
  quantity: number;
  price: number;
  priceText: string;
  line: number;
  rawLine: string;
}

export interface ReceiptData {
  storeName: string | null;
  date: string | null;
  currency: string | null;
  items: ReceiptItem[];
  subtotal: number | null;
  tax: number | null;
  total: number | null;
  rawText: string;
  allBlocks: EnhancedOcrBlock[];
}

export interface Payload {
  amount_cents: string;
  category: string;
  merchant: string;
  description: string;
  date: string;
}
