import type { EnhancedOcrBlock, OcrBlock } from '@/types/ocr';

export function sortBlocks(blocks: OcrBlock[]): EnhancedOcrBlock[] {
  if (!blocks || !blocks.length) return [];

  const blocksWithDistance = blocks.map(b => ({
    ...b,
    distanceFromOrigin: Math.hypot(b.bounding.left, b.bounding.top),
  }));

  const threshold = calculateAdaptiveThreshold(blocks);

  const lineGroups: {
    avgTop: number;
    minTop: number;
    maxTop: number;
    blocks: OcrBlock[];
  }[] = [];
  const byTop = [...blocksWithDistance].sort(
    (a, b) => a.distanceFromOrigin - b.distanceFromOrigin,
  );

  for (const block of byTop) {
    let placed = false;
    for (const g of lineGroups) {
      if (Math.abs(block.bounding.top - g.avgTop) < threshold) {
        g.blocks.push(block);
        g.minTop = Math.min(g.minTop, block.bounding.top);
        g.maxTop = Math.max(g.maxTop, block.bounding.top);
        g.avgTop = (g.minTop + g.maxTop) / 2;
        placed = true;
        break;
      }
    }
    if (!placed) {
      lineGroups.push({
        avgTop: block.bounding.top,
        minTop: block.bounding.top,
        maxTop: block.bounding.top,
        blocks: [block],
      });
    }
  }

  lineGroups.sort((a, b) => a.avgTop - b.avgTop);
  lineGroups.forEach(g =>
    g.blocks.sort((a, b) => a.bounding.left - b.bounding.left),
  );

  const flattened: EnhancedOcrBlock[] = [];
  lineGroups.forEach((g, idx) => {
    for (const b of g.blocks) {
      flattened.push({
        ...(b as OcrBlock),
        lineNumber: idx,
        lineBlocks: g.blocks.length,
        distanceFromOrigin: Math.hypot(b.bounding.left, b.bounding.top),
      });
    }
  });

  return flattened;
}

function calculateAdaptiveThreshold(blocks: OcrBlock[]): number {
  if (!blocks.length) return 14;
  const heights = blocks.map(b => b.bounding.height).sort((a, b) => a - b);
  const median = heights[Math.floor(heights.length / 2)] || 14;
  return Math.max(10, median * 0.7);
}
