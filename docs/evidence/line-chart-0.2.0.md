# Line chart 0.2.0 evidence

`stack` on `sf-line-chart`: stacked and normalized areas, the line setting D1
names (docs/DECISIONS.md). The dispatcher gave the go on 2026-11-02 with the
M1 acceptance. Date: 2026-11-02. The pin stays `ui-2d39b617a719`.

## What was built

| Item | Where |
|---|---|
| `stack`: `none`, `stacked` (the series as layers, positive up and negative down from zero) or `normalized` (shares of the whole at each x, a 0–100 % axis) | `components/src/smart/line-chart/` |
| `bandPath` in the chart core: the band between an upper and a lower edge, per run, with shared gaps | `components/src/smart/chart-core/path.js` |
| The cursor and the tooltip of a normalized stack say the share and the value («Сайт: 50 % (42)»); the summary says the series are stacked | `line-chart/index.js`, `lang/ru.json`, `lang/en.json` |
| Two examples (`stacked`, `normalized`) with first-paint snapshots, a conformance check, a browser probe section, docs | `examples.json`, `static/`, `tests/browser/line-chart.browser.mjs`, `docs.md`, `examples/line-chart.html` |
| Versions: `smart.line-chart` and `module.chart-core` 0.2.0, `minor`, nothing for a consumer to do | `components/docs/chart/units.json` |

How a stack draws:

- A layer always fills its band, whatever `area` says. Its line is its top.
- A gap stays a gap of its layer and adds nothing to the stack, so the layers
  above it come down at that x.
- A series hidden in the legend leaves the stack; the rest stack again.
- Past two points per pixel column, the layers keep one shared set of points,
  so every band meets the layer under it with no seam.
- In forced colours a layer is its outlines (no fill); the lines keep their
  dashes.

## Build

ui-builder `verify-package-reproducibility.cjs` from commit `342eeaa`, over
ui-source at the pin, gave **PASS**:

- two builds are byte-identical;
- 262 files;
- output manifest sha256
  `935589d80e89b2867d9d15bae484f86213886f7a9a647a6f05bd32268a4c99a2`.

The package receipt names framework `ui-2d39b617a719` and archive sha256
`1362360792a34e717ac9e080cebdbbaba73515458fe749f17fd574e959ff2547`. The
release still publishes no package reference.

Sizes in gzip, minified, in kB of 1,000 bytes as in the M1 evidence:

| Chart | JS | CSS |
|---|---|---|
| `line-chart` | 11.9 KB (was 11.1) | 2.2 KB |
| `bar-chart` | 10.9 KB | 2.1 KB |
| `pie-chart` | 9.1 KB | 2.2 KB |
| `sparkline` | 6.1 KB | 0.6 KB |
| `metric` | 4.1 KB | 1.4 KB |
| **Tier 1** | **42.1 KB** | **8.5 KB** |

- Summed this way, Tier 1 is 50.6 kB, 0.6 kB over the 50 KB budget (D5 §3).
  In KiB it is 49.4.
- The sum counts the chart core once per chart, because each chart bundles
  it. The budget is the core once plus five charts. A package shared module
  (part 10 of the M1 list, ordered from the dispatcher) loads the core once
  and brings Tier 1 well under the budget.
- Until then, no Tier 1 chart grows further without taking bytes off another.

## Checks

| Check | Dev build | Release build |
|---|---|---|
| `node scripts/test.mjs` | 122 pass, 0 fail | — |
| Chart core unit tests | 17/17 (in the suite), with the band test | — |
| `passports.mjs --check` | no problems | — |
| Generator `--check` | 5/5 | — |
| Manifest probes | 27/27 | 27/27 |
| First paint `check` | 60 unchanged | 60 unchanged |
| First paint `gate` | 110/110, CLS 0 | 110/110, CLS 0 |
| Browser probes | 2/2 | 2/2 |

The new conformance check (`p7-normalized-layers`) holds three layers, a
broken layer where a value is missing, the 100 % tick and the said line
«июль 2026 г., Сайт: 50 % (42)».

The browser probe's stack section, on the release build:

- the top of a normalized stack lies on the 100 % line, and all three bands
  stay in the plot;
- 6,000 stacked points keep 3,113 shared points, and the band of the second
  layer runs back along the first layer's top exactly;
- in forced colours every layer's fill is `none`.

`examples/line-chart.html` was opened in the browser: both stacks drew, the
tooltip said each share with its value, and the axis read 0 %, 50 %, 100 %.
