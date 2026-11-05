import {html, nothing} from 'lit';
import {keptView} from '../../../chart-core/settle.js';
import './default.css';

// The figure of a scatter chart: the label and the table button, the legend,
// the plot (SVG, with a canvas under it past 2,000 marks), the summary and
// the description, the live line, and the same data as a table.
//
// The plot is one Tab stop, a role="group" named by the label and described
// by the summary; its axes and marks are aria-hidden, because the summary,
// the live line and the table say what they show. A series is a colour
// class (--c1..--c4) and a mark's shape (circle, square, triangle, diamond,
// a triangle down), so it stays itself in forced colours and in print.
// Bubbles are all circles: their series differ by an outline's dash too. A
// page's own colour (the colors setting, by the series' key) is --custom
// with its value in a style.

const colourOf = (place, paint) => `sf-chart-scatter-series--${paint ? 'custom' : `c${(place % 4) + 1}`}${place > 0 ? ` sf-chart-scatter-series--d${Math.min(place, 7)}` : ''}`;
const paintOf = (paint) => (paint ? `--sf-chart-scatter--custom: ${paint}` : '');
const paintAttr = (paint) => (paint ? ` style="${esc(paintOf(paint))}"` : '');
const px = (value) => `${Math.round(value * 10) / 10}`;

// The plot's inside is SVG markup set as the svg element's innerHTML (a
// property, so lit writes no part markers inside it: a first-paint snapshot
// of the plot is the same on every run). Every text is escaped.
const ESCAPES = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'};
const esc = (value) => String(value).replace(/[&<>"']/gu, (one) => ESCAPES[one]);

// A series' mark: a circle, or the corners of a shape of about a circle's
// area at radius r.
const SHAPES = [
  null,
  (r) => [[-0.89, -0.89], [0.89, -0.89], [0.89, 0.89], [-0.89, 0.89]].map(([x, y]) => [x * r, y * r]),
  (r) => [[0, -1.25], [1.08, 0.62], [-1.08, 0.62]].map(([x, y]) => [x * r, y * r]),
  (r) => [[0, -1.25], [1.25, 0], [0, 1.25], [-1.25, 0]].map(([x, y]) => [x * r, y * r]),
  (r) => [[0, 1.25], [1.08, -0.62], [-1.08, -0.62]].map(([x, y]) => [x * r, y * r]),
];
const cornersOf = (place, r, bubbles) => (bubbles ? null : SHAPES[place % SHAPES.length]?.(r) ?? null);

function markMarkup(cx, cy, r, corners, extra = '') {
  if (!corners) return `<circle${extra} cx="${px(cx)}" cy="${px(cy)}" r="${px(r)}"/>`;
  const d = corners.map(([x, y], index) => `${index ? 'L' : 'M'}${px(cx + x)} ${px(cy + y)}`).join('');
  return `<path${extra} d="${d}Z"/>`;
}

function axesMarkup(g) {
  const {inner} = g;
  let out = '<g class="sf-chart-scatter-axes" aria-hidden="true">';
  if (g.grid === 'y' || g.grid === 'both') {
    for (const tick of g.yTicks) {
      out += `<line class="${tick.zero ? 'sf-chart-scatter-baseline' : 'sf-chart-scatter-grid'}" x1="${px(inner.left)}" x2="${px(inner.right)}" y1="${px(tick.at)}" y2="${px(tick.at)}"/>`;
    }
  }
  if (g.grid === 'x' || g.grid === 'both') {
    for (const tick of g.xTicks) {
      out += `<line class="sf-chart-scatter-grid" x1="${px(tick.at)}" x2="${px(tick.at)}" y1="${px(inner.top)}" y2="${px(inner.bottom)}"/>`;
    }
  }
  if (g.xZero !== null) out += `<line class="sf-chart-scatter-baseline" x1="${px(g.xZero)}" x2="${px(g.xZero)}" y1="${px(inner.top)}" y2="${px(inner.bottom)}"/>`;
  out += `<line class="sf-chart-scatter-baseline" x1="${px(inner.left)}" x2="${px(inner.right)}" y1="${px(inner.bottom)}" y2="${px(inner.bottom)}"/>`;
  out += `<line class="sf-chart-scatter-baseline" x1="${px(inner.left)}" x2="${px(inner.left)}" y1="${px(inner.top)}" y2="${px(inner.bottom)}"/>`;
  for (const tick of g.yTicks) {
    out += `<text class="sf-chart-scatter-tick" x="${px(inner.left - 6)}" y="${px(tick.at)}" text-anchor="end" dominant-baseline="middle">${esc(tick.text)}</text>`;
  }
  for (const tick of g.xTicks) {
    out += `<text class="sf-chart-scatter-tick" x="${px(tick.at)}" y="${px(inner.bottom + g.font * 1.2)}" text-anchor="${tick.anchor}" dominant-baseline="middle">${esc(tick.text)}</text>`;
  }
  if (g.yLabel) out += `<text class="sf-chart-scatter-axis-label" x="${px(inner.left)}" y="${px(g.font)}" text-anchor="start">${esc(g.yLabel)}</text>`;
  if (g.xLabel) out += `<text class="sf-chart-scatter-axis-label" x="${px((inner.left + inner.right) / 2)}" y="${px(g.height - 4)}" text-anchor="middle">${esc(g.xLabel)}</text>`;
  return `${out}</g>`;
}

function marksMarkup(g, paint, shown) {
  let out = '<g class="sf-chart-scatter-marks" aria-hidden="true">';
  if (!g.canvas) {
    // One group per series in the legend's order, its marks in drawing order.
    const groups = new Map(shown.map((one) => [one.key, '']));
    for (const index of g.drawn) {
      const mark = g.marks[index];
      groups.set(mark.series, groups.get(mark.series) + markMarkup(mark.cx, mark.cy, mark.r, cornersOf(mark.place, mark.r, g.bubbles), mark.hollow ? ' class="sf-chart-scatter-hollow"' : ''));
    }
    for (const one of shown) {
      out += `<g class="sf-chart-scatter-series ${colourOf(one.place, paint.get(one.key))}${g.bubbles ? ' sf-chart-scatter-series--bubbles' : ''}"${paintAttr(paint.get(one.key))} data-series="${esc(one.key)}">${groups.get(one.key)}</g>`;
    }
  }
  if (g.trends.length) {
    out += `<clipPath id="${esc(g.uid)}-clip"><rect x="${px(g.inner.left)}" y="${px(g.inner.top)}" width="${px(g.inner.right - g.inner.left)}" height="${px(g.inner.bottom - g.inner.top)}"/></clipPath>`;
    out += `<g clip-path="url(#${esc(g.uid)}-clip)">`;
    for (const line of g.trends) {
      out += `<line class="sf-chart-scatter-trend ${colourOf(line.place, paint.get(line.key))}"${paintAttr(paint.get(line.key))} x1="${px(line.x1)}" y1="${px(line.y1)}" x2="${px(line.x2)}" y2="${px(line.y2)}"/>`;
    }
    out += '</g>';
  }
  return `${out}</g>`;
}

// The cursor: guide lines from the point to both axes and a ring around it.
function cursorMarkup(g, mark, paint) {
  if (!mark) return '';
  let out = '<g class="sf-chart-scatter-cursor" aria-hidden="true">';
  out += `<line class="sf-chart-scatter-crosshair" x1="${px(g.inner.left)}" x2="${px(mark.cx)}" y1="${px(mark.cy)}" y2="${px(mark.cy)}"/>`;
  out += `<line class="sf-chart-scatter-crosshair" x1="${px(mark.cx)}" x2="${px(mark.cx)}" y1="${px(mark.cy)}" y2="${px(g.inner.bottom)}"/>`;
  out += `<g class="${colourOf(mark.place, paint.get(mark.series))}"${paintAttr(paint.get(mark.series))}>`;
  out += markMarkup(mark.cx, mark.cy, mark.r, cornersOf(mark.place, mark.r, g.bubbles), ' class="sf-chart-scatter-focus"');
  out += `<circle class="sf-chart-scatter-ring" cx="${px(mark.cx)}" cy="${px(mark.cy)}" r="${px(mark.r * (g.bubbles ? 1 : 1.25) + 4)}"/>`;
  return `${out}</g></g>`;
}

// The canvas marks (past 2,000): each series' colour is read from a hidden
// probe in its class, so a role, a palette and forced colours come out as
// the page has them.
export function paintMarks(host, canvas, g) {
  const context = canvas.getContext('2d');
  if (!context) return;
  const ratio = globalThis.devicePixelRatio || 1;
  canvas.width = Math.round(g.width * ratio);
  canvas.height = Math.round(g.height * ratio);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, g.width, g.height);
  const colours = new Map();
  for (const probe of host.querySelectorAll('.sf-chart-scatter-paint')) colours.set(probe.dataset.series, getComputedStyle(probe).color);
  const ground = getComputedStyle(host.querySelector('.sf-chart-scatter-ground') ?? host).color;
  context.lineWidth = 1;
  for (const index of g.drawn) {
    const mark = g.marks[index];
    const colour = colours.get(mark.series) ?? 'CanvasText';
    const corners = cornersOf(mark.place, mark.r, g.bubbles);
    context.beginPath();
    if (corners) {
      corners.forEach(([x, y], at) => (at ? context.lineTo(mark.cx + x, mark.cy + y) : context.moveTo(mark.cx + x, mark.cy + y)));
      context.closePath();
    } else {
      context.arc(mark.cx, mark.cy, mark.r, 0, Math.PI * 2);
    }
    if (g.bubbles) {
      if (!mark.hollow) {
        context.globalAlpha = 0.45;
        context.fillStyle = colour;
        context.fill();
        context.globalAlpha = 1;
      }
      context.strokeStyle = colour;
      context.stroke();
    } else {
      context.fillStyle = colour;
      context.fill();
      context.strokeStyle = ground;
      context.stroke();
    }
  }
}

function renderTooltip(context, g, mark) {
  if (!mark || context.tooltip === 'none') return nothing;
  const {component, model} = context;
  const flip = mark.cx > g.width / 2;
  const rows = [[component.axisName('x'), component.sayX(mark.x)], [component.axisName('y'), component.sayY(mark.y)]];
  if (model.bubbleField) rows.push([component.axisName('bubble'), component.saySize(mark.size)]);
  return html`
    <div class=${`sf-chart-scatter-tooltip${flip ? ' sf-chart-scatter-tooltip--flip' : ''}`} aria-hidden="true"
         style=${`inset-inline-start: ${px(mark.cx)}px; inset-block-start: ${px(mark.cy)}px; --sf-chart-scatter--reach: ${px(mark.r)}`}>
      <div class=${`sf-chart-scatter-tooltip-name ${colourOf(mark.place, context.paint.get(mark.series))}`} style=${paintOf(context.paint.get(mark.series)) || nothing}>
        <span class="sf-chart-scatter-swatch" .innerHTML=${swatchMarkup(mark.place, g.bubbles)}></span>
        <span>${component.pointName(model, mark)}</span>
      </div>
      ${rows.map(([name, value]) => html`
        <div class="sf-chart-scatter-tooltip-row">
          <span>${name}</span>
          <span class="sf-chart-scatter-tooltip-value">${value}</span>
        </div>
      `)}
    </div>
  `;
}

const swatchMarkup = (place, bubbles) => `<svg viewBox="-6 -6 12 12" focusable="false">${markMarkup(0, 0, bubbles ? 5 : 4, cornersOf(place, 4, bubbles))}</svg>`;

function renderLegend(context, place) {
  if (context.legend !== place || context.state !== 'ready') return nothing;
  const {component, model} = context;
  const hidden = new Set(component.hiddenSeries || []);
  const bubbles = Boolean(model.bubbleField);
  return html`
    <div class=${`sf-chart-scatter-legend sf-chart-scatter-legend--${place}`} role="group" aria-label=${component.words('legend')}>
      ${model.series.map((one, index) => html`
        <button type="button" class=${`sf-chart-scatter-legend-item ${colourOf(index, context.paint.get(one.key))}`}
                style=${paintOf(context.paint.get(one.key)) || nothing} aria-pressed=${hidden.has(one.key) ? 'false' : 'true'}
                data-series=${one.key} @click=${() => component.toggleSeries(one.key)}>
          <span class="sf-chart-scatter-swatch" aria-hidden="true" .innerHTML=${swatchMarkup(index, bubbles)}></span>
          <span class="sf-chart-scatter-legend-name">${one.name}</span>
        </button>
      `)}
    </div>
  `;
}

// The table is the settled copy of the data (chart-core/settle): it is
// rebuilt only when its key changes, never on a pointer or cursor move.
function renderTable(context) {
  const shownTable = context.table === 'visible' || (context.table === 'toggle' && context.view === 'table');
  if (context.state !== 'ready' || (!shownTable && context.table !== 'hidden')) return nothing;
  const {component} = context;
  component._tableView = component._tableView ?? {};
  return keptView(component._tableView, context.tableKey, () => tableMarkup(context, shownTable));
}

function tableMarkup(context, shownTable) {
  const {component, tableModel: model, label} = context;
  const several = model.series.length > 1;
  const names = new Map(model.series.map((one) => [one.key, one.name]));
  return html`
    <div class=${shownTable ? 'sf-chart-scatter-table' : 'sf-chart-scatter-sr'}>
      <table>
        <caption>${label}</caption>
        <thead>
          <tr>
            <th scope="col">${component.words('point-column')}</th>
            ${several ? html`<th scope="col">${component.words('series-column')}</th>` : nothing}
            <th scope="col">${component.axisName('x')}</th>
            <th scope="col">${component.axisName('y')}</th>
            ${model.bubbleField ? html`<th scope="col">${component.axisName('bubble')}</th>` : nothing}
          </tr>
        </thead>
        <tbody>
          ${model.points.map((one) => html`
            <tr>
              <th scope="row">${one.name || String(one.row + 1)}</th>
              ${several ? html`<td>${names.get(one.series)}</td>` : nothing}
              <td>${component.sayX(one.x)}</td>
              <td>${component.sayY(one.y)}</td>
              ${model.bubbleField ? html`<td>${component.saySize(one.size)}</td>` : nothing}
            </tr>
          `)}
        </tbody>
      </table>
    </div>
  `;
}

function renderPlot(context) {
  const {component, geometry: g, uid, state, cursor, shown, paint} = context;
  if (state === 'loading') {
    return html`<div class="sf-chart-scatter-loading" role="status" aria-busy="true"><span class="sf-chart-scatter-sr">${component.words('loading')}</span></div>`;
  }
  if (state === 'empty' || state === 'error') {
    return html`
      <sf-empty-state class="sf-chart-scatter-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
        heading=${component.words(state === 'error' ? 'error-title' : 'empty-title')} text=""
        @sf-empty-state-action=${(event) => {
          event.stopPropagation();
          component.sfEmit('refresh', {});
        }}></sf-empty-state>
    `;
  }
  if (!g) return nothing;
  const described = [context.summaryText ? `${uid}-summary` : '', context.hasDescription ? `${uid}-description` : ''].filter(Boolean).join(' ');
  const drawn = {...g, uid, grid: context.grid, xLabel: context.xLabel, yLabel: context.yLabel};
  return html`
    ${g.canvas ? html`
      <canvas class="sf-chart-scatter-canvas" aria-hidden="true"></canvas>
      <span class="sf-chart-scatter-ground" hidden></span>
      ${shown.map((one) => html`<span class=${`sf-chart-scatter-paint ${colourOf(one.place, paint.get(one.key))}`} style=${paintOf(paint.get(one.key)) || nothing} data-series=${one.key} hidden></span>`)}
    ` : nothing}
    <svg class="sf-chart-scatter-svg" role="group" tabindex="0" focusable="true"
         aria-label=${context.label} aria-roledescription=${component.words('roledescription')}
         aria-describedby=${described || nothing}
         width=${g.width} height=${g.height} viewBox=${`0 0 ${g.width} ${g.height}`}
         @keydown=${(event) => component.onPlotKey(event)}
         @pointermove=${(event) => component.onPointerMove(event)}
         @pointerleave=${() => component.onPointerLeave()}
         @click=${(event) => component.onPlotClick(event)}
         @blur=${() => component.setCursor(null)}
         .innerHTML=${axesMarkup(drawn) + marksMarkup(drawn, paint, shown) + cursorMarkup(g, cursor, paint)}>
    </svg>
    ${renderTooltip(context, g, cursor)}
  `;
}

export function renderScatterTemplate(context) {
  const {component, uid, state} = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return html`
    <figure class=${['sf-chart-scatter', `sf-chart-scatter--size-${size}`, `sf-chart-scatter--${state}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-chart-scatter-head">
        <span class="sf-chart-scatter-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.table === 'toggle' && state === 'ready'
          ? html`<button type="button" class="sf-chart-scatter-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>`
          : nothing}
      </figcaption>
      ${renderLegend(context, 'top')}
      <div class="sf-chart-scatter-plot" ?hidden=${tableView}>${renderPlot(context)}</div>
      ${renderLegend(context, 'bottom')}
      ${context.summaryText ? html`<p class="sf-chart-scatter-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : nothing}
      ${context.hasDescription ? html`<div class="sf-chart-scatter-description" id=${`${uid}-description`}>${context.description}</div>` : nothing}
      <div class="sf-chart-scatter-sr" aria-live="polite">${context.said}</div>
      ${renderTable(context)}
    </figure>
  `;
}
