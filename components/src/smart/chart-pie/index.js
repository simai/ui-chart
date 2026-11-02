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
import SfBaseElement from '../../core/js/smart-base';
import {elementFromManifest} from '../../core/js/element-manifest';
import {pageLocale} from '../../core/js/page-language';
import {readSeries} from '../chart-core/data.js';
import {formatNumber, formatTime, timeUnitOf} from '../chart-core/format.js';
import {arcMiddle, arcPath, pieSlices} from '../chart-core/arc.js';
import {moveCursor} from '../chart-core/cursor.js';
import {settled} from '../chart-core/settle.js';
import {checkContrast, coloursKey, readColours} from '../chart-core/colors.js';
import {renderPieChartTemplate} from './js/templates/default';
import manifest from './component.json';
import en from './lang/en.json';
import ru from './lang/ru.json';

const FONT = {'1/2': 11, 1: 12, 2: 14};
const CHAR = 0.6;
const OTHER = '\u0000other';
const TURN = Math.PI * 2;

const ChartPieElement = elementFromManifest(manifest, {
  base: SfBaseElement,
  lang: {en, ru},
  source: 'ru',
  actions: {
    reset() {
      this.hiddenParts = [];
      this._cursor = null;
      this.requestComponentUpdate('reset');
    },
  },
});

let instances = 0;

class SfPieChart extends ChartPieElement {
  static get props() {
    return {...super.props, rootClass: {default: ''}};
  }

  onConnected() {
    this._uid = this.id || `sf-chart-pie-${(instances += 1)}`;
    this._box = this._box ?? {width: 0, height: 0};
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
    const checked = coloursKey(colours);
    if (checked !== this._coloursChecked && this.isConnected) {
      this._coloursChecked = checked;
      checkContrast(this, colours, 'sf-chart-pie');
    }
    const plot = this.querySelector('.sf-chart-pie-plot');
    if (plot && plot !== this._observed && typeof ResizeObserver === 'function') {
      this._observer?.disconnect();
      this._observed = plot;
      this._observer = new ResizeObserver(([entry]) => {
        const width = Math.round(entry.contentRect.width);
        const height = Math.round(entry.contentRect.height);
        if (width === this._box.width && height === this._box.height) return;
        this._box = {width, height};
        this.requestComponentUpdate('box');
      });
      this._observer.observe(plot);
    }
    return undefined;
  }

  // The page's own colours by key (chart-core/colors), read again only when
  // the setting changes.
  colours() {
    if (this.colors !== this._coloursRaw || !this._colours) {
      this._coloursRaw = this.colors;
      this._colours = readColours(this.colors, (said) => console.warn(`<sf-chart-pie> ${said}`));
    }
    return this._colours;
  }

  words(key, vars) {
    return this.sfWord(key, vars ? {vars} : undefined);
  }

  // The data as rows (every category, as given) and parts (what the slices
  // are): past max-parts the smallest positive rows fold into one «Другое».
  model() {
    const key = [this.items, this.names, this.category, this.value, this.maxParts];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;
    const read = readSeries(this.items, {x: this.category, y: this.value.split(',')[0].trim(), xScale: 'category'});
    const one = read.series[0];
    const names = this.names || {};
    const unit = read.kind === 'time' ? timeUnitOf(read.xs) : 'day';
    const sayKey = (index) => {
      const label = read.labels[index];
      if (names[label] !== undefined) return names[label];
      if (read.kind === 'time') return formatTime(read.xs[index], pageLocale(this), unit, {form: 'full'});
      return String(label ?? '');
    };
    const rows = read.xs.map((_, index) => ({key: String(read.labels[index] ?? ''), name: sayKey(index), value: one ? one.values[index] : null, index}));
    const positive = rows.filter((row) => row.value !== null && row.value > 0);
    const most = Math.max(2, Number.isFinite(this.maxParts) && this.maxParts > 0 ? Math.floor(this.maxParts) : 7);
    let parts = positive;
    if (positive.length > most) {
      const kept = new Set([...positive].sort((a, b) => b.value - a.value).slice(0, most - 1).map((row) => row.index));
      const rest = positive.filter((row) => !kept.has(row.index));
      parts = [...positive.filter((row) => kept.has(row.index)), {key: OTHER, name: this.words('other'), value: rest.reduce((sum, row) => sum + row.value, 0), index: -1, folded: rest.length}];
    }
    this._model = {
      kind: read.kind,
      categoryField: read.xField,
      valueField: one?.key ?? '',
      rows,
      parts: parts.map((part, place) => ({...part, place})),
    };
    return this._model;
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.parts.length ? 'ready' : 'empty';
  }

  // The parts with their shares of what is shown: a hidden part leaves the
  // whole, so the others' shares are of the rest.
  shares(model) {
    const hidden = new Set(this.hiddenParts || []);
    const total = model.parts.reduce((sum, part) => sum + (hidden.has(part.key) ? 0 : part.value), 0);
    return model.parts.map((part) => ({...part, hidden: hidden.has(part.key), share: hidden.has(part.key) || !total ? 0 : part.value / total}));
  }

  sayY(value) {
    return formatNumber(value, pageLocale(this), this.valueFormat, {gap: this.words('gap')});
  }

  sayShare(share) {
    return formatNumber(share, pageLocale(this), 'percent');
  }

  sayPart(part) {
    return this.words('part', {share: this.sayShare(part.share), value: this.sayY(part.value)});
  }

  geometry(parts) {
    const {width, height} = this._box;
    if (!width || !height) return null;
    const font = FONT[this.size] ?? 12;
    const shown = parts.filter((part) => !part.hidden);
    const outer = Math.max(8, Math.min(width, height) / 2 - 4);
    const inner = this.hole === 'ring' ? outer * 0.6 : 0;
    const cx = width / 2;
    const cy = height / 2;
    const slices = pieSlices(shown.map((part) => part.value)).map((slice) => {
      const part = shown[slice.index];
      const d = arcPath(slice, {cx, cy, outer, inner});
      // A share is written inside its slice when the slice has room for it.
      const text = this.sayShare(slice.share);
      const r = inner ? (inner + outer) / 2 : outer * 0.62;
      const room = (slice.end - slice.start) * r;
      const thick = outer - inner;
      const fits = this.shareLabels === 'inside' && room > text.length * font * CHAR + 4 && thick > font * 1.6;
      const [lx, ly] = arcMiddle(slice, {cx, cy}, r);
      const [tx, ty] = arcMiddle(slice, {cx, cy}, outer);
      return {index: part.place, key: part.key, place: part.place, start: slice.start, end: slice.end, d, label: fits ? {x: lx, y: ly, text} : null, tip: {x: tx, y: ty}};
    });
    const total = inner && this.total === 'auto' ? this.sayY(shown.reduce((sum, part) => sum + part.value, 0)) : '';
    return {width, height, font, cx, cy, outer, inner, slices, total, totalWord: this.words('total')};
  }

  summarize(model, parts) {
    if (this.summary === 'none') return '';
    const shown = parts.filter((part) => !part.hidden);
    const total = shown.reduce((sum, part) => sum + part.value, 0);
    const out = [this.words('summary-total', {count: shown.length, total: this.sayY(total)})];
    for (const part of [...shown].sort((a, b) => b.value - a.value)) out.push(this.words('summary-part', {name: part.name, part: this.sayPart(part)}));
    return out.join(' ');
  }

  cursorLine(parts, cursor) {
    const part = parts[cursor.index];
    return part ? this.words('cursor', {name: part.name, part: this.sayPart(part)}) : '';
  }

  setCursor(cursor, {say = false} = {}) {
    this._cursor = cursor;
    if (say && cursor) this._said = this.cursorLine(this.shares(this.model()), cursor);
    this.requestComponentUpdate('cursor');
  }

  // The arrows walk the shown parts clockwise (Right, Down) or back (Left,
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
    const shown = parts.filter((part) => !part.hidden).map((part) => part.place);
    if (!shown.length) return;
    const flat = {ArrowUp: 'ArrowLeft', ArrowDown: 'ArrowRight'}[event.key] ?? event.key;
    const at = this._cursor ? shown.indexOf(this._cursor.index) : -1;
    const moved = moveCursor(at < 0 ? null : {index: at, series: 'part'}, flat, {count: shown.length, shown: ['part']});
    if (!moved) return;
    event.preventDefault();
    this.setCursor({index: shown[moved.index], series: 'part'}, {say: true});
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
    const slice = g.slices.find((one) => angle >= one.start && angle < one.end);
    return slice ? {index: slice.index, series: 'part'} : null;
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
  }

  // select carries the part as the data gave it: its category as x, its
  // index among the rows (-1 for «Другое»), its value.
  choose(cursor) {
    const model = this.model();
    const part = model.parts[cursor.index];
    if (!part) return;
    this.sfEmit('select', {series: model.valueField, index: part.index, x: part.key === OTHER ? '' : part.key, value: part.value});
  }

  togglePart(key) {
    const hidden = new Set(this.hiddenParts || []);
    const nowHidden = !hidden.has(key);
    if (nowHidden) hidden.add(key);
    else hidden.delete(key);
    this.hiddenParts = [...hidden];
    if (this._cursor && this.model().parts[this._cursor.index]?.key === key) this._cursor = null;
    this.sfEmit('toggle', {id: key === OTHER ? 'other' : key, hidden: nowHidden});
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
    return this.createTemplateContext({
      ...this.getPropsContext(),
      component: this,
      uid: this._uid,
      size: this.size,
      label: this.label || this.words('untitled'),
      state,
      model,
      parts,
      tableKey: [tableModel, this.label, this.categoryLabel, this.valueLabel, this.valueFormat, pageLocale(this), this.table, this.table === 'toggle' ? this._view : 'chart'],
      rows: tableModel.rows.map((row) => ({...row, share: row.value !== null && row.value > 0 && total ? row.value / total : null})),
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
      paint: this.colours(),
      rootClass: this.getRootClass(),
    });
  }

  // The data the table shows: settled, so a stream or a pointer move does
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
    return settled(this._table, model, {later: () => this.requestComponentUpdate('table')});
  }

  template() {
    return renderPieChartTemplate(this.templateContext());
  }
}

SfPieChart.define('sf-chart-pie');
