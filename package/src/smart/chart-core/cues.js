// When hue cannot tell series apart, the shapes do (docs/DECISIONS.md D20).
//
// Two cases take hue away from a chart:
//
// - the system sets the colours (`forced-colors: active`, the Windows
//   contrast themes): every series is drawn in the text colour;
// - a colour scheme of SIMAI Framework's display settings is on: the root
//   carries `data-sf-scheme` (black-on-white, white-on-black,
//   yellow-on-black, blue-on-sky, brown-on-cream) and the scheme maps the
//   theme's graphic tones, which the charts' `theme` palette reads, to its
//   one text tone.
//
// In either case a chart is in "cue" mode: a line series past the first has
// a dash of its own and every series a mark of its own shape; a bar, slice
// or part past the first has a hatch of its own; the legend's swatch shows
// the same dash, shape or hatch. One detection and one watcher serve every
// chart on the page.

const SCHEME = 'data-sf-scheme';

function matches(query) {
  try {
    return Boolean(globalThis.matchMedia?.(query).matches);
  } catch {
    return false;
  }
}

/** True when the system sets the colours. */
export const forcedColours = () => matches('(forced-colors: active)');

/**
 * True when a display-settings colour scheme is on. The names are the
 * Framework's own (SF.displaySettings.schemes) when its runtime has them;
 * an older runtime has no scheme sheet, so any value counts there and the
 * cues are only drawn where they cost nothing.
 */
export function schemeOn(root = globalThis.document?.documentElement) {
  const value = root?.getAttribute?.(SCHEME);
  if (!value) return false;
  const known = globalThis.SF?.displaySettings?.schemes;
  return known && typeof known.includes === 'function' ? known.includes(value) : true;
}

/** True when a chart should tell its series apart without hue. */
export const cuesOn = () => forcedColours() || schemeOn();

// --- One watcher per page -----------------------------------------------------

const listeners = new Set();
let undo = null;

function tell() {
  for (const listener of [...listeners]) {
    try {
      listener();
    } catch (error) {
      console.error('chart cues listener failed', error);
    }
  }
}

function start() {
  const doc = globalThis.document;
  const stops = [];
  if (doc?.documentElement && typeof MutationObserver === 'function') {
    // The scheme, and the theme class or colour-scheme a page switches: a
    // label's ink is chosen against what is drawn now.
    const observer = new MutationObserver(tell);
    observer.observe(doc.documentElement, {attributes: true, attributeFilter: [SCHEME, 'class', 'style']});
    if (doc.body) observer.observe(doc.body, {attributes: true, attributeFilter: ['class', 'style']});
    stops.push(() => observer.disconnect());
  }
  for (const query of ['(forced-colors: active)', '(prefers-color-scheme: dark)']) {
    try {
      const list = globalThis.matchMedia?.(query);
      if (list?.addEventListener) {
        list.addEventListener('change', tell);
        stops.push(() => list.removeEventListener('change', tell));
      }
    } catch {
      // A runner without media queries: nothing to follow.
    }
  }
  return () => stops.forEach((stop) => stop());
}

/**
 * Calls `listener` whenever the cues or the look may have changed (a scheme
 * chosen or left, forced colours, the theme). Returns the unsubscribe.
 */
export function watchDisplay(listener) {
  if (typeof listener !== 'function') return () => {};
  listeners.add(listener);
  if (!undo) undo = start();
  return () => {
    listeners.delete(listener);
    if (!listeners.size && undo) {
      undo();
      undo = null;
    }
  };
}

// --- Marks --------------------------------------------------------------------

// A series' mark by its place: a circle, a square, a triangle, a diamond and
// a triangle down, each of about a circle's area at radius r (the scatter's
// and the radar's shapes, D9).
const CORNERS = [
  null,
  [[-0.89, -0.89], [0.89, -0.89], [0.89, 0.89], [-0.89, 0.89]],
  [[0, -1.25], [1.08, 0.62], [-1.08, 0.62]],
  [[0, -1.25], [1.25, 0], [0, 1.25], [-1.25, 0]],
  [[0, 1.25], [1.08, -0.62], [-1.08, -0.62]],
];

export const MARK_SHAPES = CORNERS.length;

const round = (value) => `${Math.round(value * 10) / 10}`;

/** The SVG markup of a series' mark at (cx, cy), with extra attributes. */
export function markMarkup(place, cx, cy, r, extra = '') {
  const corners = CORNERS[((place % CORNERS.length) + CORNERS.length) % CORNERS.length];
  if (!corners) return `<circle${extra} cx="${round(cx)}" cy="${round(cy)}" r="${round(r)}"/>`;
  const d = corners.map(([x, y], index) => `${index ? 'L' : 'M'}${round(cx + x * r)} ${round(cy + y * r)}`).join('');
  return `<path${extra} d="${d}Z"/>`;
}

/**
 * The indexes of a series' points that carry a mark in cue mode: every
 * point when they are few, else about `most` spread evenly, each series
 * shifted a little so the marks of two series do not sit on each other.
 */
export function cueIndexes(points, place, most = 12, shown = 1) {
  const count = points.length;
  if (count <= most) return points.map((_, index) => index);
  const step = count / most;
  const shift = (step * ((place % Math.max(1, shown)) + 0.5)) / Math.max(1, shown);
  const out = [];
  for (let at = shift; at < count; at += step) out.push(Math.min(count - 1, Math.floor(at)));
  return [...new Set(out)];
}

// --- Hatches ------------------------------------------------------------------

// A fill's hatch by its place: the first series is solid, every other one
// has lines or dots of the ground's colour over its own, on a 6 px tile.
// The same seven kinds are an SVG pattern (marks) and a CSS background
// (legend swatches, HTML parts), so a swatch shows what its series shows.
export const HATCHES = 7;

/** The hatch kind of a place: 0 is solid, 1..7 a hatch. */
export const hatchOf = (place) => (place <= 0 ? 0 : ((place - 1) % HATCHES) + 1);

const LINES = {
  1: 'M-1.5 1.5L1.5 -1.5M0 6L6 0M4.5 7.5L7.5 4.5',
  2: 'M0 3H6',
  4: 'M-1.5 4.5L1.5 7.5M0 0L6 6M4.5 -1.5L7.5 1.5',
  5: 'M3 0V6',
  6: 'M-1.5 1.5L1.5 -1.5M0 6L6 0M4.5 7.5L7.5 4.5M-1.5 4.5L1.5 7.5M0 0L6 6M4.5 -1.5L7.5 1.5',
  7: 'M0 3H6M3 0V6',
};

/**
 * An SVG pattern of a hatch kind, its tile in `fill` and its lines in
 * `ink` (CSS values, as var() of the chart's own variables, so a theme or
 * forced colours restyle it). '' for a solid place.
 */
export function hatchPattern(id, kind, fill, ink) {
  if (!kind) return '';
  const lines = kind === 3
    ? `<circle cx="3" cy="3" r="1.4" style="fill: ${ink}"/>`
    : `<path d="${LINES[kind]}" style="fill: none; stroke: ${ink}; stroke-width: ${kind === 6 || kind === 7 ? 1 : 1.5}"/>`;
  return `<pattern id="${id}" class="sf-chart-hatch" patternUnits="userSpaceOnUse" width="6" height="6">`
    + `<rect width="6" height="6" style="fill: ${fill}"/>${lines}</pattern>`;
}

const stripes = (angle, ink, width = 1.5, period = 6) => `repeating-linear-gradient(${angle}, ${ink} 0 ${width}px, transparent ${width}px ${period}px)`;
const diagonal = (angle, ink, width = 1.5) => stripes(angle, ink, width, 4.24);

/** The CSS background-image of a hatch kind in `ink`, or '' for solid. */
export function hatchImage(kind, ink) {
  switch (kind) {
    case 1: return diagonal('-45deg', ink);
    case 2: return `${stripes('180deg', ink)}`;
    case 3: return `radial-gradient(circle at 3px 3px, ${ink} 0 1.4px, transparent 1.7px) 0 0 / 6px 6px`;
    case 4: return diagonal('45deg', ink);
    case 5: return `${stripes('90deg', ink)}`;
    case 6: return `${diagonal('-45deg', ink, 1)}, ${diagonal('45deg', ink, 1)}`;
    case 7: return `${stripes('180deg', ink, 1)}, ${stripes('90deg', ink, 1)}`;
    default: return '';
  }
}

/** A `background` declaration value: the hatch over `fill`, or '' for solid. */
export function hatchBackground(kind, fill, ink) {
  const image = hatchImage(kind, ink);
  return image ? `${image}, ${fill}` : '';
}
