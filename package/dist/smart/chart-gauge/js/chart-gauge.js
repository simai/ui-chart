/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "267a03b41e99"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("deb1a4d61565");
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("5b7d7695b41b");
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("43090d1c8307");
/* harmony import */ var _chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("dd0c3978091b");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("297fd25a909a");
/* harmony import */ var _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("8c84a9c1df25");
/* harmony import */ var _js_gauge_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("c86f669c823a");
/* harmony import */ var _js_templates_default__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("1a63f69ef0a5");
/* harmony import */ var _component_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("b6c72114a0d4");
/* harmony import */ var _lang_en_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("8d12eb963e74");
/* harmony import */ var _lang_ru_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("1838f77a3f3f");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_4__, _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_5__, _js_gauge_js__WEBPACK_IMPORTED_MODULE_6__, _js_templates_default__WEBPACK_IMPORTED_MODULE_7__]);
([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_4__, _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_5__, _js_gauge_js__WEBPACK_IMPORTED_MODULE_6__, _js_templates_default__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _chart_core_format_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_chart_core_settle_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_5__);
// sf-chart-gauge: one measured value on a fixed scale with bands (normal,
// warning, critical) and a target (docs/research/catalogue.md, Gauge).
//
// The element reads its scale once (js/gauge): the value's share of
// the scale, the bands inside it and the band the value is in. It draws a
// half circle in a fixed SVG view box scaled by its width, or a bar of HTML
// whose positions are shares, so nothing is measured and the first paint is
// the drawn gauge. It is a meter for screen readers, with the band's name in
// its value text, described by a summary sentence; it takes no focus.
//
// It renders into its own light DOM, like every Smart component.











const ChartGaugeElement = (0,_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__.elementFromManifest)(_component_json__WEBPACK_IMPORTED_MODULE_8__, {
  base: (_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default()),
  lang: {
    en: _lang_en_json__WEBPACK_IMPORTED_MODULE_9__,
    ru: _lang_ru_json__WEBPACK_IMPORTED_MODULE_10__
  },
  source: 'ru'
});
let instances = 0;
const ZONES = new Set(['success', 'warning', 'error']);

class SfGauge extends ChartGaugeElement {
  static get props() {
    return { ...super.props,
      rootClass: {
        default: ''
      }
    };
  }

  onConnected() {
    this._uid = this.id || `sf-chart-gauge-${instances += 1}`;
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
      if (own) (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_5__.checkContrast)(this, new Map([['color', own]]), 'sf-chart-gauge');
    }

    return undefined;
  } // The page's own colour (the color setting: a Framework role or a CSS
  // colour, chart-core/colors), '' when unset or not a colour.


  colour() {
    if (this.color !== this._colourRaw) {
      this._colourRaw = this.color;
      this._colour = (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_5__.colourValue)(this.color);
      if (this.color && !this._colour) console.warn(`<sf-chart-gauge> color «${this.color}» is neither a Framework role nor a CSS colour`);
    }

    return this._colour || '';
  }

  words(key, vars) {
    return this.sfWord(key, vars ? {
      vars
    } : undefined);
  } // The scale, the bands and where the value and the target stand on it.


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
    const scale = {
      min,
      max
    };
    const bands = ok ? (0,_js_gauge_js__WEBPACK_IMPORTED_MODULE_6__.gaugeBands)(this.bands, scale).map(band => ({ ...band,
      name: this.bandName(band)
    })) : [];
    this._model = {
      min,
      max,
      ok,
      value,
      share: ok ? (0,_js_gauge_js__WEBPACK_IMPORTED_MODULE_6__.gaugeShare)(value, scale) : 0,
      past: value === null ? 0 : value > max ? 1 : value < min ? -1 : 0,
      bands,
      // A value past the scale is in the band at that end: past a critical
      // band's end is critical too.
      band: (0,_js_gauge_js__WEBPACK_IMPORTED_MODULE_6__.bandOf)(bands, value === null ? null : Math.max(min, Math.min(max, value))),
      target: ok && target !== null ? {
        value: target,
        share: (0,_js_gauge_js__WEBPACK_IMPORTED_MODULE_6__.gaugeShare)(target, scale),
        name: this.targetLabel || this.words('target')
      } : null
    };
    return this._model;
  }

  bandName(band) {
    if (band.label) return band.label;
    return ZONES.has(band.role) ? this.words(`zone-${band.role}`) : this.words('zone-other', {
      number: band.index + 1
    });
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.value !== null && model.ok ? 'ready' : 'empty';
  }

  sayY(value) {
    return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatNumber)(value, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.valueFormat, {
      gap: this.words('gap')
    });
  }

  sayShare(share) {
    return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatNumber)(share, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), 'percent');
  }

  sayRange(band) {
    return this.words('range', {
      from: this.sayY(band.from),
      to: this.sayY(band.to)
    });
  } // Where the value stands against the target: above by, below by, exactly.


  sayTarget(model) {
    const {
      target,
      value
    } = model;
    if (!target || value === null) return '';
    const by = value - target.value;
    const where = by === 0 ? this.words('at') : this.words(by > 0 ? 'above' : 'below', {
      by: this.sayY(Math.abs(by))
    });
    return where;
  }

  valueText(model) {
    const value = this.sayY(model.value);
    return model.band ? this.words('value-text', {
      value,
      band: model.band.name
    }) : value;
  }

  summarize(model) {
    if (this.summary === 'none') return '';
    const out = [];
    const value = this.sayY(model.value);
    if (model.past > 0) out.push(this.words('summary-over', {
      value,
      max: this.sayY(model.max)
    }));else if (model.past < 0) out.push(this.words('summary-under', {
      value,
      min: this.sayY(model.min)
    }));else out.push(this.words('summary-value', {
      value,
      min: this.sayY(model.min),
      max: this.sayY(model.max),
      share: this.sayShare(model.share)
    }));
    if (model.band) out.push(this.words('summary-band', {
      band: model.band.name,
      range: this.sayRange(model.band)
    }));
    if (model.target) out.push(this.words('summary-target', {
      name: model.target.name,
      target: this.sayY(model.target.value),
      where: this.sayTarget(model)
    }));
    return out.join(' ');
  } // The colour of the value: its band's role, else the page's colour, else
  // the sheet's (--sf-chart-gauge-color, then primary).


  fillOf(model) {
    if (model.band) return (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_5__.colourValue)(model.band.role);
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
    return this.createTemplateContext({ ...this.getPropsContext(),
      component: this,
      uid: this._uid,
      size: this.size,
      shape: this.shape === 'linear' ? 'linear' : 'arc',
      label: this.label || this.words('untitled'),
      state,
      model,
      fill: this.fillOf(model),
      tableKey: [tableModel, this.label, this.valueFormat, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.table, this.table === 'toggle' ? this._view : 'chart'],
      tableData: tableModel,
      view: this.table === 'toggle' ? this._view : 'chart',
      summaryText: state === 'ready' ? this.summarize(model) : '',
      hasDescription: this.hasSlotContent?.('description') ?? false,
      description: this.hasSlotContent?.('description') ? this.getSlotContent('description') : null,
      rootClass: this.getRootClass()
    });
  } // The data the table shows: settled, so a value streamed several times a
  // second does not rebuild the table on every render (chart-core/settle).


  tableModel(model, ready) {
    this._table = this._table ?? {};

    if (!ready) {
      clearTimeout(this._table.timer);
      this._table = {};
      return model;
    }

    return (0,_chart_core_settle_js__WEBPACK_IMPORTED_MODULE_4__.settled)(this._table, model, {
      later: () => this.requestComponentUpdate('table')
    });
  }

  template() {
    return (0,_js_templates_default__WEBPACK_IMPORTED_MODULE_7__.renderGaugeTemplate)(this.templateContext());
  }

}

SfGauge.define('sf-chart-gauge');
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "c86f669c823a"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bandOf: () => (/* binding */ bandOf),
/* harmony export */   gaugeAngle: () => (/* binding */ gaugeAngle),
/* harmony export */   gaugeBands: () => (/* binding */ gaugeBands),
/* harmony export */   gaugeShare: () => (/* binding */ gaugeShare)
/* harmony export */ });
/* harmony import */ var _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8c84a9c1df25");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_0__]);
var __webpack_async_dependencies_result__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_async_dependencies_result__[0];
/* harmony import */ var _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_0__);
// A gauge's scale (docs/research/catalogue.md, Gauge): one measured value on
// a fixed scale from min to max, with bands (normal, warning, critical) and
// a target. The scale is a share 0..1 of its length; an arc turns the share
// into an angle over the upper half circle, clockwise from nine o'clock.

/** The share of the scale a value stands at, kept to 0..1. */

function gaugeShare(value, {
  min,
  max
}) {
  if (value === null || !Number.isFinite(value) || !(max > min)) return 0;
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
}
/** The angle of a share on the arc, in radians from twelve o'clock. */

const gaugeAngle = share => -Math.PI / 2 + share * Math.PI;
/**
 * The bands as given ({from?, to, role, label}), in order and inside the
 * scale: a band without from starts where the one before ends (min for the
 * first); a band that is empty inside the scale is dropped. A role that is
 * not a Framework role is neutral.
 */

function gaugeBands(raw, {
  min,
  max
}) {
  const list = Array.isArray(raw) ? raw : [];
  const out = [];
  let edge = min;

  for (const one of list) {
    if (!one || typeof one !== 'object') continue;
    const to = Number(one.to);
    if (!Number.isFinite(to)) continue;
    const from = Number.isFinite(Number(one.from)) && one.from !== null && one.from !== '' ? Number(one.from) : edge;
    edge = to;
    const lo = Math.max(min, Math.min(from, to));
    const hi = Math.min(max, Math.max(from, to));
    if (!(hi > lo)) continue;
    out.push({
      from: lo,
      to: hi,
      role: _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_0__.ROLES.includes(one.role) ? one.role : 'neutral',
      label: typeof one.label === 'string' ? one.label : '',
      index: out.length
    });
  }

  return out.sort((a, b) => a.from - b.from).map((band, index) => ({ ...band,
    index
  }));
}
/** The band a value falls in: from inclusive, to exclusive but for the last band; null outside every band. */

function bandOf(bands, value) {
  if (value === null || !Number.isFinite(value)) return null;
  const last = bands.at(-1);
  return bands.find(band => value >= band.from && (value < band.to || band === last && value === band.to)) ?? null;
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "1a63f69ef0a5"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderGaugeTemplate: () => (/* binding */ renderGaugeTemplate)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2a080a730149");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("297fd25a909a");
/* harmony import */ var _chart_core_arc_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("3de1fea7d4a8");
/* harmony import */ var _gauge_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("c86f669c823a");
/* harmony import */ var _default_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("1e34599de468");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([lit__WEBPACK_IMPORTED_MODULE_0__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__, _chart_core_arc_js__WEBPACK_IMPORTED_MODULE_2__, _gauge_js__WEBPACK_IMPORTED_MODULE_3__]);
([lit__WEBPACK_IMPORTED_MODULE_0__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__, _chart_core_arc_js__WEBPACK_IMPORTED_MODULE_2__, _gauge_js__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _chart_core_arc_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_chart_core_arc_js__WEBPACK_IMPORTED_MODULE_2__);




 // The figure of a gauge: the label (with the table button on request), the
// meter, the target line, the summary and the description, and the same
// data as a table.
//
// The meter is a role="meter" named by the label, with its value text and
// the summary as its description; what it draws is presentational. The arc
// is SVG in a fixed view box that its width scales, the bar HTML with its
// positions as unitless shares in styles, so the first paint is the drawn
// gauge. A band's colour is a class by its role; the value's colour is its
// band's role, or the page's colour, set in a style as --fill.
// The arc's view box: a half circle around (100, 100); the track is the
// ring from 70 to 90, the bands a thin ring from 93 to 98 outside it, and
// the target a mark across both.

const VIEW = {
  width: 200,
  height: 101,
  cx: 100,
  cy: 100
};
const TRACK = {
  inner: 70,
  outer: 90
};
const RING = {
  inner: 93,
  outer: 98
};
const MARK = {
  inner: 64,
  outer: 100
};

const share = value => `${Math.round(value * 10000) / 10000}`;

const round = value => Math.round(value * 100) / 100; // A page's colour is checked to be a colour (chart-core/colors) and escaped
// all the same, since it is written into markup.


const ESCAPES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

const esc = value => String(value).replace(/[&<>"']/gu, one => ESCAPES[one]);

const sector = (from, to, ring) => (0,_chart_core_arc_js__WEBPACK_IMPORTED_MODULE_2__.arcPath)({
  start: (0,_gauge_js__WEBPACK_IMPORTED_MODULE_3__.gaugeAngle)(from),
  end: (0,_gauge_js__WEBPACK_IMPORTED_MODULE_3__.gaugeAngle)(to)
}, {
  cx: VIEW.cx,
  cy: VIEW.cy,
  ...ring
}); // The arc's inside is markup set as the element's innerHTML (a property, so
// lit writes no part markers inside it: a first-paint snapshot of the arc
// is the same on every run).


function arcMarkup(model, ready) {
  const {
    min,
    max
  } = model;
  const span = max - min;
  let out = `<svg class="sf-chart-gauge-art" viewBox="0 0 ${VIEW.width} ${VIEW.height}" aria-hidden="true" focusable="false">`;
  out += `<path class="sf-chart-gauge-track" d="${sector(0, 1, TRACK)}"></path>`;

  for (const band of model.bands) {
    out += `<path class="sf-chart-gauge-band sf-chart-gauge-band--${band.role}" d="${sector((band.from - min) / span, (band.to - min) / span, RING)}"></path>`;
  }

  if (ready && model.share > 0) out += `<path class="sf-chart-gauge-fill" d="${sector(0, model.share, TRACK)}"></path>`;

  if (model.target) {
    const angle = (0,_gauge_js__WEBPACK_IMPORTED_MODULE_3__.gaugeAngle)(model.target.share);

    const at = r => `${round(VIEW.cx + r * Math.sin(angle))},${round(VIEW.cy - r * Math.cos(angle))}`;

    const [x1, y1] = at(MARK.inner).split(',');
    const [x2, y2] = at(MARK.outer).split(',');
    out += `<line class="sf-chart-gauge-mark" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"></line>`;
  }

  return `${out}</svg>`;
} // The linear form's band strip: the bands by their width on the scale, with
// the stretches no band covers left empty.


function bandsMarkup(model) {
  const {
    min,
    max,
    bands
  } = model;
  if (!bands.length) return '';
  const span = max - min;
  let out = '';
  let edge = min;

  for (const band of bands) {
    if (band.from > edge) out += `<span class="sf-chart-gauge-strip-part" style="flex-grow: ${share((band.from - edge) / span)}"></span>`;
    out += `<span class="sf-chart-gauge-strip-part sf-chart-gauge-band--${band.role}" style="flex-grow: ${share((band.to - band.from) / span)}"></span>`;
    edge = band.to;
  }

  if (edge < max) out += `<span class="sf-chart-gauge-strip-part" style="flex-grow: ${share((max - edge) / span)}"></span>`;
  return out;
}

function renderReading(context) {
  const {
    component,
    model,
    state
  } = context;
  const ready = state === 'ready';
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <span class="sf-chart-gauge-reading">
      <span class="sf-chart-gauge-value">${ready ? component.sayY(model.value) : component.words('gap')}</span>
      ${ready && model.band ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class=${`sf-chart-gauge-zone sf-chart-gauge-zone--${model.band.role}`}>${model.band.name}</span>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
    </span>
  `;
}

function renderEnds(context) {
  const {
    component,
    model
  } = context;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <span class="sf-chart-gauge-ends">
      <span class="sf-chart-gauge-end">${component.sayY(model.min)}</span>
      <span class="sf-chart-gauge-end">${component.sayY(model.max)}</span>
    </span>
  `;
}

function renderMeter(context) {
  const {
    component,
    model,
    state,
    uid,
    shape
  } = context;
  const ready = state === 'ready';
  const described = [context.summaryText ? `${uid}-summary` : '', context.hasDescription ? `${uid}-description` : ''].filter(Boolean).join(' ');
  const now = ready ? Math.max(model.min, Math.min(model.max, model.value)) : null;
  const style = [context.fill ? `--sf-chart-gauge--fill: ${esc(context.fill)}` : '', shape === 'linear' ? `--sf-chart-gauge--share: ${share(ready ? model.share : 0)}` : '', shape === 'linear' && model.target ? `--sf-chart-gauge--at: ${share(model.target.share)}` : ''].filter(Boolean).join('; ');
  const art = shape === 'arc' ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-chart-gauge-dial">
        <span class="sf-chart-gauge-arc" .innerHTML=${arcMarkup(model, ready)}></span>
        ${renderReading(context)}
      </span>` : (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`${renderReading(context)}
      <span class="sf-chart-gauge-bar">
        <span class="sf-chart-gauge-rail">${ready && model.share > 0 ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-chart-gauge-level"></span>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}</span>
        ${model.target ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-chart-gauge-tick"></span>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      </span>
      ${model.bands.length ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-chart-gauge-strip" .innerHTML=${bandsMarkup(model)}></span>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}`;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${`sf-chart-gauge-meter${state === 'loading' ? ' sf-chart-gauge-meter--loading' : ''}`}
         role=${state === 'loading' ? 'status' : 'meter'}
         aria-busy=${state === 'loading' ? 'true' : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
         aria-label=${state === 'loading' ? component.words('loading') : context.label}
         aria-valuemin=${state === 'loading' ? lit__WEBPACK_IMPORTED_MODULE_0__.nothing : String(model.min)}
         aria-valuemax=${state === 'loading' ? lit__WEBPACK_IMPORTED_MODULE_0__.nothing : String(model.max)}
         aria-valuenow=${now === null ? lit__WEBPACK_IMPORTED_MODULE_0__.nothing : String(now)}
         aria-valuetext=${ready ? component.valueText(model) : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
         aria-describedby=${described || lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
         style=${style || lit__WEBPACK_IMPORTED_MODULE_0__.nothing}>
      ${art}
      ${renderEnds(context)}
    </div>
    ${ready && model.target ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<p class="sf-chart-gauge-target"><span class="sf-chart-gauge-target-swatch" aria-hidden="true"></span>${component.words('target-line', {
    name: model.target.name,
    target: component.sayY(model.target.value)
  })}<span class="sf-chart-gauge-target-where">${component.words('target-where', {
    where: component.sayTarget(model)
  })}</span></p>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
  `;
} // The table is the settled copy of the data (chart-core/settle): it is
// rebuilt only when its key changes.


function renderTable(context) {
  const shownTable = context.table === 'visible' || context.table === 'toggle' && context.view === 'table';
  if (context.state !== 'ready') return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
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
  const model = context.tableData;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${shownTable ? 'sf-chart-gauge-table' : 'sf-chart-gauge-sr'}>
      <table>
        <caption>${label}</caption>
        <thead>
          <tr>
            <th scope="col">${component.words('what-column')}</th>
            <th scope="col">${component.words('value-column')}</th>
          </tr>
        </thead>
        <tbody>
          <tr><th scope="row">${label}</th><td>${component.sayY(model.value)}</td></tr>
          ${model.target ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<tr><th scope="row">${model.target.name}</th><td>${component.sayY(model.target.value)}</td></tr>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
          ${model.bands.map(band => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<tr><th scope="row">${band.name}</th><td>${component.sayRange(band)}</td></tr>`)}
        </tbody>
      </table>
    </div>
  `;
}

function renderPlot(context) {
  const {
    component,
    state
  } = context;

  if (state === 'empty' || state === 'error') {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
      <sf-empty-state class="sf-chart-gauge-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
        heading=${component.words(state === 'error' ? 'error-title' : 'empty-title')} text=""
        @sf-empty-state-action=${event => {
      event.stopPropagation();
      component.sfEmit('refresh', {});
    }}></sf-empty-state>
    `;
  }

  return renderMeter(context);
}

function renderGaugeTemplate(context) {
  const {
    component,
    uid,
    state,
    shape
  } = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <figure class=${['sf-chart-gauge', `sf-chart-gauge--size-${size}`, `sf-chart-gauge--${shape}`, `sf-chart-gauge--${state}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-chart-gauge-head">
        <span class="sf-chart-gauge-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.table === 'toggle' && state === 'ready' ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<button type="button" class="sf-chart-gauge-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      </figcaption>
      <div class="sf-chart-gauge-plot" ?hidden=${tableView}>${renderPlot(context)}</div>
      ${context.summaryText ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<p class="sf-chart-gauge-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      ${context.hasDescription ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-gauge-description" id=${`${uid}-description`}>${context.description}</div>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      ${renderTable(context)}
    </figure>
  `;
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "1e34599de468"
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "3de1fea7d4a8"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("chart/arc", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("chart/arc", 1).then(resolve, reject), { once: true })));

/***/ },

/***/ "8c84a9c1df25"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("chart/colors", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("chart/colors", 1).then(resolve, reject), { once: true })));

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

/***/ "b6c72114a0d4"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"id":"smart.chart-gauge","tag":"sf-chart-gauge","version":"0.1.1","kind":"leaf","settings":{"label":{"type":"string","default":""},"value":{"type":"number","optional":true},"min":{"type":"number","default":0},"max":{"type":"number","default":100},"bands":{"type":"list","default":[],"of":"object"},"target":{"type":"number","optional":true},"target-label":{"type":"string","default":""},"shape":{"type":"enum","values":["arc","linear"],"default":"arc"},"color":{"type":"string","default":""},"value-format":{"type":"string","default":"number"},"size":{"type":"enum","values":["1/2","1","2"],"default":"1"},"table":{"type":"enum","values":["toggle","visible","hidden"],"default":"hidden"},"summary":{"type":"enum","values":["auto","none"],"default":"auto"},"data-state":{"type":"enum","values":["auto","loading","ready","empty","error"],"default":"auto"}},"events":{"refresh":{"carries":{}}},"presentation":{"skeleton":{"late":["value"]}},"css-variables":{"--sf-chart-gauge-color":{"type":"color","state":"default"},"--sf-chart-gauge-track-color":{"type":"color","state":"default"},"--sf-chart-gauge-label-color":{"type":"color","state":"default"}}}');

/***/ },

/***/ "8d12eb963e74"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Gauge","runtime":{"untitled":"Gauge","gap":"no data","show-table":"Table","loading":"Loading the chart data","empty-title":"No data for the chart","error-title":"The data could not be loaded","target":"Target","target-line":"{name}: {target}","target-where":", {where}","above":"above by {by}","below":"below by {by}","at":"exactly","value-text":"{value}, {band}","zone-success":"Normal","zone-warning":"Warning","zone-error":"Critical","zone-other":"Zone {number}","range":"{from} – {to}","summary-value":"{value} on a scale from {min} to {max} ({share}).","summary-over":"{value}: above the scale, which ends at {max}.","summary-under":"{value}: below the scale, which starts at {min}.","summary-band":"Zone «{band}»: {range}.","summary-target":"{name} {target}: {where}.","value-column":"Value","what-column":"What"},"events":{"refresh":{"label":"Load the data again"}}}');

/***/ },

/***/ "1838f77a3f3f"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Шкала","runtime":{"untitled":"Шкала","gap":"нет данных","show-table":"Таблица","loading":"Загрузка данных диаграммы","empty-title":"Нет данных для диаграммы","error-title":"Не удалось загрузить данные","target":"Цель","target-line":"{name}: {target}","target-where":", {where}","above":"выше на {by}","below":"ниже на {by}","at":"ровно","value-text":"{value}, {band}","zone-success":"Норма","zone-warning":"Внимание","zone-error":"Критично","zone-other":"Зона {number}","range":"{from} – {to}","summary-value":"{value} на шкале от {min} до {max} ({share}).","summary-over":"{value}: выше шкалы, она кончается на {max}.","summary-under":"{value}: ниже шкалы, она начинается с {min}.","summary-band":"Зона «{band}»: {range}.","summary-target":"{name} {target}: {where}.","value-column":"Значение","what-column":"Что"},"events":{"refresh":{"label":"Загрузить данные заново"}}}');

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
/******/ 	let __webpack_exports__ = __webpack_require__("267a03b41e99");
/******/
/******/ })()
;