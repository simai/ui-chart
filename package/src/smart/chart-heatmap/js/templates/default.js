import {html, nothing} from 'lit';
import {keptView} from '../../../chart-core/settle.js';
import './default.css';

// The figure of a heatmap: the label and the table button, the scale's
// legend, the grid (SVG), the summary and the description, the live line,
// and the same data as a table.
//
// The grid is one Tab stop, a role="group" named by the label and described
// by the summary; its cells are aria-hidden, because the summary, the live
// line and the table say what they show. A cell's colour and its ink are
// its step's (chart-core/heat), set once on the grid; its value is written
// in it when it fits.

const px = (value) => `${Math.round(value * 10) / 10}`;

// The steps' fills and inks, set once on the grid; a cell names its step
// (data-step) and the sheet picks that step's pair, so a cell's markup is
// its place and its value alone.
const stepColours = (steps) => steps.map((step, index) => `--sf-chart-heatmap--fill-${index}: ${step.fill}; --sf-chart-heatmap--ink-${index}: ${step.ink}`).join('; ');

// The grid's inside is SVG markup set as the svg element's innerHTML (a
// property, so lit writes no part markers inside it: a first-paint snapshot
// of the grid is the same on every run). Every text is escaped.
const ESCAPES = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'};
const esc = (value) => String(value).replace(/[&<>"']/gu, (one) => ESCAPES[one]);

function gridMarkup(g, steps, cursor) {
  let out = '<g class="sf-chart-heatmap-names" aria-hidden="true">';
  for (const row of g.rows) {
    out += `<text class="sf-chart-heatmap-name sf-chart-heatmap-name--row" x="${px(g.left - 8)}" y="${px(row.y)}">${esc(row.name)}</text>`;
  }
  for (const column of g.columns) {
    out += `<text class="sf-chart-heatmap-name" x="${px(column.x)}" y="${px(g.rowsHeight + g.font + 4)}">${esc(column.name)}</text>`;
  }
  if (g.xLabel) out += `<text class="sf-chart-heatmap-axis-label" x="${px(g.left + (g.width - g.left) / 2)}" y="${px(g.height - 2)}" >${esc(g.xLabel)}</text>`;
  out += '</g><g class="sf-chart-heatmap-cells" aria-hidden="true">';
  for (const one of g.cells) {
    const current = cursor && cursor.xi === one.xi && cursor.yi === one.yi;
    const dim = cursor && !current ? ' sf-chart-heatmap-cell--dim' : '';
    const kind = steps[one.step] ? '' : ' sf-chart-heatmap-cell--gap';
    const step = steps[one.step] ? ` data-step="${one.step}"` : '';
    out += `<g class="sf-chart-heatmap-cell${kind}${dim}"${step} data-cell="${one.xi},${one.yi}">`;
    out += `<rect class="sf-chart-heatmap-box" x="${px(one.x)}" y="${px(one.y)}" width="${px(one.width)}" height="${px(one.height)}"/>`;
    if (one.text) out += `<text class="sf-chart-heatmap-value" x="${px(one.x + one.width / 2)}" y="${px(one.y + one.height / 2)}">${esc(one.text)}</text>`;
    out += '</g>';
  }
  const focus = cursor && g.cells.find((one) => one.xi === cursor.xi && one.yi === cursor.yi);
  if (focus) out += `<rect class="sf-chart-heatmap-focus" x="${px(focus.x - 1)}" y="${px(focus.y - 1)}" width="${px(focus.width + 2)}" height="${px(focus.height + 2)}"/>`;
  return `${out}</g>`;
}

// The tooltip stands over the cell, flipped to its other side past the
// grid's middle so it stays inside.
function renderTooltip(context, g, cursor) {
  if (!cursor || !g || context.tooltip === 'none') return nothing;
  const {component, model} = context;
  const one = component.cellAt(model, cursor);
  const cell = g.cells.find((item) => item.xi === cursor.xi && item.yi === cursor.yi);
  if (!one || !cell) return nothing;
  const flip = cell.x + cell.width / 2 > g.width / 2;
  const below = cell.y < g.cell * 2;
  return html`
    <div class=${['sf-chart-heatmap-tooltip', flip ? 'sf-chart-heatmap-tooltip--flip' : '', below ? 'sf-chart-heatmap-tooltip--below' : ''].filter(Boolean).join(' ')} aria-hidden="true"
         style=${`inset-inline-start: ${px(flip ? cell.x : cell.x + cell.width)}px; inset-block-start: ${px(below ? cell.y + cell.height : cell.y)}px`}>
      <div class="sf-chart-heatmap-tooltip-place">${one.y.name} · ${one.x.name}</div>
      <div class="sf-chart-heatmap-tooltip-value">${component.sayY(one.value)}</div>
    </div>
  `;
}

// The scale's legend: a swatch per step with its range. A heatmap always
// has one, since its colours are an ordered scale, not names.
function renderLegend(context, place) {
  if (context.legend !== place || context.state !== 'ready' || !context.steps.length) return nothing;
  const {component, steps} = context;
  return html`
    <ul class=${`sf-chart-heatmap-legend sf-chart-heatmap-legend--${place}`} aria-label=${component.words('legend')}>
      ${steps.map((step) => html`
        <li class="sf-chart-heatmap-legend-item">
          <span class="sf-chart-heatmap-swatch" aria-hidden="true" style=${`--sf-chart-heatmap--fill: ${step.fill}`}></span>
          <span class="sf-chart-heatmap-legend-range">${component.sayStep(step)}</span>
        </li>
      `)}
      ${context.model.gaps ? html`
        <li class="sf-chart-heatmap-legend-item">
          <span class="sf-chart-heatmap-swatch sf-chart-heatmap-swatch--gap" aria-hidden="true"></span>
          <span class="sf-chart-heatmap-legend-range">${component.words('gap')}</span>
        </li>` : nothing}
    </ul>
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
  const {component, label, tableModel: model} = context;
  return html`
    <div class=${shownTable ? 'sf-chart-heatmap-table' : 'sf-chart-heatmap-sr'}>
      <table>
        <caption>${label}</caption>
        <thead>
          <tr>
            <th scope="col">${context.yLabel || model.yField || component.words('y-column')}</th>
            ${model.xs.map((one) => html`<th scope="col">${one.name}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${model.ys.map((row, yi) => html`
            <tr>
              <th scope="row">${row.name}</th>
              ${model.grid[yi].map((value) => html`<td>${component.sayY(value)}</td>`)}
            </tr>
          `)}
        </tbody>
      </table>
    </div>
  `;
}

function renderPlot(context) {
  const {component, geometry: g, steps, uid, state, cursor} = context;
  if (state === 'loading') {
    return html`<div class="sf-chart-heatmap-loading" role="status" aria-busy="true"><span class="sf-chart-heatmap-sr">${component.words('loading')}</span></div>`;
  }
  if (state === 'empty' || state === 'error') {
    return html`
      <sf-empty-state class="sf-chart-heatmap-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
        heading=${component.words(state === 'error' ? 'error-title' : 'empty-title')} text=""
        @sf-empty-state-action=${(event) => {
          event.stopPropagation();
          component.sfEmit('refresh', {});
        }}></sf-empty-state>
    `;
  }
  if (!g) return nothing;
  const described = [context.summaryText ? `${uid}-summary` : '', context.hasDescription ? `${uid}-description` : ''].filter(Boolean).join(' ');
  return html`
    <svg class="sf-chart-heatmap-svg" role="group" tabindex="0" focusable="true"
         aria-label=${context.label} aria-roledescription=${component.words('roledescription')}
         aria-describedby=${described || nothing}
         width=${g.width} height=${g.height} viewBox=${`0 0 ${g.width} ${g.height}`} style=${stepColours(steps)}
         @keydown=${(event) => component.onPlotKey(event)}
         @pointermove=${(event) => component.onPointerMove(event)}
         @pointerleave=${() => component.onPointerLeave()}
         @click=${(event) => component.onPlotClick(event)}
         @blur=${() => component.setCursor(null)}
         .innerHTML=${gridMarkup(g, steps, cursor)}></svg>
    ${renderTooltip(context, g, cursor)}
  `;
}

export function renderHeatmapTemplate(context) {
  const {component, uid, state} = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return html`
    <figure class=${['sf-chart-heatmap', `sf-chart-heatmap--size-${size}`, `sf-chart-heatmap--${state}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-chart-heatmap-head">
        <span class="sf-chart-heatmap-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.yLabel && state === 'ready' ? html`<span class="sf-chart-heatmap-y-label">${context.yLabel}</span>` : nothing}
        ${context.table === 'toggle' && state === 'ready'
          ? html`<button type="button" class="sf-chart-heatmap-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>`
          : nothing}
      </figcaption>
      ${tableView ? nothing : renderLegend(context, 'top')}
      <div class="sf-chart-heatmap-plot" ?hidden=${tableView}
           style=${context.rows ? `--sf-chart-heatmap--rows: ${context.rows}; --sf-chart-heatmap--x-label: ${context.xLabel ? 1 : 0}` : nothing}>${renderPlot(context)}</div>
      ${tableView ? nothing : renderLegend(context, 'bottom')}
      ${context.summaryText ? html`<p class="sf-chart-heatmap-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : nothing}
      ${context.hasDescription ? html`<div class="sf-chart-heatmap-description" id=${`${uid}-description`}>${context.description}</div>` : nothing}
      <div class="sf-chart-heatmap-sr" aria-live="polite">${context.said}</div>
      ${renderTable(context)}
    </figure>
  `;
}
