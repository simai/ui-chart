// sf-chart-radar: a radar chart, to compare a few items over several
// measures on one scale (docs/research/catalogue.md, Radar;
// docs/DECISIONS.md D9).
//
// The element reads its rows once into series (chart-core/data, the x field
// as categories: one spoke each), measures its plot, and draws in SVG the
// rings of the scale, a spoke per measure from the centre, and each series
// as a ring through its values (chart-core/radar). A person reaches the plot
// with one Tab stop and walks it with the arrows (chart-core/cursor): round
// the spokes, and across the series; every move is said in a polite live
// region, the chart as a whole in a summary sentence, and the same data is
// a table on request.
//
// It renders into its own light DOM, like every Smart component.
import SfBaseElement from '../../core/js/smart-base';
import {elementFromManifest} from '../../core/js/element-manifest';
import {pageLocale} from '../../core/js/page-language';
import {readSeries} from '../chart-core/data.js';
import {linearScale, niceTicks} from '../chart-core/scale.js';
import {formatNumber} from '../chart-core/format.js';
import {seriesFacts} from '../chart-core/describe.js';
import {moveCursor} from '../chart-core/cursor.js';
import {settled} from '../chart-core/settle.js';
import {checkContrast, coloursKey, readColours} from '../chart-core/colors.js';
import {PALETTES} from '../chart-core/palettes.js';
import {compareRings, labelPlace, radarRuns, spokePoint} from '../chart-core/radar.js';
import {renderRadarTemplate} from './js/templates/default';
import manifest from './component.json';
import en from './lang/en.json';
import ru from './lang/ru.json';

// The text of the plot, in px, by size rung, as on the line chart.
const FONT = {'1/2': 11, 1: 12, 2: 14};
// A value's mark, in px, by size rung.
const DOT = {'1/2': 2.5, 1: 3, 2: 3.5};
const CHAR = 0.6;
const GAP = 8;

const ChartRadarElement = elementFromManifest(manifest, {
  base: SfBaseElement,
  lang: {en, ru},
  source: 'ru',
  actions: {
    reset() {
      this.hiddenSeries = [];
      this._cursor = null;
      this.requestComponentUpdate('reset');
    },
  },
});

let instances = 0;

class SfRadar extends ChartRadarElement {
  static get props() {
    return {...super.props, rootClass: {default: ''}};
  }

  onConnected() {
    this._uid = this.id || `sf-chart-radar-${(instances += 1)}`;
    this._box = this._box ?? {width: 0, height: 0};
    this._cursor = null;
    this._said = '';
    this._view = 'chart';
  }

  onDisconnected() {
    this._observer?.disconnect();
    this._observer = null;
    clearTimeout(this._table?.timer);
    super.onDisconnected();
  }

  afterRender(changed) {
    if (typeof changed === 'function') return super.afterRender(changed);
    const colours = this.colours();
    const checked = coloursKey(colours);
    if (checked !== this._coloursChecked && this.isConnected) {
      this._coloursChecked = checked;
      checkContrast(this, colours, 'sf-chart-radar');
    }
    const plot = this.querySelector('.sf-chart-radar-plot');
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
      this._colours = readColours(this.colors, (said) => console.warn(`<sf-chart-radar> ${said}`));
    }
    return this._colours;
  }

  // Each series' colour by key: the page's own or the named palette's by
  // place (D7). With neither, the template keeps the theme's colours.
  paints(list) {
    const own = this.colours();
    const set = PALETTES[this.palette];
    if (!set) return own;
    const out = new Map(own);
    list.forEach((one, place) => {
      if (!out.has(one.key)) out.set(one.key, set[place % set.length]);
    });
    return out;
  }

  words(key, vars) {
    return this.sfWord(key, vars ? {vars} : undefined);
  }

  // The rows as series over the spokes, read again only when the data or
  // its mapping changes. The x field is always categories: a spoke each.
  model() {
    const key = [this.items, this.names, this.x, this.y, this.series];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;
    this._model = readSeries(this.items, {x: this.x, y: this.y, series: this.series, xScale: 'category', names: this.names || {}});
    return this._model;
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.labels.length && model.series.some((one) => one.values.some((value) => value !== null)) ? 'ready' : 'empty';
  }

  shownSeries(model) {
    const hidden = new Set(this.hiddenSeries || []);
    return model.series.map((one, place) => ({...one, place})).filter((one) => !hidden.has(one.key));
  }

  sayY(value, step = 0) {
    return formatNumber(value, pageLocale(this), this.yFormat, {step, gap: this.words('gap')});
  }

  spokeName(model, index) {
    const label = model.labels[index];
    return label === '' || label === undefined || label === null ? this.words('spoke-n', {n: String(index + 1)}) : String(label);
  }

  // The scale: from min (zero when unset) to max (the data's largest,
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
    return niceTicks(min, Math.max(max, min + (given ? 0 : 1e-9)), rings, {nice: !given});
  }

  // Where everything goes: the centre and the radius, the scale's rings,
  // the spokes with their labels, and each shown series' ring and marks.
  // Null until the plot has a width.
  geometry(model, shown) {
    const {width, height} = this._box;
    if (!width || !height) return null;
    const font = FONT[this.size] ?? 12;
    const count = model.labels.length;
    // The labels take what the sides need, up to a quarter of the width
    // each; a longer one is cut and said whole by the tooltip.
    const room = Math.min(width * 0.25, Math.max(...model.labels.map((_, index) => this.spokeName(model, index).length)) * font * CHAR);
    const most = Math.max(3, Math.floor(room / (font * CHAR)));
    // Above and below, a line of text and a gap; a label stands half a gap
    // off its spoke's end.
    const radius = Math.max(8, Math.min((height - 2 * (font * 1.25 + GAP)) / 2, (width - 2 * (room + GAP * 1.5)) / 2));
    const center = [width / 2, height / 2];
    const ticks = this.scale(model, shown, radius > 90 ? 5 : radius > 50 ? 4 : 3);
    const distance = linearScale([ticks.min, ticks.max], [0, radius]);
    const at = (value) => Math.max(0, Math.min(radius, distance(value)));

    const spokes = model.labels.map((_, index) => {
      const [x, y] = spokePoint(center, radius, index, count);
      const [lx, ly] = spokePoint(center, radius + GAP / 2, index, count);
      const name = this.spokeName(model, index);
      return {index, x, y, lx, ly, text: name.length > most ? `${name.slice(0, most - 1)}…` : name, ...labelPlace(index, count)};
    });
    const rings = ticks.ticks.filter((value) => value > ticks.min).map((value) => ({
      r: at(value),
      points: model.labels.map((_, index) => spokePoint(center, at(value), index, count)),
      text: this.sayY(value, ticks.step),
    }));
    const dot = DOT[this.size] ?? 3;
    const series = shown.map((one) => ({
      key: one.key,
      place: one.place,
      ring: radarRuns(one.values, center, at),
      marks: one.values.map((value, index) => (value === null ? null : {index, value, point: spokePoint(center, at(value), index, count)})).filter(Boolean),
    }));
    return {width, height, font, center, radius, count, spokes, rings, series, dot, grid: this.grid};
  }

  summarize(model, shown) {
    if (this.summary === 'none') return '';
    const locale = pageLocale(this);
    const facts = shown.map((one) => ({one, facts: seriesFacts(one.values)})).filter(({facts}) => facts);
    if (!facts.length) return this.words('summary-empty');
    let low = Infinity;
    let high = -Infinity;
    for (const {facts: own} of facts) {
      low = Math.min(low, own.min);
      high = Math.max(high, own.max);
    }
    const parts = [this.words('summary-spokes', {count: formatNumber(model.labels.length, locale, 'integer'), min: this.sayY(low), max: this.sayY(high)})];
    for (const {one, facts: own} of facts) {
      const said = {high: this.spokeName(model, own.maxAt), highValue: this.sayY(own.max), low: this.spokeName(model, own.minAt), lowValue: this.sayY(own.min)};
      if (own.max === own.min) parts.push(this.words(model.series.length > 1 ? 'summary-even-series' : 'summary-even', {name: one.name, value: this.sayY(own.max)}));
      else parts.push(this.words(model.series.length > 1 ? 'summary-series' : 'summary-one', {name: one.name, ...said}));
    }
    if (facts.length > 1) {
      const [a, b] = facts;
      const {above, below} = compareRings(a.one.values, b.one.values);
      const both = a.one.values.filter((value, index) => value !== null && b.one.values[index] !== null).length;
      parts.push(this.words('summary-compare', {a: a.one.name, b: b.one.name, above: formatNumber(above, locale, 'integer'), below: formatNumber(below, locale, 'integer'), count: formatNumber(both, locale, 'integer')}));
    }
    const gaps = shown.reduce((sum, one) => sum + one.values.filter((value) => value === null).length, 0);
    if (gaps) parts.push(this.words('summary-gaps', {count: formatNumber(gaps, locale, 'integer')}));
    return parts.join(' ');
  }

  // A value as one sentence: the spoke, the series when there are several,
  // and the value.
  cursorLine(model, cursor) {
    const one = model.series.find((each) => each.key === cursor.series);
    const value = one?.values[cursor.index] ?? null;
    const spoke = this.spokeName(model, cursor.index);
    const said = value === null ? this.words('gap') : this.sayY(value);
    return model.series.length > 1
      ? this.words('cursor-series', {spoke, series: one?.name ?? cursor.series, value: said})
      : this.words('cursor', {spoke, value: said});
  }

  setCursor(cursor, {say = false} = {}) {
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
    const shown = this.shownSeries(this.model()).map((one) => one.key);
    const next = moveCursor(this._cursor, event.key, {count: geometry.count, shown});
    if (next === null) return;
    event.preventDefault();
    this.setCursor(next, {say: true});
  }

  // The pointer picks the nearest value's mark within reach, else the
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
          best = {index: mark.index, series: one.key};
          distance = off;
        }
      }
    }
    if (best) return best;
    const [cx, cy] = geometry.center;
    if (Math.hypot(x - cx, y - cy) > geometry.radius + GAP) return null;
    const turn = (Math.atan2(y - cy, x - cx) + Math.PI / 2 + Math.PI * 2) % (Math.PI * 2);
    return {index: Math.round((turn / (Math.PI * 2)) * geometry.count) % geometry.count, series: geometry.series[0].key};
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
    const value = model.series.find((one) => one.key === cursor.series)?.values[cursor.index] ?? null;
    this.sfEmit('select', {series: cursor.series, index: cursor.index, spoke: this.spokeName(model, cursor.index), value});
  }

  toggleSeries(key) {
    const hidden = new Set(this.hiddenSeries || []);
    const nowHidden = !hidden.has(key);
    if (nowHidden) hidden.add(key);
    else hidden.delete(key);
    this.hiddenSeries = [...hidden];
    this._cursor = null;
    this.sfEmit('toggle', {id: key, hidden: nowHidden});
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
      shown,
      geometry,
      cursor: geometry ? this._cursor : null,
      said: this._said,
      view: this.table === 'toggle' ? this._view : 'chart',
      legend: this.legend === 'auto' ? (model.series.length > 1 ? 'top' : 'none') : this.legend,
      summaryText: state === 'ready' ? this.summarize(model, shown) : '',
      hasDescription: this.hasSlotContent?.('description') ?? false,
      description: this.hasSlotContent?.('description') ? this.getSlotContent('description') : null,
      paint: this.paints(model?.series ?? []),
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
    return renderRadarTemplate(this.templateContext());
  }
}

SfRadar.define('sf-chart-radar');
