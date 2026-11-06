/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "e577837dd70a"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calendarDayOffset: () => (/* binding */ calendarDayOffset),
/* harmony export */   formatDate: () => (/* binding */ formatDate),
/* harmony export */   msUntilNextDay: () => (/* binding */ msUntilNextDay),
/* harmony export */   toDate: () => (/* reexport safe */ _format_intl_js__WEBPACK_IMPORTED_MODULE_0__.toDate)
/* harmony export */ });
/* harmony import */ var _format_intl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("15b4e93ff6ed");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_format_intl_js__WEBPACK_IMPORTED_MODULE_0__]);
var __webpack_async_dependencies_result__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
_format_intl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_async_dependencies_result__[0];
// Dates in the page's language: formatDate, the calendar day offset and the
// next midnight, with no top-level side effects (format-intl.js). The same
// functions as core/js/format.js and SF.format; relative days and times are
// format-relative.js, so a bundle that writes a date does not carry them.


const DAY_MS = 86400000;

function hasDateStyle(style) {
  return style === 'short' || style === 'medium' || style === 'long' || style === 'full';
}
/**
 * A date, a time or both in the locale.
 *
 *   formatDate(at)                          3 нояб. 2026 г.  /  Nov 3, 2026
 *   formatDate(at, {date: 'short'})         03.11.2026       /  11/3/26
 *   formatDate(at, {date: 'long'})          3 ноября 2026 г. /  November 3, 2026
 *   formatDate(at, {time: 'short'})         3 нояб. 2026 г., 14:05
 *   formatDate(at, {date: null, time: 'short'})   14:05   /  2:05 PM
 *
 * `date` and `time` are Intl styles (short, medium, long, full); `intl` gives
 * Intl.DateTimeFormat options outright, for a form the styles do not name (a
 * chart's tick, «14:05» with two-digit hours). Anything that is not a date is
 * `gap`, '' by default.
 */


function formatDate(value, {
  date = 'medium',
  time = null,
  intl = null,
  gap = '',
  ...where
} = {}) {
  const moment = (0,_format_intl_js__WEBPACK_IMPORTED_MODULE_0__.toDate)(value);
  if (!moment) return gap;
  let options = intl;

  if (!options) {
    options = {};
    if (hasDateStyle(date)) options.dateStyle = date;
    if (hasDateStyle(time)) options.timeStyle = time;
    if (!options.dateStyle && !options.timeStyle) options.dateStyle = 'medium';
  }

  return (0,_format_intl_js__WEBPACK_IMPORTED_MODULE_0__.intlFormatter)('DateTimeFormat', (0,_format_intl_js__WEBPACK_IMPORTED_MODULE_0__.formatLocale)(where), options).format(moment);
}
/**
 * Calendar days from `now` to the value in the reader's time zone: 0 today,
 * -1 yesterday, 1 tomorrow; NaN when the value is no date. Counted on
 * calendar dates, not 24-hour spans, so 23:59 yesterday is -1 at 00:01 and a
 * day of a clock change is still one day.
 */

function calendarDayOffset(value, {
  now = new Date()
} = {}) {
  const moment = (0,_format_intl_js__WEBPACK_IMPORTED_MODULE_0__.toDate)(value);
  const today = (0,_format_intl_js__WEBPACK_IMPORTED_MODULE_0__.toDate)(now);
  if (!moment || !today) return Number.NaN;
  const day = Date.UTC(moment.getFullYear(), moment.getMonth(), moment.getDate());
  const base = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.round((day - base) / DAY_MS);
}
/**
 * Milliseconds from `now` to the reader's next midnight, when every relative
 * day on the screen moves by one. A component that shows them sets a timer
 * for this long (plus a second's margin, so it wakes in the new day) and
 * draws them again; «сегодня» said yesterday is wrong by morning.
 */

function msUntilNextDay(now = new Date()) {
  const today = (0,_format_intl_js__WEBPACK_IMPORTED_MODULE_0__.toDate)(now) ?? new Date();
  const next = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  return next.getTime() - today.getTime();
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "15b4e93ff6ed"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatLocale: () => (/* binding */ formatLocale),
/* harmony export */   intlFormatter: () => (/* binding */ intlFormatter),
/* harmony export */   toDate: () => (/* binding */ toDate)
/* harmony export */ });
/* harmony import */ var _page_language_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("43090d1c8307");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_page_language_js__WEBPACK_IMPORTED_MODULE_0__]);
var __webpack_async_dependencies_result__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
_page_language_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_async_dependencies_result__[0];
/* harmony import */ var _page_language_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_page_language_js__WEBPACK_IMPORTED_MODULE_0__);
// The part every format module shares (core/js/format.js says what the
// helpers are): the locale a call formats in, a Date from what a host gives,
// and the Intl formatters, kept on a global every copy of these modules shares
// (bundles each carry their own module copy; page-language.js says why).
//
// No top-level side effects, here or in format-number.js, format-date.js,
// format-relative.js and format-file-size.js (ui-chart, 2026-11-05): a bundle
// that imports one function carries that function and what it calls, nothing
// else. The global is made on the first format, not on load, and SF.format is
// published by core's entry (index.js, publishFormat in format.js).

/** The locale a call formats in: the one it names, else its node's page language. */

function formatLocale({
  locale,
  node
} = {}) {
  return String(locale || '').trim() || (0,_page_language_js__WEBPACK_IMPORTED_MODULE_0__.pageLocale)(node);
}
/** A Date from a Date, a time in milliseconds or a date string; null when it is none. */

function toDate(value) {
  if (value === null || value === undefined || value === '') return null;
  const date = value instanceof Date ? new Date(value.getTime()) : new Date(typeof value === 'string' && /^\d+$/u.test(value) ? Number(value) : value);
  return Number.isNaN(date.getTime()) ? null : date;
} // The formatters every copy shares, made on the first call.

function formatterCache() {
  const root = typeof globalThis !== 'undefined' ? globalThis : {};
  if (!root.__sfFormat) root.__sfFormat = {
    formatters: new Map()
  };
  return root.__sfFormat.formatters;
} // One formatter per kind, locale and options. An unknown locale falls back to
// the browser's, and options the platform refuses (an unknown unit or
// currency) to a plain number, so a typo in a page never throws at a reader.


function intlFormatter(kind, locale, options) {
  const key = `${kind}|${locale}|${JSON.stringify(options)}`;
  const cache = formatterCache();
  if (cache.has(key)) return cache.get(key);
  const Make = Intl[kind];
  let made;

  try {
    made = new Make(locale || undefined, options);
  } catch {
    try {
      made = new Make(undefined, options);
    } catch {
      made = new Make(locale || undefined, kind === 'NumberFormat' ? {
        maximumFractionDigits: 2
      } : {});
    }
  } // A page that formats in many locales does not grow the cache for ever.


  if (cache.size >= 256) cache.delete(cache.keys().next().value);
  cache.set(key, made);
  return made;
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "c9ce0852ac73"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatNumber: () => (/* binding */ formatNumber),
/* harmony export */   numberOptions: () => (/* binding */ numberOptions)
/* harmony export */ });
/* harmony import */ var _format_intl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("15b4e93ff6ed");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_format_intl_js__WEBPACK_IMPORTED_MODULE_0__]);
var __webpack_async_dependencies_result__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
_format_intl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_async_dependencies_result__[0];
// Numbers in the page's language by a format word: formatNumber and
// numberOptions alone, with no top-level side effects (format-intl.js). The
// same functions as core/js/format.js and SF.format.number; a bundle that
// formats numbers only imports them from here.

/**
 * The Intl options of a number format word (ui-chart's words, kept so a page
 * writes a format as an attribute):
 *
 *   number (default)  1 234,5   as many digits as `step` needs, at most 6; 2 without one
 *   integer           1 235
 *   decimal-<n>       n digits after the point, always (0 to 20)
 *   percent           a share 0..1 as 12 %
 *   compact           1,2 тыс.  /  1.2K
 *   currency-<CODE>   1 234,50 ₽ (an ISO 4217 code)
 *   unit-<unit>       45,3 ГБ (an Intl unit: gigabyte, megabit-per-second)
 *
 * Anything else reads as number.
 */

function numberOptions(format = 'number', step = 0) {
  const word = String(format || 'number').trim();
  if (word === 'integer') return {
    maximumFractionDigits: 0
  };
  if (word === 'percent') return {
    style: 'percent',
    maximumFractionDigits: 1
  };
  if (word === 'compact') return {
    notation: 'compact',
    maximumFractionDigits: 1
  };
  const decimal = /^decimal-(\d{1,2})$/u.exec(word);

  if (decimal) {
    const digits = Math.min(20, Number(decimal[1]));
    return {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits
    };
  }

  const unit = /^unit-([a-z]+(?:-per-[a-z]+)?)$/u.exec(word);
  if (unit) return {
    style: 'unit',
    unit: unit[1],
    unitDisplay: 'short',
    maximumFractionDigits: 1
  };
  const currency = /^currency-([A-Z]{3})$/u.exec(word);
  if (currency) return {
    style: 'currency',
    currency: currency[1]
  };
  const digits = step > 0 && step < 1 ? Math.min(6, Math.ceil(-Math.log10(step) - 1e-9)) : 2;
  return {
    maximumFractionDigits: digits
  };
}
/**
 * A number in the locale by a format word (numberOptions). `grouping: false`
 * writes it without thousands marks («2026»), `step` sets the digits of
 * `number`, and a value that is not a finite number is `gap`, '' by default
 * (a chart passes '—').
 */

function formatNumber(value, format = 'number', {
  step = 0,
  gap = '',
  grouping = true,
  ...where
} = {}) {
  const number = typeof value === 'string' && value.trim() !== '' ? Number(value) : value;
  if (typeof number !== 'number' || !Number.isFinite(number)) return gap;
  const options = numberOptions(format, step);
  if (grouping === false) options.useGrouping = false;
  return (0,_format_intl_js__WEBPACK_IMPORTED_MODULE_0__.intlFormatter)('NumberFormat', (0,_format_intl_js__WEBPACK_IMPORTED_MODULE_0__.formatLocale)(where), options).format(number);
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "37677343b39a"
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extent: () => (/* binding */ extent),
/* harmony export */   readNumber: () => (/* binding */ readNumber),
/* harmony export */   readRows: () => (/* binding */ readRows),
/* harmony export */   readSeries: () => (/* binding */ readSeries),
/* harmony export */   readTime: () => (/* binding */ readTime),
/* harmony export */   xKindOf: () => (/* binding */ xKindOf)
/* harmony export */ });
// The data a chart is given, read once into one shape (docs/research/parameters.md §1).
//
// `items` is a list of records ([{month: '2026-01', sales: 12}, …]) or an
// object of columns ({month: [...], sales: [...]}). The mapping names the
// fields: `x`, `y` (one field, or a comma list for the wide form, one series
// per field) and `series` (the long form: one series per distinct value of
// that field). A missing value is a gap, never a zero.
const TIME_TEXT = /^\d{4}-\d{2}(-\d{2}([T ]\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:?\d{2})?)?)?$/u;
/** A list of records from records or columns; anything else is no rows. */

function readRows(items) {
  if (Array.isArray(items)) return items.filter(row => row !== null && typeof row === 'object');

  if (items && typeof items === 'object') {
    const columns = Object.entries(items).filter(([, values]) => Array.isArray(values));
    const length = Math.max(0, ...columns.map(([, values]) => values.length));
    return Array.from({
      length
    }, (_, index) => Object.fromEntries(columns.map(([name, values]) => [name, values[index]])));
  }

  return [];
}
/** A finite number, or null for a gap (null, '', NaN, a word). */

function readNumber(value) {
  if (value === null || value === undefined || value === '' || typeof value === 'boolean') return null;
  const number = typeof value === 'number' ? value : Number(String(value).trim());
  return Number.isFinite(number) ? number : null;
}
/** A time in ms from a Date, an ISO date text or a number of ms; else null. */

function readTime(value) {
  if (value instanceof Date) return Number.isFinite(value.getTime()) ? value.getTime() : null;
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;

  if (typeof value === 'string' && TIME_TEXT.test(value.trim())) {
    const text = value.trim(); // A bare date or month is local midnight (time-zone defaults to local).

    const local = /^\d{4}-\d{2}(-\d{2})?$/u.test(text);
    const [year, month, day = '01'] = text.split('-');
    const time = local ? new Date(Number(year), Number(month) - 1, Number(day)).getTime() : Date.parse(text);
    return Number.isFinite(time) ? time : null;
  }

  return null;
}
/** The kind of the x field: time, number or category (`x-scale="auto"`). */

function xKindOf(values, asked = 'auto') {
  if (['time', 'linear', 'category'].includes(asked)) return asked === 'linear' ? 'number' : asked;
  const present = values.filter(value => value !== null && value !== undefined && value !== '');
  if (!present.length) return 'category';
  if (present.every(value => value instanceof Date || typeof value === 'string' && TIME_TEXT.test(value.trim()))) return 'time';
  if (present.every(value => readNumber(value) !== null)) return 'number';
  return 'category';
}

const fieldList = value => (Array.isArray(value) ? value : String(value ?? '').split(',')).map(name => String(name).trim()).filter(Boolean);
/**
 * The series of a chart: {kind, xs, keys, labels, series: [{key, name, values}]}.
 *
 * xs are the x positions in data units (ms for time, the number, or the
 * index for a category); keys are the x values as given, labels what a
 * category says. Every series has one value per x, null for a gap. With no
 * `y`, every numeric field but x and series is a series.
 */


function readSeries(items, {
  x = '',
  y = '',
  series = '',
  xScale = 'auto',
  names = {}
} = {}) {
  const rows = readRows(items);
  const fields = rows.length ? Object.keys(rows[0]) : [];
  const xField = x || fields[0] || '';
  let yFields = fieldList(y);

  if (!yFields.length) {
    yFields = fields.filter(name => name !== xField && name !== series && rows.some(row => readNumber(row[name]) !== null));
  }

  const rawX = rows.map(row => row[xField]);
  const kind = xKindOf(rawX, xScale); // The distinct x values, in time or number order, or as first given for a category.

  const order = new Map();

  for (const value of rawX) {
    const key = kind === 'time' ? readTime(value) : kind === 'number' ? readNumber(value) : value === undefined || value === null ? '' : String(value);
    if (key === null || order.has(key)) continue;
    order.set(key, value);
  }

  let keys = [...order.keys()];
  if (kind !== 'category') keys.sort((a, b) => a - b);
  const at = new Map(keys.map((key, index) => [key, index]));

  const keyOf = row => {
    const value = row[xField];
    return kind === 'time' ? readTime(value) : kind === 'number' ? readNumber(value) : value === undefined || value === null ? '' : String(value);
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

    for (const [name, values] of groups) out.push({
      key: name,
      name: names[name] ?? name,
      values
    });
  } else {
    for (const field of yFields) {
      const values = new Array(keys.length).fill(null);

      for (const row of rows) {
        const index = at.get(keyOf(row));
        if (index !== undefined) values[index] = readNumber(row[field]);
      }

      out.push({
        key: field,
        name: names[field] ?? field,
        values
      });
    }
  }

  return {
    kind,
    xField,
    keys,
    xs: kind === 'category' ? keys.map((_, index) => index) : keys,
    labels: keys.map(key => kind === 'category' ? key : order.get(key)),
    series: out
  };
}
/** The smallest and largest value of the shown series, or null when none is finite. */

function extent(series) {
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

/***/ },

/***/ "6668151838ce"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatNumber: () => (/* binding */ formatNumber),
/* harmony export */   formatTime: () => (/* binding */ formatTime),
/* harmony export */   numberOptions: () => (/* reexport safe */ _core_js_format_number_js__WEBPACK_IMPORTED_MODULE_0__.numberOptions),
/* harmony export */   timeUnitOf: () => (/* binding */ timeUnitOf)
/* harmony export */ });
/* harmony import */ var _core_js_format_number_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c9ce0852ac73");
/* harmony import */ var _core_js_format_date_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("e577837dd70a");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_js_format_number_js__WEBPACK_IMPORTED_MODULE_0__, _core_js_format_date_js__WEBPACK_IMPORTED_MODULE_1__]);
([_core_js_format_number_js__WEBPACK_IMPORTED_MODULE_0__, _core_js_format_date_js__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
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



/** A number in the locale; a gap is the empty word given. */

function formatNumber(value, locale, format, {
  step = 0,
  gap = '—'
} = {}) {
  if (value === null || value === undefined || !Number.isFinite(value)) return gap;
  return (0,_core_js_format_number_js__WEBPACK_IMPORTED_MODULE_0__.formatNumber)(value, format, {
    step,
    gap,
    locale
  });
}
const DATE_OPTIONS = {
  second: {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  },
  minute: {
    hour: '2-digit',
    minute: '2-digit'
  },
  hour: {
    hour: '2-digit',
    minute: '2-digit'
  },
  day: {
    day: 'numeric',
    month: 'short'
  },
  week: {
    day: 'numeric',
    month: 'short'
  },
  month: {
    month: 'short',
    year: 'numeric'
  },
  year: {
    year: 'numeric'
  }
};
const FULL_OPTIONS = {
  second: {
    dateStyle: 'medium',
    timeStyle: 'medium'
  },
  minute: {
    dateStyle: 'medium',
    timeStyle: 'short'
  },
  hour: {
    dateStyle: 'medium',
    timeStyle: 'short'
  },
  day: {
    dateStyle: 'long'
  },
  week: {
    dateStyle: 'long'
  },
  month: {
    month: 'long',
    year: 'numeric'
  },
  year: {
    year: 'numeric'
  }
};
/**
 * A time in the locale: `tick` is the short form for an axis at the tick
 * unit, `full` the form a tooltip and the table say. A format word other
 * than auto is an Intl dateStyle (short, medium, long, full).
 */

function formatTime(time, locale, unit = 'day', {
  form = 'tick',
  format = 'auto'
} = {}) {
  if (time === null || time === undefined || !Number.isFinite(time)) return '—';
  const style = ['short', 'medium', 'long', 'full'].includes(format) ? {
    dateStyle: format
  } : null;
  const options = style ?? (form === 'full' ? FULL_OPTIONS : DATE_OPTIONS)[unit] ?? DATE_OPTIONS.day;
  return (0,_core_js_format_date_js__WEBPACK_IMPORTED_MODULE_1__.formatDate)(time, {
    intl: options,
    gap: '—',
    locale
  });
}
/** The calendar unit the distinct x times are given in: the finest that varies. */

function timeUnitOf(times) {
  const dates = times.map(time => new Date(time));
  if (dates.some(date => date.getSeconds() || date.getMilliseconds())) return 'second';
  if (dates.some(date => date.getMinutes())) return 'minute';
  if (dates.some(date => date.getHours())) return 'hour';
  if (dates.some(date => date.getDate() !== 1)) return 'day';
  if (dates.some(date => date.getMonth())) return 'month';
  return dates.length > 1 ? 'year' : 'day';
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "66a3b5260618"
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FAMILIES: () => (/* binding */ FAMILIES),
/* harmony export */   heatColours: () => (/* binding */ heatColours),
/* harmony export */   heatSteps: () => (/* binding */ heatSteps),
/* harmony export */   stepCount: () => (/* binding */ stepCount),
/* harmony export */   stepOf: () => (/* binding */ stepOf)
/* harmony export */ });
// The colour scale of a heatmap: values cut into steps, each step a fill and
// an ink on one role family's tone ladder (docs/research/parameters.md §8.4,
// docs/DECISIONS.md D8).
//
// A step's fill is light-dark(<light tone>, <dark tone>) of the family: in
// the light theme the strongest value is the darkest tone, in the dark theme
// the lightest, so the strongest is the most contrasting in either. Tone 50
// is never used: no text keeps 4.5:1 on it, and a step carries its value as
// text. A step's ink is the neutral tone that keeps 4.5:1 on its fill.
//
//   sequential  one family, weak → strong
//   diverging   two families meeting at a neutral middle: better="up" is
//               error below the middle and success above, "down" the other
//               way, "none" tertiary and primary (no meaning)
// The ladder from weak to strong: light-theme tones, dark-theme tones.
const LIGHT = [90, 85, 80, 70, 60, 40, 35, 30, 25];
const DARK = [20, 25, 30, 35, 40, 60, 70, 80, 85];
const MIDDLE = 'var(--sf-chart-midpoint)';
const MIDDLE_INK = 'light-dark(var(--sf-neutral-10), var(--sf-neutral-95))';
const FAMILIES = ['primary', 'secondary', 'tertiary', 'neutral', 'success', 'warning', 'error', 'info']; // light tone ≥ 60 takes the dark ink, ≤ 40 the light one; the dark theme
// the other way (tones ≤ 40 are dark there).

const inkOf = (light, dark) => `light-dark(var(--sf-neutral-${light >= 60 ? 10 : 98}), var(--sf-neutral-${dark <= 40 ? 95 : 10}))`; // `count` tones of the ladder, spread from weak to strong.


function ladder(family, count) {
  const out = [];

  for (let step = 0; step < count; step += 1) {
    const at = count === 1 ? LIGHT.length - 1 : Math.round(step * (LIGHT.length - 1) / (count - 1));
    out.push({
      fill: `light-dark(var(--sf-${family}-${LIGHT[at]}), var(--sf-${family}-${DARK[at]}))`,
      ink: inkOf(LIGHT[at], DARK[at])
    });
  }

  return out;
} // The steps' colours, weak → strong (sequential) or low → high (diverging).


function heatColours({
  scale = 'sequential',
  scheme = 'primary',
  better = 'up',
  steps = 5
} = {}) {
  if (scale !== 'diverging') return ladder(FAMILIES.includes(scheme) ? scheme : 'primary', steps);
  const [low, high] = better === 'down' ? ['success', 'error'] : better === 'none' ? ['tertiary', 'primary'] : ['error', 'success'];
  const side = Math.floor(steps / 2); // The side ladders skip their weakest tone, so the first step off the
  // middle is told from the middle.

  const lowSide = ladder(low, side + 1).slice(1).reverse();
  const highSide = ladder(high, side + 1).slice(1);
  return [...lowSide, {
    fill: MIDDLE,
    ink: MIDDLE_INK,
    middle: true
  }, ...highSide];
} // A diverging scale has a middle step, so its step count is odd.

const stepCount = (steps, scale) => {
  const count = Math.min(9, Math.max(3, Math.round(Number.isFinite(steps) ? steps : 5)));
  return scale === 'diverging' && count % 2 === 0 ? count + 1 : count;
}; // The step bounds: count steps of equal width over [min, max]. Diverging,
// the range is made even around the middle (as far below it as the data
// reach above, or the other way), so a step is the same distance from the
// middle on either side and the middle step holds the middle value.

function heatSteps({
  min,
  max,
  middle = 0,
  count,
  scale = 'sequential'
}) {
  if (!(Number.isFinite(min) && Number.isFinite(max))) return [];
  let [low, high] = [min, max];

  if (scale === 'diverging') {
    const reach = Math.max(Math.abs(min - middle), Math.abs(max - middle)) || 1;
    [low, high] = [middle - reach, middle + reach];
  }

  const width = (high - low) / count || 1;
  return Array.from({
    length: count
  }, (_, step) => ({
    from: low + step * width,
    to: step === count - 1 ? high : low + (step + 1) * width
  }));
} // The step a value falls in, or -1 for a gap. A value on a bound belongs to
// the step above it; the top bound to the last step.

function stepOf(steps, value) {
  if (value === null || !Number.isFinite(value) || !steps.length) return -1;

  for (let step = steps.length - 1; step >= 0; step -= 1) if (value >= steps[step].from) return step;

  return 0;
}

/***/ },

/***/ "21ed19c5c40f"
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   keptView: () => (/* binding */ keptView),
/* harmony export */   settled: () => (/* binding */ settled)
/* harmony export */ });
// The data table under a chart costs a row per x: rebuilding it on every
// pointer move or every point of a stream would cost more than the chart.
// The table shows a settled copy of the data instead: a change after a quiet
// spell shows at once, a stream shows at most once per `wait`, and the latest
// data always shows last. Nothing is lost; a table read mid-stream is at most
// `wait` behind the plot.

/**
 * The value to show for `value`, which may change fast. `holder` keeps the
 * state between calls (one per element); `later` asks for a render when a
 * held value is due.
 */
function settled(holder, value, {
  wait = 1000,
  later,
  now = Date.now()
} = {}) {
  if (!holder.started || value === holder.shown) {
    clearTimeout(holder.timer);
    Object.assign(holder, {
      started: true,
      shown: value,
      latest: value,
      at: now,
      timer: 0
    });
    return value;
  }

  holder.latest = value;

  if (now - holder.at >= wait) {
    clearTimeout(holder.timer);
    Object.assign(holder, {
      shown: value,
      at: now,
      timer: 0
    });
    return value;
  }

  if (!holder.timer) {
    holder.timer = setTimeout(() => {
      Object.assign(holder, {
        shown: holder.latest,
        at: Date.now(),
        timer: 0
      });
      later?.();
    }, wait - (now - holder.at));
  }

  return holder.shown;
}
/**
 * The view `make` builds, kept while every part of `key` is the same value
 * (===) as last time: a template result reused is not built again. `holder`
 * keeps the last key and view (one per element).
 */

function keptView(holder, key, make) {
  const same = holder.key && holder.key.length === key.length && key.every((part, index) => part === holder.key[index]);

  if (!same) {
    holder.key = key;
    holder.view = make();
  }

  return holder.view;
}

/***/ },

/***/ "05e80692f615"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("deb1a4d61565");
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("5b7d7695b41b");
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("43090d1c8307");
/* harmony import */ var _chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("37677343b39a");
/* harmony import */ var _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("6668151838ce");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("21ed19c5c40f");
/* harmony import */ var _chart_core_heat_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("66a3b5260618");
/* harmony import */ var _js_templates_default__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("79f4b5e491bf");
/* harmony import */ var _component_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("4933bc6a6649");
/* harmony import */ var _lang_en_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("1cc5c76c0305");
/* harmony import */ var _lang_ru_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("6612533ca0aa");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__, _js_templates_default__WEBPACK_IMPORTED_MODULE_7__]);
([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__, _js_templates_default__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__);
// sf-chart-heatmap: a measure over two categories, a cell per pair, its
// colour a step of an ordered scale (docs/DECISIONS.md D8): load by weekday
// and hour, activity by team and week, a change by region and month.
//
// The element reads its data once into a grid (chart-core/data), cuts the
// values into steps (chart-core/heat) and draws the cells, the row and
// column names and the values that fit in SVG. Its height is its rows', so
// it is known before the width is measured. A person reaches the grid with
// one Tab stop and walks it with the arrows, row by row; every move is said
// in a polite live region, the data as a whole in a summary sentence, and
// the same data is a table on request. Colour is never the only cue: a
// step's value is written in its cell when it fits, said in the tooltip,
// and the table holds them all.
//
// It renders into its own light DOM, like every Smart component.










 // The text of the grid and a row's height, in px, by size rung.

const FONT = {
  '1/2': 11,
  1: 12,
  2: 14
};
const CELL = {
  '1/2': 20,
  1: 28,
  2: 36
};
const CHAR = 0.6;
const ChartHeatmapElement = (0,_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__.elementFromManifest)(_component_json__WEBPACK_IMPORTED_MODULE_8__, {
  base: (_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default()),
  lang: {
    en: _lang_en_json__WEBPACK_IMPORTED_MODULE_9__,
    ru: _lang_ru_json__WEBPACK_IMPORTED_MODULE_10__
  },
  source: 'ru'
});
let instances = 0;

class SfChartHeatmap extends ChartHeatmapElement {
  static get props() {
    return { ...super.props,
      rootClass: {
        default: ''
      }
    };
  }

  onConnected() {
    this._uid = this.id || `sf-chart-heatmap-${instances += 1}`;
    this._box = this._box ?? {
      width: 0
    };
    this._cursor = null;
    this._said = '';
    this._view = 'chart';
  }

  onDisconnected() {
    this._observer?.disconnect();
    this._observer = null;
    this._observed = null;
    clearTimeout(this._table?.timer);
    super.onDisconnected();
  }

  afterRender(changed) {
    if (typeof changed === 'function') return super.afterRender(changed);
    const plot = this.querySelector('.sf-chart-heatmap-plot');

    if (plot && plot !== this._observed && typeof ResizeObserver === 'function') {
      this._observer?.disconnect();
      this._observed = plot;
      this._observer = new ResizeObserver(([entry]) => {
        const width = Math.round(entry.contentRect.width);
        if (width === this._box.width) return;
        this._box = {
          width
        };
        this.requestComponentUpdate('box');
      });

      this._observer.observe(plot);
    }

    return undefined;
  }

  words(key, vars) {
    return this.sfWord(key, vars ? {
      vars
    } : undefined);
  } // The data as a grid: the columns (x) and the rows (y) in the order the
  // data first give them, a value per pair or null for a gap. A pair given
  // twice keeps its last value: adding them up is the host's work.


  model() {
    const key = [this.items, this.names, this.x, this.y, this.value];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;
    const rows = (0,_chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__.readRows)(this.items);
    const fields = rows.length ? Object.keys(rows[0]) : [];
    const xField = this.x || fields[0] || '';
    const yField = this.y || fields.find(field => field !== xField) || '';
    const valueField = this.value || fields.find(field => field !== xField && field !== yField && rows.some(row => (0,_chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__.readNumber)(row[field]) !== null)) || '';
    const names = this.names || {};
    const columns = new Map();
    const lines = new Map();
    const cells = new Map();

    for (const row of rows) {
      const x = row[xField];
      const y = row[yField];
      if (x === undefined || x === null || y === undefined || y === null) continue;
      const [xKey, yKey] = [String(x), String(y)];
      if (!columns.has(xKey)) columns.set(xKey, columns.size);
      if (!lines.has(yKey)) lines.set(yKey, lines.size);
      cells.set(`${columns.get(xKey)}|${lines.get(yKey)}`, (0,_chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__.readNumber)(row[valueField]));
    }

    const nameOf = one => names[one] !== undefined ? String(names[one]) : one;

    const xs = [...columns.keys()].map(one => ({
      key: one,
      name: nameOf(one)
    }));
    const ys = [...lines.keys()].map(one => ({
      key: one,
      name: nameOf(one)
    }));
    const grid = ys.map((_, yi) => xs.map((__, xi) => cells.has(`${xi}|${yi}`) ? cells.get(`${xi}|${yi}`) : null));
    const values = grid.flat().filter(value => value !== null);
    this._model = {
      xField,
      yField,
      valueField,
      xs,
      ys,
      grid,
      count: values.length,
      gaps: xs.length * ys.length - values.length,
      min: values.length ? Math.min(...values) : null,
      max: values.length ? Math.max(...values) : null
    };
    return this._model;
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.count ? 'ready' : 'empty';
  } // The steps of the scale and their colours. min and max hold only when
  // given (an unset number reads 0); middle is the diverging scale's.


  scaleSteps(model) {
    const count = (0,_chart_core_heat_js__WEBPACK_IMPORTED_MODULE_6__.stepCount)(this.steps, this.scale);
    const min = this.hasAttribute('min') && Number.isFinite(this.min) ? this.min : model.min;
    const max = this.hasAttribute('max') && Number.isFinite(this.max) ? this.max : model.max;
    const steps = (0,_chart_core_heat_js__WEBPACK_IMPORTED_MODULE_6__.heatSteps)({
      min: Math.min(min, max),
      max: Math.max(min, max),
      middle: Number.isFinite(this.middle) ? this.middle : 0,
      count,
      scale: this.scale
    });
    const colours = (0,_chart_core_heat_js__WEBPACK_IMPORTED_MODULE_6__.heatColours)({
      scale: this.scale,
      scheme: this.scheme,
      better: this.better,
      steps: count
    });
    return steps.map((step, index) => ({ ...step,
      ...colours[index],
      index
    }));
  }

  sayY(value) {
    return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(value, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.valueFormat, {
      gap: this.words('gap')
    });
  }

  sayStep(step) {
    return this.words('step', {
      from: this.sayY(step.from),
      to: this.sayY(step.to)
    });
  } // Where everything goes: the row names' column, a column's width, which
  // column names fit, and each cell with its step. Null until the plot has a
  // width; the height is the rows' and the names' line, known before.


  geometry(model, steps) {
    const {
      width
    } = this._box;
    if (!width) return null;
    const font = FONT[this.size] ?? 12;
    const cell = CELL[this.size] ?? 28;
    const longest = Math.max(0, ...model.ys.map(one => one.name.length));
    const left = Math.min(Math.ceil(longest * font * CHAR) + 8, Math.round(width * 0.35));
    const columns = model.xs.length;
    const column = (width - left) / Math.max(1, columns);
    const gap = column >= 12 ? 2 : column >= 6 ? 1 : 0;
    const xLongest = Math.max(1, ...model.xs.map(one => one.name.length));
    const every = Math.max(1, Math.ceil((xLongest * font * CHAR + 6) / column));
    const rowsHeight = model.ys.length * cell;
    const values = this.valueLabels !== 'none';
    const cells = [];
    model.grid.forEach((line, yi) => line.forEach((value, xi) => {
      const step = (0,_chart_core_heat_js__WEBPACK_IMPORTED_MODULE_6__.stepOf)(steps, value);
      const text = value === null ? '' : this.sayY(value);
      const fits = values && value !== null && text.length * font * CHAR + 6 <= column - gap && cell - gap >= font + 4;
      cells.push({
        xi,
        yi,
        value,
        step,
        text: fits ? text : '',
        x: left + xi * column + gap / 2,
        y: yi * cell + gap / 2,
        width: Math.max(0, column - gap),
        height: cell - gap
      });
    }));

    const fitName = (name, room) => {
      const most = Math.max(1, Math.floor(room / (font * CHAR)));
      return name.length > most ? `${name.slice(0, Math.max(1, most - 1))}…` : name;
    };

    return {
      width,
      height: this.plotHeight(model),
      font,
      cell,
      left,
      column,
      rowsHeight,
      cells,
      rows: model.ys.map((one, yi) => ({
        name: fitName(one.name, left - 8),
        y: yi * cell + cell / 2
      })),
      columns: model.xs.map((one, xi) => xi % every ? null : {
        name: fitName(one.name, column * every - 4),
        x: left + xi * column + column / 2
      }).filter(Boolean),
      xLabel: this.xLabel
    };
  } // The plot's height from the rows and the size rung alone, so the first
  // paint holds it before the width is known. The sheet holds the same sum
  // from the rows' count (CELL and FONT are its c0/c4/c8 and b1/b2/b4).


  plotHeight(model) {
    const font = FONT[this.size] ?? 12;
    return model.ys.length * (CELL[this.size] ?? 28) + font + 10 + (this.xLabel ? font + 6 : 0);
  }

  cellAt(model, cursor) {
    if (!cursor) return null;
    const value = model.grid[cursor.yi]?.[cursor.xi];
    return value === undefined ? null : {
      x: model.xs[cursor.xi],
      y: model.ys[cursor.yi],
      value
    };
  }

  cursorLine(model, cursor) {
    const one = this.cellAt(model, cursor);
    return one ? this.words('cursor', {
      y: one.y.name,
      x: one.x.name,
      value: this.sayY(one.value)
    }) : '';
  }

  summarize(model) {
    if (this.summary === 'none') return '';
    const out = [this.words('summary-grid', {
      rows: model.ys.length,
      columns: model.xs.length,
      min: this.sayY(model.min),
      max: this.sayY(model.max)
    })];

    const where = target => {
      for (let yi = 0; yi < model.ys.length; yi += 1) {
        const xi = model.grid[yi].indexOf(target);
        if (xi !== -1) return {
          x: model.xs[xi].name,
          y: model.ys[yi].name
        };
      }

      return null;
    };

    const high = where(model.max);
    const low = where(model.min);
    if (high) out.push(this.words('summary-high', {
      value: this.sayY(model.max),
      y: high.y,
      x: high.x
    }));
    if (low && model.min !== model.max) out.push(this.words('summary-low', {
      value: this.sayY(model.min),
      y: low.y,
      x: low.x
    }));
    if (model.gaps) out.push(this.words('summary-gaps', {
      count: model.gaps
    }));
    return out.join(' ');
  }

  setCursor(cursor, {
    say = false
  } = {}) {
    this._cursor = cursor;
    if (say && cursor) this._said = this.cursorLine(this.model(), cursor);
    this.requestComponentUpdate('cursor');
  } // The arrows walk the grid: Left and Right along a row (in the reading
  // direction), Up and Down across rows; Home and End to a row's first and
  // last cell, with Ctrl to the grid's first and last. A gap is walked too:
  // it is said as having no data.


  onPlotKey(event) {
    if (event.key === 'Escape') {
      if (!this._cursor) return;
      event.preventDefault();
      this.setCursor(null);
      return;
    }

    if ((event.key === 'Enter' || event.key === ' ') && this._cursor) {
      event.preventDefault();
      this.choose(this._cursor);
      return;
    }

    const model = this.model();
    const [columns, rows] = [model.xs.length, model.ys.length];
    if (!columns || !rows) return;
    const rtl = this.matches(':dir(rtl)');
    const key = rtl ? {
      ArrowLeft: 'ArrowRight',
      ArrowRight: 'ArrowLeft'
    }[event.key] ?? event.key : event.key;
    const at = this._cursor ?? {
      xi: -1,
      yi: 0
    };
    const moves = {
      ArrowRight: () => ({
        xi: Math.min(columns - 1, at.xi + 1),
        yi: at.yi
      }),
      ArrowLeft: () => ({
        xi: Math.max(0, at.xi - 1),
        yi: at.yi
      }),
      ArrowDown: () => ({
        xi: Math.max(0, at.xi),
        yi: this._cursor ? Math.min(rows - 1, at.yi + 1) : 0
      }),
      ArrowUp: () => ({
        xi: Math.max(0, at.xi),
        yi: Math.max(0, at.yi - 1)
      }),
      Home: () => event.ctrlKey || event.metaKey ? {
        xi: 0,
        yi: 0
      } : {
        xi: 0,
        yi: at.yi
      },
      End: () => event.ctrlKey || event.metaKey ? {
        xi: columns - 1,
        yi: rows - 1
      } : {
        xi: columns - 1,
        yi: at.yi
      }
    };
    if (!moves[key]) return;
    event.preventDefault();
    this.setCursor(moves[key](), {
      say: true
    });
  }

  pointAt(event) {
    const box = event.target.closest?.('[data-cell]');
    if (!box) return null;
    const [xi, yi] = box.dataset.cell.split(',').map(Number);
    return {
      xi,
      yi
    };
  }

  onPointerMove(event) {
    const point = this.pointAt(event);

    if (!point) {
      if (this._cursor && !this.matches(':focus-within')) this.setCursor(null);
      return;
    }

    if (this._cursor && point.xi === this._cursor.xi && point.yi === this._cursor.yi) return;
    this.setCursor(point);
  }

  onPointerLeave() {
    if (this.matches(':focus-within')) return;
    this.setCursor(null);
  }

  onPlotClick(event) {
    const point = this.pointAt(event);
    if (point) this.choose(point);
  } // select carries the cell as the data gave it: its column as x, its row
  // as y, its value (null for a gap).


  choose(cursor) {
    const one = this.cellAt(this.model(), cursor);
    if (!one) return;
    this.sfEmit('select', {
      x: one.x.key,
      y: one.y.key,
      value: one.value
    });
  }

  toggleView() {
    this._view = this._view === 'table' ? 'chart' : 'table';
    this.requestComponentUpdate('view');
  }

  templateContext() {
    const model = this.model();
    const state = this.state(model);
    const steps = state === 'ready' ? this.scaleSteps(model) : [];
    const geometry = state === 'ready' ? this.geometry(model, steps) : null;
    const cursor = this._cursor && this.cellAt(model, this._cursor) ? this._cursor : null;
    const tableModel = this.tableModel(model, state === 'ready');
    return this.createTemplateContext({ ...this.getPropsContext(),
      component: this,
      uid: this._uid,
      size: this.size,
      label: this.label || this.words('untitled'),
      state,
      model,
      steps,
      geometry,
      rows: state === 'ready' ? model.ys.length : 0,
      tableModel,
      tableKey: [tableModel, this.label, this.xLabel, this.yLabel, this.valueFormat, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.table, this.table === 'toggle' ? this._view : 'chart'],
      cursor,
      said: this._said,
      view: this.table === 'toggle' ? this._view : 'chart',
      legend: this.legend,
      summaryText: state === 'ready' ? this.summarize(model) : '',
      hasDescription: this.hasSlotContent?.('description') ?? false,
      description: this.hasSlotContent?.('description') ? this.getSlotContent('description') : null,
      rootClass: this.getRootClass()
    });
  } // The data the table shows: settled, so a stream or a pointer move does
  // not rebuild a row on every render (chart-core/settle). The first data
  // after none shows at once: only a change of data already shown is held.


  tableModel(model, ready) {
    this._table = this._table ?? {};

    if (!ready) {
      clearTimeout(this._table.timer);
      this._table = {};
      return model;
    }

    return (0,_chart_core_settle_js__WEBPACK_IMPORTED_MODULE_5__.settled)(this._table, model, {
      later: () => this.requestComponentUpdate('table')
    });
  }

  template() {
    return (0,_js_templates_default__WEBPACK_IMPORTED_MODULE_7__.renderHeatmapTemplate)(this.templateContext());
  }

}

SfChartHeatmap.define('sf-chart-heatmap');
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "79f4b5e491bf"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderHeatmapTemplate: () => (/* binding */ renderHeatmapTemplate)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2a080a730149");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("21ed19c5c40f");
/* harmony import */ var _default_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("1dad82453393");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([lit__WEBPACK_IMPORTED_MODULE_0__]);
var __webpack_async_dependencies_result__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_async_dependencies_result__[0];
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lit__WEBPACK_IMPORTED_MODULE_0__);


 // The figure of a heatmap: the label and the table button, the scale's
// legend, the grid (SVG), the summary and the description, the live line,
// and the same data as a table.
//
// The grid is one Tab stop, a role="group" named by the label and described
// by the summary; its cells are aria-hidden, because the summary, the live
// line and the table say what they show. A cell's colour and its ink are
// its step's (chart-core/heat), set once on the grid; its value is written
// in it when it fits.

const px = value => `${Math.round(value * 10) / 10}`; // The steps' fills and inks, set once on the grid; a cell names its step
// (data-step) and the sheet picks that step's pair, so a cell's markup is
// its place and its value alone.


const stepColours = steps => steps.map((step, index) => `--sf-chart-heatmap--fill-${index}: ${step.fill}; --sf-chart-heatmap--ink-${index}: ${step.ink}`).join('; '); // The grid's inside is SVG markup set as the svg element's innerHTML (a
// property, so lit writes no part markers inside it: a first-paint snapshot
// of the grid is the same on every run). Every text is escaped.


const ESCAPES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

const esc = value => String(value).replace(/[&<>"']/gu, one => ESCAPES[one]);

function gridMarkup(g, steps, cursor) {
  let out = '<g class="sf-chart-heatmap-names" aria-hidden="true">';

  for (const row of g.rows) {
    out += `<text class="sf-chart-heatmap-name sf-chart-heatmap-name--row" x="${px(g.left - 8)}" y="${px(row.y)}">${esc(row.name)}</text>`;
  }

  for (const column of g.columns) {
    out += `<text class="sf-chart-heatmap-name" x="${px(column.x)}" y="${px(g.rowsHeight + g.font + 4)}">${esc(column.name)}</text>`;
  }

  if (g.xLabel) out += `<text class="sf-chart-heatmap-axis-label" x="${px(g.left + (g.width - g.left) / 2)}" y="${px(g.height - 2)}" >${esc(g.xLabel)}</text>`;
  out += '</g><g class="sf-chart-heatmap-cells" aria-hidden="true">';

  for (const one of g.cells) {
    const current = cursor && cursor.xi === one.xi && cursor.yi === one.yi;
    const dim = cursor && !current ? ' sf-chart-heatmap-cell--dim' : '';
    const kind = steps[one.step] ? '' : ' sf-chart-heatmap-cell--gap';
    const step = steps[one.step] ? ` data-step="${one.step}"` : '';
    out += `<g class="sf-chart-heatmap-cell${kind}${dim}"${step} data-cell="${one.xi},${one.yi}">`;
    out += `<rect class="sf-chart-heatmap-box" x="${px(one.x)}" y="${px(one.y)}" width="${px(one.width)}" height="${px(one.height)}"/>`;
    if (one.text) out += `<text class="sf-chart-heatmap-value" x="${px(one.x + one.width / 2)}" y="${px(one.y + one.height / 2)}">${esc(one.text)}</text>`;
    out += '</g>';
  }

  const focus = cursor && g.cells.find(one => one.xi === cursor.xi && one.yi === cursor.yi);
  if (focus) out += `<rect class="sf-chart-heatmap-focus" x="${px(focus.x - 1)}" y="${px(focus.y - 1)}" width="${px(focus.width + 2)}" height="${px(focus.height + 2)}"/>`;
  return `${out}</g>`;
} // The tooltip stands over the cell, flipped to its other side past the
// grid's middle so it stays inside.


function renderTooltip(context, g, cursor) {
  if (!cursor || !g || context.tooltip === 'none') return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const {
    component,
    model
  } = context;
  const one = component.cellAt(model, cursor);
  const cell = g.cells.find(item => item.xi === cursor.xi && item.yi === cursor.yi);
  if (!one || !cell) return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const flip = cell.x + cell.width / 2 > g.width / 2;
  const below = cell.y < g.cell * 2;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${['sf-chart-heatmap-tooltip', flip ? 'sf-chart-heatmap-tooltip--flip' : '', below ? 'sf-chart-heatmap-tooltip--below' : ''].filter(Boolean).join(' ')} aria-hidden="true"
         style=${`inset-inline-start: ${px(flip ? cell.x : cell.x + cell.width)}px; inset-block-start: ${px(below ? cell.y + cell.height : cell.y)}px`}>
      <div class="sf-chart-heatmap-tooltip-place">${one.y.name} · ${one.x.name}</div>
      <div class="sf-chart-heatmap-tooltip-value">${component.sayY(one.value)}</div>
    </div>
  `;
} // The scale's legend: a swatch per step with its range. A heatmap always
// has one, since its colours are an ordered scale, not names.


function renderLegend(context, place) {
  if (context.legend !== place || context.state !== 'ready' || !context.steps.length) return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const {
    component,
    steps
  } = context;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <ul class=${`sf-chart-heatmap-legend sf-chart-heatmap-legend--${place}`} aria-label=${component.words('legend')}>
      ${steps.map(step => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <li class="sf-chart-heatmap-legend-item">
          <span class="sf-chart-heatmap-swatch" aria-hidden="true" style=${`--sf-chart-heatmap--fill: ${step.fill}`}></span>
          <span class="sf-chart-heatmap-legend-range">${component.sayStep(step)}</span>
        </li>
      `)}
      ${context.model.gaps ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <li class="sf-chart-heatmap-legend-item">
          <span class="sf-chart-heatmap-swatch sf-chart-heatmap-swatch--gap" aria-hidden="true"></span>
          <span class="sf-chart-heatmap-legend-range">${component.words('gap')}</span>
        </li>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
    </ul>
  `;
} // The table is the settled copy of the data (chart-core/settle): it is
// rebuilt only when its key changes, never on a pointer or cursor move.


function renderTable(context) {
  const shownTable = context.table === 'visible' || context.table === 'toggle' && context.view === 'table';
  if (context.state !== 'ready' || !shownTable && context.table !== 'hidden') return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const {
    component
  } = context;
  component._tableView = component._tableView ?? {};
  return (0,_chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__.keptView)(component._tableView, context.tableKey, () => tableMarkup(context, shownTable));
}

function tableMarkup(context, shownTable) {
  const {
    component,
    label,
    tableModel: model
  } = context;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${shownTable ? 'sf-chart-heatmap-table' : 'sf-chart-heatmap-sr'}>
      <table>
        <caption>${label}</caption>
        <thead>
          <tr>
            <th scope="col">${context.yLabel || model.yField || component.words('y-column')}</th>
            ${model.xs.map(one => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<th scope="col">${one.name}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${model.ys.map((row, yi) => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
            <tr>
              <th scope="row">${row.name}</th>
              ${model.grid[yi].map(value => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<td>${component.sayY(value)}</td>`)}
            </tr>
          `)}
        </tbody>
      </table>
    </div>
  `;
}

function renderPlot(context) {
  const {
    component,
    geometry: g,
    steps,
    uid,
    state,
    cursor
  } = context;

  if (state === 'loading') {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-heatmap-loading" role="status" aria-busy="true"><span class="sf-chart-heatmap-sr">${component.words('loading')}</span></div>`;
  }

  if (state === 'empty' || state === 'error') {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
      <sf-empty-state class="sf-chart-heatmap-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
        heading=${component.words(state === 'error' ? 'error-title' : 'empty-title')} text=""
        @sf-empty-state-action=${event => {
      event.stopPropagation();
      component.sfEmit('refresh', {});
    }}></sf-empty-state>
    `;
  }

  if (!g) return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const described = [context.summaryText ? `${uid}-summary` : '', context.hasDescription ? `${uid}-description` : ''].filter(Boolean).join(' ');
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <svg class="sf-chart-heatmap-svg" role="group" tabindex="0" focusable="true"
         aria-label=${context.label} aria-roledescription=${component.words('roledescription')}
         aria-describedby=${described || lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
         width=${g.width} height=${g.height} viewBox=${`0 0 ${g.width} ${g.height}`} style=${stepColours(steps)}
         @keydown=${event => component.onPlotKey(event)}
         @pointermove=${event => component.onPointerMove(event)}
         @pointerleave=${() => component.onPointerLeave()}
         @click=${event => component.onPlotClick(event)}
         @blur=${() => component.setCursor(null)}
         .innerHTML=${gridMarkup(g, steps, cursor)}></svg>
    ${renderTooltip(context, g, cursor)}
  `;
}

function renderHeatmapTemplate(context) {
  const {
    component,
    uid,
    state
  } = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <figure class=${['sf-chart-heatmap', `sf-chart-heatmap--size-${size}`, `sf-chart-heatmap--${state}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-chart-heatmap-head">
        <span class="sf-chart-heatmap-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.yLabel && state === 'ready' ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-chart-heatmap-y-label">${context.yLabel}</span>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
        ${context.table === 'toggle' && state === 'ready' ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<button type="button" class="sf-chart-heatmap-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      </figcaption>
      ${tableView ? lit__WEBPACK_IMPORTED_MODULE_0__.nothing : renderLegend(context, 'top')}
      <div class="sf-chart-heatmap-plot" ?hidden=${tableView}
           style=${context.rows ? `--sf-chart-heatmap--rows: ${context.rows}; --sf-chart-heatmap--x-label: ${context.xLabel ? 1 : 0}` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}>${renderPlot(context)}</div>
      ${tableView ? lit__WEBPACK_IMPORTED_MODULE_0__.nothing : renderLegend(context, 'bottom')}
      ${context.summaryText ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<p class="sf-chart-heatmap-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      ${context.hasDescription ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-heatmap-description" id=${`${uid}-description`}>${context.description}</div>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      <div class="sf-chart-heatmap-sr" aria-live="polite">${context.said}</div>
      ${renderTable(context)}
    </figure>
  `;
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "1dad82453393"
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "5b7d7695b41b"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("element-manifest", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("element-manifest", 1).then(resolve, reject), { once: true })));

/***/ },

/***/ "2a080a730149"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("lit", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("lit", 1).then(resolve, reject), { once: true })));

/***/ },

/***/ "43090d1c8307"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("page-language", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("page-language", 1).then(resolve, reject), { once: true })));

/***/ },

/***/ "deb1a4d61565"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("smart-base", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("smart-base", 1).then(resolve, reject), { once: true })));

/***/ },

/***/ "4933bc6a6649"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"id":"smart.chart-heatmap","tag":"sf-chart-heatmap","version":"0.1.1","kind":"leaf","settings":{"label":{"type":"string","default":""},"items":{"type":"list","default":[],"of":"object"},"names":{"type":"object","default":{}},"x":{"type":"string","default":""},"y":{"type":"string","default":""},"value":{"type":"string","default":""},"scale":{"type":"enum","values":["sequential","diverging"],"default":"sequential"},"scheme":{"type":"enum","values":["primary","secondary","tertiary","neutral","success","warning","error","info"],"default":"primary"},"better":{"type":"enum","values":["up","down","none"],"default":"up"},"middle":{"type":"number","default":0},"min":{"type":"number","optional":true},"max":{"type":"number","optional":true},"steps":{"type":"number","default":5},"value-labels":{"type":"enum","values":["auto","none"],"default":"auto"},"legend":{"type":"enum","values":["top","bottom","none"],"default":"bottom"},"tooltip":{"type":"enum","values":["cell","none"],"default":"cell"},"x-label":{"type":"string","default":""},"y-label":{"type":"string","default":""},"value-format":{"type":"string","default":"number"},"size":{"type":"enum","values":["1/2","1","2"],"default":"1"},"table":{"type":"enum","values":["toggle","visible","hidden"],"default":"toggle"},"summary":{"type":"enum","values":["auto","none"],"default":"auto"},"data-state":{"type":"enum","values":["auto","loading","ready","empty","error"],"default":"auto"}},"values":{},"events":{"select":{"carries":{"x":"string","y":"string","value":"number"}},"refresh":{"carries":{}}},"actions":{},"presentation":{"skeleton":{"late":["items"]}},"css-variables":{"--sf-chart-heatmap-label-color":{"type":"color","state":"default"},"--sf-chart-heatmap-empty-color":{"type":"color","state":"default"},"--sf-chart-heatmap-cell-radius":{"type":"length","state":"default"}}}');

/***/ },

/***/ "1cc5c76c0305"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Heatmap","runtime":{"untitled":"Heatmap","roledescription":"heatmap","cursor":"{y}, {x}: {value}","gap":"no data","show-table":"Table","legend":"Scale","step":"{from} – {to}","loading":"Loading the chart data","empty-title":"No data for the chart","error-title":"The data could not be loaded","summary-grid":"Rows: {rows}, columns: {columns}; values from {min} to {max}.","summary-high":"Highest {value}: {y}, {x}.","summary-low":"Lowest {value}: {y}, {x}.","summary-gaps":"No data: {count}.","y-column":"Row"},"events":{"select":{"label":"Choose a cell"},"refresh":{"label":"Load the data again"}}}');

/***/ },

/***/ "6612533ca0aa"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Тепловая карта","runtime":{"untitled":"Тепловая карта","roledescription":"тепловая карта","cursor":"{y}, {x}: {value}","gap":"нет данных","show-table":"Таблица","legend":"Шкала","step":"{from} – {to}","loading":"Загрузка данных диаграммы","empty-title":"Нет данных для диаграммы","error-title":"Не удалось загрузить данные","summary-grid":"Строк: {rows}, столбцов: {columns}; значения от {min} до {max}.","summary-high":"Наибольшее {value}: {y}, {x}.","summary-low":"Наименьшее {value}: {y}, {x}.","summary-gaps":"Без данных: {count}.","y-column":"Строка"},"events":{"select":{"label":"Выбрать ячейку"},"refresh":{"label":"Загрузить данные заново"}}}');

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		const hasSymbol = typeof Symbol === "function";
/******/ 		const webpackQueues = hasSymbol ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		const webpackExports = hasSymbol ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		const webpackError = hasSymbol ? Symbol("webpack error") : "__webpack_error__";
/******/
/******/ 		const resolveQueue = (queue) => {
/******/ 			if(queue?.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		const wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					const queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					const obj = {};
/******/
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			const ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			let queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			const depQueues = new Set();
/******/ 			const exports = module.exports;
/******/ 			let currentDeps;
/******/ 			let outerResolve;
/******/ 			let reject;
/******/ 			const promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			const handle = (deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				let fn;
/******/ 				const getResult = () => (currentDeps.map((d) => {
/******/
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				const promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					const fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}
/******/ 			const done = (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue))
/******/ 			body(handle, done);
/******/ 			queue?.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			const getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/
/************************************************************************/
/******/
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	let __webpack_exports__ = __webpack_require__("05e80692f615");
/******/
/******/ })()
;