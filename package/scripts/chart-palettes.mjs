#!/usr/bin/env node
// Builds the named chart palettes (docs/DECISIONS.md D7) and writes them to
// src/smart/chart-core/palettes.js.
//
//   node scripts/chart-palettes.mjs           write the file and print a report
//   node scripts/chart-palettes.mjs --check   fail when the file is stale
//
// A colour is a hue at a light tone and a dark tone ten above it: a tone is
// CIELAB L*, and ten up is the step the Framework takes from tone 50 to 60
// for its own graphic colours, so a palette changes with the theme as the
// theme's colours do. Each set is picked greedily: the first colour is the
// seed, every next one is the candidate farthest from those chosen, in both
// themes and, for the first five, also as seen with protanopia,
// deuteranopia and tritanopia. Every colour holds 3:1 against surfaces 0-2
// of its theme. Nothing is taken from another palette: the only inputs are
// the rules below and the pinned Framework's surfaces.
import {readFileSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'smart', 'chart-core', 'palettes.js');

// Surfaces 0-2 of the pinned Framework (ui-1ec283e856cd, unchanged since ui-2d39b617a719): white, neutral-98
// and neutral-95 in the light theme; neutral-5, -10 and -15 in the dark.
const SURFACES = {
  light: ['#ffffff', '#faf9fe', '#f1f0f6'],
  dark: ['#0f1115', '#1a1b1f', '#24262a'],
};

// Yellow and olive (CIELAB hue 70-125) cannot hold 3:1 on white without
// turning muddy, so no set takes them.
const MUDDY = [70, 125];

const SETS = {
  vivid: {hues: [[0, 359]], tones: [40, 45, 50, 55], chroma: 70, minChroma: 30, size: 8, seed: '#0073ed', framework: true},
  soft: {hues: [[0, 359]], tones: [45, 50, 55], chroma: 38, minChroma: 25, size: 8, seed: '#0073ed'},
  warm: {hues: [[340, 70]], tones: [40, 45, 50, 55], chroma: 70, minChroma: 30, size: 6, seed: '#df362f'},
  cool: {hues: [[150, 320]], tones: [40, 45, 50, 55], chroma: 60, minChroma: 25, size: 6, seed: '#0073ed'},
};

// --- colour maths -------------------------------------------------------
const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toGamma = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
const fromHex = (hex) => [1, 3, 5].map((at) => toLinear(parseInt(hex.slice(at, at + 2), 16) / 255));
const toHex = (rgb) => `#${rgb.map((c) => Math.round(Math.min(1, Math.max(0, toGamma(c))) * 255).toString(16).padStart(2, '0')).join('')}`;
const mul = (m, v) => m.map((row) => row[0] * v[0] + row[1] * v[1] + row[2] * v[2]);

const XYZ = [[0.4124564, 0.3575761, 0.1804375], [0.2126729, 0.7151522, 0.072175], [0.0193339, 0.119192, 0.9503041]];
const RGB = [[3.2404542, -1.5371385, -0.4985314], [-0.969266, 1.8760108, 0.041556], [0.0556434, -0.2040259, 1.0572252]];
const WHITE = [0.95047, 1, 1.08883];

function labToLinear(L, a, b) {
  const fy = (L + 16) / 116;
  const f = (t) => (t ** 3 > 0.008856 ? t ** 3 : (t - 16 / 116) / 7.787);
  return mul(RGB, [f(fy + a / 500) * WHITE[0], f(fy) * WHITE[1], f(fy - b / 200) * WHITE[2]]);
}

function linearToLab(rgb) {
  const [x, y, z] = mul(XYZ, rgb);
  const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  const [fx, fy, fz] = [f(x / WHITE[0]), f(y / WHITE[1]), f(z / WHITE[2])];
  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
}

const inGamut = (rgb) => rgb.every((c) => c >= -1e-4 && c <= 1 + 1e-4);

// The colour at L* with the hue, its chroma cut to the sRGB gamut.
function toneOf(hue, chroma, L) {
  const h = (hue * Math.PI) / 180;
  let [lo, hi] = [0, chroma];
  for (let step = 0; step < 30; step += 1) {
    const mid = (lo + hi) / 2;
    if (inGamut(labToLinear(L, mid * Math.cos(h), mid * Math.sin(h)))) lo = mid;
    else hi = mid;
  }
  return {rgb: labToLinear(L, lo * Math.cos(h), lo * Math.sin(h)).map((c) => Math.min(1, Math.max(0, c))), chroma: lo};
}

const luminance = (rgb) => 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// Machado, Oliveira and Fernandes 2009, severity 1, on linear RGB.
const VISION = {
  normal: null,
  protan: [[0.152286, 1.052583, -0.204868], [0.114503, 0.786281, 0.099216], [-0.003882, -0.048116, 1.051998]],
  deutan: [[0.367322, 0.860646, -0.227968], [0.280085, 0.672501, 0.047413], [-0.01182, 0.04294, 0.968881]],
  tritan: [[1.255528, -0.076749, -0.178779], [-0.078411, 0.930809, 0.147602], [0.004733, 0.691367, 0.3039]],
};
const seen = (rgb, how) => (VISION[how] ? mul(VISION[how], rgb).map((c) => Math.min(1, Math.max(0, c))) : rgb);
const distance = (a, b) => Math.hypot(...linearToLab(a).map((v, i) => v - linearToLab(b)[i]));

// --- the sets -----------------------------------------------------------
const surfaces = Object.fromEntries(Object.entries(SURFACES).map(([theme, list]) => [theme, list.map(fromHex)]));
const holds = (rgb, theme) => surfaces[theme].every((ground) => contrast(rgb, ground) >= 3);
const hueOf = (hex) => {
  const [, a, b] = linearToLab(fromHex(hex));
  return ((Math.atan2(b, a) * 180) / Math.PI + 360) % 360;
};
const within = (hue, [from, to]) => (from <= to ? hue >= from && hue <= to : hue >= from || hue <= to);

function candidates(set) {
  const out = [];
  for (let hue = 0; hue < 360; hue += 4) {
    if (!set.hues.some((range) => within(hue, range)) || within(hue, MUDDY)) continue;
    for (const tone of set.tones) {
      const light = toneOf(hue, set.chroma, tone);
      const dark = toneOf(hue, set.chroma, tone + 10);
      if (Math.min(light.chroma, dark.chroma) < set.minChroma) continue;
      if (holds(light.rgb, 'light') && holds(dark.rgb, 'dark')) out.push({hue, tone, light: light.rgb, dark: dark.rgb});
    }
  }
  return out;
}

function spread(chosen, one, visions) {
  let worst = Infinity;
  for (const theme of ['light', 'dark']) {
    for (const how of visions) {
      for (const other of chosen) worst = Math.min(worst, distance(seen(other[theme], how), seen(one[theme], how)));
    }
  }
  return worst;
}

function build(set) {
  const pool = candidates(set);
  const seed = hueOf(set.seed);
  const away = (one) => Math.abs((((one.hue - seed) % 360) + 540) % 360 - 180);
  const chosen = [pool.reduce((best, one) => (away(one) + Math.abs(one.tone - 50) / 10 < away(best) + Math.abs(best.tone - 50) / 10 ? one : best))];
  while (chosen.length < set.size) {
    const visions = chosen.length < 5 ? Object.keys(VISION) : ['normal'];
    chosen.push(pool.reduce((best, one) => (spread(chosen, one, visions) > spread(chosen, best, visions) ? one : best)));
  }
  return chosen;
}

function report(chosen) {
  const out = {};
  for (const theme of ['light', 'dark']) {
    const head = chosen.slice(0, 5);
    const apart = {};
    for (const how of Object.keys(VISION)) {
      let worst = Infinity;
      head.forEach((a, i) => head.slice(i + 1).forEach((b) => { worst = Math.min(worst, distance(seen(a[theme], how), seen(b[theme], how))); }));
      apart[how] = Math.round(worst * 10) / 10;
    }
    out[theme] = {contrast: Math.round(Math.min(...chosen.flatMap((one) => surfaces[theme].map((ground) => contrast(one[theme], ground)))) * 100) / 100, apart};
  }
  return out;
}

const palettes = {};
const reports = {};
for (const [name, set] of Object.entries(SETS)) {
  const chosen = build(set);
  palettes[name] = chosen.map((one, index) => {
    const value = `light-dark(${toHex(one.light)}, ${toHex(one.dark)})`;
    if (!set.framework) return value;
    // The first colour is the brand's own; each falls back to the
    // Framework's categorical role when the theme has it (D4).
    return index === 0 ? 'var(--sf-chart-1, var(--sf-on-primary-container-graphic))' : `var(--sf-chart-${index + 1}, ${value})`;
  });
  reports[name] = report(chosen);
}
// Steps of the theme's own primary family, darkest first in the light
// theme and lightest first in the dark: ordered data, not categories.
palettes.brand = [[20, 85], [30, 80], [40, 70], [50, 60]].map(([light, dark]) => `light-dark(var(--sf-primary-${light}), var(--sf-primary-${dark}))`);

const file = `// Generated by scripts/chart-palettes.mjs (docs/DECISIONS.md D7); do not edit.
// The named palettes of the palette setting: each colour is a light-dark()
// pair on the Framework's tone ladder, 3:1 against surfaces 0-2 in its theme.
export const PALETTES = ${JSON.stringify(palettes, null, 2).replace(/"([a-z]+)":/gu, '$1:').replace(/"/gu, "'")};
`;

if (process.argv.includes('--check')) {
  const now = readFileSync(OUT, 'utf8');
  if (now !== file) {
    console.error('chart-core/palettes.js is stale: run node scripts/chart-palettes.mjs');
    process.exit(1);
  }
  console.log(JSON.stringify({fresh: true, reports}, null, 1));
} else {
  writeFileSync(OUT, file);
  console.log(JSON.stringify(reports, null, 1));
}
