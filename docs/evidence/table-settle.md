# Settled data table evidence

The live data page (`examples/live.html`) found that the data table of
`sf-line-chart`, `sf-bar-chart` and `sf-pie-chart` was rebuilt on every
render: every new point of a stream, and every pointer or cursor move. With
`table="hidden"` (the table only for screen readers) and 1,200 points, one
update of a line chart took 31 ms against 4.6 ms with the table folded.
Date: 2026-11-02. The pin stays `ui-2d39b617a719`.

## The fix

| Item | Where |
|---|---|
| `settled`: what a costly view shows for data that may change fast; a change after a quiet spell shows at once, a stream at most once per second, the latest data last | `components/src/smart/chart-core/settle.js` |
| `keptView`: the last table view, kept while its key (data, label, formats, language, table mode) is the same | same file |
| The three charts show the table from the settled data; the first data after none shows at once | `line-chart`, `bar-chart`, `pie-chart` (`index.js`, `js/templates/default.js`, `docs.md`) |
| Versions: line 0.2.1, bar and pie 0.1.1, core 0.2.1, all `patch` | `components/docs/chart/units.json` |

A first try used lit's `guard` directive. It pulled a copy of lit-html into
each chart (+3.3 kB gzip each), so it was replaced by `keptView`, which adds
no import.

## Measured in the browser (dev build, 1,200 points, `table="hidden"`)

| | Before | After |
|---|---|---|
| One stream update | 31.4 ms | 4.7 ms |
| One pointer move | rebuilt the table | 6.4 ms, the table kept |
| The table after the stream stops | — | the latest data within 1 s, all 1,200 rows |

## Build

ui-builder `verify-package-reproducibility.cjs` from commit `9794bcd`, over
ui-source at the pin, gave **PASS**:

- two builds are byte-identical;
- 262 files;
- output manifest sha256
  `86d1e4a57e97bfc28aaf089b1714a49f1a6b251f9f92904d90908c20bef7add3`.

The package receipt names framework `ui-2d39b617a719` and archive sha256
`2e734e41215720c4cdb0390148f8b2975d2c320ba4728b42814ad4fd93ace38b`.

On the release build: manifest probes 27/27, first paint 60 unchanged, gate
110/110 with CLS 0, browser probes 2/2. Suite 124/0 (core unit tests 19/19).

## Size

| Chart | JS, gzip | Change |
|---|---|---|
| `line-chart` | 12.3 KB | +0.4 |
| `bar-chart` | 11.3 KB | +0.4 |
| `pie-chart` | 9.5 KB | +0.4 |
| `sparkline` | 6.1 KB | — |
| `metric` | 4.1 KB | — |

Tier 1 summed with the chart core bundled into each chart is now 51.7 kB
(50.5 KiB), 1.7 kB over the 50 KB budget. The fix is chart-core code, so it
too is counted three times. A package shared module (M1 part 10) loads the
core once and takes the sum well under the budget.
