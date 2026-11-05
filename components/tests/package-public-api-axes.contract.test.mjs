// The package half of ui-source's "nothing calls an appearance or a status
// `type` without being recorded" (tests/public-api-axes.contract.test.mjs).
//
// A chart's data-state is the vocabulary's data state (simai.smart-vocabulary
// §3: idle, loading, ready, empty, error, ...), not a status the chart reports
// about the world; its word error is what the free rule takes for a status.
// sf-table's data-state is exempt in contracts/public-api-axes.json for the
// same reason. That file is ui-source's and a package file may not replace it,
// so the exemption is ui-source's to record (ordered from the SIMAI Framework
// dispatcher with M0). Until it is, the package's own properties are listed
// below with their reason; the list only shrinks -- a property the contract
// records is removed from it in the same commit that moves the pin.
//
// scripts/test.mjs runs every other test of the free file as it is.
import assert from 'node:assert/strict';
import {existsSync, readFileSync, readdirSync} from 'node:fs';
import {resolve} from 'node:path';
import test from 'node:test';

const root = resolve(import.meta.dirname, '..');
const json = (path) => JSON.parse(readFileSync(resolve(root, path), 'utf8'));
const map = json('contracts/public-api-axes.json');

const PENDING = [
  {component: 'chart-line', property: 'data-state', reason: 'the vocabulary data state of the chart (auto, loading, ready, empty, error), as sf-table data-state, not a status about the world'},
  {component: 'chart-bar', property: 'data-state', reason: 'the vocabulary data state of the chart (auto, loading, ready, empty, error), as sf-table data-state, not a status about the world'},
  {component: 'chart-pie', property: 'data-state', reason: 'the vocabulary data state of the chart (auto, loading, ready, empty, error), as sf-table data-state, not a status about the world'},
  {component: 'chart-parts', property: 'data-state', reason: 'the vocabulary data state of the chart (auto, loading, ready, empty, error), as sf-table data-state, not a status about the world'},
  {component: 'chart-heatmap', property: 'data-state', reason: 'the vocabulary data state of the chart (auto, loading, ready, empty, error), as sf-table data-state, not a status about the world'},
  {component: 'chart-funnel', property: 'data-state', reason: 'the vocabulary data state of the chart (auto, loading, ready, empty, error), as sf-table data-state, not a status about the world'},
  {component: 'chart-scatter', property: 'data-state', reason: 'the vocabulary data state of the chart (auto, loading, ready, empty, error), as sf-table data-state, not a status about the world'},
  {component: 'chart-box', property: 'data-state', reason: 'the vocabulary data state of the chart (auto, loading, ready, empty, error), as sf-table data-state, not a status about the world'},
  {component: 'chart-radar', property: 'data-state', reason: 'the vocabulary data state of the chart (auto, loading, ready, empty, error), as sf-table data-state, not a status about the world'},
  {component: 'chart-candlestick', property: 'data-state', reason: 'the vocabulary data state of the chart (auto, loading, ready, empty, error), as sf-table data-state, not a status about the world'},
  {component: 'chart-waterfall', property: 'data-state', reason: 'the vocabulary data state of the chart (auto, loading, ready, empty, error), as sf-table data-state, not a status about the world'},
  {component: 'chart-treemap', property: 'data-state', reason: 'the vocabulary data state of the chart (auto, loading, ready, empty, error), as sf-table data-state, not a status about the world'},
  {component: 'chart-timeline', property: 'data-state', reason: 'the vocabulary data state of the chart (auto, loading, ready, empty, error), as sf-table data-state, not a status about the world'},
  {component: 'chart-sankey', property: 'data-state', reason: 'the vocabulary data state of the chart (auto, loading, ready, empty, error), as sf-table data-state, not a status about the world'},
  {component: 'chart-sunburst', property: 'data-state', reason: 'the vocabulary data state of the chart (auto, loading, ready, empty, error), as sf-table data-state, not a status about the world'},
  {component: 'chart-gauge', property: 'data-state', reason: 'the vocabulary data state of the chart (auto, loading, ready, empty, error), as sf-table data-state, not a status about the world'},
];

// The free rule's words, as ui-source writes them at the pin.
const free = readFileSync(resolve(root, 'tests/public-api-axes.contract.test.mjs'), 'utf8');
const words = (name) => JSON.parse(free.match(new RegExp(`const ${name} = (\\[[^\\]]*\\]);`, 'u'))[1].replace(/'/gu, '"'));
const APPEARANCE_WORDS = words('APPEARANCE_WORDS');
const STATUS_WORDS = words('STATUS_WORDS');

const components = readdirSync(resolve(root, 'src/smart'), {withFileTypes: true})
  .filter((entry) => entry.isDirectory() && existsSync(resolve(root, `src/smart/${entry.name}/smart.manifest.json`)))
  .map((entry) => entry.name).sort();

test('nothing calls an appearance or a status `type` without being recorded, or pending here with a reason', () => {
  const recorded = new Set(map.components.flatMap(({component, legacy}) => legacy.map((name) => `${component}.${name}`)));
  for (const exemption of map.exempt_properties ?? []) recorded.add(`${exemption.component}.${exemption.property}`);
  const pending = new Set();
  for (const entry of PENDING) {
    assert.ok(entry.reason.length > 20, `${entry.component}.${entry.property}: a pending exemption says why`);
    assert.ok(!recorded.has(`${entry.component}.${entry.property}`), `${entry.component}.${entry.property}: recorded by ui-source now; remove it from PENDING`);
    pending.add(`${entry.component}.${entry.property}`);
  }
  const problems = [];
  for (const name of components) {
    const properties = json(`src/smart/${name}/smart.manifest.json`).inputs?.properties ?? {};
    for (const [property, definition] of Object.entries(properties)) {
      if (Object.keys(map.axes).includes(property)) continue;
      const values = definition.enum ?? [];
      const looksLikeAppearance = values.some((value) => APPEARANCE_WORDS.includes(value));
      const looksLikeStatus = values.some((value) => STATUS_WORDS.includes(value));
      if (!looksLikeAppearance && !looksLikeStatus) continue;
      const key = `${name}.${property}`;
      if (!recorded.has(key) && !pending.has(key)) problems.push(`${key} answers an axis question but is not recorded`);
    }
  }
  assert.deepEqual(problems, []);
});
