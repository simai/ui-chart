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

/***/ "13016023b0f5"
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   minMaxIndexes: () => (/* binding */ minMaxIndexes)
/* harmony export */ });
// Fewer points than pixels (docs/research/rendering.md §2): a path with more
// than two points per pixel column of the plot draws nothing the eye can
// tell apart, so it keeps, per column, the first, the lowest, the highest
// and the last point. Peaks and dips survive; the shape is the same.

/**
 * The indexes to draw of `values` at x pixels `px` (sorted), for a plot
 * `width` px wide. Gaps (null) are kept, so a line still breaks where data
 * is missing. Returns every index when there are few enough.
 */
function minMaxIndexes(px, values, width, {
  limit = 2
} = {}) {
  const n = values.length;
  if (n <= Math.max(4, width * limit)) return Array.from({
    length: n
  }, (_, index) => index);
  const keep = [];
  let column = null;
  let first = -1;
  let low = -1;
  let high = -1;
  let last = -1;

  const flush = () => {
    if (first === -1) return;

    for (const index of [...new Set([first, low, high, last])].sort((a, b) => a - b)) keep.push(index);

    first = low = high = last = -1;
  };

  for (let index = 0; index < n; index += 1) {
    const value = values[index];

    if (value === null) {
      flush();
      keep.push(index);
      column = null;
      continue;
    }

    const at = Math.floor(px[index]);

    if (at !== column) {
      flush();
      column = at;
    }

    if (first === -1) {
      first = low = high = index;
    }

    if (value < values[low]) low = index;
    if (value > values[high]) high = index;
    last = index;
  }

  flush();
  return keep;
}

/***/ },

/***/ "40ff9ca61ced"
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   seriesFacts: () => (/* binding */ seriesFacts),
/* harmony export */   trendOf: () => (/* binding */ trendOf)
/* harmony export */ });
// What a chart says in words (docs/research/rendering.md §3): the summary a
// screen reader hears before the plot, and the line it hears as the cursor
// moves. The words come from the component's dictionary; this only picks
// the facts.

/** {first, last, min, max, minAt, maxAt, count} of one series, or null when it is all gaps. */
function seriesFacts(values) {
  let first = null;
  let last = null;
  let min = Infinity;
  let max = -Infinity;
  let minAt = -1;
  let maxAt = -1;
  let count = 0;
  values.forEach((value, index) => {
    if (value === null) return;
    count += 1;
    if (first === null) first = index;
    last = index;

    if (value < min) {
      min = value;
      minAt = index;
    }

    if (value > max) {
      max = value;
      maxAt = index;
    }
  });
  return count ? {
    first,
    last,
    min,
    max,
    minAt,
    maxAt,
    count
  } : null;
}
/** up, down or flat: the change from the first value to the last, against the range. */

function trendOf(values) {
  const facts = seriesFacts(values);
  if (!facts) return 'flat';
  const change = values[facts.last] - values[facts.first];
  const range = facts.max - facts.min;
  if (range === 0 || Math.abs(change) < range * 0.05) return 'flat';
  return change > 0 ? 'up' : 'down';
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

/***/ "b3159bcb2ffd"
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PALETTES: () => (/* binding */ PALETTES)
/* harmony export */ });
// Generated by scripts/chart-palettes.mjs (docs/DECISIONS.md D7); do not edit.
// The named palettes of the palette setting: each colour is a light-dark()
// pair on the Framework's tone ladder, 3:1 against surfaces 0-2 in its theme.
const PALETTES = {
  vivid: ['var(--sf-chart-1, var(--sf-on-primary-container-graphic))', 'var(--sf-chart-2, light-dark(#ac3500, #cb4f1c))', 'var(--sf-chart-3, light-dark(#a91d8e, #c63fa9))', 'var(--sf-chart-4, light-dark(#009847, #0ab657))', 'var(--sf-chart-5, light-dark(#d7308a, #f651a4))', 'var(--sf-chart-6, light-dark(#0091a6, #00adc7))', 'var(--sf-chart-7, light-dark(#ce2047, #ed435e))', 'var(--sf-chart-8, light-dark(#006c52, #008768))'],
  soft: ['light-dark(#6473b4, #7f8dd0)', 'light-dark(#9d583d, #ba7154)', 'light-dark(#12947e, #3caf98)', 'light-dark(#935589, #ae6ea3)', 'light-dark(#56915c, #70ac75)', 'light-dark(#0090b0, #00acd2)', 'light-dark(#c2697c, #df8396)', 'light-dark(#0071a7, #328ac4)'],
  warm: ['light-dark(#d54234, #f55f4b)', 'light-dark(#da4aaf, #f868ca)', 'light-dark(#c76c00, #e78625)', 'light-dark(#b20a7f, #d03799)', 'light-dark(#8b5000, #ae6500)', 'light-dark(#ee3e76, #ff6c92)'],
  cool: ['light-dark(#4872d9, #688bf6)', 'light-dark(#006d3a, #00894a)', 'light-dark(#883f9e, #a359b9)', 'light-dark(#009579, #00b291)', 'light-dark(#b166c7, #cd80e3)', 'light-dark(#006687, #0080a9)'],
  brand: ['light-dark(var(--sf-primary-20), var(--sf-primary-85))', 'light-dark(var(--sf-primary-30), var(--sf-primary-80))', 'light-dark(var(--sf-primary-40), var(--sf-primary-70))', 'light-dark(var(--sf-primary-50), var(--sf-primary-60))']
};

/***/ },

/***/ "5fc4022962c0"
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   areaPath: () => (/* binding */ areaPath),
/* harmony export */   bandPath: () => (/* binding */ bandPath),
/* harmony export */   linePath: () => (/* binding */ linePath),
/* harmony export */   runs: () => (/* binding */ runs)
/* harmony export */ });
// Line and area paths (docs/research/parameters.md §6): straight, step and a
// smooth curve that never overshoots the data (a monotone cubic), with a gap
// wherever a value is missing unless `gaps="connect"`.
const round = value => Math.round(value * 10) / 10;
/** Runs of consecutive points; a null point ends a run (or is dropped with connect). */


function runs(points, gaps = 'break') {
  const out = [];
  let current = [];

  for (const point of points) {
    if (point === null) {
      if (gaps === 'connect') continue;
      if (current.length) out.push(current);
      current = [];
      continue;
    }

    current.push(point);
  }

  if (current.length) out.push(current);
  return out;
} // Tangents of a monotone cubic through the run: each is the harmonic mean of
// the slopes beside it, zero at a turn, so the curve stays between its points.

function tangents(run) {
  const n = run.length;
  const slopes = [];

  for (let i = 0; i < n - 1; i += 1) {
    const dx = run[i + 1][0] - run[i][0];
    slopes.push(dx === 0 ? 0 : (run[i + 1][1] - run[i][1]) / dx);
  }

  const out = new Array(n).fill(0);
  out[0] = slopes[0] ?? 0;
  out[n - 1] = slopes[n - 2] ?? 0;

  for (let i = 1; i < n - 1; i += 1) {
    const a = slopes[i - 1];
    const b = slopes[i];
    out[i] = a * b <= 0 ? 0 : 2 * a * b / (a + b);
  }

  return out;
}

function segment(run, curve) {
  if (run.length === 1) {
    const [x, y] = run[0];
    return `M${round(x)} ${round(y)}h0`;
  }

  let d = `M${round(run[0][0])} ${round(run[0][1])}`;

  if (curve === 'step') {
    for (let i = 1; i < run.length; i += 1) {
      const middle = (run[i - 1][0] + run[i][0]) / 2;
      d += `H${round(middle)}V${round(run[i][1])}H${round(run[i][0])}`;
    }

    return d;
  }

  if (curve === 'smooth' && run.length > 2) {
    const m = tangents(run);

    for (let i = 1; i < run.length; i += 1) {
      const [x0, y0] = run[i - 1];
      const [x1, y1] = run[i];
      const third = (x1 - x0) / 3;
      d += `C${round(x0 + third)} ${round(y0 + m[i - 1] * third)} ${round(x1 - third)} ${round(y1 - m[i] * third)} ${round(x1)} ${round(y1)}`;
    }

    return d;
  }

  for (let i = 1; i < run.length; i += 1) d += `L${round(run[i][0])} ${round(run[i][1])}`;

  return d;
}
/** The `d` of a line through [x, y] points (null for a gap). */


function linePath(points, {
  curve = 'linear',
  gaps = 'break'
} = {}) {
  return runs(points, gaps).map(run => segment(run, curve)).join('');
}
/** The `d` of the area under the line down to the baseline y, per run. */

function areaPath(points, baseline, {
  curve = 'linear',
  gaps = 'break'
} = {}) {
  return runs(points, gaps).map(run => {
    const line = segment(run, curve);
    const first = run[0][0];
    const last = run[run.length - 1][0];
    return `${line}L${round(last)} ${round(baseline)}L${round(first)} ${round(baseline)}Z`;
  }).join('');
}
/**
 * The `d` of a band between two edges, per run: along the upper points, then
 * back along the lower ones. A stacked area is the band between its own top
 * and the top of the layer under it. Both edges share their gaps.
 */

function bandPath(upper, lower, {
  curve = 'linear',
  gaps = 'break'
} = {}) {
  const pairs = upper.map((point, index) => point === null || lower[index] === null ? null : [point, lower[index]]);
  return runs(pairs, gaps).map(run => {
    const top = segment(run.map(([point]) => point), curve);
    const back = segment(run.map(([, point]) => point).reverse(), curve);
    return `${top}L${back.slice(1)}Z`;
  }).join('');
}

/***/ },

/***/ "e8bb19218bf5"
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bandScale: () => (/* binding */ bandScale),
/* harmony export */   linearScale: () => (/* binding */ linearScale),
/* harmony export */   nearestIndex: () => (/* binding */ nearestIndex),
/* harmony export */   niceTicks: () => (/* binding */ niceTicks),
/* harmony export */   tickCount: () => (/* binding */ tickCount),
/* harmony export */   timeTicks: () => (/* binding */ timeTicks)
/* harmony export */ });
// Scales and ticks (docs/research/parameters.md §2): a linear scale with
// round ticks, and a time scale whose ticks fall on calendar units.

/** A function from the domain to the range, with `invert`. */
function linearScale([d0, d1], [r0, r1]) {
  const span = d1 - d0 || 1;

  const scale = value => r0 + (value - d0) / span * (r1 - r0);

  scale.invert = pixel => d0 + (pixel - r0) / (r1 - r0 || 1) * span;

  scale.domain = [d0, d1];
  scale.range = [r0, r1];
  return scale;
} // 1, 2, 2.5 and 5 times a power of ten: the steps a person reads at a glance.

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


function niceTicks(min, max, count = 5, {
  nice = true,
  zero = false
} = {}) {
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

  return {
    min: nice ? from : low,
    max: nice ? to : high,
    step,
    ticks
  };
}
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR; // The calendar steps a time axis may take, from a second to a century.

const TIME_STEPS = [['second', 1], ['second', 5], ['second', 15], ['second', 30], ['minute', 1], ['minute', 5], ['minute', 15], ['minute', 30], ['hour', 1], ['hour', 3], ['hour', 6], ['hour', 12], ['day', 1], ['day', 2], ['week', 1], ['month', 1], ['month', 3], ['month', 6], ['year', 1], ['year', 2], ['year', 5], ['year', 10], ['year', 25], ['year', 50], ['year', 100]];
const APPROX = {
  second: SECOND,
  minute: MINUTE,
  hour: HOUR,
  day: DAY,
  week: 7 * DAY,
  month: 30.44 * DAY,
  year: 365.25 * DAY
}; // The first moment of a unit at or after `time`, local.

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


function timeTicks(min, max, count = 6) {
  const span = Math.max(1, max - min);
  const target = span / Math.max(1, count);
  const [unit, every] = TIME_STEPS.find(([name, size]) => APPROX[name] * size >= target) ?? TIME_STEPS[TIME_STEPS.length - 1];
  const ticks = [];

  for (let time = ceilTo(min, unit, every), guard = 0; time <= max && guard < 500; time = addTo(time, unit, every), guard += 1) {
    ticks.push(time);
  }

  return {
    unit,
    every,
    ticks
  };
}
/** How many ticks fit along `length` px when each needs `room` px. */

function tickCount(length, room) {
  return Math.max(2, Math.min(10, Math.floor(length / Math.max(1, room))));
}
/** The index of the x nearest to `value` in the sorted `xs`. */

function nearestIndex(xs, value) {
  if (!xs.length) return -1;
  let low = 0;
  let high = xs.length - 1;

  while (high - low > 1) {
    const middle = low + high >> 1;
    if (xs[middle] < value) low = middle;else high = middle;
  }

  return Math.abs(xs[high] - value) < Math.abs(xs[low] - value) ? high : low;
}
/**
 * A band scale for categories: `count` bands across [r0, r1], each with an
 * inner padding share. Returns {at(index), width, step}: `at` is a band's
 * start, `width` the drawn width, `step` the band and its padding.
 */

function bandScale(count, [r0, r1], {
  padding = 0.2
} = {}) {
  const step = (r1 - r0) / Math.max(1, count);
  const width = step * (1 - padding);

  const at = index => r0 + index * step + (step - width) / 2;

  return {
    at,
    width,
    step
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

/***/ "3514cfe878c1"
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   stackExtent: () => (/* binding */ stackExtent),
/* harmony export */   stackSeries: () => (/* binding */ stackSeries)
/* harmony export */ });
// Stacks (docs/research/parameters.md §7): series laid on one another at each
// x. Positive values climb from zero, negative ones go down from it, so a
// stack of mixed signs never overlaps itself. A gap is a gap: it adds
// nothing and the segment is null, never a zero-height bar.

/**
 * For each series one segment per x, [from, to], or null for a gap.
 * `mode` is none (every segment from zero), stacked or normalized (each
 * x's stack as shares of its total of absolute values, 0..1).
 */
function stackSeries(series, mode = 'none') {
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
  return series.map(one => one.values.map((raw, index) => {
    if (raw === null) return null;
    if (mode === 'none') return [0, raw];
    const value = mode === 'normalized' ? totals[index] ? raw / totals[index] : 0 : raw;
    const ground = value < 0 ? down : up;
    const from = ground[index];
    ground[index] = from + value;
    return [from, ground[index]];
  }));
}
/** The smallest and largest end of all segments, zero always in: [min, max]. */

function stackExtent(segments) {
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

/***/ },

/***/ "6e2b7d7069cf"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("deb1a4d61565");
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("5b7d7695b41b");
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("43090d1c8307");
/* harmony import */ var _chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("37677343b39a");
/* harmony import */ var _chart_core_scale_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("e8bb19218bf5");
/* harmony import */ var _chart_core_format_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("6668151838ce");
/* harmony import */ var _chart_core_path_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("5fc4022962c0");
/* harmony import */ var _chart_core_stack_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("3514cfe878c1");
/* harmony import */ var _chart_core_decimate_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("13016023b0f5");
/* harmony import */ var _chart_core_describe_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("40ff9ca61ced");
/* harmony import */ var _chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("132d5cf6d077");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("21ed19c5c40f");
/* harmony import */ var _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("fc9bb1435f01");
/* harmony import */ var _chart_core_palettes_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("b3159bcb2ffd");
/* harmony import */ var _js_templates_default__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("5e638d8f0f2e");
/* harmony import */ var _component_json__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("f6188f0cea25");
/* harmony import */ var _lang_en_json__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("169e34d07212");
/* harmony import */ var _lang_ru_json__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("534d83181936");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_5__, _js_templates_default__WEBPACK_IMPORTED_MODULE_14__]);
([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_5__, _js_templates_default__WEBPACK_IMPORTED_MODULE_14__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__);
// sf-chart-line: one or more series along time, a number or categories
// (docs/DECISIONS.md D1, the first chart of SIMAI Chart).
//
// The element reads its data once into series (chart-core/data), measures its
// plot, and draws axes, guide lines and one path per series in SVG
// (chart-core/scale, path, decimate). A person reaches the plot with one Tab
// stop and walks it with the arrows (chart-core/cursor); every move is said
// in a polite live region, the chart as a whole in a summary sentence
// (chart-core/describe), and the same data is a table on request. Stacked,
// the series are layers (chart-core/stack): each line is its layer's top and
// its area the band down to the layer under it.
//
// It renders into its own light DOM, like every Smart component.

















 // The text of the plot, in px, by size rung: axis labels are the small text
// role, so the room they need is known before anything is measured.

const FONT = {
  '1/2': 11,
  1: 12,
  2: 14
};
const CHAR = 0.6;
const GAP = 8;
const ChartLineElement = (0,_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__.elementFromManifest)(_component_json__WEBPACK_IMPORTED_MODULE_15__, {
  base: (_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default()),
  lang: {
    en: _lang_en_json__WEBPACK_IMPORTED_MODULE_16__,
    ru: _lang_ru_json__WEBPACK_IMPORTED_MODULE_17__
  },
  source: 'ru',
  actions: {
    reset() {
      this.hiddenSeries = [];
      this._cursor = null;
      this.requestComponentUpdate('reset');
    }

  }
});
let instances = 0;

class SfLineChart extends ChartLineElement {
  static get props() {
    return { ...super.props,
      rootClass: {
        default: ''
      }
    };
  }

  onConnected() {
    this._uid = this.id || `sf-chart-line-${instances += 1}`;
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
    const colours = this.colours();
    const checked = (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_12__.coloursKey)(colours);

    if (checked !== this._coloursChecked && this.isConnected) {
      this._coloursChecked = checked;
      (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_12__.checkContrast)(this, colours, 'sf-chart-line');
    }

    const plot = this.querySelector('.sf-chart-line-plot');

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
  } // The page's own colours by key (chart-core/colors), read again only when
  // the setting changes.


  colours() {
    if (this.colors !== this._coloursRaw || !this._colours) {
      this._coloursRaw = this.colors;
      this._colours = (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_12__.readColours)(this.colors, said => console.warn(`<sf-chart-line> ${said}`));
    }

    return this._colours;
  } // Each series' colour by key: the page's own (colors) or the named
  // palette's by place (chart-core/palettes, D7). With neither, the template
  // keeps the theme's colours.


  paints(list) {
    const own = this.colours();
    const set = _chart_core_palettes_js__WEBPACK_IMPORTED_MODULE_13__.PALETTES[this.palette];
    if (!set) return own;
    const out = new Map(own);
    list.forEach((one, place) => {
      if (!out.has(one.key)) out.set(one.key, set[place % set.length]);
    });
    return out;
  }

  words(key, vars) {
    return this.sfWord(key, vars ? {
      vars
    } : undefined);
  } // The data as series, read again only when the data or its mapping changes.


  model() {
    const key = [this.items, this.names, this.x, this.y, this.series, this.xScale];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;
    this._model = (0,_chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__.readSeries)(this.items, {
      x: this.x,
      y: this.y,
      series: this.series,
      xScale: this.xScale,
      names: this.names || {}
    });
    this._model.unit = this._model.kind === 'time' ? (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_5__.timeUnitOf)(this._model.xs) : 'day';
    return this._model;
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.series.some(one => one.values.some(value => value !== null)) ? 'ready' : 'empty';
  }

  shownSeries(model) {
    const hidden = new Set(this.hiddenSeries || []);
    return model.series.map((one, place) => ({ ...one,
      place
    })).filter(one => !hidden.has(one.key));
  } // An x value as the axis, the tooltip and the table say it.


  sayX(model, index, form = 'full') {
    const locale = (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this);
    if (model.kind === 'time') return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_5__.formatTime)(model.xs[index], locale, model.unit, {
      form,
      format: this.xFormat
    });
    if (model.kind === 'number') return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_5__.formatNumber)(model.xs[index], locale, this.xFormat === 'auto' ? 'number' : this.xFormat);
    return String(model.labels[index] ?? '');
  }

  sayY(value, step = 0) {
    return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_5__.formatNumber)(value, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.yFormat, {
      step,
      gap: this.words('gap')
    });
  } // A series' value at an x as the cursor and the tooltip say it: in a
  // normalized stack, its share of the whole and then the value itself.


  sayValue(line, index) {
    const raw = line.values[index];
    const segment = line.segments?.[index];
    if (this.stack !== 'normalized' || raw === null || !segment) return this.sayY(raw);
    return this.words('share', {
      share: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_5__.formatNumber)(segment[1] - segment[0], (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), 'percent'),
      value: this.sayY(raw)
    });
  } // Where everything goes: the plot's inner box, the scales, the ticks and
  // one path per shown series. Null until the plot has a width.


  geometry(model, shown) {
    const {
      width,
      height
    } = this._box;
    if (!width || !height) return null;
    const font = FONT[this.size] ?? 12;
    const count = model.xs.length; // y-min and y-max hold only when given: an unset number reads as 0.

    const yMin = this.hasAttribute('y-min') && Number.isFinite(this.yMin) ? this.yMin : null;
    const yMax = this.hasAttribute('y-max') && Number.isFinite(this.yMax) ? this.yMax : null; // Stacked, the axis spans the layers' ends; normalized, 0–100 % always.

    const stacked = this.stack !== 'none';
    const normalized = this.stack === 'normalized';
    const segments = stacked ? (0,_chart_core_stack_js__WEBPACK_IMPORTED_MODULE_7__.stackSeries)(shown, this.stack) : null;
    let [low, high] = normalized ? [0, 1] : stacked ? (0,_chart_core_stack_js__WEBPACK_IMPORTED_MODULE_7__.stackExtent)(segments) : (0,_chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__.extent)(shown) ?? [0, 1];
    if (!normalized && yMin !== null) low = yMin;
    if (!normalized && yMax !== null) high = yMax;
    if (high === low) high = low + 1;
    const top = GAP + (this.yLabel ? font * 1.5 : 0);
    const bottom = font * 1.5 + GAP + (this.xLabel ? font * 1.5 : 0);
    const yTicks = (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_4__.niceTicks)(low, high, (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_4__.tickCount)(height - top - bottom, font * 3.5), {
      zero: this.yZero || this.area || stacked,
      nice: normalized || yMin === null && yMax === null
    });
    const yLabels = yTicks.ticks.map(value => normalized ? (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_5__.formatNumber)(value, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), 'percent', {
      step: yTicks.step
    }) : this.sayY(value, yTicks.step));
    const left = Math.ceil(Math.max(...yLabels.map(text => text.length)) * font * CHAR) + GAP * 1.5;
    const right = GAP * 2;
    const inner = {
      left,
      top,
      right: Math.max(left + 1, width - right),
      bottom: Math.max(top + 1, height - bottom)
    };
    const y = (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_4__.linearScale)([yTicks.min, yTicks.max], [inner.bottom, inner.top]);
    const xDomain = count > 1 ? [model.xs[0], model.xs[count - 1]] : [model.xs[0] - 1, model.xs[0] + 1]; // A category sits in the middle of its band; a time or a number at its value.

    const band = model.kind === 'category' ? (inner.right - inner.left) / Math.max(1, count) : 0;
    const x = model.kind === 'category' ? (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_4__.linearScale)([0, Math.max(1, count - 1)], [inner.left + band / 2, inner.right - band / 2]) : (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_4__.linearScale)(xDomain, [inner.left, inner.right]);
    let xTicks;

    if (model.kind === 'time') {
      const ticks = (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_4__.timeTicks)(xDomain[0], xDomain[1], (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_4__.tickCount)(inner.right - inner.left, font * CHAR * 12));
      xTicks = ticks.ticks.map(time => ({
        at: x(time),
        text: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_5__.formatTime)(time, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), ticks.unit)
      }));
    } else if (model.kind === 'number') {
      const ticks = (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_4__.niceTicks)(xDomain[0], xDomain[1], (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_4__.tickCount)(inner.right - inner.left, font * CHAR * 8), {
        nice: false
      });
      xTicks = ticks.ticks.map(value => ({
        at: x(value),
        text: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_5__.formatNumber)(value, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), 'number', {
          step: ticks.step
        })
      }));
    } else {
      const longest = Math.max(1, ...model.labels.map(label => String(label).length));
      const every = Math.max(1, Math.ceil(count / Math.max(1, Math.floor((inner.right - inner.left) / (longest * font * CHAR + GAP)))));
      xTicks = model.labels.map((label, index) => ({
        at: x(index),
        text: String(label),
        index
      })).filter(({
        index
      }) => index % every === 0);
    } // A label at an edge does not leave the plot: it is held from that edge.


    xTicks = xTicks.map(tick => {
      const half = tick.text.length * font * CHAR / 2;
      if (tick.at - half < 0) return { ...tick,
        at: 0,
        anchor: 'start'
      };
      if (tick.at + half > width) return { ...tick,
        at: width,
        anchor: 'end'
      };
      return { ...tick,
        anchor: 'middle'
      };
    });
    const px = model.xs.map(value => x(value));
    const baseline = y(Math.max(yTicks.min, Math.min(yTicks.max, 0)));
    const markers = this.markers === 'always' || this.markers === 'auto' && count <= 200 && (inner.right - inner.left) / Math.max(1, count) >= 12;
    const room = inner.right - inner.left;
    const options = {
      curve: this.curve,
      gaps: this.gaps
    }; // Each series at each x as a height on the plot: its value, or stacked
    // its layer's top. A gap stays null.

    const tops = shown.map((one, place) => one.values.map((value, index) => {
      if (value === null) return null;
      return y(segments ? segments[place][index][1] : value);
    })); // Layers share one set of kept points, so each band meets the one under it.

    let shared = null;

    if (segments && this.decimate !== 'none') {
      const kept = new Set();

      for (const one of shown) for (const index of (0,_chart_core_decimate_js__WEBPACK_IMPORTED_MODULE_8__.minMaxIndexes)(px, one.values, room) ?? one.values.map((_, at) => at)) kept.add(index);

      shared = [...kept].sort((a, b) => a - b);
    }

    const lines = shown.map((one, place) => {
      const keep = segments ? shared : this.decimate === 'none' ? null : (0,_chart_core_decimate_js__WEBPACK_IMPORTED_MODULE_8__.minMaxIndexes)(px, one.values, room);
      const indexes = keep ?? one.values.map((_, index) => index);
      const points = indexes.map(index => tops[place][index] === null ? null : [px[index], tops[place][index]]);
      let area = '';

      if (segments) {
        const lower = indexes.map(index => segments[place][index] === null ? null : [px[index], y(segments[place][index][0])]);
        area = (0,_chart_core_path_js__WEBPACK_IMPORTED_MODULE_6__.bandPath)(points, lower, options);
      } else if (this.area) {
        area = (0,_chart_core_path_js__WEBPACK_IMPORTED_MODULE_6__.areaPath)(points, baseline, options);
      }

      return { ...one,
        segments: segments?.[place] ?? null,
        ys: tops[place],
        d: (0,_chart_core_path_js__WEBPACK_IMPORTED_MODULE_6__.linePath)(points, options),
        area,
        dots: markers ? tops[place].map((at, index) => at === null ? null : [px[index], at, index]).filter(Boolean) : []
      };
    });
    return {
      width,
      height,
      font,
      inner,
      x,
      y,
      px,
      lines,
      baseline,
      stacked,
      yTicks: yTicks.ticks.map((value, index) => ({
        at: y(value),
        text: yLabels[index],
        zero: value === 0
      })),
      xTicks
    };
  }

  summarize(model, shown) {
    if (this.summary === 'none') return '';
    if (!model.xs.length) return this.words('summary-empty'); // The sentence ends with its own full stop: an abbreviation the date
    // ends with («2026 г.») gives it, not a second one.

    const parts = [this.words('summary-range', {
      from: this.sayX(model, 0),
      to: this.sayX(model, model.xs.length - 1).replace(/\.$/u, '')
    })];
    if (this.stack !== 'none' && shown.length > 1) parts.push(this.words(`summary-${this.stack}`));

    for (const one of shown) {
      const facts = (0,_chart_core_describe_js__WEBPACK_IMPORTED_MODULE_9__.seriesFacts)(one.values);
      if (!facts) continue;
      parts.push(this.words('summary-series', {
        name: one.name,
        first: this.sayY(one.values[facts.first]),
        last: this.sayY(one.values[facts.last]),
        max: this.sayY(facts.max),
        maxAt: this.sayX(model, facts.maxAt),
        min: this.sayY(facts.min),
        minAt: this.sayX(model, facts.minAt)
      }));
    }

    return parts.join(' ');
  } // The cursor as one sentence: the x, then the series under it.


  cursorLine(model, cursor) {
    const one = model.series.find(series => series.key === cursor.series);
    if (!one) return '';
    const line = this._geometry?.lines.find(shown => shown.key === one.key) ?? one;
    return this.words('cursor', {
      x: this.sayX(model, cursor.index),
      name: one.name,
      value: this.sayValue(line, cursor.index)
    });
  }

  setCursor(cursor, {
    say = false
  } = {}) {
    this._cursor = cursor;
    if (say && cursor) this._said = this.cursorLine(this.model(), cursor);
    this.requestComponentUpdate('cursor');
  }

  onPlotKey(event) {
    const model = this.model();
    const shown = this.shownSeries(model).map(one => one.key);

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

    const next = (0,_chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_10__.moveCursor)(this._cursor, event.key, {
      count: model.xs.length,
      shown
    });
    if (!next) return;
    event.preventDefault();
    this.setCursor(next, {
      say: true
    });
  } // The pointer picks the nearest x and, of the shown series, the nearest line.


  pointAt(event) {
    const geometry = this._geometry;
    if (!geometry) return null;
    const box = event.currentTarget.getBoundingClientRect();
    const px = event.clientX - box.left;
    const py = event.clientY - box.top;
    const index = (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_4__.nearestIndex)(geometry.px, px);
    if (index < 0) return null;
    let best = null;

    for (const line of geometry.lines) {
      const at = line.ys[index];
      if (at === null) continue;
      const distance = Math.abs(at - py);
      if (!best || distance < best.distance) best = {
        series: line.key,
        distance
      };
    }

    return best ? {
      index,
      series: best.series
    } : null;
  }

  onPointerMove(event) {
    const point = this.pointAt(event);
    if (!point || this._cursor && point.index === this._cursor.index && point.series === this._cursor.series) return;
    this.setCursor(point);
  }

  onPointerLeave() {
    if (this.matches(':focus-within')) return;
    this.setCursor(null);
  }

  onPlotClick(event) {
    const point = this.pointAt(event);
    if (point) this.choose(point);
  }

  choose(cursor) {
    const model = this.model();
    const one = model.series.find(series => series.key === cursor.series);
    if (!one) return; // x as the data gave it ('2026-12'), not as the axis reads it.

    this.sfEmit('select', {
      series: one.key,
      index: cursor.index,
      x: String(model.labels[cursor.index] ?? ''),
      value: one.values[cursor.index]
    });
  }

  toggleSeries(key) {
    const hidden = new Set(this.hiddenSeries || []);
    const nowHidden = !hidden.has(key);
    if (nowHidden) hidden.add(key);else hidden.delete(key);
    this.hiddenSeries = [...hidden];
    if (this._cursor?.series === key) this._cursor = null;
    this.sfEmit('toggle', {
      id: key,
      hidden: nowHidden
    });
    this.requestComponentUpdate('hidden-series');
  }

  toggleView() {
    this._view = this._view === 'table' ? 'chart' : 'table';
    this.requestComponentUpdate('view');
  }

  templateContext() {
    const model = this.model();
    const state = this.state(model);
    const shown = this.shownSeries(model);
    const geometry = state === 'ready' ? this.geometry(model, shown) : null;
    this._geometry = geometry;
    const cursor = this._cursor && shown.some(one => one.key === this._cursor.series) && this._cursor.index < model.xs.length ? this._cursor : null;
    const tableModel = this.tableModel(model, state === 'ready');
    return this.createTemplateContext({ ...this.getPropsContext(),
      component: this,
      uid: this._uid,
      size: this.size,
      label: this.label || this.words('untitled'),
      state,
      model,
      tableModel,
      tableKey: [tableModel, this.label, this.xLabel, this.xFormat, this.yFormat, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.table, this.table === 'toggle' ? this._view : 'chart'],
      shown,
      geometry,
      cursor,
      said: this._said,
      view: this.table === 'toggle' ? this._view : 'chart',
      legend: this.legend === 'auto' ? model.series.length > 1 ? 'top' : 'none' : this.legend,
      summaryText: state === 'ready' ? this.summarize(model, shown) : '',
      hasDescription: this.hasSlotContent?.('description') ?? false,
      description: this.hasSlotContent?.('description') ? this.getSlotContent('description') : null,
      paint: this.paints(model?.series ?? []),
      rootClass: this.getRootClass()
    });
  } // The data the table shows: settled, so a stream or a pointer move does
  // not rebuild a row per x on every render (chart-core/settle).
  // The first data after none shows at once: only a change of data already
  // shown is held.


  tableModel(model, ready) {
    this._table = this._table ?? {};

    if (!ready) {
      clearTimeout(this._table.timer);
      this._table = {};
      return model;
    }

    return (0,_chart_core_settle_js__WEBPACK_IMPORTED_MODULE_11__.settled)(this._table, model, {
      later: () => this.requestComponentUpdate('table')
    });
  }

  template() {
    return (0,_js_templates_default__WEBPACK_IMPORTED_MODULE_14__.renderLineChartTemplate)(this.templateContext());
  }

}

SfLineChart.define('sf-chart-line');
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "5e638d8f0f2e"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderLineChartTemplate: () => (/* binding */ renderLineChartTemplate)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2a080a730149");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("21ed19c5c40f");
/* harmony import */ var _default_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("e0e69aaaf669");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([lit__WEBPACK_IMPORTED_MODULE_0__]);
var __webpack_async_dependencies_result__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_async_dependencies_result__[0];
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lit__WEBPACK_IMPORTED_MODULE_0__);


 // The figure of a line chart: the label and the table button, the legend,
// the plot (SVG), the summary and the description, the live line, and the
// same data as a table.
//
// The plot is one Tab stop, a role="group" named by the label and described
// by the summary; its axes and lines are aria-hidden, because the summary,
// the live line and the table say what they show. A colour is a class
// (--c1..--c4) and a dash (--d1..--d7), so a series stays itself in forced
// colours and in print. A page's own colour (the colors setting, by the
// series' key) is --custom with its value in a style: the dash stays.

const colourOf = (place, paint) => `sf-chart-line-series--${paint ? 'custom' : `c${place % 4 + 1}`}${place > 0 ? ` sf-chart-line-series--d${Math.min(place, 7)}` : ''}`;

const paintOf = paint => paint ? `--sf-chart-line--custom: ${paint}` : '';

const paintAttr = paint => paint ? ` style="${esc(paintOf(paint))}"` : '';

const px = value => `${Math.round(value * 10) / 10}`; // The plot's inside is SVG markup set as the svg element's innerHTML (a
// property, so lit writes no part markers inside it: a first-paint snapshot
// of the plot is the same on every run). Every text is escaped.


const ESCAPES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

const esc = value => String(value).replace(/[&<>"']/gu, one => ESCAPES[one]);

function axesMarkup(g) {
  const {
    inner
  } = g;
  let out = '<g class="sf-chart-line-axes" aria-hidden="true">';

  if (g.grid === 'y' || g.grid === 'both') {
    for (const tick of g.yTicks) {
      out += `<line class="${tick.zero ? 'sf-chart-line-baseline' : 'sf-chart-line-grid'}" x1="${px(inner.left)}" x2="${px(inner.right)}" y1="${px(tick.at)}" y2="${px(tick.at)}"/>`;
    }
  }

  if (g.grid === 'x' || g.grid === 'both') {
    for (const tick of g.xTicks) {
      out += `<line class="sf-chart-line-grid" x1="${px(tick.at)}" x2="${px(tick.at)}" y1="${px(inner.top)}" y2="${px(inner.bottom)}"/>`;
    }
  }

  out += `<line class="sf-chart-line-baseline" x1="${px(inner.left)}" x2="${px(inner.right)}" y1="${px(inner.bottom)}" y2="${px(inner.bottom)}"/>`;

  for (const tick of g.yTicks) {
    out += `<text class="sf-chart-line-tick" x="${px(inner.left - 6)}" y="${px(tick.at)}" text-anchor="end" dominant-baseline="middle">${esc(tick.text)}</text>`;
  }

  for (const tick of g.xTicks) {
    out += `<text class="sf-chart-line-tick sf-chart-line-tick--x" x="${px(tick.at)}" y="${px(inner.bottom + g.font * 1.2)}" text-anchor="${tick.anchor}" dominant-baseline="middle">${esc(tick.text)}</text>`;
  }

  if (g.yLabel) out += `<text class="sf-chart-line-axis-label" x="${px(inner.left)}" y="${px(g.font)}" text-anchor="start">${esc(g.yLabel)}</text>`;
  if (g.xLabel) out += `<text class="sf-chart-line-axis-label" x="${px((inner.left + inner.right) / 2)}" y="${px(g.height - 4)}" text-anchor="middle">${esc(g.xLabel)}</text>`;
  return `${out}</g>`;
}

function cursorMarkup(g, cursor, paint) {
  const x = g.px[cursor.index];
  let out = `<line class="sf-chart-line-crosshair" x1="${px(x)}" x2="${px(x)}" y1="${px(g.inner.top)}" y2="${px(g.inner.bottom)}"/>`;

  for (const line of g.lines) {
    const at = line.ys[cursor.index];
    if (at === null) continue;
    const current = line.key === cursor.series;
    out += `<circle class="sf-chart-line-focus ${colourOf(line.place, paint.get(line.key))}${current ? ' sf-chart-line-focus--current' : ''}"${paintAttr(paint.get(line.key))} cx="${px(x)}" cy="${px(at)}" r="${current ? 5 : 3.5}"/>`;
  }

  return out;
}

function linesMarkup(g, cursor, paint) {
  let out = '<g class="sf-chart-line-marks" aria-hidden="true">';

  for (const line of g.lines) {
    const dim = cursor && cursor.series !== line.key ? ' sf-chart-line-series--dim' : '';
    out += `<g class="sf-chart-line-series ${colourOf(line.place, paint.get(line.key))}${dim}"${paintAttr(paint.get(line.key))} data-series="${esc(line.key)}">`;
    if (line.area) out += `<path class="sf-chart-line-area${g.stacked ? ' sf-chart-line-area--layer' : ''}" d="${line.area}"/>`;
    out += `<path class="sf-chart-line-line" d="${line.d}"/>`;

    for (const [x, y] of line.dots) out += `<circle class="sf-chart-line-dot" cx="${px(x)}" cy="${px(y)}" r="2.5"/>`;

    out += '</g>';
  }

  if (cursor) out += cursorMarkup(g, cursor, paint);
  return `${out}</g>`;
}

function renderTooltip(context, g, cursor) {
  if (!cursor || context.tooltip === 'none') return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const {
    component,
    model
  } = context;
  const x = g.px[cursor.index];
  const flip = x > g.width / 2;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${`sf-chart-line-tooltip${flip ? ' sf-chart-line-tooltip--flip' : ''}`} aria-hidden="true"
         style=${`inset-inline-start: ${px(x)}px; inset-block-start: ${px(g.inner.top)}px`}>
      <div class="sf-chart-line-tooltip-x">${component.sayX(model, cursor.index)}</div>
      ${g.lines.map(line => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <div class=${['sf-chart-line-tooltip-row', colourOf(line.place, context.paint.get(line.key)), line.key === cursor.series ? 'sf-chart-line-tooltip-row--current' : ''].filter(Boolean).join(' ')}
             style=${paintOf(context.paint.get(line.key)) || lit__WEBPACK_IMPORTED_MODULE_0__.nothing}>
          <span class="sf-chart-line-swatch"></span>
          <span class="sf-chart-line-tooltip-name">${line.name}</span>
          <span class="sf-chart-line-tooltip-value">${component.sayValue(line, cursor.index)}</span>
        </div>
      `)}
    </div>
  `;
}

function renderLegend(context, place) {
  if (context.legend !== place || context.state !== 'ready') return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const {
    component,
    model
  } = context;
  const hidden = new Set(component.hiddenSeries || []);
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${`sf-chart-line-legend sf-chart-line-legend--${place}`} role="group" aria-label=${component.words('legend')}>
      ${model.series.map((one, index) => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <button type="button" class=${`sf-chart-line-legend-item ${colourOf(index, context.paint.get(one.key))}`}
                style=${paintOf(context.paint.get(one.key)) || lit__WEBPACK_IMPORTED_MODULE_0__.nothing} aria-pressed=${hidden.has(one.key) ? 'false' : 'true'}
                data-series=${one.key} @click=${() => component.toggleSeries(one.key)}>
          <span class="sf-chart-line-swatch" aria-hidden="true"></span>
          <span class="sf-chart-line-legend-name">${one.name}</span>
        </button>
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
}

function tableMarkup(context, shownTable) {
  const {
    component,
    tableModel: model,
    label
  } = context;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${shownTable ? 'sf-chart-line-table' : 'sf-chart-line-sr'}>
      <table>
        <caption>${label}</caption>
        <thead>
          <tr>
            <th scope="col">${context.xLabel || model.xField || component.words('x-column')}</th>
            ${model.series.map(one => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<th scope="col">${one.name}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${model.xs.map((_, index) => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
            <tr>
              <th scope="row">${component.sayX(model, index)}</th>
              ${model.series.map(one => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<td>${component.sayY(one.values[index])}</td>`)}
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
    cursor
  } = context;

  if (state === 'loading') {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-line-loading" role="status" aria-busy="true"><span class="sf-chart-line-sr">${component.words('loading')}</span></div>`;
  }

  if (state === 'empty' || state === 'error') {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
      <sf-empty-state class="sf-chart-line-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
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
    <svg class="sf-chart-line-svg" role="group" tabindex="0" focusable="true"
         aria-label=${context.label} aria-roledescription=${component.words('roledescription')}
         aria-describedby=${described || lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
         width=${g.width} height=${g.height} viewBox=${`0 0 ${g.width} ${g.height}`}
         @keydown=${event => component.onPlotKey(event)}
         @pointermove=${event => component.onPointerMove(event)}
         @pointerleave=${() => component.onPointerLeave()}
         @click=${event => component.onPlotClick(event)}
         @blur=${() => component.setCursor(null)}
         .innerHTML=${axesMarkup({ ...g,
    grid: context.grid,
    xLabel: context.xLabel,
    yLabel: context.yLabel
  }) + linesMarkup(g, cursor, context.paint)}>
    </svg>
    ${renderTooltip(context, g, cursor)}
  `;
}

function renderLineChartTemplate(context) {
  const {
    component,
    uid,
    state
  } = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <figure class=${['sf-chart-line', `sf-chart-line--size-${size}`, `sf-chart-line--${state}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-chart-line-head">
        <span class="sf-chart-line-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.table === 'toggle' && state === 'ready' ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<button type="button" class="sf-chart-line-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      </figcaption>
      ${renderLegend(context, 'top')}
      <div class="sf-chart-line-plot" ?hidden=${tableView}>${renderPlot(context)}</div>
      ${renderLegend(context, 'bottom')}
      ${context.summaryText ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<p class="sf-chart-line-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      ${context.hasDescription ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-line-description" id=${`${uid}-description`}>${context.description}</div>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      <div class="sf-chart-line-sr" aria-live="polite">${context.said}</div>
      ${renderTable(context)}
    </figure>
  `;
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "e0e69aaaf669"
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

/***/ "f6188f0cea25"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"id":"smart.chart-line","tag":"sf-chart-line","version":"0.4.0","kind":"leaf","settings":{"label":{"type":"string","default":""},"items":{"type":"list","default":[],"of":"object"},"names":{"type":"object","default":{}},"colors":{"type":"object","default":{}},"palette":{"type":"enum","values":["theme","vivid","soft","warm","cool","brand"],"default":"theme"},"x":{"type":"string","default":""},"y":{"type":"string","default":""},"series":{"type":"string","default":""},"x-scale":{"type":"enum","values":["auto","time","linear","category"],"default":"auto"},"y-min":{"type":"number","optional":true},"y-max":{"type":"number","optional":true},"y-zero":{"type":"boolean","default":false},"curve":{"type":"enum","values":["linear","step","smooth"],"default":"linear"},"area":{"type":"boolean","default":false},"stack":{"type":"enum","values":["none","stacked","normalized"],"default":"none"},"gaps":{"type":"enum","values":["break","connect"],"default":"break"},"markers":{"type":"enum","values":["auto","always","none"],"default":"auto"},"legend":{"type":"enum","values":["auto","top","bottom","none"],"default":"auto"},"tooltip":{"type":"enum","values":["axis","none"],"default":"axis"},"grid":{"type":"enum","values":["y","x","both","none"],"default":"y"},"x-label":{"type":"string","default":""},"y-label":{"type":"string","default":""},"x-format":{"type":"string","default":"auto"},"y-format":{"type":"string","default":"number"},"size":{"type":"enum","values":["1/2","1","2"],"default":"1"},"table":{"type":"enum","values":["toggle","visible","hidden"],"default":"toggle"},"summary":{"type":"enum","values":["auto","none"],"default":"auto"},"data-state":{"type":"enum","values":["auto","loading","ready","empty","error"],"default":"auto"},"decimate":{"type":"enum","values":["auto","none"],"default":"auto"}},"values":{"hidden-series":{"type":"list","default":[],"of":"string"}},"events":{"toggle":{"carries":{"id":"string","hidden":"boolean"}},"select":{"carries":{"series":"string","index":"number","x":"string","value":"number"}},"refresh":{"carries":{}}},"actions":{"reset":{"with":{}}},"presentation":{"skeleton":{"late":["items"]}},"css-variables":{"--sf-chart-line-height":{"type":"length","state":"default"},"--sf-chart-line-grid-color":{"type":"color","state":"default"},"--sf-chart-line-baseline-color":{"type":"color","state":"default"},"--sf-chart-line-label-color":{"type":"color","state":"default"},"--sf-chart-line-hover-background-color":{"type":"color","state":"hover"},"--sf-chart-line-hidden-color":{"type":"color","state":"disabled"},"--sf-chart-line-line-width":{"type":"length","state":"default"}}}');

/***/ },

/***/ "169e34d07212"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Line chart","runtime":{"untitled":"Chart","roledescription":"chart","summary-range":"{from} to {to}.","summary-series":"{name}: from {first} to {last}, highest {max} ({maxAt}), lowest {min} ({minAt}).","summary-empty":"No data.","cursor":"{x}, {name}: {value}","gap":"no data","show-table":"Table","legend":"Series","loading":"Loading the chart\'s data","empty-title":"No data for the chart","error-title":"Could not load the data","x-column":"X value","share":"{share} ({value})","summary-stacked":"The series are stacked.","summary-normalized":"The series are shown as shares of their total."},"events":{"toggle":{"label":"Hide or show a series"},"select":{"label":"Choose a point"},"refresh":{"label":"Load the data again"}},"actions":{"reset":{"label":"Show every series"}}}');

/***/ },

/***/ "534d83181936"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Линейный график","runtime":{"untitled":"График","roledescription":"график","summary-range":"{from} — {to}.","summary-series":"{name}: от {first} до {last}, наибольшее {max} ({maxAt}), наименьшее {min} ({minAt}).","summary-empty":"Нет данных.","cursor":"{x}, {name}: {value}","gap":"нет данных","show-table":"Таблица","legend":"Ряды","loading":"Загрузка данных графика","empty-title":"Нет данных для графика","error-title":"Не удалось загрузить данные","x-column":"Значение по оси X","share":"{share} ({value})","summary-stacked":"Ряды сложены стопкой.","summary-normalized":"Ряды показаны долями от общей суммы."},"events":{"toggle":{"label":"Скрыть или показать ряд"},"select":{"label":"Выбрать точку"},"refresh":{"label":"Загрузить данные заново"}},"actions":{"reset":{"label":"Показать все ряды"}}}');

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
/******/ 	let __webpack_exports__ = __webpack_require__("6e2b7d7069cf");
/******/
/******/ })()
;