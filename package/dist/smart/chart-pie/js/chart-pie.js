/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "cceab7cff870"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("deb1a4d61565");
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("5b7d7695b41b");
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("43090d1c8307");
/* harmony import */ var _chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("1a60ce635d04");
/* harmony import */ var _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("dd0c3978091b");
/* harmony import */ var _chart_core_arc_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("3de1fea7d4a8");
/* harmony import */ var _chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("43efc6ca45fc");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("297fd25a909a");
/* harmony import */ var _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("8c84a9c1df25");
/* harmony import */ var _chart_core_palettes_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("a128d5f62041");
/* harmony import */ var _js_templates_default__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("1dac871cd486");
/* harmony import */ var _component_json__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("2bf85c4bcec4");
/* harmony import */ var _lang_en_json__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("6d11610e3854");
/* harmony import */ var _lang_ru_json__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("3ad65215a6be");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__, _chart_core_arc_js__WEBPACK_IMPORTED_MODULE_5__, _chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_6__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_7__, _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_8__, _chart_core_palettes_js__WEBPACK_IMPORTED_MODULE_9__, _js_templates_default__WEBPACK_IMPORTED_MODULE_10__]);
([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__, _chart_core_arc_js__WEBPACK_IMPORTED_MODULE_5__, _chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_6__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_7__, _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_8__, _chart_core_palettes_js__WEBPACK_IMPORTED_MODULE_9__, _js_templates_default__WEBPACK_IMPORTED_MODULE_10__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _chart_core_data_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _chart_core_arc_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_chart_core_arc_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_chart_core_settle_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _chart_core_palettes_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_chart_core_palettes_js__WEBPACK_IMPORTED_MODULE_9__);
// sf-chart-pie: the parts of one whole as slices of a circle, or of a ring
// with the total in the middle (docs/DECISIONS.md D1).
//
// The element reads its data once into parts (chart-core/data), folds the
// smallest into «Другое» past max-parts, measures its plot, and draws one
// slice per part in SVG (chart-core/arc). A person reaches the plot with one
// Tab stop and walks the parts with the arrows (chart-core/cursor); every
// move is said in a polite live region, the whole in a summary sentence, and
// the same data is a table on request.
//
// It renders into its own light DOM, like every Smart component.














const FONT = {
  '1/2': 11,
  1: 12,
  2: 14
};
const CHAR = 0.6;
const OTHER = '\u0000other';
const TURN = Math.PI * 2;
const ChartPieElement = (0,_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__.elementFromManifest)(_component_json__WEBPACK_IMPORTED_MODULE_11__, {
  base: (_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default()),
  lang: {
    en: _lang_en_json__WEBPACK_IMPORTED_MODULE_12__,
    ru: _lang_ru_json__WEBPACK_IMPORTED_MODULE_13__
  },
  source: 'ru',
  actions: {
    reset() {
      this.hiddenParts = [];
      this._cursor = null;
      this.requestComponentUpdate('reset');
    }

  }
});
let instances = 0;

class SfPieChart extends ChartPieElement {
  static get props() {
    return { ...super.props,
      rootClass: {
        default: ''
      }
    };
  }

  onConnected() {
    this._uid = this.id || `sf-chart-pie-${instances += 1}`;
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
    const checked = (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_8__.coloursKey)(colours);

    if (checked !== this._coloursChecked && this.isConnected) {
      this._coloursChecked = checked;
      (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_8__.checkContrast)(this, colours, 'sf-chart-pie');
    }

    const plot = this.querySelector('.sf-chart-pie-plot');

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
      this._colours = (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_8__.readColours)(this.colors, said => console.warn(`<sf-chart-pie> ${said}`));
    }

    return this._colours;
  } // Each part's colour by key: the page's own (colors) or the named
  // palette's by place (chart-core/palettes, D7). With neither, the template
  // keeps the theme's colours.


  paints(list) {
    const own = this.colours();
    const set = _chart_core_palettes_js__WEBPACK_IMPORTED_MODULE_9__.PALETTES[this.palette];
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
  } // The data as rows (every category, as given) and parts (what the slices
  // are): past max-parts the smallest positive rows fold into one «Другое».


  model() {
    const key = [this.items, this.names, this.category, this.value, this.maxParts];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;
    const read = (0,_chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__.readSeries)(this.items, {
      x: this.category,
      y: this.value.split(',')[0].trim(),
      xScale: 'category'
    });
    const one = read.series[0];
    const names = this.names || {};
    const unit = read.kind === 'time' ? (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.timeUnitOf)(read.xs) : 'day';

    const sayKey = index => {
      const label = read.labels[index];
      if (names[label] !== undefined) return names[label];
      if (read.kind === 'time') return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatTime)(read.xs[index], (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), unit, {
        form: 'full'
      });
      return String(label ?? '');
    };

    const rows = read.xs.map((_, index) => ({
      key: String(read.labels[index] ?? ''),
      name: sayKey(index),
      value: one ? one.values[index] : null,
      index
    }));
    const positive = rows.filter(row => row.value !== null && row.value > 0);
    const most = Math.max(2, Number.isFinite(this.maxParts) && this.maxParts > 0 ? Math.floor(this.maxParts) : 7);
    let parts = positive;

    if (positive.length > most) {
      const kept = new Set([...positive].sort((a, b) => b.value - a.value).slice(0, most - 1).map(row => row.index));
      const rest = positive.filter(row => !kept.has(row.index));
      parts = [...positive.filter(row => kept.has(row.index)), {
        key: OTHER,
        name: this.words('other'),
        value: rest.reduce((sum, row) => sum + row.value, 0),
        index: -1,
        folded: rest.length
      }];
    }

    this._model = {
      kind: read.kind,
      categoryField: read.xField,
      valueField: one?.key ?? '',
      rows,
      parts: parts.map((part, place) => ({ ...part,
        place
      }))
    };
    return this._model;
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.parts.length ? 'ready' : 'empty';
  } // The parts with their shares of what is shown: a hidden part leaves the
  // whole, so the others' shares are of the rest.


  shares(model) {
    const hidden = new Set(this.hiddenParts || []);
    const total = model.parts.reduce((sum, part) => sum + (hidden.has(part.key) ? 0 : part.value), 0);
    return model.parts.map(part => ({ ...part,
      hidden: hidden.has(part.key),
      share: hidden.has(part.key) || !total ? 0 : part.value / total
    }));
  }

  sayY(value) {
    return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(value, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.valueFormat, {
      gap: this.words('gap')
    });
  }

  sayShare(share) {
    return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(share, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), 'percent');
  }

  sayPart(part) {
    return this.words('part', {
      share: this.sayShare(part.share),
      value: this.sayY(part.value)
    });
  }

  geometry(parts) {
    const {
      width,
      height
    } = this._box;
    if (!width || !height) return null;
    const font = FONT[this.size] ?? 12;
    const shown = parts.filter(part => !part.hidden);
    const outer = Math.max(8, Math.min(width, height) / 2 - 4);
    const inner = this.hole === 'ring' ? outer * 0.6 : 0;
    const cx = width / 2;
    const cy = height / 2;
    const slices = (0,_chart_core_arc_js__WEBPACK_IMPORTED_MODULE_5__.pieSlices)(shown.map(part => part.value)).map(slice => {
      const part = shown[slice.index];
      const d = (0,_chart_core_arc_js__WEBPACK_IMPORTED_MODULE_5__.arcPath)(slice, {
        cx,
        cy,
        outer,
        inner
      }); // A share is written inside its slice when the slice has room for it.

      const text = this.sayShare(slice.share);
      const r = inner ? (inner + outer) / 2 : outer * 0.62;
      const room = (slice.end - slice.start) * r;
      const thick = outer - inner;
      const fits = this.shareLabels === 'inside' && room > text.length * font * CHAR + 4 && thick > font * 1.6;
      const [lx, ly] = (0,_chart_core_arc_js__WEBPACK_IMPORTED_MODULE_5__.arcMiddle)(slice, {
        cx,
        cy
      }, r);
      const [tx, ty] = (0,_chart_core_arc_js__WEBPACK_IMPORTED_MODULE_5__.arcMiddle)(slice, {
        cx,
        cy
      }, outer);
      return {
        index: part.place,
        key: part.key,
        place: part.place,
        start: slice.start,
        end: slice.end,
        d,
        label: fits ? {
          x: lx,
          y: ly,
          text
        } : null,
        tip: {
          x: tx,
          y: ty
        }
      };
    });
    const total = inner && this.total === 'auto' ? this.sayY(shown.reduce((sum, part) => sum + part.value, 0)) : '';
    return {
      width,
      height,
      font,
      cx,
      cy,
      outer,
      inner,
      slices,
      total,
      totalWord: this.words('total')
    };
  }

  summarize(model, parts) {
    if (this.summary === 'none') return '';
    const shown = parts.filter(part => !part.hidden);
    const total = shown.reduce((sum, part) => sum + part.value, 0);
    const out = [this.words('summary-total', {
      count: shown.length,
      total: this.sayY(total)
    })];

    for (const part of [...shown].sort((a, b) => b.value - a.value)) out.push(this.words('summary-part', {
      name: part.name,
      part: this.sayPart(part)
    }));

    return out.join(' ');
  }

  cursorLine(parts, cursor) {
    const part = parts[cursor.index];
    return part ? this.words('cursor', {
      name: part.name,
      part: this.sayPart(part)
    }) : '';
  }

  setCursor(cursor, {
    say = false
  } = {}) {
    this._cursor = cursor;
    if (say && cursor) this._said = this.cursorLine(this.shares(this.model()), cursor);
    this.requestComponentUpdate('cursor');
  } // The arrows walk the shown parts clockwise (Right, Down) or back (Left,
  // Up); Home and End go to the first and the last.


  onPlotKey(event) {
    const parts = this.shares(this.model());

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
    }

    const shown = parts.filter(part => !part.hidden).map(part => part.place);
    if (!shown.length) return;
    const flat = {
      ArrowUp: 'ArrowLeft',
      ArrowDown: 'ArrowRight'
    }[event.key] ?? event.key;
    const at = this._cursor ? shown.indexOf(this._cursor.index) : -1;
    const moved = (0,_chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_6__.moveCursor)(at < 0 ? null : {
      index: at,
      series: 'part'
    }, flat, {
      count: shown.length,
      shown: ['part']
    });
    if (!moved) return;
    event.preventDefault();
    this.setCursor({
      index: shown[moved.index],
      series: 'part'
    }, {
      say: true
    });
  }

  pointAt(event) {
    const g = this._geometry;
    if (!g) return null;
    const box = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - box.left - g.cx;
    const dy = event.clientY - box.top - g.cy;
    const distance = Math.hypot(dx, dy);
    if (distance > g.outer || distance < g.inner) return null;
    const angle = (Math.atan2(dx, -dy) + TURN) % TURN;
    const slice = g.slices.find(one => angle >= one.start && angle < one.end);
    return slice ? {
      index: slice.index,
      series: 'part'
    } : null;
  }

  onPointerMove(event) {
    const point = this.pointAt(event);

    if (!point) {
      if (this._cursor && !this.matches(':focus-within')) this.setCursor(null);
      return;
    }

    if (this._cursor && point.index === this._cursor.index) return;
    this.setCursor(point);
  }

  onPointerLeave() {
    if (this.matches(':focus-within')) return;
    this.setCursor(null);
  }

  onPlotClick(event) {
    const point = this.pointAt(event);
    if (point) this.choose(point);
  } // select carries the part as the data gave it: its category as x, its
  // index among the rows (-1 for «Другое»), its value.


  choose(cursor) {
    const model = this.model();
    const part = model.parts[cursor.index];
    if (!part) return;
    this.sfEmit('select', {
      series: model.valueField,
      index: part.index,
      x: part.key === OTHER ? '' : part.key,
      value: part.value
    });
  }

  togglePart(key) {
    const hidden = new Set(this.hiddenParts || []);
    const nowHidden = !hidden.has(key);
    if (nowHidden) hidden.add(key);else hidden.delete(key);
    this.hiddenParts = [...hidden];
    if (this._cursor && this.model().parts[this._cursor.index]?.key === key) this._cursor = null;
    this.sfEmit('toggle', {
      id: key === OTHER ? 'other' : key,
      hidden: nowHidden
    });
    this.requestComponentUpdate('hidden-parts');
  }

  toggleView() {
    this._view = this._view === 'table' ? 'chart' : 'table';
    this.requestComponentUpdate('view');
  }

  templateContext() {
    const model = this.model();
    const state = this.state(model);
    const parts = this.shares(model);
    const geometry = state === 'ready' ? this.geometry(parts) : null;
    this._geometry = geometry;
    const cursor = this._cursor && parts[this._cursor.index] && !parts[this._cursor.index].hidden ? this._cursor : null;
    const tableModel = this.tableModel(model, state === 'ready');
    const total = tableModel.rows.reduce((sum, row) => sum + (row.value !== null && row.value > 0 ? row.value : 0), 0);
    return this.createTemplateContext({ ...this.getPropsContext(),
      component: this,
      uid: this._uid,
      size: this.size,
      label: this.label || this.words('untitled'),
      state,
      model,
      parts,
      tableKey: [tableModel, this.label, this.categoryLabel, this.valueLabel, this.valueFormat, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.table, this.table === 'toggle' ? this._view : 'chart'],
      rows: tableModel.rows.map(row => ({ ...row,
        share: row.value !== null && row.value > 0 && total ? row.value / total : null
      })),
      geometry,
      cursor,
      said: this._said,
      view: this.table === 'toggle' ? this._view : 'chart',
      legend: this.legend,
      categoryLabel: this.categoryLabel || model.categoryField || this.words('category-column'),
      valueLabel: this.valueLabel || model.valueField || this.words('value-column'),
      summaryText: state === 'ready' ? this.summarize(model, parts) : '',
      hasDescription: this.hasSlotContent?.('description') ?? false,
      description: this.hasSlotContent?.('description') ? this.getSlotContent('description') : null,
      paint: this.paints(model?.parts ?? []),
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

    return (0,_chart_core_settle_js__WEBPACK_IMPORTED_MODULE_7__.settled)(this._table, model, {
      later: () => this.requestComponentUpdate('table')
    });
  }

  template() {
    return (0,_js_templates_default__WEBPACK_IMPORTED_MODULE_10__.renderPieChartTemplate)(this.templateContext());
  }

}

SfPieChart.define('sf-chart-pie');
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "1dac871cd486"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderPieChartTemplate: () => (/* binding */ renderPieChartTemplate)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2a080a730149");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("297fd25a909a");
/* harmony import */ var _default_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("ecae554f74b3");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([lit__WEBPACK_IMPORTED_MODULE_0__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__]);
([lit__WEBPACK_IMPORTED_MODULE_0__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__);


 // The figure of a pie chart: the label and the table button, the plot (SVG)
// with the legend beside it or under it, the summary and the description,
// the live line, and the same data as a table.
//
// The plot is one Tab stop, a role="group" named by the label and described
// by the summary; its slices are aria-hidden, because the summary, the live
// line, the legend and the table say what they show. A colour is a class
// (--c1..--c4, then lighter --t2); the order, a separator and the share
// inside tell the parts apart as well. A page's own colour (the colors
// setting, by the category) is --custom with its value in a style.

const colourOf = (place, paint) => paint ? 'sf-chart-pie-series--custom' : `sf-chart-pie-series--c${place % 4 + 1}${place >= 4 ? ' sf-chart-pie-series--t2' : ''}`;

const paintOf = paint => paint ? `--sf-chart-pie--custom: ${paint}` : '';

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

function slicesMarkup(g, cursor, paint) {
  let out = '<g class="sf-chart-pie-marks" aria-hidden="true">';

  for (const slice of g.slices) {
    const dim = cursor && cursor.index !== slice.index ? ' sf-chart-pie-series--dim' : '';
    out += `<g class="sf-chart-pie-series ${colourOf(slice.place, paint.get(slice.key))}${dim}"${paintAttr(paint.get(slice.key))} data-part="${esc(slice.key)}">`;
    out += `<path class="sf-chart-pie-slice" d="${slice.d}"/>`;
    if (slice.label) out += `<text class="sf-chart-pie-share" x="${px(slice.label.x)}" y="${px(slice.label.y)}" text-anchor="middle" dominant-baseline="middle">${esc(slice.label.text)}</text>`;
    out += '</g>';
  }

  if (g.total) {
    out += `<text class="sf-chart-pie-total" x="${px(g.cx)}" y="${px(g.cy - g.font * 0.1)}" text-anchor="middle" font-size="${px(g.font * 1.6)}">${esc(g.total)}</text>`;
    out += `<text class="sf-chart-pie-total-word" x="${px(g.cx)}" y="${px(g.cy + g.font * 1.3)}" text-anchor="middle">${esc(g.totalWord)}</text>`;
  }

  const current = cursor && g.slices.find(slice => slice.index === cursor.index);
  if (current) out += `<path class="sf-chart-pie-focus" d="${current.d}"/>`;
  return `${out}</g>`;
}

function renderTooltip(context, g, cursor) {
  if (!cursor || context.tooltip === 'none') return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const {
    component
  } = context;
  const part = context.parts[cursor.index];
  const slice = g.slices.find(one => one.index === cursor.index);
  if (!part || !slice) return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const flip = slice.tip.x > g.width / 2;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${`sf-chart-pie-tooltip${flip ? ' sf-chart-pie-tooltip--flip' : ''}`} aria-hidden="true"
         style=${`inset-inline-start: ${px(slice.tip.x)}px; inset-block-start: ${px(slice.tip.y)}px`}>
      <div class=${`sf-chart-pie-tooltip-row sf-chart-pie-tooltip-row--current ${colourOf(slice.place, context.paint.get(slice.key))}`}
           style=${paintOf(context.paint.get(slice.key)) || lit__WEBPACK_IMPORTED_MODULE_0__.nothing}>
        <span class="sf-chart-pie-swatch"></span>
        <span class="sf-chart-pie-tooltip-name">${part.name}</span>
        <span class="sf-chart-pie-tooltip-value">${component.sayPart(part)}</span>
      </div>
    </div>
  `;
}

function renderLegend(context) {
  if (context.legend === 'none' || context.state !== 'ready') return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const {
    component,
    parts
  } = context;
  const hidden = new Set(component.hiddenParts || []);
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class="sf-chart-pie-legend" role="group" aria-label=${component.words('legend')}>
      ${parts.map(part => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <button type="button" class=${`sf-chart-pie-legend-item ${colourOf(part.place, context.paint.get(part.key))}`}
                style=${paintOf(context.paint.get(part.key)) || lit__WEBPACK_IMPORTED_MODULE_0__.nothing} aria-pressed=${hidden.has(part.key) ? 'false' : 'true'}
                data-part=${part.key} @click=${() => component.togglePart(part.key)}>
          <span class="sf-chart-pie-swatch" aria-hidden="true"></span>
          <span class="sf-chart-pie-legend-name">${part.name}</span>
          ${hidden.has(part.key) ? lit__WEBPACK_IMPORTED_MODULE_0__.nothing : (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-chart-pie-legend-share">${component.sayShare(part.share)}</span>`}
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
    label
  } = context;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${shownTable ? 'sf-chart-pie-table' : 'sf-chart-pie-sr'}>
      <table>
        <caption>${label}</caption>
        <thead>
          <tr>
            <th scope="col">${context.categoryLabel}</th>
            <th scope="col">${context.valueLabel}</th>
            <th scope="col">${component.words('share-column')}</th>
          </tr>
        </thead>
        <tbody>
          ${context.rows.map(row => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
            <tr>
              <th scope="row">${row.name}</th>
              <td>${component.sayY(row.value)}</td>
              <td>${row.share === null ? component.words('gap') : component.sayShare(row.share)}</td>
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
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-pie-loading" role="status" aria-busy="true"><span class="sf-chart-pie-sr">${component.words('loading')}</span></div>`;
  }

  if (state === 'empty' || state === 'error') {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
      <sf-empty-state class="sf-chart-pie-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
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
    <svg class="sf-chart-pie-svg" role="group" tabindex="0" focusable="true"
         aria-label=${context.label} aria-roledescription=${component.words('roledescription')}
         aria-describedby=${described || lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
         width=${g.width} height=${g.height} viewBox=${`0 0 ${g.width} ${g.height}`}
         @keydown=${event => component.onPlotKey(event)}
         @pointermove=${event => component.onPointerMove(event)}
         @pointerleave=${() => component.onPointerLeave()}
         @click=${event => component.onPlotClick(event)}
         @blur=${() => component.setCursor(null)}
         .innerHTML=${slicesMarkup(g, cursor, context.paint)}>
    </svg>
    ${renderTooltip(context, g, cursor)}
  `;
}

function renderPieChartTemplate(context) {
  const {
    component,
    uid,
    state
  } = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <figure class=${['sf-chart-pie', `sf-chart-pie--size-${size}`, `sf-chart-pie--${state}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-chart-pie-head">
        <span class="sf-chart-pie-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.table === 'toggle' && state === 'ready' ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<button type="button" class="sf-chart-pie-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      </figcaption>
      <div class="sf-chart-pie-body">
        <div class="sf-chart-pie-layout" ?hidden=${tableView}>
          <div class="sf-chart-pie-plot">${renderPlot(context)}</div>
          ${renderLegend(context)}
        </div>
      </div>
      ${context.summaryText ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<p class="sf-chart-pie-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      ${context.hasDescription ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-pie-description" id=${`${uid}-description`}>${context.description}</div>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      <div class="sf-chart-pie-sr" aria-live="polite">${context.said}</div>
      ${renderTable(context)}
    </figure>
  `;
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "ecae554f74b3"
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "3de1fea7d4a8"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("chart/arc", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("chart/arc", 1).then(resolve, reject), { once: true })));

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

/***/ "2bf85c4bcec4"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"id":"smart.chart-pie","tag":"sf-chart-pie","version":"0.3.1","kind":"leaf","settings":{"label":{"type":"string","default":""},"items":{"type":"list","default":[],"of":"object"},"names":{"type":"object","default":{}},"colors":{"type":"object","default":{}},"palette":{"type":"enum","values":["theme","vivid","soft","warm","cool","brand"],"default":"theme"},"category":{"type":"string","default":""},"value":{"type":"string","default":""},"hole":{"type":"enum","values":["none","ring"],"default":"none"},"total":{"type":"enum","values":["auto","none"],"default":"auto"},"share-labels":{"type":"enum","values":["inside","none"],"default":"inside"},"max-parts":{"type":"number","default":7},"legend":{"type":"enum","values":["visible","none"],"default":"visible"},"tooltip":{"type":"enum","values":["part","none"],"default":"part"},"category-label":{"type":"string","default":""},"value-label":{"type":"string","default":""},"value-format":{"type":"string","default":"number"},"size":{"type":"enum","values":["1/2","1","2"],"default":"1"},"table":{"type":"enum","values":["toggle","visible","hidden"],"default":"toggle"},"summary":{"type":"enum","values":["auto","none"],"default":"auto"},"data-state":{"type":"enum","values":["auto","loading","ready","empty","error"],"default":"auto"}},"values":{"hidden-parts":{"type":"list","default":[],"of":"string"}},"events":{"toggle":{"carries":{"id":"string","hidden":"boolean"}},"select":{"carries":{"series":"string","index":"number","x":"string","value":"number"}},"refresh":{"carries":{}}},"actions":{"reset":{"with":{}}},"presentation":{"skeleton":{"late":["items"]}},"css-variables":{"--sf-chart-pie-height":{"type":"length","state":"default"},"--sf-chart-pie-label-color":{"type":"color","state":"default"},"--sf-chart-pie-hover-background-color":{"type":"color","state":"hover"},"--sf-chart-pie-hidden-color":{"type":"color","state":"disabled"},"--sf-chart-pie-gap-width":{"type":"length","state":"default"}}}');

/***/ },

/***/ "6d11610e3854"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Pie chart","runtime":{"untitled":"Pie chart","roledescription":"pie chart","summary-empty":"No data.","cursor":"{name}: {part}","gap":"no data","show-table":"Table","legend":"Parts","loading":"Loading the chart\'s data","empty-title":"No data for the chart","error-title":"Could not load the data","summary-total":"Parts: {count}, total {total}.","summary-part":"{name}: {part}.","part":"{share} ({value})","other":"Other","total":"total","share-column":"Share","category-column":"Part","value-column":"Value"},"events":{"toggle":{"label":"Hide or show a part"},"select":{"label":"Choose a part"},"refresh":{"label":"Load the data again"}},"actions":{"reset":{"label":"Show every part"}}}');

/***/ },

/***/ "3ad65215a6be"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Круговая диаграмма","runtime":{"untitled":"Круговая диаграмма","roledescription":"круговая диаграмма","summary-empty":"Нет данных.","cursor":"{name}: {part}","gap":"нет данных","show-table":"Таблица","legend":"Части","loading":"Загрузка данных диаграммы","empty-title":"Нет данных для диаграммы","error-title":"Не удалось загрузить данные","summary-total":"Частей: {count}, всего {total}.","summary-part":"{name}: {part}.","part":"{share} ({value})","other":"Другое","total":"всего","share-column":"Доля","category-column":"Часть","value-column":"Значение"},"events":{"toggle":{"label":"Скрыть или показать часть"},"select":{"label":"Выбрать часть"},"refresh":{"label":"Загрузить данные заново"}},"actions":{"reset":{"label":"Показать все части"}}}');

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
/******/ 	let __webpack_exports__ = __webpack_require__("cceab7cff870");
/******/
/******/ })()
;