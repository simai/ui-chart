/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "650b475531cc"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("deb1a4d61565");
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("5b7d7695b41b");
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("43090d1c8307");
/* harmony import */ var _chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("1a60ce635d04");
/* harmony import */ var _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("dd0c3978091b");
/* harmony import */ var _chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("43efc6ca45fc");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("297fd25a909a");
/* harmony import */ var _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("8c84a9c1df25");
/* harmony import */ var _js_funnel_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("b85a667803b8");
/* harmony import */ var _js_templates_default__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("629accafca95");
/* harmony import */ var _component_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("366e64cc9175");
/* harmony import */ var _lang_en_json__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("5c35c1683fa1");
/* harmony import */ var _lang_ru_json__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("dd935618fac9");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__, _chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_5__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_6__, _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7__, _js_templates_default__WEBPACK_IMPORTED_MODULE_9__]);
([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__, _chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_5__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_6__, _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7__, _js_templates_default__WEBPACK_IMPORTED_MODULE_9__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _chart_core_data_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_chart_core_settle_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7__);
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













const ChartFunnelElement = (0,_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__.elementFromManifest)(_component_json__WEBPACK_IMPORTED_MODULE_10__, {
  base: (_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default()),
  lang: {
    en: _lang_en_json__WEBPACK_IMPORTED_MODULE_11__,
    ru: _lang_ru_json__WEBPACK_IMPORTED_MODULE_12__
  },
  source: 'ru'
});
let instances = 0;

class SfFunnel extends ChartFunnelElement {
  static get props() {
    return { ...super.props,
      rootClass: {
        default: ''
      }
    };
  }

  onConnected() {
    this._uid = this.id || `sf-chart-funnel-${instances += 1}`;
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
      if (own) (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7__.checkContrast)(this, new Map([['color', own]]), 'sf-chart-funnel');
    }

    return undefined;
  } // The page's own colour (the color setting: a Framework role or a CSS
  // colour, chart-core/colors), '' when unset or not a colour.


  colour() {
    if (this.color !== this._colourRaw) {
      this._colourRaw = this.color;
      this._colour = (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7__.colourValue)(this.color);
      if (this.color && !this._colour) console.warn(`<sf-chart-funnel> color «${this.color}» is neither a Framework role nor a CSS colour`);
    }

    return this._colour || '';
  }

  words(key, vars) {
    return this.sfWord(key, vars ? {
      vars
    } : undefined);
  } // The data as stages in the data's order, each with its conversions.


  model() {
    const key = [this.items, this.names, this.stage, this.value];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;
    const read = (0,_chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__.readSeries)(this.items, {
      x: this.stage,
      y: this.value.split(',')[0].trim(),
      xScale: 'category'
    });
    const one = read.series[0];
    const names = this.names || {};
    const unit = read.kind === 'time' ? (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.timeUnitOf)(read.xs) : 'day';

    const sayKey = index => {
      const label = read.labels[index];
      if (names[label] !== undefined) return names[label];
      if (read.kind === 'time') return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatTime)(read.xs[index], (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), unit, {
        form: 'full'
      });
      return String(label ?? '');
    };

    const rows = read.xs.map((_, index) => ({
      key: String(read.labels[index] ?? ''),
      name: sayKey(index),
      value: one ? one.values[index] : null,
      index
    }));
    this._model = {
      kind: read.kind,
      stageField: read.xField,
      valueField: one?.key ?? '',
      ...(0,_js_funnel_js__WEBPACK_IMPORTED_MODULE_8__.funnelStages)(rows)
    };
    return this._model;
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.stages.some(stage => stage.value !== null) ? 'ready' : 'empty';
  }

  sayY(value) {
    return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(value, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.valueFormat, {
      gap: this.words('gap')
    });
  }

  sayShare(share) {
    return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(share, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), 'percent');
  } // The share written beside a stage, by the conversion setting; none for
  // the first stage, a gap or a share that cannot be had.


  besideShare(stage) {
    const share = this.conversion === 'first' ? stage.fromFirst : this.conversion === 'none' ? null : stage.fromPrevious;
    return share === null ? '' : this.sayShare(share);
  }

  sayStage(stage) {
    if (stage.value === null) return this.words('gap');
    if (stage.fromPrevious === null && stage.fromFirst === null) return this.words('stage-first', {
      value: this.sayY(stage.value)
    });
    return this.words('stage-next', {
      value: this.sayY(stage.value),
      previous: stage.fromPrevious === null ? this.words('gap') : this.sayShare(stage.fromPrevious),
      first: stage.fromFirst === null ? this.words('gap') : this.sayShare(stage.fromFirst)
    });
  }

  summarize(model) {
    if (this.summary === 'none') return '';
    const out = [];

    if (model.overall !== null) {
      out.push(this.words('summary-whole', {
        count: model.stages.length,
        from: this.sayY(model.first.value),
        to: this.sayY(model.last.value),
        overall: this.sayShare(model.overall)
      }));
    } else {
      out.push(this.words('summary-short', {
        count: model.stages.length
      }));
    }

    if (model.worst) {
      const before = model.stages[model.worst.index - 1];
      out.push(this.words('summary-worst', {
        from: before.name,
        to: model.worst.name,
        share: this.sayShare(model.worst.fromPrevious)
      }));
    }

    if (model.grows) out.push(this.words('summary-grows'));
    if (model.gaps) out.push(this.words('summary-gaps', {
      count: model.gaps
    }));
    return out.join(' ');
  }

  cursorLine(model, cursor) {
    const stage = model.stages[cursor.index];
    return stage ? this.words('cursor', {
      name: stage.name,
      stage: this.sayStage(stage)
    }) : '';
  }

  setCursor(cursor, {
    say = false
  } = {}) {
    this._cursor = cursor;
    if (say && cursor) this._said = this.cursorLine(this.model(), cursor);
    this.requestComponentUpdate('cursor');
  } // The stages go down the page, so Down and Right go to the next stage, Up
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
    const flat = {
      ArrowUp: 'ArrowLeft',
      ArrowDown: 'ArrowRight'
    }[event.key] ?? event.key;
    const moved = (0,_chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_5__.moveCursor)(this._cursor, flat, {
      count,
      shown: ['stage']
    });
    if (!moved) return;
    event.preventDefault();
    this.setCursor(moved, {
      say: true
    });
  }

  pointAt(event) {
    const row = event.target.closest?.('[data-place]');
    return row ? {
      index: Number(row.dataset.place),
      series: 'stage'
    } : null;
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
  } // select carries the stage as the data gave it: its key as x, its place,
  // its value (null for a gap).


  choose(cursor) {
    const model = this.model();
    const stage = model.stages[cursor.index];
    if (!stage) return;
    this.sfEmit('select', {
      series: model.valueField,
      index: stage.index,
      x: stage.key,
      value: stage.value
    });
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
    return this.createTemplateContext({ ...this.getPropsContext(),
      component: this,
      uid: this._uid,
      size: this.size,
      label: this.label || this.words('untitled'),
      state,
      model,
      stages: state === 'ready' ? model.stages : [],
      colour: this.colour(),
      tableKey: [tableModel, this.label, this.stageLabel, this.valueLabel, this.valueFormat, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.table, this.table === 'toggle' ? this._view : 'chart'],
      rows: tableModel.stages,
      cursor,
      said: this._said,
      view: this.table === 'toggle' ? this._view : 'chart',
      stageLabel: this.stageLabel || model.stageField || this.words('stage-column'),
      valueLabel: this.valueLabel || model.valueField || this.words('value-column'),
      summaryText: state === 'ready' ? this.summarize(model) : '',
      hasDescription: this.hasSlotContent?.('description') ?? false,
      description: this.hasSlotContent?.('description') ? this.getSlotContent('description') : null,
      rootClass: this.getRootClass()
    });
  } // The data the table shows: settled, so a stream or a pointer move does
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

    return (0,_chart_core_settle_js__WEBPACK_IMPORTED_MODULE_6__.settled)(this._table, model, {
      later: () => this.requestComponentUpdate('table')
    });
  }

  template() {
    return (0,_js_templates_default__WEBPACK_IMPORTED_MODULE_9__.renderFunnelTemplate)(this.templateContext());
  }

}

SfFunnel.define('sf-chart-funnel');
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "b85a667803b8"
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   funnelStages: () => (/* binding */ funnelStages)
/* harmony export */ });
// The stages of a funnel (docs/research/catalogue.md, Funnel): each stage's
// share of the widest, its conversion from the stage before and from the
// first, and where the most is lost. A stage with no value is a gap: it has
// no bar and no conversion, and the stage after it has none from it either.

/** The stages with share, fromPrevious, fromFirst and drop, and the facts of the whole. */
function funnelStages(rows) {
  const known = rows.filter(row => row.value !== null);
  const widest = Math.max(0, ...known.map(row => row.value));
  const first = rows.find(row => row.value !== null && row.value > 0) ?? null;
  const stages = rows.map((row, index) => {
    const before = index > 0 ? rows[index - 1].value : null;
    const has = row.value !== null;
    return { ...row,
      share: has && widest > 0 ? Math.max(0, row.value) / widest : 0,
      fromPrevious: has && before !== null && before > 0 && index > 0 ? row.value / before : null,
      fromFirst: has && first && index > first.index ? row.value / first.value : null,
      drop: has && before !== null && index > 0 ? before - row.value : null
    };
  });
  const last = [...stages].reverse().find(stage => stage.value !== null) ?? null;
  const lost = stages.filter(stage => stage.fromPrevious !== null && stage.fromPrevious < 1);
  const worst = lost.length ? lost.reduce((most, stage) => stage.fromPrevious < most.fromPrevious ? stage : most) : null; // A stage wider than the one before means the stages are not nested.

  const grows = stages.some(stage => stage.fromPrevious !== null && stage.fromPrevious > 1);
  return {
    stages,
    first,
    last,
    overall: first && last && last.index > first.index ? last.value / first.value : null,
    worst,
    grows,
    gaps: stages.filter(stage => stage.value === null).length
  };
}

/***/ },

/***/ "629accafca95"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderFunnelTemplate: () => (/* binding */ renderFunnelTemplate)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2a080a730149");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("297fd25a909a");
/* harmony import */ var _default_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("b88bff938b6f");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([lit__WEBPACK_IMPORTED_MODULE_0__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__]);
([lit__WEBPACK_IMPORTED_MODULE_0__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__);


 // The figure of a funnel: the label with the table button, the stages, the
// summary and the description, the live line, and the same data as a
// table.
//
// The stages are one Tab stop, a role="group" named by the label and
// described by the summary; their rows are aria-hidden, because the
// summary, the live line and the table say what they show. A row is the
// stage's name, its bar, its value and its share; the bar's length is the
// stage's share of the widest stage, a unitless number in a style, and
// every bar is the one colour of the funnel. A page's own colour (the color
// setting) is --custom in a style on the stages.

const share = value => `${Math.round(value * 10000) / 10000}`; // A name or a value is the page's text written into markup, so it is
// escaped; a page's colour is checked to be a colour (chart-core/colors)
// and escaped all the same.


const ESCAPES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

const esc = value => String(value).replace(/[&<>"']/gu, one => ESCAPES[one]); // The stages' inside is markup set as the element's innerHTML (a property,
// so lit writes no part markers inside it: a first-paint snapshot of the
// stages is the same on every run).


function stagesMarkup(context) {
  const {
    component,
    stages,
    cursor
  } = context;
  let out = '';

  for (const [place, stage] of stages.entries()) {
    const gap = stage.value === null;
    const marks = [gap ? ' sf-chart-funnel-stage--gap' : '', cursor && cursor.index !== place ? ' sf-chart-funnel-stage--dim' : '', cursor && cursor.index === place ? ' sf-chart-funnel-stage--current' : ''].join('');
    const bar = gap ? '' : `<span class="sf-chart-funnel-bar" style="--sf-chart-funnel--share: ${share(stage.share)}"></span>`;
    out += `<div class="sf-chart-funnel-stage${marks}" data-place="${place}" aria-hidden="true">` + `<span class="sf-chart-funnel-name">${esc(stage.name)}</span>` + `<span class="sf-chart-funnel-track">${bar}</span>` + `<span class="sf-chart-funnel-value">${esc(component.sayY(stage.value))}</span>` + `<span class="sf-chart-funnel-share">${esc(component.besideShare(stage))}</span>` + '</div>';
  }

  return out;
} // The tooltip stands under the current stage's row, at the bar's start.


function renderTooltip(context, cursor) {
  if (!cursor || context.tooltip === 'none') return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const {
    component,
    stages
  } = context;
  const stage = stages[cursor.index];
  if (!stage) return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class="sf-chart-funnel-tooltip" aria-hidden="true" style=${`--sf-chart-funnel--at: ${cursor.index + 1}`}>
      <span class="sf-chart-funnel-tooltip-name">${stage.name}</span>
      <span class="sf-chart-funnel-tooltip-value">${component.sayY(stage.value)}</span>
      ${stage.fromPrevious === null ? lit__WEBPACK_IMPORTED_MODULE_0__.nothing : (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-chart-funnel-tooltip-share">${component.words('previous-short', {
    share: component.sayShare(stage.fromPrevious)
  })}</span>`}
      ${stage.fromFirst === null ? lit__WEBPACK_IMPORTED_MODULE_0__.nothing : (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-chart-funnel-tooltip-share">${component.words('first-short', {
    share: component.sayShare(stage.fromFirst)
  })}</span>`}
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
    label
  } = context;

  const shareOr = value => value === null ? component.words('gap') : component.sayShare(value);

  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${shownTable ? 'sf-chart-funnel-table' : 'sf-chart-funnel-sr'}>
      <table>
        <caption>${label}</caption>
        <thead>
          <tr>
            <th scope="col">${context.stageLabel}</th>
            <th scope="col">${context.valueLabel}</th>
            <th scope="col">${component.words('previous-column')}</th>
            <th scope="col">${component.words('first-column')}</th>
          </tr>
        </thead>
        <tbody>
          ${context.rows.map((row, place) => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
            <tr>
              <th scope="row">${row.name}</th>
              <td>${component.sayY(row.value)}</td>
              <td>${place === 0 ? '' : shareOr(row.fromPrevious)}</td>
              <td>${place === 0 ? '' : shareOr(row.fromFirst)}</td>
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
    uid,
    state,
    cursor
  } = context;

  if (state === 'loading') {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-funnel-stages sf-chart-funnel-stages--loading" role="status" aria-busy="true"><span class="sf-chart-funnel-sr">${component.words('loading')}</span></div>`;
  }

  if (state === 'empty' || state === 'error') {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
      <sf-empty-state class="sf-chart-funnel-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
        heading=${component.words(state === 'error' ? 'error-title' : 'empty-title')} text=""
        @sf-empty-state-action=${event => {
      event.stopPropagation();
      component.sfEmit('refresh', {});
    }}></sf-empty-state>
    `;
  }

  const described = [context.summaryText ? `${uid}-summary` : '', context.hasDescription ? `${uid}-description` : ''].filter(Boolean).join(' ');
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${`sf-chart-funnel-stages${context.colour ? ' sf-chart-funnel-stages--custom' : ''}`} role="group" tabindex="0"
         aria-label=${context.label} aria-roledescription=${component.words('roledescription')}
         aria-describedby=${described || lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
         style=${context.colour ? `--sf-chart-funnel--custom: ${esc(context.colour)}` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
         @keydown=${event => component.onPlotKey(event)}
         @pointermove=${event => component.onPointerMove(event)}
         @pointerleave=${() => component.onPointerLeave()}
         @click=${event => component.onPlotClick(event)}
         @blur=${() => component.setCursor(null)}
         .innerHTML=${stagesMarkup(context)}></div>
    ${renderTooltip(context, cursor)}
  `;
}

function renderFunnelTemplate(context) {
  const {
    component,
    uid,
    state
  } = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <figure class=${['sf-chart-funnel', `sf-chart-funnel--size-${size}`, `sf-chart-funnel--${state}`, `sf-chart-funnel--align-${context.align === 'center' ? 'center' : 'start'}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-chart-funnel-head">
        <span class="sf-chart-funnel-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.table === 'toggle' && state === 'ready' ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<button type="button" class="sf-chart-funnel-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      </figcaption>
      <div class="sf-chart-funnel-plot" ?hidden=${tableView}>${renderPlot(context)}</div>
      ${context.summaryText ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<p class="sf-chart-funnel-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      ${context.hasDescription ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-funnel-description" id=${`${uid}-description`}>${context.description}</div>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      <div class="sf-chart-funnel-sr" aria-live="polite">${context.said}</div>
      ${renderTable(context)}
    </figure>
  `;
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "b88bff938b6f"
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

/***/ "1a60ce635d04"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("chart/data", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("chart/data", 1).then(resolve, reject), { once: true })));

/***/ },

/***/ "dd0c3978091b"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("chart/format", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("chart/format", 1).then(resolve, reject), { once: true })));

/***/ },

/***/ "297fd25a909a"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("chart/settle", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("chart/settle", 1).then(resolve, reject), { once: true })));

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

/***/ "366e64cc9175"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"id":"smart.chart-funnel","tag":"sf-chart-funnel","version":"0.1.1","kind":"leaf","settings":{"label":{"type":"string","default":""},"items":{"type":"list","default":[],"of":"object"},"names":{"type":"object","default":{}},"stage":{"type":"string","default":""},"value":{"type":"string","default":""},"conversion":{"type":"enum","values":["previous","first","none"],"default":"previous"},"align":{"type":"enum","values":["start","center"],"default":"start"},"color":{"type":"string","default":""},"tooltip":{"type":"enum","values":["stage","none"],"default":"stage"},"stage-label":{"type":"string","default":""},"value-label":{"type":"string","default":""},"value-format":{"type":"string","default":"number"},"size":{"type":"enum","values":["1/2","1","2"],"default":"1"},"table":{"type":"enum","values":["toggle","visible","hidden"],"default":"toggle"},"summary":{"type":"enum","values":["auto","none"],"default":"auto"},"data-state":{"type":"enum","values":["auto","loading","ready","empty","error"],"default":"auto"}},"events":{"select":{"carries":{"series":"string","index":"number","x":"string","value":"number"}},"refresh":{"carries":{}}},"presentation":{"skeleton":{"late":["items"]}},"css-variables":{"--sf-chart-funnel-color":{"type":"color","state":"default"},"--sf-chart-funnel-label-color":{"type":"color","state":"default"},"--sf-chart-funnel-bar-radius":{"type":"length","state":"default"}}}');

/***/ },

/***/ "5c35c1683fa1"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Funnel","runtime":{"untitled":"Funnel","roledescription":"funnel","cursor":"{name}: {stage}","gap":"no data","show-table":"Table","loading":"Loading the chart data","empty-title":"No data for the chart","error-title":"The data could not be loaded","stage-first":"{value}","stage-next":"{value}, {previous} of the previous, {first} of the first","previous-short":"{share} of the previous","first-short":"{share} of the first","summary-whole":"Stages: {count}, from {from} to {to}, overall conversion {overall}.","summary-short":"Stages: {count}.","summary-worst":"The most is lost between «{from}» and «{to}»: {share} go on.","summary-grows":"The stages are not nested: a stage is larger than the one before.","summary-gaps":"No data: {count}.","stage-column":"Stage","value-column":"Value","previous-column":"Of the previous","first-column":"Of the first"},"events":{"select":{"label":"Choose a stage"},"refresh":{"label":"Load the data again"}}}');

/***/ },

/***/ "dd935618fac9"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Воронка","runtime":{"untitled":"Воронка","roledescription":"воронка","cursor":"{name}: {stage}","gap":"нет данных","show-table":"Таблица","loading":"Загрузка данных диаграммы","empty-title":"Нет данных для диаграммы","error-title":"Не удалось загрузить данные","stage-first":"{value}","stage-next":"{value}, {previous} от предыдущего, {first} от первого","previous-short":"{share} от предыдущего","first-short":"{share} от первого","summary-whole":"Этапов: {count}, от {from} до {to}, итоговая конверсия {overall}.","summary-short":"Этапов: {count}.","summary-worst":"Больше всего теряется между «{from}» и «{to}»: дальше проходит {share}.","summary-grows":"Этапы не вложены: есть этап больше предыдущего.","summary-gaps":"Нет данных: {count}.","stage-column":"Этап","value-column":"Значение","previous-column":"От предыдущего","first-column":"От первого"},"events":{"select":{"label":"Выбрать этап"},"refresh":{"label":"Загрузить данные заново"}}}');

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
/******/ 	let __webpack_exports__ = __webpack_require__("650b475531cc");
/******/
/******/ })()
;