import {html, nothing} from 'lit';
import './default.css';

// A metric tile: the label, the value, the change against a previous period,
// a limit as a meter, a status with a hint, and a chart from the page.
//
// The whole tile is one target when it has one: a link (href) or a button
// (openable), with no control inside it. Otherwise it is a group named by
// its label. Inside a button only phrasing content is allowed, so every
// part is a span laid out by CSS. The change says its direction in words as well as by an arrow
// and a tone, so colour is never the only sign.

const ARROWS = {up: '▲', down: '▼', flat: '–'};

function renderDelta(context) {
  const {delta} = context;
  if (!delta) return nothing;
  return html`
    <span class="sf-metric-delta">
      <span class=${`sf-metric-change sf-metric-change--${delta.tone}`}>
        <span class="sf-metric-arrow" aria-hidden="true">${ARROWS[delta.direction]}</span>
        <span class="sf-metric-sr">${delta.word}</span>
        <span class="sf-metric-change-text">${delta.text}</span>
      </span>
      ${context.periodText ? html`<span class="sf-metric-period">${context.periodText}</span>` : nothing}
    </span>
  `;
}

function renderMeter(context) {
  const {meter} = context;
  if (!meter) return nothing;
  return html`
    <span class="sf-metric-meter" role="meter" aria-label=${meter.name}
         aria-valuemin="0" aria-valuemax=${meter.max} aria-valuenow=${meter.value} aria-valuetext=${meter.said}>
      <sf-progress-bar class="sf-metric-bar" aria-hidden="true" size="1/2" value=${meter.percent} status=${meter.status}></sf-progress-bar>
      <span class="sf-metric-limit" aria-hidden="true">${meter.text}</span>
    </span>
  `;
}

function renderBody(context) {
  const {state, uid} = context;
  const loading = state === 'loading';
  return html`
    <span class="sf-metric-label" id=${`${uid}-label`}>${context.label}</span>
    <span class="sf-metric-value" aria-hidden=${loading ? 'true' : 'false'}>
      ${loading ? html`<span class="sf-metric-skeleton"></span>` : context.valueText}
    </span>
    ${loading ? html`<span class="sf-metric-sr">${context.component.words('loading')}</span>` : nothing}
    ${loading ? nothing : renderDelta(context)}
    ${loading ? nothing : renderMeter(context)}
    ${context.status !== 'neutral' || context.hint
      ? html`<span class=${`sf-metric-status sf-metric-status--${context.status}`}>
          <span class="sf-metric-dot" aria-hidden="true"></span>
          <span class="sf-metric-sr">${context.statusWord}</span>
          <span class="sf-metric-hint">${context.hint}</span>
        </span>`
      : nothing}
  `;
}

export function renderMetricTemplate(context) {
  const {state, uid} = context;
  const size = String(context.size).replace('/', '-');
  const classes = ['sf-metric', `sf-metric--size-${size}`, `sf-metric--${state}`, context.target ? 'sf-metric--target' : '', context.rootClass].filter(Boolean).join(' ');
  const chart = html`<span class="sf-metric-chart" ?hidden=${!context.hasChart}>${context.chart}</span>`;
  if (context.target === 'link') {
    return html`<a class=${classes} href=${context.href} aria-busy=${state === 'loading' ? 'true' : 'false'}>${renderBody(context)}${chart}</a>`;
  }
  if (context.target === 'button') {
    return html`<button type="button" class=${classes} aria-busy=${state === 'loading' ? 'true' : 'false'}
                        @click=${() => context.component.open()}>${renderBody(context)}${chart}</button>`;
  }
  return html`<div class=${classes} role="group" aria-labelledby=${`${uid}-label`} aria-busy=${state === 'loading' ? 'true' : 'false'}>${renderBody(context)}${chart}</div>`;
}
