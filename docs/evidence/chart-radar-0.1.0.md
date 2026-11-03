# Radar 0.1.0: evidence

`sf-chart-radar` is the sixth and last chart of the owner's M2 plan
(`docs/DECISIONS.md` D9; the owner asked «давай дальше … радар?» on
2026-11-03). It compares a few items over several measures on one scale.
Its form was decided by the recommendation under the owner's delegation and
is recorded in D9.

## What it is

- **Data.** The rows are read by `chart-core/data` with the x field as
  categories, so the radar maps fields as the line and bar charts do:
  - `x` names the spokes, in the data's order;
  - `y` gives the series' fields;
  - `series` gives the long form instead.

  A missing value is a gap.
- **Form** (`chart-core/radar.js`).
  - The first spoke points straight up and the rest go clockwise.
  - One scale serves every spoke, from `min` (zero by default) at the
    centre to `max` (the data's, rounded up, or given) at the outer ring.
  - The scale's rings are polygons by default; `grid` can make them
    circles or draw only the outer ring.
  - Each series is a line through its values over a light fill.
    `fill="none"` keeps the line only.
  - A gap breaks the ring and its fill: a run of neighbouring spokes is
    kept whole across the first spoke.
  - A series past the first has its own values' mark shape (square,
    triangle, diamond, a triangle down).
  - The scale's values stand up the first spoke, over the series, with a
    rim of the surface.
  - A long spoke name is cut with an ellipsis, held to a quarter of the
    width.
- **Reading.**
  - The summary gives the count of spokes and the range, then each
    series' strongest and weakest spoke. It compares the first two series
    spoke by spoke (above on so many of so many, below on so many) and
    gives the gaps.
  - The tooltip, at the spoke's end, names the spoke and every shown
    series' value on it.
  - The table has a row per spoke and a column per series.
- **Keyboard.** The plot is one Tab stop, walked as on the bar chart:
  - Left and Right go round the spokes;
  - Up and Down go across the series;
  - Home, End, Page Up and Page Down jump;
  - every move is said;
  - Enter and Space select (`select {series, index, spoke, value}`);
  - Escape clears.
- **Forced colours.** The lines are the system colour, with no fill. A
  series past the first has its own dash.

## Fixed during the work

- **A spoke name left the plot on the smallest rung.** The name under the
  bottom spoke ran 1 to 2 px past the plot's lower edge. The radius now
  keeps a line of text and a gap above and below. A name stands half a gap
  off its spoke's end.
- **The scale's values were crossed out by the series' lines.** They are
  now drawn over the series, with a rim of the surface.
- **The example with three series passed 8 KB of first paint.** It had
  seven spokes and printed 8.5 KB; with six spokes it fits.
- **The browser checks lost their browser.** Another project on this
  machine installed Playwright 1.64.1 during the work, and that removed the
  browser of Playwright 1.61.0, which the checks borrowed from the larena
  checkout. The checks now borrow 1.64.1, whose browser is present. This is
  a local tool path in the session's scratch scripts, not in the
  repository.

## Checks

Unit tests (`tests/chart-core.test.mjs`) cover:

- the spokes' angles and points, the first straight up and clockwise;
- where each spoke's label stands;
- a closed ring without gaps, the runs round one gap and two, and no
  values;
- two rings compared spoke by spoke.

The core suite now passes 35.

Manifest probes (`examples.json`, page `conformance`), all five pass:

- **p1:** a figure named by its label, and the plot a group «лепестковая
  диаграмма». The summary reads:

  > «Осей: 6, значения от 4 до 9. Анна: сильнее всего — Код (9), слабее
  > всего — Дизайн (4). Борис: сильнее всего — Общение (9), слабее всего —
  > Тесты (4). Анна выше, чем Борис, на осях: 3 из 6, ниже: 3.»

  The plot draws six spokes and two filled rings, with Анна's marks
  circles and Борис's paths. The outer value is 10, and there are two
  legend buttons.
- **p2:** the keyboard.
  - Right says «Аналитика, Анна: 8», then «Код, Анна: 9».
  - Down says «Код, Борис: 6».
  - End says «Планирование, Борис: 7».
  - Enter selects `{series: 'boris', index: 5, spoke: 'Планирование',
    value: 7}`.
  - Escape clears.
- **p3:** a gap at the last spoke.
  - No fill, one open line and four marks; the grid is circles.
  - The summary ends «Пропусков: 1.»
  - The hidden table has five rows and leaves «Упаковка» empty.
- **p4:** hiding «boris» leaves one series and sends `toggle {id: 'boris',
  hidden: true}`.
- **p5:** the error state offers a retry that sends `refresh`.

Browser (`tests/browser/tier-one.browser.mjs`, block 3i):

| Case | Result |
|---|---|
| Plot, light and dark, 375 and 1280 px | Heights are ½: 160 px, 1: 240 px and 2: 384 px. Six spokes, every mark and every text stay inside the plot, and the page does not scroll sideways |
| Lines against the page | Light 4.49 and 4.48:1, dark 5.98 and 5.97:1 (3:1 required). Each series has a colour and a mark shape of its own (circle, path) |
| Keyboard | Tab lands on the plot after the table button and the two legend buttons. Right, Right, Down, Left and End are each said. Enter selects «Планирование». The tooltip reads «Планирование Анна 5 Борис 7». Escape clears and Tab leaves |
| Pointer | Over Борис's mark on «Общение» the tooltip reads «Общение Анна 6 Борис 9» |
| Forced colours | Both lines are `rgb(0, 0, 0)`, with dashes `none` and `6px, 3px` |

The stand was also checked by eye in the dark theme at 760 px:

- the two skill profiles;
- the three teams as lines on a circle grid;
- the scale's values readable over the lines.

## Build

ui-builder `verify-package-reproducibility.cjs` ran from commit `3159407`
over ui-source `5776ff08`, the pin. The result was **PASS**:

- two builds are byte-identical;
- 718 files, up from 658 with the radar;
- the output manifest sha256 is
  `d1b42af7ca60a91c2da884b42170392ace6f387fc81c8be3a94203aeba03b664`.

The package receipt names framework `ui-de2b4437234a`. The archive sha256 is
`0f3149b29a291dd784ffb20f01b985a6ebfe5ee08da246a25b40f337475c0b5d`.

| Check | Result |
|---|---|
| Manifest probes | 60/60 |
| First paint | 190 unchanged |
| First-paint gate | 356/356, CLS 0 |
| Browser probes | 2/2 |
| Suite | 139/0 |

## Size

`chart-radar` is 12.0 KB of JS and 2.1 KB of CSS, gzip (minified). The other
charts are unchanged.

## Next

The name `sf-chart-radar` was sent to the dispatcher on 2026-11-03 (bus
`msg-cda115f3622c4b74a1b7`). The dispatcher reserved it in ui-control
`control/decisions/2026-11-02-ui-chart-package.md` (`5de418d`), checked free
in ui-source and ui-pro (bus `msg-051bfed3457b43d29ffb`). It enters the
registry with the package's first release.

With the radar, the six charts of the M2 plan are done.
