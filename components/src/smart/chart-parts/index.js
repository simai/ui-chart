// sf-chart-parts: the parts of one whole as one thin bar split into shares,
// with the free remainder of a capacity when max is set (docs/DECISIONS.md
// D2): what fills a disk, a quota or a model's context.
//
// The element reads its data once into parts (chart-core/data), folds the
// smallest into «Другое» past max-parts, and draws the bar as HTML boxes
// that share its width by their values, so the bar needs no measured width
// and its first paint is the drawn bar. A person reaches the bar with one
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
import {moveCursor} from '../chart-core/cursor.js';
import {settled} from '../chart-core/settle.js';
import {checkContrast, coloursKey, readColours} from '../chart-core/colors.js';
import {renderPartsBarTemplate} from './js/templates/default';
import manifest from './component.json';
import en from './lang/en.json';
import ru from './lang/ru.json';

const OTHER = '\u0000other';
const FREE = '\u0000free';

const ChartPartsElement = elementFromManifest(manifest, {
  base: SfBaseElement,
  lang: {en, ru},
  source: 'ru',
});

let instances = 0;

class SfPartsBar extends ChartPartsElement {
  static get props() {
    return {...super.props, rootClass: {default: ''}};
  }

  onConnected() {
    this._uid = this.id || `sf-chart-parts-${(instances += 1)}`;
    this._cursor = null;
    this._said = '';
    this._view = 'chart';
  }

  onDisconnected() {
    clearTimeout(this._table?.timer);
    super.onDisconnected();
  }

  afterRender(changed) {
    if (typeof changed === 'function') return super.afterRender(changed);
    const colours = this.colours();
    const checked = coloursKey(colours);
    if (checked !== this._coloursChecked && this.isConnected) {
      this._coloursChecked = checked;
      checkContrast(this, colours, 'sf-chart-parts');
    }
    return undefined;
  }

  // The page's own colours by key (chart-core/colors), read again only when
  // the setting changes.
  colours() {
    if (this.colors !== this._coloursRaw || !this._colours) {
      this._coloursRaw = this.colors;
      this._colours = readColours(this.colors, (said) => console.warn(`<sf-chart-parts> ${said}`));
    }
    return this._colours;
  }

  words(key, vars) {
    return this.sfWord(key, vars ? {vars} : undefined);
  }

  // The capacity holds only when it is a positive number: an unset number
  // reads 0, and a capacity of nothing has no remainder.
  capacity() {
    return Number.isFinite(this.max) && this.max > 0 ? this.max : null;
  }

  // The data as rows (every category, as given) and parts (what the bar is
  // made of): past max-parts the smallest positive rows fold into one «Другое».
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
      parts,
    };
    return this._model;
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.parts.length ? 'ready' : 'empty';
  }

  // The whole the shares are of: the capacity, or the sum of the parts when
  // there is none or the parts exceed it.
  whole(parts) {
    const used = parts.reduce((sum, part) => sum + part.value, 0);
    const max = this.capacity();
    return {used, max, whole: max !== null && max > used ? max : used, free: max !== null && max > used ? max - used : 0, over: max !== null && used > max ? used - max : 0};
  }

  // The bar's parts in order, the free remainder last, each with its share.
  segments(model) {
    const sum = this.whole(model.parts);
    const out = model.parts.map((part) => ({...part, share: sum.whole ? part.value / sum.whole : 0}));
    if (sum.free > 0) out.push({key: FREE, name: this.freeLabel || this.words('free'), value: sum.free, index: -2, free: true, share: sum.free / sum.whole});
    return out.map((part, place) => ({...part, place}));
  }

  sayY(value) {
    return formatNumber(value, pageLocale(this), this.valueFormat, {gap: this.words('gap')});
  }

  sayShare(share) {
    return formatNumber(share, pageLocale(this), 'percent');
  }

  sayPart(part) {
    return this.words('part', {value: this.sayY(part.value), share: this.sayShare(part.share)});
  }

  head(sum) {
    if (this.total === 'none') return '';
    if (sum.max === null) return this.words('head-total', {total: this.sayY(sum.used)});
    return this.words('head-used', {used: this.sayY(sum.used), max: this.sayY(sum.max), share: this.sayShare(sum.used / sum.max)});
  }

  summarize(model, segments) {
    if (this.summary === 'none') return '';
    const sum = this.whole(model.parts);
    const out = [];
    if (sum.max === null) out.push(this.words('summary-total', {count: model.parts.length, total: this.sayY(sum.used)}));
    else if (sum.over) out.push(this.words('summary-over', {used: this.sayY(sum.used), max: this.sayY(sum.max), over: this.sayY(sum.over)}));
    else out.push(this.words('summary-used', {used: this.sayY(sum.used), max: this.sayY(sum.max), share: this.sayShare(sum.used / sum.max)}));
    const parts = segments.filter((part) => !part.free);
    for (const part of [...parts].sort((a, b) => b.value - a.value)) out.push(this.words('summary-part', {name: part.name, part: this.sayPart(part)}));
    const free = segments.find((part) => part.free);
    if (free) out.push(this.words('summary-part', {name: free.name, part: this.sayPart(free)}));
    return out.join(' ');
  }

  cursorLine(segments, cursor) {
    const part = segments[cursor.index];
    return part ? this.words('cursor', {name: part.name, part: this.sayPart(part)}) : '';
  }

  setCursor(cursor, {say = false} = {}) {
    this._cursor = cursor;
    if (say && cursor) this._said = this.cursorLine(this.segments(this.model()), cursor);
    this.requestComponentUpdate('cursor');
  }

  // The arrows walk the bar in its reading direction: Right and Down to the
  // next part (Right goes left on a right-to-left page), Left and Up back;
  // Home and End go to the first and the last, the free remainder included.
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
    const count = this.segments(this.model()).length;
    if (!count) return;
    const rtl = this.matches(':dir(rtl)');
    const flat = {ArrowUp: 'ArrowLeft', ArrowDown: 'ArrowRight', ...(rtl ? {ArrowLeft: 'ArrowRight', ArrowRight: 'ArrowLeft'} : {})}[event.key] ?? event.key;
    const moved = moveCursor(this._cursor, flat, {count, shown: ['part']});
    if (!moved) return;
    event.preventDefault();
    this.setCursor(moved, {say: true});
  }

  pointAt(event) {
    const box = event.target.closest?.('[data-place]');
    return box ? {index: Number(box.dataset.place), series: 'part'} : null;
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
  // index among the rows (-1 for «Другое»), its value. The free remainder is
  // not a part of the data, so it is not chosen.
  choose(cursor) {
    const model = this.model();
    const part = this.segments(model)[cursor.index];
    if (!part || part.free) return;
    this.sfEmit('select', {series: model.valueField, index: part.index, x: part.key === OTHER ? '' : part.key, value: part.value});
  }

  toggleView() {
    this._view = this._view === 'table' ? 'chart' : 'table';
    this.requestComponentUpdate('view');
  }

  templateContext() {
    const model = this.model();
    const state = this.state(model);
    const segments = this.segments(model);
    const cursor = this._cursor && segments[this._cursor.index] ? this._cursor : null;
    const tableModel = this.tableModel(model, state === 'ready');
    const sum = this.whole(tableModel.parts);
    const rows = tableModel.rows.map((row) => ({...row, share: row.value !== null && row.value > 0 && sum.whole ? row.value / sum.whole : null}));
    if (sum.max !== null) rows.push({key: FREE, name: this.freeLabel || this.words('free'), value: sum.free, share: sum.whole ? sum.free / sum.whole : null, free: true});
    return this.createTemplateContext({
      ...this.getPropsContext(),
      component: this,
      uid: this._uid,
      size: this.size,
      label: this.label || this.words('untitled'),
      state,
      model,
      segments,
      head: state === 'ready' ? this.head(this.whole(model.parts)) : '',
      tableKey: [tableModel, this.max, this.freeLabel, this.label, this.categoryLabel, this.valueLabel, this.valueFormat, pageLocale(this), this.table, this.table === 'toggle' ? this._view : 'chart'],
      rows,
      cursor,
      said: this._said,
      view: this.table === 'toggle' ? this._view : 'chart',
      legend: this.legend,
      categoryLabel: this.categoryLabel || model.categoryField || this.words('category-column'),
      valueLabel: this.valueLabel || model.valueField || this.words('value-column'),
      summaryText: state === 'ready' ? this.summarize(model, segments) : '',
      hasDescription: this.hasSlotContent?.('description') ?? false,
      description: this.hasSlotContent?.('description') ? this.getSlotContent('description') : null,
      paint: this.colours(),
      rootClass: this.getRootClass(),
    });
  }

  // The data the table shows: settled, so a stream or a pointer move does
  // not rebuild a row per part on every render (chart-core/settle).
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
    return renderPartsBarTemplate(this.templateContext());
  }
}

SfPartsBar.define('sf-chart-parts');
