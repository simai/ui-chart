// sf-chart-funnel: the stages of a process, each a subset of the last, as
// bars on a common baseline with the value and the conversion beside each
// stage (docs/research/catalogue.md, Funnel).
//
// The element reads its data once into stages (chart-core/data) in the
// data's order, which is the process, and works out the conversions
// (js/funnel). A stage is an HTML row of the size rung's height and
// its bar's length a share of the widest stage, so the funnel needs no
// measured width and its first paint is the drawn funnel. A person reaches
// the stages with one Tab stop and walks them with the arrows
// (chart-core/cursor); every move is said in a polite live region, the
// whole in a summary sentence, and the same data is a table on request.
//
// It renders into its own light DOM, like every Smart component.
import SfBaseElement from '../../core/js/smart-base';
import {elementFromManifest} from '../../core/js/element-manifest';
import {pageLocale} from '../../core/js/page-language';
import {readSeries} from '../chart-core/data.js';
import {formatNumber, formatTime, timeUnitOf} from '../chart-core/format.js';
import {moveCursor} from '../chart-core/cursor.js';
import {settled} from '../chart-core/settle.js';
import {checkContrast, colourValue} from '../chart-core/colors.js';
import {funnelStages} from './js/funnel.js';
import {renderFunnelTemplate} from './js/templates/default';
import manifest from './component.json';
import en from './lang/en.json';
import ru from './lang/ru.json';

const ChartFunnelElement = elementFromManifest(manifest, {
  base: SfBaseElement,
  lang: {en, ru},
  source: 'ru',
});

let instances = 0;

class SfFunnel extends ChartFunnelElement {
  static get props() {
    return {...super.props, rootClass: {default: ''}};
  }

  onConnected() {
    this._uid = this.id || `sf-chart-funnel-${(instances += 1)}`;
    this._cursor = null;
    this._said = '';
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
      if (own) checkContrast(this, new Map([['color', own]]), 'sf-chart-funnel');
    }
    return undefined;
  }

  // The page's own colour (the color setting: a Framework role or a CSS
  // colour, chart-core/colors), '' when unset or not a colour.
  colour() {
    if (this.color !== this._colourRaw) {
      this._colourRaw = this.color;
      this._colour = colourValue(this.color);
      if (this.color && !this._colour) console.warn(`<sf-chart-funnel> color «${this.color}» is neither a Framework role nor a CSS colour`);
    }
    return this._colour || '';
  }

  words(key, vars) {
    return this.sfWord(key, vars ? {vars} : undefined);
  }

  // The data as stages in the data's order, each with its conversions.
  model() {
    const key = [this.items, this.names, this.stage, this.value];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;
    const read = readSeries(this.items, {x: this.stage, y: this.value.split(',')[0].trim(), xScale: 'category'});
    const one = read.series[0];
    const names = this.names || {};
    const unit = read.kind === 'time' ? timeUnitOf(read.xs) : 'day';
    const sayKey = (index) => {
      const label = read.labels[index];
      if (names[label] !== undefined) return names[label];
      if (read.kind === 'time') return formatTime(read.xs[index], pageLocale(this), unit, {form: 'full'});
      return String(label ?? '');
    };
    const rows = read.xs.map((_, index) => ({key: String(read.labels[index] ?? ''), name: sayKey(index), value: one ? one.values[index] : null, index}));
    this._model = {
      kind: read.kind,
      stageField: read.xField,
      valueField: one?.key ?? '',
      ...funnelStages(rows),
    };
    return this._model;
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.stages.some((stage) => stage.value !== null) ? 'ready' : 'empty';
  }

  sayY(value) {
    return formatNumber(value, pageLocale(this), this.valueFormat, {gap: this.words('gap')});
  }

  sayShare(share) {
    return formatNumber(share, pageLocale(this), 'percent');
  }

  // The share written beside a stage, by the conversion setting; none for
  // the first stage, a gap or a share that cannot be had.
  besideShare(stage) {
    const share = this.conversion === 'first' ? stage.fromFirst : this.conversion === 'none' ? null : stage.fromPrevious;
    return share === null ? '' : this.sayShare(share);
  }

  sayStage(stage) {
    if (stage.value === null) return this.words('gap');
    if (stage.fromPrevious === null && stage.fromFirst === null) return this.words('stage-first', {value: this.sayY(stage.value)});
    return this.words('stage-next', {
      value: this.sayY(stage.value),
      previous: stage.fromPrevious === null ? this.words('gap') : this.sayShare(stage.fromPrevious),
      first: stage.fromFirst === null ? this.words('gap') : this.sayShare(stage.fromFirst),
    });
  }

  summarize(model) {
    if (this.summary === 'none') return '';
    const out = [];
    if (model.overall !== null) {
      out.push(this.words('summary-whole', {count: model.stages.length, from: this.sayY(model.first.value), to: this.sayY(model.last.value), overall: this.sayShare(model.overall)}));
    } else {
      out.push(this.words('summary-short', {count: model.stages.length}));
    }
    if (model.worst) {
      const before = model.stages[model.worst.index - 1];
      out.push(this.words('summary-worst', {from: before.name, to: model.worst.name, share: this.sayShare(model.worst.fromPrevious)}));
    }
    if (model.grows) out.push(this.words('summary-grows'));
    if (model.gaps) out.push(this.words('summary-gaps', {count: model.gaps}));
    return out.join(' ');
  }

  cursorLine(model, cursor) {
    const stage = model.stages[cursor.index];
    return stage ? this.words('cursor', {name: stage.name, stage: this.sayStage(stage)}) : '';
  }

  setCursor(cursor, {say = false} = {}) {
    this._cursor = cursor;
    if (say && cursor) this._said = this.cursorLine(this.model(), cursor);
    this.requestComponentUpdate('cursor');
  }

  // The stages go down the page, so Down and Right go to the next stage, Up
  // and Left back (in either reading direction: the order is the process,
  // not a side); Home and End go to the first and the last.
  onPlotKey(event) {
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
    const count = this.model().stages.length;
    if (!count) return;
    const flat = {ArrowUp: 'ArrowLeft', ArrowDown: 'ArrowRight'}[event.key] ?? event.key;
    const moved = moveCursor(this._cursor, flat, {count, shown: ['stage']});
    if (!moved) return;
    event.preventDefault();
    this.setCursor(moved, {say: true});
  }

  pointAt(event) {
    const row = event.target.closest?.('[data-place]');
    return row ? {index: Number(row.dataset.place), series: 'stage'} : null;
  }

  onPointerMove(event) {
    const point = this.pointAt(event);
    if (!point) {
      if (this._cursor && !this.matches(':focus-within')) this.setCursor(null);
      return;
    }
    if (this._cursor && point.index === this._cursor.index) return;
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

  // select carries the stage as the data gave it: its key as x, its place,
  // its value (null for a gap).
  choose(cursor) {
    const model = this.model();
    const stage = model.stages[cursor.index];
    if (!stage) return;
    this.sfEmit('select', {series: model.valueField, index: stage.index, x: stage.key, value: stage.value});
  }

  toggleView() {
    this._view = this._view === 'table' ? 'chart' : 'table';
    this.requestComponentUpdate('view');
  }

  templateContext() {
    const model = this.model();
    const state = this.state(model);
    const cursor = this._cursor && model.stages[this._cursor.index] ? this._cursor : null;
    const tableModel = this.tableModel(model, state === 'ready');
    return this.createTemplateContext({
      ...this.getPropsContext(),
      component: this,
      uid: this._uid,
      size: this.size,
      label: this.label || this.words('untitled'),
      state,
      model,
      stages: state === 'ready' ? model.stages : [],
      colour: this.colour(),
      tableKey: [tableModel, this.label, this.stageLabel, this.valueLabel, this.valueFormat, pageLocale(this), this.table, this.table === 'toggle' ? this._view : 'chart'],
      rows: tableModel.stages,
      cursor,
      said: this._said,
      view: this.table === 'toggle' ? this._view : 'chart',
      stageLabel: this.stageLabel || model.stageField || this.words('stage-column'),
      valueLabel: this.valueLabel || model.valueField || this.words('value-column'),
      summaryText: state === 'ready' ? this.summarize(model) : '',
      hasDescription: this.hasSlotContent?.('description') ?? false,
      description: this.hasSlotContent?.('description') ? this.getSlotContent('description') : null,
      rootClass: this.getRootClass(),
    });
  }

  // The data the table shows: settled, so a stream or a pointer move does
  // not rebuild a row per stage on every render (chart-core/settle).
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
    return renderFunnelTemplate(this.templateContext());
  }
}

SfFunnel.define('sf-chart-funnel');
