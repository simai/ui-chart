import {html, nothing} from 'lit';
import './default.css';

// The figure of a line chart: the label and the table button, the legend,
// the plot (SVG), the summary and the description, the live line, and the
// same data as a table.
//
// The plot is one Tab stop, a role="group" named by the label and described
// by the summary; its axes and lines are aria-hidden, because the summary,
// the live line and the table say what they show. A colour is a class
// (--c1..--c4) and a dash (--d1..--d7), so a series stays itself in forced
// colours and in print.

const colourOf = (place) => `sf-line-chart-series--c${(place % 4) + 1}${place > 0 ? ` sf-line-chart-series--d${Math.min(place, 7)}` : ''}`;
const px = (value) => `${Math.round(value * 10) / 10}`;

// The plot's inside is SVG markup set as the svg element's innerHTML (a
// property, so lit writes no part markers inside it: a first-paint snapshot
// of the plot is the same on every run). Every text is escaped.
const ESCAPES = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'};
const esc = (value) => String(value).replace(/[&<>"']/gu, (one) => ESCAPES[one]);

function axesMarkup(g) {
  const {inner} = g;
  let out = '<g class="sf-line-chart-axes" aria-hidden="true">';
  if (g.grid === 'y' || g.grid === 'both') {
    for (const tick of g.yTicks) {
      out += `<line class="${tick.zero ? 'sf-line-chart-baseline' : 'sf-line-chart-grid'}" x1="${px(inner.left)}" x2="${px(inner.right)}" y1="${px(tick.at)}" y2="${px(tick.at)}"/>`;
    }
  }
  if (g.grid === 'x' || g.grid === 'both') {
    for (const tick of g.xTicks) {
      out += `<line class="sf-line-chart-grid" x1="${px(tick.at)}" x2="${px(tick.at)}" y1="${px(inner.top)}" y2="${px(inner.bottom)}"/>`;
    }
  }
  out += `<line class="sf-line-chart-baseline" x1="${px(inner.left)}" x2="${px(inner.right)}" y1="${px(inner.bottom)}" y2="${px(inner.bottom)}"/>`;
  for (const tick of g.yTicks) {
    out += `<text class="sf-line-chart-tick" x="${px(inner.left - 6)}" y="${px(tick.at)}" text-anchor="end" dominant-baseline="middle">${esc(tick.text)}</text>`;
  }
  for (const tick of g.xTicks) {
    out += `<text class="sf-line-chart-tick sf-line-chart-tick--x" x="${px(tick.at)}" y="${px(inner.bottom + g.font * 1.2)}" text-anchor="${tick.anchor}" dominant-baseline="middle">${esc(tick.text)}</text>`;
  }
  if (g.yLabel) out += `<text class="sf-line-chart-axis-label" x="${px(inner.left)}" y="${px(g.font)}" text-anchor="start">${esc(g.yLabel)}</text>`;
  if (g.xLabel) out += `<text class="sf-line-chart-axis-label" x="${px((inner.left + inner.right) / 2)}" y="${px(g.height - 4)}" text-anchor="middle">${esc(g.xLabel)}</text>`;
  return `${out}</g>`;
}

function cursorMarkup(g, cursor) {
  const x = g.px[cursor.index];
  let out = `<line class="sf-line-chart-crosshair" x1="${px(x)}" x2="${px(x)}" y1="${px(g.inner.top)}" y2="${px(g.inner.bottom)}"/>`;
  for (const line of g.lines) {
    const at = line.ys[cursor.index];
    if (at === null) continue;
    const current = line.key === cursor.series;
    out += `<circle class="sf-line-chart-focus ${colourOf(line.place)}${current ? ' sf-line-chart-focus--current' : ''}" cx="${px(x)}" cy="${px(at)}" r="${current ? 5 : 3.5}"/>`;
  }
  return out;
}

function linesMarkup(g, cursor) {
  let out = '<g class="sf-line-chart-marks" aria-hidden="true">';
  for (const line of g.lines) {
    const dim = cursor && cursor.series !== line.key ? ' sf-line-chart-series--dim' : '';
    out += `<g class="sf-line-chart-series ${colourOf(line.place)}${dim}" data-series="${esc(line.key)}">`;
    if (line.area) out += `<path class="sf-line-chart-area${g.stacked ? ' sf-line-chart-area--layer' : ''}" d="${line.area}"/>`;
    out += `<path class="sf-line-chart-line" d="${line.d}"/>`;
    for (const [x, y] of line.dots) out += `<circle class="sf-line-chart-dot" cx="${px(x)}" cy="${px(y)}" r="2.5"/>`;
    out += '</g>';
  }
  if (cursor) out += cursorMarkup(g, cursor);
  return `${out}</g>`;
}

function renderTooltip(context, g, cursor) {
  if (!cursor || context.tooltip === 'none') return nothing;
  const {component, model} = context;
  const x = g.px[cursor.index];
  const flip = x > g.width / 2;
  return html`
    <div class=${`sf-line-chart-tooltip${flip ? ' sf-line-chart-tooltip--flip' : ''}`} aria-hidden="true"
         style=${`inset-inline-start: ${px(x)}px; inset-block-start: ${px(g.inner.top)}px`}>
      <div class="sf-line-chart-tooltip-x">${component.sayX(model, cursor.index)}</div>
      ${g.lines.map((line) => html`
        <div class=${['sf-line-chart-tooltip-row', colourOf(line.place), line.key === cursor.series ? 'sf-line-chart-tooltip-row--current' : ''].filter(Boolean).join(' ')}>
          <span class="sf-line-chart-swatch"></span>
          <span class="sf-line-chart-tooltip-name">${line.name}</span>
          <span class="sf-line-chart-tooltip-value">${component.sayValue(line, cursor.index)}</span>
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
    <div class=${`sf-line-chart-legend sf-line-chart-legend--${place}`} role="group" aria-label=${component.words('legend')}>
      ${model.series.map((one, index) => html`
        <button type="button" class=${`sf-line-chart-legend-item ${colourOf(index)}`} aria-pressed=${hidden.has(one.key) ? 'false' : 'true'}
                data-series=${one.key} @click=${() => component.toggleSeries(one.key)}>
          <span class="sf-line-chart-swatch" aria-hidden="true"></span>
          <span class="sf-line-chart-legend-name">${one.name}</span>
        </button>
      `)}
    </div>
  `;
}

function renderTable(context) {
  const {component, model, label} = context;
  const shownTable = context.table === 'visible' || (context.table === 'toggle' && context.view === 'table');
  if (context.state !== 'ready' || (!shownTable && context.table !== 'hidden')) return nothing;
  return html`
    <div class=${shownTable ? 'sf-line-chart-table' : 'sf-line-chart-sr'}>
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
    return html`<div class="sf-line-chart-loading" role="status" aria-busy="true"><span class="sf-line-chart-sr">${component.words('loading')}</span></div>`;
  }
  if (state === 'empty' || state === 'error') {
    return html`
      <sf-empty-state class="sf-line-chart-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
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
    <svg class="sf-line-chart-svg" role="group" tabindex="0" focusable="true"
         aria-label=${context.label} aria-roledescription=${component.words('roledescription')}
         aria-describedby=${described || nothing}
         width=${g.width} height=${g.height} viewBox=${`0 0 ${g.width} ${g.height}`}
         @keydown=${(event) => component.onPlotKey(event)}
         @pointermove=${(event) => component.onPointerMove(event)}
         @pointerleave=${() => component.onPointerLeave()}
         @click=${(event) => component.onPlotClick(event)}
         @blur=${() => component.setCursor(null)}
         .innerHTML=${axesMarkup({...g, grid: context.grid, xLabel: context.xLabel, yLabel: context.yLabel}) + linesMarkup(g, cursor)}>
    </svg>
    ${renderTooltip(context, g, cursor)}
  `;
}

export function renderLineChartTemplate(context) {
  const {component, uid, state} = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return html`
    <figure class=${['sf-line-chart', `sf-line-chart--size-${size}`, `sf-line-chart--${state}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-line-chart-head">
        <span class="sf-line-chart-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.table === 'toggle' && state === 'ready'
          ? html`<button type="button" class="sf-line-chart-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>`
          : nothing}
      </figcaption>
      ${renderLegend(context, 'top')}
      <div class="sf-line-chart-plot" ?hidden=${tableView}>${renderPlot(context)}</div>
      ${renderLegend(context, 'bottom')}
      ${context.summaryText ? html`<p class="sf-line-chart-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : nothing}
      ${context.hasDescription ? html`<div class="sf-line-chart-description" id=${`${uid}-description`}>${context.description}</div>` : nothing}
      <div class="sf-line-chart-sr" aria-live="polite">${context.said}</div>
      ${renderTable(context)}
    </figure>
  `;
}
