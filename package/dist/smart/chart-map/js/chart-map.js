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

/***/ "0ef1fec48167"
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   geoLayout: () => (/* binding */ geoLayout),
/* harmony export */   geoRegions: () => (/* binding */ geoRegions),
/* harmony export */   geoValues: () => (/* binding */ geoValues),
/* harmony export */   nearestRegion: () => (/* binding */ nearestRegion),
/* harmony export */   projectionOf: () => (/* binding */ projectionOf),
/* harmony export */   regionOrder: () => (/* binding */ regionOrder)
/* harmony export */ });
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("37677343b39a");
// The regions of a choropleth map (docs/research/catalogue.md, Choropleth
// map; docs/DECISIONS.md D16): areas the page gives as GeoJSON, each
// filled by the step of its value. The package holds no map of its own: the
// boundaries, their source and their licence are the page's (the owner's
// decision q-f136944dd5). Own implementation: the reading of GeoJSON
// polygons, the projections, the fitting into the plot.

const RAD = Math.PI / 180;

const text = value => value === undefined || value === null ? '' : String(value);
/**
 * The areas of `shapes`, a GeoJSON FeatureCollection, a list of Features or
 * {features}: [{key, name, polygons}], in the order given. A polygon is a
 * list of rings (the outline, then its holes), a ring a list of [x, y]. A
 * feature's key is its `keyField` property, else its id, else its
 * properties.id; its name the `nameField` property (name by default), else
 * its key. A feature without a key or a polygon is left out (`dropped`).
 */


function geoRegions(shapes, {
  keyField = '',
  nameField = ''
} = {}) {
  const features = Array.isArray(shapes) ? shapes : Array.isArray(shapes?.features) ? shapes.features : [];
  const regions = [];
  const seen = new Set();
  let dropped = 0;

  for (const feature of features) {
    const props = feature?.properties ?? {};
    const key = text(keyField ? props[keyField] : feature?.id ?? props.id);
    const geometry = feature?.geometry;
    const raw = geometry?.type === 'Polygon' ? [geometry.coordinates] : geometry?.type === 'MultiPolygon' ? geometry.coordinates : [];
    const polygons = (raw ?? []).map(polygon => (Array.isArray(polygon) ? polygon : []).map(ring => Array.isArray(ring) ? ring.filter(point => Array.isArray(point) && Number.isFinite(point[0]) && Number.isFinite(point[1])).map(([x, y]) => [x, y]) : []).filter(ring => ring.length >= 3)).filter(polygon => polygon.length);

    if (!key || !polygons.length || seen.has(key)) {
      dropped += 1;
      continue;
    }

    seen.add(key);
    regions.push({
      key,
      name: text(props[nameField || 'name']) || key,
      polygons
    });
  }

  return {
    regions,
    dropped
  };
}
/**
 * The values of rows joined to the regions by key: {regionField,
 * valueField, values (Map key → number), unmatched, missing}. A row whose
 * key names no region is unmatched; a row without a number is missing; the
 * same key twice keeps the last.
 */

function geoValues(items, regions, {
  region = '',
  value = ''
} = {}) {
  const rows = (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.readRows)(items);
  const fields = [...new Set(rows.flatMap(row => Object.keys(row)))];
  const regionField = region || fields.find(name => rows.some(row => typeof row[name] === 'string')) || 'region';
  const valueField = value || fields.find(name => name !== regionField && rows.some(row => (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.readNumber)(row[name]) !== null)) || 'value';
  const keys = new Set(regions.map(one => one.key));
  const values = new Map();
  let unmatched = 0;
  let missing = 0;

  for (const row of rows) {
    const key = text(row[regionField]);
    const amount = (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.readNumber)(row[valueField]);

    if (!keys.has(key)) {
      unmatched += 1;
      continue;
    }

    if (amount === null) {
      missing += 1;
      continue;
    }

    values.set(key, amount);
  }

  return {
    regionField,
    valueField,
    values,
    unmatched,
    missing
  };
} // Longitudes across the 180th meridian (a far-eastern region given at
// -170) are carried past 180, so a region and the map stay whole.

function wrapped(regions) {
  let east = false;
  let west = false;

  for (const one of regions) {
    for (const polygon of one.polygons) {
      for (const ring of polygon) {
        for (const [x] of ring) {
          if (x > 150) east = true;
          if (x < -150) west = true;
        }
      }
    }
  }

  if (!(east && west)) return regions;
  return regions.map(one => ({ ...one,
    polygons: one.polygons.map(polygon => polygon.map(ring => ring.map(([x, y]) => [x < 0 ? x + 360 : x, y])))
  }));
}

function extentOf(regions) {
  let [left, right, bottom, top] = [Infinity, -Infinity, Infinity, -Infinity];

  for (const one of regions) {
    for (const polygon of one.polygons) {
      for (const [x, y] of polygon[0]) {
        left = Math.min(left, x);
        right = Math.max(right, x);
        bottom = Math.min(bottom, y);
        top = Math.max(top, y);
      }
    }
  }

  return {
    left,
    right,
    bottom,
    top
  };
}
/**
 * A projection of longitude and latitude in degrees to a plane, with north
 * up (the plane's y grows down, as on the screen):
 *   mercator         angles kept, the poles far (a city, a country)
 *   albers           areas kept, a cone through two parallels at a sixth
 *                    and five sixths of the map's latitudes (a wide
 *                    country)
 *   equirectangular  degrees as they are, longitude shortened at the
 *                    middle latitude
 *   plane            the coordinates as they are, y down (a floor plan)
 */


function projectionOf(name, {
  left,
  right,
  bottom,
  top
}) {
  if (name === 'plane') return ([x, y]) => [x, y];
  const middle = (left + right) / 2;

  if (name === 'equirectangular') {
    const squeeze = Math.cos((bottom + top) / 2 * RAD);
    return ([x, y]) => [(x - middle) * squeeze, -y];
  }

  if (name === 'albers') {
    const p1 = (bottom + (top - bottom) / 6) * RAD;
    const p2 = (bottom + (top - bottom) * 5 / 6) * RAD;
    const n = Math.abs(p1 - p2) < 1e-6 ? Math.sin(p1) || 1e-6 : (Math.sin(p1) + Math.sin(p2)) / 2;
    const c = Math.cos(p1) ** 2 + 2 * n * Math.sin(p1);
    const r0 = Math.sqrt(Math.max(0, c - 2 * n * Math.sin((bottom + top) / 2 * RAD))) / n;
    return ([x, y]) => {
      const r = Math.sqrt(Math.max(0, c - 2 * n * Math.sin(y * RAD))) / n;
      const angle = n * (x - middle) * RAD;
      return [r * Math.sin(angle), -(r0 - r * Math.cos(angle))];
    };
  }

  return ([x, y]) => {
    const lat = Math.max(-85, Math.min(85, y)) * RAD;
    return [(x - middle) * RAD, -Math.log(Math.tan(Math.PI / 4 + lat / 2))];
  };
} // A ring's signed area and centroid (the shoelace sums).

function ringFacts(ring) {
  let area = 0;
  let cx = 0;
  let cy = 0;

  for (let index = 0; index < ring.length; index += 1) {
    const [x0, y0] = ring[index];
    const [x1, y1] = ring[(index + 1) % ring.length];
    const cross = x0 * y1 - x1 * y0;
    area += cross;
    cx += (x0 + x1) * cross;
    cy += (y0 + y1) * cross;
  }

  area /= 2;
  return area ? {
    area,
    cx: cx / (6 * area),
    cy: cy / (6 * area)
  } : {
    area: 0,
    cx: ring[0][0],
    cy: ring[0][1]
  };
}

const round = value => Math.round(value * 10) / 10;
/**
 * The regions projected and fitted into `box` {width, height} with `pad`
 * px round, the shape's proportions kept and centred: [{key, name, path,
 * x, y, box, area}] in the regions' order. `path` is SVG path data (the
 * holes drawn by the even-odd rule); a point closer than half a pixel to
 * the one before is left out. (x, y) is the middle of the region's largest
 * polygon, where its name stands; `box` its bounds.
 */


function geoLayout(regions, {
  width,
  height
}, {
  projection = 'mercator',
  pad = 4
} = {}) {
  const flat = projection === 'plane' ? regions : wrapped(regions);
  if (!flat.length) return [];
  const project = projectionOf(projection, extentOf(flat));
  const projected = flat.map(one => ({ ...one,
    polygons: one.polygons.map(polygon => polygon.map(ring => ring.map(project)))
  }));
  const {
    left,
    right,
    bottom,
    top
  } = extentOf(projected);
  const scale = Math.min((width - pad * 2) / (right - left || 1), (height - pad * 2) / (top - bottom || 1));
  const dx = (width - (right - left) * scale) / 2 - left * scale;
  const dy = (height - (top - bottom) * scale) / 2 - bottom * scale;
  return projected.map(one => {
    let path = '';
    let best = {
      area: -1
    };
    let [x0, x1, y0, y1] = [Infinity, -Infinity, Infinity, -Infinity];

    for (const polygon of one.polygons) {
      polygon.forEach((ring, place) => {
        const points = ring.map(([x, y]) => [x * scale + dx, y * scale + dy]);
        let at = null;
        let piece = '';

        for (const point of points) {
          if (at && Math.abs(point[0] - at[0]) < 0.5 && Math.abs(point[1] - at[1]) < 0.5) continue;
          piece += `${piece ? 'L' : 'M'}${round(point[0])} ${round(point[1])}`;
          at = point;

          if (!place) {
            x0 = Math.min(x0, point[0]);
            x1 = Math.max(x1, point[0]);
            y0 = Math.min(y0, point[1]);
            y1 = Math.max(y1, point[1]);
          }
        }

        path += `${piece}Z`;

        if (!place) {
          const facts = ringFacts(points);
          if (Math.abs(facts.area) > best.area) best = {
            area: Math.abs(facts.area),
            x: facts.cx,
            y: facts.cy
          };
        }
      });
    }

    return {
      key: one.key,
      name: one.name,
      path,
      x: best.x,
      y: best.y,
      box: {
        x: x0,
        y: y0,
        w: x1 - x0,
        h: y1 - y0
      },
      area: best.area
    };
  });
}
/**
 * The reading order of placed regions: top to bottom in bands `band` px
 * tall, left to right in each.
 */

function regionOrder(places, band) {
  return places.map((one, index) => ({
    index,
    row: Math.floor(one.y / band),
    x: one.x
  })).sort((a, b) => a.row - b.row || a.x - b.x).map(one => one.index);
}
/**
 * The region nearest above (`up`) or below the one at `from`: among the
 * centres that lie more that way than sideways, the closest; else null.
 */

function nearestRegion(places, from, up) {
  const here = places[from];
  let best = null;
  let bestDistance = Infinity;
  places.forEach((one, index) => {
    if (index === from) return;
    const dy = (one.y - here.y) * (up ? -1 : 1);
    const dx = Math.abs(one.x - here.x);
    if (dy <= 0 || dy < dx / 2) return;
    const distance = Math.hypot(dx, dy);

    if (distance < bestDistance) {
      best = index;
      bestDistance = distance;
    }
  });
  return best;
}

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

/***/ "eeb61a5475f1"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("deb1a4d61565");
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("5b7d7695b41b");
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("43090d1c8307");
/* harmony import */ var _chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("6668151838ce");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("21ed19c5c40f");
/* harmony import */ var _chart_core_heat_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("66a3b5260618");
/* harmony import */ var _chart_core_geo_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("0ef1fec48167");
/* harmony import */ var _js_templates_default__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("e90650684344");
/* harmony import */ var _component_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("57fdfc6f4847");
/* harmony import */ var _lang_en_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("231b10aeb830");
/* harmony import */ var _lang_ru_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("8a7cdf665c38");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__, _js_templates_default__WEBPACK_IMPORTED_MODULE_7__]);
([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__, _js_templates_default__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__);
// sf-chart-map: a choropleth map, a rate or a ratio by region, each region
// filled by the step of its value (docs/research/catalogue.md, Choropleth
// map; docs/DECISIONS.md D16).
//
// The page gives the regions as GeoJSON (the shapes property) and the
// values as rows (items) joined by a region key: the package holds no map,
// so the boundaries, their source and their licence are the page's. The
// element projects the regions (chart-core/geo), fits them into its plot,
// cuts the values into steps on the theme's tone ladders as the heatmap
// does (chart-core/heat, D8), and draws in SVG a path per region with a
// legend of the steps. A person reaches the plot with one Tab stop and
// walks the regions in reading order, Up and Down to the nearest region
// above or below; each is said with its value and its place among the
// others. The chart as a whole is a summary sentence, and every region is
// a row of the table.
//
// It renders into its own light DOM, like every Smart component.










 // The text of the plot, in px, by size rung, as on the line chart.

const FONT = {
  '1/2': 11,
  1: 12,
  2: 14
};
const PROJECTIONS = ['mercator', 'albers', 'equirectangular', 'plane'];
const ChartMapElement = (0,_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__.elementFromManifest)(_component_json__WEBPACK_IMPORTED_MODULE_8__, {
  base: (_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default()),
  lang: {
    en: _lang_en_json__WEBPACK_IMPORTED_MODULE_9__,
    ru: _lang_ru_json__WEBPACK_IMPORTED_MODULE_10__
  },
  source: 'ru',
  actions: {
    reset() {
      this._cursor = null;
      this.requestComponentUpdate('reset');
    }

  }
});
let instances = 0; // A text cut to so many characters, with an ellipsis, which is wider than a
// letter and so takes two places; '' below three letters and the ellipsis.

const cut = (value, chars) => {
  if (value.length <= chars) return value;
  return chars < 5 ? '' : `${value.slice(0, chars - 2)}…`;
};

class SfMap extends ChartMapElement {
  static get props() {
    return { ...super.props,
      rootClass: {
        default: ''
      }
    };
  }

  onConnected() {
    this._uid = this.id || `sf-chart-map-${instances += 1}`;
    this._box = this._box ?? {
      width: 0,
      height: 0
    };
    this._cursor = null;
    this._said = '';
    this._view = 'chart';
  }

  onDisconnected() {
    this._observer?.disconnect();
    this._observer = null;
    clearTimeout(this._table?.timer);
    this._observed = null;
    super.onDisconnected();
  }

  afterRender(changed) {
    if (typeof changed === 'function') return super.afterRender(changed);
    const plot = this.querySelector('.sf-chart-map-plot');

    if (plot && plot !== this._observed && typeof ResizeObserver === 'function') {
      this._observer?.disconnect();
      this._observed = plot;
      this._observer = new ResizeObserver(([entry]) => {
        const width = Math.round(entry.contentRect.width);
        const height = Math.round(entry.contentRect.height);
        if (width === this._box.width && height === this._box.height) return;
        this._box = {
          width,
          height
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
  } // The regions and their values, read again only when the shapes, the
  // data or their mapping change. A region's rank is its place by value,
  // largest first, among the regions with a value.


  model() {
    const key = [this.shapes, this.items, this.region, this.value, this.shapeKey, this.shapeName];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;
    const {
      regions,
      dropped
    } = (0,_chart_core_geo_js__WEBPACK_IMPORTED_MODULE_6__.geoRegions)(this.shapes, {
      keyField: this.shapeKey,
      nameField: this.shapeName
    });
    const joined = (0,_chart_core_geo_js__WEBPACK_IMPORTED_MODULE_6__.geoValues)(this.items, regions, {
      region: this.region,
      value: this.value
    });
    const list = regions.map((one, index) => ({ ...one,
      index,
      value: joined.values.has(one.key) ? joined.values.get(one.key) : null,
      rank: 0
    }));
    const ranked = list.filter(one => one.value !== null).sort((a, b) => b.value - a.value || a.index - b.index);
    ranked.forEach((one, place) => {
      one.rank = place + 1;
    });
    const values = ranked.map(one => one.value);
    this._model = { ...joined,
      regions: list,
      ranked,
      dropped,
      count: ranked.length,
      gaps: list.length - ranked.length,
      min: values.length ? Math.min(...values) : null,
      max: values.length ? Math.max(...values) : null
    };
    return this._model;
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.regions.length && model.count ? 'ready' : 'empty';
  } // The steps of the scale and their colours (chart-core/heat), as on the
  // heatmap. min and max hold only when given.


  scaleSteps(model) {
    const count = (0,_chart_core_heat_js__WEBPACK_IMPORTED_MODULE_5__.stepCount)(this.steps, this.scale);
    const min = this.hasAttribute('min') && Number.isFinite(this.min) ? this.min : model.min;
    const max = this.hasAttribute('max') && Number.isFinite(this.max) ? this.max : model.max;
    const steps = (0,_chart_core_heat_js__WEBPACK_IMPORTED_MODULE_5__.heatSteps)({
      min: Math.min(min, max),
      max: Math.max(min, max),
      middle: Number.isFinite(this.middle) ? this.middle : 0,
      count,
      scale: this.scale
    });
    const colours = (0,_chart_core_heat_js__WEBPACK_IMPORTED_MODULE_5__.heatColours)({
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
    return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatNumber)(value, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.valueFormat, {
      gap: this.words('gap')
    });
  }

  sayStep(step) {
    return this.words('step', {
      from: this.sayY(step.from),
      to: this.sayY(step.to)
    });
  } // Where everything goes: the regions projected into the plot, each with
  // its step and, where the region is wide and tall enough, its name.
  // Null until the plot has a width.


  geometry(model, steps) {
    const {
      width,
      height
    } = this._box;
    if (!width || !height) return null;
    const font = FONT[this.size] ?? 12;
    const projection = PROJECTIONS.includes(this.projection) ? this.projection : 'mercator';
    const places = (0,_chart_core_geo_js__WEBPACK_IMPORTED_MODULE_6__.geoLayout)(model.regions, {
      width,
      height
    }, {
      projection,
      pad: 4
    });
    const labelled = this.labels !== 'none';
    const regions = places.map((place, index) => {
      const one = model.regions[index];
      const shown = { ...place,
        index,
        value: one.value,
        step: (0,_chart_core_heat_js__WEBPACK_IMPORTED_MODULE_5__.stepOf)(steps, one.value),
        nameText: ''
      };
      if (!labelled || place.box.h < font * 1.6) return shown; // A region's name is short words in the page's text: a letter a
      // little narrower than the other charts' guess, and the region's
      // width less a few pixels.

      const name = cut(one.name, Math.floor((place.box.w - 4) / (font * 0.66)));
      shown.nameText = name;
      return shown;
    });
    const order = (0,_chart_core_geo_js__WEBPACK_IMPORTED_MODULE_6__.regionOrder)(regions, font * 3);
    return {
      width,
      height,
      font,
      regions,
      order
    };
  }

  summarize(model) {
    if (this.summary === 'none') return '';
    if (!model.count) return this.words('summary-empty');
    const locale = (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this);

    const count = value => (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatNumber)(value, locale, 'integer');

    const parts = [this.words('summary-total', {
      regions: count(model.regions.length),
      count: count(model.count),
      min: this.sayY(model.min),
      max: this.sayY(model.max)
    })];
    const high = model.ranked[0];
    const low = model.ranked[model.ranked.length - 1];
    parts.push(this.words('summary-high', {
      name: high.name,
      value: this.sayY(high.value)
    }));
    if (low !== high) parts.push(this.words('summary-low', {
      name: low.name,
      value: this.sayY(low.value)
    }));
    if (model.gaps) parts.push(this.words('summary-gaps', {
      count: count(model.gaps)
    }));
    if (model.unmatched) parts.push(this.words('summary-unmatched', {
      count: count(model.unmatched)
    }));
    return parts.join(' ');
  } // A region as one sentence: its name and value with its place, or that it
  // has no data.


  regionLine(region) {
    const model = this.model();
    const one = model.regions[region.index];
    if (one.value === null) return this.words('cursor-gap', {
      name: one.name
    });
    return this.words('cursor', {
      name: one.name,
      value: this.sayY(one.value),
      rank: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatNumber)(one.rank, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), 'integer'),
      count: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatNumber)(model.count, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), 'integer')
    });
  }

  cursorRegion(cursor = this._cursor) {
    const geometry = this._geometry;
    if (!cursor || !geometry) return null;
    return geometry.regions[cursor.index] ?? null;
  }

  setCursor(cursor, {
    say = false
  } = {}) {
    this._cursor = cursor;
    const region = this.cursorRegion(cursor);
    if (say && region) this._said = this.regionLine(region);
    this.requestComponentUpdate('cursor');
  } // The keys walk the regions: Left and Right in reading order (top to
  // bottom, left to right), Up and Down to the nearest region above or
  // below, Home and End to the first and the last.


  onPlotKey(event) {
    const geometry = this._geometry;
    if (!geometry) return;

    if (event.key === 'Escape') {
      if (this._cursor === null) return;
      event.preventDefault();
      this.setCursor(null);
      return;
    }

    if ((event.key === 'Enter' || event.key === ' ') && this._cursor !== null) {
      event.preventDefault();
      this.choose(this.cursorRegion());
      return;
    }

    const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const {
      order,
      regions
    } = geometry;
    const now = this.cursorRegion();
    let index = order[0];
    if (event.key === 'End') index = order[order.length - 1];else if (now && event.key !== 'Home') {
      const at = order.indexOf(now.index);
      if (event.key === 'ArrowRight' || event.key === 'PageDown') index = order[Math.min(order.length - 1, at + 1)];else if (event.key === 'ArrowLeft' || event.key === 'PageUp') index = order[Math.max(0, at - 1)];else index = (0,_chart_core_geo_js__WEBPACK_IMPORTED_MODULE_6__.nearestRegion)(regions, now.index, event.key === 'ArrowUp') ?? now.index;
    }
    this.setCursor({
      index,
      series: 'region'
    }, {
      say: true
    });
  } // The pointer picks the region its path is under.


  placeAt(event) {
    const target = event.target?.closest?.('[data-region]');
    if (!target || !this._geometry) return null;

    const index = this._geometry.regions.findIndex(one => one.key === target.dataset.region);

    return index < 0 ? null : {
      index,
      series: 'region'
    };
  }

  onPointerMove(event) {
    const place = this.placeAt(event);
    if (place?.index === this._cursor?.index) return;
    if (place === null && this.matches(':focus-within')) return;
    this.setCursor(place);
  }

  onPointerLeave() {
    if (this.matches(':focus-within')) return;
    this.setCursor(null);
  }

  onPlotClick(event) {
    const place = this.placeAt(event);
    if (place) this.choose(this.cursorRegion(place));
  }

  choose(region) {
    if (!region) return;
    const one = this.model().regions[region.index];
    this.sfEmit('select', {
      index: one.index,
      region: one.key,
      name: one.name,
      value: one.value,
      rank: one.rank
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
    this._geometry = geometry;
    const tableModel = this.tableModel(model, state === 'ready');
    return this.createTemplateContext({ ...this.getPropsContext(),
      component: this,
      uid: this._uid,
      size: this.size,
      label: this.label || this.words('untitled'),
      state,
      model,
      steps,
      tableModel,
      tableKey: [tableModel, this.label, this.valueFormat, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.table, this.table === 'toggle' ? this._view : 'chart'],
      geometry,
      cursor: this.cursorRegion(),
      said: this._said,
      view: this.table === 'toggle' ? this._view : 'chart',
      legend: this.legend,
      summaryText: state === 'ready' ? this.summarize(model) : '',
      hasDescription: this.hasSlotContent?.('description') ?? false,
      description: this.hasSlotContent?.('description') ? this.getSlotContent('description') : null,
      rootClass: this.getRootClass()
    });
  } // The data the table shows: settled, so a stream does not rebuild it on
  // every render (chart-core/settle). The first data after none shows at
  // once.


  tableModel(model, ready) {
    this._table = this._table ?? {};

    if (!ready) {
      clearTimeout(this._table.timer);
      this._table = {};
      return model;
    }

    return (0,_chart_core_settle_js__WEBPACK_IMPORTED_MODULE_4__.settled)(this._table, model, {
      later: () => this.requestComponentUpdate('table')
    });
  }

  template() {
    return (0,_js_templates_default__WEBPACK_IMPORTED_MODULE_7__.renderMapTemplate)(this.templateContext());
  }

}

SfMap.define('sf-chart-map');
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "e90650684344"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderMapTemplate: () => (/* binding */ renderMapTemplate)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2a080a730149");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("21ed19c5c40f");
/* harmony import */ var _default_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("87693328bdb6");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([lit__WEBPACK_IMPORTED_MODULE_0__]);
var __webpack_async_dependencies_result__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_async_dependencies_result__[0];
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lit__WEBPACK_IMPORTED_MODULE_0__);


 // The figure of a choropleth map: the label and the table button, the
// legend of the steps, the plot (SVG), the summary and the description,
// the live line, and every region as a row of a table.
//
// The plot is one Tab stop, a role="group" named by the label and described
// by the summary; its regions are aria-hidden, because the summary, the
// live line and the table say what they show. A region is filled by its
// step on the theme's tone ladder (chart-core/heat), the steps' fills and
// inks set once on the plot; a region without a value is the empty
// surface with a dashed line, so it is not read as the weakest step. In
// forced colours a region is the canvas with a line of the text colour.

const px = value => `${Math.round(value * 10) / 10}`;

const stepColours = steps => steps.map((step, index) => `--sf-chart-map--fill-${index}: ${step.fill}; --sf-chart-map--ink-${index}: ${step.ink}`).join('; '); // The plot's inside is SVG markup set as the svg element's innerHTML (a
// property, so lit writes no part markers inside it: a first-paint snapshot
// of the plot is the same on every run). Every text is escaped.


const ESCAPES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

const esc = value => String(value).replace(/[&<>"']/gu, one => ESCAPES[one]); // A path per region in its step, its name in the middle where it fits;
// the cursor's region drawn again on top with a ring.


function marksMarkup(g, cursor) {
  let out = '<g class="sf-chart-map-marks" aria-hidden="true">';

  for (const one of g.regions) {
    const step = one.step >= 0 ? ` data-step="${one.step}"` : '';
    out += `<g class="sf-chart-map-region${one.step >= 0 ? '' : ' sf-chart-map-region--gap'}"${step} data-region="${esc(one.key)}">`;
    out += `<path class="sf-chart-map-area" d="${one.path}"/>`;
    if (one.nameText) out += `<text class="sf-chart-map-name" x="${px(one.x)}" y="${px(one.y)}" text-anchor="middle" dominant-baseline="middle">${esc(one.nameText)}</text>`;
    out += '</g>';
  }

  out += '</g>';
  if (cursor) out += `<g class="sf-chart-map-cursor" aria-hidden="true"><path class="sf-chart-map-ring" d="${cursor.path}"/></g>`;
  return out;
} // The scale's legend: a swatch per step with its range, and the gap when a
// region has no value.


function renderKey(context, place) {
  if (context.legend !== place || context.state !== 'ready' || !context.steps.length) return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const {
    component,
    steps,
    model
  } = context;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <ul class=${`sf-chart-map-legend sf-chart-map-legend--${place}`} aria-label=${component.words('legend')}>
      ${steps.map(step => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <li class="sf-chart-map-legend-item">
          <span class="sf-chart-map-swatch" aria-hidden="true" style=${`--sf-chart-map--fill: ${step.fill}`}></span>
          <span class="sf-chart-map-legend-range">${component.sayStep(step)}</span>
        </li>
      `)}
      ${model.gaps ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <li class="sf-chart-map-legend-item">
          <span class="sf-chart-map-swatch sf-chart-map-swatch--gap" aria-hidden="true"></span>
          <span class="sf-chart-map-legend-range">${component.words('gap')}</span>
        </li>
      ` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
    </ul>
  `;
}

function renderTooltip(context, g) {
  const {
    component,
    model,
    cursor
  } = context;
  if (context.tooltip === 'none' || !cursor) return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const one = model.regions[cursor.index];
  const rows = one.value === null ? [['value', component.words('gap')]] : [['value', component.sayY(one.value)], ['rank', component.words('rank-of', {
    rank: String(one.rank),
    count: String(model.count)
  })]];
  const flip = cursor.x > g.width / 2;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${`sf-chart-map-tooltip${flip ? ' sf-chart-map-tooltip--flip' : ''}`} aria-hidden="true"
         style=${`inset-inline-start: ${px(flip ? cursor.box.x : cursor.box.x + cursor.box.w)}px; inset-block-start: ${px(cursor.y)}px`}>
      <div class="sf-chart-map-tooltip-name">${one.name}</div>
      ${rows.map(([key, value]) => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <div class="sf-chart-map-tooltip-row">
          <span>${component.words(key)}</span>
          <span class="sf-chart-map-tooltip-value">${value}</span>
        </div>
      `)}
    </div>
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
} // A row per region, largest value first, the regions without one last.


function tableMarkup(context, shownTable) {
  const {
    component,
    tableModel: model,
    label
  } = context;
  const rows = [...model.ranked, ...model.regions.filter(one => one.value === null)];
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${shownTable ? 'sf-chart-map-table' : 'sf-chart-map-sr'}>
      <table>
        <caption>${label}</caption>
        <thead>
          <tr>
            <th scope="col">${component.words('region')}</th>
            <th scope="col">${component.words('value')}</th>
            <th scope="col">${component.words('rank')}</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map(one => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
            <tr>
              <th scope="row">${one.name}</th>
              <td>${one.value === null ? component.words('gap') : component.sayY(one.value)}</td>
              <td>${one.value === null ? '—' : one.rank}</td>
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
    uid,
    state,
    cursor,
    steps
  } = context;

  if (state === 'loading') {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-map-loading" role="status" aria-busy="true"><span class="sf-chart-map-sr">${component.words('loading')}</span></div>`;
  }

  if (state === 'empty' || state === 'error') {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
      <sf-empty-state class="sf-chart-map-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
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
    <svg class="sf-chart-map-svg" role="group" tabindex="0" focusable="true"
         aria-label=${context.label} aria-roledescription=${component.words('roledescription')}
         aria-describedby=${described || lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
         width=${g.width} height=${g.height} viewBox=${`0 0 ${g.width} ${g.height}`} style=${stepColours(steps)}
         @keydown=${event => component.onPlotKey(event)}
         @pointermove=${event => component.onPointerMove(event)}
         @pointerleave=${() => component.onPointerLeave()}
         @click=${event => component.onPlotClick(event)}
         @blur=${() => component.setCursor(null)}
         .innerHTML=${marksMarkup(g, cursor)}>
    </svg>
    ${renderTooltip(context, g)}
  `;
}

function renderMapTemplate(context) {
  const {
    component,
    uid,
    state
  } = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <figure class=${['sf-chart-map', `sf-chart-map--size-${size}`, `sf-chart-map--${state}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-chart-map-head-row">
        <span class="sf-chart-map-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.table === 'toggle' && state === 'ready' ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<button type="button" class="sf-chart-map-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      </figcaption>
      ${renderKey(context, 'top')}
      <div class="sf-chart-map-plot" ?hidden=${tableView}>${renderPlot(context)}</div>
      ${renderKey(context, 'bottom')}
      ${context.summaryText ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<p class="sf-chart-map-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      ${context.hasDescription ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-map-description" id=${`${uid}-description`}>${context.description}</div>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      <div class="sf-chart-map-sr" aria-live="polite">${context.said}</div>
      ${renderTable(context)}
    </figure>
  `;
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "87693328bdb6"
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

/***/ "57fdfc6f4847"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"id":"smart.chart-map","tag":"sf-chart-map","version":"0.1.0","kind":"leaf","settings":{"label":{"type":"string","default":""},"items":{"type":"list","default":[],"of":"object"},"shapes":{"type":"object","default":{}},"region":{"type":"string","default":""},"value":{"type":"string","default":""},"shape-key":{"type":"string","default":""},"shape-name":{"type":"string","default":""},"projection":{"type":"enum","values":["mercator","albers","equirectangular","plane"],"default":"mercator"},"scale":{"type":"enum","values":["sequential","diverging"],"default":"sequential"},"scheme":{"type":"enum","values":["primary","secondary","tertiary","neutral","success","warning","error","info"],"default":"primary"},"better":{"type":"enum","values":["up","down","none"],"default":"up"},"steps":{"type":"number","default":5},"middle":{"type":"number","default":0},"min":{"type":"number","optional":true},"max":{"type":"number","optional":true},"labels":{"type":"enum","values":["auto","none"],"default":"auto"},"legend":{"type":"enum","values":["top","bottom","none"],"default":"bottom"},"tooltip":{"type":"enum","values":["auto","none"],"default":"auto"},"value-format":{"type":"string","default":"number"},"size":{"type":"enum","values":["1/2","1","2"],"default":"1"},"table":{"type":"enum","values":["toggle","visible","hidden"],"default":"toggle"},"summary":{"type":"enum","values":["auto","none"],"default":"auto"},"data-state":{"type":"enum","values":["auto","loading","ready","empty","error"],"default":"auto"}},"events":{"select":{"carries":{"index":"number","region":"string","name":"string","value":"number","rank":"number"}},"refresh":{"carries":{}}},"actions":{"reset":{"with":{}}},"presentation":{"skeleton":{"late":["items","shapes"]}},"css-variables":{"--sf-chart-map-height":{"type":"length","state":"default"},"--sf-chart-map-label-color":{"type":"color","state":"default"},"--sf-chart-map-hover-background-color":{"type":"color","state":"hover"}}}');

/***/ },

/***/ "231b10aeb830"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Map","runtime":{"untitled":"Chart","roledescription":"map","summary-total":"Regions: {regions}, with data: {count}; values from {min} to {max}.","summary-high":"The most is «{name}»: {value}.","summary-low":"The least is «{name}»: {value}.","summary-gaps":"Without data: {count}.","summary-unmatched":"Rows without a region on the map: {count}.","summary-empty":"No data.","cursor":"{name}: {value}, {rank} of {count}","cursor-gap":"{name}: no data","rank-of":"{rank} of {count}","region":"Region","value":"Value","rank":"Place","legend":"Scale","step":"{from} – {to}","gap":"no data","show-table":"Table","loading":"Loading the chart\'s data","empty-title":"No data for the chart","error-title":"Could not load the data"},"events":{"select":{"label":"Choose a region"},"refresh":{"label":"Load the data again"}},"actions":{"reset":{"label":"Take the cursor away"}}}');

/***/ },

/***/ "8a7cdf665c38"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Карта","runtime":{"untitled":"График","roledescription":"карта","summary-total":"Областей: {regions}, с данными: {count}; значения от {min} до {max}.","summary-high":"Больше всего — «{name}»: {value}.","summary-low":"Меньше всего — «{name}»: {value}.","summary-gaps":"Без данных: {count}.","summary-unmatched":"Строк без области на карте: {count}.","summary-empty":"Нет данных.","cursor":"{name}: {value}, место {rank} из {count}","cursor-gap":"{name}: нет данных","rank-of":"{rank} из {count}","region":"Область","value":"Значение","rank":"Место","legend":"Шкала","step":"{from} – {to}","gap":"нет данных","show-table":"Таблица","loading":"Загрузка данных графика","empty-title":"Нет данных для графика","error-title":"Не удалось загрузить данные"},"events":{"select":{"label":"Выбрать область"},"refresh":{"label":"Загрузить данные заново"}},"actions":{"reset":{"label":"Убрать курсор"}}}');

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
/******/ 	let __webpack_exports__ = __webpack_require__("eeb61a5475f1");
/******/
/******/ })()
;