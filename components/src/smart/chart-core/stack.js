// Stacks (docs/research/parameters.md §7): series laid on one another at each
// x. Positive values climb from zero, negative ones go down from it, so a
// stack of mixed signs never overlaps itself. A gap is a gap: it adds
// nothing and the segment is null, never a zero-height bar.

/**
 * For each series one segment per x, [from, to], or null for a gap.
 * `mode` is none (every segment from zero), stacked or normalized (each
 * x's stack as shares of its total of absolute values, 0..1).
 */
export function stackSeries(series, mode = 'none') {
  const count = series.reduce((most, one) => Math.max(most, one.values.length), 0);
  const totals = new Array(count).fill(0);
  if (mode === 'normalized') {
    for (const one of series) {
      one.values.forEach((value, index) => {
        if (value !== null) totals[index] += Math.abs(value);
      });
    }
  }
  const up = new Array(count).fill(0);
  const down = new Array(count).fill(0);
  return series.map((one) => one.values.map((raw, index) => {
    if (raw === null) return null;
    if (mode === 'none') return [0, raw];
    const value = mode === 'normalized' ? (totals[index] ? raw / totals[index] : 0) : raw;
    const ground = value < 0 ? down : up;
    const from = ground[index];
    ground[index] = from + value;
    return [from, ground[index]];
  }));
}

/** The smallest and largest end of all segments, zero always in: [min, max]. */
export function stackExtent(segments) {
  let min = 0;
  let max = 0;
  for (const one of segments) {
    for (const segment of one) {
      if (!segment) continue;
      min = Math.min(min, segment[0], segment[1]);
      max = Math.max(max, segment[0], segment[1]);
    }
  }
  return [min, max];
}
