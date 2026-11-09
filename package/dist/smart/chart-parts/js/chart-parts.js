/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "278aa388a906"
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
/* harmony import */ var _chart_core_palettes_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("a128d5f62041");
/* harmony import */ var _js_templates_default__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("84cb6d08fbad");
/* harmony import */ var _component_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("77cd876e816d");
/* harmony import */ var _lang_en_json__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("5cecf2e97bae");
/* harmony import */ var _lang_ru_json__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("7ee71363c4cc");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__, _chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_5__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_6__, _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7__, _chart_core_palettes_js__WEBPACK_IMPORTED_MODULE_8__, _js_templates_default__WEBPACK_IMPORTED_MODULE_9__]);
([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__, _chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_5__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_6__, _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7__, _chart_core_palettes_js__WEBPACK_IMPORTED_MODULE_8__, _js_templates_default__WEBPACK_IMPORTED_MODULE_9__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _chart_core_data_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _chart_core_format_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_chart_core_settle_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _chart_core_palettes_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_chart_core_palettes_js__WEBPACK_IMPORTED_MODULE_8__);
// sf-chart-parts: the parts of one whole as one thin bar split into shares,
// with the free remainder of a capacity when max is set (docs/DECISIONS.md
// D2): what fills a disk, a quota or a model's context.
//
// The element reads its data once into parts (chart-core/data), folds the
// smallest into «Другое» past max-parts, and draws the bar as HTML boxes
// that share its width by their values, so the bar needs no measured width
// and its first paint is the drawn bar. A person reaches the bar with one
// Tab stop and walks the parts with the arrows (chart-core/cursor); every
// move is said in a polite live region, the whole in a summary sentence, and
// the same data is a table on request.
//
// It renders into its own light DOM, like every Smart component.













const OTHER = '\u0000other';
const FREE = '\u0000free';
const ChartPartsElement = (0,_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__.elementFromManifest)(_component_json__WEBPACK_IMPORTED_MODULE_10__, {
  base: (_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default()),
  lang: {
    en: _lang_en_json__WEBPACK_IMPORTED_MODULE_11__,
    ru: _lang_ru_json__WEBPACK_IMPORTED_MODULE_12__
  },
  source: 'ru'
});
let instances = 0;

class SfPartsBar extends ChartPartsElement {
  static get props() {
    return { ...super.props,
      rootClass: {
        default: ''
      }
    };
  }

  onConnected() {
    this._uid = this.id || `sf-chart-parts-${instances += 1}`;
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
    const colours = this.colours();
    const checked = (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7__.coloursKey)(colours);

    if (checked !== this._coloursChecked && this.isConnected) {
      this._coloursChecked = checked;
      (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7__.checkContrast)(this, colours, 'sf-chart-parts');
    }

    return undefined;
  } // The page's own colours by key (chart-core/colors), read again only when
  // the setting changes.


  colours() {
    if (this.colors !== this._coloursRaw || !this._colours) {
      this._coloursRaw = this.colors;
      this._colours = (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_7__.readColours)(this.colors, said => console.warn(`<sf-chart-parts> ${said}`));
    }

    return this._colours;
  } // Each part's colour by key: the page's own (colors) or the named
  // palette's by place (chart-core/palettes, D7). With neither, the template
  // keeps the theme's colours.


  paints(list) {
    const own = this.colours();
    const set = _chart_core_palettes_js__WEBPACK_IMPORTED_MODULE_8__.PALETTES[this.palette];
    if (!set) return own;
    const out = new Map(own);
    list.forEach((one, place) => {
      if (!out.has(one.key)) out.set(one.key, set[place % set.length]);
    });
    return out;
  }

  words(key, vars) {
    return this.sfWord(key, vars ? {
      vars
    } : undefined);
  } // The capacity holds only when it is a positive number: an unset number
  // reads 0, and a capacity of nothing has no remainder.


  capacity() {
    return Number.isFinite(this.max) && this.max > 0 ? this.max : null;
  } // The data as rows (every category, as given) and parts (what the bar is
  // made of): past max-parts the smallest positive rows fold into one «Другое».


  model() {
    const key = [this.items, this.names, this.category, this.value, this.maxParts];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;
    const read = (0,_chart_core_data_js__WEBPACK_IMPORTED_MODULE_3__.readSeries)(this.items, {
      x: this.category,
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
    const positive = rows.filter(row => row.value !== null && row.value > 0);
    const most = Math.max(2, Number.isFinite(this.maxParts) && this.maxParts > 0 ? Math.floor(this.maxParts) : 7);
    let parts = positive;

    if (positive.length > most) {
      const kept = new Set([...positive].sort((a, b) => b.value - a.value).slice(0, most - 1).map(row => row.index));
      const rest = positive.filter(row => !kept.has(row.index));
      parts = [...positive.filter(row => kept.has(row.index)), {
        key: OTHER,
        name: this.words('other'),
        value: rest.reduce((sum, row) => sum + row.value, 0),
        index: -1,
        folded: rest.length
      }];
    }

    this._model = {
      kind: read.kind,
      categoryField: read.xField,
      valueField: one?.key ?? '',
      rows,
      parts
    };
    return this._model;
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.parts.length ? 'ready' : 'empty';
  } // The whole the shares are of: the capacity, or the sum of the parts when
  // there is none or the parts exceed it.


  whole(parts) {
    const used = parts.reduce((sum, part) => sum + part.value, 0);
    const max = this.capacity();
    return {
      used,
      max,
      whole: max !== null && max > used ? max : used,
      free: max !== null && max > used ? max - used : 0,
      over: max !== null && used > max ? used - max : 0
    };
  } // The bar's parts in order, the free remainder last, each with its share.


  segments(model) {
    const sum = this.whole(model.parts);
    const out = model.parts.map(part => ({ ...part,
      share: sum.whole ? part.value / sum.whole : 0
    }));
    if (sum.free > 0) out.push({
      key: FREE,
      name: this.freeLabel || this.words('free'),
      value: sum.free,
      index: -2,
      free: true,
      share: sum.free / sum.whole
    });
    return out.map((part, place) => ({ ...part,
      place
    }));
  }

  sayY(value) {
    return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(value, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.valueFormat, {
      gap: this.words('gap')
    });
  }

  sayShare(share) {
    return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(share, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), 'percent');
  }

  sayPart(part) {
    return this.words('part', {
      value: this.sayY(part.value),
      share: this.sayShare(part.share)
    });
  }

  head(sum) {
    if (this.total === 'none') return '';
    if (sum.max === null) return this.words('head-total', {
      total: this.sayY(sum.used)
    });
    return this.words('head-used', {
      used: this.sayY(sum.used),
      max: this.sayY(sum.max),
      share: this.sayShare(sum.used / sum.max)
    });
  }

  summarize(model, segments) {
    if (this.summary === 'none') return '';
    const sum = this.whole(model.parts);
    const out = [];
    if (sum.max === null) out.push(this.words('summary-total', {
      count: model.parts.length,
      total: this.sayY(sum.used)
    }));else if (sum.over) out.push(this.words('summary-over', {
      used: this.sayY(sum.used),
      max: this.sayY(sum.max),
      over: this.sayY(sum.over)
    }));else out.push(this.words('summary-used', {
      used: this.sayY(sum.used),
      max: this.sayY(sum.max),
      share: this.sayShare(sum.used / sum.max)
    }));
    const parts = segments.filter(part => !part.free);

    for (const part of [...parts].sort((a, b) => b.value - a.value)) out.push(this.words('summary-part', {
      name: part.name,
      part: this.sayPart(part)
    }));

    const free = segments.find(part => part.free);
    if (free) out.push(this.words('summary-part', {
      name: free.name,
      part: this.sayPart(free)
    }));
    return out.join(' ');
  }

  cursorLine(segments, cursor) {
    const part = segments[cursor.index];
    return part ? this.words('cursor', {
      name: part.name,
      part: this.sayPart(part)
    }) : '';
  }

  setCursor(cursor, {
    say = false
  } = {}) {
    this._cursor = cursor;
    if (say && cursor) this._said = this.cursorLine(this.segments(this.model()), cursor);
    this.requestComponentUpdate('cursor');
  } // The arrows walk the bar in its reading direction: Right and Down to the
  // next part (Right goes left on a right-to-left page), Left and Up back;
  // Home and End go to the first and the last, the free remainder included.


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

    const count = this.segments(this.model()).length;
    if (!count) return;
    const rtl = this.matches(':dir(rtl)');
    const flat = {
      ArrowUp: 'ArrowLeft',
      ArrowDown: 'ArrowRight',
      ...(rtl ? {
        ArrowLeft: 'ArrowRight',
        ArrowRight: 'ArrowLeft'
      } : {})
    }[event.key] ?? event.key;
    const moved = (0,_chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_5__.moveCursor)(this._cursor, flat, {
      count,
      shown: ['part']
    });
    if (!moved) return;
    event.preventDefault();
    this.setCursor(moved, {
      say: true
    });
  }

  pointAt(event) {
    const box = event.target.closest?.('[data-place]');
    return box ? {
      index: Number(box.dataset.place),
      series: 'part'
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
  } // select carries the part as the data gave it: its category as x, its
  // index among the rows (-1 for «Другое»), its value. The free remainder is
  // not a part of the data, so it is not chosen.


  choose(cursor) {
    const model = this.model();
    const part = this.segments(model)[cursor.index];
    if (!part || part.free) return;
    this.sfEmit('select', {
      series: model.valueField,
      index: part.index,
      x: part.key === OTHER ? '' : part.key,
      value: part.value
    });
  }

  toggleView() {
    this._view = this._view === 'table' ? 'chart' : 'table';
    this.requestComponentUpdate('view');
  }

  templateContext() {
    const model = this.model();
    const state = this.state(model);
    const segments = this.segments(model);
    const cursor = this._cursor && segments[this._cursor.index] ? this._cursor : null;
    const tableModel = this.tableModel(model, state === 'ready');
    const sum = this.whole(tableModel.parts);
    const rows = tableModel.rows.map(row => ({ ...row,
      share: row.value !== null && row.value > 0 && sum.whole ? row.value / sum.whole : null
    }));
    if (sum.max !== null) rows.push({
      key: FREE,
      name: this.freeLabel || this.words('free'),
      value: sum.free,
      share: sum.whole ? sum.free / sum.whole : null,
      free: true
    });
    return this.createTemplateContext({ ...this.getPropsContext(),
      component: this,
      uid: this._uid,
      size: this.size,
      label: this.label || this.words('untitled'),
      state,
      model,
      segments,
      head: state === 'ready' ? this.head(this.whole(model.parts)) : '',
      tableKey: [tableModel, this.max, this.freeLabel, this.label, this.categoryLabel, this.valueLabel, this.valueFormat, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.table, this.table === 'toggle' ? this._view : 'chart'],
      rows,
      cursor,
      said: this._said,
      view: this.table === 'toggle' ? this._view : 'chart',
      legend: this.legend,
      categoryLabel: this.categoryLabel || model.categoryField || this.words('category-column'),
      valueLabel: this.valueLabel || model.valueField || this.words('value-column'),
      summaryText: state === 'ready' ? this.summarize(model, segments) : '',
      hasDescription: this.hasSlotContent?.('description') ?? false,
      description: this.hasSlotContent?.('description') ? this.getSlotContent('description') : null,
      paint: this.paints(model?.parts ?? []),
      rootClass: this.getRootClass()
    });
  } // The data the table shows: settled, so a stream or a pointer move does
  // not rebuild a row per part on every render (chart-core/settle).
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
    return (0,_js_templates_default__WEBPACK_IMPORTED_MODULE_9__.renderPartsBarTemplate)(this.templateContext());
  }

}

SfPartsBar.define('sf-chart-parts');
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "84cb6d08fbad"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderPartsBarTemplate: () => (/* binding */ renderPartsBarTemplate)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2a080a730149");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("297fd25a909a");
/* harmony import */ var _default_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("7fbabb317fd0");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([lit__WEBPACK_IMPORTED_MODULE_0__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__]);
([lit__WEBPACK_IMPORTED_MODULE_0__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__);


 // The figure of a parts bar: the label with the whole and the table button,
// the bar, the list of the parts under it, the summary and the description,
// the live line, and the same data as a table.
//
// The bar is one Tab stop, a role="group" named by the label and described
// by the summary; its parts are aria-hidden, because the summary, the live
// line, the list and the table say what they show. A colour is a class
// (--c1..--c4, then lighter --t2); the order and a separator tell the parts
// apart as well, and the free remainder is a neutral track. A page's own
// colour (the colors setting, by the category) is --custom with its value in
// a style; the free remainder keeps its own variable.

const paintOf = paint => paint ? `--sf-chart-parts--custom: ${paint}` : '';

const colourOf = (part, paint) => part.free ? 'sf-chart-parts-series--free' : paint ? 'sf-chart-parts-series--custom' : `sf-chart-parts-series--c${part.place % 4 + 1}${part.place >= 4 ? ' sf-chart-parts-series--t2' : ''}`;

const grow = share => `${Math.round(share * 10000) / 10000}`; // A page's colour is checked to be a colour (chart-core/colors), and escaped
// all the same, since it is written into markup.


const ESCAPES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

const esc = value => String(value).replace(/[&<>"']/gu, one => ESCAPES[one]); // The bar's inside is markup set as the element's innerHTML (a property, so
// lit writes no part markers inside it: a first-paint snapshot of the bar is
// the same on every run). Every part shares the width by its value.


function partsMarkup(segments, cursor, paint) {
  let out = '';

  for (const part of segments) {
    const dim = cursor && cursor.index !== part.place ? ' sf-chart-parts-part--dim' : '';
    const current = cursor && cursor.index === part.place ? ' sf-chart-parts-part--current' : '';
    const own = part.free ? '' : paint.get(part.key);
    out += `<span class="sf-chart-parts-part ${colourOf(part, own)}${dim}${current}" data-place="${part.place}" style="flex-grow: ${grow(part.share)}${own ? `; ${esc(paintOf(own))}` : ''}"></span>`;
  }

  return out;
} // The tooltip stands under the part's middle, kept inside the bar at its ends.


function renderTooltip(context, cursor) {
  if (!cursor || context.tooltip === 'none') return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const {
    component,
    segments
  } = context;
  const part = segments[cursor.index];
  if (!part) return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const before = segments.slice(0, cursor.index).reduce((sum, one) => sum + one.share, 0);
  const middle = (before + part.share / 2) * 100;
  const align = middle < 20 ? 'start' : middle > 80 ? 'end' : 'middle';
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${`sf-chart-parts-tooltip sf-chart-parts-tooltip--${align}`} aria-hidden="true"
         style=${`inset-inline-start: ${Math.round(middle * 10) / 10}%`}>
      <div class=${`sf-chart-parts-tooltip-row ${colourOf(part, part.free ? '' : context.paint.get(part.key))}`}
           style=${!part.free && paintOf(context.paint.get(part.key)) || lit__WEBPACK_IMPORTED_MODULE_0__.nothing}>
        <span class="sf-chart-parts-swatch"></span>
        <span class="sf-chart-parts-tooltip-name">${part.name}</span>
        <span class="sf-chart-parts-tooltip-value">${component.sayPart(part)}</span>
      </div>
    </div>
  `;
}

function renderLegend(context) {
  if (context.legend === 'none' || context.state !== 'ready') return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const {
    component,
    segments
  } = context;
  const inline = context.legend === 'inline';
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <ul class=${`sf-chart-parts-list${inline ? ' sf-chart-parts-list--inline' : ''}`} aria-label=${component.words('legend')}>
      ${segments.map(part => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <li class=${`sf-chart-parts-item ${colourOf(part, part.free ? '' : context.paint.get(part.key))}`}
            style=${!part.free && paintOf(context.paint.get(part.key)) || lit__WEBPACK_IMPORTED_MODULE_0__.nothing}>
          <span class="sf-chart-parts-swatch" aria-hidden="true"></span>
          <span class="sf-chart-parts-item-name">${part.name}</span>
          ${inline ? lit__WEBPACK_IMPORTED_MODULE_0__.nothing : (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-chart-parts-item-value">${component.sayY(part.value)}</span>`}
          <span class="sf-chart-parts-item-share">${component.sayShare(part.share)}</span>
        </li>
      `)}
    </ul>
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
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${shownTable ? 'sf-chart-parts-table' : 'sf-chart-parts-sr'}>
      <table>
        <caption>${label}</caption>
        <thead>
          <tr>
            <th scope="col">${context.categoryLabel}</th>
            <th scope="col">${context.valueLabel}</th>
            <th scope="col">${component.words('share-column')}</th>
          </tr>
        </thead>
        <tbody>
          ${context.rows.map(row => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
            <tr class=${row.free ? 'sf-chart-parts-table-free' : ''}>
              <th scope="row">${row.name}</th>
              <td>${component.sayY(row.value)}</td>
              <td>${row.share === null ? component.words('gap') : component.sayShare(row.share)}</td>
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
    segments,
    uid,
    state,
    cursor
  } = context;

  if (state === 'loading') {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-parts-track sf-chart-parts-track--loading" role="status" aria-busy="true"><span class="sf-chart-parts-sr">${component.words('loading')}</span></div>`;
  }

  if (state === 'empty' || state === 'error') {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
      <sf-empty-state class="sf-chart-parts-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
        heading=${component.words(state === 'error' ? 'error-title' : 'empty-title')} text=""
        @sf-empty-state-action=${event => {
      event.stopPropagation();
      component.sfEmit('refresh', {});
    }}></sf-empty-state>
    `;
  }

  const described = [context.summaryText ? `${uid}-summary` : '', context.hasDescription ? `${uid}-description` : ''].filter(Boolean).join(' ');
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class="sf-chart-parts-track" role="group" tabindex="0"
         aria-label=${context.label} aria-roledescription=${component.words('roledescription')}
         aria-describedby=${described || lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
         @keydown=${event => component.onPlotKey(event)}
         @pointermove=${event => component.onPointerMove(event)}
         @pointerleave=${() => component.onPointerLeave()}
         @click=${event => component.onPlotClick(event)}
         @blur=${() => component.setCursor(null)}
         .innerHTML=${partsMarkup(segments, cursor, context.paint)}></div>
    ${renderTooltip(context, cursor)}
  `;
}

function renderPartsBarTemplate(context) {
  const {
    component,
    uid,
    state
  } = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <figure class=${['sf-chart-parts', `sf-chart-parts--size-${size}`, `sf-chart-parts--${state}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-chart-parts-head">
        <span class="sf-chart-parts-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.head ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-chart-parts-whole">${context.head}</span>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
        ${context.table === 'toggle' && state === 'ready' ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<button type="button" class="sf-chart-parts-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      </figcaption>
      <div class="sf-chart-parts-layout" ?hidden=${tableView}>
        <div class="sf-chart-parts-plot">${renderPlot(context)}</div>
        ${renderLegend(context)}
      </div>
      ${context.summaryText ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<p class="sf-chart-parts-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      ${context.hasDescription ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-parts-description" id=${`${uid}-description`}>${context.description}</div>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      <div class="sf-chart-parts-sr" aria-live="polite">${context.said}</div>
      ${renderTable(context)}
    </figure>
  `;
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "7fbabb317fd0"
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

/***/ "a128d5f62041"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("chart/palettes", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("chart/palettes", 1).then(resolve, reject), { once: true })));

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

/***/ "77cd876e816d"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"id":"smart.chart-parts","tag":"sf-chart-parts","version":"0.3.1","kind":"leaf","settings":{"label":{"type":"string","default":""},"items":{"type":"list","default":[],"of":"object"},"names":{"type":"object","default":{}},"colors":{"type":"object","default":{}},"palette":{"type":"enum","values":["theme","vivid","soft","warm","cool","brand"],"default":"theme"},"category":{"type":"string","default":""},"value":{"type":"string","default":""},"max":{"type":"number","optional":true},"free-label":{"type":"string","default":""},"max-parts":{"type":"number","default":7},"total":{"type":"enum","values":["auto","none"],"default":"auto"},"legend":{"type":"enum","values":["list","inline","none"],"default":"list"},"tooltip":{"type":"enum","values":["part","none"],"default":"part"},"category-label":{"type":"string","default":""},"value-label":{"type":"string","default":""},"value-format":{"type":"string","default":"number"},"size":{"type":"enum","values":["1/2","1","2"],"default":"1"},"table":{"type":"enum","values":["toggle","visible","hidden"],"default":"toggle"},"summary":{"type":"enum","values":["auto","none"],"default":"auto"},"data-state":{"type":"enum","values":["auto","loading","ready","empty","error"],"default":"auto"}},"events":{"select":{"carries":{"series":"string","index":"number","x":"string","value":"number"}},"refresh":{"carries":{}}},"presentation":{"skeleton":{"late":["items"]}},"css-variables":{"--sf-chart-parts-thickness":{"type":"length","state":"default"},"--sf-chart-parts-free-color":{"type":"color","state":"default"},"--sf-chart-parts-label-color":{"type":"color","state":"default"},"--sf-chart-parts-gap-width":{"type":"length","state":"default"}}}');

/***/ },

/***/ "5cecf2e97bae"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Parts bar","runtime":{"untitled":"Parts bar","roledescription":"parts bar","cursor":"{name}: {part}","gap":"no data","show-table":"Table","legend":"Parts","loading":"Loading the chart\'s data","empty-title":"No data for the chart","error-title":"Could not load the data","summary-used":"{used} of {max} used ({share}).","summary-over":"{used} of {max} used: {over} over.","summary-total":"Parts: {count}, total {total}.","summary-part":"{name}: {part}.","part":"{value} ({share})","head-used":"{used} of {max} ({share})","head-total":"total {total}","other":"Other","free":"Free","share-column":"Share","category-column":"Part","value-column":"Value"},"events":{"select":{"label":"Choose a part"},"refresh":{"label":"Load the data again"}}}');

/***/ },

/***/ "7ee71363c4cc"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Полоса частей","runtime":{"untitled":"Полоса частей","roledescription":"полоса частей","cursor":"{name}: {part}","gap":"нет данных","show-table":"Таблица","legend":"Части","loading":"Загрузка данных диаграммы","empty-title":"Нет данных для диаграммы","error-title":"Не удалось загрузить данные","summary-used":"Занято {used} из {max} ({share}).","summary-over":"Занято {used} из {max}: больше на {over}.","summary-total":"Частей: {count}, всего {total}.","summary-part":"{name}: {part}.","part":"{value} ({share})","head-used":"{used} из {max} ({share})","head-total":"всего {total}","other":"Другое","free":"Свободно","share-column":"Доля","category-column":"Часть","value-column":"Значение"},"events":{"select":{"label":"Выбрать часть"},"refresh":{"label":"Загрузить данные заново"}}}');

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
/******/ 	let __webpack_exports__ = __webpack_require__("278aa388a906");
/******/
/******/ })()
;