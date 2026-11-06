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

/***/ "046d25672671"
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bandPathOf: () => (/* binding */ bandPathOf),
/* harmony export */   onBand: () => (/* binding */ onBand),
/* harmony export */   sankeyLayout: () => (/* binding */ sankeyLayout),
/* harmony export */   sankeyRows: () => (/* binding */ sankeyRows)
/* harmony export */ });
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("37677343b39a");
// The flows of a Sankey diagram (docs/research/catalogue.md, Sankey):
// quantities flowing between stages or categories, the flow data shape of
// docs/research/parameters.md §2.1 (source, target, value). The nodes stand
// in columns by their longest path from a node that nothing flows into;
// a band joins two nodes and is as wide as its flow. Own implementation:
// the columns, the order in each by the weighted middle of the neighbours,
// the bands' places along their nodes.


const text = value => value === undefined || value === null ? '' : String(value);
/**
 * The flows of rows: {sourceField, targetField, valueField, nodes, links,
 * total, missing, dropped, looped}.
 *
 * A node is {key, place, in, out, value, column, links: {in, out}}, in the
 * order the rows first name it; `value` is the larger of what comes in and
 * what goes out. A link is {row, index, source, target, value} with the
 * nodes' places; the same pair named twice is one link with the sum. A row
 * without a source, a target or a positive value is left out as missing;
 * one from a node to itself as dropped; a flow that would close a loop
 * (its target already leads to its source) as looped, because a Sankey
 * diagram runs one way.
 */


function sankeyRows(items, {
  source = '',
  target = '',
  value = ''
} = {}) {
  const rows = (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.readRows)(items);
  const fields = rows.length ? Object.keys(rows[0]) : [];
  const sourceField = source || 'source';
  const targetField = target || 'target';
  const valueField = value || fields.find(name => name !== sourceField && name !== targetField && rows.some(row => (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.readNumber)(row[name]) !== null)) || 'value';
  const nodes = new Map();
  const pairs = new Map();
  let missing = 0;
  let dropped = 0;
  let looped = 0;

  const node = key => {
    if (!nodes.has(key)) nodes.set(key, {
      key,
      place: nodes.size,
      in: 0,
      out: 0,
      value: 0,
      column: 0,
      links: {
        in: [],
        out: []
      }
    });
    return nodes.get(key);
  }; // What each node leads to, to find a loop before a flow is taken.


  const next = new Map();

  const leads = (from, to) => {
    const seen = new Set([from]);
    const stack = [from];

    while (stack.length) {
      const one = stack.pop();
      if (one === to) return true;

      for (const after of next.get(one) ?? []) {
        if (!seen.has(after)) {
          seen.add(after);
          stack.push(after);
        }
      }
    }

    return false;
  };

  rows.forEach((row, index) => {
    const from = text(row[sourceField]);
    const to = text(row[targetField]);
    const amount = (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.readNumber)(row[valueField]);

    if (!from || !to || amount === null || amount <= 0) {
      missing += 1;
      return;
    }

    if (from === to) {
      dropped += 1;
      return;
    }

    const pair = `${from}\u0000${to}`;

    if (!pairs.has(pair) && leads(to, from)) {
      looped += 1;
      return;
    }

    const a = node(from);
    const b = node(to);

    if (pairs.has(pair)) {
      pairs.get(pair).value += amount;
    } else {
      pairs.set(pair, {
        row: index,
        source: a.place,
        target: b.place,
        value: amount
      });
      if (!next.has(from)) next.set(from, new Set());
      next.get(from).add(to);
    }
  });
  const list = [...nodes.values()];
  const links = [...pairs.values()];
  links.forEach((one, index) => {
    one.index = index;
    list[one.source].out += one.value;
    list[one.source].links.out.push(one);
    list[one.target].in += one.value;
    list[one.target].links.in.push(one);
  });

  for (const one of list) one.value = Math.max(one.in, one.out); // Columns: the longest path from a node nothing flows into; a node that
  // flows nowhere stands in the last column, where the flows end.


  const indegree = list.map(one => one.links.in.length);
  const queue = list.filter(one => !one.links.in.length);

  while (queue.length) {
    const one = queue.shift();

    for (const link of one.links.out) {
      const after = list[link.target];
      after.column = Math.max(after.column, one.column + 1);
      indegree[after.place] -= 1;
      if (!indegree[after.place]) queue.push(after);
    }
  }

  const last = Math.max(0, ...list.map(one => one.column));

  for (const one of list) if (!one.links.out.length && one.links.in.length) one.column = last;

  const total = list.filter(one => !one.links.in.length).reduce((sum, one) => sum + one.out, 0);
  return {
    sourceField,
    targetField,
    valueField,
    nodes: list,
    links,
    columns: last + 1,
    total,
    missing,
    dropped,
    looped
  };
} // The middle of a node, by the weighted middles of the nodes it joins.

function middleOf(one, side, nodes) {
  let sum = 0;
  let weight = 0;

  for (const link of one.links[side]) {
    const other = nodes[side === 'in' ? link.source : link.target];
    sum += (other.y0 + other.y1) / 2 * link.value;
    weight += link.value;
  }

  return weight ? sum / weight : null;
}
/**
 * Where a Sankey diagram's marks go in `box` {x, y, w, h}: {nodes, links,
 * scale}. A node gets {x0, x1, y0, y1}, `width` px wide, its column's place
 * along the width; its height is its value at one scale for every column,
 * the columns `gap` apart inside and each centred. The order in a column is
 * the rows' at first, then sorted a few times by the weighted middle of the
 * nodes each joins, so the bands cross less. A link gets {x0, x1, sy0, sy1,
 * ty0, ty1}: where it leaves its source and where it reaches its target,
 * its bands stacked along each node in the order of the other ends.
 */


function sankeyLayout(model, {
  x,
  y,
  w,
  h
}, {
  width = 12,
  gap = 8,
  passes = 6
} = {}) {
  const nodes = model.nodes.map(one => ({ ...one,
    x0: 0,
    x1: 0,
    y0: 0,
    y1: 0
  }));
  const columns = Array.from({
    length: model.columns
  }, () => []);

  for (const one of nodes) columns[one.column].push(one);

  const step = model.columns > 1 ? (w - width) / (model.columns - 1) : 0;
  const scale = Math.min(...columns.filter(column => column.length).map(column => {
    const sum = column.reduce((all, one) => all + one.value, 0);
    return sum > 0 ? Math.max(0, h - gap * (column.length - 1)) / sum : Infinity;
  }));
  const ky = Number.isFinite(scale) ? scale : 0;

  const stack = column => {
    const height = column.reduce((all, one) => all + one.value * ky, 0) + gap * (column.length - 1);
    let top = y + Math.max(0, (h - height) / 2);

    for (const one of column) {
      one.y0 = top;
      one.y1 = top + one.value * ky;
      top = one.y1 + gap;
    }
  };

  columns.forEach((column, index) => {
    for (const one of column) {
      one.x0 = x + index * step;
      one.x1 = one.x0 + width;
    }

    stack(column);
  });

  for (let pass = 0; pass < passes; pass += 1) {
    const forward = pass % 2 === 0;
    const order = forward ? columns : [...columns].reverse();

    for (const column of order) {
      const middles = new Map(column.map(one => [one, middleOf(one, forward ? 'in' : 'out', nodes) ?? (one.y0 + one.y1) / 2]));
      column.sort((a, b) => middles.get(a) - middles.get(b) || a.place - b.place);
      stack(column);
    }
  }

  const links = model.links.map(one => ({ ...one,
    x0: nodes[one.source].x1,
    x1: nodes[one.target].x0,
    width: one.value * ky
  }));

  for (const one of nodes) {
    let down = one.y0;
    const outs = links.filter(link => link.source === one.place).sort((a, b) => nodes[a.target].y0 - nodes[b.target].y0 || a.index - b.index);

    for (const link of outs) {
      link.sy0 = down;
      link.sy1 = down + link.width;
      down = link.sy1;
    }

    down = one.y0;
    const ins = links.filter(link => link.target === one.place).sort((a, b) => nodes[a.source].y0 - nodes[b.source].y0 || a.index - b.index);

    for (const link of ins) {
      link.ty0 = down;
      link.ty1 = down + link.width;
      down = link.ty1;
    }
  }

  return {
    nodes,
    links,
    scale: ky
  };
}
/** A band's outline as an SVG path: two curves between its ends, closed. */

function bandPathOf(link) {
  const middle = (link.x0 + link.x1) / 2;

  const r = value => Math.round(value * 10) / 10;

  return `M${r(link.x0)} ${r(link.sy0)}C${r(middle)} ${r(link.sy0)} ${r(middle)} ${r(link.ty0)} ${r(link.x1)} ${r(link.ty0)}` + `L${r(link.x1)} ${r(link.ty1)}C${r(middle)} ${r(link.ty1)} ${r(middle)} ${r(link.sy1)} ${r(link.x0)} ${r(link.sy1)}Z`;
}
/**
 * Whether the point (px, py) is on a band: its top and bottom at px follow
 * the same curve the path draws (control points at the middle), found by
 * halving the curve's parameter.
 */

function onBand(link, px, py) {
  if (px < link.x0 || px > link.x1) return false;
  const middle = (link.x0 + link.x1) / 2;

  const along = t => (1 - t) ** 3 * link.x0 + 3 * (1 - t) ** 2 * t * middle + 3 * (1 - t) * t ** 2 * middle + t ** 3 * link.x1;

  let low = 0;
  let high = 1;

  for (let step = 0; step < 24; step += 1) {
    const t = (low + high) / 2;
    if (along(t) < px) low = t;else high = t;
  }

  const t = (low + high) / 2;
  const ease = 3 * t ** 2 - 2 * t ** 3;
  const top = link.sy0 + (link.ty0 - link.sy0) * ease;
  return py >= top - 1 && py <= top + Math.max(link.width, 2) + 1;
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

/***/ "2af113f71abd"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("deb1a4d61565");
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("5b7d7695b41b");
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("43090d1c8307");
/* harmony import */ var _chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("6668151838ce");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("21ed19c5c40f");
/* harmony import */ var _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("fc9bb1435f01");
/* harmony import */ var _chart_core_sankey_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("046d25672671");
/* harmony import */ var _js_templates_default__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("5c4870bfdc9e");
/* harmony import */ var _component_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("a38f19866c68");
/* harmony import */ var _lang_en_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("9854289346ab");
/* harmony import */ var _lang_ru_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("1b1060bb6222");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__, _js_templates_default__WEBPACK_IMPORTED_MODULE_7__]);
([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__, _js_templates_default__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__);
// sf-chart-sankey: a Sankey diagram, quantities flowing between stages or
// categories (docs/research/catalogue.md, Sankey; docs/DECISIONS.md D14).
//
// The element reads its rows once into nodes and flows (chart-core/sankey),
// measures its plot, and draws in SVG the nodes in columns by their longest
// path from where the flows start, and a band from node to node as wide as
// its flow. A node takes a chart colour of its place (--sf-chart-1..8), and
// a band the light fill of its source's colour; a node's name and value are
// written beside it where they fit. A person reaches the plot with one Tab
// stop and walks the nodes: Up and Down within a column, Left and Right
// along the largest flow to the column before or after; each node is said
// with what flows into it and out of it. The chart as a whole is a summary
// sentence, and every flow is a row of the table.
//
// It renders into its own light DOM, like every Smart component.










 // The text of the plot, in px, by size rung, as on the line chart.

const FONT = {
  '1/2': 11,
  1: 12,
  2: 14
}; // A node's width, in px, by size rung.

const NODE = {
  '1/2': 8,
  1: 12,
  2: 16
}; // A letter's width against the font: Cyrillic is near 0.7 of it.

const LETTER = 0.72;
const PAD = 6; // How many flows a node's sentence names on each side.

const NAMED = 3;
const ChartSankeyElement = (0,_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__.elementFromManifest)(_component_json__WEBPACK_IMPORTED_MODULE_8__, {
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

class SfSankey extends ChartSankeyElement {
  static get props() {
    return { ...super.props,
      rootClass: {
        default: ''
      }
    };
  }

  onConnected() {
    this._uid = this.id || `sf-chart-sankey-${instances += 1}`;
    this._box = this._box ?? {
      width: 0,
      height: 0
    };
    this._cursor = null;
    this._band = null;
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
    const checked = (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_5__.coloursKey)(colours);

    if (checked !== this._coloursChecked && this.isConnected) {
      this._coloursChecked = checked;
      (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_5__.checkContrast)(this, colours, 'sf-chart-sankey');
    }

    const plot = this.querySelector('.sf-chart-sankey-plot');

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
  } // The page's own colours by node (chart-core/colors), read again only
  // when the setting changes.


  colours() {
    if (this.colors !== this._coloursRaw || !this._colours) {
      this._coloursRaw = this.colors;
      this._colours = (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_5__.readColours)(this.colors, said => console.warn(`<sf-chart-sankey> ${said}`));
    }

    return this._colours;
  }

  words(key, vars) {
    return this.sfWord(key, vars ? {
      vars
    } : undefined);
  } // The rows as nodes and flows, read again only when the data or its
  // mapping changes.


  model() {
    const key = [this.items, this.source, this.target, this.value];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;
    this._model = (0,_chart_core_sankey_js__WEBPACK_IMPORTED_MODULE_6__.sankeyRows)(this.items, {
      source: this.source,
      target: this.target,
      value: this.value
    });
    return this._model;
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.links.length ? 'ready' : 'empty';
  }

  sayY(value) {
    return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatNumber)(value, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.yFormat, {
      gap: this.words('gap')
    });
  }

  sayShare(value, of) {
    return of > 0 ? (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatNumber)(value / of, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), 'percent') : '';
  } // Up to three flows by size, «и ещё N» for the rest.


  sayFlows(links, side) {
    const model = this.model();
    const sorted = [...links].sort((a, b) => b.value - a.value);
    const named = sorted.slice(0, NAMED).map(one => this.words('flow-item', {
      name: model.nodes[side === 'in' ? one.source : one.target].key,
      value: this.sayY(one.value)
    }));
    const rest = sorted.length - named.length;
    return rest > 0 ? this.words('more', {
      list: named.join(', '),
      count: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatNumber)(rest, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), 'integer')
    }) : named.join(', ');
  } // Where everything goes: the nodes in their columns, the bands, and the
  // names written beside the nodes that have room. Null until the plot has
  // a width.


  geometry(model) {
    const {
      width,
      height
    } = this._box;
    if (!width || !height) return null;
    const font = FONT[this.size] ?? 12;
    const node = NODE[this.size] ?? 12;
    const gap = Math.max(6, Math.round(font * 0.75));
    const layout = (0,_chart_core_sankey_js__WEBPACK_IMPORTED_MODULE_6__.sankeyLayout)(model, {
      x: 0,
      y: 2,
      w: width,
      h: height - 4
    }, {
      width: node,
      gap
    });
    const letter = font * LETTER;
    const step = model.columns > 1 ? (width - node) / (model.columns - 1) : width;
    const room = Math.floor((step - node - PAD * 2) / letter);
    const labelled = this.labels !== 'none';
    const lastColumn = model.columns - 1; // Reading order: column after column, top to bottom.

    const order = [...layout.nodes].sort((a, b) => a.column - b.column || a.y0 - b.y0);
    const nodes = layout.nodes.map(one => {
      const end = one.column === lastColumn && lastColumn > 0;
      const shown = { ...one,
        cx: (one.x0 + one.x1) / 2,
        cy: (one.y0 + one.y1) / 2,
        end,
        nameText: '',
        valueText: ''
      }; // A name stands at the node's middle: it needs the node and the gap
      // round it to be a line high, or it would touch its neighbour's.

      if (!labelled || one.y1 - one.y0 + gap < font * 1.2) return shown;
      const value = this.sayY(one.value);
      const chars = room - value.length - 1;
      shown.nameText = cut(one.key, chars);
      if (shown.nameText) shown.valueText = value;
      return shown;
    }); // The names after the nodes of the column before the last and the names
    // before the nodes of the last share one gap: where two would touch, the
    // first is cut to the room left, or left out.

    const span = one => (one.nameText.length + 1 + one.valueText.length) * letter;

    for (const one of nodes) {
      if (!one.nameText || one.end || one.column !== lastColumn - 1) continue;

      for (const other of nodes) {
        if (!other.nameText || !other.end || Math.abs(other.cy - one.cy) >= font * 1.2) continue;
        const free = other.x0 - PAD - span(other) - PAD - (one.x1 + PAD);
        if (free >= span(one)) continue;
        one.nameText = cut(one.key, Math.floor(free / letter) - one.valueText.length - 1);
        if (!one.nameText) one.valueText = '';
      }
    }

    return {
      width,
      height,
      font,
      node,
      nodes,
      links: layout.links,
      order: order.map(one => one.place),
      lastColumn
    };
  }

  summarize(model) {
    if (this.summary === 'none') return '';
    if (!model.links.length) return this.words('summary-empty');
    const locale = (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this);
    const parts = [this.words('summary-total', {
      nodes: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatNumber)(model.nodes.length, locale, 'integer'),
      flows: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatNumber)(model.links.length, locale, 'integer'),
      columns: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatNumber)(model.columns, locale, 'integer'),
      total: this.sayY(model.total)
    })];
    const largest = model.links.reduce((best, one) => one.value > best.value ? one : best);
    const from = model.nodes[largest.source];
    parts.push(this.words('summary-largest', {
      source: from.key,
      target: model.nodes[largest.target].key,
      value: this.sayY(largest.value),
      share: this.sayShare(largest.value, from.out)
    }));
    const ends = model.nodes.filter(one => !one.links.out.length);

    if (ends.length > 1) {
      const top = ends.reduce((best, one) => one.in > best.in ? one : best);
      parts.push(this.words('summary-end', {
        name: top.key,
        value: this.sayY(top.in),
        share: this.sayShare(top.in, ends.reduce((sum, one) => sum + one.in, 0))
      }));
    }

    const left = model.missing + model.dropped;
    if (left) parts.push(this.words('summary-left', {
      count: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatNumber)(left, locale, 'integer')
    }));
    if (model.looped) parts.push(this.words('summary-looped', {
      count: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatNumber)(model.looped, locale, 'integer')
    }));
    return parts.join(' ');
  } // A node as one sentence: its name and value, what flows in from where
  // and what flows out to where.


  nodeLine(node) {
    const parts = [this.words('cursor', {
      name: node.key,
      value: this.sayY(node.value)
    })];
    if (node.links.in.length) parts.push(this.words('cursor-in', {
      list: this.sayFlows(node.links.in, 'in')
    }));
    if (node.links.out.length) parts.push(this.words('cursor-out', {
      list: this.sayFlows(node.links.out, 'out')
    }));
    return parts.join('; ');
  }

  cursorNode(cursor = this._cursor) {
    const geometry = this._geometry;
    if (!cursor || !geometry) return null;
    return geometry.nodes[cursor.index] ?? null;
  }

  setCursor(cursor, {
    say = false
  } = {}) {
    this._cursor = cursor;
    if (cursor) this._band = null;
    const node = this.cursorNode(cursor);
    if (say && node) this._said = this.nodeLine(node);
    this.requestComponentUpdate('cursor');
  } // The keys walk the nodes: Up and Down within a column, Left and Right
  // to the column before or after along the node's largest flow (or to the
  // nearest node there when it has none that way), Home and End to the
  // first and the last node in reading order.


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
      this.choose(this.cursorNode());
      return;
    }

    const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const {
      order
    } = geometry;
    const now = this.cursorNode();
    let index = order[0];
    if (event.key === 'End') index = order[order.length - 1];else if (now && event.key !== 'Home') index = this.neighbour(now, event.key) ?? now.place;
    this.setCursor({
      index,
      series: 'node'
    }, {
      say: true
    });
  }

  neighbour(now, key) {
    const {
      nodes
    } = this._geometry;

    const column = number => nodes.filter(one => one.column === number).sort((a, b) => a.y0 - b.y0);

    if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'PageUp' || key === 'PageDown') {
      const here = column(now.column);
      const at = here.findIndex(one => one.place === now.place);
      const next = here[at + (key === 'ArrowDown' || key === 'PageDown' ? 1 : -1)];
      return next?.place ?? null;
    }

    const forward = key === 'ArrowRight';
    const links = forward ? now.links.out : now.links.in;

    if (links.length) {
      const largest = links.reduce((best, one) => one.value > best.value ? one : best);
      return forward ? largest.target : largest.source;
    } // No flow that way: the nearest node of the next column that has one.


    for (let number = now.column + (forward ? 1 : -1); number >= 0 && number <= this._geometry.lastColumn; number += forward ? 1 : -1) {
      const there = column(number);
      if (!there.length) continue;
      return there.reduce((best, one) => Math.abs(one.cy - now.cy) < Math.abs(best.cy - now.cy) ? one : best).place;
    }

    return null;
  } // The pointer picks the node it is over, or else the band.


  placeAt(event) {
    const geometry = this._geometry;
    if (!geometry) return null;
    const box = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - box.left;
    const y = event.clientY - box.top;
    const node = geometry.nodes.find(one => x >= one.x0 - 3 && x <= one.x1 + 3 && y >= one.y0 - 2 && y <= one.y1 + 2);
    if (node) return {
      index: node.place,
      series: 'node'
    }; // The thinnest band on top wins, as it is drawn last.

    const bands = geometry.links.filter(one => (0,_chart_core_sankey_js__WEBPACK_IMPORTED_MODULE_6__.onBand)(one, x, y)).sort((a, b) => a.width - b.width);
    return bands.length ? {
      band: bands[0].index
    } : null;
  }

  onPointerMove(event) {
    const place = this.placeAt(event);

    if (place?.band !== undefined) {
      if (this._band === place.band) return;
      this._band = place.band;
      if (!this.matches(':focus-within')) this._cursor = null;
      this.requestComponentUpdate('band');
      return;
    }

    if (this._band !== null) {
      this._band = null;
      this.requestComponentUpdate('band');
    }

    if (place?.index === this._cursor?.index) return;
    if (place === null && this.matches(':focus-within')) return;
    this.setCursor(place);
  }

  onPointerLeave() {
    this._band = null;

    if (this.matches(':focus-within')) {
      this.requestComponentUpdate('band');
      return;
    }

    this.setCursor(null);
  }

  onPlotClick(event) {
    const place = this.placeAt(event);
    if (place?.index !== undefined) this.choose(this.cursorNode(place));
  }

  choose(node) {
    if (!node) return;
    this.sfEmit('select', {
      index: node.place,
      node: node.key,
      value: node.value,
      in: node.in,
      out: node.out
    });
  }

  toggleView() {
    this._view = this._view === 'table' ? 'chart' : 'table';
    this.requestComponentUpdate('view');
  }

  templateContext() {
    const model = this.model();
    const state = this.state(model);
    const geometry = state === 'ready' ? this.geometry(model) : null;
    this._geometry = geometry;
    const tableModel = this.tableModel(model, state === 'ready');
    return this.createTemplateContext({ ...this.getPropsContext(),
      component: this,
      uid: this._uid,
      size: this.size,
      label: this.label || this.words('untitled'),
      state,
      model,
      tableModel,
      tableKey: [tableModel, this.label, this.yFormat, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.table, this.table === 'toggle' ? this._view : 'chart'],
      geometry,
      cursor: this.cursorNode(),
      band: geometry && this._band !== null ? geometry.links[this._band] ?? null : null,
      said: this._said,
      view: this.table === 'toggle' ? this._view : 'chart',
      summaryText: state === 'ready' ? this.summarize(model) : '',
      hasDescription: this.hasSlotContent?.('description') ?? false,
      description: this.hasSlotContent?.('description') ? this.getSlotContent('description') : null,
      paint: this.colours(),
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
    return (0,_js_templates_default__WEBPACK_IMPORTED_MODULE_7__.renderSankeyTemplate)(this.templateContext());
  }

}

SfSankey.define('sf-chart-sankey');
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "5c4870bfdc9e"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderSankeyTemplate: () => (/* binding */ renderSankeyTemplate)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2a080a730149");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("21ed19c5c40f");
/* harmony import */ var _chart_core_sankey_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("046d25672671");
/* harmony import */ var _default_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("8f8446406e38");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([lit__WEBPACK_IMPORTED_MODULE_0__]);
var __webpack_async_dependencies_result__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_async_dependencies_result__[0];
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lit__WEBPACK_IMPORTED_MODULE_0__);



 // The figure of a Sankey diagram: the label and the table button, the plot
// (SVG), the summary and the description, the live line, and every flow as
// a row of a table.
//
// The plot is one Tab stop, a role="group" named by the label and described
// by the summary; its marks are aria-hidden, because the summary, the live
// line and the table say what they show. A node takes a chart colour by its
// place (--sf-chart-1..8), or a page's own (the colors setting, by node
// name) set in a style as --tone; a band is the light fill of its source's
// colour. In forced colours the nodes are the text colour and the bands
// the canvas with a line of it.

const px = value => `${Math.round(value * 10) / 10}`;

const tone = place => `sf-chart-sankey-c${place % 8 + 1}`;

const paintOf = (paint, key) => {
  const colour = paint.get(key);
  return colour ? `--sf-chart-sankey--tone: ${colour}; --sf-chart-sankey--wash: color-mix(in srgb, ${colour} 35%, transparent)` : '';
}; // The plot's inside is SVG markup set as the svg element's innerHTML (a
// property, so lit writes no part markers inside it: a first-paint snapshot
// of the plot is the same on every run). Every text is escaped.


const ESCAPES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

const esc = value => String(value).replace(/[&<>"']/gu, one => ESCAPES[one]); // The bands first, widest first so a thin one lies on top, then the nodes
// with their names.


function marksMarkup(g, paint, model) {
  let out = '<g class="sf-chart-sankey-marks" aria-hidden="true"><g class="sf-chart-sankey-bands">';

  for (const link of [...g.links].sort((a, b) => b.width - a.width)) {
    const from = model.nodes[link.source];
    const style = paintOf(paint, from.key);
    out += `<path class="sf-chart-sankey-band ${tone(from.place)}"${style ? ` style="${esc(style)}"` : ''} data-flow="${link.index}" d="${(0,_chart_core_sankey_js__WEBPACK_IMPORTED_MODULE_2__.bandPathOf)(link)}"/>`;
  }

  out += '</g><g class="sf-chart-sankey-nodes">';

  for (const node of g.nodes) {
    const style = paintOf(paint, node.key);
    out += `<g class="sf-chart-sankey-node ${tone(node.place)}"${style ? ` style="${esc(style)}"` : ''} data-node="${esc(node.key)}">`;
    out += `<rect class="sf-chart-sankey-bar" x="${px(node.x0)}" y="${px(node.y0)}" width="${px(node.x1 - node.x0)}" height="${px(Math.max(1, node.y1 - node.y0))}"/>`;

    if (node.nameText) {
      const x = node.end ? node.x0 - 6 : node.x1 + 6;
      out += `<text class="sf-chart-sankey-name" x="${px(x)}" y="${px(node.cy)}" dominant-baseline="middle" text-anchor="${node.end ? 'end' : 'start'}">${esc(node.nameText)} <tspan class="sf-chart-sankey-value">${esc(node.valueText)}</tspan></text>`;
    }

    out += '</g>';
  }

  return `${out}</g></g>`;
} // The cursor: a ring round the node; a band under the pointer drawn again
// on top, stronger.


function cursorMarkup(node, band, model) {
  let out = '';
  if (band) out += `<path class="sf-chart-sankey-band sf-chart-sankey-band--hot ${tone(model.nodes[band.source].place)}" d="${(0,_chart_core_sankey_js__WEBPACK_IMPORTED_MODULE_2__.bandPathOf)(band)}"/>`;
  if (node) out += `<rect class="sf-chart-sankey-ring" x="${px(node.x0 - 2)}" y="${px(node.y0 - 2)}" width="${px(node.x1 - node.x0 + 4)}" height="${px(Math.max(1, node.y1 - node.y0) + 4)}" rx="2"/>`;
  return out ? `<g class="sf-chart-sankey-cursor" aria-hidden="true">${out}</g>` : '';
}

function renderTooltip(context, g) {
  const {
    component,
    model,
    cursor,
    band
  } = context;
  if (context.tooltip === 'none' || !cursor && !band) return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  let name;
  let rows;
  let at;

  if (band) {
    const from = model.nodes[band.source];
    name = component.words('flow-name', {
      source: from.key,
      target: model.nodes[band.target].key
    });
    rows = [['value', component.sayY(band.value)], ['share-of-source', component.sayShare(band.value, from.out)]];
    at = {
      x: (band.x0 + band.x1) / 2,
      y: (band.sy0 + band.ty1) / 2,
      right: (band.x0 + band.x1) / 2
    };
  } else {
    name = cursor.key;
    rows = [];
    if (cursor.links.in.length) rows.push(['in', component.sayY(cursor.in)]);
    if (cursor.links.out.length) rows.push(['out', component.sayY(cursor.out)]);
    at = {
      x: cursor.x0,
      y: cursor.cy,
      right: cursor.x1
    };
  }

  const flip = at.x > g.width / 2;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${`sf-chart-sankey-tooltip${flip ? ' sf-chart-sankey-tooltip--flip' : ''}`} aria-hidden="true"
         style=${`inset-inline-start: ${px(flip ? at.x : at.right)}px; inset-block-start: ${px(at.y)}px`}>
      <div class="sf-chart-sankey-tooltip-name">${name}</div>
      ${rows.map(([key, value]) => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <div class="sf-chart-sankey-tooltip-row">
          <span>${component.words(key)}</span>
          <span class="sf-chart-sankey-tooltip-value">${value}</span>
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
}

function tableMarkup(context, shownTable) {
  const {
    component,
    tableModel: model,
    label
  } = context;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${shownTable ? 'sf-chart-sankey-table' : 'sf-chart-sankey-sr'}>
      <table>
        <caption>${label}</caption>
        <thead>
          <tr>
            <th scope="col">${component.words('source')}</th>
            <th scope="col">${component.words('target')}</th>
            <th scope="col">${component.words('value')}</th>
            <th scope="col">${component.words('share-of-source')}</th>
          </tr>
        </thead>
        <tbody>
          ${model.links.map(one => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
            <tr>
              <th scope="row">${model.nodes[one.source].key}</th>
              <td>${model.nodes[one.target].key}</td>
              <td>${component.sayY(one.value)}</td>
              <td>${component.sayShare(one.value, model.nodes[one.source].out)}</td>
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
    band,
    paint,
    model
  } = context;

  if (state === 'loading') {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-sankey-loading" role="status" aria-busy="true"><span class="sf-chart-sankey-sr">${component.words('loading')}</span></div>`;
  }

  if (state === 'empty' || state === 'error') {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
      <sf-empty-state class="sf-chart-sankey-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
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
    <svg class="sf-chart-sankey-svg" role="group" tabindex="0" focusable="true"
         aria-label=${context.label} aria-roledescription=${component.words('roledescription')}
         aria-describedby=${described || lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
         width=${g.width} height=${g.height} viewBox=${`0 0 ${g.width} ${g.height}`}
         @keydown=${event => component.onPlotKey(event)}
         @pointermove=${event => component.onPointerMove(event)}
         @pointerleave=${() => component.onPointerLeave()}
         @click=${event => component.onPlotClick(event)}
         @blur=${() => component.setCursor(null)}
         .innerHTML=${marksMarkup(g, paint, model) + cursorMarkup(cursor, band, model)}>
    </svg>
    ${renderTooltip(context, g)}
  `;
}

function renderSankeyTemplate(context) {
  const {
    component,
    uid,
    state
  } = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <figure class=${['sf-chart-sankey', `sf-chart-sankey--size-${size}`, `sf-chart-sankey--${state}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-chart-sankey-head-row">
        <span class="sf-chart-sankey-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.table === 'toggle' && state === 'ready' ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<button type="button" class="sf-chart-sankey-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      </figcaption>
      <div class="sf-chart-sankey-plot" ?hidden=${tableView}>${renderPlot(context)}</div>
      ${context.summaryText ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<p class="sf-chart-sankey-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      ${context.hasDescription ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-sankey-description" id=${`${uid}-description`}>${context.description}</div>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      <div class="sf-chart-sankey-sr" aria-live="polite">${context.said}</div>
      ${renderTable(context)}
    </figure>
  `;
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "8f8446406e38"
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

/***/ "a38f19866c68"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"id":"smart.chart-sankey","tag":"sf-chart-sankey","version":"0.1.0","kind":"leaf","settings":{"label":{"type":"string","default":""},"items":{"type":"list","default":[],"of":"object"},"colors":{"type":"object","default":{}},"source":{"type":"string","default":""},"target":{"type":"string","default":""},"value":{"type":"string","default":""},"labels":{"type":"enum","values":["auto","none"],"default":"auto"},"tooltip":{"type":"enum","values":["flow","none"],"default":"flow"},"y-format":{"type":"string","default":"number"},"size":{"type":"enum","values":["1/2","1","2"],"default":"1"},"table":{"type":"enum","values":["toggle","visible","hidden"],"default":"toggle"},"summary":{"type":"enum","values":["auto","none"],"default":"auto"},"data-state":{"type":"enum","values":["auto","loading","ready","empty","error"],"default":"auto"}},"events":{"select":{"carries":{"index":"number","node":"string","value":"number","in":"number","out":"number"}},"refresh":{"carries":{}}},"actions":{"reset":{"with":{}}},"presentation":{"skeleton":{"late":["items"]}},"css-variables":{"--sf-chart-sankey-height":{"type":"length","state":"default"},"--sf-chart-sankey-label-color":{"type":"color","state":"default"},"--sf-chart-sankey-hover-background-color":{"type":"color","state":"hover"}}}');

/***/ },

/***/ "9854289346ab"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Sankey diagram","runtime":{"untitled":"Chart","roledescription":"flow diagram","summary-total":"Nodes: {nodes}, flows: {flows}, stages: {columns}; total {total}.","summary-largest":"The largest flow is «{source}» → «{target}»: {value} ({share} of «{source}»).","summary-end":"The most arrives at «{name}»: {value} ({share}).","summary-left":"Rows without a flow: {count}.","summary-looped":"Flows closing a loop, left out: {count}.","summary-empty":"No data.","cursor":"{name}: {value}","cursor-in":"in from {list}","cursor-out":"out to {list}","flow-item":"«{name}» {value}","more":"{list} and {count} more","flow-name":"{source} → {target}","source":"From","target":"To","value":"Value","share-of-source":"Share of the source","in":"In","out":"Out","gap":"no data","show-table":"Table","loading":"Loading the chart\'s data","empty-title":"No data for the chart","error-title":"Could not load the data"},"events":{"select":{"label":"Choose a node"},"refresh":{"label":"Load the data again"}},"actions":{"reset":{"label":"Take the cursor away"}}}');

/***/ },

/***/ "1b1060bb6222"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Диаграмма Санки","runtime":{"untitled":"График","roledescription":"диаграмма потоков","summary-total":"Узлов: {nodes}, потоков: {flows}, этапов: {columns}; всего {total}.","summary-largest":"Крупнейший поток — «{source}» → «{target}»: {value} ({share} от «{source}»).","summary-end":"Больше всего приходит в «{name}»: {value} ({share}).","summary-left":"Строк без потока: {count}.","summary-looped":"Потоков, замыкающих круг, пропущено: {count}.","summary-empty":"Нет данных.","cursor":"{name}: {value}","cursor-in":"приходит из {list}","cursor-out":"уходит в {list}","flow-item":"«{name}» {value}","more":"{list} и ещё {count}","flow-name":"{source} → {target}","source":"Откуда","target":"Куда","value":"Значение","share-of-source":"Доля от источника","in":"Приходит","out":"Уходит","gap":"нет данных","show-table":"Таблица","loading":"Загрузка данных графика","empty-title":"Нет данных для графика","error-title":"Не удалось загрузить данные"},"events":{"select":{"label":"Выбрать узел"},"refresh":{"label":"Загрузить данные заново"}},"actions":{"reset":{"label":"Убрать курсор"}}}');

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
/******/ 	let __webpack_exports__ = __webpack_require__("2af113f71abd");
/******/
/******/ })()
;