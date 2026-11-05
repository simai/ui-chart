import {html, nothing} from 'lit';
import {keptView} from '../../../chart-core/settle.js';
import './default.css';

// The figure of a waterfall chart: the label and the table button, the key
// of rise, fall and total, the plot (SVG), the summary and the description,
// the live line, and the same data as a table.
//
// The plot is one Tab stop, a role="group" named by the label and described
// by the summary; its axes and bars are aria-hidden, because the summary,
// the live line and the table say what they show. A rise is a bar in the
// success tone, a fall in the error tone and a total in the neutral one;
// each bar's value is written with its sign, and in forced colours a rise
// is hollow, a fall filled and a total dashed, so the direction never rests
// on colour alone. A page's own colour (the colors setting, by up, down and
// total) is set in a style as --up, --down or --total.

const px = (value) => `${Math.round(value * 10) / 10}`;
const KEYS = ['up', 'down', 'total'];
const paintOf = (paint, key) => (paint.get(key) ? `--sf-chart-waterfall--${key}: ${paint.get(key)}` : '');

// The plot's inside is SVG markup set as the svg element's innerHTML (a
// property, so lit writes no part markers inside it: a first-paint snapshot
// of the plot is the same on every run). Every text is escaped.
const ESCAPES = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'};
const esc = (value) => String(value).replace(/[&<>"']/gu, (one) => ESCAPES[one]);

function axesMarkup(g) {
  const {inner} = g;
  let out = '<g class="sf-chart-waterfall-axes" aria-hidden="true">';
  if (g.grid !== 'none') {
    for (const tick of g.valueTicks) {
      out += `<line class="sf-chart-waterfall-grid" x1="${px(inner.left)}" x2="${px(inner.right)}" y1="${px(tick.at)}" y2="${px(tick.at)}"/>`;
    }
  }
  out += `<line class="sf-chart-waterfall-baseline" x1="${px(inner.left)}" x2="${px(inner.right)}" y1="${px(g.zero)}" y2="${px(g.zero)}"/>`;
  for (const tick of g.valueTicks) {
    out += `<text class="sf-chart-waterfall-tick" x="${px(inner.left - 6)}" y="${px(tick.at)}" text-anchor="end" dominant-baseline="middle">${esc(tick.text)}</text>`;
  }
  for (const tick of g.xTicks) {
    out += `<text class="sf-chart-waterfall-tick" x="${px(tick.at)}" y="${px(inner.bottom + g.font * 1.2)}" text-anchor="middle" dominant-baseline="middle">${esc(tick.text)}</text>`;
  }
  if (g.yLabel) out += `<text class="sf-chart-waterfall-axis-label" x="${px(inner.left)}" y="${px(g.font)}" text-anchor="start">${esc(g.yLabel)}</text>`;
  if (g.xLabel) out += `<text class="sf-chart-waterfall-axis-label" x="${px((inner.left + inner.right) / 2)}" y="${px(g.height - 4)}" text-anchor="middle">${esc(g.xLabel)}</text>`;
  return `${out}</g>`;
}

// The bars, one group per kind so a class sets its tone once; the lines
// that join each bar's end to the next as one path; the values over them.
function barsMarkup(g, paint) {
  const bars = {up: '', down: '', total: ''};
  let links = '';
  g.bars.forEach((one, index) => {
    bars[one.kind] += `<rect class="sf-chart-waterfall-bar" x="${px(one.cx - one.half)}" y="${px(one.top)}" width="${px(one.half * 2)}" height="${px(Math.max(1, one.bottom - one.top))}"/>`;
    const next = g.bars[index + 1];
    if (next) links += `M${px(one.cx + one.half)} ${px(one.yTo)}H${px(next.cx - next.half)}`;
  });
  const styleOf = (key) => (paint.get(key) ? ` style="${esc(paintOf(paint, key))}"` : '');
  let out = '<g class="sf-chart-waterfall-marks" aria-hidden="true">';
  if (links) out += `<path class="sf-chart-waterfall-link" d="${links}"/>`;
  out += KEYS.map((key) => (bars[key] ? `<g class="sf-chart-waterfall-${key}"${styleOf(key)} data-kind="${key}">${bars[key]}</g>` : '')).join('');
  for (const value of g.values) {
    out += `<text class="sf-chart-waterfall-value" x="${px(value.at)}" y="${px(value.y)}" text-anchor="middle">${esc(value.text)}</text>`;
  }
  return `${out}</g>`;
}

// The cursor: the step's band lit behind it and a ring round its bar.
function cursorMarkup(g, one) {
  if (!one) return '';
  let out = '<g class="sf-chart-waterfall-cursor" aria-hidden="true">';
  out += `<rect class="sf-chart-waterfall-lane" x="${px(one.cx - g.band.step / 2)}" y="${px(g.inner.top)}" width="${px(g.band.step)}" height="${px(g.inner.bottom - g.inner.top)}"/>`;
  out += `<rect class="sf-chart-waterfall-ring" x="${px(one.cx - one.half - 3)}" y="${px(one.top - 3)}" width="${px(one.half * 2 + 6)}" height="${px(Math.max(1, one.bottom - one.top) + 6)}" rx="2"/>`;
  return `${out}</g>`;
}

const swatchMarkup = () => '<svg viewBox="0 0 12 12" focusable="false"><rect class="sf-chart-waterfall-bar" x="2" y="2" width="8" height="8"/></svg>';

function renderKey(context, place) {
  if (context.legend !== place || context.state !== 'ready') return nothing;
  const {component, paint} = context;
  return html`
    <ul class=${`sf-chart-waterfall-legend sf-chart-waterfall-legend--${place}`} aria-label=${component.words('legend')}>
      ${KEYS.map((key) => html`
        <li class=${`sf-chart-waterfall-legend-item sf-chart-waterfall-${key}`} style=${paintOf(paint, key) || nothing}>
          <span class="sf-chart-waterfall-swatch" aria-hidden="true" .innerHTML=${swatchMarkup()}></span>
          <span>${component.words(key)}</span>
        </li>
      `)}
    </ul>
  `;
}

function renderTooltip(context, g, one) {
  if (!one || context.tooltip === 'none') return nothing;
  const {component} = context;
  const flip = one.cx > g.width / 2;
  const rows = one.kind === 'total' ? [['total-value', component.sayY(one.to)]] : [['change', component.saySigned(one.value)], ['total-value', component.sayY(one.to)]];
  return html`
    <div class=${`sf-chart-waterfall-tooltip${flip ? ' sf-chart-waterfall-tooltip--flip' : ''}`} aria-hidden="true"
         style=${`inset-inline-start: ${px(one.cx)}px; inset-block-start: ${px((one.top + one.bottom) / 2)}px; --sf-chart-waterfall--reach: ${px(one.half)}`}>
      <div class="sf-chart-waterfall-tooltip-name">${component.sayX(one)}</div>
      ${rows.map(([key, value]) => html`
        <div class="sf-chart-waterfall-tooltip-row">
          <span>${component.words(key)}</span>
          <span class="sf-chart-waterfall-tooltip-value">${value}</span>
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
    <div class=${shownTable ? 'sf-chart-waterfall-table' : 'sf-chart-waterfall-sr'}>
      <table>
        <caption>${label}</caption>
        <thead>
          <tr>
            <th scope="col">${component.xLabel || model.xField || component.words('step-column')}</th>
            <th scope="col">${component.words('change')}</th>
            <th scope="col">${component.words('total-value')}</th>
          </tr>
        </thead>
        <tbody>
          ${model.steps.map((one) => html`
            <tr>
              <th scope="row">${component.sayX(one)}</th>
              <td>${one.kind === 'total' ? '' : component.saySigned(one.value)}</td>
              <td>${component.sayY(one.to)}</td>
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
    return html`<div class="sf-chart-waterfall-loading" role="status" aria-busy="true"><span class="sf-chart-waterfall-sr">${component.words('loading')}</span></div>`;
  }
  if (state === 'empty' || state === 'error') {
    return html`
      <sf-empty-state class="sf-chart-waterfall-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
        heading=${component.words(state === 'error' ? 'error-title' : 'empty-title')} text=""
        @sf-empty-state-action=${(event) => {
          event.stopPropagation();
          component.sfEmit('refresh', {});
        }}></sf-empty-state>
    `;
  }
  if (!g) return nothing;
  const described = [context.summaryText ? `${uid}-summary` : '', context.hasDescription ? `${uid}-description` : ''].filter(Boolean).join(' ');
  const drawn = {...g, grid: context.grid, xLabel: context.xLabel, yLabel: context.yLabel};
  return html`
    <svg class="sf-chart-waterfall-svg" role="group" tabindex="0" focusable="true"
         aria-label=${context.label} aria-roledescription=${component.words('roledescription')}
         aria-describedby=${described || nothing}
         width=${g.width} height=${g.height} viewBox=${`0 0 ${g.width} ${g.height}`}
         @keydown=${(event) => component.onPlotKey(event)}
         @pointermove=${(event) => component.onPointerMove(event)}
         @pointerleave=${() => component.onPointerLeave()}
         @click=${(event) => component.onPlotClick(event)}
         @blur=${() => component.setCursor(null)}
         .innerHTML=${axesMarkup(drawn) + cursorMarkup(g, cursor) + barsMarkup(g, paint)}>
    </svg>
    ${renderTooltip(context, g, cursor)}
  `;
}

export function renderWaterfallTemplate(context) {
  const {component, uid, state} = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return html`
    <figure class=${['sf-chart-waterfall', `sf-chart-waterfall--size-${size}`, `sf-chart-waterfall--${state}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-chart-waterfall-head">
        <span class="sf-chart-waterfall-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.table === 'toggle' && state === 'ready'
          ? html`<button type="button" class="sf-chart-waterfall-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>`
          : nothing}
      </figcaption>
      ${renderKey(context, 'top')}
      <div class="sf-chart-waterfall-plot" ?hidden=${tableView}>${renderPlot(context)}</div>
      ${renderKey(context, 'bottom')}
      ${context.summaryText ? html`<p class="sf-chart-waterfall-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : nothing}
      ${context.hasDescription ? html`<div class="sf-chart-waterfall-description" id=${`${uid}-description`}>${context.description}</div>` : nothing}
      <div class="sf-chart-waterfall-sr" aria-live="polite">${context.said}</div>
      ${renderTable(context)}
    </figure>
  `;
}
