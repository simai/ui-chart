// sf-chart-bar: values by category as bars, grouped or stacked, vertical or
// horizontal (docs/DECISIONS.md D1), with some series as lines over the bars
// when asked (lines), on the bars' axis or a scale of their own.
//
// The element reads its data once into series (chart-core/data), stacks it
// when asked (chart-core/stack), measures its plot, and draws axes and one
// rectangle per value in SVG (chart-core/scale). A person reaches the plot
// with one Tab stop and walks it with the arrows (chart-core/cursor); every
// move is said in a polite live region, the chart as a whole in a summary
// sentence (chart-core/describe), and the same data is a table on request.
// With bin, the rows are observations of one measure and the bars a
// histogram (js/bin): one bar per interval, the bars touching, the
// axis marked at the intervals' edges.
//
// It renders into its own light DOM, like every Smart component.
import SfBaseElement from '../../core/js/smart-base';
import {elementFromManifest} from '../../core/js/element-manifest';
import {pageLocale} from '../../core/js/page-language';
import {readSeries} from '../chart-core/data.js';
import {binSeries, median} from './js/bin.js';
import {bandScale, linearScale, niceTicks, tickCount} from '../chart-core/scale.js';
import {formatNumber, formatTime, timeUnitOf} from '../chart-core/format.js';
import {stackExtent, stackSeries} from '../chart-core/stack.js';
import {linePath} from '../chart-core/path.js';
import {seriesFacts} from '../chart-core/describe.js';
import {moveCursor} from '../chart-core/cursor.js';
import {settled} from '../chart-core/settle.js';
import {checkContrast, coloursKey, readColours} from '../chart-core/colors.js';
import {PALETTES} from '../chart-core/palettes.js';
import {renderBarChartTemplate} from './js/templates/default';
import manifest from './component.json';
import en from './lang/en.json';
import ru from './lang/ru.json';

// The text of the plot, in px, by size rung: axis labels are the small text
// role, so the room they need is known before anything is measured.
const FONT = {'1/2': 11, 1: 12, 2: 14};
const CHAR = 0.6;
const GAP = 8;

const ChartBarElement = elementFromManifest(manifest, {
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

// A label held from an edge of the plot, so it never leaves it.
function anchored(tick, width, font) {
  const half = (tick.text.length * font * CHAR) / 2;
  if (tick.at - half < 0) return {...tick, at: 0, anchor: 'start'};
  if (tick.at + half > width) return {...tick, at: width, anchor: 'end'};
  return {...tick, anchor: 'middle'};
}

class SfBarChart extends ChartBarElement {
  static get props() {
    return {...super.props, rootClass: {default: ''}};
  }

  onConnected() {
    this._uid = this.id || `sf-chart-bar-${(instances += 1)}`;
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
      checkContrast(this, colours, 'sf-chart-bar');
    }
    const plot = this.querySelector('.sf-chart-bar-plot');
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
      this._colours = readColours(this.colors, (said) => console.warn(`<sf-chart-bar> ${said}`));
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

  // The data as series in the order the bars stand, read again only when the
  // data, its mapping or the sort changes. A sorted chart is a reordered
  // model, so an index is a bar's place everywhere.
  model() {
    const key = [this.items, this.names, this.x, this.y, this.series, this.xScale, this.sort, this.bin, pageLocale(this)];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;
    if (this.binned()) {
      const bins = binSeries(this.items, {x: this.x, y: this.y, series: this.series, bin: this.bin, names: this.names || {}, countName: this.words('count')});
      this._model = {...bins, order: bins.xs.map((_, index) => index), unit: 'day'};
      return this._model;
    }
    const read = readSeries(this.items, {x: this.x, y: this.y, series: this.series, xScale: this.xScale, names: this.names || {}});
    let order = read.xs.map((_, index) => index);
    if (this.sort !== 'none' && read.series.length) {
      const total = (index) => read.series.reduce((sum, one) => sum + (one.values[index] ?? 0), 0);
      order = [...order].sort((a, b) => (this.sort === 'ascending' ? total(a) - total(b) : total(b) - total(a)));
    }
    const pick = (list) => order.map((index) => list[index]);
    this._model = {
      ...read,
      keys: pick(read.keys),
      xs: pick(read.xs),
      labels: pick(read.labels),
      series: read.series.map((one) => ({...one, values: pick(one.values)})),
      order: order.map((_, index) => index),
      unit: read.kind === 'time' ? timeUnitOf([...read.xs].sort((a, b) => a - b)) : 'day',
    };
    return this._model;
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.series.some((one) => one.values.some((value) => value !== null)) ? 'ready' : 'empty';
  }

  // A histogram: bin is auto or a width, not none.
  binned() {
    return Boolean(this.bin) && this.bin !== 'none';
  }

  // The series drawn as lines: those named in lines, on vertical bars only.
  lineKeys() {
    if (this.orientation === 'horizontal' || !this.lines) return new Set();
    return new Set(this.lines.split(',').map((key) => key.trim()).filter(Boolean));
  }

  // The lines stand on a scale of their own when asked, and always over a
  // normalized stack, whose axis is shares.
  ownLineAxis() {
    return this.lineAxis === 'own' || this.stack === 'normalized';
  }

  shownSeries(model) {
    const hidden = new Set(this.hiddenSeries || []);
    return model.series.map((one, place) => ({...one, place})).filter((one) => !hidden.has(one.key));
  }

  // A category as the axis, the tooltip and the table say it.
  sayX(model, index, form = 'full') {
    const locale = pageLocale(this);
    if (model.kind === 'bin') {
      const bin = model.bins[index];
      return bin ? this.words('bin-range', {from: this.sayEdge(bin.from, model.width), to: this.sayEdge(bin.to, model.width)}) : '';
    }
    if (model.kind === 'time') return formatTime(model.xs[index], locale, model.unit, {form, format: this.xFormat});
    if (model.kind === 'number') return formatNumber(model.xs[index], locale, 'number');
    return String(model.labels[index] ?? '');
  }

  // An edge of a histogram's interval, in the measure's format (x-format,
  // number when auto).
  sayEdge(value, step = 0) {
    return formatNumber(value, pageLocale(this), this.xFormat === 'auto' ? 'number' : this.xFormat, {step});
  }

  sayY(value, step = 0) {
    return formatNumber(value, pageLocale(this), this.yFormat, {step, gap: this.words('gap')});
  }

  // A value of a series in its own format: a line on its own scale may be
  // of another kind than the bars (a share over a sum).
  sayOf(key, value, step = 0) {
    if (!this.lineFormat || !this.lineKeys().has(key)) return this.sayY(value, step);
    return formatNumber(value, pageLocale(this), this.lineFormat, {step, gap: this.words('gap')});
  }

  // A bar's value as the tooltip and the live line say it: in a normalized
  // stack, its share and then the value itself.
  sayValue(group, index) {
    const raw = group.values[index];
    if (group.line) return this.sayOf(group.key, raw);
    if (this.stack !== 'normalized' || raw === null) return this.sayY(raw);
    const segment = group.segments[index];
    const share = segment ? segment[1] - segment[0] : 0;
    return this.words('share', {share: formatNumber(share, pageLocale(this), 'percent'), value: this.sayY(raw)});
  }

  // Where everything goes: the plot's inner box, the value scale, the bands
  // and one rectangle per value. Null until the plot has a width.
  geometry(model, shown) {
    const {width, height} = this._box;
    if (!width || !height) return null;
    const font = FONT[this.size] ?? 12;
    const count = model.xs.length;
    const horizontal = this.orientation === 'horizontal';
    // A histogram's bars touch, since its axis is a measure, not categories.
    const binned = model.kind === 'bin';
    const normalized = this.stack === 'normalized';
    const lineKeys = this.lineKeys();
    const barShown = shown.filter((one) => !lineKeys.has(one.key));
    const lineShown = shown.filter((one) => lineKeys.has(one.key));
    const own = lineShown.length > 0 && this.ownLineAxis();
    const segments = stackSeries(barShown, this.stack);
    let [low, high] = normalized ? [0, 1] : stackExtent(segments);
    const lineValues = lineShown.flatMap((one) => one.values.filter((v) => v !== null));
    // On the shared axis the lines widen it; on their own they have a scale
    // of their own, which need not start at zero.
    if (lineValues.length && !own) {
      low = Math.min(low, ...lineValues);
      high = Math.max(high, ...lineValues);
    }
    const yMax = !normalized && this.hasAttribute('y-max') && Number.isFinite(this.yMax) ? this.yMax : null;
    const tickText = (value, step) => (normalized ? formatNumber(value, pageLocale(this), 'percent') : this.sayY(value, step));
    const labelsAt = (ticks) => ticks.ticks.map((value) => tickText(value, ticks.step));
    const room = font * 1.5 + GAP;
    // A histogram's counts are whole: its axis never steps by a fraction
    // (2.5 would read 3, 5, 8). The nearest count of ticks, more or fewer,
    // whose step is whole.
    const whole = binned && !this.y;
    const ticksOf = (count) => {
      const at = (wanted) => niceTicks(Math.min(low, 0), yMax ?? high, wanted, {zero: true, nice: yMax === null && !normalized});
      const first = at(count);
      if (!whole || Number.isInteger(first.step)) return first;
      for (const near of [1, -1, 2, -2, 3, -3]) {
        const ticks = count + near >= 1 ? at(count + near) : null;
        if (ticks && Number.isInteger(ticks.step)) return ticks;
      }
      return first;
    };

    let inner;
    let value;
    let valueTicks;
    let bandRange;
    let categoryTicks;
    let lineAxis = null;
    if (horizontal) {
      // Categories down the left, held to two fifths of the width.
      const longest = Math.max(1, ...model.xs.map((_, index) => this.sayX(model, index).length));
      const left = Math.min(Math.round(width * 0.4), Math.ceil(longest * font * CHAR) + GAP * 1.5);
      const top = GAP;
      const bottom = room + (this.yLabel ? font * 1.5 : 0);
      inner = {left, top, right: Math.max(left + 1, width - GAP * 2), bottom: Math.max(top + 1, height - bottom)};
      const ticks = ticksOf(tickCount(inner.right - inner.left, font * CHAR * 9));
      value = linearScale([ticks.min, ticks.max], [inner.left, inner.right]);
      valueTicks = labelsAt(ticks).map((text, index) => anchored({at: value(ticks.ticks[index]), text, zero: ticks.ticks[index] === 0}, width, font));
      bandRange = [inner.top, inner.bottom];
      const most = Math.max(1, Math.floor((left - GAP * 1.5) / (font * CHAR)));
      const band = bandScale(count, bandRange, {padding: binned ? 0 : 0.2});
      const every = Math.max(1, Math.ceil((font * 1.25) / Math.max(1, band.step)));
      categoryTicks = binned ? this.edgeTicks(model, band, font * 1.25)
        : model.xs.map((_, index) => {
          const text = this.sayX(model, index);
          return {at: band.at(index) + band.width / 2, text: text.length > most ? `${text.slice(0, most - 1)}…` : text, index};
        }).filter(({index}) => index % every === 0);
    } else {
      const top = GAP + (this.yLabel ? font * 1.5 : 0);
      const bottom = room + (this.xLabel ? font * 1.5 : 0);
      const ticks = ticksOf(tickCount(height - top - bottom, font * 3.5));
      const texts = labelsAt(ticks);
      const left = Math.ceil(Math.max(...texts.map((text) => text.length)) * font * CHAR) + GAP * 1.5;
      if (own) {
        const lineTicks = niceTicks(Math.min(...lineValues), Math.max(...lineValues), tickCount(height - top - bottom, font * 3.5));
        const lineTexts = lineTicks.ticks.map((at) => this.sayOf(lineShown[0].key, at, lineTicks.step));
        const right = Math.ceil(Math.max(...lineTexts.map((text) => text.length)) * font * CHAR) + GAP * 1.5;
        lineAxis = {ticks: lineTicks, texts: lineTexts, right};
      }
      inner = {left, top, right: Math.max(left + 1, width - (lineAxis ? lineAxis.right : GAP * 2)), bottom: Math.max(top + 1, height - bottom)};
      value = linearScale([ticks.min, ticks.max], [inner.bottom, inner.top]);
      valueTicks = texts.map((text, index) => ({at: value(ticks.ticks[index]), text, zero: ticks.ticks[index] === 0}));
      bandRange = [inner.left, inner.right];
      const band = bandScale(count, bandRange, {padding: binned ? 0 : 0.2});
      const longest = Math.max(1, ...model.xs.map((_, index) => this.sayX(model, index, 'tick').length));
      const every = Math.max(1, Math.ceil((longest * font * CHAR + GAP) / Math.max(1, band.step)));
      categoryTicks = (binned
        ? this.edgeTicks(model, band, (text) => text.length * font * CHAR + GAP)
        : model.xs.map((_, index) => ({at: band.at(index) + band.width / 2, text: this.sayX(model, index, 'tick'), index}))
          .filter(({index}) => index % every === 0))
        .map((tick) => anchored(tick, width, font));
    }

    const band = bandScale(count, bandRange, {padding: binned ? 0 : count > 60 ? 0.1 : 0.25});
    const grouped = this.stack === 'none' && barShown.length > 1;
    const sub = grouped ? band.width / barShown.length : band.width;
    const zero = value(0);
    const groups = barShown.map((one, place) => {
      const bars = [];
      segments[place].forEach((segment, index) => {
        if (!segment) return;
        const [a, b] = [value(segment[0]), value(segment[1])];
        // A zero still shows as a hairline, so the bar is seen to be there.
        const start = band.at(index) + (grouped ? place * sub : 0);
        const breadth = Math.max(1, grouped ? sub * 0.92 : sub);
        const length = Math.max(1, Math.abs(b - a));
        bars.push(horizontal
          ? {index, x: Math.min(a, b), y: start, width: length, height: breadth, end: b}
          : {index, x: start, y: Math.min(a, b), width: breadth, height: length, end: b});
      });
      return {...one, segments: segments[place], bars};
    });

    // The lines through the middles of the bands, broken at a gap, with a
    // point at each value.
    const lineScale = lineAxis ? linearScale([lineAxis.ticks.min, lineAxis.ticks.max], [inner.bottom, inner.top]) : value;
    const lines = lineShown.map((one) => {
      const points = one.values.map((raw, index) => (raw === null ? null : [band.at(index) + band.width / 2, lineScale(raw)]));
      return {...one, line: true, points, d: linePath(points)};
    });
    const lineTicks = lineAxis ? lineAxis.ticks.ticks.map((at, index) => ({at: lineScale(at), text: lineAxis.texts[index]})) : [];

    // A value at the end of each bar (or of each stack) where it fits.
    const valueLabels = [];
    if (this.valueLabels === 'end') {
      const ends = this.stack === 'none' ? groups.flatMap((group) => group.bars.map((bar) => ({bar, value: group.values[bar.index]})))
        : model.xs.map((_, index) => {
          const tops = groups.map((group) => group.bars.find((bar) => bar.index === index)).filter(Boolean);
          if (!tops.length) return null;
          const total = groups.reduce((sum, group) => sum + (group.values[index] ?? 0), 0);
          const outer = tops.reduce((best, bar) => (horizontal ? (bar.x + bar.width > best.x + best.width ? bar : best) : (bar.y < best.y ? bar : best)));
          return {bar: outer, value: total};
        }).filter(Boolean);
      for (const {bar, value: raw} of ends) {
        if (this.stack === 'normalized') continue;
        const text = this.sayY(raw);
        const long = text.length * font * CHAR;
        if (horizontal) {
          if (bar.height < font || bar.x + bar.width + long + GAP > width) continue;
          valueLabels.push({x: bar.x + bar.width + 4, y: bar.y + bar.height / 2, text, anchor: 'start'});
        } else {
          if (bar.width < long || bar.y - font < 0) continue;
          valueLabels.push({x: bar.x + bar.width / 2, y: bar.y - font * 0.6, text, anchor: 'middle'});
        }
      }
    }

    return {
      width, height, font, inner, horizontal, zero, groups, lines, lineTicks, valueTicks, categoryTicks, valueLabels,
      dots: band.step >= font,
      bands: model.xs.map((_, index) => ({from: band.at(index) - (band.step - band.width) / 2, size: band.step})),
      bandStart: bandRange[0],
      step: band.step,
      value,
      valueLabel: this.yLabel,
      categoryLabel: this.xLabel,
    };
  }

  // A histogram's axis marks: the intervals' edges, every so many, so their
  // texts do not meet. `room` is the room one text needs: a number of px,
  // or a function of the text.
  edgeTicks(model, band, room) {
    const edges = [...model.bins.map((one) => one.from), model.bins.at(-1).to];
    const texts = edges.map((value) => this.sayEdge(value, model.width));
    const need = Math.max(...texts.map((text) => (typeof room === 'function' ? room(text) : room)));
    const every = Math.max(1, Math.ceil(need / Math.max(1, band.step)));
    const start = band.at(0) - (band.step - band.width) / 2;
    return texts.map((text, index) => ({at: start + index * band.step, text, index})).filter(({index}) => index % every === 0);
  }

  // A histogram in words: how many values over which range and intervals,
  // then each series' median and its fullest interval.
  summarizeBins(model, shown) {
    const values = model.series.flatMap((one) => one.raw);
    const parts = [this.words('summary-bins', {
      count: formatNumber(values.length, pageLocale(this), 'integer'),
      min: this.sayEdge(Math.min(...values)),
      max: this.sayEdge(Math.max(...values)),
      bins: model.bins.length,
      width: this.sayEdge(model.width),
    })];
    for (const one of shown) {
      const facts = seriesFacts(one.values);
      if (!facts || !one.raw.length) continue;
      parts.push(this.words('summary-bin-series', {name: one.name, median: this.sayEdge(median(one.raw)), range: this.sayX(model, facts.maxAt), max: this.sayY(facts.max)}));
    }
    if (model.missing) parts.push(this.words('summary-missing', {count: formatNumber(model.missing, pageLocale(this), 'integer')}));
    return parts.join(' ');
  }

  summarize(model, shown) {
    if (this.summary === 'none') return '';
    if (!model.xs.length) return this.words('summary-empty');
    if (model.kind === 'bin') return this.summarizeBins(model, shown);
    const parts = [this.words('summary-count', {count: model.xs.length})];
    const lineKeys = this.lineKeys();
    const lines = shown.filter((one) => lineKeys.has(one.key)).map((one) => one.name);
    if (lines.length) parts.push(this.words('summary-lines', {names: lines.join(', ')}));
    for (const one of shown) {
      const facts = seriesFacts(one.values);
      if (!facts) continue;
      parts.push(this.words('summary-series', {
        name: one.name,
        max: this.sayOf(one.key, facts.max),
        maxAt: this.sayX(model, facts.maxAt),
        min: this.sayOf(one.key, facts.min),
        minAt: this.sayX(model, facts.minAt),
      }));
    }
    return parts.join(' ');
  }

  cursorLine(model, cursor) {
    const g = this._geometry;
    const group = g?.groups.find((one) => one.key === cursor.series) ?? g?.lines.find((one) => one.key === cursor.series);
    const one = group ?? model.series.find((series) => series.key === cursor.series);
    if (!one) return '';
    const said = group ? this.sayValue(group, cursor.index) : this.sayOf(one.key, one.values[cursor.index]);
    return this.words('cursor', {x: this.sayX(model, cursor.index), name: one.name, value: said});
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
    // A horizontal chart walks its bars with Up and Down, its series with
    // Left and Right: the arrows follow what the eye sees.
    const turned = this.orientation === 'horizontal'
      ? {ArrowUp: 'ArrowLeft', ArrowDown: 'ArrowRight', ArrowLeft: 'ArrowUp', ArrowRight: 'ArrowDown'}[event.key] ?? event.key
      : event.key;
    const next = moveCursor(this._cursor, turned, {count: model.xs.length, shown});
    if (!next) return;
    event.preventDefault();
    this.setCursor(next, {say: true});
  }

  // The pointer picks the band under it and, in it, the bar under it (or the
  // nearest series).
  pointAt(event) {
    const g = this._geometry;
    if (!g || !(g.groups.length + g.lines.length)) return null;
    const box = event.currentTarget.getBoundingClientRect();
    const along = g.horizontal ? event.clientY - box.top : event.clientX - box.left;
    const across = g.horizontal ? event.clientX - box.left : event.clientY - box.top;
    const index = Math.floor((along - g.bandStart) / g.step);
    if (index < 0 || index >= g.bands.length) return null;
    let best = null;
    for (const group of g.groups) {
      const bar = group.bars.find((one) => one.index === index);
      if (!bar) continue;
      const [from, to] = g.horizontal ? [bar.y, bar.y + bar.height] : [bar.x, bar.x + bar.width];
      const [low, high] = g.horizontal ? [bar.x, bar.x + bar.width] : [bar.y, bar.y + bar.height];
      const inside = along >= from && along <= to;
      const distance = inside && across >= low && across <= high ? 0 : Math.abs(across - (low + high) / 2) + (inside ? 0 : 1e6);
      if (!best || distance < best.distance) best = {series: group.key, distance};
    }
    // A line's point near the pointer wins over the bar under it.
    for (const line of g.lines) {
      const point = line.points[index];
      if (!point) continue;
      const distance = Math.abs(across - point[1]) - g.font;
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
    // x as the data gave it, not as the axis reads it.
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
      orientation: this.orientation,
      stack: this.stack,
      label: this.label || this.words('untitled'),
      state,
      model,
      tableModel,
      tableKey: [tableModel, this.label, this.xLabel, this.xFormat, this.yFormat, this.lines, this.lineFormat, pageLocale(this), this.table, this.table === 'toggle' ? this._view : 'chart'],
      lineKeys: this.lineKeys(),
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
    return renderBarChartTemplate(this.templateContext());
  }
}

SfBarChart.define('sf-chart-bar');
