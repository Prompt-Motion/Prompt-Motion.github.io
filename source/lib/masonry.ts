const COLS = [
  { cols: 1, refColWidth: 400 },
  { cols: 2, refColWidth: 360 },
  { cols: 3, refColWidth: 400 },
  { cols: 4, refColWidth: 310 },
] as const;

function round5(value: number) {
  return Math.round(value * 1e5) / 1e5;
}

export type Placement = { col: number; a: number; b: number };

/** Same packer as the original gallery: shortest column, caption 44px + gap 20px. */
export function packMasonry(ratios: number[]) {
  const items: Placement[][] = ratios.map(() => []);
  const columns: { a: number; b: number }[][] = [];

  for (const { cols, refColWidth } of COLS) {
    const heights = Array.from({ length: cols }, () => ({ a: 0, b: 0 }));
    ratios.forEach((ratio, index) => {
      let best = 0;
      for (let i = 1; i < cols; i++) {
        const here = heights[i].a * refColWidth + heights[i].b;
        const lead = heights[best].a * refColWidth + heights[best].b;
        if (here < lead - 0.5) best = i;
      }
      const column = heights[best];
      items[index].push({ col: best, a: round5(column.a), b: column.b });
      column.a += ratio;
      column.b += 64;
    });
    columns.push(heights.map((height) => ({ a: round5(height.a), b: Math.max(0, height.b - 20) })));
  }

  return { items, columns };
}

export function masonryVars(columns: { a: number; b: number }[][]): Record<string, string> {
  const style: Record<string, string> = {};
  columns.forEach((cols, index) => {
    const count = COLS[index].cols;
    const parts = cols.map((col) => `calc(${col.a} * var(--colw) + ${col.b}px)`);
    style[`--h${count}`] = parts.length === 1 ? parts[0] : `max(${parts.join(", ")})`;
  });
  return style;
}

export function itemVars(places: Placement[]): Record<string, string> {
  const style: Record<string, string> = {};
  places.forEach((place, index) => {
    const count = COLS[index].cols;
    style[`--x${count}`] = String(place.col);
    style[`--a${count}`] = String(place.a);
    style[`--b${count}`] = `${place.b}px`;
  });
  return style;
}
