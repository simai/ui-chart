// sf-line-chart: one or more series along time, a number or categories
// (docs/DECISIONS.md D1, the first chart of SIMAI Chart).
//
// The element reads its data once into series (chart-core/data), measures its
// plot, and draws axes, guide lines and one path per series in SVG
// (chart-core/scale, path, decimate). A person reaches the plot with one Tab
// stop and walks it with the arrows (chart-core/cursor); every move is said
// in a polite live region, the chart as a whole in a summary sentence
// (chart-core/describe), and the same data is a table on request.
//
// It renders into its own light DOM, like every Smart component.
import SfBaseElement from '../../core/js/smart-base';
import {elementFromManifest} from '../../core/js/element-manifest';
import {pageLocale} from '../../core/js/page-language';
import {extent, readSeries} from '../chart-core/data.js';
import {linearScale, nearestIndex, niceTicks, tickCount, timeTicks} from '../chart-core/scale.js';
import {formatNumber, formatTime, timeUnitOf} from '../chart-core/format.js';
import {areaPath, linePath} from '../chart-core/path.js';
import {minMaxIndexes} from '../chart-core/decimate.js';
import {seriesFacts} from '../chart-core/describe.js';
import {moveCursor} from '../chart-core/cursor.js';
import {renderLineChartTemplate} from './js/templates/default';
import manifest from './component.json';
import en from './lang/en.json';
import ru from './lang/ru.json';

// The text of the plot, in px, by size rung: axis labels are the small text
// role, so the room they need is known before anything is measured.
const FONT = {'1/2': 11, 1: 12, 2: 14};
const CHAR = 0.6;
const GAP = 8;

const LineChartElement = elementFromManifest(manifest, {
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

class SfLineChart extends LineChartElement {
  static get props() {
    return {...super.props, rootClass: {default: ''}};
  }

  onConnected() {
    this._uid = this.id || `sf-line-chart-${(instances += 1)}`;
    this._box = this._box ?? {width: 0, height: 0};
    this._cursor = null;
    this._said = '';
    this._view = 'chart';
  }

  onDisconnected() {
    this._observer?.disconnect();
    this._observer = null;
    super.onDisconnected();
  }

  afterRender(changed) {
    if (typeof changed === 'function') return super.afterRender(changed);
    const plot = this.querySelector('.sf-line-chart-plot');
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
    let [low, high] = extent(shown) ?? [0, 1];
    if (yMin !== null) low = yMin;
    if (yMax !== null) high = yMax;
    const top = GAP + (this.yLabel ? font * 1.5 : 0);
    const bottom = font * 1.5 + GAP + (this.xLabel ? font * 1.5 : 0);
    const yTicks = niceTicks(low, high, tickCount(height - top - bottom, font * 3.5), {
      zero: this.yZero || this.area,
      nice: yMin === null && yMax === null,
    });
    const yLabels = yTicks.ticks.map((value) => this.sayY(value, yTicks.step));
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
    const lines = shown.map((one) => {
      const keep = this.decimate === 'none' ? null : minMaxIndexes(px, one.values, inner.right - inner.left);
      const indexes = keep ?? one.values.map((_, index) => index);
      const points = indexes.map((index) => (one.values[index] === null ? null : [px[index], y(one.values[index])]));
      return {
        ...one,
        d: linePath(points, {curve: this.curve, gaps: this.gaps}),
        area: this.area ? areaPath(points, baseline, {curve: this.curve, gaps: this.gaps}) : '',
        dots: markers ? one.values.map((value, index) => (value === null ? null : [px[index], y(value), index])).filter(Boolean) : [],
      };
    });
    return {
      width, height, font, inner, x, y, px, lines, baseline,
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
    return this.words('cursor', {x: this.sayX(model, cursor.index), name: one.name, value: this.sayY(one.values[cursor.index])});
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
      const value = line.values[index];
      if (value === null) continue;
      const distance = Math.abs(geometry.y(value) - py);
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
    return this.createTemplateContext({
      ...this.getPropsContext(),
      component: this,
      uid: this._uid,
      size: this.size,
      label: this.label || this.words('untitled'),
      state,
      model,
      shown,
      geometry,
      cursor,
      said: this._said,
      view: this.table === 'toggle' ? this._view : 'chart',
      legend: this.legend === 'auto' ? (model.series.length > 1 ? 'top' : 'none') : this.legend,
      summaryText: state === 'ready' ? this.summarize(model, shown) : '',
      hasDescription: this.hasSlotContent?.('description') ?? false,
      description: this.hasSlotContent?.('description') ? this.getSlotContent('description') : null,
      rootClass: this.getRootClass(),
    });
  }

  template() {
    return renderLineChartTemplate(this.templateContext());
  }
}

SfLineChart.define('sf-line-chart');
