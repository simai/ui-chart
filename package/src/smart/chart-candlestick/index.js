// sf-chart-candlestick: a candlestick chart, the open, high, low and close
// of each period, for prices (docs/research/catalogue.md, Candlestick;
// docs/DECISIONS.md D10).
//
// The element reads its rows once into candles (js/ohlc), measures
// its plot, and draws in SVG a candle per period side by side on a value
// axis, merging neighbours as a longer period when they are more than the
// width holds. A rising period is a hollow body and a falling one a filled
// body, in the success and error tones, so the direction never rests on
// colour alone. A person reaches the plot with one Tab stop and walks the
// candles with the arrows (chart-core/cursor); every move is said in a
// polite live region, the chart as a whole in a summary sentence, and the
// same data is a table on request.
//
// It renders into its own light DOM, like every Smart component.
import SfBaseElement from '../../core/js/smart-base';
import {elementFromManifest} from '../../core/js/element-manifest';
import {pageLocale} from '../../core/js/page-language';
import {bandScale, linearScale, niceTicks, tickCount, timeTicks} from '../chart-core/scale.js';
import {formatNumber, formatTime, timeUnitOf} from '../chart-core/format.js';
import {moveCursor} from '../chart-core/cursor.js';
import {settled} from '../chart-core/settle.js';
import {checkContrast, coloursKey, readColours} from '../chart-core/colors.js';
import {mergeCandles, ohlcExtent, ohlcRows, tickPlaces} from './js/ohlc.js';
import {renderCandlestickTemplate} from './js/templates/default';
import manifest from './component.json';
import en from './lang/en.json';
import ru from './lang/ru.json';

// The text of the plot, in px, by size rung, as on the line chart.
const FONT = {'1/2': 11, 1: 12, 2: 14};
// The widest a candle's body is drawn, in px, by size rung.
const WIDEST = {'1/2': 12, 1: 16, 2: 24};
// The least room a candle takes, in px: below it, neighbours merge.
const LEAST = 3;
const CHAR = 0.6;
const GAP = 8;

const ChartCandlestickElement = elementFromManifest(manifest, {
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

class SfCandlestick extends ChartCandlestickElement {
  static get props() {
    return {...super.props, rootClass: {default: ''}};
  }

  onConnected() {
    this._uid = this.id || `sf-chart-candlestick-${(instances += 1)}`;
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
      checkContrast(this, colours, 'sf-chart-candlestick');
    }
    const plot = this.querySelector('.sf-chart-candlestick-plot');
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

  // The page's own colours of up and down (chart-core/colors), read again
  // only when the setting changes.
  colours() {
    if (this.colors !== this._coloursRaw || !this._colours) {
      this._coloursRaw = this.colors;
      const all = readColours(this.colors, (said) => console.warn(`<sf-chart-candlestick> ${said}`));
      this._colours = new Map([...all].filter(([key]) => key === 'up' || key === 'down'));
    }
    return this._colours;
  }

  words(key, vars) {
    return this.sfWord(key, vars ? {vars} : undefined);
  }

  // The rows as candles, read again only when the data or its mapping
  // changes.
  model() {
    const key = [this.items, this.x, this.open, this.high, this.low, this.close];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;
    const model = ohlcRows(this.items, {x: this.x, open: this.open || 'open', high: this.high || 'high', low: this.low || 'low', close: this.close || 'close'});
    model.unit = model.kind === 'time' ? timeUnitOf(model.candles.map((one) => one.x)) : 'day';
    this._model = model;
    return model;
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.candles.length ? 'ready' : 'empty';
  }

  sayY(value, step = 0) {
    return formatNumber(value, pageLocale(this), this.yFormat, {step, gap: this.words('gap')});
  }

  // A candle's period: its date in full, or its label.
  sayX(model, candle) {
    if (model.kind !== 'time') return candle.label || this.words('candle-n', {n: String(candle.row + 1)});
    return formatTime(candle.x, pageLocale(this), model.unit, {form: 'full', format: this.xFormat});
  }

  // A drawn candle's period: one, or from its first to its last when merged.
  sayPeriod(model, candle) {
    if (!candle.count || candle.count < 2) return this.sayX(model, candle);
    const last = model.candles[candle.from + candle.count - 1];
    return this.words('period', {from: this.sayX(model, candle), to: this.sayX(model, last)});
  }

  // A change from one price to another, signed, with its share.
  sayChange(from, to) {
    const locale = pageLocale(this);
    const change = to - from;
    const sign = change > 0 ? '+' : change < 0 ? '−' : '';
    const share = from ? formatNumber(Math.abs(change / from), locale, 'percent') : '';
    const amount = `${sign}${this.sayY(Math.abs(change))}`;
    return share ? `${amount} (${sign}${share})` : amount;
  }

  // Where everything goes: the plot's inner box, the value scale, the
  // candles (merged when they crowd) and the axis labels. Null until the
  // plot has a width.
  geometry(model) {
    const {width, height} = this._box;
    if (!width || !height) return null;
    const font = FONT[this.size] ?? 12;
    let [low, high] = ohlcExtent(model.candles) ?? [0, 1];
    const min = this.hasAttribute('y-min') && Number.isFinite(this.yMin) ? this.yMin : null;
    const max = this.hasAttribute('y-max') && Number.isFinite(this.yMax) ? this.yMax : null;
    if (min !== null) low = min;
    if (max !== null) high = max;
    if (high < low) [low, high] = [high, low];

    const top = GAP + (this.yLabel ? font * 1.5 : 0);
    const bottom = font * 1.5 + GAP + (this.xLabel ? font * 1.5 : 0);
    const ticks = niceTicks(low, high, tickCount(height - top - bottom, font * 3.5), {zero: Boolean(this.yZero), nice: min === null && max === null});
    const texts = ticks.ticks.map((value) => this.sayY(value, ticks.step));
    const left = Math.ceil(Math.max(...texts.map((text) => text.length)) * font * CHAR) + GAP * 1.5;
    const inner = {left, top, right: Math.max(left + 1, width - GAP * 2), bottom: Math.max(top + 1, height - bottom)};
    const y = linearScale([ticks.min, ticks.max], [inner.bottom, inner.top]);

    // Neighbours merge as a longer period when a candle would take less
    // than its least room.
    const room = inner.right - inner.left;
    const size = Math.max(1, Math.ceil((model.candles.length * LEAST) / Math.max(1, room)));
    const drawn = mergeCandles(model.candles, size);
    const band = bandScale(drawn.length, [inner.left, inner.right], {padding: 0.3});
    const body = Math.max(1, Math.min(WIDEST[this.size] ?? 16, band.width));
    const candles = drawn.map((one, index) => {
      const cx = band.at(index) + band.width / 2;
      const yOpen = y(one.open);
      const yClose = y(one.close);
      return {...one, index, cx, half: body / 2, yHigh: y(one.high), yLow: y(one.low), yOpen, yClose, top: Math.min(yOpen, yClose), bottom: Math.max(yOpen, yClose)};
    });

    // The axis labels: on a time axis at the first candle of each calendar
    // period, else every so many; never closer than a label's width.
    let places;
    let say;
    if (model.kind === 'time' && drawn.length) {
      const times = drawn.map((one) => one.x);
      const calendar = timeTicks(times[0], times[times.length - 1], tickCount(room, font * CHAR * 10));
      places = tickPlaces(times, calendar.ticks);
      say = (index) => formatTime(drawn[index].x, pageLocale(this), calendar.unit);
    } else {
      places = drawn.map((_, index) => index);
      say = (index) => drawn[index].label;
    }
    const xTicks = [];
    let last = -Infinity;
    for (const index of places) {
      const text = say(index);
      const at = candles[index].cx;
      const half = (text.length * font * CHAR * 1.2) / 2;
      if (at - half < last + GAP) continue;
      if (at - half < 0 || at + half > width) continue;
      xTicks.push({at, text});
      last = at + half;
    }

    return {
      width, height, font, inner, candles, band, size,
      valueTicks: ticks.ticks.map((value, index) => ({at: y(value), text: texts[index]})),
      xTicks,
    };
  }

  summarize(model) {
    if (this.summary === 'none') return '';
    const {candles} = model;
    if (!candles.length) return this.words('summary-empty');
    const locale = pageLocale(this);
    const first = candles[0];
    const last = candles[candles.length - 1];
    let highest = first;
    let lowest = first;
    let up = 0;
    for (const one of candles) {
      if (one.high > highest.high) highest = one;
      if (one.low < lowest.low) lowest = one;
      if (one.close > one.open) up += 1;
    }
    const down = candles.filter((one) => one.close < one.open).length;
    const parts = [
      this.words('summary-range', {count: formatNumber(candles.length, locale, 'integer'), from: this.sayX(model, first), to: this.sayX(model, last)}),
      this.words('summary-change', {open: this.sayY(first.open), close: this.sayY(last.close), change: this.sayChange(first.open, last.close)}),
      this.words('summary-extremes', {high: this.sayY(highest.high), highAt: this.sayX(model, highest), low: this.sayY(lowest.low), lowAt: this.sayX(model, lowest)}),
      this.words('summary-days', {up: formatNumber(up, locale, 'integer'), down: formatNumber(down, locale, 'integer')}),
    ];
    if (model.missing) parts.push(this.words('summary-missing', {count: formatNumber(model.missing, locale, 'integer')}));
    return parts.join(' ');
  }

  // A drawn candle as one sentence: its period, its four prices and its
  // change.
  candleLine(model, candle) {
    return this.words('cursor', {
      period: this.sayPeriod(model, candle),
      open: this.sayY(candle.open), high: this.sayY(candle.high), low: this.sayY(candle.low), close: this.sayY(candle.close),
      change: this.sayChange(candle.open, candle.close),
    });
  }

  cursorCandle(cursor = this._cursor) {
    const geometry = this._geometry;
    if (!cursor || !geometry) return null;
    return geometry.candles[cursor.index] ?? null;
  }

  setCursor(cursor, {say = false} = {}) {
    this._cursor = cursor;
    const candle = this.cursorCandle(cursor);
    if (say && candle) this._said = this.candleLine(this.model(), candle);
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
      this.choose(this.cursorCandle());
      return;
    }
    // Up and Down have no series to cross: they are not the cursor's.
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') return;
    const next = moveCursor(this._cursor, event.key, {count: geometry.candles.length, shown: ['candle']});
    if (next === null) return;
    event.preventDefault();
    this.setCursor(next, {say: true});
  }

  // The pointer picks the candle whose band it is over.
  placeAt(event) {
    const geometry = this._geometry;
    if (!geometry || !geometry.candles.length) return null;
    const box = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - box.left;
    if (x < geometry.inner.left || x > geometry.inner.right) return null;
    const index = Math.max(0, Math.min(geometry.candles.length - 1, Math.floor((x - geometry.inner.left) / geometry.band.step)));
    return {index, series: 'candle'};
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
    if (place) this.choose(this.cursorCandle(place));
  }

  choose(candle) {
    if (!candle) return;
    this.sfEmit('select', {index: candle.from ?? candle.index, row: candle.row, x: candle.label, open: candle.open, high: candle.high, low: candle.low, close: candle.close});
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
      tableKey: [tableModel, this.label, this.xLabel, this.xFormat, this.yFormat, pageLocale(this), this.table, this.table === 'toggle' ? this._view : 'chart'],
      geometry,
      cursor: this.cursorCandle(),
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
    return renderCandlestickTemplate(this.templateContext());
  }
}

SfCandlestick.define('sf-chart-candlestick');
