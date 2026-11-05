#!/usr/bin/env node
// Usage: node scripts/evidence.mjs <site URL> <out directory>
//
// Screenshots of the built site for review, at 1280 and 390 px, light (and
// dark for the home page): the home page once per example tab (the eight
// kinds of chart), the quick start, the components overview and three
// component pages. Every shown set element must be defined (one on a hidden
// tab may not be yet: the Loader defines a component when it is first
// shown), every chart on a tab must draw its plot, and console and page
// errors are recorded. The home
// page is loaded three times more to catch errors that only show on some
// loads. Needs Playwright (PLAYWRIGHT_MODULE for its path,
// PLAYWRIGHT_BROWSERS_PATH for the browser).
import {mkdirSync, writeFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {join, resolve} from 'node:path';

const require = createRequire(import.meta.url);
const {chromium} = require(process.env.PLAYWRIGHT_MODULE ?? 'playwright');
const [base, outArgument] = process.argv.slice(2);
if (!base || !outArgument) throw new Error('usage: evidence.mjs <site URL> <out directory>');
const out = resolve(outArgument);
mkdirSync(out, {recursive: true});
const TABS = ['Динамика', 'Факт и план', 'Структура', 'Потоки', 'Сроки', 'Нагрузка', 'Карта', 'Показатели'];
const PAGES = [
  ['quick-start', 'ru/guide/quick-start/'],
  ['components', 'ru/components/'],
  ['reference-chart-bar', 'ru/components/trends/chart-bar/'],
  ['reference-chart-sankey', 'ru/components/flows/chart-sankey/'],
  ['reference-chart-map', 'ru/components/grids/chart-map/'],
];
const SET_TAGS = ['line', 'bar', 'pie', 'sparkline', 'metric', 'parts', 'heatmap', 'funnel', 'gauge', 'scatter', 'box', 'radar',
  'candlestick', 'waterfall', 'treemap', 'timeline', 'sankey', 'sunburst', 'map'].map((name) => `sf-chart-${name}`).join(', ');
const report = [];

const watch = (page) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(`console: ${message.text()}`); });
  return errors;
};
// Frames load lazily: scroll through the page so every example starts.
const wake = async (page) => {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 600) { await page.evaluate((top) => window.scrollTo(0, top), y); await page.waitForTimeout(150); }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(2500);
};
const inventory = async (page) => {
  const elements = [];
  for (const frame of page.frames()) {
    elements.push(...await frame.evaluate((tags) => [...document.querySelectorAll(tags)].map((element) => ({
      tag: element.localName,
      defined: Boolean(customElements.get(element.localName)),
      visible: element.getClientRects().length > 0,
      // A metric tile is a number, not a plot: it is drawn when it shows text.
      drawn: element.localName === 'sf-chart-metric' ? element.textContent.trim().length > 0 : element.querySelectorAll('svg, canvas, [role="meter"]').length > 0,
    })), SET_TAGS).catch(() => []));
  }
  return elements;
};
// A frame outside the viewport is not painted into a full-page capture: the
// viewport is made as tall as the page before the shot.
const shoot = async (page, width, file) => {
  const full = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.setViewportSize({width, height: Math.min(full, 12000)});
  await page.waitForTimeout(2000);
  await page.screenshot({path: join(out, file), fullPage: true});
  await page.setViewportSize({width, height: 900});
};
const showcase = (page) => page.frames().find((frame) => frame.url() !== page.url() && frame !== page.mainFrame());

const browser = await chromium.launch();
for (const scheme of ['light', 'dark']) {
  for (const width of [1280, 390]) {
    const context = await browser.newContext({viewport: {width, height: 900}, colorScheme: scheme, deviceScaleFactor: 1, ignoreHTTPSErrors: true});
    // The home page, once per example tab.
    const page = await context.newPage();
    const errors = watch(page);
    await page.goto(new URL('ru/', base).href, {waitUntil: 'networkidle'});
    await wake(page);
    for (const [index, label] of TABS.entries()) {
      const frame = page.frames().find((one) => one !== page.mainFrame());
      if (!frame) { report.push({page: 'ru/', tab: label, width, scheme, errors: ['no example frame']}); break; }
      if (index > 0) {
        await frame.getByRole('tab', {name: label, exact: true}).click();
        await page.waitForTimeout(1500);
      }
      const panel = await frame.evaluate((position) => {
        const section = document.querySelector(`[slot="panel-${position}"]`);
        // Every chart on the panel must draw its plot.
        const charts = [...(section?.querySelectorAll('[id^="home-"]') ?? [])];
        return {
          visible: Boolean(section && section.getClientRects().length),
          charts: charts.length,
          drawn: charts.filter((chart) => (chart.localName === 'sf-chart-metric' ? chart.textContent.trim() : chart.querySelector('svg, canvas, [role="meter"]'))).length,
          text: (section?.innerText ?? '').replace(/\s+/gu, ' ').slice(0, 160),
        };
      }, index);
      const file = `home-${index + 1}-${width}-${scheme}.png`;
      await shoot(page, width, file);
      report.push({page: 'ru/', tab: label, width, scheme, file, panel, elements: await inventory(page), errors: [...errors]});
    }
    await page.close();
    if (scheme === 'light') {
      for (const [name, path] of PAGES) {
        const one = await context.newPage();
        const pageErrors = watch(one);
        await one.goto(new URL(path, base).href, {waitUntil: 'networkidle'});
        await wake(one);
        const file = `${name}-${width}-${scheme}.png`;
        await shoot(one, width, file);
        report.push({page: path, width, scheme, file, elements: await inventory(one), errors: pageErrors});
        await one.close();
      }
    }
    await context.close();
  }
}

// Three more loads of the home page, from a cold context each time.
const reloads = [];
for (let round = 1; round <= 3; round += 1) {
  const context = await browser.newContext({viewport: {width: 1280, height: 900}, ignoreHTTPSErrors: true});
  const page = await context.newPage();
  const errors = watch(page);
  await page.goto(new URL('', base).href, {waitUntil: 'networkidle'});
  await wake(page);
  const elements = await inventory(page);
  reloads.push({round, url: page.url(), elements: elements.length, undefined: elements.filter((one) => !one.defined && one.visible).length, errors});
  await context.close();
}
await browser.close();

writeFileSync(join(out, 'screenshots.json'), `${JSON.stringify({base, shots: report, reloads}, null, 1)}\n`);
const broken = report.filter((shot) => shot.errors.length
  || (shot.elements ?? []).some((one) => !one.defined && one.visible)
  || (shot.elements ?? []).some((one) => one.visible && one.defined && !one.drawn)
  || (shot.panel && (!shot.panel.visible || !shot.panel.charts || shot.panel.drawn !== shot.panel.charts))
  || (shot.page !== 'ru/' && !(shot.elements ?? []).length));
const brokenReloads = reloads.filter((one) => one.errors.length || one.undefined || !one.url.endsWith('/ru/'));
console.log(JSON.stringify({shots: report.length, broken: broken.map(({file, panel, errors}) => ({file, panel, errors})), reloads: brokenReloads}, null, 1));
process.exit(broken.length || brokenReloads.length ? 1 : 0);
