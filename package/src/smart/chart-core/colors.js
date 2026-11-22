// A page's own colours for series and parts: the colors setting, an object of
// key → colour ({fact: 'primary', plan: 'neutral', errors: 'error'}), keyed
// by a series' key or a part's category (docs/DECISIONS.md D6).
//
// A colour is a Framework role or any CSS colour. A role is the role's graphic
// tone, so it follows the theme, light and dark; a CSS colour (#0a7, oklch(),
// var(--brand)) is taken as it is. Anything else is dropped with a warning: a
// colour is only ever a CSS value, never markup or a declaration. A series
// without a colour keeps the palette's by its place, as before.
//
// A colour of the page's own is checked once against the chart's background:
// under 3:1 the console says so, because a mark the eye cannot find is not
// found by a person either (WCAG 1.4.11). The chart still draws it.

export const ROLES = ['primary', 'secondary', 'tertiary', 'neutral', 'success', 'warning', 'error', 'info'];

const FORBIDDEN = /[;{}<>"'\\]/u;

// One colour value as CSS, or '' when it is not a colour.
export function colourValue(raw) {
  const value = String(raw ?? '').trim();
  if (!value || FORBIDDEN.test(value)) return '';
  if (ROLES.includes(value)) return `var(--sf-on-${value}-container-graphic)`;
  if (typeof CSS !== 'undefined' && typeof CSS.supports === 'function') {
    return CSS.supports('color', value) ? value : '';
  }
  // Without CSS (a test runner): a hex colour or a variable only.
  return /^(#[0-9a-f]{3,8}|var\(--[\w-]+\))$/iu.test(value) ? value : '';
}

// The colors setting as a Map of key → CSS value. A string is read as JSON,
// as an attribute gives it.
export function readColours(raw, warn = () => {}) {
  let source = raw;
  if (typeof source === 'string') {
    try {
      source = source.trim() ? JSON.parse(source) : {};
    } catch {
      warn(`colors is not JSON: ${source}`);
      return new Map();
    }
  }
  const out = new Map();
  if (!source || typeof source !== 'object' || Array.isArray(source)) return out;
  for (const [key, one] of Object.entries(source)) {
    const value = colourValue(one);
    if (value) out.set(String(key), value);
    else warn(`colors.${key}: «${one}» is neither a role (${ROLES.join(', ')}) nor a CSS colour`);
  }
  return out;
}

// A stable key of the map, so a chart reads it again only on a change.
export const coloursKey = (colours) => [...colours].map(([key, value]) => `${key}=${value}`).join('|');

// --- Contrast ---------------------------------------------------------------

let pad = null;

// A colour the browser resolved (rgb(), oklch(), color()) as sRGB 0..255,
// through a 1×1 canvas, the one place every colour space comes out the same.
function rgbOf(colour) {
  if (typeof document === 'undefined') return null;
  pad = pad || document.createElement('canvas').getContext('2d', {willReadFrequently: true});
  if (!pad) return null;
  pad.clearRect(0, 0, 1, 1);
  pad.fillStyle = '#000';
  pad.fillStyle = colour;
  pad.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = pad.getImageData(0, 0, 1, 1).data;
  return a === 0 ? null : [r, g, b];
}

function luminance([r, g, b]) {
  const lin = (c) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

export function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// The colour under the chart: the first ancestor with a background of its
// own, white when there is none.
function groundOf(element) {
  for (let node = element; node && node.nodeType === 1; node = node.parentElement) {
    const rgb = rgbOf(getComputedStyle(node).backgroundColor);
    if (rgb) return rgb;
  }
  return [255, 255, 255];
}

const told = new Set();

// Checks each page colour once: the colour is resolved by a probe in the
// chart's own place, so a role and a variable come out as the theme has them.
export function checkContrast(host, colours, tag) {
  if (!colours.size || typeof getComputedStyle !== 'function') return;
  const probe = document.createElement('span');
  probe.hidden = true;
  host.append(probe);
  try {
    const ground = groundOf(host);
    for (const [key, value] of colours) {
      probe.style.color = value;
      const rgb = rgbOf(getComputedStyle(probe).color);
      if (!rgb) continue;
      const ratio = contrast(rgb, ground);
      const said = `${tag}|${key}|${value}|${ground}`;
      if (ratio < 3 && !told.has(said)) {
        told.add(said);
        console.warn(`<${tag}> colors.${key} (${value}) is ${ratio.toFixed(2)}:1 against the background; a mark needs 3:1.`);
      }
    }
  } finally {
    probe.remove();
  }
}

// --- A label's ink on its fill ------------------------------------------------
//
// A label written on a mark (a slice's share) is read against that mark,
// not the page: its ink is chosen against the fill as it is drawn, the
// fill's colour laid over the ground at its opacity, so it holds 4.5:1 in
// the light and dark themes, under a display-settings scheme and on a
// page's own colours (docs/DECISIONS.md D20). The theme's own inks come
// first; pure black or white, one of which reaches 4.5:1 on any opaque
// colour, only when neither does.

export const LABEL_INKS = ['var(--sf-on-surface)', 'var(--sf-surface-0)', 'var(--sf-black, #000)', 'var(--sf-white, #fff)'];

/** `top` at `alpha` over the opaque `under`, as sRGB 0..255. */
export function composite(top, alpha, under) {
  const a = Math.max(0, Math.min(1, Number.isFinite(alpha) ? alpha : 1));
  return top.map((channel, index) => Math.round(channel * a + under[index] * (1 - a)));
}

/**
 * The place in `inks` (sRGB colours, in the order of preference) of the
 * first ink that holds `need` against `ground`, else of the one that comes
 * closest; -1 when there is none.
 */
export function pickInk(ground, inks, need = 4.5) {
  let best = -1;
  let most = -1;
  for (const [index, ink] of inks.entries()) {
    if (!ink) continue;
    const ratio = contrast(ink, ground);
    if (ratio >= need) return index;
    if (ratio > most) {
      most = ratio;
      best = index;
    }
  }
  return best;
}

// A colour the browser resolved, as sRGB 0..255 and its alpha 0..1, or null.
function rgbaOf(colour) {
  if (typeof document === 'undefined' || !colour || colour === 'none' || colour === 'transparent') return null;
  pad = pad || document.createElement('canvas').getContext('2d', {willReadFrequently: true});
  if (!pad) return null;
  pad.clearRect(0, 0, 1, 1);
  pad.fillStyle = 'rgba(0, 0, 0, 0)';
  pad.fillStyle = colour;
  pad.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = pad.getImageData(0, 0, 1, 1).data;
  if (a === 0) return null;
  return {rgb: a === 255 ? [r, g, b] : [r, g, b].map((one) => Math.min(255, Math.round((one * 255) / a))), alpha: a / 255};
}

// A mark's own colour: its computed fill, or, for a hatch, the pattern's
// tile under the lines.
function fillOf(mark) {
  const style = getComputedStyle(mark);
  let fill = style.fill;
  const url = /url\(\s*["']?#([^"')]+)["']?\s*\)/u.exec(fill || '');
  if (url) {
    const tile = mark.ownerDocument.getElementById(url[1])?.querySelector('rect');
    fill = tile ? getComputedStyle(tile).fill : '';
  }
  const colour = rgbaOf(fill);
  if (!colour) return null;
  const opacity = Number.parseFloat(style.fillOpacity);
  return {rgb: colour.rgb, alpha: colour.alpha * (Number.isFinite(opacity) ? opacity : 1)};
}

/**
 * Gives each label its ink against its mark: `pairs` is a list of
 * [label element, mark element]. The ink is written in the label's style
 * (fill for SVG text, color for HTML); under forced colours the system's
 * colours stand and an ink written before is taken back. Returns the
 * ratios reached, for a probe.
 */
export function inkLabels(host, pairs, {inks = LABEL_INKS, need = 4.5} = {}) {
  if (!pairs.length || typeof getComputedStyle !== 'function') return [];
  const forced = typeof matchMedia === 'function' && matchMedia('(forced-colors: active)').matches;
  const property = (label) => (label.namespaceURI === 'http://www.w3.org/2000/svg' ? 'fill' : 'color');
  if (forced) {
    for (const [label] of pairs) label.style.removeProperty(property(label));
    return [];
  }
  const probe = document.createElement('span');
  probe.hidden = true;
  host.append(probe);
  let resolved;
  try {
    resolved = inks.map((ink) => {
      probe.style.color = ink;
      return rgbOf(getComputedStyle(probe).color);
    });
  } finally {
    probe.remove();
  }
  const ground = groundOf(host);
  const ratios = [];
  for (const [label, mark] of pairs) {
    const fill = mark && fillOf(mark);
    if (!fill) continue;
    const under = composite(fill.rgb, fill.alpha, ground);
    const chosen = pickInk(under, resolved, need);
    if (chosen < 0) continue;
    label.style.setProperty(property(label), inks[chosen]);
    ratios.push(Math.round(contrast(resolved[chosen], under) * 100) / 100);
  }
  return ratios;
}
