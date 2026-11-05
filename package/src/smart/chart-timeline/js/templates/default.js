import {html, nothing} from 'lit';
import {keptView} from '../../../chart-core/settle.js';
import './default.css';

// The figure of a timeline: the label and the table button, the key of the
// statuses, the plot (SVG), the summary and the description, the live line,
// and the same data as a table.
//
// The plot is one Tab stop, a role="group" named by the label and described
// by the summary; its marks are aria-hidden, because the summary, the live
// line and the table say what they show. A range takes a chart colour by its
// status's place (--sf-chart-1..8), or a page's own (the colors setting, by
// status key) set in a style as --tone. In forced colours every range is the
// canvas with a line of the text colour, a line of its own per status.

const px = (value) => `${Math.round(value * 10) / 10}`;
const tone = (place) => `sf-chart-timeline-c${(place % 8) + 1}`;
const paintOf = (paint, key) => {
  const colour = paint.get(key);
  return colour ? `--sf-chart-timeline--tone: ${colour}` : '';
};

// The plot's inside is SVG markup set as the svg element's innerHTML (a
// property, so lit writes no part markers inside it: a first-paint snapshot
// of the plot is the same on every run). Every text is escaped.
const ESCAPES = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'};
const esc = (value) => String(value).replace(/[&<>"']/gu, (one) => ESCAPES[one]);

// The rows' lines and names, the time grid and its labels.
function frameMarkup(g) {
  let out = '<g class="sf-chart-timeline-frame" aria-hidden="true">';
  for (const at of g.gridTicks) {
    if (at < g.inner.left || at > g.inner.right) continue;
    out += `<line class="sf-chart-timeline-grid" x1="${px(at)}" x2="${px(at)}" y1="${px(g.inner.top)}" y2="${px(g.inner.bottom)}"/>`;
  }
  g.lanes.forEach((lane, index) => {
    if (index) out += `<line class="sf-chart-timeline-lane" x1="0" x2="${px(g.inner.right)}" y1="${px(lane.y)}" y2="${px(lane.y)}"/>`;
    if (lane.text) out += `<text class="sf-chart-timeline-name" x="0" y="${px(lane.cy)}" dominant-baseline="middle">${esc(lane.text)}</text>`;
  });
  out += `<line class="sf-chart-timeline-axis" x1="${px(g.inner.left)}" x2="${px(g.inner.right)}" y1="${px(g.inner.bottom)}" y2="${px(g.inner.bottom)}"/>`;
  for (const tick of g.xTicks) {
    out += `<text class="sf-chart-timeline-tick" x="${px(tick.at)}" y="${px(g.inner.bottom + g.font * 1.2)}" text-anchor="middle">${esc(tick.text)}</text>`;
  }
  return `${out}</g>`;
}

const diamond = (one) => `M${px(one.cx)} ${px(one.y)}L${px(one.x + one.w)} ${px(one.cy)}L${px(one.cx)} ${px(one.y + one.h)}L${px(one.x)} ${px(one.cy)}Z`;

// One group per status, so a class sets its colour once.
function rangesMarkup(g, model, paint) {
  let out = '<g class="sf-chart-timeline-marks" aria-hidden="true">';
  const tones = model.statusField ? model.statuses.map((key, place) => ({key, place})) : [{key: '', place: 0}];
  for (const {key, place} of tones) {
    const style = model.statusField ? paintOf(paint, key) : '';
    out += `<g class="sf-chart-timeline-status ${tone(place)}"${style ? ` style="${esc(style)}"` : ''} data-status="${esc(key)}">`;
    for (const one of g.ranges) {
      if (one.tone !== place) continue;
      out += one.milestone
        ? `<path class="sf-chart-timeline-milestone" d="${diamond(one)}"/>`
        : `<rect class="sf-chart-timeline-range" x="${px(one.x)}" y="${px(one.y)}" width="${px(one.w)}" height="${px(one.h)}" rx="${one.w > 6 ? 2 : 0}"/>`;
    }
    out += '</g>';
  }
  return `${out}</g>`;
}

/**
 * The plot's marks as SVG markup, for this element and for a component that
 * composes the timeline (an editable Gantt chart draws its rows with it and
 * adds its own layer on top): the frame, then the ranges by status. `g` is
 * chart-core/timeline timelineLayout's, `paint` the page's colours by status.
 */
export function timelineMarks(g, model, paint = new Map()) {
  return frameMarkup(g) + rangesMarkup(g, model, paint);
}

// The cursor: a ring round the range.
function cursorMarkup(one) {
  if (!one) return '';
  return `<g class="sf-chart-timeline-cursor" aria-hidden="true"><rect class="sf-chart-timeline-ring" x="${px(one.x - 2)}" y="${px(one.y - 2)}" width="${px(one.w + 4)}" height="${px(one.h + 4)}" rx="3"/></g>`;
}

const swatchMarkup = () => '<svg viewBox="0 0 12 12" focusable="false"><rect class="sf-chart-timeline-range" x="1" y="3" width="10" height="6" rx="1"/></svg>';

function renderKey(context, place) {
  if (context.legend !== place || context.state !== 'ready') return nothing;
  const {component, paint, model} = context;
  return html`
    <ul class=${`sf-chart-timeline-legend sf-chart-timeline-legend--${place}`} aria-label=${component.words('legend')}>
      ${model.statuses.map((key, index) => html`
        <li class=${`sf-chart-timeline-legend-item ${tone(index)}`} style=${paintOf(paint, key) || nothing}>
          <span class="sf-chart-timeline-swatch" aria-hidden="true" .innerHTML=${swatchMarkup()}></span>
          <span>${component.sayStatus(key)}</span>
        </li>
      `)}
    </ul>
  `;
}

function renderTooltip(context, g, one) {
  if (!one || context.tooltip === 'none') return nothing;
  const {component, model} = context;
  const flip = one.cx > g.width / 2;
  const rows = [];
  if (model.statusField) rows.push(['status', component.sayStatus(one.status)]);
  if (one.milestone) {
    rows.push(['at', component.sayTime(one.start)]);
  } else {
    rows.push(['start', component.sayTime(one.start)], ['end', component.sayTime(one.end)], ['duration', component.sayDuration(one.end - one.start)]);
  }
  return html`
    <div class=${`sf-chart-timeline-tooltip${flip ? ' sf-chart-timeline-tooltip--flip' : ''}`} aria-hidden="true"
         style=${`inset-inline-start: ${px(flip ? one.x : one.x + one.w)}px; inset-block-start: ${px(one.cy)}px`}>
      <div class="sf-chart-timeline-tooltip-name">${component.sayLane(one.lane, one.place)}</div>
      ${rows.map(([key, value]) => html`
        <div class="sf-chart-timeline-tooltip-row">
          <span>${component.words(key)}</span>
          <span class="sf-chart-timeline-tooltip-value">${value}</span>
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

function tableMarkup(context, shownTable) {
  const {component, tableModel: model, label} = context;
  const statuses = Boolean(model.statusField);
  return html`
    <div class=${shownTable ? 'sf-chart-timeline-table' : 'sf-chart-timeline-sr'}>
      <table>
        <caption>${label}</caption>
        <thead>
          <tr>
            <th scope="col">${component.rowLabel || model.rowField || component.words('row-column')}</th>
            ${statuses ? html`<th scope="col">${component.words('status')}</th>` : nothing}
            <th scope="col">${component.words('start')}</th>
            <th scope="col">${component.words('end')}</th>
            <th scope="col">${component.words('duration')}</th>
          </tr>
        </thead>
        <tbody>
          ${model.ranges.map((one) => html`
            <tr>
              <th scope="row">${component.sayLane(one.lane, one.place)}</th>
              ${statuses ? html`<td>${component.sayStatus(one.status)}</td>` : nothing}
              <td>${component.sayTime(one.start)}</td>
              <td>${component.sayTime(one.end)}</td>
              <td>${one.start === one.end ? component.words('milestone') : component.sayDuration(one.end - one.start)}</td>
            </tr>
          `)}
        </tbody>
      </table>
    </div>
  `;
}

function renderPlot(context) {
  const {component, geometry: g, uid, state, cursor, paint, model} = context;
  if (state === 'loading') {
    return html`<div class="sf-chart-timeline-loading" role="status" aria-busy="true"><span class="sf-chart-timeline-sr">${component.words('loading')}</span></div>`;
  }
  if (state === 'empty' || state === 'error') {
    return html`
      <sf-empty-state class="sf-chart-timeline-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
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
    <svg class="sf-chart-timeline-svg" role="group" tabindex="0" focusable="true"
         aria-label=${context.label} aria-roledescription=${component.words('roledescription')}
         aria-describedby=${described || nothing}
         width=${g.width} height=${g.height} viewBox=${`0 0 ${g.width} ${g.height}`}
         @keydown=${(event) => component.onPlotKey(event)}
         @pointermove=${(event) => component.onPointerMove(event)}
         @pointerleave=${() => component.onPointerLeave()}
         @click=${(event) => component.onPlotClick(event)}
         @blur=${() => component.setCursor(null)}
         .innerHTML=${timelineMarks(g, model, paint) + cursorMarkup(cursor)}>
    </svg>
    ${renderTooltip(context, g, cursor)}
  `;
}

export function renderTimelineTemplate(context) {
  const {component, uid, state} = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return html`
    <figure class=${['sf-chart-timeline', `sf-chart-timeline--size-${size}`, `sf-chart-timeline--${state}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-chart-timeline-head-row">
        <span class="sf-chart-timeline-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.table === 'toggle' && state === 'ready'
          ? html`<button type="button" class="sf-chart-timeline-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>`
          : nothing}
      </figcaption>
      ${renderKey(context, 'top')}
      <div class="sf-chart-timeline-plot" ?hidden=${tableView}>${renderPlot(context)}</div>
      ${renderKey(context, 'bottom')}
      ${context.summaryText ? html`<p class="sf-chart-timeline-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : nothing}
      ${context.hasDescription ? html`<div class="sf-chart-timeline-description" id=${`${uid}-description`}>${context.description}</div>` : nothing}
      <div class="sf-chart-timeline-sr" aria-live="polite">${context.said}</div>
      ${renderTable(context)}
    </figure>
  `;
}
