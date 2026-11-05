# Sankey 0.1.0: evidence

`sf-chart-sankey` is the chart after the timeline. The owner chose
«Sankey» on 2026-11-05. It shows how a quantity flows between stages or
categories: a budget from income to spending, or visitors through the pages
of a site. Its form was decided by the recommendation under the owner's
delegation and is recorded in `docs/DECISIONS.md` D14.

## What it is

- **Data** (`chart-core/sankey.js`). It reads the flow shape of
  `parameters.md` §2.1:
  - `source`, `target` and `value` name the fields; by default `source`,
    `target` and the first numeric field;
  - the same pair named twice is one flow with the sum;
  - a row without a source, a target or a positive value is left out and
    counted, and so is a flow from a node to itself;
  - a flow that would close a loop (its target already leads to its
    source) is left out and counted, because the diagram runs one way.
- **Layout.**
  - A node's column is its longest path from a node that nothing flows
    into; a node that flows nowhere stands in the last column.
  - A node's height is the larger of what comes in and what goes out, at
    one scale for every column; each column is centred.
  - The order in a column is sorted a few times by the weighted middle of
    the nodes it joins, so the bands cross less.
  - A node's name and value stand beside it, on the left in the last
    column, cut with an ellipsis to the room between the columns. A node
    too thin for a line keeps its words in the tooltip and the table.
- **Colour.**
  - A node takes the chart colour of its place (`--sf-chart-1..8`); its
    bands take the light fill of the same colour.
  - `colors` by node name sets a page's own colours.
  - In forced colours the nodes are the text colour and the bands the
    canvas with a line of it.
- **Reading.**
  - The summary gives the nodes, the flows, the stages and the total, the
    largest flow with its share of its source, the node that receives the
    most, and the rows left out.
  - Each node is said with its flows: «Выручка: 800; приходит из
    «Продукты» 520, «Услуги» 280; уходит в «Зарплаты» 360, «Прибыль» 210,
    «Маркетинг» 140 и ещё 1».
  - The tooltip of a band gives source → target, the value and the share
    of the source; of a node, what comes in and goes out.
  - The table has a row per flow: «Откуда|Куда|Значение|Доля от
    источника».
- **Keyboard.**
  - The plot is one Tab stop.
  - Up and Down walk a column; Right follows the largest outgoing flow to
    the next column and Left the largest incoming one back.
  - Home and End jump to the first and the last node.
  - Enter and Space select (`select {index, node, value, in, out}`), and
    Escape clears.
- **Reuse.** `sankeyRows`, `sankeyLayout`, `bandPathOf` and `onBand` are in
  the chart core.

## Fixed during the work

- **Names of neighbouring columns met.** «Маркетинг 140» of the column
  before the last ran into «Аренда 90» written on the left of the last
  column. A name of the column before the last is now cut to the room left
  by the last column's names.

## Checks

Unit tests (`tests/chart-core.test.mjs`) cover:

- the flows: a pair summed, the columns by longest path, sinks in the last
  column, the total, and what is left out (missing, to itself, a loop);
- the layout: one scale, columns inside the box, bands stacked along both
  ends, and a point on and off a band.

The core suite now passes 148.

Manifest probes (`examples.json`, page `conformance`), all four pass:

- **p1:** a figure named by its label, and the plot is a group described
  as a «диаграмма потоков».
  - The reference is «Бюджет компании, млн ₽» with nine nodes and eight
    bands.
  - The summary reads:

    > «Узлов: 9, потоков: 8, этапов: 4; всего 800. Крупнейший поток —
    > «Продукты» → «Выручка»: 520 (100 % от «Продукты»). Больше всего
    > приходит в «Зарплаты»: 360 (45 %).»
- **p2:** the keyboard walks columns and follows flows, says each node
  with its flows, selects with Enter and clears with Escape.
- **p3:** the paths of a site, with a row that closes a loop and a row
  without a target. The summary ends «Строк без потока: 1. Потоков,
  замыкающих круг, пропущено: 1.»
- **p4:** the error state offers a retry that sends `refresh`.

Browser (`tests/browser/tier-one.browser.mjs`, block 3n):

| Case | Result |
|---|---|
| Plot, light and dark, 375 and 1280 px | Every bar, band and name stays in the plot and the page does not scroll sideways. At 1280 px all nine names are written at every rung. At 375 px eight are written at rungs ½ and 1; at rung 2 the larger letters leave room for three, and the others are in the tooltip and the table |
| Bars against the page | Light 4.49, 4.49 and 9.3:1, dark 5.98, 5.96 and 12.77:1 (3:1 required) |
| Names against the page | Light 17.21 and 6.47:1, dark 14.67 and 5.95:1 (4.5:1 required) |
| Keyboard | Tab lands on the plot; the moves and the selection are said as in p2; Escape clears and Tab leaves |
| Pointer | Over a band the tooltip reads «Выручка → Зарплаты Значение 360 Доля от источника 45 %» |
| Forced colours | The bars are the text colour; the bands are the canvas with a line of the text colour |

## Build

ui-builder `verify-package-reproducibility.cjs` ran from commit `41860d1`
over ui-source `ec2f29df`, the pin. The result was **PASS**:

- two builds are byte-identical;
- 982 files;
- the output manifest sha256 is
  `ab9e37dde8aff8b8abc031325b86a4a7ec69d4f86d22bfab3adbd883b9b9639b`.

The package receipt names framework `ui-62b1d9b6dc8d`. The archive sha256 is
`48e3ada50ffa7316f3c6ae3d2ddc8a5ac96da75f7543f10bf9fc1e3ca19d28cc`.

| Check | Result |
|---|---|
| Manifest probes | 80/80 |
| First paint | 252 unchanged |
| First-paint gate | 470/470, CLS 0 |
| Browser probes | pass |
| Browser, tier one (blocks 1–3n) | pass |
| Suite | 148/0 |

## Size

`chart-sankey` is 10.8 KB of JS and 1.8 KB of CSS, gzip (minified). The
other charts are unchanged.

## Next

The name `sf-chart-sankey` was reserved by the dispatcher in ui-control
`4a70440` (bus `msg-d8408d476f8b4d55b157`). It enters the registry with the
package's first release.

Loops, nodes placed by hand, and zoom are outside 0.1.0.
