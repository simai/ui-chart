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

/***/ "bdf61eb31e5c"
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   arcMiddle: () => (/* binding */ arcMiddle),
/* harmony export */   arcPath: () => (/* binding */ arcPath),
/* harmony export */   pieSlices: () => (/* binding */ pieSlices)
/* harmony export */ });
// Arcs (docs/research/parameters.md §14, the pie): parts of a whole as
// slices of a circle, clockwise from twelve o'clock, with an optional hole.
// Only positive parts make a slice; a zero, a negative or a gap is said in
// the table and drawn as nothing.
const TURN = Math.PI * 2;
/**
 * Slices of `values`: [{index, value, share, start, end}] in radians from
 * twelve o'clock, clockwise. `pad` is the gap between slices in radians.
 */

function pieSlices(values, {
  pad = 0
} = {}) {
  const parts = values.map((value, index) => ({
    index,
    value
  })).filter(({
    value
  }) => value !== null && value > 0);
  const total = parts.reduce((sum, {
    value
  }) => sum + value, 0);
  if (!total) return [];
  const gap = parts.length > 1 ? pad : 0;
  let angle = 0;
  return parts.map(({
    index,
    value
  }) => {
    const share = value / total;
    const start = angle;
    angle += share * TURN;
    return {
      index,
      value,
      share,
      start: start + gap / 2,
      end: Math.max(start + gap / 2, angle - gap / 2)
    };
  });
}

const round = value => Math.round(value * 100) / 100;

const point = (cx, cy, r, angle) => [round(cx + r * Math.sin(angle)), round(cy - r * Math.cos(angle))];
/** The SVG path of one slice between `inner` and `outer` radii. */


function arcPath({
  start,
  end
}, {
  cx,
  cy,
  outer,
  inner = 0
}) {
  // A whole circle is two half arcs: one arc with the same ends draws nothing.
  if (end - start >= TURN - 1e-6) {
    const [tx, ty] = point(cx, cy, outer, 0);
    const [bx, by] = point(cx, cy, outer, Math.PI);
    let d = `M${tx},${ty}A${outer},${outer} 0 1 1 ${bx},${by}A${outer},${outer} 0 1 1 ${tx},${ty}Z`;

    if (inner > 0) {
      const [ix, iy] = point(cx, cy, inner, 0);
      const [jx, jy] = point(cx, cy, inner, Math.PI);
      d += `M${ix},${iy}A${inner},${inner} 0 1 0 ${jx},${jy}A${inner},${inner} 0 1 0 ${ix},${iy}Z`;
    }

    return d;
  }

  const large = end - start > Math.PI ? 1 : 0;
  const [ax, ay] = point(cx, cy, outer, start);
  const [bx, by] = point(cx, cy, outer, end);
  if (inner <= 0) return `M${round(cx)},${round(cy)}L${ax},${ay}A${outer},${outer} 0 ${large} 1 ${bx},${by}Z`;
  const [cx2, cy2] = point(cx, cy, inner, end);
  const [dx, dy] = point(cx, cy, inner, start);
  return `M${ax},${ay}A${outer},${outer} 0 ${large} 1 ${bx},${by}L${cx2},${cy2}A${inner},${inner} 0 ${large} 0 ${dx},${dy}Z`;
}
/** The point in the middle of a slice at radius `r`, for its label. */

function arcMiddle({
  start,
  end
}, {
  cx,
  cy
}, r) {
  return point(cx, cy, r, (start + end) / 2);
}

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

/***/ "7a7fd493271c"
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   arcAt: () => (/* binding */ arcAt),
/* harmony export */   sunburstLayout: () => (/* binding */ sunburstLayout),
/* harmony export */   sunburstRows: () => (/* binding */ sunburstRows)
/* harmony export */ });
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("37677343b39a");
// The tree of a sunburst (docs/research/catalogue.md, Sunburst): a
// hierarchy as rings round a centre, a ring per level, each arc its share
// of its parent's. The rows give the hierarchy shape of
// docs/research/parameters.md §2.1: an id and a parent per row, or a path
// (a field holding the list of names from the top down). Own
// implementation: the tree, the values summed up it, the arcs.

const TURN = Math.PI * 2;

const text = value => value === undefined || value === null ? '' : String(value);
/**
 * The tree of rows: {mode, idField, parentField, pathField, valueField,
 * nameField, roots, nodes, depth, total, missing, dropped, looped}.
 *
 * With `path` set (or a `path` field holding a list) a row is a leaf at the
 * end of its path, and the names before it are made as they come; the same
 * path twice sums. Otherwise a row is a node with its `id` (by default `id`)
 * and its `parent`; a parent that is not among the ids makes the node a top
 * one, an id named twice keeps the first row (dropped), and a chain of
 * parents that comes back to itself is left out (looped).
 *
 * A node is {key, id, name, path, depth, own, value, parent, children,
 * place, row}: `own` is its row's value, `value` the own value with its
 * children's (what is left of a parent beyond its children is its own).
 * Children go largest first; `nodes` is every node, the top ones first,
 * then depth by depth. A node with no value of its own and no children is
 * left out (missing): an arc cannot show it.
 */


function sunburstRows(items, {
  id = '',
  parent = '',
  path = '',
  value = '',
  name = ''
} = {}) {
  const rows = (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.readRows)(items); // Every field any row has: a top node's row may hold no value.

  const fields = [...new Set(rows.flatMap(row => Object.keys(row)))];
  const listField = path || !parent && !id && fields.find(field => rows.some(row => Array.isArray(row[field]))) || '';
  const mode = listField ? 'path' : 'tree';
  const idField = mode === 'tree' ? id || 'id' : '';
  const parentField = mode === 'tree' ? parent || 'parent' : '';
  const taken = new Set([listField, idField, parentField, name]);
  const valueField = value || fields.find(field => !taken.has(field) && rows.some(row => (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.readNumber)(row[field]) !== null)) || 'value';
  let missing = 0;
  let dropped = 0;
  let looped = 0;
  const made = [];

  const make = (key, label, row) => {
    const one = {
      key,
      id: key,
      name: label,
      path: [],
      depth: 0,
      own: 0,
      value: 0,
      parent: null,
      children: [],
      place: 0,
      row
    };
    made.push(one);
    return one;
  };

  if (mode === 'path') {
    const byKey = new Map();
    rows.forEach((row, index) => {
      const names = (Array.isArray(row[listField]) ? row[listField] : [row[listField]]).map(text).filter(Boolean);
      const amount = (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.readNumber)(row[valueField]);

      if (!names.length || amount === null || amount <= 0) {
        missing += 1;
        return;
      }

      let up = null;
      names.forEach((label, at) => {
        const key = names.slice(0, at + 1).join('\u0000');

        if (!byKey.has(key)) {
          const one = make(key, label, index);
          one.parent = up;
          if (up) up.children.push(one);
          byKey.set(key, one);
        }

        up = byKey.get(key);
      });
      up.own += amount;
    });
  } else {
    const byId = new Map();
    rows.forEach((row, index) => {
      const key = text(row[idField]);

      if (!key) {
        missing += 1;
        return;
      }

      if (byId.has(key)) {
        dropped += 1;
        return;
      }

      const amount = (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.readNumber)(row[valueField]);
      const one = make(key, text(row[name]) || key, index);
      one.own = amount !== null && amount > 0 ? amount : 0;
      one.up = text(row[parentField]);
      byId.set(key, one);
    }); // A node whose chain of parents never reaches a top one (it comes back
    // to itself, or hangs from such a loop) has no ring to stand in and is
    // left out; a parent not among the ids makes a top node.

    const free = new Map();

    const reaches = one => {
      const seen = [];
      let at = one;

      while (at && !free.has(at)) {
        if (seen.includes(at)) break;
        seen.push(at);
        at = at.up && at.up !== at.key ? byId.get(at.up) ?? null : at.up === at.key ? at : null;
      }

      const ok = at === null || free.has(at) && free.get(at);

      for (const one of seen) free.set(one, ok);

      return ok;
    };

    for (const one of made) {
      if (!reaches(one)) {
        looped += 1;
        one.lost = true;
        continue;
      }

      const up = one.up ? byId.get(one.up) : null;

      if (up) {
        one.parent = up;
        up.children.push(one);
      }
    }
  } // Values up the tree, the paths and the depths down it; a node with
  // nothing to show goes, and its parent may follow.


  const sum = one => {
    one.children = one.children.filter(child => sum(child) > 0);
    one.value = one.own + one.children.reduce((all, child) => all + child.value, 0);
    return one.value;
  };

  let roots = made.filter(one => !one.parent && !one.lost);
  const before = made.filter(one => !one.lost).length;
  roots = roots.filter(one => sum(one) > 0);

  const order = list => list.sort((a, b) => b.value - a.value || a.row - b.row);

  const nodes = [];
  let level = order(roots);
  let depth = 0;
  roots.forEach((one, place) => {
    one.place = place;
  });

  while (level.length) {
    const next = [];

    for (const one of level) {
      one.depth = depth;
      one.path = one.parent ? [...one.parent.path, one.name] : [one.name];
      if (one.parent) one.place = one.parent.place;
      nodes.push(one);
      next.push(...order(one.children));
    }

    level = next;
    depth += 1;
  }

  missing += before - nodes.length;

  for (const one of made) delete one.up;

  const total = roots.reduce((all, one) => all + one.value, 0);
  return {
    mode,
    idField,
    parentField,
    pathField: listField,
    valueField,
    nameField: name,
    roots,
    nodes,
    depth,
    total,
    missing,
    dropped,
    looped
  };
}
/**
 * Where a sunburst's arcs go round (cx, cy): {arcs, rings, hole, outer}.
 * The top nodes share the whole turn clockwise from twelve o'clock, a
 * child its parent's angle by its share; ring `d` runs from hole + d * ring
 * to hole + (d + 1) * ring. An arc is {node, index, start, end, inner,
 * outer}, in `model.nodes` order (ring after ring, clockwise in each).
 * An arc narrower than `least` radians is kept, but drawn as nothing.
 */

function sunburstLayout(model, {
  cx,
  cy,
  radius
}, {
  hole = 0.32
} = {}) {
  const rings = Math.max(1, model.depth);
  const inner = radius * hole;
  const ring = (radius - inner) / rings;
  const at = new Map();
  const arcs = [];

  const angleOf = one => at.get(one);

  const spread = (list, start, end, of) => {
    let angle = start;

    for (const one of list) {
      const span = of > 0 ? (end - start) * one.value / of : 0;
      at.set(one, {
        start: angle,
        end: angle + span
      });
      angle += span;
    }
  };

  spread(model.roots, 0, TURN, model.total);

  for (const one of model.nodes) {
    const {
      start,
      end
    } = angleOf(one);
    spread(one.children, start, start + (end - start) * (one.value - one.own) / (one.value || 1), one.value - one.own);
  }

  model.nodes.forEach((one, index) => {
    const {
      start,
      end
    } = angleOf(one);
    arcs.push({
      node: one,
      index,
      start,
      end,
      inner: inner + one.depth * ring,
      outer: inner + (one.depth + 1) * ring,
      cx,
      cy
    });
  });
  return {
    arcs,
    rings,
    ring,
    hole: inner,
    outer: radius,
    cx,
    cy
  };
}
/** The arc under the point (px, py), or null: by its radius and its angle. */

function arcAt(layout, px, py) {
  const dx = px - layout.cx;
  const dy = py - layout.cy;
  const r = Math.hypot(dx, dy);
  if (r < layout.hole || r > layout.outer) return null;
  let angle = Math.atan2(dx, -dy);
  if (angle < 0) angle += TURN;
  return layout.arcs.find(one => r >= one.inner && r <= one.outer && angle >= one.start && angle < one.end) ?? null;
}

/***/ },

/***/ "310ff87e8bde"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("deb1a4d61565");
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("5b7d7695b41b");
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("43090d1c8307");
/* harmony import */ var _chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("6668151838ce");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("21ed19c5c40f");
/* harmony import */ var _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("fc9bb1435f01");
/* harmony import */ var _chart_core_sunburst_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("7a7fd493271c");
/* harmony import */ var _js_templates_default__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("6ed8481280c8");
/* harmony import */ var _component_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("4d41204bf1a3");
/* harmony import */ var _lang_en_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("3d2db64c99d4");
/* harmony import */ var _lang_ru_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("5089627dacaf");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__, _js_templates_default__WEBPACK_IMPORTED_MODULE_7__]);
([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__, _js_templates_default__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__);
// sf-chart-sunburst: a sunburst, a hierarchy as rings round a centre, a
// ring per level and each arc its share of its parent's
// (docs/research/catalogue.md, Sunburst; docs/DECISIONS.md D15).
//
// The element reads its rows once into a tree (chart-core/sunburst), by an
// id and a parent per row or by a path of names, measures its plot, and
// draws in SVG an arc per node: the top nodes share the turn clockwise from
// twelve o'clock, a child its parent's angle. A top node takes a chart
// colour of its place (--sf-chart-1..8) and its branch keeps it, lighter
// ring after ring; a node's name is written along its arc where it fits,
// the total in the centre. A person reaches the plot with one Tab stop and
// walks the arcs: Left and Right round a ring, Down out to the largest
// child, Up back to the parent; each arc is said with its path and shares.
// The chart as a whole is a summary sentence, and every node is a row of
// the table.
//
// It renders into its own light DOM, like every Smart component.










 // The text of the plot, in px, by size rung, as on the line chart.

const FONT = {
  '1/2': 11,
  1: 12,
  2: 14
}; // A letter's width against the font: Cyrillic is near 0.7 of it.

const LETTER = 0.72;
const PAD = 4; // The hole in the centre, against the radius.

const HOLE = 0.3;

const round = value => Math.round(value * 10) / 10;

const ChartSunburstElement = (0,_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__.elementFromManifest)(_component_json__WEBPACK_IMPORTED_MODULE_8__, {
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

class SfSunburst extends ChartSunburstElement {
  static get props() {
    return { ...super.props,
      rootClass: {
        default: ''
      }
    };
  }

  onConnected() {
    this._uid = this.id || `sf-chart-sunburst-${instances += 1}`;
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
    const checked = (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_5__.coloursKey)(colours);

    if (checked !== this._coloursChecked && this.isConnected) {
      this._coloursChecked = checked;
      (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_5__.checkContrast)(this, colours, 'sf-chart-sunburst');
    }

    const plot = this.querySelector('.sf-chart-sunburst-plot');

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
  } // The page's own colours by top node (chart-core/colors), read again only
  // when the setting changes.


  colours() {
    if (this.colors !== this._coloursRaw || !this._colours) {
      this._coloursRaw = this.colors;
      this._colours = (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_5__.readColours)(this.colors, said => console.warn(`<sf-chart-sunburst> ${said}`));
    }

    return this._colours;
  }

  words(key, vars) {
    return this.sfWord(key, vars ? {
      vars
    } : undefined);
  } // The rows as a tree, read again only when the data or its mapping
  // changes.


  model() {
    const key = [this.items, this.node, this.parent, this.path, this.value, this.name];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;
    this._model = (0,_chart_core_sunburst_js__WEBPACK_IMPORTED_MODULE_6__.sunburstRows)(this.items, {
      id: this.node,
      parent: this.parent,
      path: this.path,
      value: this.value,
      name: this.name
    });
    return this._model;
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.nodes.length ? 'ready' : 'empty';
  }

  sayY(value) {
    return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatNumber)(value, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.yFormat, {
      gap: this.words('gap')
    });
  }

  sayShare(value, of) {
    return of > 0 ? (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatNumber)(value / of, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), 'percent') : '';
  }

  sayPath(node) {
    return node.path.join(' / ');
  } // Where everything goes: the arcs round the centre of the plot, and the
  // names written along the arcs that have room. Null until the plot has a
  // width.


  geometry(model) {
    const {
      width,
      height
    } = this._box;
    if (!width || !height) return null;
    const font = FONT[this.size] ?? 12;
    const radius = Math.max(0, Math.min(width, height) / 2 - 2);
    const layout = (0,_chart_core_sunburst_js__WEBPACK_IMPORTED_MODULE_6__.sunburstLayout)(model, {
      cx: width / 2,
      cy: height / 2,
      radius
    }, {
      hole: HOLE
    });
    const letter = font * LETTER;
    const labelled = this.labels !== 'none';
    const arcs = layout.arcs.map(one => {
      const middle = (one.start + one.end) / 2;
      const r = (one.inner + one.outer) / 2;
      const shown = { ...one,
        middle,
        r,
        x: layout.cx + r * Math.sin(middle),
        y: layout.cy - r * Math.cos(middle),
        nameText: ''
      };
      if (!labelled || one.outer - one.inner < font * 1.4) return shown; // A straight line along the arc's middle: its ends stay inside the
      // ring's outer edge and inside the arc's two sides. Or, when the arc
      // holds more that way, the line follows the arc's middle as a curve,
      // drawn the other way round below the middle so it never reads
      // upside down.

      const span = one.end - one.start;
      const across = 2 * Math.sqrt(Math.max(0, (one.outer - 2) ** 2 - (r + font / 2) ** 2));
      const along = span >= Math.PI ? Infinity : 2 * (r - font / 2) * Math.tan(span / 2);
      const straight = Math.min(across, along);
      const curved = Math.min(span, Math.PI * 2 * 0.98) * r;
      shown.curve = curved > straight * 1.15;
      const room = Math.floor(((shown.curve ? curved : straight) - PAD * 2) / letter);
      shown.nameText = cut(one.node.name, room);

      if (shown.curve && shown.nameText) {
        const pad = Math.max(0, (span - Math.PI * 2 * 0.98) / 2);
        const from = one.start + pad;
        const to = one.end - pad;
        const below = middle > Math.PI / 2 && middle < Math.PI * 3 / 2;
        const [a, b] = below ? [to, from] : [from, to];

        const at = angle => `${round(layout.cx + r * Math.sin(angle))} ${round(layout.cy - r * Math.cos(angle))}`;

        shown.curvePath = `M${at(a)}A${round(r)} ${round(r)} 0 ${to - from > Math.PI ? 1 : 0} ${below ? 0 : 1} ${at(b)}`;
      }

      return shown;
    });
    const total = this.sayY(model.total);
    const centre = layout.hole * 2 - PAD * 2 >= total.length * letter * 1.2 && layout.hole >= font * 1.6 ? total : '';
    return {
      width,
      height,
      font,
      cx: layout.cx,
      cy: layout.cy,
      hole: layout.hole,
      outer: layout.outer,
      ring: layout.ring,
      arcs,
      layout,
      centre
    };
  }

  summarize(model) {
    if (this.summary === 'none') return '';
    if (!model.nodes.length) return this.words('summary-empty');
    const locale = (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this);
    const parts = [this.words('summary-total', {
      levels: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatNumber)(model.depth, locale, 'integer'),
      count: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatNumber)(model.nodes.length, locale, 'integer'),
      total: this.sayY(model.total)
    })]; // The first level that branches: the top ones, or under a single top.

    let branches = model.roots;

    while (branches.length === 1 && branches[0].children.length) branches = branches[0].children;

    if (branches.length > 1) {
      const top = branches[0];
      parts.push(this.words('summary-branch', {
        name: top.name,
        value: this.sayY(top.value),
        share: this.sayShare(top.value, model.total)
      }));
    }

    const leaves = model.nodes.filter(one => !one.children.length);

    if (model.depth > 1) {
      const leaf = leaves.reduce((best, one) => one.value > best.value ? one : best);
      parts.push(this.words('summary-leaf', {
        name: this.sayPath(leaf),
        value: this.sayY(leaf.value),
        share: this.sayShare(leaf.value, model.total)
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
  } // An arc as one sentence: its path and value, its share of its parent
  // and of the whole, and how many parts it holds.


  arcLine(arc) {
    const model = this.model();
    const node = arc.node;
    const parts = [this.words('cursor', {
      name: this.sayPath(node),
      value: this.sayY(node.value)
    })];
    if (node.parent) parts.push(this.words('cursor-parent', {
      share: this.sayShare(node.value, node.parent.value),
      parent: node.parent.name,
      whole: this.sayShare(node.value, model.total)
    }));else parts.push(this.words('cursor-whole', {
      whole: this.sayShare(node.value, model.total)
    }));
    if (node.children.length) parts.push(this.words('cursor-children', {
      count: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatNumber)(node.children.length, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), 'integer')
    }));
    return parts.join('; ');
  }

  cursorArc(cursor = this._cursor) {
    const geometry = this._geometry;
    if (!cursor || !geometry) return null;
    return geometry.arcs[cursor.index] ?? null;
  }

  setCursor(cursor, {
    say = false
  } = {}) {
    this._cursor = cursor;
    const arc = this.cursorArc(cursor);
    if (say && arc) this._said = this.arcLine(arc);
    this.requestComponentUpdate('cursor');
  } // The keys walk the arcs: Left and Right round the ring (clockwise is
  // Right), Down out to the largest child, Up back to the parent, Home and
  // End to the first and the last arc of the ring.


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
      this.choose(this.cursorArc());
      return;
    }

    const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const now = this.cursorArc();
    const index = now ? this.neighbour(now, event.key) ?? now.index : event.key === 'End' ? this.ringOf(0).at(-1).index : 0;
    this.setCursor({
      index,
      series: 'arc'
    }, {
      say: true
    });
  }

  ringOf(depth) {
    return this._geometry.arcs.filter(one => one.node.depth === depth);
  }

  neighbour(now, key) {
    const {
      arcs
    } = this._geometry;
    const ring = this.ringOf(now.node.depth);
    const at = ring.indexOf(now);
    if (key === 'ArrowRight' || key === 'PageDown') return ring[(at + 1) % ring.length].index;
    if (key === 'ArrowLeft' || key === 'PageUp') return ring[(at - 1 + ring.length) % ring.length].index;
    if (key === 'Home') return ring[0].index;
    if (key === 'End') return ring[ring.length - 1].index;

    if (key === 'ArrowDown') {
      const child = now.node.children[0];
      return child ? arcs.find(one => one.node === child).index : null;
    }

    const up = now.node.parent;
    return up ? arcs.find(one => one.node === up).index : null;
  } // The pointer picks the arc it is over.


  placeAt(event) {
    const geometry = this._geometry;
    if (!geometry) return null;
    const box = event.currentTarget.getBoundingClientRect();
    const arc = (0,_chart_core_sunburst_js__WEBPACK_IMPORTED_MODULE_6__.arcAt)(geometry.layout, event.clientX - box.left, event.clientY - box.top);
    return arc ? {
      index: arc.index,
      series: 'arc'
    } : null;
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
    if (place) this.choose(this.cursorArc(place));
  }

  choose(arc) {
    if (!arc) return;
    const node = arc.node;
    const model = this.model();
    this.sfEmit('select', {
      index: arc.index,
      node: node.id,
      name: node.name,
      path: [...node.path],
      depth: node.depth,
      value: node.value,
      share: model.total > 0 ? node.value / model.total : 0
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
      cursor: this.cursorArc(),
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
    return (0,_js_templates_default__WEBPACK_IMPORTED_MODULE_7__.renderSunburstTemplate)(this.templateContext());
  }

}

SfSunburst.define('sf-chart-sunburst');
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "6ed8481280c8"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderSunburstTemplate: () => (/* binding */ renderSunburstTemplate)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2a080a730149");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("21ed19c5c40f");
/* harmony import */ var _chart_core_arc_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("bdf61eb31e5c");
/* harmony import */ var _default_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("c3e35c1ca1d0");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([lit__WEBPACK_IMPORTED_MODULE_0__]);
var __webpack_async_dependencies_result__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_async_dependencies_result__[0];
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lit__WEBPACK_IMPORTED_MODULE_0__);



 // The figure of a sunburst: the label and the table button, the plot
// (SVG), the summary and the description, the live line, and every node
// as a row of a table.
//
// The plot is one Tab stop, a role="group" named by the label and described
// by the summary; its marks are aria-hidden, because the summary, the live
// line and the table say what they show. A top node takes a chart colour by
// its place (--sf-chart-1..8), or a page's own (the colors setting, by the
// top node's name) set in a style as --tone, and its whole branch keeps
// it: the colour's light fill, lighter past the first ring, with the
// colour's line round each arc. The names are written in the page's ink,
// which reads on every fill. In forced colours every arc is the canvas
// with a line of the text colour.

const px = value => `${Math.round(value * 10) / 10}`;

const tone = place => `sf-chart-sunburst-c${place % 8 + 1}`;

const paintOf = (paint, key) => {
  const colour = paint.get(key);
  return colour ? `--sf-chart-sunburst--tone: ${colour}; --sf-chart-sunburst--wash: color-mix(in srgb, ${colour} 20%, transparent)` : '';
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

const esc = value => String(value).replace(/[&<>"']/gu, one => ESCAPES[one]);

const degrees = angle => {
  const turn = angle * 180 / Math.PI; // A name below the middle is turned round, so it never reads upside down.

  return angle > Math.PI / 2 && angle < Math.PI * 3 / 2 ? turn - 180 : turn;
}; // One group per branch, so a class and a page's colour are set once: the
// branch's arcs ring after ring, a name along an arc's middle where it
// fits; then the total in the centre.


function marksMarkup(g, paint, model, uid) {
  let out = '<g class="sf-chart-sunburst-marks" aria-hidden="true">';
  model.roots.forEach((top, place) => {
    const style = paintOf(paint, top.name);
    out += `<g class="sf-chart-sunburst-branch ${tone(place)}"${style ? ` style="${esc(style)}"` : ''} data-node="${esc(top.id)}">`;

    for (const arc of g.arcs) {
      if (arc.node.place !== place || arc.end - arc.start <= 0) continue;
      out += `<path class="sf-chart-sunburst-arc${arc.node.depth ? ' sf-chart-sunburst-arc--deep' : ''}" data-depth="${arc.node.depth}" d="${(0,_chart_core_arc_js__WEBPACK_IMPORTED_MODULE_2__.arcPath)(arc, {
        cx: g.cx,
        cy: g.cy,
        outer: arc.outer,
        inner: arc.inner
      })}"/>`;

      if (arc.nameText && arc.curvePath) {
        const id = `${uid}-arc-${arc.index}`;
        out += `<path id="${esc(id)}" class="sf-chart-sunburst-guide" d="${arc.curvePath}"/><text class="sf-chart-sunburst-name" dominant-baseline="middle"><textPath href="#${esc(id)}" startOffset="50%" text-anchor="middle">${esc(arc.nameText)}</textPath></text>`;
      } else if (arc.nameText) {
        out += `<text class="sf-chart-sunburst-name" x="${px(arc.x)}" y="${px(arc.y)}" text-anchor="middle" dominant-baseline="middle" transform="rotate(${px(degrees(arc.middle))} ${px(arc.x)} ${px(arc.y)})">${esc(arc.nameText)}</text>`;
      }
    }

    out += '</g>';
  });
  if (g.centre) out += `<text class="sf-chart-sunburst-total" x="${px(g.cx)}" y="${px(g.cy)}" text-anchor="middle" dominant-baseline="middle">${esc(g.centre)}</text>`;
  return `${out}</g>`;
} // The cursor: a ring round the arc.


function cursorMarkup(arc, g) {
  if (!arc || arc.end - arc.start <= 0) return '';
  return `<g class="sf-chart-sunburst-cursor" aria-hidden="true"><path class="sf-chart-sunburst-ring" d="${(0,_chart_core_arc_js__WEBPACK_IMPORTED_MODULE_2__.arcPath)(arc, {
    cx: g.cx,
    cy: g.cy,
    outer: arc.outer,
    inner: arc.inner
  })}"/></g>`;
}

function renderTooltip(context, g) {
  const {
    component,
    model,
    cursor
  } = context;
  if (context.tooltip === 'none' || !cursor) return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const node = cursor.node;
  const rows = [['value', component.sayY(node.value)]];
  if (node.parent) rows.push(['share-of-parent', component.sayShare(node.value, node.parent.value)]);
  rows.push(['share', component.sayShare(node.value, model.total)]);
  const flip = cursor.x > g.width / 2;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${`sf-chart-sunburst-tooltip${flip ? ' sf-chart-sunburst-tooltip--flip' : ''}`} aria-hidden="true"
         style=${`inset-inline-start: ${px(cursor.x)}px; inset-block-start: ${px(cursor.y)}px`}>
      <div class="sf-chart-sunburst-tooltip-name">${component.sayPath(node)}</div>
      ${rows.map(([key, value]) => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <div class="sf-chart-sunburst-tooltip-row">
          <span>${component.words(key)}</span>
          <span class="sf-chart-sunburst-tooltip-value">${value}</span>
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
} // A row per node, each branch under its parent (depth first), so the
// path column reads as an outline.


function outline(model) {
  const out = [];

  const walk = one => {
    out.push(one);
    one.children.forEach(walk);
  };

  model.roots.forEach(walk);
  return out;
}

function tableMarkup(context, shownTable) {
  const {
    component,
    tableModel: model,
    label
  } = context;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${shownTable ? 'sf-chart-sunburst-table' : 'sf-chart-sunburst-sr'}>
      <table>
        <caption>${label}</caption>
        <thead>
          <tr>
            <th scope="col">${component.words('path')}</th>
            <th scope="col">${component.words('value')}</th>
            <th scope="col">${component.words('share-of-parent')}</th>
            <th scope="col">${component.words('share')}</th>
          </tr>
        </thead>
        <tbody>
          ${outline(model).map(one => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
            <tr>
              <th scope="row">${component.sayPath(one)}</th>
              <td>${component.sayY(one.value)}</td>
              <td>${one.parent ? component.sayShare(one.value, one.parent.value) : '—'}</td>
              <td>${component.sayShare(one.value, model.total)}</td>
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
    paint,
    model
  } = context;

  if (state === 'loading') {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-sunburst-loading" role="status" aria-busy="true"><span class="sf-chart-sunburst-sr">${component.words('loading')}</span></div>`;
  }

  if (state === 'empty' || state === 'error') {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
      <sf-empty-state class="sf-chart-sunburst-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
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
    <svg class="sf-chart-sunburst-svg" role="group" tabindex="0" focusable="true"
         aria-label=${context.label} aria-roledescription=${component.words('roledescription')}
         aria-describedby=${described || lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
         width=${g.width} height=${g.height} viewBox=${`0 0 ${g.width} ${g.height}`}
         @keydown=${event => component.onPlotKey(event)}
         @pointermove=${event => component.onPointerMove(event)}
         @pointerleave=${() => component.onPointerLeave()}
         @click=${event => component.onPlotClick(event)}
         @blur=${() => component.setCursor(null)}
         .innerHTML=${marksMarkup(g, paint, model, uid) + cursorMarkup(cursor, g)}>
    </svg>
    ${renderTooltip(context, g)}
  `;
}

function renderSunburstTemplate(context) {
  const {
    component,
    uid,
    state
  } = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <figure class=${['sf-chart-sunburst', `sf-chart-sunburst--size-${size}`, `sf-chart-sunburst--${state}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-chart-sunburst-head-row">
        <span class="sf-chart-sunburst-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.table === 'toggle' && state === 'ready' ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<button type="button" class="sf-chart-sunburst-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      </figcaption>
      <div class="sf-chart-sunburst-plot" ?hidden=${tableView}>${renderPlot(context)}</div>
      ${context.summaryText ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<p class="sf-chart-sunburst-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      ${context.hasDescription ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-sunburst-description" id=${`${uid}-description`}>${context.description}</div>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      <div class="sf-chart-sunburst-sr" aria-live="polite">${context.said}</div>
      ${renderTable(context)}
    </figure>
  `;
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "c3e35c1ca1d0"
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

/***/ "4d41204bf1a3"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"id":"smart.chart-sunburst","tag":"sf-chart-sunburst","version":"0.1.0","kind":"leaf","settings":{"label":{"type":"string","default":""},"items":{"type":"list","default":[],"of":"object"},"colors":{"type":"object","default":{}},"node":{"type":"string","default":""},"parent":{"type":"string","default":""},"path":{"type":"string","default":""},"value":{"type":"string","default":""},"name":{"type":"string","default":""},"labels":{"type":"enum","values":["auto","none"],"default":"auto"},"tooltip":{"type":"enum","values":["auto","none"],"default":"auto"},"y-format":{"type":"string","default":"number"},"size":{"type":"enum","values":["1/2","1","2"],"default":"1"},"table":{"type":"enum","values":["toggle","visible","hidden"],"default":"toggle"},"summary":{"type":"enum","values":["auto","none"],"default":"auto"},"data-state":{"type":"enum","values":["auto","loading","ready","empty","error"],"default":"auto"}},"events":{"select":{"carries":{"index":"number","node":"string","name":"string","path":"list","depth":"number","value":"number","share":"number"}},"refresh":{"carries":{}}},"actions":{"reset":{"with":{}}},"presentation":{"skeleton":{"late":["items"]}},"css-variables":{"--sf-chart-sunburst-height":{"type":"length","state":"default"},"--sf-chart-sunburst-label-color":{"type":"color","state":"default"},"--sf-chart-sunburst-hover-background-color":{"type":"color","state":"hover"}}}');

/***/ },

/***/ "3d2db64c99d4"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Sunburst","runtime":{"untitled":"Chart","roledescription":"hierarchy ring chart","summary-total":"Levels: {levels}, parts: {count}; total {total}.","summary-branch":"The largest branch is «{name}»: {value} ({share}).","summary-leaf":"The largest end part is «{name}»: {value} ({share}).","summary-left":"Rows without a positive value: {count}.","summary-looped":"Rows closing a loop of parents, left out: {count}.","summary-empty":"No data.","cursor":"{name}: {value}","cursor-parent":"{share} of «{parent}», {whole} of the whole","cursor-whole":"{whole} of the whole","cursor-children":"parts inside: {count}","path":"Path","value":"Value","share-of-parent":"Share of the parent","share":"Share of the whole","gap":"no data","show-table":"Table","loading":"Loading the chart\'s data","empty-title":"No data for the chart","error-title":"Could not load the data"},"events":{"select":{"label":"Choose a part"},"refresh":{"label":"Load the data again"}},"actions":{"reset":{"label":"Take the cursor away"}}}');

/***/ },

/***/ "5089627dacaf"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Солнечные круги","runtime":{"untitled":"График","roledescription":"кольцевая диаграмма иерархии","summary-total":"Уровней: {levels}, частей: {count}; всего {total}.","summary-branch":"Крупнейшая ветвь — «{name}»: {value} ({share}).","summary-leaf":"Крупнейшая конечная часть — «{name}»: {value} ({share}).","summary-left":"Строк без положительного значения: {count}.","summary-looped":"Строк, замыкающих круг родителей, пропущено: {count}.","summary-empty":"Нет данных.","cursor":"{name}: {value}","cursor-parent":"{share} от «{parent}», {whole} всего","cursor-whole":"{whole} всего","cursor-children":"частей внутри: {count}","path":"Путь","value":"Значение","share-of-parent":"Доля от родителя","share":"Доля всего","gap":"нет данных","show-table":"Таблица","loading":"Загрузка данных графика","empty-title":"Нет данных для графика","error-title":"Не удалось загрузить данные"},"events":{"select":{"label":"Выбрать часть"},"refresh":{"label":"Загрузить данные заново"}},"actions":{"reset":{"label":"Убрать курсор"}}}');

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
/******/ 	let __webpack_exports__ = __webpack_require__("310ff87e8bde");
/******/
/******/ })()
;