# Bar 0.5.0 (histogram): evidence

The histogram is the fourth chart of the owner's M2 plan
(`docs/DECISIONS.md` D9, the owner's «Да, гистограмму» of 2026-11-03). It is
the `bin` setting of `sf-chart-bar`, not a tag of its own, as the plan said.
Its form was decided by the recommendation under the owner's delegation and
is recorded in D9.

## What it is

- **Data** (`chart-core/bin.js`).
  - Each row of `items` is one observation; `x` is the measure (the first
    numeric field when unset). A row without it is left out and counted.
  - `bin="auto"` cuts the measure into about Sturges' count of intervals
    on a round width (1, 2, 2.5 or 5 times a power of ten). A number is the
    width. The edges fall on multiples of the width.
  - An interval holds its start and not its end; the last holds both, so
    the largest value is counted.
  - A bar is the count of its interval's rows, or, with `y`, the sum of
    that weight. `series` splits the rows, and `stack` stacks them.
- **Form.**
  - The bars touch, since x is a measure; the surface rim of a bar keeps
    them apart by a hairline.
  - The axis is marked at the intervals' edges, as many as fit, in
    `x-format` (a number format, `number` when auto).
  - A count axis steps by whole numbers: the nearest count of ticks whose
    step is whole is taken, so 2.5 never reads 3, 5, 8.
  - `sort` does not apply.
- **Reading.** The summary says the count of values, their range, the
  count and width of the intervals, then each series' median and its
  fullest interval. The tooltip, the live line and the table name an
  interval as «10 – 20».

## Fixed during the work

- **The count axis stepped by 2.5.** With integer format its ticks read
  0, 3, 5, 8, 10. The axis of a count now takes the nearest count of ticks
  whose step is whole, so it reads 0, 2, 4, 6, 8, 10.
- **The stand showed an old package.** The browser kept the package's
  `examples.json` from before the rebuild. The stand now reads it afresh.

## Checks

Unit tests (`tests/chart-core.test.mjs`) cover:

- the edges: the auto width, a given width, the largest value on an edge,
  one value;
- the place of a value at each edge and outside, and the median;
- counts per interval and series, a sum of a weight, the left-out rows,
  the default measure, no rows.

Manifest probe **p8** (`examples.json`, page `conformance`) passes, with the
seven bar probes before it:

- 30 delivery times give seven touching bars;
- the axis reads «0|10|20|30|40|50|60|70» and the counts step by whole
  numbers;
- the summary reads «Значений: 30, от 5 до 61; интервалов: 7, шириной 10.
  Количество: медиана 21,5, больше всего — 10 – 20 (10).»;
- Right says «0 – 10, Количество: 3», then «10 – 20, Количество: 10».

Browser (`tests/browser/tier-one.browser.mjs`, block 3g), light and dark,
at 375 and 1280 px:

| Rung | Plot | Bars | Largest seam |
|---|---|---|---|
| ½ | 160 px | 7, nothing leaves the plot | 0.1 px |
| 1 | 240 px | 7, nothing leaves the plot | 0.1 px |
| 2 | 384 px | 7, nothing leaves the plot | 0.1 px |

The 1,000 stacked categories of block 4 still draw in 49 ms at 4x CPU.

The stand was also checked by eye: the counted histogram and the one by
warehouse, stacked, with the edges and whole steps on the axes. The
ordinary bar examples draw as before.

## Build

ui-builder `verify-package-reproducibility.cjs` ran from commit `6ae6a5c`
over ui-source `5776ff08`, the pin. The result was **PASS**:

- two builds are byte-identical;
- 598 files, up from 590 with the histogram's examples;
- the output manifest sha256 is
  `693f97fdd82c0a9a36b6160525dd91900df4758fd2918b17047f2673bfb8bab9`.

The package receipt names framework `ui-de2b4437234a`. The archive sha256 is
`860811ffb536331b7b69f1b6a82c62c558fe3cce27d59358dd353a04f1dc90fd`.

| Check | Result |
|---|---|
| Manifest probes | 50/50 |
| First paint | 158 unchanged |
| First-paint gate | 296/296, CLS 0 |
| Browser probes | 2/2 |
| Suite | 135/0 |

## Size

`chart-bar` is 15.3 KB of JS (13.9 KB before) and 2.3 KB of CSS, gzip
(minified). The other charts are unchanged.

## Next

No new tag, so no name for the dispatcher. The next chart of M2 is
`sf-chart-box`.
