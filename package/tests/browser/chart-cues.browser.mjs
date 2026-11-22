#!/usr/bin/env node
// Usage: node this-file /absolute/path/to/output
// Series stay apart without hue (docs/DECISIONS.md D20, DSA-1) on the built
// bytes: sf-chart-line, sf-chart-bar (and its histogram), sf-chart-pie and
// sf-chart-parts, under forced colours and under a display-settings colour
// scheme (data-sf-scheme on the root), and as before without either.
// - cue mode: the chart's root carries its --cues class in forced colours
//   and in a scheme, and not otherwise; it follows a scheme chosen or left
//   after the chart drew;
// - lines: every series has its own dash and mark shape, and its legend
//   swatch the same dash and shape;
// - fills (bars, a histogram's bars, slices, parts): every series has its
//   own fill (solid or one of the hatches), and its swatch the same hatch;
// - the shares written on slices hold 4.5:1 against their own slice, in the
//   light and dark themes and in a scheme (measured here, by this probe's
//   own reading of the drawn colours).
//
// The pinned Framework has no scheme sheet yet, so the scheme here is a
// fixture shaped like ui-source's _sf_css__display.scss (feat/display-settings-ds):
// the graphic tones every theme-palette series reads become the scheme's one
// text tone on its ground.
import {resolve, join} from 'node:path';
import {existsSync} from 'node:fs';
import {chromium} from 'playwright';

if (!process.argv[2]) throw new Error('Build output root is required');
const out = resolve(process.argv[2]);
const CHARTS = ['chart-line', 'chart-bar', 'chart-pie', 'chart-parts'];
const styles = [
  'core/core/css/core.css', 'core/core/css/utility.full.css',
  'smart/smart/empty-state/css/empty-state.css',
  ...CHARTS.map((name) => `smart/smart/${name}/css/${name}.css`),
].map((p) => join(out, p));
const modules = [
  'core/core/js/core.js', 'core/core/js/smart-base.js',
  // The shared chart core registers its runtime modules before any chart asks.
  'smart/smart/chart-core/js/chart-core.js',
  'smart/smart/empty-state/js/empty-state.js',
  ...CHARTS.map((name) => `smart/smart/${name}/js/${name}.js`),
].map((p) => join(out, p));
const absent = [...styles, ...modules].filter((path) => !existsSync(path));
if (absent.length) throw new Error(`${absent.length} build asset(s) not found under ${out}: ${absent.join(', ')}`);

// Yellow on black, as the Framework's scheme maps it.
const SCHEME = `:root[data-sf-scheme='yellow-on-black'] {
  --scheme-text: #fadf4b; --scheme-ground: #000;
  --sf-on-primary-container-graphic: var(--scheme-text); --sf-on-secondary-container-graphic: var(--scheme-text);
  --sf-on-tertiary-container-graphic: var(--scheme-text); --sf-on-neutral-container-graphic: var(--scheme-text);
  --sf-on-surface: var(--scheme-text); --sf-on-surface-variant: var(--scheme-text);
  --sf-surface-0: var(--scheme-ground); --sf-surface-3: var(--scheme-ground);
  --sf-outline: var(--scheme-text); --sf-outline-variant: var(--scheme-text);
  color-scheme: dark;
}
:root[data-sf-scheme='yellow-on-black'] body { background: var(--scheme-ground) !important; color: var(--scheme-text); }`;

const failures = [];
const note = (detail) => failures.push(detail);
const evidence = {};
const errors = [];

const months = ['2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06'];
const lineItems = months.map((month, index) => ({month, a: 10 + index * 3, b: 14 + index * 2, c: 9 + index * 4}));
const barItems = [{q: 'Q1', a: 12, b: 9, c: 7}, {q: 'Q2', a: 15, b: 11, c: 8}, {q: 'Q3', a: 13, b: 14, c: 10}];
const histogramItems = Array.from({length: 60}, (_, index) => ({v: (index * 37) % 50, s: index % 2 ? 'odd' : 'even'}));
const pieItems = [{k: 'a', v: 40}, {k: 'b', v: 22}, {k: 'c', v: 16}, {k: 'd', v: 12}, {k: 'e', v: 10}];
const partsItems = [{k: 'a', v: 22}, {k: 'b', v: 13}, {k: 'c', v: 7}, {k: 'd', v: 3}];

const CASES = [
  {tag: 'sf-chart-line', attributes: {label: 'Линии', x: 'month', y: 'a,b,c'}, items: lineItems},
  {tag: 'sf-chart-bar', attributes: {label: 'Столбцы', x: 'q', y: 'a,b,c'}, items: barItems},
  {tag: 'sf-chart-bar', id: 'histogram', attributes: {label: 'Гистограмма', x: 'v', series: 's', bin: 'auto'}, items: histogramItems},
  {tag: 'sf-chart-pie', attributes: {label: 'Круг', category: 'k', value: 'v'}, items: pieItems},
  {tag: 'sf-chart-parts', attributes: {label: 'Части', category: 'k', value: 'v', max: '50'}, items: partsItems},
];

const browser = await chromium.launch();
const open = async ({theme = 'light', forced = 'none', scheme = ''} = {}) => {
  const page = await browser.newPage({viewport: {width: 900, height: 900}});
  await page.emulateMedia({colorScheme: theme, reducedMotion: 'reduce', forcedColors: forced});
  page.on('pageerror', (error) => { if (!/Automatic publicPath/u.test(error.message)) errors.push(error.message); });
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  await page.setContent(`<!doctype html><html class="theme-${theme}" lang="ru" style="color-scheme: ${theme}"${scheme ? ` data-sf-scheme="${scheme}"` : ''}><head><meta charset="utf-8"></head>`
    + '<body style="margin:0;background:var(--sf-surface-0)"><main id="box" style="padding:16px;display:grid;gap:24px"></main></body></html>');
  for (const style of styles) await page.addStyleTag({path: style});
  await page.addStyleTag({content: SCHEME});
  for (const module of modules) await page.addScriptTag({path: module, type: 'module'});
  await page.waitForFunction((tags) => tags.every((tag) => customElements.get(tag)), CHARTS.map((name) => `sf-${name}`));
  await page.evaluate(async (cases) => {
    const box = document.getElementById('box');
    for (const one of cases) {
      const chart = document.createElement(one.tag);
      chart.id = one.id || one.tag;
      for (const [name, value] of Object.entries(one.attributes)) chart.setAttribute(name, value);
      box.append(chart);
      chart.items = one.items;
    }
    await new Promise((done) => setTimeout(done, 500));
  }, CASES);
  return page;
};

// What the page shows, read by this probe: each chart's cue class, each
// series' signature (dash and shape, or fill and hatch), each swatch's, and
// the shares' contrast on their slices.
const read = (page) => page.evaluate(() => {
  const pad = document.createElement('canvas').getContext('2d', {willReadFrequently: true});
  const rgba = (colour) => {
    pad.clearRect(0, 0, 1, 1);
    pad.fillStyle = 'rgba(0, 0, 0, 0)';
    pad.fillStyle = colour;
    pad.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = pad.getImageData(0, 0, 1, 1).data;
    return a ? [r, g, b].map((one) => Math.min(255, Math.round((one * 255) / a))).concat(a / 255) : null;
  };
  const lum = ([r, g, b]) => [r, g, b].map((c) => { const s = c / 255; return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; })
    .reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
  const ratio = (a, b) => { const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x); return Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100; };
  const ground = rgba(getComputedStyle(document.body).backgroundColor) || [255, 255, 255, 1];
  // A mark's fill: a colour, or a pattern named by its kind of lines.
  const fillSignature = (mark) => {
    const fill = getComputedStyle(mark).fill;
    const url = /url\("?#([^")]+)"?\)/u.exec(fill);
    if (!url) return `solid ${fill}`;
    const pattern = document.getElementById(url[1]);
    const lines = pattern?.querySelector('path, circle');
    return `hatch ${lines?.getAttribute('d') ?? `dots ${lines?.getAttribute('r')}`}`;
  };
  const markShape = (mark) => (!mark ? 'none' : mark.tagName === 'circle' ? 'circle' : `path${(mark.getAttribute('d').match(/L/gu) || []).length}`);
  const charts = {};
  for (const chart of document.querySelectorAll('#box > *')) {
    const root = chart.firstElementChild;
    const base = chart.localName.replace(/^sf-/u, '');
    const one = {cues: root?.classList.contains(`sf-${base}--cues`) ?? false, series: [], swatches: [], shares: []};
    if (base === 'chart-line') {
      for (const group of chart.querySelectorAll('.sf-chart-line-series[data-series]')) {
        one.series.push(`${getComputedStyle(group.querySelector('.sf-chart-line-line')).strokeDasharray} ${markShape(group.querySelector('.sf-chart-line-dot--cue'))}`);
      }
      for (const item of chart.querySelectorAll('.sf-chart-line-legend-item')) {
        const svg = item.querySelector('.sf-chart-line-cue');
        one.swatches.push(svg ? `${getComputedStyle(svg.querySelector('line')).strokeDasharray} ${markShape(svg.querySelector('.sf-chart-line-dot'))}` : 'plain');
      }
    }
    if (base === 'chart-bar') {
      for (const group of chart.querySelectorAll('.sf-chart-bar-series[data-series]')) one.series.push(fillSignature(group.querySelector('.sf-chart-bar-bar')));
      for (const swatch of chart.querySelectorAll('.sf-chart-bar-legend-item .sf-chart-bar-swatch')) one.swatches.push(getComputedStyle(swatch).backgroundImage);
    }
    if (base === 'chart-pie') {
      for (const group of chart.querySelectorAll('.sf-chart-pie-series')) {
        const slice = group.querySelector('.sf-chart-pie-slice');
        one.series.push(fillSignature(slice));
        const label = group.querySelector('.sf-chart-pie-share');
        if (!label) continue;
        const style = getComputedStyle(slice);
        const url = /url\("?#([^")]+)"?\)/u.exec(style.fill);
        const tile = url ? getComputedStyle(document.getElementById(url[1]).querySelector('rect')).fill : style.fill;
        const fill = rgba(tile);
        const alpha = fill[3] * Number.parseFloat(style.fillOpacity || '1');
        const under = fill.slice(0, 3).map((c, index) => c * alpha + ground[index] * (1 - alpha));
        one.shares.push({text: label.textContent, ratio: ratio(rgba(getComputedStyle(label).fill), under)});
      }
      for (const swatch of chart.querySelectorAll('.sf-chart-pie-legend-item .sf-chart-pie-swatch')) one.swatches.push(getComputedStyle(swatch).backgroundImage);
    }
    if (base === 'chart-parts') {
      for (const part of chart.querySelectorAll('.sf-chart-parts-part:not(.sf-chart-parts-series--free)')) one.series.push(getComputedStyle(part).backgroundImage);
      for (const swatch of chart.querySelectorAll('.sf-chart-parts-item:not(.sf-chart-parts-series--free) .sf-chart-parts-swatch')) one.swatches.push(getComputedStyle(swatch).backgroundImage);
    }
    charts[chart.id] = one;
  }
  return charts;
});

const distinct = (list) => new Set(list).size === list.length;
const MODES = [
  {name: 'forced-colours', options: {forced: 'active'}, cues: true},
  {name: 'scheme-yellow-on-black', options: {scheme: 'yellow-on-black', theme: 'dark'}, cues: true},
  {name: 'light', options: {theme: 'light'}, cues: false},
  {name: 'dark', options: {theme: 'dark'}, cues: false},
];

try {
  for (const mode of MODES) {
    const page = await open(mode.options);
    const charts = await read(page);
    evidence[mode.name] = charts;
    for (const [id, one] of Object.entries(charts)) {
      if (one.cues !== mode.cues) note({case: `${mode.name}: ${id} is ${mode.cues ? '' : 'not '}in cue mode`, got: one.cues});
      if (!one.series.length) note({case: `${mode.name}: ${id} drew its series`, got: one});
      if (mode.cues) {
        if (!distinct(one.series)) note({case: `${mode.name}: every series of ${id} looks its own`, got: one.series});
        const own = id === 'sf-chart-line' ? one.series : one.series.map((value, index) => (value.startsWith('solid') || value === 'none' ? (index ? 'x' : 'none') : value));
        if (id === 'sf-chart-line' && one.swatches.join('|') !== own.join('|')) note({case: `${mode.name}: the legend of ${id} shows each series' dash and mark`, got: {series: one.series, swatches: one.swatches}});
        if (id !== 'sf-chart-line' && (!distinct(one.swatches) || one.swatches[0] !== 'none')) note({case: `${mode.name}: the swatches of ${id} differ as its fills do, the first solid`, got: one.swatches});
      } else if (one.series.some((value) => value.startsWith('hatch')) || one.swatches.some((value) => value !== 'none' && value !== 'plain')) {
        note({case: `${mode.name}: ${id} draws as before, with no hatch`, got: one});
      }
      if (!(mode.name === 'forced-colours')) {
        for (const share of one.shares) if (share.ratio < 4.5) note({case: `${mode.name}: the share «${share.text}» holds 4.5:1 on its slice`, got: share.ratio});
      }
    }
    await page.close();
  }

  // A scheme chosen after the charts drew, then left: the charts follow.
  const page = await open({theme: 'light'});
  await page.evaluate(() => document.documentElement.setAttribute('data-sf-scheme', 'yellow-on-black'));
  await page.waitForTimeout(300);
  const chosen = await read(page);
  await page.evaluate(() => document.documentElement.removeAttribute('data-sf-scheme'));
  await page.waitForTimeout(300);
  const left = await read(page);
  evidence.live = {chosen: Object.fromEntries(Object.entries(chosen).map(([id, one]) => [id, one.cues])), left: Object.fromEntries(Object.entries(left).map(([id, one]) => [id, one.cues]))};
  for (const [id, one] of Object.entries(chosen)) if (!one.cues || !distinct(one.series)) note({case: `a scheme chosen later: ${id} takes the cues`, got: one});
  for (const [id, one] of Object.entries(left)) if (one.cues) note({case: `a scheme left: ${id} leaves the cues`, got: one});
  for (const share of chosen['sf-chart-pie'].shares) if (share.ratio < 4.5) note({case: `a scheme chosen later: the share «${share.text}» holds 4.5:1`, got: share.ratio});
  await page.close();
} finally {
  await browser.close();
}

if (errors.length) note({case: 'no page errors', got: errors});
console.log(JSON.stringify({passed: failures.length === 0, evidence, failures}, null, 1));
if (failures.length) process.exit(1);
