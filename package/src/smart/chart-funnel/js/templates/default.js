import {html, nothing} from 'lit';
import {keptView} from '../../../chart-core/settle.js';
import './default.css';

// The figure of a funnel: the label with the table button, the stages, the
// summary and the description, the live line, and the same data as a
// table.
//
// The stages are one Tab stop, a role="group" named by the label and
// described by the summary; their rows are aria-hidden, because the
// summary, the live line and the table say what they show. A row is the
// stage's name, its bar, its value and its share; the bar's length is the
// stage's share of the widest stage, a unitless number in a style, and
// every bar is the one colour of the funnel. A page's own colour (the color
// setting) is --custom in a style on the stages.

const share = (value) => `${Math.round(value * 10000) / 10000}`;
// A name or a value is the page's text written into markup, so it is
// escaped; a page's colour is checked to be a colour (chart-core/colors)
// and escaped all the same.
const ESCAPES = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'};
const esc = (value) => String(value).replace(/[&<>"']/gu, (one) => ESCAPES[one]);

// The stages' inside is markup set as the element's innerHTML (a property,
// so lit writes no part markers inside it: a first-paint snapshot of the
// stages is the same on every run).
function stagesMarkup(context) {
  const {component, stages, cursor} = context;
  let out = '';
  for (const [place, stage] of stages.entries()) {
    const gap = stage.value === null;
    const marks = [
      gap ? ' sf-chart-funnel-stage--gap' : '',
      cursor && cursor.index !== place ? ' sf-chart-funnel-stage--dim' : '',
      cursor && cursor.index === place ? ' sf-chart-funnel-stage--current' : '',
    ].join('');
    const bar = gap ? '' : `<span class="sf-chart-funnel-bar" style="--sf-chart-funnel--share: ${share(stage.share)}"></span>`;
    out += `<div class="sf-chart-funnel-stage${marks}" data-place="${place}" aria-hidden="true">`
      + `<span class="sf-chart-funnel-name">${esc(stage.name)}</span>`
      + `<span class="sf-chart-funnel-track">${bar}</span>`
      + `<span class="sf-chart-funnel-value">${esc(component.sayY(stage.value))}</span>`
      + `<span class="sf-chart-funnel-share">${esc(component.besideShare(stage))}</span>`
      + '</div>';
  }
  return out;
}

// The tooltip stands under the current stage's row, at the bar's start.
function renderTooltip(context, cursor) {
  if (!cursor || context.tooltip === 'none') return nothing;
  const {component, stages} = context;
  const stage = stages[cursor.index];
  if (!stage) return nothing;
  return html`
    <div class="sf-chart-funnel-tooltip" aria-hidden="true" style=${`--sf-chart-funnel--at: ${cursor.index + 1}`}>
      <span class="sf-chart-funnel-tooltip-name">${stage.name}</span>
      <span class="sf-chart-funnel-tooltip-value">${component.sayY(stage.value)}</span>
      ${stage.fromPrevious === null ? nothing : html`<span class="sf-chart-funnel-tooltip-share">${component.words('previous-short', {share: component.sayShare(stage.fromPrevious)})}</span>`}
      ${stage.fromFirst === null ? nothing : html`<span class="sf-chart-funnel-tooltip-share">${component.words('first-short', {share: component.sayShare(stage.fromFirst)})}</span>`}
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
  const shareOr = (value) => (value === null ? component.words('gap') : component.sayShare(value));
  return html`
    <div class=${shownTable ? 'sf-chart-funnel-table' : 'sf-chart-funnel-sr'}>
      <table>
        <caption>${label}</caption>
        <thead>
          <tr>
            <th scope="col">${context.stageLabel}</th>
            <th scope="col">${context.valueLabel}</th>
            <th scope="col">${component.words('previous-column')}</th>
            <th scope="col">${component.words('first-column')}</th>
          </tr>
        </thead>
        <tbody>
          ${context.rows.map((row, place) => html`
            <tr>
              <th scope="row">${row.name}</th>
              <td>${component.sayY(row.value)}</td>
              <td>${place === 0 ? '' : shareOr(row.fromPrevious)}</td>
              <td>${place === 0 ? '' : shareOr(row.fromFirst)}</td>
            </tr>
          `)}
        </tbody>
      </table>
    </div>
  `;
}

function renderPlot(context) {
  const {component, uid, state, cursor} = context;
  if (state === 'loading') {
    return html`<div class="sf-chart-funnel-stages sf-chart-funnel-stages--loading" role="status" aria-busy="true"><span class="sf-chart-funnel-sr">${component.words('loading')}</span></div>`;
  }
  if (state === 'empty' || state === 'error') {
    return html`
      <sf-empty-state class="sf-chart-funnel-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
        heading=${component.words(state === 'error' ? 'error-title' : 'empty-title')} text=""
        @sf-empty-state-action=${(event) => {
          event.stopPropagation();
          component.sfEmit('refresh', {});
        }}></sf-empty-state>
    `;
  }
  const described = [context.summaryText ? `${uid}-summary` : '', context.hasDescription ? `${uid}-description` : ''].filter(Boolean).join(' ');
  return html`
    <div class=${`sf-chart-funnel-stages${context.colour ? ' sf-chart-funnel-stages--custom' : ''}`} role="group" tabindex="0"
         aria-label=${context.label} aria-roledescription=${component.words('roledescription')}
         aria-describedby=${described || nothing}
         style=${context.colour ? `--sf-chart-funnel--custom: ${esc(context.colour)}` : nothing}
         @keydown=${(event) => component.onPlotKey(event)}
         @pointermove=${(event) => component.onPointerMove(event)}
         @pointerleave=${() => component.onPointerLeave()}
         @click=${(event) => component.onPlotClick(event)}
         @blur=${() => component.setCursor(null)}
         .innerHTML=${stagesMarkup(context)}></div>
    ${renderTooltip(context, cursor)}
  `;
}

export function renderFunnelTemplate(context) {
  const {component, uid, state} = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return html`
    <figure class=${['sf-chart-funnel', `sf-chart-funnel--size-${size}`, `sf-chart-funnel--${state}`, `sf-chart-funnel--align-${context.align === 'center' ? 'center' : 'start'}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-chart-funnel-head">
        <span class="sf-chart-funnel-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.table === 'toggle' && state === 'ready'
          ? html`<button type="button" class="sf-chart-funnel-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>`
          : nothing}
      </figcaption>
      <div class="sf-chart-funnel-plot" ?hidden=${tableView}>${renderPlot(context)}</div>
      ${context.summaryText ? html`<p class="sf-chart-funnel-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : nothing}
      ${context.hasDescription ? html`<div class="sf-chart-funnel-description" id=${`${uid}-description`}>${context.description}</div>` : nothing}
      <div class="sf-chart-funnel-sr" aria-live="polite">${context.said}</div>
      ${renderTable(context)}
    </figure>
  `;
}
