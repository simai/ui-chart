#!/usr/bin/env node
// Usage: node examples/serve.mjs <framework distr> <package build output> [--port 4173]
//
// Serves the reference pages: this folder at /, the free Framework at
// /framework/ and the chart package at /package/.
//
// <framework distr> is the `distr` of the ui distribution at the release the
// package pins (package/framework.lock.json: ui-0c23f6a0af12, npm
// @simai-studio/ui@5.20261108.1449); <package build output> holds smart/rule.js
// and smart/chart-line/ (ui-builder's verify-package-reproducibility.cjs,
// wave-1/output/package/chart). A ui distribution also carries another
// package's rule file as smart/rule.js; this page declares only chart, so that
// file is never asked for.
import {createReadStream, existsSync, statSync} from 'node:fs';
import {createServer} from 'node:http';
import {extname, join, normalize, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const args = process.argv.slice(2);
const at = args.indexOf('--port');
const port = Number(at === -1 ? 4173 : args[at + 1]);
const [framework, built] = args.filter((value, index) => !value.startsWith('--') && (at === -1 || index !== at + 1)).map((value) => resolve(value));
if (!framework || !built) throw new Error('usage: serve.mjs <framework distr> <package build output> [--port 4173]');
if (!existsSync(join(framework, 'core', 'js', 'core.js'))) throw new Error(`no core/js/core.js under ${framework}`);
if (!existsSync(join(built, 'smart', 'rule.js'))) throw new Error(`no smart/rule.js under ${built}`);

const here = fileURLToPath(new URL('.', import.meta.url));
const mounts = [['/framework/', framework], ['/package/', built], ['/', here]];
const TYPES = {'.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff'};

// A stand-in data server for the live page: /demo/orders?period=…&group=…
// answers rows after a short delay, the same rows for the same query (a
// seeded generator), and fails on fail=1 so the page can show an error and a
// retry. It stands for the host's own endpoint; a chart never calls it.
const GROUPS = {channel: ['web', 'shop', 'partners', 'phone'], city: ['msk', 'spb', 'kzn', 'nsk', 'ekb']};
const PERIODS = {week: 7, month: 30, quarter: 13, year: 12};
const seeded = (seed) => () => {
  seed = (seed * 1103515245 + 12345) % 2147483648;
  return seed / 2147483648;
};
function orders(query) {
  const period = PERIODS[query.get('period')] ? query.get('period') : 'month';
  const group = GROUPS[query.get('group')] ? query.get('group') : 'channel';
  const random = seeded(period.length * 97 + group.length * 13);
  const count = PERIODS[period];
  const start = new Date(Date.UTC(2026, period === 'year' ? 0 : 9, 1));
  const rows = [];
  for (let index = 0; index < count; index += 1) {
    const at = new Date(start);
    if (period === 'year') at.setUTCMonth(index);
    else if (period === 'quarter') at.setUTCDate(1 + index * 7);
    else at.setUTCDate(1 + index);
    const x = period === 'year' ? at.toISOString().slice(0, 7) : at.toISOString().slice(0, 10);
    GROUPS[group].forEach((key, place) => {
      const base = (GROUPS[group].length - place) * 40;
      rows.push({x, key, orders: Math.round(base * (0.8 + random() * 0.4) * (1 + index / count / 2))});
    });
  }
  return {period, group, rows};
}

createServer((request, response) => {
  const url = new URL(request.url, 'http://localhost');
  if (url.pathname === '/demo/orders') {
    setTimeout(() => {
      if (url.searchParams.get('fail') === '1') {
        response.writeHead(503, {'content-type': 'application/json; charset=utf-8'}).end('{"error":"unavailable"}');
        return;
      }
      response.writeHead(200, {'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store'}).end(JSON.stringify(orders(url.searchParams)));
    }, 700);
    return;
  }
  const path = decodeURIComponent(url.pathname);
  const [prefix, root] = mounts.find(([mount]) => path.startsWith(mount));
  let file = normalize(join(root, path.slice(prefix.length)));
  if (!file.startsWith(root)) { response.writeHead(403).end(); return; }
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'stand.html');
  if (!existsSync(file)) { response.writeHead(404).end(); return; }
  response.writeHead(200, {'content-type': TYPES[extname(file)] ?? 'application/octet-stream', 'cache-control': 'no-store'});
  createReadStream(file).pipe(response);
}).listen(port, '127.0.0.1', () => console.log(`http://127.0.0.1:${port}/stand.html`));
