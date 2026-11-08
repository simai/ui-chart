// The boxes of a box plot (docs/research/catalogue.md, Box plot): for each
// group the median, the quartiles, the whiskers and the outliers of one
// measure. The rows are raw observations (the statistics are worked out
// here), or one row per group with the statistics already given.
import {readNumber, readRows} from '../../chart-core/data.js';

/** The p-quantile of sorted numbers, linear between the two nearest (as R's type 7, NumPy's and a spreadsheet's). */
export function quantile(sorted, p) {
  if (!sorted.length) return null;
  const at = (sorted.length - 1) * p;
  const low = Math.floor(at);
  const high = Math.ceil(at);
  return sorted[low] + (sorted[high] - sorted[low]) * (at - low);
}

/**
 * The statistics of one group: {n, min, q1, median, q3, max, low, high,
 * outliers, mean}, or null with no values. With whiskers 'tukey' a whisker
 * reaches the farthest value within 1.5 interquartile ranges of its box and
 * the values past it are outliers; with 'range' it reaches the extreme and
 * there are none.
 */
export function boxStats(values, whiskers = 'tukey') {
  const sorted = values.filter((value) => value !== null).sort((a, b) => a - b);
  if (!sorted.length) return null;
  const q1 = quantile(sorted, 0.25);
  const q3 = quantile(sorted, 0.75);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  let low = min;
  let high = max;
  let outliers = [];
  if (whiskers !== 'range') {
    const reach = 1.5 * (q3 - q1);
    const inside = sorted.filter((value) => value >= q1 - reach && value <= q3 + reach);
    low = inside[0];
    high = inside[inside.length - 1];
    outliers = sorted.filter((value) => value < low || value > high);
  }
  return {
    n: sorted.length, min, q1, median: quantile(sorted, 0.5), q3, max, low, high, outliers,
    mean: sorted.reduce((sum, value) => sum + value, 0) / sorted.length,
  };
}

const GIVEN = ['min', 'q1', 'median', 'q3', 'max'];

/** Statistics given in a row ({min, q1, median, q3, max, mean?}), or null when one is missing or out of order. */
export function givenStats(row) {
  const [min, q1, median, q3, max] = GIVEN.map((name) => readNumber(row[name]));
  if ([min, q1, median, q3, max].some((value) => value === null)) return null;
  if (!(min <= q1 && q1 <= median && median <= q3 && q3 <= max)) return null;
  return {n: null, min, q1, median, q3, max, low: min, high: max, outliers: [], mean: readNumber(row.mean)};
}

/**
 * The model of a box plot: {kind: 'category', xField, yField, keys, xs,
 * labels, series: [{key, name, boxes}], missing}.
 *
 * `x` is the group (the first field when unset), `y` the measure (the first
 * numeric field other than x and series); `series` splits each group into
 * boxes side by side. With stats 'given', each row is a group whose min,
 * q1, median, q3 and max are given; a row without them is left out. Groups
 * keep the data's first-seen order. A box is null where a series has no
 * value in a group.
 */
export function boxSeries(items, {x = '', y = '', series = '', stats = 'raw', whiskers = 'tukey', names = {}} = {}) {
  const rows = readRows(items);
  const fields = rows.length ? Object.keys(rows[0]) : [];
  const xField = x || fields[0] || '';
  const given = stats === 'given';
  const yField = given ? '' : y || fields.find((name) => name !== xField && name !== series && rows.some((row) => readNumber(row[name]) !== null)) || '';
  const groups = new Map();
  const keys = new Map();
  let missing = 0;
  for (const row of rows) {
    const group = row[xField] === undefined || row[xField] === null ? '' : String(row[xField]);
    const key = series ? (row[series] === undefined || row[series] === null ? '' : String(row[series])) : (yField || 'box');
    const value = given ? givenStats(row) : readNumber(row[yField]);
    if (value === null) {
      missing += 1;
      continue;
    }
    if (!groups.has(group)) groups.set(group, groups.size);
    if (!keys.has(key)) keys.set(key, new Map());
    const own = keys.get(key);
    if (!own.has(group)) own.set(group, []);
    own.get(group).push(value);
  }
  const labels = [...groups.keys()];
  const out = [...keys].map(([key, own]) => ({
    key,
    name: names[key] ?? key,
    boxes: labels.map((group) => {
      const values = own.get(group);
      if (!values) return null;
      return given ? values[0] : boxStats(values, whiskers);
    }),
  }));
  return {kind: 'category', xField, yField, keys: labels, xs: labels.map((_, index) => index), labels, series: out, missing};
}
