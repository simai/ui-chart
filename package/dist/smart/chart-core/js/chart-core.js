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

/***/ "c33376233d94"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _arc_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("bdf61eb31e5c");
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("fc9bb1435f01");
/* harmony import */ var _cursor_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("132d5cf6d077");
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("37677343b39a");
/* harmony import */ var _decimate_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("13016023b0f5");
/* harmony import */ var _describe_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("40ff9ca61ced");
/* harmony import */ var _format_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("6668151838ce");
/* harmony import */ var _heat_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("66a3b5260618");
/* harmony import */ var _palettes_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("b3159bcb2ffd");
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("5fc4022962c0");
/* harmony import */ var _scale_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("e8bb19218bf5");
/* harmony import */ var _settle_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("21ed19c5c40f");
/* harmony import */ var _stack_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("3514cfe878c1");
/* harmony import */ var _timeline_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("18122a307874");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_format_js__WEBPACK_IMPORTED_MODULE_6__]);
var __webpack_async_dependencies_result__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
_format_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_async_dependencies_result__[0];
// Package chart: its shared core, smart/chart-core, built once.
// Registers its modules with the page's runtime; the package's components
// ask for them as SF.runtimeModule("chart/<module>", 1).
// Generated by ui-builder (libs/packageCore.js); not edited.














const modules = {
  "arc": _arc_js__WEBPACK_IMPORTED_MODULE_0__,
  "colors": _colors_js__WEBPACK_IMPORTED_MODULE_1__,
  "cursor": _cursor_js__WEBPACK_IMPORTED_MODULE_2__,
  "data": _data_js__WEBPACK_IMPORTED_MODULE_3__,
  "decimate": _decimate_js__WEBPACK_IMPORTED_MODULE_4__,
  "describe": _describe_js__WEBPACK_IMPORTED_MODULE_5__,
  "format": _format_js__WEBPACK_IMPORTED_MODULE_6__,
  "heat": _heat_js__WEBPACK_IMPORTED_MODULE_7__,
  "palettes": _palettes_js__WEBPACK_IMPORTED_MODULE_8__,
  "path": _path_js__WEBPACK_IMPORTED_MODULE_9__,
  "scale": _scale_js__WEBPACK_IMPORTED_MODULE_10__,
  "settle": _settle_js__WEBPACK_IMPORTED_MODULE_11__,
  "stack": _stack_js__WEBPACK_IMPORTED_MODULE_12__,
  "timeline": _timeline_js__WEBPACK_IMPORTED_MODULE_13__
};

function register() {
  const lookup = globalThis.SF && globalThis.SF.runtimeModule;

  if (!lookup || typeof lookup.register !== "function") {
    globalThis.console.error(new Error("SF runtime: package chart shares its core through package modules, which this page's SIMAI Framework does not have (core.runtime 1.38.0 or later)."));
    return;
  }

  lookup.register("chart", 1, modules);
}

if (globalThis.SF && globalThis.SF.runtimeModule) register();else globalThis.addEventListener("sf-runtime-ready", register, {
  once: true
});
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

/***/ "18122a307874"
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cutText: () => (/* binding */ cutText),
/* harmony export */   durationOf: () => (/* binding */ durationOf),
/* harmony export */   nearestRange: () => (/* binding */ nearestRange),
/* harmony export */   statusTimes: () => (/* binding */ statusTimes),
/* harmony export */   timelineLayout: () => (/* binding */ timelineLayout),
/* harmony export */   timelineRows: () => (/* binding */ timelineRows)
/* harmony export */ });
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("37677343b39a");
/* harmony import */ var _scale_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("e8bb19218bf5");
// The ranges of a timeline (docs/research/catalogue.md, Gantt / timeline):
// tasks or states as start and end times per row, the ranges data shape of
// docs/research/parameters.md §2.1 (row, start, end, status). A row is a
// lane across the plot; it may hold one range (a task of a plan) or many
// (the states of a service through a day). A range whose start and end are
// the same moment is a milestone.
//
// The rows, the layout and the time scale live here and not in the element,
// so another component can compose them: an editable Gantt chart of the view
// set draws its rows with them and adds its own editing and dependencies
// (the dispatcher's boundary with the name's reservation, docs/DECISIONS.md
// D13).



const text = value => value === undefined || value === null ? '' : String(value);
/**
 * The ranges of rows: {rowField, startField, endField, statusField, lanes,
 * statuses, ranges, from, to, missing, dropped}.
 *
 * A lane is {key, place, ranges}, in the order the rows first name it. A
 * range is {row, lane, place, start, end, status, tone}: `place` is its
 * lane's, `tone` its status's place among the statuses (0 without a status
 * field). `ranges` go lane after lane, by start in each, the keyboard's
 * order, and each has its `index` in it. A row without a start or an end is
 * left out as missing, one that ends before it starts as dropped.
 */


function timelineRows(items, {
  row = '',
  start = '',
  end = '',
  status = ''
} = {}) {
  const rows = (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.readRows)(items);
  const fields = rows.length ? Object.keys(rows[0]) : [];
  const startField = start || 'start';
  const endField = end || 'end';
  const rowField = row || fields.find(name => name !== startField && name !== endField && name !== status) || '';
  const lanes = new Map();
  const statuses = new Map();
  let missing = 0;
  let dropped = 0;
  rows.forEach((one, index) => {
    const from = (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.readTime)(one[startField]);
    const to = (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.readTime)(one[endField]);

    if (from === null || to === null) {
      missing += 1;
      return;
    }

    if (to < from) {
      dropped += 1;
      return;
    }

    const key = text(one[rowField]);
    if (!lanes.has(key)) lanes.set(key, {
      key,
      place: lanes.size,
      ranges: []
    });
    const said = status ? text(one[status]) : '';
    if (status && !statuses.has(said)) statuses.set(said, statuses.size);
    const lane = lanes.get(key);
    lane.ranges.push({
      row: index,
      lane: key,
      place: lane.place,
      start: from,
      end: to,
      status: said,
      tone: status ? statuses.get(said) : 0
    });
  });
  const ranges = [];

  for (const lane of lanes.values()) {
    lane.ranges.sort((a, b) => a.start - b.start || a.end - b.end || a.row - b.row);

    for (const one of lane.ranges) {
      one.index = ranges.length;
      ranges.push(one);
    }
  }

  const from = ranges.length ? Math.min(...ranges.map(one => one.start)) : null;
  const to = ranges.length ? Math.max(...ranges.map(one => one.end)) : null;
  return {
    rowField,
    startField,
    endField,
    statusField: status,
    lanes: [...lanes.values()],
    statuses: [...statuses.keys()],
    ranges,
    from,
    to,
    missing,
    dropped
  };
}
/**
 * The time each status takes, summed over its ranges, largest first:
 * [{status, time}]. Milestones take none.
 */

function statusTimes(ranges) {
  const times = new Map();

  for (const one of ranges) times.set(one.status, (times.get(one.status) ?? 0) + (one.end - one.start));

  return [...times].map(([status, time]) => ({
    status,
    time
  })).sort((a, b) => b.time - a.time);
}
/**
 * The range of `lane` nearest in time to the moment `at`: the one that holds
 * it, else the one whose nearer end is closest. Null for an empty lane.
 */

function nearestRange(lane, at) {
  let best = null;
  let distance = Infinity;

  for (const one of lane?.ranges ?? []) {
    const away = at < one.start ? one.start - at : at > one.end ? at - one.end : 0;

    if (away < distance) {
      best = one;
      distance = away;
    }
  }

  return best;
}
const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
/**
 * A length of time in the unit a person reads it in: {amount, unit}, the
 * unit an Intl unit (day, hour or minute). Two days and more are days, two
 * hours and more hours, else minutes; days and hours keep a tenth below ten.
 */

function durationOf(ms) {
  const length = Math.max(0, ms);

  const round = value => value < 10 ? Math.round(value * 10) / 10 : Math.round(value);

  if (length >= 2 * DAY) return {
    amount: round(length / DAY),
    unit: 'day'
  };
  if (length >= 2 * HOUR) return {
    amount: round(length / HOUR),
    unit: 'hour'
  };
  return {
    amount: Math.round(length / MINUTE),
    unit: 'minute'
  };
} // A letter's width against the font: Cyrillic is near 0.7 of it.

const LETTER = 0.72; // A digit's width against the font, for the axis.

const CHAR = 0.6;
const GAP = 8; // A text cut to so many characters, with an ellipsis, which is wider than a
// letter and so takes two places; '' below three letters and the ellipsis.

const cutText = (value, chars) => {
  if (value.length <= chars) return value;
  return chars < 5 ? '' : `${value.slice(0, chars - 2)}…`;
};
/**
 * Where a timeline's marks go in a box of {width, height}: {width, height,
 * font, inner, lanes, ranges, xTicks, gridTicks, x}.
 *
 * - The rows share the height in bands, a bar `thickest` px at most; a
 *   row's name (from `names`, cut with an ellipsis) stands at the start in
 *   at most three tenths of the width when the row is tall enough for a
 *   line, and is '' when not.
 * - The time runs from the first start to the last end (a day round one
 *   moment), with half a bar kept at each end so a milestone there is
 *   whole; `xTicks` are calendar ticks said by `tickText(time, unit)` that
 *   do not crowd, `gridTicks` every tick's place, `x` the scale.
 * - A range is the model's with {milestone, x, y, w, h, cx, cy}: a bar from
 *   its start to its end a pixel short so neighbours that touch stay apart,
 *   never thinner than one; a milestone a square box for its diamond.
 */

function timelineLayout(model, {
  width,
  height
}, {
  font = 12,
  thickest = 20,
  names = [],
  tickText = String
} = {}) {
  const letter = font * LETTER;
  const top = GAP / 2;
  const bottom = Math.max(top + 1, height - font * 1.5 - GAP);
  const band = (0,_scale_js__WEBPACK_IMPORTED_MODULE_1__.bandScale)(model.lanes.length, [top, bottom], {
    padding: 0.3
  });
  const named = band.step >= font * 1.15;
  const widest = Math.min(width * 0.3, Math.max(0, ...names.map(name => name.length)) * letter);
  const left = named ? Math.ceil(widest) + GAP * 1.5 : GAP / 2;
  const room = Math.floor((left - GAP * 1.5) / letter);
  const thick = Math.max(2, Math.min(thickest, band.width));
  const edge = Math.ceil(thick / 2) + 1;
  const inner = {
    top,
    bottom,
    left: left + edge,
    right: Math.max(left + edge + 1, width - Math.max(GAP, edge))
  };
  let from = model.from ?? 0;
  let to = model.to ?? 0;

  if (from === to) {
    from -= DAY / 2;
    to += DAY / 2;
  }

  const x = (0,_scale_js__WEBPACK_IMPORTED_MODULE_1__.linearScale)([from, to], [inner.left, inner.right]);
  const calendar = (0,_scale_js__WEBPACK_IMPORTED_MODULE_1__.timeTicks)(from, to, (0,_scale_js__WEBPACK_IMPORTED_MODULE_1__.tickCount)(inner.right - inner.left, font * CHAR * 12));
  const xTicks = [];
  let last = -Infinity;

  for (const time of calendar.ticks) {
    const said = tickText(time, calendar.unit);
    const at = x(time);
    const half = said.length * font * CHAR * 1.2 / 2;
    if (at - half < last + GAP || at - half < 0 || at + half > width) continue;
    xTicks.push({
      at,
      text: said
    });
    last = at + half;
  }

  const lanes = model.lanes.map((one, index) => ({
    key: one.key,
    place: one.place,
    y: band.at(index) - (band.step - band.width) / 2,
    h: band.step,
    cy: band.at(index) + band.width / 2,
    text: named ? cutText(names[index] ?? '', room) : ''
  }));
  const ranges = model.ranges.map(one => {
    const x0 = x(one.start);
    const x1 = x(one.end);
    const {
      cy
    } = lanes[one.place];
    const milestone = one.start === one.end;
    const w = milestone ? thick : Math.max(1, x1 - x0 > 3 ? x1 - x0 - 1 : x1 - x0);
    const start = milestone ? x0 - thick / 2 : x0;
    return { ...one,
      milestone,
      x: start,
      y: cy - thick / 2,
      w,
      h: thick,
      cx: start + w / 2,
      cy
    };
  });
  return {
    width,
    height,
    font,
    inner,
    lanes,
    ranges,
    xTicks,
    gridTicks: calendar.ticks.map(time => x(time)),
    x
  };
}

/***/ },

/***/ "43090d1c8307"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("page-language", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("page-language", 1).then(resolve, reject), { once: true })));

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
/******/ 	let __webpack_exports__ = __webpack_require__("c33376233d94");
/******/
/******/ })()
;