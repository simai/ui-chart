#!/usr/bin/env node
// Usage: node scripts/passports.mjs --write|--check [--overlay <directory>]
//
// The package's unit passports (standard simai.linkage 1.0.0), with ui-source's
// own scripts/linkage.mjs at the pinned revision, from the overlay: the units
// are read from the overlay's src/ (ui-source with this package laid over it),
// so a package unit's dependencies on the free units are found as the free
// ones' are.
//
// - a Smart component (src/smart/<folder>/component.json) is smart.<folder>,
//   its passport derived from component.json: nothing to write;
// - the chart core (src/smart/chart-core, a helper folder) keeps a central
//   passport, src/core/passports/module.chart-core.json, as ui-source's
//   helper modules do.
//
// The owner comes from linkage itself since ui-0c23f6a0af12: a Smart
// component's from its component.json x-source.package (chart ->
// simai/ui-chart), the core's from its written passport.
//
// --write refreshes this package's written passports (files, hash,
// dependencies; never the version, which a person moves); --check fails when
// a package unit has a problem or a package file belongs to no unit. Both
// print the package units as an inventory would list them.
import {readdirSync, readFileSync, statSync, writeFileSync, existsSync} from 'node:fs';
import {join, relative, resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {PACKAGE_ROOT, materializeOverlay} from './overlay.mjs';

const args = process.argv.slice(2);
const at = args.indexOf('--overlay');
const overlay = resolve(at === -1 ? join(PACKAGE_ROOT, '.overlay') : args[at + 1]);
const write = args.includes('--write');
if (!write && !args.includes('--check')) throw new Error('usage: passports.mjs --write|--check [--overlay <directory>]');
if (!existsSync(overlay)) materializeOverlay(overlay);
const linkage = await import(pathToFileURL(join(overlay, 'scripts', 'linkage.mjs')).href);

const walk = (root, directory = root) => readdirSync(directory).flatMap((name) => {
  const path = join(directory, name);
  return statSync(path).isDirectory() ? walk(root, path) : [relative(root, path).split('\\').join('/')];
});
const own = new Set(walk(PACKAGE_ROOT, join(PACKAGE_ROOT, 'src')));
const readTree = () => new Map(walk(overlay, join(overlay, 'src')).map((file) => [file, own.has(file) ? readFileSync(join(PACKAGE_ROOT, file)) : readFileSync(join(overlay, file))]));

const collect = () => {
  const collected = linkage.collectUnits(readTree());
  const mine = collected.units.filter((unit) => unit.includes.some((include) => [...own].some((file) => file.startsWith(include)))
    && (unit.kind === 'smart' ? own.has(unit.passportFile) : own.has(unit.passportFile) || unit.passportFile.endsWith('module.chart-core.json')));
  return {collected, mine};
};

if (write) {
  let {collected, mine} = collect();
  const byId = new Map(collected.units.map((unit) => [unit.id, unit]));
  for (const unit of mine.filter((one) => one.written)) {
    const passport = linkage.passportFor(unit, byId);
    if (!passport.summary) passport.summary = 'The SIMAI Chart core: data, scales, formats, paths, decimation, the words and the keyboard cursor every chart shares.';
    writeFileSync(join(PACKAGE_ROOT, unit.passportFile), `${JSON.stringify(passport, null, 2)}\n`);
  }
  ({collected, mine} = collect());
}

const {collected, mine} = collect();
const ids = new Set(mine.map((unit) => unit.id));
const problems = linkage.checkPassports(collected).filter((problem) => ids.has(problem.id) || [...own].some((file) => problem.message?.includes(file)));
// Every file of this package under src/ belongs to exactly one package unit
// (a central passport is the unit's record, as ui-source's are core.runtime's).
const claimed = new Set(mine.flatMap((unit) => unit.files ?? []));
for (const file of own) if (!claimed.has(file) && !mine.some((unit) => unit.passportFile === file)) problems.push({id: file, code: 'unclaimed', message: `${file} belongs to no unit`});
const units = mine.map((unit) => ({id: unit.id, version: unit.passport?.version, owner: unit.passport?.owner, content_sha256: unit.content_sha256, files: unit.files?.length}));
console.log(JSON.stringify({units, problems}, null, 1));
if (problems.length) process.exitCode = 1;
