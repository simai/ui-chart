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

/***/ "344e6b10eb08"
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bubbleRadius: () => (/* binding */ bubbleRadius),
/* harmony export */   linearFit: () => (/* binding */ linearFit),
/* harmony export */   measureExtent: () => (/* binding */ measureExtent),
/* harmony export */   moveScatter: () => (/* binding */ moveScatter),
/* harmony export */   nearestPoint: () => (/* binding */ nearestPoint),
/* harmony export */   readingOrder: () => (/* binding */ readingOrder),
/* harmony export */   scatterPoints: () => (/* binding */ scatterPoints),
/* harmony export */   strengthOf: () => (/* binding */ strengthOf)
/* harmony export */ });
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("37677343b39a");
// The points of a scatter chart (docs/research/catalogue.md, Scatter /
// bubble): one point per row, at two measures, with an optional third as a
// bubble's area. A row without both measures is no point; it is counted, so
// the summary can say how many were left out.

/**
 * {xField, yField, bubbleField, pointField, series: [{key, name}], points, missing}.
 *
 * Each point is {row, series, x, y, size, name}: row is its place in the
 * data, size the bubble field's value (null without one), name the point
 * field's text ('' without one). Unset, x and y are the first two numeric
 * fields that name no series, point or bubble.
 */

function scatterPoints(items, {
  x = '',
  y = '',
  bubble = '',
  series = '',
  point = '',
  names = {}
} = {}) {
  const rows = (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.readRows)(items);
  const fields = rows.length ? Object.keys(rows[0]) : [];
  const numeric = fields.filter(name => ![series, point, bubble].includes(name) && rows.some(row => (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.readNumber)(row[name]) !== null));
  const xField = x || numeric[0] || '';
  const yField = y || numeric.find(name => name !== xField) || '';
  const groups = new Map();
  const points = [];
  let missing = 0;
  rows.forEach((row, index) => {
    const px = (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.readNumber)(row[xField]);
    const py = (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.readNumber)(row[yField]);

    if (px === null || py === null) {
      missing += 1;
      return;
    }

    const key = series ? row[series] === undefined || row[series] === null ? '' : String(row[series]) : yField;
    if (!groups.has(key)) groups.set(key, {
      key,
      name: names[key] ?? key
    });
    points.push({
      row: index,
      series: key,
      x: px,
      y: py,
      size: bubble ? (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.readNumber)(row[bubble]) : null,
      name: point && row[point] !== undefined && row[point] !== null ? String(row[point]) : ''
    });
  });
  return {
    xField,
    yField,
    bubbleField: bubble,
    pointField: point,
    series: [...groups.values()],
    points,
    missing
  };
}
/** [min, max] of one measure over the points, or null when there are none. */

function measureExtent(points, measure) {
  let min = Infinity;
  let max = -Infinity;

  for (const one of points) {
    const value = one[measure];
    if (value === null) continue;
    if (value < min) min = value;
    if (value > max) max = value;
  }

  return min === Infinity ? null : [min, max];
}
/** The least-squares line {slope, intercept, r} of the points, or null under three points or with no spread. */

function linearFit(points) {
  const n = points.length;
  if (n < 3) return null;
  let sx = 0;
  let sy = 0;

  for (const one of points) {
    sx += one.x;
    sy += one.y;
  }

  const mx = sx / n;
  const my = sy / n;
  let xx = 0;
  let yy = 0;
  let xy = 0;

  for (const one of points) {
    const dx = one.x - mx;
    const dy = one.y - my;
    xx += dx * dx;
    yy += dy * dy;
    xy += dx * dy;
  }

  if (xx === 0 || yy === 0) return null;
  const slope = xy / xx;
  return {
    slope,
    intercept: my - slope * mx,
    r: xy / Math.sqrt(xx * yy)
  };
}
/** How strong a correlation reads: none under 0.1, weak under 0.3, moderate under 0.7, else strong. */

function strengthOf(r) {
  const size = Math.abs(r);
  if (size < 0.1) return 'none';
  if (size < 0.3) return 'weak';
  if (size < 0.7) return 'moderate';
  return 'strong';
}
/**
 * A bubble's radius: its area is in proportion to the value, against the
 * largest value, which takes `largest` px. A value of zero, below zero or
 * missing has no area and is drawn at `least` px, hollow.
 */

function bubbleRadius(value, top, {
  least = 2,
  largest = 24
} = {}) {
  if (value === null || !(value > 0) || !(top > 0)) return least;
  return Math.max(least, largest * Math.sqrt(value / top));
}
/** The points' places in reading order: by x, then by y. */

function readingOrder(points) {
  return points.map((_, index) => index).sort((a, b) => points[a].x - points[b].x || points[a].y - points[b].y);
}
/**
 * The next cursor for a key, or null when the key is not the cursor's. The
 * cursor is a place in `order` (the reading order). Left and Right go to the
 * point before and after in that order, so every point is reached; Up and
 * Down to the nearest point above or below on the plot (`at`, the points'
 * [x, y] in px, y down), sideways distance counted twice; Home and End to the
 * ends; Page Up and Page Down a tenth. Past `bucketFrom` points Left and
 * Right move a hundredth.
 */

function moveScatter(cursor, key, {
  order,
  at,
  bucketFrom = 200
}) {
  const count = order.length;
  if (!count) return null;

  const clamp = place => Math.max(0, Math.min(count - 1, place));

  if (cursor === null && ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(key)) return 0;
  const from = cursor ?? 0;
  const step = count > bucketFrom ? Math.ceil(count / 100) : 1;
  const page = Math.max(1, Math.round(count / 10));

  switch (key) {
    case 'ArrowRight':
      return clamp(from + step);

    case 'ArrowLeft':
      return clamp(from - step);

    case 'Home':
      return 0;

    case 'End':
      return count - 1;

    case 'PageDown':
      return clamp(from + page);

    case 'PageUp':
      return clamp(from - page);

    case 'ArrowUp':
    case 'ArrowDown':
      {
        const [cx, cy] = at[order[from]];
        const up = key === 'ArrowUp';
        let best = from;
        let bestScore = Infinity;
        order.forEach((index, place) => {
          const [px, py] = at[index];
          if (up ? py >= cy : py <= cy) return;
          const score = Math.abs(py - cy) + 2 * Math.abs(px - cx);

          if (score < bestScore) {
            bestScore = score;
            best = place;
          }
        });
        return best;
      }

    default:
      return null;
  }
}
/** The place of the point nearest to (x, y) px within `reach` px, or -1. */

function nearestPoint(at, x, y, reach = Infinity) {
  let best = -1;
  let bestDistance = reach * reach;
  at.forEach(([px, py], index) => {
    const distance = (px - x) ** 2 + (py - y) ** 2;

    if (distance <= bestDistance) {
      bestDistance = distance;
      best = index;
    }
  });
  return best;
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

/***/ "b3aaa937901d"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("deb1a4d61565");
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("5b7d7695b41b");
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("43090d1c8307");
/* harmony import */ var _chart_core_scale_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("e8bb19218bf5");
/* harmony import */ var _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("6668151838ce");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("21ed19c5c40f");
/* harmony import */ var _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("fc9bb1435f01");
/* harmony import */ var _chart_core_palettes_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("b3159bcb2ffd");
/* harmony import */ var _chart_core_scatter_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("344e6b10eb08");
/* harmony import */ var _js_templates_default__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("b1f9ebed6749");
/* harmony import */ var _component_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("ef19798d5700");
/* harmony import */ var _lang_en_json__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("c3661f0b5cf0");
/* harmony import */ var _lang_ru_json__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("dbfd8cc3128f");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__, _js_templates_default__WEBPACK_IMPORTED_MODULE_9__]);
([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__, _js_templates_default__WEBPACK_IMPORTED_MODULE_9__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__);
// sf-chart-scatter: points at two measures, to show how they go together,
// with an optional third measure as a bubble's area
// (docs/research/catalogue.md, Scatter / bubble; docs/DECISIONS.md D9).
//
// The element reads its rows once into points (chart-core/scatter), measures
// its plot, and draws axes, guide lines and one mark per point in SVG, or
// past 2,000 marks on a canvas under the SVG (D5), which keeps the axes, the
// cursor and the text. A person reaches the plot with one Tab stop and walks
// the points with the arrows (chart-core/scatter moveScatter); every move is
// said in a polite live region, the chart as a whole in a summary sentence
// with the strength of the relation, and the same data is a table on
// request.
//
// It renders into its own light DOM, like every Smart component.












 // The text of the plot, in px, by size rung, as on the line chart.

const FONT = {
  '1/2': 11,
  1: 12,
  2: 14
}; // A point's radius and the largest bubble's, in px, by size rung.

const DOT = {
  '1/2': 3,
  1: 3.5,
  2: 4.5
};
const BUBBLE = {
  '1/2': 14,
  1: 22,
  2: 34
};
const CHAR = 0.6;
const GAP = 8; // Past this many marks the marks layer is a canvas (D5).

const CANVAS_FROM = 2000;
const ChartScatterElement = (0,_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__.elementFromManifest)(_component_json__WEBPACK_IMPORTED_MODULE_10__, {
  base: (_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default()),
  lang: {
    en: _lang_en_json__WEBPACK_IMPORTED_MODULE_11__,
    ru: _lang_ru_json__WEBPACK_IMPORTED_MODULE_12__
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

class SfScatter extends ChartScatterElement {
  static get props() {
    return { ...super.props,
      rootClass: {
        default: ''
      }
    };
  }

  onConnected() {
    this._uid = this.id || `sf-chart-scatter-${instances += 1}`;
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
    this._theme?.disconnect();
    this._theme = null;
    clearTimeout(this._table?.timer);
    this._observed = null;
    super.onDisconnected();
  }

  afterRender(changed) {
    if (typeof changed === 'function') return super.afterRender(changed);
    const colours = this.colours();
    const checked = (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_6__.coloursKey)(colours);

    if (checked !== this._coloursChecked && this.isConnected) {
      this._coloursChecked = checked;
      (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_6__.checkContrast)(this, colours, 'sf-chart-scatter');
    }

    const plot = this.querySelector('.sf-chart-scatter-plot');

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

    this.paintCanvas();
    return undefined;
  } // The canvas marks take their colours from the page as it is drawn; a theme
  // switched on the page (an attribute of html or body) paints them again.


  paintCanvas() {
    const canvas = this.querySelector('.sf-chart-scatter-canvas');
    const geometry = this._geometry;

    if (!canvas || !geometry?.canvas) {
      this._theme?.disconnect();
      this._theme = null;
      return;
    }

    (0,_js_templates_default__WEBPACK_IMPORTED_MODULE_9__.paintMarks)(this, canvas, geometry);

    if (!this._theme && typeof MutationObserver === 'function') {
      this._theme = new MutationObserver(() => this.paintCanvas());

      for (const node of [document.documentElement, document.body]) if (node) this._theme.observe(node, {
        attributes: true
      });
    }
  } // The page's own colours by key (chart-core/colors), read again only when
  // the setting changes.


  colours() {
    if (this.colors !== this._coloursRaw || !this._colours) {
      this._coloursRaw = this.colors;
      this._colours = (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_6__.readColours)(this.colors, said => console.warn(`<sf-chart-scatter> ${said}`));
    }

    return this._colours;
  } // Each series' colour by key: the page's own or the named palette's by
  // place (D7). With neither, the template keeps the theme's colours.


  paints(list) {
    const own = this.colours();
    const set = _chart_core_palettes_js__WEBPACK_IMPORTED_MODULE_7__.PALETTES[this.palette];
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
  } // The rows as points, read again only when the data or its mapping changes.


  model() {
    const key = [this.items, this.names, this.x, this.y, this.bubble, this.series, this.point];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;
    this._model = (0,_chart_core_scatter_js__WEBPACK_IMPORTED_MODULE_8__.scatterPoints)(this.items, {
      x: this.x,
      y: this.y,
      bubble: this.bubble,
      series: this.series,
      point: this.point,
      names: this.names || {}
    });
    return this._model;
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.points.length ? 'ready' : 'empty';
  }

  shownSeries(model) {
    const hidden = new Set(this.hiddenSeries || []);
    return model.series.map((one, place) => ({ ...one,
      place
    })).filter(one => !hidden.has(one.key));
  } // The axes' and the bubble's names: the page's label, or the field.


  axisName(which) {
    const model = this.model();
    if (which === 'x') return this.xLabel || model.xField;
    if (which === 'y') return this.yLabel || model.yField;
    return this.bubbleLabel || model.bubbleField;
  }

  sayX(value, step = 0) {
    return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(value, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.xFormat, {
      step,
      gap: this.words('gap')
    });
  }

  sayY(value, step = 0) {
    return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(value, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.yFormat, {
      step,
      gap: this.words('gap')
    });
  }

  saySize(value) {
    return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(value, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.bubbleFormat, {
      gap: this.words('gap')
    });
  } // What a point is called: its name, or its row; with more than one series,
  // the series too.


  pointName(model, one) {
    const name = one.name || this.words('point-n', {
      n: String(one.row + 1)
    });
    if (model.series.length < 2) return name;
    const series = model.series.find(each => each.key === one.series);
    return this.words('point-in', {
      name,
      series: series?.name ?? one.series
    });
  } // One axis's ticks and domain: the data's extent, or the page's min and
  // max, which hold only when given (an unset number reads as 0).


  axis(points, measure, room, font) {
    const name = measure === 'x' ? 'x' : 'y';
    const min = this.hasAttribute(`${name}-min`) && Number.isFinite(this[`${name}Min`]) ? this[`${name}Min`] : null;
    const max = this.hasAttribute(`${name}-max`) && Number.isFinite(this[`${name}Max`]) ? this[`${name}Max`] : null;
    let [low, high] = (0,_chart_core_scatter_js__WEBPACK_IMPORTED_MODULE_8__.measureExtent)(points, measure) ?? [0, 1];
    if (min !== null) low = min;
    if (max !== null) high = max;
    if (high < low) [low, high] = [high, low];
    return (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_3__.niceTicks)(low, high, (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_3__.tickCount)(room, font), {
      zero: Boolean(this[`${name}Zero`]),
      nice: min === null && max === null
    });
  } // Where everything goes: the plot's inner box, the scales, the ticks, one
  // mark per shown point and a trend line per shown series. Null until the
  // plot has a width.


  geometry(model, shown) {
    const {
      width,
      height
    } = this._box;
    if (!width || !height) return null;
    const font = FONT[this.size] ?? 12;
    const keys = new Set(shown.map(one => one.key));
    const points = model.points.filter(one => keys.has(one.series));
    const bubbles = Boolean(model.bubbleField);
    const largest = bubbles ? BUBBLE[this.size] ?? 22 : DOT[this.size] ?? 3.5;
    const pad = largest + 2;
    const top = GAP + (this.yLabel ? font * 1.5 : 0);
    const bottom = font * 1.5 + GAP + (this.xLabel ? font * 1.5 : 0);
    const yTicks = this.axis(points, 'y', height - top - bottom, font * 3.5);
    const yLabels = yTicks.ticks.map(value => this.sayY(value, yTicks.step));
    const left = Math.ceil(Math.max(...yLabels.map(text => text.length)) * font * CHAR) + GAP * 1.5;
    const right = GAP * 2;
    const inner = {
      left,
      top,
      right: Math.max(left + 1, width - right),
      bottom: Math.max(top + 1, height - bottom)
    };
    const xTicks = this.axis(points, 'x', inner.right - inner.left, font * CHAR * 8); // The marks keep their radius from the plot's edges, so none is cut.

    const x = (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_3__.linearScale)([xTicks.min, xTicks.max], [inner.left + pad, Math.max(inner.left + pad + 1, inner.right - pad)]);
    const y = (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_3__.linearScale)([yTicks.min, yTicks.max], [Math.max(inner.top + pad + 1, inner.bottom - pad), inner.top + pad]); // A label at an edge does not leave the plot: it is held from that edge.
    // Its width is guessed with a margin, since digits and a thousands space
    // run wider than the average letter.

    const xLabels = xTicks.ticks.map(value => {
      const text = this.sayX(value, xTicks.step);
      const at = x(value);
      const half = text.length * font * CHAR * 1.3 / 2;
      if (at - half < 0) return {
        at: 0,
        text,
        anchor: 'start'
      };
      if (at + half > width) return {
        at: width,
        text,
        anchor: 'end'
      };
      return {
        at,
        text,
        anchor: 'middle'
      };
    });
    const place = new Map(shown.map(one => [one.key, one.place]));
    const topSize = bubbles ? (0,_chart_core_scatter_js__WEBPACK_IMPORTED_MODULE_8__.measureExtent)(model.points, 'size')?.[1] ?? 0 : 0;
    const marks = points.map(one => ({ ...one,
      place: place.get(one.series),
      cx: x(one.x),
      cy: y(one.y),
      r: bubbles ? (0,_chart_core_scatter_js__WEBPACK_IMPORTED_MODULE_8__.bubbleRadius)(one.size, topSize, {
        least: 2,
        largest
      }) : largest,
      hollow: bubbles && !(one.size > 0)
    }));
    const at = marks.map(one => [one.cx, one.cy]); // Bubbles are drawn largest first, so a small one is never under a large.

    const drawn = bubbles ? marks.map((_, index) => index).sort((a, b) => marks[b].r - marks[a].r) : marks.map((_, index) => index);
    const trends = this.trend === 'linear' ? shown.map(one => {
      const own = points.filter(each => each.series === one.key);
      const fit = (0,_chart_core_scatter_js__WEBPACK_IMPORTED_MODULE_8__.linearFit)(own);
      if (!fit) return null;
      const [from, to] = (0,_chart_core_scatter_js__WEBPACK_IMPORTED_MODULE_8__.measureExtent)(own, 'x');
      return {
        key: one.key,
        place: one.place,
        x1: x(from),
        y1: y(fit.intercept + fit.slope * from),
        x2: x(to),
        y2: y(fit.intercept + fit.slope * to)
      };
    }).filter(Boolean) : [];
    return {
      width,
      height,
      font,
      inner,
      x,
      y,
      bubbles,
      marks,
      at,
      drawn,
      trends,
      order: (0,_chart_core_scatter_js__WEBPACK_IMPORTED_MODULE_8__.readingOrder)(marks),
      canvas: marks.length > CANVAS_FROM,
      yTicks: yTicks.ticks.map((value, index) => ({
        at: y(value),
        text: yLabels[index],
        zero: value === 0
      })),
      xTicks: xLabels,
      xZero: xTicks.ticks.includes(0) ? x(0) : null
    };
  }

  summarize(model, shown) {
    if (this.summary === 'none') return '';
    const keys = new Set(shown.map(one => one.key));
    const points = model.points.filter(one => keys.has(one.series));
    if (!points.length) return this.words('summary-empty');
    const locale = (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this);
    const [xMin, xMax] = (0,_chart_core_scatter_js__WEBPACK_IMPORTED_MODULE_8__.measureExtent)(points, 'x');
    const [yMin, yMax] = (0,_chart_core_scatter_js__WEBPACK_IMPORTED_MODULE_8__.measureExtent)(points, 'y');
    const parts = [this.words('summary-range', {
      count: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(points.length, locale, 'integer'),
      xName: this.axisName('x'),
      xMin: this.sayX(xMin),
      xMax: this.sayX(xMax),
      yName: this.axisName('y'),
      yMin: this.sayY(yMin),
      yMax: this.sayY(yMax)
    })];
    const sizes = model.bubbleField ? (0,_chart_core_scatter_js__WEBPACK_IMPORTED_MODULE_8__.measureExtent)(points, 'size') : null;
    if (sizes) parts.push(this.words('summary-bubble', {
      name: this.axisName('bubble'),
      min: this.saySize(sizes[0]),
      max: this.saySize(sizes[1])
    }));

    for (const one of shown) {
      const fit = (0,_chart_core_scatter_js__WEBPACK_IMPORTED_MODULE_8__.linearFit)(points.filter(each => each.series === one.key));
      if (!fit) continue;
      const strength = (0,_chart_core_scatter_js__WEBPACK_IMPORTED_MODULE_8__.strengthOf)(fit.r);
      const r = (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(fit.r, locale, 'decimal-2');
      const relation = strength === 'none' ? this.words('relation-none', {
        r
      }) : this.words('relation', {
        strength: this.words(`strength-${strength}`),
        direction: this.words(fit.r > 0 ? 'direction-up' : 'direction-down'),
        r
      });
      parts.push(model.series.length > 1 ? this.words('summary-series', {
        name: one.name,
        relation
      }) : this.words('summary-one', {
        relation
      }));
    }

    if (model.pointField) {
      let high = points[0];
      let low = points[0];

      for (const one of points) {
        if (one.y > high.y) high = one;
        if (one.y < low.y) low = one;
      }

      if (high !== low) parts.push(this.words('summary-top', {
        yName: this.axisName('y'),
        high: this.pointName(model, high),
        highY: this.sayY(high.y),
        low: this.pointName(model, low),
        lowY: this.sayY(low.y)
      }));
    }

    if (model.missing) parts.push(this.words('summary-missing', {
      count: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(model.missing, locale, 'integer')
    }));
    return parts.join(' ');
  } // A point as one sentence: its name, then its measures.


  pointLine(model, one) {
    const bubble = model.bubbleField ? this.words('cursor-bubble', {
      name: this.axisName('bubble'),
      value: this.saySize(one.size)
    }) : '';
    return this.words('cursor', {
      name: this.pointName(model, one),
      xName: this.axisName('x'),
      x: this.sayX(one.x),
      yName: this.axisName('y'),
      y: this.sayY(one.y),
      bubble
    });
  } // The cursor is a place in the reading order of the shown marks.


  cursorMark(cursor = this._cursor) {
    const geometry = this._geometry;
    if (cursor === null || !geometry || cursor >= geometry.order.length) return null;
    return geometry.marks[geometry.order[cursor]];
  }

  setCursor(cursor, {
    say = false
  } = {}) {
    this._cursor = cursor;
    const mark = this.cursorMark(cursor);
    if (say && mark) this._said = this.pointLine(this.model(), mark);
    this.requestComponentUpdate('cursor');
  }

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
      this.choose(this.cursorMark());
      return;
    }

    const next = (0,_chart_core_scatter_js__WEBPACK_IMPORTED_MODULE_8__.moveScatter)(this._cursor, event.key, {
      order: geometry.order,
      at: geometry.at
    });
    if (next === null) return;
    event.preventDefault();
    this.setCursor(next, {
      say: true
    });
  } // The pointer picks the nearest mark within its radius and a little more.


  placeAt(event) {
    const geometry = this._geometry;
    if (!geometry) return null;
    const box = event.currentTarget.getBoundingClientRect();
    const index = (0,_chart_core_scatter_js__WEBPACK_IMPORTED_MODULE_8__.nearestPoint)(geometry.at, event.clientX - box.left, event.clientY - box.top, geometry.bubbles ? BUBBLE[this.size] ?? 22 : 12);
    if (index < 0) return null;
    return geometry.order.indexOf(index);
  }

  onPointerMove(event) {
    const place = this.placeAt(event);
    if (place === this._cursor) return;
    if (place === null && this.matches(':focus-within')) return;
    this.setCursor(place);
  }

  onPointerLeave() {
    if (this.matches(':focus-within')) return;
    this.setCursor(null);
  }

  onPlotClick(event) {
    const place = this.placeAt(event);
    if (place !== null) this.choose(this.cursorMark(place));
  }

  choose(mark) {
    if (!mark) return;
    this.sfEmit('select', {
      series: mark.series,
      index: mark.row,
      point: mark.name,
      x: mark.x,
      y: mark.y
    });
  }

  toggleSeries(key) {
    const hidden = new Set(this.hiddenSeries || []);
    const nowHidden = !hidden.has(key);
    if (nowHidden) hidden.add(key);else hidden.delete(key);
    this.hiddenSeries = [...hidden];
    this._cursor = null;
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
    const cursor = this.cursorMark();
    const tableModel = this.tableModel(model, state === 'ready');
    return this.createTemplateContext({ ...this.getPropsContext(),
      component: this,
      uid: this._uid,
      size: this.size,
      label: this.label || this.words('untitled'),
      state,
      model,
      tableModel,
      tableKey: [tableModel, this.label, this.xLabel, this.yLabel, this.bubbleLabel, this.xFormat, this.yFormat, this.bubbleFormat, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.table, this.table === 'toggle' ? this._view : 'chart'],
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
  } // The data the table shows: settled, so a stream does not rebuild a row
  // per point on every render (chart-core/settle). The first data after none
  // shows at once.


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
    return (0,_js_templates_default__WEBPACK_IMPORTED_MODULE_9__.renderScatterTemplate)(this.templateContext());
  }

}

SfScatter.define('sf-chart-scatter');
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "b1f9ebed6749"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   paintMarks: () => (/* binding */ paintMarks),
/* harmony export */   renderScatterTemplate: () => (/* binding */ renderScatterTemplate)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2a080a730149");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("21ed19c5c40f");
/* harmony import */ var _default_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("369e423f179d");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([lit__WEBPACK_IMPORTED_MODULE_0__]);
var __webpack_async_dependencies_result__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_async_dependencies_result__[0];
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lit__WEBPACK_IMPORTED_MODULE_0__);


 // The figure of a scatter chart: the label and the table button, the legend,
// the plot (SVG, with a canvas under it past 2,000 marks), the summary and
// the description, the live line, and the same data as a table.
//
// The plot is one Tab stop, a role="group" named by the label and described
// by the summary; its axes and marks are aria-hidden, because the summary,
// the live line and the table say what they show. A series is a colour
// class (--c1..--c4) and a mark's shape (circle, square, triangle, diamond,
// a triangle down), so it stays itself in forced colours and in print.
// Bubbles are all circles: their series differ by an outline's dash too. A
// page's own colour (the colors setting, by the series' key) is --custom
// with its value in a style.

const colourOf = (place, paint) => `sf-chart-scatter-series--${paint ? 'custom' : `c${place % 4 + 1}`}${place > 0 ? ` sf-chart-scatter-series--d${Math.min(place, 7)}` : ''}`;

const paintOf = paint => paint ? `--sf-chart-scatter--custom: ${paint}` : '';

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

const esc = value => String(value).replace(/[&<>"']/gu, one => ESCAPES[one]); // A series' mark: a circle, or the corners of a shape of about a circle's
// area at radius r.


const SHAPES = [null, r => [[-0.89, -0.89], [0.89, -0.89], [0.89, 0.89], [-0.89, 0.89]].map(([x, y]) => [x * r, y * r]), r => [[0, -1.25], [1.08, 0.62], [-1.08, 0.62]].map(([x, y]) => [x * r, y * r]), r => [[0, -1.25], [1.25, 0], [0, 1.25], [-1.25, 0]].map(([x, y]) => [x * r, y * r]), r => [[0, 1.25], [1.08, -0.62], [-1.08, -0.62]].map(([x, y]) => [x * r, y * r])];

const cornersOf = (place, r, bubbles) => bubbles ? null : SHAPES[place % SHAPES.length]?.(r) ?? null;

function markMarkup(cx, cy, r, corners, extra = '') {
  if (!corners) return `<circle${extra} cx="${px(cx)}" cy="${px(cy)}" r="${px(r)}"/>`;
  const d = corners.map(([x, y], index) => `${index ? 'L' : 'M'}${px(cx + x)} ${px(cy + y)}`).join('');
  return `<path${extra} d="${d}Z"/>`;
}

function axesMarkup(g) {
  const {
    inner
  } = g;
  let out = '<g class="sf-chart-scatter-axes" aria-hidden="true">';

  if (g.grid === 'y' || g.grid === 'both') {
    for (const tick of g.yTicks) {
      out += `<line class="${tick.zero ? 'sf-chart-scatter-baseline' : 'sf-chart-scatter-grid'}" x1="${px(inner.left)}" x2="${px(inner.right)}" y1="${px(tick.at)}" y2="${px(tick.at)}"/>`;
    }
  }

  if (g.grid === 'x' || g.grid === 'both') {
    for (const tick of g.xTicks) {
      out += `<line class="sf-chart-scatter-grid" x1="${px(tick.at)}" x2="${px(tick.at)}" y1="${px(inner.top)}" y2="${px(inner.bottom)}"/>`;
    }
  }

  if (g.xZero !== null) out += `<line class="sf-chart-scatter-baseline" x1="${px(g.xZero)}" x2="${px(g.xZero)}" y1="${px(inner.top)}" y2="${px(inner.bottom)}"/>`;
  out += `<line class="sf-chart-scatter-baseline" x1="${px(inner.left)}" x2="${px(inner.right)}" y1="${px(inner.bottom)}" y2="${px(inner.bottom)}"/>`;
  out += `<line class="sf-chart-scatter-baseline" x1="${px(inner.left)}" x2="${px(inner.left)}" y1="${px(inner.top)}" y2="${px(inner.bottom)}"/>`;

  for (const tick of g.yTicks) {
    out += `<text class="sf-chart-scatter-tick" x="${px(inner.left - 6)}" y="${px(tick.at)}" text-anchor="end" dominant-baseline="middle">${esc(tick.text)}</text>`;
  }

  for (const tick of g.xTicks) {
    out += `<text class="sf-chart-scatter-tick" x="${px(tick.at)}" y="${px(inner.bottom + g.font * 1.2)}" text-anchor="${tick.anchor}" dominant-baseline="middle">${esc(tick.text)}</text>`;
  }

  if (g.yLabel) out += `<text class="sf-chart-scatter-axis-label" x="${px(inner.left)}" y="${px(g.font)}" text-anchor="start">${esc(g.yLabel)}</text>`;
  if (g.xLabel) out += `<text class="sf-chart-scatter-axis-label" x="${px((inner.left + inner.right) / 2)}" y="${px(g.height - 4)}" text-anchor="middle">${esc(g.xLabel)}</text>`;
  return `${out}</g>`;
}

function marksMarkup(g, paint, shown) {
  let out = '<g class="sf-chart-scatter-marks" aria-hidden="true">';

  if (!g.canvas) {
    // One group per series in the legend's order, its marks in drawing order.
    const groups = new Map(shown.map(one => [one.key, '']));

    for (const index of g.drawn) {
      const mark = g.marks[index];
      groups.set(mark.series, groups.get(mark.series) + markMarkup(mark.cx, mark.cy, mark.r, cornersOf(mark.place, mark.r, g.bubbles), mark.hollow ? ' class="sf-chart-scatter-hollow"' : ''));
    }

    for (const one of shown) {
      out += `<g class="sf-chart-scatter-series ${colourOf(one.place, paint.get(one.key))}${g.bubbles ? ' sf-chart-scatter-series--bubbles' : ''}"${paintAttr(paint.get(one.key))} data-series="${esc(one.key)}">${groups.get(one.key)}</g>`;
    }
  }

  if (g.trends.length) {
    out += `<clipPath id="${esc(g.uid)}-clip"><rect x="${px(g.inner.left)}" y="${px(g.inner.top)}" width="${px(g.inner.right - g.inner.left)}" height="${px(g.inner.bottom - g.inner.top)}"/></clipPath>`;
    out += `<g clip-path="url(#${esc(g.uid)}-clip)">`;

    for (const line of g.trends) {
      out += `<line class="sf-chart-scatter-trend ${colourOf(line.place, paint.get(line.key))}"${paintAttr(paint.get(line.key))} x1="${px(line.x1)}" y1="${px(line.y1)}" x2="${px(line.x2)}" y2="${px(line.y2)}"/>`;
    }

    out += '</g>';
  }

  return `${out}</g>`;
} // The cursor: guide lines from the point to both axes and a ring around it.


function cursorMarkup(g, mark, paint) {
  if (!mark) return '';
  let out = '<g class="sf-chart-scatter-cursor" aria-hidden="true">';
  out += `<line class="sf-chart-scatter-crosshair" x1="${px(g.inner.left)}" x2="${px(mark.cx)}" y1="${px(mark.cy)}" y2="${px(mark.cy)}"/>`;
  out += `<line class="sf-chart-scatter-crosshair" x1="${px(mark.cx)}" x2="${px(mark.cx)}" y1="${px(mark.cy)}" y2="${px(g.inner.bottom)}"/>`;
  out += `<g class="${colourOf(mark.place, paint.get(mark.series))}"${paintAttr(paint.get(mark.series))}>`;
  out += markMarkup(mark.cx, mark.cy, mark.r, cornersOf(mark.place, mark.r, g.bubbles), ' class="sf-chart-scatter-focus"');
  out += `<circle class="sf-chart-scatter-ring" cx="${px(mark.cx)}" cy="${px(mark.cy)}" r="${px(mark.r * (g.bubbles ? 1 : 1.25) + 4)}"/>`;
  return `${out}</g></g>`;
} // The canvas marks (past 2,000): each series' colour is read from a hidden
// probe in its class, so a role, a palette and forced colours come out as
// the page has them.


function paintMarks(host, canvas, g) {
  const context = canvas.getContext('2d');
  if (!context) return;
  const ratio = globalThis.devicePixelRatio || 1;
  canvas.width = Math.round(g.width * ratio);
  canvas.height = Math.round(g.height * ratio);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, g.width, g.height);
  const colours = new Map();

  for (const probe of host.querySelectorAll('.sf-chart-scatter-paint')) colours.set(probe.dataset.series, getComputedStyle(probe).color);

  const ground = getComputedStyle(host.querySelector('.sf-chart-scatter-ground') ?? host).color;
  context.lineWidth = 1;

  for (const index of g.drawn) {
    const mark = g.marks[index];
    const colour = colours.get(mark.series) ?? 'CanvasText';
    const corners = cornersOf(mark.place, mark.r, g.bubbles);
    context.beginPath();

    if (corners) {
      corners.forEach(([x, y], at) => at ? context.lineTo(mark.cx + x, mark.cy + y) : context.moveTo(mark.cx + x, mark.cy + y));
      context.closePath();
    } else {
      context.arc(mark.cx, mark.cy, mark.r, 0, Math.PI * 2);
    }

    if (g.bubbles) {
      if (!mark.hollow) {
        context.globalAlpha = 0.45;
        context.fillStyle = colour;
        context.fill();
        context.globalAlpha = 1;
      }

      context.strokeStyle = colour;
      context.stroke();
    } else {
      context.fillStyle = colour;
      context.fill();
      context.strokeStyle = ground;
      context.stroke();
    }
  }
}

function renderTooltip(context, g, mark) {
  if (!mark || context.tooltip === 'none') return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const {
    component,
    model
  } = context;
  const flip = mark.cx > g.width / 2;
  const rows = [[component.axisName('x'), component.sayX(mark.x)], [component.axisName('y'), component.sayY(mark.y)]];
  if (model.bubbleField) rows.push([component.axisName('bubble'), component.saySize(mark.size)]);
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${`sf-chart-scatter-tooltip${flip ? ' sf-chart-scatter-tooltip--flip' : ''}`} aria-hidden="true"
         style=${`inset-inline-start: ${px(mark.cx)}px; inset-block-start: ${px(mark.cy)}px; --sf-chart-scatter--reach: ${px(mark.r)}`}>
      <div class=${`sf-chart-scatter-tooltip-name ${colourOf(mark.place, context.paint.get(mark.series))}`} style=${paintOf(context.paint.get(mark.series)) || lit__WEBPACK_IMPORTED_MODULE_0__.nothing}>
        <span class="sf-chart-scatter-swatch" .innerHTML=${swatchMarkup(mark.place, g.bubbles)}></span>
        <span>${component.pointName(model, mark)}</span>
      </div>
      ${rows.map(([name, value]) => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <div class="sf-chart-scatter-tooltip-row">
          <span>${name}</span>
          <span class="sf-chart-scatter-tooltip-value">${value}</span>
        </div>
      `)}
    </div>
  `;
}

const swatchMarkup = (place, bubbles) => `<svg viewBox="-6 -6 12 12" focusable="false">${markMarkup(0, 0, bubbles ? 5 : 4, cornersOf(place, 4, bubbles))}</svg>`;

function renderLegend(context, place) {
  if (context.legend !== place || context.state !== 'ready') return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const {
    component,
    model
  } = context;
  const hidden = new Set(component.hiddenSeries || []);
  const bubbles = Boolean(model.bubbleField);
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${`sf-chart-scatter-legend sf-chart-scatter-legend--${place}`} role="group" aria-label=${component.words('legend')}>
      ${model.series.map((one, index) => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <button type="button" class=${`sf-chart-scatter-legend-item ${colourOf(index, context.paint.get(one.key))}`}
                style=${paintOf(context.paint.get(one.key)) || lit__WEBPACK_IMPORTED_MODULE_0__.nothing} aria-pressed=${hidden.has(one.key) ? 'false' : 'true'}
                data-series=${one.key} @click=${() => component.toggleSeries(one.key)}>
          <span class="sf-chart-scatter-swatch" aria-hidden="true" .innerHTML=${swatchMarkup(index, bubbles)}></span>
          <span class="sf-chart-scatter-legend-name">${one.name}</span>
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
  const several = model.series.length > 1;
  const names = new Map(model.series.map(one => [one.key, one.name]));
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${shownTable ? 'sf-chart-scatter-table' : 'sf-chart-scatter-sr'}>
      <table>
        <caption>${label}</caption>
        <thead>
          <tr>
            <th scope="col">${component.words('point-column')}</th>
            ${several ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<th scope="col">${component.words('series-column')}</th>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
            <th scope="col">${component.axisName('x')}</th>
            <th scope="col">${component.axisName('y')}</th>
            ${model.bubbleField ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<th scope="col">${component.axisName('bubble')}</th>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
          </tr>
        </thead>
        <tbody>
          ${model.points.map(one => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
            <tr>
              <th scope="row">${one.name || String(one.row + 1)}</th>
              ${several ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<td>${names.get(one.series)}</td>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
              <td>${component.sayX(one.x)}</td>
              <td>${component.sayY(one.y)}</td>
              ${model.bubbleField ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<td>${component.saySize(one.size)}</td>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
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
    shown,
    paint
  } = context;

  if (state === 'loading') {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-scatter-loading" role="status" aria-busy="true"><span class="sf-chart-scatter-sr">${component.words('loading')}</span></div>`;
  }

  if (state === 'empty' || state === 'error') {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
      <sf-empty-state class="sf-chart-scatter-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
        heading=${component.words(state === 'error' ? 'error-title' : 'empty-title')} text=""
        @sf-empty-state-action=${event => {
      event.stopPropagation();
      component.sfEmit('refresh', {});
    }}></sf-empty-state>
    `;
  }

  if (!g) return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const described = [context.summaryText ? `${uid}-summary` : '', context.hasDescription ? `${uid}-description` : ''].filter(Boolean).join(' ');
  const drawn = { ...g,
    uid,
    grid: context.grid,
    xLabel: context.xLabel,
    yLabel: context.yLabel
  };
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    ${g.canvas ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
      <canvas class="sf-chart-scatter-canvas" aria-hidden="true"></canvas>
      <span class="sf-chart-scatter-ground" hidden></span>
      ${shown.map(one => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class=${`sf-chart-scatter-paint ${colourOf(one.place, paint.get(one.key))}`} style=${paintOf(paint.get(one.key)) || lit__WEBPACK_IMPORTED_MODULE_0__.nothing} data-series=${one.key} hidden></span>`)}
    ` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
    <svg class="sf-chart-scatter-svg" role="group" tabindex="0" focusable="true"
         aria-label=${context.label} aria-roledescription=${component.words('roledescription')}
         aria-describedby=${described || lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
         width=${g.width} height=${g.height} viewBox=${`0 0 ${g.width} ${g.height}`}
         @keydown=${event => component.onPlotKey(event)}
         @pointermove=${event => component.onPointerMove(event)}
         @pointerleave=${() => component.onPointerLeave()}
         @click=${event => component.onPlotClick(event)}
         @blur=${() => component.setCursor(null)}
         .innerHTML=${axesMarkup(drawn) + marksMarkup(drawn, paint, shown) + cursorMarkup(g, cursor, paint)}>
    </svg>
    ${renderTooltip(context, g, cursor)}
  `;
}

function renderScatterTemplate(context) {
  const {
    component,
    uid,
    state
  } = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <figure class=${['sf-chart-scatter', `sf-chart-scatter--size-${size}`, `sf-chart-scatter--${state}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-chart-scatter-head">
        <span class="sf-chart-scatter-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.table === 'toggle' && state === 'ready' ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<button type="button" class="sf-chart-scatter-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      </figcaption>
      ${renderLegend(context, 'top')}
      <div class="sf-chart-scatter-plot" ?hidden=${tableView}>${renderPlot(context)}</div>
      ${renderLegend(context, 'bottom')}
      ${context.summaryText ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<p class="sf-chart-scatter-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      ${context.hasDescription ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-scatter-description" id=${`${uid}-description`}>${context.description}</div>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      <div class="sf-chart-scatter-sr" aria-live="polite">${context.said}</div>
      ${renderTable(context)}
    </figure>
  `;
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "369e423f179d"
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

/***/ "ef19798d5700"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"id":"smart.chart-scatter","tag":"sf-chart-scatter","version":"0.1.0","kind":"leaf","settings":{"label":{"type":"string","default":""},"items":{"type":"list","default":[],"of":"object"},"names":{"type":"object","default":{}},"colors":{"type":"object","default":{}},"palette":{"type":"enum","values":["theme","vivid","soft","warm","cool","brand"],"default":"theme"},"x":{"type":"string","default":""},"y":{"type":"string","default":""},"bubble":{"type":"string","default":""},"series":{"type":"string","default":""},"point":{"type":"string","default":""},"x-min":{"type":"number","optional":true},"x-max":{"type":"number","optional":true},"y-min":{"type":"number","optional":true},"y-max":{"type":"number","optional":true},"x-zero":{"type":"boolean","default":false},"y-zero":{"type":"boolean","default":false},"trend":{"type":"enum","values":["none","linear"],"default":"none"},"legend":{"type":"enum","values":["auto","top","bottom","none"],"default":"auto"},"tooltip":{"type":"enum","values":["point","none"],"default":"point"},"grid":{"type":"enum","values":["y","x","both","none"],"default":"both"},"x-label":{"type":"string","default":""},"y-label":{"type":"string","default":""},"bubble-label":{"type":"string","default":""},"x-format":{"type":"string","default":"number"},"y-format":{"type":"string","default":"number"},"bubble-format":{"type":"string","default":"number"},"size":{"type":"enum","values":["1/2","1","2"],"default":"1"},"table":{"type":"enum","values":["toggle","visible","hidden"],"default":"toggle"},"summary":{"type":"enum","values":["auto","none"],"default":"auto"},"data-state":{"type":"enum","values":["auto","loading","ready","empty","error"],"default":"auto"}},"values":{"hidden-series":{"type":"list","default":[],"of":"string"}},"events":{"toggle":{"carries":{"id":"string","hidden":"boolean"}},"select":{"carries":{"series":"string","index":"number","point":"string","x":"number","y":"number"}},"refresh":{"carries":{}}},"actions":{"reset":{"with":{}}},"presentation":{"skeleton":{"late":["items"]}},"css-variables":{"--sf-chart-scatter-height":{"type":"length","state":"default"},"--sf-chart-scatter-grid-color":{"type":"color","state":"default"},"--sf-chart-scatter-baseline-color":{"type":"color","state":"default"},"--sf-chart-scatter-label-color":{"type":"color","state":"default"},"--sf-chart-scatter-hover-background-color":{"type":"color","state":"hover"},"--sf-chart-scatter-hidden-color":{"type":"color","state":"disabled"}}}');

/***/ },

/***/ "c3661f0b5cf0"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Scatter chart","runtime":{"untitled":"Chart","roledescription":"scatter chart","summary-range":"Points: {count}. {xName}: from {xMin} to {xMax}; {yName}: from {yMin} to {yMax}.","summary-bubble":"Size is {name}: from {min} to {max}.","summary-one":"Relation: {relation}.","summary-series":"{name}, relation: {relation}.","summary-top":"{yName}: highest {high} ({highY}), lowest {low} ({lowY}).","summary-missing":"Rows without coordinates: {count}.","summary-empty":"No data.","relation":"{strength}, {direction} (r = {r})","relation-none":"none (r = {r})","strength-weak":"weak","strength-moderate":"moderate","strength-strong":"strong","direction-up":"positive","direction-down":"negative","cursor":"{name}: {xName} {x}, {yName} {y}{bubble}","cursor-bubble":", {name} {value}","point-n":"Point {n}","point-in":"{name}, {series}","point-column":"Point","series-column":"Series","gap":"no data","show-table":"Table","legend":"Series","loading":"Loading the chart\'s data","empty-title":"No data for the chart","error-title":"Could not load the data"},"events":{"toggle":{"label":"Hide or show a series"},"select":{"label":"Choose a point"},"refresh":{"label":"Load the data again"}},"actions":{"reset":{"label":"Show every series"}}}');

/***/ },

/***/ "dbfd8cc3128f"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Точечная диаграмма","runtime":{"untitled":"График","roledescription":"точечная диаграмма","summary-range":"Точек: {count}. {xName}: от {xMin} до {xMax}; {yName}: от {yMin} до {yMax}.","summary-bubble":"Размер — {name}: от {min} до {max}.","summary-one":"Связь: {relation}.","summary-series":"{name} — связь: {relation}.","summary-top":"{yName}: больше всего — {high} ({highY}), меньше всего — {low} ({lowY}).","summary-missing":"Строк без координат: {count}.","summary-empty":"Нет данных.","relation":"{strength}, {direction} (r = {r})","relation-none":"нет (r = {r})","strength-weak":"слабая","strength-moderate":"умеренная","strength-strong":"сильная","direction-up":"прямая","direction-down":"обратная","cursor":"{name}: {xName} {x}, {yName} {y}{bubble}","cursor-bubble":", {name} {value}","point-n":"Точка {n}","point-in":"{name}, {series}","point-column":"Точка","series-column":"Ряд","gap":"нет данных","show-table":"Таблица","legend":"Ряды","loading":"Загрузка данных графика","empty-title":"Нет данных для графика","error-title":"Не удалось загрузить данные"},"events":{"toggle":{"label":"Скрыть или показать ряд"},"select":{"label":"Выбрать точку"},"refresh":{"label":"Загрузить данные заново"}},"actions":{"reset":{"label":"Показать все ряды"}}}');

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
/******/ 	let __webpack_exports__ = __webpack_require__("b3aaa937901d");
/******/
/******/ })()
;