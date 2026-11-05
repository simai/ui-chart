// sf-chart-sankey: a Sankey diagram, quantities flowing between stages or
// categories (docs/research/catalogue.md, Sankey; docs/DECISIONS.md D14).
//
// The element reads its rows once into nodes and flows (chart-core/sankey),
// measures its plot, and draws in SVG the nodes in columns by their longest
// path from where the flows start, and a band from node to node as wide as
// its flow. A node takes a chart colour of its place (--sf-chart-1..8), and
// a band the light fill of its source's colour; a node's name and value are
// written beside it where they fit. A person reaches the plot with one Tab
// stop and walks the nodes: Up and Down within a column, Left and Right
// along the largest flow to the column before or after; each node is said
// with what flows into it and out of it. The chart as a whole is a summary
// sentence, and every flow is a row of the table.
//
// It renders into its own light DOM, like every Smart component.
import SfBaseElement from '../../core/js/smart-base';
import {elementFromManifest} from '../../core/js/element-manifest';
import {pageLocale} from '../../core/js/page-language';
import {formatNumber} from '../chart-core/format.js';
import {settled} from '../chart-core/settle.js';
import {checkContrast, coloursKey, readColours} from '../chart-core/colors.js';
import {onBand, sankeyLayout, sankeyRows} from '../chart-core/sankey.js';
import {renderSankeyTemplate} from './js/templates/default';
import manifest from './component.json';
import en from './lang/en.json';
import ru from './lang/ru.json';

// The text of the plot, in px, by size rung, as on the line chart.
const FONT = {'1/2': 11, 1: 12, 2: 14};
// A node's width, in px, by size rung.
const NODE = {'1/2': 8, 1: 12, 2: 16};
// A letter's width against the font: Cyrillic is near 0.7 of it.
const LETTER = 0.72;
const PAD = 6;
// How many flows a node's sentence names on each side.
const NAMED = 3;

const ChartSankeyElement = elementFromManifest(manifest, {
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
const cut = (value, chars) => {
  if (value.length <= chars) return value;
  return chars < 5 ? '' : `${value.slice(0, chars - 2)}…`;
};

class SfSankey extends ChartSankeyElement {
  static get props() {
    return {...super.props, rootClass: {default: ''}};
  }

  onConnected() {
    this._uid = this.id || `sf-chart-sankey-${(instances += 1)}`;
    this._box = this._box ?? {width: 0, height: 0};
    this._cursor = null;
    this._band = null;
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
      checkContrast(this, colours, 'sf-chart-sankey');
    }
    const plot = this.querySelector('.sf-chart-sankey-plot');
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

  // The page's own colours by node (chart-core/colors), read again only
  // when the setting changes.
  colours() {
    if (this.colors !== this._coloursRaw || !this._colours) {
      this._coloursRaw = this.colors;
      this._colours = readColours(this.colors, (said) => console.warn(`<sf-chart-sankey> ${said}`));
    }
    return this._colours;
  }

  words(key, vars) {
    return this.sfWord(key, vars ? {vars} : undefined);
  }

  // The rows as nodes and flows, read again only when the data or its
  // mapping changes.
  model() {
    const key = [this.items, this.source, this.target, this.value];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;
    this._model = sankeyRows(this.items, {source: this.source, target: this.target, value: this.value});
    return this._model;
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.links.length ? 'ready' : 'empty';
  }

  sayY(value) {
    return formatNumber(value, pageLocale(this), this.yFormat, {gap: this.words('gap')});
  }

  sayShare(value, of) {
    return of > 0 ? formatNumber(value / of, pageLocale(this), 'percent') : '';
  }

  // Up to three flows by size, «и ещё N» for the rest.
  sayFlows(links, side) {
    const model = this.model();
    const sorted = [...links].sort((a, b) => b.value - a.value);
    const named = sorted.slice(0, NAMED).map((one) => this.words('flow-item', {name: model.nodes[side === 'in' ? one.source : one.target].key, value: this.sayY(one.value)}));
    const rest = sorted.length - named.length;
    return rest > 0 ? this.words('more', {list: named.join(', '), count: formatNumber(rest, pageLocale(this), 'integer')}) : named.join(', ');
  }

  // Where everything goes: the nodes in their columns, the bands, and the
  // names written beside the nodes that have room. Null until the plot has
  // a width.
  geometry(model) {
    const {width, height} = this._box;
    if (!width || !height) return null;
    const font = FONT[this.size] ?? 12;
    const node = NODE[this.size] ?? 12;
    const gap = Math.max(6, Math.round(font * 0.75));
    const layout = sankeyLayout(model, {x: 0, y: 2, w: width, h: height - 4}, {width: node, gap});
    const letter = font * LETTER;
    const step = model.columns > 1 ? (width - node) / (model.columns - 1) : width;
    const room = Math.floor((step - node - PAD * 2) / letter);
    const labelled = this.labels !== 'none';
    const lastColumn = model.columns - 1;
    // Reading order: column after column, top to bottom.
    const order = [...layout.nodes].sort((a, b) => a.column - b.column || a.y0 - b.y0);
    const nodes = layout.nodes.map((one) => {
      const end = one.column === lastColumn && lastColumn > 0;
      const shown = {...one, cx: (one.x0 + one.x1) / 2, cy: (one.y0 + one.y1) / 2, end, nameText: '', valueText: ''};
      // A name stands at the node's middle: it needs the node and the gap
      // round it to be a line high, or it would touch its neighbour's.
      if (!labelled || one.y1 - one.y0 + gap < font * 1.2) return shown;
      const value = this.sayY(one.value);
      const chars = room - value.length - 1;
      shown.nameText = cut(one.key, chars);
      if (shown.nameText) shown.valueText = value;
      return shown;
    });
    // The names after the nodes of the column before the last and the names
    // before the nodes of the last share one gap: where two would touch, the
    // first is cut to the room left, or left out.
    const span = (one) => (one.nameText.length + 1 + one.valueText.length) * letter;
    for (const one of nodes) {
      if (!one.nameText || one.end || one.column !== lastColumn - 1) continue;
      for (const other of nodes) {
        if (!other.nameText || !other.end || Math.abs(other.cy - one.cy) >= font * 1.2) continue;
        const free = other.x0 - PAD - span(other) - PAD - (one.x1 + PAD);
        if (free >= span(one)) continue;
        one.nameText = cut(one.key, Math.floor(free / letter) - one.valueText.length - 1);
        if (!one.nameText) one.valueText = '';
      }
    }
    return {width, height, font, node, nodes, links: layout.links, order: order.map((one) => one.place), lastColumn};
  }

  summarize(model) {
    if (this.summary === 'none') return '';
    if (!model.links.length) return this.words('summary-empty');
    const locale = pageLocale(this);
    const parts = [this.words('summary-total', {
      nodes: formatNumber(model.nodes.length, locale, 'integer'),
      flows: formatNumber(model.links.length, locale, 'integer'),
      columns: formatNumber(model.columns, locale, 'integer'),
      total: this.sayY(model.total),
    })];
    const largest = model.links.reduce((best, one) => (one.value > best.value ? one : best));
    const from = model.nodes[largest.source];
    parts.push(this.words('summary-largest', {source: from.key, target: model.nodes[largest.target].key, value: this.sayY(largest.value), share: this.sayShare(largest.value, from.out)}));
    const ends = model.nodes.filter((one) => !one.links.out.length);
    if (ends.length > 1) {
      const top = ends.reduce((best, one) => (one.in > best.in ? one : best));
      parts.push(this.words('summary-end', {name: top.key, value: this.sayY(top.in), share: this.sayShare(top.in, ends.reduce((sum, one) => sum + one.in, 0))}));
    }
    const left = model.missing + model.dropped;
    if (left) parts.push(this.words('summary-left', {count: formatNumber(left, locale, 'integer')}));
    if (model.looped) parts.push(this.words('summary-looped', {count: formatNumber(model.looped, locale, 'integer')}));
    return parts.join(' ');
  }

  // A node as one sentence: its name and value, what flows in from where
  // and what flows out to where.
  nodeLine(node) {
    const parts = [this.words('cursor', {name: node.key, value: this.sayY(node.value)})];
    if (node.links.in.length) parts.push(this.words('cursor-in', {list: this.sayFlows(node.links.in, 'in')}));
    if (node.links.out.length) parts.push(this.words('cursor-out', {list: this.sayFlows(node.links.out, 'out')}));
    return parts.join('; ');
  }

  cursorNode(cursor = this._cursor) {
    const geometry = this._geometry;
    if (!cursor || !geometry) return null;
    return geometry.nodes[cursor.index] ?? null;
  }

  setCursor(cursor, {say = false} = {}) {
    this._cursor = cursor;
    if (cursor) this._band = null;
    const node = this.cursorNode(cursor);
    if (say && node) this._said = this.nodeLine(node);
    this.requestComponentUpdate('cursor');
  }

  // The keys walk the nodes: Up and Down within a column, Left and Right
  // to the column before or after along the node's largest flow (or to the
  // nearest node there when it has none that way), Home and End to the
  // first and the last node in reading order.
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
      this.choose(this.cursorNode());
      return;
    }
    const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const {order} = geometry;
    const now = this.cursorNode();
    let index = order[0];
    if (event.key === 'End') index = order[order.length - 1];
    else if (now && event.key !== 'Home') index = this.neighbour(now, event.key) ?? now.place;
    this.setCursor({index, series: 'node'}, {say: true});
  }

  neighbour(now, key) {
    const {nodes} = this._geometry;
    const column = (number) => nodes.filter((one) => one.column === number).sort((a, b) => a.y0 - b.y0);
    if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'PageUp' || key === 'PageDown') {
      const here = column(now.column);
      const at = here.findIndex((one) => one.place === now.place);
      const next = here[at + (key === 'ArrowDown' || key === 'PageDown' ? 1 : -1)];
      return next?.place ?? null;
    }
    const forward = key === 'ArrowRight';
    const links = forward ? now.links.out : now.links.in;
    if (links.length) {
      const largest = links.reduce((best, one) => (one.value > best.value ? one : best));
      return forward ? largest.target : largest.source;
    }
    // No flow that way: the nearest node of the next column that has one.
    for (let number = now.column + (forward ? 1 : -1); number >= 0 && number <= this._geometry.lastColumn; number += forward ? 1 : -1) {
      const there = column(number);
      if (!there.length) continue;
      return there.reduce((best, one) => (Math.abs(one.cy - now.cy) < Math.abs(best.cy - now.cy) ? one : best)).place;
    }
    return null;
  }

  // The pointer picks the node it is over, or else the band.
  placeAt(event) {
    const geometry = this._geometry;
    if (!geometry) return null;
    const box = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - box.left;
    const y = event.clientY - box.top;
    const node = geometry.nodes.find((one) => x >= one.x0 - 3 && x <= one.x1 + 3 && y >= one.y0 - 2 && y <= one.y1 + 2);
    if (node) return {index: node.place, series: 'node'};
    // The thinnest band on top wins, as it is drawn last.
    const bands = geometry.links.filter((one) => onBand(one, x, y)).sort((a, b) => a.width - b.width);
    return bands.length ? {band: bands[0].index} : null;
  }

  onPointerMove(event) {
    const place = this.placeAt(event);
    if (place?.band !== undefined) {
      if (this._band === place.band) return;
      this._band = place.band;
      if (!this.matches(':focus-within')) this._cursor = null;
      this.requestComponentUpdate('band');
      return;
    }
    if (this._band !== null) {
      this._band = null;
      this.requestComponentUpdate('band');
    }
    if (place?.index === this._cursor?.index) return;
    if (place === null && this.matches(':focus-within')) return;
    this.setCursor(place);
  }

  onPointerLeave() {
    this._band = null;
    if (this.matches(':focus-within')) {
      this.requestComponentUpdate('band');
      return;
    }
    this.setCursor(null);
  }

  onPlotClick(event) {
    const place = this.placeAt(event);
    if (place?.index !== undefined) this.choose(this.cursorNode(place));
  }

  choose(node) {
    if (!node) return;
    this.sfEmit('select', {index: node.place, node: node.key, value: node.value, in: node.in, out: node.out});
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
      tableKey: [tableModel, this.label, this.yFormat, pageLocale(this), this.table, this.table === 'toggle' ? this._view : 'chart'],
      geometry,
      cursor: this.cursorNode(),
      band: geometry && this._band !== null ? geometry.links[this._band] ?? null : null,
      said: this._said,
      view: this.table === 'toggle' ? this._view : 'chart',
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
    return renderSankeyTemplate(this.templateContext());
  }
}

SfSankey.define('sf-chart-sankey');
