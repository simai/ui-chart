import {html, nothing} from 'lit';
import {keptView} from '../../../chart-core/settle.js';
import './default.css';

// The figure of a radar chart: the label and the table button, the legend,
// the plot (SVG), the summary and the description, the live line, and the
// same data as a table.
//
// The plot is one Tab stop, a role="group" named by the label and described
// by the summary; its rings, spokes and marks are aria-hidden, because the
// summary, the live line and the table say what they show. A series is a
// colour class (--c1..--c4) and its values' mark shape (circle, square,
// triangle, diamond, a triangle down), and in forced colours its ring's
// dash too. A page's own colour (the colors setting, by the series' key) is
// --custom with its value in a style.

const colourOf = (place, paint) => `sf-chart-radar-series--${paint ? 'custom' : `c${(place % 4) + 1}`}${place > 0 ? ` sf-chart-radar-series--d${Math.min(place, 7)}` : ''}`;
const paintOf = (paint) => (paint ? `--sf-chart-radar--custom: ${paint}` : '');
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

function markMarkup([cx, cy], r, place, extra = '') {
  const corners = SHAPES[place % SHAPES.length]?.(r);
  if (!corners) return `<circle${extra} cx="${px(cx)}" cy="${px(cy)}" r="${px(r)}"/>`;
  return `<path${extra} d="${corners.map(([x, y], index) => `${index ? 'L' : 'M'}${px(cx + x)} ${px(cy + y)}`).join('')}Z"/>`;
}

const pathOf = (points, closed) => `${points.map(([x, y], index) => `${index ? 'L' : 'M'}${px(x)} ${px(y)}`).join('')}${closed ? 'Z' : ''}`;

function gridMarkup(g) {
  const [cx, cy] = g.center;
  let out = '<g class="sf-chart-radar-axes" aria-hidden="true">';
  for (const ring of g.rings) {
    if (g.grid === 'none' && ring !== g.rings[g.rings.length - 1]) continue;
    out += g.grid === 'circle'
      ? `<circle class="sf-chart-radar-grid" cx="${px(cx)}" cy="${px(cy)}" r="${px(ring.r)}"/>`
      : `<path class="sf-chart-radar-grid" d="${pathOf(ring.points, true)}"/>`;
  }
  for (const spoke of g.spokes) {
    out += `<line class="sf-chart-radar-spoke" x1="${px(cx)}" y1="${px(cy)}" x2="${px(spoke.x)}" y2="${px(spoke.y)}"/>`;
  }
  for (const spoke of g.spokes) {
    out += `<text class="sf-chart-radar-spoke-label" x="${px(spoke.lx)}" y="${px(spoke.ly)}" text-anchor="${spoke.anchor}" dominant-baseline="${spoke.baseline === 'auto' ? 'auto' : spoke.baseline}">${esc(spoke.text)}</text>`;
  }
  return `${out}</g>`;
}

// The scale's values up the first spoke, beside it, over the series with a
// rim of the surface, so a line under one does not cross it out.
function ticksMarkup(g) {
  const [cx, cy] = g.center;
  return `<g class="sf-chart-radar-ticks" aria-hidden="true">${g.rings.map((ring) => `<text class="sf-chart-radar-tick" x="${px(cx + 4)}" y="${px(cy - ring.r)}" dominant-baseline="hanging">${esc(ring.text)}</text>`).join('')}</g>`;
}

function seriesMarkup(g, paint, area) {
  let out = '<g class="sf-chart-radar-marks" aria-hidden="true">';
  for (const one of g.series) {
    let own = '';
    if (area && one.ring.closed) own += `<path class="sf-chart-radar-area" d="${pathOf(one.ring.runs[0], true)}"/>`;
    for (const run of one.ring.runs) {
      own += run.length > 1 ? `<path class="sf-chart-radar-line" d="${pathOf(run, one.ring.closed)}"/>` : '';
    }
    for (const mark of one.marks) own += markMarkup(mark.point, g.dot, one.place, ' class="sf-chart-radar-dot"');
    out += `<g class="sf-chart-radar-series ${colourOf(one.place, paint.get(one.key))}"${paintAttr(paint.get(one.key))} data-series="${esc(one.key)}">${own}</g>`;
  }
  return `${out}</g>`;
}

// The cursor: its spoke drawn heavier and a ring round its value's mark.
function cursorMarkup(g, cursor) {
  if (!cursor) return '';
  const spoke = g.spokes[cursor.index];
  if (!spoke) return '';
  const [cx, cy] = g.center;
  let out = '<g class="sf-chart-radar-cursor" aria-hidden="true">';
  out += `<line class="sf-chart-radar-crosshair" x1="${px(cx)}" y1="${px(cy)}" x2="${px(spoke.x)}" y2="${px(spoke.y)}"/>`;
  const mark = g.series.find((one) => one.key === cursor.series)?.marks.find((one) => one.index === cursor.index);
  if (mark) out += `<circle class="sf-chart-radar-ring" cx="${px(mark.point[0])}" cy="${px(mark.point[1])}" r="${px(g.dot * 1.25 + 4)}"/>`;
  return `${out}</g>`;
}

const swatchMarkup = (place) => `<svg viewBox="-6 -6 12 12" focusable="false"><line x1="-6" x2="6" y1="0" y2="0"/>${markMarkup([0, 0], 3, place)}</svg>`;

// The tooltip at the spoke's end: its name and every shown series' value.
function renderTooltip(context, g, cursor) {
  if (!cursor || context.tooltip === 'none') return nothing;
  const {component, model, shown} = context;
  const spoke = g.spokes[cursor.index];
  if (!spoke) return nothing;
  const flip = spoke.x > g.width / 2;
  const below = spoke.y < g.height / 2;
  return html`
    <div class=${`sf-chart-radar-tooltip${flip ? ' sf-chart-radar-tooltip--flip' : ''}${below ? ' sf-chart-radar-tooltip--below' : ''}`} aria-hidden="true"
         style=${`inset-inline-start: ${px(spoke.x)}px; inset-block-start: ${px(spoke.y)}px`}>
      <div class="sf-chart-radar-tooltip-name">${component.spokeName(model, cursor.index)}</div>
      ${shown.map((one) => html`
        <div class=${`sf-chart-radar-tooltip-row ${colourOf(one.place, context.paint.get(one.key))}${one.key === cursor.series ? ' sf-chart-radar-tooltip-row--on' : ''}`}
             style=${paintOf(context.paint.get(one.key)) || nothing}>
          <span class="sf-chart-radar-swatch" .innerHTML=${swatchMarkup(one.place)}></span>
          <span>${one.name}</span>
          <span class="sf-chart-radar-tooltip-value">${one.values[cursor.index] === null ? component.words('gap') : component.sayY(one.values[cursor.index])}</span>
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
    <div class=${`sf-chart-radar-legend sf-chart-radar-legend--${place}`} role="group" aria-label=${component.words('legend')}>
      ${model.series.map((one, index) => html`
        <button type="button" class=${`sf-chart-radar-legend-item ${colourOf(index, context.paint.get(one.key))}`}
                style=${paintOf(context.paint.get(one.key)) || nothing} aria-pressed=${hidden.has(one.key) ? 'false' : 'true'}
                data-series=${one.key} @click=${() => component.toggleSeries(one.key)}>
          <span class="sf-chart-radar-swatch" aria-hidden="true" .innerHTML=${swatchMarkup(index)}></span>
          <span class="sf-chart-radar-legend-name">${one.name}</span>
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
    <div class=${shownTable ? 'sf-chart-radar-table' : 'sf-chart-radar-sr'}>
      <table>
        <caption>${label}</caption>
        <thead>
          <tr>
            <th scope="col">${component.xLabel || model.xField || component.words('spoke-column')}</th>
            ${model.series.map((one) => html`<th scope="col">${one.name}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${model.labels.map((_, index) => html`
            <tr>
              <th scope="row">${component.spokeName(model, index)}</th>
              ${model.series.map((one) => html`<td>${one.values[index] === null ? '' : component.sayY(one.values[index])}</td>`)}
            </tr>
          `)}
        </tbody>
      </table>
    </div>
  `;
}

function renderPlot(context) {
  const {component, geometry: g, uid, state, cursor, paint} = context;
  if (state === 'loading') {
    return html`<div class="sf-chart-radar-loading" role="status" aria-busy="true"><span class="sf-chart-radar-sr">${component.words('loading')}</span></div>`;
  }
  if (state === 'empty' || state === 'error') {
    return html`
      <sf-empty-state class="sf-chart-radar-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
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
    <svg class="sf-chart-radar-svg" role="group" tabindex="0" focusable="true"
         aria-label=${context.label} aria-roledescription=${component.words('roledescription')}
         aria-describedby=${described || nothing}
         width=${g.width} height=${g.height} viewBox=${`0 0 ${g.width} ${g.height}`}
         @keydown=${(event) => component.onPlotKey(event)}
         @pointermove=${(event) => component.onPointerMove(event)}
         @pointerleave=${() => component.onPointerLeave()}
         @click=${(event) => component.onPlotClick(event)}
         @blur=${() => component.setCursor(null)}
         .innerHTML=${gridMarkup(g) + cursorMarkup(g, cursor) + seriesMarkup(g, paint, context.fill !== 'none') + ticksMarkup(g)}>
    </svg>
    ${renderTooltip(context, g, cursor)}
  `;
}

export function renderRadarTemplate(context) {
  const {component, uid, state} = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return html`
    <figure class=${['sf-chart-radar', `sf-chart-radar--size-${size}`, `sf-chart-radar--${state}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-chart-radar-head">
        <span class="sf-chart-radar-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.table === 'toggle' && state === 'ready'
          ? html`<button type="button" class="sf-chart-radar-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>`
          : nothing}
      </figcaption>
      ${renderLegend(context, 'top')}
      <div class="sf-chart-radar-plot" ?hidden=${tableView}>${renderPlot(context)}</div>
      ${renderLegend(context, 'bottom')}
      ${context.summaryText ? html`<p class="sf-chart-radar-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : nothing}
      ${context.hasDescription ? html`<div class="sf-chart-radar-description" id=${`${uid}-description`}>${context.description}</div>` : nothing}
      <div class="sf-chart-radar-sr" aria-live="polite">${context.said}</div>
      ${renderTable(context)}
    </figure>
  `;
}
