# Sunburst 0.1.0: evidence

`sf-chart-sunburst` is the chart after the Sankey diagram. The owner chose
«Солнечные круги» on 2026-11-05. It shows a hierarchy as rings round a
centre: revenue by category and product, or disk space by folder. Its form
was decided by the recommendation under the owner's delegation and is
recorded in `docs/DECISIONS.md` D15.

## What it is

- **Data** (`chart-core/sunburst.js`). It reads the hierarchy shape of
  `parameters.md` §2.1 in two forms:
  - an id and a parent per row. `node` names the id field, because `id`
    is the element's own attribute. A parent not among the ids makes a top
    node, and `name` can give a name apart from the id;
  - a path per row, a field holding the names from the top down. The
    nodes on the way are made as they come, and the same path twice sums.
  - A parent's value is its own with its children's. Its own part stays
    as room after its children on the next ring.
  - Left out and counted: a row without an id or a path, a node with
    nothing to show, an id named twice, and a chain of parents that comes
    back to itself (with the nodes hanging from it).
- **Layout.**
  - The top nodes share the turn clockwise from twelve o'clock, largest
    first. A child takes its parent's angle by its share.
  - The rings share the radius outside a hole of three tenths. The hole
    holds the total when it fits.
  - The plot is the size rung's height, as the pie's.
- **Colour.**
  - A top node takes the chart colour of its place (`--sf-chart-1..8`) and
    its branch keeps it. Each arc has the colour's light fill with its
    line round it, lighter past the first ring.
  - The names are in the page's ink.
  - `colors` by the top node's name sets a page's own.
  - In forced colours every arc is the canvas with a line of the text
    colour.
- **Reading.**
  - A name stands along the middle of its arc, as a straight line or, when
    the arc holds more that way, a curve along it. Below the middle it is
    turned round, so it never reads upside down. It is cut with an
    ellipsis to the room.
  - The summary gives the levels, the parts and the total, the largest
    branch and the largest end part with their shares, and the rows left
    out.
  - The tooltip gives the path, the value, and the shares of the parent and
    the whole.
  - The table has a row per node, each branch under its parent:
    «Путь|Значение|Доля от родителя|Доля всего».
- **Keyboard.**
  - The plot is one Tab stop.
  - Left and Right go round a ring, Right clockwise, going round at the
    ends.
  - Down goes out to the largest child, and Up back to the parent.
  - Home and End go to the ends of the ring.
  - Each arc is said with its path and shares: «Дом / Мебель: 260; 59,1 %
    от «Дом», 14,7 % всего».
  - Enter and Space select (`select {index, node, name, path, depth,
    value, share}`), and Escape clears.
- **Reuse.** `sunburstRows`, `sunburstLayout` and `arcAt` are in the chart
  core. `sunburstRows` is the hierarchy reader a deeper treemap can share.

## Fixed during the work

- **The largest top node's name was cut** to «Электр…». A straight line in
  the inner ring has little room. A name now follows its arc as a curve
  when the arc holds more that way.
- **The first paint of the colours example was 9.7 KB**, over the 8 KB
  limit, because every arc carried the page's colour. The arcs now stand in
  one group per branch, which carries the colour once.

## Checks

Unit tests (`tests/chart-core.test.mjs`) cover:

- the tree from ids and parents: values summed up, the top nodes largest
  first, an orphan as a top node, and what is left out (no id, nothing to
  show, an id twice, a loop with what hangs from it, a node its own
  parent);
- the tree from paths: the nodes made on the way, a path twice summed, and
  an empty path counted;
- the layout: a child's angle by its share with the parent's own part kept
  as room, a ring per level, and the arc under a point (none in the hole).

The core suite now passes 150.

Manifest probes (`examples.json`, page `conformance`), all four pass:

- **p1:** a figure named by its label, and the plot is a group described
  as a «кольцевая диаграмма иерархии».
  - The reference is «Выручка по направлениям, млн ₽»: 13 arcs, 3 in the
    first ring and 10 in the second. «Электроника» and «Смартфоны» are
    written, and the centre says «1 770».
  - The summary reads:

    > «Уровней: 2, частей: 13; всего 1 770. Крупнейшая ветвь —
    > «Электроника»: 940 (53,1 %). Крупнейшая конечная часть —
    > «Электроника / Смартфоны»: 420 (23,7 %).»
- **p2:** the keyboard.
  - Right says «Электроника: 940; 53,1 % всего; частей внутри: 4», then
    «Дом».
  - Down goes out to «Дом / Мебель», and Left goes round the ring to «Электроника / Планшеты».
  - Up goes back to «Электроника», and End to «Одежда».
  - Enter selects `{index: 2, node: 'Одежда', depth: 0, value: 390}`.
  - Escape clears.
- **p3:** disk space by paths three levels deep, with a row without a path
  counted. The hidden table's first row is «Фото|115|—|38,7 %», and the
  fourth is «Фото / 2026 / Отпуск|35|63,6 %|11,8 %».
- **p4:** the error state offers a retry that sends `refresh`.

Browser (`tests/browser/tier-one.browser.mjs`, block 3o):

| Case | Result |
|---|---|
| Plot, light and dark, 375 and 1280 px | Heights are ½: 160 px, 1: 240 px and 2: 384 px, with 13 arcs on each. Every arc and name stays in the plot, and the page does not scroll sideways. «Электроника» is written whole on every rung. The names written are 5 at ½, 7 at 1, and 8 (375 px) or 10 (1280 px) at 2; the others are in the tooltip and the table |
| Branch lines against the page | Light 4.49, 4.49 and 9.3:1, dark 5.98, 5.96 and 12.77:1 (3:1 required), each in a colour of its own |
| Names and total against the page | Light 17.21 and 6.47:1, dark 14.67 and 5.95:1 (4.5:1 required) |
| Keyboard | Tab lands on the plot after the table button. Right says «Электроника», Down goes to «Смартфоны» (44,7 % of «Электроника»), Left goes round to «Одежда / Аксессуары», and Up to «Одежда». End stays there and Enter selects index 2. The tooltip reads «Одежда Значение 390 Доля всего 22 %». Escape clears and Tab leaves |
| Pointer | Over «Мебель» the tooltip reads «Дом / Мебель Значение 260 Доля от родителя 59,1 % Доля всего 14,7 %» |
| Forced colours | Every arc is the canvas (white) with a line of the text colour (black) |

The stand was also checked by eye in dark at 760 px. A name follows its arc
or stands straight and upright, and the total stands in the centre.

## Build

ui-builder `verify-package-reproducibility.cjs` ran from commit `a1db870`
over ui-source `ec2f29df`, the pin. The result was **PASS**:

- two builds are byte-identical;
- 1034 files;
- the output manifest sha256 is
  `a3b2d9a673481923763f153f583149338fbfb2d29aa502dc2cee4cb194fbf090`.

The package receipt names framework `ui-62b1d9b6dc8d`. The archive sha256 is
`118e71a2391196ce2c57baac6d44e4192816dc6dc40a861058cf08555ce14a21`.

| Check | Result |
|---|---|
| Manifest probes | 84/84 |
| First paint | 264 unchanged |
| First-paint gate | 492/492, CLS 0 |
| Browser probes | pass |
| Browser, tier one (blocks 1–3o) | pass |
| Suite | 150/0 |

## Size

`chart-sunburst` is 10.8 KB of JS and 1.8 KB of CSS, gzip (minified). The
other charts are unchanged.

## Next

The name `sf-chart-sunburst` was reserved by the dispatcher in ui-control
`868426b` (bus `msg-285614a61887494785a1`), checked free in ui-source,
ui-pro, ui-view and ui-chart. It enters the registry with the package's
first release.

Drill-down into a branch, a legend, and arcs placed by hand are outside
0.1.0.
