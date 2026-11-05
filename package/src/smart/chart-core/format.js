// Numbers and dates in the page's language (docs/research/parameters.md §8).
// The words and the Intl formatters are the core's (SF.format, core.runtime
// 1.20.0, which took them from this file), imported from its modules without
// side effects (core.runtime 1.28.0: format-number.js and format-date.js), so
// a chart's bundle carries those two and not the whole format module: a
// chart keeps only its own forms, the axis tick and the full date of a
// tooltip, and the order of its arguments. A format is a word, so a page writes it as an attribute:
//
//   number (default)  1 234,5
//   integer           1 235
//   decimal-<n>       n digits after the point (up to 20)
//   percent           a share 0..1 shown as 12 %
//   compact           1,2 тыс.
//   currency-<CODE>   1 234,50 ₽ (an ISO 4217 code)
//   unit-<unit>       45,3 ГБ (an Intl unit: gigabyte, megabit-per-second)
import {formatNumber as coreNumber, numberOptions} from '../../core/js/format-number.js';
import {formatDate} from '../../core/js/format-date.js';

export {numberOptions};

/** A number in the locale; a gap is the empty word given. */
export function formatNumber(value, locale, format, {step = 0, gap = '—'} = {}) {
  if (value === null || value === undefined || !Number.isFinite(value)) return gap;
  return coreNumber(value, format, {step, gap, locale});
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

/**
 * A time in the locale: `tick` is the short form for an axis at the tick
 * unit, `full` the form a tooltip and the table say. A format word other
 * than auto is an Intl dateStyle (short, medium, long, full).
 */
export function formatTime(time, locale, unit = 'day', {form = 'tick', format = 'auto'} = {}) {
  if (time === null || time === undefined || !Number.isFinite(time)) return '—';
  const style = ['short', 'medium', 'long', 'full'].includes(format) ? {dateStyle: format} : null;
  const options = style ?? (form === 'full' ? FULL_OPTIONS : DATE_OPTIONS)[unit] ?? DATE_OPTIONS.day;
  return formatDate(time, {intl: options, gap: '—', locale});
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
