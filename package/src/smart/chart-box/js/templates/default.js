import {html, nothing} from 'lit';
import {keptView} from '../../../chart-core/settle.js';
import './default.css';

// The figure of a box plot: the label and the table button, the legend, the
// plot (SVG), the summary and the description, the live line, and the same
// statistics as a table.
//
// The plot is one Tab stop, a role="group" named by the label and described
// by the summary; its axes and marks are aria-hidden, because the summary,
// the live line and the table say what they show. A series is a colour
// class (--c1..--c4) and its place in the band, and in forced colours its
// box's dash too. A page's own colour (the colors setting, by the series'
// key) is --custom with its value in a style.

const colourOf = (place, paint) => `sf-chart-box-series--${paint ? 'custom' : `c${(place % 4) + 1}`}${place > 0 ? ` sf-chart-box-series--d${Math.min(place, 7)}` : ''}`;
const paintOf = (paint) => (paint ? `--sf-chart-box--custom: ${paint}` : '');
const paintAttr = (paint) => (paint ? ` style="${esc(paintOf(paint))}"` : '');
const px = (value) => `${Math.round(value * 10) / 10}`;

// The plot's inside is SVG markup set as the svg element's innerHTML (a
// property, so lit writes no part markers inside it: a first-paint snapshot
// of the plot is the same on every run). Every text is escaped.
const ESCAPES = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'};
const esc = (value) => String(value).replace(/[&<>"']/gu, (one) => ESCAPES[one]);

function axesMarkup(g) {
  const {inner} = g;
  let out = '<g class="sf-chart-box-axes" aria-hidden="true">';
  for (const tick of g.valueTicks) {
    if (g.grid === 'none' && !tick.zero) continue;
    out += `<line class="${tick.zero ? 'sf-chart-box-baseline' : 'sf-chart-box-grid'}" x1="${px(inner.left)}" x2="${px(inner.right)}" y1="${px(tick.at)}" y2="${px(tick.at)}"/>`;
  }
  out += `<line class="sf-chart-box-baseline" x1="${px(inner.left)}" x2="${px(inner.right)}" y1="${px(inner.bottom)}" y2="${px(inner.bottom)}"/>`;
  for (const tick of g.valueTicks) {
    out += `<text class="sf-chart-box-tick" x="${px(inner.left - 6)}" y="${px(tick.at)}" text-anchor="end" dominant-baseline="middle">${esc(tick.text)}</text>`;
  }
  for (const tick of g.groupTicks) {
    out += `<text class="sf-chart-box-tick" x="${px(tick.at)}" y="${px(inner.bottom + g.font * 1.2)}" text-anchor="middle" dominant-baseline="middle">${esc(tick.text)}</text>`;
  }
  if (g.yLabel) out += `<text class="sf-chart-box-axis-label" x="${px(inner.left)}" y="${px(g.font)}" text-anchor="start">${esc(g.yLabel)}</text>`;
  if (g.xLabel) out += `<text class="sf-chart-box-axis-label" x="${px((inner.left + inner.right) / 2)}" y="${px(g.height - 4)}" text-anchor="middle">${esc(g.xLabel)}</text>`;
  return `${out}</g>`;
}

// One box: the whiskers with their caps (one path), the box from the lower to the
// upper quartile, the median across it, the mean as a small diamond, and
// each outlier as a ring.
function boxMarkup(one, g, mean) {
  const {cx, half} = one;
  const cap = half / 2;
  let out = '';
  out += `<path class="sf-chart-box-whisker" d="M${px(cx)} ${px(one.q3)}V${px(one.high)}M${px(cx - cap)} ${px(one.high)}H${px(cx + cap)}M${px(cx)} ${px(one.q1)}V${px(one.low)}M${px(cx - cap)} ${px(one.low)}H${px(cx + cap)}"/>`;
  out += `<rect class="sf-chart-box-box" x="${px(cx - half)}" y="${px(one.q3)}" width="${px(half * 2)}" height="${px(Math.max(1, one.q1 - one.q3))}"/>`;
  out += `<line class="sf-chart-box-median" x1="${px(cx - half)}" x2="${px(cx + half)}" y1="${px(one.median)}" y2="${px(one.median)}"/>`;
  if (mean && one.mean !== null) {
    const r = g.dot + 1;
    out += `<path class="sf-chart-box-mean" d="M${px(cx)} ${px(one.mean - r)}L${px(cx + r)} ${px(one.mean)}L${px(cx)} ${px(one.mean + r)}L${px(cx - r)} ${px(one.mean)}Z"/>`;
  }
  for (const at of one.outliers) out += `<circle class="sf-chart-box-outlier" cx="${px(cx)}" cy="${px(at)}" r="${px(g.dot)}"/>`;
  return out;
}

function marksMarkup(g, paint, shown, mean) {
  let out = '<g class="sf-chart-box-marks" aria-hidden="true">';
  for (const one of shown) {
    const own = g.boxes.filter((each) => each.key === one.key).map((each) => boxMarkup(each, g, mean)).join('');
    out += `<g class="sf-chart-box-series ${colourOf(one.place, paint.get(one.key))}"${paintAttr(paint.get(one.key))} data-series="${esc(one.key)}">${own}</g>`;
  }
  return `${out}</g>`;
}

// The cursor: the box's lane lit behind it and a ring around its box.
function cursorMarkup(g, one) {
  if (!one) return '';
  const lane = Math.max(one.half * 2 + 8, 0);
  let out = '<g class="sf-chart-box-cursor" aria-hidden="true">';
  out += `<rect class="sf-chart-box-lane" x="${px(one.cx - lane / 2)}" y="${px(g.inner.top)}" width="${px(lane)}" height="${px(g.inner.bottom - g.inner.top)}"/>`;
  out += `<rect class="sf-chart-box-ring" x="${px(one.cx - one.half - 3)}" y="${px(one.q3 - 3)}" width="${px(one.half * 2 + 6)}" height="${px(Math.max(1, one.q1 - one.q3) + 6)}" rx="2"/>`;
  return `${out}</g>`;
}

const swatchMarkup = () => '<svg viewBox="0 0 12 12" focusable="false"><rect x="1.5" y="1.5" width="9" height="9" rx="1"/></svg>';

function renderTooltip(context, g, one) {
  if (!one || context.tooltip === 'none') return nothing;
  const {component, model} = context;
  const {box} = one;
  const flip = one.cx > g.width / 2;
  const rows = [
    [component.words('max'), box.max],
    [component.words('q3'), box.q3],
    [component.words('median'), box.median],
    [component.words('q1'), box.q1],
    [component.words('min'), box.min],
  ];
  if (context.mean && box.mean !== null && box.mean !== undefined) rows.push([component.words('mean'), box.mean]);
  const counts = [];
  if (box.n !== null) counts.push([component.words('count'), box.n]);
  if (box.outliers.length) counts.push([component.words('outliers'), box.outliers.length]);
  return html`
    <div class=${`sf-chart-box-tooltip${flip ? ' sf-chart-box-tooltip--flip' : ''}`} aria-hidden="true"
         style=${`inset-inline-start: ${px(one.cx)}px; inset-block-start: ${px((one.q1 + one.q3) / 2)}px; --sf-chart-box--reach: ${px(one.half)}`}>
      <div class=${`sf-chart-box-tooltip-name ${colourOf(one.place, context.paint.get(one.key))}`} style=${paintOf(context.paint.get(one.key)) || nothing}>
        <span class="sf-chart-box-swatch" .innerHTML=${swatchMarkup()}></span>
        <span>${component.boxName(model, one.index, one.key)}</span>
      </div>
      ${rows.map(([name, value]) => html`
        <div class="sf-chart-box-tooltip-row">
          <span>${name}</span>
          <span class="sf-chart-box-tooltip-value">${component.sayY(value)}</span>
        </div>
      `)}
      ${counts.map(([name, value]) => html`
        <div class="sf-chart-box-tooltip-row">
          <span>${name}</span>
          <span class="sf-chart-box-tooltip-value">${component.sayCount(value)}</span>
        </div>
      `)}
    </div>
  `;
}

function renderLegend(context, place) {
  if (context.legend !== place || context.state !== 'ready') return nothing;
  const {component, model} = context;
  const hidden = new Set(component.hiddenSeries || []);
  return html`
    <div class=${`sf-chart-box-legend sf-chart-box-legend--${place}`} role="group" aria-label=${component.words('legend')}>
      ${model.series.map((one, index) => html`
        <button type="button" class=${`sf-chart-box-legend-item ${colourOf(index, context.paint.get(one.key))}`}
                style=${paintOf(context.paint.get(one.key)) || nothing} aria-pressed=${hidden.has(one.key) ? 'false' : 'true'}
                data-series=${one.key} @click=${() => component.toggleSeries(one.key)}>
          <span class="sf-chart-box-swatch" aria-hidden="true" .innerHTML=${swatchMarkup()}></span>
          <span class="sf-chart-box-legend-name">${one.name}</span>
        </button>
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
  const several = model.series.length > 1;
  const counted = model.series.some((one) => one.boxes.some((box) => box && box.n !== null));
  const mean = context.mean && model.series.some((one) => one.boxes.some((box) => box && box.mean !== null && box.mean !== undefined));
  const rows = [];
  model.labels.forEach((group, index) => {
    for (const one of model.series) {
      const box = one.boxes[index];
      if (box) rows.push({group, series: one.name, box});
    }
  });
  const say = (value) => (value === null || value === undefined ? '' : component.sayY(value));
  return html`
    <div class=${shownTable ? 'sf-chart-box-table' : 'sf-chart-box-sr'}>
      <table>
        <caption>${label}</caption>
        <thead>
          <tr>
            <th scope="col">${component.xLabel || model.xField || component.words('group-column')}</th>
            ${several ? html`<th scope="col">${component.words('series-column')}</th>` : nothing}
            ${counted ? html`<th scope="col">${component.words('count')}</th>` : nothing}
            <th scope="col">${component.words('min')}</th>
            <th scope="col">${component.words('q1')}</th>
            <th scope="col">${component.words('median')}</th>
            <th scope="col">${component.words('q3')}</th>
            <th scope="col">${component.words('max')}</th>
            ${mean ? html`<th scope="col">${component.words('mean')}</th>` : nothing}
            ${counted ? html`<th scope="col">${component.words('outliers')}</th>` : nothing}
          </tr>
        </thead>
        <tbody>
          ${rows.map(({group, series, box}) => html`
            <tr>
              <th scope="row">${group}</th>
              ${several ? html`<td>${series}</td>` : nothing}
              ${counted ? html`<td>${component.sayCount(box.n ?? 0)}</td>` : nothing}
              <td>${say(box.min)}</td>
              <td>${say(box.q1)}</td>
              <td>${say(box.median)}</td>
              <td>${say(box.q3)}</td>
              <td>${say(box.max)}</td>
              ${mean ? html`<td>${say(box.mean)}</td>` : nothing}
              ${counted ? html`<td>${box.outliers.map((value) => component.sayY(value)).join('; ')}</td>` : nothing}
            </tr>
          `)}
        </tbody>
      </table>
    </div>
  `;
}

function renderPlot(context) {
  const {component, geometry: g, uid, state, cursor, shown, paint} = context;
  if (state === 'loading') {
    return html`<div class="sf-chart-box-loading" role="status" aria-busy="true"><span class="sf-chart-box-sr">${component.words('loading')}</span></div>`;
  }
  if (state === 'empty' || state === 'error') {
    return html`
      <sf-empty-state class="sf-chart-box-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
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
    <svg class="sf-chart-box-svg" role="group" tabindex="0" focusable="true"
         aria-label=${context.label} aria-roledescription=${component.words('roledescription')}
         aria-describedby=${described || nothing}
         width=${g.width} height=${g.height} viewBox=${`0 0 ${g.width} ${g.height}`}
         @keydown=${(event) => component.onPlotKey(event)}
         @pointermove=${(event) => component.onPointerMove(event)}
         @pointerleave=${() => component.onPointerLeave()}
         @click=${(event) => component.onPlotClick(event)}
         @blur=${() => component.setCursor(null)}
         .innerHTML=${axesMarkup(drawn) + cursorMarkup(g, cursor) + marksMarkup(drawn, paint, shown, context.mean)}>
    </svg>
    ${renderTooltip(context, g, cursor)}
  `;
}

export function renderBoxTemplate(context) {
  const {component, uid, state} = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return html`
    <figure class=${['sf-chart-box', `sf-chart-box--size-${size}`, `sf-chart-box--${state}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-chart-box-head">
        <span class="sf-chart-box-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.table === 'toggle' && state === 'ready'
          ? html`<button type="button" class="sf-chart-box-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>`
          : nothing}
      </figcaption>
      ${renderLegend(context, 'top')}
      <div class="sf-chart-box-plot" ?hidden=${tableView}>${renderPlot(context)}</div>
      ${renderLegend(context, 'bottom')}
      ${context.summaryText ? html`<p class="sf-chart-box-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : nothing}
      ${context.hasDescription ? html`<div class="sf-chart-box-description" id=${`${uid}-description`}>${context.description}</div>` : nothing}
      <div class="sf-chart-box-sr" aria-live="polite">${context.said}</div>
      ${renderTable(context)}
    </figure>
  `;
}
