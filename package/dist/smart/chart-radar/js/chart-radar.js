/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "bd3026c1bcac"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("deb1a4d61565");
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("5b7d7695b41b");
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("43090d1c8307");
/* harmony import */ var _chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("1a60ce635d04");
/* harmony import */ var _chart_core_scale_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("600acbab746d");
/* harmony import */ var _chart_core_format_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("dd0c3978091b");
/* harmony import */ var _chart_core_describe_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("f7f6308dd740");
/* harmony import */ var _chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("43efc6ca45fc");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("297fd25a909a");
/* harmony import */ var _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("8c84a9c1df25");
/* harmony import */ var _chart_core_palettes_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("a128d5f62041");
/* harmony import */ var _js_radar_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("3e3d1d5ec83b");
/* harmony import */ var _js_templates_default__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("9e93b6f8824a");
/* harmony import */ var _component_json__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("60cb04c9e408");
/* harmony import */ var _lang_en_json__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("fb41d0a58104");
/* harmony import */ var _lang_ru_json__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("77dc24a1b1fa");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__, _chart_core_scale_js__WEBPACK_IMPORTED_MODULE_4__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_5__, _chart_core_describe_js__WEBPACK_IMPORTED_MODULE_6__, _chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_7__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_8__, _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_9__, _chart_core_palettes_js__WEBPACK_IMPORTED_MODULE_10__, _js_templates_default__WEBPACK_IMPORTED_MODULE_12__]);
([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__, _chart_core_scale_js__WEBPACK_IMPORTED_MODULE_4__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_5__, _chart_core_describe_js__WEBPACK_IMPORTED_MODULE_6__, _chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_7__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_8__, _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_9__, _chart_core_palettes_js__WEBPACK_IMPORTED_MODULE_10__, _js_templates_default__WEBPACK_IMPORTED_MODULE_12__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _chart_core_data_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _chart_core_scale_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _chart_core_format_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_chart_core_format_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _chart_core_describe_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_chart_core_describe_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_chart_core_settle_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _chart_core_palettes_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_chart_core_palettes_js__WEBPACK_IMPORTED_MODULE_10__);
// sf-chart-radar: a radar chart, to compare a few items over several
// measures on one scale (docs/research/catalogue.md, Radar;
// docs/DECISIONS.md D9).
//
// The element reads its rows once into series (chart-core/data, the x field
// as categories: one spoke each), measures its plot, and draws in SVG the
// rings of the scale, a spoke per measure from the centre, and each series
// as a ring through its values (js/radar). A person reaches the plot
// with one Tab stop and walks it with the arrows (chart-core/cursor): round
// the spokes, and across the series; every move is said in a polite live
// region, the chart as a whole in a summary sentence, and the same data is
// a table on request.
//
// It renders into its own light DOM, like every Smart component.















 // The text of the plot, in px, by size rung, as on the line chart.

const FONT = {
  '1/2': 11,
  1: 12,
  2: 14
}; // A value's mark, in px, by size rung.

const DOT = {
  '1/2': 2.5,
  1: 3,
  2: 3.5
};
const CHAR = 0.6;
const GAP = 8;
const ChartRadarElement = (0,_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__.elementFromManifest)(_component_json__WEBPACK_IMPORTED_MODULE_13__, {
  base: (_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default()),
  lang: {
    en: _lang_en_json__WEBPACK_IMPORTED_MODULE_14__,
    ru: _lang_ru_json__WEBPACK_IMPORTED_MODULE_15__
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

class SfRadar extends ChartRadarElement {
  static get props() {
    return { ...super.props,
      rootClass: {
        default: ''
      }
    };
  }

  onConnected() {
    this._uid = this.id || `sf-chart-radar-${instances += 1}`;
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
    const checked = (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_9__.coloursKey)(colours);

    if (checked !== this._coloursChecked && this.isConnected) {
      this._coloursChecked = checked;
      (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_9__.checkContrast)(this, colours, 'sf-chart-radar');
    }

    const plot = this.querySelector('.sf-chart-radar-plot');

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
      this._colours = (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_9__.readColours)(this.colors, said => console.warn(`<sf-chart-radar> ${said}`));
    }

    return this._colours;
  } // Each series' colour by key: the page's own or the named palette's by
  // place (D7). With neither, the template keeps the theme's colours.


  paints(list) {
    const own = this.colours();
    const set = _chart_core_palettes_js__WEBPACK_IMPORTED_MODULE_10__.PALETTES[this.palette];
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
  } // The rows as series over the spokes, read again only when the data or
  // its mapping changes. The x field is always categories: a spoke each.


  model() {
    const key = [this.items, this.names, this.x, this.y, this.series];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;
    this._model = (0,_chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__.readSeries)(this.items, {
      x: this.x,
      y: this.y,
      series: this.series,
      xScale: 'category',
      names: this.names || {}
    });
    return this._model;
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.labels.length && model.series.some(one => one.values.some(value => value !== null)) ? 'ready' : 'empty';
  }

  shownSeries(model) {
    const hidden = new Set(this.hiddenSeries || []);
    return model.series.map((one, place) => ({ ...one,
      place
    })).filter(one => !hidden.has(one.key));
  }

  sayY(value, step = 0) {
    return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_5__.formatNumber)(value, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.yFormat, {
      step,
      gap: this.words('gap')
    });
  }

  spokeName(model, index) {
    const label = model.labels[index];
    return label === '' || label === undefined || label === null ? this.words('spoke-n', {
      n: String(index + 1)
    }) : String(label);
  } // The scale: from min (zero when unset) to max (the data's largest,
  // rounded up, when unset).


  scale(model, shown, rings) {
    let high = -Infinity;
    let low = Infinity;

    for (const one of shown) {
      for (const value of one.values) {
        if (value === null) continue;
        high = Math.max(high, value);
        low = Math.min(low, value);
      }
    }

    if (!Number.isFinite(high)) [low, high] = [0, 1];
    const min = this.hasAttribute('min') && Number.isFinite(this.min) ? this.min : Math.min(0, low);
    const max = this.hasAttribute('max') && Number.isFinite(this.max) ? this.max : high;
    const given = this.hasAttribute('max');
    return (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_4__.niceTicks)(min, Math.max(max, min + (given ? 0 : 1e-9)), rings, {
      nice: !given
    });
  } // Where everything goes: the centre and the radius, the scale's rings,
  // the spokes with their labels, and each shown series' ring and marks.
  // Null until the plot has a width.


  geometry(model, shown) {
    const {
      width,
      height
    } = this._box;
    if (!width || !height) return null;
    const font = FONT[this.size] ?? 12;
    const count = model.labels.length; // The labels take what the sides need, up to a quarter of the width
    // each; a longer one is cut and said whole by the tooltip.

    const room = Math.min(width * 0.25, Math.max(...model.labels.map((_, index) => this.spokeName(model, index).length)) * font * CHAR);
    const most = Math.max(3, Math.floor(room / (font * CHAR))); // Above and below, a line of text and a gap; a label stands half a gap
    // off its spoke's end.

    const radius = Math.max(8, Math.min((height - 2 * (font * 1.25 + GAP)) / 2, (width - 2 * (room + GAP * 1.5)) / 2));
    const center = [width / 2, height / 2];
    const ticks = this.scale(model, shown, radius > 90 ? 5 : radius > 50 ? 4 : 3);
    const distance = (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_4__.linearScale)([ticks.min, ticks.max], [0, radius]);

    const at = value => Math.max(0, Math.min(radius, distance(value)));

    const spokes = model.labels.map((_, index) => {
      const [x, y] = (0,_js_radar_js__WEBPACK_IMPORTED_MODULE_11__.spokePoint)(center, radius, index, count);
      const [lx, ly] = (0,_js_radar_js__WEBPACK_IMPORTED_MODULE_11__.spokePoint)(center, radius + GAP / 2, index, count);
      const name = this.spokeName(model, index);
      return {
        index,
        x,
        y,
        lx,
        ly,
        text: name.length > most ? `${name.slice(0, most - 1)}…` : name,
        ...(0,_js_radar_js__WEBPACK_IMPORTED_MODULE_11__.labelPlace)(index, count)
      };
    });
    const rings = ticks.ticks.filter(value => value > ticks.min).map(value => ({
      r: at(value),
      points: model.labels.map((_, index) => (0,_js_radar_js__WEBPACK_IMPORTED_MODULE_11__.spokePoint)(center, at(value), index, count)),
      text: this.sayY(value, ticks.step)
    }));
    const dot = DOT[this.size] ?? 3;
    const series = shown.map(one => ({
      key: one.key,
      place: one.place,
      ring: (0,_js_radar_js__WEBPACK_IMPORTED_MODULE_11__.radarRuns)(one.values, center, at),
      marks: one.values.map((value, index) => value === null ? null : {
        index,
        value,
        point: (0,_js_radar_js__WEBPACK_IMPORTED_MODULE_11__.spokePoint)(center, at(value), index, count)
      }).filter(Boolean)
    }));
    return {
      width,
      height,
      font,
      center,
      radius,
      count,
      spokes,
      rings,
      series,
      dot,
      grid: this.grid
    };
  }

  summarize(model, shown) {
    if (this.summary === 'none') return '';
    const locale = (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this);
    const facts = shown.map(one => ({
      one,
      facts: (0,_chart_core_describe_js__WEBPACK_IMPORTED_MODULE_6__.seriesFacts)(one.values)
    })).filter(({
      facts
    }) => facts);
    if (!facts.length) return this.words('summary-empty');
    let low = Infinity;
    let high = -Infinity;

    for (const {
      facts: own
    } of facts) {
      low = Math.min(low, own.min);
      high = Math.max(high, own.max);
    }

    const parts = [this.words('summary-spokes', {
      count: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_5__.formatNumber)(model.labels.length, locale, 'integer'),
      min: this.sayY(low),
      max: this.sayY(high)
    })];

    for (const {
      one,
      facts: own
    } of facts) {
      const said = {
        high: this.spokeName(model, own.maxAt),
        highValue: this.sayY(own.max),
        low: this.spokeName(model, own.minAt),
        lowValue: this.sayY(own.min)
      };
      if (own.max === own.min) parts.push(this.words(model.series.length > 1 ? 'summary-even-series' : 'summary-even', {
        name: one.name,
        value: this.sayY(own.max)
      }));else parts.push(this.words(model.series.length > 1 ? 'summary-series' : 'summary-one', {
        name: one.name,
        ...said
      }));
    }

    if (facts.length > 1) {
      const [a, b] = facts;
      const {
        above,
        below
      } = (0,_js_radar_js__WEBPACK_IMPORTED_MODULE_11__.compareRings)(a.one.values, b.one.values);
      const both = a.one.values.filter((value, index) => value !== null && b.one.values[index] !== null).length;
      parts.push(this.words('summary-compare', {
        a: a.one.name,
        b: b.one.name,
        above: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_5__.formatNumber)(above, locale, 'integer'),
        below: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_5__.formatNumber)(below, locale, 'integer'),
        count: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_5__.formatNumber)(both, locale, 'integer')
      }));
    }

    const gaps = shown.reduce((sum, one) => sum + one.values.filter(value => value === null).length, 0);
    if (gaps) parts.push(this.words('summary-gaps', {
      count: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_5__.formatNumber)(gaps, locale, 'integer')
    }));
    return parts.join(' ');
  } // A value as one sentence: the spoke, the series when there are several,
  // and the value.


  cursorLine(model, cursor) {
    const one = model.series.find(each => each.key === cursor.series);
    const value = one?.values[cursor.index] ?? null;
    const spoke = this.spokeName(model, cursor.index);
    const said = value === null ? this.words('gap') : this.sayY(value);
    return model.series.length > 1 ? this.words('cursor-series', {
      spoke,
      series: one?.name ?? cursor.series,
      value: said
    }) : this.words('cursor', {
      spoke,
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
    const next = (0,_chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_7__.moveCursor)(this._cursor, event.key, {
      count: geometry.count,
      shown
    });
    if (next === null) return;
    event.preventDefault();
    this.setCursor(next, {
      say: true
    });
  } // The pointer picks the nearest value's mark within reach, else the
  // nearest spoke by its direction from the centre.


  placeAt(event) {
    const geometry = this._geometry;
    if (!geometry || !geometry.series.length) return null;
    const box = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - box.left;
    const y = event.clientY - box.top;
    let best = null;
    let distance = 16;

    for (const one of geometry.series) {
      for (const mark of one.marks) {
        const off = Math.hypot(mark.point[0] - x, mark.point[1] - y);

        if (off < distance) {
          best = {
            index: mark.index,
            series: one.key
          };
          distance = off;
        }
      }
    }

    if (best) return best;
    const [cx, cy] = geometry.center;
    if (Math.hypot(x - cx, y - cy) > geometry.radius + GAP) return null;
    const turn = (Math.atan2(y - cy, x - cx) + Math.PI / 2 + Math.PI * 2) % (Math.PI * 2);
    return {
      index: Math.round(turn / (Math.PI * 2) * geometry.count) % geometry.count,
      series: geometry.series[0].key
    };
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
    const value = model.series.find(one => one.key === cursor.series)?.values[cursor.index] ?? null;
    this.sfEmit('select', {
      series: cursor.series,
      index: cursor.index,
      spoke: this.spokeName(model, cursor.index),
      value
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
      shown,
      geometry,
      cursor: geometry ? this._cursor : null,
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

    return (0,_chart_core_settle_js__WEBPACK_IMPORTED_MODULE_8__.settled)(this._table, model, {
      later: () => this.requestComponentUpdate('table')
    });
  }

  template() {
    return (0,_js_templates_default__WEBPACK_IMPORTED_MODULE_12__.renderRadarTemplate)(this.templateContext());
  }

}

SfRadar.define('sf-chart-radar');
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "3e3d1d5ec83b"
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   compareRings: () => (/* binding */ compareRings),
/* harmony export */   labelPlace: () => (/* binding */ labelPlace),
/* harmony export */   radarRuns: () => (/* binding */ radarRuns),
/* harmony export */   spokeAngle: () => (/* binding */ spokeAngle),
/* harmony export */   spokePoint: () => (/* binding */ spokePoint)
/* harmony export */ });
// The spokes of a radar chart (docs/research/catalogue.md, Radar): one spoke
// per measure from a centre, the first straight up and the rest clockwise,
// and each series a ring through its values. A gap breaks the ring, so a
// missing value is never drawn as zero.

/** The angle of a spoke, in radians: the first points up, the rest go clockwise. */
function spokeAngle(index, count) {
  return -Math.PI / 2 + 2 * Math.PI * index / Math.max(1, count);
}
/** The point at `distance` from the centre along a spoke. */

function spokePoint([cx, cy], distance, index, count) {
  const angle = spokeAngle(index, count);
  return [cx + Math.cos(angle) * distance, cy + Math.sin(angle) * distance];
}
/**
 * A series' ring: {closed, runs}, each run the points of neighbouring
 * spokes with a value. Without a gap it is one closed ring; with gaps the
 * runs go round from the spoke after the first gap, so a run across the
 * first spoke stays whole. `distanceOf` maps a value to its distance.
 */

function radarRuns(values, center, distanceOf) {
  const count = values.length;
  const gap = values.findIndex(value => value === null);

  const at = index => spokePoint(center, distanceOf(values[index]), index, count);

  if (gap < 0) return {
    closed: count > 2,
    runs: count ? [values.map((_, index) => at(index))] : []
  };
  const runs = [];
  let current = [];

  for (let step = 1; step <= count; step += 1) {
    const index = (gap + step) % count;

    if (values[index] === null) {
      if (current.length) runs.push(current);
      current = [];
      continue;
    }

    current.push(at(index));
  }

  if (current.length) runs.push(current);
  return {
    closed: false,
    runs
  };
}
/** Where a spoke's label stands from its end: {anchor, baseline}, by the spoke's direction. */

function labelPlace(index, count) {
  const angle = spokeAngle(index, count);
  const across = Math.cos(angle);
  const down = Math.sin(angle);
  return {
    anchor: across > 0.2 ? 'start' : across < -0.2 ? 'end' : 'middle',
    baseline: down > 0.2 ? 'hanging' : down < -0.2 ? 'auto' : 'middle'
  };
}
/** On how many spokes a is above b and b above a, both given. */

function compareRings(a, b) {
  let above = 0;
  let below = 0;
  a.forEach((value, index) => {
    if (value === null || b[index] === null) return;
    if (value > b[index]) above += 1;
    if (value < b[index]) below += 1;
  });
  return {
    above,
    below
  };
}

/***/ },

/***/ "9e93b6f8824a"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderRadarTemplate: () => (/* binding */ renderRadarTemplate)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2a080a730149");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("297fd25a909a");
/* harmony import */ var _default_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("ff752919558e");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([lit__WEBPACK_IMPORTED_MODULE_0__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__]);
([lit__WEBPACK_IMPORTED_MODULE_0__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__);


 // The figure of a radar chart: the label and the table button, the legend,
// the plot (SVG), the summary and the description, the live line, and the
// same data as a table.
//
// The plot is one Tab stop, a role="group" named by the label and described
// by the summary; its rings, spokes and marks are aria-hidden, because the
// summary, the live line and the table say what they show. A series is a
// colour class (--c1..--c4) and its values' mark shape (circle, square,
// triangle, diamond, a triangle down), and in forced colours its ring's
// dash too. A page's own colour (the colors setting, by the series' key) is
// --custom with its value in a style.

const colourOf = (place, paint) => `sf-chart-radar-series--${paint ? 'custom' : `c${place % 4 + 1}`}${place > 0 ? ` sf-chart-radar-series--d${Math.min(place, 7)}` : ''}`;

const paintOf = paint => paint ? `--sf-chart-radar--custom: ${paint}` : '';

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

function markMarkup([cx, cy], r, place, extra = '') {
  const corners = SHAPES[place % SHAPES.length]?.(r);
  if (!corners) return `<circle${extra} cx="${px(cx)}" cy="${px(cy)}" r="${px(r)}"/>`;
  return `<path${extra} d="${corners.map(([x, y], index) => `${index ? 'L' : 'M'}${px(cx + x)} ${px(cy + y)}`).join('')}Z"/>`;
}

const pathOf = (points, closed) => `${points.map(([x, y], index) => `${index ? 'L' : 'M'}${px(x)} ${px(y)}`).join('')}${closed ? 'Z' : ''}`;

function gridMarkup(g) {
  const [cx, cy] = g.center;
  let out = '<g class="sf-chart-radar-axes" aria-hidden="true">';

  for (const ring of g.rings) {
    if (g.grid === 'none' && ring !== g.rings[g.rings.length - 1]) continue;
    out += g.grid === 'circle' ? `<circle class="sf-chart-radar-grid" cx="${px(cx)}" cy="${px(cy)}" r="${px(ring.r)}"/>` : `<path class="sf-chart-radar-grid" d="${pathOf(ring.points, true)}"/>`;
  }

  for (const spoke of g.spokes) {
    out += `<line class="sf-chart-radar-spoke" x1="${px(cx)}" y1="${px(cy)}" x2="${px(spoke.x)}" y2="${px(spoke.y)}"/>`;
  }

  for (const spoke of g.spokes) {
    out += `<text class="sf-chart-radar-spoke-label" x="${px(spoke.lx)}" y="${px(spoke.ly)}" text-anchor="${spoke.anchor}" dominant-baseline="${spoke.baseline === 'auto' ? 'auto' : spoke.baseline}">${esc(spoke.text)}</text>`;
  }

  return `${out}</g>`;
} // The scale's values up the first spoke, beside it, over the series with a
// rim of the surface, so a line under one does not cross it out.


function ticksMarkup(g) {
  const [cx, cy] = g.center;
  return `<g class="sf-chart-radar-ticks" aria-hidden="true">${g.rings.map(ring => `<text class="sf-chart-radar-tick" x="${px(cx + 4)}" y="${px(cy - ring.r)}" dominant-baseline="hanging">${esc(ring.text)}</text>`).join('')}</g>`;
}

function seriesMarkup(g, paint, area) {
  let out = '<g class="sf-chart-radar-marks" aria-hidden="true">';

  for (const one of g.series) {
    let own = '';
    if (area && one.ring.closed) own += `<path class="sf-chart-radar-area" d="${pathOf(one.ring.runs[0], true)}"/>`;

    for (const run of one.ring.runs) {
      own += run.length > 1 ? `<path class="sf-chart-radar-line" d="${pathOf(run, one.ring.closed)}"/>` : '';
    }

    for (const mark of one.marks) own += markMarkup(mark.point, g.dot, one.place, ' class="sf-chart-radar-dot"');

    out += `<g class="sf-chart-radar-series ${colourOf(one.place, paint.get(one.key))}"${paintAttr(paint.get(one.key))} data-series="${esc(one.key)}">${own}</g>`;
  }

  return `${out}</g>`;
} // The cursor: its spoke drawn heavier and a ring round its value's mark.


function cursorMarkup(g, cursor) {
  if (!cursor) return '';
  const spoke = g.spokes[cursor.index];
  if (!spoke) return '';
  const [cx, cy] = g.center;
  let out = '<g class="sf-chart-radar-cursor" aria-hidden="true">';
  out += `<line class="sf-chart-radar-crosshair" x1="${px(cx)}" y1="${px(cy)}" x2="${px(spoke.x)}" y2="${px(spoke.y)}"/>`;
  const mark = g.series.find(one => one.key === cursor.series)?.marks.find(one => one.index === cursor.index);
  if (mark) out += `<circle class="sf-chart-radar-ring" cx="${px(mark.point[0])}" cy="${px(mark.point[1])}" r="${px(g.dot * 1.25 + 4)}"/>`;
  return `${out}</g>`;
}

const swatchMarkup = place => `<svg viewBox="-6 -6 12 12" focusable="false"><line x1="-6" x2="6" y1="0" y2="0"/>${markMarkup([0, 0], 3, place)}</svg>`; // The tooltip at the spoke's end: its name and every shown series' value.


function renderTooltip(context, g, cursor) {
  if (!cursor || context.tooltip === 'none') return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const {
    component,
    model,
    shown
  } = context;
  const spoke = g.spokes[cursor.index];
  if (!spoke) return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const flip = spoke.x > g.width / 2;
  const below = spoke.y < g.height / 2;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${`sf-chart-radar-tooltip${flip ? ' sf-chart-radar-tooltip--flip' : ''}${below ? ' sf-chart-radar-tooltip--below' : ''}`} aria-hidden="true"
         style=${`inset-inline-start: ${px(spoke.x)}px; inset-block-start: ${px(spoke.y)}px`}>
      <div class="sf-chart-radar-tooltip-name">${component.spokeName(model, cursor.index)}</div>
      ${shown.map(one => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <div class=${`sf-chart-radar-tooltip-row ${colourOf(one.place, context.paint.get(one.key))}${one.key === cursor.series ? ' sf-chart-radar-tooltip-row--on' : ''}`}
             style=${paintOf(context.paint.get(one.key)) || lit__WEBPACK_IMPORTED_MODULE_0__.nothing}>
          <span class="sf-chart-radar-swatch" .innerHTML=${swatchMarkup(one.place)}></span>
          <span>${one.name}</span>
          <span class="sf-chart-radar-tooltip-value">${one.values[cursor.index] === null ? component.words('gap') : component.sayY(one.values[cursor.index])}</span>
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
    <div class=${`sf-chart-radar-legend sf-chart-radar-legend--${place}`} role="group" aria-label=${component.words('legend')}>
      ${model.series.map((one, index) => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <button type="button" class=${`sf-chart-radar-legend-item ${colourOf(index, context.paint.get(one.key))}`}
                style=${paintOf(context.paint.get(one.key)) || lit__WEBPACK_IMPORTED_MODULE_0__.nothing} aria-pressed=${hidden.has(one.key) ? 'false' : 'true'}
                data-series=${one.key} @click=${() => component.toggleSeries(one.key)}>
          <span class="sf-chart-radar-swatch" aria-hidden="true" .innerHTML=${swatchMarkup(index)}></span>
          <span class="sf-chart-radar-legend-name">${one.name}</span>
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
    <div class=${shownTable ? 'sf-chart-radar-table' : 'sf-chart-radar-sr'}>
      <table>
        <caption>${label}</caption>
        <thead>
          <tr>
            <th scope="col">${component.xLabel || model.xField || component.words('spoke-column')}</th>
            ${model.series.map(one => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<th scope="col">${one.name}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${model.labels.map((_, index) => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
            <tr>
              <th scope="row">${component.spokeName(model, index)}</th>
              ${model.series.map(one => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<td>${one.values[index] === null ? '' : component.sayY(one.values[index])}</td>`)}
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
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-radar-loading" role="status" aria-busy="true"><span class="sf-chart-radar-sr">${component.words('loading')}</span></div>`;
  }

  if (state === 'empty' || state === 'error') {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
      <sf-empty-state class="sf-chart-radar-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
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
    <svg class="sf-chart-radar-svg" role="group" tabindex="0" focusable="true"
         aria-label=${context.label} aria-roledescription=${component.words('roledescription')}
         aria-describedby=${described || lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
         width=${g.width} height=${g.height} viewBox=${`0 0 ${g.width} ${g.height}`}
         @keydown=${event => component.onPlotKey(event)}
         @pointermove=${event => component.onPointerMove(event)}
         @pointerleave=${() => component.onPointerLeave()}
         @click=${event => component.onPlotClick(event)}
         @blur=${() => component.setCursor(null)}
         .innerHTML=${gridMarkup(g) + cursorMarkup(g, cursor) + seriesMarkup(g, paint, context.fill !== 'none') + ticksMarkup(g)}>
    </svg>
    ${renderTooltip(context, g, cursor)}
  `;
}

function renderRadarTemplate(context) {
  const {
    component,
    uid,
    state
  } = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <figure class=${['sf-chart-radar', `sf-chart-radar--size-${size}`, `sf-chart-radar--${state}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-chart-radar-head">
        <span class="sf-chart-radar-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.table === 'toggle' && state === 'ready' ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<button type="button" class="sf-chart-radar-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      </figcaption>
      ${renderLegend(context, 'top')}
      <div class="sf-chart-radar-plot" ?hidden=${tableView}>${renderPlot(context)}</div>
      ${renderLegend(context, 'bottom')}
      ${context.summaryText ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<p class="sf-chart-radar-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      ${context.hasDescription ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-radar-description" id=${`${uid}-description`}>${context.description}</div>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      <div class="sf-chart-radar-sr" aria-live="polite">${context.said}</div>
      ${renderTable(context)}
    </figure>
  `;
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "ff752919558e"
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

/***/ "f7f6308dd740"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("chart/describe", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("chart/describe", 1).then(resolve, reject), { once: true })));

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

/***/ "60cb04c9e408"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"id":"smart.chart-radar","tag":"sf-chart-radar","version":"0.1.1","kind":"leaf","settings":{"label":{"type":"string","default":""},"items":{"type":"list","default":[],"of":"object"},"names":{"type":"object","default":{}},"colors":{"type":"object","default":{}},"palette":{"type":"enum","values":["theme","vivid","soft","warm","cool","brand"],"default":"theme"},"x":{"type":"string","default":""},"y":{"type":"string","default":""},"series":{"type":"string","default":""},"min":{"type":"number","optional":true},"max":{"type":"number","optional":true},"grid":{"type":"enum","values":["polygon","circle","none"],"default":"polygon"},"fill":{"type":"enum","values":["area","none"],"default":"area"},"legend":{"type":"enum","values":["auto","top","bottom","none"],"default":"auto"},"tooltip":{"type":"enum","values":["spoke","none"],"default":"spoke"},"x-label":{"type":"string","default":""},"y-format":{"type":"string","default":"number"},"size":{"type":"enum","values":["1/2","1","2"],"default":"1"},"table":{"type":"enum","values":["toggle","visible","hidden"],"default":"toggle"},"summary":{"type":"enum","values":["auto","none"],"default":"auto"},"data-state":{"type":"enum","values":["auto","loading","ready","empty","error"],"default":"auto"}},"values":{"hidden-series":{"type":"list","default":[],"of":"string"}},"events":{"toggle":{"carries":{"id":"string","hidden":"boolean"}},"select":{"carries":{"series":"string","index":"number","spoke":"string","value":"number"}},"refresh":{"carries":{}}},"actions":{"reset":{"with":{}}},"presentation":{"skeleton":{"late":["items"]}},"css-variables":{"--sf-chart-radar-height":{"type":"length","state":"default"},"--sf-chart-radar-grid-color":{"type":"color","state":"default"},"--sf-chart-radar-baseline-color":{"type":"color","state":"default"},"--sf-chart-radar-label-color":{"type":"color","state":"default"},"--sf-chart-radar-hover-background-color":{"type":"color","state":"hover"},"--sf-chart-radar-hidden-color":{"type":"color","state":"disabled"}}}');

/***/ },

/***/ "fb41d0a58104"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Radar chart","runtime":{"untitled":"Chart","roledescription":"radar chart","summary-spokes":"Spokes: {count}, values from {min} to {max}.","summary-one":"Strongest {high} ({highValue}), weakest {low} ({lowValue}).","summary-series":"{name}: strongest {high} ({highValue}), weakest {low} ({lowValue}).","summary-even":"{value} everywhere.","summary-even-series":"{name}: {value} everywhere.","summary-compare":"{a} is above {b} on {above} of {count} spokes, below on {below}.","summary-gaps":"Gaps: {count}.","summary-empty":"No data.","cursor":"{spoke}: {value}","cursor-series":"{spoke}, {series}: {value}","spoke-n":"Spoke {n}","spoke-column":"Spoke","gap":"no data","show-table":"Table","legend":"Series","loading":"Loading the chart\'s data","empty-title":"No data for the chart","error-title":"Could not load the data"},"events":{"toggle":{"label":"Hide or show a series"},"select":{"label":"Choose a value"},"refresh":{"label":"Load the data again"}},"actions":{"reset":{"label":"Show every series"}}}');

/***/ },

/***/ "77dc24a1b1fa"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Лепестковая диаграмма","runtime":{"untitled":"График","roledescription":"лепестковая диаграмма","summary-spokes":"Осей: {count}, значения от {min} до {max}.","summary-one":"Сильнее всего — {high} ({highValue}), слабее всего — {low} ({lowValue}).","summary-series":"{name}: сильнее всего — {high} ({highValue}), слабее всего — {low} ({lowValue}).","summary-even":"Везде {value}.","summary-even-series":"{name}: везде {value}.","summary-compare":"{a} выше, чем {b}, на осях: {above} из {count}, ниже: {below}.","summary-gaps":"Пропусков: {count}.","summary-empty":"Нет данных.","cursor":"{spoke}: {value}","cursor-series":"{spoke}, {series}: {value}","spoke-n":"Ось {n}","spoke-column":"Ось","gap":"нет данных","show-table":"Таблица","legend":"Ряды","loading":"Загрузка данных графика","empty-title":"Нет данных для графика","error-title":"Не удалось загрузить данные"},"events":{"toggle":{"label":"Скрыть или показать ряд"},"select":{"label":"Выбрать значение"},"refresh":{"label":"Загрузить данные заново"}},"actions":{"reset":{"label":"Показать все ряды"}}}');

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
/******/ 	let __webpack_exports__ = __webpack_require__("bd3026c1bcac");
/******/
/******/ })()
;