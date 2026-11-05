// The data a chart is given, read once into one shape (docs/research/parameters.md §1).
//
// `items` is a list of records ([{month: '2026-01', sales: 12}, …]) or an
// object of columns ({month: [...], sales: [...]}). The mapping names the
// fields: `x`, `y` (one field, or a comma list for the wide form, one series
// per field) and `series` (the long form: one series per distinct value of
// that field). A missing value is a gap, never a zero.

const TIME_TEXT = /^\d{4}-\d{2}(-\d{2}([T ]\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:?\d{2})?)?)?$/u;

/** A list of records from records or columns; anything else is no rows. */
export function readRows(items) {
  if (Array.isArray(items)) return items.filter((row) => row !== null && typeof row === 'object');
  if (items && typeof items === 'object') {
    const columns = Object.entries(items).filter(([, values]) => Array.isArray(values));
    const length = Math.max(0, ...columns.map(([, values]) => values.length));
    return Array.from({length}, (_, index) => Object.fromEntries(columns.map(([name, values]) => [name, values[index]])));
  }
  return [];
}

/** A finite number, or null for a gap (null, '', NaN, a word). */
export function readNumber(value) {
  if (value === null || value === undefined || value === '' || typeof value === 'boolean') return null;
  const number = typeof value === 'number' ? value : Number(String(value).trim());
  return Number.isFinite(number) ? number : null;
}

/** A time in ms from a Date, an ISO date text or a number of ms; else null. */
export function readTime(value) {
  if (value instanceof Date) return Number.isFinite(value.getTime()) ? value.getTime() : null;
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (typeof value === 'string' && TIME_TEXT.test(value.trim())) {
    const text = value.trim();
    // A bare date or month is local midnight (time-zone defaults to local).
    const local = /^\d{4}-\d{2}(-\d{2})?$/u.test(text);
    const [year, month, day = '01'] = text.split('-');
    const time = local ? new Date(Number(year), Number(month) - 1, Number(day)).getTime() : Date.parse(text);
    return Number.isFinite(time) ? time : null;
  }
  return null;
}

/** The kind of the x field: time, number or category (`x-scale="auto"`). */
export function xKindOf(values, asked = 'auto') {
  if (['time', 'linear', 'category'].includes(asked)) return asked === 'linear' ? 'number' : asked;
  const present = values.filter((value) => value !== null && value !== undefined && value !== '');
  if (!present.length) return 'category';
  if (present.every((value) => value instanceof Date || (typeof value === 'string' && TIME_TEXT.test(value.trim())))) return 'time';
  if (present.every((value) => readNumber(value) !== null)) return 'number';
  return 'category';
}

const fieldList = (value) => (Array.isArray(value) ? value : String(value ?? '').split(','))
  .map((name) => String(name).trim()).filter(Boolean);

/**
 * The series of a chart: {kind, xs, keys, labels, series: [{key, name, values}]}.
 *
 * xs are the x positions in data units (ms for time, the number, or the
 * index for a category); keys are the x values as given, labels what a
 * category says. Every series has one value per x, null for a gap. With no
 * `y`, every numeric field but x and series is a series.
 */
export function readSeries(items, {x = '', y = '', series = '', xScale = 'auto', names = {}} = {}) {
  const rows = readRows(items);
  const fields = rows.length ? Object.keys(rows[0]) : [];
  const xField = x || fields[0] || '';
  let yFields = fieldList(y);
  if (!yFields.length) {
    yFields = fields.filter((name) => name !== xField && name !== series
      && rows.some((row) => readNumber(row[name]) !== null));
  }
  const rawX = rows.map((row) => row[xField]);
  const kind = xKindOf(rawX, xScale);

  // The distinct x values, in time or number order, or as first given for a category.
  const order = new Map();
  for (const value of rawX) {
    const key = kind === 'time' ? readTime(value) : kind === 'number' ? readNumber(value) : (value === undefined || value === null ? '' : String(value));
    if (key === null || order.has(key)) continue;
    order.set(key, value);
  }
  let keys = [...order.keys()];
  if (kind !== 'category') keys.sort((a, b) => a - b);
  const at = new Map(keys.map((key, index) => [key, index]));
  const keyOf = (row) => {
    const value = row[xField];
    return kind === 'time' ? readTime(value) : kind === 'number' ? readNumber(value) : (value === undefined || value === null ? '' : String(value));
  };

  const out = [];
  if (series && yFields.length) {
    // The long form: one series per distinct value of `series`, in first-seen order.
    const field = yFields[0];
    const groups = new Map();
    for (const row of rows) {
      const name = row[series] === undefined || row[series] === null ? '' : String(row[series]);
      if (!groups.has(name)) groups.set(name, new Array(keys.length).fill(null));
      const index = at.get(keyOf(row));
      if (index !== undefined) groups.get(name)[index] = readNumber(row[field]);
    }
    for (const [name, values] of groups) out.push({key: name, name: names[name] ?? name, values});
  } else {
    for (const field of yFields) {
      const values = new Array(keys.length).fill(null);
      for (const row of rows) {
        const index = at.get(keyOf(row));
        if (index !== undefined) values[index] = readNumber(row[field]);
      }
      out.push({key: field, name: names[field] ?? field, values});
    }
  }
  return {
    kind,
    xField,
    keys,
    xs: kind === 'category' ? keys.map((_, index) => index) : keys,
    labels: keys.map((key) => (kind === 'category' ? key : order.get(key))),
    series: out,
  };
}

/** The smallest and largest value of the shown series, or null when none is finite. */
export function extent(series) {
  let min = Infinity;
  let max = -Infinity;
  for (const one of series) {
    for (const value of one.values) {
      if (value === null) continue;
      if (value < min) min = value;
      if (value > max) max = value;
    }
  }
  return min === Infinity ? null : [min, max];
}
