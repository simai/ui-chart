import {html, nothing} from 'lit';
import {keptView} from '../../../chart-core/settle.js';
import './default.css';

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

const px = (value) => `${Math.round(value * 10) / 10}`;
const tone = (place) => `sf-chart-treemap-c${(place % 8) + 1}`;
const paintOf = (paint, key) => {
  const colour = paint.get(key);
  return colour ? `--sf-chart-treemap--tone: ${colour}; --sf-chart-treemap--wash: color-mix(in srgb, ${colour} 20%, transparent)` : '';
};

// The plot's inside is SVG markup set as the svg element's innerHTML (a
// property, so lit writes no part markers inside it: a first-paint snapshot
// of the plot is the same on every run). Every text is escaped.
const ESCAPES = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'};
const esc = (value) => String(value).replace(/[&<>"']/gu, (one) => ESCAPES[one]);

// One group per group of parts, so a class sets its colour once: the
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
}

// The cursor: a ring round the part.
function cursorMarkup(one) {
  if (!one) return '';
  return `<g class="sf-chart-treemap-cursor" aria-hidden="true"><rect class="sf-chart-treemap-ring" x="${px(one.x - 1)}" y="${px(one.y - 1)}" width="${px(one.w + 2)}" height="${px(one.h + 2)}" rx="3"/></g>`;
}

const swatchMarkup = () => '<svg viewBox="0 0 12 12" focusable="false"><rect class="sf-chart-treemap-part" x="1.5" y="1.5" width="9" height="9" rx="1"/></svg>';

function renderKey(context, place) {
  if (context.legend !== place || context.state !== 'ready') return nothing;
  const {component, paint, model} = context;
  return html`
    <ul class=${`sf-chart-treemap-legend sf-chart-treemap-legend--${place}`} aria-label=${component.words('legend')}>
      ${model.groups.map((group, index) => html`
        <li class=${`sf-chart-treemap-legend-item ${tone(index)}`} style=${paintOf(paint, group.key) || nothing}>
          <span class="sf-chart-treemap-swatch" aria-hidden="true" .innerHTML=${swatchMarkup()}></span>
          <span>${component.sayGroup(group.key)}</span>
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
  if (model.groups.length > 1) rows.push(['group', component.sayGroup(one.group)]);
  rows.push(['value', component.sayY(one.value)], ['share', component.sayShare(one.value, model.total)]);
  return html`
    <div class=${`sf-chart-treemap-tooltip${flip ? ' sf-chart-treemap-tooltip--flip' : ''}`} aria-hidden="true"
         style=${`inset-inline-start: ${px(flip ? one.x : one.x + one.w)}px; inset-block-start: ${px(one.cy)}px`}>
      <div class="sf-chart-treemap-tooltip-name">${component.sayX(one)}</div>
      ${rows.map(([key, value]) => html`
        <div class="sf-chart-treemap-tooltip-row">
          <span>${component.words(key)}</span>
          <span class="sf-chart-treemap-tooltip-value">${value}</span>
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
  const grouped = model.groups.length > 1;
  return html`
    <div class=${shownTable ? 'sf-chart-treemap-table' : 'sf-chart-treemap-sr'}>
      <table>
        <caption>${label}</caption>
        <thead>
          <tr>
            ${grouped ? html`<th scope="col">${model.groupField || component.words('group')}</th>` : nothing}
            <th scope="col">${component.xLabel || model.xField || component.words('part-column')}</th>
            <th scope="col">${component.words('value')}</th>
            <th scope="col">${component.words('share')}</th>
          </tr>
        </thead>
        <tbody>
          ${model.groups.flatMap((group) => group.leaves.map((one) => html`
            <tr>
              ${grouped ? html`<td>${component.sayGroup(group.key)}</td>` : nothing}
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
  const {component, geometry: g, uid, state, cursor, paint} = context;
  if (state === 'loading') {
    return html`<div class="sf-chart-treemap-loading" role="status" aria-busy="true"><span class="sf-chart-treemap-sr">${component.words('loading')}</span></div>`;
  }
  if (state === 'empty' || state === 'error') {
    return html`
      <sf-empty-state class="sf-chart-treemap-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
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
    <svg class="sf-chart-treemap-svg" role="group" tabindex="0" focusable="true"
         aria-label=${context.label} aria-roledescription=${component.words('roledescription')}
         aria-describedby=${described || nothing}
         width=${g.width} height=${g.height} viewBox=${`0 0 ${g.width} ${g.height}`}
         @keydown=${(event) => component.onPlotKey(event)}
         @pointermove=${(event) => component.onPointerMove(event)}
         @pointerleave=${() => component.onPointerLeave()}
         @click=${(event) => component.onPlotClick(event)}
         @blur=${() => component.setCursor(null)}
         .innerHTML=${partsMarkup(g, paint) + cursorMarkup(cursor)}>
    </svg>
    ${renderTooltip(context, g, cursor)}
  `;
}

export function renderTreemapTemplate(context) {
  const {component, uid, state} = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return html`
    <figure class=${['sf-chart-treemap', `sf-chart-treemap--size-${size}`, `sf-chart-treemap--${state}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-chart-treemap-head-row">
        <span class="sf-chart-treemap-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.table === 'toggle' && state === 'ready'
          ? html`<button type="button" class="sf-chart-treemap-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>`
          : nothing}
      </figcaption>
      ${renderKey(context, 'top')}
      <div class="sf-chart-treemap-plot" ?hidden=${tableView}>${renderPlot(context)}</div>
      ${renderKey(context, 'bottom')}
      ${context.summaryText ? html`<p class="sf-chart-treemap-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : nothing}
      ${context.hasDescription ? html`<div class="sf-chart-treemap-description" id=${`${uid}-description`}>${context.description}</div>` : nothing}
      <div class="sf-chart-treemap-sr" aria-live="polite">${context.said}</div>
      ${renderTable(context)}
    </figure>
  `;
}
