// sf-chart-scatter: points at two measures, to show how they go together,
// with an optional third measure as a bubble's area
// (docs/research/catalogue.md, Scatter / bubble; docs/DECISIONS.md D9).
//
// The element reads its rows once into points (chart-core/scatter), measures
// its plot, and draws axes, guide lines and one mark per point in SVG, or
// past 2,000 marks on a canvas under the SVG (D5), which keeps the axes, the
// cursor and the text. A person reaches the plot with one Tab stop and walks
// the points with the arrows (chart-core/scatter moveScatter); every move is
// said in a polite live region, the chart as a whole in a summary sentence
// with the strength of the relation, and the same data is a table on
// request.
//
// It renders into its own light DOM, like every Smart component.
import SfBaseElement from '../../core/js/smart-base';
import {elementFromManifest} from '../../core/js/element-manifest';
import {pageLocale} from '../../core/js/page-language';
import {linearScale, niceTicks, tickCount} from '../chart-core/scale.js';
import {formatNumber} from '../chart-core/format.js';
import {settled} from '../chart-core/settle.js';
import {checkContrast, coloursKey, readColours} from '../chart-core/colors.js';
import {PALETTES} from '../chart-core/palettes.js';
import {bubbleRadius, linearFit, measureExtent, moveScatter, nearestPoint, readingOrder, scatterPoints, strengthOf} from '../chart-core/scatter.js';
import {paintMarks, renderScatterTemplate} from './js/templates/default';
import manifest from './component.json';
import en from './lang/en.json';
import ru from './lang/ru.json';

// The text of the plot, in px, by size rung, as on the line chart.
const FONT = {'1/2': 11, 1: 12, 2: 14};
// A point's radius and the largest bubble's, in px, by size rung.
const DOT = {'1/2': 3, 1: 3.5, 2: 4.5};
const BUBBLE = {'1/2': 14, 1: 22, 2: 34};
const CHAR = 0.6;
const GAP = 8;
// Past this many marks the marks layer is a canvas (D5).
const CANVAS_FROM = 2000;

const ChartScatterElement = elementFromManifest(manifest, {
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

class SfScatter extends ChartScatterElement {
  static get props() {
    return {...super.props, rootClass: {default: ''}};
  }

  onConnected() {
    this._uid = this.id || `sf-chart-scatter-${(instances += 1)}`;
    this._box = this._box ?? {width: 0, height: 0};
    this._cursor = null;
    this._said = '';
    this._view = 'chart';
  }

  onDisconnected() {
    this._observer?.disconnect();
    this._observer = null;
    this._theme?.disconnect();
    this._theme = null;
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
      checkContrast(this, colours, 'sf-chart-scatter');
    }
    const plot = this.querySelector('.sf-chart-scatter-plot');
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
    this.paintCanvas();
    return undefined;
  }

  // The canvas marks take their colours from the page as it is drawn; a theme
  // switched on the page (an attribute of html or body) paints them again.
  paintCanvas() {
    const canvas = this.querySelector('.sf-chart-scatter-canvas');
    const geometry = this._geometry;
    if (!canvas || !geometry?.canvas) {
      this._theme?.disconnect();
      this._theme = null;
      return;
    }
    paintMarks(this, canvas, geometry);
    if (!this._theme && typeof MutationObserver === 'function') {
      this._theme = new MutationObserver(() => this.paintCanvas());
      for (const node of [document.documentElement, document.body]) if (node) this._theme.observe(node, {attributes: true});
    }
  }

  // The page's own colours by key (chart-core/colors), read again only when
  // the setting changes.
  colours() {
    if (this.colors !== this._coloursRaw || !this._colours) {
      this._coloursRaw = this.colors;
      this._colours = readColours(this.colors, (said) => console.warn(`<sf-chart-scatter> ${said}`));
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

  // The rows as points, read again only when the data or its mapping changes.
  model() {
    const key = [this.items, this.names, this.x, this.y, this.bubble, this.series, this.point];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;
    this._model = scatterPoints(this.items, {x: this.x, y: this.y, bubble: this.bubble, series: this.series, point: this.point, names: this.names || {}});
    return this._model;
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.points.length ? 'ready' : 'empty';
  }

  shownSeries(model) {
    const hidden = new Set(this.hiddenSeries || []);
    return model.series.map((one, place) => ({...one, place})).filter((one) => !hidden.has(one.key));
  }

  // The axes' and the bubble's names: the page's label, or the field.
  axisName(which) {
    const model = this.model();
    if (which === 'x') return this.xLabel || model.xField;
    if (which === 'y') return this.yLabel || model.yField;
    return this.bubbleLabel || model.bubbleField;
  }

  sayX(value, step = 0) {
    return formatNumber(value, pageLocale(this), this.xFormat, {step, gap: this.words('gap')});
  }

  sayY(value, step = 0) {
    return formatNumber(value, pageLocale(this), this.yFormat, {step, gap: this.words('gap')});
  }

  saySize(value) {
    return formatNumber(value, pageLocale(this), this.bubbleFormat, {gap: this.words('gap')});
  }

  // What a point is called: its name, or its row; with more than one series,
  // the series too.
  pointName(model, one) {
    const name = one.name || this.words('point-n', {n: String(one.row + 1)});
    if (model.series.length < 2) return name;
    const series = model.series.find((each) => each.key === one.series);
    return this.words('point-in', {name, series: series?.name ?? one.series});
  }

  // One axis's ticks and domain: the data's extent, or the page's min and
  // max, which hold only when given (an unset number reads as 0).
  axis(points, measure, room, font) {
    const name = measure === 'x' ? 'x' : 'y';
    const min = this.hasAttribute(`${name}-min`) && Number.isFinite(this[`${name}Min`]) ? this[`${name}Min`] : null;
    const max = this.hasAttribute(`${name}-max`) && Number.isFinite(this[`${name}Max`]) ? this[`${name}Max`] : null;
    let [low, high] = measureExtent(points, measure) ?? [0, 1];
    if (min !== null) low = min;
    if (max !== null) high = max;
    if (high < low) [low, high] = [high, low];
    return niceTicks(low, high, tickCount(room, font), {zero: Boolean(this[`${name}Zero`]), nice: min === null && max === null});
  }

  // Where everything goes: the plot's inner box, the scales, the ticks, one
  // mark per shown point and a trend line per shown series. Null until the
  // plot has a width.
  geometry(model, shown) {
    const {width, height} = this._box;
    if (!width || !height) return null;
    const font = FONT[this.size] ?? 12;
    const keys = new Set(shown.map((one) => one.key));
    const points = model.points.filter((one) => keys.has(one.series));
    const bubbles = Boolean(model.bubbleField);
    const largest = bubbles ? BUBBLE[this.size] ?? 22 : DOT[this.size] ?? 3.5;
    const pad = largest + 2;

    const top = GAP + (this.yLabel ? font * 1.5 : 0);
    const bottom = font * 1.5 + GAP + (this.xLabel ? font * 1.5 : 0);
    const yTicks = this.axis(points, 'y', height - top - bottom, font * 3.5);
    const yLabels = yTicks.ticks.map((value) => this.sayY(value, yTicks.step));
    const left = Math.ceil(Math.max(...yLabels.map((text) => text.length)) * font * CHAR) + GAP * 1.5;
    const right = GAP * 2;
    const inner = {left, top, right: Math.max(left + 1, width - right), bottom: Math.max(top + 1, height - bottom)};
    const xTicks = this.axis(points, 'x', inner.right - inner.left, font * CHAR * 8);
    // The marks keep their radius from the plot's edges, so none is cut.
    const x = linearScale([xTicks.min, xTicks.max], [inner.left + pad, Math.max(inner.left + pad + 1, inner.right - pad)]);
    const y = linearScale([yTicks.min, yTicks.max], [Math.max(inner.top + pad + 1, inner.bottom - pad), inner.top + pad]);

    // A label at an edge does not leave the plot: it is held from that edge.
    // Its width is guessed with a margin, since digits and a thousands space
    // run wider than the average letter.
    const xLabels = xTicks.ticks.map((value) => {
      const text = this.sayX(value, xTicks.step);
      const at = x(value);
      const half = (text.length * font * CHAR * 1.3) / 2;
      if (at - half < 0) return {at: 0, text, anchor: 'start'};
      if (at + half > width) return {at: width, text, anchor: 'end'};
      return {at, text, anchor: 'middle'};
    });

    const place = new Map(shown.map((one) => [one.key, one.place]));
    const topSize = bubbles ? (measureExtent(model.points, 'size')?.[1] ?? 0) : 0;
    const marks = points.map((one) => ({
      ...one,
      place: place.get(one.series),
      cx: x(one.x),
      cy: y(one.y),
      r: bubbles ? bubbleRadius(one.size, topSize, {least: 2, largest}) : largest,
      hollow: bubbles && !(one.size > 0),
    }));
    const at = marks.map((one) => [one.cx, one.cy]);
    // Bubbles are drawn largest first, so a small one is never under a large.
    const drawn = bubbles ? marks.map((_, index) => index).sort((a, b) => marks[b].r - marks[a].r) : marks.map((_, index) => index);

    const trends = this.trend === 'linear' ? shown.map((one) => {
      const own = points.filter((each) => each.series === one.key);
      const fit = linearFit(own);
      if (!fit) return null;
      const [from, to] = measureExtent(own, 'x');
      return {key: one.key, place: one.place, x1: x(from), y1: y(fit.intercept + fit.slope * from), x2: x(to), y2: y(fit.intercept + fit.slope * to)};
    }).filter(Boolean) : [];

    return {
      width, height, font, inner, x, y, bubbles, marks, at, drawn, trends,
      order: readingOrder(marks),
      canvas: marks.length > CANVAS_FROM,
      yTicks: yTicks.ticks.map((value, index) => ({at: y(value), text: yLabels[index], zero: value === 0})),
      xTicks: xLabels,
      xZero: xTicks.ticks.includes(0) ? x(0) : null,
    };
  }

  summarize(model, shown) {
    if (this.summary === 'none') return '';
    const keys = new Set(shown.map((one) => one.key));
    const points = model.points.filter((one) => keys.has(one.series));
    if (!points.length) return this.words('summary-empty');
    const locale = pageLocale(this);
    const [xMin, xMax] = measureExtent(points, 'x');
    const [yMin, yMax] = measureExtent(points, 'y');
    const parts = [this.words('summary-range', {
      count: formatNumber(points.length, locale, 'integer'),
      xName: this.axisName('x'), xMin: this.sayX(xMin), xMax: this.sayX(xMax),
      yName: this.axisName('y'), yMin: this.sayY(yMin), yMax: this.sayY(yMax),
    })];
    const sizes = model.bubbleField ? measureExtent(points, 'size') : null;
    if (sizes) parts.push(this.words('summary-bubble', {name: this.axisName('bubble'), min: this.saySize(sizes[0]), max: this.saySize(sizes[1])}));
    for (const one of shown) {
      const fit = linearFit(points.filter((each) => each.series === one.key));
      if (!fit) continue;
      const strength = strengthOf(fit.r);
      const r = formatNumber(fit.r, locale, 'decimal-2');
      const relation = strength === 'none'
        ? this.words('relation-none', {r})
        : this.words('relation', {strength: this.words(`strength-${strength}`), direction: this.words(fit.r > 0 ? 'direction-up' : 'direction-down'), r});
      parts.push(model.series.length > 1 ? this.words('summary-series', {name: one.name, relation}) : this.words('summary-one', {relation}));
    }
    if (model.pointField) {
      let high = points[0];
      let low = points[0];
      for (const one of points) {
        if (one.y > high.y) high = one;
        if (one.y < low.y) low = one;
      }
      if (high !== low) parts.push(this.words('summary-top', {yName: this.axisName('y'), high: this.pointName(model, high), highY: this.sayY(high.y), low: this.pointName(model, low), lowY: this.sayY(low.y)}));
    }
    if (model.missing) parts.push(this.words('summary-missing', {count: formatNumber(model.missing, locale, 'integer')}));
    return parts.join(' ');
  }

  // A point as one sentence: its name, then its measures.
  pointLine(model, one) {
    const bubble = model.bubbleField ? this.words('cursor-bubble', {name: this.axisName('bubble'), value: this.saySize(one.size)}) : '';
    return this.words('cursor', {name: this.pointName(model, one), xName: this.axisName('x'), x: this.sayX(one.x), yName: this.axisName('y'), y: this.sayY(one.y), bubble});
  }

  // The cursor is a place in the reading order of the shown marks.
  cursorMark(cursor = this._cursor) {
    const geometry = this._geometry;
    if (cursor === null || !geometry || cursor >= geometry.order.length) return null;
    return geometry.marks[geometry.order[cursor]];
  }

  setCursor(cursor, {say = false} = {}) {
    this._cursor = cursor;
    const mark = this.cursorMark(cursor);
    if (say && mark) this._said = this.pointLine(this.model(), mark);
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
      this.choose(this.cursorMark());
      return;
    }
    const next = moveScatter(this._cursor, event.key, {order: geometry.order, at: geometry.at});
    if (next === null) return;
    event.preventDefault();
    this.setCursor(next, {say: true});
  }

  // The pointer picks the nearest mark within its radius and a little more.
  placeAt(event) {
    const geometry = this._geometry;
    if (!geometry) return null;
    const box = event.currentTarget.getBoundingClientRect();
    const index = nearestPoint(geometry.at, event.clientX - box.left, event.clientY - box.top, (geometry.bubbles ? BUBBLE[this.size] ?? 22 : 12));
    if (index < 0) return null;
    return geometry.order.indexOf(index);
  }

  onPointerMove(event) {
    const place = this.placeAt(event);
    if (place === this._cursor) return;
    if (place === null && this.matches(':focus-within')) return;
    this.setCursor(place);
  }

  onPointerLeave() {
    if (this.matches(':focus-within')) return;
    this.setCursor(null);
  }

  onPlotClick(event) {
    const place = this.placeAt(event);
    if (place !== null) this.choose(this.cursorMark(place));
  }

  choose(mark) {
    if (!mark) return;
    this.sfEmit('select', {series: mark.series, index: mark.row, point: mark.name, x: mark.x, y: mark.y});
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
    const cursor = this.cursorMark();
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
      tableKey: [tableModel, this.label, this.xLabel, this.yLabel, this.bubbleLabel, this.xFormat, this.yFormat, this.bubbleFormat, pageLocale(this), this.table, this.table === 'toggle' ? this._view : 'chart'],
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

  // The data the table shows: settled, so a stream does not rebuild a row
  // per point on every render (chart-core/settle). The first data after none
  // shows at once.
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
    return renderScatterTemplate(this.templateContext());
  }
}

SfScatter.define('sf-chart-scatter');
