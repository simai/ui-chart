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
//     A page is titled in words; the element's tag and the set's state are
//     badges under the title;
//   - examples/home/showcase/index.html and index.js: the home page's
//     examples, a tab per group with the cards its home list names, each
//     chart once: the whole row (full), half of it (half, in pairs of one
//     height) or a tile (tile, three a row), from the example the entry
//     names (the component's first by default).
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

const example = (tag, folder, entry, id = 'chart') => {
  const attributes = [];
  const properties = [];
  for (const [name, value] of Object.entries(entry.settings ?? {})) {
    if (value !== null && typeof value === 'object') properties.push([name, value]);
    else if (value === true) attributes.push(` ${name}`);
    else if (value !== false && value !== null && value !== undefined) attributes.push(` ${name}="${attribute(value)}"`);
  }
  const html = `<${tag} id="${id}"${attributes.join('')}></${tag}>`;
  const lines = [
    `// ${entry.title}: the example «${entry.name}» of package/src/smart/${folder}/examples.json.`,
    `// Lists and objects are properties; the page sets them once the element is defined.`,
    ...setter(tag, id, properties),
  ];
  return {html, js: properties.length ? lines.join('\n') : null, properties};
};

const setter = (tag, id, properties) => [
  `customElements.whenDefined('${tag}').then(() => {`,
  `  const chart = document.getElementById('${id}');`,
  ...properties.map(([name, value]) => `  chart${/^[a-z][a-zA-Z0-9]*$/u.test(name) ? `.${name}` : `[${JSON.stringify(name)}]`} = ${literal(value, '  ')};`),
  '});',
];

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
const home = {panels: [], scripts: []};
const known = new Map();
// Under a page's title: the element's tag, and the component's state in the
// set's passport while it is a preview.
const passport = JSON.parse(readFileSync(resolve(site, '../package/set.json'), 'utf8'));
const BADGES = (tag) => {
  const status = passport.components.find((entry) => entry.element === tag)?.status;
  if (!status) throw new Error(`${tag}: not in package/set.json`);
  return [`:badge[${tag}]{variant=main scheme=on-surface size=1}`, ...(status === 'preview' ? [':badge[Предварительная версия]{variant=tonal scheme=warning size=1}'] : [])].join(' ');
};
config.groups.forEach((group, groupIndex) => {
  put(`content/ru/components/${group.id}/section.json`, json({schema: 'docara.section.v1', title: group.title, navigation: {order: (groupIndex + 1) * 10}}));
  overview.push(`## ${group.title}`, '', '| График | Элемент | Что показывает |', '|:---|:---|:---|');
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
    known.set(folder, {tag, group, component, shown});
    const {intro, rest} = body(folder);
    const others = group.components.filter((other) => other.folder !== folder);
    const page = [
      '---',
      `description: ${component.description}`,
      'profile: reference',
      '---',
      '',
      `# ${component.title}`,
      '',
      BADGES(tag),
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
    put(`content/ru/components/${group.id}/${folder}.page.json`, pageJson(component.title, (index + 1) * 10));
    overview.push(`| [${component.title}](${group.id}/${folder}/) | \`${tag}\` | ${component.description.replace(/^[^—]*— /u, '').replace(/\.$/u, '')} |`);
  });
  overview.push('');
});

// The home page: a tab per group, its cards in the order of its home list.
const placed = new Set();
config.groups.forEach((group, position) => {
  const cards = [];
  let halves = 0;
  for (const card of group.home) {
    const entry = known.get(card.folder);
    if (!entry) throw new Error(`${group.id}: home names an unknown component ${card.folder}`);
    if (placed.has(card.folder)) throw new Error(`${card.folder}: on the home page twice`);
    if (!['full', 'half', 'tile'].includes(card.span)) throw new Error(`${card.folder}: span ${card.span}`);
    placed.add(card.folder);
    // Halves come in pairs, so every row is full and its two cards one height.
    if (card.span === 'half') halves += 1;
    else if (halves % 2) throw new Error(`${group.id}: a half card without its pair before ${card.folder}`);
    const {tag, group: home_group, component, shown} = entry;
    const chosen = shown.find((one) => one.name === (card.example ?? shown[0].name));
    if (!chosen) throw new Error(`${card.folder}: no example «${card.example}» for the home page`);
    // A full or half card sets the chart's size itself; a tile keeps the example's.
    const settings = {...chosen.settings};
    if (card.span !== 'tile') delete settings.size;
    const id = `home-${card.folder.replace(/^chart-/u, '')}`;
    const made = example(tag, card.folder, {...chosen, settings}, id);
    cards.push([
      `      <figure class="showcase-card showcase-${card.span} m-0">`,
      '        <figcaption class="showcase-head">',
      `          <a href="/ru/components/${home_group.id}/${card.folder}/" target="_top">${component.title}</a>`,
      `          <span>${component.description.replace(/^[^—]*— /u, '').replace(/\.$/u, '')}</span>`,
      '        </figcaption>',
      `        <div class="showcase-plot">${made.html}</div>`,
      '      </figure>',
    ].join('\n'));
    if (made.properties.length) home.scripts.push(`// ${component.title}: «${chosen.name}» of package/src/smart/${card.folder}/examples.json.`, ...setter(tag, id, made.properties), '');
  }
  if (halves % 2) throw new Error(`${group.id}: a half card without its pair`);
  home.panels.push([
    `    <section slot="panel-${position}" class="flex flex-col gap-3 p-top-2" aria-label="${group.tab}">`,
    `      <p class="m-0 color-on-surface-variant">${group.lead}</p>`,
    '      <div class="showcase-grid">',
    ...cards,
    '      </div>',
    '    </section>',
  ].join('\n'));
});
const missing = [...known.keys()].filter((folder) => !placed.has(folder));
if (missing.length) throw new Error(`not on the home page: ${missing.join(', ')}`);

put('examples/home/showcase/index.html', [
  '<div class="flex flex-col gap-3" data-showcase>',
  `  <sf-tabs type="pills" scheme="link" overflow="wrap" aria-label="Графики набора" items="${config.groups.map((group) => group.tab).join('|')}">`,
  home.panels.join('\n\n'),
  '  </sf-tabs>',
  '</div>',
].join('\n'));
put('examples/home/showcase/index.js', [
  '// The home page: every chart of the set, a tab per group of',
  '// config/components.json, each with the data of one of its own examples',
  '// (written by scripts/build-pages.mjs). Lists and objects are properties,',
  '// set once the element is defined.',
  '',
  ...home.scripts,
].join('\n'));

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
