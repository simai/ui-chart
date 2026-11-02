# sf-chart-bar 0.2.0 evidence

`sf-chart-bar` now draws chosen series as lines over the bars: a plan over
the facts, or a margin over the revenue. The owner chose to make this a
setting of the bar chart, not a tag of its own, on 2026-11-02
(`docs/DECISIONS.md` D2). Date: 2026-11-02. The pin stays `ui-2d39b617a719`.

## What changed

| Item | Where |
|---|---|
| `lines`: the series named here are lines with points, never stacked, drawn through the middles of the bands and broken at a gap (chart-core `linePath`) | `components/src/smart/chart-bar/index.js`, `js/templates/default.js` |
| `line-axis`: `shared` (the bars' axis, widened for the lines) or `own` (a scale of their own, not from zero, its ticks on the far side); a normalized stack always gives the lines their own scale | same |
| `line-format`: the lines' values in the ticks, the tooltip, the live line, the summary and the table | same |
| The summary names the line series («Линией: План.») | `lang/ru.json`, `lang/en.json` |
| The cursor walks onto a line with Down, as onto any series; the pointer takes a line's point near it over the bar under it; `select` carries the point | `index.js` |
| The legend draws a line's swatch as a line with a point; forced colours keep each line's stroke and dash | `default.css` |
| Two examples (`lines`, `own-axis`) and conformance check `p7-lines-own-axis` | `examples.json` |
| Journal: `smart.chart-bar` 0.2.0 `minor`; nothing to do for a chart without `lines` | `components/docs/chart/units.json` |

Lines are drawn on vertical bars only. A horizontal chart draws every series
as bars.

## Checks

The conformance check `p7-lines-own-axis` covers:

- one line over four bars;
- right-hand ticks in percent;
- the summary «Линией: Маржа.» and «Маржа: наибольшее 24 % (IV кв.)»;
- the table cell «18 %»;
- the keyboard: «I кв., Выручка: 1 200», then on Down «I кв., Маржа: 18 %» with the focus ring on the point;
- Enter sends `select` `{series: margin, x: I кв., value: 0.18}`.

The Tier 1 browser probe adds forced colours. The line keeps its stroke and
its dash, it has one point per value with a gap left empty, and the bars of
the other series stay bars.

On the stand, the `lines` example said «Фев, План: 180». Its tooltip listed
Факт 176 and План 180.

## Build

ui-builder `verify-package-reproducibility.cjs` from commit `dc6b04a`, over
ui-source at the pin, gave **PASS**:

- two builds are byte-identical;
- 322 files;
- output manifest sha256
  `86da02ff42dc0567edcaeccd798a9bc19ebb358dbd5008f91559d862058ddafe`.

The package receipt names framework `ui-2d39b617a719` and archive sha256
`e553fd975b5e6b34239d6ee172073fa991735b02161f69ae1e7eb873f455eb5a`.

Checks on the release build:

| Check | Result |
|---|---|
| Manifest probes | 33/33 |
| First paint | 76 unchanged |
| First-paint gate | 140/140, CLS 0 |
| Browser probes | 2/2 |
| Suite | 124/0 |

## Size

| Chart | JS, gzip | Change |
|---|---|---|
| `chart-bar` | 12.5 KB | +1.2 |

About half of the growth is chart-core's `linePath`, now bundled into the
bar chart as well. The Tier 1 sum rises to about 52.9 kB, 2.9 kB over the
50 KB budget. As before, the cause is the core copied into each chart, and a
shared package module (M1 part 10) loads it once.
