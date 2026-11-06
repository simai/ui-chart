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

/***/ "900d22f482cc"
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bandOf: () => (/* binding */ bandOf),
/* harmony export */   gaugeAngle: () => (/* binding */ gaugeAngle),
/* harmony export */   gaugeBands: () => (/* binding */ gaugeBands),
/* harmony export */   gaugeShare: () => (/* binding */ gaugeShare)
/* harmony export */ });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fc9bb1435f01");
// A gauge's scale (docs/research/catalogue.md, Gauge): one measured value on
// a fixed scale from min to max, with bands (normal, warning, critical) and
// a target. The scale is a share 0..1 of its length; an arc turns the share
// into an angle over the upper half circle, clockwise from nine o'clock.

/** The share of the scale a value stands at, kept to 0..1. */

function gaugeShare(value, {
  min,
  max
}) {
  if (value === null || !Number.isFinite(value) || !(max > min)) return 0;
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
}
/** The angle of a share on the arc, in radians from twelve o'clock. */

const gaugeAngle = share => -Math.PI / 2 + share * Math.PI;
/**
 * The bands as given ({from?, to, role, label}), in order and inside the
 * scale: a band without from starts where the one before ends (min for the
 * first); a band that is empty inside the scale is dropped. A role that is
 * not a Framework role is neutral.
 */

function gaugeBands(raw, {
  min,
  max
}) {
  const list = Array.isArray(raw) ? raw : [];
  const out = [];
  let edge = min;

  for (const one of list) {
    if (!one || typeof one !== 'object') continue;
    const to = Number(one.to);
    if (!Number.isFinite(to)) continue;
    const from = Number.isFinite(Number(one.from)) && one.from !== null && one.from !== '' ? Number(one.from) : edge;
    edge = to;
    const lo = Math.max(min, Math.min(from, to));
    const hi = Math.min(max, Math.max(from, to));
    if (!(hi > lo)) continue;
    out.push({
      from: lo,
      to: hi,
      role: _colors_js__WEBPACK_IMPORTED_MODULE_0__.ROLES.includes(one.role) ? one.role : 'neutral',
      label: typeof one.label === 'string' ? one.label : '',
      index: out.length
    });
  }

  return out.sort((a, b) => a.from - b.from).map((band, index) => ({ ...band,
    index
  }));
}
/** The band a value falls in: from inclusive, to exclusive but for the last band; null outside every band. */

function bandOf(bands, value) {
  if (value === null || !Number.isFinite(value)) return null;
  const last = bands.at(-1);
  return bands.find(band => value >= band.from && (value < band.to || band === last && value === band.to)) ?? null;
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

/***/ "267a03b41e99"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("deb1a4d61565");
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("5b7d7695b41b");
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("43090d1c8307");
/* harmony import */ var _chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("6668151838ce");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("21ed19c5c40f");
/* harmony import */ var _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("fc9bb1435f01");
/* harmony import */ var _chart_core_gauge_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("900d22f482cc");
/* harmony import */ var _js_templates_default__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("1a63f69ef0a5");
/* harmony import */ var _component_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("b6c72114a0d4");
/* harmony import */ var _lang_en_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("8d12eb963e74");
/* harmony import */ var _lang_ru_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("1838f77a3f3f");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__, _js_templates_default__WEBPACK_IMPORTED_MODULE_7__]);
([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__, _js_templates_default__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__);
// sf-chart-gauge: one measured value on a fixed scale with bands (normal,
// warning, critical) and a target (docs/research/catalogue.md, Gauge).
//
// The element reads its scale once (chart-core/gauge): the value's share of
// the scale, the bands inside it and the band the value is in. It draws a
// half circle in a fixed SVG view box scaled by its width, or a bar of HTML
// whose positions are shares, so nothing is measured and the first paint is
// the drawn gauge. It is a meter for screen readers, with the band's name in
// its value text, described by a summary sentence; it takes no focus.
//
// It renders into its own light DOM, like every Smart component.











const ChartGaugeElement = (0,_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__.elementFromManifest)(_component_json__WEBPACK_IMPORTED_MODULE_8__, {
  base: (_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default()),
  lang: {
    en: _lang_en_json__WEBPACK_IMPORTED_MODULE_9__,
    ru: _lang_ru_json__WEBPACK_IMPORTED_MODULE_10__
  },
  source: 'ru'
});
let instances = 0;
const ZONES = new Set(['success', 'warning', 'error']);

class SfGauge extends ChartGaugeElement {
  static get props() {
    return { ...super.props,
      rootClass: {
        default: ''
      }
    };
  }

  onConnected() {
    this._uid = this.id || `sf-chart-gauge-${instances += 1}`;
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
      if (own) (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_5__.checkContrast)(this, new Map([['color', own]]), 'sf-chart-gauge');
    }

    return undefined;
  } // The page's own colour (the color setting: a Framework role or a CSS
  // colour, chart-core/colors), '' when unset or not a colour.


  colour() {
    if (this.color !== this._colourRaw) {
      this._colourRaw = this.color;
      this._colour = (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_5__.colourValue)(this.color);
      if (this.color && !this._colour) console.warn(`<sf-chart-gauge> color «${this.color}» is neither a Framework role nor a CSS colour`);
    }

    return this._colour || '';
  }

  words(key, vars) {
    return this.sfWord(key, vars ? {
      vars
    } : undefined);
  } // The scale, the bands and where the value and the target stand on it.


  model() {
    const key = [this.value, this.min, this.max, this.bands, this.target, this.targetLabel];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;
    const min = Number.isFinite(this.min) ? this.min : 0;
    const max = Number.isFinite(this.max) ? this.max : 100;
    const ok = max > min;
    if (!ok && this.isConnected) console.warn(`<sf-chart-gauge> max ${max} is not above min ${min}: the scale is empty`);
    const value = Number.isFinite(this.value) ? this.value : null;
    const target = Number.isFinite(this.target) ? this.target : null;
    const scale = {
      min,
      max
    };
    const bands = ok ? (0,_chart_core_gauge_js__WEBPACK_IMPORTED_MODULE_6__.gaugeBands)(this.bands, scale).map(band => ({ ...band,
      name: this.bandName(band)
    })) : [];
    this._model = {
      min,
      max,
      ok,
      value,
      share: ok ? (0,_chart_core_gauge_js__WEBPACK_IMPORTED_MODULE_6__.gaugeShare)(value, scale) : 0,
      past: value === null ? 0 : value > max ? 1 : value < min ? -1 : 0,
      bands,
      // A value past the scale is in the band at that end: past a critical
      // band's end is critical too.
      band: (0,_chart_core_gauge_js__WEBPACK_IMPORTED_MODULE_6__.bandOf)(bands, value === null ? null : Math.max(min, Math.min(max, value))),
      target: ok && target !== null ? {
        value: target,
        share: (0,_chart_core_gauge_js__WEBPACK_IMPORTED_MODULE_6__.gaugeShare)(target, scale),
        name: this.targetLabel || this.words('target')
      } : null
    };
    return this._model;
  }

  bandName(band) {
    if (band.label) return band.label;
    return ZONES.has(band.role) ? this.words(`zone-${band.role}`) : this.words('zone-other', {
      number: band.index + 1
    });
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.value !== null && model.ok ? 'ready' : 'empty';
  }

  sayY(value) {
    return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatNumber)(value, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.valueFormat, {
      gap: this.words('gap')
    });
  }

  sayShare(share) {
    return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatNumber)(share, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), 'percent');
  }

  sayRange(band) {
    return this.words('range', {
      from: this.sayY(band.from),
      to: this.sayY(band.to)
    });
  } // Where the value stands against the target: above by, below by, exactly.


  sayTarget(model) {
    const {
      target,
      value
    } = model;
    if (!target || value === null) return '';
    const by = value - target.value;
    const where = by === 0 ? this.words('at') : this.words(by > 0 ? 'above' : 'below', {
      by: this.sayY(Math.abs(by))
    });
    return where;
  }

  valueText(model) {
    const value = this.sayY(model.value);
    return model.band ? this.words('value-text', {
      value,
      band: model.band.name
    }) : value;
  }

  summarize(model) {
    if (this.summary === 'none') return '';
    const out = [];
    const value = this.sayY(model.value);
    if (model.past > 0) out.push(this.words('summary-over', {
      value,
      max: this.sayY(model.max)
    }));else if (model.past < 0) out.push(this.words('summary-under', {
      value,
      min: this.sayY(model.min)
    }));else out.push(this.words('summary-value', {
      value,
      min: this.sayY(model.min),
      max: this.sayY(model.max),
      share: this.sayShare(model.share)
    }));
    if (model.band) out.push(this.words('summary-band', {
      band: model.band.name,
      range: this.sayRange(model.band)
    }));
    if (model.target) out.push(this.words('summary-target', {
      name: model.target.name,
      target: this.sayY(model.target.value),
      where: this.sayTarget(model)
    }));
    return out.join(' ');
  } // The colour of the value: its band's role, else the page's colour, else
  // the sheet's (--sf-chart-gauge-color, then primary).


  fillOf(model) {
    if (model.band) return (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_5__.colourValue)(model.band.role);
    return this.colour();
  }

  toggleView() {
    this._view = this._view === 'table' ? 'chart' : 'table';
    this.requestComponentUpdate('view');
  }

  templateContext() {
    const model = this.model();
    const state = this.state(model);
    const tableModel = this.tableModel(model, state === 'ready');
    return this.createTemplateContext({ ...this.getPropsContext(),
      component: this,
      uid: this._uid,
      size: this.size,
      shape: this.shape === 'linear' ? 'linear' : 'arc',
      label: this.label || this.words('untitled'),
      state,
      model,
      fill: this.fillOf(model),
      tableKey: [tableModel, this.label, this.valueFormat, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.table, this.table === 'toggle' ? this._view : 'chart'],
      tableData: tableModel,
      view: this.table === 'toggle' ? this._view : 'chart',
      summaryText: state === 'ready' ? this.summarize(model) : '',
      hasDescription: this.hasSlotContent?.('description') ?? false,
      description: this.hasSlotContent?.('description') ? this.getSlotContent('description') : null,
      rootClass: this.getRootClass()
    });
  } // The data the table shows: settled, so a value streamed several times a
  // second does not rebuild the table on every render (chart-core/settle).


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
    return (0,_js_templates_default__WEBPACK_IMPORTED_MODULE_7__.renderGaugeTemplate)(this.templateContext());
  }

}

SfGauge.define('sf-chart-gauge');
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "1a63f69ef0a5"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderGaugeTemplate: () => (/* binding */ renderGaugeTemplate)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2a080a730149");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("21ed19c5c40f");
/* harmony import */ var _chart_core_arc_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("bdf61eb31e5c");
/* harmony import */ var _chart_core_gauge_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("900d22f482cc");
/* harmony import */ var _default_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("1e34599de468");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([lit__WEBPACK_IMPORTED_MODULE_0__]);
var __webpack_async_dependencies_result__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_async_dependencies_result__[0];
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lit__WEBPACK_IMPORTED_MODULE_0__);




 // The figure of a gauge: the label (with the table button on request), the
// meter, the target line, the summary and the description, and the same
// data as a table.
//
// The meter is a role="meter" named by the label, with its value text and
// the summary as its description; what it draws is presentational. The arc
// is SVG in a fixed view box that its width scales, the bar HTML with its
// positions as unitless shares in styles, so the first paint is the drawn
// gauge. A band's colour is a class by its role; the value's colour is its
// band's role, or the page's colour, set in a style as --fill.
// The arc's view box: a half circle around (100, 100); the track is the
// ring from 70 to 90, the bands a thin ring from 93 to 98 outside it, and
// the target a mark across both.

const VIEW = {
  width: 200,
  height: 101,
  cx: 100,
  cy: 100
};
const TRACK = {
  inner: 70,
  outer: 90
};
const RING = {
  inner: 93,
  outer: 98
};
const MARK = {
  inner: 64,
  outer: 100
};

const share = value => `${Math.round(value * 10000) / 10000}`;

const round = value => Math.round(value * 100) / 100; // A page's colour is checked to be a colour (chart-core/colors) and escaped
// all the same, since it is written into markup.


const ESCAPES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

const esc = value => String(value).replace(/[&<>"']/gu, one => ESCAPES[one]);

const sector = (from, to, ring) => (0,_chart_core_arc_js__WEBPACK_IMPORTED_MODULE_2__.arcPath)({
  start: (0,_chart_core_gauge_js__WEBPACK_IMPORTED_MODULE_3__.gaugeAngle)(from),
  end: (0,_chart_core_gauge_js__WEBPACK_IMPORTED_MODULE_3__.gaugeAngle)(to)
}, {
  cx: VIEW.cx,
  cy: VIEW.cy,
  ...ring
}); // The arc's inside is markup set as the element's innerHTML (a property, so
// lit writes no part markers inside it: a first-paint snapshot of the arc
// is the same on every run).


function arcMarkup(model, ready) {
  const {
    min,
    max
  } = model;
  const span = max - min;
  let out = `<svg class="sf-chart-gauge-art" viewBox="0 0 ${VIEW.width} ${VIEW.height}" aria-hidden="true" focusable="false">`;
  out += `<path class="sf-chart-gauge-track" d="${sector(0, 1, TRACK)}"></path>`;

  for (const band of model.bands) {
    out += `<path class="sf-chart-gauge-band sf-chart-gauge-band--${band.role}" d="${sector((band.from - min) / span, (band.to - min) / span, RING)}"></path>`;
  }

  if (ready && model.share > 0) out += `<path class="sf-chart-gauge-fill" d="${sector(0, model.share, TRACK)}"></path>`;

  if (model.target) {
    const angle = (0,_chart_core_gauge_js__WEBPACK_IMPORTED_MODULE_3__.gaugeAngle)(model.target.share);

    const at = r => `${round(VIEW.cx + r * Math.sin(angle))},${round(VIEW.cy - r * Math.cos(angle))}`;

    const [x1, y1] = at(MARK.inner).split(',');
    const [x2, y2] = at(MARK.outer).split(',');
    out += `<line class="sf-chart-gauge-mark" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"></line>`;
  }

  return `${out}</svg>`;
} // The linear form's band strip: the bands by their width on the scale, with
// the stretches no band covers left empty.


function bandsMarkup(model) {
  const {
    min,
    max,
    bands
  } = model;
  if (!bands.length) return '';
  const span = max - min;
  let out = '';
  let edge = min;

  for (const band of bands) {
    if (band.from > edge) out += `<span class="sf-chart-gauge-strip-part" style="flex-grow: ${share((band.from - edge) / span)}"></span>`;
    out += `<span class="sf-chart-gauge-strip-part sf-chart-gauge-band--${band.role}" style="flex-grow: ${share((band.to - band.from) / span)}"></span>`;
    edge = band.to;
  }

  if (edge < max) out += `<span class="sf-chart-gauge-strip-part" style="flex-grow: ${share((max - edge) / span)}"></span>`;
  return out;
}

function renderReading(context) {
  const {
    component,
    model,
    state
  } = context;
  const ready = state === 'ready';
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <span class="sf-chart-gauge-reading">
      <span class="sf-chart-gauge-value">${ready ? component.sayY(model.value) : component.words('gap')}</span>
      ${ready && model.band ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class=${`sf-chart-gauge-zone sf-chart-gauge-zone--${model.band.role}`}>${model.band.name}</span>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
    </span>
  `;
}

function renderEnds(context) {
  const {
    component,
    model
  } = context;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <span class="sf-chart-gauge-ends">
      <span class="sf-chart-gauge-end">${component.sayY(model.min)}</span>
      <span class="sf-chart-gauge-end">${component.sayY(model.max)}</span>
    </span>
  `;
}

function renderMeter(context) {
  const {
    component,
    model,
    state,
    uid,
    shape
  } = context;
  const ready = state === 'ready';
  const described = [context.summaryText ? `${uid}-summary` : '', context.hasDescription ? `${uid}-description` : ''].filter(Boolean).join(' ');
  const now = ready ? Math.max(model.min, Math.min(model.max, model.value)) : null;
  const style = [context.fill ? `--sf-chart-gauge--fill: ${esc(context.fill)}` : '', shape === 'linear' ? `--sf-chart-gauge--share: ${share(ready ? model.share : 0)}` : '', shape === 'linear' && model.target ? `--sf-chart-gauge--at: ${share(model.target.share)}` : ''].filter(Boolean).join('; ');
  const art = shape === 'arc' ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-chart-gauge-dial">
        <span class="sf-chart-gauge-arc" .innerHTML=${arcMarkup(model, ready)}></span>
        ${renderReading(context)}
      </span>` : (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`${renderReading(context)}
      <span class="sf-chart-gauge-bar">
        <span class="sf-chart-gauge-rail">${ready && model.share > 0 ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-chart-gauge-level"></span>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}</span>
        ${model.target ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-chart-gauge-tick"></span>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      </span>
      ${model.bands.length ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-chart-gauge-strip" .innerHTML=${bandsMarkup(model)}></span>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}`;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${`sf-chart-gauge-meter${state === 'loading' ? ' sf-chart-gauge-meter--loading' : ''}`}
         role=${state === 'loading' ? 'status' : 'meter'}
         aria-busy=${state === 'loading' ? 'true' : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
         aria-label=${state === 'loading' ? component.words('loading') : context.label}
         aria-valuemin=${state === 'loading' ? lit__WEBPACK_IMPORTED_MODULE_0__.nothing : String(model.min)}
         aria-valuemax=${state === 'loading' ? lit__WEBPACK_IMPORTED_MODULE_0__.nothing : String(model.max)}
         aria-valuenow=${now === null ? lit__WEBPACK_IMPORTED_MODULE_0__.nothing : String(now)}
         aria-valuetext=${ready ? component.valueText(model) : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
         aria-describedby=${described || lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
         style=${style || lit__WEBPACK_IMPORTED_MODULE_0__.nothing}>
      ${art}
      ${renderEnds(context)}
    </div>
    ${ready && model.target ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<p class="sf-chart-gauge-target"><span class="sf-chart-gauge-target-swatch" aria-hidden="true"></span>${component.words('target-line', {
    name: model.target.name,
    target: component.sayY(model.target.value)
  })}<span class="sf-chart-gauge-target-where">${component.words('target-where', {
    where: component.sayTarget(model)
  })}</span></p>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
  `;
} // The table is the settled copy of the data (chart-core/settle): it is
// rebuilt only when its key changes.


function renderTable(context) {
  const shownTable = context.table === 'visible' || context.table === 'toggle' && context.view === 'table';
  if (context.state !== 'ready') return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
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
  const model = context.tableData;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${shownTable ? 'sf-chart-gauge-table' : 'sf-chart-gauge-sr'}>
      <table>
        <caption>${label}</caption>
        <thead>
          <tr>
            <th scope="col">${component.words('what-column')}</th>
            <th scope="col">${component.words('value-column')}</th>
          </tr>
        </thead>
        <tbody>
          <tr><th scope="row">${label}</th><td>${component.sayY(model.value)}</td></tr>
          ${model.target ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<tr><th scope="row">${model.target.name}</th><td>${component.sayY(model.target.value)}</td></tr>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
          ${model.bands.map(band => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<tr><th scope="row">${band.name}</th><td>${component.sayRange(band)}</td></tr>`)}
        </tbody>
      </table>
    </div>
  `;
}

function renderPlot(context) {
  const {
    component,
    state
  } = context;

  if (state === 'empty' || state === 'error') {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
      <sf-empty-state class="sf-chart-gauge-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
        heading=${component.words(state === 'error' ? 'error-title' : 'empty-title')} text=""
        @sf-empty-state-action=${event => {
      event.stopPropagation();
      component.sfEmit('refresh', {});
    }}></sf-empty-state>
    `;
  }

  return renderMeter(context);
}

function renderGaugeTemplate(context) {
  const {
    component,
    uid,
    state,
    shape
  } = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <figure class=${['sf-chart-gauge', `sf-chart-gauge--size-${size}`, `sf-chart-gauge--${shape}`, `sf-chart-gauge--${state}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-chart-gauge-head">
        <span class="sf-chart-gauge-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.table === 'toggle' && state === 'ready' ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<button type="button" class="sf-chart-gauge-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      </figcaption>
      <div class="sf-chart-gauge-plot" ?hidden=${tableView}>${renderPlot(context)}</div>
      ${context.summaryText ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<p class="sf-chart-gauge-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      ${context.hasDescription ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-gauge-description" id=${`${uid}-description`}>${context.description}</div>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      ${renderTable(context)}
    </figure>
  `;
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "1e34599de468"
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

/***/ "b6c72114a0d4"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"id":"smart.chart-gauge","tag":"sf-chart-gauge","version":"0.1.0","kind":"leaf","settings":{"label":{"type":"string","default":""},"value":{"type":"number","optional":true},"min":{"type":"number","default":0},"max":{"type":"number","default":100},"bands":{"type":"list","default":[],"of":"object"},"target":{"type":"number","optional":true},"target-label":{"type":"string","default":""},"shape":{"type":"enum","values":["arc","linear"],"default":"arc"},"color":{"type":"string","default":""},"value-format":{"type":"string","default":"number"},"size":{"type":"enum","values":["1/2","1","2"],"default":"1"},"table":{"type":"enum","values":["toggle","visible","hidden"],"default":"hidden"},"summary":{"type":"enum","values":["auto","none"],"default":"auto"},"data-state":{"type":"enum","values":["auto","loading","ready","empty","error"],"default":"auto"}},"events":{"refresh":{"carries":{}}},"presentation":{"skeleton":{"late":["value"]}},"css-variables":{"--sf-chart-gauge-color":{"type":"color","state":"default"},"--sf-chart-gauge-track-color":{"type":"color","state":"default"},"--sf-chart-gauge-label-color":{"type":"color","state":"default"}}}');

/***/ },

/***/ "8d12eb963e74"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Gauge","runtime":{"untitled":"Gauge","gap":"no data","show-table":"Table","loading":"Loading the chart data","empty-title":"No data for the chart","error-title":"The data could not be loaded","target":"Target","target-line":"{name}: {target}","target-where":", {where}","above":"above by {by}","below":"below by {by}","at":"exactly","value-text":"{value}, {band}","zone-success":"Normal","zone-warning":"Warning","zone-error":"Critical","zone-other":"Zone {number}","range":"{from} – {to}","summary-value":"{value} on a scale from {min} to {max} ({share}).","summary-over":"{value}: above the scale, which ends at {max}.","summary-under":"{value}: below the scale, which starts at {min}.","summary-band":"Zone «{band}»: {range}.","summary-target":"{name} {target}: {where}.","value-column":"Value","what-column":"What"},"events":{"refresh":{"label":"Load the data again"}}}');

/***/ },

/***/ "1838f77a3f3f"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Шкала","runtime":{"untitled":"Шкала","gap":"нет данных","show-table":"Таблица","loading":"Загрузка данных диаграммы","empty-title":"Нет данных для диаграммы","error-title":"Не удалось загрузить данные","target":"Цель","target-line":"{name}: {target}","target-where":", {where}","above":"выше на {by}","below":"ниже на {by}","at":"ровно","value-text":"{value}, {band}","zone-success":"Норма","zone-warning":"Внимание","zone-error":"Критично","zone-other":"Зона {number}","range":"{from} – {to}","summary-value":"{value} на шкале от {min} до {max} ({share}).","summary-over":"{value}: выше шкалы, она кончается на {max}.","summary-under":"{value}: ниже шкалы, она начинается с {min}.","summary-band":"Зона «{band}»: {range}.","summary-target":"{name} {target}: {where}.","value-column":"Значение","what-column":"Что"},"events":{"refresh":{"label":"Загрузить данные заново"}}}');

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
/******/ 	let __webpack_exports__ = __webpack_require__("267a03b41e99");
/******/
/******/ })()
;