/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "15da3a0f21ba"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("deb1a4d61565");
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("5b7d7695b41b");
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("43090d1c8307");
/* harmony import */ var _chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("1a60ce635d04");
/* harmony import */ var _chart_core_scale_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("600acbab746d");
/* harmony import */ var _chart_core_format_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("dd0c3978091b");
/* harmony import */ var _chart_core_path_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("24a1ea97ab67");
/* harmony import */ var _chart_core_decimate_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("f7038b8b2d9b");
/* harmony import */ var _chart_core_describe_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("f7f6308dd740");
/* harmony import */ var _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("8c84a9c1df25");
/* harmony import */ var _js_templates_default__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("e972cc774aa0");
/* harmony import */ var _component_json__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("21f02c17368c");
/* harmony import */ var _lang_en_json__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("406eb884e0be");
/* harmony import */ var _lang_ru_json__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("e276fe7014fe");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__, _chart_core_scale_js__WEBPACK_IMPORTED_MODULE_4__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_5__, _chart_core_path_js__WEBPACK_IMPORTED_MODULE_6__, _chart_core_decimate_js__WEBPACK_IMPORTED_MODULE_7__, _chart_core_describe_js__WEBPACK_IMPORTED_MODULE_8__, _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_9__, _js_templates_default__WEBPACK_IMPORTED_MODULE_10__]);
([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__, _chart_core_scale_js__WEBPACK_IMPORTED_MODULE_4__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_5__, _chart_core_path_js__WEBPACK_IMPORTED_MODULE_6__, _chart_core_decimate_js__WEBPACK_IMPORTED_MODULE_7__, _chart_core_describe_js__WEBPACK_IMPORTED_MODULE_8__, _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_9__, _js_templates_default__WEBPACK_IMPORTED_MODULE_10__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _chart_core_data_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _chart_core_scale_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _chart_core_format_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_chart_core_format_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _chart_core_path_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_chart_core_path_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _chart_core_decimate_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_chart_core_decimate_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _chart_core_describe_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_chart_core_describe_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_9__);
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













 // Room kept at the top and the bottom for the line's width and the marks.

const INSET = {
  '1/2': 2,
  1: 3,
  2: 4
};
const RADIUS = {
  '1/2': 1.75,
  1: 2.5,
  2: 3
};
const ChartSparklineElement = (0,_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__.elementFromManifest)(_component_json__WEBPACK_IMPORTED_MODULE_11__, {
  base: (_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default()),
  lang: {
    en: _lang_en_json__WEBPACK_IMPORTED_MODULE_12__,
    ru: _lang_ru_json__WEBPACK_IMPORTED_MODULE_13__
  },
  source: 'ru'
});

class SfChartSparkline extends ChartSparklineElement {
  static get props() {
    return { ...super.props,
      rootClass: {
        default: ''
      }
    };
  }

  onConnected() {
    this._box = this._box ?? {
      width: 0,
      height: 0
    };
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
        this._box = {
          width,
          height
        };
        this.requestComponentUpdate('box');
      });

      this._observer.observe(box);
    }

    const own = this.colour();

    if (own !== this._colourChecked && this.isConnected) {
      this._colourChecked = own;
      if (own) (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_9__.checkContrast)(this, new Map([['color', own]]), 'sf-chart-sparkline');
    }

    return undefined;
  } // The page's own colour (the color setting: a Framework role or a CSS
  // colour, chart-core/colors), '' when unset or not a colour.


  colour() {
    if (this.color !== this._colourRaw) {
      this._colourRaw = this.color;
      this._colour = (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_9__.colourValue)(this.color);
      if (this.color && !this._colour) console.warn(`<sf-chart-sparkline> color «${this.color}» is neither a Framework role nor a CSS colour`);
    }

    return this._colour || '';
  }

  words(key, vars) {
    return this.sfWord(key, vars ? {
      vars
    } : undefined);
  } // One series. A list of plain numbers is its own order.


  model() {
    const key = [this.items, this.x, this.y];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;
    const items = Array.isArray(this.items) && this.items.length && this.items.every(one => one === null || typeof one !== 'object') ? this.items.map((value, index) => ({
      index,
      value
    })) : this.items;
    const read = (0,_chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__.readSeries)(items, {
      x: this.x,
      y: this.y.split(',')[0].trim()
    });
    this._model = { ...read,
      series: read.series.slice(0, 1)
    };
    return this._model;
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.series[0]?.values.some(value => value !== null) ? 'ready' : 'empty';
  }

  sayY(value) {
    return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_5__.formatNumber)(value, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.yFormat, {
      gap: this.words('no-data')
    });
  }

  geometry(model, state) {
    const {
      width,
      height
    } = this._box;
    if (!width || !height) return null;
    if (state === 'empty') return {
      width,
      height,
      empty: true
    };
    if (state !== 'ready') return null;
    const values = model.series[0].values;
    const count = values.length;
    const inset = INSET[this.size] ?? 3;
    const radius = RADIUS[this.size] ?? 2.5;
    const bar = this.shape === 'bar';
    let [low, high] = (0,_chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__.extent)(model.series) ?? [0, 1];

    if (bar || this.yZero) {
      low = Math.min(low, 0);
      high = Math.max(high, 0);
    }

    if (low === high) {
      low -= 1;
      high += 1;
    }

    const y = (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_4__.linearScale)([low, high], [height - inset, inset]);
    const facts = (0,_chart_core_describe_js__WEBPACK_IMPORTED_MODULE_8__.seriesFacts)(values);
    const marked = new Set();
    if (this.mark === 'last') marked.add(facts.last);

    if (this.mark === 'extremes') {
      marked.add(facts.maxAt);
      marked.add(facts.minAt);
    }

    if (bar) {
      const band = (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_4__.bandScale)(count, [0, width], {
        padding: count > width / 3 ? 0 : 0.25
      });
      const zero = y(0);
      const bars = [];
      values.forEach((value, index) => {
        if (value === null) return;
        const top = Math.min(zero, y(value)); // A zero still shows as a hairline, so the bar is seen to be there.

        bars.push({
          x: band.at(index),
          width: Math.max(1, band.width),
          y: top,
          height: Math.max(1, Math.abs(y(value) - zero)),
          marked: marked.has(index)
        });
      });
      return {
        width,
        height,
        bars
      };
    } // Marks sit inside the box: the line runs between the marks' radii.


    const x = (0,_chart_core_scale_js__WEBPACK_IMPORTED_MODULE_4__.linearScale)([0, Math.max(1, count - 1)], [radius + 1, width - radius - 1]);
    const pxs = values.map((_, index) => x(index));
    const keep = (0,_chart_core_decimate_js__WEBPACK_IMPORTED_MODULE_7__.minMaxIndexes)(pxs, values, width) ?? values.map((_, index) => index);
    const points = keep.map(index => values[index] === null ? null : [pxs[index], y(values[index])]);
    const ground = y(Math.max(low, Math.min(high, 0)));
    return {
      width,
      height,
      radius,
      d: (0,_chart_core_path_js__WEBPACK_IMPORTED_MODULE_6__.linePath)(points, {
        curve: this.curve
      }),
      area: this.shape === 'area' ? (0,_chart_core_path_js__WEBPACK_IMPORTED_MODULE_6__.areaPath)(points, ground, {
        curve: this.curve
      }) : '',
      marks: [...marked].filter(index => index >= 0 && values[index] !== null).map(index => [pxs[index], y(values[index])])
    };
  } // The accessible name: the label, then what the data does.


  accessibleName(model, state) {
    const label = this.label || this.words('untitled');
    if (state === 'loading') return this.words('name', {
      label,
      summary: this.words('loading')
    });
    if (state === 'empty') return this.words('name', {
      label,
      summary: this.words('no-data')
    });
    if (this.summary === 'none') return label;
    const values = model.series[0].values;
    const facts = (0,_chart_core_describe_js__WEBPACK_IMPORTED_MODULE_8__.seriesFacts)(values);
    const summary = facts.count === 1 ? this.words('summary-one', {
      value: this.sayY(values[facts.first])
    }) : this.words('summary', {
      first: this.sayY(values[facts.first]),
      last: this.sayY(values[facts.last]),
      max: this.sayY(facts.max),
      min: this.sayY(facts.min)
    });
    return this.words('name', {
      label,
      summary
    });
  }

  templateContext() {
    const model = this.model();
    const state = this.state(model);
    return this.createTemplateContext({ ...this.getPropsContext(),
      component: this,
      size: this.size,
      shape: this.shape,
      state,
      geometry: this.geometry(model, state),
      name: this.accessibleName(model, state),
      paint: this.colour(),
      rootClass: this.getRootClass()
    });
  }

  template() {
    return (0,_js_templates_default__WEBPACK_IMPORTED_MODULE_10__.renderChartSparklineTemplate)(this.templateContext());
  }

}

SfChartSparkline.define('sf-chart-sparkline');
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "e972cc774aa0"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderChartSparklineTemplate: () => (/* binding */ renderChartSparklineTemplate)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2a080a730149");
/* harmony import */ var _default_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("009b0d2c6bad");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([lit__WEBPACK_IMPORTED_MODULE_0__]);
var __webpack_async_dependencies_result__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_async_dependencies_result__[0];
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lit__WEBPACK_IMPORTED_MODULE_0__);

 // A sparkline: one SVG image named by the label and a sentence of the data.
// The inside is markup set as the svg element's innerHTML (a property, so
// lit writes no part markers there and a first-paint snapshot is stable).
// A page's own colour (the color setting) is a variable in a style.

const px = value => `${Math.round(value * 10) / 10}`;

function marksMarkup(g) {
  if (!g) return '';
  if (g.empty) return `<line class="sf-chart-sparkline-empty" x1="0" x2="${px(g.width)}" y1="${px(g.height / 2)}" y2="${px(g.height / 2)}"/>`;
  let out = '';

  if (g.bars) {
    for (const bar of g.bars) {
      out += `<rect class="sf-chart-sparkline-bar${bar.marked ? ' sf-chart-sparkline-bar--mark' : ''}" x="${px(bar.x)}" y="${px(bar.y)}" width="${px(bar.width)}" height="${px(bar.height)}"/>`;
    }

    return out;
  }

  if (g.area) out += `<path class="sf-chart-sparkline-area" d="${g.area}"/>`;
  out += `<path class="sf-chart-sparkline-line" d="${g.d}"/>`;

  for (const [x, y] of g.marks) out += `<circle class="sf-chart-sparkline-mark" cx="${px(x)}" cy="${px(y)}" r="${px(g.radius)}"/>`;

  return out;
}

function renderChartSparklineTemplate(context) {
  const {
    state,
    geometry: g,
    name
  } = context;
  const size = String(context.size).replace('/', '-');
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <span class=${['sf-chart-sparkline', `sf-chart-sparkline--size-${size}`, `sf-chart-sparkline--${state}`, `sf-chart-sparkline--${context.shape}`, context.rootClass].filter(Boolean).join(' ')}
          style=${context.paint ? `--sf-chart-sparkline--own: ${context.paint}` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
          role="img" aria-label=${name} aria-busy=${state === 'loading' ? 'true' : 'false'}>
      <svg class="sf-chart-sparkline-svg" aria-hidden="true" focusable="false"
           width=${g ? g.width : 0} height=${g ? g.height : 0} viewBox=${g ? `0 0 ${g.width} ${g.height}` : '0 0 0 0'}
           .innerHTML=${marksMarkup(g)}></svg>
    </span>
  `;
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "009b0d2c6bad"
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "8c84a9c1df25"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("chart/colors", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("chart/colors", 1).then(resolve, reject), { once: true })));

/***/ },

/***/ "1a60ce635d04"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("chart/data", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("chart/data", 1).then(resolve, reject), { once: true })));

/***/ },

/***/ "f7038b8b2d9b"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("chart/decimate", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("chart/decimate", 1).then(resolve, reject), { once: true })));

/***/ },

/***/ "f7f6308dd740"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("chart/describe", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("chart/describe", 1).then(resolve, reject), { once: true })));

/***/ },

/***/ "dd0c3978091b"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("chart/format", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("chart/format", 1).then(resolve, reject), { once: true })));

/***/ },

/***/ "24a1ea97ab67"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("chart/path", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("chart/path", 1).then(resolve, reject), { once: true })));

/***/ },

/***/ "600acbab746d"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("chart/scale", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("chart/scale", 1).then(resolve, reject), { once: true })));

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

/***/ "21f02c17368c"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"id":"smart.chart-sparkline","tag":"sf-chart-sparkline","version":"0.2.1","kind":"leaf","settings":{"label":{"type":"string","default":""},"items":{"type":"list","default":[],"of":"any"},"x":{"type":"string","default":""},"y":{"type":"string","default":""},"shape":{"type":"enum","values":["line","area","bar"],"default":"line"},"curve":{"type":"enum","values":["linear","step","smooth"],"default":"linear"},"mark":{"type":"enum","values":["last","extremes","none"],"default":"last"},"color":{"type":"string","default":""},"y-zero":{"type":"boolean","default":false},"y-format":{"type":"string","default":"number"},"size":{"type":"enum","values":["1/2","1","2"],"default":"1"},"summary":{"type":"enum","values":["auto","none"],"default":"auto"},"data-state":{"type":"enum","values":["auto","loading","ready","empty"],"default":"auto"}},"presentation":{"skeleton":{"late":["items"]}},"css-variables":{"--sf-chart-sparkline-width":{"type":"length","state":"default"},"--sf-chart-sparkline-height":{"type":"length","state":"default"},"--sf-chart-sparkline-color":{"type":"color","state":"default"},"--sf-chart-sparkline-mark-color":{"type":"color","state":"default"},"--sf-chart-sparkline-line-width":{"type":"length","state":"default"}}}');

/***/ },

/***/ "406eb884e0be"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Sparkline","runtime":{"untitled":"Sparkline","name":"{label}: {summary}","summary":"from {first} to {last}, highest {max}, lowest {min}","summary-one":"{value}","no-data":"no data","loading":"loading"}}');

/***/ },

/***/ "e276fe7014fe"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Мини-график","runtime":{"untitled":"Мини-график","name":"{label}: {summary}","summary":"от {first} до {last}, наибольшее {max}, наименьшее {min}","summary-one":"{value}","no-data":"нет данных","loading":"загрузка"}}');

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
/******/ 	let __webpack_exports__ = __webpack_require__("15da3a0f21ba");
/******/
/******/ })()
;