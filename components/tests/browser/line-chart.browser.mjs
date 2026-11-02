#!/usr/bin/env node
// Usage: node this-file /absolute/path/to/output
// sf-line-chart on the built bytes (docs/START.md M0):
// - geometry on the size ladder, light and dark, at 375, 768 and 1280 px: the
//   plot is its rung's height, fills its width, nothing leaves the figure, the
//   x labels never overlap and every line stays inside the plot;
// - colour: the series differ, each line holds 3:1 against the page in both
//   themes, and the theme changes the tones;
// - the first paint: the plot's box is the same before the data and after;
// - keyboard and screen reader: one Tab stop, the arrows move a cursor that is
//   said, Enter chooses, Escape leaves; the figure is named and described;
// - the table fallback: toggle, visible and hidden;
// - reduced motion and forced colours;
// - many points: 10,000 points draw as at most four per pixel column, within
//   the budget at a 4x CPU slowdown (standard gate 17).
import {resolve, join} from 'node:path';
import {existsSync} from 'node:fs';
import {chromium} from 'playwright';

if (!process.argv[2]) throw new Error('Build output root is required');
const out = resolve(process.argv[2]);
const styles = [
  'core/core/css/core.css', 'core/core/css/utility.full.css',
  'smart/smart/empty-state/css/empty-state.css',
  'smart/smart/line-chart/css/line-chart.css',
].map((p) => join(out, p));
const modules = [
  'core/core/js/core.js', 'core/core/js/smart-base.js',
  'smart/smart/empty-state/js/empty-state.js',
  'smart/smart/line-chart/js/line-chart.js',
].map((p) => join(out, p));
const absent = [...styles, ...modules].filter((path) => !existsSync(path));
if (absent.length) throw new Error(`${absent.length} build asset(s) not found under ${out}: ${absent.join(', ')}`);

const failures = [];
const note = (detail) => failures.push(detail);
const evidence = {};
const errors = [];

const months = ['2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06', '2026-07', '2026-08', '2026-09', '2026-10', '2026-11', '2026-12'];
const sales = [120, 132, 128, 150, 171, 165, 180, 176, 190, 204, 198, 221];
const plan = [125, 130, 135, 145, 160, 165, 175, 180, 185, 195, 205, 215];
const fact = [110, 118, 125, 140, 150, 160, 168, 170, 182, 190, 195, 200];
const items = months.map((month, index) => ({month, sales: sales[index], plan: plan[index], fact: fact[index]}));

const browser = await chromium.launch();
const open = async ({width = 900, theme = 'light', motion = 'no-preference', colors = 'none'} = {}) => {
  const page = await browser.newPage({viewport: {width, height: 900}});
  await page.emulateMedia({colorScheme: theme, reducedMotion: motion, forcedColors: colors});
  // Bundles added as inline module tags cannot work out their own public path;
  // the Loader gives them one on a real page. That one message is the harness's.
  page.on('pageerror', (error) => { if (!/Automatic publicPath/u.test(error.message)) errors.push(error.message); });
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  await page.setContent(`<!doctype html><html class="theme-${theme}" lang="ru" style="color-scheme: ${theme}"><head><meta charset="utf-8"></head>`
    + '<body style="margin:0;background:var(--sf-surface-0)"><button id="before">до</button><main id="box" style="padding:16px"></main></body></html>');
  for (const style of styles) await page.addStyleTag({path: style});
  for (const module of modules) await page.addScriptTag({path: module, type: 'module'});
  await page.waitForFunction(() => Boolean(customElements.get('sf-line-chart')));
  return page;
};
const make = (page, attributes, data = null, {names = null, wait = 300} = {}) => page.evaluate(async ({attributes, data, names, wait}) => {
  const box = document.getElementById('box');
  box.replaceChildren();
  window.events = [];
  const chart = document.createElement('sf-line-chart');
  chart.id = 'chart';
  for (const [name, value] of Object.entries(attributes)) chart.setAttribute(name, value);
  for (const name of ['sf-line-chart-select', 'sf-line-chart-toggle', 'sf-line-chart-refresh']) {
    chart.addEventListener(name, (event) => window.events.push({name, detail: event.detail}));
  }
  box.append(chart);
  if (names) chart.names = names;
  if (data) chart.items = data;
  await new Promise((done) => setTimeout(done, wait));
}, {attributes, data, names, wait});

// The sRGB colour a computed style names, as [r, g, b] 0..255.
const luminance = ([r, g, b]) => {
  const one = (value) => {
    const c = value / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * one(r) + 0.7152 * one(g) + 0.0722 * one(b);
};
const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
// Any CSS colour to rgb through a canvas, so oklch and color() read too.
const rgbOf = (page, colours) => page.evaluate((colours) => {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  const context = canvas.getContext('2d', {willReadFrequently: true});
  return colours.map((colour) => {
    context.clearRect(0, 0, 1, 1);
    context.fillStyle = colour;
    context.fillRect(0, 0, 1, 1);
    return [...context.getImageData(0, 0, 1, 1).data.slice(0, 3)];
  });
}, colours);

const RUNG = {'1/2': 160, 1: 240, 2: 384};

try {
  // 1. Geometry and colour on the size ladder, both themes, three widths.
  const tones = {};
  for (const theme of ['light', 'dark']) {
    for (const width of [375, 768, 1280]) {
      const page = await open({width, theme});
      for (const size of ['1/2', '1', '2']) {
        await make(page, {label: 'Продажи, план и факт', x: 'month', y: 'sales,plan,fact', size, 'y-format': 'integer', legend: 'top'}, items,
          {names: {sales: 'Продажи', plan: 'План', fact: 'Факт'}});
        const shape = await page.evaluate(() => {
          const chart = document.getElementById('chart');
          const figure = chart.querySelector('figure');
          const plot = chart.querySelector('.sf-line-chart-plot').getBoundingClientRect();
          const svg = chart.querySelector('svg.sf-line-chart-svg');
          const frame = svg.getBoundingClientRect();
          const labels = [...chart.querySelectorAll('.sf-line-chart-axes text.sf-line-chart-tick--x')]
            .map((node) => node.getBoundingClientRect()).map((box) => [box.left, box.right]);
          const clipped = [...chart.querySelectorAll('.sf-line-chart-axes text')]
            .map((node) => node.getBoundingClientRect()).filter((box) => box.left < frame.left - 1 || box.right > frame.right + 1).length;
          const lines = [...chart.querySelectorAll('.sf-line-chart-line')].map((node) => node.getBoundingClientRect());
          const page = document.documentElement;
          return {
            plotHeight: Math.round(plot.height),
            plotWidth: Math.round(plot.width),
            svgWidth: Math.round(frame.width),
            overflow: figure.scrollWidth - figure.clientWidth,
            pageOverflow: page.scrollWidth - page.clientWidth,
            overlaps: labels.slice(1).filter(([left], index) => left < labels[index][1] - 0.5).length,
            clipped,
            labels: labels.length,
            outside: lines.filter((box) => box.left < frame.left - 1 || box.right > frame.right + 1 || box.top < frame.top - 1 || box.bottom > frame.bottom + 1).length,
            lines: lines.length,
            strokes: [...chart.querySelectorAll('.sf-line-chart-line')].map((node) => getComputedStyle(node).stroke),
            background: getComputedStyle(document.body).backgroundColor,
          };
        });
        const where = `${theme} ${width}px size ${size}`;
        if (shape.plotHeight !== RUNG[size]) note({case: `${where}: the plot is its rung's height`, got: shape.plotHeight, expected: RUNG[size]});
        if (Math.abs(shape.svgWidth - shape.plotWidth) > 1) note({case: `${where}: the plot fills its width`, got: shape});
        if (shape.overflow > 0 || shape.pageOverflow > 0) note({case: `${where}: nothing leaves the figure or the page`, got: shape});
        if (shape.overlaps || shape.labels < 2) note({case: `${where}: x labels never overlap`, got: shape});
        if (shape.clipped) note({case: `${where}: no axis label leaves the plot`, got: shape});
        if (shape.lines !== 3 || shape.outside) note({case: `${where}: three lines, inside the plot`, got: shape});
        const [ground, ...strokes] = await rgbOf(page, [shape.background, ...shape.strokes]);
        if (new Set(strokes.map(String)).size !== 3) note({case: `${where}: the series differ`, got: strokes});
        const ratios = strokes.map((stroke) => Math.round(contrast(stroke, ground) * 100) / 100);
        if (ratios.some((ratio) => ratio < 3)) note({case: `${where}: every line holds 3:1 against the page`, got: ratios});
        if (width === 768 && size === '1') {
          tones[theme] = strokes.map(String);
          evidence[`contrast-${theme}`] = ratios;
        }
      }
      await page.close();
    }
  }
  if (tones.light && tones.dark && tones.light.join() === tones.dark.join()) note({case: 'the theme changes the series tones', got: tones});

  // 2. The first paint: the box is the same before the data and after.
  {
    const page = await open({width: 768});
    await make(page, {label: 'Продажи', x: 'month', y: 'sales'}, null);
    const before = await page.evaluate(() => {
      const box = document.querySelector('#chart figure').getBoundingClientRect();
      return [Math.round(box.height), document.querySelector('#chart .sf-line-chart-plot').getBoundingClientRect().height];
    });
    await page.evaluate((items) => { document.getElementById('chart').dataState = 'loading'; }, items);
    await page.waitForTimeout(100);
    const loading = await page.evaluate(() => document.querySelector('#chart .sf-line-chart-plot').getBoundingClientRect().height);
    await page.evaluate((items) => {
      const chart = document.getElementById('chart');
      chart.dataState = 'auto';
      chart.items = items.map(({month, sales}) => ({month, sales}));
    }, items);
    await page.waitForTimeout(250);
    const after = await page.evaluate(() => document.querySelector('#chart .sf-line-chart-plot').getBoundingClientRect().height);
    if (before[1] !== after || loading !== after) note({case: 'the plot keeps its box from the first paint to the data', got: {empty: before[1], loading, after}});
    evidence['first-paint'] = {empty: before[1], loading, ready: after};
    await page.close();
  }

  // 3. Keyboard and screen reader.
  {
    const page = await open({width: 768});
    await make(page, {label: 'Продажи и план, 2026', x: 'month', y: 'sales,plan', 'y-format': 'integer'}, items.map(({month, sales, plan}) => ({month, sales, plan})),
      {names: {sales: 'Продажи', plan: 'План'}});
    const named = await page.evaluate(() => {
      const chart = document.getElementById('chart');
      const figure = chart.querySelector('figure');
      const svg = chart.querySelector('svg[role=group]');
      return {
        name: document.getElementById(figure.getAttribute('aria-labelledby'))?.textContent.trim(),
        group: svg.getAttribute('aria-label'),
        role: svg.getAttribute('aria-roledescription'),
        summary: document.getElementById(svg.getAttribute('aria-describedby'))?.textContent.trim(),
        hidden: [...chart.querySelectorAll('svg > g')].every((node) => node.getAttribute('aria-hidden') === 'true'),
        stops: [...chart.querySelectorAll('[tabindex="0"], button')].length,
      };
    });
    if (named.name !== 'Продажи и план, 2026' || named.group !== named.name || named.role !== 'график' || !named.hidden) note({case: 'the figure and the plot are named', got: named});
    if (!/Продажи: от 120 до 221/u.test(named.summary ?? '') || !/План: от 125 до 215/u.test(named.summary ?? '')) note({case: 'the summary says what the data does', got: named.summary});
    evidence.summary = named.summary;
    // The Tab order follows the figure: the table button in the caption, the
    // legend entries, then the plot as one stop.
    await page.focus('#before');
    const stops = [];
    for (let index = 0; index < 4; index += 1) {
      await page.keyboard.press('Tab');
      stops.push(await page.evaluate(() => {
        const node = document.activeElement;
        return node?.matches('svg[role=group]') ? 'plot' : node?.classList.contains('sf-line-chart-view') ? 'table' : node?.classList.contains('sf-line-chart-legend-item') ? `legend:${node.dataset.series}` : node?.localName;
      }));
    }
    if (stops.join(',') !== 'table,legend:sales,legend:plan,plot') note({case: 'the Tab order is the table button, the legend, then the plot', got: stops});
    evidence['tab-order'] = stops;
    const said = async () => page.evaluate(() => document.querySelector('#chart [aria-live=polite]').textContent.trim());
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(80);
    const first = await said();
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(80);
    const second = await said();
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(80);
    const down = await said();
    await page.keyboard.press('End');
    await page.waitForTimeout(80);
    const end = await said();
    if (!/январ/iu.test(first) || !/Продажи: 120$/u.test(first) || !/Продажи: 132$/u.test(second) || !/План: 130$/u.test(down) || !/декабр/iu.test(end) || !/План: 215$/u.test(end)) {
      note({case: 'the arrows move the cursor, and each move is said', got: {first, second, down, end}});
    }
    evidence.said = [first, second, down, end];
    const tip = await page.evaluate(() => document.querySelector('#chart .sf-line-chart-tooltip')?.textContent.replace(/\s+/gu, ' ').trim());
    if (!/Продажи/u.test(tip ?? '') || !/215/u.test(tip ?? '')) note({case: 'the tooltip follows the keyboard cursor', got: tip});
    await page.keyboard.press('Enter');
    await page.waitForTimeout(80);
    const chosen = await page.evaluate(() => window.events.filter((event) => event.name === 'sf-line-chart-select'));
    if (JSON.stringify(chosen.map((event) => event.detail)) !== JSON.stringify([{series: 'plan', index: 11, x: '2026-12', value: 215}])) {
      note({case: 'Enter chooses the point under the cursor', got: chosen});
    }
    await page.keyboard.press('Escape');
    await page.waitForTimeout(80);
    if (await page.evaluate(() => Boolean(document.querySelector('#chart .sf-line-chart-tooltip')))) note({case: 'Escape takes the cursor away'});
    await page.keyboard.press('Tab');
    const left = await page.evaluate(() => Boolean(document.activeElement?.closest('sf-line-chart')));
    if (left) note({case: 'the plot is the chart\'s last Tab stop: the next leaves it'});

    // The pointer: the nearest point under it, a click chooses.
    const box = await page.evaluate(() => {
      const frame = document.querySelector('#chart svg').getBoundingClientRect();
      return {x: frame.left + frame.width * 0.5, y: frame.top + frame.height * 0.4};
    });
    await page.mouse.move(box.x, box.y);
    await page.waitForTimeout(80);
    if (!await page.evaluate(() => Boolean(document.querySelector('#chart .sf-line-chart-tooltip')))) note({case: 'the pointer shows the tooltip'});
    await page.close();
  }

  // 4. The table fallback.
  {
    const page = await open({width: 768});
    const data = items.map(({month, sales, plan}) => ({month, sales, plan}));
    await make(page, {label: 'Продажи и план', x: 'month', y: 'sales,plan'}, data, {names: {sales: 'Продажи', plan: 'План'}});
    await page.click('#chart .sf-line-chart-view');
    await page.waitForTimeout(150);
    const toggled = await page.evaluate(() => ({
      plotHidden: document.querySelector('#chart .sf-line-chart-plot').hidden,
      rows: document.querySelectorAll('#chart .sf-line-chart-table tbody tr').length,
      heads: [...document.querySelectorAll('#chart .sf-line-chart-table thead th')].map((node) => node.textContent.trim()),
      pressed: document.querySelector('#chart .sf-line-chart-view').getAttribute('aria-pressed'),
    }));
    if (!toggled.plotHidden || toggled.rows !== 12 || toggled.heads.join('|') !== 'month|Продажи|План' || toggled.pressed !== 'true') note({case: 'table=toggle swaps the plot for the table', got: toggled});
    await make(page, {label: 'Продажи и план', x: 'month', y: 'sales,plan', table: 'hidden'}, data);
    const hidden = await page.evaluate(() => {
      const wrap = document.querySelector('#chart table')?.parentElement;
      return {present: Boolean(wrap), sr: wrap?.classList.contains('sf-line-chart-sr'), width: wrap?.getBoundingClientRect().width, button: Boolean(document.querySelector('#chart .sf-line-chart-view'))};
    });
    if (!hidden.present || !hidden.sr || hidden.width > 1 || hidden.button) note({case: 'table=hidden keeps the table for screen readers only', got: hidden});
    await make(page, {label: 'Продажи и план', x: 'month', y: 'sales,plan', table: 'visible'}, data);
    const visible = await page.evaluate(() => ({plot: !document.querySelector('#chart .sf-line-chart-plot').hidden, rows: document.querySelectorAll('#chart .sf-line-chart-table tbody tr').length}));
    if (!visible.plot || visible.rows !== 12) note({case: 'table=visible shows both', got: visible});
    // A gap is said as a gap in the table, not as zero.
    await make(page, {label: 'Посещения', x: 'day', y: 'visits', table: 'visible'}, [{day: '2026-10-01', visits: 3}, {day: '2026-10-02', visits: null}, {day: '2026-10-03', visits: 5}]);
    const gap = await page.evaluate(() => [...document.querySelectorAll('#chart tbody td')].map((node) => node.textContent.trim()));
    if (gap.join('|') !== '3|нет данных|5') note({case: 'a gap reads as «нет данных»', got: gap});
    await page.close();
  }

  // 5. Reduced motion and forced colours.
  {
    const quiet = await open({width: 768, motion: 'reduce'});
    await make(quiet, {label: 'Продажи', x: 'month', y: 'sales'}, items);
    const still = await quiet.evaluate(() => getComputedStyle(document.querySelector('#chart .sf-line-chart-series')).transitionDuration);
    await quiet.close();
    const moving = await open({width: 768});
    await make(moving, {label: 'Продажи', x: 'month', y: 'sales'}, items);
    const moves = await moving.evaluate(() => getComputedStyle(document.querySelector('#chart .sf-line-chart-series')).transitionDuration);
    await moving.close();
    if (still !== '0s' || moves === '0s') note({case: 'motion only without prefers-reduced-motion', got: {still, moves}});
    evidence.motion = {reduce: still, 'no-preference': moves};
    const forced = await open({width: 768, colors: 'active'});
    await make(forced, {label: 'Продажи, план и факт', x: 'month', y: 'sales,plan,fact'}, items);
    const dashes = await forced.evaluate(() => [...document.querySelectorAll('#chart .sf-line-chart-line')].map((node) => getComputedStyle(node).strokeDasharray));
    if (new Set(dashes).size !== 3) note({case: 'in forced colours every series has its own dash', got: dashes});
    evidence['forced-colors'] = dashes;
    await forced.close();
  }

  // 6. Many points at a 4x CPU slowdown.
  {
    const page = await open({width: 1280});
    const session = await page.context().newCDPSession(page);
    await session.send('Emulation.setCPUThrottlingRate', {rate: 4});
    const result = await page.evaluate(async () => {
      const n = 10000;
      const data = Array.from({length: n}, (_, index) => ({t: index, v: Math.sin(index / 80) * 50 + ((index * 7919) % 13)}));
      const box = document.getElementById('box');
      box.replaceChildren();
      const chart = document.createElement('sf-line-chart');
      chart.setAttribute('label', '10 000 точек');
      chart.setAttribute('x', 't');
      chart.setAttribute('y', 'v');
      box.append(chart);
      await new Promise((done) => setTimeout(done, 300));
      const start = performance.now();
      chart.items = data;
      await new Promise((done) => {
        const check = () => (chart.querySelector('.sf-line-chart-line') ? done() : requestAnimationFrame(check));
        check();
      });
      const first = performance.now() - start;
      const d = chart.querySelector('.sf-line-chart-line').getAttribute('d');
      const width = chart.querySelector('.sf-line-chart-plot').getBoundingClientRect().width;
      const changeStart = performance.now();
      chart.setAttribute('curve', 'step');
      await new Promise((done) => setTimeout(done, 0));
      await new Promise((done) => requestAnimationFrame(() => done()));
      const change = performance.now() - changeStart;
      return {first: Math.round(first), change: Math.round(change), commands: (d.match(/[ML]/gu) || []).length, width: Math.round(width), nodes: chart.querySelectorAll('*').length};
    });
    await session.send('Emulation.setCPUThrottlingRate', {rate: 1});
    if (result.commands > result.width * 4 + 2) note({case: '10,000 points draw as at most four per pixel column', got: result});
    if (result.first > 1500) note({case: '10,000 points draw within 1.5 s at 4x CPU (gate 17)', got: result});
    evidence['10000-points-4x'] = result;
    await page.close();
  }
} finally {
  await browser.close();
}

if (errors.length) note({case: 'no page errors', got: errors});
console.log(JSON.stringify({passed: failures.length === 0, evidence, failures}, null, 1));
if (failures.length) process.exit(1);
