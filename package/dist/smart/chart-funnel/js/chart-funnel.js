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

/***/ "fc9bb1435f01"
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ROLES: () => (/* binding */ ROLES),
/* harmony export */   checkContrast: () => (/* binding */ checkContrast),
/* harmony export */   colourValue: () => (/* binding */ colourValue),
/* harmony export */   coloursKey: () => (/* binding */ coloursKey),
/* harmony export */   contrast: () => (/* binding */ contrast),
/* harmony export */   readColours: () => (/* binding */ readColours)
/* harmony export */ });
// A page's own colours for series and parts: the colors setting, an object of
// key → colour ({fact: 'primary', plan: 'neutral', errors: 'error'}), keyed
// by a series' key or a part's category (docs/DECISIONS.md D6).
//
// A colour is a Framework role or any CSS colour. A role is the role's graphic
// tone, so it follows the theme, light and dark; a CSS colour (#0a7, oklch(),
// var(--brand)) is taken as it is. Anything else is dropped with a warning: a
// colour is only ever a CSS value, never markup or a declaration. A series
// without a colour keeps the palette's by its place, as before.
//
// A colour of the page's own is checked once against the chart's background:
// under 3:1 the console says so, because a mark the eye cannot find is not
// found by a person either (WCAG 1.4.11). The chart still draws it.
const ROLES = ['primary', 'secondary', 'tertiary', 'neutral', 'success', 'warning', 'error', 'info'];
const FORBIDDEN = /[;{}<>"'\\]/u; // One colour value as CSS, or '' when it is not a colour.

function colourValue(raw) {
  const value = String(raw ?? '').trim();
  if (!value || FORBIDDEN.test(value)) return '';
  if (ROLES.includes(value)) return `var(--sf-on-${value}-container-graphic)`;

  if (typeof CSS !== 'undefined' && typeof CSS.supports === 'function') {
    return CSS.supports('color', value) ? value : '';
  } // Without CSS (a test runner): a hex colour or a variable only.


  return /^(#[0-9a-f]{3,8}|var\(--[\w-]+\))$/iu.test(value) ? value : '';
} // The colors setting as a Map of key → CSS value. A string is read as JSON,
// as an attribute gives it.

function readColours(raw, warn = () => {}) {
  let source = raw;

  if (typeof source === 'string') {
    try {
      source = source.trim() ? JSON.parse(source) : {};
    } catch {
      warn(`colors is not JSON: ${source}`);
      return new Map();
    }
  }

  const out = new Map();
  if (!source || typeof source !== 'object' || Array.isArray(source)) return out;

  for (const [key, one] of Object.entries(source)) {
    const value = colourValue(one);
    if (value) out.set(String(key), value);else warn(`colors.${key}: «${one}» is neither a role (${ROLES.join(', ')}) nor a CSS colour`);
  }

  return out;
} // A stable key of the map, so a chart reads it again only on a change.

const coloursKey = colours => [...colours].map(([key, value]) => `${key}=${value}`).join('|'); // --- Contrast ---------------------------------------------------------------

let pad = null; // A colour the browser resolved (rgb(), oklch(), color()) as sRGB 0..255,
// through a 1×1 canvas, the one place every colour space comes out the same.

function rgbOf(colour) {
  if (typeof document === 'undefined') return null;
  pad = pad || document.createElement('canvas').getContext('2d', {
    willReadFrequently: true
  });
  if (!pad) return null;
  pad.clearRect(0, 0, 1, 1);
  pad.fillStyle = '#000';
  pad.fillStyle = colour;
  pad.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = pad.getImageData(0, 0, 1, 1).data;
  return a === 0 ? null : [r, g, b];
}

function luminance([r, g, b]) {
  const lin = c => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };

  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
} // The colour under the chart: the first ancestor with a background of its
// own, white when there is none.

function groundOf(element) {
  for (let node = element; node && node.nodeType === 1; node = node.parentElement) {
    const rgb = rgbOf(getComputedStyle(node).backgroundColor);
    if (rgb) return rgb;
  }

  return [255, 255, 255];
}

const told = new Set(); // Checks each page colour once: the colour is resolved by a probe in the
// chart's own place, so a role and a variable come out as the theme has them.

function checkContrast(host, colours, tag) {
  if (!colours.size || typeof getComputedStyle !== 'function') return;
  const probe = document.createElement('span');
  probe.hidden = true;
  host.append(probe);

  try {
    const ground = groundOf(host);

    for (const [key, value] of colours) {
      probe.style.color = value;
      const rgb = rgbOf(getComputedStyle(probe).color);
      if (!rgb) continue;
      const ratio = contrast(rgb, ground);
      const said = `${tag}|${key}|${value}|${ground}`;

      if (ratio < 3 && !told.has(said)) {
        told.add(said);
        console.warn(`<${tag}> colors.${key} (${value}) is ${ratio.toFixed(2)}:1 against the background; a mark needs 3:1.`);
      }
    }
  } finally {
    probe.remove();
  }
}

/***/ },

/***/ "132d5cf6d077"
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   moveCursor: () => (/* binding */ moveCursor)
/* harmony export */ });
// The keyboard cursor of a plot (docs/research/rendering.md §3): one Tab stop,
// arrows along x, up and down across the shown series, Home and End, Page
// Up and Page Down a tenth of the points at a time. Past `bucketFrom`
// points an arrow moves by a bucket, so a long series is crossed in about
// a hundred presses, not ten thousand.

/** The next {index, series} for a key, or null when the key is not the cursor's. */
function moveCursor(cursor, key, {
  count,
  shown,
  bucketFrom = 200
}) {
  if (!count || !shown.length) return null;
  const start = cursor ?? {
    index: 0,
    series: shown[0]
  };
  const step = count > bucketFrom ? Math.ceil(count / 100) : 1;
  const page = Math.max(1, Math.round(count / 10));
  const place = Math.max(0, shown.indexOf(start.series));

  const clamp = index => Math.max(0, Math.min(count - 1, index)); // The first key only puts the cursor on the first point.


  if (!cursor && ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(key)) return {
    index: 0,
    series: shown[0]
  };

  switch (key) {
    case 'ArrowRight':
      return {
        index: clamp(start.index + step),
        series: start.series
      };

    case 'ArrowLeft':
      return {
        index: clamp(start.index - step),
        series: start.series
      };

    case 'ArrowDown':
      return {
        index: start.index,
        series: shown[Math.min(shown.length - 1, place + 1)]
      };

    case 'ArrowUp':
      return {
        index: start.index,
        series: shown[Math.max(0, place - 1)]
      };

    case 'Home':
      return {
        index: 0,
        series: start.series
      };

    case 'End':
      return {
        index: count - 1,
        series: start.series
      };

    case 'PageDown':
      return {
        index: clamp(start.index + page),
        series: start.series
      };

    case 'PageUp':
      return {
        index: clamp(start.index - page),
        series: start.series
      };

    default:
      return null;
  }
}

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

/***/ "7aaf4078542c"
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   funnelStages: () => (/* binding */ funnelStages)
/* harmony export */ });
// The stages of a funnel (docs/research/catalogue.md, Funnel): each stage's
// share of the widest, its conversion from the stage before and from the
// first, and where the most is lost. A stage with no value is a gap: it has
// no bar and no conversion, and the stage after it has none from it either.

/** The stages with share, fromPrevious, fromFirst and drop, and the facts of the whole. */
function funnelStages(rows) {
  const known = rows.filter(row => row.value !== null);
  const widest = Math.max(0, ...known.map(row => row.value));
  const first = rows.find(row => row.value !== null && row.value > 0) ?? null;
  const stages = rows.map((row, index) => {
    const before = index > 0 ? rows[index - 1].value : null;
    const has = row.value !== null;
    return { ...row,
      share: has && widest > 0 ? Math.max(0, row.value) / widest : 0,
      fromPrevious: has && before !== null && before > 0 && index > 0 ? row.value / before : null,
      fromFirst: has && first && index > first.index ? row.value / first.value : null,
      drop: has && before !== null && index > 0 ? before - row.value : null
    };
  });
  const last = [...stages].reverse().find(stage => stage.value !== null) ?? null;
  const lost = stages.filter(stage => stage.fromPrevious !== null && stage.fromPrevious < 1);
  const worst = lost.length ? lost.reduce((most, stage) => stage.fromPrevious < most.fromPrevious ? stage : most) : null; // A stage wider than the one before means the stages are not nested.

  const grows = stages.some(stage => stage.fromPrevious !== null && stage.fromPrevious > 1);
  return {
    stages,
    first,
    last,
    overall: first && last && last.index > first.index ? last.value / first.value : null,
    worst,
    grows,
    gaps: stages.filter(stage => stage.value === null).length
  };
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

/***/ "650b475531cc"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("deb1a4d61565");
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("5b7d7695b41b");
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("43090d1c8307");
/* harmony import */ var _chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("37677343b39a");
/* harmony import */ var _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("6668151838ce");
/* harmony import */ var _chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("132d5cf6d077");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("21ed19c5c40f");
/* harmony import */ var _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("fc9bb1435f01");
/* harmony import */ var _chart_core_funnel_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("7aaf4078542c");
/* harmony import */ var _js_templates_default__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("629accafca95");
/* harmony import */ var _component_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("366e64cc9175");
/* harmony import */ var _lang_en_json__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("5c35c1683fa1");
/* harmony import */ var _lang_ru_json__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("dd935618fac9");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__, _js_templates_default__WEBPACK_IMPORTED_MODULE_9__]);
([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__, _js_templates_default__WEBPACK_IMPORTED_MODULE_9__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__);
// sf-chart-funnel: the stages of a process, each a subset of the last, as
// bars on a common baseline with the value and the conversion beside each
// stage (docs/research/catalogue.md, Funnel).
//
// The element reads its data once into stages (chart-core/data) in the
// data's order, which is the process, and works out the conversions
// (chart-core/funnel). A stage is an HTML row of the size rung's height and
// its bar's length a share of the widest stage, so the funnel needs no
// measured width and its first paint is the drawn funnel. A person reaches
// the stages with one Tab stop and walks them with the arrows
// (chart-core/cursor); every move is said in a polite live region, the
// whole in a summary sentence, and the same data is a table on request.
//
// It renders into its own light DOM, like every Smart component.













const ChartFunnelElement = (0,_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__.elementFromManifest)(_component_json__WEBPACK_IMPORTED_MODULE_10__, {
  base: (_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default()),
  lang: {
    en: _lang_en_json__WEBPACK_IMPORTED_MODULE_11__,
    ru: _lang_ru_json__WEBPACK_IMPORTED_MODULE_12__
  },
  source: 'ru'
});
let instances = 0;

class SfFunnel extends ChartFunnelElement {
  static get props() {
    return { ...super.props,
      rootClass: {
        default: ''
      }
    };
  }

  onConnected() {
    this._uid = this.id || `sf-chart-funnel-${instances += 1}`;
    this._cursor = null;
    this._said = '';
    this._view = 'chart';
  }

  onDisconnected() {
    clearTimeout(this._table?.timer);
    super.onDisconnected();
  }

  afterRender(changed) {
    if (typeof changed === 'function') return super.afterRender(changed);
    const own = this.colour();

    if (own !== this._colourChecked && this.isConnected) {
      this._colourChecked = own;
      if (own) (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7__.checkContrast)(this, new Map([['color', own]]), 'sf-chart-funnel');
    }

    return undefined;
  } // The page's own colour (the color setting: a Framework role or a CSS
  // colour, chart-core/colors), '' when unset or not a colour.


  colour() {
    if (this.color !== this._colourRaw) {
      this._colourRaw = this.color;
      this._colour = (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7__.colourValue)(this.color);
      if (this.color && !this._colour) console.warn(`<sf-chart-funnel> color «${this.color}» is neither a Framework role nor a CSS colour`);
    }

    return this._colour || '';
  }

  words(key, vars) {
    return this.sfWord(key, vars ? {
      vars
    } : undefined);
  } // The data as stages in the data's order, each with its conversions.


  model() {
    const key = [this.items, this.names, this.stage, this.value];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;
    const read = (0,_chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__.readSeries)(this.items, {
      x: this.stage,
      y: this.value.split(',')[0].trim(),
      xScale: 'category'
    });
    const one = read.series[0];
    const names = this.names || {};
    const unit = read.kind === 'time' ? (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.timeUnitOf)(read.xs) : 'day';

    const sayKey = index => {
      const label = read.labels[index];
      if (names[label] !== undefined) return names[label];
      if (read.kind === 'time') return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatTime)(read.xs[index], (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), unit, {
        form: 'full'
      });
      return String(label ?? '');
    };

    const rows = read.xs.map((_, index) => ({
      key: String(read.labels[index] ?? ''),
      name: sayKey(index),
      value: one ? one.values[index] : null,
      index
    }));
    this._model = {
      kind: read.kind,
      stageField: read.xField,
      valueField: one?.key ?? '',
      ...(0,_chart_core_funnel_js__WEBPACK_IMPORTED_MODULE_8__.funnelStages)(rows)
    };
    return this._model;
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.stages.some(stage => stage.value !== null) ? 'ready' : 'empty';
  }

  sayY(value) {
    return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(value, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.valueFormat, {
      gap: this.words('gap')
    });
  }

  sayShare(share) {
    return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(share, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), 'percent');
  } // The share written beside a stage, by the conversion setting; none for
  // the first stage, a gap or a share that cannot be had.


  besideShare(stage) {
    const share = this.conversion === 'first' ? stage.fromFirst : this.conversion === 'none' ? null : stage.fromPrevious;
    return share === null ? '' : this.sayShare(share);
  }

  sayStage(stage) {
    if (stage.value === null) return this.words('gap');
    if (stage.fromPrevious === null && stage.fromFirst === null) return this.words('stage-first', {
      value: this.sayY(stage.value)
    });
    return this.words('stage-next', {
      value: this.sayY(stage.value),
      previous: stage.fromPrevious === null ? this.words('gap') : this.sayShare(stage.fromPrevious),
      first: stage.fromFirst === null ? this.words('gap') : this.sayShare(stage.fromFirst)
    });
  }

  summarize(model) {
    if (this.summary === 'none') return '';
    const out = [];

    if (model.overall !== null) {
      out.push(this.words('summary-whole', {
        count: model.stages.length,
        from: this.sayY(model.first.value),
        to: this.sayY(model.last.value),
        overall: this.sayShare(model.overall)
      }));
    } else {
      out.push(this.words('summary-short', {
        count: model.stages.length
      }));
    }

    if (model.worst) {
      const before = model.stages[model.worst.index - 1];
      out.push(this.words('summary-worst', {
        from: before.name,
        to: model.worst.name,
        share: this.sayShare(model.worst.fromPrevious)
      }));
    }

    if (model.grows) out.push(this.words('summary-grows'));
    if (model.gaps) out.push(this.words('summary-gaps', {
      count: model.gaps
    }));
    return out.join(' ');
  }

  cursorLine(model, cursor) {
    const stage = model.stages[cursor.index];
    return stage ? this.words('cursor', {
      name: stage.name,
      stage: this.sayStage(stage)
    }) : '';
  }

  setCursor(cursor, {
    say = false
  } = {}) {
    this._cursor = cursor;
    if (say && cursor) this._said = this.cursorLine(this.model(), cursor);
    this.requestComponentUpdate('cursor');
  } // The stages go down the page, so Down and Right go to the next stage, Up
  // and Left back (in either reading direction: the order is the process,
  // not a side); Home and End go to the first and the last.


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

    const count = this.model().stages.length;
    if (!count) return;
    const flat = {
      ArrowUp: 'ArrowLeft',
      ArrowDown: 'ArrowRight'
    }[event.key] ?? event.key;
    const moved = (0,_chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_5__.moveCursor)(this._cursor, flat, {
      count,
      shown: ['stage']
    });
    if (!moved) return;
    event.preventDefault();
    this.setCursor(moved, {
      say: true
    });
  }

  pointAt(event) {
    const row = event.target.closest?.('[data-place]');
    return row ? {
      index: Number(row.dataset.place),
      series: 'stage'
    } : null;
  }

  onPointerMove(event) {
    const point = this.pointAt(event);

    if (!point) {
      if (this._cursor && !this.matches(':focus-within')) this.setCursor(null);
      return;
    }

    if (this._cursor && point.index === this._cursor.index) return;
    this.setCursor(point);
  }

  onPointerLeave() {
    if (this.matches(':focus-within')) return;
    this.setCursor(null);
  }

  onPlotClick(event) {
    const point = this.pointAt(event);
    if (point) this.choose(point);
  } // select carries the stage as the data gave it: its key as x, its place,
  // its value (null for a gap).


  choose(cursor) {
    const model = this.model();
    const stage = model.stages[cursor.index];
    if (!stage) return;
    this.sfEmit('select', {
      series: model.valueField,
      index: stage.index,
      x: stage.key,
      value: stage.value
    });
  }

  toggleView() {
    this._view = this._view === 'table' ? 'chart' : 'table';
    this.requestComponentUpdate('view');
  }

  templateContext() {
    const model = this.model();
    const state = this.state(model);
    const cursor = this._cursor && model.stages[this._cursor.index] ? this._cursor : null;
    const tableModel = this.tableModel(model, state === 'ready');
    return this.createTemplateContext({ ...this.getPropsContext(),
      component: this,
      uid: this._uid,
      size: this.size,
      label: this.label || this.words('untitled'),
      state,
      model,
      stages: state === 'ready' ? model.stages : [],
      colour: this.colour(),
      tableKey: [tableModel, this.label, this.stageLabel, this.valueLabel, this.valueFormat, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.table, this.table === 'toggle' ? this._view : 'chart'],
      rows: tableModel.stages,
      cursor,
      said: this._said,
      view: this.table === 'toggle' ? this._view : 'chart',
      stageLabel: this.stageLabel || model.stageField || this.words('stage-column'),
      valueLabel: this.valueLabel || model.valueField || this.words('value-column'),
      summaryText: state === 'ready' ? this.summarize(model) : '',
      hasDescription: this.hasSlotContent?.('description') ?? false,
      description: this.hasSlotContent?.('description') ? this.getSlotContent('description') : null,
      rootClass: this.getRootClass()
    });
  } // The data the table shows: settled, so a stream or a pointer move does
  // not rebuild a row per stage on every render (chart-core/settle).
  // The first data after none shows at once: only a change of data already
  // shown is held.


  tableModel(model, ready) {
    this._table = this._table ?? {};

    if (!ready) {
      clearTimeout(this._table.timer);
      this._table = {};
      return model;
    }

    return (0,_chart_core_settle_js__WEBPACK_IMPORTED_MODULE_6__.settled)(this._table, model, {
      later: () => this.requestComponentUpdate('table')
    });
  }

  template() {
    return (0,_js_templates_default__WEBPACK_IMPORTED_MODULE_9__.renderFunnelTemplate)(this.templateContext());
  }

}

SfFunnel.define('sf-chart-funnel');
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "629accafca95"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderFunnelTemplate: () => (/* binding */ renderFunnelTemplate)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2a080a730149");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("21ed19c5c40f");
/* harmony import */ var _default_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("b88bff938b6f");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([lit__WEBPACK_IMPORTED_MODULE_0__]);
var __webpack_async_dependencies_result__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_async_dependencies_result__[0];
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lit__WEBPACK_IMPORTED_MODULE_0__);


 // The figure of a funnel: the label with the table button, the stages, the
// summary and the description, the live line, and the same data as a
// table.
//
// The stages are one Tab stop, a role="group" named by the label and
// described by the summary; their rows are aria-hidden, because the
// summary, the live line and the table say what they show. A row is the
// stage's name, its bar, its value and its share; the bar's length is the
// stage's share of the widest stage, a unitless number in a style, and
// every bar is the one colour of the funnel. A page's own colour (the color
// setting) is --custom in a style on the stages.

const share = value => `${Math.round(value * 10000) / 10000}`; // A name or a value is the page's text written into markup, so it is
// escaped; a page's colour is checked to be a colour (chart-core/colors)
// and escaped all the same.


const ESCAPES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

const esc = value => String(value).replace(/[&<>"']/gu, one => ESCAPES[one]); // The stages' inside is markup set as the element's innerHTML (a property,
// so lit writes no part markers inside it: a first-paint snapshot of the
// stages is the same on every run).


function stagesMarkup(context) {
  const {
    component,
    stages,
    cursor
  } = context;
  let out = '';

  for (const [place, stage] of stages.entries()) {
    const gap = stage.value === null;
    const marks = [gap ? ' sf-chart-funnel-stage--gap' : '', cursor && cursor.index !== place ? ' sf-chart-funnel-stage--dim' : '', cursor && cursor.index === place ? ' sf-chart-funnel-stage--current' : ''].join('');
    const bar = gap ? '' : `<span class="sf-chart-funnel-bar" style="--sf-chart-funnel--share: ${share(stage.share)}"></span>`;
    out += `<div class="sf-chart-funnel-stage${marks}" data-place="${place}" aria-hidden="true">` + `<span class="sf-chart-funnel-name">${esc(stage.name)}</span>` + `<span class="sf-chart-funnel-track">${bar}</span>` + `<span class="sf-chart-funnel-value">${esc(component.sayY(stage.value))}</span>` + `<span class="sf-chart-funnel-share">${esc(component.besideShare(stage))}</span>` + '</div>';
  }

  return out;
} // The tooltip stands under the current stage's row, at the bar's start.


function renderTooltip(context, cursor) {
  if (!cursor || context.tooltip === 'none') return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const {
    component,
    stages
  } = context;
  const stage = stages[cursor.index];
  if (!stage) return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class="sf-chart-funnel-tooltip" aria-hidden="true" style=${`--sf-chart-funnel--at: ${cursor.index + 1}`}>
      <span class="sf-chart-funnel-tooltip-name">${stage.name}</span>
      <span class="sf-chart-funnel-tooltip-value">${component.sayY(stage.value)}</span>
      ${stage.fromPrevious === null ? lit__WEBPACK_IMPORTED_MODULE_0__.nothing : (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-chart-funnel-tooltip-share">${component.words('previous-short', {
    share: component.sayShare(stage.fromPrevious)
  })}</span>`}
      ${stage.fromFirst === null ? lit__WEBPACK_IMPORTED_MODULE_0__.nothing : (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-chart-funnel-tooltip-share">${component.words('first-short', {
    share: component.sayShare(stage.fromFirst)
  })}</span>`}
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
}

function tableMarkup(context, shownTable) {
  const {
    component,
    label
  } = context;

  const shareOr = value => value === null ? component.words('gap') : component.sayShare(value);

  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${shownTable ? 'sf-chart-funnel-table' : 'sf-chart-funnel-sr'}>
      <table>
        <caption>${label}</caption>
        <thead>
          <tr>
            <th scope="col">${context.stageLabel}</th>
            <th scope="col">${context.valueLabel}</th>
            <th scope="col">${component.words('previous-column')}</th>
            <th scope="col">${component.words('first-column')}</th>
          </tr>
        </thead>
        <tbody>
          ${context.rows.map((row, place) => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
            <tr>
              <th scope="row">${row.name}</th>
              <td>${component.sayY(row.value)}</td>
              <td>${place === 0 ? '' : shareOr(row.fromPrevious)}</td>
              <td>${place === 0 ? '' : shareOr(row.fromFirst)}</td>
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
    uid,
    state,
    cursor
  } = context;

  if (state === 'loading') {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-funnel-stages sf-chart-funnel-stages--loading" role="status" aria-busy="true"><span class="sf-chart-funnel-sr">${component.words('loading')}</span></div>`;
  }

  if (state === 'empty' || state === 'error') {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
      <sf-empty-state class="sf-chart-funnel-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
        heading=${component.words(state === 'error' ? 'error-title' : 'empty-title')} text=""
        @sf-empty-state-action=${event => {
      event.stopPropagation();
      component.sfEmit('refresh', {});
    }}></sf-empty-state>
    `;
  }

  const described = [context.summaryText ? `${uid}-summary` : '', context.hasDescription ? `${uid}-description` : ''].filter(Boolean).join(' ');
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${`sf-chart-funnel-stages${context.colour ? ' sf-chart-funnel-stages--custom' : ''}`} role="group" tabindex="0"
         aria-label=${context.label} aria-roledescription=${component.words('roledescription')}
         aria-describedby=${described || lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
         style=${context.colour ? `--sf-chart-funnel--custom: ${esc(context.colour)}` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
         @keydown=${event => component.onPlotKey(event)}
         @pointermove=${event => component.onPointerMove(event)}
         @pointerleave=${() => component.onPointerLeave()}
         @click=${event => component.onPlotClick(event)}
         @blur=${() => component.setCursor(null)}
         .innerHTML=${stagesMarkup(context)}></div>
    ${renderTooltip(context, cursor)}
  `;
}

function renderFunnelTemplate(context) {
  const {
    component,
    uid,
    state
  } = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <figure class=${['sf-chart-funnel', `sf-chart-funnel--size-${size}`, `sf-chart-funnel--${state}`, `sf-chart-funnel--align-${context.align === 'center' ? 'center' : 'start'}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-chart-funnel-head">
        <span class="sf-chart-funnel-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.table === 'toggle' && state === 'ready' ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<button type="button" class="sf-chart-funnel-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      </figcaption>
      <div class="sf-chart-funnel-plot" ?hidden=${tableView}>${renderPlot(context)}</div>
      ${context.summaryText ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<p class="sf-chart-funnel-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      ${context.hasDescription ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-funnel-description" id=${`${uid}-description`}>${context.description}</div>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      <div class="sf-chart-funnel-sr" aria-live="polite">${context.said}</div>
      ${renderTable(context)}
    </figure>
  `;
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "b88bff938b6f"
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

/***/ "366e64cc9175"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"id":"smart.chart-funnel","tag":"sf-chart-funnel","version":"0.1.0","kind":"leaf","settings":{"label":{"type":"string","default":""},"items":{"type":"list","default":[],"of":"object"},"names":{"type":"object","default":{}},"stage":{"type":"string","default":""},"value":{"type":"string","default":""},"conversion":{"type":"enum","values":["previous","first","none"],"default":"previous"},"align":{"type":"enum","values":["start","center"],"default":"start"},"color":{"type":"string","default":""},"tooltip":{"type":"enum","values":["stage","none"],"default":"stage"},"stage-label":{"type":"string","default":""},"value-label":{"type":"string","default":""},"value-format":{"type":"string","default":"number"},"size":{"type":"enum","values":["1/2","1","2"],"default":"1"},"table":{"type":"enum","values":["toggle","visible","hidden"],"default":"toggle"},"summary":{"type":"enum","values":["auto","none"],"default":"auto"},"data-state":{"type":"enum","values":["auto","loading","ready","empty","error"],"default":"auto"}},"events":{"select":{"carries":{"series":"string","index":"number","x":"string","value":"number"}},"refresh":{"carries":{}}},"presentation":{"skeleton":{"late":["items"]}},"css-variables":{"--sf-chart-funnel-color":{"type":"color","state":"default"},"--sf-chart-funnel-label-color":{"type":"color","state":"default"},"--sf-chart-funnel-bar-radius":{"type":"length","state":"default"}}}');

/***/ },

/***/ "5c35c1683fa1"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Funnel","runtime":{"untitled":"Funnel","roledescription":"funnel","cursor":"{name}: {stage}","gap":"no data","show-table":"Table","loading":"Loading the chart data","empty-title":"No data for the chart","error-title":"The data could not be loaded","stage-first":"{value}","stage-next":"{value}, {previous} of the previous, {first} of the first","previous-short":"{share} of the previous","first-short":"{share} of the first","summary-whole":"Stages: {count}, from {from} to {to}, overall conversion {overall}.","summary-short":"Stages: {count}.","summary-worst":"The most is lost between «{from}» and «{to}»: {share} go on.","summary-grows":"The stages are not nested: a stage is larger than the one before.","summary-gaps":"No data: {count}.","stage-column":"Stage","value-column":"Value","previous-column":"Of the previous","first-column":"Of the first"},"events":{"select":{"label":"Choose a stage"},"refresh":{"label":"Load the data again"}}}');

/***/ },

/***/ "dd935618fac9"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Воронка","runtime":{"untitled":"Воронка","roledescription":"воронка","cursor":"{name}: {stage}","gap":"нет данных","show-table":"Таблица","loading":"Загрузка данных диаграммы","empty-title":"Нет данных для диаграммы","error-title":"Не удалось загрузить данные","stage-first":"{value}","stage-next":"{value}, {previous} от предыдущего, {first} от первого","previous-short":"{share} от предыдущего","first-short":"{share} от первого","summary-whole":"Этапов: {count}, от {from} до {to}, итоговая конверсия {overall}.","summary-short":"Этапов: {count}.","summary-worst":"Больше всего теряется между «{from}» и «{to}»: дальше проходит {share}.","summary-grows":"Этапы не вложены: есть этап больше предыдущего.","summary-gaps":"Нет данных: {count}.","stage-column":"Этап","value-column":"Значение","previous-column":"От предыдущего","first-column":"От первого"},"events":{"select":{"label":"Выбрать этап"},"refresh":{"label":"Загрузить данные заново"}}}');

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
/******/ 	let __webpack_exports__ = __webpack_require__("650b475531cc");
/******/
/******/ })()
;