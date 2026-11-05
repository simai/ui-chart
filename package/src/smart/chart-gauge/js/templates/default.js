import {html, nothing} from 'lit';
import {keptView} from '../../../chart-core/settle.js';
import {arcPath} from '../../../chart-core/arc.js';
import {gaugeAngle} from '../../../chart-core/gauge.js';
import './default.css';

// The figure of a gauge: the label (with the table button on request), the
// meter, the target line, the summary and the description, and the same
// data as a table.
//
// The meter is a role="meter" named by the label, with its value text and
// the summary as its description; what it draws is presentational. The arc
// is SVG in a fixed view box that its width scales, the bar HTML with its
// positions as unitless shares in styles, so the first paint is the drawn
// gauge. A band's colour is a class by its role; the value's colour is its
// band's role, or the page's colour, set in a style as --fill.

// The arc's view box: a half circle around (100, 100); the track is the
// ring from 70 to 90, the bands a thin ring from 93 to 98 outside it, and
// the target a mark across both.
const VIEW = {width: 200, height: 101, cx: 100, cy: 100};
const TRACK = {inner: 70, outer: 90};
const RING = {inner: 93, outer: 98};
const MARK = {inner: 64, outer: 100};

const share = (value) => `${Math.round(value * 10000) / 10000}`;
const round = (value) => Math.round(value * 100) / 100;
// A page's colour is checked to be a colour (chart-core/colors) and escaped
// all the same, since it is written into markup.
const ESCAPES = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'};
const esc = (value) => String(value).replace(/[&<>"']/gu, (one) => ESCAPES[one]);

const sector = (from, to, ring) => arcPath({start: gaugeAngle(from), end: gaugeAngle(to)}, {cx: VIEW.cx, cy: VIEW.cy, ...ring});

// The arc's inside is markup set as the element's innerHTML (a property, so
// lit writes no part markers inside it: a first-paint snapshot of the arc
// is the same on every run).
function arcMarkup(model, ready) {
  const {min, max} = model;
  const span = max - min;
  let out = `<svg class="sf-chart-gauge-art" viewBox="0 0 ${VIEW.width} ${VIEW.height}" aria-hidden="true" focusable="false">`;
  out += `<path class="sf-chart-gauge-track" d="${sector(0, 1, TRACK)}"></path>`;
  for (const band of model.bands) {
    out += `<path class="sf-chart-gauge-band sf-chart-gauge-band--${band.role}" d="${sector((band.from - min) / span, (band.to - min) / span, RING)}"></path>`;
  }
  if (ready && model.share > 0) out += `<path class="sf-chart-gauge-fill" d="${sector(0, model.share, TRACK)}"></path>`;
  if (model.target) {
    const angle = gaugeAngle(model.target.share);
    const at = (r) => `${round(VIEW.cx + r * Math.sin(angle))},${round(VIEW.cy - r * Math.cos(angle))}`;
    const [x1, y1] = at(MARK.inner).split(',');
    const [x2, y2] = at(MARK.outer).split(',');
    out += `<line class="sf-chart-gauge-mark" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"></line>`;
  }
  return `${out}</svg>`;
}

// The linear form's band strip: the bands by their width on the scale, with
// the stretches no band covers left empty.
function bandsMarkup(model) {
  const {min, max, bands} = model;
  if (!bands.length) return '';
  const span = max - min;
  let out = '';
  let edge = min;
  for (const band of bands) {
    if (band.from > edge) out += `<span class="sf-chart-gauge-strip-part" style="flex-grow: ${share((band.from - edge) / span)}"></span>`;
    out += `<span class="sf-chart-gauge-strip-part sf-chart-gauge-band--${band.role}" style="flex-grow: ${share((band.to - band.from) / span)}"></span>`;
    edge = band.to;
  }
  if (edge < max) out += `<span class="sf-chart-gauge-strip-part" style="flex-grow: ${share((max - edge) / span)}"></span>`;
  return out;
}

function renderReading(context) {
  const {component, model, state} = context;
  const ready = state === 'ready';
  return html`
    <span class="sf-chart-gauge-reading">
      <span class="sf-chart-gauge-value">${ready ? component.sayY(model.value) : component.words('gap')}</span>
      ${ready && model.band ? html`<span class=${`sf-chart-gauge-zone sf-chart-gauge-zone--${model.band.role}`}>${model.band.name}</span>` : nothing}
    </span>
  `;
}

function renderEnds(context) {
  const {component, model} = context;
  return html`
    <span class="sf-chart-gauge-ends">
      <span class="sf-chart-gauge-end">${component.sayY(model.min)}</span>
      <span class="sf-chart-gauge-end">${component.sayY(model.max)}</span>
    </span>
  `;
}

function renderMeter(context) {
  const {component, model, state, uid, shape} = context;
  const ready = state === 'ready';
  const described = [context.summaryText ? `${uid}-summary` : '', context.hasDescription ? `${uid}-description` : ''].filter(Boolean).join(' ');
  const now = ready ? Math.max(model.min, Math.min(model.max, model.value)) : null;
  const style = [
    context.fill ? `--sf-chart-gauge--fill: ${esc(context.fill)}` : '',
    shape === 'linear' ? `--sf-chart-gauge--share: ${share(ready ? model.share : 0)}` : '',
    shape === 'linear' && model.target ? `--sf-chart-gauge--at: ${share(model.target.share)}` : '',
  ].filter(Boolean).join('; ');
  const art = shape === 'arc'
    ? html`<span class="sf-chart-gauge-dial">
        <span class="sf-chart-gauge-arc" .innerHTML=${arcMarkup(model, ready)}></span>
        ${renderReading(context)}
      </span>`
    : html`${renderReading(context)}
      <span class="sf-chart-gauge-bar">
        <span class="sf-chart-gauge-rail">${ready && model.share > 0 ? html`<span class="sf-chart-gauge-level"></span>` : nothing}</span>
        ${model.target ? html`<span class="sf-chart-gauge-tick"></span>` : nothing}
      </span>
      ${model.bands.length ? html`<span class="sf-chart-gauge-strip" .innerHTML=${bandsMarkup(model)}></span>` : nothing}`;
  return html`
    <div class=${`sf-chart-gauge-meter${state === 'loading' ? ' sf-chart-gauge-meter--loading' : ''}`}
         role=${state === 'loading' ? 'status' : 'meter'}
         aria-busy=${state === 'loading' ? 'true' : nothing}
         aria-label=${state === 'loading' ? component.words('loading') : context.label}
         aria-valuemin=${state === 'loading' ? nothing : String(model.min)}
         aria-valuemax=${state === 'loading' ? nothing : String(model.max)}
         aria-valuenow=${now === null ? nothing : String(now)}
         aria-valuetext=${ready ? component.valueText(model) : nothing}
         aria-describedby=${described || nothing}
         style=${style || nothing}>
      ${art}
      ${renderEnds(context)}
    </div>
    ${ready && model.target
      ? html`<p class="sf-chart-gauge-target"><span class="sf-chart-gauge-target-swatch" aria-hidden="true"></span>${component.words('target-line', {name: model.target.name, target: component.sayY(model.target.value)})}<span class="sf-chart-gauge-target-where">${component.words('target-where', {where: component.sayTarget(model)})}</span></p>`
      : nothing}
  `;
}

// The table is the settled copy of the data (chart-core/settle): it is
// rebuilt only when its key changes.
function renderTable(context) {
  const shownTable = context.table === 'visible' || (context.table === 'toggle' && context.view === 'table');
  if (context.state !== 'ready') return nothing;
  const {component} = context;
  component._tableView = component._tableView ?? {};
  return keptView(component._tableView, context.tableKey, () => tableMarkup(context, shownTable));
}

function tableMarkup(context, shownTable) {
  const {component, label} = context;
  const model = context.tableData;
  return html`
    <div class=${shownTable ? 'sf-chart-gauge-table' : 'sf-chart-gauge-sr'}>
      <table>
        <caption>${label}</caption>
        <thead>
          <tr>
            <th scope="col">${component.words('what-column')}</th>
            <th scope="col">${component.words('value-column')}</th>
          </tr>
        </thead>
        <tbody>
          <tr><th scope="row">${label}</th><td>${component.sayY(model.value)}</td></tr>
          ${model.target ? html`<tr><th scope="row">${model.target.name}</th><td>${component.sayY(model.target.value)}</td></tr>` : nothing}
          ${model.bands.map((band) => html`<tr><th scope="row">${band.name}</th><td>${component.sayRange(band)}</td></tr>`)}
        </tbody>
      </table>
    </div>
  `;
}

function renderPlot(context) {
  const {component, state} = context;
  if (state === 'empty' || state === 'error') {
    return html`
      <sf-empty-state class="sf-chart-gauge-state" kind=${state === 'error' ? 'error' : 'no-data'} size="1/2"
        heading=${component.words(state === 'error' ? 'error-title' : 'empty-title')} text=""
        @sf-empty-state-action=${(event) => {
          event.stopPropagation();
          component.sfEmit('refresh', {});
        }}></sf-empty-state>
    `;
  }
  return renderMeter(context);
}

export function renderGaugeTemplate(context) {
  const {component, uid, state, shape} = context;
  const size = String(context.size).replace('/', '-');
  const tableView = context.table === 'toggle' && context.view === 'table';
  return html`
    <figure class=${['sf-chart-gauge', `sf-chart-gauge--size-${size}`, `sf-chart-gauge--${shape}`, `sf-chart-gauge--${state}`, context.rootClass].filter(Boolean).join(' ')}
            aria-labelledby=${`${uid}-label`}>
      <figcaption class="sf-chart-gauge-head">
        <span class="sf-chart-gauge-label" id=${`${uid}-label`}>${context.label}</span>
        ${context.table === 'toggle' && state === 'ready'
          ? html`<button type="button" class="sf-chart-gauge-view" aria-pressed=${tableView ? 'true' : 'false'}
                   @click=${() => component.toggleView()}>${component.words('show-table')}</button>`
          : nothing}
      </figcaption>
      <div class="sf-chart-gauge-plot" ?hidden=${tableView}>${renderPlot(context)}</div>
      ${context.summaryText ? html`<p class="sf-chart-gauge-sr" id=${`${uid}-summary`}>${context.summaryText}</p>` : nothing}
      ${context.hasDescription ? html`<div class="sf-chart-gauge-description" id=${`${uid}-description`}>${context.description}</div>` : nothing}
      ${renderTable(context)}
    </figure>
  `;
}
