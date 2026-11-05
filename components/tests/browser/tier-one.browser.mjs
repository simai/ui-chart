#!/usr/bin/env node
// Usage: node this-file /absolute/path/to/output
// The rest of Tier 1 on the built bytes (docs/START.md M1): sf-chart-sparkline,
// sf-chart-bar, sf-chart-pie, sf-chart-metric, sf-chart-parts, sf-chart-heatmap,
// sf-chart-funnel, sf-chart-gauge, sf-chart-scatter, sf-chart-box,
// sf-chart-radar, sf-chart-candlestick, sf-chart-waterfall, sf-chart-treemap and
// sf-chart-timeline.
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
// - the heatmap: its rows' height, its values' contrast on their steps, the
//   diverging middle, the keyboard and forced colours;
// - the funnel: its stages' height wide and narrow, bars that shorten stage
//   by stage and hold 3:1, the keyboard and forced colours;
// - the gauge: the arc's height from its width, the bar's thickness, the value
//   in its band's colour at 3:1, the meter, and forced colours;
// - the scatter: its rung's height, marks inside it at 3:1 in a shape per
//   series, the bubbles' largest radius, the keyboard and the pointer, a
//   canvas past 2,000 marks within the budget, and forced colours;
// - the histogram: its rung's height, touching bars, edge labels inside;
// - many bars: 1,000 categories draw within the budget at a 4x CPU slowdown.
import {resolve, join} from 'node:path';
import {existsSync} from 'node:fs';
import {chromium} from 'playwright';

if (!process.argv[2]) throw new Error('Build output root is required');
const out = resolve(process.argv[2]);
const CHARTS = ['chart-sparkline', 'chart-bar', 'chart-pie', 'chart-metric', 'chart-parts', 'chart-heatmap', 'chart-funnel', 'chart-gauge', 'chart-scatter', 'chart-box', 'chart-radar', 'chart-candlestick', 'chart-waterfall', 'chart-treemap', 'chart-timeline'];
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
const hours = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
const load = [['mon', [32, 44, 60, 74, 80, 74, 60, 44, 32, 25]], ['tue', [34, 46, 62, 76, 82, 76, 62, 46, 34, 27]], ['wed', [30, 41, 58, 70, 78, 71, 57, 40, 31, 24]]]
  .flatMap(([day, values]) => values.map((value, index) => ({hour: hours[index], day, load: value})));
const days = {mon: 'Пн', tue: 'Вт', wed: 'Ср'};
const order = [{step: 'visit', people: 12400}, {step: 'catalog', people: 7800}, {step: 'cart', people: 2900}, {step: 'checkout', people: 1300}, {step: 'paid', people: 860}];
const steps = {visit: 'Визиты', catalog: 'Каталог', cart: 'Корзина', checkout: 'Оформление', paid: 'Оплата'};
const goods = [
  {product: 'Наушники', kind: 'electronics', price: 1200, sold: 340}, {product: 'Колонка', kind: 'electronics', price: 2500, sold: 260},
  {product: 'Часы', kind: 'electronics', price: 3900, sold: 210}, {product: 'Планшет', kind: 'electronics', price: 5400, sold: 150},
  {product: 'Телефон', kind: 'electronics', price: 7800, sold: 120}, {product: 'Ноутбук', kind: 'electronics', price: 9900, sold: 80},
  {product: 'Чехол', kind: 'accessories', price: 300, sold: 520}, {product: 'Кабель', kind: 'accessories', price: 650, sold: 470},
  {product: 'Зарядка', kind: 'accessories', price: 900, sold: 390}, {product: 'Сумка', kind: 'accessories', price: 1500, sold: 350},
  {product: 'Подставка', kind: 'accessories', price: 2200, sold: 240}, {product: 'Клавиатура', kind: 'accessories', price: 2900, sold: 230},
];
const kinds = {electronics: 'Электроника', accessories: 'Аксессуары'};
const regions = [
  {region: 'Север', managers: 4, revenue: 18, clients: 120}, {region: 'Юг', managers: 7, revenue: 31, clients: 260},
  {region: 'Запад', managers: 5, revenue: 26, clients: 180}, {region: 'Восток', managers: 3, revenue: 12, clients: 90},
  {region: 'Центр', managers: 9, revenue: 44, clients: 410}, {region: 'Урал', managers: 6, revenue: 24, clients: 150},
  {region: 'Сибирь', managers: 2, revenue: 9, clients: 60}, {region: 'Волга', managers: 8, revenue: 35, clients: 300},
];
const change = [{m: 'jan', r: 'north', v: -6}, {m: 'feb', r: 'north', v: -1}, {m: 'mar', r: 'north', v: 0}, {m: 'apr', r: 'north', v: 2}, {m: 'may', r: 'north', v: 6}];

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

  // 3c. The heatmap (docs/DECISIONS.md D8): its height is its rows' on every
  // rung and width; a value written in a cell keeps 4.5:1 on its step in both
  // themes; the strongest step is the most contrasting with the page; a
  // diverging scale meets at a neutral middle and better="down" swaps its
  // families; the grid is one Tab stop walked by the arrows; in forced
  // colours a cell is an outline.
  {
    const CELL = {'1/2': 20, 1: 28, 2: 36};
    const FONT = {'1/2': 11, 1: 12, 2: 14};
    const heat = {label: 'Нагрузка', x: 'hour', y: 'day', value: 'load', 'value-format': 'integer'};
    const cellsOf = (page) => page.evaluate(() => [...document.querySelectorAll('.sf-chart-heatmap-cell')].map((node) => ({
      step: node.dataset.step === undefined ? -1 : Number(node.dataset.step),
      fill: getComputedStyle(node.querySelector('rect')).fill,
      ink: node.querySelector('text') ? getComputedStyle(node.querySelector('text')).fill : null,
    })));
    const rgb = (value) => value.match(/\d+/gu).slice(0, 3).map(Number);
    evidence.heatmap = {geometry: [], contrast: {}};
    for (const theme of ['light', 'dark']) {
      for (const width of [375, 1280]) {
        const page = await open({width, theme});
        for (const size of ['1/2', '1', '2']) {
          await make(page, 'sf-chart-heatmap', {...heat, size}, {items: load, names: days});
          const shape = await shapeOf(page, {frame: '.sf-chart-heatmap-plot', marks: '.sf-chart-heatmap-box', texts: '.sf-chart-heatmap-value'});
          const want = 3 * CELL[size] + FONT[size] + 10;
          evidence.heatmap.geometry.push({theme, width, size, height: shape.height, want, marks: shape.marks});
          if (Math.abs(shape.height - want) > 1 || shape.marks !== 30 || shape.outside || shape.pageOverflow > 0) note({case: `heatmap ${theme} ${width}px size ${size}: its rows' height, a cell per pair, nothing leaves it`, got: shape, want});
        }
        if (width === 1280) {
          await make(page, 'sf-chart-heatmap', heat, {items: load, names: days});
          const cells = await cellsOf(page);
          const written = cells.filter((one) => one.ink);
          const worst = Math.min(...written.map((one) => contrast(rgb(one.fill), rgb(one.ink))));
          const background = rgb(await page.evaluate(() => getComputedStyle(document.body).backgroundColor));
          const byStep = new Map(cells.map((one) => [one.step, one.fill]));
          const weak = contrast(rgb(byStep.get(0)), background);
          const strong = contrast(rgb(byStep.get(Math.max(...byStep.keys()))), background);
          evidence.heatmap.contrast[theme] = {written: written.length, worstInk: Math.round(worst * 100) / 100, weak: Math.round(weak * 100) / 100, strong: Math.round(strong * 100) / 100, steps: byStep.size};
          if (written.length !== 30 || worst < 4.5) note({case: `heatmap ${theme}: every value is written and keeps 4.5:1 on its step`, got: evidence.heatmap.contrast[theme]});
          if (byStep.size !== 5 || strong <= weak) note({case: `heatmap ${theme}: five steps, the strongest the most contrasting with the page`, got: evidence.heatmap.contrast[theme]});

          const divergingOf = async (better) => {
            await make(page, 'sf-chart-heatmap', {label: 'Изменение', x: 'm', y: 'r', value: 'v', scale: 'diverging', better}, {items: change});
            return (await cellsOf(page)).map((one) => one.fill);
          };
          const up = await divergingOf('up');
          const down = await divergingOf('down');
          const middle = rgb(up[2]);
          const grey = Math.max(...middle) - Math.min(...middle) <= 12;
          if (!grey || up[0] === up[4] || up[0] !== down[4] || up[4] !== down[0]) note({case: `heatmap ${theme}: a diverging scale meets at a neutral middle; better="down" swaps the sides`, got: {up, down}});
          evidence.heatmap[`diverging-${theme}`] = {up, down};
        }
        await page.close();
      }
    }

    const page = await open({width: 900});
    await make(page, 'sf-chart-heatmap', heat, {items: load, names: days});
    // Tab reaches the table button, then the grid.
    await page.focus('#before');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => document.activeElement.matches('.sf-chart-heatmap-svg'));
    const said = async (key) => {
      await page.keyboard.press(key);
      await page.waitForTimeout(80);
      return page.evaluate(() => document.querySelector('#chart [aria-live]').textContent.trim());
    };
    const first = await said('ArrowRight');
    const second = await said('ArrowRight');
    const below = await said('ArrowDown');
    const end = await said('End');
    const last = await said('Control+End');
    await page.keyboard.press('Enter');
    const chosen = await page.evaluate(() => window.events.filter((one) => one.verb === 'select').map((one) => one.detail));
    await page.keyboard.press('Escape');
    const cleared = await page.evaluate(() => document.querySelectorAll('.sf-chart-heatmap-focus').length);
    await page.keyboard.press('Tab');
    const out = await page.evaluate(() => !document.activeElement.closest('.sf-chart-heatmap-svg'));
    const keys = {focused, first, second, below, end, last, chosen, cleared, out};
    evidence.heatmap.keyboard = keys;
    if (!focused || first !== 'Пн, 9:00: 32' || second !== 'Пн, 10:00: 44' || below !== 'Вт, 10:00: 46' || end !== 'Вт, 18:00: 27' || last !== 'Ср, 18:00: 24'
      || chosen.length !== 1 || chosen[0].x !== '18:00' || chosen[0].y !== 'wed' || chosen[0].value !== 24 || cleared || !out) note({case: 'heatmap: one Tab stop after the table button; the arrows, End and Ctrl+End walk the cells and each is said; Enter selects, Escape clears', got: keys});
    await page.close();

    const forced = await open({colors: 'active'});
    await make(forced, 'sf-chart-heatmap', heat, {items: load, names: days});
    const outline = await forced.evaluate(() => {
      const box = getComputedStyle(document.querySelector('.sf-chart-heatmap-box'));
      return {fills: new Set([...document.querySelectorAll('.sf-chart-heatmap-box')].map((node) => getComputedStyle(node).fill)).size, stroke: box.stroke, values: document.querySelectorAll('.sf-chart-heatmap-value').length};
    });
    evidence.heatmap.forced = outline;
    if (outline.fills !== 1 || outline.stroke === 'none' || outline.values !== 30) note({case: 'heatmap: in forced colours a cell is an outline and its value is the cue', got: outline});
    await forced.close();
  }

  // 3d. The funnel: a stage is a row of its rung's height (wide) or a name
  // line over the row (narrow), so the funnel's height is its stages'; the
  // bars shorten stage by stage and hold 3:1 against the page in both
  // themes; the stages are one Tab stop walked by the arrows; in forced
  // colours the bars are solid.
  {
    const ROW = {'1/2': 20, 1: 28, 2: 36};
    const GAP = {'1/2': 2, 1: 4, 2: 6};
    const funnel = {label: 'Воронка заказа', stage: 'step', value: 'people', 'value-format': 'integer'};
    const rgb = (value) => value.match(/\d+/gu).slice(0, 3).map(Number);
    evidence.funnel = {geometry: [], contrast: {}};
    for (const theme of ['light', 'dark']) {
      for (const width of [375, 1280]) {
        const page = await open({width, theme});
        for (const size of ['1/2', '1', '2']) {
          await make(page, 'sf-chart-funnel', {...funnel, size}, {items: order, names: steps});
          const shape = await shapeOf(page, {frame: '.sf-chart-funnel-plot', marks: '.sf-chart-funnel-bar', texts: '.sf-chart-funnel-value'});
          const line = await page.evaluate(() => parseFloat(getComputedStyle(document.querySelector('.sf-chart-funnel-name')).lineHeight));
          const bars = await page.evaluate(() => [...document.querySelectorAll('.sf-chart-funnel-bar')].map((node) => node.getBoundingClientRect().width));
          const narrow = width < 600;
          const want = narrow ? 5 * (line + ROW[size] + GAP[size]) + 4 * GAP[size] : 5 * ROW[size] + 4 * GAP[size];
          evidence.funnel.geometry.push({theme, width, size, height: shape.height, want, bars: bars.map(Math.round)});
          if (Math.abs(shape.height - want) > 1 || shape.marks !== 5 || shape.outside || shape.pageOverflow > 0 || !bars.every((one, index) => index === 0 || one < bars[index - 1])) note({case: `funnel ${theme} ${width}px size ${size}: its stages' height, five bars shortening stage by stage, nothing leaves it`, got: {shape, bars}, want});
        }
        if (width === 1280) {
          await make(page, 'sf-chart-funnel', funnel, {items: order, names: steps});
          const fill = rgb(await page.evaluate(() => getComputedStyle(document.querySelector('.sf-chart-funnel-bar')).backgroundColor));
          const background = rgb(await page.evaluate(() => getComputedStyle(document.body).backgroundColor));
          const ratio = Math.round(contrast(fill, background) * 100) / 100;
          evidence.funnel.contrast[theme] = ratio;
          if (ratio < 3) note({case: `funnel ${theme}: the bars hold 3:1 against the page`, got: ratio});
        }
        await page.close();
      }
    }

    const page = await open({width: 900});
    await make(page, 'sf-chart-funnel', funnel, {items: order, names: steps});
    // Tab reaches the table button, then the stages.
    await page.focus('#before');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => document.activeElement.matches('.sf-chart-funnel-stages'));
    const said = async (key) => {
      await page.keyboard.press(key);
      await page.waitForTimeout(80);
      return page.evaluate(() => document.querySelector('#chart [aria-live]').textContent.trim().replace(/ | /gu, ' '));
    };
    const first = await said('ArrowDown');
    const second = await said('ArrowRight');
    const back = await said('ArrowUp');
    const end = await said('End');
    await page.keyboard.press('Enter');
    const chosen = await page.evaluate(() => window.events.filter((one) => one.verb === 'select').map((one) => one.detail));
    const tip = await page.evaluate(() => document.querySelector('.sf-chart-funnel-tooltip')?.textContent.replace(/\s+/gu, ' ').trim() ?? '');
    await page.keyboard.press('Escape');
    const cleared = await page.evaluate(() => document.querySelectorAll('.sf-chart-funnel-stage--current').length);
    await page.keyboard.press('Tab');
    const out = await page.evaluate(() => !document.activeElement.closest('.sf-chart-funnel-stages'));
    const keys = {focused, first, second, back, end, chosen, tip, cleared, out};
    evidence.funnel.keyboard = keys;
    if (!focused || first !== 'Визиты: 12 400' || !/^Каталог: 7 800, 62,9 ?% от предыдущего, 62,9 ?% от первого$/u.test(second) || back !== 'Визиты: 12 400'
      || !/^Оплата: 860, 66,2 ?% от предыдущего, 6,9 ?% от первого$/u.test(end) || chosen.length !== 1 || chosen[0].x !== 'paid' || chosen[0].value !== 860
      || !tip.startsWith('Оплата') || cleared || !out) note({case: 'funnel: one Tab stop after the table button; the arrows and End walk the stages and each is said with both conversions; Enter selects, Escape clears', got: keys});
    await page.close();

    const forced = await open({colors: 'active'});
    await make(forced, 'sf-chart-funnel', funnel, {items: order, names: steps});
    const solid = await forced.evaluate(() => [...document.querySelectorAll('.sf-chart-funnel-bar')].map((node) => getComputedStyle(node).backgroundColor));
    evidence.funnel.forced = solid[0];
    if (new Set(solid).size !== 1 || solid[0] === 'rgba(0, 0, 0, 0)') note({case: 'funnel: in forced colours the bars are solid in the system colour', got: solid});
    await forced.close();
  }

  // 3e. The gauge: the arc's height follows its width by the view box's
  // ratio and the arc is at most its rung's width; the bar is its rung's
  // thickness; the value is drawn in its band's colour, which holds 3:1
  // against the page in both themes; it is a meter that takes no focus; in
  // forced colours the track is an outline and the value solid.
  {
    const WIDE = {'1/2': 160, 1: 256, 2: 448};
    const BAR = {'1/2': 6, 1: 12, 2: 20};
    const zones = [{to: 70, role: 'success'}, {to: 90, role: 'warning'}, {to: 100, role: 'error'}];
    const gauge = {label: 'Загрузка', value: '72', target: '80', 'value-format': 'unit-percent'};
    const rgb = (value) => value.match(/\d+/gu).slice(0, 3).map(Number);
    evidence.gauge = {geometry: [], contrast: {}};
    for (const theme of ['light', 'dark']) {
      for (const width of [375, 1280]) {
        const page = await open({width, theme});
        for (const size of ['1/2', '1', '2']) {
          await make(page, 'sf-chart-gauge', {...gauge, size}, {bands: zones});
          const arc = await page.evaluate(() => {
            const art = document.querySelector('.sf-chart-gauge-art').getBoundingClientRect();
            const plot = document.querySelector('.sf-chart-gauge-plot').getBoundingClientRect();
            const value = document.querySelector('.sf-chart-gauge-value').getBoundingClientRect();
            return {width: art.width, height: art.height, plot: plot.width, inside: value.left >= art.left && value.right <= art.right && value.bottom <= art.bottom + 1, pageOverflow: document.documentElement.scrollWidth - innerWidth};
          });
          const wide = Math.min(arc.plot, WIDE[size]);
          await make(page, 'sf-chart-gauge', {...gauge, size, shape: 'linear'}, {bands: zones});
          const bar = await page.evaluate(() => {
            const rail = document.querySelector('.sf-chart-gauge-rail').getBoundingClientRect();
            const level = document.querySelector('.sf-chart-gauge-level').getBoundingClientRect();
            return {height: rail.height, share: Math.round((level.width / rail.width) * 1000) / 1000};
          });
          evidence.gauge.geometry.push({theme, width, size, arc: {width: Math.round(arc.width), height: Math.round(arc.height * 10) / 10}, bar});
          if (Math.abs(arc.width - wide) > 1 || Math.abs(arc.height - (arc.width * 101) / 200) > 1 || !arc.inside || arc.pageOverflow > 0) note({case: `gauge ${theme} ${width}px size ${size}: the arc is its rung's width at most, its height its view box's, the value inside it`, got: arc, want: wide});
          if (Math.abs(bar.height - BAR[size]) > 0.5 || Math.abs(bar.share - 0.72) > 0.01) note({case: `gauge ${theme} ${width}px size ${size}: the bar is its rung's thickness, filled to the value's share`, got: bar});
        }
        if (width === 1280) {
          await make(page, 'sf-chart-gauge', gauge, {bands: zones});
          const colours = await page.evaluate(() => ({
            fill: getComputedStyle(document.querySelector('.sf-chart-gauge-fill')).fill,
            band: getComputedStyle(document.querySelector('path.sf-chart-gauge-band--warning')).fill,
            body: getComputedStyle(document.body).backgroundColor,
          }));
          const ratio = Math.round(contrast(rgb(colours.fill), rgb(colours.body)) * 100) / 100;
          evidence.gauge.contrast[theme] = {ratio, fill: colours.fill};
          if (ratio < 3 || colours.fill !== colours.band) note({case: `gauge ${theme}: the value is its band's colour and holds 3:1 against the page`, got: colours, ratio});
        }
        await page.close();
      }
    }

    const page = await open({width: 900});
    await make(page, 'sf-chart-gauge', gauge, {bands: zones});
    await page.focus('#before');
    await page.keyboard.press('Tab');
    const meter = await page.evaluate(() => {
      const node = document.querySelector('[role=meter]');
      return {focus: !document.activeElement.closest('sf-chart-gauge'), now: node.getAttribute('aria-valuenow'), text: node.getAttribute('aria-valuetext').replace(/ | /gu, ' '), name: node.getAttribute('aria-label'), target: document.querySelector('.sf-chart-gauge-target').textContent.replace(/\s+/gu, ' ').trim()};
    });
    evidence.gauge.meter = meter;
    if (!meter.focus || meter.now !== '72' || !/^72 ?%, Внимание$/u.test(meter.text) || meter.name !== 'Загрузка') note({case: 'gauge: a meter named by the label, with its value text, that takes no focus', got: meter});
    await page.close();

    const forced = await open({colors: 'active'});
    await make(forced, 'sf-chart-gauge', gauge, {bands: zones});
    const solid = await forced.evaluate(() => ({
      track: getComputedStyle(document.querySelector('.sf-chart-gauge-track')).stroke,
      fill: getComputedStyle(document.querySelector('.sf-chart-gauge-fill')).fill,
      zone: document.querySelector('.sf-chart-gauge-zone').textContent.trim(),
    }));
    evidence.gauge.forced = solid;
    if (solid.track === 'none' || solid.fill === 'none' || solid.zone !== 'Внимание') note({case: 'gauge: in forced colours the track is an outline, the value solid and the zone named', got: solid});
    await forced.close();
  }

  // 3f. The scatter: the plot is its rung's height and every mark stays in
  // it on every rung and width; each series' marks hold 3:1 against the page
  // in both themes and a series past the first has its own shape; the
  // largest bubble is its rung's; the points are one Tab stop walked by the
  // arrows, said with their names and measures, and the pointer shows the
  // same point in the tooltip; past 2,000 marks they are drawn on a canvas
  // within the budget at a 4x CPU slowdown, and the keyboard still walks
  // them; in forced colours the marks are solid and the bubbles' series
  // differ by their outline's dash.
  {
    const BUBBLE = {'1/2': 14, 1: 22, 2: 34};
    const scatter = {label: 'Цена и продажи', x: 'price', y: 'sold', series: 'kind', point: 'product', 'x-label': 'Цена', 'y-label': 'Продано', 'y-format': 'integer'};
    const bubbles = {label: 'Регионы', x: 'managers', y: 'revenue', bubble: 'clients', point: 'region', 'x-label': 'Менеджеров', 'y-label': 'Выручка', 'bubble-label': 'Клиентов'};
    const rgb = (value) => value.match(/\d+/gu).slice(0, 3).map(Number);
    evidence.scatter = {geometry: [], contrast: {}};
    for (const theme of ['light', 'dark']) {
      for (const width of [375, 1280]) {
        const page = await open({width, theme});
        for (const size of ['1/2', '1', '2']) {
          await make(page, 'sf-chart-scatter', {...scatter, size}, {items: goods, names: kinds});
          const shape = await shapeOf(page, {frame: '.sf-chart-scatter-plot', marks: '.sf-chart-scatter-series > *', texts: '.sf-chart-scatter-tick'});
          await make(page, 'sf-chart-scatter', {...bubbles, size}, {items: regions});
          const round = await shapeOf(page, {frame: '.sf-chart-scatter-plot', marks: '.sf-chart-scatter-series > *', texts: '.sf-chart-scatter-tick'});
          const largest = await page.evaluate(() => Math.max(...[...document.querySelectorAll('.sf-chart-scatter-series > circle')].map((node) => Number(node.getAttribute('r')))));
          evidence.scatter.geometry.push({theme, width, size, height: shape.height, marks: shape.marks, largest});
          if (shape.height !== RUNG[size] || shape.marks !== 12 || shape.outside || shape.pageOverflow > 0) note({case: `scatter ${theme} ${width}px size ${size}: the plot is its rung's height, twelve marks, nothing leaves it`, got: shape, want: RUNG[size]});
          if (round.height !== RUNG[size] || round.marks !== 8 || round.outside || Math.abs(largest - BUBBLE[size]) > 0.1) note({case: `scatter ${theme} ${width}px size ${size}: eight bubbles inside the plot, the largest its rung's`, got: {round, largest}, want: BUBBLE[size]});
        }
        if (width === 1280) {
          await make(page, 'sf-chart-scatter', scatter, {items: goods, names: kinds});
          const marks = await page.evaluate(() => ['electronics', 'accessories'].map((key) => {
            const node = document.querySelector(`.sf-chart-scatter-series[data-series=${key}] > *`);
            return {tag: node.tagName, fill: getComputedStyle(node).fill};
          }));
          const background = rgb(await page.evaluate(() => getComputedStyle(document.body).backgroundColor));
          const ratios = marks.map((one) => Math.round(contrast(rgb(one.fill), background) * 100) / 100);
          evidence.scatter.contrast[theme] = {ratios, marks};
          if (ratios.some((ratio) => ratio < 3) || marks[0].fill === marks[1].fill || marks[0].tag === marks[1].tag) note({case: `scatter ${theme}: each series' marks hold 3:1 against the page, in a colour and a shape of their own`, got: {marks, ratios}});
        }
        await page.close();
      }
    }

    const page = await open({width: 900});
    await make(page, 'sf-chart-scatter', scatter, {items: goods, names: kinds});
    // Tab reaches the table button and the two legend buttons, then the plot.
    await page.focus('#before');
    for (let press = 0; press < 4; press += 1) await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => document.activeElement.matches('.sf-chart-scatter-svg'));
    const said = async (key) => {
      await page.keyboard.press(key);
      await page.waitForTimeout(80);
      return page.evaluate(() => document.querySelector('#chart [aria-live]').textContent.trim().replace(/\u00a0|\u202f/gu, ' '));
    };
    const first = await said('ArrowRight');
    const second = await said('ArrowRight');
    const end = await said('End');
    const up = await said('ArrowUp');
    await page.keyboard.press('Enter');
    const chosen = await page.evaluate(() => window.events.filter((one) => one.verb === 'select').map((one) => one.detail));
    const tip = await page.evaluate(() => document.querySelector('.sf-chart-scatter-tooltip')?.textContent.replace(/\s+/gu, ' ').trim() ?? '');
    await page.keyboard.press('Escape');
    const cleared = await page.evaluate(() => document.querySelectorAll('.sf-chart-scatter-ring').length);
    await page.keyboard.press('Tab');
    const out = await page.evaluate(() => !document.activeElement.closest('.sf-chart-scatter-svg'));
    // The pointer on a mark shows that point.
    const spot = await page.evaluate(() => {
      const node = document.querySelector('.sf-chart-scatter-series[data-series=electronics] > circle');
      const box = node.getBoundingClientRect();
      return {x: box.left + box.width / 2, y: box.top + box.height / 2};
    });
    await page.mouse.move(spot.x, spot.y);
    await page.waitForTimeout(80);
    const hover = await page.evaluate(() => document.querySelector('.sf-chart-scatter-tooltip')?.textContent.replace(/\s+/gu, ' ').trim() ?? '');
    const keys = {focused, first, second, end, up, chosen, tip, cleared, out, hover};
    evidence.scatter.keyboard = keys;
    if (!focused || first !== 'Чехол, Аксессуары: Цена 300, Продано 520' || second !== 'Кабель, Аксессуары: Цена 650, Продано 470'
      || end !== 'Ноутбук, Электроника: Цена 9 900, Продано 80' || up !== 'Телефон, Электроника: Цена 7 800, Продано 120'
      || chosen.length !== 1 || chosen[0].point !== 'Телефон' || chosen[0].index !== 4 || !tip.startsWith('Телефон') || cleared || !out
      || !hover.startsWith('Наушники')) note({case: 'scatter: one Tab stop after the table button; the arrows walk the points and each is said; Enter selects, Escape clears; the pointer shows its point', got: keys});
    await page.close();

    // Past 2,000 marks: a canvas, within the budget, and the keyboard still walks them.
    const many = await open({width: 1280});
    const session = await many.context().newCDPSession(many);
    await session.send('Emulation.setCPUThrottlingRate', {rate: 4});
    const drawn = await many.evaluate(async () => {
      const data = Array.from({length: 5000}, (_, index) => ({x: (index * 7919) % 1000, y: ((index * 104729) % 997) + ((index * 7919) % 1000) / 4, group: index % 2 ? 'b' : 'a'}));
      const box = document.getElementById('box');
      box.replaceChildren();
      const chart = document.createElement('sf-chart-scatter');
      chart.id = 'chart';
      chart.setAttribute('label', 'Много точек');
      chart.setAttribute('series', 'group');
      box.append(chart);
      await new Promise((done) => setTimeout(done, 300));
      const start = performance.now();
      chart.items = data;
      await new Promise((done) => {
        const check = () => (chart.querySelector('.sf-chart-scatter-canvas') ? done() : requestAnimationFrame(check));
        check();
      });
      await new Promise((done) => requestAnimationFrame(() => done()));
      const first = Math.round(performance.now() - start);
      const canvas = chart.querySelector('.sf-chart-scatter-canvas');
      const pixels = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
      let painted = 0;
      for (let at = 3; at < pixels.length; at += 4) if (pixels[at]) painted += 1;
      return {first, svgMarks: chart.querySelectorAll('.sf-chart-scatter-series > *').length, painted, width: canvas.width};
    });
    await session.send('Emulation.setCPUThrottlingRate', {rate: 1});
    await many.focus('#chart svg[role=group]');
    await many.keyboard.press('ArrowRight');
    await many.keyboard.press('ArrowRight');
    await many.waitForTimeout(120);
    const walked = await many.evaluate(() => ({said: document.querySelector('#chart [aria-live]').textContent.trim(), ring: document.querySelectorAll('#chart .sf-chart-scatter-ring').length}));
    evidence.scatter['5000-points-4x'] = {...drawn, walked};
    if (drawn.first > 1500 || drawn.svgMarks !== 0 || drawn.painted < 5000 || !/^Точка \d+, a|^Точка \d+, b/u.test(walked.said) || walked.ring !== 1) note({case: 'scatter: 5,000 points draw on a canvas within 1.5 s at 4x CPU, and the keyboard walks them', got: {drawn, walked}});
    await many.close();

    const forced = await open({colors: 'active'});
    await make(forced, 'sf-chart-scatter', scatter, {items: goods, names: kinds});
    const solid = await forced.evaluate(() => [...document.querySelectorAll('.sf-chart-scatter-series > *')].map((node) => getComputedStyle(node).fill));
    await make(forced, 'sf-chart-scatter', {...bubbles, series: 'half'}, {items: regions.map((one, index) => ({...one, half: index % 2 ? 'b' : 'a'}))});
    const dashes = await forced.evaluate(() => ['a', 'b'].map((key) => getComputedStyle(document.querySelector(`.sf-chart-scatter-series[data-series=${key}] > circle`)).strokeDasharray));
    evidence.scatter.forced = {fill: solid[0], dashes};
    if (new Set(solid).size !== 1 || solid[0] === 'none' || dashes[0] !== 'none' || dashes[1] === 'none') note({case: 'scatter: in forced colours the marks are solid in the system colour and the bubbles\' series differ by their outline\'s dash', got: {solid: [...new Set(solid)], dashes}});
    await forced.close();
  }

  // 3g. The histogram (bin on sf-chart-bar): the plot is its rung's height,
  // one bar per interval, the bars touch, and the edge labels stay inside
  // the plot, in both themes and at both widths.
  {
    const hours = [5, 8, 9, 11, 12, 12, 14, 15, 16, 17, 18, 18, 19, 20, 21, 22, 23, 24, 26, 27, 29, 31, 33, 36, 38, 41, 44, 47, 52, 61].map((h) => ({hours: h}));
    evidence.histogram = [];
    for (const theme of ['light', 'dark']) {
      for (const width of [375, 1280]) {
        const page = await open({width, theme});
        for (const size of ['1/2', '1', '2']) {
          await make(page, 'sf-chart-bar', {label: 'Время доставки', x: 'hours', bin: 'auto', size}, {items: hours});
          const shape = await shapeOf(page, {frame: '.sf-chart-bar-plot', marks: '.sf-chart-bar-bar', texts: '.sf-chart-bar-tick'});
          const seams = await page.evaluate(() => {
            const bars = [...document.querySelectorAll('.sf-chart-bar-bar')].map((node) => node.getBoundingClientRect());
            return Math.max(0, ...bars.slice(1).map((box, index) => Math.abs(box.left - bars[index].right)));
          });
          evidence.histogram.push({theme, width, size, height: shape.height, bars: shape.marks, seams});
          if (shape.height !== RUNG[size] || shape.marks !== 7 || shape.outside || shape.pageOverflow > 0 || seams > 0.5) note({case: `histogram ${theme} ${width}px size ${size}: its rung's height, seven touching bars, nothing leaves it`, got: {shape, seams}, want: RUNG[size]});
        }
        await page.close();
      }
    }
  }

  // 3h. The box plot: the plot is its rung's height and every box, whisker
  // and outlier stays in it on every rung and width; each series' outline
  // holds 3:1 against the page in both themes; the boxes are one Tab stop
  // walked by the arrows, group by group and across the series, each said
  // with its statistics, and the pointer shows the same box in the tooltip;
  // in forced colours the outlines are the system colour and a series past
  // the first has its own dash.
  {
    const spread = {north: [12, 14, 15, 16, 18, 19, 21, 24, 48], south: [20, 22, 25, 27, 28, 30, 33, 35, 38], east: [4, 9, 11, 12, 13, 14, 15, 16, 18]};
    const rows = Object.entries(spread).flatMap(([warehouse, values]) => values.flatMap((hours, index) => [{warehouse, kind: 'standard', hours}, {warehouse, kind: 'express', hours: Math.round(hours / 2) + (index % 3)}]));
    const box = {label: 'Время доставки', x: 'warehouse', y: 'hours', series: 'kind', 'y-label': 'Часов', 'y-format': 'integer'};
    const names = {standard: 'Обычная', express: 'Срочная'};
    const rgb = (value) => value.match(/\d+/gu).slice(0, 3).map(Number);
    evidence.box = {geometry: [], contrast: {}};
    for (const theme of ['light', 'dark']) {
      for (const width of [375, 1280]) {
        const page = await open({width, theme});
        for (const size of ['1/2', '1', '2']) {
          await make(page, 'sf-chart-box', {...box, size}, {items: rows, names});
          const shape = await shapeOf(page, {frame: '.sf-chart-box-plot', marks: '.sf-chart-box-series > *', texts: '.sf-chart-box-tick'});
          const boxes = await page.evaluate(() => document.querySelectorAll('#chart .sf-chart-box-box').length);
          evidence.box.geometry.push({theme, width, size, height: shape.height, boxes, marks: shape.marks});
          if (shape.height !== RUNG[size] || boxes !== 6 || shape.outside || shape.pageOverflow > 0) note({case: `box ${theme} ${width}px size ${size}: the plot is its rung's height, six boxes, nothing leaves it`, got: {shape, boxes}, want: RUNG[size]});
        }
        if (width === 1280) {
          await make(page, 'sf-chart-box', box, {items: rows, names});
          const strokes = await page.evaluate(() => ['standard', 'express'].map((key) => getComputedStyle(document.querySelector(`.sf-chart-box-series[data-series=${key}] .sf-chart-box-box`)).stroke));
          const background = rgb(await page.evaluate(() => getComputedStyle(document.body).backgroundColor));
          const ratios = strokes.map((one) => Math.round(contrast(rgb(one), background) * 100) / 100);
          evidence.box.contrast[theme] = {ratios, strokes};
          if (ratios.some((ratio) => ratio < 3) || strokes[0] === strokes[1]) note({case: `box ${theme}: each series' outline holds 3:1 against the page, in a colour of its own`, got: {strokes, ratios}});
        }
        await page.close();
      }
    }

    const page = await open({width: 900});
    await make(page, 'sf-chart-box', box, {items: rows, names});
    // Tab reaches the table button and the two legend buttons, then the plot.
    await page.focus('#before');
    for (let press = 0; press < 4; press += 1) await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => document.activeElement.matches('.sf-chart-box-svg'));
    const said = async (key) => {
      await page.keyboard.press(key);
      await page.waitForTimeout(80);
      return page.evaluate(() => document.querySelector('#chart [aria-live]').textContent.trim().replace(/\u00a0|\u202f/gu, ' '));
    };
    const first = await said('ArrowRight');
    const second = await said('ArrowRight');
    const down = await said('ArrowDown');
    const end = await said('End');
    await page.keyboard.press('Enter');
    const chosen = await page.evaluate(() => window.events.filter((one) => one.verb === 'select').map((one) => one.detail));
    const tip = await page.evaluate(() => document.querySelector('.sf-chart-box-tooltip')?.textContent.replace(/\s+/gu, ' ').trim() ?? '');
    await page.keyboard.press('Escape');
    const cleared = await page.evaluate(() => document.querySelectorAll('.sf-chart-box-ring').length);
    await page.keyboard.press('Tab');
    const out = await page.evaluate(() => !document.activeElement.closest('.sf-chart-box-svg'));
    // The pointer on a box shows that box.
    const spot = await page.evaluate(() => {
      const node = document.querySelector('.sf-chart-box-series[data-series=express] .sf-chart-box-box');
      const area = node.getBoundingClientRect();
      return {x: area.left + area.width / 2, y: area.top + area.height / 2};
    });
    await page.mouse.move(spot.x, spot.y);
    await page.waitForTimeout(80);
    const hover = await page.evaluate(() => document.querySelector('.sf-chart-box-tooltip')?.textContent.replace(/\s+/gu, ' ').trim() ?? '');
    const keys = {focused, first, second, down, end, chosen, tip, cleared, out, hover};
    evidence.box.keyboard = keys;
    if (!focused || first !== 'north, Обычная: медиана 18, квартили 15 – 21, усы 12 – 24, выбросов 1' || !second.startsWith('south, Обычная: медиана 28')
      || !down.startsWith('south, Срочная: медиана') || !end.startsWith('east, Срочная: медиана')
      || chosen.length !== 1 || chosen[0].group !== 'east' || chosen[0].series !== 'express' || chosen[0].index !== 2 || !tip.startsWith('east, Срочная Максимум') || cleared || !out
      || !hover.startsWith('north, Срочная')) note({case: 'box: one Tab stop after the table button and the legend; the arrows walk the boxes and each is said; Enter selects, Escape clears; the pointer shows its box', got: keys});
    await page.close();

    const forced = await open({colors: 'active'});
    await make(forced, 'sf-chart-box', box, {items: rows, names});
    const lines = await forced.evaluate(() => ['standard', 'express'].map((key) => {
      const node = getComputedStyle(document.querySelector(`.sf-chart-box-series[data-series=${key}] .sf-chart-box-box`));
      return {stroke: node.stroke, dash: node.strokeDasharray};
    }));
    evidence.box.forced = lines;
    if (lines[0].stroke !== lines[1].stroke || lines[0].dash !== 'none' || lines[1].dash === 'none') note({case: 'box: in forced colours the outlines are the system colour and the second series has its own dash', got: lines});
    await forced.close();
  }

  // 3i. The radar: the plot is its rung's height and every ring, mark and
  // spoke name stays in it on every rung and width; each series' line holds
  // 3:1 against the page in both themes and the second has marks of its own
  // shape; the values are one Tab stop walked round the spokes and across
  // the series, each said, and the pointer shows the same spoke in the
  // tooltip; in forced colours the lines are the system colour and the
  // second has its own dash.
  {
    const skills = ['Аналитика', 'Код', 'Дизайн', 'Общение', 'Тесты', 'Планирование'];
    const team = skills.map((skill, index) => ({skill, anna: [8, 9, 4, 6, 7, 5][index], boris: [5, 6, 8, 9, 4, 7][index]}));
    const radar = {label: 'Навыки', x: 'skill', y: 'anna,boris', max: '10', 'y-format': 'integer'};
    const people = {anna: 'Анна', boris: 'Борис'};
    const rgb = (value) => value.match(/\d+/gu).slice(0, 3).map(Number);
    evidence.radar = {geometry: [], contrast: {}};
    for (const theme of ['light', 'dark']) {
      for (const width of [375, 1280]) {
        const page = await open({width, theme});
        for (const size of ['1/2', '1', '2']) {
          await make(page, 'sf-chart-radar', {...radar, size}, {items: team, names: people});
          const shape = await shapeOf(page, {frame: '.sf-chart-radar-plot', marks: '.sf-chart-radar-series > *', texts: '.sf-chart-radar-svg text'});
          const tall = await page.evaluate(() => {
            const frame = document.querySelector('#chart .sf-chart-radar-plot').getBoundingClientRect();
            return [...document.querySelectorAll('#chart .sf-chart-radar-svg text')].filter((node) => {
              const box = node.getBoundingClientRect();
              return box.top < frame.top - 1 || box.bottom > frame.bottom + 1;
            }).length;
          });
          const spokes = await page.evaluate(() => document.querySelectorAll('#chart .sf-chart-radar-spoke').length);
          evidence.radar.geometry.push({theme, width, size, height: shape.height, spokes, marks: shape.marks});
          if (shape.height !== RUNG[size] || spokes !== 6 || shape.outside || tall || shape.pageOverflow > 0) note({case: `radar ${theme} ${width}px size ${size}: the plot is its rung's height, six spokes, nothing leaves it`, got: {shape, spokes, tall}, want: RUNG[size]});
        }
        if (width === 1280) {
          await make(page, 'sf-chart-radar', radar, {items: team, names: people});
          const lines = await page.evaluate(() => ['anna', 'boris'].map((key) => ({
            stroke: getComputedStyle(document.querySelector(`.sf-chart-radar-series[data-series=${key}] .sf-chart-radar-line`)).stroke,
            mark: document.querySelector(`.sf-chart-radar-series[data-series=${key}] .sf-chart-radar-dot`).tagName,
          })));
          const background = rgb(await page.evaluate(() => getComputedStyle(document.body).backgroundColor));
          const ratios = lines.map((one) => Math.round(contrast(rgb(one.stroke), background) * 100) / 100);
          evidence.radar.contrast[theme] = {ratios, lines};
          if (ratios.some((ratio) => ratio < 3) || lines[0].stroke === lines[1].stroke || lines[0].mark === lines[1].mark) note({case: `radar ${theme}: each series' line holds 3:1 against the page, in a colour and a mark of its own`, got: {lines, ratios}});
        }
        await page.close();
      }
    }

    const page = await open({width: 900});
    await make(page, 'sf-chart-radar', radar, {items: team, names: people});
    // Tab reaches the table button and the two legend buttons, then the plot.
    await page.focus('#before');
    for (let press = 0; press < 4; press += 1) await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => document.activeElement.matches('.sf-chart-radar-svg'));
    const said = async (key) => {
      await page.keyboard.press(key);
      await page.waitForTimeout(80);
      return page.evaluate(() => document.querySelector('#chart [aria-live]').textContent.trim());
    };
    const first = await said('ArrowRight');
    const second = await said('ArrowRight');
    const down = await said('ArrowDown');
    const back = await said('ArrowLeft');
    const end = await said('End');
    await page.keyboard.press('Enter');
    const chosen = await page.evaluate(() => window.events.filter((one) => one.verb === 'select').map((one) => one.detail));
    const tip = await page.evaluate(() => document.querySelector('.sf-chart-radar-tooltip')?.textContent.replace(/\s+/gu, ' ').trim() ?? '');
    await page.keyboard.press('Escape');
    const cleared = await page.evaluate(() => document.querySelectorAll('.sf-chart-radar-ring').length);
    await page.keyboard.press('Tab');
    const out = await page.evaluate(() => !document.activeElement.closest('.sf-chart-radar-svg'));
    // The pointer on a mark shows its spoke.
    const spot = await page.evaluate(() => {
      const node = document.querySelectorAll('.sf-chart-radar-series[data-series=boris] .sf-chart-radar-dot')[3];
      const box = node.getBoundingClientRect();
      return {x: box.left + box.width / 2, y: box.top + box.height / 2};
    });
    await page.mouse.move(spot.x, spot.y);
    await page.waitForTimeout(80);
    const hover = await page.evaluate(() => document.querySelector('.sf-chart-radar-tooltip')?.textContent.replace(/\s+/gu, ' ').trim() ?? '');
    const keys = {focused, first, second, down, back, end, chosen, tip, cleared, out, hover};
    evidence.radar.keyboard = keys;
    if (!focused || first !== 'Аналитика, Анна: 8' || second !== 'Код, Анна: 9' || down !== 'Код, Борис: 6' || back !== 'Аналитика, Борис: 5'
      || end !== 'Планирование, Борис: 7' || chosen.length !== 1 || chosen[0].spoke !== 'Планирование' || chosen[0].value !== 7
      || tip !== 'Планирование Анна 5 Борис 7' || cleared || !out || hover !== 'Общение Анна 6 Борис 9') note({case: 'radar: one Tab stop after the table button and the legend; the arrows go round the spokes and across the series, each said; Enter selects, Escape clears; the pointer shows its spoke', got: keys});
    await page.close();

    const forced = await open({colors: 'active'});
    await make(forced, 'sf-chart-radar', radar, {items: team, names: people});
    const drawn = await forced.evaluate(() => ['anna', 'boris'].map((key) => {
      const node = getComputedStyle(document.querySelector(`.sf-chart-radar-series[data-series=${key}] .sf-chart-radar-line`));
      return {stroke: node.stroke, dash: node.strokeDasharray};
    }));
    evidence.radar.forced = drawn;
    if (drawn[0].stroke !== drawn[1].stroke || drawn[0].dash !== 'none' || drawn[1].dash === 'none') note({case: 'radar: in forced colours the lines are the system colour and the second series has its own dash', got: drawn});
    await forced.close();
  }

  // 3j. The candlestick: the plot is its rung's height and every candle and
  // tick stays in it on every rung and width; the up and down tones hold 3:1
  // against the page in both themes, a rising body hollow and a falling one
  // filled; the candles are one Tab stop walked one by one, each said, and
  // the pointer shows the same period in the tooltip; in forced colours both
  // are the system colour and still hollow and filled.
  {
    const days = [['01', 101.0, 103.6, 100.1, 102.4], ['02', 102.4, 105.6, 101.8, 104.1], ['05', 104.1, 104.9, 101.6, 103.2], ['06', 103.2, 107.7, 102.5, 105.8],
      ['07', 105.8, 108.4, 105.0, 107.3], ['08', 107.3, 107.9, 104.4, 106.1], ['09', 106.1, 107.0, 103.5, 104.9], ['12', 104.9, 108.3, 104.4, 106.6],
      ['13', 106.6, 110.2, 105.7, 108.9], ['14', 108.9, 111.8, 107.8, 110.2], ['15', 110.2, 110.9, 107.9, 109.4], ['16', 109.4, 113.6, 108.8, 111.8],
      ['19', 111.8, 114.7, 110.9, 113.5], ['20', 113.5, 114.0, 110.3, 112.1], ['21', 112.1, 112.9, 109.2, 110.6], ['22', 110.6, 114.5, 109.9, 112.9],
      ['23', 112.9, 116.7, 111.9, 115.3], ['26', 115.3, 116.2, 112.5, 114.2], ['27', 114.2, 118.3, 113.4, 116.8], ['28', 116.8, 119.4, 115.7, 118.1]];
    const share = days.map(([day, open, high, low, close]) => ({day: `2026-10-${day}`, open, high, low, close}));
    const candle = {label: 'Акция', x: 'day', 'y-format': 'decimal-1'};
    const rgb = (value) => value.match(/\d+/gu).slice(0, 3).map(Number);
    const bodies = '#chart svg[role=group] .sf-chart-candlestick-body';
    evidence.candlestick = {geometry: [], contrast: {}};
    for (const theme of ['light', 'dark']) {
      for (const width of [375, 1280]) {
        const page = await open({width, theme});
        for (const size of ['1/2', '1', '2']) {
          await make(page, 'sf-chart-candlestick', {...candle, size}, {items: share});
          const shape = await shapeOf(page, {frame: '.sf-chart-candlestick-plot', marks: '.sf-chart-candlestick-marks *', texts: '.sf-chart-candlestick-tick'});
          const drawn = await page.evaluate((selector) => document.querySelectorAll(selector).length, bodies);
          evidence.candlestick.geometry.push({theme, width, size, height: shape.height, bodies: drawn, marks: shape.marks});
          if (shape.height !== RUNG[size] || drawn < 1 || drawn > 20 || shape.outside || shape.pageOverflow > 0) note({case: `candlestick ${theme} ${width}px size ${size}: the plot is its rung's height and nothing leaves it`, got: {shape, drawn}, want: RUNG[size]});
        }
        if (width === 1280) {
          await make(page, 'sf-chart-candlestick', candle, {items: share});
          const tones = await page.evaluate(() => ['up', 'down'].map((key) => {
            const node = getComputedStyle(document.querySelector(`#chart svg[role=group] .sf-chart-candlestick-${key} .sf-chart-candlestick-body`));
            return {stroke: node.stroke, fill: node.fill};
          }));
          const background = rgb(await page.evaluate(() => getComputedStyle(document.body).backgroundColor));
          const ratios = tones.map((one) => Math.round(contrast(rgb(one.stroke), background) * 100) / 100);
          evidence.candlestick.contrast[theme] = {ratios, tones};
          if (ratios.some((ratio) => ratio < 3) || tones[0].stroke === tones[1].stroke || tones[0].fill === tones[0].stroke || tones[1].fill !== tones[1].stroke) note({case: `candlestick ${theme}: up and down hold 3:1 against the page in tones of their own, a rising body hollow and a falling one filled`, got: {tones, ratios}});
        }
        await page.close();
      }
    }

    const page = await open({width: 900});
    await make(page, 'sf-chart-candlestick', candle, {items: share});
    // Tab reaches the table button, then the plot; the legend is not a stop.
    await page.focus('#before');
    for (let press = 0; press < 2; press += 1) await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => document.activeElement.matches('.sf-chart-candlestick-svg'));
    const said = async (key) => {
      await page.keyboard.press(key);
      await page.waitForTimeout(80);
      return page.evaluate(() => document.querySelector('#chart [aria-live]').textContent.trim().replace(/ | /gu, ' '));
    };
    const first = await said('ArrowRight');
    const second = await said('ArrowRight');
    const still = await said('ArrowDown');
    const end = await said('End');
    await page.keyboard.press('Enter');
    const chosen = await page.evaluate(() => window.events.filter((one) => one.verb === 'select').map((one) => one.detail));
    const tip = await page.evaluate(() => document.querySelector('.sf-chart-candlestick-tooltip')?.textContent.replace(/\s+/gu, ' ').trim() ?? '');
    await page.keyboard.press('Escape');
    const cleared = await page.evaluate(() => document.querySelectorAll('.sf-chart-candlestick-ring').length);
    await page.keyboard.press('Tab');
    const out = await page.evaluate(() => !document.activeElement.closest('.sf-chart-candlestick-svg'));
    // The pointer on the fifth rising candle shows its day.
    const spot = await page.evaluate((selector) => {
      const box = document.querySelectorAll(selector)[4].getBoundingClientRect();
      return {x: box.left + box.width / 2, y: box.top + box.height / 2};
    }, '#chart svg[role=group] .sf-chart-candlestick-up .sf-chart-candlestick-body');
    await page.mouse.move(spot.x, spot.y);
    await page.waitForTimeout(80);
    const hover = await page.evaluate(() => document.querySelector('.sf-chart-candlestick-tooltip')?.textContent.replace(/\s+/gu, ' ').trim() ?? '');
    const keys = {focused, first, second, still, end, chosen, tip, cleared, out, hover};
    evidence.candlestick.keyboard = keys;
    if (!focused || !first.startsWith('1 октября 2026 г.: открытие 101,0') || !second.startsWith('2 октября 2026 г.:') || still !== second
      || !end.startsWith('28 октября 2026 г.:') || chosen.length !== 1 || chosen[0].index !== 19 || chosen[0].close !== 118.1
      || !tip.startsWith('28 октября 2026 г.') || !tip.includes('118,1') || cleared || !out || !hover.startsWith('12 октября 2026 г.')) note({case: 'candlestick: one Tab stop after the table button; the arrows go candle by candle, Up and Down stay, each said; Enter selects, Escape clears; the pointer shows its day', got: keys});
    await page.close();

    const forced = await open({colors: 'active'});
    await make(forced, 'sf-chart-candlestick', candle, {items: share});
    const plain = await forced.evaluate(() => ['up', 'down'].map((key) => {
      const node = getComputedStyle(document.querySelector(`#chart svg[role=group] .sf-chart-candlestick-${key} .sf-chart-candlestick-body`));
      return {stroke: node.stroke, fill: node.fill};
    }));
    evidence.candlestick.forced = plain;
    if (plain[0].stroke !== plain[1].stroke || plain[0].fill === plain[0].stroke || plain[1].fill !== plain[1].stroke) note({case: 'candlestick: in forced colours both are the system colour, a rising body hollow and a falling one filled', got: plain});
    await forced.close();
  }

  // 3k. The waterfall: the plot is its rung's height and every bar, value
  // and label stays in it on every rung and width; rise, fall and total
  // hold 3:1 against the page in both themes, each in a tone of its own;
  // the steps are one Tab stop walked one by one, each said, and the
  // pointer shows the same step in the tooltip; in forced colours all are
  // the system colour, a rise hollow, a fall filled and a total dashed.
  {
    const bridge = [['Выручка 2025', 820, true], ['Новые клиенты', 240], ['Повышение цен', 95], ['Отток', -130], ['Скидки', -60], ['Курс валют', 35]]
      .map(([step, value, total]) => (total ? {step, value, total} : {step, value}));
    const fall = {label: 'Выручка', x: 'step', y: 'value', 'y-format': 'integer'};
    const rgb = (value) => value.match(/\d+/gu).slice(0, 3).map(Number);
    const kinds = ['up', 'down', 'total'];
    evidence.waterfall = {geometry: [], contrast: {}};
    for (const theme of ['light', 'dark']) {
      for (const width of [375, 1280]) {
        const page = await open({width, theme});
        for (const size of ['1/2', '1', '2']) {
          await make(page, 'sf-chart-waterfall', {...fall, size}, {items: bridge});
          const shape = await shapeOf(page, {frame: '.sf-chart-waterfall-plot', marks: '.sf-chart-waterfall-marks rect', texts: '.sf-chart-waterfall-svg text'});
          const tall = await page.evaluate(() => {
            const frame = document.querySelector('#chart .sf-chart-waterfall-plot').getBoundingClientRect();
            return [...document.querySelectorAll('#chart .sf-chart-waterfall-svg text')].filter((node) => {
              const box = node.getBoundingClientRect();
              return box.top < frame.top - 1 || box.bottom > frame.bottom + 1;
            }).length;
          });
          const values = await page.evaluate(() => document.querySelectorAll('#chart .sf-chart-waterfall-value').length);
          evidence.waterfall.geometry.push({theme, width, size, height: shape.height, bars: shape.marks, values});
          if (shape.height !== RUNG[size] || shape.marks !== 7 || shape.outside || tall || shape.pageOverflow > 0) note({case: `waterfall ${theme} ${width}px size ${size}: the plot is its rung's height, seven bars, nothing leaves it`, got: {shape, tall, values}, want: RUNG[size]});
        }
        if (width === 1280) {
          await make(page, 'sf-chart-waterfall', fall, {items: bridge});
          const fills = await page.evaluate((keys) => keys.map((key) => getComputedStyle(document.querySelector(`#chart svg[role=group] .sf-chart-waterfall-${key} .sf-chart-waterfall-bar`)).fill), kinds);
          const background = rgb(await page.evaluate(() => getComputedStyle(document.body).backgroundColor));
          const ratios = fills.map((fill) => Math.round(contrast(rgb(fill), background) * 100) / 100);
          evidence.waterfall.contrast[theme] = {ratios, fills};
          if (ratios.some((ratio) => ratio < 3) || new Set(fills).size !== 3) note({case: `waterfall ${theme}: rise, fall and total hold 3:1 against the page in tones of their own`, got: {fills, ratios}});
        }
        await page.close();
      }
    }

    const page = await open({width: 900});
    await make(page, 'sf-chart-waterfall', fall, {items: bridge});
    // Tab reaches the table button, then the plot; the legend is not a stop.
    await page.focus('#before');
    for (let press = 0; press < 2; press += 1) await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => document.activeElement.matches('.sf-chart-waterfall-svg'));
    const said = async (key) => {
      await page.keyboard.press(key);
      await page.waitForTimeout(80);
      return page.evaluate(() => document.querySelector('#chart [aria-live]').textContent.trim().replace(/ | /gu, ' '));
    };
    const first = await said('ArrowRight');
    const second = await said('ArrowRight');
    const still = await said('ArrowDown');
    const end = await said('End');
    await page.keyboard.press('Enter');
    const chosen = await page.evaluate(() => window.events.filter((one) => one.verb === 'select').map((one) => one.detail));
    const tip = await page.evaluate(() => document.querySelector('.sf-chart-waterfall-tooltip')?.textContent.replace(/\s+/gu, ' ').trim() ?? '');
    await page.keyboard.press('Escape');
    const cleared = await page.evaluate(() => document.querySelectorAll('.sf-chart-waterfall-ring').length);
    await page.keyboard.press('Tab');
    const out = await page.evaluate(() => !document.activeElement.closest('.sf-chart-waterfall-svg'));
    // The pointer on the first fall shows its step.
    const spot = await page.evaluate(() => {
      const box = document.querySelector('#chart svg[role=group] .sf-chart-waterfall-down .sf-chart-waterfall-bar').getBoundingClientRect();
      return {x: box.left + box.width / 2, y: box.top + box.height / 2};
    });
    await page.mouse.move(spot.x, spot.y);
    await page.waitForTimeout(80);
    const hover = await page.evaluate(() => document.querySelector('.sf-chart-waterfall-tooltip')?.textContent.replace(/\s+/gu, ' ').trim() ?? '');
    const keys = {focused, first, second, still, end, chosen, tip, cleared, out, hover};
    evidence.waterfall.keyboard = keys;
    if (!focused || first !== 'Выручка 2025: 820' || second !== 'Новые клиенты: +240, итог 1 060' || still !== second || end !== 'Итого: 1 000'
      || chosen.length !== 1 || chosen[0].index !== 6 || chosen[0].kind !== 'total' || chosen[0].total !== 1000
      || !tip.startsWith('Итого') || cleared || !out || !hover.startsWith('Отток')) note({case: 'waterfall: one Tab stop after the table button; the arrows go step by step, Up and Down stay, each said; Enter selects, Escape clears; the pointer shows its step', got: keys});
    await page.close();

    const forced = await open({colors: 'active'});
    await make(forced, 'sf-chart-waterfall', fall, {items: bridge});
    const plain = await forced.evaluate((keys) => keys.map((key) => {
      const node = getComputedStyle(document.querySelector(`#chart svg[role=group] .sf-chart-waterfall-${key} .sf-chart-waterfall-bar`));
      return {stroke: node.stroke, fill: node.fill, dash: node.strokeDasharray};
    }), kinds);
    evidence.waterfall.forced = plain;
    const [up, down, total] = plain;
    if (new Set(plain.map((one) => one.stroke)).size !== 1 || up.fill === up.stroke || down.fill !== down.stroke || total.fill === total.stroke || total.dash === 'none' || up.dash !== 'none') note({case: 'waterfall: in forced colours all are the system colour, a rise hollow, a fall filled and a total dashed', got: plain});
    await forced.close();
  }

  // 3l. The treemap: the plot is its rung's height and every part and name
  // stays in it on every rung and width; each group's line holds 3:1
  // against the page in both themes, in a colour of its own, and the names
  // keep 4.5:1 on their fills; the parts are one Tab stop walked largest
  // first, Up and Down across the groups, each said, and the pointer shows
  // the same part in the tooltip; in forced colours every part is the
  // canvas with a line of the system colour.
  {
    const sales = [['Смартфоны', 420, 'Электроника'], ['Ноутбуки', 310, 'Электроника'], ['Наушники', 120, 'Электроника'], ['Планшеты', 90, 'Электроника'], ['Мебель', 260, 'Дом'], ['Посуда', 110, 'Дом'], ['Текстиль', 70, 'Дом'], ['Обувь', 180, 'Одежда'], ['Верхняя одежда', 150, 'Одежда'], ['Аксессуары', 60, 'Одежда']]
      .map(([name, value, area]) => ({name, value, area}));
    const tree = {label: 'Выручка', x: 'name', y: 'value', group: 'area', 'y-format': 'integer'};
    const rgb = (value) => value.match(/[\d.]+/gu).slice(0, 4).map(Number);
    // A tint over the page: its colour as the eye sees it.
    const over = ([r, g, b, a = 1], [pr, pg, pb]) => [r * a + pr * (1 - a), g * a + pg * (1 - a), b * a + pb * (1 - a)];
    const areas = ['Электроника', 'Дом', 'Одежда'];
    evidence.treemap = {geometry: [], contrast: {}};
    for (const theme of ['light', 'dark']) {
      for (const width of [375, 1280]) {
        const page = await open({width, theme});
        for (const size of ['1/2', '1', '2']) {
          await make(page, 'sf-chart-treemap', {...tree, size}, {items: sales});
          const shape = await shapeOf(page, {frame: '.sf-chart-treemap-plot', marks: '.sf-chart-treemap-marks rect', texts: '.sf-chart-treemap-svg text'});
          const spill = await page.evaluate(() => [...document.querySelectorAll('#chart .sf-chart-treemap-name, #chart .sf-chart-treemap-value')].filter((node) => {
            const text = node.getBoundingClientRect();
            const part = node.previousElementSibling?.classList.contains('sf-chart-treemap-part') ? node.previousElementSibling : node.previousElementSibling?.previousElementSibling;
            const box = part.getBoundingClientRect();
            return text.left < box.left - 1 || text.right > box.right + 1 || text.top < box.top - 1 || text.bottom > box.bottom + 1;
          }).map((node) => node.textContent));
          const names = await page.evaluate(() => document.querySelectorAll('#chart .sf-chart-treemap-name').length);
          evidence.treemap.geometry.push({theme, width, size, height: shape.height, parts: shape.marks, names});
          if (shape.height !== RUNG[size] || shape.marks !== 10 || shape.outside || spill.length || shape.pageOverflow > 0) note({case: `treemap ${theme} ${width}px size ${size}: the plot is its rung's height, ten parts, every name inside its part`, got: {shape, spill, names}, want: RUNG[size]});
        }
        if (width === 1280) {
          await make(page, 'sf-chart-treemap', tree, {items: sales});
          const paint = await page.evaluate((keys) => keys.map((key) => {
            const group = document.querySelector(`#chart svg[role=group] .sf-chart-treemap-group[data-group="${key}"]`);
            const part = getComputedStyle(group.querySelector('.sf-chart-treemap-part'));
            return {stroke: part.stroke, fill: part.fill, ink: getComputedStyle(group.querySelector('.sf-chart-treemap-name')).fill};
          }), areas);
          const background = rgb(await page.evaluate(() => getComputedStyle(document.body).backgroundColor));
          const lines = paint.map((one) => Math.round(contrast(rgb(one.stroke), background) * 100) / 100);
          const inks = paint.map((one) => Math.round(contrast(rgb(one.ink), over(rgb(one.fill), background)) * 100) / 100);
          evidence.treemap.contrast[theme] = {lines, inks};
          if (lines.some((ratio) => ratio < 3) || inks.some((ratio) => ratio < 4.5) || new Set(paint.map((one) => one.stroke)).size !== 3) note({case: `treemap ${theme}: each group's line holds 3:1 against the page in a colour of its own, the names 4.5:1 on their fills`, got: {paint, lines, inks}});
        }
        await page.close();
      }
    }

    const page = await open({width: 900});
    await make(page, 'sf-chart-treemap', tree, {items: sales});
    // Tab reaches the table button, then the plot; the legend is not a stop.
    await page.focus('#before');
    for (let press = 0; press < 2; press += 1) await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => document.activeElement.matches('.sf-chart-treemap-svg'));
    const said = async (key) => {
      await page.keyboard.press(key);
      await page.waitForTimeout(80);
      return page.evaluate(() => document.querySelector('#chart [aria-live]').textContent.trim().replace(/ | /gu, ' '));
    };
    const first = await said('ArrowRight');
    const second = await said('ArrowRight');
    const down = await said('ArrowDown');
    const up = await said('ArrowUp');
    const end = await said('End');
    await page.keyboard.press('Enter');
    const chosen = await page.evaluate(() => window.events.filter((one) => one.verb === 'select').map((one) => one.detail));
    const tip = await page.evaluate(() => document.querySelector('.sf-chart-treemap-tooltip')?.textContent.replace(/\s+/gu, ' ').trim() ?? '');
    await page.keyboard.press('Escape');
    const cleared = await page.evaluate(() => document.querySelectorAll('.sf-chart-treemap-ring').length);
    await page.keyboard.press('Tab');
    const out = await page.evaluate(() => !document.activeElement.closest('.sf-chart-treemap-svg'));
    // The pointer on the largest part of «Дом» shows it.
    const spot = await page.evaluate(() => {
      const box = document.querySelector('#chart svg[role=group] .sf-chart-treemap-group[data-group="Дом"] .sf-chart-treemap-part').getBoundingClientRect();
      return {x: box.left + box.width / 2, y: box.top + box.height / 2};
    });
    await page.mouse.move(spot.x, spot.y);
    await page.waitForTimeout(80);
    const hover = await page.evaluate(() => document.querySelector('.sf-chart-treemap-tooltip')?.textContent.replace(/\s+/gu, ' ').trim() ?? '');
    const keys = {focused, first, second, down, up, end, chosen, tip, cleared, out, hover};
    evidence.treemap.keyboard = keys;
    if (!focused || first !== 'Электроника — Смартфоны: 420 (23,7 %)' || second !== 'Электроника — Ноутбуки: 310 (17,5 %)' || down !== 'Дом — Мебель: 260 (14,7 %)' || up !== first || end !== 'Одежда — Аксессуары: 60 (3,4 %)'
      || chosen.length !== 1 || chosen[0].index !== 9 || chosen[0].group !== 'Одежда' || chosen[0].value !== 60
      || !tip.startsWith('Аксессуары') || cleared || !out || !hover.startsWith('Мебель')) note({case: 'treemap: one Tab stop after the table button; the arrows go part by part, Up and Down across the groups, each said; Enter selects, Escape clears; the pointer shows its part', got: keys});
    await page.close();

    const forced = await open({colors: 'active'});
    await make(forced, 'sf-chart-treemap', tree, {items: sales});
    const plain = await forced.evaluate((keys) => keys.map((key) => {
      const node = getComputedStyle(document.querySelector(`#chart svg[role=group] .sf-chart-treemap-group[data-group="${key}"] .sf-chart-treemap-part`));
      return {stroke: node.stroke, fill: node.fill};
    }), areas);
    evidence.treemap.forced = plain;
    if (new Set(plain.map((one) => one.stroke)).size !== 1 || new Set(plain.map((one) => one.fill)).size !== 1 || plain[0].fill === plain[0].stroke) note({case: 'treemap: in forced colours every part is the canvas with a line of the system colour', got: plain});
    await forced.close();
  }

  // 3m. The timeline: the plot is its rung's height and every bar, diamond
  // and name stays in it on every rung and width, a name inside the start
  // of its row; each status's bar holds 3:1 against the page in both themes,
  // in a colour of its own, and the names 4.5:1; the ranges are one Tab stop
  // walked row after row, Up and Down to the nearest range of the next row,
  // each said, and the pointer shows the same range in the tooltip; in
  // forced colours each status keeps a line of its own.
  {
    const plan = [['Анализ требований', '2026-03-02', '2026-03-13', 'готово'], ['Дизайн', '2026-03-09', '2026-03-27', 'готово'], ['Разработка', '2026-03-23', '2026-04-24', 'в работе'], ['Тестирование', '2026-04-13', '2026-05-08', 'план'], ['Обучение', '2026-04-27', '2026-05-15', 'план'], ['Запуск', '2026-05-15', '2026-05-15', 'план']]
      .map(([task, start, end, status]) => ({task, start, end, status}));
    const gantt = {label: 'План', row: 'task', status: 'status'};
    const rgb = (value) => value.match(/[\d.]+/gu).slice(0, 3).map(Number);
    const statuses = ['готово', 'в работе', 'план'];
    evidence.timeline = {geometry: [], contrast: {}};
    for (const theme of ['light', 'dark']) {
      for (const width of [375, 1280]) {
        const page = await open({width, theme});
        for (const size of ['1/2', '1', '2']) {
          await make(page, 'sf-chart-timeline', {...gantt, size}, {items: plan});
          const shape = await shapeOf(page, {frame: '.sf-chart-timeline-plot', marks: '.sf-chart-timeline-marks rect, .sf-chart-timeline-marks path', texts: '.sf-chart-timeline-svg text'});
          // A row's name ends before the plot's first bar can start.
          const spill = await page.evaluate(() => {
            const first = Math.min(...[...document.querySelectorAll('#chart .sf-chart-timeline-marks rect, #chart .sf-chart-timeline-marks path')].map((node) => node.getBoundingClientRect().left));
            const axis = document.querySelector('#chart .sf-chart-timeline-axis').getBoundingClientRect().left;
            return [...document.querySelectorAll('#chart .sf-chart-timeline-name')].filter((node) => node.getBoundingClientRect().right > Math.min(first, axis) + 1).map((node) => node.textContent);
          });
          const names = await page.evaluate(() => document.querySelectorAll('#chart .sf-chart-timeline-name').length);
          evidence.timeline.geometry.push({theme, width, size, height: shape.height, marks: shape.marks, names});
          if (shape.height !== RUNG[size] || shape.marks !== 6 || shape.outside || spill.length || shape.pageOverflow > 0) note({case: `timeline ${theme} ${width}px size ${size}: the plot is its rung's height, six marks, every name before the bars`, got: {shape, spill, names}, want: RUNG[size]});
        }
        if (width === 1280) {
          await make(page, 'sf-chart-timeline', gantt, {items: plan});
          const paint = await page.evaluate((keys) => ({
            bars: keys.map((key) => getComputedStyle(document.querySelector(`#chart svg[role=group] .sf-chart-timeline-status[data-status="${key}"] :is(.sf-chart-timeline-range, .sf-chart-timeline-milestone)`)).fill),
            ink: getComputedStyle(document.querySelector('#chart .sf-chart-timeline-name')).fill,
            ticks: getComputedStyle(document.querySelector('#chart .sf-chart-timeline-tick')).fill,
          }), statuses);
          const background = rgb(await page.evaluate(() => getComputedStyle(document.body).backgroundColor));
          const bars = paint.bars.map((one) => Math.round(contrast(rgb(one), background) * 100) / 100);
          const inks = [paint.ink, paint.ticks].map((one) => Math.round(contrast(rgb(one), background) * 100) / 100);
          evidence.timeline.contrast[theme] = {bars, inks};
          if (bars.some((ratio) => ratio < 3) || inks.some((ratio) => ratio < 4.5) || new Set(paint.bars).size !== 3) note({case: `timeline ${theme}: each status's bar holds 3:1 against the page in a colour of its own, the names and ticks 4.5:1`, got: {paint, bars, inks}});
        }
        await page.close();
      }
    }

    const page = await open({width: 900});
    await make(page, 'sf-chart-timeline', gantt, {items: plan});
    await page.focus('#before');
    for (let press = 0; press < 2; press += 1) await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => document.activeElement.matches('.sf-chart-timeline-svg'));
    const said = async (key) => {
      await page.keyboard.press(key);
      await page.waitForTimeout(80);
      return page.evaluate(() => document.querySelector('#chart [aria-live]').textContent.trim().replace(/ | /gu, ' '));
    };
    const first = await said('ArrowRight');
    const second = await said('ArrowRight');
    const down = await said('ArrowDown');
    const up = await said('ArrowUp');
    const end = await said('End');
    await page.keyboard.press('Enter');
    const chosen = await page.evaluate(() => window.events.filter((one) => one.verb === 'select').map((one) => one.detail));
    const tip = await page.evaluate(() => document.querySelector('.sf-chart-timeline-tooltip')?.textContent.replace(/\s+/gu, ' ').trim() ?? '');
    await page.keyboard.press('Escape');
    const cleared = await page.evaluate(() => document.querySelectorAll('.sf-chart-timeline-ring').length);
    await page.keyboard.press('Tab');
    const out = await page.evaluate(() => !document.activeElement.closest('.sf-chart-timeline-svg'));
    // The pointer on the middle of «Разработка» shows it.
    const spot = await page.evaluate(() => {
      const box = document.querySelector('#chart svg[role=group] .sf-chart-timeline-status[data-status="в работе"] .sf-chart-timeline-range').getBoundingClientRect();
      return {x: box.left + box.width / 2, y: box.top + box.height / 2};
    });
    await page.mouse.move(spot.x, spot.y);
    await page.waitForTimeout(80);
    const hover = await page.evaluate(() => document.querySelector('.sf-chart-timeline-tooltip')?.textContent.replace(/\s+/gu, ' ').trim().replace(/ | /gu, ' ') ?? '');
    const keys = {focused, first, second, down, up, end, chosen, tip, cleared, out, hover};
    evidence.timeline.keyboard = keys;
    if (!focused || first !== 'Анализ требований, готово: 2 марта 2026 г. – 13 марта 2026 г., 11 дн.' || second !== 'Дизайн, готово: 9 марта 2026 г. – 27 марта 2026 г., 18 дн.' || down !== 'Разработка, в работе: 23 марта 2026 г. – 24 апреля 2026 г., 32 дн.' || up !== second || end !== 'Запуск, план: 15 мая 2026 г., веха'
      || chosen.length !== 1 || chosen[0].index !== 5 || chosen[0].lane !== 'Запуск' || chosen[0].start !== chosen[0].end
      || !tip.startsWith('Запуск') || cleared || !out || hover !== 'Разработка Статус в работе Начало 23 марта 2026 г. Конец 24 апреля 2026 г. Длительность 32 дн.') note({case: 'timeline: one Tab stop after the table button; the arrows go range by range, Up and Down to the nearest range of the next row, each said; Enter selects, Escape clears; the pointer shows its range', got: keys});
    await page.close();

    const forced = await open({colors: 'active'});
    await make(forced, 'sf-chart-timeline', gantt, {items: plan});
    const plain = await forced.evaluate((keys) => keys.map((key) => {
      const node = getComputedStyle(document.querySelector(`#chart svg[role=group] .sf-chart-timeline-status[data-status="${key}"] :is(.sf-chart-timeline-range, .sf-chart-timeline-milestone)`));
      return {stroke: node.stroke, fill: node.fill, dash: node.strokeDasharray};
    }), statuses);
    evidence.timeline.forced = plain;
    if (new Set(plain.map((one) => `${one.fill} ${one.dash}`)).size !== 3 || plain.some((one) => one.stroke === 'none')) note({case: 'timeline: in forced colours each status keeps a line of its own in the system colours', got: plain});
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
