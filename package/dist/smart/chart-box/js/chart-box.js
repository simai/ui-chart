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

/***/ "bfcb61c22eac"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("deb1a4d61565");
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("5b7d7695b41b");
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("43090d1c8307");
/* harmony import */ var _chart_core_scale_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("e8bb19218bf5");
/* harmony import */ var _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("6668151838ce");
/* harmony import */ var _chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("132d5cf6d077");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("21ed19c5c40f");
/* harmony import */ var _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("fc9bb1435f01");
/* harmony import */ var _chart_core_palettes_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("b3159bcb2ffd");
/* harmony import */ var _chart_core_box_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("4cc148e8c445");
/* harmony import */ var _js_templates_default__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("323c5d94699f");
/* harmony import */ var _component_json__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("9651cab4967d");
/* harmony import */ var _lang_en_json__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("bb8971e59466");
/* harmony import */ var _lang_ru_json__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("66ca298bed4f");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__, _js_templates_default__WEBPACK_IMPORTED_MODULE_10__]);
([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__, _js_templates_default__WEBPACK_IMPORTED_MODULE_10__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__);
// sf-chart-box: a box plot, to compare how one measure spreads across groups
// (docs/research/catalogue.md, Box plot; docs/DECISIONS.md D9).
//
// The element reads its rows once into boxes (chart-core/box): the median,
// the quartiles, the whiskers and the outliers of each group, worked out
// from raw observations or given. It measures its plot and draws in SVG a
// band per group, a box per series side by side in it, on a value axis. A
// person reaches the plot with one Tab stop and walks the boxes with the
// arrows (chart-core/cursor); every move is said in a polite live region,
// the chart as a whole in a summary sentence, and the same statistics are
// a table on request.
//
// It renders into its own light DOM, like every Smart component.













 // The text of the plot, in px, by size rung, as on the line chart.

const FONT = {
  '1/2': 11,
  1: 12,
  2: 14
}; // An outlier's radius, in px, by size rung.

const DOT = {
  '1/2': 2.5,
  1: 3,
  2: 3.5
}; // The widest a box is drawn, in px, by size rung: a few groups do not make
// slabs.

const WIDEST = {
  '1/2': 40,
  1: 56,
  2: 80
};
const CHAR = 0.6;
const GAP = 8;
const ChartBoxElement = (0,_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__.elementFromManifest)(_component_json__WEBPACK_IMPORTED_MODULE_11__, {
  base: (_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default()),
  lang: {
    en: _lang_en_json__WEBPACK_IMPORTED_MODULE_12__,
    ru: _lang_ru_json__WEBPACK_IMPORTED_MODULE_13__
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

class SfBox extends ChartBoxElement {
  static get props() {
    return { ...super.props,
      rootClass: {
        default: ''
      }
    };
  }

  onConnected() {
    this._uid = this.id || `sf-chart-box-${instances += 1}`;
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
    const checked = (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7__.coloursKey)(colours);

    if (checked !== this._coloursChecked && this.isConnected) {
      this._coloursChecked = checked;
      (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7__.checkContrast)(this, colours, 'sf-chart-box');
    }

    const plot = this.querySelector('.sf-chart-box-plot');

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
      this._colours = (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7__.readColours)(this.colors, said => console.warn(`<sf-chart-box> ${said}`));
    }

    return this._colours;
  } // Each series' colour by key: the page's own or the named palette's by
  // place (D7). With neither, the template keeps the theme's colours.


  paints(list) {
    const own = this.colours();
    const set = _chart_core_palettes_js__WEBPACK_IMPORTED_MODULE_8__.PALETTES[this.palette];
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
  } // The rows as boxes, read again only when the data or its mapping changes.


  model() {
    const key = [this.items, this.names, this.x, this.y, this.series, this.stats, this.whiskers];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;
    this._model = (0,_chart_core_box_js__WEBPACK_IMPORTED_MODULE_9__.boxSeries)(this.items, {
      x: this.x,
      y: this.y,
      series: this.series,
      stats: this.stats,
      whiskers: this.whiskers,
      names: this.names || {}
    });
    return this._model;
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.labels.length ? 'ready' : 'empty';
  }

  shownSeries(model) {
    const hidden = new Set(this.hiddenSeries || []);
    return model.series.map((one, place) => ({ ...one,
      place
    })).filter(one => !hidden.has(one.key));
  } // The measure's name: the page's label, or the field; given statistics
  // have no field, so the chart's word.


  measureName() {
    return this.yLabel || this.model().yField || this.words('value');
  }

  sayY(value, step = 0) {
    return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(value, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.yFormat, {
      step,
      gap: this.words('gap')
    });
  }

  sayCount(value) {
    return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(value, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), 'integer');
  } // What a box is called: its group, and its series when there are several.


  boxName(model, index, key) {
    const group = model.labels[index] || this.words('group-n', {
      n: String(index + 1)
    });
    if (model.series.length < 2) return group;
    const series = model.series.find(one => one.key === key);
    return this.words('box-in', {
      group,
      series: series?.name ?? key
    });
  } // Where everything goes: the plot's inner box, the value scale, the bands
  // and one box per shown series in each. Null until the plot has a width.


  geometry(model, shown) {
    const {
      width,
      height
    } = this._box;
    if (!width || !height) return null;
    const font = FONT[this.size] ?? 12;
    const count = model.labels.length;
    let low = Infinity;
    let high = -Infinity;

    for (const one of shown) {
      for (const box of one.boxes) {
        if (!box) continue;
        low = Math.min(low, box.min);
        high = Math.max(high, box.max);
      }
    }

    if (!Number.isFinite(low)) [low, high] = [0, 1];
    const min = this.hasAttribute('y-min') && Number.isFinite(this.yMin) ? this.yMin : null;
    const max = this.hasAttribute('y-max') && Number.isFinite(this.yMax) ? this.yMax : null;
    if (min !== null) low = min;
    if (max !== null) high = max;
    if (high < low) [low, high] = [high, low];
    const top = GAP + (this.yLabel ? font * 1.5 : 0);
    const bottom = font * 1.5 + GAP + (this.xLabel ? font * 1.5 : 0);
    const ticks = (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_3__.niceTicks)(low, high, (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_3__.tickCount)(height - top - bottom, font * 3.5), {
      zero: Boolean(this.yZero),
      nice: min === null && max === null
    });
    const texts = ticks.ticks.map(value => this.sayY(value, ticks.step));
    const left = Math.ceil(Math.max(...texts.map(text => text.length)) * font * CHAR) + GAP * 1.5;
    const inner = {
      left,
      top,
      right: Math.max(left + 1, width - GAP * 2),
      bottom: Math.max(top + 1, height - bottom)
    };
    const y = (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_3__.linearScale)([ticks.min, ticks.max], [inner.bottom, inner.top]);
    const band = (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_3__.bandScale)(count, [inner.left, inner.right], {
      padding: 0.3
    });
    const lanes = Math.max(1, shown.length); // A box's lane in its band; the box is held to the rung's widest.

    const lane = band.width / lanes;
    const boxWidth = Math.max(2, Math.min(WIDEST[this.size] ?? 56, lane * (lanes > 1 ? 0.8 : 1)));
    const dot = DOT[this.size] ?? 3;
    const boxes = [];
    shown.forEach((one, at) => {
      one.boxes.forEach((box, index) => {
        if (!box) return;
        const middle = band.at(index) + lane * (at + 0.5);
        boxes.push({
          key: one.key,
          place: one.place,
          index,
          box,
          cx: middle,
          half: boxWidth / 2,
          q1: y(box.q1),
          q3: y(box.q3),
          median: y(box.median),
          low: y(box.low),
          high: y(box.high),
          mean: box.mean === null || box.mean === undefined ? null : y(box.mean),
          outliers: box.outliers.map(value => y(value))
        });
      });
    }); // The group names under their bands, every so many when they crowd;
    // a long one is cut with an ellipsis, said whole by the tooltip.

    const longest = Math.max(1, ...model.labels.map(text => text.length));
    const every = Math.max(1, Math.ceil((Math.min(longest, 16) * font * CHAR + GAP) / Math.max(1, band.step)));
    const most = Math.max(3, Math.floor((band.step * every - GAP) / (font * CHAR)));
    const groupTicks = model.labels.map((text, index) => ({
      at: band.at(index) + band.width / 2,
      text: text.length > most ? `${text.slice(0, most - 1)}…` : text,
      index
    })).filter(({
      index
    }) => index % every === 0);
    return {
      width,
      height,
      font,
      inner,
      y,
      dot,
      boxes,
      band,
      valueTicks: ticks.ticks.map((value, index) => ({
        at: y(value),
        text: texts[index],
        zero: value === 0
      })),
      groupTicks
    };
  }

  summarize(model, shown) {
    if (this.summary === 'none') return '';
    const locale = (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this);
    const parts = [];
    let values = 0;
    let outliers = 0;

    for (const one of shown) {
      for (const box of one.boxes) {
        if (!box) continue;
        values += box.n ?? 0;
        outliers += box.outliers.length;
      }
    }

    if (!shown.some(one => one.boxes.some(Boolean))) return this.words('summary-empty');
    parts.push(values ? this.words('summary-groups-values', {
      groups: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(model.labels.length, locale, 'integer'),
      values: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(values, locale, 'integer')
    }) : this.words('summary-groups', {
      groups: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(model.labels.length, locale, 'integer')
    }));

    for (const one of shown) {
      const own = one.boxes.map((box, index) => ({
        box,
        index
      })).filter(({
        box
      }) => box);
      if (!own.length) continue;
      let highest = own[0];
      let lowest = own[0];
      let widest = own[0];

      for (const each of own) {
        if (each.box.median > highest.box.median) highest = each;
        if (each.box.median < lowest.box.median) lowest = each;
        if (each.box.q3 - each.box.q1 > widest.box.q3 - widest.box.q1) widest = each;
      }

      const name = model.series.length > 1 ? one.name : this.measureName();

      if (own.length < 2) {
        parts.push(this.words('summary-one', {
          name,
          median: this.sayY(highest.box.median),
          from: this.sayY(highest.box.q1),
          to: this.sayY(highest.box.q3)
        }));
        continue;
      }

      parts.push(this.words('summary-series', {
        name,
        high: model.labels[highest.index],
        highMedian: this.sayY(highest.box.median),
        low: model.labels[lowest.index],
        lowMedian: this.sayY(lowest.box.median),
        wide: model.labels[widest.index],
        spread: this.sayY(widest.box.q3 - widest.box.q1)
      }));
    }

    if (outliers) parts.push(this.words('summary-outliers', {
      count: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(outliers, locale, 'integer')
    }));
    if (model.missing) parts.push(this.words('summary-missing', {
      count: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(model.missing, locale, 'integer')
    }));
    return parts.join(' ');
  } // A box as one sentence: its name, then its statistics.


  boxLine(model, index, key) {
    const one = model.series.find(each => each.key === key);
    const box = one?.boxes[index];
    const name = this.boxName(model, index, key);
    if (!box) return this.words('cursor-none', {
      name
    });
    const outliers = box.outliers.length ? this.words('cursor-outliers', {
      count: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(box.outliers.length, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), 'integer')
    }) : '';
    return this.words('cursor', {
      name,
      median: this.sayY(box.median),
      q1: this.sayY(box.q1),
      q3: this.sayY(box.q3),
      low: this.sayY(box.low),
      high: this.sayY(box.high),
      outliers
    });
  } // The cursor is a group's index and a shown series' key.


  cursorBox(cursor = this._cursor) {
    const geometry = this._geometry;
    if (!cursor || !geometry) return null;
    return geometry.boxes.find(one => one.index === cursor.index && one.key === cursor.series) ?? null;
  }

  setCursor(cursor, {
    say = false
  } = {}) {
    this._cursor = cursor;
    if (say && cursor) this._said = this.boxLine(this.model(), cursor.index, cursor.series);
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
      this.choose(this._cursor);
      return;
    }

    const shown = this.shownSeries(this.model()).map(one => one.key);
    const next = (0,_chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_5__.moveCursor)(this._cursor, event.key, {
      count: this.model().labels.length,
      shown
    });
    if (next === null) return;
    event.preventDefault();
    this.setCursor(next, {
      say: true
    });
  } // The pointer picks the box whose lane it is over.


  placeAt(event) {
    const geometry = this._geometry;
    if (!geometry) return null;
    const box = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - box.left;
    let best = null;
    let distance = Infinity;

    for (const one of geometry.boxes) {
      const off = Math.abs(one.cx - x);

      if (off < distance && off <= Math.max(one.half + 4, geometry.band.step / 2 / Math.max(1, this.shownSeries(this.model()).length))) {
        best = one;
        distance = off;
      }
    }

    return best ? {
      index: best.index,
      series: best.key
    } : null;
  }

  onPointerMove(event) {
    const place = this.placeAt(event);
    if (place?.index === this._cursor?.index && place?.series === this._cursor?.series) return;
    if (place === null && this.matches(':focus-within')) return;
    this.setCursor(place);
  }

  onPointerLeave() {
    if (this.matches(':focus-within')) return;
    this.setCursor(null);
  }

  onPlotClick(event) {
    const place = this.placeAt(event);
    if (place) this.choose(place);
  }

  choose(cursor) {
    const model = this.model();
    const box = model.series.find(one => one.key === cursor.series)?.boxes[cursor.index];
    if (!box) return;
    this.sfEmit('select', {
      series: cursor.series,
      index: cursor.index,
      group: model.labels[cursor.index],
      median: box.median
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
    const cursor = this.cursorBox();
    const tableModel = this.tableModel(model, state === 'ready');
    return this.createTemplateContext({ ...this.getPropsContext(),
      component: this,
      uid: this._uid,
      size: this.size,
      label: this.label || this.words('untitled'),
      state,
      model,
      tableModel,
      tableKey: [tableModel, this.label, this.xLabel, this.yLabel, this.yFormat, this.mean, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.table, this.table === 'toggle' ? this._view : 'chart'],
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

    return (0,_chart_core_settle_js__WEBPACK_IMPORTED_MODULE_6__.settled)(this._table, model, {
      later: () => this.requestComponentUpdate('table')
    });
  }

  template() {
    return (0,_js_templates_default__WEBPACK_IMPORTED_MODULE_10__.renderBoxTemplate)(this.templateContext());
  }

}

SfBox.define('sf-chart-box');
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "323c5d94699f"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderBoxTemplate: () => (/* binding */ renderBoxTemplate)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2a080a730149");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("21ed19c5c40f");
/* harmony import */ var _default_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("e3edcadf1dae");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([lit__WEBPACK_IMPORTED_MODULE_0__]);
var __webpack_async_dependencies_result__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_async_dependencies_result__[0];
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lit__WEBPACK_IMPORTED_MODULE_0__);


 // The figure of a box plot: the label and the table button, the legend, the
// plot (SVG), the summary and the description, the live line, and the same
// statistics as a table.
//
// The plot is one Tab stop, a role="group" named by the label and described
// by the summary; its axes and marks are aria-hidden, because the summary,
// the live line and the table say what they show. A series is a colour
// class (--c1..--c4) and its place in the band, and in forced colours its
// box's dash too. A page's own colour (the colors setting, by the series'
// key) is --custom with its value in a style.

const colourOf = (place, paint) => `sf-chart-box-series--${paint ? 'custom' : `c${place % 4 + 1}`}${place > 0 ? ` sf-chart-box-series--d${Math.min(place, 7)}` : ''}`;

const paintOf = paint => paint ? `--sf-chart-box--custom: ${paint}` : '';

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
  let out = '<g class="sf-chart-box-axes" aria-hidden="true">';

  for (const tick of g.valueTicks) {
    if (g.grid === 'none' && !tick.zero) continue;
    out += `<line class="${tick.zero ? 'sf-chart-box-baseline' : 'sf-chart-box-grid'}" x1="${px(inner.left)}" x2="${px(inner.right)}" y1="${px(tick.at)}" y2="${px(tick.at)}"/>`;
  }

  out += `<line class="sf-chart-box-baseline" x1="${px(inner.left)}" x2="${px(inner.right)}" y1="${px(inner.bottom)}" y2="${px(inner.bottom)}"/>`;

  for (const tick of g.valueTicks) {
    out += `<text class="sf-chart-box-tick" x="${px(inner.left - 6)}" y="${px(tick.at)}" text-anchor="end" dominant-baseline="middle">${esc(tick.text)}</text>`;
  }

  for (const tick of g.groupTicks) {
    out += `<text class="sf-chart-box-tick" x="${px(tick.at)}" y="${px(inner.bottom + g.font * 1.2)}" text-anchor="middle" dominant-baseline="middle">${esc(tick.text)}</text>`;
  }

  if (g.yLabel) out += `<text class="sf-chart-box-axis-label" x="${px(inner.left)}" y="${px(g.font)}" text-anchor="start">${esc(g.yLabel)}</text>`;
  if (g.xLabel) out += `<text class="sf-chart-box-axis-label" x="${px((inner.left + inner.right) / 2)}" y="${px(g.height - 4)}" text-anchor="middle">${esc(g.xLabel)}</text>`;
  return `${out}</g>`;
} // One box: the whiskers with their caps (one path), the box from the lower to the
// upper quartile, the median across it, the mean as a small diamond, and
// each outlier as a ring.


function boxMarkup(one, g, mean) {
  const {
    cx,
    half
  } = one;
  const cap = half / 2;
  let out = '';
  out += `<path class="sf-chart-box-whisker" d="M${px(cx)} ${px(one.q3)}V${px(one.high)}M${px(cx - cap)} ${px(one.high)}H${px(cx + cap)}M${px(cx)} ${px(one.q1)}V${px(one.low)}M${px(cx - cap)} ${px(one.low)}H${px(cx + cap)}"/>`;
  out += `<rect class="sf-chart-box-box" x="${px(cx - half)}" y="${px(one.q3)}" width="${px(half * 2)}" height="${px(Math.max(1, one.q1 - one.q3))}"/>`;
  out += `<line class="sf-chart-box-median" x1="${px(cx - half)}" x2="${px(cx + half)}" y1="${px(one.median)}" y2="${px(one.median)}"/>`;

  if (mean && one.mean !== null) {
    const r = g.dot + 1;
    out += `<path class="sf-chart-box-mean" d="M${px(cx)} ${px(one.mean - r)}L${px(cx + r)} ${px(one.mean)}L${px(cx)} ${px(one.mean + r)}L${px(cx - r)} ${px(one.mean)}Z"/>`;
  }

  for (const at of one.outliers) out += `<circle class="sf-chart-box-outlier" cx="${px(cx)}" cy="${px(at)}" r="${px(g.dot)}"/>`;

  return out;
}

function marksMarkup(g, paint, shown, mean) {
  let out = '<g class="sf-chart-box-marks" aria-hidden="true">';

  for (const one of shown) {
    const own = g.boxes.filter(each => each.key === one.key).map(each => boxMarkup(each, g, mean)).join('');
    out += `<g class="sf-chart-box-series ${colourOf(one.place, paint.get(one.key))}"${paintAttr(paint.get(one.key))} data-series="${esc(one.key)}">${own}</g>`;
  }

  return `${out}</g>`;
} // The cursor: the box's lane lit behind it and a ring around its box.


function cursorMarkup(g, one) {
  if (!one) return '';
  const lane = Math.max(one.half * 2 + 8, 0);
  let out = '<g class="sf-chart-box-cursor" aria-hidden="true">';
  out += `<rect class="sf-chart-box-lane" x="${px(one.cx - lane / 2)}" y="${px(g.inner.top)}" width="${px(lane)}" height="${px(g.inner.bottom - g.inner.top)}"/>`;
  out += `<rect class="sf-chart-box-ring" x="${px(one.cx - one.half - 3)}" y="${px(one.q3 - 3)}" width="${px(one.half * 2 + 6)}" height="${px(Math.max(1, one.q1 - one.q3) + 6)}" rx="2"/>`;
  return `${out}</g>`;
}

const swatchMarkup = () => '<svg viewBox="0 0 12 12" focusable="false"><rect x="1.5" y="1.5" width="9" height="9" rx="1"/></svg>';

function renderTooltip(context, g, one) {
  if (!one || context.tooltip === 'none') return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const {
    component,
    model
  } = context;
  const {
    box
  } = one;
  const flip = one.cx > g.width / 2;
  const rows = [[component.words('max'), box.max], [component.words('q3'), box.q3], [component.words('median'), box.median], [component.words('q1'), box.q1], [component.words('min'), box.min]];
  if (context.mean && box.mean !== null && box.mean !== undefined) rows.push([component.words('mean'), box.mean]);
  const counts = [];
  if (box.n !== null) counts.push([component.words('count'), box.n]);
  if (box.outliers.length) counts.push([component.words('outliers'), box.outliers.length]);
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${`sf-chart-box-tooltip${flip ? ' sf-chart-box-tooltip--flip' : ''}`} aria-hidden="true"
         style=${`inset-inline-start: ${px(one.cx)}px; inset-block-start: ${px((one.q1 + one.q3) / 2)}px; --sf-chart-box--reach: ${px(one.half)}`}>
      <div class=${`sf-chart-box-tooltip-name ${colourOf(one.place, context.paint.get(one.key))}`} style=${paintOf(context.paint.get(one.key)) || lit__WEBPACK_IMPORTED_MODULE_0__.nothing}>
        <span class="sf-chart-box-swatch" .innerHTML=${swatchMarkup()}></span>
        <span>${component.boxName(model, one.index, one.key)}</span>
      </div>
      ${rows.map(([name, value]) => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <div class="sf-chart-box-tooltip-row">
          <span>${name}</span>
          <span class="sf-chart-box-tooltip-value">${component.sayY(value)}</span>
        </div>
      `)}
      ${counts.map(([name, value]) => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <div class="sf-chart-box-tooltip-row">
          <span>${name}</span>
          <span class="sf-chart-box-tooltip-value">${component.sayCount(value)}</span>
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
    <div class=${`sf-chart-box-legend sf-chart-box-legend--${place}`} role="group" aria-label=${component.words('legend')}>
      ${model.series.map((one, index) => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <button type="button" class=${`sf-chart-box-legend-item ${colourOf(index, context.paint.get(one.key))}`}
                style=${paintOf(context.paint.get(one.key)) || lit__WEBPACK_IMPORTED_MODULE_0__.nothing} aria-pressed=${hidden.has(one.key) ? 'false' : 'true'}
                data-series=${one.key} @click=${() => component.toggleSeries(one.key)}>
          <span class="sf-chart-box-swatch" aria-hidden="true" .innerHTML=${swatchMarkup()}></span>
          <span class="sf-chart-box-legend-name">${one.name}</span>
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
  const counted = model.series.some(one => one.boxes.some(box => box && box.n !== null));
  const mean = context.mean && model.series.some(one => one.boxes.some(box => box && box.mean !== null && box.mean !== undefined));
  const rows = [];
  model.labels.forEach((group, index) => {
    for (const one of model.series) {
      const box = one.boxes[index];
      if (box) rows.push({
        group,
        series: one.name,
        box
      });
    }
  });

  const say = value => value === null || value === undefined ? '' : component.sayY(value);

  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${shownTable ? 'sf-chart-box-table' : 'sf-chart-box-sr'}>
      <table>
        <caption>${label}</caption>
        <thead>
          <tr>
            <th scope="col">${component.xLabel || model.xField || component.words('group-column')}</th>
            ${several ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<th scope="col">${component.words('series-column')}</th>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
            ${counted ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<th scope="col">${component.words('count')}</th>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
            <th scope="col">${component.words('min')}</th>
            <th scope="col">${component.words('q1')}</th>
            <th scope="col">${component.words('median')}</th>
            <th scope="col">${component.words('q3')}</th>
            <th scope="col">${component.words('max')}</th>
            ${mean ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<th scope="col">${component.words('mean')}</th>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
            ${counted ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<th scope="col">${component.words('outliers')}</th>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
          </tr>
        </thead>
        <tbody>
          ${rows.map(({
    group,
    series,
    box
  }) => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
            <tr>
              <th scope="row">${group}</th>
              ${several ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<td>${series}</td>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
              ${counted ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<td>${component.sayCount(box.n ?? 0)}</td>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
              <td>${say(box.min)}</td>
              <td>${say(box.q1)}</td>
              <td>${say(box.median)}</td>
              <td>${say(box.q3)}</td>
              <td>${say(box.max)}</td>
              ${mean ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<td>${say(box.mean)}</td>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
              ${counted ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<td>${box.outliers.map(value => component.sayY(value)).join('; ')}</td>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
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
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-box-loading" role="status" aria-busy="true"><span class="sf-chart-box-sr">${component.words('loading')}</span></div>`;
  }

  if (state === 'empty' || state === 'error') {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
      <sf-empty-state class="sf-chart-box-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
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
    grid: context.grid,
    xLabel: context.xLabel,
    yLabel: context.yLabel
  };
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <svg class="sf-chart-box-svg" role="group" tabindex="0" focusable="true"
         aria-label=${context.label} aria-roledescription=${component.words('roledescription')}
         aria-describedby=${described || lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
         width=${g.width} height=${g.height} viewBox=${`0 0 ${g.width} ${g.height}`}
         @keydown=${event => component.onPlotKey(event)}
         @pointermove=${event => component.onPointerMove(event)}
         @pointerleave=${() => component.onPointerLeave()}
         @click=${event => component.onPlotClick(event)}
         @blur=${() => component.setCursor(null)}
         .innerHTML=${axesMarkup(drawn) + cursorMarkup(g, cursor) + marksMarkup(drawn, paint, shown, context.mean)}>
    </svg>
    ${renderTooltip(context, g, cursor)}
  `;
}

function renderBoxTemplate(context) {
  const {
    component,
    uid,
    state
  } = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <figure class=${['sf-chart-box', `sf-chart-box--size-${size}`, `sf-chart-box--${state}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-chart-box-head">
        <span class="sf-chart-box-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.table === 'toggle' && state === 'ready' ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<button type="button" class="sf-chart-box-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      </figcaption>
      ${renderLegend(context, 'top')}
      <div class="sf-chart-box-plot" ?hidden=${tableView}>${renderPlot(context)}</div>
      ${renderLegend(context, 'bottom')}
      ${context.summaryText ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<p class="sf-chart-box-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      ${context.hasDescription ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-box-description" id=${`${uid}-description`}>${context.description}</div>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      <div class="sf-chart-box-sr" aria-live="polite">${context.said}</div>
      ${renderTable(context)}
    </figure>
  `;
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "4cc148e8c445"
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   boxSeries: () => (/* binding */ boxSeries),
/* harmony export */   boxStats: () => (/* binding */ boxStats),
/* harmony export */   givenStats: () => (/* binding */ givenStats),
/* harmony export */   quantile: () => (/* binding */ quantile)
/* harmony export */ });
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("37677343b39a");
// The boxes of a box plot (docs/research/catalogue.md, Box plot): for each
// group the median, the quartiles, the whiskers and the outliers of one
// measure. The rows are raw observations (the statistics are worked out
// here), or one row per group with the statistics already given.

/** The p-quantile of sorted numbers, linear between the two nearest (as R's type 7, NumPy's and a spreadsheet's). */

function quantile(sorted, p) {
  if (!sorted.length) return null;
  const at = (sorted.length - 1) * p;
  const low = Math.floor(at);
  const high = Math.ceil(at);
  return sorted[low] + (sorted[high] - sorted[low]) * (at - low);
}
/**
 * The statistics of one group: {n, min, q1, median, q3, max, low, high,
 * outliers, mean}, or null with no values. With whiskers 'tukey' a whisker
 * reaches the farthest value within 1.5 interquartile ranges of its box and
 * the values past it are outliers; with 'range' it reaches the extreme and
 * there are none.
 */

function boxStats(values, whiskers = 'tukey') {
  const sorted = values.filter(value => value !== null).sort((a, b) => a - b);
  if (!sorted.length) return null;
  const q1 = quantile(sorted, 0.25);
  const q3 = quantile(sorted, 0.75);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  let low = min;
  let high = max;
  let outliers = [];

  if (whiskers !== 'range') {
    const reach = 1.5 * (q3 - q1);
    const inside = sorted.filter(value => value >= q1 - reach && value <= q3 + reach);
    low = inside[0];
    high = inside[inside.length - 1];
    outliers = sorted.filter(value => value < low || value > high);
  }

  return {
    n: sorted.length,
    min,
    q1,
    median: quantile(sorted, 0.5),
    q3,
    max,
    low,
    high,
    outliers,
    mean: sorted.reduce((sum, value) => sum + value, 0) / sorted.length
  };
}
const GIVEN = ['min', 'q1', 'median', 'q3', 'max'];
/** Statistics given in a row ({min, q1, median, q3, max, mean?}), or null when one is missing or out of order. */

function givenStats(row) {
  const [min, q1, median, q3, max] = GIVEN.map(name => (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.readNumber)(row[name]));
  if ([min, q1, median, q3, max].some(value => value === null)) return null;
  if (!(min <= q1 && q1 <= median && median <= q3 && q3 <= max)) return null;
  return {
    n: null,
    min,
    q1,
    median,
    q3,
    max,
    low: min,
    high: max,
    outliers: [],
    mean: (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.readNumber)(row.mean)
  };
}
/**
 * The model of a box plot: {kind: 'category', xField, yField, keys, xs,
 * labels, series: [{key, name, boxes}], missing}.
 *
 * `x` is the group (the first field when unset), `y` the measure (the first
 * numeric field other than x and series); `series` splits each group into
 * boxes side by side. With stats 'given', each row is a group whose min,
 * q1, median, q3 and max are given; a row without them is left out. Groups
 * keep the data's first-seen order. A box is null where a series has no
 * value in a group.
 */

function boxSeries(items, {
  x = '',
  y = '',
  series = '',
  stats = 'raw',
  whiskers = 'tukey',
  names = {}
} = {}) {
  const rows = (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.readRows)(items);
  const fields = rows.length ? Object.keys(rows[0]) : [];
  const xField = x || fields[0] || '';
  const given = stats === 'given';
  const yField = given ? '' : y || fields.find(name => name !== xField && name !== series && rows.some(row => (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.readNumber)(row[name]) !== null)) || '';
  const groups = new Map();
  const keys = new Map();
  let missing = 0;

  for (const row of rows) {
    const group = row[xField] === undefined || row[xField] === null ? '' : String(row[xField]);
    const key = series ? row[series] === undefined || row[series] === null ? '' : String(row[series]) : yField || 'box';
    const value = given ? givenStats(row) : (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.readNumber)(row[yField]);

    if (value === null) {
      missing += 1;
      continue;
    }

    if (!groups.has(group)) groups.set(group, groups.size);
    if (!keys.has(key)) keys.set(key, new Map());
    const own = keys.get(key);
    if (!own.has(group)) own.set(group, []);
    own.get(group).push(value);
  }

  const labels = [...groups.keys()];
  const out = [...keys].map(([key, own]) => ({
    key,
    name: names[key] ?? key,
    boxes: labels.map(group => {
      const values = own.get(group);
      if (!values) return null;
      return given ? values[0] : boxStats(values, whiskers);
    })
  }));
  return {
    kind: 'category',
    xField,
    yField,
    keys: labels,
    xs: labels.map((_, index) => index),
    labels,
    series: out,
    missing
  };
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

/***/ "e3edcadf1dae"
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

/***/ "9651cab4967d"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"id":"smart.chart-box","tag":"sf-chart-box","version":"0.1.0","kind":"leaf","settings":{"label":{"type":"string","default":""},"items":{"type":"list","default":[],"of":"object"},"names":{"type":"object","default":{}},"colors":{"type":"object","default":{}},"palette":{"type":"enum","values":["theme","vivid","soft","warm","cool","brand"],"default":"theme"},"x":{"type":"string","default":""},"y":{"type":"string","default":""},"series":{"type":"string","default":""},"stats":{"type":"enum","values":["raw","given"],"default":"raw"},"whiskers":{"type":"enum","values":["tukey","range"],"default":"tukey"},"mean":{"type":"boolean","default":false},"y-min":{"type":"number","optional":true},"y-max":{"type":"number","optional":true},"y-zero":{"type":"boolean","default":false},"legend":{"type":"enum","values":["auto","top","bottom","none"],"default":"auto"},"tooltip":{"type":"enum","values":["box","none"],"default":"box"},"grid":{"type":"enum","values":["value","none"],"default":"value"},"x-label":{"type":"string","default":""},"y-label":{"type":"string","default":""},"y-format":{"type":"string","default":"number"},"size":{"type":"enum","values":["1/2","1","2"],"default":"1"},"table":{"type":"enum","values":["toggle","visible","hidden"],"default":"toggle"},"summary":{"type":"enum","values":["auto","none"],"default":"auto"},"data-state":{"type":"enum","values":["auto","loading","ready","empty","error"],"default":"auto"}},"values":{"hidden-series":{"type":"list","default":[],"of":"string"}},"events":{"toggle":{"carries":{"id":"string","hidden":"boolean"}},"select":{"carries":{"series":"string","index":"number","group":"string","median":"number"}},"refresh":{"carries":{}}},"actions":{"reset":{"with":{}}},"presentation":{"skeleton":{"late":["items"]}},"css-variables":{"--sf-chart-box-height":{"type":"length","state":"default"},"--sf-chart-box-grid-color":{"type":"color","state":"default"},"--sf-chart-box-baseline-color":{"type":"color","state":"default"},"--sf-chart-box-label-color":{"type":"color","state":"default"},"--sf-chart-box-hover-background-color":{"type":"color","state":"hover"},"--sf-chart-box-hidden-color":{"type":"color","state":"disabled"}}}');

/***/ },

/***/ "bb8971e59466"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Box plot","runtime":{"untitled":"Chart","roledescription":"box plot","summary-groups":"Groups: {groups}.","summary-groups-values":"Groups: {groups}, values: {values}.","summary-series":"{name}: highest median {high} ({highMedian}), lowest {low} ({lowMedian}); widest spread {wide} (the middle half within {spread}).","summary-one":"{name}: median {median}, the middle half from {from} to {to}.","summary-outliers":"Outliers: {count}.","summary-missing":"Rows without a value: {count}.","summary-empty":"No data.","cursor":"{name}: median {median}, quartiles {q1} – {q3}, whiskers {low} – {high}{outliers}","cursor-outliers":", {count} outliers","cursor-none":"{name}: no data","group-n":"Group {n}","box-in":"{group}, {series}","group-column":"Group","series-column":"Series","value":"Value","min":"Minimum","q1":"Lower quartile","median":"Median","q3":"Upper quartile","max":"Maximum","mean":"Mean","count":"Values","outliers":"Outliers","gap":"no data","show-table":"Table","legend":"Series","loading":"Loading the chart\'s data","empty-title":"No data for the chart","error-title":"Could not load the data"},"events":{"toggle":{"label":"Hide or show a series"},"select":{"label":"Choose a box"},"refresh":{"label":"Load the data again"}},"actions":{"reset":{"label":"Show every series"}}}');

/***/ },

/***/ "66ca298bed4f"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Ящик с усами","runtime":{"untitled":"График","roledescription":"ящик с усами","summary-groups":"Групп: {groups}.","summary-groups-values":"Групп: {groups}, значений: {values}.","summary-series":"{name}: медиана выше всего — {high} ({highMedian}), ниже всего — {low} ({lowMedian}); шире всего разброс — {wide} (половина значений в пределах {spread}).","summary-one":"{name}: медиана {median}, половина значений от {from} до {to}.","summary-outliers":"Выбросов: {count}.","summary-missing":"Строк без значения: {count}.","summary-empty":"Нет данных.","cursor":"{name}: медиана {median}, квартили {q1} – {q3}, усы {low} – {high}{outliers}","cursor-outliers":", выбросов {count}","cursor-none":"{name}: нет данных","group-n":"Группа {n}","box-in":"{group}, {series}","group-column":"Группа","series-column":"Ряд","value":"Значение","min":"Минимум","q1":"Нижний квартиль","median":"Медиана","q3":"Верхний квартиль","max":"Максимум","mean":"Среднее","count":"Значений","outliers":"Выбросы","gap":"нет данных","show-table":"Таблица","legend":"Ряды","loading":"Загрузка данных графика","empty-title":"Нет данных для графика","error-title":"Не удалось загрузить данные"},"events":{"toggle":{"label":"Скрыть или показать ряд"},"select":{"label":"Выбрать ящик"},"refresh":{"label":"Загрузить данные заново"}},"actions":{"reset":{"label":"Показать все ряды"}}}');

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
/******/ 	let __webpack_exports__ = __webpack_require__("bfcb61c22eac");
/******/
/******/ })()
;