#!/usr/bin/env node
// Writes the Components section from the set itself, so the pages never drift
// from what the set ships:
//
//   - examples/components/<folder>-<name>/index.html and index.js: one live
//     example per entry of package/src/smart/<folder>/examples.json, except
//     the data states (loading, empty, error), which the Guide shows. A
//     scalar setting is an attribute in the markup; a list or an object is a
//     property the script sets once the element is defined, as a page does;
//   - content/ru/components/<group>/<folder>.md and .page.json: the page top
//     from the component's docs.md (its title replaced by the Russian one of
//     config/components.json), the examples after the introduction, and the
//     headings «Параметры» and «См. также» that scripts/build-reference.mjs
//     fills and keeps; the section.json of each group and the overview.
//
// docs.md's own list of public CSS variables is left out: the reference part
// lists them with what each sets. Run build-reference.mjs after this.
//
// Usage: node site/scripts/build-pages.mjs [--check]
import {existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const site = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const smart = resolve(site, '../package/src/smart');
const checkOnly = process.argv.includes('--check');
const config = JSON.parse(readFileSync(join(site, 'config/components.json'), 'utf8'));
const STATES = new Set(['loading', 'empty', 'error']);
const START = '## Параметры';
const END = '## См. также';

const files = new Map();
const put = (path, text) => files.set(path, text.endsWith('\n') ? text : `${text}\n`);
const json = (value) => JSON.stringify(value, null, 2);
const pageJson = (title, order) => `{"schema": "docara.page.v1", "title": "${title}", "navigation": {"order": ${order}}}`;

// A list of rows one row a line, so a long data set stays readable.
const literal = (value, indent = '  ') => {
  if (Array.isArray(value) && value.length > 3 && value.every((entry) => entry && typeof entry === 'object')) {
    return `[\n${value.map((entry) => `${indent}  ${JSON.stringify(entry)},`).join('\n')}\n${indent}]`;
  }
  return JSON.stringify(value);
};
const attribute = (value) => String(value).replace(/&/gu, '&amp;').replace(/"/gu, '&quot;');

const example = (tag, folder, entry) => {
  const attributes = [];
  const properties = [];
  for (const [name, value] of Object.entries(entry.settings ?? {})) {
    if (value !== null && typeof value === 'object') properties.push([name, value]);
    else if (value === true) attributes.push(` ${name}`);
    else if (value !== false && value !== null && value !== undefined) attributes.push(` ${name}="${attribute(value)}"`);
  }
  const id = 'chart';
  const html = `<${tag} id="${id}"${attributes.join('')}></${tag}>`;
  const lines = [
    `// ${entry.title}: the example «${entry.name}» of package/src/smart/${folder}/examples.json.`,
    `// Lists and objects are properties; the page sets them once the element is defined.`,
    `customElements.whenDefined('${tag}').then(() => {`,
    `  const chart = document.getElementById('${id}');`,
    ...properties.map(([name, value]) => `  chart${/^[a-z][a-zA-Z0-9]*$/u.test(name) ? `.${name}` : `[${JSON.stringify(name)}]`} = ${literal(value)};`),
    '});',
  ];
  return {html, js: properties.length ? lines.join('\n') : null};
};

// docs.md without its title and without its own list of CSS variables.
const body = (folder) => {
  const text = readFileSync(join(smart, folder, 'docs.md'), 'utf8').replace(/\r\n/gu, '\n');
  const lines = text.split('\n');
  const start = lines.findIndex((line) => line.startsWith('# '));
  const sections = [];
  let current = {heading: null, lines: []};
  for (const line of lines.slice(start + 1)) {
    if (line.startsWith('## ')) {
      sections.push(current);
      current = {heading: line, lines: []};
    } else current.lines.push(line);
  }
  sections.push(current);
  const kept = sections.filter((section) => !section.heading || !/^## (Переменные CSS|Публичные переменные)/u.test(section.heading));
  const intro = kept.shift().lines.join('\n').trim();
  const rest = kept.map((section) => `${section.heading}\n${section.lines.join('\n').trimEnd()}`).join('\n\n').trim();
  return {intro, rest};
};

const examplesDirectory = join(site, 'examples/components');
const contentDirectory = join(site, 'content/ru/components');
const overview = [];
config.groups.forEach((group, groupIndex) => {
  put(`content/ru/components/${group.id}/section.json`, json({schema: 'docara.section.v1', title: group.title, navigation: {order: (groupIndex + 1) * 10}}));
  overview.push(`## ${group.title}`, '', '| Компонент | Что показывает |', '|:---|:---|');
  group.components.forEach((component, index) => {
    const {folder} = component;
    const manifest = JSON.parse(readFileSync(join(smart, folder, 'component.json'), 'utf8'));
    const tag = manifest.tag;
    const {examples} = JSON.parse(readFileSync(join(smart, folder, 'examples.json'), 'utf8'));
    const shown = examples.filter((entry) => !STATES.has(entry.name));
    const blocks = [];
    for (const entry of shown) {
      const id = `${folder}-${entry.name}`;
      const {html, js} = example(tag, folder, entry);
      put(`examples/components/${id}/index.html`, html);
      if (js) put(`examples/components/${id}/index.js`, js);
      blocks.push(`### ${entry.title}`, '', `:::example {id="components/${id}" label="${attribute(entry.title)}"}`, ':::', '');
    }
    const {intro, rest} = body(folder);
    const others = group.components.filter((other) => other.folder !== folder);
    const page = [
      '---',
      `description: ${component.description}`,
      'profile: reference',
      '---',
      '',
      `# ${component.title} ${tag}`,
      '',
      intro,
      '',
      '## Примеры',
      '',
      ...blocks,
      rest,
      '',
      START,
      '',
      END,
      '',
      ...others.map((other) => `- [${other.title}](../${other.folder}/)`),
      '- [Подключение](/ru/guide/connection/)',
      '',
    ].join('\n');
    put(`content/ru/components/${group.id}/${folder}.md`, page);
    put(`content/ru/components/${group.id}/${folder}.page.json`, pageJson(tag, (index + 1) * 10));
    overview.push(`| [${component.title}](${group.id}/${folder}/) \`${tag}\` | ${component.description.replace(/^[^—]*— /u, '').replace(/\.$/u, '')} |`);
  });
  overview.push('');
});

// The overview's table of components, between its markers.
const OPEN = '<!-- components:generated -->';
const CLOSE = '<!-- /components:generated -->';
const index = readFileSync(join(contentDirectory, 'index.md'), 'utf8');
const from = index.indexOf(OPEN);
const to = index.indexOf(CLOSE);
if (from < 0 || to < from) throw new Error('content/ru/components/index.md: needs the markers of the generated table');
put('content/ru/components/index.md', `${index.slice(0, from + OPEN.length)}\n\n${overview.join('\n').trim()}\n\n${index.slice(to)}`);

const generated = new Set(files.keys());
// A page's reference part is written by build-reference.mjs: keep it.
for (const path of generated) {
  if (!path.endsWith('.md')) continue;
  const old = existsSync(join(site, path)) ? readFileSync(join(site, path), 'utf8') : '';
  const from = old.indexOf(`\n${START}\n`);
  const to = old.indexOf(`\n${END}\n`);
  if (from < 0 || to < from) continue;
  const text = files.get(path);
  const at = text.indexOf(`\n${START}\n`);
  const end = text.indexOf(`\n${END}\n`);
  files.set(path, `${text.slice(0, at + 1)}${old.slice(from + 1, to + 1)}${text.slice(end + 1)}`);
}

// What was generated before and is not now goes.
const stale = [];
const walk = (directory, prefix) => (existsSync(directory) ? readdirSync(directory, {withFileTypes: true}) : []).flatMap((entry) => (entry.isDirectory()
  ? walk(join(directory, entry.name), `${prefix}${entry.name}/`) : [`${prefix}${entry.name}`]));
for (const path of walk(examplesDirectory, 'examples/components/')) if (!generated.has(path)) stale.push(path);
for (const path of walk(contentDirectory, 'content/ru/components/')) {
  if (/^content\/ru\/components\/(index\.page\.json|section\.json)$/u.test(path)) continue;
  if (!generated.has(path)) stale.push(path);
}

const changed = [...files].filter(([path, text]) => !existsSync(join(site, path)) || readFileSync(join(site, path), 'utf8') !== text).map(([path]) => path);
if (!checkOnly) {
  for (const path of stale) rmSync(join(site, path));
  for (const path of changed) {
    mkdirSync(dirname(join(site, path)), {recursive: true});
    writeFileSync(join(site, path), files.get(path));
  }
}
console.log(JSON.stringify({pages: config.groups.reduce((sum, group) => sum + group.components.length, 0), files: files.size, changed: changed.length, removed: stale.length}));
if (checkOnly && (changed.length || stale.length)) process.exit(1);
