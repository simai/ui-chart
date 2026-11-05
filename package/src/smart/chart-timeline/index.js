// sf-chart-timeline: a timeline, tasks or states as ranges of time on rows
// (docs/research/catalogue.md, Gantt / timeline; docs/DECISIONS.md D13).
//
// The element reads its rows once into lanes of ranges
// (chart-core/timeline), measures its plot, and draws in SVG a lane per row
// with its name at the start, and in it a bar from each range's start to its
// end on a time axis; a range that starts and ends at one moment is a
// milestone, a diamond. A range takes the chart colour of its status's place
// (--sf-chart-1..8), so a plan's phases or a service's states read apart; in
// forced colours each status has a line of its own. A person reaches the plot
// with one Tab stop and walks the ranges with the arrows, Up and Down to the
// nearest range of the row above or below; every move is said in a polite
// live region, the chart as a whole in a summary sentence, and the same data
// is a table on request.
//
// It renders into its own light DOM, like every Smart component.
import SfBaseElement from '../../core/js/smart-base';
import {elementFromManifest} from '../../core/js/element-manifest';
import {pageLocale} from '../../core/js/page-language';
import {formatNumber, formatTime, timeUnitOf} from '../chart-core/format.js';
import {moveCursor} from '../chart-core/cursor.js';
import {settled} from '../chart-core/settle.js';
import {checkContrast, coloursKey, readColours} from '../chart-core/colors.js';
import {durationOf, nearestRange, statusTimes, timelineLayout, timelineRows} from '../chart-core/timeline.js';
import {renderTimelineTemplate} from './js/templates/default';
import manifest from './component.json';
import en from './lang/en.json';
import ru from './lang/ru.json';

// The text of the plot, in px, by size rung, as on the line chart.
const FONT = {'1/2': 11, 1: 12, 2: 14};
// The thickest a bar is drawn, in px, by size rung.
const THICKEST = {'1/2': 14, 1: 20, 2: 28};

const ChartTimelineElement = elementFromManifest(manifest, {
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

class SfTimeline extends ChartTimelineElement {
  static get props() {
    return {...super.props, rootClass: {default: ''}};
  }

  onConnected() {
    this._uid = this.id || `sf-chart-timeline-${(instances += 1)}`;
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
      checkContrast(this, colours, 'sf-chart-timeline');
    }
    const plot = this.querySelector('.sf-chart-timeline-plot');
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

  // The page's own colours by status (chart-core/colors), read again only
  // when the setting changes.
  colours() {
    if (this.colors !== this._coloursRaw || !this._colours) {
      this._coloursRaw = this.colors;
      this._colours = readColours(this.colors, (said) => console.warn(`<sf-chart-timeline> ${said}`));
    }
    return this._colours;
  }

  words(key, vars) {
    return this.sfWord(key, vars ? {vars} : undefined);
  }

  // The rows as lanes of ranges, read again only when the data or its
  // mapping changes.
  model() {
    const key = [this.items, this.row, this.start, this.end, this.status];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;
    const model = timelineRows(this.items, {row: this.row, start: this.start, end: this.end, status: this.status});
    model.unit = timeUnitOf(model.ranges.flatMap((one) => [one.start, one.end]));
    this._model = model;
    return model;
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.ranges.length ? 'ready' : 'empty';
  }

  // A moment in full, in the unit the data is given in.
  sayTime(time) {
    return formatTime(time, pageLocale(this), this.model().unit, {form: 'full', format: this.xFormat});
  }

  // A length of time: «10 дн.», «4,5 ч», «30 мин».
  sayDuration(ms) {
    const {amount, unit} = durationOf(ms);
    return formatNumber(amount, pageLocale(this), `unit-${unit}`);
  }

  // A row's name: its key, or its place when it has none.
  sayLane(key, place) {
    return key || this.words('row-n', {n: String(place + 1)});
  }

  // A status's name: its key, or «Без статуса» for rows without one.
  sayStatus(key) {
    return key || this.words('no-status');
  }

  // A time span: from and to; within one day, when the data has times, the
  // end says its time only («4 нояб. 2026 г., 09:40 – 10:25»).
  sayPeriod(from, to) {
    const {unit} = this.model();
    const clock = ['hour', 'minute', 'second'].includes(unit) && (!this.xFormat || this.xFormat === 'auto');
    const day = (time) => new Date(time).toDateString();
    const end = clock && day(from) === day(to)
      ? formatTime(to, pageLocale(this), unit === 'second' ? 'second' : 'minute')
      : this.sayTime(to);
    return this.words('period', {from: this.sayTime(from), to: end});
  }

  // A range's time: from and to, or the one moment of a milestone.
  sayWhen(range) {
    if (range.start === range.end) return this.sayTime(range.start);
    return this.sayPeriod(range.start, range.end);
  }

  // Where everything goes (chart-core/timeline timelineLayout): the plot's
  // inner box, the rows and their names, the time scale and its ticks, and a
  // bar or a diamond per range. Null until the plot has a width.
  geometry(model) {
    const {width, height} = this._box;
    if (!width || !height) return null;
    const locale = pageLocale(this);
    return timelineLayout(model, {width, height}, {
      font: FONT[this.size] ?? 12,
      thickest: THICKEST[this.size] ?? 20,
      names: model.lanes.map((one) => this.sayLane(one.key, one.place)),
      tickText: (time, unit) => formatTime(time, locale, unit),
    });
  }

  summarize(model) {
    if (this.summary === 'none') return '';
    const {ranges} = model;
    if (!ranges.length) return this.words('summary-empty');
    const locale = pageLocale(this);
    const parts = [this.words('summary-range', {
      rows: formatNumber(model.lanes.length, locale, 'integer'),
      count: formatNumber(ranges.length, locale, 'integer'),
      period: this.sayPeriod(model.from, model.to), duration: this.sayDuration(model.to - model.from),
    })];
    const spans = ranges.filter((one) => one.end > one.start);
    if (spans.length) {
      const longest = spans.reduce((best, one) => (one.end - one.start > best.end - best.start ? one : best));
      parts.push(this.words('summary-longest', {name: this.sayLane(longest.lane, longest.place), duration: this.sayDuration(longest.end - longest.start)}));
    }
    if (model.statusField && model.statuses.length > 1 && spans.length) {
      const times = statusTimes(spans);
      const all = times.reduce((sum, one) => sum + one.time, 0);
      parts.push(this.words('summary-status', {status: this.sayStatus(times[0].status), share: formatNumber(times[0].time / all, locale, 'percent')}));
    }
    const milestones = ranges.length - spans.length;
    if (milestones) parts.push(this.words('summary-milestones', {count: formatNumber(milestones, locale, 'integer')}));
    const left = model.missing + model.dropped;
    if (left) parts.push(this.words('summary-left', {count: formatNumber(left, locale, 'integer')}));
    // A length may end with its own point («32 дн.»): a sentence keeps one.
    return parts.join(' ').replace(/\.\.(?=\s|$)/gu, '.');
  }

  // A range as one sentence: its row, its status when there are statuses,
  // its time and its length, or «веха» for a milestone.
  rangeLine(range) {
    const model = this.model();
    const vars = {
      name: this.sayLane(range.lane, range.place),
      when: this.sayWhen(range),
      duration: range.start === range.end ? this.words('milestone') : this.sayDuration(range.end - range.start),
    };
    if (model.statusField) return this.words('cursor-status', {...vars, status: this.sayStatus(range.status)});
    return this.words('cursor', vars);
  }

  cursorRange(cursor = this._cursor) {
    const geometry = this._geometry;
    if (!cursor || !geometry) return null;
    return geometry.ranges[cursor.index] ?? null;
  }

  setCursor(cursor, {say = false} = {}) {
    this._cursor = cursor;
    const range = this.cursorRange(cursor);
    if (say && range) this._said = this.rangeLine(range);
    this.requestComponentUpdate('cursor');
  }

  // Up and Down go to the range of the row above or below nearest in time
  // to the cursor's middle; Left and Right, Home, End and the pages walk
  // every range in order, row after row (chart-core/cursor).
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
      this.choose(this.cursorRange());
      return;
    }
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      const model = this.model();
      const now = this.cursorRange();
      let index = 0;
      if (now) {
        const place = Math.max(0, Math.min(model.lanes.length - 1, now.place + (event.key === 'ArrowDown' ? 1 : -1)));
        index = nearestRange(model.lanes[place], (now.start + now.end) / 2)?.index ?? now.index;
      }
      event.preventDefault();
      this.setCursor({index, series: 'range'}, {say: true});
      return;
    }
    const next = moveCursor(this._cursor, event.key, {count: geometry.ranges.length, shown: ['range']});
    if (next === null) return;
    event.preventDefault();
    this.setCursor(next, {say: true});
  }

  // The pointer picks, in the row it is over, the range it is on, or the
  // nearest within a few pixels.
  placeAt(event) {
    const geometry = this._geometry;
    if (!geometry) return null;
    const box = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - box.left;
    const y = event.clientY - box.top;
    const lane = geometry.lanes.find((one) => y >= one.y && y <= one.y + one.h);
    if (!lane || x < geometry.inner.left - 4) return null;
    let best = null;
    let distance = 6;
    for (const one of geometry.ranges) {
      if (one.place !== lane.place) continue;
      const away = x < one.x ? one.x - x : x > one.x + one.w ? x - one.x - one.w : 0;
      if (away <= distance) {
        best = one;
        distance = away;
      }
    }
    return best ? {index: best.index, series: 'range'} : null;
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
    if (place) this.choose(this.cursorRange(place));
  }

  choose(range) {
    if (!range) return;
    this.sfEmit('select', {index: range.index, row: range.row, lane: range.lane, status: range.status, start: range.start, end: range.end});
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
      tableKey: [tableModel, this.label, this.rowLabel, this.xFormat, pageLocale(this), this.table, this.table === 'toggle' ? this._view : 'chart'],
      geometry,
      cursor: this.cursorRange(),
      said: this._said,
      view: this.table === 'toggle' ? this._view : 'chart',
      legend: this.legend === 'auto' ? (model.statusField && model.statuses.length ? 'top' : 'none') : this.legend,
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
    return renderTimelineTemplate(this.templateContext());
  }
}

SfTimeline.define('sf-chart-timeline');
