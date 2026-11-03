# Waterfall 0.1.0: evidence

`sf-chart-waterfall` is the chart after the candlestick. The owner chose
«Каскадный график» on 2026-11-04. It shows how a start value becomes an end
value through positive and negative steps, for example a profit bridge. Its
form was decided by the recommendation under the owner's delegation and is
recorded in `docs/DECISIONS.md` D11.

## What it is

- **Own tag.** The research catalogue had proposed an `accumulate` setting
  on `sf-chart-bar`. The waterfall became a component of its own:
  - its colours go by direction, not by series;
  - it has total rows, lines joining the bars, and a closing total;
  - the bar's series, `stack`, `bin`, `sort` and `lines` would each need a
    rule on it.

  The catalogue now points to D11.
- **Data** (`chart-core/waterfall.js`).
  - One row per step, in the data's order. `x` names the step and `y` gives
    its value. Both default as on the bar chart.
  - A row whose `total` field is true, `1`, «yes» or «да» is a total and
    stands on zero:
    - without a value, it shows the running total;
    - with a value, the running total starts again from it, as an opening
      balance does.
  - A change without a value is left out and counted.
  - A closing total, «Итого», is added unless the last row is a total.
    `end="none"` leaves it out.
- **Form.**
  - A change floats from the running total to the new one.
  - A thin line joins each bar's end to the next bar.
  - The value axis always takes zero in.
  - Colours:
    - a rise is in the `success` tone, a fall in `error` and a total in
      `neutral`;
    - `colors {up, down, total}` sets a page's own.
  - Each bar's value is written on it: a change with its sign, a total as
    it is. The values are drawn only when every one fits its band.
  - Step names are cut to their band with an ellipsis. A name is skipped
    when it would touch its neighbour.
- **Reading.**
  - The summary gives:
    - the count of changes;
    - the start and the end, with the change between them;
    - the step that added most and the one that took away most;
    - how many rose and fell.
  - The tooltip names the step, its change and the total it reaches.
  - The table has a row per step with its change and its total.
- **Keyboard.**
  - The plot is one Tab stop; the legend is a plain list, not a stop.
  - Left and Right go step by step. Up and Down stay put.
  - Home, End, Page Up and Page Down jump.
  - Every move is said: «Новые клиенты: +240, итог 1 060» for a change,
    «Итого: 1 000» for a total.
  - Enter and Space select (`select {index, row, x, kind, value, total}`).
  - Escape clears.
- **Forced colours.** All bars are the system colour. A rise is hollow, a
  fall filled and a total dashed.

## Fixed during the work

- **Step names ran into each other.** The label width was estimated with
  the digits' width, but a Cyrillic letter is about 0.7 of the font. A
  letter is now taken as 0.72 of the font, and «Выручка 2025» is cut to fit
  its band.
- **A total was said «Итого: итог 1 000».** It is now «Итого: 1 000».

## Checks

Unit test (`tests/chart-core.test.mjs`): steps from total to total and
change by change, a missing value, a total with and without a value, the
closing total, the extent with zero in it, and what marks a total. The core
suite now passes 38.

Manifest probes (`examples.json`, page `conformance`), all four pass:

- **p1:** a figure named by its label, and the plot a group «каскадный
  график».
  - Seven bars: three rises, two falls and two totals, the closing one
    added.
  - One joining path and three legend items.
  - The values read «820|+240|+95|−130|−60|+35|1 000».
  - The summary reads:

    > «Шагов: 5, от 820 до 1 000: +180 (+22 %). Больше всего прибавил шаг
    > «Новые клиенты»: +240. Больше всего убавил шаг «Отток»: −130. Шагов
    > роста: 3, снижения: 2.»
- **p2:** the keyboard.
  - Right says «Выручка 2025: 820», then «Новые клиенты: +240, итог
    1 060».
  - End says «Итого: 1 000» and draws one ring.
  - Enter selects `{index: 6, row: -1, kind: 'total', total: 1000, x:
    'Итого'}`.
  - Escape clears.
- **p3:** a subtotal.
  - «Валовая прибыль» has no value. Its bar and both other totals stand on
    the zero line.
  - The hidden table's head is «Статья|Изменение|Итог».
  - Its rows include «Валовая прибыль||560», «Маркетинг|−180|380» and
    «Итого||120».
- **p4:** the error state offers a retry that sends `refresh`.

Browser (`tests/browser/tier-one.browser.mjs`, block 3k):

| Case | Result |
|---|---|
| Plot, light and dark, 375 and 1280 px | Heights are ½: 160 px, 1: 240 px and 2: 384 px. Seven bars on each; every bar and text stays inside the plot, and the page does not scroll sideways. The values are drawn where they fit, which excludes rung 2 at 375 px |
| Bars against the page | Rise, fall and total are light 4.46, 4.46 and 4.47:1, dark 5.97, 5.95 and 5.95:1 (3:1 required), each in a tone of its own |
| Keyboard | Tab lands on the plot after the table button. Right and Right are said, Down stays, and End says «Итого: 1 000». Enter selects index 6, a total of 1000. The tooltip reads «Итого Итог 1 000». Escape clears and Tab leaves |
| Pointer | Over the first fall the tooltip reads «Отток Изменение −130 Итог 1 025» |
| Forced colours | All strokes are `rgb(0, 0, 0)`. The rise is filled `rgb(255, 255, 255)`, the fall `rgb(0, 0, 0)`, and the total is filled `rgb(255, 255, 255)` with a `4px, 2px` dash |

The stand was also checked by eye in the dark theme at 760 px:

- the revenue bridge;
- the profit statement with a subtotal;
- the page's own colours.

## Build

ui-builder `verify-package-reproducibility.cjs` ran from commit `17a2f9b`
over ui-source `5776ff08`, the pin. The result was **PASS**:

- two builds are byte-identical;
- 826 files, up from 774 with the waterfall;
- the output manifest sha256 is
  `1ea8760c7a58ac9a1870d3d41afdd526f8b11455203bb3319112d20fddc59678`.

The package receipt names framework `ui-de2b4437234a`. The archive sha256 is
`027b24e091c8532aba5299599a86848c3d05157dbc486f608f7084ac39902c99`.

| Check | Result |
|---|---|
| Manifest probes | 68/68 |
| First paint | 216 unchanged; the reference example is 6.4 KB |
| First-paint gate | 404/404, CLS 0 |
| Browser probes | 2/2 |
| Suite | 142/0 |

## Size

`chart-waterfall` is 10.2 KB of JS and 2.0 KB of CSS, gzip (minified). The
other charts are unchanged.

## Next

The name `sf-chart-waterfall` was sent to the dispatcher on 2026-11-04 (bus
`msg-66adf8d2a3264220b2df`). The dispatcher reserved it in ui-control
`control/decisions/2026-11-02-ui-chart-package.md` (`c8a67cb`, bus
`msg-7a432f38a14e4db9ad8d`), checked free in ui-source and ui-pro. Bus
`msg-0d303a488b2d455988c2` reported the chart done. It enters the registry
with the package's first release.

Horizontal bars and steps of several parts are outside 0.1.0.
