// sf-chart-sparkline: one series as a word-sized line, area or bars, without axes
// (docs/DECISIONS.md D1). It sits in a table cell, a line of text or the
// chart slot of sf-chart-metric.
//
// The element reads its data once (chart-core/data), measures its box, and
// draws one path or one bar per value in SVG (chart-core/scale, path,
// decimate). It is an image, not a control: its accessible name is the label
// and a sentence of what the data does (chart-core/describe).
//
// It renders into its own light DOM, like every Smart component.
import SfBaseElement from '../../core/js/smart-base';
import {elementFromManifest} from '../../core/js/element-manifest';
import {pageLocale} from '../../core/js/page-language';
import {extent, readSeries} from '../chart-core/data.js';
import {bandScale, linearScale} from '../chart-core/scale.js';
import {formatNumber} from '../chart-core/format.js';
import {areaPath, linePath} from '../chart-core/path.js';
import {minMaxIndexes} from '../chart-core/decimate.js';
import {seriesFacts} from '../chart-core/describe.js';
import {checkContrast, colourValue} from '../chart-core/colors.js';
import {renderChartSparklineTemplate} from './js/templates/default';
import manifest from './component.json';
import en from './lang/en.json';
import ru from './lang/ru.json';

// Room kept at the top and the bottom for the line's width and the marks.
const INSET = {'1/2': 2, 1: 3, 2: 4};
const RADIUS = {'1/2': 1.75, 1: 2.5, 2: 3};

const ChartSparklineElement = elementFromManifest(manifest, {
  base: SfBaseElement,
  lang: {en, ru},
  source: 'ru',
});

class SfChartSparkline extends ChartSparklineElement {
  static get props() {
    return {...super.props, rootClass: {default: ''}};
  }

  onConnected() {
    this._box = this._box ?? {width: 0, height: 0};
  }

  onDisconnected() {
    this._observer?.disconnect();
    this._observer = null;
    this._observed = null;
    super.onDisconnected();
  }

  afterRender(changed) {
    if (typeof changed === 'function') return super.afterRender(changed);
    const box = this.querySelector('.sf-chart-sparkline');
    if (box && box !== this._observed && typeof ResizeObserver === 'function') {
      this._observer?.disconnect();
      this._observed = box;
      this._observer = new ResizeObserver(([entry]) => {
        const width = Math.round(entry.contentRect.width);
        const height = Math.round(entry.contentRect.height);
        if (width === this._box.width && height === this._box.height) return;
        this._box = {width, height};
        this.requestComponentUpdate('box');
      });
      this._observer.observe(box);
    }
    const own = this.colour();
    if (own !== this._colourChecked && this.isConnected) {
      this._colourChecked = own;
      if (own) checkContrast(this, new Map([['color', own]]), 'sf-chart-sparkline');
    }
    return undefined;
  }

  // The page's own colour (the color setting: a Framework role or a CSS
  // colour, chart-core/colors), '' when unset or not a colour.
  colour() {
    if (this.color !== this._colourRaw) {
      this._colourRaw = this.color;
      this._colour = colourValue(this.color);
      if (this.color && !this._colour) console.warn(`<sf-chart-sparkline> color «${this.color}» is neither a Framework role nor a CSS colour`);
    }
    return this._colour || '';
  }

  words(key, vars) {
    return this.sfWord(key, vars ? {vars} : undefined);
  }

  // One series. A list of plain numbers is its own order.
  model() {
    const key = [this.items, this.x, this.y];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;
    const items = Array.isArray(this.items) && this.items.length && this.items.every((one) => one === null || typeof one !== 'object')
      ? this.items.map((value, index) => ({index, value}))
      : this.items;
    const read = readSeries(items, {x: this.x, y: this.y.split(',')[0].trim()});
    this._model = {...read, series: read.series.slice(0, 1)};
    return this._model;
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.series[0]?.values.some((value) => value !== null) ? 'ready' : 'empty';
  }

  sayY(value) {
    return formatNumber(value, pageLocale(this), this.yFormat, {gap: this.words('no-data')});
  }

  geometry(model, state) {
    const {width, height} = this._box;
    if (!width || !height) return null;
    if (state === 'empty') return {width, height, empty: true};
    if (state !== 'ready') return null;
    const values = model.series[0].values;
    const count = values.length;
    const inset = INSET[this.size] ?? 3;
    const radius = RADIUS[this.size] ?? 2.5;
    const bar = this.shape === 'bar';
    let [low, high] = extent(model.series) ?? [0, 1];
    if (bar || this.yZero) {
      low = Math.min(low, 0);
      high = Math.max(high, 0);
    }
    if (low === high) {
      low -= 1;
      high += 1;
    }
    const y = linearScale([low, high], [height - inset, inset]);
    const facts = seriesFacts(values);
    const marked = new Set();
    if (this.mark === 'last') marked.add(facts.last);
    if (this.mark === 'extremes') {
      marked.add(facts.maxAt);
      marked.add(facts.minAt);
    }

    if (bar) {
      const band = bandScale(count, [0, width], {padding: count > width / 3 ? 0 : 0.25});
      const zero = y(0);
      const bars = [];
      values.forEach((value, index) => {
        if (value === null) return;
        const top = Math.min(zero, y(value));
        // A zero still shows as a hairline, so the bar is seen to be there.
        bars.push({x: band.at(index), width: Math.max(1, band.width), y: top, height: Math.max(1, Math.abs(y(value) - zero)), marked: marked.has(index)});
      });
      return {width, height, bars};
    }

    // Marks sit inside the box: the line runs between the marks' radii.
    const x = linearScale([0, Math.max(1, count - 1)], [radius + 1, width - radius - 1]);
    const pxs = values.map((_, index) => x(index));
    const keep = minMaxIndexes(pxs, values, width) ?? values.map((_, index) => index);
    const points = keep.map((index) => (values[index] === null ? null : [pxs[index], y(values[index])]));
    const ground = y(Math.max(low, Math.min(high, 0)));
    return {
      width,
      height,
      radius,
      d: linePath(points, {curve: this.curve}),
      area: this.shape === 'area' ? areaPath(points, ground, {curve: this.curve}) : '',
      marks: [...marked].filter((index) => index >= 0 && values[index] !== null).map((index) => [pxs[index], y(values[index])]),
    };
  }

  // The accessible name: the label, then what the data does.
  accessibleName(model, state) {
    const label = this.label || this.words('untitled');
    if (state === 'loading') return this.words('name', {label, summary: this.words('loading')});
    if (state === 'empty') return this.words('name', {label, summary: this.words('no-data')});
    if (this.summary === 'none') return label;
    const values = model.series[0].values;
    const facts = seriesFacts(values);
    const summary = facts.count === 1
      ? this.words('summary-one', {value: this.sayY(values[facts.first])})
      : this.words('summary', {
        first: this.sayY(values[facts.first]),
        last: this.sayY(values[facts.last]),
        max: this.sayY(facts.max),
        min: this.sayY(facts.min),
      });
    return this.words('name', {label, summary});
  }

  templateContext() {
    const model = this.model();
    const state = this.state(model);
    return this.createTemplateContext({
      ...this.getPropsContext(),
      component: this,
      size: this.size,
      shape: this.shape,
      state,
      geometry: this.geometry(model, state),
      name: this.accessibleName(model, state),
      paint: this.colour(),
      rootClass: this.getRootClass(),
    });
  }

  template() {
    return renderChartSparklineTemplate(this.templateContext());
  }
}

SfChartSparkline.define('sf-chart-sparkline');
