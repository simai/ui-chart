# Map 0.1.0: evidence

`sf-chart-map` is the chart after the sunburst. The owner chose «Да,
карта» on 2026-11-05 and decided where its boundaries come from (owner
question `q-f136944dd5`): «Границы даёт сайт», the page gives them. The
rest of its form was decided by the recommendation under the owner's
delegation and is recorded in `docs/DECISIONS.md` D16.

It is a choropleth map: a rate or a ratio by region, district or zone,
each region filled by the step of its value.

## What it is

- **Boundaries** (`chart-core/geo.js`). The page sets them as GeoJSON in
  the `shapes` property: a FeatureCollection or a list of Features with
  Polygon or MultiPolygon geometry.
  - The package holds no map. No third-party geometry or licence enters
    it, and the borders, disputed ones included, are the host's.
  - Islands (a MultiPolygon) and holes (a lake) are kept; the holes are
    drawn by the even-odd rule.
  - A feature's key is its id, else `properties.id`, or the property
    `shape-key` names. Its name is `name`, or the property `shape-name`
    names. A feature without a key or a polygon, and a key given twice, are
    left out and counted.
- **Data.** The rows give a region's key and value (`region`, `value`,
  the first text and the first number field by default).
  - A row naming no region on the map is left out and counted in the
    summary.
  - A region without a value is drawn as the second surface with a dashed
    line, and the legend names it «нет данных».
- **Projection** (`projection`): `mercator` by default, `albers` (areas
  kept through two parallels of the map), `equirectangular`, and `plane`
  (the coordinates as they are, y down, for a floor plan). The map is
  fitted into the plot with its proportions, and a map across the 180th
  meridian is kept whole. A path is rounded to a tenth of a pixel and
  leaves out points closer than half a pixel.
- **Colour.** The heatmap's stepped scale on the theme's tone ladders
  (D8), sequential or diverging, with the same settings (`scale`,
  `scheme`, `better`, `steps`, `middle`, `min`, `max`) and a legend of the
  steps. The steps and their ink are reused from `chart-core/heat.js`. In
  forced colours every region is the canvas with a line of the text
  colour.
- **Reading.**
  - A region's name stands in its middle when the region is tall enough,
    cut with an ellipsis to its width.
  - The summary gives the regions and those with data, the range, the most
    and the least, the regions without data and the rows without a region.
  - The tooltip gives the name, the value and the place «N из M».
  - The table has a row per region, largest first, with its place, the
    regions without data last: «Область|Значение|Место».
- **Keyboard.**
  - The plot is one Tab stop.
  - Left and Right walk the regions in reading order, top to bottom and
    left to right. Up and Down go to the nearest region above or below.
    Home and End go to the first and the last.
  - Each region is said with its value and place: «Речной: 6,4, место 1 из
    8», or «Степной: нет данных».
  - Enter and Space select (`select {index, region, name, value, rank}`),
    and Escape clears.
- **Reuse.** `geoRegions`, `geoValues`, `projectionOf`, `geoLayout`,
  `regionOrder` and `nearestRegion` are in the chart core, for a later map
  with points to share.

## Examples

The examples and tests draw an invented map of nine districts and a
warehouse scheme, not a real boundary. «Озёрный» is a MultiPolygon with an
island, «Центральный» has a lake as a hole, «Степной» has no value, and
one row names a district («Горный») the map does not have.

The first paint of the reference and the small example is over the 8 KB
limit, because the boundaries stand in the settings the first paint
carries. Both declare `first-paint` `max-bytes` 12288 with that reason in
`examples.json`.

## Fixed during the work

- **The names were cut short** in the smaller districts. The room for a
  name is now the region's width and the height test a line and a half of
  the font, so every district's name is written on every size rung.
- **The reading order clashed** with the scatter's `readingOrder` in the
  core. It is now `regionOrder`.
- **`scheme` was taken for a status** by ui-source's axis rule, as the
  heatmap's was. The package lists `chart-map.scheme` as pending with its
  reason in `tests/package-public-api-axes.contract.test.mjs`, and its
  record in ui-source's `contracts/public-api-axes.json` was ordered from
  the SIMAI Framework dispatcher, beside the heatmap's.

## Checks

Unit tests (`tests/chart-core.test.mjs`) cover:

- reading the shapes: a Polygon and a MultiPolygon, a key by id, by
  `properties.id` and by a named property, a name by property or the key,
  and what is left out (no key, a key twice, a geometry that is not a
  polygon);
- joining the values: the fields found, a row naming no region and a row
  without a number counted, the last of a key twice kept;
- the layout: the shape fitted into the box with its proportions, the path
  and the name's place, the reading order and the nearest region above and
  below; north up in the three geographic projections, the albers middle
  meridian at zero, and a map across the 180th meridian kept whole.

The core suite now passes 152.

Manifest probes (`examples.json`, page `conformance`), all four pass:

- **p1:** a figure named by its label, and the plot is one group with a
  path per region, 9 in all, a dashed gap and the island kept. The
  summary reads:

  > «Областей: 9, с данными: 8; значения от 1,9 до 6,4. Больше всего —
  > «Речной»: 6,4. Меньше всего — «Центральный»: 1,9. Без данных: 1. Строк
  > без области на карте: 1.»
- **p2:** the keyboard. Right says «Лесной: 4,1, место 4 из 8», then
  «Северный: 3,2, место 6 из 8». Down goes to «Центральный: 1,9, место 8
  из 8», End to «Степной: нет данных», Enter selects it and Escape clears.
- **p3:** a warehouse scheme in plane coordinates on a diverging scale.
  The middle step holds zero, and the hidden table has a row per region,
  largest first, with «Хранение A|-12|6» among them.
- **p4:** the error state offers a retry that sends `refresh`.

Browser (`tests/browser/tier-one.browser.mjs`, block 3p):

| Case | Result |
|---|---|
| Plot, light and dark, 375 and 1280 px | Heights are ½: 160 px, 1: 240 px and 2: 384 px, with 9 regions and 9 names written on each |
| Names against their fill | Light 5.45 to 13.28:1, dark 5.72 to 11.68:1 (4.5:1 required) |
| Legend labels and the gap's line | Legend light 6.47, dark 5.95:1; gap line light 4.47, dark 5.95:1 (3:1 required) |
| Keyboard | Tab lands on the plot. Right says «Лесной: 4,1, место 4 из 8», then «Северный: 3,2, место 6 из 8»; Down reaches «Центральный: 1,9, место 8 из 8»; End «Степной: нет данных». Enter selects index 8 with value null and rank 0; the tooltip reads «Степной Значение нет данных». Escape clears and Tab leaves |
| Pointer | Over «Речной» the tooltip reads «Речной Значение 6,4 Место 1 из 8» |
| Forced colours | Every region is the canvas (white) with a line of the text colour (black) |

The stand was also checked by eye in dark at 760 px: the districts in
their steps, the lake hole and the island visible, «Степной» dashed, and
the legend «1,9 – 2,8 … нет данных».

## Build

ui-builder `verify-package-reproducibility.cjs` ran from commit `f5a5a35`
over ui-source `ec2f29df`, the pin. The result was **PASS**:

- two builds are byte-identical;
- 1082 files;
- the output manifest sha256 is
  `e2881121f28f327ec8ed73e182dff4941e5133057347d5c0a4ad17da769ad54d`.

The package receipt names framework `ui-62b1d9b6dc8d`. The archive sha256 is
`0a7975f9dadb7903c0924693571b73bdfa122044954eedec3a03ea324b57af7e`.

| Check | Result |
|---|---|
| Manifest probes | 88/88 |
| First paint | 274 unchanged |
| First-paint gate | 510/510, CLS 0 |
| Browser probes | pass |
| Browser, tier one (blocks 1–3p) | pass |
| Suite | 152/0 |

## Size

`chart-map` is 10.0 KB of JS and 2.0 KB of CSS, gzip (minified). The
other charts are unchanged.

## Next

The name `sf-chart-map` was reserved by the dispatcher in ui-control
`906d127` (bus `msg-02933d743db64e92b1e1`), checked free in ui-source,
ui-pro, ui-view and ui-chart. It enters the registry with the package's
first release.

Maps in the package, zoom and pan, points or proportional symbols on the
map, and a continuous colour ramp are outside 0.1.0.
