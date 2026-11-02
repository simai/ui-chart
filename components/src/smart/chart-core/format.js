// Numbers and dates in the page's language (docs/research/parameters.md §8),
// through Intl only. A format is a word, so a page writes it as an attribute:
//
//   number (default)  1 234,5
//   integer           1 235
//   decimal-<n>       n digits after the point
//   percent           a share 0..1 shown as 12 %
//   compact           1,2 тыс.
//   currency-<CODE>   1 234,50 ₽ (an ISO 4217 code)
//   unit-<unit>       45,3 ГБ (an Intl unit: gigabyte, megabit-per-second)

const cache = new Map();

function intl(locale, options) {
  const key = `${locale}|${JSON.stringify(options)}`;
  if (!cache.has(key)) {
    try {
      cache.set(key, new Intl.NumberFormat(locale || undefined, options));
    } catch {
      // An unknown locale falls back to the browser's; an unknown unit or
      // currency to a plain number.
      try {
        cache.set(key, new Intl.NumberFormat(undefined, options));
      } catch {
        cache.set(key, new Intl.NumberFormat(locale || undefined, {maximumFractionDigits: 2}));
      }
    }
  }
  return cache.get(key);
}

/** The Intl options of a format word, or of `number` when it is not one. */
export function numberOptions(format = 'number', step = 0) {
  const word = String(format || 'number').trim();
  if (word === 'integer') return {maximumFractionDigits: 0};
  if (word === 'percent') return {style: 'percent', maximumFractionDigits: 1};
  if (word === 'compact') return {notation: 'compact', maximumFractionDigits: 1};
  const decimal = /^decimal-(\d)$/u.exec(word);
  if (decimal) return {minimumFractionDigits: Number(decimal[1]), maximumFractionDigits: Number(decimal[1])};
  // unit-<Intl unit>: unit-gigabyte, unit-megabit-per-second, unit-percent.
  const unit = /^unit-([a-z]+(?:-per-[a-z]+)?)$/u.exec(word);
  if (unit) return {style: 'unit', unit: unit[1], unitDisplay: 'short', maximumFractionDigits: 1};
  const currency = /^currency-([A-Z]{3})$/u.exec(word);
  if (currency) return {style: 'currency', currency: currency[1]};
  // number: as many digits as the tick step needs, at most 6.
  const digits = step > 0 && step < 1 ? Math.min(6, Math.ceil(-Math.log10(step) - 1e-9)) : 2;
  return {maximumFractionDigits: digits};
}

/** A number in the locale; a gap is the empty word given. */
export function formatNumber(value, locale, format, {step = 0, gap = '—'} = {}) {
  if (value === null || value === undefined || !Number.isFinite(value)) return gap;
  return intl(locale, numberOptions(format, step)).format(value);
}

const DATE_OPTIONS = {
  second: {hour: '2-digit', minute: '2-digit', second: '2-digit'},
  minute: {hour: '2-digit', minute: '2-digit'},
  hour: {hour: '2-digit', minute: '2-digit'},
  day: {day: 'numeric', month: 'short'},
  week: {day: 'numeric', month: 'short'},
  month: {month: 'short', year: 'numeric'},
  year: {year: 'numeric'},
};
const FULL_OPTIONS = {
  second: {dateStyle: 'medium', timeStyle: 'medium'},
  minute: {dateStyle: 'medium', timeStyle: 'short'},
  hour: {dateStyle: 'medium', timeStyle: 'short'},
  day: {dateStyle: 'long'},
  week: {dateStyle: 'long'},
  month: {month: 'long', year: 'numeric'},
  year: {year: 'numeric'},
};

const dateCache = new Map();
function dateIntl(locale, options) {
  const key = `${locale}|${JSON.stringify(options)}`;
  if (!dateCache.has(key)) {
    try {
      dateCache.set(key, new Intl.DateTimeFormat(locale || undefined, options));
    } catch {
      dateCache.set(key, new Intl.DateTimeFormat(undefined, options));
    }
  }
  return dateCache.get(key);
}

/**
 * A time in the locale: `tick` is the short form for an axis at the tick
 * unit, `full` the form a tooltip and the table say. A format word other
 * than auto is an Intl dateStyle (short, medium, long, full).
 */
export function formatTime(time, locale, unit = 'day', {form = 'tick', format = 'auto'} = {}) {
  if (time === null || time === undefined || !Number.isFinite(time)) return '—';
  const style = ['short', 'medium', 'long', 'full'].includes(format) ? {dateStyle: format} : null;
  const options = style ?? (form === 'full' ? FULL_OPTIONS : DATE_OPTIONS)[unit] ?? DATE_OPTIONS.day;
  return dateIntl(locale, options).format(new Date(time));
}

/** The calendar unit the distinct x times are given in: the finest that varies. */
export function timeUnitOf(times) {
  const dates = times.map((time) => new Date(time));
  if (dates.some((date) => date.getSeconds() || date.getMilliseconds())) return 'second';
  if (dates.some((date) => date.getMinutes())) return 'minute';
  if (dates.some((date) => date.getHours())) return 'hour';
  if (dates.some((date) => date.getDate() !== 1)) return 'day';
  if (dates.some((date) => date.getMonth())) return 'month';
  return dates.length > 1 ? 'year' : 'day';
}
