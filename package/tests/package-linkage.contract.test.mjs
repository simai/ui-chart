// The package's units (standard simai.linkage 1.0.0): every file of the
// package under src/ belongs to one unit with a passport, the written
// passports match their files and hash, and every unit at its version has an
// entry in the package's unit journal (docs/chart/units.json, the
// journal-per-version requirement). scripts/passports.mjs --check holds the
// passports with ui-source's linkage.mjs; this holds the journal.
import assert from 'node:assert/strict';
import {existsSync, readFileSync, readdirSync} from 'node:fs';
import {resolve} from 'node:path';
import test from 'node:test';

const root = resolve(import.meta.dirname, '..');
const json = (path) => JSON.parse(readFileSync(resolve(root, path), 'utf8'));
const journal = json('docs/chart/units.json');
const DATE = /^\d{4}-\d{2}-\d{2}$/u;

// The package's units: its Smart components and its central passports.
const smart = readdirSync(resolve(root, 'src/smart'), {withFileTypes: true})
  .filter((entry) => entry.isDirectory() && existsSync(resolve(root, `src/smart/${entry.name}/component.json`))
    && json(`src/smart/${entry.name}/component.json`)['x-source']?.package === 'chart')
  .map((entry) => {
    const component = json(`src/smart/${entry.name}/component.json`);
    return {id: component.id, version: component.version};
  });
const modules = readdirSync(resolve(root, 'src/core/passports'))
  .filter((name) => name.endsWith('.json'))
  .map((name) => json(`src/core/passports/${name}`))
  .filter((passport) => passport.owner === 'simai/ui-chart')
  .map((passport) => ({id: passport.id, version: passport.version}));

test('the unit journal is the package journal form', () => {
  assert.equal(journal.schema, 'simai.chart.unit-journal');
  assert.equal(journal.schema_version, 1);
  for (const entry of journal.entries) {
    assert.match(entry.recorded_on, DATE, `${entry.unit} ${entry.version}: recorded_on`);
    assert.ok(['added', 'patch', 'minor', 'major'].includes(entry.change), `${entry.unit} ${entry.version}: change`);
    assert.ok(entry.summary?.length > 20, `${entry.unit} ${entry.version}: says what changed`);
    if (entry.change === 'minor' || entry.change === 'major') assert.ok(entry.consumer?.length > 10, `${entry.unit} ${entry.version}: says what a consumer does`);
  }
});

test('every package unit at its version has a journal entry', () => {
  const units = [...smart, ...modules];
  assert.ok(units.some((unit) => unit.id === 'smart.chart-line'));
  assert.ok(units.some((unit) => unit.id === 'module.chart-core'));
  const recorded = new Set(journal.entries.map((entry) => `${entry.unit}@${entry.version}`));
  assert.deepEqual(units.filter((unit) => !recorded.has(`${unit.id}@${unit.version}`)).map((unit) => `${unit.id}@${unit.version}`), []);
});
