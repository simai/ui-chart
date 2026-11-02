# Heatmap 0.1.0: evidence

On 2026-11-03 the owner chose «Heatmap» as the next chart. `sf-chart-heatmap`
shows one value over two categories as a grid of cells. Its colour scale is
the decision D8 (`docs/DECISIONS.md`), taken by the recommendation under
the owner's delegation.

## What it is

- **Data.** `items` holds a record per cell. `x`, `y` and `value` name the
  fields; they default to the first, the second and the first numeric one.
  Rows and columns keep the order the data first give them. A missing pair
  or an empty value is a gap: an outlined empty cell, not zero.
- **Scale** (`chart-core/heat.js`).
  - 3 to 9 steps of equal width, 5 by default.
  - `scale="sequential"` draws in one role family (`scheme`).
  - `scale="diverging"` draws two families around a neutral `middle`, even
    on both sides, with an odd number of steps. `better` says which side is
    good.
  - A step is a `light-dark()` pair of the family's tones. Tone 50 is
    skipped, so a value written in a cell keeps 4.5:1 on every step.
- **Reading.**
  - The value is written in a cell where it fits.
  - Long row names are cut with an ellipsis. Tight column names are
    thinned.
  - There is a scale legend (with a gap item when there are gaps), a
    tooltip, a summary in words and the table, rows by columns.
- **Keyboard.** The grid is one Tab stop. The arrows walk the cells, Home
  and End go along a row, and Ctrl+Home/End go to the corners. Every move
  is said. Enter and Space select (`select {x, y, value}`); Escape clears.
- **First paint.**
  - The plot's height is the rows' count in a style times the rung's cell,
    so it holds before the width is measured.
  - The steps' colours are set once on the grid, and a cell only names its
    step.
  - The examples with more than 8 KB of cells declare their first-paint
    size, with the reason.
- **Forced colours.** A cell is an outline with its value.

## Fixed during the work

- The scale method had the same name as the `scale` setting. The diverging
  scale did not turn on. The method is now `scaleSteps`.
- A plot height in px is a measured size to the snapshot tool, which drops
  it. The first paint then moved by up to 112 px. The height now comes from
  the rows' count and the sheet, and CLS is 0.
- The legend swatches' outline was an inset shadow, which the focus-ring
  rule forbids. It is a border now.
- `scheme` lists role names (`success`, `error` …), which the public API
  axes rule reads as a status. It is the colour of the data, so it is
  pending in `tests/package-public-api-axes.contract.test.mjs` with that
  reason, beside `data-state`.

## Checks

Unit tests (`tests/chart-core.test.mjs`) cover the step count, the bounds
(a diverging scale even around its middle), the step of a value and a gap,
and the colours of both scales.

Manifest probes (`examples.json`, page `conformance`), all four pass:

- p1: a figure named by its label, with a cell per pair and a legend step
  per scale step;
- p2: the keyboard and the live line;
- p3: a diverging scale `-6 – -3,6 … 3,6 – 6` with two gaps, said in the
  summary and the table;
- p4: the error state offers a retry that sends `refresh`.

Browser (`tests/browser/tier-one.browser.mjs`, block 3c), on 3 rows × 10
hours:

| Case | Result |
|---|---|
| Height, light and dark, 375 and 1280 px | ½: 81 px, 1: 106 px, 2: 132 px, each its rows' sum; 30 cells; nothing leaves the plot |
| Values written, light | 30 of 30; the lowest ink contrast is 5.45:1 |
| Values written, dark | 30 of 30; the lowest ink contrast is 5.72:1 |
| Strongest against weakest step, vs the page | light 11.19 vs 1.30; dark 12.83 vs 1.44 |
| Diverging, light | `better="up"`: low `rgb(126, 0, 7)`, middle `rgb(227, 226, 231)`, high `rgb(0, 70, 11)`; `down` swaps the sides |
| Diverging, dark | middle `rgb(58, 59, 64)`; `down` swaps the sides |
| Keyboard | Tab after the table button; «Пн, 9:00: 32» → «Пн, 10:00: 44» → Down «Вт, 10:00: 46» → End «Вт, 18:00: 27» → Ctrl+End «Ср, 18:00: 24»; Enter selects `{x: '18:00', y: 'wed', value: 24}`; Escape clears |
| Forced colours | one system fill, a black outline, all 30 values |

## Build

ui-builder `verify-package-reproducibility.cjs` ran from commit `2154a03`
over ui-source at the pin. The result was **PASS**:

- two builds are byte-identical;
- 414 files;
- the output manifest sha256 is
  `e30fa7b9f88b310cdbb10a38865ec66e7caf7ae8e9859666f7a6dbf5887b1a62`.

The package receipt names framework `ui-2d39b617a719`. The archive sha256 is
`d6c221c26ec6ad3638665fae94ce5431520011075a40a903b9d97151a16e399f`.

| Check | Result |
|---|---|
| Manifest probes | 37/37 |
| First paint | 108 unchanged, 7 components, 60 examples |
| First-paint gate | 202/202, CLS 0 |
| Browser probes | 2/2 |
| Suite | 127/0 |

## Size

`chart-heatmap` is 8.6 KB of JS and 2.3 KB of CSS, gzip (minified). The
other charts are unchanged.

## Next

The Framework has released pair `ui-de2b4437234a` with
`--sf-chart-midpoint`. When the pin moves to that pair, the diverging
middle takes that role instead of `neutral-90` / `neutral-25`.
