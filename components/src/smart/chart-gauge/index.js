// sf-chart-gauge: one measured value on a fixed scale with bands (normal,
// warning, critical) and a target (docs/research/catalogue.md, Gauge).
//
// The element reads its scale once (chart-core/gauge): the value's share of
// the scale, the bands inside it and the band the value is in. It draws a
// half circle in a fixed SVG view box scaled by its width, or a bar of HTML
// whose positions are shares, so nothing is measured and the first paint is
// the drawn gauge. It is a meter for screen readers, with the band's name in
// its value text, described by a summary sentence; it takes no focus.
//
// It renders into its own light DOM, like every Smart component.
import SfBaseElement from '../../core/js/smart-base';
import {elementFromManifest} from '../../core/js/element-manifest';
import {pageLocale} from '../../core/js/page-language';
import {formatNumber} from '../chart-core/format.js';
import {settled} from '../chart-core/settle.js';
import {checkContrast, colourValue} from '../chart-core/colors.js';
import {bandOf, gaugeBands, gaugeShare} from '../chart-core/gauge.js';
import {renderGaugeTemplate} from './js/templates/default';
import manifest from './component.json';
import en from './lang/en.json';
import ru from './lang/ru.json';

const ChartGaugeElement = elementFromManifest(manifest, {
  base: SfBaseElement,
  lang: {en, ru},
  source: 'ru',
});

let instances = 0;
const ZONES = new Set(['success', 'warning', 'error']);

class SfGauge extends ChartGaugeElement {
  static get props() {
    return {...super.props, rootClass: {default: ''}};
  }

  onConnected() {
    this._uid = this.id || `sf-chart-gauge-${(instances += 1)}`;
    this._view = 'chart';
  }

  onDisconnected() {
    clearTimeout(this._table?.timer);
    super.onDisconnected();
  }

  afterRender(changed) {
    if (typeof changed === 'function') return super.afterRender(changed);
    const own = this.colour();
    if (own !== this._colourChecked && this.isConnected) {
      this._colourChecked = own;
      if (own) checkContrast(this, new Map([['color', own]]), 'sf-chart-gauge');
    }
    return undefined;
  }

  // The page's own colour (the color setting: a Framework role or a CSS
  // colour, chart-core/colors), '' when unset or not a colour.
  colour() {
    if (this.color !== this._colourRaw) {
      this._colourRaw = this.color;
      this._colour = colourValue(this.color);
      if (this.color && !this._colour) console.warn(`<sf-chart-gauge> color «${this.color}» is neither a Framework role nor a CSS colour`);
    }
    return this._colour || '';
  }

  words(key, vars) {
    return this.sfWord(key, vars ? {vars} : undefined);
  }

  // The scale, the bands and where the value and the target stand on it.
  model() {
    const key = [this.value, this.min, this.max, this.bands, this.target, this.targetLabel];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;
    const min = Number.isFinite(this.min) ? this.min : 0;
    const max = Number.isFinite(this.max) ? this.max : 100;
    const ok = max > min;
    if (!ok && this.isConnected) console.warn(`<sf-chart-gauge> max ${max} is not above min ${min}: the scale is empty`);
    const value = Number.isFinite(this.value) ? this.value : null;
    const target = Number.isFinite(this.target) ? this.target : null;
    const scale = {min, max};
    const bands = ok ? gaugeBands(this.bands, scale).map((band) => ({...band, name: this.bandName(band)})) : [];
    this._model = {
      min,
      max,
      ok,
      value,
      share: ok ? gaugeShare(value, scale) : 0,
      past: value === null ? 0 : value > max ? 1 : value < min ? -1 : 0,
      bands,
      // A value past the scale is in the band at that end: past a critical
      // band's end is critical too.
      band: bandOf(bands, value === null ? null : Math.max(min, Math.min(max, value))),
      target: ok && target !== null ? {value: target, share: gaugeShare(target, scale), name: this.targetLabel || this.words('target')} : null,
    };
    return this._model;
  }

  bandName(band) {
    if (band.label) return band.label;
    return ZONES.has(band.role) ? this.words(`zone-${band.role}`) : this.words('zone-other', {number: band.index + 1});
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.value !== null && model.ok ? 'ready' : 'empty';
  }

  sayY(value) {
    return formatNumber(value, pageLocale(this), this.valueFormat, {gap: this.words('gap')});
  }

  sayShare(share) {
    return formatNumber(share, pageLocale(this), 'percent');
  }

  sayRange(band) {
    return this.words('range', {from: this.sayY(band.from), to: this.sayY(band.to)});
  }

  // Where the value stands against the target: above by, below by, exactly.
  sayTarget(model) {
    const {target, value} = model;
    if (!target || value === null) return '';
    const by = value - target.value;
    const where = by === 0 ? this.words('at') : this.words(by > 0 ? 'above' : 'below', {by: this.sayY(Math.abs(by))});
    return where;
  }

  valueText(model) {
    const value = this.sayY(model.value);
    return model.band ? this.words('value-text', {value, band: model.band.name}) : value;
  }

  summarize(model) {
    if (this.summary === 'none') return '';
    const out = [];
    const value = this.sayY(model.value);
    if (model.past > 0) out.push(this.words('summary-over', {value, max: this.sayY(model.max)}));
    else if (model.past < 0) out.push(this.words('summary-under', {value, min: this.sayY(model.min)}));
    else out.push(this.words('summary-value', {value, min: this.sayY(model.min), max: this.sayY(model.max), share: this.sayShare(model.share)}));
    if (model.band) out.push(this.words('summary-band', {band: model.band.name, range: this.sayRange(model.band)}));
    if (model.target) out.push(this.words('summary-target', {name: model.target.name, target: this.sayY(model.target.value), where: this.sayTarget(model)}));
    return out.join(' ');
  }

  // The colour of the value: its band's role, else the page's colour, else
  // the sheet's (--sf-chart-gauge-color, then primary).
  fillOf(model) {
    if (model.band) return colourValue(model.band.role);
    return this.colour();
  }

  toggleView() {
    this._view = this._view === 'table' ? 'chart' : 'table';
    this.requestComponentUpdate('view');
  }

  templateContext() {
    const model = this.model();
    const state = this.state(model);
    const tableModel = this.tableModel(model, state === 'ready');
    return this.createTemplateContext({
      ...this.getPropsContext(),
      component: this,
      uid: this._uid,
      size: this.size,
      shape: this.shape === 'linear' ? 'linear' : 'arc',
      label: this.label || this.words('untitled'),
      state,
      model,
      fill: this.fillOf(model),
      tableKey: [tableModel, this.label, this.valueFormat, pageLocale(this), this.table, this.table === 'toggle' ? this._view : 'chart'],
      tableData: tableModel,
      view: this.table === 'toggle' ? this._view : 'chart',
      summaryText: state === 'ready' ? this.summarize(model) : '',
      hasDescription: this.hasSlotContent?.('description') ?? false,
      description: this.hasSlotContent?.('description') ? this.getSlotContent('description') : null,
      rootClass: this.getRootClass(),
    });
  }

  // The data the table shows: settled, so a value streamed several times a
  // second does not rebuild the table on every render (chart-core/settle).
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
    return renderGaugeTemplate(this.templateContext());
  }
}

SfGauge.define('sf-chart-gauge');
