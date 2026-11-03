// sf-chart-waterfall: a waterfall chart, how a start value becomes an end
// value through positive and negative steps, for example a profit bridge
// (docs/research/catalogue.md, Waterfall; docs/DECISIONS.md D11).
//
// The element reads its rows once into steps (chart-core/waterfall),
// measures its plot, and draws in SVG a bar per step side by side on a
// value axis from zero: a change floats from the running total to the new
// one, a total stands on zero, and a thin line joins each bar's end to the
// next. A rise and a fall are the success and error tones and a total the
// neutral one; each bar's value is written with its sign, so the direction
// never rests on colour alone. A person reaches the plot with one Tab stop
// and walks the steps with the arrows (chart-core/cursor); every move is
// said in a polite live region, the chart as a whole in a summary
// sentence, and the same data is a table on request.
//
// It renders into its own light DOM, like every Smart component.
import SfBaseElement from '../../core/js/smart-base';
import {elementFromManifest} from '../../core/js/element-manifest';
import {pageLocale} from '../../core/js/page-language';
import {bandScale, linearScale, niceTicks, tickCount} from '../chart-core/scale.js';
import {formatNumber} from '../chart-core/format.js';
import {moveCursor} from '../chart-core/cursor.js';
import {settled} from '../chart-core/settle.js';
import {checkContrast, coloursKey, readColours} from '../chart-core/colors.js';
import {waterfallExtent, waterfallSteps} from '../chart-core/waterfall.js';
import {renderWaterfallTemplate} from './js/templates/default';
import manifest from './component.json';
import en from './lang/en.json';
import ru from './lang/ru.json';

// The text of the plot, in px, by size rung, as on the line chart.
const FONT = {'1/2': 11, 1: 12, 2: 14};
// The widest a bar is drawn, in px, by size rung.
const WIDEST = {'1/2': 32, 1: 48, 2: 64};
const KEYS = ['up', 'down', 'total'];
const CHAR = 0.6;
const GAP = 8;

const ChartWaterfallElement = elementFromManifest(manifest, {
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

// A label cut to so many characters, with an ellipsis.
const cut = (text, chars) => (text.length <= chars ? text : `${text.slice(0, Math.max(1, chars - 1))}…`);

class SfWaterfall extends ChartWaterfallElement {
  static get props() {
    return {...super.props, rootClass: {default: ''}};
  }

  onConnected() {
    this._uid = this.id || `sf-chart-waterfall-${(instances += 1)}`;
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
      checkContrast(this, colours, 'sf-chart-waterfall');
    }
    const plot = this.querySelector('.sf-chart-waterfall-plot');
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

  // The page's own colours of rise, fall and total (chart-core/colors),
  // read again only when the setting changes.
  colours() {
    if (this.colors !== this._coloursRaw || !this._colours) {
      this._coloursRaw = this.colors;
      const all = readColours(this.colors, (said) => console.warn(`<sf-chart-waterfall> ${said}`));
      this._colours = new Map([...all].filter(([key]) => KEYS.includes(key)));
    }
    return this._colours;
  }

  words(key, vars) {
    return this.sfWord(key, vars ? {vars} : undefined);
  }

  // The rows as steps, read again only when the data, its mapping or the
  // language changes.
  model() {
    const key = [this.items, this.x, this.y, this.total, this.end, pageLocale(this)];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;
    this._model = waterfallSteps(this.items, {x: this.x, y: this.y, total: this.total || 'total', end: this.end !== 'none', endLabel: this.words('end')});
    return this._model;
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.steps.length ? 'ready' : 'empty';
  }

  sayY(value, step = 0) {
    return formatNumber(value, pageLocale(this), this.yFormat, {step, gap: this.words('gap')});
  }

  // A value with its sign: «+40», «−70».
  saySigned(value) {
    const sign = value > 0 ? '+' : value < 0 ? '−' : '';
    return `${sign}${this.sayY(Math.abs(value))}`;
  }

  sayX(step) {
    return step.label || this.words('step-n', {n: String(step.row + 1)});
  }

  // A change from one level to another, signed, with its share.
  sayChange(from, to) {
    const share = from ? formatNumber(Math.abs((to - from) / from), pageLocale(this), 'percent') : '';
    const amount = this.saySigned(to - from);
    if (!share) return amount;
    const sign = to > from ? '+' : to < from ? '−' : '';
    return `${amount} (${sign}${share})`;
  }

  // What a bar says on itself: a change with its sign, a total as it is.
  sayBar(step) {
    return step.kind === 'total' ? this.sayY(step.to) : this.saySigned(step.value);
  }

  // Where everything goes: the plot's inner box, the value scale from zero,
  // the bars, the lines joining them, their values and the axis labels.
  // Null until the plot has a width.
  geometry(model) {
    const {width, height} = this._box;
    if (!width || !height) return null;
    const font = FONT[this.size] ?? 12;
    const [low, high] = waterfallExtent(model.steps);
    const labelled = this.valueLabels !== 'none';

    const top = GAP + (this.yLabel ? font * 1.5 : 0) + (labelled ? font * 1.4 : 0);
    const bottom = font * 1.5 + GAP + (this.xLabel ? font * 1.5 : 0) + (labelled && low < 0 ? font * 1.4 : 0);
    const ticks = niceTicks(low, high, tickCount(height - top - bottom, font * 3.5), {zero: true});
    const texts = ticks.ticks.map((value) => this.sayY(value, ticks.step));
    const left = Math.ceil(Math.max(...texts.map((text) => text.length)) * font * CHAR) + GAP * 1.5;
    const inner = {left, top, right: Math.max(left + 1, width - GAP * 2), bottom: Math.max(top + 1, height - bottom)};
    const y = linearScale([ticks.min, ticks.max], [inner.bottom, inner.top]);

    const band = bandScale(model.steps.length, [inner.left, inner.right], {padding: 0.25});
    const wide = Math.max(1, Math.min(WIDEST[this.size] ?? 48, band.width));
    const bars = model.steps.map((one, index) => {
      const cx = band.at(index) + band.width / 2;
      const yFrom = y(one.from);
      const yTo = y(one.to);
      return {...one, index, cx, half: wide / 2, yFrom, yTo, top: Math.min(yFrom, yTo), bottom: Math.max(yFrom, yTo), text: this.sayBar(one)};
    });

    // A bar's value goes above it when the bar rises from its start, below
    // when it falls; all are written only when every one fits its band.
    const fits = labelled && bars.every((one) => one.text.length * font * CHAR <= band.step - 2);
    const values = fits ? bars.map((one) => {
      const below = one.kind === 'total' ? one.to < 0 : one.kind === 'down';
      return {at: one.cx, y: below ? one.bottom + font * 1.1 : one.top - font * 0.5, text: one.text};
    }) : [];

    // The axis labels: each step's label, cut to its band, skipped when it
    // would touch its neighbour. A letter is taken a little wider than the
    // digits' CHAR: a Cyrillic letter is near 0.7 of the font.
    const letter = font * CHAR * 1.2;
    const chars = Math.max(3, Math.floor((band.step - GAP / 2) / letter));
    const xTicks = [];
    let last = -Infinity;
    for (const one of bars) {
      const text = cut(this.sayX(one), chars);
      const half = (text.length * letter) / 2;
      if (one.cx - half < last + GAP / 2) continue;
      if (one.cx - half < 0 || one.cx + half > width) continue;
      xTicks.push({at: one.cx, text});
      last = one.cx + half;
    }

    return {
      width, height, font, inner, bars, band, values, zero: y(0),
      valueTicks: ticks.ticks.map((value, index) => ({at: y(value), text: texts[index]})),
      xTicks,
    };
  }

  summarize(model) {
    if (this.summary === 'none') return '';
    const {steps} = model;
    if (!steps.length) return this.words('summary-empty');
    const locale = pageLocale(this);
    const changes = steps.filter((one) => one.kind !== 'total');
    const ups = changes.filter((one) => one.kind === 'up' && one.value > 0);
    const downs = changes.filter((one) => one.kind === 'down');
    const parts = [this.words('summary-range', {
      count: formatNumber(changes.length, locale, 'integer'),
      start: this.sayY(model.start), finish: this.sayY(model.finish), change: this.sayChange(model.start, model.finish),
    })];
    if (ups.length) {
      const most = ups.reduce((best, one) => (one.value > best.value ? one : best));
      parts.push(this.words('summary-most-up', {name: this.sayX(most), value: this.saySigned(most.value)}));
    }
    if (downs.length) {
      const most = downs.reduce((best, one) => (one.value < best.value ? one : best));
      parts.push(this.words('summary-most-down', {name: this.sayX(most), value: this.saySigned(most.value)}));
    }
    parts.push(this.words('summary-count', {up: formatNumber(ups.length, locale, 'integer'), down: formatNumber(downs.length, locale, 'integer')}));
    if (model.missing) parts.push(this.words('summary-missing', {count: formatNumber(model.missing, locale, 'integer')}));
    return parts.join(' ');
  }

  // A step as one sentence: a change with its sign and the total it
  // reaches, or a total.
  stepLine(step) {
    if (step.kind === 'total') return this.words('cursor-total', {name: this.sayX(step), total: this.sayY(step.to)});
    return this.words('cursor', {name: this.sayX(step), change: this.saySigned(step.value), total: this.sayY(step.to)});
  }

  cursorBar(cursor = this._cursor) {
    const geometry = this._geometry;
    if (!cursor || !geometry) return null;
    return geometry.bars[cursor.index] ?? null;
  }

  setCursor(cursor, {say = false} = {}) {
    this._cursor = cursor;
    const bar = this.cursorBar(cursor);
    if (say && bar) this._said = this.stepLine(bar);
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
      this.choose(this.cursorBar());
      return;
    }
    // Up and Down have no series to cross: they are not the cursor's.
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') return;
    const next = moveCursor(this._cursor, event.key, {count: geometry.bars.length, shown: ['step']});
    if (next === null) return;
    event.preventDefault();
    this.setCursor(next, {say: true});
  }

  // The pointer picks the step whose band it is over.
  placeAt(event) {
    const geometry = this._geometry;
    if (!geometry || !geometry.bars.length) return null;
    const box = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - box.left;
    if (x < geometry.inner.left || x > geometry.inner.right) return null;
    const index = Math.max(0, Math.min(geometry.bars.length - 1, Math.floor((x - geometry.inner.left) / geometry.band.step)));
    return {index, series: 'step'};
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
    if (place) this.choose(this.cursorBar(place));
  }

  choose(bar) {
    if (!bar) return;
    this.sfEmit('select', {index: bar.index, row: bar.row, x: bar.label, kind: bar.kind, value: bar.value, total: bar.to});
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
      cursor: this.cursorBar(),
      said: this._said,
      view: this.table === 'toggle' ? this._view : 'chart',
      legend: this.legend === 'auto' ? 'top' : this.legend,
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
    return renderWaterfallTemplate(this.templateContext());
  }
}

SfWaterfall.define('sf-chart-waterfall');
