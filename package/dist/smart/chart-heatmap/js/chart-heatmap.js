/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "05e80692f615"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("deb1a4d61565");
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("5b7d7695b41b");
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("43090d1c8307");
/* harmony import */ var _chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("1a60ce635d04");
/* harmony import */ var _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("dd0c3978091b");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("297fd25a909a");
/* harmony import */ var _chart_core_heat_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("5cbf23f44ca8");
/* harmony import */ var _js_templates_default__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("79f4b5e491bf");
/* harmony import */ var _component_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("4933bc6a6649");
/* harmony import */ var _lang_en_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("1cc5c76c0305");
/* harmony import */ var _lang_ru_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("6612533ca0aa");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_5__, _chart_core_heat_js__WEBPACK_IMPORTED_MODULE_6__, _js_templates_default__WEBPACK_IMPORTED_MODULE_7__]);
([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_5__, _chart_core_heat_js__WEBPACK_IMPORTED_MODULE_6__, _js_templates_default__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _chart_core_data_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_chart_core_settle_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _chart_core_heat_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_chart_core_heat_js__WEBPACK_IMPORTED_MODULE_6__);
// sf-chart-heatmap: a measure over two categories, a cell per pair, its
// colour a step of an ordered scale (docs/DECISIONS.md D8): load by weekday
// and hour, activity by team and week, a change by region and month.
//
// The element reads its data once into a grid (chart-core/data), cuts the
// values into steps (chart-core/heat) and draws the cells, the row and
// column names and the values that fit in SVG. Its height is its rows', so
// it is known before the width is measured. A person reaches the grid with
// one Tab stop and walks it with the arrows, row by row; every move is said
// in a polite live region, the data as a whole in a summary sentence, and
// the same data is a table on request. Colour is never the only cue: a
// step's value is written in its cell when it fits, said in the tooltip,
// and the table holds them all.
//
// It renders into its own light DOM, like every Smart component.










 // The text of the grid and a row's height, in px, by size rung.

const FONT = {
  '1/2': 11,
  1: 12,
  2: 14
};
const CELL = {
  '1/2': 20,
  1: 28,
  2: 36
};
const CHAR = 0.6;
const ChartHeatmapElement = (0,_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__.elementFromManifest)(_component_json__WEBPACK_IMPORTED_MODULE_8__, {
  base: (_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default()),
  lang: {
    en: _lang_en_json__WEBPACK_IMPORTED_MODULE_9__,
    ru: _lang_ru_json__WEBPACK_IMPORTED_MODULE_10__
  },
  source: 'ru'
});
let instances = 0;

class SfChartHeatmap extends ChartHeatmapElement {
  static get props() {
    return { ...super.props,
      rootClass: {
        default: ''
      }
    };
  }

  onConnected() {
    this._uid = this.id || `sf-chart-heatmap-${instances += 1}`;
    this._box = this._box ?? {
      width: 0
    };
    this._cursor = null;
    this._said = '';
    this._view = 'chart';
  }

  onDisconnected() {
    this._observer?.disconnect();
    this._observer = null;
    this._observed = null;
    clearTimeout(this._table?.timer);
    super.onDisconnected();
  }

  afterRender(changed) {
    if (typeof changed === 'function') return super.afterRender(changed);
    const plot = this.querySelector('.sf-chart-heatmap-plot');

    if (plot && plot !== this._observed && typeof ResizeObserver === 'function') {
      this._observer?.disconnect();
      this._observed = plot;
      this._observer = new ResizeObserver(([entry]) => {
        const width = Math.round(entry.contentRect.width);
        if (width === this._box.width) return;
        this._box = {
          width
        };
        this.requestComponentUpdate('box');
      });

      this._observer.observe(plot);
    }

    return undefined;
  }

  words(key, vars) {
    return this.sfWord(key, vars ? {
      vars
    } : undefined);
  } // The data as a grid: the columns (x) and the rows (y) in the order the
  // data first give them, a value per pair or null for a gap. A pair given
  // twice keeps its last value: adding them up is the host's work.


  model() {
    const key = [this.items, this.names, this.x, this.y, this.value];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;
    const rows = (0,_chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__.readRows)(this.items);
    const fields = rows.length ? Object.keys(rows[0]) : [];
    const xField = this.x || fields[0] || '';
    const yField = this.y || fields.find(field => field !== xField) || '';
    const valueField = this.value || fields.find(field => field !== xField && field !== yField && rows.some(row => (0,_chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__.readNumber)(row[field]) !== null)) || '';
    const names = this.names || {};
    const columns = new Map();
    const lines = new Map();
    const cells = new Map();

    for (const row of rows) {
      const x = row[xField];
      const y = row[yField];
      if (x === undefined || x === null || y === undefined || y === null) continue;
      const [xKey, yKey] = [String(x), String(y)];
      if (!columns.has(xKey)) columns.set(xKey, columns.size);
      if (!lines.has(yKey)) lines.set(yKey, lines.size);
      cells.set(`${columns.get(xKey)}|${lines.get(yKey)}`, (0,_chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__.readNumber)(row[valueField]));
    }

    const nameOf = one => names[one] !== undefined ? String(names[one]) : one;

    const xs = [...columns.keys()].map(one => ({
      key: one,
      name: nameOf(one)
    }));
    const ys = [...lines.keys()].map(one => ({
      key: one,
      name: nameOf(one)
    }));
    const grid = ys.map((_, yi) => xs.map((__, xi) => cells.has(`${xi}|${yi}`) ? cells.get(`${xi}|${yi}`) : null));
    const values = grid.flat().filter(value => value !== null);
    this._model = {
      xField,
      yField,
      valueField,
      xs,
      ys,
      grid,
      count: values.length,
      gaps: xs.length * ys.length - values.length,
      min: values.length ? Math.min(...values) : null,
      max: values.length ? Math.max(...values) : null
    };
    return this._model;
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.count ? 'ready' : 'empty';
  } // The steps of the scale and their colours. min and max hold only when
  // given (an unset number reads 0); middle is the diverging scale's.


  scaleSteps(model) {
    const count = (0,_chart_core_heat_js__WEBPACK_IMPORTED_MODULE_6__.stepCount)(this.steps, this.scale);
    const min = this.hasAttribute('min') && Number.isFinite(this.min) ? this.min : model.min;
    const max = this.hasAttribute('max') && Number.isFinite(this.max) ? this.max : model.max;
    const steps = (0,_chart_core_heat_js__WEBPACK_IMPORTED_MODULE_6__.heatSteps)({
      min: Math.min(min, max),
      max: Math.max(min, max),
      middle: Number.isFinite(this.middle) ? this.middle : 0,
      count,
      scale: this.scale
    });
    const colours = (0,_chart_core_heat_js__WEBPACK_IMPORTED_MODULE_6__.heatColours)({
      scale: this.scale,
      scheme: this.scheme,
      better: this.better,
      steps: count
    });
    return steps.map((step, index) => ({ ...step,
      ...colours[index],
      index
    }));
  }

  sayY(value) {
    return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(value, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.valueFormat, {
      gap: this.words('gap')
    });
  }

  sayStep(step) {
    return this.words('step', {
      from: this.sayY(step.from),
      to: this.sayY(step.to)
    });
  } // Where everything goes: the row names' column, a column's width, which
  // column names fit, and each cell with its step. Null until the plot has a
  // width; the height is the rows' and the names' line, known before.


  geometry(model, steps) {
    const {
      width
    } = this._box;
    if (!width) return null;
    const font = FONT[this.size] ?? 12;
    const cell = CELL[this.size] ?? 28;
    const longest = Math.max(0, ...model.ys.map(one => one.name.length));
    const left = Math.min(Math.ceil(longest * font * CHAR) + 8, Math.round(width * 0.35));
    const columns = model.xs.length;
    const column = (width - left) / Math.max(1, columns);
    const gap = column >= 12 ? 2 : column >= 6 ? 1 : 0;
    const xLongest = Math.max(1, ...model.xs.map(one => one.name.length));
    const every = Math.max(1, Math.ceil((xLongest * font * CHAR + 6) / column));
    const rowsHeight = model.ys.length * cell;
    const values = this.valueLabels !== 'none';
    const cells = [];
    model.grid.forEach((line, yi) => line.forEach((value, xi) => {
      const step = (0,_chart_core_heat_js__WEBPACK_IMPORTED_MODULE_6__.stepOf)(steps, value);
      const text = value === null ? '' : this.sayY(value);
      const fits = values && value !== null && text.length * font * CHAR + 6 <= column - gap && cell - gap >= font + 4;
      cells.push({
        xi,
        yi,
        value,
        step,
        text: fits ? text : '',
        x: left + xi * column + gap / 2,
        y: yi * cell + gap / 2,
        width: Math.max(0, column - gap),
        height: cell - gap
      });
    }));

    const fitName = (name, room) => {
      const most = Math.max(1, Math.floor(room / (font * CHAR)));
      return name.length > most ? `${name.slice(0, Math.max(1, most - 1))}…` : name;
    };

    return {
      width,
      height: this.plotHeight(model),
      font,
      cell,
      left,
      column,
      rowsHeight,
      cells,
      rows: model.ys.map((one, yi) => ({
        name: fitName(one.name, left - 8),
        y: yi * cell + cell / 2
      })),
      columns: model.xs.map((one, xi) => xi % every ? null : {
        name: fitName(one.name, column * every - 4),
        x: left + xi * column + column / 2
      }).filter(Boolean),
      xLabel: this.xLabel
    };
  } // The plot's height from the rows and the size rung alone, so the first
  // paint holds it before the width is known. The sheet holds the same sum
  // from the rows' count (CELL and FONT are its c0/c4/c8 and b1/b2/b4).


  plotHeight(model) {
    const font = FONT[this.size] ?? 12;
    return model.ys.length * (CELL[this.size] ?? 28) + font + 10 + (this.xLabel ? font + 6 : 0);
  }

  cellAt(model, cursor) {
    if (!cursor) return null;
    const value = model.grid[cursor.yi]?.[cursor.xi];
    return value === undefined ? null : {
      x: model.xs[cursor.xi],
      y: model.ys[cursor.yi],
      value
    };
  }

  cursorLine(model, cursor) {
    const one = this.cellAt(model, cursor);
    return one ? this.words('cursor', {
      y: one.y.name,
      x: one.x.name,
      value: this.sayY(one.value)
    }) : '';
  }

  summarize(model) {
    if (this.summary === 'none') return '';
    const out = [this.words('summary-grid', {
      rows: model.ys.length,
      columns: model.xs.length,
      min: this.sayY(model.min),
      max: this.sayY(model.max)
    })];

    const where = target => {
      for (let yi = 0; yi < model.ys.length; yi += 1) {
        const xi = model.grid[yi].indexOf(target);
        if (xi !== -1) return {
          x: model.xs[xi].name,
          y: model.ys[yi].name
        };
      }

      return null;
    };

    const high = where(model.max);
    const low = where(model.min);
    if (high) out.push(this.words('summary-high', {
      value: this.sayY(model.max),
      y: high.y,
      x: high.x
    }));
    if (low && model.min !== model.max) out.push(this.words('summary-low', {
      value: this.sayY(model.min),
      y: low.y,
      x: low.x
    }));
    if (model.gaps) out.push(this.words('summary-gaps', {
      count: model.gaps
    }));
    return out.join(' ');
  }

  setCursor(cursor, {
    say = false
  } = {}) {
    this._cursor = cursor;
    if (say && cursor) this._said = this.cursorLine(this.model(), cursor);
    this.requestComponentUpdate('cursor');
  } // The arrows walk the grid: Left and Right along a row (in the reading
  // direction), Up and Down across rows; Home and End to a row's first and
  // last cell, with Ctrl to the grid's first and last. A gap is walked too:
  // it is said as having no data.


  onPlotKey(event) {
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

    const model = this.model();
    const [columns, rows] = [model.xs.length, model.ys.length];
    if (!columns || !rows) return;
    const rtl = this.matches(':dir(rtl)');
    const key = rtl ? {
      ArrowLeft: 'ArrowRight',
      ArrowRight: 'ArrowLeft'
    }[event.key] ?? event.key : event.key;
    const at = this._cursor ?? {
      xi: -1,
      yi: 0
    };
    const moves = {
      ArrowRight: () => ({
        xi: Math.min(columns - 1, at.xi + 1),
        yi: at.yi
      }),
      ArrowLeft: () => ({
        xi: Math.max(0, at.xi - 1),
        yi: at.yi
      }),
      ArrowDown: () => ({
        xi: Math.max(0, at.xi),
        yi: this._cursor ? Math.min(rows - 1, at.yi + 1) : 0
      }),
      ArrowUp: () => ({
        xi: Math.max(0, at.xi),
        yi: Math.max(0, at.yi - 1)
      }),
      Home: () => event.ctrlKey || event.metaKey ? {
        xi: 0,
        yi: 0
      } : {
        xi: 0,
        yi: at.yi
      },
      End: () => event.ctrlKey || event.metaKey ? {
        xi: columns - 1,
        yi: rows - 1
      } : {
        xi: columns - 1,
        yi: at.yi
      }
    };
    if (!moves[key]) return;
    event.preventDefault();
    this.setCursor(moves[key](), {
      say: true
    });
  }

  pointAt(event) {
    const box = event.target.closest?.('[data-cell]');
    if (!box) return null;
    const [xi, yi] = box.dataset.cell.split(',').map(Number);
    return {
      xi,
      yi
    };
  }

  onPointerMove(event) {
    const point = this.pointAt(event);

    if (!point) {
      if (this._cursor && !this.matches(':focus-within')) this.setCursor(null);
      return;
    }

    if (this._cursor && point.xi === this._cursor.xi && point.yi === this._cursor.yi) return;
    this.setCursor(point);
  }

  onPointerLeave() {
    if (this.matches(':focus-within')) return;
    this.setCursor(null);
  }

  onPlotClick(event) {
    const point = this.pointAt(event);
    if (point) this.choose(point);
  } // select carries the cell as the data gave it: its column as x, its row
  // as y, its value (null for a gap).


  choose(cursor) {
    const one = this.cellAt(this.model(), cursor);
    if (!one) return;
    this.sfEmit('select', {
      x: one.x.key,
      y: one.y.key,
      value: one.value
    });
  }

  toggleView() {
    this._view = this._view === 'table' ? 'chart' : 'table';
    this.requestComponentUpdate('view');
  }

  templateContext() {
    const model = this.model();
    const state = this.state(model);
    const steps = state === 'ready' ? this.scaleSteps(model) : [];
    const geometry = state === 'ready' ? this.geometry(model, steps) : null;
    const cursor = this._cursor && this.cellAt(model, this._cursor) ? this._cursor : null;
    const tableModel = this.tableModel(model, state === 'ready');
    return this.createTemplateContext({ ...this.getPropsContext(),
      component: this,
      uid: this._uid,
      size: this.size,
      label: this.label || this.words('untitled'),
      state,
      model,
      steps,
      geometry,
      rows: state === 'ready' ? model.ys.length : 0,
      tableModel,
      tableKey: [tableModel, this.label, this.xLabel, this.yLabel, this.valueFormat, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.table, this.table === 'toggle' ? this._view : 'chart'],
      cursor,
      said: this._said,
      view: this.table === 'toggle' ? this._view : 'chart',
      legend: this.legend,
      summaryText: state === 'ready' ? this.summarize(model) : '',
      hasDescription: this.hasSlotContent?.('description') ?? false,
      description: this.hasSlotContent?.('description') ? this.getSlotContent('description') : null,
      rootClass: this.getRootClass()
    });
  } // The data the table shows: settled, so a stream or a pointer move does
  // not rebuild a row on every render (chart-core/settle). The first data
  // after none shows at once: only a change of data already shown is held.


  tableModel(model, ready) {
    this._table = this._table ?? {};

    if (!ready) {
      clearTimeout(this._table.timer);
      this._table = {};
      return model;
    }

    return (0,_chart_core_settle_js__WEBPACK_IMPORTED_MODULE_5__.settled)(this._table, model, {
      later: () => this.requestComponentUpdate('table')
    });
  }

  template() {
    return (0,_js_templates_default__WEBPACK_IMPORTED_MODULE_7__.renderHeatmapTemplate)(this.templateContext());
  }

}

SfChartHeatmap.define('sf-chart-heatmap');
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "79f4b5e491bf"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderHeatmapTemplate: () => (/* binding */ renderHeatmapTemplate)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2a080a730149");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("297fd25a909a");
/* harmony import */ var _default_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("1dad82453393");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([lit__WEBPACK_IMPORTED_MODULE_0__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__]);
([lit__WEBPACK_IMPORTED_MODULE_0__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__);


 // The figure of a heatmap: the label and the table button, the scale's
// legend, the grid (SVG), the summary and the description, the live line,
// and the same data as a table.
//
// The grid is one Tab stop, a role="group" named by the label and described
// by the summary; its cells are aria-hidden, because the summary, the live
// line and the table say what they show. A cell's colour and its ink are
// its step's (chart-core/heat), set once on the grid; its value is written
// in it when it fits.

const px = value => `${Math.round(value * 10) / 10}`; // The steps' fills and inks, set once on the grid; a cell names its step
// (data-step) and the sheet picks that step's pair, so a cell's markup is
// its place and its value alone.


const stepColours = steps => steps.map((step, index) => `--sf-chart-heatmap--fill-${index}: ${step.fill}; --sf-chart-heatmap--ink-${index}: ${step.ink}`).join('; '); // The grid's inside is SVG markup set as the svg element's innerHTML (a
// property, so lit writes no part markers inside it: a first-paint snapshot
// of the grid is the same on every run). Every text is escaped.


const ESCAPES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

const esc = value => String(value).replace(/[&<>"']/gu, one => ESCAPES[one]);

function gridMarkup(g, steps, cursor) {
  let out = '<g class="sf-chart-heatmap-names" aria-hidden="true">';

  for (const row of g.rows) {
    out += `<text class="sf-chart-heatmap-name sf-chart-heatmap-name--row" x="${px(g.left - 8)}" y="${px(row.y)}">${esc(row.name)}</text>`;
  }

  for (const column of g.columns) {
    out += `<text class="sf-chart-heatmap-name" x="${px(column.x)}" y="${px(g.rowsHeight + g.font + 4)}">${esc(column.name)}</text>`;
  }

  if (g.xLabel) out += `<text class="sf-chart-heatmap-axis-label" x="${px(g.left + (g.width - g.left) / 2)}" y="${px(g.height - 2)}" >${esc(g.xLabel)}</text>`;
  out += '</g><g class="sf-chart-heatmap-cells" aria-hidden="true">';

  for (const one of g.cells) {
    const current = cursor && cursor.xi === one.xi && cursor.yi === one.yi;
    const dim = cursor && !current ? ' sf-chart-heatmap-cell--dim' : '';
    const kind = steps[one.step] ? '' : ' sf-chart-heatmap-cell--gap';
    const step = steps[one.step] ? ` data-step="${one.step}"` : '';
    out += `<g class="sf-chart-heatmap-cell${kind}${dim}"${step} data-cell="${one.xi},${one.yi}">`;
    out += `<rect class="sf-chart-heatmap-box" x="${px(one.x)}" y="${px(one.y)}" width="${px(one.width)}" height="${px(one.height)}"/>`;
    if (one.text) out += `<text class="sf-chart-heatmap-value" x="${px(one.x + one.width / 2)}" y="${px(one.y + one.height / 2)}">${esc(one.text)}</text>`;
    out += '</g>';
  }

  const focus = cursor && g.cells.find(one => one.xi === cursor.xi && one.yi === cursor.yi);
  if (focus) out += `<rect class="sf-chart-heatmap-focus" x="${px(focus.x - 1)}" y="${px(focus.y - 1)}" width="${px(focus.width + 2)}" height="${px(focus.height + 2)}"/>`;
  return `${out}</g>`;
} // The tooltip stands over the cell, flipped to its other side past the
// grid's middle so it stays inside.


function renderTooltip(context, g, cursor) {
  if (!cursor || !g || context.tooltip === 'none') return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const {
    component,
    model
  } = context;
  const one = component.cellAt(model, cursor);
  const cell = g.cells.find(item => item.xi === cursor.xi && item.yi === cursor.yi);
  if (!one || !cell) return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const flip = cell.x + cell.width / 2 > g.width / 2;
  const below = cell.y < g.cell * 2;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${['sf-chart-heatmap-tooltip', flip ? 'sf-chart-heatmap-tooltip--flip' : '', below ? 'sf-chart-heatmap-tooltip--below' : ''].filter(Boolean).join(' ')} aria-hidden="true"
         style=${`inset-inline-start: ${px(flip ? cell.x : cell.x + cell.width)}px; inset-block-start: ${px(below ? cell.y + cell.height : cell.y)}px`}>
      <div class="sf-chart-heatmap-tooltip-place">${one.y.name} · ${one.x.name}</div>
      <div class="sf-chart-heatmap-tooltip-value">${component.sayY(one.value)}</div>
    </div>
  `;
} // The scale's legend: a swatch per step with its range. A heatmap always
// has one, since its colours are an ordered scale, not names.


function renderLegend(context, place) {
  if (context.legend !== place || context.state !== 'ready' || !context.steps.length) return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const {
    component,
    steps
  } = context;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <ul class=${`sf-chart-heatmap-legend sf-chart-heatmap-legend--${place}`} aria-label=${component.words('legend')}>
      ${steps.map(step => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <li class="sf-chart-heatmap-legend-item">
          <span class="sf-chart-heatmap-swatch" aria-hidden="true" style=${`--sf-chart-heatmap--fill: ${step.fill}`}></span>
          <span class="sf-chart-heatmap-legend-range">${component.sayStep(step)}</span>
        </li>
      `)}
      ${context.model.gaps ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <li class="sf-chart-heatmap-legend-item">
          <span class="sf-chart-heatmap-swatch sf-chart-heatmap-swatch--gap" aria-hidden="true"></span>
          <span class="sf-chart-heatmap-legend-range">${component.words('gap')}</span>
        </li>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
    </ul>
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
    label,
    tableModel: model
  } = context;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${shownTable ? 'sf-chart-heatmap-table' : 'sf-chart-heatmap-sr'}>
      <table>
        <caption>${label}</caption>
        <thead>
          <tr>
            <th scope="col">${context.yLabel || model.yField || component.words('y-column')}</th>
            ${model.xs.map(one => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<th scope="col">${one.name}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${model.ys.map((row, yi) => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
            <tr>
              <th scope="row">${row.name}</th>
              ${model.grid[yi].map(value => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<td>${component.sayY(value)}</td>`)}
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
    steps,
    uid,
    state,
    cursor
  } = context;

  if (state === 'loading') {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-heatmap-loading" role="status" aria-busy="true"><span class="sf-chart-heatmap-sr">${component.words('loading')}</span></div>`;
  }

  if (state === 'empty' || state === 'error') {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
      <sf-empty-state class="sf-chart-heatmap-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
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
    <svg class="sf-chart-heatmap-svg" role="group" tabindex="0" focusable="true"
         aria-label=${context.label} aria-roledescription=${component.words('roledescription')}
         aria-describedby=${described || lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
         width=${g.width} height=${g.height} viewBox=${`0 0 ${g.width} ${g.height}`} style=${stepColours(steps)}
         @keydown=${event => component.onPlotKey(event)}
         @pointermove=${event => component.onPointerMove(event)}
         @pointerleave=${() => component.onPointerLeave()}
         @click=${event => component.onPlotClick(event)}
         @blur=${() => component.setCursor(null)}
         .innerHTML=${gridMarkup(g, steps, cursor)}></svg>
    ${renderTooltip(context, g, cursor)}
  `;
}

function renderHeatmapTemplate(context) {
  const {
    component,
    uid,
    state
  } = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <figure class=${['sf-chart-heatmap', `sf-chart-heatmap--size-${size}`, `sf-chart-heatmap--${state}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-chart-heatmap-head">
        <span class="sf-chart-heatmap-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.yLabel && state === 'ready' ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-chart-heatmap-y-label">${context.yLabel}</span>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
        ${context.table === 'toggle' && state === 'ready' ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<button type="button" class="sf-chart-heatmap-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      </figcaption>
      ${tableView ? lit__WEBPACK_IMPORTED_MODULE_0__.nothing : renderLegend(context, 'top')}
      <div class="sf-chart-heatmap-plot" ?hidden=${tableView}
           style=${context.rows ? `--sf-chart-heatmap--rows: ${context.rows}; --sf-chart-heatmap--x-label: ${context.xLabel ? 1 : 0}` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}>${renderPlot(context)}</div>
      ${tableView ? lit__WEBPACK_IMPORTED_MODULE_0__.nothing : renderLegend(context, 'bottom')}
      ${context.summaryText ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<p class="sf-chart-heatmap-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      ${context.hasDescription ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-heatmap-description" id=${`${uid}-description`}>${context.description}</div>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      <div class="sf-chart-heatmap-sr" aria-live="polite">${context.said}</div>
      ${renderTable(context)}
    </figure>
  `;
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "1dad82453393"
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "1a60ce635d04"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("chart/data", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("chart/data", 1).then(resolve, reject), { once: true })));

/***/ },

/***/ "dd0c3978091b"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("chart/format", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("chart/format", 1).then(resolve, reject), { once: true })));

/***/ },

/***/ "5cbf23f44ca8"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("chart/heat", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("chart/heat", 1).then(resolve, reject), { once: true })));

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

/***/ "4933bc6a6649"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"id":"smart.chart-heatmap","tag":"sf-chart-heatmap","version":"0.1.2","kind":"leaf","settings":{"label":{"type":"string","default":""},"items":{"type":"list","default":[],"of":"object"},"names":{"type":"object","default":{}},"x":{"type":"string","default":""},"y":{"type":"string","default":""},"value":{"type":"string","default":""},"scale":{"type":"enum","values":["sequential","diverging"],"default":"sequential"},"scheme":{"type":"enum","values":["primary","secondary","tertiary","neutral","success","warning","error","info"],"default":"primary"},"better":{"type":"enum","values":["up","down","none"],"default":"up"},"middle":{"type":"number","default":0},"min":{"type":"number","optional":true},"max":{"type":"number","optional":true},"steps":{"type":"number","default":5},"value-labels":{"type":"enum","values":["auto","none"],"default":"auto"},"legend":{"type":"enum","values":["top","bottom","none"],"default":"bottom"},"tooltip":{"type":"enum","values":["cell","none"],"default":"cell"},"x-label":{"type":"string","default":""},"y-label":{"type":"string","default":""},"value-format":{"type":"string","default":"number"},"size":{"type":"enum","values":["1/2","1","2"],"default":"1"},"table":{"type":"enum","values":["toggle","visible","hidden"],"default":"toggle"},"summary":{"type":"enum","values":["auto","none"],"default":"auto"},"data-state":{"type":"enum","values":["auto","loading","ready","empty","error"],"default":"auto"}},"values":{},"events":{"select":{"carries":{"x":"string","y":"string","value":"number"}},"refresh":{"carries":{}}},"actions":{},"presentation":{"skeleton":{"late":["items"]}},"css-variables":{"--sf-chart-heatmap-label-color":{"type":"color","state":"default"},"--sf-chart-heatmap-empty-color":{"type":"color","state":"default"},"--sf-chart-heatmap-cell-radius":{"type":"length","state":"default"}}}');

/***/ },

/***/ "1cc5c76c0305"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Heatmap","runtime":{"untitled":"Heatmap","roledescription":"heatmap","cursor":"{y}, {x}: {value}","gap":"no data","show-table":"Table","legend":"Scale","step":"{from} – {to}","loading":"Loading the chart data","empty-title":"No data for the chart","error-title":"The data could not be loaded","summary-grid":"Rows: {rows}, columns: {columns}; values from {min} to {max}.","summary-high":"Highest {value}: {y}, {x}.","summary-low":"Lowest {value}: {y}, {x}.","summary-gaps":"No data: {count}.","y-column":"Row"},"events":{"select":{"label":"Choose a cell"},"refresh":{"label":"Load the data again"}}}');

/***/ },

/***/ "6612533ca0aa"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Тепловая карта","runtime":{"untitled":"Тепловая карта","roledescription":"тепловая карта","cursor":"{y}, {x}: {value}","gap":"нет данных","show-table":"Таблица","legend":"Шкала","step":"{from} – {to}","loading":"Загрузка данных диаграммы","empty-title":"Нет данных для диаграммы","error-title":"Не удалось загрузить данные","summary-grid":"Строк: {rows}, столбцов: {columns}; значения от {min} до {max}.","summary-high":"Наибольшее {value}: {y}, {x}.","summary-low":"Наименьшее {value}: {y}, {x}.","summary-gaps":"Без данных: {count}.","y-column":"Строка"},"events":{"select":{"label":"Выбрать ячейку"},"refresh":{"label":"Загрузить данные заново"}}}');

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
/******/ 	let __webpack_exports__ = __webpack_require__("05e80692f615");
/******/
/******/ })()
;