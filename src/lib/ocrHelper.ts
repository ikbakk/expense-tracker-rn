import MlkitOcr from 'react-native-mlkit-ocr';

// Simplified types for backend
export interface ReceiptItem {
  itemName: string;
  quantity: number;
  price: number;
}

export interface ParsedReceipt {
  totalAmount: number | null;
  merchantName: string;
  date: string | undefined;
  items?: ReceiptItem[]; // Optional for now
}

interface OcrBlock {
  text: string;
  bounding: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

interface SortedBlock extends OcrBlock {
  lineNumber: number;
}

/**
 * Main function - Parse receipt for backend
 */
export const parseReceiptForBackend = async (
  imageUri: string,
): Promise<ParsedReceipt> => {
  const ocrResult: OcrBlock[] = await MlkitOcr.detectFromUri(imageUri);

  // Sort blocks in reading order
  const sortedBlocks = sortBlocks(ocrResult);
  const lines = groupIntoLines(sortedBlocks);
  const allText = lines.join('\n');

  return {
    totalAmount: extractTotal(sortedBlocks, lines),
    merchantName: extractMerchantName(sortedBlocks),
    date: extractDate(allText),
    // items: extractItems(sortedBlocks, lines), // Optional
  };
};

/**
 * Sort blocks top-to-bottom, left-to-right
 */
const sortBlocks = (blocks: OcrBlock[]): SortedBlock[] => {
  if (!blocks || blocks.length === 0) return [];

  // Calculate adaptive threshold
  const heights = blocks.map(b => b.bounding.height).sort((a, b) => a - b);
  const medianHeight = heights[Math.floor(heights.length / 2)] || 15;
  const lineThreshold = Math.max(medianHeight * 0.7, 10);

  // Group into lines
  const lines: OcrBlock[][] = [];
  const sorted = [...blocks].sort((a, b) => a.bounding.top - b.bounding.top);

  for (const block of sorted) {
    const existingLine = lines.find(
      line =>
        Math.abs(line[0].bounding.top - block.bounding.top) < lineThreshold,
    );

    if (existingLine) {
      existingLine.push(block);
    } else {
      lines.push([block]);
    }
  }

  // Sort each line left-to-right
  for (const line of lines) {
    line.sort((a, b) => a.bounding.left - b.bounding.left);
  }

  // Flatten with line numbers
  const result: SortedBlock[] = [];
  lines.forEach((line, lineIndex) => {
    line.forEach(block => {
      result.push({ ...block, lineNumber: lineIndex });
    });
  });

  return result;
};

/**
 * Group blocks into text lines
 */
const groupIntoLines = (blocks: SortedBlock[]): string[] => {
  const lineMap = new Map<number, string[]>();

  for (const block of blocks) {
    const existing = lineMap.get(block.lineNumber) || [];
    existing.push(block.text);
    lineMap.set(block.lineNumber, existing);
  }

  const lines: string[] = [];
  const maxLine = Math.max(...Array.from(lineMap.keys()));

  for (let i = 0; i <= maxLine; i++) {
    const line = lineMap.get(i);
    if (line) {
      lines.push(line.join(' ').trim());
    }
  }

  return lines;
};

/**
 * Extract merchant name - ONLY the very first line
 */
const extractMerchantName = (blocks: SortedBlock[]): string => {
  if (blocks.length === 0) return 'Unknown Merchant';

  // Get only line 0 (very top)
  const firstLine = blocks
    .filter(b => b.lineNumber === 0)
    .map(b => b.text)
    .join(' ')
    .trim();

  return firstLine || 'Unknown Merchant';
};

/**
 * Extract date - return undefined if not found
 */
const extractDate = (text: string): string | undefined => {
  const patterns = [
    /\d{1,2}[-/.]\d{1,2}[-/.]\d{2,4}/, // DD-MM-YYYY, MM-DD-YYYY
    /\d{4}[-/.]\d{1,2}[-/.]\d{1,2}/, // YYYY-MM-DD
    /\d{1,2}\s+\w{3,9}\s+\d{2,4}/, // DD Month YYYY
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return match[0];
  }

  return undefined;
};

/**
 * Extract total amount - always pick rightmost number in the line
 */
const extractTotal = (
  blocks: SortedBlock[],
  lines: string[],
): number | null => {
  const totalKeywords = [
    'total belanja',
    'jumlah',
    'total',
    'grand total',
    'amount',
    'bayar',
  ];

  // Look for keyword + rightmost number
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLowerCase();

    if (totalKeywords.some(kw => line.includes(kw))) {
      // Get all blocks in this line
      const sameLine = blocks.filter(b => b.lineNumber === i);

      // Find all valid prices and sort by position (rightmost first)
      const prices = sameLine
        .map(b => ({
          block: b,
          price: parsePrice(b.text),
          left: b.bounding.left,
        }))
        .filter(p => p.price !== null && p.price! > 0)
        .sort((a, b) => b.left - a.left); // Rightmost first

      // Return the rightmost price
      if (prices.length > 0) {
        return prices[0].price;
      }

      // Try next line if nothing found
      if (i + 1 < lines.length) {
        const nextLine = blocks.filter(b => b.lineNumber === i + 1);
        const nextPrices = nextLine
          .map(b => ({
            block: b,
            price: parsePrice(b.text),
            left: b.bounding.left,
          }))
          .filter(p => p.price !== null && p.price! > 0)
          .sort((a, b) => b.left - a.left);

        if (nextPrices.length > 0) {
          return nextPrices[0].price;
        }
      }
    }
  }

  // Fallback: Get largest number from last 5 lines (rightmost preference)
  const lastLinesStart = Math.max(0, lines.length - 5);
  const lastLineNumbers = Array.from(
    { length: 5 },
    (_, i) => lastLinesStart + i,
  );

  const prices = blocks
    .filter(b => lastLineNumbers.includes(b.lineNumber))
    .map(b => ({ price: parsePrice(b.text), left: b.bounding.left }))
    .filter(p => p.price !== null && p.price! > 0)
    .sort((a, b) => b.price! - a.price!); // Largest first

  return prices.length > 0 ? prices[0].price : null;
};

/**
 * Extract items with smart column detection
 * ALWAYS picks the rightmost price in each line
 * Handles: [qty] [item] [price] OR [item] [qty] [price] OR [item] [price]
 */
const extractItems = (
  blocks: SortedBlock[],
  lines: string[],
): ReceiptItem[] => {
  const items: ReceiptItem[] = [];

  // Skip first 3 lines (header) and last 5 lines (totals)
  const startLine = 3;
  const endLine = Math.max(startLine, lines.length - 5);

  const lineMap = new Map<number, SortedBlock[]>();
  for (const b of blocks) {
    const existing = lineMap.get(b.lineNumber) || [];
    existing.push(b);
    lineMap.set(b.lineNumber, existing);
  }

  for (let i = startLine; i < endLine; i++) {
    const lineBlocks = lineMap.get(i);
    if (!lineBlocks || lineBlocks.length === 0) continue;

    // Skip lines with total keywords
    const lineText = lines[i].toLowerCase();
    if (
      ['total', 'subtotal', 'tax', 'pajak', 'ppn'].some(kw =>
        lineText.includes(kw),
      )
    ) {
      continue;
    }

    // ALWAYS pick the rightmost valid price
    const sortedByPosition = [...lineBlocks].sort(
      (a, b) => b.bounding.left - a.bounding.left,
    );

    let priceBlock: SortedBlock | null = null;
    let priceValue: number | null = null;

    // Find first valid price from right to left
    for (const block of sortedByPosition) {
      const price = parsePrice(block.text);
      if (price !== null && price > 0) {
        priceBlock = block;
        priceValue = price;
        break;
      }
    }

    if (!priceBlock || priceValue === null) continue;

    const priceIndex = lineBlocks.indexOf(priceBlock);

    // Get all blocks before price (potential item name + quantity)
    const beforePrice = lineBlocks.slice(0, priceIndex);
    if (beforePrice.length === 0) continue;

    let itemName: string;
    let quantity = 1;

    // Check each block for quantity pattern
    const quantityBlocks: number[] = [];
    beforePrice.forEach((block, idx) => {
      if (/^(\d{1,3})x?$/i.test(block.text.trim())) {
        quantityBlocks.push(idx);
      }
    });

    if (quantityBlocks.length > 0) {
      // Found quantity block(s)
      // Get the last quantity block (closest to price)
      const qtyIdx = quantityBlocks[quantityBlocks.length - 1];
      const qtyMatch = beforePrice[qtyIdx].text.match(/^(\d{1,3})x?$/i);
      if (qtyMatch) {
        quantity = parseInt(qtyMatch[1]);
      }

      // Item name is everything except quantity blocks
      itemName = beforePrice
        .filter((_, idx) => !quantityBlocks.includes(idx))
        .map(b => b.text)
        .join(' ')
        .trim();
    } else {
      // No quantity found, everything is item name
      itemName = beforePrice
        .map(b => b.text)
        .join(' ')
        .trim();
    }

    if (itemName.length > 1) {
      items.push({
        itemName,
        quantity,
        price: priceValue,
      });
    }
  }

  return items;
};

/**
 * Parse price from text
 */
const parsePrice = (text: string): number | null => {
  if (!text) return null;

  const cleaned = text.replace(/[Rp$€£¥₹]/gi, '').trim();

  const formats = [
    {
      regex: /^[\d,]+\.\d{2}$/,
      parse: (s: string) => parseFloat(s.replace(/,/g, '')),
    },
    {
      regex: /^[\d.]+,\d{2}$/,
      parse: (s: string) => parseFloat(s.replace(/\./g, '').replace(',', '.')),
    },
    {
      regex: /^[\d,]+$/,
      parse: (s: string) => parseFloat(s.replace(/,/g, '')),
    },
    { regex: /^\d+\.?\d*$/, parse: (s: string) => parseFloat(s) },
  ];

  for (const { regex, parse } of formats) {
    if (regex.test(cleaned)) {
      const num = parse(cleaned);
      if (!isNaN(num) && num > 0) return num;
    }
  }

  return null;
};
