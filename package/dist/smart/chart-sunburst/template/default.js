import {html, nothing} from 'lit';
import {keptView} from '../../../chart-core/settle.js';
import {arcPath} from '../../../chart-core/arc.js';
import './default.css';

// The figure of a sunburst: the label and the table button, the plot
// (SVG), the summary and the description, the live line, and every node
// as a row of a table.
//
// The plot is one Tab stop, a role="group" named by the label and described
// by the summary; its marks are aria-hidden, because the summary, the live
// line and the table say what they show. A top node takes a chart colour by
// its place (--sf-chart-1..8), or a page's own (the colors setting, by the
// top node's name) set in a style as --tone, and its whole branch keeps
// it: the colour's light fill, lighter past the first ring, with the
// colour's line round each arc. The names are written in the page's ink,
// which reads on every fill. In forced colours every arc is the canvas
// with a line of the text colour.

const px = (value) => `${Math.round(value * 10) / 10}`;
const tone = (place) => `sf-chart-sunburst-c${(place % 8) + 1}`;
const paintOf = (paint, key) => {
  const colour = paint.get(key);
  return colour ? `--sf-chart-sunburst--tone: ${colour}; --sf-chart-sunburst--wash: color-mix(in srgb, ${colour} 20%, transparent)` : '';
};

// The plot's inside is SVG markup set as the svg element's innerHTML (a
// property, so lit writes no part markers inside it: a first-paint snapshot
// of the plot is the same on every run). Every text is escaped.
const ESCAPES = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'};
const esc = (value) => String(value).replace(/[&<>"']/gu, (one) => ESCAPES[one]);

const degrees = (angle) => {
  const turn = (angle * 180) / Math.PI;
  // A name below the middle is turned round, so it never reads upside down.
  return angle > Math.PI / 2 && angle < (Math.PI * 3) / 2 ? turn - 180 : turn;
};

// One group per branch, so a class and a page's colour are set once: the
// branch's arcs ring after ring, a name along an arc's middle where it
// fits; then the total in the centre.
function marksMarkup(g, paint, model, uid) {
  let out = '<g class="sf-chart-sunburst-marks" aria-hidden="true">';
  model.roots.forEach((top, place) => {
    const style = paintOf(paint, top.name);
    out += `<g class="sf-chart-sunburst-branch ${tone(place)}"${style ? ` style="${esc(style)}"` : ''} data-node="${esc(top.id)}">`;
    for (const arc of g.arcs) {
      if (arc.node.place !== place || arc.end - arc.start <= 0) continue;
      out += `<path class="sf-chart-sunburst-arc${arc.node.depth ? ' sf-chart-sunburst-arc--deep' : ''}" data-depth="${arc.node.depth}" d="${arcPath(arc, {cx: g.cx, cy: g.cy, outer: arc.outer, inner: arc.inner})}"/>`;
      if (arc.nameText && arc.curvePath) {
        const id = `${uid}-arc-${arc.index}`;
        out += `<path id="${esc(id)}" class="sf-chart-sunburst-guide" d="${arc.curvePath}"/><text class="sf-chart-sunburst-name" dominant-baseline="middle"><textPath href="#${esc(id)}" startOffset="50%" text-anchor="middle">${esc(arc.nameText)}</textPath></text>`;
      } else if (arc.nameText) {
        out += `<text class="sf-chart-sunburst-name" x="${px(arc.x)}" y="${px(arc.y)}" text-anchor="middle" dominant-baseline="middle" transform="rotate(${px(degrees(arc.middle))} ${px(arc.x)} ${px(arc.y)})">${esc(arc.nameText)}</text>`;
      }
    }
    out += '</g>';
  });
  if (g.centre) out += `<text class="sf-chart-sunburst-total" x="${px(g.cx)}" y="${px(g.cy)}" text-anchor="middle" dominant-baseline="middle">${esc(g.centre)}</text>`;
  return `${out}</g>`;
}

// The cursor: a ring round the arc.
function cursorMarkup(arc, g) {
  if (!arc || arc.end - arc.start <= 0) return '';
  return `<g class="sf-chart-sunburst-cursor" aria-hidden="true"><path class="sf-chart-sunburst-ring" d="${arcPath(arc, {cx: g.cx, cy: g.cy, outer: arc.outer, inner: arc.inner})}"/></g>`;
}

function renderTooltip(context, g) {
  const {component, model, cursor} = context;
  if (context.tooltip === 'none' || !cursor) return nothing;
  const node = cursor.node;
  const rows = [['value', component.sayY(node.value)]];
  if (node.parent) rows.push(['share-of-parent', component.sayShare(node.value, node.parent.value)]);
  rows.push(['share', component.sayShare(node.value, model.total)]);
  const flip = cursor.x > g.width / 2;
  return html`
    <div class=${`sf-chart-sunburst-tooltip${flip ? ' sf-chart-sunburst-tooltip--flip' : ''}`} aria-hidden="true"
         style=${`inset-inline-start: ${px(cursor.x)}px; inset-block-start: ${px(cursor.y)}px`}>
      <div class="sf-chart-sunburst-tooltip-name">${component.sayPath(node)}</div>
      ${rows.map(([key, value]) => html`
        <div class="sf-chart-sunburst-tooltip-row">
          <span>${component.words(key)}</span>
          <span class="sf-chart-sunburst-tooltip-value">${value}</span>
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

// A row per node, each branch under its parent (depth first), so the
// path column reads as an outline.
function outline(model) {
  const out = [];
  const walk = (one) => {
    out.push(one);
    one.children.forEach(walk);
  };
  model.roots.forEach(walk);
  return out;
}

function tableMarkup(context, shownTable) {
  const {component, tableModel: model, label} = context;
  return html`
    <div class=${shownTable ? 'sf-chart-sunburst-table' : 'sf-chart-sunburst-sr'}>
      <table>
        <caption>${label}</caption>
        <thead>
          <tr>
            <th scope="col">${component.words('path')}</th>
            <th scope="col">${component.words('value')}</th>
            <th scope="col">${component.words('share-of-parent')}</th>
            <th scope="col">${component.words('share')}</th>
          </tr>
        </thead>
        <tbody>
          ${outline(model).map((one) => html`
            <tr>
              <th scope="row">${component.sayPath(one)}</th>
              <td>${component.sayY(one.value)}</td>
              <td>${one.parent ? component.sayShare(one.value, one.parent.value) : '—'}</td>
              <td>${component.sayShare(one.value, model.total)}</td>
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
    return html`<div class="sf-chart-sunburst-loading" role="status" aria-busy="true"><span class="sf-chart-sunburst-sr">${component.words('loading')}</span></div>`;
  }
  if (state === 'empty' || state === 'error') {
    return html`
      <sf-empty-state class="sf-chart-sunburst-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
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
    <svg class="sf-chart-sunburst-svg" role="group" tabindex="0" focusable="true"
         aria-label=${context.label} aria-roledescription=${component.words('roledescription')}
         aria-describedby=${described || nothing}
         width=${g.width} height=${g.height} viewBox=${`0 0 ${g.width} ${g.height}`}
         @keydown=${(event) => component.onPlotKey(event)}
         @pointermove=${(event) => component.onPointerMove(event)}
         @pointerleave=${() => component.onPointerLeave()}
         @click=${(event) => component.onPlotClick(event)}
         @blur=${() => component.setCursor(null)}
         .innerHTML=${marksMarkup(g, paint, model, uid) + cursorMarkup(cursor, g)}>
    </svg>
    ${renderTooltip(context, g)}
  `;
}

export function renderSunburstTemplate(context) {
  const {component, uid, state} = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return html`
    <figure class=${['sf-chart-sunburst', `sf-chart-sunburst--size-${size}`, `sf-chart-sunburst--${state}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-chart-sunburst-head-row">
        <span class="sf-chart-sunburst-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.table === 'toggle' && state === 'ready'
          ? html`<button type="button" class="sf-chart-sunburst-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>`
          : nothing}
      </figcaption>
      <div class="sf-chart-sunburst-plot" ?hidden=${tableView}>${renderPlot(context)}</div>
      ${context.summaryText ? html`<p class="sf-chart-sunburst-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : nothing}
      ${context.hasDescription ? html`<div class="sf-chart-sunburst-description" id=${`${uid}-description`}>${context.description}</div>` : nothing}
      <div class="sf-chart-sunburst-sr" aria-live="polite">${context.said}</div>
      ${renderTable(context)}
    </figure>
  `;
}
