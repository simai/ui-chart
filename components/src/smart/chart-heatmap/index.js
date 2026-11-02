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
import SfBaseElement from '../../core/js/smart-base';
import {elementFromManifest} from '../../core/js/element-manifest';
import {pageLocale} from '../../core/js/page-language';
import {readNumber, readRows} from '../chart-core/data.js';
import {formatNumber} from '../chart-core/format.js';
import {settled} from '../chart-core/settle.js';
import {heatColours, heatSteps, stepCount, stepOf} from '../chart-core/heat.js';
import {renderHeatmapTemplate} from './js/templates/default';
import manifest from './component.json';
import en from './lang/en.json';
import ru from './lang/ru.json';

// The text of the grid and a row's height, in px, by size rung.
const FONT = {'1/2': 11, 1: 12, 2: 14};
const CELL = {'1/2': 20, 1: 28, 2: 36};
const CHAR = 0.6;

const ChartHeatmapElement = elementFromManifest(manifest, {
  base: SfBaseElement,
  lang: {en, ru},
  source: 'ru',
});

let instances = 0;

class SfChartHeatmap extends ChartHeatmapElement {
  static get props() {
    return {...super.props, rootClass: {default: ''}};
  }

  onConnected() {
    this._uid = this.id || `sf-chart-heatmap-${(instances += 1)}`;
    this._box = this._box ?? {width: 0};
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
        this._box = {width};
        this.requestComponentUpdate('box');
      });
      this._observer.observe(plot);
    }
    return undefined;
  }

  words(key, vars) {
    return this.sfWord(key, vars ? {vars} : undefined);
  }

  // The data as a grid: the columns (x) and the rows (y) in the order the
  // data first give them, a value per pair or null for a gap. A pair given
  // twice keeps its last value: adding them up is the host's work.
  model() {
    const key = [this.items, this.names, this.x, this.y, this.value];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;
    const rows = readRows(this.items);
    const fields = rows.length ? Object.keys(rows[0]) : [];
    const xField = this.x || fields[0] || '';
    const yField = this.y || fields.find((field) => field !== xField) || '';
    const valueField = this.value || fields.find((field) => field !== xField && field !== yField && rows.some((row) => readNumber(row[field]) !== null)) || '';
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
      cells.set(`${columns.get(xKey)}|${lines.get(yKey)}`, readNumber(row[valueField]));
    }
    const nameOf = (one) => (names[one] !== undefined ? String(names[one]) : one);
    const xs = [...columns.keys()].map((one) => ({key: one, name: nameOf(one)}));
    const ys = [...lines.keys()].map((one) => ({key: one, name: nameOf(one)}));
    const grid = ys.map((_, yi) => xs.map((__, xi) => (cells.has(`${xi}|${yi}`) ? cells.get(`${xi}|${yi}`) : null)));
    const values = grid.flat().filter((value) => value !== null);
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
      max: values.length ? Math.max(...values) : null,
    };
    return this._model;
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.count ? 'ready' : 'empty';
  }

  // The steps of the scale and their colours. min and max hold only when
  // given (an unset number reads 0); middle is the diverging scale's.
  scaleSteps(model) {
    const count = stepCount(this.steps, this.scale);
    const min = this.hasAttribute('min') && Number.isFinite(this.min) ? this.min : model.min;
    const max = this.hasAttribute('max') && Number.isFinite(this.max) ? this.max : model.max;
    const steps = heatSteps({min: Math.min(min, max), max: Math.max(min, max), middle: Number.isFinite(this.middle) ? this.middle : 0, count, scale: this.scale});
    const colours = heatColours({scale: this.scale, scheme: this.scheme, better: this.better, steps: count});
    return steps.map((step, index) => ({...step, ...colours[index], index}));
  }

  sayY(value) {
    return formatNumber(value, pageLocale(this), this.valueFormat, {gap: this.words('gap')});
  }

  sayStep(step) {
    return this.words('step', {from: this.sayY(step.from), to: this.sayY(step.to)});
  }

  // Where everything goes: the row names' column, a column's width, which
  // column names fit, and each cell with its step. Null until the plot has a
  // width; the height is the rows' and the names' line, known before.
  geometry(model, steps) {
    const {width} = this._box;
    if (!width) return null;
    const font = FONT[this.size] ?? 12;
    const cell = CELL[this.size] ?? 28;
    const longest = Math.max(0, ...model.ys.map((one) => one.name.length));
    const left = Math.min(Math.ceil(longest * font * CHAR) + 8, Math.round(width * 0.35));
    const columns = model.xs.length;
    const column = (width - left) / Math.max(1, columns);
    const gap = column >= 12 ? 2 : column >= 6 ? 1 : 0;
    const xLongest = Math.max(1, ...model.xs.map((one) => one.name.length));
    const every = Math.max(1, Math.ceil((xLongest * font * CHAR + 6) / column));
    const rowsHeight = model.ys.length * cell;
    const values = this.valueLabels !== 'none';
    const cells = [];
    model.grid.forEach((line, yi) => line.forEach((value, xi) => {
      const step = stepOf(steps, value);
      const text = value === null ? '' : this.sayY(value);
      const fits = values && value !== null && text.length * font * CHAR + 6 <= column - gap && cell - gap >= font + 4;
      cells.push({xi, yi, value, step, text: fits ? text : '', x: left + xi * column + gap / 2, y: yi * cell + gap / 2, width: Math.max(0, column - gap), height: cell - gap});
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
      rows: model.ys.map((one, yi) => ({name: fitName(one.name, left - 8), y: yi * cell + cell / 2})),
      columns: model.xs.map((one, xi) => (xi % every ? null : {name: fitName(one.name, column * every - 4), x: left + xi * column + column / 2})).filter(Boolean),
      xLabel: this.xLabel,
    };
  }

  // The plot's height from the rows and the size rung alone, so the first
  // paint holds it before the width is known. The sheet holds the same sum
  // from the rows' count (CELL and FONT are its c0/c4/c8 and b1/b2/b4).
  plotHeight(model) {
    const font = FONT[this.size] ?? 12;
    return model.ys.length * (CELL[this.size] ?? 28) + font + 10 + (this.xLabel ? font + 6 : 0);
  }

  cellAt(model, cursor) {
    if (!cursor) return null;
    const value = model.grid[cursor.yi]?.[cursor.xi];
    return value === undefined ? null : {x: model.xs[cursor.xi], y: model.ys[cursor.yi], value};
  }

  cursorLine(model, cursor) {
    const one = this.cellAt(model, cursor);
    return one ? this.words('cursor', {y: one.y.name, x: one.x.name, value: this.sayY(one.value)}) : '';
  }

  summarize(model) {
    if (this.summary === 'none') return '';
    const out = [this.words('summary-grid', {rows: model.ys.length, columns: model.xs.length, min: this.sayY(model.min), max: this.sayY(model.max)})];
    const where = (target) => {
      for (let yi = 0; yi < model.ys.length; yi += 1) {
        const xi = model.grid[yi].indexOf(target);
        if (xi !== -1) return {x: model.xs[xi].name, y: model.ys[yi].name};
      }
      return null;
    };
    const high = where(model.max);
    const low = where(model.min);
    if (high) out.push(this.words('summary-high', {value: this.sayY(model.max), y: high.y, x: high.x}));
    if (low && model.min !== model.max) out.push(this.words('summary-low', {value: this.sayY(model.min), y: low.y, x: low.x}));
    if (model.gaps) out.push(this.words('summary-gaps', {count: model.gaps}));
    return out.join(' ');
  }

  setCursor(cursor, {say = false} = {}) {
    this._cursor = cursor;
    if (say && cursor) this._said = this.cursorLine(this.model(), cursor);
    this.requestComponentUpdate('cursor');
  }

  // The arrows walk the grid: Left and Right along a row (in the reading
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
    const key = rtl ? ({ArrowLeft: 'ArrowRight', ArrowRight: 'ArrowLeft'}[event.key] ?? event.key) : event.key;
    const at = this._cursor ?? {xi: -1, yi: 0};
    const moves = {
      ArrowRight: () => ({xi: Math.min(columns - 1, at.xi + 1), yi: at.yi}),
      ArrowLeft: () => ({xi: Math.max(0, at.xi - 1), yi: at.yi}),
      ArrowDown: () => ({xi: Math.max(0, at.xi), yi: this._cursor ? Math.min(rows - 1, at.yi + 1) : 0}),
      ArrowUp: () => ({xi: Math.max(0, at.xi), yi: Math.max(0, at.yi - 1)}),
      Home: () => (event.ctrlKey || event.metaKey ? {xi: 0, yi: 0} : {xi: 0, yi: at.yi}),
      End: () => (event.ctrlKey || event.metaKey ? {xi: columns - 1, yi: rows - 1} : {xi: columns - 1, yi: at.yi}),
    };
    if (!moves[key]) return;
    event.preventDefault();
    this.setCursor(moves[key](), {say: true});
  }

  pointAt(event) {
    const box = event.target.closest?.('[data-cell]');
    if (!box) return null;
    const [xi, yi] = box.dataset.cell.split(',').map(Number);
    return {xi, yi};
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
  }

  // select carries the cell as the data gave it: its column as x, its row
  // as y, its value (null for a gap).
  choose(cursor) {
    const one = this.cellAt(this.model(), cursor);
    if (!one) return;
    this.sfEmit('select', {x: one.x.key, y: one.y.key, value: one.value});
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
    return this.createTemplateContext({
      ...this.getPropsContext(),
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
      tableKey: [tableModel, this.label, this.xLabel, this.yLabel, this.valueFormat, pageLocale(this), this.table, this.table === 'toggle' ? this._view : 'chart'],
      cursor,
      said: this._said,
      view: this.table === 'toggle' ? this._view : 'chart',
      legend: this.legend,
      summaryText: state === 'ready' ? this.summarize(model) : '',
      hasDescription: this.hasSlotContent?.('description') ?? false,
      description: this.hasSlotContent?.('description') ? this.getSlotContent('description') : null,
      rootClass: this.getRootClass(),
    });
  }

  // The data the table shows: settled, so a stream or a pointer move does
  // not rebuild a row on every render (chart-core/settle). The first data
  // after none shows at once: only a change of data already shown is held.
  tableModel(model, ready) {
    this._table = this._table ?? {};
    if (!ready) {
      clearTimeout(this._table.timer);
      this._table = {};
      return model;
    }
    return settled(this._table, model, {later: () => this.requestComponentUpdate('table')});
  }

  template() {
    return renderHeatmapTemplate(this.templateContext());
  }
}

SfChartHeatmap.define('sf-chart-heatmap');
