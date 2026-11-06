import {html, nothing} from 'lit';
import {keptView} from '../../../chart-core/settle.js';
import './default.css';

// The figure of a candlestick chart: the label and the table button, the
// key of rise and fall, the plot (SVG), the summary and the description, the
// live line, and the same data as a table.
//
// The plot is one Tab stop, a role="group" named by the label and described
// by the summary; its axes and candles are aria-hidden, because the summary,
// the live line and the table say what they show. A rising period is a
// hollow body in the success tone and a falling one a filled body in the
// error tone; with shape="bar" the open is a tick to the left and the
// close a tick to the right. So the direction reads in forced colours and
// in print too. A page's own colour (the colors setting, by up and down) is
// set in a style as --up or --down.

const px = (value) => `${Math.round(value * 10) / 10}`;
const directionOf = (up) => (up ? 'up' : 'down');
const paintOf = (paint, key) => (paint.get(key) ? `--sf-chart-candlestick--${key}: ${paint.get(key)}` : '');

// The plot's inside is SVG markup set as the svg element's innerHTML (a
// property, so lit writes no part markers inside it: a first-paint snapshot
// of the plot is the same on every run). Every text is escaped.
const ESCAPES = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'};
const esc = (value) => String(value).replace(/[&<>"']/gu, (one) => ESCAPES[one]);

function axesMarkup(g) {
  const {inner} = g;
  let out = '<g class="sf-chart-candlestick-axes" aria-hidden="true">';
  if (g.grid !== 'none') {
    for (const tick of g.valueTicks) {
      out += `<line class="sf-chart-candlestick-grid" x1="${px(inner.left)}" x2="${px(inner.right)}" y1="${px(tick.at)}" y2="${px(tick.at)}"/>`;
    }
  }
  out += `<line class="sf-chart-candlestick-baseline" x1="${px(inner.left)}" x2="${px(inner.right)}" y1="${px(inner.bottom)}" y2="${px(inner.bottom)}"/>`;
  for (const tick of g.valueTicks) {
    out += `<text class="sf-chart-candlestick-tick" x="${px(inner.left - 6)}" y="${px(tick.at)}" text-anchor="end" dominant-baseline="middle">${esc(tick.text)}</text>`;
  }
  for (const tick of g.xTicks) {
    out += `<text class="sf-chart-candlestick-tick" x="${px(tick.at)}" y="${px(inner.bottom + g.font * 1.2)}" text-anchor="middle" dominant-baseline="middle">${esc(tick.text)}</text>`;
  }
  if (g.yLabel) out += `<text class="sf-chart-candlestick-axis-label" x="${px(inner.left)}" y="${px(g.font)}" text-anchor="start">${esc(g.yLabel)}</text>`;
  if (g.xLabel) out += `<text class="sf-chart-candlestick-axis-label" x="${px((inner.left + inner.right) / 2)}" y="${px(g.height - 4)}" text-anchor="middle">${esc(g.xLabel)}</text>`;
  return `${out}</g>`;
}

// A candle: the wick from high to low and the body from open to close; or,
// as a bar, the line from high to low with the open's tick to the left and
// the close's to the right. Each direction is one group, so a class sets
// its tone once, and its wicks (or bars) one path.
function candlesMarkup(g, paint, shape) {
  const lines = {up: '', down: ''};
  const bodies = {up: '', down: ''};
  for (const one of g.candles) {
    const {cx, half} = one;
    const key = directionOf(one.up);
    if (shape === 'bar') {
      lines[key] += `M${px(cx)} ${px(one.yHigh)}V${px(one.yLow)}M${px(cx - half)} ${px(one.yOpen)}H${px(cx)}M${px(cx)} ${px(one.yClose)}H${px(cx + half)}`;
    } else {
      lines[key] += `M${px(cx)} ${px(one.yHigh)}V${px(one.top)}M${px(cx)} ${px(one.bottom)}V${px(one.yLow)}`;
      bodies[key] += `<rect class="sf-chart-candlestick-body" x="${px(cx - half)}" y="${px(one.top)}" width="${px(half * 2)}" height="${px(Math.max(1, one.bottom - one.top))}"/>`;
    }
  }
  const styleOf = (key) => (paint.get(key) ? ` style="${esc(paintOf(paint, key))}"` : '');
  const lineOf = (key) => (lines[key] ? `<path class="sf-chart-candlestick-${shape === 'bar' ? 'bar' : 'wick'}" d="${lines[key]}"/>` : '');
  return `<g class="sf-chart-candlestick-marks" aria-hidden="true">${['up', 'down'].map((key) => `<g class="sf-chart-candlestick-${key}"${styleOf(key)} data-direction="${key}">${lineOf(key)}${bodies[key]}</g>`).join('')}</g>`;
}

// The cursor: the candle's band lit behind it and a guide line at its close.
function cursorMarkup(g, one) {
  if (!one) return '';
  let out = '<g class="sf-chart-candlestick-cursor" aria-hidden="true">';
  out += `<rect class="sf-chart-candlestick-lane" x="${px(one.cx - g.band.step / 2)}" y="${px(g.inner.top)}" width="${px(g.band.step)}" height="${px(g.inner.bottom - g.inner.top)}"/>`;
  out += `<line class="sf-chart-candlestick-crosshair" x1="${px(g.inner.left)}" x2="${px(g.inner.right)}" y1="${px(one.yClose)}" y2="${px(one.yClose)}"/>`;
  out += `<rect class="sf-chart-candlestick-ring" x="${px(one.cx - one.half - 3)}" y="${px(one.yHigh - 3)}" width="${px(one.half * 2 + 6)}" height="${px(one.yLow - one.yHigh + 6)}" rx="2"/>`;
  return `${out}</g>`;
}

const swatchMarkup = () => '<svg viewBox="0 0 12 12" focusable="false"><path class="sf-chart-candlestick-wick" d="M6 0V3M6 9V12"/><rect class="sf-chart-candlestick-body" x="3" y="3" width="6" height="6"/></svg>';

function renderKey(context, place) {
  if (context.legend !== place || context.state !== 'ready') return nothing;
  const {component, paint} = context;
  return html`
    <ul class=${`sf-chart-candlestick-legend sf-chart-candlestick-legend--${place}`} aria-label=${component.words('legend')}>
      ${['up', 'down'].map((key) => html`
        <li class=${`sf-chart-candlestick-legend-item sf-chart-candlestick-${key}`} style=${paintOf(paint, key) || nothing}>
          <span class="sf-chart-candlestick-swatch" aria-hidden="true" .innerHTML=${swatchMarkup()}></span>
          <span>${component.words(key)}</span>
        </li>
      `)}
    </ul>
  `;
}

function renderTooltip(context, g, one) {
  if (!one || context.tooltip === 'none') return nothing;
  const {component, model} = context;
  const flip = one.cx > g.width / 2;
  const rows = [['open', one.open], ['high', one.high], ['low', one.low], ['close', one.close]];
  return html`
    <div class=${`sf-chart-candlestick-tooltip${flip ? ' sf-chart-candlestick-tooltip--flip' : ''}`} aria-hidden="true"
         style=${`inset-inline-start: ${px(one.cx)}px; inset-block-start: ${px((one.yHigh + one.yLow) / 2)}px; --sf-chart-candlestick--reach: ${px(one.half)}`}>
      <div class="sf-chart-candlestick-tooltip-name">${component.sayPeriod(model, one)}</div>
      ${rows.map(([key, value]) => html`
        <div class="sf-chart-candlestick-tooltip-row">
          <span>${component.words(key)}</span>
          <span class="sf-chart-candlestick-tooltip-value">${component.sayY(value)}</span>
        </div>
      `)}
      <div class=${`sf-chart-candlestick-tooltip-row sf-chart-candlestick-tooltip-change sf-chart-candlestick-${directionOf(one.up)}`} style=${paintOf(context.paint, directionOf(one.up)) || nothing}>
        <span>${component.words('change')}</span>
        <span class="sf-chart-candlestick-tooltip-value">${component.sayChange(one.open, one.close)}</span>
      </div>
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
    <div class=${shownTable ? 'sf-chart-candlestick-table' : 'sf-chart-candlestick-sr'}>
      <table>
        <caption>${label}</caption>
        <thead>
          <tr>
            <th scope="col">${component.xLabel || model.xField || component.words('period-column')}</th>
            ${['open', 'high', 'low', 'close', 'change'].map((key) => html`<th scope="col">${component.words(key)}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${model.candles.map((one) => html`
            <tr>
              <th scope="row">${component.sayX(model, one)}</th>
              <td>${component.sayY(one.open)}</td>
              <td>${component.sayY(one.high)}</td>
              <td>${component.sayY(one.low)}</td>
              <td>${component.sayY(one.close)}</td>
              <td>${component.sayChange(one.open, one.close)}</td>
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
    return html`<div class="sf-chart-candlestick-loading" role="status" aria-busy="true"><span class="sf-chart-candlestick-sr">${component.words('loading')}</span></div>`;
  }
  if (state === 'empty' || state === 'error') {
    return html`
      <sf-empty-state class="sf-chart-candlestick-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
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
    <svg class="sf-chart-candlestick-svg" role="group" tabindex="0" focusable="true"
         aria-label=${context.label} aria-roledescription=${component.words('roledescription')}
         aria-describedby=${described || nothing}
         width=${g.width} height=${g.height} viewBox=${`0 0 ${g.width} ${g.height}`}
         @keydown=${(event) => component.onPlotKey(event)}
         @pointermove=${(event) => component.onPointerMove(event)}
         @pointerleave=${() => component.onPointerLeave()}
         @click=${(event) => component.onPlotClick(event)}
         @blur=${() => component.setCursor(null)}
         .innerHTML=${axesMarkup(drawn) + cursorMarkup(g, cursor) + candlesMarkup(g, paint, context.shape)}>
    </svg>
    ${renderTooltip(context, g, cursor)}
  `;
}

export function renderCandlestickTemplate(context) {
  const {component, uid, state} = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return html`
    <figure class=${['sf-chart-candlestick', `sf-chart-candlestick--size-${size}`, `sf-chart-candlestick--${state}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-chart-candlestick-head">
        <span class="sf-chart-candlestick-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.table === 'toggle' && state === 'ready'
          ? html`<button type="button" class="sf-chart-candlestick-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>`
          : nothing}
      </figcaption>
      ${renderKey(context, 'top')}
      <div class="sf-chart-candlestick-plot" ?hidden=${tableView}>${renderPlot(context)}</div>
      ${renderKey(context, 'bottom')}
      ${context.summaryText ? html`<p class="sf-chart-candlestick-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : nothing}
      ${context.hasDescription ? html`<div class="sf-chart-candlestick-description" id=${`${uid}-description`}>${context.description}</div>` : nothing}
      <div class="sf-chart-candlestick-sr" aria-live="polite">${context.said}</div>
      ${renderTable(context)}
    </figure>
  `;
}
