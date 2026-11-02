# Page colours: evidence

The owner said yes on 2026-11-02 to a page setting its own series colours
(`docs/DECISIONS.md` D6). The palette order to the Framework (D4,
`--sf-chart-1…8`) stands: it becomes the default colours, and `colors` stays
the page's way to say which series is which colour.

| Chart | Version | Setting |
|---|---|---|
| `sf-chart-line` | 0.3.0 | `colors`, by series key |
| `sf-chart-bar` | 0.3.0 | `colors`, by series key, bars and lines alike |
| `sf-chart-pie` | 0.2.0 | `colors`, by category |
| `sf-chart-parts` | 0.2.0 | `colors`, by category; the free remainder keeps `--sf-chart-parts-free-color` |
| `sf-chart-sparkline` | 0.2.0 | `color`, one colour, over `--sf-chart-sparkline-color` |
| `sf-chart-metric` | 0.1.0, unchanged | none: its colours carry meaning (better, worse, status) |

## How it works

`chart-core/colors.js` is shared by the five charts.

- **A value** is a Framework role (`primary`, `secondary`, `tertiary`,
  `neutral`, `success`, `warning`, `error`, `info`), which becomes
  `var(--sf-on-<role>-container-graphic)`. It can also be any value
  `CSS.supports('color', …)` accepts.
- **Anything else is dropped** with a console warning. That covers a typo, a
  declaration such as `red; background: url(x)`, and markup. A value with
  `; { } < > " ' \` never reaches a style.
- **The colour** is a `--custom` class plus one private variable in a
  `style`. The class sits beside `--c1…--c4`, before the forced-colours
  block, so forced colours still win. The line and bar dashes stay.
- **Contrast check.** After a render, each page colour is resolved in the
  chart's place and compared with the first background up the tree. Under
  3:1, the console warns once. The chart still draws it.
- **Shape.** `colors` is an object setting. By the Framework's manifest
  rule it is a property or a `data-sf-settings` island, not an attribute.
  The docs show the property.

## Checks

Unit test (`tests/chart-core.test.mjs`):

- roles, CSS colours and variables are accepted;
- markup, declarations, unknown words and bad JSON are refused;
- the 21:1 contrast of black on white.

Browser (`tests/browser/tier-one.browser.mjs`, part 3b):

| Case | Result |
|---|---|
| bar `{q1: 'error', q2: '#0a7f6f'}` | q1 = the error graphic tone `rgb(223, 54, 47)`, q2 = `rgb(10, 127, 111)` |
| same data with the series swapped | the same colours by key |
| legend swatch | the series colour |
| `red; background: url(x)` and `banana` | dropped, palette kept, two warnings |
| `#f4f4f4` on the light page | drawn, warned at 1.10:1 |
| pie `{phone: 'error'}` | phone red, the other parts keep the palette |
| parts `{docs: '#0a7f6f'}` | that part only |
| sparkline `color="success"` | `rgb(25, 138, 39)`, the success graphic tone |
| forced colours, bar q1 `#0a7f6f` | `rgb(0, 0, 0)`: the system colour wins |

## Build

ui-builder `verify-package-reproducibility.cjs` ran from commit `5bc7cba`
over ui-source at the pin. The result was **PASS**:

- two builds are byte-identical;
- 342 files;
- the output manifest sha256 is
  `af616b2841669e1624eb9f582f44cae4d6de9165fa478256f669843d6ba5756e`.

The package receipt names framework `ui-2d39b617a719`. The archive sha256 is
`8d7a578d1aea6dad22cf9ba57e51956c7c1eaf42ed43113210d5a94d97e74377`.

| Check | Result |
|---|---|
| Manifest probes | 33/33 |
| First paint | 86 unchanged, among them 5 new `colors` examples |
| First-paint gate | 160/160, CLS 0 |
| Browser probes | 2/2 |
| Suite | 125/0 |

The snapshots of the old examples are byte-identical to before. With no
`colors`, a chart's markup is unchanged.

## Size

| Chart | Before, JS gzip | After |
|---|---|---|
| `chart-line` | 12.2 KB | 13.4 KB |
| `chart-bar` | 12.5 KB | 13.6 KB |
| `chart-pie` | 9.5 KB | 10.6 KB |
| `chart-sparkline` | 6.1 KB | 7.0 KB |
| `chart-parts` | 8.2 KB | 9.4 KB |
| `chart-metric` | 4.2 KB | 4.2 KB |

Each chart carries its own copy of `colors.js`, as it does the rest of the
core. The six now sum to about 58.3 kB, up from 52.6 kB. The shared module
(part 10 of the dispatcher's order) takes the copies out.
