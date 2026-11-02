#!/usr/bin/env node
// Usage: node this-file /absolute/path/to/output
// The rest of Tier 1 on the built bytes (docs/START.md M1): sf-chart-sparkline,
// sf-chart-bar, sf-chart-pie, sf-chart-metric and sf-chart-parts.
// - geometry on the size ladder, light and dark, at 375, 768 and 1280 px: each
//   chart is its rung's height, fits its width, and nothing leaves it;
// - colour: marks hold 3:1 against the page in both themes, and the series
//   (the parts) differ;
// - the parts bar: its rung's thickness, its parts in reading order (right to
//   left on a right-to-left page), the free remainder last;
// - keyboard and screen reader: the bar and the pie charts and the parts bar
//   are one Tab stop
//   with a cursor that is said; an openable metric is one button; a sparkline
//   takes no focus and is named by its data;
// - reduced motion and forced colours;
// - many bars: 1,000 categories draw within the budget at a 4x CPU slowdown.
import {resolve, join} from 'node:path';
import {existsSync} from 'node:fs';
import {chromium} from 'playwright';

if (!process.argv[2]) throw new Error('Build output root is required');
const out = resolve(process.argv[2]);
const CHARTS = ['chart-sparkline', 'chart-bar', 'chart-pie', 'chart-metric', 'chart-parts'];
// sf-progress-bar carries its styles in its script.
const styles = [
  'core/core/css/core.css', 'core/core/css/utility.full.css',
  'smart/smart/empty-state/css/empty-state.css',
  ...CHARTS.map((name) => `smart/smart/${name}/css/${name}.css`),
].map((p) => join(out, p));
const modules = [
  'core/core/js/core.js', 'core/core/js/smart-base.js',
  'smart/smart/empty-state/js/empty-state.js', 'smart/smart/progress-bar/js/progress-bar.js',
  ...CHARTS.map((name) => `smart/smart/${name}/js/${name}.js`),
].map((p) => join(out, p));
const absent = [...styles, ...modules].filter((path) => !existsSync(path));
if (absent.length) throw new Error(`${absent.length} build asset(s) not found under ${out}: ${absent.join(', ')}`);

const failures = [];
const note = (detail) => failures.push(detail);
const evidence = {};
const errors = [];

const cities = [
  {city: 'Москва', q1: 420, q2: 465}, {city: 'Санкт-Петербург', q1: 310, q2: 298}, {city: 'Казань', q1: 180, q2: 214},
  {city: 'Новосибирск', q1: 150, q2: 171}, {city: 'Екатеринбург', q1: 164, q2: 159}, {city: 'Нижний Новгород', q1: 120, q2: null},
];
const channels = [{channel: 'web', orders: 540}, {channel: 'shop', orders: 310}, {channel: 'partners', orders: 120}, {channel: 'phone', orders: 30}];
const disk = [{kind: 'system', size: 22}, {kind: 'apps', size: 13}, {kind: 'docs', size: 7}, {kind: 'photos', size: 3}];
const diskNames = {system: 'Система', apps: 'Приложения', docs: 'Документы', photos: 'Фото'};
const week = [340, 362, 355, 401, 395, 410, 430, 452, 440, 461, 470, 488];

const browser = await chromium.launch();
const open = async ({width = 900, theme = 'light', motion = 'no-preference', colors = 'none'} = {}) => {
  const page = await browser.newPage({viewport: {width, height: 900}});
  await page.emulateMedia({colorScheme: theme, reducedMotion: motion, forcedColors: colors});
  page.on('pageerror', (error) => { if (!/Automatic publicPath/u.test(error.message)) errors.push(error.message); });
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  await page.setContent(`<!doctype html><html class="theme-${theme}" lang="ru" style="color-scheme: ${theme}"><head><meta charset="utf-8"></head>`
    + '<body style="margin:0;background:var(--sf-surface-0)"><button id="before">до</button><main id="box" style="padding:16px"></main></body></html>');
  for (const style of styles) await page.addStyleTag({path: style});
  for (const module of modules) await page.addScriptTag({path: module, type: 'module'});
  await page.waitForFunction((tags) => tags.every((tag) => customElements.get(tag)), CHARTS.map((name) => `sf-${name}`));
  return page;
};
// One element in the box: its attributes, then its properties.
const make = (page, tag, attributes, properties = {}, {inner = '', wait = 350} = {}) => page.evaluate(async ({tag, attributes, properties, inner, wait}) => {
  const box = document.getElementById('box');
  box.replaceChildren();
  window.events = [];
  const element = document.createElement(tag);
  element.id = 'chart';
  for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, value);
  for (const verb of ['select', 'toggle', 'refresh', 'open']) element.addEventListener(`${tag}-${verb}`, (event) => window.events.push({verb, detail: event.detail}));
  element.innerHTML = inner;
  box.append(element);
  for (const [name, value] of Object.entries(properties)) element[name] = value;
  await new Promise((done) => setTimeout(done, wait));
}, {tag, attributes, properties, inner, wait});

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

// The box of what is drawn, and whether anything leaves it.
const shapeOf = (page, selectors) => page.evaluate(({selectors}) => {
  const chart = document.getElementById('chart');
  const frame = chart.querySelector(selectors.frame).getBoundingClientRect();
  const marks = [...chart.querySelectorAll(selectors.marks)];
  const texts = [...chart.querySelectorAll(selectors.texts || 'svg text')].map((node) => node.getBoundingClientRect());
  return {
    height: Math.round(frame.height),
    width: Math.round(frame.width),
    pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    outside: marks.map((node) => node.getBoundingClientRect()).filter((box) => box.left < frame.left - 1 || box.right > frame.right + 1 || box.top < frame.top - 1 || box.bottom > frame.bottom + 1).length
      + texts.filter((box) => box.left < frame.left - 1 || box.right > frame.right + 1).length,
    marks: marks.length,
    fills: marks.slice(0, 8).map((node) => getComputedStyle(node).fill),
    strokes: marks.slice(0, 1).map((node) => getComputedStyle(node).stroke),
    background: getComputedStyle(document.body).backgroundColor,
  };
}, {selectors});

const RUNG = {'1/2': 160, 1: 240, 2: 384};
const SPARK = {'1/2': 20, 1: 32, 2: 64};
const THICK = {'1/2': 6, 1: 12, 2: 20};

// The parts bar: its track, its parts in the order drawn, their colours.
const partsOf = (page) => page.evaluate(() => {
  const chart = document.getElementById('chart');
  const track = chart.querySelector('.sf-chart-parts-track').getBoundingClientRect();
  const parts = [...chart.querySelectorAll('.sf-chart-parts-part')];
  const boxes = parts.map((node) => node.getBoundingClientRect());
  return {
    height: Math.round(track.height),
    width: Math.round(track.width),
    pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    listOverflow: [...chart.querySelectorAll('.sf-chart-parts-item')].filter((item) => item.scrollWidth > item.clientWidth + 1).length,
    outside: boxes.filter((box) => box.left < track.left - 1 || box.right > track.right + 1).length,
    marks: parts.length,
    free: parts.at(-1)?.classList.contains('sf-chart-parts-series--free') ?? false,
    firstAtLeft: boxes.length > 1 && boxes[0].left < boxes.at(-1).left,
    fills: parts.map((node) => getComputedStyle(node).backgroundColor),
    background: getComputedStyle(document.body).backgroundColor,
  };
});

try {
  // 1. Geometry and colour on the size ladder, both themes, three widths.
  for (const theme of ['light', 'dark']) {
    for (const width of [375, 768, 1280]) {
      const page = await open({width, theme});
      for (const size of ['1/2', '1', '2']) {
        const where = `${theme} ${width}px size ${size}`;

        await make(page, 'sf-chart-bar', {label: 'Продажи', x: 'city', y: 'q1,q2', size}, {items: cities});
        const bar = await shapeOf(page, {frame: '.sf-chart-bar-plot', marks: '.sf-chart-bar-bar'});
        if (bar.height !== RUNG[size]) note({case: `bar: the plot is its rung's height (${where})`, got: bar.height, want: RUNG[size]});
        if (bar.outside || bar.pageOverflow > 0) note({case: `bar: nothing leaves the plot or the page (${where})`, got: bar});
        if (bar.marks !== 11) note({case: `bar: one bar per value, none for a gap (${where})`, got: bar.marks});
        const [page0, ...barFills] = await rgbOf(page, [bar.background, ...new Set(bar.fills)]);
        const barContrast = barFills.map((fill) => Math.round(contrast(fill, page0) * 100) / 100);
        if (barFills.length < 2) note({case: `bar: the two series differ (${where})`, got: bar.fills});
        if (barContrast.some((ratio) => ratio < 3)) note({case: `bar: a bar holds 3:1 against the page (${where})`, got: barContrast});

        await make(page, 'sf-chart-pie', {label: 'Заказы', category: 'channel', value: 'orders', size}, {items: channels});
        const pie = await shapeOf(page, {frame: '.sf-chart-pie-plot', marks: '.sf-chart-pie-slice', texts: '.sf-chart-pie-share'});
        if (pie.height !== RUNG[size]) note({case: `pie: the plot is its rung's height (${where})`, got: pie.height, want: RUNG[size]});
        if (pie.outside || pie.pageOverflow > 0) note({case: `pie: no slice or share leaves the plot or the page (${where})`, got: pie});
        if (pie.marks !== 4) note({case: `pie: one slice per positive part (${where})`, got: pie.marks});
        const [page1, ...pieFills] = await rgbOf(page, [pie.background, ...new Set(pie.fills.slice(0, 3))]);
        const pieContrast = pieFills.map((fill) => Math.round(contrast(fill, page1) * 100) / 100);
        if (pieFills.length < 3) note({case: `pie: the first three parts differ (${where})`, got: pie.fills});
        if (pieContrast.some((ratio) => ratio < 3)) note({case: `pie: a slice holds 3:1 against the page (${where})`, got: pieContrast});

        await make(page, 'sf-chart-sparkline', {label: 'Посещения', size}, {items: week});
        const spark = await shapeOf(page, {frame: '.sf-chart-sparkline', marks: '.sf-chart-sparkline-line, .sf-chart-sparkline-mark', texts: 'none'});
        if (spark.height !== SPARK[size]) note({case: `sparkline: its rung's height (${where})`, got: spark.height, want: SPARK[size]});
        if (spark.outside || spark.marks !== 2) note({case: `sparkline: the line and the mark stay inside (${where})`, got: spark});
        const [page2, line] = await rgbOf(page, [spark.background, spark.strokes[0]]);
        const sparkContrast = Math.round(contrast(line, page2) * 100) / 100;
        if (sparkContrast < 3) note({case: `sparkline: the line holds 3:1 against the page (${where})`, got: sparkContrast});

        await make(page, 'sf-chart-metric', {label: 'Выручка за неделю', value: '1250000', previous: '1100000', format: 'currency-RUB', 'period-text': 'к прошлой неделе', max: '2000000', size});
        const metric = await page.evaluate(() => {
          const tile = document.querySelector('#chart .sf-chart-metric');
          const value = tile.querySelector('.sf-chart-metric-value');
          const box = tile.getBoundingClientRect();
          return {
            overflow: tile.scrollWidth - tile.clientWidth,
            pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
            valueLines: Math.round(value.getBoundingClientRect().height / parseFloat(getComputedStyle(value).lineHeight)),
            clipped: value.scrollWidth > value.clientWidth,
            width: Math.round(box.width),
          };
        });
        if (metric.overflow > 0 || metric.pageOverflow > 0 || metric.valueLines !== 1) note({case: `metric: one value line, nothing leaves the tile (${where})`, got: metric});
        await make(page, 'sf-chart-parts', {label: 'Диск', category: 'kind', value: 'size', max: '100', 'value-format': 'integer', size}, {items: disk, names: diskNames});
        const parts = await partsOf(page);
        if (parts.height !== THICK[size]) note({case: `parts bar: the bar is its rung's thickness (${where})`, got: parts.height, want: THICK[size]});
        if (parts.outside || parts.pageOverflow > 0 || parts.listOverflow) note({case: `parts bar: nothing leaves the bar, the list or the page (${where})`, got: parts});
        if (parts.marks !== 5 || !parts.free || !parts.firstAtLeft) note({case: `parts bar: one box per part in reading order, the free remainder last (${where})`, got: parts});
        const [page3, ...partFills] = await rgbOf(page, [parts.background, ...new Set(parts.fills.slice(0, 3))]);
        const partsContrast = partFills.map((fill) => Math.round(contrast(fill, page3) * 100) / 100);
        if (partFills.length < 3) note({case: `parts bar: the first three parts differ (${where})`, got: parts.fills});
        if (partsContrast.some((ratio) => ratio < 3)) note({case: `parts bar: a part holds 3:1 against the page (${where})`, got: partsContrast});
        const [free] = await rgbOf(page, [parts.fills.at(-1)]);
        const freeContrast = Math.round(contrast(free, page3) * 100) / 100;

        if (!evidence.contrast) evidence.contrast = {};
        evidence.contrast[`${theme}`] = {bar: barContrast, pie: pieContrast, sparkline: sparkContrast, parts: partsContrast, free: freeContrast};
      }
      await page.close();
    }
  }

  // 2. Keyboard and screen reader.
  {
    const page = await open();
    await make(page, 'sf-chart-bar', {label: 'Продажи', x: 'city', y: 'q1,q2', table: 'hidden'}, {items: cities, names: {q1: 'I квартал', q2: 'II квартал'}});
    await page.focus('#before');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    const barFocus = await page.evaluate(() => document.activeElement?.matches('svg.sf-chart-bar-svg[role=group][tabindex="0"]'));
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(80);
    const barSaid = await page.evaluate(() => document.querySelector('#chart [aria-live]').textContent.trim());
    await page.keyboard.press('Enter');
    const barChosen = await page.evaluate(() => window.events.find(({verb}) => verb === 'select')?.detail);
    if (!barFocus || barSaid !== 'Москва, II квартал: 465' || barChosen?.x !== 'Москва') note({case: 'bar: Tab reaches the plot after the legend; the cursor is said; Enter chooses', got: {barFocus, barSaid, barChosen}});
    const barTable = await page.evaluate(() => document.querySelectorAll('#chart .sf-chart-bar-sr table tbody tr').length);
    if (barTable !== 6) note({case: 'bar: table hidden keeps every category for screen readers', got: barTable});

    await make(page, 'sf-chart-bar', {label: 'Рейтинг', x: 'city', y: 'q1', orientation: 'horizontal', legend: 'none', table: 'visible'}, {items: cities});
    await page.focus('#chart svg');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(80);
    const turned = await page.evaluate(() => document.querySelector('#chart [aria-live]').textContent.trim());
    if (!/^Санкт-Петербург, q1: 310$/u.test(turned)) note({case: 'bar: on a horizontal chart Down walks the bars', got: turned});

    await make(page, 'sf-chart-pie', {label: 'Заказы', category: 'channel', value: 'orders', 'value-format': 'integer'}, {items: channels, names: {web: 'Сайт', shop: 'Магазин', partners: 'Партнёры', phone: 'Телефон'}});
    await page.focus('#chart svg');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('End');
    await page.waitForTimeout(80);
    const pieSaid = await page.evaluate(() => document.querySelector('#chart [aria-live]').textContent.trim().replace(/ /gu, ' '));
    const pieName = await page.evaluate(() => document.getElementById(document.querySelector('#chart svg').getAttribute('aria-describedby')).textContent.replace(/ /gu, ' '));
    if (pieSaid !== 'Телефон: 3 % (30)' || !/^Частей: 4, всего 1 000\./u.test(pieName)) note({case: 'pie: the cursor is said with share and value; the summary says the whole', got: {pieSaid, pieName}});

    await make(page, 'sf-chart-sparkline', {label: 'Посещения', 'y-format': 'integer'}, {items: week});
    const spark = await page.evaluate(() => ({name: document.querySelector('#chart [role=img]').getAttribute('aria-label'), focusable: document.querySelectorAll('#chart [tabindex]').length}));
    if (spark.name !== 'Посещения: от 340 до 488, наибольшее 488, наименьшее 340' || spark.focusable) note({case: 'sparkline: an image named by its data, no Tab stop', got: spark});

    await make(page, 'sf-chart-metric', {label: 'Очередь', value: '14', previous: '20', better: 'down', openable: ''});
    await page.focus('#before');
    await page.keyboard.press('Tab');
    const metricFocus = await page.evaluate(() => document.activeElement?.matches('button.sf-chart-metric'));
    await page.keyboard.press('Enter');
    await page.keyboard.press('Space');
    const opened = await page.evaluate(() => window.events.filter(({verb}) => verb === 'open').length);
    const said = await page.evaluate(() => document.querySelector('#chart .sf-chart-metric-change').textContent.replace(/\s+/gu, ' ').trim());
    if (!metricFocus || opened !== 2 || said !== '▼ снижение −30 %') note({case: 'metric: an openable tile is one button; Enter and Space open; the change says its direction', got: {metricFocus, opened, said}});
    await make(page, 'sf-chart-parts', {label: 'Диск', category: 'kind', value: 'size', max: '100', 'value-format': 'integer', table: 'hidden'}, {items: disk, names: diskNames});
    await page.focus('#before');
    await page.keyboard.press('Tab');
    const partsFocus = await page.evaluate(() => document.activeElement?.matches('.sf-chart-parts-track[role=group][tabindex="0"]'));
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(80);
    const partsSaid = await page.evaluate(() => document.querySelector('#chart [aria-live]').textContent.trim().replace(/\u00a0/gu, ' '));
    await page.keyboard.press('End');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(80);
    const freeSaid = await page.evaluate(() => document.querySelector('#chart [aria-live]').textContent.trim().replace(/\u00a0/gu, ' '));
    const freeChosen = await page.evaluate(() => window.events.filter(({verb}) => verb === 'select').length);
    if (!partsFocus || !/^Приложения: 13 \(13 ?%\)$/u.test(partsSaid) || !/^Свободно: 55 \(55 ?%\)$/u.test(freeSaid) || freeChosen) note({case: 'parts bar: one Tab stop; the arrows walk the parts and the free remainder; the remainder is not chosen', got: {partsFocus, partsSaid, freeSaid, freeChosen}});

    // On a right-to-left page the first part is at the right, and Left goes
    // to the next part.
    await page.evaluate(() => { document.documentElement.dir = 'rtl'; });
    await make(page, 'sf-chart-parts', {label: 'Диск', category: 'kind', value: 'size', max: '100', 'value-format': 'integer'}, {items: disk, names: diskNames});
    const rtl = await partsOf(page);
    await page.focus('#chart .sf-chart-parts-track');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(80);
    const rtlSaid = await page.evaluate(() => document.querySelector('#chart [aria-live]').textContent.trim().replace(/\u00a0/gu, ' '));
    await page.evaluate(() => { document.documentElement.dir = 'ltr'; });
    if (rtl.firstAtLeft || !/^Приложения: 13/u.test(rtlSaid)) note({case: 'parts bar: right to left, the first part is at the right and Left walks forward', got: {firstAtLeft: rtl.firstAtLeft, rtlSaid}});
    evidence.keyboard = {barSaid, turned, pieSaid, sparkline: spark.name, metric: said, parts: partsSaid, free: freeSaid, rtl: rtlSaid};
    await page.close();
  }

  // 3. Reduced motion and forced colours.
  {
    const still = await open({motion: 'reduce'});
    await make(still, 'sf-chart-bar', {label: 'Продажи', x: 'city', y: 'q1,q2'}, {items: cities});
    const motion = await still.evaluate(() => getComputedStyle(document.querySelector('.sf-chart-bar-series')).transitionDuration);
    if (motion !== '0s') note({case: 'bar: no transition under reduced motion', got: motion});
    await still.close();

    const forced = await open({colors: 'active'});
    await make(forced, 'sf-chart-bar', {label: 'Продажи', x: 'city', y: 'q1,q2'}, {items: cities});
    const bars = await forced.evaluate(() => [...document.querySelectorAll('.sf-chart-bar-series')].map((group) => {
      const style = getComputedStyle(group.querySelector('.sf-chart-bar-bar'));
      return `${style.fill}|${style.strokeDasharray}`;
    }));
    if (new Set(bars).size !== 2) note({case: 'bar: in forced colours the series differ by fill and dash', got: bars});
    await make(forced, 'sf-chart-bar', {label: 'Продажи', x: 'city', y: 'q1,q2', lines: 'q2'}, {items: cities});
    const line = await forced.evaluate(() => {
      const style = getComputedStyle(document.querySelector('.sf-chart-bar-line'));
      return {stroke: style.stroke, dash: style.strokeDasharray, dots: document.querySelectorAll('.sf-chart-bar-dot').length, bars: document.querySelectorAll('.sf-chart-bar-bar').length};
    });
    if (line.stroke === 'none' || line.dash === 'none' || line.dots !== 5 || line.bars !== 6) note({case: 'bar: in forced colours a line keeps its stroke and dash, a point per value, the bars stay bars', got: line});
    await make(forced, 'sf-chart-pie', {label: 'Заказы', category: 'channel', value: 'orders'}, {items: channels});
    const slices = await forced.evaluate(() => ({
      stroke: getComputedStyle(document.querySelector('.sf-chart-pie-slice')).stroke,
      shares: document.querySelectorAll('.sf-chart-pie-share').length,
    }));
    if (slices.stroke === 'none' || slices.shares < 3) note({case: 'pie: in forced colours the slices are outlines with their shares', got: slices});
    await make(forced, 'sf-chart-parts', {label: 'Диск', category: 'kind', value: 'size', max: '100'}, {items: disk});
    const boxes = await forced.evaluate(() => [...document.querySelectorAll('.sf-chart-parts-part')].map((node) => getComputedStyle(node).backgroundColor));
    if (new Set(boxes.slice(0, -1)).size !== 1 || boxes.at(-1) === boxes[0]) note({case: 'parts bar: in forced colours the parts are solid and the free remainder is not', got: boxes});
    evidence.forcedColours = {bars, line, slices, parts: boxes};
    await forced.close();
  }

  // 3b. A page's own colours (colors, docs/DECISIONS.md D6): by key, not by
  // place; a role follows the theme; a value that is not a colour is dropped;
  // a colour under 3:1 is reported; forced colours win.
  {
    const page = await open();
    const warnings = [];
    page.on('console', (message) => { if (message.type() === 'warning') warnings.push(message.text()); });
    const fillsOf = (selector) => page.evaluate((selector) => Object.fromEntries([...document.querySelectorAll(selector)]
      .map((node) => [node.dataset.series || node.dataset.part, getComputedStyle(node.querySelector('rect, path')).fill])), selector);
    const roleOf = (role) => page.evaluate((role) => {
      const probe = document.createElement('span');
      probe.style.color = `var(--sf-on-${role}-container-graphic)`;
      document.getElementById('box').append(probe);
      const colour = getComputedStyle(probe).color;
      probe.remove();
      return colour;
    }, role);
    const error = await roleOf('error');
    const colours = {q1: 'error', q2: '#0a7f6f'};
    await make(page, 'sf-chart-bar', {label: 'Продажи', x: 'city', y: 'q1,q2'}, {items: cities, colors: colours});
    const given = await fillsOf('.sf-chart-bar-series');
    await make(page, 'sf-chart-bar', {label: 'Продажи', x: 'city', y: 'q2,q1'}, {items: cities, colors: colours});
    const swapped = await fillsOf('.sf-chart-bar-series');
    if (given.q1 !== error || given.q2 !== 'rgb(10, 127, 111)') note({case: 'colors: a role is its graphic tone and a CSS colour is itself', got: given, want: {q1: error}});
    if (swapped.q1 !== given.q1 || swapped.q2 !== given.q2) note({case: 'colors: a series keeps its colour when the data is reordered', got: swapped, want: given});
    const legend = await page.evaluate(() => getComputedStyle(document.querySelector('.sf-chart-bar-legend-item[data-series="q2"] .sf-chart-bar-swatch')).backgroundColor);
    if (legend !== 'rgb(10, 127, 111)') note({case: 'colors: the legend swatch is the series colour', got: legend});

    await make(page, 'sf-chart-bar', {label: 'Продажи', x: 'city', y: 'q1,q2'}, {items: cities, colors: {q1: 'red; background: url(x)', q2: 'banana'}});
    const dropped = await page.evaluate(() => [...document.querySelectorAll('.sf-chart-bar-series')].map((node) => [node.className.baseVal, node.getAttribute('style')]));
    if (dropped.some(([name, style]) => /custom/u.test(name) || style)) note({case: 'colors: a value that is not a colour is dropped', got: dropped});
    if (warnings.filter((said) => /neither a role/u.test(said)).length < 2) note({case: 'colors: a dropped value is reported in the console', got: warnings});

    await make(page, 'sf-chart-bar', {label: 'Продажи', x: 'city', y: 'q1,q2'}, {items: cities, colors: {q1: '#f4f4f4'}});
    if (!warnings.some((said) => /sf-chart-bar.*q1.*3:1/u.test(said))) note({case: 'colors: a colour under 3:1 is reported in the console', got: warnings});
    const pale = await page.evaluate(() => getComputedStyle(document.querySelector('.sf-chart-bar-series[data-series="q1"] .sf-chart-bar-bar')).fill);
    if (pale !== 'rgb(244, 244, 244)') note({case: 'colors: a pale colour is drawn all the same', got: pale});

    await make(page, 'sf-chart-pie', {label: 'Заказы', category: 'channel', value: 'orders'}, {items: channels, colors: {phone: 'error'}});
    const pie = await fillsOf('.sf-chart-pie-series');
    if (pie.phone !== error || pie.web === error) note({case: 'colors: a pie part takes its colour by its category, the rest keep the palette', got: pie});
    await make(page, 'sf-chart-parts', {label: 'Диск', category: 'kind', value: 'size', max: '100'}, {items: disk, colors: {docs: '#0a7f6f'}});
    const parts = await page.evaluate(() => [...document.querySelectorAll('.sf-chart-parts-part')].map((node) => getComputedStyle(node).backgroundColor));
    if (parts[2] !== 'rgb(10, 127, 111)' || parts[0] === parts[2]) note({case: 'colors: a parts bar part takes its colour by its category', got: parts});
    const success = await roleOf('success');
    await make(page, 'sf-chart-sparkline', {label: 'Посещения', color: 'success'}, {items: week});
    const spark = await page.evaluate(() => getComputedStyle(document.querySelector('.sf-chart-sparkline-line')).stroke);
    if (spark !== success) note({case: 'sparkline: color is a role\'s graphic tone', got: spark, want: success});
    await make(page, 'sf-chart-bar', {label: 'Продажи', x: 'city', y: 'q1,q2', palette: 'warm'}, {items: cities, colors: {q2: '#0a7f6f'}});
    const warm = await fillsOf('.sf-chart-bar-series');
    if (warm.q1 !== 'rgb(213, 66, 52)' || warm.q2 !== 'rgb(10, 127, 111)') note({case: 'palette: a series takes the set\'s colour by place, colors wins for the ones it names', got: warm});
    evidence.pageColours = {bar: given, swapped, pie, parts, sparkline: spark, warm, warnings: warnings.length};
    await page.close();

    const dark = await open({theme: 'dark'});
    await make(dark, 'sf-chart-bar', {label: 'Продажи', x: 'city', y: 'q1,q2', palette: 'warm'}, {items: cities});
    const night = await dark.evaluate(() => getComputedStyle(document.querySelector('.sf-chart-bar-series[data-series="q1"] .sf-chart-bar-bar')).fill);
    if (night !== 'rgb(245, 95, 75)') note({case: 'palette: in the dark theme a colour takes its dark tone', got: night});
    evidence.pageColours.warmDark = night;
    await dark.close();

    const forced = await open({colors: 'active'});
    await make(forced, 'sf-chart-bar', {label: 'Продажи', x: 'city', y: 'q1,q2'}, {items: cities, colors: {q1: '#0a7f6f'}});
    const ink = await forced.evaluate(() => getComputedStyle(document.querySelector('.sf-chart-bar-series[data-series="q1"] .sf-chart-bar-bar')).fill);
    if (ink === 'rgb(10, 127, 111)') note({case: 'colors: in forced colours the system colour wins over a page colour', got: ink});
    evidence.pageColours.forced = ink;
    await forced.close();
  }

  // 4. Many bars at a 4x CPU slowdown (standard gate 17).
  {
    const page = await open({width: 1280});
    const session = await page.context().newCDPSession(page);
    await session.send('Emulation.setCPUThrottlingRate', {rate: 4});
    const result = await page.evaluate(async () => {
      const data = Array.from({length: 1000}, (_, index) => ({day: `d${index}`, a: 50 + 40 * Math.sin(index / 20), b: 30 + 20 * Math.cos(index / 15)}));
      const box = document.getElementById('box');
      box.replaceChildren();
      const chart = document.createElement('sf-chart-bar');
      chart.setAttribute('label', 'Много столбцов');
      chart.setAttribute('x', 'day');
      chart.setAttribute('y', 'a,b');
      chart.setAttribute('stack', 'stacked');
      box.append(chart);
      await new Promise((done) => setTimeout(done, 300));
      const start = performance.now();
      chart.items = data;
      await new Promise((done) => {
        const check = () => (chart.querySelector('.sf-chart-bar-bar') ? done() : requestAnimationFrame(check));
        check();
      });
      return {first: Math.round(performance.now() - start), bars: chart.querySelectorAll('.sf-chart-bar-bar').length, ticks: chart.querySelectorAll('.sf-chart-bar-tick').length};
    });
    await session.send('Emulation.setCPUThrottlingRate', {rate: 1});
    if (result.first > 1500 || result.bars !== 2000) note({case: '1,000 stacked categories draw within 1.5 s at 4x CPU (gate 17)', got: result});
    evidence['1000-bars-4x'] = result;
    await page.close();
  }
} finally {
  await browser.close();
}

if (errors.length) note({case: 'no page errors', got: errors});
console.log(JSON.stringify({passed: failures.length === 0, evidence, failures}, null, 1));
if (failures.length) process.exit(1);
