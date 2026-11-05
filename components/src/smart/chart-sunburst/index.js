// sf-chart-sunburst: a sunburst, a hierarchy as rings round a centre, a
// ring per level and each arc its share of its parent's
// (docs/research/catalogue.md, Sunburst; docs/DECISIONS.md D15).
//
// The element reads its rows once into a tree (chart-core/sunburst), by an
// id and a parent per row or by a path of names, measures its plot, and
// draws in SVG an arc per node: the top nodes share the turn clockwise from
// twelve o'clock, a child its parent's angle. A top node takes a chart
// colour of its place (--sf-chart-1..8) and its branch keeps it, lighter
// ring after ring; a node's name is written along its arc where it fits,
// the total in the centre. A person reaches the plot with one Tab stop and
// walks the arcs: Left and Right round a ring, Down out to the largest
// child, Up back to the parent; each arc is said with its path and shares.
// The chart as a whole is a summary sentence, and every node is a row of
// the table.
//
// It renders into its own light DOM, like every Smart component.
import SfBaseElement from '../../core/js/smart-base';
import {elementFromManifest} from '../../core/js/element-manifest';
import {pageLocale} from '../../core/js/page-language';
import {formatNumber} from '../chart-core/format.js';
import {settled} from '../chart-core/settle.js';
import {checkContrast, coloursKey, readColours} from '../chart-core/colors.js';
import {arcAt, sunburstLayout, sunburstRows} from '../chart-core/sunburst.js';
import {renderSunburstTemplate} from './js/templates/default';
import manifest from './component.json';
import en from './lang/en.json';
import ru from './lang/ru.json';

// The text of the plot, in px, by size rung, as on the line chart.
const FONT = {'1/2': 11, 1: 12, 2: 14};
// A letter's width against the font: Cyrillic is near 0.7 of it.
const LETTER = 0.72;
const PAD = 4;
// The hole in the centre, against the radius.
const HOLE = 0.3;
const round = (value) => Math.round(value * 10) / 10;

const ChartSunburstElement = elementFromManifest(manifest, {
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

class SfSunburst extends ChartSunburstElement {
  static get props() {
    return {...super.props, rootClass: {default: ''}};
  }

  onConnected() {
    this._uid = this.id || `sf-chart-sunburst-${(instances += 1)}`;
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
      checkContrast(this, colours, 'sf-chart-sunburst');
    }
    const plot = this.querySelector('.sf-chart-sunburst-plot');
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

  // The page's own colours by top node (chart-core/colors), read again only
  // when the setting changes.
  colours() {
    if (this.colors !== this._coloursRaw || !this._colours) {
      this._coloursRaw = this.colors;
      this._colours = readColours(this.colors, (said) => console.warn(`<sf-chart-sunburst> ${said}`));
    }
    return this._colours;
  }

  words(key, vars) {
    return this.sfWord(key, vars ? {vars} : undefined);
  }

  // The rows as a tree, read again only when the data or its mapping
  // changes.
  model() {
    const key = [this.items, this.node, this.parent, this.path, this.value, this.name];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;
    this._model = sunburstRows(this.items, {id: this.node, parent: this.parent, path: this.path, value: this.value, name: this.name});
    return this._model;
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.nodes.length ? 'ready' : 'empty';
  }

  sayY(value) {
    return formatNumber(value, pageLocale(this), this.yFormat, {gap: this.words('gap')});
  }

  sayShare(value, of) {
    return of > 0 ? formatNumber(value / of, pageLocale(this), 'percent') : '';
  }

  sayPath(node) {
    return node.path.join(' / ');
  }

  // Where everything goes: the arcs round the centre of the plot, and the
  // names written along the arcs that have room. Null until the plot has a
  // width.
  geometry(model) {
    const {width, height} = this._box;
    if (!width || !height) return null;
    const font = FONT[this.size] ?? 12;
    const radius = Math.max(0, Math.min(width, height) / 2 - 2);
    const layout = sunburstLayout(model, {cx: width / 2, cy: height / 2, radius}, {hole: HOLE});
    const letter = font * LETTER;
    const labelled = this.labels !== 'none';
    const arcs = layout.arcs.map((one) => {
      const middle = (one.start + one.end) / 2;
      const r = (one.inner + one.outer) / 2;
      const shown = {...one, middle, r, x: layout.cx + r * Math.sin(middle), y: layout.cy - r * Math.cos(middle), nameText: ''};
      if (!labelled || one.outer - one.inner < font * 1.4) return shown;
      // A straight line along the arc's middle: its ends stay inside the
      // ring's outer edge and inside the arc's two sides. Or, when the arc
      // holds more that way, the line follows the arc's middle as a curve,
      // drawn the other way round below the middle so it never reads
      // upside down.
      const span = one.end - one.start;
      const across = 2 * Math.sqrt(Math.max(0, (one.outer - 2) ** 2 - (r + font / 2) ** 2));
      const along = span >= Math.PI ? Infinity : 2 * (r - font / 2) * Math.tan(span / 2);
      const straight = Math.min(across, along);
      const curved = Math.min(span, Math.PI * 2 * 0.98) * r;
      shown.curve = curved > straight * 1.15;
      const room = Math.floor(((shown.curve ? curved : straight) - PAD * 2) / letter);
      shown.nameText = cut(one.node.name, room);
      if (shown.curve && shown.nameText) {
        const pad = Math.max(0, (span - Math.PI * 2 * 0.98) / 2);
        const from = one.start + pad;
        const to = one.end - pad;
        const below = middle > Math.PI / 2 && middle < (Math.PI * 3) / 2;
        const [a, b] = below ? [to, from] : [from, to];
        const at = (angle) => `${round(layout.cx + r * Math.sin(angle))} ${round(layout.cy - r * Math.cos(angle))}`;
        shown.curvePath = `M${at(a)}A${round(r)} ${round(r)} 0 ${to - from > Math.PI ? 1 : 0} ${below ? 0 : 1} ${at(b)}`;
      }
      return shown;
    });
    const total = this.sayY(model.total);
    const centre = layout.hole * 2 - PAD * 2 >= total.length * letter * 1.2 && layout.hole >= font * 1.6 ? total : '';
    return {width, height, font, cx: layout.cx, cy: layout.cy, hole: layout.hole, outer: layout.outer, ring: layout.ring, arcs, layout, centre};
  }

  summarize(model) {
    if (this.summary === 'none') return '';
    if (!model.nodes.length) return this.words('summary-empty');
    const locale = pageLocale(this);
    const parts = [this.words('summary-total', {
      levels: formatNumber(model.depth, locale, 'integer'),
      count: formatNumber(model.nodes.length, locale, 'integer'),
      total: this.sayY(model.total),
    })];
    // The first level that branches: the top ones, or under a single top.
    let branches = model.roots;
    while (branches.length === 1 && branches[0].children.length) branches = branches[0].children;
    if (branches.length > 1) {
      const top = branches[0];
      parts.push(this.words('summary-branch', {name: top.name, value: this.sayY(top.value), share: this.sayShare(top.value, model.total)}));
    }
    const leaves = model.nodes.filter((one) => !one.children.length);
    if (model.depth > 1) {
      const leaf = leaves.reduce((best, one) => (one.value > best.value ? one : best));
      parts.push(this.words('summary-leaf', {name: this.sayPath(leaf), value: this.sayY(leaf.value), share: this.sayShare(leaf.value, model.total)}));
    }
    const left = model.missing + model.dropped;
    if (left) parts.push(this.words('summary-left', {count: formatNumber(left, locale, 'integer')}));
    if (model.looped) parts.push(this.words('summary-looped', {count: formatNumber(model.looped, locale, 'integer')}));
    return parts.join(' ');
  }

  // An arc as one sentence: its path and value, its share of its parent
  // and of the whole, and how many parts it holds.
  arcLine(arc) {
    const model = this.model();
    const node = arc.node;
    const parts = [this.words('cursor', {name: this.sayPath(node), value: this.sayY(node.value)})];
    if (node.parent) parts.push(this.words('cursor-parent', {share: this.sayShare(node.value, node.parent.value), parent: node.parent.name, whole: this.sayShare(node.value, model.total)}));
    else parts.push(this.words('cursor-whole', {whole: this.sayShare(node.value, model.total)}));
    if (node.children.length) parts.push(this.words('cursor-children', {count: formatNumber(node.children.length, pageLocale(this), 'integer')}));
    return parts.join('; ');
  }

  cursorArc(cursor = this._cursor) {
    const geometry = this._geometry;
    if (!cursor || !geometry) return null;
    return geometry.arcs[cursor.index] ?? null;
  }

  setCursor(cursor, {say = false} = {}) {
    this._cursor = cursor;
    const arc = this.cursorArc(cursor);
    if (say && arc) this._said = this.arcLine(arc);
    this.requestComponentUpdate('cursor');
  }

  // The keys walk the arcs: Left and Right round the ring (clockwise is
  // Right), Down out to the largest child, Up back to the parent, Home and
  // End to the first and the last arc of the ring.
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
      this.choose(this.cursorArc());
      return;
    }
    const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const now = this.cursorArc();
    const index = now ? this.neighbour(now, event.key) ?? now.index : event.key === 'End' ? this.ringOf(0).at(-1).index : 0;
    this.setCursor({index, series: 'arc'}, {say: true});
  }

  ringOf(depth) {
    return this._geometry.arcs.filter((one) => one.node.depth === depth);
  }

  neighbour(now, key) {
    const {arcs} = this._geometry;
    const ring = this.ringOf(now.node.depth);
    const at = ring.indexOf(now);
    if (key === 'ArrowRight' || key === 'PageDown') return ring[(at + 1) % ring.length].index;
    if (key === 'ArrowLeft' || key === 'PageUp') return ring[(at - 1 + ring.length) % ring.length].index;
    if (key === 'Home') return ring[0].index;
    if (key === 'End') return ring[ring.length - 1].index;
    if (key === 'ArrowDown') {
      const child = now.node.children[0];
      return child ? arcs.find((one) => one.node === child).index : null;
    }
    const up = now.node.parent;
    return up ? arcs.find((one) => one.node === up).index : null;
  }

  // The pointer picks the arc it is over.
  placeAt(event) {
    const geometry = this._geometry;
    if (!geometry) return null;
    const box = event.currentTarget.getBoundingClientRect();
    const arc = arcAt(geometry.layout, event.clientX - box.left, event.clientY - box.top);
    return arc ? {index: arc.index, series: 'arc'} : null;
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
    if (place) this.choose(this.cursorArc(place));
  }

  choose(arc) {
    if (!arc) return;
    const node = arc.node;
    const model = this.model();
    this.sfEmit('select', {index: arc.index, node: node.id, name: node.name, path: [...node.path], depth: node.depth, value: node.value, share: model.total > 0 ? node.value / model.total : 0});
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
      cursor: this.cursorArc(),
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
    return renderSunburstTemplate(this.templateContext());
  }
}

SfSunburst.define('sf-chart-sunburst');
