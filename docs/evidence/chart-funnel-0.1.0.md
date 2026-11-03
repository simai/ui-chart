# Funnel 0.1.0: evidence

On 2026-11-03 the owner approved the M2 plan and chose the funnel as its
first chart (`docs/DECISIONS.md` D9). `sf-chart-funnel` shows the stages of a
process, each a subset of the last, with the conversion between them. Its
form was decided by the recommendation under the owner's delegation.

## What it is

- **Data.** `items` holds a record per stage, in the order of the process.
  `stage` and `value` name the fields; they default to the first and the
  first numeric one. The stages are never sorted. A stage with no value is
  a gap: it has an outlined empty track and no bar, and no conversion is
  worked out across it.
- **Conversions** (`chart-core/funnel.js`).
  - Each stage has its share of the widest stage, which is the bar's
    length.
  - It has its conversion from the stage before and from the first.
  - The worst step is the one with the lowest conversion from the stage
    before.
  - A stage wider than the one before is drawn as given, and the summary
    says the stages are not nested.
- **Form.**
  - One row per stage: name, bar, value and share.
  - The bars start at one edge (`align="start"`), or are centred
    (`center`).
  - Every bar is one colour (`color`, or `--sf-chart-funnel-color`).
  - `conversion` picks the share written beside a stage: of the previous
    stage (the default), of the first, or none.
  - Below 30rem of width, the name stands over the bar.
- **Reading.**
  - The tooltip says the value and both shares.
  - The summary gives the stages' count, the range, the overall conversion,
    the largest loss and the gaps.
  - The table has four columns: stage, value, of the previous, of the
    first.
- **Keyboard.** The stages are one Tab stop. Down and Right go to the next
  stage, Up and Left back, Home and End to the ends. Every move is said
  with both shares. Enter and Space select (`select {series, index, x,
  value}`); Escape clears.
- **First paint.** A stage is a row of the rung's height, and a bar's
  length is a unitless share in a style. Nothing is measured, so the first
  paint is the drawn funnel. Every example fits in 8 KB.
- **Forced colours.** The bars are solid in the system colour. The current
  stage is the selection colour.

## Checks

Unit tests (`tests/chart-core.test.mjs`) cover:

- the shares and both conversions;
- the overall conversion and the worst step;
- a gap, which breaks the conversion across it;
- a stage wider than the one before;
- one stage, and no stages.

Manifest probes (`examples.json`, page `conformance`), all four pass:

- **p1:** a figure named by its label. The summary reads «Этапов: 5, от
  12 400 до 860, итоговая конверсия 6,9 %. Больше всего теряется между
  «Каталог» и «Корзина»: дальше проходит 37,2 %.» The shares written are
  62,9 / 37,2 / 44,8 / 66,2 %, and the bars shorten stage by stage.
- **p2:** the keyboard and the live line; Enter selects
  `{x: 'paid', value: 860}`.
- **p3:** a gap. It has no bar and an outlined track, and the summary
  says «Нет данных: 1». The table keeps every row; the stage after the gap
  has no share of the previous stage and 26,9 % of the first.
- **p4:** the error state offers a retry that sends `refresh`.

Browser (`tests/browser/tier-one.browser.mjs`, block 3d), on the five stages
of an order:

| Case | Result |
|---|---|
| Height, light and dark, 1280 px (one row per stage) | ½: 108 px, 1: 156 px, 2: 204 px, each 5 rows and 4 gaps of the rung |
| Height, light and dark, 375 px (the name over the bar) | ½: 198 px, 1: 256 px, 2: 334 px, each 5 × (name line + row + gap) + 4 gaps |
| Bars | five on every rung and width, each shorter than the one before; nothing leaves the plot or the page |
| Bars against the page | light 4.49:1, dark 5.98:1 (3:1 required) |
| Keyboard | Tab after the table button; Down «Визиты: 12 400» → Right «Каталог: 7 800, 62,9 % от предыдущего, 62,9 % от первого» → Up back → End «Оплата: 860, 66,2 % от предыдущего, 6,9 % от первого»; Enter selects `{series: 'people', index: 4, x: 'paid', value: 860}`; the tooltip says the same; Escape clears; Tab leaves |
| Forced colours | every bar solid `rgb(0, 0, 0)` |

The stand (`examples/stand.html`) was also checked by eye in both themes, at
the desktop width and at 375 px, for each example. The centred form, the
gap and the tooltip under the current stage all looked right.

## Build

ui-builder `verify-package-reproducibility.cjs` ran from commit `c3fcca0`
over ui-source `5776ff08`, the pin. The result was **PASS**:

- two builds are byte-identical;
- 474 files, up from 414 with the funnel;
- the output manifest sha256 is
  `7ec280a99203a955dce72e9067f2aa541b8989906f2c0c50624f39c4a0fc7fad`.

The package receipt names framework `ui-de2b4437234a`. The archive sha256 is
`49a321d40042fb00d0b14df93fe3226ccc7daddde31ee9501d3aaf64b5faab24`.

| Check | Result |
|---|---|
| Manifest probes | 41/41 |
| First paint | 124 unchanged |
| First-paint gate | 232/232, CLS 0 |
| Browser probes | 2/2 |
| Suite | 128/0 |

## Size

`chart-funnel` is 9.0 KB of JS and 2.2 KB of CSS, gzip (minified). The other
charts are unchanged.

## Next

The name `sf-chart-funnel` was sent to the dispatcher on 2026-11-03 (bus
`msg-4cfcede95306440599ec`) to add to the reserved names. The next chart of
M2 is `sf-chart-gauge`.

The dispatcher reserved the name in ui-control
`control/decisions/2026-11-02-ui-chart-package.md` (`45f8f54`), checked
free in ui-source and ui-pro (bus `msg-318d347af7844dac9310`). It enters the registry with
the package's first release.
