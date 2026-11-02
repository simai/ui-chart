#!/usr/bin/env node
// Usage: node examples/serve.mjs <framework distr> <package build output> [--port 4173]
//
// Serves the reference pages: this folder at /, the free Framework at
// /framework/ and the chart package at /package/.
//
// <framework distr> is the `distr` of the ui distribution at the release the
// package pins (components/framework.lock.json: ui-2d39b617a719, npm
// @simai-studio/ui@5.20261102.1106); <package build output> holds smart/rule.js
// and smart/line-chart/ (ui-builder's verify-package-reproducibility.cjs,
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

createServer((request, response) => {
  const path = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  const [prefix, root] = mounts.find(([mount]) => path.startsWith(mount));
  let file = normalize(join(root, path.slice(prefix.length)));
  if (!file.startsWith(root)) { response.writeHead(403).end(); return; }
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'line-chart.html');
  if (!existsSync(file)) { response.writeHead(404).end(); return; }
  response.writeHead(200, {'content-type': TYPES[extname(file)] ?? 'application/octet-stream', 'cache-control': 'no-store'});
  createReadStream(file).pipe(response);
}).listen(port, '127.0.0.1', () => console.log(`http://127.0.0.1:${port}/line-chart.html`));
