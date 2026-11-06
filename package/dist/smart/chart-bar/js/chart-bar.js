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

/***/ "96c93ab4f196"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("deb1a4d61565");
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("5b7d7695b41b");
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("43090d1c8307");
/* harmony import */ var _chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("37677343b39a");
/* harmony import */ var _chart_core_bin_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("0a702284fcba");
/* harmony import */ var _chart_core_scale_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("e8bb19218bf5");
/* harmony import */ var _chart_core_format_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("6668151838ce");
/* harmony import */ var _chart_core_stack_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("3514cfe878c1");
/* harmony import */ var _chart_core_path_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("5fc4022962c0");
/* harmony import */ var _chart_core_describe_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("40ff9ca61ced");
/* harmony import */ var _chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("132d5cf6d077");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("21ed19c5c40f");
/* harmony import */ var _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("fc9bb1435f01");
/* harmony import */ var _chart_core_palettes_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("b3159bcb2ffd");
/* harmony import */ var _js_templates_default__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("8f122d90c81a");
/* harmony import */ var _component_json__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("031ab9e7c8db");
/* harmony import */ var _lang_en_json__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("3a73307bc0af");
/* harmony import */ var _lang_ru_json__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("c2d1e8a022e2");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_6__, _js_templates_default__WEBPACK_IMPORTED_MODULE_14__]);
([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_6__, _js_templates_default__WEBPACK_IMPORTED_MODULE_14__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__);
// sf-chart-bar: values by category as bars, grouped or stacked, vertical or
// horizontal (docs/DECISIONS.md D1), with some series as lines over the bars
// when asked (lines), on the bars' axis or a scale of their own.
//
// The element reads its data once into series (chart-core/data), stacks it
// when asked (chart-core/stack), measures its plot, and draws axes and one
// rectangle per value in SVG (chart-core/scale). A person reaches the plot
// with one Tab stop and walks it with the arrows (chart-core/cursor); every
// move is said in a polite live region, the chart as a whole in a summary
// sentence (chart-core/describe), and the same data is a table on request.
// With bin, the rows are observations of one measure and the bars a
// histogram (chart-core/bin): one bar per interval, the bars touching, the
// axis marked at the intervals' edges.
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
const ChartBarElement = (0,_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__.elementFromManifest)(_component_json__WEBPACK_IMPORTED_MODULE_15__, {
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
let instances = 0; // A label held from an edge of the plot, so it never leaves it.

function anchored(tick, width, font) {
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
}

class SfBarChart extends ChartBarElement {
  static get props() {
    return { ...super.props,
      rootClass: {
        default: ''
      }
    };
  }

  onConnected() {
    this._uid = this.id || `sf-chart-bar-${instances += 1}`;
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
      (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_12__.checkContrast)(this, colours, 'sf-chart-bar');
    }

    const plot = this.querySelector('.sf-chart-bar-plot');

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
      this._colours = (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_12__.readColours)(this.colors, said => console.warn(`<sf-chart-bar> ${said}`));
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
  } // The data as series in the order the bars stand, read again only when the
  // data, its mapping or the sort changes. A sorted chart is a reordered
  // model, so an index is a bar's place everywhere.


  model() {
    const key = [this.items, this.names, this.x, this.y, this.series, this.xScale, this.sort, this.bin, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this)];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;

    if (this.binned()) {
      const bins = (0,_chart_core_bin_js__WEBPACK_IMPORTED_MODULE_4__.binSeries)(this.items, {
        x: this.x,
        y: this.y,
        series: this.series,
        bin: this.bin,
        names: this.names || {},
        countName: this.words('count')
      });
      this._model = { ...bins,
        order: bins.xs.map((_, index) => index),
        unit: 'day'
      };
      return this._model;
    }

    const read = (0,_chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__.readSeries)(this.items, {
      x: this.x,
      y: this.y,
      series: this.series,
      xScale: this.xScale,
      names: this.names || {}
    });
    let order = read.xs.map((_, index) => index);

    if (this.sort !== 'none' && read.series.length) {
      const total = index => read.series.reduce((sum, one) => sum + (one.values[index] ?? 0), 0);

      order = [...order].sort((a, b) => this.sort === 'ascending' ? total(a) - total(b) : total(b) - total(a));
    }

    const pick = list => order.map(index => list[index]);

    this._model = { ...read,
      keys: pick(read.keys),
      xs: pick(read.xs),
      labels: pick(read.labels),
      series: read.series.map(one => ({ ...one,
        values: pick(one.values)
      })),
      order: order.map((_, index) => index),
      unit: read.kind === 'time' ? (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_6__.timeUnitOf)([...read.xs].sort((a, b) => a - b)) : 'day'
    };
    return this._model;
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.series.some(one => one.values.some(value => value !== null)) ? 'ready' : 'empty';
  } // A histogram: bin is auto or a width, not none.


  binned() {
    return Boolean(this.bin) && this.bin !== 'none';
  } // The series drawn as lines: those named in lines, on vertical bars only.


  lineKeys() {
    if (this.orientation === 'horizontal' || !this.lines) return new Set();
    return new Set(this.lines.split(',').map(key => key.trim()).filter(Boolean));
  } // The lines stand on a scale of their own when asked, and always over a
  // normalized stack, whose axis is shares.


  ownLineAxis() {
    return this.lineAxis === 'own' || this.stack === 'normalized';
  }

  shownSeries(model) {
    const hidden = new Set(this.hiddenSeries || []);
    return model.series.map((one, place) => ({ ...one,
      place
    })).filter(one => !hidden.has(one.key));
  } // A category as the axis, the tooltip and the table say it.


  sayX(model, index, form = 'full') {
    const locale = (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this);

    if (model.kind === 'bin') {
      const bin = model.bins[index];
      return bin ? this.words('bin-range', {
        from: this.sayEdge(bin.from, model.width),
        to: this.sayEdge(bin.to, model.width)
      }) : '';
    }

    if (model.kind === 'time') return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_6__.formatTime)(model.xs[index], locale, model.unit, {
      form,
      format: this.xFormat
    });
    if (model.kind === 'number') return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_6__.formatNumber)(model.xs[index], locale, 'number');
    return String(model.labels[index] ?? '');
  } // An edge of a histogram's interval, in the measure's format (x-format,
  // number when auto).


  sayEdge(value, step = 0) {
    return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_6__.formatNumber)(value, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.xFormat === 'auto' ? 'number' : this.xFormat, {
      step
    });
  }

  sayY(value, step = 0) {
    return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_6__.formatNumber)(value, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.yFormat, {
      step,
      gap: this.words('gap')
    });
  } // A value of a series in its own format: a line on its own scale may be
  // of another kind than the bars (a share over a sum).


  sayOf(key, value, step = 0) {
    if (!this.lineFormat || !this.lineKeys().has(key)) return this.sayY(value, step);
    return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_6__.formatNumber)(value, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.lineFormat, {
      step,
      gap: this.words('gap')
    });
  } // A bar's value as the tooltip and the live line say it: in a normalized
  // stack, its share and then the value itself.


  sayValue(group, index) {
    const raw = group.values[index];
    if (group.line) return this.sayOf(group.key, raw);
    if (this.stack !== 'normalized' || raw === null) return this.sayY(raw);
    const segment = group.segments[index];
    const share = segment ? segment[1] - segment[0] : 0;
    return this.words('share', {
      share: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_6__.formatNumber)(share, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), 'percent'),
      value: this.sayY(raw)
    });
  } // Where everything goes: the plot's inner box, the value scale, the bands
  // and one rectangle per value. Null until the plot has a width.


  geometry(model, shown) {
    const {
      width,
      height
    } = this._box;
    if (!width || !height) return null;
    const font = FONT[this.size] ?? 12;
    const count = model.xs.length;
    const horizontal = this.orientation === 'horizontal'; // A histogram's bars touch, since its axis is a measure, not categories.

    const binned = model.kind === 'bin';
    const normalized = this.stack === 'normalized';
    const lineKeys = this.lineKeys();
    const barShown = shown.filter(one => !lineKeys.has(one.key));
    const lineShown = shown.filter(one => lineKeys.has(one.key));
    const own = lineShown.length > 0 && this.ownLineAxis();
    const segments = (0,_chart_core_stack_js__WEBPACK_IMPORTED_MODULE_7__.stackSeries)(barShown, this.stack);
    let [low, high] = normalized ? [0, 1] : (0,_chart_core_stack_js__WEBPACK_IMPORTED_MODULE_7__.stackExtent)(segments);
    const lineValues = lineShown.flatMap(one => one.values.filter(v => v !== null)); // On the shared axis the lines widen it; on their own they have a scale
    // of their own, which need not start at zero.

    if (lineValues.length && !own) {
      low = Math.min(low, ...lineValues);
      high = Math.max(high, ...lineValues);
    }

    const yMax = !normalized && this.hasAttribute('y-max') && Number.isFinite(this.yMax) ? this.yMax : null;

    const tickText = (value, step) => normalized ? (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_6__.formatNumber)(value, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), 'percent') : this.sayY(value, step);

    const labelsAt = ticks => ticks.ticks.map(value => tickText(value, ticks.step));

    const room = font * 1.5 + GAP; // A histogram's counts are whole: its axis never steps by a fraction
    // (2.5 would read 3, 5, 8). The nearest count of ticks, more or fewer,
    // whose step is whole.

    const whole = binned && !this.y;

    const ticksOf = count => {
      const at = wanted => (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_5__.niceTicks)(Math.min(low, 0), yMax ?? high, wanted, {
        zero: true,
        nice: yMax === null && !normalized
      });

      const first = at(count);
      if (!whole || Number.isInteger(first.step)) return first;

      for (const near of [1, -1, 2, -2, 3, -3]) {
        const ticks = count + near >= 1 ? at(count + near) : null;
        if (ticks && Number.isInteger(ticks.step)) return ticks;
      }

      return first;
    };

    let inner;
    let value;
    let valueTicks;
    let bandRange;
    let categoryTicks;
    let lineAxis = null;

    if (horizontal) {
      // Categories down the left, held to two fifths of the width.
      const longest = Math.max(1, ...model.xs.map((_, index) => this.sayX(model, index).length));
      const left = Math.min(Math.round(width * 0.4), Math.ceil(longest * font * CHAR) + GAP * 1.5);
      const top = GAP;
      const bottom = room + (this.yLabel ? font * 1.5 : 0);
      inner = {
        left,
        top,
        right: Math.max(left + 1, width - GAP * 2),
        bottom: Math.max(top + 1, height - bottom)
      };
      const ticks = ticksOf((0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_5__.tickCount)(inner.right - inner.left, font * CHAR * 9));
      value = (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_5__.linearScale)([ticks.min, ticks.max], [inner.left, inner.right]);
      valueTicks = labelsAt(ticks).map((text, index) => anchored({
        at: value(ticks.ticks[index]),
        text,
        zero: ticks.ticks[index] === 0
      }, width, font));
      bandRange = [inner.top, inner.bottom];
      const most = Math.max(1, Math.floor((left - GAP * 1.5) / (font * CHAR)));
      const band = (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_5__.bandScale)(count, bandRange, {
        padding: binned ? 0 : 0.2
      });
      const every = Math.max(1, Math.ceil(font * 1.25 / Math.max(1, band.step)));
      categoryTicks = binned ? this.edgeTicks(model, band, font * 1.25) : model.xs.map((_, index) => {
        const text = this.sayX(model, index);
        return {
          at: band.at(index) + band.width / 2,
          text: text.length > most ? `${text.slice(0, most - 1)}…` : text,
          index
        };
      }).filter(({
        index
      }) => index % every === 0);
    } else {
      const top = GAP + (this.yLabel ? font * 1.5 : 0);
      const bottom = room + (this.xLabel ? font * 1.5 : 0);
      const ticks = ticksOf((0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_5__.tickCount)(height - top - bottom, font * 3.5));
      const texts = labelsAt(ticks);
      const left = Math.ceil(Math.max(...texts.map(text => text.length)) * font * CHAR) + GAP * 1.5;

      if (own) {
        const lineTicks = (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_5__.niceTicks)(Math.min(...lineValues), Math.max(...lineValues), (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_5__.tickCount)(height - top - bottom, font * 3.5));
        const lineTexts = lineTicks.ticks.map(at => this.sayOf(lineShown[0].key, at, lineTicks.step));
        const right = Math.ceil(Math.max(...lineTexts.map(text => text.length)) * font * CHAR) + GAP * 1.5;
        lineAxis = {
          ticks: lineTicks,
          texts: lineTexts,
          right
        };
      }

      inner = {
        left,
        top,
        right: Math.max(left + 1, width - (lineAxis ? lineAxis.right : GAP * 2)),
        bottom: Math.max(top + 1, height - bottom)
      };
      value = (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_5__.linearScale)([ticks.min, ticks.max], [inner.bottom, inner.top]);
      valueTicks = texts.map((text, index) => ({
        at: value(ticks.ticks[index]),
        text,
        zero: ticks.ticks[index] === 0
      }));
      bandRange = [inner.left, inner.right];
      const band = (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_5__.bandScale)(count, bandRange, {
        padding: binned ? 0 : 0.2
      });
      const longest = Math.max(1, ...model.xs.map((_, index) => this.sayX(model, index, 'tick').length));
      const every = Math.max(1, Math.ceil((longest * font * CHAR + GAP) / Math.max(1, band.step)));
      categoryTicks = (binned ? this.edgeTicks(model, band, text => text.length * font * CHAR + GAP) : model.xs.map((_, index) => ({
        at: band.at(index) + band.width / 2,
        text: this.sayX(model, index, 'tick'),
        index
      })).filter(({
        index
      }) => index % every === 0)).map(tick => anchored(tick, width, font));
    }

    const band = (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_5__.bandScale)(count, bandRange, {
      padding: binned ? 0 : count > 60 ? 0.1 : 0.25
    });
    const grouped = this.stack === 'none' && barShown.length > 1;
    const sub = grouped ? band.width / barShown.length : band.width;
    const zero = value(0);
    const groups = barShown.map((one, place) => {
      const bars = [];
      segments[place].forEach((segment, index) => {
        if (!segment) return;
        const [a, b] = [value(segment[0]), value(segment[1])]; // A zero still shows as a hairline, so the bar is seen to be there.

        const start = band.at(index) + (grouped ? place * sub : 0);
        const breadth = Math.max(1, grouped ? sub * 0.92 : sub);
        const length = Math.max(1, Math.abs(b - a));
        bars.push(horizontal ? {
          index,
          x: Math.min(a, b),
          y: start,
          width: length,
          height: breadth,
          end: b
        } : {
          index,
          x: start,
          y: Math.min(a, b),
          width: breadth,
          height: length,
          end: b
        });
      });
      return { ...one,
        segments: segments[place],
        bars
      };
    }); // The lines through the middles of the bands, broken at a gap, with a
    // point at each value.

    const lineScale = lineAxis ? (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_5__.linearScale)([lineAxis.ticks.min, lineAxis.ticks.max], [inner.bottom, inner.top]) : value;
    const lines = lineShown.map(one => {
      const points = one.values.map((raw, index) => raw === null ? null : [band.at(index) + band.width / 2, lineScale(raw)]);
      return { ...one,
        line: true,
        points,
        d: (0,_chart_core_path_js__WEBPACK_IMPORTED_MODULE_8__.linePath)(points)
      };
    });
    const lineTicks = lineAxis ? lineAxis.ticks.ticks.map((at, index) => ({
      at: lineScale(at),
      text: lineAxis.texts[index]
    })) : []; // A value at the end of each bar (or of each stack) where it fits.

    const valueLabels = [];

    if (this.valueLabels === 'end') {
      const ends = this.stack === 'none' ? groups.flatMap(group => group.bars.map(bar => ({
        bar,
        value: group.values[bar.index]
      }))) : model.xs.map((_, index) => {
        const tops = groups.map(group => group.bars.find(bar => bar.index === index)).filter(Boolean);
        if (!tops.length) return null;
        const total = groups.reduce((sum, group) => sum + (group.values[index] ?? 0), 0);
        const outer = tops.reduce((best, bar) => horizontal ? bar.x + bar.width > best.x + best.width ? bar : best : bar.y < best.y ? bar : best);
        return {
          bar: outer,
          value: total
        };
      }).filter(Boolean);

      for (const {
        bar,
        value: raw
      } of ends) {
        if (this.stack === 'normalized') continue;
        const text = this.sayY(raw);
        const long = text.length * font * CHAR;

        if (horizontal) {
          if (bar.height < font || bar.x + bar.width + long + GAP > width) continue;
          valueLabels.push({
            x: bar.x + bar.width + 4,
            y: bar.y + bar.height / 2,
            text,
            anchor: 'start'
          });
        } else {
          if (bar.width < long || bar.y - font < 0) continue;
          valueLabels.push({
            x: bar.x + bar.width / 2,
            y: bar.y - font * 0.6,
            text,
            anchor: 'middle'
          });
        }
      }
    }

    return {
      width,
      height,
      font,
      inner,
      horizontal,
      zero,
      groups,
      lines,
      lineTicks,
      valueTicks,
      categoryTicks,
      valueLabels,
      dots: band.step >= font,
      bands: model.xs.map((_, index) => ({
        from: band.at(index) - (band.step - band.width) / 2,
        size: band.step
      })),
      bandStart: bandRange[0],
      step: band.step,
      value,
      valueLabel: this.yLabel,
      categoryLabel: this.xLabel
    };
  } // A histogram's axis marks: the intervals' edges, every so many, so their
  // texts do not meet. `room` is the room one text needs: a number of px,
  // or a function of the text.


  edgeTicks(model, band, room) {
    const edges = [...model.bins.map(one => one.from), model.bins.at(-1).to];
    const texts = edges.map(value => this.sayEdge(value, model.width));
    const need = Math.max(...texts.map(text => typeof room === 'function' ? room(text) : room));
    const every = Math.max(1, Math.ceil(need / Math.max(1, band.step)));
    const start = band.at(0) - (band.step - band.width) / 2;
    return texts.map((text, index) => ({
      at: start + index * band.step,
      text,
      index
    })).filter(({
      index
    }) => index % every === 0);
  } // A histogram in words: how many values over which range and intervals,
  // then each series' median and its fullest interval.


  summarizeBins(model, shown) {
    const values = model.series.flatMap(one => one.raw);
    const parts = [this.words('summary-bins', {
      count: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_6__.formatNumber)(values.length, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), 'integer'),
      min: this.sayEdge(Math.min(...values)),
      max: this.sayEdge(Math.max(...values)),
      bins: model.bins.length,
      width: this.sayEdge(model.width)
    })];

    for (const one of shown) {
      const facts = (0,_chart_core_describe_js__WEBPACK_IMPORTED_MODULE_9__.seriesFacts)(one.values);
      if (!facts || !one.raw.length) continue;
      parts.push(this.words('summary-bin-series', {
        name: one.name,
        median: this.sayEdge((0,_chart_core_bin_js__WEBPACK_IMPORTED_MODULE_4__.median)(one.raw)),
        range: this.sayX(model, facts.maxAt),
        max: this.sayY(facts.max)
      }));
    }

    if (model.missing) parts.push(this.words('summary-missing', {
      count: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_6__.formatNumber)(model.missing, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), 'integer')
    }));
    return parts.join(' ');
  }

  summarize(model, shown) {
    if (this.summary === 'none') return '';
    if (!model.xs.length) return this.words('summary-empty');
    if (model.kind === 'bin') return this.summarizeBins(model, shown);
    const parts = [this.words('summary-count', {
      count: model.xs.length
    })];
    const lineKeys = this.lineKeys();
    const lines = shown.filter(one => lineKeys.has(one.key)).map(one => one.name);
    if (lines.length) parts.push(this.words('summary-lines', {
      names: lines.join(', ')
    }));

    for (const one of shown) {
      const facts = (0,_chart_core_describe_js__WEBPACK_IMPORTED_MODULE_9__.seriesFacts)(one.values);
      if (!facts) continue;
      parts.push(this.words('summary-series', {
        name: one.name,
        max: this.sayOf(one.key, facts.max),
        maxAt: this.sayX(model, facts.maxAt),
        min: this.sayOf(one.key, facts.min),
        minAt: this.sayX(model, facts.minAt)
      }));
    }

    return parts.join(' ');
  }

  cursorLine(model, cursor) {
    const g = this._geometry;
    const group = g?.groups.find(one => one.key === cursor.series) ?? g?.lines.find(one => one.key === cursor.series);
    const one = group ?? model.series.find(series => series.key === cursor.series);
    if (!one) return '';
    const said = group ? this.sayValue(group, cursor.index) : this.sayOf(one.key, one.values[cursor.index]);
    return this.words('cursor', {
      x: this.sayX(model, cursor.index),
      name: one.name,
      value: said
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
    } // A horizontal chart walks its bars with Up and Down, its series with
    // Left and Right: the arrows follow what the eye sees.


    const turned = this.orientation === 'horizontal' ? {
      ArrowUp: 'ArrowLeft',
      ArrowDown: 'ArrowRight',
      ArrowLeft: 'ArrowUp',
      ArrowRight: 'ArrowDown'
    }[event.key] ?? event.key : event.key;
    const next = (0,_chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_10__.moveCursor)(this._cursor, turned, {
      count: model.xs.length,
      shown
    });
    if (!next) return;
    event.preventDefault();
    this.setCursor(next, {
      say: true
    });
  } // The pointer picks the band under it and, in it, the bar under it (or the
  // nearest series).


  pointAt(event) {
    const g = this._geometry;
    if (!g || !(g.groups.length + g.lines.length)) return null;
    const box = event.currentTarget.getBoundingClientRect();
    const along = g.horizontal ? event.clientY - box.top : event.clientX - box.left;
    const across = g.horizontal ? event.clientX - box.left : event.clientY - box.top;
    const index = Math.floor((along - g.bandStart) / g.step);
    if (index < 0 || index >= g.bands.length) return null;
    let best = null;

    for (const group of g.groups) {
      const bar = group.bars.find(one => one.index === index);
      if (!bar) continue;
      const [from, to] = g.horizontal ? [bar.y, bar.y + bar.height] : [bar.x, bar.x + bar.width];
      const [low, high] = g.horizontal ? [bar.x, bar.x + bar.width] : [bar.y, bar.y + bar.height];
      const inside = along >= from && along <= to;
      const distance = inside && across >= low && across <= high ? 0 : Math.abs(across - (low + high) / 2) + (inside ? 0 : 1e6);
      if (!best || distance < best.distance) best = {
        series: group.key,
        distance
      };
    } // A line's point near the pointer wins over the bar under it.


    for (const line of g.lines) {
      const point = line.points[index];
      if (!point) continue;
      const distance = Math.abs(across - point[1]) - g.font;
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
    if (!one) return; // x as the data gave it, not as the axis reads it.

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
      orientation: this.orientation,
      stack: this.stack,
      label: this.label || this.words('untitled'),
      state,
      model,
      tableModel,
      tableKey: [tableModel, this.label, this.xLabel, this.xFormat, this.yFormat, this.lines, this.lineFormat, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.table, this.table === 'toggle' ? this._view : 'chart'],
      lineKeys: this.lineKeys(),
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
    return (0,_js_templates_default__WEBPACK_IMPORTED_MODULE_14__.renderBarChartTemplate)(this.templateContext());
  }

}

SfBarChart.define('sf-chart-bar');
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "8f122d90c81a"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderBarChartTemplate: () => (/* binding */ renderBarChartTemplate)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2a080a730149");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("21ed19c5c40f");
/* harmony import */ var _default_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("87815406855f");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([lit__WEBPACK_IMPORTED_MODULE_0__]);
var __webpack_async_dependencies_result__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_async_dependencies_result__[0];
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lit__WEBPACK_IMPORTED_MODULE_0__);


 // The figure of a bar chart: the label and the table button, the legend,
// the plot (SVG), the summary and the description, the live line, and the
// same data as a table.
//
// The plot is one Tab stop, a role="group" named by the label and described
// by the summary; its axes and bars are aria-hidden, because the summary,
// the live line and the table say what they show. A colour is a class
// (--c1..--c4), and in forced colours a dash (--d1..--d7) on an outline.
// A series named in lines is a line with points over the bars, on the
// bars' axis or on its own scale with its ticks on the far side. A page's
// own colour (the colors setting, by the series' key) is --custom with its
// value in a style: the dash stays.

const paintOf = paint => paint ? `--sf-chart-bar--custom: ${paint}` : '';

const paintAttr = paint => paint ? ` style="${esc(paintOf(paint))}"` : '';

const colourOf = (place, paint) => `sf-chart-bar-series--${paint ? 'custom' : `c${place % 4 + 1}`}${place > 0 ? ` sf-chart-bar-series--d${Math.min(place, 7)}` : ' sf-chart-bar-series--solid'}`;

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
    inner,
    horizontal
  } = g;
  let out = '<g class="sf-chart-bar-axes" aria-hidden="true">';

  if (g.grid !== 'none') {
    for (const tick of g.valueTicks) {
      if (tick.zero) continue;
      out += horizontal ? `<line class="sf-chart-bar-grid" x1="${px(tick.at)}" x2="${px(tick.at)}" y1="${px(inner.top)}" y2="${px(inner.bottom)}"/>` : `<line class="sf-chart-bar-grid" x1="${px(inner.left)}" x2="${px(inner.right)}" y1="${px(tick.at)}" y2="${px(tick.at)}"/>`;
    }
  }

  for (const tick of g.valueTicks) {
    out += horizontal ? `<text class="sf-chart-bar-tick" x="${px(tick.at)}" y="${px(inner.bottom + g.font * 1.2)}" text-anchor="${tick.anchor}" dominant-baseline="middle">${esc(tick.text)}</text>` : `<text class="sf-chart-bar-tick" x="${px(inner.left - 6)}" y="${px(tick.at)}" text-anchor="end" dominant-baseline="middle">${esc(tick.text)}</text>`;
  }

  for (const tick of g.categoryTicks) {
    out += horizontal ? `<text class="sf-chart-bar-tick" x="${px(inner.left - 6)}" y="${px(tick.at)}" text-anchor="end" dominant-baseline="middle">${esc(tick.text)}</text>` : `<text class="sf-chart-bar-tick sf-chart-bar-tick--x" x="${px(tick.at)}" y="${px(inner.bottom + g.font * 1.2)}" text-anchor="${tick.anchor}" dominant-baseline="middle">${esc(tick.text)}</text>`;
  }

  for (const tick of g.lineTicks) {
    out += `<text class="sf-chart-bar-tick sf-chart-bar-tick--line" x="${px(inner.right + 6)}" y="${px(tick.at)}" text-anchor="start" dominant-baseline="middle">${esc(tick.text)}</text>`;
  }

  if (g.valueLabel) {
    out += horizontal ? `<text class="sf-chart-bar-axis-label" x="${px((inner.left + inner.right) / 2)}" y="${px(g.height - 4)}" text-anchor="middle">${esc(g.valueLabel)}</text>` : `<text class="sf-chart-bar-axis-label" x="${px(inner.left)}" y="${px(g.font)}" text-anchor="start">${esc(g.valueLabel)}</text>`;
  }

  if (g.categoryLabel && !horizontal) {
    out += `<text class="sf-chart-bar-axis-label" x="${px((inner.left + inner.right) / 2)}" y="${px(g.height - 4)}" text-anchor="middle">${esc(g.categoryLabel)}</text>`;
  }

  return `${out}</g>`;
}

function barsMarkup(g, cursor, paint) {
  let out = '<g class="sf-chart-bar-marks" aria-hidden="true">';

  if (cursor) {
    const band = g.bands[cursor.index];
    out += g.horizontal ? `<rect class="sf-chart-bar-band" x="${px(g.inner.left)}" y="${px(band.from)}" width="${px(g.inner.right - g.inner.left)}" height="${px(band.size)}"/>` : `<rect class="sf-chart-bar-band" x="${px(band.from)}" y="${px(g.inner.top)}" width="${px(band.size)}" height="${px(g.inner.bottom - g.inner.top)}"/>`;
  }

  for (const group of g.groups) {
    const dim = cursor && cursor.series !== group.key ? ' sf-chart-bar-series--dim' : '';
    out += `<g class="sf-chart-bar-series ${colourOf(group.place, paint.get(group.key))}${dim}"${paintAttr(paint.get(group.key))} data-series="${esc(group.key)}">`;

    for (const bar of group.bars) out += `<rect class="sf-chart-bar-bar" x="${px(bar.x)}" y="${px(bar.y)}" width="${px(bar.width)}" height="${px(bar.height)}"/>`;

    out += '</g>';
  }

  for (const label of g.valueLabels) {
    out += `<text class="sf-chart-bar-value" x="${px(label.x)}" y="${px(label.y)}" text-anchor="${label.anchor}" dominant-baseline="middle">${esc(label.text)}</text>`;
  } // The baseline at zero, over the bars, so a bar is seen to start there.


  out += g.horizontal ? `<line class="sf-chart-bar-baseline" x1="${px(g.zero)}" x2="${px(g.zero)}" y1="${px(g.inner.top)}" y2="${px(g.inner.bottom)}"/>` : `<line class="sf-chart-bar-baseline" x1="${px(g.inner.left)}" x2="${px(g.inner.right)}" y1="${px(g.zero)}" y2="${px(g.zero)}"/>`;

  for (const line of g.lines) {
    const dim = cursor && cursor.series !== line.key ? ' sf-chart-bar-series--dim' : '';
    out += `<g class="sf-chart-bar-series sf-chart-bar-series--line ${colourOf(line.place, paint.get(line.key))}${dim}"${paintAttr(paint.get(line.key))} data-series="${esc(line.key)}">`;
    out += `<path class="sf-chart-bar-line" d="${line.d}"/>`;
    if (g.dots) for (const point of line.points) if (point) out += `<circle class="sf-chart-bar-dot" cx="${px(point[0])}" cy="${px(point[1])}" r="3"/>`;
    out += '</g>';
  }

  if (cursor) {
    const bar = g.groups.find(group => group.key === cursor.series)?.bars.find(one => one.index === cursor.index);
    const point = g.lines.find(line => line.key === cursor.series)?.points[cursor.index];
    if (bar) out += `<rect class="sf-chart-bar-focus" x="${px(bar.x - 1)}" y="${px(bar.y - 1)}" width="${px(bar.width + 2)}" height="${px(bar.height + 2)}"/>`;
    if (point) out += `<circle class="sf-chart-bar-focus" cx="${px(point[0])}" cy="${px(point[1])}" r="6"/>`;
  }

  return `${out}</g>`;
}

function renderTooltip(context, g, cursor) {
  if (!cursor || context.tooltip === 'none') return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const {
    component,
    model
  } = context;
  const band = g.bands[cursor.index];
  const middle = band.from + band.size / 2;
  const flip = g.horizontal ? false : middle > g.width / 2;
  const at = g.horizontal ? `inset-inline-start: ${px(g.inner.left)}px; inset-block-start: ${px(band.from + band.size)}px` : `inset-inline-start: ${px(middle)}px; inset-block-start: ${px(g.inner.top)}px`;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${`sf-chart-bar-tooltip${flip ? ' sf-chart-bar-tooltip--flip' : ''}`} aria-hidden="true" style=${at}>
      <div class="sf-chart-bar-tooltip-x">${component.sayX(model, cursor.index)}</div>
      ${[...g.groups, ...g.lines].sort((a, b) => a.place - b.place).map(group => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <div class=${['sf-chart-bar-tooltip-row', colourOf(group.place, context.paint.get(group.key)), group.line ? 'sf-chart-bar-series--line' : '', group.key === cursor.series ? 'sf-chart-bar-tooltip-row--current' : ''].filter(Boolean).join(' ')}
             style=${paintOf(context.paint.get(group.key)) || lit__WEBPACK_IMPORTED_MODULE_0__.nothing}>
          <span class="sf-chart-bar-swatch"></span>
          <span class="sf-chart-bar-tooltip-name">${group.name}</span>
          <span class="sf-chart-bar-tooltip-value">${component.sayValue(group, cursor.index)}</span>
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
    <div class=${`sf-chart-bar-legend sf-chart-bar-legend--${place}`} role="group" aria-label=${component.words('legend')}>
      ${model.series.map((one, index) => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <button type="button" class=${`sf-chart-bar-legend-item ${colourOf(index, context.paint.get(one.key))}${context.lineKeys.has(one.key) ? ' sf-chart-bar-series--line' : ''}`}
                style=${paintOf(context.paint.get(one.key)) || lit__WEBPACK_IMPORTED_MODULE_0__.nothing} aria-pressed=${hidden.has(one.key) ? 'false' : 'true'}
                data-series=${one.key} @click=${() => component.toggleSeries(one.key)}>
          <span class="sf-chart-bar-swatch" aria-hidden="true"></span>
          <span class="sf-chart-bar-legend-name">${one.name}</span>
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
    <div class=${shownTable ? 'sf-chart-bar-table' : 'sf-chart-bar-sr'}>
      <table>
        <caption>${label}</caption>
        <thead>
          <tr>
            <th scope="col">${context.xLabel || model.xField || component.words('x-column')}</th>
            ${model.series.map(one => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<th scope="col">${one.name}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${model.order.map(index => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
            <tr>
              <th scope="row">${component.sayX(model, index)}</th>
              ${model.series.map(one => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<td>${component.sayOf(one.key, one.values[index])}</td>`)}
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
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-bar-loading" role="status" aria-busy="true"><span class="sf-chart-bar-sr">${component.words('loading')}</span></div>`;
  }

  if (state === 'empty' || state === 'error') {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
      <sf-empty-state class="sf-chart-bar-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
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
    <svg class="sf-chart-bar-svg" role="group" tabindex="0" focusable="true"
         aria-label=${context.label} aria-roledescription=${component.words('roledescription')}
         aria-describedby=${described || lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
         width=${g.width} height=${g.height} viewBox=${`0 0 ${g.width} ${g.height}`}
         @keydown=${event => component.onPlotKey(event)}
         @pointermove=${event => component.onPointerMove(event)}
         @pointerleave=${() => component.onPointerLeave()}
         @click=${event => component.onPlotClick(event)}
         @blur=${() => component.setCursor(null)}
         .innerHTML=${axesMarkup({ ...g,
    grid: context.grid
  }) + barsMarkup(g, cursor, context.paint)}>
    </svg>
    ${renderTooltip(context, g, cursor)}
  `;
}

function renderBarChartTemplate(context) {
  const {
    component,
    uid,
    state
  } = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  const classes = ['sf-chart-bar', `sf-chart-bar--size-${size}`, `sf-chart-bar--${state}`, `sf-chart-bar--${context.orientation}`, `sf-chart-bar--stack-${context.stack}`, context.rootClass];
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <figure class=${classes.filter(Boolean).join(' ')} aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-chart-bar-head">
        <span class="sf-chart-bar-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.table === 'toggle' && state === 'ready' ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<button type="button" class="sf-chart-bar-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      </figcaption>
      ${renderLegend(context, 'top')}
      <div class="sf-chart-bar-plot" ?hidden=${tableView}>${renderPlot(context)}</div>
      ${renderLegend(context, 'bottom')}
      ${context.summaryText ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<p class="sf-chart-bar-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      ${context.hasDescription ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-bar-description" id=${`${uid}-description`}>${context.description}</div>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      <div class="sf-chart-bar-sr" aria-live="polite">${context.said}</div>
      ${renderTable(context)}
    </figure>
  `;
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "0a702284fcba"
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   binEdges: () => (/* binding */ binEdges),
/* harmony export */   binOf: () => (/* binding */ binOf),
/* harmony export */   binSeries: () => (/* binding */ binSeries),
/* harmony export */   median: () => (/* binding */ median)
/* harmony export */ });
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("37677343b39a");
/* harmony import */ var _scale_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("e8bb19218bf5");
// The bins of a histogram (docs/research/catalogue.md, Histogram): the rows
// are observations of one measure, cut into intervals of one width, and each
// bar is the count (or the sum of a weight) of the rows in its interval. An
// interval holds its start and not its end, but the last holds both, so the
// largest value is counted.


/**
 * The bins' edges for values from `min` to `max`: {start, width, count}.
 * `bin` is 'auto' (about Sturges' count of bins for `n` values, on a round
 * width) or a width; the edges fall on multiples of the width.
 */

function binEdges(min, max, n, bin = 'auto') {
  const asked = (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.readNumber)(bin);
  let width = asked !== null && asked > 0 ? asked : 0;

  if (!width) {
    const wanted = Math.max(1, Math.min(50, Math.ceil(Math.log2(Math.max(1, n)) + 1)));
    width = max > min ? (0,_scale_js__WEBPACK_IMPORTED_MODULE_1__.niceTicks)(min, max, wanted, {
      nice: false
    }).step : 1;
  }

  const start = Math.floor(min / width + 1e-9) * width;
  let count = Math.max(1, Math.ceil((max - start) / width - 1e-9)); // The largest value on an edge belongs to the last bin, not a new one.

  if (start + count * width < max) count += 1;
  return {
    start: Number(start.toPrecision(12)),
    width,
    count: Math.min(count, 1000)
  };
}
/** The place of a value among the bins, or -1 outside them. */

function binOf(value, {
  start,
  width,
  count
}) {
  if (value < start) return -1;
  const place = Math.floor((value - start) / width + 1e-9);
  if (place < count) return place;
  return value <= start + count * width + width * 1e-9 ? count - 1 : -1;
}
/** The middle value of a list of numbers, or null when it is empty. */

function median(values) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = sorted.length >> 1;
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}
/**
 * The model of a histogram in the shape of chart-core/data's readSeries:
 * {kind: 'bin', xField, keys, xs, labels, series, bins, width, missing}.
 *
 * `x` is the measure (the first numeric field when unset); `y` a weight
 * field to sum, or a count when unset; `series` splits the rows. A series
 * keeps its raw values, so the summary can say its median. A row without
 * the measure is left out and counted.
 */

function binSeries(items, {
  x = '',
  y = '',
  series = '',
  bin = 'auto',
  names = {},
  countName = 'count'
} = {}) {
  const rows = (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.readRows)(items);
  const fields = rows.length ? Object.keys(rows[0]) : [];
  const xField = x || fields.find(name => name !== series && rows.some(row => (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.readNumber)(row[name]) !== null)) || '';
  const weight = String(y || '').split(',')[0].trim();
  const groups = new Map();
  let missing = 0;
  let min = Infinity;
  let max = -Infinity;
  const kept = [];

  for (const row of rows) {
    const value = (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.readNumber)(row[xField]);

    if (value === null) {
      missing += 1;
      continue;
    }

    const key = series ? row[series] === undefined || row[series] === null ? '' : String(row[series]) : weight || countName;
    if (!groups.has(key)) groups.set(key, []);
    kept.push([key, value, weight ? (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.readNumber)(row[weight]) ?? 0 : 1]);
    groups.get(key).push(value);
    if (value < min) min = value;
    if (value > max) max = value;
  }

  if (!kept.length) return {
    kind: 'bin',
    xField,
    keys: [],
    xs: [],
    labels: [],
    series: [],
    bins: [],
    width: 0,
    missing
  };
  const edges = binEdges(min, max, kept.length, bin);
  const bins = Array.from({
    length: edges.count
  }, (_, index) => {
    const from = Number((edges.start + index * edges.width).toPrecision(12));
    return {
      from,
      to: Number((from + edges.width).toPrecision(12))
    };
  });
  const out = [...groups.keys()].map(key => ({
    key,
    name: names[key] ?? (series || weight ? key : countName),
    values: new Array(bins.length).fill(0),
    raw: groups.get(key)
  }));
  const at = new Map(out.map((one, place) => [one.key, place]));

  for (const [key, value, amount] of kept) {
    const place = binOf(value, edges);
    if (place >= 0) out[at.get(key)].values[place] += amount;
  }

  const labels = bins.map(({
    from,
    to
  }) => `${from}–${to}`);
  return {
    kind: 'bin',
    xField,
    keys: labels,
    xs: bins.map((_, index) => index),
    labels,
    series: out,
    bins,
    width: edges.width,
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

/***/ "87815406855f"
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

/***/ "031ab9e7c8db"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"id":"smart.chart-bar","tag":"sf-chart-bar","version":"0.5.0","kind":"leaf","settings":{"label":{"type":"string","default":""},"items":{"type":"list","default":[],"of":"object"},"names":{"type":"object","default":{}},"colors":{"type":"object","default":{}},"palette":{"type":"enum","values":["theme","vivid","soft","warm","cool","brand"],"default":"theme"},"x":{"type":"string","default":""},"y":{"type":"string","default":""},"series":{"type":"string","default":""},"bin":{"type":"string","default":"none"},"x-scale":{"type":"enum","values":["auto","time","category"],"default":"auto"},"y-max":{"type":"number","optional":true},"stack":{"type":"enum","values":["none","stacked","normalized"],"default":"none"},"lines":{"type":"string","default":""},"line-axis":{"type":"enum","values":["shared","own"],"default":"shared"},"line-format":{"type":"string","default":""},"orientation":{"type":"enum","values":["vertical","horizontal"],"default":"vertical"},"sort":{"type":"enum","values":["none","ascending","descending"],"default":"none"},"value-labels":{"type":"enum","values":["none","end"],"default":"none"},"legend":{"type":"enum","values":["auto","top","bottom","none"],"default":"auto"},"tooltip":{"type":"enum","values":["axis","none"],"default":"axis"},"grid":{"type":"enum","values":["value","none"],"default":"value"},"x-label":{"type":"string","default":""},"y-label":{"type":"string","default":""},"x-format":{"type":"string","default":"auto"},"y-format":{"type":"string","default":"number"},"size":{"type":"enum","values":["1/2","1","2"],"default":"1"},"table":{"type":"enum","values":["toggle","visible","hidden"],"default":"toggle"},"summary":{"type":"enum","values":["auto","none"],"default":"auto"},"data-state":{"type":"enum","values":["auto","loading","ready","empty","error"],"default":"auto"}},"values":{"hidden-series":{"type":"list","default":[],"of":"string"}},"events":{"toggle":{"carries":{"id":"string","hidden":"boolean"}},"select":{"carries":{"series":"string","index":"number","x":"string","value":"number"}},"refresh":{"carries":{}}},"actions":{"reset":{"with":{}}},"presentation":{"skeleton":{"late":["items"]}},"css-variables":{"--sf-chart-bar-height":{"type":"length","state":"default"},"--sf-chart-bar-grid-color":{"type":"color","state":"default"},"--sf-chart-bar-baseline-color":{"type":"color","state":"default"},"--sf-chart-bar-label-color":{"type":"color","state":"default"},"--sf-chart-bar-hover-background-color":{"type":"color","state":"hover"},"--sf-chart-bar-hidden-color":{"type":"color","state":"disabled"},"--sf-chart-bar-bar-radius":{"type":"length","state":"default"}}}');

/***/ },

/***/ "3a73307bc0af"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Bar chart","runtime":{"untitled":"Chart","roledescription":"bar chart","summary-empty":"No data.","cursor":"{x}, {name}: {value}","gap":"no data","show-table":"Table","legend":"Series","loading":"Loading the chart\'s data","empty-title":"No data for the chart","error-title":"Could not load the data","x-column":"Category","summary-count":"Categories: {count}.","summary-series":"{name}: highest {max} ({maxAt}), lowest {min} ({minAt}).","summary-lines":"As lines: {names}.","share":"{share} ({value})","count":"Count","bin-range":"{from} – {to}","summary-bins":"Values: {count}, from {min} to {max}; intervals: {bins}, {width} wide.","summary-bin-series":"{name}: median {median}, most in {range} ({max}).","summary-missing":"Rows without a value: {count}."},"events":{"toggle":{"label":"Hide or show a series"},"select":{"label":"Choose a bar"},"refresh":{"label":"Load the data again"}},"actions":{"reset":{"label":"Show every series"}}}');

/***/ },

/***/ "c2d1e8a022e2"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Столбчатая диаграмма","runtime":{"untitled":"Диаграмма","roledescription":"диаграмма","summary-empty":"Нет данных.","cursor":"{x}, {name}: {value}","gap":"нет данных","show-table":"Таблица","legend":"Ряды","loading":"Загрузка данных диаграммы","empty-title":"Нет данных для диаграммы","error-title":"Не удалось загрузить данные","x-column":"Категория","summary-count":"Категорий: {count}.","summary-series":"{name}: наибольшее {max} ({maxAt}), наименьшее {min} ({minAt}).","summary-lines":"Линией: {names}.","share":"{share} ({value})","count":"Количество","bin-range":"{from} – {to}","summary-bins":"Значений: {count}, от {min} до {max}; интервалов: {bins}, шириной {width}.","summary-bin-series":"{name}: медиана {median}, больше всего — {range} ({max}).","summary-missing":"Строк без значения: {count}."},"events":{"toggle":{"label":"Скрыть или показать ряд"},"select":{"label":"Выбрать столбец"},"refresh":{"label":"Загрузить данные заново"}},"actions":{"reset":{"label":"Показать все ряды"}}}');

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
/******/ 	let __webpack_exports__ = __webpack_require__("96c93ab4f196");
/******/
/******/ })()
;