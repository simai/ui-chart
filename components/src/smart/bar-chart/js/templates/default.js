import {html, nothing} from 'lit';
import {guard} from 'lit/directives/guard.js';
import './default.css';

// The figure of a bar chart: the label and the table button, the legend,
// the plot (SVG), the summary and the description, the live line, and the
// same data as a table.
//
// The plot is one Tab stop, a role="group" named by the label and described
// by the summary; its axes and bars are aria-hidden, because the summary,
// the live line and the table say what they show. A colour is a class
// (--c1..--c4), and in forced colours a dash (--d1..--d7) on an outline.

const colourOf = (place) => `sf-bar-chart-series--c${(place % 4) + 1}${place > 0 ? ` sf-bar-chart-series--d${Math.min(place, 7)}` : ' sf-bar-chart-series--solid'}`;
const px = (value) => `${Math.round(value * 10) / 10}`;

// The plot's inside is SVG markup set as the svg element's innerHTML (a
// property, so lit writes no part markers inside it: a first-paint snapshot
// of the plot is the same on every run). Every text is escaped.
const ESCAPES = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'};
const esc = (value) => String(value).replace(/[&<>"']/gu, (one) => ESCAPES[one]);

function axesMarkup(g) {
  const {inner, horizontal} = g;
  let out = '<g class="sf-bar-chart-axes" aria-hidden="true">';
  if (g.grid !== 'none') {
    for (const tick of g.valueTicks) {
      if (tick.zero) continue;
      out += horizontal
        ? `<line class="sf-bar-chart-grid" x1="${px(tick.at)}" x2="${px(tick.at)}" y1="${px(inner.top)}" y2="${px(inner.bottom)}"/>`
        : `<line class="sf-bar-chart-grid" x1="${px(inner.left)}" x2="${px(inner.right)}" y1="${px(tick.at)}" y2="${px(tick.at)}"/>`;
    }
  }
  for (const tick of g.valueTicks) {
    out += horizontal
      ? `<text class="sf-bar-chart-tick" x="${px(tick.at)}" y="${px(inner.bottom + g.font * 1.2)}" text-anchor="${tick.anchor}" dominant-baseline="middle">${esc(tick.text)}</text>`
      : `<text class="sf-bar-chart-tick" x="${px(inner.left - 6)}" y="${px(tick.at)}" text-anchor="end" dominant-baseline="middle">${esc(tick.text)}</text>`;
  }
  for (const tick of g.categoryTicks) {
    out += horizontal
      ? `<text class="sf-bar-chart-tick" x="${px(inner.left - 6)}" y="${px(tick.at)}" text-anchor="end" dominant-baseline="middle">${esc(tick.text)}</text>`
      : `<text class="sf-bar-chart-tick sf-bar-chart-tick--x" x="${px(tick.at)}" y="${px(inner.bottom + g.font * 1.2)}" text-anchor="${tick.anchor}" dominant-baseline="middle">${esc(tick.text)}</text>`;
  }
  if (g.valueLabel) {
    out += horizontal
      ? `<text class="sf-bar-chart-axis-label" x="${px((inner.left + inner.right) / 2)}" y="${px(g.height - 4)}" text-anchor="middle">${esc(g.valueLabel)}</text>`
      : `<text class="sf-bar-chart-axis-label" x="${px(inner.left)}" y="${px(g.font)}" text-anchor="start">${esc(g.valueLabel)}</text>`;
  }
  if (g.categoryLabel && !horizontal) {
    out += `<text class="sf-bar-chart-axis-label" x="${px((inner.left + inner.right) / 2)}" y="${px(g.height - 4)}" text-anchor="middle">${esc(g.categoryLabel)}</text>`;
  }
  return `${out}</g>`;
}

function barsMarkup(g, cursor) {
  let out = '<g class="sf-bar-chart-marks" aria-hidden="true">';
  if (cursor) {
    const band = g.bands[cursor.index];
    out += g.horizontal
      ? `<rect class="sf-bar-chart-band" x="${px(g.inner.left)}" y="${px(band.from)}" width="${px(g.inner.right - g.inner.left)}" height="${px(band.size)}"/>`
      : `<rect class="sf-bar-chart-band" x="${px(band.from)}" y="${px(g.inner.top)}" width="${px(band.size)}" height="${px(g.inner.bottom - g.inner.top)}"/>`;
  }
  for (const group of g.groups) {
    const dim = cursor && cursor.series !== group.key ? ' sf-bar-chart-series--dim' : '';
    out += `<g class="sf-bar-chart-series ${colourOf(group.place)}${dim}" data-series="${esc(group.key)}">`;
    for (const bar of group.bars) out += `<rect class="sf-bar-chart-bar" x="${px(bar.x)}" y="${px(bar.y)}" width="${px(bar.width)}" height="${px(bar.height)}"/>`;
    out += '</g>';
  }
  for (const label of g.valueLabels) {
    out += `<text class="sf-bar-chart-value" x="${px(label.x)}" y="${px(label.y)}" text-anchor="${label.anchor}" dominant-baseline="middle">${esc(label.text)}</text>`;
  }
  // The baseline at zero, over the bars, so a bar is seen to start there.
  out += g.horizontal
    ? `<line class="sf-bar-chart-baseline" x1="${px(g.zero)}" x2="${px(g.zero)}" y1="${px(g.inner.top)}" y2="${px(g.inner.bottom)}"/>`
    : `<line class="sf-bar-chart-baseline" x1="${px(g.inner.left)}" x2="${px(g.inner.right)}" y1="${px(g.zero)}" y2="${px(g.zero)}"/>`;
  if (cursor) {
    const bar = g.groups.find((group) => group.key === cursor.series)?.bars.find((one) => one.index === cursor.index);
    if (bar) out += `<rect class="sf-bar-chart-focus" x="${px(bar.x - 1)}" y="${px(bar.y - 1)}" width="${px(bar.width + 2)}" height="${px(bar.height + 2)}"/>`;
  }
  return `${out}</g>`;
}

function renderTooltip(context, g, cursor) {
  if (!cursor || context.tooltip === 'none') return nothing;
  const {component, model} = context;
  const band = g.bands[cursor.index];
  const middle = band.from + band.size / 2;
  const flip = g.horizontal ? false : middle > g.width / 2;
  const at = g.horizontal
    ? `inset-inline-start: ${px(g.inner.left)}px; inset-block-start: ${px(band.from + band.size)}px`
    : `inset-inline-start: ${px(middle)}px; inset-block-start: ${px(g.inner.top)}px`;
  return html`
    <div class=${`sf-bar-chart-tooltip${flip ? ' sf-bar-chart-tooltip--flip' : ''}`} aria-hidden="true" style=${at}>
      <div class="sf-bar-chart-tooltip-x">${component.sayX(model, cursor.index)}</div>
      ${g.groups.map((group) => html`
        <div class=${['sf-bar-chart-tooltip-row', colourOf(group.place), group.key === cursor.series ? 'sf-bar-chart-tooltip-row--current' : ''].filter(Boolean).join(' ')}>
          <span class="sf-bar-chart-swatch"></span>
          <span class="sf-bar-chart-tooltip-name">${group.name}</span>
          <span class="sf-bar-chart-tooltip-value">${component.sayValue(group, cursor.index)}</span>
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
    <div class=${`sf-bar-chart-legend sf-bar-chart-legend--${place}`} role="group" aria-label=${component.words('legend')}>
      ${model.series.map((one, index) => html`
        <button type="button" class=${`sf-bar-chart-legend-item ${colourOf(index)}`} aria-pressed=${hidden.has(one.key) ? 'false' : 'true'}
                data-series=${one.key} @click=${() => component.toggleSeries(one.key)}>
          <span class="sf-bar-chart-swatch" aria-hidden="true"></span>
          <span class="sf-bar-chart-legend-name">${one.name}</span>
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
  return guard(context.tableKey, () => tableMarkup(context, shownTable));
}

function tableMarkup(context, shownTable) {
  const {component, tableModel: model, label} = context;
  return html`
    <div class=${shownTable ? 'sf-bar-chart-table' : 'sf-bar-chart-sr'}>
      <table>
        <caption>${label}</caption>
        <thead>
          <tr>
            <th scope="col">${context.xLabel || model.xField || component.words('x-column')}</th>
            ${model.series.map((one) => html`<th scope="col">${one.name}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${model.order.map((index) => html`
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
    return html`<div class="sf-bar-chart-loading" role="status" aria-busy="true"><span class="sf-bar-chart-sr">${component.words('loading')}</span></div>`;
  }
  if (state === 'empty' || state === 'error') {
    return html`
      <sf-empty-state class="sf-bar-chart-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
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
    <svg class="sf-bar-chart-svg" role="group" tabindex="0" focusable="true"
         aria-label=${context.label} aria-roledescription=${component.words('roledescription')}
         aria-describedby=${described || nothing}
         width=${g.width} height=${g.height} viewBox=${`0 0 ${g.width} ${g.height}`}
         @keydown=${(event) => component.onPlotKey(event)}
         @pointermove=${(event) => component.onPointerMove(event)}
         @pointerleave=${() => component.onPointerLeave()}
         @click=${(event) => component.onPlotClick(event)}
         @blur=${() => component.setCursor(null)}
         .innerHTML=${axesMarkup({...g, grid: context.grid}) + barsMarkup(g, cursor)}>
    </svg>
    ${renderTooltip(context, g, cursor)}
  `;
}

export function renderBarChartTemplate(context) {
  const {component, uid, state} = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  const classes = ['sf-bar-chart', `sf-bar-chart--size-${size}`, `sf-bar-chart--${state}`, `sf-bar-chart--${context.orientation}`, `sf-bar-chart--stack-${context.stack}`, context.rootClass];
  return html`
    <figure class=${classes.filter(Boolean).join(' ')} aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-bar-chart-head">
        <span class="sf-bar-chart-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.table === 'toggle' && state === 'ready'
          ? html`<button type="button" class="sf-bar-chart-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>`
          : nothing}
      </figcaption>
      ${renderLegend(context, 'top')}
      <div class="sf-bar-chart-plot" ?hidden=${tableView}>${renderPlot(context)}</div>
      ${renderLegend(context, 'bottom')}
      ${context.summaryText ? html`<p class="sf-bar-chart-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : nothing}
      ${context.hasDescription ? html`<div class="sf-bar-chart-description" id=${`${uid}-description`}>${context.description}</div>` : nothing}
      <div class="sf-bar-chart-sr" aria-live="polite">${context.said}</div>
      ${renderTable(context)}
    </figure>
  `;
}
