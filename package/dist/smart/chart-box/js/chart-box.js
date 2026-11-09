/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "bfcb61c22eac"
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
/* harmony import */ var _chart_core_palettes_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("a128d5f62041");
/* harmony import */ var _js_box_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("651a9279e7a6");
/* harmony import */ var _js_templates_default__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("323c5d94699f");
/* harmony import */ var _component_json__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("9651cab4967d");
/* harmony import */ var _lang_en_json__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("bb8971e59466");
/* harmony import */ var _lang_ru_json__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("66ca298bed4f");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_scale_js__WEBPACK_IMPORTED_MODULE_3__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__, _chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_5__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_6__, _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7__, _chart_core_palettes_js__WEBPACK_IMPORTED_MODULE_8__, _js_box_js__WEBPACK_IMPORTED_MODULE_9__, _js_templates_default__WEBPACK_IMPORTED_MODULE_10__]);
([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_scale_js__WEBPACK_IMPORTED_MODULE_3__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__, _chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_5__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_6__, _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7__, _chart_core_palettes_js__WEBPACK_IMPORTED_MODULE_8__, _js_box_js__WEBPACK_IMPORTED_MODULE_9__, _js_templates_default__WEBPACK_IMPORTED_MODULE_10__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _chart_core_scale_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_chart_core_settle_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _chart_core_palettes_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_chart_core_palettes_js__WEBPACK_IMPORTED_MODULE_8__);
// sf-chart-box: a box plot, to compare how one measure spreads across groups
// (docs/research/catalogue.md, Box plot; docs/DECISIONS.md D9).
//
// The element reads its rows once into boxes (js/box): the median,
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
    this._model = (0,_js_box_js__WEBPACK_IMPORTED_MODULE_9__.boxSeries)(this.items, {
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

/***/ "651a9279e7a6"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   boxSeries: () => (/* binding */ boxSeries),
/* harmony export */   boxStats: () => (/* binding */ boxStats),
/* harmony export */   givenStats: () => (/* binding */ givenStats),
/* harmony export */   quantile: () => (/* binding */ quantile)
/* harmony export */ });
/* harmony import */ var _chart_core_data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1a60ce635d04");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_chart_core_data_js__WEBPACK_IMPORTED_MODULE_0__]);
var __webpack_async_dependencies_result__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
_chart_core_data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_async_dependencies_result__[0];
/* harmony import */ var _chart_core_data_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_chart_core_data_js__WEBPACK_IMPORTED_MODULE_0__);
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
  const [min, q1, median, q3, max] = GIVEN.map(name => (0,_chart_core_data_js__WEBPACK_IMPORTED_MODULE_0__.readNumber)(row[name]));
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
    mean: (0,_chart_core_data_js__WEBPACK_IMPORTED_MODULE_0__.readNumber)(row.mean)
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
  const rows = (0,_chart_core_data_js__WEBPACK_IMPORTED_MODULE_0__.readRows)(items);
  const fields = rows.length ? Object.keys(rows[0]) : [];
  const xField = x || fields[0] || '';
  const given = stats === 'given';
  const yField = given ? '' : y || fields.find(name => name !== xField && name !== series && rows.some(row => (0,_chart_core_data_js__WEBPACK_IMPORTED_MODULE_0__.readNumber)(row[name]) !== null)) || '';
  const groups = new Map();
  const keys = new Map();
  let missing = 0;

  for (const row of rows) {
    const group = row[xField] === undefined || row[xField] === null ? '' : String(row[xField]);
    const key = series ? row[series] === undefined || row[series] === null ? '' : String(row[series]) : yField || 'box';
    const value = given ? givenStats(row) : (0,_chart_core_data_js__WEBPACK_IMPORTED_MODULE_0__.readNumber)(row[yField]);

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
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("297fd25a909a");
/* harmony import */ var _default_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("e3edcadf1dae");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([lit__WEBPACK_IMPORTED_MODULE_0__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__]);
([lit__WEBPACK_IMPORTED_MODULE_0__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__);


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

/***/ "e3edcadf1dae"
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

/***/ "a128d5f62041"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("chart/palettes", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("chart/palettes", 1).then(resolve, reject), { once: true })));

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

/***/ "9651cab4967d"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"id":"smart.chart-box","tag":"sf-chart-box","version":"0.1.1","kind":"leaf","settings":{"label":{"type":"string","default":""},"items":{"type":"list","default":[],"of":"object"},"names":{"type":"object","default":{}},"colors":{"type":"object","default":{}},"palette":{"type":"enum","values":["theme","vivid","soft","warm","cool","brand"],"default":"theme"},"x":{"type":"string","default":""},"y":{"type":"string","default":""},"series":{"type":"string","default":""},"stats":{"type":"enum","values":["raw","given"],"default":"raw"},"whiskers":{"type":"enum","values":["tukey","range"],"default":"tukey"},"mean":{"type":"boolean","default":false},"y-min":{"type":"number","optional":true},"y-max":{"type":"number","optional":true},"y-zero":{"type":"boolean","default":false},"legend":{"type":"enum","values":["auto","top","bottom","none"],"default":"auto"},"tooltip":{"type":"enum","values":["box","none"],"default":"box"},"grid":{"type":"enum","values":["value","none"],"default":"value"},"x-label":{"type":"string","default":""},"y-label":{"type":"string","default":""},"y-format":{"type":"string","default":"number"},"size":{"type":"enum","values":["1/2","1","2"],"default":"1"},"table":{"type":"enum","values":["toggle","visible","hidden"],"default":"toggle"},"summary":{"type":"enum","values":["auto","none"],"default":"auto"},"data-state":{"type":"enum","values":["auto","loading","ready","empty","error"],"default":"auto"}},"values":{"hidden-series":{"type":"list","default":[],"of":"string"}},"events":{"toggle":{"carries":{"id":"string","hidden":"boolean"}},"select":{"carries":{"series":"string","index":"number","group":"string","median":"number"}},"refresh":{"carries":{}}},"actions":{"reset":{"with":{}}},"presentation":{"skeleton":{"late":["items"]}},"css-variables":{"--sf-chart-box-height":{"type":"length","state":"default"},"--sf-chart-box-grid-color":{"type":"color","state":"default"},"--sf-chart-box-baseline-color":{"type":"color","state":"default"},"--sf-chart-box-label-color":{"type":"color","state":"default"},"--sf-chart-box-hover-background-color":{"type":"color","state":"hover"},"--sf-chart-box-hidden-color":{"type":"color","state":"disabled"}}}');

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