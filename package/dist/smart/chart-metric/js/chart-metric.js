/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "0859988450a2"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("deb1a4d61565");
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("5b7d7695b41b");
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("43090d1c8307");
/* harmony import */ var _chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("dd0c3978091b");
/* harmony import */ var _js_templates_default__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("0870a7fc4348");
/* harmony import */ var _component_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("5c308f665b3b");
/* harmony import */ var _lang_en_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("9e379715fe5d");
/* harmony import */ var _lang_ru_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("8883e224aaad");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__, _js_templates_default__WEBPACK_IMPORTED_MODULE_4__]);
([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__, _js_templates_default__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _chart_core_format_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__);
// sf-chart-metric: one number that matters, with its change, its limit and its
// status (docs/DECISIONS.md D1; docs/research/parameters.md §15). The
// catalogue's KPI and Larena's metric tile: server load, storage, traffic,
// queue depth, licence limits.
//
// The element formats the value (chart-core/format), works out the change
// from the previous value when the page gives no delta, and draws the limit
// as a meter with sf-progress-bar's look. The meaning of a change (is up
// good?) and the status are the page's; the tile never infers them.
//
// It renders into its own light DOM, like every Smart component.








const ChartMetricElement = (0,_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__.elementFromManifest)(_component_json__WEBPACK_IMPORTED_MODULE_5__, {
  base: (_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default()),
  lang: {
    en: _lang_en_json__WEBPACK_IMPORTED_MODULE_6__,
    ru: _lang_ru_json__WEBPACK_IMPORTED_MODULE_7__
  },
  source: 'ru'
});
let instances = 0;

class SfChartMetric extends ChartMetricElement {
  static get props() {
    return { ...super.props,
      rootClass: {
        default: ''
      }
    };
  }

  onConnected() {
    this._uid = this.id || `sf-chart-metric-${instances += 1}`;
  }

  words(key, vars) {
    return this.sfWord(key, vars ? {
      vars
    } : undefined);
  } // A number setting holds only when the page set it: an unset number reads 0.


  given(name, attribute) {
    return this.hasAttribute(attribute) && Number.isFinite(this[name]) ? this[name] : null;
  }

  state() {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return this.given('value', 'value') === null ? 'empty' : 'ready';
  }

  say(value, format = this.format) {
    return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatNumber)(value, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), format, {
      gap: this.words('no-value')
    });
  } // The change against the previous period: given as delta, or worked out
  // from previous. Its tone follows its meaning (better), not its sign.


  change(value) {
    const previous = this.given('previous', 'previous');
    let change = this.given('delta', 'delta');
    if (change === null && previous !== null && value !== null) change = value - previous;
    if (change === null) return null;
    const base = previous ?? (value !== null ? value - change : null);
    const share = base ? change / Math.abs(base) : null;
    const direction = change > 0 ? 'up' : change < 0 ? 'down' : 'flat';
    const tone = direction === 'flat' || this.better === 'none' ? 'neutral' : direction === this.better ? 'positive' : 'negative';
    const sign = change > 0 ? '+' : change < 0 ? '−' : '';
    const absolute = `${sign}${this.say(Math.abs(change))}`;
    const percent = share === null ? '' : `${sign}${(0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatNumber)(Math.abs(share), (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), 'percent')}`;
    const text = this.deltaFormat === 'absolute' || !percent ? absolute : this.deltaFormat === 'both' ? `${percent} (${absolute})` : percent;
    return {
      direction,
      tone,
      text,
      word: this.words(`change-${direction}`)
    };
  } // The limit as a meter: «45 ГБ из 100 ГБ», 45 %.


  meter(value) {
    const max = this.given('max', 'max');
    if (max === null || max <= 0 || value === null) return null;
    const text = this.limitText || this.words('limit', {
      value: this.say(value),
      max: this.say(max)
    });
    return {
      max,
      value: Math.max(0, Math.min(max, value)),
      percent: Math.round(Math.max(0, Math.min(1, value / max)) * 100),
      text,
      said: text,
      name: this.words('limit-name', {
        label: this.label || this.words('untitled')
      }),
      status: this.status
    };
  }

  open() {
    this.sfEmit('open', {});
  }

  templateContext() {
    const state = this.state();
    const value = state === 'ready' ? this.given('value', 'value') : null;
    const target = this.href ? 'link' : this.openable ? 'button' : '';
    return this.createTemplateContext({ ...this.getPropsContext(),
      component: this,
      uid: this._uid,
      size: this.size,
      state,
      target,
      href: this.href,
      label: this.label || this.words('untitled'),
      valueText: state === 'empty' ? this.words('no-value') : this.say(value),
      delta: state === 'ready' ? this.change(value) : null,
      periodText: this.periodText,
      meter: state === 'ready' ? this.meter(value) : null,
      status: this.status,
      statusWord: this.status === 'neutral' ? '' : this.words(`status-${this.status}`),
      hint: this.hint,
      hasChart: this.hasSlotContent?.('chart') ?? false,
      chart: this.hasSlotContent?.('chart') ? this.getSlotContent('chart') : null,
      rootClass: this.getRootClass()
    });
  }

  template() {
    return (0,_js_templates_default__WEBPACK_IMPORTED_MODULE_4__.renderChartMetricTemplate)(this.templateContext());
  }

}

SfChartMetric.define('sf-chart-metric');
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "0870a7fc4348"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderChartMetricTemplate: () => (/* binding */ renderChartMetricTemplate)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2a080a730149");
/* harmony import */ var _default_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("23347cc02e89");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([lit__WEBPACK_IMPORTED_MODULE_0__]);
var __webpack_async_dependencies_result__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_async_dependencies_result__[0];
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lit__WEBPACK_IMPORTED_MODULE_0__);

 // A metric tile: the label, the value, the change against a previous period,
// a limit as a meter, a status with a hint, and a chart from the page.
//
// The whole tile is one target when it has one: a link (href) or a button
// (openable), with no control inside it. Otherwise it is a group named by
// its label. Inside a button only phrasing content is allowed, so every
// part is a span laid out by CSS. The change says its direction in words as well as by an arrow
// and a tone, so colour is never the only sign.

const ARROWS = {
  up: '▲',
  down: '▼',
  flat: '–'
};

function renderDelta(context) {
  const {
    delta
  } = context;
  if (!delta) return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <span class="sf-chart-metric-delta">
      <span class=${`sf-chart-metric-change sf-chart-metric-change--${delta.tone}`}>
        <span class="sf-chart-metric-arrow" aria-hidden="true">${ARROWS[delta.direction]}</span>
        <span class="sf-chart-metric-sr">${delta.word}</span>
        <span class="sf-chart-metric-change-text">${delta.text}</span>
      </span>
      ${context.periodText ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-chart-metric-period">${context.periodText}</span>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
    </span>
  `;
}

function renderMeter(context) {
  const {
    meter
  } = context;
  if (!meter) return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <span class="sf-chart-metric-meter" role="meter" aria-label=${meter.name}
         aria-valuemin="0" aria-valuemax=${meter.max} aria-valuenow=${meter.value} aria-valuetext=${meter.said}>
      <sf-progress-bar class="sf-chart-metric-bar" aria-hidden="true" size="1/2" value=${meter.percent} status=${meter.status}></sf-progress-bar>
      <span class="sf-chart-metric-limit" aria-hidden="true">${meter.text}</span>
    </span>
  `;
}

function renderBody(context) {
  const {
    state,
    uid
  } = context;
  const loading = state === 'loading';
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <span class="sf-chart-metric-label" id=${`${uid}-label`}>${context.label}</span>
    <span class="sf-chart-metric-value" aria-hidden=${loading ? 'true' : 'false'}>
      ${loading ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-chart-metric-skeleton"></span>` : context.valueText}
    </span>
    ${loading ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-chart-metric-sr">${context.component.words('loading')}</span>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
    ${loading ? lit__WEBPACK_IMPORTED_MODULE_0__.nothing : renderDelta(context)}
    ${loading ? lit__WEBPACK_IMPORTED_MODULE_0__.nothing : renderMeter(context)}
    ${context.status !== 'neutral' || context.hint ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class=${`sf-chart-metric-status sf-chart-metric-status--${context.status}`}>
          <span class="sf-chart-metric-dot" aria-hidden="true"></span>
          <span class="sf-chart-metric-sr">${context.statusWord}</span>
          <span class="sf-chart-metric-hint">${context.hint}</span>
        </span>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
  `;
}

function renderChartMetricTemplate(context) {
  const {
    state,
    uid
  } = context;
  const size = String(context.size).replace('/', '-');
  const classes = ['sf-chart-metric', `sf-chart-metric--size-${size}`, `sf-chart-metric--${state}`, context.target ? 'sf-chart-metric--target' : '', context.rootClass].filter(Boolean).join(' ');
  const chart = (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-chart-metric-chart" ?hidden=${!context.hasChart}>${context.chart}</span>`;

  if (context.target === 'link') {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<a class=${classes} href=${context.href} aria-busy=${state === 'loading' ? 'true' : 'false'}>${renderBody(context)}${chart}</a>`;
  }

  if (context.target === 'button') {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<button type="button" class=${classes} aria-busy=${state === 'loading' ? 'true' : 'false'}
                        @click=${() => context.component.open()}>${renderBody(context)}${chart}</button>`;
  }

  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class=${classes} role="group" aria-labelledby=${`${uid}-label`} aria-busy=${state === 'loading' ? 'true' : 'false'}>${renderBody(context)}${chart}</div>`;
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "23347cc02e89"
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "dd0c3978091b"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("chart/format", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("chart/format", 1).then(resolve, reject), { once: true })));

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

/***/ "5c308f665b3b"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"id":"smart.chart-metric","tag":"sf-chart-metric","version":"0.1.1","kind":"leaf","settings":{"label":{"type":"string","default":""},"value":{"type":"number","optional":true},"format":{"type":"string","default":"number"},"previous":{"type":"number","optional":true},"delta":{"type":"number","optional":true},"delta-format":{"type":"enum","values":["percent","absolute","both"],"default":"percent"},"period-text":{"type":"string","default":""},"better":{"type":"enum","values":["up","down","none"],"default":"up"},"max":{"type":"number","optional":true},"limit-text":{"type":"string","default":""},"status":{"type":"enum","values":["neutral","success","warning","error","info"],"default":"neutral"},"hint":{"type":"string","default":""},"href":{"type":"string","default":""},"openable":{"type":"boolean","default":false},"size":{"type":"enum","values":["1/2","1","2"],"default":"1"},"data-state":{"type":"enum","values":["auto","loading","ready","empty"],"default":"auto"}},"events":{"open":{"carries":{}}},"presentation":{"skeleton":{"late":["value"]}},"css-variables":{"--sf-chart-metric-background-color":{"type":"color","state":"default"},"--sf-chart-metric-label-color":{"type":"color","state":"default"},"--sf-chart-metric-value-color":{"type":"color","state":"default"},"--sf-chart-metric-positive-color":{"type":"color","state":"default"},"--sf-chart-metric-negative-color":{"type":"color","state":"default"},"--sf-chart-metric-meter-color":{"type":"color","state":"default"},"--sf-chart-metric-hover-background-color":{"type":"color","state":"hover"},"--sf-chart-metric-min-inline-size":{"type":"length","state":"default"}}}');

/***/ },

/***/ "9e379715fe5d"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Metric","runtime":{"untitled":"Metric","no-value":"—","loading":"Loading the value","change-up":"up","change-down":"down","change-flat":"no change","limit":"{value} of {max}","limit-name":"{label}: limit","status-success":"Fine:","status-warning":"Warning:","status-error":"Error:","status-info":"Note:"},"events":{"open":{"label":"Open the details"}}}');

/***/ },

/***/ "8883e224aaad"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Показатель","runtime":{"untitled":"Показатель","no-value":"—","loading":"Загрузка значения","change-up":"рост","change-down":"снижение","change-flat":"без изменений","limit":"{value} из {max}","limit-name":"{label}: предел","status-success":"В норме:","status-warning":"Внимание:","status-error":"Ошибка:","status-info":"Сведения:"},"events":{"open":{"label":"Открыть подробности"}}}');

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
/******/ 	let __webpack_exports__ = __webpack_require__("0859988450a2");
/******/
/******/ })()
;