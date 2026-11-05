// sf-chart-map: a choropleth map, a rate or a ratio by region, each region
// filled by the step of its value (docs/research/catalogue.md, Choropleth
// map; docs/DECISIONS.md D16).
//
// The page gives the regions as GeoJSON (the shapes property) and the
// values as rows (items) joined by a region key: the package holds no map,
// so the boundaries, their source and their licence are the page's. The
// element projects the regions (chart-core/geo), fits them into its plot,
// cuts the values into steps on the theme's tone ladders as the heatmap
// does (chart-core/heat, D8), and draws in SVG a path per region with a
// legend of the steps. A person reaches the plot with one Tab stop and
// walks the regions in reading order, Up and Down to the nearest region
// above or below; each is said with its value and its place among the
// others. The chart as a whole is a summary sentence, and every region is
// a row of the table.
//
// It renders into its own light DOM, like every Smart component.
import SfBaseElement from '../../core/js/smart-base';
import {elementFromManifest} from '../../core/js/element-manifest';
import {pageLocale} from '../../core/js/page-language';
import {formatNumber} from '../chart-core/format.js';
import {settled} from '../chart-core/settle.js';
import {heatColours, heatSteps, stepCount, stepOf} from '../chart-core/heat.js';
import {geoLayout, geoRegions, geoValues, nearestRegion, regionOrder} from '../chart-core/geo.js';
import {renderMapTemplate} from './js/templates/default';
import manifest from './component.json';
import en from './lang/en.json';
import ru from './lang/ru.json';

// The text of the plot, in px, by size rung, as on the line chart.
const FONT = {'1/2': 11, 1: 12, 2: 14};
const PROJECTIONS = ['mercator', 'albers', 'equirectangular', 'plane'];

const ChartMapElement = elementFromManifest(manifest, {
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

class SfMap extends ChartMapElement {
  static get props() {
    return {...super.props, rootClass: {default: ''}};
  }

  onConnected() {
    this._uid = this.id || `sf-chart-map-${(instances += 1)}`;
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
    const plot = this.querySelector('.sf-chart-map-plot');
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

  // The regions and their values, read again only when the shapes, the
  // data or their mapping change. A region's rank is its place by value,
  // largest first, among the regions with a value.
  model() {
    const key = [this.shapes, this.items, this.region, this.value, this.shapeKey, this.shapeName];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;
    const {regions, dropped} = geoRegions(this.shapes, {keyField: this.shapeKey, nameField: this.shapeName});
    const joined = geoValues(this.items, regions, {region: this.region, value: this.value});
    const list = regions.map((one, index) => ({...one, index, value: joined.values.has(one.key) ? joined.values.get(one.key) : null, rank: 0}));
    const ranked = list.filter((one) => one.value !== null).sort((a, b) => b.value - a.value || a.index - b.index);
    ranked.forEach((one, place) => {
      one.rank = place + 1;
    });
    const values = ranked.map((one) => one.value);
    this._model = {
      ...joined,
      regions: list,
      ranked,
      dropped,
      count: ranked.length,
      gaps: list.length - ranked.length,
      min: values.length ? Math.min(...values) : null,
      max: values.length ? Math.max(...values) : null,
    };
    return this._model;
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.regions.length && model.count ? 'ready' : 'empty';
  }

  // The steps of the scale and their colours (chart-core/heat), as on the
  // heatmap. min and max hold only when given.
  scaleSteps(model) {
    const count = stepCount(this.steps, this.scale);
    const min = this.hasAttribute('min') && Number.isFinite(this.min) ? this.min : model.min;
    const max = this.hasAttribute('max') && Number.isFinite(this.max) ? this.max : model.max;
    const steps = heatSteps({min: Math.min(min, max), max: Math.max(min, max), middle: Number.isFinite(this.middle) ? this.middle : 0, count, scale: this.scale});
    const colours = heatColours({scale: this.scale, scheme: this.scheme, better: this.better, steps: count});
    return steps.map((step, index) => ({...step, ...colours[index], index}));
  }

  sayY(value) {
    return formatNumber(value, pageLocale(this), this.valueFormat, {gap: this.words('gap')});
  }

  sayStep(step) {
    return this.words('step', {from: this.sayY(step.from), to: this.sayY(step.to)});
  }

  // Where everything goes: the regions projected into the plot, each with
  // its step and, where the region is wide and tall enough, its name.
  // Null until the plot has a width.
  geometry(model, steps) {
    const {width, height} = this._box;
    if (!width || !height) return null;
    const font = FONT[this.size] ?? 12;
    const projection = PROJECTIONS.includes(this.projection) ? this.projection : 'mercator';
    const places = geoLayout(model.regions, {width, height}, {projection, pad: 4});
    const labelled = this.labels !== 'none';
    const regions = places.map((place, index) => {
      const one = model.regions[index];
      const shown = {...place, index, value: one.value, step: stepOf(steps, one.value), nameText: ''};
      if (!labelled || place.box.h < font * 1.6) return shown;
      // A region's name is short words in the page's text: a letter a
      // little narrower than the other charts' guess, and the region's
      // width less a few pixels.
      const name = cut(one.name, Math.floor((place.box.w - 4) / (font * 0.66)));
      shown.nameText = name;
      return shown;
    });
    const order = regionOrder(regions, font * 3);
    return {width, height, font, regions, order};
  }

  summarize(model) {
    if (this.summary === 'none') return '';
    if (!model.count) return this.words('summary-empty');
    const locale = pageLocale(this);
    const count = (value) => formatNumber(value, locale, 'integer');
    const parts = [this.words('summary-total', {regions: count(model.regions.length), count: count(model.count), min: this.sayY(model.min), max: this.sayY(model.max)})];
    const high = model.ranked[0];
    const low = model.ranked[model.ranked.length - 1];
    parts.push(this.words('summary-high', {name: high.name, value: this.sayY(high.value)}));
    if (low !== high) parts.push(this.words('summary-low', {name: low.name, value: this.sayY(low.value)}));
    if (model.gaps) parts.push(this.words('summary-gaps', {count: count(model.gaps)}));
    if (model.unmatched) parts.push(this.words('summary-unmatched', {count: count(model.unmatched)}));
    return parts.join(' ');
  }

  // A region as one sentence: its name and value with its place, or that it
  // has no data.
  regionLine(region) {
    const model = this.model();
    const one = model.regions[region.index];
    if (one.value === null) return this.words('cursor-gap', {name: one.name});
    return this.words('cursor', {name: one.name, value: this.sayY(one.value), rank: formatNumber(one.rank, pageLocale(this), 'integer'), count: formatNumber(model.count, pageLocale(this), 'integer')});
  }

  cursorRegion(cursor = this._cursor) {
    const geometry = this._geometry;
    if (!cursor || !geometry) return null;
    return geometry.regions[cursor.index] ?? null;
  }

  setCursor(cursor, {say = false} = {}) {
    this._cursor = cursor;
    const region = this.cursorRegion(cursor);
    if (say && region) this._said = this.regionLine(region);
    this.requestComponentUpdate('cursor');
  }

  // The keys walk the regions: Left and Right in reading order (top to
  // bottom, left to right), Up and Down to the nearest region above or
  // below, Home and End to the first and the last.
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
      this.choose(this.cursorRegion());
      return;
    }
    const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const {order, regions} = geometry;
    const now = this.cursorRegion();
    let index = order[0];
    if (event.key === 'End') index = order[order.length - 1];
    else if (now && event.key !== 'Home') {
      const at = order.indexOf(now.index);
      if (event.key === 'ArrowRight' || event.key === 'PageDown') index = order[Math.min(order.length - 1, at + 1)];
      else if (event.key === 'ArrowLeft' || event.key === 'PageUp') index = order[Math.max(0, at - 1)];
      else index = nearestRegion(regions, now.index, event.key === 'ArrowUp') ?? now.index;
    }
    this.setCursor({index, series: 'region'}, {say: true});
  }

  // The pointer picks the region its path is under.
  placeAt(event) {
    const target = event.target?.closest?.('[data-region]');
    if (!target || !this._geometry) return null;
    const index = this._geometry.regions.findIndex((one) => one.key === target.dataset.region);
    return index < 0 ? null : {index, series: 'region'};
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
    if (place) this.choose(this.cursorRegion(place));
  }

  choose(region) {
    if (!region) return;
    const one = this.model().regions[region.index];
    this.sfEmit('select', {index: one.index, region: one.key, name: one.name, value: one.value, rank: one.rank});
  }

  toggleView() {
    this._view = this._view === 'table' ? 'chart' : 'table';
    this.requestComponentUpdate('view');
  }

  templateContext() {
    const model = this.model();
    const state = this.state(model);
    const steps = state === 'ready' ? this.scaleSteps(model) : [];
    const geometry = state === 'ready' ? this.geometry(model, steps) : null;
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
      steps,
      tableModel,
      tableKey: [tableModel, this.label, this.valueFormat, pageLocale(this), this.table, this.table === 'toggle' ? this._view : 'chart'],
      geometry,
      cursor: this.cursorRegion(),
      said: this._said,
      view: this.table === 'toggle' ? this._view : 'chart',
      legend: this.legend,
      summaryText: state === 'ready' ? this.summarize(model) : '',
      hasDescription: this.hasSlotContent?.('description') ?? false,
      description: this.hasSlotContent?.('description') ? this.getSlotContent('description') : null,
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
    return renderMapTemplate(this.templateContext());
  }
}

SfMap.define('sf-chart-map');
