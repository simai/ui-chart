/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "89e3a84cfce0"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("deb1a4d61565");
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("5b7d7695b41b");
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("43090d1c8307");
/* harmony import */ var _chart_core_scale_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("600acbab746d");
/* harmony import */ var _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("dd0c3978091b");
/* harmony import */ var _chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("43efc6ca45fc");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("297fd25a909a");
/* harmony import */ var _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("8c84a9c1df25");
/* harmony import */ var _js_ohlc_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("3bb707f34e99");
/* harmony import */ var _js_templates_default__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("1b7d4668a8f3");
/* harmony import */ var _component_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("8f8a46f72512");
/* harmony import */ var _lang_en_json__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("c19134f0126e");
/* harmony import */ var _lang_ru_json__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("cdd542a1bc42");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_scale_js__WEBPACK_IMPORTED_MODULE_3__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__, _chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_5__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_6__, _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7__, _js_ohlc_js__WEBPACK_IMPORTED_MODULE_8__, _js_templates_default__WEBPACK_IMPORTED_MODULE_9__]);
([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_scale_js__WEBPACK_IMPORTED_MODULE_3__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__, _chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_5__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_6__, _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7__, _js_ohlc_js__WEBPACK_IMPORTED_MODULE_8__, _js_templates_default__WEBPACK_IMPORTED_MODULE_9__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _chart_core_scale_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_chart_core_settle_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7__);
// sf-chart-candlestick: a candlestick chart, the open, high, low and close
// of each period, for prices (docs/research/catalogue.md, Candlestick;
// docs/DECISIONS.md D10).
//
// The element reads its rows once into candles (js/ohlc), measures
// its plot, and draws in SVG a candle per period side by side on a value
// axis, merging neighbours as a longer period when they are more than the
// width holds. A rising period is a hollow body and a falling one a filled
// body, in the success and error tones, so the direction never rests on
// colour alone. A person reaches the plot with one Tab stop and walks the
// candles with the arrows (chart-core/cursor); every move is said in a
// polite live region, the chart as a whole in a summary sentence, and the
// same data is a table on request.
//
// It renders into its own light DOM, like every Smart component.












 // The text of the plot, in px, by size rung, as on the line chart.

const FONT = {
  '1/2': 11,
  1: 12,
  2: 14
}; // The widest a candle's body is drawn, in px, by size rung.

const WIDEST = {
  '1/2': 12,
  1: 16,
  2: 24
}; // The least room a candle takes, in px: below it, neighbours merge.

const LEAST = 3;
const CHAR = 0.6;
const GAP = 8;
const ChartCandlestickElement = (0,_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__.elementFromManifest)(_component_json__WEBPACK_IMPORTED_MODULE_10__, {
  base: (_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default()),
  lang: {
    en: _lang_en_json__WEBPACK_IMPORTED_MODULE_11__,
    ru: _lang_ru_json__WEBPACK_IMPORTED_MODULE_12__
  },
  source: 'ru',
  actions: {
    reset() {
      this._cursor = null;
      this.requestComponentUpdate('reset');
    }

  }
});
let instances = 0;

class SfCandlestick extends ChartCandlestickElement {
  static get props() {
    return { ...super.props,
      rootClass: {
        default: ''
      }
    };
  }

  onConnected() {
    this._uid = this.id || `sf-chart-candlestick-${instances += 1}`;
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
      (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7__.checkContrast)(this, colours, 'sf-chart-candlestick');
    }

    const plot = this.querySelector('.sf-chart-candlestick-plot');

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
  } // The page's own colours of up and down (chart-core/colors), read again
  // only when the setting changes.


  colours() {
    if (this.colors !== this._coloursRaw || !this._colours) {
      this._coloursRaw = this.colors;
      const all = (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7__.readColours)(this.colors, said => console.warn(`<sf-chart-candlestick> ${said}`));
      this._colours = new Map([...all].filter(([key]) => key === 'up' || key === 'down'));
    }

    return this._colours;
  }

  words(key, vars) {
    return this.sfWord(key, vars ? {
      vars
    } : undefined);
  } // The rows as candles, read again only when the data or its mapping
  // changes.


  model() {
    const key = [this.items, this.x, this.open, this.high, this.low, this.close];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;
    const model = (0,_js_ohlc_js__WEBPACK_IMPORTED_MODULE_8__.ohlcRows)(this.items, {
      x: this.x,
      open: this.open || 'open',
      high: this.high || 'high',
      low: this.low || 'low',
      close: this.close || 'close'
    });
    model.unit = model.kind === 'time' ? (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.timeUnitOf)(model.candles.map(one => one.x)) : 'day';
    this._model = model;
    return model;
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.candles.length ? 'ready' : 'empty';
  }

  sayY(value, step = 0) {
    return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(value, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.yFormat, {
      step,
      gap: this.words('gap')
    });
  } // A candle's period: its date in full, or its label.


  sayX(model, candle) {
    if (model.kind !== 'time') return candle.label || this.words('candle-n', {
      n: String(candle.row + 1)
    });
    return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatTime)(candle.x, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), model.unit, {
      form: 'full',
      format: this.xFormat
    });
  } // A drawn candle's period: one, or from its first to its last when merged.


  sayPeriod(model, candle) {
    if (!candle.count || candle.count < 2) return this.sayX(model, candle);
    const last = model.candles[candle.from + candle.count - 1];
    return this.words('period', {
      from: this.sayX(model, candle),
      to: this.sayX(model, last)
    });
  } // A change from one price to another, signed, with its share.


  sayChange(from, to) {
    const locale = (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this);
    const change = to - from;
    const sign = change > 0 ? '+' : change < 0 ? '−' : '';
    const share = from ? (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(Math.abs(change / from), locale, 'percent') : '';
    const amount = `${sign}${this.sayY(Math.abs(change))}`;
    return share ? `${amount} (${sign}${share})` : amount;
  } // Where everything goes: the plot's inner box, the value scale, the
  // candles (merged when they crowd) and the axis labels. Null until the
  // plot has a width.


  geometry(model) {
    const {
      width,
      height
    } = this._box;
    if (!width || !height) return null;
    const font = FONT[this.size] ?? 12;
    let [low, high] = (0,_js_ohlc_js__WEBPACK_IMPORTED_MODULE_8__.ohlcExtent)(model.candles) ?? [0, 1];
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
    const y = (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_3__.linearScale)([ticks.min, ticks.max], [inner.bottom, inner.top]); // Neighbours merge as a longer period when a candle would take less
    // than its least room.

    const room = inner.right - inner.left;
    const size = Math.max(1, Math.ceil(model.candles.length * LEAST / Math.max(1, room)));
    const drawn = (0,_js_ohlc_js__WEBPACK_IMPORTED_MODULE_8__.mergeCandles)(model.candles, size);
    const band = (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_3__.bandScale)(drawn.length, [inner.left, inner.right], {
      padding: 0.3
    });
    const body = Math.max(1, Math.min(WIDEST[this.size] ?? 16, band.width));
    const candles = drawn.map((one, index) => {
      const cx = band.at(index) + band.width / 2;
      const yOpen = y(one.open);
      const yClose = y(one.close);
      return { ...one,
        index,
        cx,
        half: body / 2,
        yHigh: y(one.high),
        yLow: y(one.low),
        yOpen,
        yClose,
        top: Math.min(yOpen, yClose),
        bottom: Math.max(yOpen, yClose)
      };
    }); // The axis labels: on a time axis at the first candle of each calendar
    // period, else every so many; never closer than a label's width.

    let places;
    let say;

    if (model.kind === 'time' && drawn.length) {
      const times = drawn.map(one => one.x);
      const calendar = (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_3__.timeTicks)(times[0], times[times.length - 1], (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_3__.tickCount)(room, font * CHAR * 10));
      places = (0,_js_ohlc_js__WEBPACK_IMPORTED_MODULE_8__.tickPlaces)(times, calendar.ticks);

      say = index => (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatTime)(drawn[index].x, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), calendar.unit);
    } else {
      places = drawn.map((_, index) => index);

      say = index => drawn[index].label;
    }

    const xTicks = [];
    let last = -Infinity;

    for (const index of places) {
      const text = say(index);
      const at = candles[index].cx;
      const half = text.length * font * CHAR * 1.2 / 2;
      if (at - half < last + GAP) continue;
      if (at - half < 0 || at + half > width) continue;
      xTicks.push({
        at,
        text
      });
      last = at + half;
    }

    return {
      width,
      height,
      font,
      inner,
      candles,
      band,
      size,
      valueTicks: ticks.ticks.map((value, index) => ({
        at: y(value),
        text: texts[index]
      })),
      xTicks
    };
  }

  summarize(model) {
    if (this.summary === 'none') return '';
    const {
      candles
    } = model;
    if (!candles.length) return this.words('summary-empty');
    const locale = (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this);
    const first = candles[0];
    const last = candles[candles.length - 1];
    let highest = first;
    let lowest = first;
    let up = 0;

    for (const one of candles) {
      if (one.high > highest.high) highest = one;
      if (one.low < lowest.low) lowest = one;
      if (one.close > one.open) up += 1;
    }

    const down = candles.filter(one => one.close < one.open).length;
    const parts = [this.words('summary-range', {
      count: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(candles.length, locale, 'integer'),
      from: this.sayX(model, first),
      to: this.sayX(model, last)
    }), this.words('summary-change', {
      open: this.sayY(first.open),
      close: this.sayY(last.close),
      change: this.sayChange(first.open, last.close)
    }), this.words('summary-extremes', {
      high: this.sayY(highest.high),
      highAt: this.sayX(model, highest),
      low: this.sayY(lowest.low),
      lowAt: this.sayX(model, lowest)
    }), this.words('summary-days', {
      up: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(up, locale, 'integer'),
      down: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(down, locale, 'integer')
    })];
    if (model.missing) parts.push(this.words('summary-missing', {
      count: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(model.missing, locale, 'integer')
    }));
    return parts.join(' ');
  } // A drawn candle as one sentence: its period, its four prices and its
  // change.


  candleLine(model, candle) {
    return this.words('cursor', {
      period: this.sayPeriod(model, candle),
      open: this.sayY(candle.open),
      high: this.sayY(candle.high),
      low: this.sayY(candle.low),
      close: this.sayY(candle.close),
      change: this.sayChange(candle.open, candle.close)
    });
  }

  cursorCandle(cursor = this._cursor) {
    const geometry = this._geometry;
    if (!cursor || !geometry) return null;
    return geometry.candles[cursor.index] ?? null;
  }

  setCursor(cursor, {
    say = false
  } = {}) {
    this._cursor = cursor;
    const candle = this.cursorCandle(cursor);
    if (say && candle) this._said = this.candleLine(this.model(), candle);
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
      this.choose(this.cursorCandle());
      return;
    } // Up and Down have no series to cross: they are not the cursor's.


    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') return;
    const next = (0,_chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_5__.moveCursor)(this._cursor, event.key, {
      count: geometry.candles.length,
      shown: ['candle']
    });
    if (next === null) return;
    event.preventDefault();
    this.setCursor(next, {
      say: true
    });
  } // The pointer picks the candle whose band it is over.


  placeAt(event) {
    const geometry = this._geometry;
    if (!geometry || !geometry.candles.length) return null;
    const box = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - box.left;
    if (x < geometry.inner.left || x > geometry.inner.right) return null;
    const index = Math.max(0, Math.min(geometry.candles.length - 1, Math.floor((x - geometry.inner.left) / geometry.band.step)));
    return {
      index,
      series: 'candle'
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
    if (place) this.choose(this.cursorCandle(place));
  }

  choose(candle) {
    if (!candle) return;
    this.sfEmit('select', {
      index: candle.from ?? candle.index,
      row: candle.row,
      x: candle.label,
      open: candle.open,
      high: candle.high,
      low: candle.low,
      close: candle.close
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
      tableKey: [tableModel, this.label, this.xLabel, this.xFormat, this.yFormat, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.table, this.table === 'toggle' ? this._view : 'chart'],
      geometry,
      cursor: this.cursorCandle(),
      said: this._said,
      view: this.table === 'toggle' ? this._view : 'chart',
      legend: this.legend === 'auto' ? 'top' : this.legend,
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

    return (0,_chart_core_settle_js__WEBPACK_IMPORTED_MODULE_6__.settled)(this._table, model, {
      later: () => this.requestComponentUpdate('table')
    });
  }

  template() {
    return (0,_js_templates_default__WEBPACK_IMPORTED_MODULE_9__.renderCandlestickTemplate)(this.templateContext());
  }

}

SfCandlestick.define('sf-chart-candlestick');
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "3bb707f34e99"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mergeCandles: () => (/* binding */ mergeCandles),
/* harmony export */   ohlcExtent: () => (/* binding */ ohlcExtent),
/* harmony export */   ohlcRows: () => (/* binding */ ohlcRows),
/* harmony export */   tickPlaces: () => (/* binding */ tickPlaces)
/* harmony export */ });
/* harmony import */ var _chart_core_data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1a60ce635d04");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_chart_core_data_js__WEBPACK_IMPORTED_MODULE_0__]);
var __webpack_async_dependencies_result__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
_chart_core_data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_async_dependencies_result__[0];
/* harmony import */ var _chart_core_data_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_chart_core_data_js__WEBPACK_IMPORTED_MODULE_0__);
// The candles of a candlestick chart (docs/research/catalogue.md,
// Candlestick): each row a period with its open, high, low and close
// (parameters.md §2, OHLC). The candles stand in their periods' order, one
// beside the next, so a day without trading leaves no hole; when they are
// more than the width holds, neighbours are merged as a longer period is.

/**
 * The candles of rows: {xField, kind, candles, missing}. kind is 'time'
 * when every x reads as a time (the candles then go in time order), else
 * 'category'. A candle is {row, x, label, open, high, low, close, up}; a
 * row without all four prices is left out and counted. high and low are
 * held to take in the open and the close.
 */

function ohlcRows(items, {
  x = '',
  open = 'open',
  high = 'high',
  low = 'low',
  close = 'close'
} = {}) {
  const rows = (0,_chart_core_data_js__WEBPACK_IMPORTED_MODULE_0__.readRows)(items);
  const fields = rows.length ? Object.keys(rows[0]) : [];
  const xField = x || fields.find(name => ![open, high, low, close].includes(name)) || '';
  const times = rows.map(row => (0,_chart_core_data_js__WEBPACK_IMPORTED_MODULE_0__.readTime)(row[xField]));
  const kind = rows.length && times.every(time => time !== null) ? 'time' : 'category';
  const candles = [];
  let missing = 0;
  rows.forEach((row, index) => {
    const prices = [open, high, low, close].map(name => (0,_chart_core_data_js__WEBPACK_IMPORTED_MODULE_0__.readNumber)(row[name]));

    if (prices.some(value => value === null)) {
      missing += 1;
      return;
    }

    const [o, h, l, c] = prices;
    candles.push({
      row: index,
      x: kind === 'time' ? times[index] : index,
      label: row[xField] === undefined || row[xField] === null ? '' : String(row[xField]),
      open: o,
      high: Math.max(h, o, c),
      low: Math.min(l, o, c),
      close: c,
      up: c >= o
    });
  });
  if (kind === 'time') candles.sort((a, b) => a.x - b.x);
  return {
    xField,
    kind,
    candles,
    missing
  };
}
/**
 * Neighbouring candles merged `size` at a time, as a longer period: the
 * first's open, the last's close, the highest high, the lowest low. A
 * merged candle keeps its first's x and label, the place of its first
 * candle (`from`) and how many it holds (`count`).
 */

function mergeCandles(candles, size) {
  if (size <= 1) return candles.map((one, index) => ({ ...one,
    from: index,
    count: 1
  }));
  const out = [];

  for (let from = 0; from < candles.length; from += size) {
    const part = candles.slice(from, from + size);
    const first = part[0];
    const last = part[part.length - 1];
    out.push({ ...first,
      high: Math.max(...part.map(one => one.high)),
      low: Math.min(...part.map(one => one.low)),
      close: last.close,
      up: last.close >= first.open,
      from,
      count: part.length
    });
  }

  return out;
}
/** The lowest low and the highest high, or null without candles. */

function ohlcExtent(candles) {
  if (!candles.length) return null;
  let low = Infinity;
  let high = -Infinity;

  for (const one of candles) {
    if (one.low < low) low = one.low;
    if (one.high > high) high = one.high;
  }

  return [low, high];
}
/** The places of the first candle at or after each tick time, each once. */

function tickPlaces(times, ticks) {
  const out = [];
  let at = 0;

  for (const tick of ticks) {
    while (at < times.length && times[at] < tick) at += 1;

    if (at >= times.length) break;
    if (out[out.length - 1] !== at) out.push(at);
  }

  return out;
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "1b7d4668a8f3"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderCandlestickTemplate: () => (/* binding */ renderCandlestickTemplate)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2a080a730149");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("297fd25a909a");
/* harmony import */ var _default_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("ad47591bd16f");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([lit__WEBPACK_IMPORTED_MODULE_0__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__]);
([lit__WEBPACK_IMPORTED_MODULE_0__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__);


 // The figure of a candlestick chart: the label and the table button, the
// key of rise and fall, the plot (SVG), the summary and the description, the
// live line, and the same data as a table.
//
// The plot is one Tab stop, a role="group" named by the label and described
// by the summary; its axes and candles are aria-hidden, because the summary,
// the live line and the table say what they show. A rising period is a
// hollow body in the success tone and a falling one a filled body in the
// error tone; with shape="bar" the open is a tick to the left and the
// close a tick to the right. So the direction reads in forced colours and
// in print too. A page's own colour (the colors setting, by up and down) is
// set in a style as --up or --down.

const px = value => `${Math.round(value * 10) / 10}`;

const directionOf = up => up ? 'up' : 'down';

const paintOf = (paint, key) => paint.get(key) ? `--sf-chart-candlestick--${key}: ${paint.get(key)}` : ''; // The plot's inside is SVG markup set as the svg element's innerHTML (a
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
  let out = '<g class="sf-chart-candlestick-axes" aria-hidden="true">';

  if (g.grid !== 'none') {
    for (const tick of g.valueTicks) {
      out += `<line class="sf-chart-candlestick-grid" x1="${px(inner.left)}" x2="${px(inner.right)}" y1="${px(tick.at)}" y2="${px(tick.at)}"/>`;
    }
  }

  out += `<line class="sf-chart-candlestick-baseline" x1="${px(inner.left)}" x2="${px(inner.right)}" y1="${px(inner.bottom)}" y2="${px(inner.bottom)}"/>`;

  for (const tick of g.valueTicks) {
    out += `<text class="sf-chart-candlestick-tick" x="${px(inner.left - 6)}" y="${px(tick.at)}" text-anchor="end" dominant-baseline="middle">${esc(tick.text)}</text>`;
  }

  for (const tick of g.xTicks) {
    out += `<text class="sf-chart-candlestick-tick" x="${px(tick.at)}" y="${px(inner.bottom + g.font * 1.2)}" text-anchor="middle" dominant-baseline="middle">${esc(tick.text)}</text>`;
  }

  if (g.yLabel) out += `<text class="sf-chart-candlestick-axis-label" x="${px(inner.left)}" y="${px(g.font)}" text-anchor="start">${esc(g.yLabel)}</text>`;
  if (g.xLabel) out += `<text class="sf-chart-candlestick-axis-label" x="${px((inner.left + inner.right) / 2)}" y="${px(g.height - 4)}" text-anchor="middle">${esc(g.xLabel)}</text>`;
  return `${out}</g>`;
} // A candle: the wick from high to low and the body from open to close; or,
// as a bar, the line from high to low with the open's tick to the left and
// the close's to the right. Each direction is one group, so a class sets
// its tone once, and its wicks (or bars) one path.


function candlesMarkup(g, paint, shape) {
  const lines = {
    up: '',
    down: ''
  };
  const bodies = {
    up: '',
    down: ''
  };

  for (const one of g.candles) {
    const {
      cx,
      half
    } = one;
    const key = directionOf(one.up);

    if (shape === 'bar') {
      lines[key] += `M${px(cx)} ${px(one.yHigh)}V${px(one.yLow)}M${px(cx - half)} ${px(one.yOpen)}H${px(cx)}M${px(cx)} ${px(one.yClose)}H${px(cx + half)}`;
    } else {
      lines[key] += `M${px(cx)} ${px(one.yHigh)}V${px(one.top)}M${px(cx)} ${px(one.bottom)}V${px(one.yLow)}`;
      bodies[key] += `<rect class="sf-chart-candlestick-body" x="${px(cx - half)}" y="${px(one.top)}" width="${px(half * 2)}" height="${px(Math.max(1, one.bottom - one.top))}"/>`;
    }
  }

  const styleOf = key => paint.get(key) ? ` style="${esc(paintOf(paint, key))}"` : '';

  const lineOf = key => lines[key] ? `<path class="sf-chart-candlestick-${shape === 'bar' ? 'bar' : 'wick'}" d="${lines[key]}"/>` : '';

  return `<g class="sf-chart-candlestick-marks" aria-hidden="true">${['up', 'down'].map(key => `<g class="sf-chart-candlestick-${key}"${styleOf(key)} data-direction="${key}">${lineOf(key)}${bodies[key]}</g>`).join('')}</g>`;
} // The cursor: the candle's band lit behind it and a guide line at its close.


function cursorMarkup(g, one) {
  if (!one) return '';
  let out = '<g class="sf-chart-candlestick-cursor" aria-hidden="true">';
  out += `<rect class="sf-chart-candlestick-lane" x="${px(one.cx - g.band.step / 2)}" y="${px(g.inner.top)}" width="${px(g.band.step)}" height="${px(g.inner.bottom - g.inner.top)}"/>`;
  out += `<line class="sf-chart-candlestick-crosshair" x1="${px(g.inner.left)}" x2="${px(g.inner.right)}" y1="${px(one.yClose)}" y2="${px(one.yClose)}"/>`;
  out += `<rect class="sf-chart-candlestick-ring" x="${px(one.cx - one.half - 3)}" y="${px(one.yHigh - 3)}" width="${px(one.half * 2 + 6)}" height="${px(one.yLow - one.yHigh + 6)}" rx="2"/>`;
  return `${out}</g>`;
}

const swatchMarkup = () => '<svg viewBox="0 0 12 12" focusable="false"><path class="sf-chart-candlestick-wick" d="M6 0V3M6 9V12"/><rect class="sf-chart-candlestick-body" x="3" y="3" width="6" height="6"/></svg>';

function renderKey(context, place) {
  if (context.legend !== place || context.state !== 'ready') return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const {
    component,
    paint
  } = context;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <ul class=${`sf-chart-candlestick-legend sf-chart-candlestick-legend--${place}`} aria-label=${component.words('legend')}>
      ${['up', 'down'].map(key => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <li class=${`sf-chart-candlestick-legend-item sf-chart-candlestick-${key}`} style=${paintOf(paint, key) || lit__WEBPACK_IMPORTED_MODULE_0__.nothing}>
          <span class="sf-chart-candlestick-swatch" aria-hidden="true" .innerHTML=${swatchMarkup()}></span>
          <span>${component.words(key)}</span>
        </li>
      `)}
    </ul>
  `;
}

function renderTooltip(context, g, one) {
  if (!one || context.tooltip === 'none') return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const {
    component,
    model
  } = context;
  const flip = one.cx > g.width / 2;
  const rows = [['open', one.open], ['high', one.high], ['low', one.low], ['close', one.close]];
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${`sf-chart-candlestick-tooltip${flip ? ' sf-chart-candlestick-tooltip--flip' : ''}`} aria-hidden="true"
         style=${`inset-inline-start: ${px(one.cx)}px; inset-block-start: ${px((one.yHigh + one.yLow) / 2)}px; --sf-chart-candlestick--reach: ${px(one.half)}`}>
      <div class="sf-chart-candlestick-tooltip-name">${component.sayPeriod(model, one)}</div>
      ${rows.map(([key, value]) => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <div class="sf-chart-candlestick-tooltip-row">
          <span>${component.words(key)}</span>
          <span class="sf-chart-candlestick-tooltip-value">${component.sayY(value)}</span>
        </div>
      `)}
      <div class=${`sf-chart-candlestick-tooltip-row sf-chart-candlestick-tooltip-change sf-chart-candlestick-${directionOf(one.up)}`} style=${paintOf(context.paint, directionOf(one.up)) || lit__WEBPACK_IMPORTED_MODULE_0__.nothing}>
        <span>${component.words('change')}</span>
        <span class="sf-chart-candlestick-tooltip-value">${component.sayChange(one.open, one.close)}</span>
      </div>
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
    <div class=${shownTable ? 'sf-chart-candlestick-table' : 'sf-chart-candlestick-sr'}>
      <table>
        <caption>${label}</caption>
        <thead>
          <tr>
            <th scope="col">${component.xLabel || model.xField || component.words('period-column')}</th>
            ${['open', 'high', 'low', 'close', 'change'].map(key => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<th scope="col">${component.words(key)}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${model.candles.map(one => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
            <tr>
              <th scope="row">${component.sayX(model, one)}</th>
              <td>${component.sayY(one.open)}</td>
              <td>${component.sayY(one.high)}</td>
              <td>${component.sayY(one.low)}</td>
              <td>${component.sayY(one.close)}</td>
              <td>${component.sayChange(one.open, one.close)}</td>
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
    paint
  } = context;

  if (state === 'loading') {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-candlestick-loading" role="status" aria-busy="true"><span class="sf-chart-candlestick-sr">${component.words('loading')}</span></div>`;
  }

  if (state === 'empty' || state === 'error') {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
      <sf-empty-state class="sf-chart-candlestick-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
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
    <svg class="sf-chart-candlestick-svg" role="group" tabindex="0" focusable="true"
         aria-label=${context.label} aria-roledescription=${component.words('roledescription')}
         aria-describedby=${described || lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
         width=${g.width} height=${g.height} viewBox=${`0 0 ${g.width} ${g.height}`}
         @keydown=${event => component.onPlotKey(event)}
         @pointermove=${event => component.onPointerMove(event)}
         @pointerleave=${() => component.onPointerLeave()}
         @click=${event => component.onPlotClick(event)}
         @blur=${() => component.setCursor(null)}
         .innerHTML=${axesMarkup(drawn) + cursorMarkup(g, cursor) + candlesMarkup(g, paint, context.shape)}>
    </svg>
    ${renderTooltip(context, g, cursor)}
  `;
}

function renderCandlestickTemplate(context) {
  const {
    component,
    uid,
    state
  } = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <figure class=${['sf-chart-candlestick', `sf-chart-candlestick--size-${size}`, `sf-chart-candlestick--${state}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-chart-candlestick-head">
        <span class="sf-chart-candlestick-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.table === 'toggle' && state === 'ready' ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<button type="button" class="sf-chart-candlestick-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      </figcaption>
      ${renderKey(context, 'top')}
      <div class="sf-chart-candlestick-plot" ?hidden=${tableView}>${renderPlot(context)}</div>
      ${renderKey(context, 'bottom')}
      ${context.summaryText ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<p class="sf-chart-candlestick-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      ${context.hasDescription ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-candlestick-description" id=${`${uid}-description`}>${context.description}</div>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      <div class="sf-chart-candlestick-sr" aria-live="polite">${context.said}</div>
      ${renderTable(context)}
    </figure>
  `;
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "ad47591bd16f"
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "8c84a9c1df25"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("chart/colors", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("chart/colors", 1).then(resolve, reject), { once: true })));

/***/ },

/***/ "43efc6ca45fc"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("chart/cursor", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("chart/cursor", 1).then(resolve, reject), { once: true })));

/***/ },

/***/ "1a60ce635d04"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("chart/data", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("chart/data", 1).then(resolve, reject), { once: true })));

/***/ },

/***/ "dd0c3978091b"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("chart/format", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("chart/format", 1).then(resolve, reject), { once: true })));

/***/ },

/***/ "600acbab746d"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("chart/scale", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("chart/scale", 1).then(resolve, reject), { once: true })));

/***/ },

/***/ "297fd25a909a"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("chart/settle", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("chart/settle", 1).then(resolve, reject), { once: true })));

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

/***/ "8f8a46f72512"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"id":"smart.chart-candlestick","tag":"sf-chart-candlestick","version":"0.1.1","kind":"leaf","settings":{"label":{"type":"string","default":""},"items":{"type":"list","default":[],"of":"object"},"colors":{"type":"object","default":{}},"x":{"type":"string","default":""},"open":{"type":"string","default":"open"},"high":{"type":"string","default":"high"},"low":{"type":"string","default":"low"},"close":{"type":"string","default":"close"},"shape":{"type":"enum","values":["candle","bar"],"default":"candle"},"y-min":{"type":"number","optional":true},"y-max":{"type":"number","optional":true},"y-zero":{"type":"boolean","default":false},"legend":{"type":"enum","values":["auto","top","bottom","none"],"default":"auto"},"tooltip":{"type":"enum","values":["candle","none"],"default":"candle"},"grid":{"type":"enum","values":["value","none"],"default":"value"},"x-label":{"type":"string","default":""},"y-label":{"type":"string","default":""},"x-format":{"type":"string","default":"auto"},"y-format":{"type":"string","default":"number"},"size":{"type":"enum","values":["1/2","1","2"],"default":"1"},"table":{"type":"enum","values":["toggle","visible","hidden"],"default":"toggle"},"summary":{"type":"enum","values":["auto","none"],"default":"auto"},"data-state":{"type":"enum","values":["auto","loading","ready","empty","error"],"default":"auto"}},"events":{"select":{"carries":{"index":"number","row":"number","x":"string","open":"number","high":"number","low":"number","close":"number"}},"refresh":{"carries":{}}},"actions":{"reset":{"with":{}}},"presentation":{"skeleton":{"late":["items"]}},"css-variables":{"--sf-chart-candlestick-height":{"type":"length","state":"default"},"--sf-chart-candlestick-grid-color":{"type":"color","state":"default"},"--sf-chart-candlestick-baseline-color":{"type":"color","state":"default"},"--sf-chart-candlestick-label-color":{"type":"color","state":"default"},"--sf-chart-candlestick-hover-background-color":{"type":"color","state":"hover"}}}');

/***/ },

/***/ "c19134f0126e"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Candlestick chart","runtime":{"untitled":"Chart","roledescription":"candlestick chart","summary-range":"From {from} to {to}: {count} candles.","summary-change":"Open {open}, close {close}: {change}.","summary-extremes":"High {high} ({highAt}), low {low} ({lowAt}).","summary-days":"Rose: {up}, fell: {down}.","summary-missing":"Rows without a price: {count}.","summary-empty":"No data.","cursor":"{period}: open {open}, high {high}, low {low}, close {close}, {change}","period":"{from} – {to}","candle-n":"Period {n}","period-column":"Period","open":"Open","high":"High","low":"Low","close":"Close","change":"Change","up":"Rise","down":"Fall","legend":"Key","gap":"no data","show-table":"Table","loading":"Loading the chart\'s data","empty-title":"No data for the chart","error-title":"Could not load the data"},"events":{"select":{"label":"Choose a candle"},"refresh":{"label":"Load the data again"}},"actions":{"reset":{"label":"Take the cursor away"}}}');

/***/ },

/***/ "cdd542a1bc42"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Свечной график","runtime":{"untitled":"График","roledescription":"свечной график","summary-range":"С {from} по {to} — свечей: {count}.","summary-change":"Открытие {open}, закрытие {close}: {change}.","summary-extremes":"Максимум {high} ({highAt}), минимум {low} ({lowAt}).","summary-days":"Рост: {up}, падение: {down}.","summary-missing":"Строк без цены: {count}.","summary-empty":"Нет данных.","cursor":"{period}: открытие {open}, максимум {high}, минимум {low}, закрытие {close}, {change}","period":"{from} – {to}","candle-n":"Период {n}","period-column":"Период","open":"Открытие","high":"Максимум","low":"Минимум","close":"Закрытие","change":"Изменение","up":"Рост","down":"Падение","legend":"Обозначения","gap":"нет данных","show-table":"Таблица","loading":"Загрузка данных графика","empty-title":"Нет данных для графика","error-title":"Не удалось загрузить данные"},"events":{"select":{"label":"Выбрать свечу"},"refresh":{"label":"Загрузить данные заново"}},"actions":{"reset":{"label":"Убрать курсор"}}}');

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
/******/ 	let __webpack_exports__ = __webpack_require__("89e3a84cfce0");
/******/
/******/ })()
;