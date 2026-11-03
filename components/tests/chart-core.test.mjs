// The chart core (src/smart/chart-core): the pure parts every chart shares,
// held without a browser.
import assert from 'node:assert/strict';
import test from 'node:test';
import {extent, readNumber, readRows, readSeries, readTime, xKindOf} from '../src/smart/chart-core/data.js';
import {bandScale, linearScale, nearestIndex, niceTicks, tickCount, timeTicks} from '../src/smart/chart-core/scale.js';
import {stackExtent, stackSeries} from '../src/smart/chart-core/stack.js';
import {arcMiddle, arcPath, pieSlices} from '../src/smart/chart-core/arc.js';
import {formatNumber, formatTime, numberOptions, timeUnitOf} from '../src/smart/chart-core/format.js';
import {areaPath, bandPath, linePath, runs} from '../src/smart/chart-core/path.js';
import {minMaxIndexes} from '../src/smart/chart-core/decimate.js';
import {seriesFacts, trendOf} from '../src/smart/chart-core/describe.js';
import {moveCursor} from '../src/smart/chart-core/cursor.js';
import {keptView, settled} from '../src/smart/chart-core/settle.js';
import {execFileSync} from 'node:child_process';
import {existsSync} from 'node:fs';
import {PALETTES} from '../src/smart/chart-core/palettes.js';
import {colourValue, contrast, coloursKey, readColours} from '../src/smart/chart-core/colors.js';
import {heatColours, heatSteps, stepCount, stepOf} from '../src/smart/chart-core/heat.js';
import {funnelStages} from '../src/smart/chart-core/funnel.js';

test('records and columns read into the same rows', () => {
  const records = [{m: 'a', v: 1}, {m: 'b', v: 2}];
  assert.deepEqual(readRows({m: ['a', 'b'], v: [1, 2]}), records);
  assert.deepEqual(readRows(records), records);
  assert.deepEqual(readRows(null), []);
  assert.deepEqual(readRows('a,b'), []);
});

test('a missing value is a gap, never a zero', () => {
  for (const gap of [null, undefined, '', 'n/a', NaN, Infinity, true]) assert.equal(readNumber(gap), null, String(gap));
  assert.equal(readNumber('0'), 0);
  assert.equal(readNumber(' 12.5 '), 12.5);
  const {series} = readSeries([{x: 1, y: 3}, {x: 2, y: null}, {x: 3, y: 0}], {x: 'x', y: 'y'});
  assert.deepEqual(series[0].values, [3, null, 0]);
});

test('the x kind is read from the values', () => {
  assert.equal(xKindOf(['2026-01', '2026-02']), 'time');
  assert.equal(xKindOf(['2026-01-05T10:00:00Z']), 'time');
  assert.equal(xKindOf([1, '2', 3.5]), 'number');
  assert.equal(xKindOf(['Москва', 'Казань']), 'category');
  assert.equal(xKindOf([1, 2], 'category'), 'category');
  assert.equal(xKindOf(['a'], 'linear'), 'number');
  assert.equal(readTime('2026-03'), new Date(2026, 2, 1).getTime(), 'a bare month is local midnight');
  assert.equal(readTime('03.2026'), null);
});

test('the wide form gives a series per y field, the long form a series per value', () => {
  const wide = readSeries([{d: '2026-02', a: 2, b: 5}, {d: '2026-01', a: 1, b: 4}], {x: 'd', y: 'a, b'});
  assert.equal(wide.kind, 'time');
  assert.deepEqual(wide.series.map((one) => one.key), ['a', 'b']);
  assert.deepEqual(wide.series[0].values, [1, 2], 'time x is sorted');
  const long = readSeries([
    {d: 1, city: 'A', v: 10}, {d: 1, city: 'B', v: 20}, {d: 2, city: 'A', v: 11},
  ], {x: 'd', y: 'v', series: 'city', names: {B: 'Бета'}});
  assert.deepEqual(long.series.map((one) => [one.key, one.name, one.values]), [['A', 'A', [10, 11]], ['B', 'Бета', [20, null]]]);
  const guessed = readSeries([{x: 'q1', a: 1, note: 'n', b: '2'}], {});
  assert.deepEqual(guessed.series.map((one) => one.key), ['a', 'b'], 'no y: every numeric field');
  assert.deepEqual(extent(long.series), [10, 20]);
  assert.equal(extent([{values: [null]}]), null);
});

test('ticks are round and cover the data', () => {
  const ticks = niceTicks(3, 97, 5);
  assert.deepEqual([ticks.min, ticks.max, ticks.step], [0, 100, 20]);
  assert.deepEqual(niceTicks(0.12, 0.31, 4).ticks, [0.1, 0.15, 0.2, 0.25, 0.3, 0.35]);
  assert.deepEqual(niceTicks(40, 60, 4, {zero: true}).ticks, [0, 20, 40, 60]);
  const flat = niceTicks(5, 5, 4);
  assert.ok(flat.min < 5 && flat.max > 5, 'a flat series still has a span');
  const scale = linearScale([0, 100], [200, 0]);
  assert.equal(scale(25), 150);
  assert.equal(scale.invert(150), 25);
  assert.equal(tickCount(300, 60), 5);
  assert.equal(nearestIndex([0, 10, 20, 30], 14), 1);
  assert.equal(nearestIndex([0, 10, 20, 30], 16), 2);
});

test('time ticks fall on calendar units', () => {
  const months = timeTicks(new Date(2026, 0, 1).getTime(), new Date(2026, 11, 1).getTime(), 6);
  assert.equal(months.unit, 'month');
  for (const time of months.ticks) assert.equal(new Date(time).getDate(), 1);
  const years = timeTicks(new Date(2000, 5, 1).getTime(), new Date(2026, 0, 1).getTime(), 6);
  assert.equal(years.unit, 'year');
  for (const time of years.ticks) assert.equal(new Date(time).getMonth(), 0);
  assert.equal(timeUnitOf([new Date(2026, 0, 1).getTime(), new Date(2026, 1, 1).getTime()]), 'month');
  assert.equal(timeUnitOf([new Date(2026, 0, 1).getTime(), new Date(2026, 0, 2).getTime()]), 'day');
});

test('formats speak the page language', () => {
  assert.equal(formatNumber(1234.5, 'ru', 'number').replace(/\s/gu, ' '), '1 234,5');
  assert.equal(formatNumber(1234.5, 'en', 'integer'), '1,235');
  assert.equal(formatNumber(0.125, 'en', 'percent'), '12.5%');
  assert.equal(formatNumber(1500, 'en', 'compact'), '1.5K');
  assert.match(formatNumber(10, 'ru', 'currency-RUB'), /₽/u);
  assert.equal(formatNumber(null, 'ru'), '—');
  assert.deepEqual(numberOptions('decimal-2'), {minimumFractionDigits: 2, maximumFractionDigits: 2});
  assert.equal(formatNumber(0.25, 'en', 'number', {step: 0.05}), '0.25');
  assert.match(formatTime(new Date(2026, 2, 1).getTime(), 'ru', 'month', {form: 'full'}), /март/u);
  assert.equal(formatTime(null, 'ru'), '—');
});

test('paths break at a gap, or connect over it', () => {
  const points = [[0, 0], [10, 10], null, [20, 0], [30, 10]];
  assert.equal(runs(points).length, 2);
  assert.equal(runs(points, 'connect').length, 1);
  assert.equal(linePath(points), 'M0 0L10 10M20 0L30 10');
  assert.equal(linePath([[0, 0], [10, 10]], {curve: 'step'}), 'M0 0H5V10H10');
  assert.equal(linePath([[5, 5]]), 'M5 5h0', 'a lone point still draws');
  assert.equal(areaPath([[0, 0], [10, 10]], 20), 'M0 0L10 10L10 20L0 20Z');
});

test('a band runs along its top and back along its bottom, broken where either has a gap', () => {
  assert.equal(bandPath([[0, 0], [10, 5]], [[0, 10], [10, 20]]), 'M0 0L10 5L10 20L0 10Z');
  const upper = [[0, 0], [10, 5], null, [30, 0], [40, 5]];
  const lower = [[0, 9], [10, 9], [20, 9], [30, 9], [40, 9]];
  assert.equal(bandPath(upper, lower), 'M0 0L10 5L10 9L0 9ZM30 0L40 5L40 9L30 9Z');
  assert.equal(bandPath(upper, lower, {gaps: 'connect'}), 'M0 0L10 5L30 0L40 5L40 9L30 9L10 9L0 9Z');
  // A layer's smooth top is the same curve as the bottom of the layer on it.
  const middle = [[0, 4], [10, 2], [20, 6], [30, 3]];
  const above = bandPath([[0, 1], [10, 0], [20, 2], [30, 1]], middle, {curve: 'smooth'});
  const below = bandPath(middle, [[0, 9], [10, 9], [20, 9], [30, 9]], {curve: 'smooth'});
  const forward = linePath(middle, {curve: 'smooth'});
  assert.ok(below.startsWith(forward));
  assert.ok(above.includes('L0 4') || above.endsWith('0 4Z'), 'the band above comes back to where the middle edge starts');
});

test('the smooth curve stays between its points', () => {
  const d = linePath([[0, 10], [10, 0], [20, 0], [30, 10]], {curve: 'smooth'});
  const ys = [...d.matchAll(/C([\d. -]+)/gu)].flatMap(([, list]) => list.trim().split(/\s+/u).filter((_, index) => index % 2 === 1).map(Number));
  for (const y of ys) assert.ok(y >= 0 && y <= 10, `control y ${y} leaves the data's range`);
});

test('decimation keeps the peaks and the gaps', () => {
  const n = 10000;
  const px = Array.from({length: n}, (_, index) => (index / n) * 100);
  const values = Array.from({length: n}, (_, index) => Math.sin(index / 50));
  values[5000] = 99;
  values[7000] = null;
  const kept = minMaxIndexes(px, values, 100);
  assert.ok(kept.length <= 100 * 4 + 1, `${kept.length} points for 100 columns`);
  assert.ok(kept.includes(5000), 'the peak survives');
  assert.ok(kept.includes(7000), 'the gap survives');
  assert.deepEqual([...kept].sort((a, b) => a - b), kept, 'in order');
  assert.equal(minMaxIndexes([0, 1, 2], [1, 2, 3], 100).length, 3, 'few points are all kept');
});

test('facts and trend of a series', () => {
  assert.deepEqual(seriesFacts([null, 3, 1, 5, null]), {first: 1, last: 3, min: 1, max: 5, minAt: 2, maxAt: 3, count: 3});
  assert.equal(seriesFacts([null]), null);
  assert.equal(trendOf([1, 2, 10]), 'up');
  assert.equal(trendOf([10, 2, 1]), 'down');
  assert.equal(trendOf([5, 9, 5]), 'flat');
});

test('the cursor moves by point, series, page and bucket', () => {
  const shown = ['a', 'b'];
  assert.deepEqual(moveCursor(null, 'ArrowRight', {count: 10, shown}), {index: 0, series: 'a'}, 'the first key lands on the first point');
  assert.deepEqual(moveCursor({index: 9, series: 'a'}, 'ArrowRight', {count: 10, shown}), {index: 9, series: 'a'});
  assert.deepEqual(moveCursor({index: 3, series: 'a'}, 'ArrowDown', {count: 10, shown}), {index: 3, series: 'b'});
  assert.deepEqual(moveCursor({index: 3, series: 'a'}, 'End', {count: 10, shown}), {index: 9, series: 'a'});
  assert.deepEqual(moveCursor({index: 0, series: 'a'}, 'PageDown', {count: 100, shown}), {index: 10, series: 'a'});
  assert.deepEqual(moveCursor({index: 0, series: 'a'}, 'ArrowRight', {count: 10000, shown}), {index: 100, series: 'a'}, 'past 200 points an arrow is a bucket');
  assert.equal(moveCursor({index: 0, series: 'a'}, 'x', {count: 10, shown}), null);
  assert.equal(moveCursor(null, 'ArrowRight', {count: 0, shown}), null);
});

test('a stack climbs up and down from zero and keeps its gaps', () => {
  const series = [{values: [2, -1, null]}, {values: [3, -2, 4]}];
  assert.deepEqual(stackSeries(series, 'none'), [[[0, 2], [0, -1], null], [[0, 3], [0, -2], [0, 4]]]);
  assert.deepEqual(stackSeries(series, 'stacked'), [[[0, 2], [0, -1], null], [[2, 5], [-1, -3], [0, 4]]]);
  const shares = stackSeries([{values: [1, 0]}, {values: [3, 0]}], 'normalized');
  assert.deepEqual(shares, [[[0, 0.25], [0, 0]], [[0.25, 1], [0, 0]]]);
  assert.deepEqual(stackExtent(stackSeries(series, 'stacked')), [-3, 5]);
});

test('slices are shares of the positive parts, clockwise from the top', () => {
  const slices = pieSlices([1, null, 3, 0, -2]);
  assert.deepEqual(slices.map(({index}) => index), [0, 2]);
  assert.equal(slices[0].share, 0.25);
  assert.equal(slices[0].start, 0);
  assert.ok(Math.abs(slices[1].end - Math.PI * 2) < 1e-9);
  assert.deepEqual(pieSlices([null, 0]), []);
  const box = {cx: 50, cy: 50, outer: 40};
  assert.equal(arcPath({start: 0, end: Math.PI / 2}, box), 'M50,50L50,10A40,40 0 0 1 90,50Z');
  assert.match(arcPath({start: 0, end: Math.PI * 2}, {...box, inner: 20}), /^M50,10A40,40 0 1 1 50,90A40,40 0 1 1 50,10ZM50,30/u);
  assert.deepEqual(arcMiddle({start: 0, end: Math.PI}, box, 10), [60, 50]);
});

test('bands share the range with their padding', () => {
  const band = bandScale(4, [0, 100], {padding: 0.2});
  assert.equal(band.step, 25);
  assert.equal(band.width, 20);
  assert.equal(band.at(0), 2.5);
  assert.equal(band.at(3), 77.5);
});

test('a unit format says the unit in the page language', () => {
  assert.deepEqual(numberOptions('unit-gigabyte'), {style: 'unit', unit: 'gigabyte', unitDisplay: 'short', maximumFractionDigits: 1});
  assert.equal(formatNumber(45.25, 'en', 'unit-gigabyte'), '45.3 GB');
  assert.match(formatNumber(12, 'ru', 'unit-megabit-per-second'), /^12 Мбит\/[cс]$/u);
  assert.deepEqual(numberOptions('unit-'), {maximumFractionDigits: 2});
  assert.equal(formatNumber(3, 'en', 'unit-parsec-of-stars'), '3');
  assert.equal(formatNumber(3, 'en', 'unit-furlong'), '3');
});

test('a settled table follows a stream at most once per wait, the latest last', async () => {
  const holder = {};
  let asked = 0;
  const later = () => { asked += 1; };
  const a = {};
  const b = {};
  const c = {};
  assert.equal(settled(holder, a, {wait: 40, later, now: 0}), a, 'the first value shows at once');
  assert.equal(settled(holder, a, {wait: 40, later, now: 5}), a, 'the same value stays');
  assert.equal(settled(holder, b, {wait: 40, later, now: 10}), a, 'a change inside the wait is held');
  assert.equal(settled(holder, c, {wait: 40, later, now: 20}), a);
  await new Promise((done) => setTimeout(done, 80));
  assert.equal(asked, 1, 'one render is asked for the held change');
  assert.equal(holder.shown, c, 'the latest value is the one shown');
  assert.equal(settled(holder, b, {wait: 40, later, now: Date.now() + 100}), b, 'after a quiet spell a change shows at once');
});

test('a kept view is built again only when a part of its key changes', () => {
  const holder = {};
  let built = 0;
  const make = () => ({n: (built += 1)});
  const model = {};
  const first = keptView(holder, [model, 'ru'], make);
  assert.equal(keptView(holder, [model, 'ru'], make), first);
  assert.notEqual(keptView(holder, [model, 'en'], make), first);
  assert.equal(built, 2);
});

test('a page colour is a Framework role or a CSS colour, never markup', () => {
  assert.equal(colourValue('error'), 'var(--sf-on-error-container-graphic)');
  assert.equal(colourValue(' #0a7f6f '), '#0a7f6f');
  assert.equal(colourValue('var(--brand)'), 'var(--brand)');
  for (const bad of ['', 'banana', 'red; background: url(x)', '"><script>', null]) assert.equal(colourValue(bad), '');
  const warned = [];
  const colours = readColours('{"fact": "primary", "plan": "nope"}', (said) => warned.push(said));
  assert.deepEqual([...colours], [['fact', 'var(--sf-on-primary-container-graphic)']]);
  assert.equal(warned.length, 1);
  assert.equal(readColours('{oops', (said) => warned.push(said)).size, 0);
  assert.equal(readColours(['primary']).size, 0);
  assert.equal(coloursKey(readColours({a: 'info'})), 'a=var(--sf-on-info-container-graphic)');
  assert.equal(Math.round(contrast([255, 255, 255], [0, 0, 0])), 21);
});

// The generator lives in the package's scripts/, which the build overlay
// does not carry: the check runs where the tests sit beside it.
const generator = new URL('../scripts/chart-palettes.mjs', import.meta.url).pathname;
test('the named palettes are what the generator writes', {skip: !existsSync(generator) && 'the generator is not beside the tests'}, () => {
  execFileSync(process.execPath, [generator, '--check'], {stdio: 'pipe'});
});

test('every named palette colour adapts to the theme', () => {
  assert.deepEqual(Object.keys(PALETTES), ['vivid', 'soft', 'warm', 'cool', 'brand']);
  assert.deepEqual(Object.values(PALETTES).map((set) => set.length), [8, 8, 6, 6, 4]);
  for (const set of Object.values(PALETTES)) for (const colour of set) assert.match(colour, /light-dark\(|var\(--sf-on-primary-container-graphic\)/u);
});

test('a heatmap scale cuts its range into equal steps on the theme\'s tones', () => {
  assert.equal(stepCount(4, 'diverging'), 5);
  assert.equal(stepCount(12, 'sequential'), 9);
  const steps = heatSteps({min: 0, max: 100, count: 5});
  assert.deepEqual(steps.map((step) => [step.from, step.to]), [[0, 20], [20, 40], [40, 60], [60, 80], [80, 100]]);
  assert.equal(stepOf(steps, 0), 0);
  assert.equal(stepOf(steps, 20), 1);
  assert.equal(stepOf(steps, 100), 4);
  assert.equal(stepOf(steps, null), -1);
  const even = heatSteps({min: -2, max: 6, middle: 0, count: 5, scale: 'diverging'});
  assert.deepEqual([even[0].from, even[4].to], [-6, 6]);
  assert.equal(stepOf(even, 0), 2);
  const sequential = heatColours({scheme: 'warning', steps: 5});
  assert.equal(sequential.length, 5);
  assert.equal(sequential[0].fill, 'light-dark(var(--sf-warning-90), var(--sf-warning-20))');
  assert.equal(sequential[4].fill, 'light-dark(var(--sf-warning-25), var(--sf-warning-85))');
  assert.ok(sequential.every((step) => !/-50\)/u.test(step.fill)));
  const diverging = heatColours({scale: 'diverging', better: 'up', steps: 5});
  assert.deepEqual(diverging.map((step) => (step.middle ? 'middle' : step.fill.match(/--sf-([a-z]+)-/u)[1])), ['error', 'error', 'middle', 'success', 'success']);
  assert.equal(heatColours({scale: 'diverging', better: 'down', steps: 3})[0].fill.includes('success'), true);
});

test('a funnel says each stage\'s share of the widest and its conversions, and where the most is lost', () => {
  const rows = (values) => values.map((value, index) => ({key: `s${index}`, name: `S${index}`, value, index}));
  const funnel = funnelStages(rows([1000, 600, 150, 120]));
  assert.deepEqual(funnel.stages.map((stage) => stage.share), [1, 0.6, 0.15, 0.12]);
  assert.deepEqual(funnel.stages.map((stage) => stage.fromPrevious), [null, 0.6, 0.25, 0.8]);
  assert.deepEqual(funnel.stages.map((stage) => stage.fromFirst), [null, 0.6, 0.15, 0.12]);
  assert.equal(funnel.overall, 0.12);
  assert.equal(funnel.worst.index, 2);
  assert.equal(funnel.grows, false);
  // A gap has no conversion and breaks the one across it; the first stays the base.
  const gap = funnelStages(rows([500, null, 200]));
  assert.deepEqual(gap.stages.map((stage) => stage.fromPrevious), [null, null, null]);
  assert.equal(gap.stages[2].fromFirst, 0.4);
  assert.equal(gap.gaps, 1);
  assert.equal(gap.worst, null);
  // A stage wider than the one before: not nested, drawn as given.
  const grows = funnelStages(rows([100, 150, 50]));
  assert.equal(grows.grows, true);
  assert.equal(grows.stages[1].share, 1);
  assert.equal(grows.stages[1].fromPrevious, 1.5);
  // One stage has no overall conversion.
  assert.equal(funnelStages(rows([10])).overall, null);
  assert.equal(funnelStages([]).first, null);
});
