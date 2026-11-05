import {html, nothing} from 'lit';
import {keptView} from '../../../chart-core/settle.js';
import './default.css';

// The figure of a parts bar: the label with the whole and the table button,
// the bar, the list of the parts under it, the summary and the description,
// the live line, and the same data as a table.
//
// The bar is one Tab stop, a role="group" named by the label and described
// by the summary; its parts are aria-hidden, because the summary, the live
// line, the list and the table say what they show. A colour is a class
// (--c1..--c4, then lighter --t2); the order and a separator tell the parts
// apart as well, and the free remainder is a neutral track. A page's own
// colour (the colors setting, by the category) is --custom with its value in
// a style; the free remainder keeps its own variable.

const paintOf = (paint) => (paint ? `--sf-chart-parts--custom: ${paint}` : '');
const colourOf = (part, paint) => (part.free ? 'sf-chart-parts-series--free'
  : paint ? 'sf-chart-parts-series--custom'
  : `sf-chart-parts-series--c${(part.place % 4) + 1}${part.place >= 4 ? ' sf-chart-parts-series--t2' : ''}`);
const grow = (share) => `${Math.round(share * 10000) / 10000}`;
// A page's colour is checked to be a colour (chart-core/colors), and escaped
// all the same, since it is written into markup.
const ESCAPES = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'};
const esc = (value) => String(value).replace(/[&<>"']/gu, (one) => ESCAPES[one]);

// The bar's inside is markup set as the element's innerHTML (a property, so
// lit writes no part markers inside it: a first-paint snapshot of the bar is
// the same on every run). Every part shares the width by its value.
function partsMarkup(segments, cursor, paint) {
  let out = '';
  for (const part of segments) {
    const dim = cursor && cursor.index !== part.place ? ' sf-chart-parts-part--dim' : '';
    const current = cursor && cursor.index === part.place ? ' sf-chart-parts-part--current' : '';
    const own = part.free ? '' : paint.get(part.key);
    out += `<span class="sf-chart-parts-part ${colourOf(part, own)}${dim}${current}" data-place="${part.place}" style="flex-grow: ${grow(part.share)}${own ? `; ${esc(paintOf(own))}` : ''}"></span>`;
  }
  return out;
}

// The tooltip stands under the part's middle, kept inside the bar at its ends.
function renderTooltip(context, cursor) {
  if (!cursor || context.tooltip === 'none') return nothing;
  const {component, segments} = context;
  const part = segments[cursor.index];
  if (!part) return nothing;
  const before = segments.slice(0, cursor.index).reduce((sum, one) => sum + one.share, 0);
  const middle = (before + part.share / 2) * 100;
  const align = middle < 20 ? 'start' : middle > 80 ? 'end' : 'middle';
  return html`
    <div class=${`sf-chart-parts-tooltip sf-chart-parts-tooltip--${align}`} aria-hidden="true"
         style=${`inset-inline-start: ${Math.round(middle * 10) / 10}%`}>
      <div class=${`sf-chart-parts-tooltip-row ${colourOf(part, part.free ? '' : context.paint.get(part.key))}`}
           style=${(!part.free && paintOf(context.paint.get(part.key))) || nothing}>
        <span class="sf-chart-parts-swatch"></span>
        <span class="sf-chart-parts-tooltip-name">${part.name}</span>
        <span class="sf-chart-parts-tooltip-value">${component.sayPart(part)}</span>
      </div>
    </div>
  `;
}

function renderLegend(context) {
  if (context.legend === 'none' || context.state !== 'ready') return nothing;
  const {component, segments} = context;
  const inline = context.legend === 'inline';
  return html`
    <ul class=${`sf-chart-parts-list${inline ? ' sf-chart-parts-list--inline' : ''}`} aria-label=${component.words('legend')}>
      ${segments.map((part) => html`
        <li class=${`sf-chart-parts-item ${colourOf(part, part.free ? '' : context.paint.get(part.key))}`}
            style=${(!part.free && paintOf(context.paint.get(part.key))) || nothing}>
          <span class="sf-chart-parts-swatch" aria-hidden="true"></span>
          <span class="sf-chart-parts-item-name">${part.name}</span>
          ${inline ? nothing : html`<span class="sf-chart-parts-item-value">${component.sayY(part.value)}</span>`}
          <span class="sf-chart-parts-item-share">${component.sayShare(part.share)}</span>
        </li>
      `)}
    </ul>
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
    <div class=${shownTable ? 'sf-chart-parts-table' : 'sf-chart-parts-sr'}>
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
            <tr class=${row.free ? 'sf-chart-parts-table-free' : ''}>
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
  const {component, segments, uid, state, cursor} = context;
  if (state === 'loading') {
    return html`<div class="sf-chart-parts-track sf-chart-parts-track--loading" role="status" aria-busy="true"><span class="sf-chart-parts-sr">${component.words('loading')}</span></div>`;
  }
  if (state === 'empty' || state === 'error') {
    return html`
      <sf-empty-state class="sf-chart-parts-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
        heading=${component.words(state === 'error' ? 'error-title' : 'empty-title')} text=""
        @sf-empty-state-action=${(event) => {
          event.stopPropagation();
          component.sfEmit('refresh', {});
        }}></sf-empty-state>
    `;
  }
  const described = [context.summaryText ? `${uid}-summary` : '', context.hasDescription ? `${uid}-description` : ''].filter(Boolean).join(' ');
  return html`
    <div class="sf-chart-parts-track" role="group" tabindex="0"
         aria-label=${context.label} aria-roledescription=${component.words('roledescription')}
         aria-describedby=${described || nothing}
         @keydown=${(event) => component.onPlotKey(event)}
         @pointermove=${(event) => component.onPointerMove(event)}
         @pointerleave=${() => component.onPointerLeave()}
         @click=${(event) => component.onPlotClick(event)}
         @blur=${() => component.setCursor(null)}
         .innerHTML=${partsMarkup(segments, cursor, context.paint)}></div>
    ${renderTooltip(context, cursor)}
  `;
}

export function renderPartsBarTemplate(context) {
  const {component, uid, state} = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return html`
    <figure class=${['sf-chart-parts', `sf-chart-parts--size-${size}`, `sf-chart-parts--${state}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-chart-parts-head">
        <span class="sf-chart-parts-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.head ? html`<span class="sf-chart-parts-whole">${context.head}</span>` : nothing}
        ${context.table === 'toggle' && state === 'ready'
          ? html`<button type="button" class="sf-chart-parts-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>`
          : nothing}
      </figcaption>
      <div class="sf-chart-parts-layout" ?hidden=${tableView}>
        <div class="sf-chart-parts-plot">${renderPlot(context)}</div>
        ${renderLegend(context)}
      </div>
      ${context.summaryText ? html`<p class="sf-chart-parts-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : nothing}
      ${context.hasDescription ? html`<div class="sf-chart-parts-description" id=${`${uid}-description`}>${context.description}</div>` : nothing}
      <div class="sf-chart-parts-sr" aria-live="polite">${context.said}</div>
      ${renderTable(context)}
    </figure>
  `;
}
