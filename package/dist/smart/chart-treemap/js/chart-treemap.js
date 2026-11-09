/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "d52dd4f5b1f7"
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
/* harmony import */ var _js_treemap_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("7f7b9e6b6ee1");
/* harmony import */ var _js_templates_default__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("089f13cc6b62");
/* harmony import */ var _component_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("587083736028");
/* harmony import */ var _lang_en_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("48c1c34ab5ba");
/* harmony import */ var _lang_ru_json__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("65ae91eb7e3a");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__, _chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_4__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_5__, _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_6__, _js_treemap_js__WEBPACK_IMPORTED_MODULE_7__, _js_templates_default__WEBPACK_IMPORTED_MODULE_8__]);
([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_page_language__WEBPACK_IMPORTED_MODULE_2__, _chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__, _chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_4__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_5__, _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_6__, _js_treemap_js__WEBPACK_IMPORTED_MODULE_7__, _js_templates_default__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_js_page_language__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _chart_core_format_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_chart_core_settle_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _chart_core_colors_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_6__);
// sf-chart-treemap: a treemap, values as the areas of rectangles that tile
// the plot, one level or two (parts in groups) (docs/research/catalogue.md,
// Treemap; docs/DECISIONS.md D12).
//
// The element reads its rows once into groups of parts (js/treemap),
// measures its plot, and draws in SVG a rectangle per part laid out
// squarified, largest first, so the rectangles stay near square. A group
// takes a colour of the Framework's chart roles (--sf-chart-1..8): a light
// fill with the role's line round each part, and the part's name and value
// written inside when they fit, in the page's ink. A person reaches the
// plot with one Tab stop and walks the parts with the arrows, Up and Down
// across the groups; every move is said in a polite live region, the chart
// as a whole in a summary sentence, and the same data is a table on request.
//
// It renders into its own light DOM, like every Smart component.











 // The text of the plot, in px, by size rung, as on the line chart.

const FONT = {
  '1/2': 11,
  1: 12,
  2: 14
}; // A letter's width against the font: Cyrillic is near 0.7 of it.

const LETTER = 0.72;
const GAP = 2;
const PAD = 6;
const ChartTreemapElement = (0,_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__.elementFromManifest)(_component_json__WEBPACK_IMPORTED_MODULE_9__, {
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
let instances = 0; // A text cut to so many characters, with an ellipsis, which is wider than a
// letter and so takes two places; '' below three letters and the ellipsis.

const cut = (text, chars) => {
  if (text.length <= chars) return text;
  return chars < 5 ? '' : `${text.slice(0, chars - 2)}…`;
};

class SfTreemap extends ChartTreemapElement {
  static get props() {
    return { ...super.props,
      rootClass: {
        default: ''
      }
    };
  }

  onConnected() {
    this._uid = this.id || `sf-chart-treemap-${instances += 1}`;
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
      (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_6__.checkContrast)(this, colours, 'sf-chart-treemap');
    }

    const plot = this.querySelector('.sf-chart-treemap-plot');

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
  } // The page's own colours by group (chart-core/colors), read again only
  // when the setting changes.


  colours() {
    if (this.colors !== this._coloursRaw || !this._colours) {
      this._coloursRaw = this.colors;
      this._colours = (0,_chart_core_colors_js__WEBPACK_IMPORTED_MODULE_6__.readColours)(this.colors, said => console.warn(`<sf-chart-treemap> ${said}`));
    }

    return this._colours;
  }

  words(key, vars) {
    return this.sfWord(key, vars ? {
      vars
    } : undefined);
  } // The rows as groups of parts, read again only when the data or its
  // mapping changes.


  model() {
    const key = [this.items, this.x, this.y, this.group];
    if (this._modelKey && key.every((part, index) => part === this._modelKey[index])) return this._model;
    this._modelKey = key;
    this._model = (0,_js_treemap_js__WEBPACK_IMPORTED_MODULE_7__.treemapRows)(this.items, {
      x: this.x,
      y: this.y,
      group: this.group
    });
    return this._model;
  }

  state(model) {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return model.groups.length ? 'ready' : 'empty';
  }

  sayY(value) {
    return (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatNumber)(value, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.yFormat, {
      gap: this.words('gap')
    });
  }

  sayShare(value, of) {
    return of > 0 ? (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatNumber)(value / of, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), 'percent') : '';
  } // A part's name: its label, or its place when it has none.


  sayX(leaf) {
    return leaf.label || this.words('part-n', {
      n: String(leaf.row + 1)
    });
  } // A group's name: its key, or «Без группы» for rows without one.


  sayGroup(key) {
    return key || this.words('no-group');
  } // Where everything goes: the groups and the parts laid out in the plot,
  // and the words written inside the parts that hold them. Null until the
  // plot has a width.


  geometry(model) {
    const {
      width,
      height
    } = this._box;
    if (!width || !height) return null;
    const font = FONT[this.size] ?? 12;
    const grouped = model.groups.length > 1;
    const {
      groups,
      leaves
    } = (0,_js_treemap_js__WEBPACK_IMPORTED_MODULE_7__.treemapLayout)(model.groups, {
      x: 0,
      y: 0,
      w: width,
      h: height
    }, {
      gap: GAP,
      header: grouped ? Math.ceil(font * 1.6) : 0
    });
    const letter = font * LETTER;
    const labelled = this.labels !== 'none';
    const parts = leaves.map((one, index) => {
      const part = { ...one,
        index,
        cx: one.x + one.w / 2,
        cy: one.y + one.h / 2,
        nameText: '',
        valueText: ''
      };
      if (!labelled || one.w < letter * 4 + PAD * 2 || one.h < font + PAD * 2) return part;
      const room = Math.floor((one.w - PAD * 2) / letter);
      part.nameText = cut(this.sayX(one), room);
      const value = this.sayY(one.value);
      if (one.h >= font * 3 && value.length <= room) part.valueText = value;
      return part;
    });
    const heads = groups.map(one => {
      if (!one.header) return { ...one,
        text: ''
      };
      const room = Math.floor((one.w - PAD * 2) / letter);
      return { ...one,
        text: cut(this.sayGroup(one.key), room)
      };
    });
    return {
      width,
      height,
      font,
      grouped,
      groups: heads,
      parts
    };
  }

  summarize(model) {
    if (this.summary === 'none') return '';
    if (!model.groups.length) return this.words('summary-empty');
    const locale = (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this);
    const leaves = model.groups.flatMap(one => one.leaves);
    const largest = leaves.reduce((best, one) => one.value > best.value ? one : best);
    const parts = [this.words('summary-total', {
      total: this.sayY(model.total),
      count: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatNumber)(leaves.length, locale, 'integer')
    })];
    parts.push(this.words('summary-largest', {
      name: this.sayX(largest),
      value: this.sayY(largest.value),
      share: this.sayShare(largest.value, model.total)
    }));

    if (model.groups.length > 1) {
      const first = model.groups[0];
      parts.push(this.words('summary-groups', {
        count: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatNumber)(model.groups.length, locale, 'integer'),
        name: this.sayGroup(first.key),
        value: this.sayY(first.value),
        share: this.sayShare(first.value, model.total)
      }));
    } else if (leaves.length > 3) {
      const top = leaves.slice(0, 3).reduce((sum, one) => sum + one.value, 0);
      parts.push(this.words('summary-top', {
        share: this.sayShare(top, model.total)
      }));
    }

    const left = model.missing + model.dropped;
    if (left) parts.push(this.words('summary-left', {
      count: (0,_chart_core_format_js__WEBPACK_IMPORTED_MODULE_3__.formatNumber)(left, locale, 'integer')
    }));
    return parts.join(' ');
  } // A part as one sentence: its group when there are groups, its name, its
  // value and its share of the whole.


  partLine(part) {
    const model = this.model();
    const vars = {
      name: this.sayX(part),
      value: this.sayY(part.value),
      share: this.sayShare(part.value, model.total)
    };
    if (model.groups.length > 1) return this.words('cursor-group', { ...vars,
      group: this.sayGroup(part.group)
    });
    return this.words('cursor', vars);
  }

  cursorPart(cursor = this._cursor) {
    const geometry = this._geometry;
    if (!cursor || !geometry) return null;
    return geometry.parts[cursor.index] ?? null;
  }

  setCursor(cursor, {
    say = false
  } = {}) {
    this._cursor = cursor;
    const part = this.cursorPart(cursor);
    if (say && part) this._said = this.partLine(part);
    this.requestComponentUpdate('cursor');
  } // Up and Down go to the first part of the group before or after, when
  // there are groups; Left and Right, Home, End and the pages walk every
  // part in order (chart-core/cursor).


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
      this.choose(this.cursorPart());
      return;
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      if (!geometry.grouped) return;
      const now = this.cursorPart();
      const place = now ? Math.max(0, Math.min(geometry.groups.length - 1, now.place + (event.key === 'ArrowDown' ? 1 : -1))) : 0;
      const index = geometry.parts.findIndex(one => one.place === place);
      event.preventDefault();
      this.setCursor({
        index,
        series: 'part'
      }, {
        say: true
      });
      return;
    }

    const next = (0,_chart_core_cursor_js__WEBPACK_IMPORTED_MODULE_4__.moveCursor)(this._cursor, event.key, {
      count: geometry.parts.length,
      shown: ['part']
    });
    if (next === null) return;
    event.preventDefault();
    this.setCursor(next, {
      say: true
    });
  } // The pointer picks the part it is over.


  placeAt(event) {
    const geometry = this._geometry;
    if (!geometry) return null;
    const box = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - box.left;
    const y = event.clientY - box.top;
    const index = geometry.parts.findIndex(one => x >= one.x - GAP / 2 && x <= one.x + one.w + GAP / 2 && y >= one.y - GAP / 2 && y <= one.y + one.h + GAP / 2);
    return index < 0 ? null : {
      index,
      series: 'part'
    };
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
    if (place) this.choose(this.cursorPart(place));
  }

  choose(part) {
    if (!part) return;
    const model = this.model();
    this.sfEmit('select', {
      index: part.index,
      row: part.row,
      x: part.label,
      group: part.group,
      value: part.value,
      share: model.total > 0 ? part.value / model.total : 0
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
      tableKey: [tableModel, this.label, this.xLabel, this.yFormat, (0,_core_js_page_language__WEBPACK_IMPORTED_MODULE_2__.pageLocale)(this), this.table, this.table === 'toggle' ? this._view : 'chart'],
      geometry,
      cursor: this.cursorPart(),
      said: this._said,
      view: this.table === 'toggle' ? this._view : 'chart',
      legend: this.legend === 'auto' ? model.groups.length > 1 ? 'top' : 'none' : this.legend,
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
    return (0,_js_templates_default__WEBPACK_IMPORTED_MODULE_8__.renderTreemapTemplate)(this.templateContext());
  }

}

SfTreemap.define('sf-chart-treemap');
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "089f13cc6b62"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderTreemapTemplate: () => (/* binding */ renderTreemapTemplate)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2a080a730149");
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("297fd25a909a");
/* harmony import */ var _default_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("3cba593ff17c");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([lit__WEBPACK_IMPORTED_MODULE_0__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__]);
([lit__WEBPACK_IMPORTED_MODULE_0__, _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_chart_core_settle_js__WEBPACK_IMPORTED_MODULE_1__);


 // The figure of a treemap: the label and the table button, the key of the
// groups, the plot (SVG), the summary and the description, the live line,
// and the same data as a table.
//
// The plot is one Tab stop, a role="group" named by the label and described
// by the summary; its rectangles are aria-hidden, because the summary, the
// live line and the table say what they show. A group takes a chart colour
// by its place (--sf-chart-1..8): the colour's light fill inside each part
// and its line round it; the part's name and value are written in the
// page's ink. A page's own colour (the colors setting, by group key) is set
// in a style as --tone. In forced colours every part is the canvas with a
// line of the text colour, and the names carry the meaning.

const px = value => `${Math.round(value * 10) / 10}`;

const tone = place => `sf-chart-treemap-c${place % 8 + 1}`;

const paintOf = (paint, key) => {
  const colour = paint.get(key);
  return colour ? `--sf-chart-treemap--tone: ${colour}; --sf-chart-treemap--wash: color-mix(in srgb, ${colour} 20%, transparent)` : '';
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

const esc = value => String(value).replace(/[&<>"']/gu, one => ESCAPES[one]); // One group per group of parts, so a class sets its colour once: the
// group's band and name, then its parts with their names and values.


function partsMarkup(g, paint) {
  let out = '<g class="sf-chart-treemap-marks" aria-hidden="true">';

  for (const group of g.groups) {
    const style = paintOf(paint, group.key);
    out += `<g class="sf-chart-treemap-group ${tone(group.place)}"${style ? ` style="${esc(style)}"` : ''} data-group="${esc(group.key)}">`;

    if (group.header && group.text) {
      out += `<text class="sf-chart-treemap-head" x="${px(group.header.x + 6)}" y="${px(group.header.y + group.header.h / 2)}" dominant-baseline="middle">${esc(group.text)}</text>`;
    }

    for (const part of g.parts) {
      if (part.place !== group.place) continue;
      out += `<rect class="sf-chart-treemap-part" x="${px(part.x)}" y="${px(part.y)}" width="${px(part.w)}" height="${px(part.h)}" rx="2"/>`;
      if (!part.nameText) continue;
      const top = part.y + 6 + g.font * 0.8;
      out += `<text class="sf-chart-treemap-name" x="${px(part.x + 6)}" y="${px(top)}">${esc(part.nameText)}</text>`;
      if (part.valueText) out += `<text class="sf-chart-treemap-value" x="${px(part.x + 6)}" y="${px(top + g.font * 1.3)}">${esc(part.valueText)}</text>`;
    }

    out += '</g>';
  }

  return `${out}</g>`;
} // The cursor: a ring round the part.


function cursorMarkup(one) {
  if (!one) return '';
  return `<g class="sf-chart-treemap-cursor" aria-hidden="true"><rect class="sf-chart-treemap-ring" x="${px(one.x - 1)}" y="${px(one.y - 1)}" width="${px(one.w + 2)}" height="${px(one.h + 2)}" rx="3"/></g>`;
}

const swatchMarkup = () => '<svg viewBox="0 0 12 12" focusable="false"><rect class="sf-chart-treemap-part" x="1.5" y="1.5" width="9" height="9" rx="1"/></svg>';

function renderKey(context, place) {
  if (context.legend !== place || context.state !== 'ready') return lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
  const {
    component,
    paint,
    model
  } = context;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <ul class=${`sf-chart-treemap-legend sf-chart-treemap-legend--${place}`} aria-label=${component.words('legend')}>
      ${model.groups.map((group, index) => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <li class=${`sf-chart-treemap-legend-item ${tone(index)}`} style=${paintOf(paint, group.key) || lit__WEBPACK_IMPORTED_MODULE_0__.nothing}>
          <span class="sf-chart-treemap-swatch" aria-hidden="true" .innerHTML=${swatchMarkup()}></span>
          <span>${component.sayGroup(group.key)}</span>
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
  if (model.groups.length > 1) rows.push(['group', component.sayGroup(one.group)]);
  rows.push(['value', component.sayY(one.value)], ['share', component.sayShare(one.value, model.total)]);
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${`sf-chart-treemap-tooltip${flip ? ' sf-chart-treemap-tooltip--flip' : ''}`} aria-hidden="true"
         style=${`inset-inline-start: ${px(flip ? one.x : one.x + one.w)}px; inset-block-start: ${px(one.cy)}px`}>
      <div class="sf-chart-treemap-tooltip-name">${component.sayX(one)}</div>
      ${rows.map(([key, value]) => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <div class="sf-chart-treemap-tooltip-row">
          <span>${component.words(key)}</span>
          <span class="sf-chart-treemap-tooltip-value">${value}</span>
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
  const grouped = model.groups.length > 1;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class=${shownTable ? 'sf-chart-treemap-table' : 'sf-chart-treemap-sr'}>
      <table>
        <caption>${label}</caption>
        <thead>
          <tr>
            ${grouped ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<th scope="col">${model.groupField || component.words('group')}</th>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
            <th scope="col">${component.xLabel || model.xField || component.words('part-column')}</th>
            <th scope="col">${component.words('value')}</th>
            <th scope="col">${component.words('share')}</th>
          </tr>
        </thead>
        <tbody>
          ${model.groups.flatMap(group => group.leaves.map(one => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
            <tr>
              ${grouped ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<td>${component.sayGroup(group.key)}</td>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
              <th scope="row">${component.sayX(one)}</th>
              <td>${component.sayY(one.value)}</td>
              <td>${component.sayShare(one.value, model.total)}</td>
            </tr>
          `))}
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
    paint
  } = context;

  if (state === 'loading') {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-treemap-loading" role="status" aria-busy="true"><span class="sf-chart-treemap-sr">${component.words('loading')}</span></div>`;
  }

  if (state === 'empty' || state === 'error') {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
      <sf-empty-state class="sf-chart-treemap-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
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
    <svg class="sf-chart-treemap-svg" role="group" tabindex="0" focusable="true"
         aria-label=${context.label} aria-roledescription=${component.words('roledescription')}
         aria-describedby=${described || lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
         width=${g.width} height=${g.height} viewBox=${`0 0 ${g.width} ${g.height}`}
         @keydown=${event => component.onPlotKey(event)}
         @pointermove=${event => component.onPointerMove(event)}
         @pointerleave=${() => component.onPointerLeave()}
         @click=${event => component.onPlotClick(event)}
         @blur=${() => component.setCursor(null)}
         .innerHTML=${partsMarkup(g, paint) + cursorMarkup(cursor)}>
    </svg>
    ${renderTooltip(context, g, cursor)}
  `;
}

function renderTreemapTemplate(context) {
  const {
    component,
    uid,
    state
  } = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <figure class=${['sf-chart-treemap', `sf-chart-treemap--size-${size}`, `sf-chart-treemap--${state}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-chart-treemap-head-row">
        <span class="sf-chart-treemap-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.table === 'toggle' && state === 'ready' ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<button type="button" class="sf-chart-treemap-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      </figcaption>
      ${renderKey(context, 'top')}
      <div class="sf-chart-treemap-plot" ?hidden=${tableView}>${renderPlot(context)}</div>
      ${renderKey(context, 'bottom')}
      ${context.summaryText ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<p class="sf-chart-treemap-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      ${context.hasDescription ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-chart-treemap-description" id=${`${uid}-description`}>${context.description}</div>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
      <div class="sf-chart-treemap-sr" aria-live="polite">${context.said}</div>
      ${renderTable(context)}
    </figure>
  `;
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "7f7b9e6b6ee1"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   squarify: () => (/* binding */ squarify),
/* harmony export */   treemapLayout: () => (/* binding */ treemapLayout),
/* harmony export */   treemapRows: () => (/* binding */ treemapRows)
/* harmony export */ });
/* harmony import */ var _chart_core_data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1a60ce635d04");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_chart_core_data_js__WEBPACK_IMPORTED_MODULE_0__]);
var __webpack_async_dependencies_result__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
_chart_core_data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_async_dependencies_result__[0];
/* harmony import */ var _chart_core_data_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_chart_core_data_js__WEBPACK_IMPORTED_MODULE_0__);
// The parts of a treemap (docs/research/catalogue.md, Treemap): values as
// areas of rectangles that tile a box, one level or two (parts in groups).
// The rectangles are laid out squarified -- each row of them along the
// shorter side, kept while it makes their worst aspect ratio no worse
// (Bruls, Huizing and van Wijk, 2000) -- so they stay near square and an
// area is easy to compare.

/**
 * The parts of rows: {xField, yField, groupField, groups, missing, dropped,
 * total}. A group is {key, value, leaves}, a leaf {row, label, value, group};
 * the groups go largest first and so do the leaves in each. Without a group
 * field every leaf is in one group whose key is ''. A row without a value is
 * left out as missing, one with zero or less as dropped: an area cannot show
 * it.
 */

function treemapRows(items, {
  x = '',
  y = '',
  group = ''
} = {}) {
  const rows = (0,_chart_core_data_js__WEBPACK_IMPORTED_MODULE_0__.readRows)(items);
  const fields = rows.length ? Object.keys(rows[0]) : [];
  const xField = x || fields.find(name => name !== y && name !== group) || '';
  const yField = y || fields.find(name => name !== xField && name !== group && rows.some(row => (0,_chart_core_data_js__WEBPACK_IMPORTED_MODULE_0__.readNumber)(row[name]) !== null)) || '';
  const byKey = new Map();
  let missing = 0;
  let dropped = 0;
  rows.forEach((row, index) => {
    const value = (0,_chart_core_data_js__WEBPACK_IMPORTED_MODULE_0__.readNumber)(row[yField]);

    if (value === null) {
      missing += 1;
      return;
    }

    if (value <= 0) {
      dropped += 1;
      return;
    }

    const key = group && row[group] !== undefined && row[group] !== null ? String(row[group]) : '';
    if (!byKey.has(key)) byKey.set(key, {
      key,
      value: 0,
      leaves: []
    });
    const one = byKey.get(key);
    one.value += value;
    one.leaves.push({
      row: index,
      label: row[xField] === undefined || row[xField] === null ? '' : String(row[xField]),
      value,
      group: key
    });
  });
  const groups = [...byKey.values()].sort((a, b) => b.value - a.value);

  for (const one of groups) one.leaves.sort((a, b) => b.value - a.value);

  const total = groups.reduce((sum, one) => sum + one.value, 0);
  return {
    xField,
    yField,
    groupField: group,
    groups,
    missing,
    dropped,
    total
  };
} // The worst aspect ratio of a row of areas laid along a side of `side`.

function worst(sum, max, min, side) {
  const square = side * side;
  return Math.max(square * max / (sum * sum), sum * sum / (square * min));
}
/**
 * Rectangles {x, y, w, h} that tile `box` in proportion to `values`, in
 * their order (largest first reads best). Each row goes along the box's
 * shorter side and takes the next value while that does not worsen its
 * worst aspect ratio.
 */


function squarify(values, {
  x,
  y,
  w,
  h
}) {
  const total = values.reduce((sum, value) => sum + value, 0);
  if (!(total > 0) || w <= 0 || h <= 0) return values.map(() => ({
    x,
    y,
    w: 0,
    h: 0
  }));
  const scale = w * h / total;
  const areas = values.map(value => value * scale);
  const out = [];
  const rest = {
    x,
    y,
    w,
    h
  };
  let at = 0;

  while (at < areas.length) {
    const side = Math.min(rest.w, rest.h);
    const row = [areas[at]];
    let sum = areas[at];
    at += 1;

    while (at < areas.length) {
      const next = areas[at];
      const before = worst(sum, Math.max(...row), Math.min(...row), side);
      const after = worst(sum + next, Math.max(...row, next), Math.min(...row, next), side);
      if (after > before) break;
      row.push(next);
      sum += next;
      at += 1;
    } // The row is a column at the left when the box is wide, a strip at the
    // top when it is tall.


    if (rest.w >= rest.h) {
      const width = rest.h ? sum / rest.h : 0;
      let top = rest.y;

      for (const area of row) {
        const height = width ? area / width : 0;
        out.push({
          x: rest.x,
          y: top,
          w: width,
          h: height
        });
        top += height;
      }

      rest.x += width;
      rest.w -= width;
    } else {
      const height = rest.w ? sum / rest.w : 0;
      let left = rest.x;

      for (const area of row) {
        const width = height ? area / height : 0;
        out.push({
          x: left,
          y: rest.y,
          w: width,
          h: height
        });
        left += width;
      }

      rest.y += height;
      rest.h -= height;
    }
  }

  return out;
} // A rectangle drawn `by` px inside its place, never below nothing.

const inset = (box, by) => ({
  x: box.x + by,
  y: box.y + by,
  w: Math.max(0, box.w - by * 2),
  h: Math.max(0, box.h - by * 2)
});
/**
 * The groups and the leaves laid out in `box`: a group's rectangle in its
 * share of the box, its leaves in its share of the group. With more than one
 * group, a group whose rectangle is tall enough keeps a band of `header` px
 * at its top for its name. Every rectangle is drawn `gap` / 2 inside its
 * place, so neighbours stand `gap` apart. The leaves come out in the
 * groups' order, then their own: the order the keyboard walks.
 */


function treemapLayout(groups, box, {
  gap = 2,
  header = 0
} = {}) {
  const half = gap / 2;
  const places = squarify(groups.map(one => one.value), box);
  const outGroups = [];
  const leaves = [];
  groups.forEach((one, place) => {
    const frame = inset(places[place], groups.length > 1 ? half : 0);
    const named = groups.length > 1 && header > 0 && frame.h >= header * 2.5 ? header : 0;
    const area = {
      x: frame.x,
      y: frame.y + named,
      w: frame.w,
      h: Math.max(0, frame.h - named)
    };
    outGroups.push({ ...one,
      place,
      ...frame,
      header: named ? {
        x: frame.x,
        y: frame.y,
        w: frame.w,
        h: named
      } : null
    });
    squarify(one.leaves.map(leaf => leaf.value), area).forEach((rect, index) => {
      leaves.push({ ...one.leaves[index],
        place: place,
        ...inset(rect, half)
      });
    });
  });
  return {
    groups: outGroups,
    leaves
  };
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "3cba593ff17c"
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

/***/ "587083736028"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"id":"smart.chart-treemap","tag":"sf-chart-treemap","version":"0.1.1","kind":"leaf","settings":{"label":{"type":"string","default":""},"items":{"type":"list","default":[],"of":"object"},"colors":{"type":"object","default":{}},"x":{"type":"string","default":""},"y":{"type":"string","default":""},"group":{"type":"string","default":""},"labels":{"type":"enum","values":["auto","none"],"default":"auto"},"legend":{"type":"enum","values":["auto","top","bottom","none"],"default":"auto"},"tooltip":{"type":"enum","values":["part","none"],"default":"part"},"x-label":{"type":"string","default":""},"y-format":{"type":"string","default":"number"},"size":{"type":"enum","values":["1/2","1","2"],"default":"1"},"table":{"type":"enum","values":["toggle","visible","hidden"],"default":"toggle"},"summary":{"type":"enum","values":["auto","none"],"default":"auto"},"data-state":{"type":"enum","values":["auto","loading","ready","empty","error"],"default":"auto"}},"events":{"select":{"carries":{"index":"number","row":"number","x":"string","group":"string","value":"number","share":"number"}},"refresh":{"carries":{}}},"actions":{"reset":{"with":{}}},"presentation":{"skeleton":{"late":["items"]}},"css-variables":{"--sf-chart-treemap-height":{"type":"length","state":"default"},"--sf-chart-treemap-label-color":{"type":"color","state":"default"},"--sf-chart-treemap-hover-background-color":{"type":"color","state":"hover"}}}');

/***/ },

/***/ "48c1c34ab5ba"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Treemap","runtime":{"untitled":"Chart","roledescription":"treemap","summary-total":"Total {total}, parts: {count}.","summary-largest":"The largest is «{name}»: {value} ({share}).","summary-groups":"Groups: {count}, the largest is «{name}»: {value} ({share}).","summary-top":"The three largest parts are {share} of the total.","summary-left":"Rows without a positive value: {count}.","summary-empty":"No data.","cursor":"{name}: {value} ({share})","cursor-group":"{group} — {name}: {value} ({share})","part-n":"Part {n}","part-column":"Part","group":"Group","no-group":"No group","value":"Value","share":"Share","legend":"Groups","gap":"no data","show-table":"Table","loading":"Loading the chart\'s data","empty-title":"No data for the chart","error-title":"Could not load the data"},"events":{"select":{"label":"Choose a part"},"refresh":{"label":"Load the data again"}},"actions":{"reset":{"label":"Take the cursor away"}}}');

/***/ },

/***/ "65ae91eb7e3a"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Плиточная диаграмма","runtime":{"untitled":"График","roledescription":"плиточная диаграмма","summary-total":"Всего {total}, частей: {count}.","summary-largest":"Больше всего — «{name}»: {value} ({share}).","summary-groups":"Групп: {count}, крупнейшая — «{name}»: {value} ({share}).","summary-top":"Три крупнейшие части — {share} всего.","summary-left":"Строк без положительного значения: {count}.","summary-empty":"Нет данных.","cursor":"{name}: {value} ({share})","cursor-group":"{group} — {name}: {value} ({share})","part-n":"Часть {n}","part-column":"Часть","group":"Группа","no-group":"Без группы","value":"Значение","share":"Доля","legend":"Группы","gap":"нет данных","show-table":"Таблица","loading":"Загрузка данных графика","empty-title":"Нет данных для графика","error-title":"Не удалось загрузить данные"},"events":{"select":{"label":"Выбрать часть"},"refresh":{"label":"Загрузить данные заново"}},"actions":{"reset":{"label":"Убрать курсор"}}}');

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
/******/ 	let __webpack_exports__ = __webpack_require__("d52dd4f5b1f7");
/******/
/******/ })()
;