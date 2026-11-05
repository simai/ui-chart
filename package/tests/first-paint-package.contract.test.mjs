import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';
import {describe, exampleFiles, givesLateData, sizeProblem} from '../scripts/first-paint-lib.mjs';

// The first paint of the chart components (standard simai.smart-component
// 1.3.8 §5.4, gate 24): each example has its committed static markup, written
// by scripts/run-first-paint.mjs snapshot from the built bytes and checked by
// its `check` and `gate` modes. This holds what needs no browser: the files
// are there, and a skeleton.html is the element's own loading render.

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const smart = join(root, 'src', 'smart');
const PACKAGE = ['chart-line', 'chart-sparkline', 'chart-bar', 'chart-pie', 'chart-metric', 'chart-parts', 'chart-heatmap', 'chart-funnel', 'chart-gauge', 'chart-scatter', 'chart-box', 'chart-radar', 'chart-candlestick', 'chart-waterfall', 'chart-treemap', 'chart-timeline', 'chart-sankey', 'chart-sunburst', 'chart-map'];
// The element that holds each chart's box from the first paint.
const BOX = {'chart-line': 'sf-chart-line-plot', 'chart-sparkline': 'sf-chart-sparkline', 'chart-bar': 'sf-chart-bar-plot', 'chart-pie': 'sf-chart-pie-plot', 'chart-metric': 'sf-chart-metric', 'chart-parts': 'sf-chart-parts-plot', 'chart-heatmap': 'sf-chart-heatmap-plot', 'chart-funnel': 'sf-chart-funnel-plot', 'chart-gauge': 'sf-chart-gauge-plot', 'chart-scatter': 'sf-chart-scatter-plot', 'chart-box': 'sf-chart-box-plot', 'chart-radar': 'sf-chart-radar-plot', 'chart-candlestick': 'sf-chart-candlestick-plot', 'chart-waterfall': 'sf-chart-waterfall-plot', 'chart-treemap': 'sf-chart-treemap-plot', 'chart-timeline': 'sf-chart-timeline-plot', 'chart-sankey': 'sf-chart-sankey-plot', 'chart-sunburst': 'sf-chart-sunburst-plot', 'chart-map': 'sf-chart-map-plot'};

test('every example of every package component has its static markup and sheets', () => {
  for (const folder of PACKAGE) {
    const component = describe(smart, folder);
    assert.ok(existsSync(join(component.dir, 'static', 'sheets.json')), `${folder}: static/sheets.json`);
    for (const example of component.examples) {
      const files = exampleFiles(component, example);
      assert.ok(existsSync(files.html), `${folder}/${example.name}: ${files.html}`);
      // An explicitly empty list is data, the empty state: no skeleton for it.
      const late = givesLateData(component, example);
      assert.equal(existsSync(files.skeleton), late, `${folder}/${example.name}: a skeleton exactly when the example gives late data`);
      // The size gate of ui-source's snapshot tool, held here without a browser.
      for (const file of [files.html, files.skeleton].filter((one) => existsSync(one))) {
        assert.equal(sizeProblem(example, readFileSync(file).length), null, file);
      }
    }
  }
});

test('a chart holds its plot box in the static markup and its skeleton, so nothing moves when it draws', () => {
  for (const folder of PACKAGE) {
    const component = describe(smart, folder);
    for (const example of component.examples) {
      const files = exampleFiles(component, example);
      for (const file of [files.html, files.skeleton].filter((one) => existsSync(one))) {
        assert.match(readFileSync(file, 'utf8'), new RegExp(`class="${BOX[folder]}[" ]`, 'u'), `${file}: the plot's box is printed`);
      }
    }
  }
});
