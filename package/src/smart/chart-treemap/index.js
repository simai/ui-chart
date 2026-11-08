// sf-chart-treemap: a treemap, values as the areas of rectangles that tile
// the plot, one level or two (parts in groups) (docs/research/catalogue.md,
// Treemap; docs/DECISIONS.md D12).
//
// The element reads its rows once into groups of parts (js/treemap),
// measures its plot, and draws in SVG a rectangle per part laid out
// squarified, largest first, so the rectangles stay near square. A group
// takes a colour of the Framework's chart roles (--sf-chart-1..8): a light
// fill with the role's line round each part, and the part's name and value
// written inside when they fit, in the page's ink. A person reaches the
// plot with one Tab stop and walks the parts with the arrows, Up and Down
// across the groups; every move is said in a polite live region, the chart
// as a whole in a summary sentence, and the same data is a table on request.
//
// It renders into its own light DOM, like every Smart component.
import SfBaseElement from '../../core/js/smart-base';
import {elementFromManifest} from '../../core/js/element-manifest';
import {pageLocale} from '../../core/js/page-language';
import {formatNumber} from '../chart-core/format.js';
import {moveCursor} from '../chart-core/cursor.js';
import {settled} from '../chart-core/settle.js';
import {checkContrast, coloursKey, readColours} from '../chart-core/colors.js';
import {treemapLayout, treemapRows} from './js/treemap.js';
import {renderTreemapTemplate} from './js/templates/default';
import manifest from './component.json';
import en from './lang/en.json';
import ru from './lang/ru.json';

// The text of the plot, in px, by size rung, as on the line chart.
const FONT = {'1/2': 11, 1: 12, 2: 14};
// A letter's width against the font: Cyrillic is near 0.7 of it.
const LETTER = 0.72;
const GAP = 2;
const PAD = 6;

const ChartTreemapElement = elementFromManifest(manifest, {
  base: SfBaseElement,
  lang: {en, ru},
  source: 'ru',
  actions: {
    reset() {
      this._cursor = null;
      this.requestComponentUpdate('reset');
    },
  },
});

let instances = 0;

// A text cut to so many characters, with an ellipsis, which is wider than a
// letter and so takes two places; '' below three letters and the ellipsis.
const cut = (text, chars) => {
  if (text.length <= chars) return text;
  return chars < 5 ? '' : `${text.slice(0, chars - 2)}…`;
};

class SfTreemap extends ChartTreemapElement {
  static get props() {
    return {...super.props, rootClass: {default: ''}};
  }

  onConnected() {
    this._uid = this.id || `sf-chart-treemap-${(instances += 1)}`;
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
      checkContrast(this, colours, 'sf-chart-treemap');
    }
    const plot = this.querySelector('.sf-chart-treemap-plot');
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

  // The page's own colours by group (chart-core/colors), read again only
  // when the setting changes.
  colours() {
    if (this.colors !== this._coloursRaw || !this._colours) {
      this._coloursRaw = this.colors;
      this._colours = readColours(this.colors, (said) => console.warn(`<sf-chart-treemap> ${said}`));
    }
    return this._colours;
  }

  words(key, vars) {
    return this.sfWord(key, vars ? {vars} : undefined);
  }

  // The rows as groups of parts, read again only when the data or its
  // mapping changes.
  model() {
    const key = [this.items, this.x, this.y, this.group];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;
    this._model = treemapRows(this.items, {x: this.x, y: this.y, group: this.group});
    return this._model;
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.groups.length ? 'ready' : 'empty';
  }

  sayY(value) {
    return formatNumber(value, pageLocale(this), this.yFormat, {gap: this.words('gap')});
  }

  sayShare(value, of) {
    return of > 0 ? formatNumber(value / of, pageLocale(this), 'percent') : '';
  }

  // A part's name: its label, or its place when it has none.
  sayX(leaf) {
    return leaf.label || this.words('part-n', {n: String(leaf.row + 1)});
  }

  // A group's name: its key, or «Без группы» for rows without one.
  sayGroup(key) {
    return key || this.words('no-group');
  }

  // Where everything goes: the groups and the parts laid out in the plot,
  // and the words written inside the parts that hold them. Null until the
  // plot has a width.
  geometry(model) {
    const {width, height} = this._box;
    if (!width || !height) return null;
    const font = FONT[this.size] ?? 12;
    const grouped = model.groups.length > 1;
    const {groups, leaves} = treemapLayout(model.groups, {x: 0, y: 0, w: width, h: height}, {gap: GAP, header: grouped ? Math.ceil(font * 1.6) : 0});
    const letter = font * LETTER;
    const labelled = this.labels !== 'none';
    const parts = leaves.map((one, index) => {
      const part = {...one, index, cx: one.x + one.w / 2, cy: one.y + one.h / 2, nameText: '', valueText: ''};
      if (!labelled || one.w < letter * 4 + PAD * 2 || one.h < font + PAD * 2) return part;
      const room = Math.floor((one.w - PAD * 2) / letter);
      part.nameText = cut(this.sayX(one), room);
      const value = this.sayY(one.value);
      if (one.h >= font * 3 && value.length <= room) part.valueText = value;
      return part;
    });
    const heads = groups.map((one) => {
      if (!one.header) return {...one, text: ''};
      const room = Math.floor((one.w - PAD * 2) / letter);
      return {...one, text: cut(this.sayGroup(one.key), room)};
    });
    return {width, height, font, grouped, groups: heads, parts};
  }

  summarize(model) {
    if (this.summary === 'none') return '';
    if (!model.groups.length) return this.words('summary-empty');
    const locale = pageLocale(this);
    const leaves = model.groups.flatMap((one) => one.leaves);
    const largest = leaves.reduce((best, one) => (one.value > best.value ? one : best));
    const parts = [this.words('summary-total', {total: this.sayY(model.total), count: formatNumber(leaves.length, locale, 'integer')})];
    parts.push(this.words('summary-largest', {name: this.sayX(largest), value: this.sayY(largest.value), share: this.sayShare(largest.value, model.total)}));
    if (model.groups.length > 1) {
      const first = model.groups[0];
      parts.push(this.words('summary-groups', {count: formatNumber(model.groups.length, locale, 'integer'), name: this.sayGroup(first.key), value: this.sayY(first.value), share: this.sayShare(first.value, model.total)}));
    } else if (leaves.length > 3) {
      const top = leaves.slice(0, 3).reduce((sum, one) => sum + one.value, 0);
      parts.push(this.words('summary-top', {share: this.sayShare(top, model.total)}));
    }
    const left = model.missing + model.dropped;
    if (left) parts.push(this.words('summary-left', {count: formatNumber(left, locale, 'integer')}));
    return parts.join(' ');
  }

  // A part as one sentence: its group when there are groups, its name, its
  // value and its share of the whole.
  partLine(part) {
    const model = this.model();
    const vars = {name: this.sayX(part), value: this.sayY(part.value), share: this.sayShare(part.value, model.total)};
    if (model.groups.length > 1) return this.words('cursor-group', {...vars, group: this.sayGroup(part.group)});
    return this.words('cursor', vars);
  }

  cursorPart(cursor = this._cursor) {
    const geometry = this._geometry;
    if (!cursor || !geometry) return null;
    return geometry.parts[cursor.index] ?? null;
  }

  setCursor(cursor, {say = false} = {}) {
    this._cursor = cursor;
    const part = this.cursorPart(cursor);
    if (say && part) this._said = this.partLine(part);
    this.requestComponentUpdate('cursor');
  }

  // Up and Down go to the first part of the group before or after, when
  // there are groups; Left and Right, Home, End and the pages walk every
  // part in order (chart-core/cursor).
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
      this.choose(this.cursorPart());
      return;
    }
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      if (!geometry.grouped) return;
      const now = this.cursorPart();
      const place = now ? Math.max(0, Math.min(geometry.groups.length - 1, now.place + (event.key === 'ArrowDown' ? 1 : -1))) : 0;
      const index = geometry.parts.findIndex((one) => one.place === place);
      event.preventDefault();
      this.setCursor({index, series: 'part'}, {say: true});
      return;
    }
    const next = moveCursor(this._cursor, event.key, {count: geometry.parts.length, shown: ['part']});
    if (next === null) return;
    event.preventDefault();
    this.setCursor(next, {say: true});
  }

  // The pointer picks the part it is over.
  placeAt(event) {
    const geometry = this._geometry;
    if (!geometry) return null;
    const box = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - box.left;
    const y = event.clientY - box.top;
    const index = geometry.parts.findIndex((one) => x >= one.x - GAP / 2 && x <= one.x + one.w + GAP / 2 && y >= one.y - GAP / 2 && y <= one.y + one.h + GAP / 2);
    return index < 0 ? null : {index, series: 'part'};
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
    if (place) this.choose(this.cursorPart(place));
  }

  choose(part) {
    if (!part) return;
    const model = this.model();
    this.sfEmit('select', {index: part.index, row: part.row, x: part.label, group: part.group, value: part.value, share: model.total > 0 ? part.value / model.total : 0});
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
    return this.createTemplateContext({
      ...this.getPropsContext(),
      component: this,
      uid: this._uid,
      size: this.size,
      label: this.label || this.words('untitled'),
      state,
      model,
      tableModel,
      tableKey: [tableModel, this.label, this.xLabel, this.yFormat, pageLocale(this), this.table, this.table === 'toggle' ? this._view : 'chart'],
      geometry,
      cursor: this.cursorPart(),
      said: this._said,
      view: this.table === 'toggle' ? this._view : 'chart',
      legend: this.legend === 'auto' ? (model.groups.length > 1 ? 'top' : 'none') : this.legend,
      summaryText: state === 'ready' ? this.summarize(model) : '',
      hasDescription: this.hasSlotContent?.('description') ?? false,
      description: this.hasSlotContent?.('description') ? this.getSlotContent('description') : null,
      paint: this.colours(),
      rootClass: this.getRootClass(),
    });
  }

  // The data the table shows: settled, so a stream does not rebuild it on
  // every render (chart-core/settle). The first data after none shows at
  // once.
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
    return renderTreemapTemplate(this.templateContext());
  }
}

SfTreemap.define('sf-chart-treemap');
