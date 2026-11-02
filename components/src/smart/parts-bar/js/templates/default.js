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
// apart as well, and the free remainder is a neutral track.

const colourOf = (part) => (part.free ? 'sf-parts-bar-series--free'
  : `sf-parts-bar-series--c${(part.place % 4) + 1}${part.place >= 4 ? ' sf-parts-bar-series--t2' : ''}`);
const grow = (share) => `${Math.round(share * 10000) / 10000}`;

// The bar's inside is markup set as the element's innerHTML (a property, so
// lit writes no part markers inside it: a first-paint snapshot of the bar is
// the same on every run). Every part shares the width by its value.
function partsMarkup(segments, cursor) {
  let out = '';
  for (const part of segments) {
    const dim = cursor && cursor.index !== part.place ? ' sf-parts-bar-part--dim' : '';
    const current = cursor && cursor.index === part.place ? ' sf-parts-bar-part--current' : '';
    out += `<span class="sf-parts-bar-part ${colourOf(part)}${dim}${current}" data-place="${part.place}" style="flex-grow: ${grow(part.share)}"></span>`;
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
    <div class=${`sf-parts-bar-tooltip sf-parts-bar-tooltip--${align}`} aria-hidden="true"
         style=${`inset-inline-start: ${Math.round(middle * 10) / 10}%`}>
      <div class=${`sf-parts-bar-tooltip-row ${colourOf(part)}`}>
        <span class="sf-parts-bar-swatch"></span>
        <span class="sf-parts-bar-tooltip-name">${part.name}</span>
        <span class="sf-parts-bar-tooltip-value">${component.sayPart(part)}</span>
      </div>
    </div>
  `;
}

function renderLegend(context) {
  if (context.legend === 'none' || context.state !== 'ready') return nothing;
  const {component, segments} = context;
  const inline = context.legend === 'inline';
  return html`
    <ul class=${`sf-parts-bar-list${inline ? ' sf-parts-bar-list--inline' : ''}`} aria-label=${component.words('legend')}>
      ${segments.map((part) => html`
        <li class=${`sf-parts-bar-item ${colourOf(part)}`}>
          <span class="sf-parts-bar-swatch" aria-hidden="true"></span>
          <span class="sf-parts-bar-item-name">${part.name}</span>
          ${inline ? nothing : html`<span class="sf-parts-bar-item-value">${component.sayY(part.value)}</span>`}
          <span class="sf-parts-bar-item-share">${component.sayShare(part.share)}</span>
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
    <div class=${shownTable ? 'sf-parts-bar-table' : 'sf-parts-bar-sr'}>
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
            <tr class=${row.free ? 'sf-parts-bar-table-free' : ''}>
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
    return html`<div class="sf-parts-bar-track sf-parts-bar-track--loading" role="status" aria-busy="true"><span class="sf-parts-bar-sr">${component.words('loading')}</span></div>`;
  }
  if (state === 'empty' || state === 'error') {
    return html`
      <sf-empty-state class="sf-parts-bar-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
        heading=${component.words(state === 'error' ? 'error-title' : 'empty-title')} text=""
        @sf-empty-state-action=${(event) => {
          event.stopPropagation();
          component.sfEmit('refresh', {});
        }}></sf-empty-state>
    `;
  }
  const described = [context.summaryText ? `${uid}-summary` : '', context.hasDescription ? `${uid}-description` : ''].filter(Boolean).join(' ');
  return html`
    <div class="sf-parts-bar-track" role="group" tabindex="0"
         aria-label=${context.label} aria-roledescription=${component.words('roledescription')}
         aria-describedby=${described || nothing}
         @keydown=${(event) => component.onPlotKey(event)}
         @pointermove=${(event) => component.onPointerMove(event)}
         @pointerleave=${() => component.onPointerLeave()}
         @click=${(event) => component.onPlotClick(event)}
         @blur=${() => component.setCursor(null)}
         .innerHTML=${partsMarkup(segments, cursor)}></div>
    ${renderTooltip(context, cursor)}
  `;
}

export function renderPartsBarTemplate(context) {
  const {component, uid, state} = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return html`
    <figure class=${['sf-parts-bar', `sf-parts-bar--size-${size}`, `sf-parts-bar--${state}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-parts-bar-head">
        <span class="sf-parts-bar-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.head ? html`<span class="sf-parts-bar-whole">${context.head}</span>` : nothing}
        ${context.table === 'toggle' && state === 'ready'
          ? html`<button type="button" class="sf-parts-bar-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>`
          : nothing}
      </figcaption>
      <div class="sf-parts-bar-layout" ?hidden=${tableView}>
        <div class="sf-parts-bar-plot">${renderPlot(context)}</div>
        ${renderLegend(context)}
      </div>
      ${context.summaryText ? html`<p class="sf-parts-bar-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : nothing}
      ${context.hasDescription ? html`<div class="sf-parts-bar-description" id=${`${uid}-description`}>${context.description}</div>` : nothing}
      <div class="sf-parts-bar-sr" aria-live="polite">${context.said}</div>
      ${renderTable(context)}
    </figure>
  `;
}
