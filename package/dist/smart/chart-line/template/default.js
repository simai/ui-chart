import {html, nothing} from 'lit';
import {keptView} from '../../../chart-core/settle.js';
import './default.css';

// The figure of a line chart: the label and the table button, the legend,
// the plot (SVG), the summary and the description, the live line, and the
// same data as a table.
//
// The plot is one Tab stop, a role="group" named by the label and described
// by the summary; its axes and lines are aria-hidden, because the summary,
// the live line and the table say what they show. A colour is a class
// (--c1..--c4) and a dash (--d1..--d7), so a series stays itself in forced
// colours and in print. A page's own colour (the colors setting, by the
// series' key) is --custom with its value in a style: the dash stays.

const colourOf = (place, paint) => `sf-chart-line-series--${paint ? 'custom' : `c${(place % 4) + 1}`}${place > 0 ? ` sf-chart-line-series--d${Math.min(place, 7)}` : ''}`;
const paintOf = (paint) => (paint ? `--sf-chart-line--custom: ${paint}` : '');
const paintAttr = (paint) => (paint ? ` style="${esc(paintOf(paint))}"` : '');
const px = (value) => `${Math.round(value * 10) / 10}`;

// The plot's inside is SVG markup set as the svg element's innerHTML (a
// property, so lit writes no part markers inside it: a first-paint snapshot
// of the plot is the same on every run). Every text is escaped.
const ESCAPES = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'};
const esc = (value) => String(value).replace(/[&<>"']/gu, (one) => ESCAPES[one]);

function axesMarkup(g) {
  const {inner} = g;
  let out = '<g class="sf-chart-line-axes" aria-hidden="true">';
  if (g.grid === 'y' || g.grid === 'both') {
    for (const tick of g.yTicks) {
      out += `<line class="${tick.zero ? 'sf-chart-line-baseline' : 'sf-chart-line-grid'}" x1="${px(inner.left)}" x2="${px(inner.right)}" y1="${px(tick.at)}" y2="${px(tick.at)}"/>`;
    }
  }
  if (g.grid === 'x' || g.grid === 'both') {
    for (const tick of g.xTicks) {
      out += `<line class="sf-chart-line-grid" x1="${px(tick.at)}" x2="${px(tick.at)}" y1="${px(inner.top)}" y2="${px(inner.bottom)}"/>`;
    }
  }
  out += `<line class="sf-chart-line-baseline" x1="${px(inner.left)}" x2="${px(inner.right)}" y1="${px(inner.bottom)}" y2="${px(inner.bottom)}"/>`;
  for (const tick of g.yTicks) {
    out += `<text class="sf-chart-line-tick" x="${px(inner.left - 6)}" y="${px(tick.at)}" text-anchor="end" dominant-baseline="middle">${esc(tick.text)}</text>`;
  }
  for (const tick of g.xTicks) {
    out += `<text class="sf-chart-line-tick sf-chart-line-tick--x" x="${px(tick.at)}" y="${px(inner.bottom + g.font * 1.2)}" text-anchor="${tick.anchor}" dominant-baseline="middle">${esc(tick.text)}</text>`;
  }
  if (g.yLabel) out += `<text class="sf-chart-line-axis-label" x="${px(inner.left)}" y="${px(g.font)}" text-anchor="start">${esc(g.yLabel)}</text>`;
  if (g.xLabel) out += `<text class="sf-chart-line-axis-label" x="${px((inner.left + inner.right) / 2)}" y="${px(g.height - 4)}" text-anchor="middle">${esc(g.xLabel)}</text>`;
  return `${out}</g>`;
}

function cursorMarkup(g, cursor, paint) {
  const x = g.px[cursor.index];
  let out = `<line class="sf-chart-line-crosshair" x1="${px(x)}" x2="${px(x)}" y1="${px(g.inner.top)}" y2="${px(g.inner.bottom)}"/>`;
  for (const line of g.lines) {
    const at = line.ys[cursor.index];
    if (at === null) continue;
    const current = line.key === cursor.series;
    out += `<circle class="sf-chart-line-focus ${colourOf(line.place, paint.get(line.key))}${current ? ' sf-chart-line-focus--current' : ''}"${paintAttr(paint.get(line.key))} cx="${px(x)}" cy="${px(at)}" r="${current ? 5 : 3.5}"/>`;
  }
  return out;
}

function linesMarkup(g, cursor, paint) {
  let out = '<g class="sf-chart-line-marks" aria-hidden="true">';
  for (const line of g.lines) {
    const dim = cursor && cursor.series !== line.key ? ' sf-chart-line-series--dim' : '';
    out += `<g class="sf-chart-line-series ${colourOf(line.place, paint.get(line.key))}${dim}"${paintAttr(paint.get(line.key))} data-series="${esc(line.key)}">`;
    if (line.area) out += `<path class="sf-chart-line-area${g.stacked ? ' sf-chart-line-area--layer' : ''}" d="${line.area}"/>`;
    out += `<path class="sf-chart-line-line" d="${line.d}"/>`;
    for (const [x, y] of line.dots) out += `<circle class="sf-chart-line-dot" cx="${px(x)}" cy="${px(y)}" r="2.5"/>`;
    out += '</g>';
  }
  if (cursor) out += cursorMarkup(g, cursor, paint);
  return `${out}</g>`;
}

function renderTooltip(context, g, cursor) {
  if (!cursor || context.tooltip === 'none') return nothing;
  const {component, model} = context;
  const x = g.px[cursor.index];
  const flip = x > g.width / 2;
  return html`
    <div class=${`sf-chart-line-tooltip${flip ? ' sf-chart-line-tooltip--flip' : ''}`} aria-hidden="true"
         style=${`inset-inline-start: ${px(x)}px; inset-block-start: ${px(g.inner.top)}px`}>
      <div class="sf-chart-line-tooltip-x">${component.sayX(model, cursor.index)}</div>
      ${g.lines.map((line) => html`
        <div class=${['sf-chart-line-tooltip-row', colourOf(line.place, context.paint.get(line.key)), line.key === cursor.series ? 'sf-chart-line-tooltip-row--current' : ''].filter(Boolean).join(' ')}
             style=${paintOf(context.paint.get(line.key)) || nothing}>
          <span class="sf-chart-line-swatch"></span>
          <span class="sf-chart-line-tooltip-name">${line.name}</span>
          <span class="sf-chart-line-tooltip-value">${component.sayValue(line, cursor.index)}</span>
        </div>
      `)}
    </div>
  `;
}

function renderLegend(context, place) {
  if (context.legend !== place || context.state !== 'ready') return nothing;
  const {component, model} = context;
  const hidden = new Set(component.hiddenSeries || []);
  return html`
    <div class=${`sf-chart-line-legend sf-chart-line-legend--${place}`} role="group" aria-label=${component.words('legend')}>
      ${model.series.map((one, index) => html`
        <button type="button" class=${`sf-chart-line-legend-item ${colourOf(index, context.paint.get(one.key))}`}
                style=${paintOf(context.paint.get(one.key)) || nothing} aria-pressed=${hidden.has(one.key) ? 'false' : 'true'}
                data-series=${one.key} @click=${() => component.toggleSeries(one.key)}>
          <span class="sf-chart-line-swatch" aria-hidden="true"></span>
          <span class="sf-chart-line-legend-name">${one.name}</span>
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
  return html`
    <div class=${shownTable ? 'sf-chart-line-table' : 'sf-chart-line-sr'}>
      <table>
        <caption>${label}</caption>
        <thead>
          <tr>
            <th scope="col">${context.xLabel || model.xField || component.words('x-column')}</th>
            ${model.series.map((one) => html`<th scope="col">${one.name}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${model.xs.map((_, index) => html`
            <tr>
              <th scope="row">${component.sayX(model, index)}</th>
              ${model.series.map((one) => html`<td>${component.sayY(one.values[index])}</td>`)}
            </tr>
          `)}
        </tbody>
      </table>
    </div>
  `;
}

function renderPlot(context) {
  const {component, geometry: g, uid, state, cursor} = context;
  if (state === 'loading') {
    return html`<div class="sf-chart-line-loading" role="status" aria-busy="true"><span class="sf-chart-line-sr">${component.words('loading')}</span></div>`;
  }
  if (state === 'empty' || state === 'error') {
    return html`
      <sf-empty-state class="sf-chart-line-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
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
    <svg class="sf-chart-line-svg" role="group" tabindex="0" focusable="true"
         aria-label=${context.label} aria-roledescription=${component.words('roledescription')}
         aria-describedby=${described || nothing}
         width=${g.width} height=${g.height} viewBox=${`0 0 ${g.width} ${g.height}`}
         @keydown=${(event) => component.onPlotKey(event)}
         @pointermove=${(event) => component.onPointerMove(event)}
         @pointerleave=${() => component.onPointerLeave()}
         @click=${(event) => component.onPlotClick(event)}
         @blur=${() => component.setCursor(null)}
         .innerHTML=${axesMarkup({...g, grid: context.grid, xLabel: context.xLabel, yLabel: context.yLabel}) + linesMarkup(g, cursor, context.paint)}>
    </svg>
    ${renderTooltip(context, g, cursor)}
  `;
}

export function renderLineChartTemplate(context) {
  const {component, uid, state} = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return html`
    <figure class=${['sf-chart-line', `sf-chart-line--size-${size}`, `sf-chart-line--${state}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-chart-line-head">
        <span class="sf-chart-line-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.table === 'toggle' && state === 'ready'
          ? html`<button type="button" class="sf-chart-line-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>`
          : nothing}
      </figcaption>
      ${renderLegend(context, 'top')}
      <div class="sf-chart-line-plot" ?hidden=${tableView}>${renderPlot(context)}</div>
      ${renderLegend(context, 'bottom')}
      ${context.summaryText ? html`<p class="sf-chart-line-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : nothing}
      ${context.hasDescription ? html`<div class="sf-chart-line-description" id=${`${uid}-description`}>${context.description}</div>` : nothing}
      <div class="sf-chart-line-sr" aria-live="polite">${context.said}</div>
      ${renderTable(context)}
    </figure>
  `;
}
