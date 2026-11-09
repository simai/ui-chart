/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "a6596096f065"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("deb1a4d61565");
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("5b7d7695b41b");
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("43090d1c8307");
/* harmony import */ var _chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("dd0c3978091b");
/* harmony import */ var _chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("43efc6ca45fc");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("297fd25a909a");
/* harmony import */ var _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("8c84a9c1df25");
/* harmony import */ var _chart_core_timeline_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("3caf41c309b2");
/* harmony import */ var _js_templates_default__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("69103a2c35c6");
/* harmony import */ var _component_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("ec10371acc9a");
/* harmony import */ var _lang_en_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("d7a5e2c8c202");
/* harmony import */ var _lang_ru_json__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("7308c3f96ca5");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__, _chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_4__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_5__, _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_6__, _chart_core_timeline_js__WEBPACK_IMPORTED_MODULE_7__, _js_templates_default__WEBPACK_IMPORTED_MODULE_8__]);
([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__, _chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_4__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_5__, _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_6__, _chart_core_timeline_js__WEBPACK_IMPORTED_MODULE_7__, _js_templates_default__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _chart_core_format_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_chart_core_settle_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _chart_core_timeline_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_chart_core_timeline_js__WEBPACK_IMPORTED_MODULE_7__);
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











 // The text of the plot, in px, by size rung, as on the line chart.

const FONT = {
  '1/2': 11,
  1: 12,
  2: 14
}; // The thickest a bar is drawn, in px, by size rung.

const THICKEST = {
  '1/2': 14,
  1: 20,
  2: 28
};
const ChartTimelineElement = (0,_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__.elementFromManifest)(_component_json__WEBPACK_IMPORTED_MODULE_9__, {
  base: (_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default()),
  lang: {
    en: _lang_en_json__WEBPACK_IMPORTED_MODULE_10__,
    ru: _lang_ru_json__WEBPACK_IMPORTED_MODULE_11__
  },
  source: 'ru',
  actions: {
    reset() {
      this._cursor = null;
      this.requestComponentUpdate('reset');
    }

  }
});
let instances = 0;

class SfTimeline extends ChartTimelineElement {
  static get props() {
    return { ...super.props,
      rootClass: {
        default: ''
      }
    };
  }

  onConnected() {
    this._uid = this.id || `sf-chart-timeline-${instances += 1}`;
    this._box = this._box ?? {
      width: 0,
      height: 0
    };
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
    const checked = (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_6__.coloursKey)(colours);

    if (checked !== this._coloursChecked && this.isConnected) {
      this._coloursChecked = checked;
      (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_6__.checkContrast)(this, colours, 'sf-chart-timeline');
    }

    const plot = this.querySelector('.sf-chart-timeline-plot');

    if (plot && plot !== this._observed && typeof ResizeObserver === 'function') {
      this._observer?.disconnect();
      this._observed = plot;
      this._observer = new ResizeObserver(([entry]) => {
        const width = Math.round(entry.contentRect.width);
        const height = Math.round(entry.contentRect.height);
        if (width === this._box.width && height === this._box.height) return;
        this._box = {
          width,
          height
        };
        this.requestComponentUpdate('box');
      });

      this._observer.observe(plot);
    }

    return undefined;
  } // The page's own colours by status (chart-core/colors), read again only
  // when the setting changes.


  colours() {
    if (this.colors !== this._coloursRaw || !this._colours) {
      this._coloursRaw = this.colors;
      this._colours = (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_6__.readColours)(this.colors, said => console.warn(`<sf-chart-timeline> ${said}`));
    }

    return this._colours;
  }

  words(key, vars) {
    return this.sfWord(key, vars ? {
      vars
    } : undefined);
  } // The rows as lanes of ranges, read again only when the data or its
  // mapping changes.


  model() {
    const key = [this.items, this.row, this.start, this.end, this.status];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;
    const model = (0,_chart_core_timeline_js__WEBPACK_IMPORTED_MODULE_7__.timelineRows)(this.items, {
      row: this.row,
      start: this.start,
      end: this.end,
      status: this.status
    });
    model.unit = (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.timeUnitOf)(model.ranges.flatMap(one => [one.start, one.end]));
    this._model = model;
    return model;
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.ranges.length ? 'ready' : 'empty';
  } // A moment in full, in the unit the data is given in.


  sayTime(time) {
    return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatTime)(time, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.model().unit, {
      form: 'full',
      format: this.xFormat
    });
  } // A length of time: «10 дн.», «4,5 ч», «30 мин».


  sayDuration(ms) {
    const {
      amount,
      unit
    } = (0,_chart_core_timeline_js__WEBPACK_IMPORTED_MODULE_7__.durationOf)(ms);
    return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatNumber)(amount, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), `unit-${unit}`);
  } // A row's name: its key, or its place when it has none.


  sayLane(key, place) {
    return key || this.words('row-n', {
      n: String(place + 1)
    });
  } // A status's name: its key, or «Без статуса» for rows without one.


  sayStatus(key) {
    return key || this.words('no-status');
  } // A time span: from and to; within one day, when the data has times, the
  // end says its time only («4 нояб. 2026 г., 09:40 – 10:25»).


  sayPeriod(from, to) {
    const {
      unit
    } = this.model();
    const clock = ['hour', 'minute', 'second'].includes(unit) && (!this.xFormat || this.xFormat === 'auto');

    const day = time => new Date(time).toDateString();

    const end = clock && day(from) === day(to) ? (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatTime)(to, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), unit === 'second' ? 'second' : 'minute') : this.sayTime(to);
    return this.words('period', {
      from: this.sayTime(from),
      to: end
    });
  } // A range's time: from and to, or the one moment of a milestone.


  sayWhen(range) {
    if (range.start === range.end) return this.sayTime(range.start);
    return this.sayPeriod(range.start, range.end);
  } // Where everything goes (chart-core/timeline timelineLayout): the plot's
  // inner box, the rows and their names, the time scale and its ticks, and a
  // bar or a diamond per range. Null until the plot has a width.


  geometry(model) {
    const {
      width,
      height
    } = this._box;
    if (!width || !height) return null;
    const locale = (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this);
    return (0,_chart_core_timeline_js__WEBPACK_IMPORTED_MODULE_7__.timelineLayout)(model, {
      width,
      height
    }, {
      font: FONT[this.size] ?? 12,
      thickest: THICKEST[this.size] ?? 20,
      names: model.lanes.map(one => this.sayLane(one.key, one.place)),
      tickText: (time, unit) => (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatTime)(time, locale, unit)
    });
  }

  summarize(model) {
    if (this.summary === 'none') return '';
    const {
      ranges
    } = model;
    if (!ranges.length) return this.words('summary-empty');
    const locale = (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this);
    const parts = [this.words('summary-range', {
      rows: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatNumber)(model.lanes.length, locale, 'integer'),
      count: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatNumber)(ranges.length, locale, 'integer'),
      period: this.sayPeriod(model.from, model.to),
      duration: this.sayDuration(model.to - model.from)
    })];
    const spans = ranges.filter(one => one.end > one.start);

    if (spans.length) {
      const longest = spans.reduce((best, one) => one.end - one.start > best.end - best.start ? one : best);
      parts.push(this.words('summary-longest', {
        name: this.sayLane(longest.lane, longest.place),
        duration: this.sayDuration(longest.end - longest.start)
      }));
    }

    if (model.statusField && model.statuses.length > 1 && spans.length) {
      const times = (0,_chart_core_timeline_js__WEBPACK_IMPORTED_MODULE_7__.statusTimes)(spans);
      const all = times.reduce((sum, one) => sum + one.time, 0);
      parts.push(this.words('summary-status', {
        status: this.sayStatus(times[0].status),
        share: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatNumber)(times[0].time / all, locale, 'percent')
      }));
    }

    const milestones = ranges.length - spans.length;
    if (milestones) parts.push(this.words('summary-milestones', {
      count: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatNumber)(milestones, locale, 'integer')
    }));
    const left = model.missing + model.dropped;
    if (left) parts.push(this.words('summary-left', {
      count: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatNumber)(left, locale, 'integer')
    })); // A length may end with its own point («32 дн.»): a sentence keeps one.

    return parts.join(' ').replace(/\.\.(?=\s|$)/gu, '.');
  } // A range as one sentence: its row, its status when there are statuses,
  // its time and its length, or «веха» for a milestone.


  rangeLine(range) {
    const model = this.model();
    const vars = {
      name: this.sayLane(range.lane, range.place),
      when: this.sayWhen(range),
      duration: range.start === range.end ? this.words('milestone') : this.sayDuration(range.end - range.start)
    };
    if (model.statusField) return this.words('cursor-status', { ...vars,
      status: this.sayStatus(range.status)
    });
    return this.words('cursor', vars);
  }

  cursorRange(cursor = this._cursor) {
    const geometry = this._geometry;
    if (!cursor || !geometry) return null;
    return geometry.ranges[cursor.index] ?? null;
  }

  setCursor(cursor, {
    say = false
  } = {}) {
    this._cursor = cursor;
    const range = this.cursorRange(cursor);
    if (say && range) this._said = this.rangeLine(range);
    this.requestComponentUpdate('cursor');
  } // Up and Down go to the range of the row above or below nearest in time
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
        index = (0,_chart_core_timeline_js__WEBPACK_IMPORTED_MODULE_7__.nearestRange)(model.lanes[place], (now.start + now.end) / 2)?.index ?? now.index;
      }

      event.preventDefault();
      this.setCursor({
        index,
        series: 'range'
      }, {
        say: true
      });
      return;
    }

    const next = (0,_chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_4__.moveCursor)(this._cursor, event.key, {
      count: geometry.ranges.length,
      shown: ['range']
    });
    if (next === null) return;
    event.preventDefault();
    this.setCursor(next, {
      say: true
    });
  } // The pointer picks, in the row it is over, the range it is on, or the
  // nearest within a few pixels.


  placeAt(event) {
    const geometry = this._geometry;
    if (!geometry) return null;
    const box = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - box.left;
    const y = event.clientY - box.top;
    const lane = geometry.lanes.find(one => y >= one.y && y <= one.y + one.h);
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

    return best ? {
      index: best.index,
      series: 'range'
    } : null;
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
    this.sfEmit('select', {
      index: range.index,
      row: range.row,
      lane: range.lane,
      status: range.status,
      start: range.start,
      end: range.end
    });
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
    return this.createTemplateContext({ ...this.getPropsContext(),
      component: this,
      uid: this._uid,
      size: this.size,
      label: this.label || this.words('untitled'),
      state,
      model,
      tableModel,
      tableKey: [tableModel, this.label, this.rowLabel, this.xFormat, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.table, this.table === 'toggle' ? this._view : 'chart'],
      geometry,
      cursor: this.cursorRange(),
      said: this._said,
      view: this.table === 'toggle' ? this._view : 'chart',
      legend: this.legend === 'auto' ? model.statusField && model.statuses.length ? 'top' : 'none' : this.legend,
      summaryText: state === 'ready' ? this.summarize(model) : '',
      hasDescription: this.hasSlotContent?.('description') ?? false,
      description: this.hasSlotContent?.('description') ? this.getSlotContent('description') : null,
      paint: this.colours(),
      rootClass: this.getRootClass()
    });
  } // The data the table shows: settled, so a stream does not rebuild it on
  // every render (chart-core/settle). The first data after none shows at
  // once.


  tableModel(model, ready) {
    this._table = this._table ?? {};

    if (!ready) {
      clearTimeout(this._table.timer);
      this._table = {};
      return model;
    }

    return (0,_chart_core_settle_js__WEBPACK_IMPORTED_MODULE_5__.settled)(this._table, model, {
      later: () => this.requestComponentUpdate('table')
    });
  }

  template() {
    return (0,_js_templates_default__WEBPACK_IMPORTED_MODULE_8__.renderTimelineTemplate)(this.templateContext());
  }

}

SfTimeline.define('sf-chart-timeline');
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "69103a2c35c6"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderTimelineTemplate: () => (/* binding */ renderTimelineTemplate),
/* harmony export */   timelineMarks: () => (/* binding */ timelineMarks)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2a080a730149");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("297fd25a909a");
/* harmony import */ var _default_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("09bae305a327");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([lit__WEBPACK_IMPORTED_MODULE_0__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__]);
([lit__WEBPACK_IMPORTED_MODULE_0__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__);


 // The figure of a timeline: the label and the table button, the key of the
// statuses, the plot (SVG), the summary and the description, the live line,
// and the same data as a table.
//
// The plot is one Tab stop, a role="group" named by the label and described
// by the summary; its marks are aria-hidden, because the summary, the live
// line and the table say what they show. A range takes a chart colour by its
// status's place (--sf-chart-1..8), or a page's own (the colors setting, by
// status key) set in a style as --tone. In forced colours every range is the
// canvas with a line of the text colour, a line of its own per status.

const px = value => `${Math.round(value * 10) / 10}`;

const tone = place => `sf-chart-timeline-c${place % 8 + 1}`;

const paintOf = (paint, key) => {
  const colour = paint.get(key);
  return colour ? `--sf-chart-timeline--tone: ${colour}` : '';
}; // The plot's inside is SVG markup set as the svg element's innerHTML (a
// property, so lit writes no part markers inside it: a first-paint snapshot
// of the plot is the same on every run). Every text is escaped.


const ESCAPES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

const esc = value => String(value).replace(/[&<>"']/gu, one => ESCAPES[one]); // The rows' lines and names, the time grid and its labels.


function frameMarkup(g) {
  let out = '<g class="sf-chart-timeline-frame" aria-hidden="true">';

  for (const at of g.gridTicks) {
    if (at < g.inner.left || at > g.inner.right) continue;
    out += `<line class="sf-chart-timeline-grid" x1="${px(at)}" x2="${px(at)}" y1="${px(g.inner.top)}" y2="${px(g.inner.bottom)}"/>`;
  }

  g.lanes.forEach((lane, index) => {
    if (index) out += `<line class="sf-chart-timeline-lane" x1="0" x2="${px(g.inner.right)}" y1="${px(lane.y)}" y2="${px(lane.y)}"/>`;
    if (lane.text) out += `<text class="sf-chart-timeline-name" x="0" y="${px(lane.cy)}" dominant-baseline="middle">${esc(lane.text)}</text>`;
  });
  out += `<line class="sf-chart-timeline-axis" x1="${px(g.inner.left)}" x2="${px(g.inner.right)}" y1="${px(g.inner.bottom)}" y2="${px(g.inner.bottom)}"/>`;

  for (const tick of g.xTicks) {
    out += `<text class="sf-chart-timeline-tick" x="${px(tick.at)}" y="${px(g.inner.bottom + g.font * 1.2)}" text-anchor="middle">${esc(tick.text)}</text>`;
  }

  return `${out}</g>`;
}

const diamond = one => `M${px(one.cx)} ${px(one.y)}L${px(one.x + one.w)} ${px(one.cy)}L${px(one.cx)} ${px(one.y + one.h)}L${px(one.x)} ${px(one.cy)}Z`; // One group per status, so a class sets its colour once.


function rangesMarkup(g, model, paint) {
  let out = '<g class="sf-chart-timeline-marks" aria-hidden="true">';
  const tones = model.statusField ? model.statuses.map((key, place) => ({
    key,
    place
  })) : [{
    key: '',
    place: 0
  }];

  for (const {
    key,
    place
  } of tones) {
    const style = model.statusField ? paintOf(paint, key) : '';
    out += `<g class="sf-chart-timeline-status ${tone(place)}"${style ? ` style="${esc(style)}"` : ''} data-status="${esc(key)}">`;

    for (const one of g.ranges) {
      if (one.tone !== place) continue;
      out += one.milestone ? `<path class="sf-chart-timeline-milestone" d="${diamond(one)}"/>` : `<rect class="sf-chart-timeline-range" x="${px(one.x)}" y="${px(one.y)}" width="${px(one.w)}" height="${px(one.h)}" rx="${one.w > 6 ? 2 : 0}"/>`;
    }

    out += '</g>';
  }

  return `${out}</g>`;
}
/**
 * The plot's marks as SVG markup, for this element and for a component that
 * composes the timeline (an editable Gantt chart draws its rows with it and
 * adds its own layer on top): the frame, then the ranges by status. `g` is
 * chart-core/timeline timelineLayout's, `paint` the page's colours by status.
 */


function timelineMarks(g, model, paint = new Map()) {
  return frameMarkup(g) + rangesMarkup(g, model, paint);
} // The cursor: a ring round the range.

function cursorMarkup(one) {
  if (!one) return '';
  return `<g class="sf-chart-timeline-cursor" aria-hidden="true"><rect class="sf-chart-timeline-ring" x="${px(one.x - 2)}" y="${px(one.y - 2)}" width="${px(one.w + 4)}" height="${px(one.h + 4)}" rx="3"/></g>`;
}

const swatchMarkup = () => '<svg viewBox="0 0 12 12" focusable="false"><rect class="sf-chart-timeline-range" x="1" y="3" width="10" height="6" rx="1"/></svg>';

function renderKey(context, place) {
  if (context.legend !== place || context.state !== 'ready') return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const {
    component,
    paint,
    model
  } = context;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <ul class=${`sf-chart-timeline-legend sf-chart-timeline-legend--${place}`} aria-label=${component.words('legend')}>
      ${model.statuses.map((key, index) => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <li class=${`sf-chart-timeline-legend-item ${tone(index)}`} style=${paintOf(paint, key) || lit__WEBPACK_IMPORTED_MODULE_0__.nothing}>
          <span class="sf-chart-timeline-swatch" aria-hidden="true" .innerHTML=${swatchMarkup()}></span>
          <span>${component.sayStatus(key)}</span>
        </li>
      `)}
    </ul>
  `;
}

function renderTooltip(context, g, one) {
  if (!one || context.tooltip === 'none') return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const {
    component,
    model
  } = context;
  const flip = one.cx > g.width / 2;
  const rows = [];
  if (model.statusField) rows.push(['status', component.sayStatus(one.status)]);

  if (one.milestone) {
    rows.push(['at', component.sayTime(one.start)]);
  } else {
    rows.push(['start', component.sayTime(one.start)], ['end', component.sayTime(one.end)], ['duration', component.sayDuration(one.end - one.start)]);
  }

  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${`sf-chart-timeline-tooltip${flip ? ' sf-chart-timeline-tooltip--flip' : ''}`} aria-hidden="true"
         style=${`inset-inline-start: ${px(flip ? one.x : one.x + one.w)}px; inset-block-start: ${px(one.cy)}px`}>
      <div class="sf-chart-timeline-tooltip-name">${component.sayLane(one.lane, one.place)}</div>
      ${rows.map(([key, value]) => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <div class="sf-chart-timeline-tooltip-row">
          <span>${component.words(key)}</span>
          <span class="sf-chart-timeline-tooltip-value">${value}</span>
        </div>
      `)}
    </div>
  `;
} // The table is the settled copy of the data (chart-core/settle): it is
// rebuilt only when its key changes, never on a pointer or cursor move.


function renderTable(context) {
  const shownTable = context.table === 'visible' || context.table === 'toggle' && context.view === 'table';
  if (context.state !== 'ready' || !shownTable && context.table !== 'hidden') return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const {
    component
  } = context;
  component._tableView = component._tableView ?? {};
  return (0,_chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__.keptView)(component._tableView, context.tableKey, () => tableMarkup(context, shownTable));
}

function tableMarkup(context, shownTable) {
  const {
    component,
    tableModel: model,
    label
  } = context;
  const statuses = Boolean(model.statusField);
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${shownTable ? 'sf-chart-timeline-table' : 'sf-chart-timeline-sr'}>
      <table>
        <caption>${label}</caption>
        <thead>
          <tr>
            <th scope="col">${component.rowLabel || model.rowField || component.words('row-column')}</th>
            ${statuses ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<th scope="col">${component.words('status')}</th>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
            <th scope="col">${component.words('start')}</th>
            <th scope="col">${component.words('end')}</th>
            <th scope="col">${component.words('duration')}</th>
          </tr>
        </thead>
        <tbody>
          ${model.ranges.map(one => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
            <tr>
              <th scope="row">${component.sayLane(one.lane, one.place)}</th>
              ${statuses ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<td>${component.sayStatus(one.status)}</td>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
              <td>${component.sayTime(one.start)}</td>
              <td>${component.sayTime(one.end)}</td>
              <td>${one.start === one.end ? component.words('milestone') : component.sayDuration(one.end - one.start)}</td>
            </tr>
          `)}
        </tbody>
      </table>
    </div>
  `;
}

function renderPlot(context) {
  const {
    component,
    geometry: g,
    uid,
    state,
    cursor,
    paint,
    model
  } = context;

  if (state === 'loading') {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-timeline-loading" role="status" aria-busy="true"><span class="sf-chart-timeline-sr">${component.words('loading')}</span></div>`;
  }

  if (state === 'empty' || state === 'error') {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
      <sf-empty-state class="sf-chart-timeline-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
        heading=${component.words(state === 'error' ? 'error-title' : 'empty-title')} text=""
        @sf-empty-state-action=${event => {
      event.stopPropagation();
      component.sfEmit('refresh', {});
    }}></sf-empty-state>
    `;
  }

  if (!g) return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const described = [context.summaryText ? `${uid}-summary` : '', context.hasDescription ? `${uid}-description` : ''].filter(Boolean).join(' ');
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <svg class="sf-chart-timeline-svg" role="group" tabindex="0" focusable="true"
         aria-label=${context.label} aria-roledescription=${component.words('roledescription')}
         aria-describedby=${described || lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
         width=${g.width} height=${g.height} viewBox=${`0 0 ${g.width} ${g.height}`}
         @keydown=${event => component.onPlotKey(event)}
         @pointermove=${event => component.onPointerMove(event)}
         @pointerleave=${() => component.onPointerLeave()}
         @click=${event => component.onPlotClick(event)}
         @blur=${() => component.setCursor(null)}
         .innerHTML=${timelineMarks(g, model, paint) + cursorMarkup(cursor)}>
    </svg>
    ${renderTooltip(context, g, cursor)}
  `;
}

function renderTimelineTemplate(context) {
  const {
    component,
    uid,
    state
  } = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <figure class=${['sf-chart-timeline', `sf-chart-timeline--size-${size}`, `sf-chart-timeline--${state}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-chart-timeline-head-row">
        <span class="sf-chart-timeline-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.table === 'toggle' && state === 'ready' ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<button type="button" class="sf-chart-timeline-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      </figcaption>
      ${renderKey(context, 'top')}
      <div class="sf-chart-timeline-plot" ?hidden=${tableView}>${renderPlot(context)}</div>
      ${renderKey(context, 'bottom')}
      ${context.summaryText ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<p class="sf-chart-timeline-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      ${context.hasDescription ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-timeline-description" id=${`${uid}-description`}>${context.description}</div>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      <div class="sf-chart-timeline-sr" aria-live="polite">${context.said}</div>
      ${renderTable(context)}
    </figure>
  `;
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "09bae305a327"
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "8c84a9c1df25"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("chart/colors", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("chart/colors", 1).then(resolve, reject), { once: true })));

/***/ },

/***/ "43efc6ca45fc"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("chart/cursor", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("chart/cursor", 1).then(resolve, reject), { once: true })));

/***/ },

/***/ "dd0c3978091b"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("chart/format", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("chart/format", 1).then(resolve, reject), { once: true })));

/***/ },

/***/ "297fd25a909a"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("chart/settle", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("chart/settle", 1).then(resolve, reject), { once: true })));

/***/ },

/***/ "3caf41c309b2"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("chart/timeline", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("chart/timeline", 1).then(resolve, reject), { once: true })));

/***/ },

/***/ "5b7d7695b41b"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("element-manifest", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("element-manifest", 1).then(resolve, reject), { once: true })));

/***/ },

/***/ "2a080a730149"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("lit", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("lit", 1).then(resolve, reject), { once: true })));

/***/ },

/***/ "43090d1c8307"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("page-language", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("page-language", 1).then(resolve, reject), { once: true })));

/***/ },

/***/ "deb1a4d61565"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("smart-base", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("smart-base", 1).then(resolve, reject), { once: true })));

/***/ },

/***/ "ec10371acc9a"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"id":"smart.chart-timeline","tag":"sf-chart-timeline","version":"0.1.1","kind":"leaf","settings":{"label":{"type":"string","default":""},"items":{"type":"list","default":[],"of":"object"},"colors":{"type":"object","default":{}},"row":{"type":"string","default":""},"start":{"type":"string","default":""},"end":{"type":"string","default":""},"status":{"type":"string","default":""},"legend":{"type":"enum","values":["auto","top","bottom","none"],"default":"auto"},"tooltip":{"type":"enum","values":["range","none"],"default":"range"},"row-label":{"type":"string","default":""},"x-format":{"type":"string","default":"auto"},"size":{"type":"enum","values":["1/2","1","2"],"default":"1"},"table":{"type":"enum","values":["toggle","visible","hidden"],"default":"toggle"},"summary":{"type":"enum","values":["auto","none"],"default":"auto"},"data-state":{"type":"enum","values":["auto","loading","ready","empty","error"],"default":"auto"}},"events":{"select":{"carries":{"index":"number","row":"number","lane":"string","status":"string","start":"number","end":"number"}},"refresh":{"carries":{}}},"actions":{"reset":{"with":{}}},"presentation":{"skeleton":{"late":["items"]}},"css-variables":{"--sf-chart-timeline-height":{"type":"length","state":"default"},"--sf-chart-timeline-label-color":{"type":"color","state":"default"},"--sf-chart-timeline-hover-background-color":{"type":"color","state":"hover"}}}');

/***/ },

/***/ "d7a5e2c8c202"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Gantt chart","runtime":{"untitled":"Chart","roledescription":"Gantt chart","summary-range":"Rows: {rows}, ranges: {count}, {period} ({duration}).","summary-longest":"The longest is «{name}»: {duration}.","summary-status":"The most time is «{status}»: {share}.","summary-milestones":"Milestones: {count}.","summary-left":"Rows without a valid start and end: {count}.","summary-empty":"No data.","cursor":"{name}: {when}, {duration}","cursor-status":"{name}, {status}: {when}, {duration}","period":"{from} – {to}","milestone":"milestone","row-n":"Row {n}","row-column":"Row","status":"Status","no-status":"No status","start":"Start","end":"End","at":"Date","duration":"Duration","legend":"Statuses","gap":"no data","show-table":"Table","loading":"Loading the chart\'s data","empty-title":"No data for the chart","error-title":"Could not load the data"},"events":{"select":{"label":"Choose a range"},"refresh":{"label":"Load the data again"}},"actions":{"reset":{"label":"Take the cursor away"}}}');

/***/ },

/***/ "7308c3f96ca5"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Диаграмма Ганта","runtime":{"untitled":"График","roledescription":"диаграмма Ганта","summary-range":"Рядов: {rows}, отрезков: {count}, {period} ({duration}).","summary-longest":"Дольше всего — «{name}»: {duration}.","summary-status":"Больше всего времени — «{status}»: {share}.","summary-milestones":"Вех: {count}.","summary-left":"Строк без верного начала и конца: {count}.","summary-empty":"Нет данных.","cursor":"{name}: {when}, {duration}","cursor-status":"{name}, {status}: {when}, {duration}","period":"{from} – {to}","milestone":"веха","row-n":"Ряд {n}","row-column":"Ряд","status":"Статус","no-status":"Без статуса","start":"Начало","end":"Конец","at":"Дата","duration":"Длительность","legend":"Статусы","gap":"нет данных","show-table":"Таблица","loading":"Загрузка данных графика","empty-title":"Нет данных для графика","error-title":"Не удалось загрузить данные"},"events":{"select":{"label":"Выбрать отрезок"},"refresh":{"label":"Загрузить данные заново"}},"actions":{"reset":{"label":"Убрать курсор"}}}');

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		const hasSymbol = typeof Symbol === "function";
/******/ 		const webpackQueues = hasSymbol ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		const webpackExports = hasSymbol ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		const webpackError = hasSymbol ? Symbol("webpack error") : "__webpack_error__";
/******/
/******/ 		const resolveQueue = (queue) => {
/******/ 			if(queue?.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		const wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					const queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					const obj = {};
/******/
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			const ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			let queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			const depQueues = new Set();
/******/ 			const exports = module.exports;
/******/ 			let currentDeps;
/******/ 			let outerResolve;
/******/ 			let reject;
/******/ 			const promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			const handle = (deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				let fn;
/******/ 				const getResult = () => (currentDeps.map((d) => {
/******/
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				const promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					const fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}
/******/ 			const done = (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue))
/******/ 			body(handle, done);
/******/ 			queue?.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			const getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/
/************************************************************************/
/******/
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	let __webpack_exports__ = __webpack_require__("a6596096f065");
/******/
/******/ })()
;