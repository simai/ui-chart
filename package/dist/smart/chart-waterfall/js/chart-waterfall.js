/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "4fea6108f02d"
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
/* harmony import */ var _js_waterfall_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("31977e9a1cde");
/* harmony import */ var _js_templates_default__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("12bca088a7c6");
/* harmony import */ var _component_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("5d9ab0b957d6");
/* harmony import */ var _lang_en_json__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("4afe9fc64bc0");
/* harmony import */ var _lang_ru_json__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("c9bf4a06b263");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_scale_js__WEBPACK_IMPORTED_MODULE_3__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__, _chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_5__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_6__, _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7__, _js_waterfall_js__WEBPACK_IMPORTED_MODULE_8__, _js_templates_default__WEBPACK_IMPORTED_MODULE_9__]);
([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_scale_js__WEBPACK_IMPORTED_MODULE_3__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__, _chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_5__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_6__, _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7__, _js_waterfall_js__WEBPACK_IMPORTED_MODULE_8__, _js_templates_default__WEBPACK_IMPORTED_MODULE_9__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _chart_core_scale_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_chart_core_settle_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7__);
// sf-chart-waterfall: a waterfall chart, how a start value becomes an end
// value through positive and negative steps, for example a profit bridge
// (docs/research/catalogue.md, Waterfall; docs/DECISIONS.md D11).
//
// The element reads its rows once into steps (js/waterfall),
// measures its plot, and draws in SVG a bar per step side by side on a
// value axis from zero: a change floats from the running total to the new
// one, a total stands on zero, and a thin line joins each bar's end to the
// next. A rise and a fall are the success and error tones and a total the
// neutral one; each bar's value is written with its sign, so the direction
// never rests on colour alone. A person reaches the plot with one Tab stop
// and walks the steps with the arrows (chart-core/cursor); every move is
// said in a polite live region, the chart as a whole in a summary
// sentence, and the same data is a table on request.
//
// It renders into its own light DOM, like every Smart component.












 // The text of the plot, in px, by size rung, as on the line chart.

const FONT = {
  '1/2': 11,
  1: 12,
  2: 14
}; // The widest a bar is drawn, in px, by size rung.

const WIDEST = {
  '1/2': 32,
  1: 48,
  2: 64
};
const KEYS = ['up', 'down', 'total'];
const CHAR = 0.6;
const GAP = 8;
const ChartWaterfallElement = (0,_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__.elementFromManifest)(_component_json__WEBPACK_IMPORTED_MODULE_10__, {
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
let instances = 0; // A label cut to so many characters, with an ellipsis.

const cut = (text, chars) => text.length <= chars ? text : `${text.slice(0, Math.max(1, chars - 1))}…`;

class SfWaterfall extends ChartWaterfallElement {
  static get props() {
    return { ...super.props,
      rootClass: {
        default: ''
      }
    };
  }

  onConnected() {
    this._uid = this.id || `sf-chart-waterfall-${instances += 1}`;
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
      (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7__.checkContrast)(this, colours, 'sf-chart-waterfall');
    }

    const plot = this.querySelector('.sf-chart-waterfall-plot');

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
  } // The page's own colours of rise, fall and total (chart-core/colors),
  // read again only when the setting changes.


  colours() {
    if (this.colors !== this._coloursRaw || !this._colours) {
      this._coloursRaw = this.colors;
      const all = (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7__.readColours)(this.colors, said => console.warn(`<sf-chart-waterfall> ${said}`));
      this._colours = new Map([...all].filter(([key]) => KEYS.includes(key)));
    }

    return this._colours;
  }

  words(key, vars) {
    return this.sfWord(key, vars ? {
      vars
    } : undefined);
  } // The rows as steps, read again only when the data, its mapping or the
  // language changes.


  model() {
    const key = [this.items, this.x, this.y, this.total, this.end, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this)];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;
    this._model = (0,_js_waterfall_js__WEBPACK_IMPORTED_MODULE_8__.waterfallSteps)(this.items, {
      x: this.x,
      y: this.y,
      total: this.total || 'total',
      end: this.end !== 'none',
      endLabel: this.words('end')
    });
    return this._model;
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.steps.length ? 'ready' : 'empty';
  }

  sayY(value, step = 0) {
    return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(value, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.yFormat, {
      step,
      gap: this.words('gap')
    });
  } // A value with its sign: «+40», «−70».


  saySigned(value) {
    const sign = value > 0 ? '+' : value < 0 ? '−' : '';
    return `${sign}${this.sayY(Math.abs(value))}`;
  }

  sayX(step) {
    return step.label || this.words('step-n', {
      n: String(step.row + 1)
    });
  } // A change from one level to another, signed, with its share.


  sayChange(from, to) {
    const share = from ? (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(Math.abs((to - from) / from), (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), 'percent') : '';
    const amount = this.saySigned(to - from);
    if (!share) return amount;
    const sign = to > from ? '+' : to < from ? '−' : '';
    return `${amount} (${sign}${share})`;
  } // What a bar says on itself: a change with its sign, a total as it is.


  sayBar(step) {
    return step.kind === 'total' ? this.sayY(step.to) : this.saySigned(step.value);
  } // Where everything goes: the plot's inner box, the value scale from zero,
  // the bars, the lines joining them, their values and the axis labels.
  // Null until the plot has a width.


  geometry(model) {
    const {
      width,
      height
    } = this._box;
    if (!width || !height) return null;
    const font = FONT[this.size] ?? 12;
    const [low, high] = (0,_js_waterfall_js__WEBPACK_IMPORTED_MODULE_8__.waterfallExtent)(model.steps);
    const labelled = this.valueLabels !== 'none';
    const top = GAP + (this.yLabel ? font * 1.5 : 0) + (labelled ? font * 1.4 : 0);
    const bottom = font * 1.5 + GAP + (this.xLabel ? font * 1.5 : 0) + (labelled && low < 0 ? font * 1.4 : 0);
    const ticks = (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_3__.niceTicks)(low, high, (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_3__.tickCount)(height - top - bottom, font * 3.5), {
      zero: true
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
    const band = (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_3__.bandScale)(model.steps.length, [inner.left, inner.right], {
      padding: 0.25
    });
    const wide = Math.max(1, Math.min(WIDEST[this.size] ?? 48, band.width));
    const bars = model.steps.map((one, index) => {
      const cx = band.at(index) + band.width / 2;
      const yFrom = y(one.from);
      const yTo = y(one.to);
      return { ...one,
        index,
        cx,
        half: wide / 2,
        yFrom,
        yTo,
        top: Math.min(yFrom, yTo),
        bottom: Math.max(yFrom, yTo),
        text: this.sayBar(one)
      };
    }); // A bar's value goes above it when the bar rises from its start, below
    // when it falls; all are written only when every one fits its band.

    const fits = labelled && bars.every(one => one.text.length * font * CHAR <= band.step - 2);
    const values = fits ? bars.map(one => {
      const below = one.kind === 'total' ? one.to < 0 : one.kind === 'down';
      return {
        at: one.cx,
        y: below ? one.bottom + font * 1.1 : one.top - font * 0.5,
        text: one.text
      };
    }) : []; // The axis labels: each step's label, cut to its band, skipped when it
    // would touch its neighbour. A letter is taken a little wider than the
    // digits' CHAR: a Cyrillic letter is near 0.7 of the font.

    const letter = font * CHAR * 1.2;
    const chars = Math.max(3, Math.floor((band.step - GAP / 2) / letter));
    const xTicks = [];
    let last = -Infinity;

    for (const one of bars) {
      const text = cut(this.sayX(one), chars);
      const half = text.length * letter / 2;
      if (one.cx - half < last + GAP / 2) continue;
      if (one.cx - half < 0 || one.cx + half > width) continue;
      xTicks.push({
        at: one.cx,
        text
      });
      last = one.cx + half;
    }

    return {
      width,
      height,
      font,
      inner,
      bars,
      band,
      values,
      zero: y(0),
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
      steps
    } = model;
    if (!steps.length) return this.words('summary-empty');
    const locale = (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this);
    const changes = steps.filter(one => one.kind !== 'total');
    const ups = changes.filter(one => one.kind === 'up' && one.value > 0);
    const downs = changes.filter(one => one.kind === 'down');
    const parts = [this.words('summary-range', {
      count: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(changes.length, locale, 'integer'),
      start: this.sayY(model.start),
      finish: this.sayY(model.finish),
      change: this.sayChange(model.start, model.finish)
    })];

    if (ups.length) {
      const most = ups.reduce((best, one) => one.value > best.value ? one : best);
      parts.push(this.words('summary-most-up', {
        name: this.sayX(most),
        value: this.saySigned(most.value)
      }));
    }

    if (downs.length) {
      const most = downs.reduce((best, one) => one.value < best.value ? one : best);
      parts.push(this.words('summary-most-down', {
        name: this.sayX(most),
        value: this.saySigned(most.value)
      }));
    }

    parts.push(this.words('summary-count', {
      up: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(ups.length, locale, 'integer'),
      down: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(downs.length, locale, 'integer')
    }));
    if (model.missing) parts.push(this.words('summary-missing', {
      count: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(model.missing, locale, 'integer')
    }));
    return parts.join(' ');
  } // A step as one sentence: a change with its sign and the total it
  // reaches, or a total.


  stepLine(step) {
    if (step.kind === 'total') return this.words('cursor-total', {
      name: this.sayX(step),
      total: this.sayY(step.to)
    });
    return this.words('cursor', {
      name: this.sayX(step),
      change: this.saySigned(step.value),
      total: this.sayY(step.to)
    });
  }

  cursorBar(cursor = this._cursor) {
    const geometry = this._geometry;
    if (!cursor || !geometry) return null;
    return geometry.bars[cursor.index] ?? null;
  }

  setCursor(cursor, {
    say = false
  } = {}) {
    this._cursor = cursor;
    const bar = this.cursorBar(cursor);
    if (say && bar) this._said = this.stepLine(bar);
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
      this.choose(this.cursorBar());
      return;
    } // Up and Down have no series to cross: they are not the cursor's.


    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') return;
    const next = (0,_chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_5__.moveCursor)(this._cursor, event.key, {
      count: geometry.bars.length,
      shown: ['step']
    });
    if (next === null) return;
    event.preventDefault();
    this.setCursor(next, {
      say: true
    });
  } // The pointer picks the step whose band it is over.


  placeAt(event) {
    const geometry = this._geometry;
    if (!geometry || !geometry.bars.length) return null;
    const box = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - box.left;
    if (x < geometry.inner.left || x > geometry.inner.right) return null;
    const index = Math.max(0, Math.min(geometry.bars.length - 1, Math.floor((x - geometry.inner.left) / geometry.band.step)));
    return {
      index,
      series: 'step'
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
    if (place) this.choose(this.cursorBar(place));
  }

  choose(bar) {
    if (!bar) return;
    this.sfEmit('select', {
      index: bar.index,
      row: bar.row,
      x: bar.label,
      kind: bar.kind,
      value: bar.value,
      total: bar.to
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
      tableKey: [tableModel, this.label, this.xLabel, this.yFormat, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.table, this.table === 'toggle' ? this._view : 'chart'],
      geometry,
      cursor: this.cursorBar(),
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
    return (0,_js_templates_default__WEBPACK_IMPORTED_MODULE_9__.renderWaterfallTemplate)(this.templateContext());
  }

}

SfWaterfall.define('sf-chart-waterfall');
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "12bca088a7c6"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderWaterfallTemplate: () => (/* binding */ renderWaterfallTemplate)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2a080a730149");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("297fd25a909a");
/* harmony import */ var _default_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("dda310d1f54c");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([lit__WEBPACK_IMPORTED_MODULE_0__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__]);
([lit__WEBPACK_IMPORTED_MODULE_0__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__);


 // The figure of a waterfall chart: the label and the table button, the key
// of rise, fall and total, the plot (SVG), the summary and the description,
// the live line, and the same data as a table.
//
// The plot is one Tab stop, a role="group" named by the label and described
// by the summary; its axes and bars are aria-hidden, because the summary,
// the live line and the table say what they show. A rise is a bar in the
// success tone, a fall in the error tone and a total in the neutral one;
// each bar's value is written with its sign, and in forced colours a rise
// is hollow, a fall filled and a total dashed, so the direction never rests
// on colour alone. A page's own colour (the colors setting, by up, down and
// total) is set in a style as --up, --down or --total.

const px = value => `${Math.round(value * 10) / 10}`;

const KEYS = ['up', 'down', 'total'];

const paintOf = (paint, key) => paint.get(key) ? `--sf-chart-waterfall--${key}: ${paint.get(key)}` : ''; // The plot's inside is SVG markup set as the svg element's innerHTML (a
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
  let out = '<g class="sf-chart-waterfall-axes" aria-hidden="true">';

  if (g.grid !== 'none') {
    for (const tick of g.valueTicks) {
      out += `<line class="sf-chart-waterfall-grid" x1="${px(inner.left)}" x2="${px(inner.right)}" y1="${px(tick.at)}" y2="${px(tick.at)}"/>`;
    }
  }

  out += `<line class="sf-chart-waterfall-baseline" x1="${px(inner.left)}" x2="${px(inner.right)}" y1="${px(g.zero)}" y2="${px(g.zero)}"/>`;

  for (const tick of g.valueTicks) {
    out += `<text class="sf-chart-waterfall-tick" x="${px(inner.left - 6)}" y="${px(tick.at)}" text-anchor="end" dominant-baseline="middle">${esc(tick.text)}</text>`;
  }

  for (const tick of g.xTicks) {
    out += `<text class="sf-chart-waterfall-tick" x="${px(tick.at)}" y="${px(inner.bottom + g.font * 1.2)}" text-anchor="middle" dominant-baseline="middle">${esc(tick.text)}</text>`;
  }

  if (g.yLabel) out += `<text class="sf-chart-waterfall-axis-label" x="${px(inner.left)}" y="${px(g.font)}" text-anchor="start">${esc(g.yLabel)}</text>`;
  if (g.xLabel) out += `<text class="sf-chart-waterfall-axis-label" x="${px((inner.left + inner.right) / 2)}" y="${px(g.height - 4)}" text-anchor="middle">${esc(g.xLabel)}</text>`;
  return `${out}</g>`;
} // The bars, one group per kind so a class sets its tone once; the lines
// that join each bar's end to the next as one path; the values over them.


function barsMarkup(g, paint) {
  const bars = {
    up: '',
    down: '',
    total: ''
  };
  let links = '';
  g.bars.forEach((one, index) => {
    bars[one.kind] += `<rect class="sf-chart-waterfall-bar" x="${px(one.cx - one.half)}" y="${px(one.top)}" width="${px(one.half * 2)}" height="${px(Math.max(1, one.bottom - one.top))}"/>`;
    const next = g.bars[index + 1];
    if (next) links += `M${px(one.cx + one.half)} ${px(one.yTo)}H${px(next.cx - next.half)}`;
  });

  const styleOf = key => paint.get(key) ? ` style="${esc(paintOf(paint, key))}"` : '';

  let out = '<g class="sf-chart-waterfall-marks" aria-hidden="true">';
  if (links) out += `<path class="sf-chart-waterfall-link" d="${links}"/>`;
  out += KEYS.map(key => bars[key] ? `<g class="sf-chart-waterfall-${key}"${styleOf(key)} data-kind="${key}">${bars[key]}</g>` : '').join('');

  for (const value of g.values) {
    out += `<text class="sf-chart-waterfall-value" x="${px(value.at)}" y="${px(value.y)}" text-anchor="middle">${esc(value.text)}</text>`;
  }

  return `${out}</g>`;
} // The cursor: the step's band lit behind it and a ring round its bar.


function cursorMarkup(g, one) {
  if (!one) return '';
  let out = '<g class="sf-chart-waterfall-cursor" aria-hidden="true">';
  out += `<rect class="sf-chart-waterfall-lane" x="${px(one.cx - g.band.step / 2)}" y="${px(g.inner.top)}" width="${px(g.band.step)}" height="${px(g.inner.bottom - g.inner.top)}"/>`;
  out += `<rect class="sf-chart-waterfall-ring" x="${px(one.cx - one.half - 3)}" y="${px(one.top - 3)}" width="${px(one.half * 2 + 6)}" height="${px(Math.max(1, one.bottom - one.top) + 6)}" rx="2"/>`;
  return `${out}</g>`;
}

const swatchMarkup = () => '<svg viewBox="0 0 12 12" focusable="false"><rect class="sf-chart-waterfall-bar" x="2" y="2" width="8" height="8"/></svg>';

function renderKey(context, place) {
  if (context.legend !== place || context.state !== 'ready') return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const {
    component,
    paint
  } = context;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <ul class=${`sf-chart-waterfall-legend sf-chart-waterfall-legend--${place}`} aria-label=${component.words('legend')}>
      ${KEYS.map(key => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <li class=${`sf-chart-waterfall-legend-item sf-chart-waterfall-${key}`} style=${paintOf(paint, key) || lit__WEBPACK_IMPORTED_MODULE_0__.nothing}>
          <span class="sf-chart-waterfall-swatch" aria-hidden="true" .innerHTML=${swatchMarkup()}></span>
          <span>${component.words(key)}</span>
        </li>
      `)}
    </ul>
  `;
}

function renderTooltip(context, g, one) {
  if (!one || context.tooltip === 'none') return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const {
    component
  } = context;
  const flip = one.cx > g.width / 2;
  const rows = one.kind === 'total' ? [['total-value', component.sayY(one.to)]] : [['change', component.saySigned(one.value)], ['total-value', component.sayY(one.to)]];
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${`sf-chart-waterfall-tooltip${flip ? ' sf-chart-waterfall-tooltip--flip' : ''}`} aria-hidden="true"
         style=${`inset-inline-start: ${px(one.cx)}px; inset-block-start: ${px((one.top + one.bottom) / 2)}px; --sf-chart-waterfall--reach: ${px(one.half)}`}>
      <div class="sf-chart-waterfall-tooltip-name">${component.sayX(one)}</div>
      ${rows.map(([key, value]) => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <div class="sf-chart-waterfall-tooltip-row">
          <span>${component.words(key)}</span>
          <span class="sf-chart-waterfall-tooltip-value">${value}</span>
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
    <div class=${shownTable ? 'sf-chart-waterfall-table' : 'sf-chart-waterfall-sr'}>
      <table>
        <caption>${label}</caption>
        <thead>
          <tr>
            <th scope="col">${component.xLabel || model.xField || component.words('step-column')}</th>
            <th scope="col">${component.words('change')}</th>
            <th scope="col">${component.words('total-value')}</th>
          </tr>
        </thead>
        <tbody>
          ${model.steps.map(one => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
            <tr>
              <th scope="row">${component.sayX(one)}</th>
              <td>${one.kind === 'total' ? '' : component.saySigned(one.value)}</td>
              <td>${component.sayY(one.to)}</td>
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
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-waterfall-loading" role="status" aria-busy="true"><span class="sf-chart-waterfall-sr">${component.words('loading')}</span></div>`;
  }

  if (state === 'empty' || state === 'error') {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
      <sf-empty-state class="sf-chart-waterfall-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
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
    <svg class="sf-chart-waterfall-svg" role="group" tabindex="0" focusable="true"
         aria-label=${context.label} aria-roledescription=${component.words('roledescription')}
         aria-describedby=${described || lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
         width=${g.width} height=${g.height} viewBox=${`0 0 ${g.width} ${g.height}`}
         @keydown=${event => component.onPlotKey(event)}
         @pointermove=${event => component.onPointerMove(event)}
         @pointerleave=${() => component.onPointerLeave()}
         @click=${event => component.onPlotClick(event)}
         @blur=${() => component.setCursor(null)}
         .innerHTML=${axesMarkup(drawn) + cursorMarkup(g, cursor) + barsMarkup(g, paint)}>
    </svg>
    ${renderTooltip(context, g, cursor)}
  `;
}

function renderWaterfallTemplate(context) {
  const {
    component,
    uid,
    state
  } = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <figure class=${['sf-chart-waterfall', `sf-chart-waterfall--size-${size}`, `sf-chart-waterfall--${state}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-chart-waterfall-head">
        <span class="sf-chart-waterfall-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.table === 'toggle' && state === 'ready' ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<button type="button" class="sf-chart-waterfall-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      </figcaption>
      ${renderKey(context, 'top')}
      <div class="sf-chart-waterfall-plot" ?hidden=${tableView}>${renderPlot(context)}</div>
      ${renderKey(context, 'bottom')}
      ${context.summaryText ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<p class="sf-chart-waterfall-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      ${context.hasDescription ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-waterfall-description" id=${`${uid}-description`}>${context.description}</div>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      <div class="sf-chart-waterfall-sr" aria-live="polite">${context.said}</div>
      ${renderTable(context)}
    </figure>
  `;
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "31977e9a1cde"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isTotal: () => (/* binding */ isTotal),
/* harmony export */   waterfallExtent: () => (/* binding */ waterfallExtent),
/* harmony export */   waterfallSteps: () => (/* binding */ waterfallSteps)
/* harmony export */ });
/* harmony import */ var _chart_core_data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1a60ce635d04");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_chart_core_data_js__WEBPACK_IMPORTED_MODULE_0__]);
var __webpack_async_dependencies_result__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
_chart_core_data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_async_dependencies_result__[0];
/* harmony import */ var _chart_core_data_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_chart_core_data_js__WEBPACK_IMPORTED_MODULE_0__);
// The steps of a waterfall chart (docs/research/catalogue.md, Waterfall):
// how a start value becomes an end value through positive and negative
// changes. Each row is a change from the running total, or a total that
// stands on zero; a closing total is added when the last row is not one.

const TRUE = new Set(['true', 'yes', '1', 'да']);
/** Whether a total field's value marks its row as a total. */

function isTotal(value) {
  if (value === true) return true;
  if (typeof value === 'number') return value !== 0;
  return typeof value === 'string' && TRUE.has(value.trim().toLowerCase());
}
/**
 * The steps of rows: {xField, yField, steps, missing, start, finish}. A
 * step is {row, label, value, kind, from, to}: kind 'up' or 'down' for a
 * change from the running total (from) to the new one (to), 'total' for a
 * bar from zero to the total. A total row without a value takes the
 * running total; with one, the running total starts again from it. A
 * change row without a value is left out and counted. With `end`, a total
 * labelled `endLabel` closes the steps unless the last is a total already;
 * it has row -1.
 */

function waterfallSteps(items, {
  x = '',
  y = '',
  total = 'total',
  end = true,
  endLabel = ''
} = {}) {
  const rows = (0,_chart_core_data_js__WEBPACK_IMPORTED_MODULE_0__.readRows)(items);
  const fields = rows.length ? Object.keys(rows[0]) : [];
  const xField = x || fields.find(name => name !== y && name !== total) || '';
  const yField = y || fields.find(name => name !== xField && name !== total && rows.some(row => (0,_chart_core_data_js__WEBPACK_IMPORTED_MODULE_0__.readNumber)(row[name]) !== null)) || '';
  const steps = [];
  let missing = 0;
  let level = 0;
  rows.forEach((row, index) => {
    const label = row[xField] === undefined || row[xField] === null ? '' : String(row[xField]);
    const value = (0,_chart_core_data_js__WEBPACK_IMPORTED_MODULE_0__.readNumber)(row[yField]);

    if (isTotal(row[total])) {
      if (value !== null) level = value;
      steps.push({
        row: index,
        label,
        value: level,
        kind: 'total',
        from: 0,
        to: level
      });
      return;
    }

    if (value === null) {
      missing += 1;
      return;
    }

    steps.push({
      row: index,
      label,
      value,
      kind: value < 0 ? 'down' : 'up',
      from: level,
      to: level + value
    });
    level += value;
  });

  if (end && steps.length && steps[steps.length - 1].kind !== 'total') {
    steps.push({
      row: -1,
      label: endLabel,
      value: level,
      kind: 'total',
      from: 0,
      to: level,
      added: true
    });
  }

  const first = steps[0];
  const start = first ? first.kind === 'total' ? first.to : first.from : 0;
  return {
    xField,
    yField,
    steps,
    missing,
    start,
    finish: level
  };
}
/** The lowest and highest level the steps reach, zero always in. */

function waterfallExtent(steps) {
  let low = 0;
  let high = 0;

  for (const one of steps) {
    low = Math.min(low, one.from, one.to);
    high = Math.max(high, one.from, one.to);
  }

  return [low, high];
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "dda310d1f54c"
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

/***/ "5d9ab0b957d6"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"id":"smart.chart-waterfall","tag":"sf-chart-waterfall","version":"0.1.1","kind":"leaf","settings":{"label":{"type":"string","default":""},"items":{"type":"list","default":[],"of":"object"},"colors":{"type":"object","default":{}},"x":{"type":"string","default":""},"y":{"type":"string","default":""},"total":{"type":"string","default":"total"},"end":{"type":"enum","values":["auto","none"],"default":"auto"},"value-labels":{"type":"enum","values":["auto","none"],"default":"auto"},"legend":{"type":"enum","values":["auto","top","bottom","none"],"default":"auto"},"tooltip":{"type":"enum","values":["step","none"],"default":"step"},"grid":{"type":"enum","values":["value","none"],"default":"value"},"x-label":{"type":"string","default":""},"y-label":{"type":"string","default":""},"y-format":{"type":"string","default":"number"},"size":{"type":"enum","values":["1/2","1","2"],"default":"1"},"table":{"type":"enum","values":["toggle","visible","hidden"],"default":"toggle"},"summary":{"type":"enum","values":["auto","none"],"default":"auto"},"data-state":{"type":"enum","values":["auto","loading","ready","empty","error"],"default":"auto"}},"events":{"select":{"carries":{"index":"number","row":"number","x":"string","kind":"string","value":"number","total":"number"}},"refresh":{"carries":{}}},"actions":{"reset":{"with":{}}},"presentation":{"skeleton":{"late":["items"]}},"css-variables":{"--sf-chart-waterfall-height":{"type":"length","state":"default"},"--sf-chart-waterfall-grid-color":{"type":"color","state":"default"},"--sf-chart-waterfall-baseline-color":{"type":"color","state":"default"},"--sf-chart-waterfall-label-color":{"type":"color","state":"default"},"--sf-chart-waterfall-hover-background-color":{"type":"color","state":"hover"}}}');

/***/ },

/***/ "4afe9fc64bc0"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Waterfall chart","runtime":{"untitled":"Chart","roledescription":"waterfall chart","summary-range":"Steps: {count}, from {start} to {finish}: {change}.","summary-most-up":"The step that added most is «{name}»: {value}.","summary-most-down":"The step that took away most is «{name}»: {value}.","summary-count":"Rises: {up}, falls: {down}.","summary-missing":"Rows without a value: {count}.","summary-empty":"No data.","cursor":"{name}: {change}, total {total}","cursor-total":"{name}: {total}","step-n":"Step {n}","step-column":"Step","end":"Total","change":"Change","total-value":"Total","up":"Rise","down":"Fall","total":"Total","legend":"Key","gap":"no data","show-table":"Table","loading":"Loading the chart\'s data","empty-title":"No data for the chart","error-title":"Could not load the data"},"events":{"select":{"label":"Choose a step"},"refresh":{"label":"Load the data again"}},"actions":{"reset":{"label":"Take the cursor away"}}}');

/***/ },

/***/ "c9bf4a06b263"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Каскадный график","runtime":{"untitled":"График","roledescription":"каскадный график","summary-range":"Шагов: {count}, от {start} до {finish}: {change}.","summary-most-up":"Больше всего прибавил шаг «{name}»: {value}.","summary-most-down":"Больше всего убавил шаг «{name}»: {value}.","summary-count":"Шагов роста: {up}, снижения: {down}.","summary-missing":"Строк без значения: {count}.","summary-empty":"Нет данных.","cursor":"{name}: {change}, итог {total}","cursor-total":"{name}: {total}","step-n":"Шаг {n}","step-column":"Шаг","end":"Итого","change":"Изменение","total-value":"Итог","up":"Рост","down":"Снижение","total":"Итог","legend":"Обозначения","gap":"нет данных","show-table":"Таблица","loading":"Загрузка данных графика","empty-title":"Нет данных для графика","error-title":"Не удалось загрузить данные"},"events":{"select":{"label":"Выбрать шаг"},"refresh":{"label":"Загрузить данные заново"}},"actions":{"reset":{"label":"Убрать курсор"}}}');

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
/******/ 	let __webpack_exports__ = __webpack_require__("4fea6108f02d");
/******/
/******/ })()
;