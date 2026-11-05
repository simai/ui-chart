// Fewer points than pixels (docs/research/rendering.md §2): a path with more
// than two points per pixel column of the plot draws nothing the eye can
// tell apart, so it keeps, per column, the first, the lowest, the highest
// and the last point. Peaks and dips survive; the shape is the same.

/**
 * The indexes to draw of `values` at x pixels `px` (sorted), for a plot
 * `width` px wide. Gaps (null) are kept, so a line still breaks where data
 * is missing. Returns every index when there are few enough.
 */
export function minMaxIndexes(px, values, width, {limit = 2} = {}) {
  const n = values.length;
  if (n <= Math.max(4, width * limit)) return Array.from({length: n}, (_, index) => index);
  const keep = [];
  let column = null;
  let first = -1;
  let low = -1;
  let high = -1;
  let last = -1;
  const flush = () => {
    if (first === -1) return;
    for (const index of [...new Set([first, low, high, last])].sort((a, b) => a - b)) keep.push(index);
    first = low = high = last = -1;
  };
  for (let index = 0; index < n; index += 1) {
    const value = values[index];
    if (value === null) {
      flush();
      keep.push(index);
      column = null;
      continue;
    }
    const at = Math.floor(px[index]);
    if (at !== column) {
      flush();
      column = at;
    }
    if (first === -1) {
      first = low = high = index;
    }
    if (value < values[low]) low = index;
    if (value > values[high]) high = index;
    last = index;
  }
  flush();
  return keep;
}
