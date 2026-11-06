import {html, nothing} from 'lit';
import {keptView} from '../../../chart-core/settle.js';
import {bandPathOf} from '../../../chart-core/sankey.js';
import './default.css';

// The figure of a Sankey diagram: the label and the table button, the plot
// (SVG), the summary and the description, the live line, and every flow as
// a row of a table.
//
// The plot is one Tab stop, a role="group" named by the label and described
// by the summary; its marks are aria-hidden, because the summary, the live
// line and the table say what they show. A node takes a chart colour by its
// place (--sf-chart-1..8), or a page's own (the colors setting, by node
// name) set in a style as --tone; a band is the light fill of its source's
// colour. In forced colours the nodes are the text colour and the bands
// the canvas with a line of it.

const px = (value) => `${Math.round(value * 10) / 10}`;
const tone = (place) => `sf-chart-sankey-c${(place % 8) + 1}`;
const paintOf = (paint, key) => {
  const colour = paint.get(key);
  return colour ? `--sf-chart-sankey--tone: ${colour}; --sf-chart-sankey--wash: color-mix(in srgb, ${colour} 35%, transparent)` : '';
};

// The plot's inside is SVG markup set as the svg element's innerHTML (a
// property, so lit writes no part markers inside it: a first-paint snapshot
// of the plot is the same on every run). Every text is escaped.
const ESCAPES = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'};
const esc = (value) => String(value).replace(/[&<>"']/gu, (one) => ESCAPES[one]);

// The bands first, widest first so a thin one lies on top, then the nodes
// with their names.
function marksMarkup(g, paint, model) {
  let out = '<g class="sf-chart-sankey-marks" aria-hidden="true"><g class="sf-chart-sankey-bands">';
  for (const link of [...g.links].sort((a, b) => b.width - a.width)) {
    const from = model.nodes[link.source];
    const style = paintOf(paint, from.key);
    out += `<path class="sf-chart-sankey-band ${tone(from.place)}"${style ? ` style="${esc(style)}"` : ''} data-flow="${link.index}" d="${bandPathOf(link)}"/>`;
  }
  out += '</g><g class="sf-chart-sankey-nodes">';
  for (const node of g.nodes) {
    const style = paintOf(paint, node.key);
    out += `<g class="sf-chart-sankey-node ${tone(node.place)}"${style ? ` style="${esc(style)}"` : ''} data-node="${esc(node.key)}">`;
    out += `<rect class="sf-chart-sankey-bar" x="${px(node.x0)}" y="${px(node.y0)}" width="${px(node.x1 - node.x0)}" height="${px(Math.max(1, node.y1 - node.y0))}"/>`;
    if (node.nameText) {
      const x = node.end ? node.x0 - 6 : node.x1 + 6;
      out += `<text class="sf-chart-sankey-name" x="${px(x)}" y="${px(node.cy)}" dominant-baseline="middle" text-anchor="${node.end ? 'end' : 'start'}">${esc(node.nameText)} <tspan class="sf-chart-sankey-value">${esc(node.valueText)}</tspan></text>`;
    }
    out += '</g>';
  }
  return `${out}</g></g>`;
}

// The cursor: a ring round the node; a band under the pointer drawn again
// on top, stronger.
function cursorMarkup(node, band, model) {
  let out = '';
  if (band) out += `<path class="sf-chart-sankey-band sf-chart-sankey-band--hot ${tone(model.nodes[band.source].place)}" d="${bandPathOf(band)}"/>`;
  if (node) out += `<rect class="sf-chart-sankey-ring" x="${px(node.x0 - 2)}" y="${px(node.y0 - 2)}" width="${px(node.x1 - node.x0 + 4)}" height="${px(Math.max(1, node.y1 - node.y0) + 4)}" rx="2"/>`;
  return out ? `<g class="sf-chart-sankey-cursor" aria-hidden="true">${out}</g>` : '';
}

function renderTooltip(context, g) {
  const {component, model, cursor, band} = context;
  if (context.tooltip === 'none' || (!cursor && !band)) return nothing;
  let name;
  let rows;
  let at;
  if (band) {
    const from = model.nodes[band.source];
    name = component.words('flow-name', {source: from.key, target: model.nodes[band.target].key});
    rows = [['value', component.sayY(band.value)], ['share-of-source', component.sayShare(band.value, from.out)]];
    at = {x: (band.x0 + band.x1) / 2, y: (band.sy0 + band.ty1) / 2, right: (band.x0 + band.x1) / 2};
  } else {
    name = cursor.key;
    rows = [];
    if (cursor.links.in.length) rows.push(['in', component.sayY(cursor.in)]);
    if (cursor.links.out.length) rows.push(['out', component.sayY(cursor.out)]);
    at = {x: cursor.x0, y: cursor.cy, right: cursor.x1};
  }
  const flip = at.x > g.width / 2;
  return html`
    <div class=${`sf-chart-sankey-tooltip${flip ? ' sf-chart-sankey-tooltip--flip' : ''}`} aria-hidden="true"
         style=${`inset-inline-start: ${px(flip ? at.x : at.right)}px; inset-block-start: ${px(at.y)}px`}>
      <div class="sf-chart-sankey-tooltip-name">${name}</div>
      ${rows.map(([key, value]) => html`
        <div class="sf-chart-sankey-tooltip-row">
          <span>${component.words(key)}</span>
          <span class="sf-chart-sankey-tooltip-value">${value}</span>
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
  return html`
    <div class=${shownTable ? 'sf-chart-sankey-table' : 'sf-chart-sankey-sr'}>
      <table>
        <caption>${label}</caption>
        <thead>
          <tr>
            <th scope="col">${component.words('source')}</th>
            <th scope="col">${component.words('target')}</th>
            <th scope="col">${component.words('value')}</th>
            <th scope="col">${component.words('share-of-source')}</th>
          </tr>
        </thead>
        <tbody>
          ${model.links.map((one) => html`
            <tr>
              <th scope="row">${model.nodes[one.source].key}</th>
              <td>${model.nodes[one.target].key}</td>
              <td>${component.sayY(one.value)}</td>
              <td>${component.sayShare(one.value, model.nodes[one.source].out)}</td>
            </tr>
          `)}
        </tbody>
      </table>
    </div>
  `;
}

function renderPlot(context) {
  const {component, geometry: g, uid, state, cursor, band, paint, model} = context;
  if (state === 'loading') {
    return html`<div class="sf-chart-sankey-loading" role="status" aria-busy="true"><span class="sf-chart-sankey-sr">${component.words('loading')}</span></div>`;
  }
  if (state === 'empty' || state === 'error') {
    return html`
      <sf-empty-state class="sf-chart-sankey-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
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
    <svg class="sf-chart-sankey-svg" role="group" tabindex="0" focusable="true"
         aria-label=${context.label} aria-roledescription=${component.words('roledescription')}
         aria-describedby=${described || nothing}
         width=${g.width} height=${g.height} viewBox=${`0 0 ${g.width} ${g.height}`}
         @keydown=${(event) => component.onPlotKey(event)}
         @pointermove=${(event) => component.onPointerMove(event)}
         @pointerleave=${() => component.onPointerLeave()}
         @click=${(event) => component.onPlotClick(event)}
         @blur=${() => component.setCursor(null)}
         .innerHTML=${marksMarkup(g, paint, model) + cursorMarkup(cursor, band, model)}>
    </svg>
    ${renderTooltip(context, g)}
  `;
}

export function renderSankeyTemplate(context) {
  const {component, uid, state} = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return html`
    <figure class=${['sf-chart-sankey', `sf-chart-sankey--size-${size}`, `sf-chart-sankey--${state}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-chart-sankey-head-row">
        <span class="sf-chart-sankey-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.table === 'toggle' && state === 'ready'
          ? html`<button type="button" class="sf-chart-sankey-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>`
          : nothing}
      </figcaption>
      <div class="sf-chart-sankey-plot" ?hidden=${tableView}>${renderPlot(context)}</div>
      ${context.summaryText ? html`<p class="sf-chart-sankey-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : nothing}
      ${context.hasDescription ? html`<div class="sf-chart-sankey-description" id=${`${uid}-description`}>${context.description}</div>` : nothing}
      <div class="sf-chart-sankey-sr" aria-live="polite">${context.said}</div>
      ${renderTable(context)}
    </figure>
  `;
}
