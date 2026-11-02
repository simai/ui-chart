import {html} from 'lit';
import './default.css';

// A sparkline: one SVG image named by the label and a sentence of the data.
// The inside is markup set as the svg element's innerHTML (a property, so
// lit writes no part markers there and a first-paint snapshot is stable).

const px = (value) => `${Math.round(value * 10) / 10}`;

function marksMarkup(g) {
  if (!g) return '';
  if (g.empty) return `<line class="sf-sparkline-empty" x1="0" x2="${px(g.width)}" y1="${px(g.height / 2)}" y2="${px(g.height / 2)}"/>`;
  let out = '';
  if (g.bars) {
    for (const bar of g.bars) {
      out += `<rect class="sf-sparkline-bar${bar.marked ? ' sf-sparkline-bar--mark' : ''}" x="${px(bar.x)}" y="${px(bar.y)}" width="${px(bar.width)}" height="${px(bar.height)}"/>`;
    }
    return out;
  }
  if (g.area) out += `<path class="sf-sparkline-area" d="${g.area}"/>`;
  out += `<path class="sf-sparkline-line" d="${g.d}"/>`;
  for (const [x, y] of g.marks) out += `<circle class="sf-sparkline-mark" cx="${px(x)}" cy="${px(y)}" r="${px(g.radius)}"/>`;
  return out;
}

export function renderSparklineTemplate(context) {
  const {state, geometry: g, name} = context;
  const size = String(context.size).replace('/', '-');
  return html`
    <span class=${['sf-sparkline', `sf-sparkline--size-${size}`, `sf-sparkline--${state}`, `sf-sparkline--${context.shape}`, context.rootClass].filter(Boolean).join(' ')}
          role="img" aria-label=${name} aria-busy=${state === 'loading' ? 'true' : 'false'}>
      <svg class="sf-sparkline-svg" aria-hidden="true" focusable="false"
           width=${g ? g.width : 0} height=${g ? g.height : 0} viewBox=${g ? `0 0 ${g.width} ${g.height}` : '0 0 0 0'}
           .innerHTML=${marksMarkup(g)}></svg>
    </span>
  `;
}
