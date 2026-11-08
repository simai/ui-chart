// The bins of a histogram (docs/research/catalogue.md, Histogram): the rows
// are observations of one measure, cut into intervals of one width, and each
// bar is the count (or the sum of a weight) of the rows in its interval. An
// interval holds its start and not its end, but the last holds both, so the
// largest value is counted.
import {readNumber, readRows} from '../../chart-core/data.js';
import {niceTicks} from '../../chart-core/scale.js';

/**
 * The bins' edges for values from `min` to `max`: {start, width, count}.
 * `bin` is 'auto' (about Sturges' count of bins for `n` values, on a round
 * width) or a width; the edges fall on multiples of the width.
 */
export function binEdges(min, max, n, bin = 'auto') {
  const asked = readNumber(bin);
  let width = asked !== null && asked > 0 ? asked : 0;
  if (!width) {
    const wanted = Math.max(1, Math.min(50, Math.ceil(Math.log2(Math.max(1, n)) + 1)));
    width = max > min ? niceTicks(min, max, wanted, {nice: false}).step : 1;
  }
  const start = Math.floor(min / width + 1e-9) * width;
  let count = Math.max(1, Math.ceil((max - start) / width - 1e-9));
  // The largest value on an edge belongs to the last bin, not a new one.
  if (start + count * width < max) count += 1;
  return {start: Number(start.toPrecision(12)), width, count: Math.min(count, 1000)};
}

/** The place of a value among the bins, or -1 outside them. */
export function binOf(value, {start, width, count}) {
  if (value < start) return -1;
  const place = Math.floor((value - start) / width + 1e-9);
  if (place < count) return place;
  return value <= start + count * width + width * 1e-9 ? count - 1 : -1;
}

/** The middle value of a list of numbers, or null when it is empty. */
export function median(values) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = sorted.length >> 1;
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

/**
 * The model of a histogram in the shape of chart-core/data's readSeries:
 * {kind: 'bin', xField, keys, xs, labels, series, bins, width, missing}.
 *
 * `x` is the measure (the first numeric field when unset); `y` a weight
 * field to sum, or a count when unset; `series` splits the rows. A series
 * keeps its raw values, so the summary can say its median. A row without
 * the measure is left out and counted.
 */
export function binSeries(items, {x = '', y = '', series = '', bin = 'auto', names = {}, countName = 'count'} = {}) {
  const rows = readRows(items);
  const fields = rows.length ? Object.keys(rows[0]) : [];
  const xField = x || fields.find((name) => name !== series && rows.some((row) => readNumber(row[name]) !== null)) || '';
  const weight = String(y || '').split(',')[0].trim();
  const groups = new Map();
  let missing = 0;
  let min = Infinity;
  let max = -Infinity;
  const kept = [];
  for (const row of rows) {
    const value = readNumber(row[xField]);
    if (value === null) {
      missing += 1;
      continue;
    }
    const key = series ? (row[series] === undefined || row[series] === null ? '' : String(row[series])) : (weight || countName);
    if (!groups.has(key)) groups.set(key, []);
    kept.push([key, value, weight ? readNumber(row[weight]) ?? 0 : 1]);
    groups.get(key).push(value);
    if (value < min) min = value;
    if (value > max) max = value;
  }
  if (!kept.length) return {kind: 'bin', xField, keys: [], xs: [], labels: [], series: [], bins: [], width: 0, missing};
  const edges = binEdges(min, max, kept.length, bin);
  const bins = Array.from({length: edges.count}, (_, index) => {
    const from = Number((edges.start + index * edges.width).toPrecision(12));
    return {from, to: Number((from + edges.width).toPrecision(12))};
  });
  const out = [...groups.keys()].map((key) => ({
    key,
    name: names[key] ?? (series || weight ? key : countName),
    values: new Array(bins.length).fill(0),
    raw: groups.get(key),
  }));
  const at = new Map(out.map((one, place) => [one.key, place]));
  for (const [key, value, amount] of kept) {
    const place = binOf(value, edges);
    if (place >= 0) out[at.get(key)].values[place] += amount;
  }
  const labels = bins.map(({from, to}) => `${from}–${to}`);
  return {kind: 'bin', xField, keys: labels, xs: bins.map((_, index) => index), labels, series: out, bins, width: edges.width, missing};
}
