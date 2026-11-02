// Usage: node run-bench.mjs <chrome-headless-shell> <url of render-bench.html> <cpu slowdown>
// Runs render-bench.html in headless Chrome over CDP, at a given CPU slowdown.
import {spawn} from 'node:child_process';
const [chrome, url, rate = '1'] = process.argv.slice(2);
const proc = spawn(chrome, ['--headless', '--remote-debugging-port=9333', '--window-size=900,600', '--user-data-dir=' + (process.env.TMPDIR || '/tmp') + '/sf-chart-bench-profile', 'about:blank'], {stdio: 'ignore'});
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let targets;
for (let i = 0; i < 50; i++) { try { targets = await (await fetch('http://127.0.0.1:9333/json')).json(); if (targets.length) break; } catch {} await sleep(200); }
const page = targets.find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r));
let id = 0; const pending = new Map();
ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } });
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({id: i, method, params})); });
await send('Emulation.setCPUThrottlingRate', {rate: Number(rate)});
await send('Page.navigate', {url});
let out = null;
for (let i = 0; i < 900 && !out; i++) { await sleep(1000); const r = await send('Runtime.evaluate', {expression: 'window.BENCH ? JSON.stringify(window.BENCH) : null', returnByValue: true}); out = r.result?.result?.value || null; }
console.log(out || 'timeout');
ws.close(); proc.kill();
