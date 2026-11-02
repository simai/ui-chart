// sf-chart-line: one or more series along time, a number or categories
// (docs/DECISIONS.md D1, the first chart of SIMAI Chart).
//
// The element reads its data once into series (chart-core/data), measures its
// plot, and draws axes, guide lines and one path per series in SVG
// (chart-core/scale, path, decimate). A person reaches the plot with one Tab
// stop and walks it with the arrows (chart-core/cursor); every move is said
// in a polite live region, the chart as a whole in a summary sentence
// (chart-core/describe), and the same data is a table on request. Stacked,
// the series are layers (chart-core/stack): each line is its layer's top and
// its area the band down to the layer under it.
//
// It renders into its own light DOM, like every Smart component.
import SfBaseElement from '../../core/js/smart-base';
import {elementFromManifest} from '../../core/js/element-manifest';
import {pageLocale} from '../../core/js/page-language';
import {extent, readSeries} from '../chart-core/data.js';
import {linearScale, nearestIndex, niceTicks, tickCount, timeTicks} from '../chart-core/scale.js';
import {formatNumber, formatTime, timeUnitOf} from '../chart-core/format.js';
import {areaPath, bandPath, linePath} from '../chart-core/path.js';
import {stackExtent, stackSeries} from '../chart-core/stack.js';
import {minMaxIndexes} from '../chart-core/decimate.js';
import {seriesFacts} from '../chart-core/describe.js';
import {moveCursor} from '../chart-core/cursor.js';
import {settled} from '../chart-core/settle.js';
import {checkContrast, coloursKey, readColours} from '../chart-core/colors.js';
import {PALETTES} from '../chart-core/palettes.js';
import {renderLineChartTemplate} from './js/templates/default';
import manifest from './component.json';
import en from './lang/en.json';
import ru from './lang/ru.json';

// The text of the plot, in px, by size rung: axis labels are the small text
// role, so the room they need is known before anything is measured.
const FONT = {'1/2': 11, 1: 12, 2: 14};
const CHAR = 0.6;
const GAP = 8;

const ChartLineElement = elementFromManifest(manifest, {
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

class SfLineChart extends ChartLineElement {
  static get props() {
    return {...super.props, rootClass: {default: ''}};
  }

  onConnected() {
    this._uid = this.id || `sf-chart-line-${(instances += 1)}`;
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
      checkContrast(this, colours, 'sf-chart-line');
    }
    const plot = this.querySelector('.sf-chart-line-plot');
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
      this._colours = readColours(this.colors, (said) => console.warn(`<sf-chart-line> ${said}`));
    }
    return this._colours;
  }

  // Each series' colour by key: the page's own (colors) or the named
  // palette's by place (chart-core/palettes, D7). With neither, the template
  // keeps the theme's colours.
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

  // The data as series, read again only when the data or its mapping changes.
  model() {
    const key = [this.items, this.names, this.x, this.y, this.series, this.xScale];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;
    this._model = readSeries(this.items, {x: this.x, y: this.y, series: this.series, xScale: this.xScale, names: this.names || {}});
    this._model.unit = this._model.kind === 'time' ? timeUnitOf(this._model.xs) : 'day';
    return this._model;
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.series.some((one) => one.values.some((value) => value !== null)) ? 'ready' : 'empty';
  }

  shownSeries(model) {
    const hidden = new Set(this.hiddenSeries || []);
    return model.series.map((one, place) => ({...one, place})).filter((one) => !hidden.has(one.key));
  }

  // An x value as the axis, the tooltip and the table say it.
  sayX(model, index, form = 'full') {
    const locale = pageLocale(this);
    if (model.kind === 'time') return formatTime(model.xs[index], locale, model.unit, {form, format: this.xFormat});
    if (model.kind === 'number') return formatNumber(model.xs[index], locale, this.xFormat === 'auto' ? 'number' : this.xFormat);
    return String(model.labels[index] ?? '');
  }

  sayY(value, step = 0) {
    return formatNumber(value, pageLocale(this), this.yFormat, {step, gap: this.words('gap')});
  }

  // A series' value at an x as the cursor and the tooltip say it: in a
  // normalized stack, its share of the whole and then the value itself.
  sayValue(line, index) {
    const raw = line.values[index];
    const segment = line.segments?.[index];
    if (this.stack !== 'normalized' || raw === null || !segment) return this.sayY(raw);
    return this.words('share', {share: formatNumber(segment[1] - segment[0], pageLocale(this), 'percent'), value: this.sayY(raw)});
  }

  // Where everything goes: the plot's inner box, the scales, the ticks and
  // one path per shown series. Null until the plot has a width.
  geometry(model, shown) {
    const {width, height} = this._box;
    if (!width || !height) return null;
    const font = FONT[this.size] ?? 12;
    const count = model.xs.length;

    // y-min and y-max hold only when given: an unset number reads as 0.
    const yMin = this.hasAttribute('y-min') && Number.isFinite(this.yMin) ? this.yMin : null;
    const yMax = this.hasAttribute('y-max') && Number.isFinite(this.yMax) ? this.yMax : null;
    // Stacked, the axis spans the layers' ends; normalized, 0–100 % always.
    const stacked = this.stack !== 'none';
    const normalized = this.stack === 'normalized';
    const segments = stacked ? stackSeries(shown, this.stack) : null;
    let [low, high] = normalized ? [0, 1] : stacked ? stackExtent(segments) : extent(shown) ?? [0, 1];
    if (!normalized && yMin !== null) low = yMin;
    if (!normalized && yMax !== null) high = yMax;
    if (high === low) high = low + 1;
    const top = GAP + (this.yLabel ? font * 1.5 : 0);
    const bottom = font * 1.5 + GAP + (this.xLabel ? font * 1.5 : 0);
    const yTicks = niceTicks(low, high, tickCount(height - top - bottom, font * 3.5), {
      zero: this.yZero || this.area || stacked,
      nice: normalized || (yMin === null && yMax === null),
    });
    const yLabels = yTicks.ticks.map((value) => (normalized
      ? formatNumber(value, pageLocale(this), 'percent', {step: yTicks.step})
      : this.sayY(value, yTicks.step)));
    const left = Math.ceil(Math.max(...yLabels.map((text) => text.length)) * font * CHAR) + GAP * 1.5;
    const right = GAP * 2;
    const inner = {left, top, right: Math.max(left + 1, width - right), bottom: Math.max(top + 1, height - bottom)};
    const y = linearScale([yTicks.min, yTicks.max], [inner.bottom, inner.top]);

    const xDomain = count > 1 ? [model.xs[0], model.xs[count - 1]] : [model.xs[0] - 1, model.xs[0] + 1];
    // A category sits in the middle of its band; a time or a number at its value.
    const band = model.kind === 'category' ? (inner.right - inner.left) / Math.max(1, count) : 0;
    const x = model.kind === 'category'
      ? linearScale([0, Math.max(1, count - 1)], [inner.left + band / 2, inner.right - band / 2])
      : linearScale(xDomain, [inner.left, inner.right]);

    let xTicks;
    if (model.kind === 'time') {
      const ticks = timeTicks(xDomain[0], xDomain[1], tickCount(inner.right - inner.left, font * CHAR * 12));
      xTicks = ticks.ticks.map((time) => ({at: x(time), text: formatTime(time, pageLocale(this), ticks.unit)}));
    } else if (model.kind === 'number') {
      const ticks = niceTicks(xDomain[0], xDomain[1], tickCount(inner.right - inner.left, font * CHAR * 8), {nice: false});
      xTicks = ticks.ticks.map((value) => ({at: x(value), text: formatNumber(value, pageLocale(this), 'number', {step: ticks.step})}));
    } else {
      const longest = Math.max(1, ...model.labels.map((label) => String(label).length));
      const every = Math.max(1, Math.ceil(count / Math.max(1, Math.floor((inner.right - inner.left) / (longest * font * CHAR + GAP)))));
      xTicks = model.labels.map((label, index) => ({at: x(index), text: String(label), index})).filter(({index}) => index % every === 0);
    }

    // A label at an edge does not leave the plot: it is held from that edge.
    xTicks = xTicks.map((tick) => {
      const half = (tick.text.length * font * CHAR) / 2;
      if (tick.at - half < 0) return {...tick, at: 0, anchor: 'start'};
      if (tick.at + half > width) return {...tick, at: width, anchor: 'end'};
      return {...tick, anchor: 'middle'};
    });

    const px = model.xs.map((value) => x(value));
    const baseline = y(Math.max(yTicks.min, Math.min(yTicks.max, 0)));
    const markers = this.markers === 'always' || (this.markers === 'auto' && count <= 200 && (inner.right - inner.left) / Math.max(1, count) >= 12);
    const room = inner.right - inner.left;
    const options = {curve: this.curve, gaps: this.gaps};
    // Each series at each x as a height on the plot: its value, or stacked
    // its layer's top. A gap stays null.
    const tops = shown.map((one, place) => one.values.map((value, index) => {
      if (value === null) return null;
      return y(segments ? segments[place][index][1] : value);
    }));
    // Layers share one set of kept points, so each band meets the one under it.
    let shared = null;
    if (segments && this.decimate !== 'none') {
      const kept = new Set();
      for (const one of shown) for (const index of minMaxIndexes(px, one.values, room) ?? one.values.map((_, at) => at)) kept.add(index);
      shared = [...kept].sort((a, b) => a - b);
    }
    const lines = shown.map((one, place) => {
      const keep = segments ? shared : this.decimate === 'none' ? null : minMaxIndexes(px, one.values, room);
      const indexes = keep ?? one.values.map((_, index) => index);
      const points = indexes.map((index) => (tops[place][index] === null ? null : [px[index], tops[place][index]]));
      let area = '';
      if (segments) {
        const lower = indexes.map((index) => (segments[place][index] === null ? null : [px[index], y(segments[place][index][0])]));
        area = bandPath(points, lower, options);
      } else if (this.area) {
        area = areaPath(points, baseline, options);
      }
      return {
        ...one,
        segments: segments?.[place] ?? null,
        ys: tops[place],
        d: linePath(points, options),
        area,
        dots: markers ? tops[place].map((at, index) => (at === null ? null : [px[index], at, index])).filter(Boolean) : [],
      };
    });
    return {
      width, height, font, inner, x, y, px, lines, baseline, stacked,
      yTicks: yTicks.ticks.map((value, index) => ({at: y(value), text: yLabels[index], zero: value === 0})),
      xTicks,
    };
  }

  summarize(model, shown) {
    if (this.summary === 'none') return '';
    if (!model.xs.length) return this.words('summary-empty');
    // The sentence ends with its own full stop: an abbreviation the date
    // ends with («2026 г.») gives it, not a second one.
    const parts = [this.words('summary-range', {from: this.sayX(model, 0), to: this.sayX(model, model.xs.length - 1).replace(/\.$/u, '')})];
    if (this.stack !== 'none' && shown.length > 1) parts.push(this.words(`summary-${this.stack}`));
    for (const one of shown) {
      const facts = seriesFacts(one.values);
      if (!facts) continue;
      parts.push(this.words('summary-series', {
        name: one.name,
        first: this.sayY(one.values[facts.first]),
        last: this.sayY(one.values[facts.last]),
        max: this.sayY(facts.max),
        maxAt: this.sayX(model, facts.maxAt),
        min: this.sayY(facts.min),
        minAt: this.sayX(model, facts.minAt),
      }));
    }
    return parts.join(' ');
  }

  // The cursor as one sentence: the x, then the series under it.
  cursorLine(model, cursor) {
    const one = model.series.find((series) => series.key === cursor.series);
    if (!one) return '';
    const line = this._geometry?.lines.find((shown) => shown.key === one.key) ?? one;
    return this.words('cursor', {x: this.sayX(model, cursor.index), name: one.name, value: this.sayValue(line, cursor.index)});
  }

  setCursor(cursor, {say = false} = {}) {
    this._cursor = cursor;
    if (say && cursor) this._said = this.cursorLine(this.model(), cursor);
    this.requestComponentUpdate('cursor');
  }

  onPlotKey(event) {
    const model = this.model();
    const shown = this.shownSeries(model).map((one) => one.key);
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
    const next = moveCursor(this._cursor, event.key, {count: model.xs.length, shown});
    if (!next) return;
    event.preventDefault();
    this.setCursor(next, {say: true});
  }

  // The pointer picks the nearest x and, of the shown series, the nearest line.
  pointAt(event) {
    const geometry = this._geometry;
    if (!geometry) return null;
    const box = event.currentTarget.getBoundingClientRect();
    const px = event.clientX - box.left;
    const py = event.clientY - box.top;
    const index = nearestIndex(geometry.px, px);
    if (index < 0) return null;
    let best = null;
    for (const line of geometry.lines) {
      const at = line.ys[index];
      if (at === null) continue;
      const distance = Math.abs(at - py);
      if (!best || distance < best.distance) best = {series: line.key, distance};
    }
    return best ? {index, series: best.series} : null;
  }

  onPointerMove(event) {
    const point = this.pointAt(event);
    if (!point || (this._cursor && point.index === this._cursor.index && point.series === this._cursor.series)) return;
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

  choose(cursor) {
    const model = this.model();
    const one = model.series.find((series) => series.key === cursor.series);
    if (!one) return;
    // x as the data gave it ('2026-12'), not as the axis reads it.
    this.sfEmit('select', {series: one.key, index: cursor.index, x: String(model.labels[cursor.index] ?? ''), value: one.values[cursor.index]});
  }

  toggleSeries(key) {
    const hidden = new Set(this.hiddenSeries || []);
    const nowHidden = !hidden.has(key);
    if (nowHidden) hidden.add(key);
    else hidden.delete(key);
    this.hiddenSeries = [...hidden];
    if (this._cursor?.series === key) this._cursor = null;
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
    const cursor = this._cursor && shown.some((one) => one.key === this._cursor.series) && this._cursor.index < model.xs.length ? this._cursor : null;
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
      tableKey: [tableModel, this.label, this.xLabel, this.xFormat, this.yFormat, pageLocale(this), this.table, this.table === 'toggle' ? this._view : 'chart'],
      shown,
      geometry,
      cursor,
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
    return renderLineChartTemplate(this.templateContext());
  }
}

SfLineChart.define('sf-chart-line');
