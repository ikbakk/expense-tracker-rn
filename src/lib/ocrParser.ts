import MlkitOcr from 'react-native-mlkit-ocr';

// Types
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
  distanceFromOrigin: number; // For sorting optimization
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
  storeName: string;
  date: string | null;
  items: ReceiptItem[];
  subtotal: number | null;
  tax: number | null;
  total: number | null;
  rawText: string;
  allBlocks: EnhancedOcrBlock[];
}

export interface ReceiptTable {
  header: string[];
  rows: string[][];
  footer: string[][];
}

interface PriceCandidate {
  text: string;
  value: number;
  position: number;
}

interface LineGroup {
  avgTop: number;
  minTop: number;
  maxTop: number;
  blocks: OcrBlock[];
}

/**
 * Parse receipt OCR results into structured data
 */
export const parseReceipt = async (imageUri: string): Promise<ReceiptData> => {
  const ocrResult: OcrBlock[] = await MlkitOcr.detectFromUri(imageUri);

  // Sort blocks by position (top to bottom, left to right)
  const sortedBlocks = sortReceiptBlocksOptimized(ocrResult);

  // Extract structured data
  const receiptData: ReceiptData = {
    storeName: extractStoreName(sortedBlocks),
    date: extractDate(sortedBlocks),
    items: extractLineItems(sortedBlocks),
    subtotal: extractAmount(sortedBlocks, [
      'subtotal',
      'sub total',
      'sub-total',
    ]),
    tax: extractAmount(sortedBlocks, ['tax', 'ppn', 'pajak']),
    total: extractAmount(sortedBlocks, [
      'total',
      'grand total',
      'amount',
      'total belanja',
      'Total Belanja',
      'subtotal',
      'sub total',
      'sub-total',
    ]),
    rawText: sortedBlocks.map(b => b.text).join('\n'),
    allBlocks: sortedBlocks,
  };

  return receiptData;
};

/**
 * OPTIMIZED: Sort OCR blocks using distance from origin algorithm
 * Based on research: https://vigneshgig.medium.com/bounding-box-sorting-algorithm
 *
 * This is faster than nested loops and handles multi-column layouts better
 */
const sortReceiptBlocksOptimized = (
  ocrResult: OcrBlock[],
): EnhancedOcrBlock[] => {
  if (!ocrResult || ocrResult.length === 0) return [];

  // Step 1: Calculate distance from origin for each block
  // This helps identify the natural reading order
  const blocksWithDistance = ocrResult.map(block => ({
    ...block,
    distanceFromOrigin: Math.sqrt(
      Math.pow(block.bounding.left, 2) + Math.pow(block.bounding.top, 2),
    ),
  }));

  // Step 2: Group blocks into lines using adaptive threshold
  const lineThreshold = calculateAdaptiveThreshold(ocrResult);
  const lineGroups: LineGroup[] = [];

  // Sort by distance first for faster line grouping
  const sortedByDistance = [...blocksWithDistance].sort(
    (a, b) => a.distanceFromOrigin - b.distanceFromOrigin,
  );

  sortedByDistance.forEach(block => {
    // Find existing line within threshold
    let foundLine = false;

    for (const line of lineGroups) {
      if (Math.abs(block.bounding.top - line.avgTop) < lineThreshold) {
        line.blocks.push(block);
        // Update line metrics
        line.minTop = Math.min(line.minTop, block.bounding.top);
        line.maxTop = Math.max(line.maxTop, block.bounding.top);
        line.avgTop = (line.minTop + line.maxTop) / 2;
        foundLine = true;
        break;
      }
    }

    if (!foundLine) {
      lineGroups.push({
        avgTop: block.bounding.top,
        minTop: block.bounding.top,
        maxTop: block.bounding.top,
        blocks: [block],
      });
    }
  });

  // Step 3: Sort lines by avgTop, then sort blocks within lines by left position
  lineGroups.sort((a, b) => a.avgTop - b.avgTop);

  lineGroups.forEach(line => {
    line.blocks.sort((a, b) => a.bounding.left - b.bounding.left);
  });

  // Step 4: Flatten with line numbers
  const flattened: EnhancedOcrBlock[] = [];
  lineGroups.forEach((line, lineIndex) => {
    line.blocks.forEach(block => {
      flattened.push({
        ...block,
        lineNumber: lineIndex,
        lineBlocks: line.blocks.length,
      });
    });
  });

  return flattened;
};

/**
 * OPTIMIZATION: Calculate adaptive threshold based on median block height
 * This makes the algorithm work better with different font sizes
 */
const calculateAdaptiveThreshold = (blocks: OcrBlock[]): number => {
  if (blocks.length === 0) return 15;

  // Get all block heights
  const heights = blocks.map(b => b.bounding.height).sort((a, b) => a - b);

  // Use median height as base
  const medianHeight = heights[Math.floor(heights.length / 2)];

  // Threshold is 0.7x median height (empirically good for receipts)
  return Math.max(medianHeight * 0.7, 10);
};

/**
 * Extract store name (usually at the top)
 */
const extractStoreName = (blocks: EnhancedOcrBlock[]): string => {
  if (blocks.length === 0) return '';

  // Take first few lines as potential store name
  const topLines = blocks
    .filter(b => b.lineNumber < 3)
    .map(b => b.text)
    .join(' ');

  return topLines || blocks[0]?.text || '';
};

/**
 * OPTIMIZATION: Precompile regex patterns (done once at module load)
 */
const DATE_PATTERNS: RegExp[] = [
  /\d{1,2}[-/]\d{1,2}[-/]\d{2,4}/,
  /\d{4}[-/]\d{1,2}[-/]\d{1,2}/,
  /\d{1,2}\s+[A-Za-z]+\s+\d{2,4}/,
];

const extractDate = (blocks: EnhancedOcrBlock[]): string | null => {
  for (const block of blocks) {
    for (const pattern of DATE_PATTERNS) {
      const match = block.text.match(pattern);
      if (match) return match[0];
    }
  }
  return null;
};

/**
 * OPTIMIZATION: Use Map for faster line lookups
 */
const extractLineItems = (blocks: EnhancedOcrBlock[]): ReceiptItem[] => {
  const items: ReceiptItem[] = [];

  // Group by line number using Map for O(1) lookups
  const lineMap = new Map<number, EnhancedOcrBlock[]>();
  blocks.forEach(block => {
    const existing = lineMap.get(block.lineNumber) || [];
    existing.push(block);
    lineMap.set(block.lineNumber, existing);
  });

  const maxLine = Math.max(...blocks.map(b => b.lineNumber));

  for (let lineIndex = 0; lineIndex <= maxLine; lineIndex++) {
    const line = lineMap.get(lineIndex);
    if (!line || line.length === 0) continue;

    const lineText = line.map(b => b.text).join(' ');

    // Skip header/footer lines
    if (isHeaderOrFooter(lineText, lineIndex, maxLine + 1)) continue;

    // Find prices in line (rightmost priority)
    const prices: PriceCandidate[] = line
      .map(b => ({
        text: b.text,
        value: parsePrice(b.text),
        position: b.bounding.left,
      }))
      .filter((p): p is PriceCandidate => p.value !== null)
      .sort((a, b) => b.position - a.position);

    if (prices.length > 0) {
      const priceBlock = line.find(b => b.text === prices[0].text);
      if (!priceBlock) continue;

      const priceIndex = line.indexOf(priceBlock);
      const itemName = line
        .slice(0, priceIndex)
        .map(b => b.text)
        .join(' ')
        .trim();

      // Extract quantity
      const quantityPattern = /^(\d+)x?$/i;
      const quantityMatch = line
        .slice(0, priceIndex)
        .map(b => b.text.match(quantityPattern))
        .find(m => m !== null);

      const quantity = quantityMatch ? parseInt(quantityMatch[1]) : 1;

      if (itemName && itemName.length > 1) {
        items.push({
          name: itemName,
          quantity,
          price: prices[0].value,
          priceText: prices[0].text,
          line: lineIndex,
          rawLine: lineText,
        });
      }
    }
  }

  return items;
};

/**
 * OPTIMIZATION: Precompile footer keywords
 */
const FOOTER_KEYWORDS = [
  'total',
  'subtotal',
  'tax',
  'cash',
  'card',
  'change',
  'thank',
  'terima kasih',
  'visit',
  'ppn',
  'pajak',
  'payment',
];

const isHeaderOrFooter = (
  text: string,
  lineIndex: number,
  totalLines: number,
): boolean => {
  const lowerText = text.toLowerCase();

  // Skip first few lines (store name, address)
  if (lineIndex < 3) return true;

  // Skip last few lines with footer keywords
  if (lineIndex > totalLines - 5) {
    return FOOTER_KEYWORDS.some(kw => lowerText.includes(kw));
  }

  return false;
};

/**
 * OPTIMIZATION: Use Map for O(1) line lookups
 */
const extractAmount = (
  blocks: EnhancedOcrBlock[],
  keywords: string[],
): number | null => {
  const keywordPattern = new RegExp(keywords.join('|'), 'i');

  // Create line map for faster lookups
  const lineMap = new Map<number, EnhancedOcrBlock[]>();
  blocks.forEach(block => {
    const existing = lineMap.get(block.lineNumber) || [];
    existing.push(block);
    lineMap.set(block.lineNumber, existing);
  });

  for (const block of blocks) {
    if (keywordPattern.test(block.text)) {
      // Check same line first
      const sameLine = lineMap.get(block.lineNumber) || [];

      for (const b of sameLine) {
        if (b.bounding.left > block.bounding.left) {
          const price = parsePrice(b.text);
          if (price !== null) return price;
        }
      }

      // Check next line
      const nextLine = lineMap.get(block.lineNumber + 1) || [];
      for (const b of nextLine) {
        const price = parsePrice(b.text);
        if (price !== null) return price;
      }
    }
  }

  return null;
};

/**
 * OPTIMIZATION: Precompile price patterns and use early returns
 */
interface PriceFormat {
  regex: RegExp;
  parser: (cleaned: string) => number;
}

const PRICE_FORMATS: PriceFormat[] = [
  {
    regex: /^[\d,]+\.\d{2}$/,
    parser: s => parseFloat(s.replace(/,/g, '')),
  },
  {
    regex: /^[\d.]+,\d{2}$/,
    parser: s => parseFloat(s.replace(/\./g, '').replace(',', '.')),
  },
  {
    regex: /^[\d,]+$/,
    parser: s => parseFloat(s.replace(/,/g, '')),
  },
  {
    regex: /^\d+\.?\d*$/,
    parser: s => parseFloat(s),
  },
];

const parsePrice = (text: string): number | null => {
  if (!text) return null;

  const cleaned = text.replace(/[Rp$€£¥₹]/gi, '').trim();

  for (const { regex, parser } of PRICE_FORMATS) {
    if (regex.test(cleaned)) {
      const num = parser(cleaned);
      if (!isNaN(num) && num > 0) return num;
    }
  }

  return null;
};

/**
 * Get receipt as table format
 */
export const getReceiptAsTable = (receiptData: ReceiptData): ReceiptTable => {
  const table: ReceiptTable = {
    header: ['Item', 'Qty', 'Price', 'Total'],
    rows: receiptData.items.map(item => [
      item.name,
      item.quantity.toString(),
      formatCurrency(item.price),
      formatCurrency(item.price * item.quantity),
    ]),
    footer: [
      ['Subtotal', '', '', formatCurrency(receiptData.subtotal)],
      ['Tax', '', '', formatCurrency(receiptData.tax)],
      ['Total', '', '', formatCurrency(receiptData.total)],
    ],
  };

  return table;
};

/**
 * Format number as currency
 */
const formatCurrency = (amount: number | null | undefined): string => {
  if (amount === null || amount === undefined) return '-';
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};
