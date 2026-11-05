// Scales and ticks (docs/research/parameters.md §2): a linear scale with
// round ticks, and a time scale whose ticks fall on calendar units.

/** A function from the domain to the range, with `invert`. */
export function linearScale([d0, d1], [r0, r1]) {
  const span = d1 - d0 || 1;
  const scale = (value) => r0 + ((value - d0) / span) * (r1 - r0);
  scale.invert = (pixel) => d0 + ((pixel - r0) / (r1 - r0 || 1)) * span;
  scale.domain = [d0, d1];
  scale.range = [r0, r1];
  return scale;
}

// 1, 2, 2.5 and 5 times a power of ten: the steps a person reads at a glance.
function roundStep(span, count) {
  const raw = span / Math.max(1, count);
  const power = 10 ** Math.floor(Math.log10(raw));
  const fraction = raw / power;
  const nice = fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 2.5 ? 2.5 : fraction <= 5 ? 5 : 10;
  return nice * power;
}

/**
 * Round ticks over [min, max]: {min, max, step, ticks}. With `nice` the
 * domain grows to the outer ticks; `zero` takes 0 into it.
 */
export function niceTicks(min, max, count = 5, {nice = true, zero = false} = {}) {
  let low = min;
  let high = max;
  if (zero) {
    low = Math.min(0, low);
    high = Math.max(0, high);
  }
  if (low === high) {
    const pad = low === 0 ? 1 : Math.abs(low) * 0.1;
    low -= pad;
    high += pad;
  }
  const step = roundStep(high - low, count);
  const from = nice ? Math.floor(low / step + 1e-9) * step : Math.ceil(low / step - 1e-9) * step;
  const to = nice ? Math.ceil(high / step - 1e-9) * step : Math.floor(high / step + 1e-9) * step;
  const ticks = [];
  for (let value = from, guard = 0; value <= to + step * 1e-9 && guard < 1000; value += step, guard += 1) {
    ticks.push(Number(value.toPrecision(12)));
  }
  return {min: nice ? from : low, max: nice ? to : high, step, ticks};
}

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

// The calendar steps a time axis may take, from a second to a century.
const TIME_STEPS = [
  ['second', 1], ['second', 5], ['second', 15], ['second', 30],
  ['minute', 1], ['minute', 5], ['minute', 15], ['minute', 30],
  ['hour', 1], ['hour', 3], ['hour', 6], ['hour', 12],
  ['day', 1], ['day', 2], ['week', 1],
  ['month', 1], ['month', 3], ['month', 6],
  ['year', 1], ['year', 2], ['year', 5], ['year', 10], ['year', 25], ['year', 50], ['year', 100],
];
const APPROX = {second: SECOND, minute: MINUTE, hour: HOUR, day: DAY, week: 7 * DAY, month: 30.44 * DAY, year: 365.25 * DAY};

// The first moment of a unit at or after `time`, local.
function ceilTo(time, unit, every) {
  const date = new Date(time);
  if (unit === 'year') {
    const year = Math.ceil((date.getFullYear() + (date.getMonth() || date.getDate() > 1 || date.getHours() ? 1 : 0)) / every) * every;
    return new Date(year, 0, 1).getTime();
  }
  if (unit === 'month') {
    let month = date.getFullYear() * 12 + date.getMonth();
    if (date.getDate() > 1 || date.getHours() || date.getMinutes()) month += 1;
    month = Math.ceil(month / every) * every;
    return new Date(Math.floor(month / 12), month % 12, 1).getTime();
  }
  if (unit === 'week' || unit === 'day') {
    const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if (start.getTime() < time) start.setDate(start.getDate() + 1);
    if (unit === 'week') while (start.getDay() !== 1) start.setDate(start.getDate() + 1);
    return start.getTime();
  }
  const size = APPROX[unit] * every;
  const offset = date.getTimezoneOffset() * MINUTE;
  return Math.ceil((time - offset) / size) * size + offset;
}

function addTo(time, unit, every) {
  const date = new Date(time);
  if (unit === 'year') return new Date(date.getFullYear() + every, 0, 1).getTime();
  if (unit === 'month') return new Date(date.getFullYear(), date.getMonth() + every, 1).getTime();
  if (unit === 'week') return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7 * every).getTime();
  if (unit === 'day') return new Date(date.getFullYear(), date.getMonth(), date.getDate() + every).getTime();
  return time + APPROX[unit] * every;
}

/** Calendar ticks over [min, max] ms: {unit, every, ticks}. */
export function timeTicks(min, max, count = 6) {
  const span = Math.max(1, max - min);
  const target = span / Math.max(1, count);
  const [unit, every] = TIME_STEPS.find(([name, size]) => APPROX[name] * size >= target) ?? TIME_STEPS[TIME_STEPS.length - 1];
  const ticks = [];
  for (let time = ceilTo(min, unit, every), guard = 0; time <= max && guard < 500; time = addTo(time, unit, every), guard += 1) {
    ticks.push(time);
  }
  return {unit, every, ticks};
}

/** How many ticks fit along `length` px when each needs `room` px. */
export function tickCount(length, room) {
  return Math.max(2, Math.min(10, Math.floor(length / Math.max(1, room))));
}

/** The index of the x nearest to `value` in the sorted `xs`. */
export function nearestIndex(xs, value) {
  if (!xs.length) return -1;
  let low = 0;
  let high = xs.length - 1;
  while (high - low > 1) {
    const middle = (low + high) >> 1;
    if (xs[middle] < value) low = middle;
    else high = middle;
  }
  return Math.abs(xs[high] - value) < Math.abs(xs[low] - value) ? high : low;
}

/**
 * A band scale for categories: `count` bands across [r0, r1], each with an
 * inner padding share. Returns {at(index), width, step}: `at` is a band's
 * start, `width` the drawn width, `step` the band and its padding.
 */
export function bandScale(count, [r0, r1], {padding = 0.2} = {}) {
  const step = (r1 - r0) / Math.max(1, count);
  const width = step * (1 - padding);
  const at = (index) => r0 + index * step + (step - width) / 2;
  return {at, width, step};
}
