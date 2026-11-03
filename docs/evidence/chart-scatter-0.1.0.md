# Scatter 0.1.0: evidence

`sf-chart-scatter` is the third chart of the owner's M2 plan
(`docs/DECISIONS.md` D9, the owner's «Да, делай точечный» of 2026-11-03).
It shows how two measures of the same things go together, with an optional
third as a bubble's area. Its form was decided by the recommendation under
the owner's delegation and is recorded in D9.

## What it is

- **Data** (`chart-core/scatter.js`).
  - One point per row of `items`, at the `x` and `y` fields; unset, they
    are the first two numeric fields that name no series, point or bubble.
  - A row without both measures is no point. It is counted, and the summary
    says how many were left out.
  - `bubble` names a third measure. A bubble's area follows its value
    against the largest; zero, below zero or missing is a small ring.
  - `series` splits the points by a field; `point` names them.
- **Form.**
  - SVG axes with guide lines both ways by default; the marks keep their
    radius from the plot's edges, so none is cut.
  - A series past the first has its own mark's shape (circle, square,
    triangle, diamond, a triangle down). Bubbles are circles: the largest
    first, so a small one is never under a large one, each a light fill
    under a solid outline.
  - `trend="linear"` draws each series' least-squares line, dashed and cut
    to the plot.
  - Past 2,000 marks the marks are drawn on a canvas under the SVG (D5).
    The canvas takes the series' colours from hidden probes in their
    classes, and is painted again when the page's theme changes.
- **Reading.**
  - The summary gives the count and both ranges, the bubbles' range, each
    series' relation in words with Pearson's r, and the highest and lowest
    named point.
  - The tooltip, beside the mark and held off it by its radius, gives the
    point's name and its measures.
  - The table has a row per point: name, series (when more than one), x,
    y and the bubble.
- **Keyboard.** The plot is one Tab stop. Left and Right go to the point
  before and after by x, then y, so every point is reached; Up and Down go
  to the nearest point above or below; Home and End to the ends; Page Up
  and Page Down a tenth. Past 200 points Left and Right move a hundredth.
  Every move is said. Enter and Space select (`select {series, index,
  point, x, y}`); Escape clears.
- **Forced colours.** The marks are solid in the system colour, a point's
  rim is the canvas colour, and a bubble series past the first has its own
  outline dash. The cursor's ring is the highlight colour.

## Fixed during the work

- **An x label at the edge left the plot.** «10 000» at the right end ran
  2 px past it on the smallest rung. The label's width is now guessed with
  a margin, so an end label is held from the edge.
- **The tooltip covered its bubble and wrapped its names.** It now stands
  beside the mark, held off by the mark's radius, and a measure's name
  stays on one line.
- **The stand gave an object setting as an attribute.** `colors` showed as
  `[object Object]`. The stand now gives any list or object as a property.
- **Two examples' first paint passed 8 KB.** The trend example now uses
  the eight regions, and the colours example eight of the twelve goods.

## Checks

Unit tests (`tests/chart-core.test.mjs`) cover:

- the points of rows, the left-out rows, the default fields and one series
  by default;
- the least-squares line and r, too few points and no spread, and the
  strength words;
- a bubble's radius by area, and a missing or non-positive size;
- the reading order, every key of the cursor, Up and Down to the nearest
  point, the hundredth step past 200 points, and the nearest point to the
  pointer.

Manifest probes (`examples.json`, page `conformance`), all four pass:

- **p1:** a figure named by its label; the plot is a group «точечная
  диаграмма». The summary reads «Точек: 12. Цена, ₽: от 300 до 9 900;
  Продано, шт.: от 80 до 520. Электроника — связь: сильная, обратная (r =
  −0,96). Аксессуары — связь: сильная, обратная (r = −0,97). Продано, шт.:
  больше всего — Чехол, Аксессуары (520), меньше всего — Ноутбук,
  Электроника (80).» Six circles, six paths and two legend buttons.
- **p2:** the keyboard. Right says «Чехол, Аксессуары: Цена, ₽ 300,
  Продано, шт. 520», then «Кабель…»; End «Ноутбук…»; Up «Телефон…»; Enter
  selects `{series: 'electronics', index: 4, point: 'Телефон', x: 7800, y:
  120}`; Escape clears.
- **p3:** bubbles. Eight circles, the largest 22 px, the smallest to the
  largest as √(60/410); the summary says «Размер — Клиентов: от 60 до 410.
  Связь: сильная, прямая (r = 0,98).»; the trend line is drawn; the hidden
  table's columns are «Точка|Менеджеров|Выручка, млн ₽|Клиентов».
- **p4:** the error state offers a retry that sends `refresh`.

Browser (`tests/browser/tier-one.browser.mjs`, block 3f):

| Case | Result |
|---|---|
| Plot, light and dark, 375 and 1280 px | ½: 160 px, 1: 240 px, 2: 384 px; twelve marks and every tick label inside it; the page does not scroll sideways |
| Bubbles, same cases | eight inside the plot; the largest 14, 22 and 34 px by the rung |
| Marks against the page | light 4.49 and 4.48:1, dark 5.98 and 5.97:1 (3:1 required); a circle and a path |
| Keyboard | Tab after the table button and the two legend buttons; Right, Right, End, Up said as in p2; Enter selects «Телефон»; the tooltip says the same; Escape clears; Tab leaves |
| Pointer | over «Наушники» the tooltip reads «Наушники, Электроника Цена 1 200 Продано 340» |
| 5,000 points at 4x CPU | drawn on the canvas in 95 ms (budget 1.5 s), no SVG marks, the keyboard walks them with the ring |
| Forced colours | every mark solid `rgb(0, 0, 0)`; the bubble series' dashes `none` and `6px, 3px` |

The stand was also checked by eye in both themes, at 760 and 240 px: the
two series by colour and shape, the bubbles, the trend line, the tooltip
beside a bubble, and the end labels held at the edge.

## Build

ui-builder `verify-package-reproducibility.cjs` ran from commit `fd2dee5`
over ui-source `5776ff08`, the pin. The result was **PASS**:

- two builds are byte-identical;
- 590 files, up from 530 with the scatter;
- the output manifest sha256 is
  `251ea1c31bbd5d8d599ed53702a1a0d51b942abe25cc19bd462fd8ded8d7434a`.

The package receipt names framework `ui-de2b4437234a`. The archive sha256 is
`cbd6b1ebdc8c4f5899c47bb61f618386302dc0d3961b3924a74dfc232f24dcfc`.

| Check | Result |
|---|---|
| Manifest probes | 49/49 |
| First paint | 154 unchanged |
| First-paint gate | 288/288, CLS 0 |
| Browser probes | 2/2 |
| Suite | 133/0 |

## Size

`chart-scatter` is 12.9 KB of JS and 2.2 KB of CSS, gzip (minified). The
other charts are unchanged.

## Next

The name `sf-chart-scatter` was sent to the dispatcher on 2026-11-03 (bus
`msg-481962f616f742ecb338`). The dispatcher reserved it in ui-control
`control/decisions/2026-11-02-ui-chart-package.md` (`ed48d0e`), checked free
in ui-source and ui-pro (bus `msg-cf17bf8529984278bf09`). It enters the
registry with the package's first release.

The next chart of M2 is the histogram, a `bin` setting of `sf-chart-bar`.
