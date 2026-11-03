// Standard simai.smart-component 1.4, phase A, for the chart package: a person
// writes component.json, examples.json, index.js, lang/ and docs.md; rule.js,
// aliases.json, meta.mjs, studio.fixture.json, studio.scenario.json,
// probe.json and smart.manifest.json are generated from them by ui-source's
// scripts/generate-component-files.mjs at the revision framework.lock.json
// pins (this test runs in the overlay, where that script is). A generated file
// edited by hand, or a component.json changed without regenerating, fails here.
//
// To regenerate one component, from the overlay (node scripts/test.mjs lays it):
//   node scripts/generate-component-files.mjs --write --package <ui-chart>/components --component <name>
import assert from 'node:assert/strict';
import {resolve} from 'node:path';
import test from 'node:test';
import {run} from '../scripts/generate-component-files.mjs';

const root = resolve(import.meta.dirname, '..');
const COMPONENTS = ['chart-line', 'chart-sparkline', 'chart-bar', 'chart-pie', 'chart-metric', 'chart-parts', 'chart-heatmap', 'chart-funnel', 'chart-gauge', 'chart-scatter', 'chart-box'];

// Gate 1 (§4): the top-level fields of component.json are a closed list.
const TOP_FIELDS = ['id', 'tag', 'version', 'kind', 'family', 'package', 'traits', 'implements', 'settings', 'values', 'events',
  'actions', 'keys', 'roles', 'rules', 'layouts', 'slots', 'form', 'validity', 'selection', 'entry-state', 'window', 'computed',
  'layer', 'side-effects', 'keyboard', 'port', 'connects', 'templates', 'presentation', 'styles', 'examples', 'docs', 'lang',
  'accessibility', 'host-states', 'css-variables', 'parts', 'relations', 'aliases'];

const results = (await run({packages: [root], components: COMPONENTS})).filter((result) => COMPONENTS.includes(result.component));

test('every chart component is in the 1.4 form and generates every file byte for byte', () => {
  assert.deepEqual(results.map((result) => result.component).sort(), [...COMPONENTS].sort());
  const problems = [];
  for (const result of results) {
    const name = result.component;
    if (result.error) { problems.push(`${name}: ${result.error}`); continue; }
    if (result.log?.form !== '1.4') problems.push(`${name}: component.json has no relations (not in the 1.4 form)`);
    for (const [file, entry] of Object.entries(result.files)) {
      if (entry.status !== 'identical') problems.push(`${name}/${file}: ${entry.status}${entry.differences ? ` (${entry.differences.slice(0, 3).map((d) => d.path).join(', ')})` : ''}`);
    }
    for (const field of Object.keys(result.view?.component ?? {})) {
      if (field === '$comment' || field === 'folder' || field.startsWith('x-') || TOP_FIELDS.includes(field)) continue;
      problems.push(`${name}/component.json: unknown top-level field ${field} (gate 1, §4)`);
    }
  }
  assert.deepEqual(problems, [], 'edit component.json or examples.json, then generate-component-files --write --component <name>');
});
