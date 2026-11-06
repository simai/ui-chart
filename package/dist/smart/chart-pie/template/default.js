import {html, nothing} from 'lit';
import {keptView} from '../../../chart-core/settle.js';
import './default.css';

// The figure of a pie chart: the label and the table button, the plot (SVG)
// with the legend beside it or under it, the summary and the description,
// the live line, and the same data as a table.
//
// The plot is one Tab stop, a role="group" named by the label and described
// by the summary; its slices are aria-hidden, because the summary, the live
// line, the legend and the table say what they show. A colour is a class
// (--c1..--c4, then lighter --t2); the order, a separator and the share
// inside tell the parts apart as well. A page's own colour (the colors
// setting, by the category) is --custom with its value in a style.

const colourOf = (place, paint) => (paint ? 'sf-chart-pie-series--custom'
  : `sf-chart-pie-series--c${(place % 4) + 1}${place >= 4 ? ' sf-chart-pie-series--t2' : ''}`);
const paintOf = (paint) => (paint ? `--sf-chart-pie--custom: ${paint}` : '');
const paintAttr = (paint) => (paint ? ` style="${esc(paintOf(paint))}"` : '');
const px = (value) => `${Math.round(value * 10) / 10}`;

// The plot's inside is SVG markup set as the svg element's innerHTML (a
// property, so lit writes no part markers inside it: a first-paint snapshot
// of the plot is the same on every run). Every text is escaped.
const ESCAPES = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'};
const esc = (value) => String(value).replace(/[&<>"']/gu, (one) => ESCAPES[one]);

function slicesMarkup(g, cursor, paint) {
  let out = '<g class="sf-chart-pie-marks" aria-hidden="true">';
  for (const slice of g.slices) {
    const dim = cursor && cursor.index !== slice.index ? ' sf-chart-pie-series--dim' : '';
    out += `<g class="sf-chart-pie-series ${colourOf(slice.place, paint.get(slice.key))}${dim}"${paintAttr(paint.get(slice.key))} data-part="${esc(slice.key)}">`;
    out += `<path class="sf-chart-pie-slice" d="${slice.d}"/>`;
    if (slice.label) out += `<text class="sf-chart-pie-share" x="${px(slice.label.x)}" y="${px(slice.label.y)}" text-anchor="middle" dominant-baseline="middle">${esc(slice.label.text)}</text>`;
    out += '</g>';
  }
  if (g.total) {
    out += `<text class="sf-chart-pie-total" x="${px(g.cx)}" y="${px(g.cy - g.font * 0.1)}" text-anchor="middle" font-size="${px(g.font * 1.6)}">${esc(g.total)}</text>`;
    out += `<text class="sf-chart-pie-total-word" x="${px(g.cx)}" y="${px(g.cy + g.font * 1.3)}" text-anchor="middle">${esc(g.totalWord)}</text>`;
  }
  const current = cursor && g.slices.find((slice) => slice.index === cursor.index);
  if (current) out += `<path class="sf-chart-pie-focus" d="${current.d}"/>`;
  return `${out}</g>`;
}

function renderTooltip(context, g, cursor) {
  if (!cursor || context.tooltip === 'none') return nothing;
  const {component} = context;
  const part = context.parts[cursor.index];
  const slice = g.slices.find((one) => one.index === cursor.index);
  if (!part || !slice) return nothing;
  const flip = slice.tip.x > g.width / 2;
  return html`
    <div class=${`sf-chart-pie-tooltip${flip ? ' sf-chart-pie-tooltip--flip' : ''}`} aria-hidden="true"
         style=${`inset-inline-start: ${px(slice.tip.x)}px; inset-block-start: ${px(slice.tip.y)}px`}>
      <div class=${`sf-chart-pie-tooltip-row sf-chart-pie-tooltip-row--current ${colourOf(slice.place, context.paint.get(slice.key))}`}
           style=${paintOf(context.paint.get(slice.key)) || nothing}>
        <span class="sf-chart-pie-swatch"></span>
        <span class="sf-chart-pie-tooltip-name">${part.name}</span>
        <span class="sf-chart-pie-tooltip-value">${component.sayPart(part)}</span>
      </div>
    </div>
  `;
}

function renderLegend(context) {
  if (context.legend === 'none' || context.state !== 'ready') return nothing;
  const {component, parts} = context;
  const hidden = new Set(component.hiddenParts || []);
  return html`
    <div class="sf-chart-pie-legend" role="group" aria-label=${component.words('legend')}>
      ${parts.map((part) => html`
        <button type="button" class=${`sf-chart-pie-legend-item ${colourOf(part.place, context.paint.get(part.key))}`}
                style=${paintOf(context.paint.get(part.key)) || nothing} aria-pressed=${hidden.has(part.key) ? 'false' : 'true'}
                data-part=${part.key} @click=${() => component.togglePart(part.key)}>
          <span class="sf-chart-pie-swatch" aria-hidden="true"></span>
          <span class="sf-chart-pie-legend-name">${part.name}</span>
          ${hidden.has(part.key) ? nothing : html`<span class="sf-chart-pie-legend-share">${component.sayShare(part.share)}</span>`}
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
  const {component, label} = context;
  return html`
    <div class=${shownTable ? 'sf-chart-pie-table' : 'sf-chart-pie-sr'}>
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
          ${context.rows.map((row) => html`
            <tr>
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
  const {component, geometry: g, uid, state, cursor} = context;
  if (state === 'loading') {
    return html`<div class="sf-chart-pie-loading" role="status" aria-busy="true"><span class="sf-chart-pie-sr">${component.words('loading')}</span></div>`;
  }
  if (state === 'empty' || state === 'error') {
    return html`
      <sf-empty-state class="sf-chart-pie-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
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
    <svg class="sf-chart-pie-svg" role="group" tabindex="0" focusable="true"
         aria-label=${context.label} aria-roledescription=${component.words('roledescription')}
         aria-describedby=${described || nothing}
         width=${g.width} height=${g.height} viewBox=${`0 0 ${g.width} ${g.height}`}
         @keydown=${(event) => component.onPlotKey(event)}
         @pointermove=${(event) => component.onPointerMove(event)}
         @pointerleave=${() => component.onPointerLeave()}
         @click=${(event) => component.onPlotClick(event)}
         @blur=${() => component.setCursor(null)}
         .innerHTML=${slicesMarkup(g, cursor, context.paint)}>
    </svg>
    ${renderTooltip(context, g, cursor)}
  `;
}

export function renderPieChartTemplate(context) {
  const {component, uid, state} = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return html`
    <figure class=${['sf-chart-pie', `sf-chart-pie--size-${size}`, `sf-chart-pie--${state}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-chart-pie-head">
        <span class="sf-chart-pie-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.table === 'toggle' && state === 'ready'
          ? html`<button type="button" class="sf-chart-pie-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>`
          : nothing}
      </figcaption>
      <div class="sf-chart-pie-body">
        <div class="sf-chart-pie-layout" ?hidden=${tableView}>
          <div class="sf-chart-pie-plot">${renderPlot(context)}</div>
          ${renderLegend(context)}
        </div>
      </div>
      ${context.summaryText ? html`<p class="sf-chart-pie-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : nothing}
      ${context.hasDescription ? html`<div class="sf-chart-pie-description" id=${`${uid}-description`}>${context.description}</div>` : nothing}
      <div class="sf-chart-pie-sr" aria-live="polite">${context.said}</div>
      ${renderTable(context)}
    </figure>
  `;
}
