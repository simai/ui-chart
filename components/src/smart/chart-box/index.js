// sf-chart-box: a box plot, to compare how one measure spreads across groups
// (docs/research/catalogue.md, Box plot; docs/DECISIONS.md D9).
//
// The element reads its rows once into boxes (chart-core/box): the median,
// the quartiles, the whiskers and the outliers of each group, worked out
// from raw observations or given. It measures its plot and draws in SVG a
// band per group, a box per series side by side in it, on a value axis. A
// person reaches the plot with one Tab stop and walks the boxes with the
// arrows (chart-core/cursor); every move is said in a polite live region,
// the chart as a whole in a summary sentence, and the same statistics are
// a table on request.
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
import {PALETTES} from '../chart-core/palettes.js';
import {boxSeries} from '../chart-core/box.js';
import {renderBoxTemplate} from './js/templates/default';
import manifest from './component.json';
import en from './lang/en.json';
import ru from './lang/ru.json';

// The text of the plot, in px, by size rung, as on the line chart.
const FONT = {'1/2': 11, 1: 12, 2: 14};
// An outlier's radius, in px, by size rung.
const DOT = {'1/2': 2.5, 1: 3, 2: 3.5};
// The widest a box is drawn, in px, by size rung: a few groups do not make
// slabs.
const WIDEST = {'1/2': 40, 1: 56, 2: 80};
const CHAR = 0.6;
const GAP = 8;

const ChartBoxElement = elementFromManifest(manifest, {
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

class SfBox extends ChartBoxElement {
  static get props() {
    return {...super.props, rootClass: {default: ''}};
  }

  onConnected() {
    this._uid = this.id || `sf-chart-box-${(instances += 1)}`;
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
      checkContrast(this, colours, 'sf-chart-box');
    }
    const plot = this.querySelector('.sf-chart-box-plot');
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
      this._colours = readColours(this.colors, (said) => console.warn(`<sf-chart-box> ${said}`));
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

  // The rows as boxes, read again only when the data or its mapping changes.
  model() {
    const key = [this.items, this.names, this.x, this.y, this.series, this.stats, this.whiskers];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;
    this._model = boxSeries(this.items, {x: this.x, y: this.y, series: this.series, stats: this.stats, whiskers: this.whiskers, names: this.names || {}});
    return this._model;
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.labels.length ? 'ready' : 'empty';
  }

  shownSeries(model) {
    const hidden = new Set(this.hiddenSeries || []);
    return model.series.map((one, place) => ({...one, place})).filter((one) => !hidden.has(one.key));
  }

  // The measure's name: the page's label, or the field; given statistics
  // have no field, so the chart's word.
  measureName() {
    return this.yLabel || this.model().yField || this.words('value');
  }

  sayY(value, step = 0) {
    return formatNumber(value, pageLocale(this), this.yFormat, {step, gap: this.words('gap')});
  }

  sayCount(value) {
    return formatNumber(value, pageLocale(this), 'integer');
  }

  // What a box is called: its group, and its series when there are several.
  boxName(model, index, key) {
    const group = model.labels[index] || this.words('group-n', {n: String(index + 1)});
    if (model.series.length < 2) return group;
    const series = model.series.find((one) => one.key === key);
    return this.words('box-in', {group, series: series?.name ?? key});
  }

  // Where everything goes: the plot's inner box, the value scale, the bands
  // and one box per shown series in each. Null until the plot has a width.
  geometry(model, shown) {
    const {width, height} = this._box;
    if (!width || !height) return null;
    const font = FONT[this.size] ?? 12;
    const count = model.labels.length;

    let low = Infinity;
    let high = -Infinity;
    for (const one of shown) {
      for (const box of one.boxes) {
        if (!box) continue;
        low = Math.min(low, box.min);
        high = Math.max(high, box.max);
      }
    }
    if (!Number.isFinite(low)) [low, high] = [0, 1];
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

    const band = bandScale(count, [inner.left, inner.right], {padding: 0.3});
    const lanes = Math.max(1, shown.length);
    // A box's lane in its band; the box is held to the rung's widest.
    const lane = band.width / lanes;
    const boxWidth = Math.max(2, Math.min(WIDEST[this.size] ?? 56, lane * (lanes > 1 ? 0.8 : 1)));
    const dot = DOT[this.size] ?? 3;
    const boxes = [];
    shown.forEach((one, at) => {
      one.boxes.forEach((box, index) => {
        if (!box) return;
        const middle = band.at(index) + lane * (at + 0.5);
        boxes.push({
          key: one.key, place: one.place, index, box,
          cx: middle, half: boxWidth / 2,
          q1: y(box.q1), q3: y(box.q3), median: y(box.median), low: y(box.low), high: y(box.high),
          mean: box.mean === null || box.mean === undefined ? null : y(box.mean),
          outliers: box.outliers.map((value) => y(value)),
        });
      });
    });

    // The group names under their bands, every so many when they crowd;
    // a long one is cut with an ellipsis, said whole by the tooltip.
    const longest = Math.max(1, ...model.labels.map((text) => text.length));
    const every = Math.max(1, Math.ceil((Math.min(longest, 16) * font * CHAR + GAP) / Math.max(1, band.step)));
    const most = Math.max(3, Math.floor((band.step * every - GAP) / (font * CHAR)));
    const groupTicks = model.labels.map((text, index) => ({
      at: band.at(index) + band.width / 2,
      text: text.length > most ? `${text.slice(0, most - 1)}…` : text,
      index,
    })).filter(({index}) => index % every === 0);

    return {
      width, height, font, inner, y, dot, boxes, band,
      valueTicks: ticks.ticks.map((value, index) => ({at: y(value), text: texts[index], zero: value === 0})),
      groupTicks,
    };
  }

  summarize(model, shown) {
    if (this.summary === 'none') return '';
    const locale = pageLocale(this);
    const parts = [];
    let values = 0;
    let outliers = 0;
    for (const one of shown) {
      for (const box of one.boxes) {
        if (!box) continue;
        values += box.n ?? 0;
        outliers += box.outliers.length;
      }
    }
    if (!shown.some((one) => one.boxes.some(Boolean))) return this.words('summary-empty');
    parts.push(values
      ? this.words('summary-groups-values', {groups: formatNumber(model.labels.length, locale, 'integer'), values: formatNumber(values, locale, 'integer')})
      : this.words('summary-groups', {groups: formatNumber(model.labels.length, locale, 'integer')}));
    for (const one of shown) {
      const own = one.boxes.map((box, index) => ({box, index})).filter(({box}) => box);
      if (!own.length) continue;
      let highest = own[0];
      let lowest = own[0];
      let widest = own[0];
      for (const each of own) {
        if (each.box.median > highest.box.median) highest = each;
        if (each.box.median < lowest.box.median) lowest = each;
        if (each.box.q3 - each.box.q1 > widest.box.q3 - widest.box.q1) widest = each;
      }
      const name = model.series.length > 1 ? one.name : this.measureName();
      if (own.length < 2) {
        parts.push(this.words('summary-one', {name, median: this.sayY(highest.box.median), from: this.sayY(highest.box.q1), to: this.sayY(highest.box.q3)}));
        continue;
      }
      parts.push(this.words('summary-series', {
        name,
        high: model.labels[highest.index], highMedian: this.sayY(highest.box.median),
        low: model.labels[lowest.index], lowMedian: this.sayY(lowest.box.median),
        wide: model.labels[widest.index], spread: this.sayY(widest.box.q3 - widest.box.q1),
      }));
    }
    if (outliers) parts.push(this.words('summary-outliers', {count: formatNumber(outliers, locale, 'integer')}));
    if (model.missing) parts.push(this.words('summary-missing', {count: formatNumber(model.missing, locale, 'integer')}));
    return parts.join(' ');
  }

  // A box as one sentence: its name, then its statistics.
  boxLine(model, index, key) {
    const one = model.series.find((each) => each.key === key);
    const box = one?.boxes[index];
    const name = this.boxName(model, index, key);
    if (!box) return this.words('cursor-none', {name});
    const outliers = box.outliers.length ? this.words('cursor-outliers', {count: formatNumber(box.outliers.length, pageLocale(this), 'integer')}) : '';
    return this.words('cursor', {
      name, median: this.sayY(box.median), q1: this.sayY(box.q1), q3: this.sayY(box.q3),
      low: this.sayY(box.low), high: this.sayY(box.high), outliers,
    });
  }

  // The cursor is a group's index and a shown series' key.
  cursorBox(cursor = this._cursor) {
    const geometry = this._geometry;
    if (!cursor || !geometry) return null;
    return geometry.boxes.find((one) => one.index === cursor.index && one.key === cursor.series) ?? null;
  }

  setCursor(cursor, {say = false} = {}) {
    this._cursor = cursor;
    if (say && cursor) this._said = this.boxLine(this.model(), cursor.index, cursor.series);
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
    const next = moveCursor(this._cursor, event.key, {count: this.model().labels.length, shown});
    if (next === null) return;
    event.preventDefault();
    this.setCursor(next, {say: true});
  }

  // The pointer picks the box whose lane it is over.
  placeAt(event) {
    const geometry = this._geometry;
    if (!geometry) return null;
    const box = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - box.left;
    let best = null;
    let distance = Infinity;
    for (const one of geometry.boxes) {
      const off = Math.abs(one.cx - x);
      if (off < distance && off <= Math.max(one.half + 4, geometry.band.step / 2 / Math.max(1, this.shownSeries(this.model()).length))) {
        best = one;
        distance = off;
      }
    }
    return best ? {index: best.index, series: best.key} : null;
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
    const box = model.series.find((one) => one.key === cursor.series)?.boxes[cursor.index];
    if (!box) return;
    this.sfEmit('select', {series: cursor.series, index: cursor.index, group: model.labels[cursor.index], median: box.median});
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
    const cursor = this.cursorBox();
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
      tableKey: [tableModel, this.label, this.xLabel, this.yLabel, this.yFormat, this.mean, pageLocale(this), this.table, this.table === 'toggle' ? this._view : 'chart'],
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
    return renderBoxTemplate(this.templateContext());
  }
}

SfBox.define('sf-chart-box');
