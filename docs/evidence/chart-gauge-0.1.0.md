# Gauge 0.1.0: evidence

`sf-chart-gauge` is the second chart of the owner's M2 plan
(`docs/DECISIONS.md` D9, the owner's «Да, делай шкалу» of 2026-11-03). It
shows one measured value on a fixed scale, with bands and a target. Its
form was decided by the recommendation under the owner's delegation and is
recorded in D9.

## What it is

- **Data.**
  - `value`, `min` (0) and `max` (100) are numbers.
  - `bands` is a property: zones in order, `{from?, to, role, label?}`. A
    band starts where the one before ends.
  - `target` is the reference value, named by `target-label` («Цель» by
    default).
- **Scale** (`chart-core/gauge.js`).
  - A value's share of the scale is kept to 0..1.
  - The bands are cut to the scale. A role that is not a Framework role is
    neutral, and a band empty inside the scale is dropped.
  - A value past the scale is in the band at that end.
- **Form.**
  - `shape="arc"` is a half circle in a fixed SVG view box (200 × 101),
    scaled by its width. Its width is at most 160, 256 or 448 px by the
    rung, and its height follows by the box's ratio.
  - `shape="linear"` is a rail of the rung's thickness (6, 12 or 20 px),
    with the target mark across it and a strip of the bands under it.
  - The value fills the track in its band's colour (the role's graphic
    tone). The band's name is written under the value, so colour is never
    the only cue.
  - The target line under the gauge says how far the value is from the
    target: «Цель: 80 %, ниже на 8 %».
- **Accessibility.**
  - A `meter` with `aria-valuemin`, `aria-valuemax` and `aria-valuenow`
    (kept to the scale), and a value text with the band's name. It takes no
    focus.
  - The summary gives the value on its scale and its share, the zone with
    its range, and the distance to the target.
  - The table is hidden by default and lists the value, the target and each
    band with its range.
- **Forced colours.** The track is an outline, the value and the bands are
  solid, and the target is the highlight colour. The zone's name still
  says which band.

## Fixed during the work

- **The stand gave `bands` as an attribute.** A list is a property only
  in the core (`element-manifest.js`, `PROPERTY_ONLY`). The stand now sets
  `bands` as data, like `items` and `names`.
- **The target line ran together.** It read «Цель: 80 %ниже на 8 %» to a
  screen reader. The distance is now its own phrase, `target-where`.
- **A value past the scale had no zone.** 112 % of memory over a critical
  band was in none. It is now in the band at the end it passed, so the
  value is critical.

## Checks

Unit tests (`tests/chart-core.test.mjs`) cover:

- the share, kept to the scale, with a gap and an empty scale;
- the arc's angles;
- the bands: chained, cut to the scale, an unknown role made neutral, a
  band outside the scale dropped;
- the band of a value at each edge.

Manifest probes (`examples.json`, page `conformance`), all four pass:

- **p1:** a figure named by its label. The meter covers 0–100 with value
  72 and the value text «72 %, Внимание». The summary reads «72 % на шкале
  от 0 % до 100 % (72 %). Зона «Внимание»: 70 % – 90 %. Цель 80 %: ниже на
  8 %.» Three bands, the value and the target mark are drawn.
- **p2:** value 112. The meter's value is 100, and the summary reads «112 %:
  выше шкалы, она кончается на 100 %. Зона «Критично»: 90 % – 100 %. Цель
  80 %: выше на 32 %.»
- **p3:** the linear form. It fills 72 % of its rail, its target mark is
  at 80 %, and the bands are a strip of three.
- **p4:** the error state offers a retry that sends `refresh`.

Browser (`tests/browser/tier-one.browser.mjs`, block 3e):

| Case | Result |
|---|---|
| Arc, light and dark, 1280 px | ½: 160 × 80.8, 1: 256 × 129.3, 2: 448 × 226.2 px, each its view box's ratio; the value inside the arc |
| Arc, light and dark, 375 px | ½ and 1 as at 1280 px; 2: 343 × 173.2 px, the width of the room |
| Bar, every rung and width | 6, 12 and 20 px thick, filled to 0.72 |
| Value against the page | light 4.49:1 (`rgb(178, 99, 0)`), dark 5.99:1 (`rgb(216, 121, 0)`), the warning band's colour (3:1 required) |
| Meter | named «Загрузка», value 72, value text «72 %, Внимание»; Tab passes it by |
| Forced colours | a track outline, a solid value, the zone «Внимание» written |

The stand was also checked by eye in both themes for each example: the arc
with its bands, the bar, the scale without bands, and a value past the
scale.

## Build

ui-builder `verify-package-reproducibility.cjs` ran from commit `b0de373`
over ui-source `5776ff08`, the pin. The result was **PASS**:

- two builds are byte-identical;
- 530 files;
- the output manifest sha256 is
  `8a050c95d21c05fd3828e1553e533f5bd39db0377fd46de8b9f92e00fe5d51f5`.

The package receipt names framework `ui-de2b4437234a`. The archive sha256 is
`0c21c212086f68c7752efece6b2abe72a860e18658723f898cf45c1fcdf7ae9e`.

| Check | Result |
|---|---|
| Manifest probes | 45/45 |
| First paint | 138 unchanged |
| First-paint gate | 258/258, CLS 0 |
| Browser probes | 2/2 |
| Suite | 129/0 |

## Size

`chart-gauge` is 7.9 KB of JS and 2.3 KB of CSS, gzip (minified).

## Next

The name `sf-chart-gauge` was sent to the dispatcher on 2026-11-03 (bus
`msg-1b83ce17cc024755aa24`). The next chart of M2 is `sf-chart-scatter`.

The dispatcher reserved the name in ui-control
`control/decisions/2026-11-02-ui-chart-package.md` (`45f8f54`), checked
free in ui-source and ui-pro (bus `msg-3ca34ec23e364eec9fa2`). It enters the registry with
the package's first release.
