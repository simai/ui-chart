import {html, nothing} from 'lit';
import {keptView} from '../../../chart-core/settle.js';
import './default.css';

// The figure of a choropleth map: the label and the table button, the
// legend of the steps, the plot (SVG), the summary and the description,
// the live line, and every region as a row of a table.
//
// The plot is one Tab stop, a role="group" named by the label and described
// by the summary; its regions are aria-hidden, because the summary, the
// live line and the table say what they show. A region is filled by its
// step on the theme's tone ladder (chart-core/heat), the steps' fills and
// inks set once on the plot; a region without a value is the empty
// surface with a dashed line, so it is not read as the weakest step. In
// forced colours a region is the canvas with a line of the text colour.

const px = (value) => `${Math.round(value * 10) / 10}`;
const stepColours = (steps) => steps.map((step, index) => `--sf-chart-map--fill-${index}: ${step.fill}; --sf-chart-map--ink-${index}: ${step.ink}`).join('; ');

// The plot's inside is SVG markup set as the svg element's innerHTML (a
// property, so lit writes no part markers inside it: a first-paint snapshot
// of the plot is the same on every run). Every text is escaped.
const ESCAPES = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'};
const esc = (value) => String(value).replace(/[&<>"']/gu, (one) => ESCAPES[one]);

// A path per region in its step, its name in the middle where it fits;
// the cursor's region drawn again on top with a ring.
function marksMarkup(g, cursor) {
  let out = '<g class="sf-chart-map-marks" aria-hidden="true">';
  for (const one of g.regions) {
    const step = one.step >= 0 ? ` data-step="${one.step}"` : '';
    out += `<g class="sf-chart-map-region${one.step >= 0 ? '' : ' sf-chart-map-region--gap'}"${step} data-region="${esc(one.key)}">`;
    out += `<path class="sf-chart-map-area" d="${one.path}"/>`;
    if (one.nameText) out += `<text class="sf-chart-map-name" x="${px(one.x)}" y="${px(one.y)}" text-anchor="middle" dominant-baseline="middle">${esc(one.nameText)}</text>`;
    out += '</g>';
  }
  out += '</g>';
  if (cursor) out += `<g class="sf-chart-map-cursor" aria-hidden="true"><path class="sf-chart-map-ring" d="${cursor.path}"/></g>`;
  return out;
}

// The scale's legend: a swatch per step with its range, and the gap when a
// region has no value.
function renderKey(context, place) {
  if (context.legend !== place || context.state !== 'ready' || !context.steps.length) return nothing;
  const {component, steps, model} = context;
  return html`
    <ul class=${`sf-chart-map-legend sf-chart-map-legend--${place}`} aria-label=${component.words('legend')}>
      ${steps.map((step) => html`
        <li class="sf-chart-map-legend-item">
          <span class="sf-chart-map-swatch" aria-hidden="true" style=${`--sf-chart-map--fill: ${step.fill}`}></span>
          <span class="sf-chart-map-legend-range">${component.sayStep(step)}</span>
        </li>
      `)}
      ${model.gaps ? html`
        <li class="sf-chart-map-legend-item">
          <span class="sf-chart-map-swatch sf-chart-map-swatch--gap" aria-hidden="true"></span>
          <span class="sf-chart-map-legend-range">${component.words('gap')}</span>
        </li>
      ` : nothing}
    </ul>
  `;
}

function renderTooltip(context, g) {
  const {component, model, cursor} = context;
  if (context.tooltip === 'none' || !cursor) return nothing;
  const one = model.regions[cursor.index];
  const rows = one.value === null ? [['value', component.words('gap')]] : [['value', component.sayY(one.value)], ['rank', component.words('rank-of', {rank: String(one.rank), count: String(model.count)})]];
  const flip = cursor.x > g.width / 2;
  return html`
    <div class=${`sf-chart-map-tooltip${flip ? ' sf-chart-map-tooltip--flip' : ''}`} aria-hidden="true"
         style=${`inset-inline-start: ${px(flip ? cursor.box.x : cursor.box.x + cursor.box.w)}px; inset-block-start: ${px(cursor.y)}px`}>
      <div class="sf-chart-map-tooltip-name">${one.name}</div>
      ${rows.map(([key, value]) => html`
        <div class="sf-chart-map-tooltip-row">
          <span>${component.words(key)}</span>
          <span class="sf-chart-map-tooltip-value">${value}</span>
        </div>
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

// A row per region, largest value first, the regions without one last.
function tableMarkup(context, shownTable) {
  const {component, tableModel: model, label} = context;
  const rows = [...model.ranked, ...model.regions.filter((one) => one.value === null)];
  return html`
    <div class=${shownTable ? 'sf-chart-map-table' : 'sf-chart-map-sr'}>
      <table>
        <caption>${label}</caption>
        <thead>
          <tr>
            <th scope="col">${component.words('region')}</th>
            <th scope="col">${component.words('value')}</th>
            <th scope="col">${component.words('rank')}</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((one) => html`
            <tr>
              <th scope="row">${one.name}</th>
              <td>${one.value === null ? component.words('gap') : component.sayY(one.value)}</td>
              <td>${one.value === null ? '—' : one.rank}</td>
            </tr>
          `)}
        </tbody>
      </table>
    </div>
  `;
}

function renderPlot(context) {
  const {component, geometry: g, uid, state, cursor, steps} = context;
  if (state === 'loading') {
    return html`<div class="sf-chart-map-loading" role="status" aria-busy="true"><span class="sf-chart-map-sr">${component.words('loading')}</span></div>`;
  }
  if (state === 'empty' || state === 'error') {
    return html`
      <sf-empty-state class="sf-chart-map-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
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
    <svg class="sf-chart-map-svg" role="group" tabindex="0" focusable="true"
         aria-label=${context.label} aria-roledescription=${component.words('roledescription')}
         aria-describedby=${described || nothing}
         width=${g.width} height=${g.height} viewBox=${`0 0 ${g.width} ${g.height}`} style=${stepColours(steps)}
         @keydown=${(event) => component.onPlotKey(event)}
         @pointermove=${(event) => component.onPointerMove(event)}
         @pointerleave=${() => component.onPointerLeave()}
         @click=${(event) => component.onPlotClick(event)}
         @blur=${() => component.setCursor(null)}
         .innerHTML=${marksMarkup(g, cursor)}>
    </svg>
    ${renderTooltip(context, g)}
  `;
}

export function renderMapTemplate(context) {
  const {component, uid, state} = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return html`
    <figure class=${['sf-chart-map', `sf-chart-map--size-${size}`, `sf-chart-map--${state}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-chart-map-head-row">
        <span class="sf-chart-map-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.table === 'toggle' && state === 'ready'
          ? html`<button type="button" class="sf-chart-map-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>`
          : nothing}
      </figcaption>
      ${renderKey(context, 'top')}
      <div class="sf-chart-map-plot" ?hidden=${tableView}>${renderPlot(context)}</div>
      ${renderKey(context, 'bottom')}
      ${context.summaryText ? html`<p class="sf-chart-map-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : nothing}
      ${context.hasDescription ? html`<div class="sf-chart-map-description" id=${`${uid}-description`}>${context.description}</div>` : nothing}
      <div class="sf-chart-map-sr" aria-live="polite">${context.said}</div>
      ${renderTable(context)}
    </figure>
  `;
}
