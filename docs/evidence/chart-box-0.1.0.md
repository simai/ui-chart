# Box plot 0.1.0: evidence

`sf-chart-box` is the fifth chart of the owner's M2 plan
(`docs/DECISIONS.md` D9, the owner's «Да, ящик с усами» of 2026-11-03). It
compares how one measure spreads across groups. Its form was decided by the
recommendation under the owner's delegation and is recorded in D9.

## What it is

- **Data** (`chart-core/box.js`).
  - `x` names the groups, in the data's first-seen order; `y` the measure
    (the first numeric field other than x and series when unset).
  - `stats="raw"`: each row is an observation. The quartiles are linear
    between the two nearest values (R's type 7, NumPy's and a
    spreadsheet's).
  - `stats="given"`: each row is a group with `min`, `q1`, `median`, `q3`,
    `max` and `mean`. A row missing one, or out of order, is left out.
  - A row without the measure is left out and counted in the summary.
  - `whiskers="tukey"` (the default) reaches the farthest value within 1.5
    interquartile ranges, and the values past it are outliers;
    `whiskers="range"` reaches the extremes.
  - `series` gives each series its own box, side by side in a group.
- **Form.**
  - SVG: whiskers with caps (one path), a box with a light fill under a
    solid outline, a heavier median line, outliers as rings, and the mean
    as a diamond when `mean` is set.
  - A box is held to its rung's widest (40, 56 or 80 px), so a few groups
    do not make slabs.
  - Long group names are cut with an ellipsis and said whole by the
    tooltip.
- **Reading.**
  - The summary gives the count of groups and values, then for each series
    the highest and lowest median and the widest box (its interquartile
    range), then the outliers and left-out rows.
  - The tooltip gives the maximum, quartiles, median, minimum, the mean
    when marked, the count of values and of outliers.
  - The table has a row per box: its count, the five numbers, the mean,
    and the outliers' values.
- **Keyboard.** The plot is one Tab stop, walked as on the bar chart:
  - Left and Right go from group to group;
  - Up and Down go across the series;
  - Home, End, Page Up and Page Down jump;
  - every move is said;
  - Enter and Space select (`select {series, index, group, median}`);
  - Escape clears.
- **Forced colours.** The outlines are the system colour. A series past the
  first has its own outline dash.

## Fixed during the work

- **Two examples' first paint passed 8 KB.** The examples with series
  printed 9.6 and 9.9 KB.
  - The data in their settings is now an object of columns, not records.
  - The four whisker lines of a box are now one path.
  - They now print 7.3 and 7.6 KB.

## Checks

Unit tests (`tests/chart-core.test.mjs`) cover:

- the quantile;
- a box's quartiles, its Tukey whiskers and outlier, the full-range
  whiskers, and no values;
- given statistics, out of order and incomplete;
- grouping by a field and a series, a missing box, the left-out rows, the
  default fields, and given rows.

The core suite now passes 33.

Manifest probes (`examples.json`, page `conformance`), all five pass:

- **p1:** a figure named by its label, and the plot a group «ящик с
  усами». The summary reads:

  > «Групп: 4, значений: 36. Часов в пути: медиана выше всего — Пермь
  > (36), ниже всего — Самара (13); шире всего разброс — Пермь (половина
  > значений в пределах 9). Выбросов: 2.»

  The plot draws four boxes, four medians, four whisker paths and two
  outliers, with no legend for one series.
- **p2:** the keyboard.
  - Right says «Москва: медиана 18, квартили 15 – 21, усы 12 – 24,
    выбросов 1», then «Казань…».
  - End says «Пермь…».
  - Enter selects `{series: 'hours', index: 3, group: 'Пермь', median:
    36}`.
  - Escape clears.
- **p3:** given statistics with `mean`. Five boxes, five diamonds and no
  outliers. The summary says «…медиана выше всего — ИТ (160)…». The hidden
  table reads «Отдел|Минимум|Нижний квартиль|Медиана|Верхний
  квартиль|Максимум|Среднее», and its first row reads
  «Продажи|60|85|110|150|260|124».
- **p4:** two series give six boxes and two legend buttons. Hiding
  «express» leaves three boxes and sends `toggle {id: 'express', hidden:
  true}`.
- **p5:** the error state offers a retry that sends `refresh`.

Browser (`tests/browser/tier-one.browser.mjs`, block 3h):

| Case | Result |
|---|---|
| Plot, light and dark, 375 and 1280 px | Heights are ½: 160 px, 1: 240 px and 2: 384 px. Six boxes and every label stay inside the plot, and the page does not scroll sideways |
| Outlines against the page | Light 4.49 and 4.48:1, dark 5.98 and 5.97:1 (3:1 required), a colour per series |
| Keyboard | Tab lands on the plot after the table button and the two legend buttons. Right, Right, Down and End are each said. Enter selects «east, Срочная», and the tooltip says the same. Escape clears and Tab leaves |
| Pointer | Over a box the tooltip reads «north, Срочная Максимум 26 …» |
| Forced colours | Both outlines are `rgb(0, 0, 0)`, with dashes `none` and `6px, 3px` |

The stand was also checked by eye in the dark theme at 760 px:

- the four warehouses with their outliers;
- the two series side by side with the legend;
- the given salaries with their means;
- the tooltip beside a box.

## Build

ui-builder `verify-package-reproducibility.cjs` ran from commit `180680b`
over ui-source `5776ff08`, the pin. The result was **PASS**:

- two builds are byte-identical;
- 658 files, up from 598 with the box plot;
- the output manifest sha256 is
  `d5584348d9b2c25ad49c9e2f23ff0bf51cca01cc8420fce10ddf8dd569e4f730`.

The package receipt names framework `ui-de2b4437234a`. The archive sha256 is
`6336a4dccda3c6e4ed4b1bf4768a094d6b7baa71a0455aaf40acb1b71dc379f4`.

| Check | Result |
|---|---|
| Manifest probes | 55/55 |
| First paint | 174 unchanged |
| First-paint gate | 326/326, CLS 0 |
| Browser probes | 2/2 |
| Suite | 137/0 |

## Size

`chart-box` is 12.3 KB of JS and 2.1 KB of CSS, gzip (minified). The other
charts are unchanged.

## Next

The name `sf-chart-box` was sent to the dispatcher on 2026-11-03 (bus
`msg-a979e298e6c8492e8f46`). The dispatcher reserved it in ui-control
`control/decisions/2026-11-02-ui-chart-package.md` (`2d3fb38`), checked free
in ui-source and ui-pro (bus `msg-3a816320ed0a44799f2c`). It enters the
registry with the package's first release.

The last chart of M2 is `sf-chart-radar`.
