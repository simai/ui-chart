# Treemap 0.1.0: evidence

`sf-chart-treemap` is the chart after the waterfall. The owner asked for
«Следующий график» on 2026-11-05 without naming one. The treemap was chosen
as the most cited chart not yet built (11 of 18 libraries in the research
catalogue). It shows how a whole is made of parts, each part a rectangle
whose area is its share. The chart and its form were decided by the
recommendation under the owner's delegation and are recorded in
`docs/DECISIONS.md` D12.

## What it is

- **Data** (`chart-core/treemap.js`).
  - One row per part. `x` names the part and `y` gives its value. Both
    default as on the bar chart.
  - An optional `group` field makes two levels: the parts of a group lie
    together in its rectangle, under its name.
  - A row without a value, or with zero or less, is left out and counted:
    an area cannot show it.
- **Two levels, not a tree.** The catalogue proposed the hierarchy contract
  (id, parent, value) shared with a sunburst. 0.1.0 reads the same rows as
  the other charts and a group field instead. Deeper trees need drill-down,
  which 0.1.0 does not have. The catalogue now points to D12.
- **Layout.** Squarified, own implementation:
  - each row of rectangles is kept while it makes their worst aspect ratio
    no worse, so they stay near square and areas compare;
  - groups and parts go largest first;
  - neighbours stand 2 px apart;
  - a group keeps a band for its name when it is tall enough.
- **Colour.**
  - A group takes the chart colour of its place (`--sf-chart-1..8`): the
    colour's light fill inside each part and its line round it.
  - The text is the page's ink, which reads on every fill.
  - `colors` by group key sets a page's own.
- **Words in the parts.**
  - The name, cut with an ellipsis, and the value under it where there is
    room.
  - A part too small for three letters stays blank. Its words are in the
    tooltip, the live line and the table.
  - `labels="none"` leaves them out always.
- **Reading.**
  - The summary gives:
    - the total and the count of parts;
    - the largest part with its share;
    - with groups, their count and the largest; without, the three largest
      parts' share;
    - how many rows were left out.
  - The tooltip names the part, its group, its value and its share.
  - The table has a row per part with its group, value and share.
- **Keyboard.**
  - The plot is one Tab stop; the key of the groups is a plain list.
  - Left and Right walk the parts largest first, group after group.
  - Up and Down go to the first part of the group before or after.
  - Home, End, Page Up and Page Down jump.
  - Every move is said: «Электроника — Смартфоны: 420 (23,7 %)».
  - Enter and Space select (`select {index, row, x, group, value, share}`).
  - Escape clears.
- **Forced colours.** Every part is the canvas with a line of the system
  colour; the names carry the meaning.

## Fixed during the work

- **Said «нет данных» for every part.** The written value of a part
  overwrote its number. The words drawn in a part are now kept apart from
  its value.
- **«Планш…» left its part at rung ½.** The ellipsis is wider than a
  letter, and the part was a few pixels too short for a line. The ellipsis
  now takes two letters' places, and a part writes its name only when it
  has the line and its padding.

## Checks

Unit tests (`tests/chart-core.test.mjs`):

- the parts in groups, largest first, with missing and dropped rows
  counted;
- squarified rectangles that tile the box in proportion;
- the layout with a header band and gaps.

The core suite now passes 144.

Manifest probes (`examples.json`, page `conformance`), all four pass:

- **p1:** a figure named by its label, and the plot a group «плиточная
  диаграмма».
  - Groups «Электроника», «Дом» and «Одежда» with 4, 3 and 3 parts, the
    largest in the first colour, and the same three in the key.
  - The summary reads:

    > «Всего 1 770, частей: 10. Больше всего — «Смартфоны»: 420 (23,7 %).
    > Групп: 3, крупнейшая — «Электроника»: 940 (53,1 %).»
- **p2:** the keyboard.
  - Right says «Электроника — Смартфоны: 420 (23,7 %)», then «Электроника
    — Ноутбуки: 310 (17,5 %)».
  - Down says «Дом — Мебель: 260 (14,7 %)».
  - End says «Одежда — Аксессуары: 60 (3,4 %)» and draws one ring.
  - Enter selects `{index: 9, row: 9, x: 'Аксессуары', group: 'Одежда',
    value: 60}`.
  - Escape clears.
- **p3:** one level.
  - Without a group field there is one group, seven parts and no key.
  - The summary reads «Всего 8 450, частей: 7. Больше всего — «Зарплаты»:
    5 200 (61,5 %). Три крупнейшие части — 88,8 % всего. Строк без
    положительного значения: 1.»
  - The hidden table's head is «Статья|Значение|Доля», its first row
    «Зарплаты|5 200|61,5 %» and its last «Прочее|80|0,9 %».
- **p4:** the error state offers a retry that sends `refresh`.

Browser (`tests/browser/tier-one.browser.mjs`, block 3l):

| Case | Result |
|---|---|
| Plot, light and dark, 375 and 1280 px | Heights are ½: 160 px, 1: 240 px and 2: 384 px. Ten parts on each; every part stays in the plot and every name and value inside its part, and the page does not scroll sideways. Names are written where they fit: 6 of 10 at rung ½ and 375 px, all 10 at rung 1 and 1280 px |
| Lines against the page | The three groups' lines are light 4.49, 4.49 and 9.3:1, dark 5.98, 5.96 and 12.77:1 (3:1 required), each in a colour of its own |
| Names on their fills | Light 14.63, 14.79 and 14.83:1, dark 11.47, 11.4 and 11.32:1 (4.5:1 required) |
| Keyboard | Tab lands on the plot after the table button. Right and Right are said, Down goes to «Дом — Мебель», Up comes back to «Смартфоны», and End says «Одежда — Аксессуары: 60 (3,4 %)». Enter selects index 9. The tooltip reads «Аксессуары Группа Одежда Значение 60 Доля 3,4 %». Escape clears and Tab leaves |
| Pointer | Over the largest part of «Дом» the tooltip reads «Мебель Группа Дом Значение 260 Доля 14,7 %» |
| Forced colours | Every part's stroke is `rgb(0, 0, 0)` and its fill `rgb(255, 255, 255)` |

The stand was also checked by eye in the dark theme at 760 px:

- revenue by category and product;
- a department's budget in one level;
- the page's own colours.

## Build

ui-builder `verify-package-reproducibility.cjs` ran from commit `3014d79`
over ui-source `4863a40e`, the pin. The result was **PASS**:

- two builds are byte-identical;
- 878 files, up from 826 with the treemap;
- the output manifest sha256 is
  `0990c902b15aaa08e9b736c57574e54d92462fb74a6de818d3a23887dc061cd5`.

The package receipt names framework `ui-c3015f76bcc2`. The archive sha256 is
`b511b4eb68199fe407d988ce592adfc96a28fcb39f7712856192217a7943daa1`.

| Check | Result |
|---|---|
| Manifest probes | 72/72 |
| First paint | 228 unchanged; the reference example is 6.0 KB |
| First-paint gate | 426/426, CLS 0 |
| Browser probes | pass |
| Browser, tier one (blocks 1–3l) | pass |
| Suite | 144/0 |

## Size

`chart-treemap` is 11.2 KB of JS and 2.0 KB of CSS, gzip (minified). The
JS carries the core's whole format module, as every chart does since the
pin (`docs/evidence/pin-ui-c3015f76bcc2.md`). The other charts are
unchanged.

## Next

The name `sf-chart-treemap` was reserved by the dispatcher in ui-control
`e79bd7f` (bus `msg-f886b54bb51d4e05a312`), checked free in ui-source and
ui-pro. It enters the registry with the package's first release.

More than two levels, zoom into a group and the sunburst are outside 0.1.0.
