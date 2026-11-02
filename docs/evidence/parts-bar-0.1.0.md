# sf-parts-bar 0.1.0 evidence

`sf-parts-bar` is a new chart of the `chart` family: the parts of one whole
in one thin bar, with the free remainder of a capacity (a disk, a quota, a
model's context). The owner chose the name in chat on 2026-11-02
(`docs/DECISIONS.md` D2). Date: 2026-11-02. The pin stays `ui-2d39b617a719`.

## What it is

| Item | Where |
|---|---|
| The bar: HTML boxes that share its width by value, so it needs no measured width and the first paint is the drawn bar | `components/src/smart/parts-bar/index.js`, `js/templates/default.js` |
| `max`: the capacity; the free remainder is the bar's last part, «Свободно» (`free-label`); parts past the capacity fill the bar and the summary says by how much | same |
| The head: «45 из 100 (45 %)» with `max`, «всего 1 000» without (`total`) | same |
| `legend`: `list` (name, value, share per row), `inline` (for a tile) or `none` | same, `default.css` |
| `max-parts` folds the smallest into «Другое»; the table keeps every row and the remainder | same |
| Keyboard: one Tab stop; the arrows walk the parts in reading order (right to left on an RTL page), the remainder included; Enter chooses a part, never the remainder | same |
| The table from the settled data (chart-core/settle), as the other charts | same |
| RU and EN words | `lang/ru.json`, `lang/en.json` |
| Journal: `smart.parts-bar` 0.1.0 `added` | `components/docs/chart/units.json` |
| Stand, dashboard page, Tier 1 browser probe | `examples/stand.html`, `examples/dashboard.html`, `components/tests/browser/tier-one.browser.mjs` |

It has no legend toggle: hiding a part of a capacity would make the free
remainder wrong. The list is text, not buttons.

## Checks

The conformance page (`examples.json`, 5 checks) covers:

- the figure and its name;
- the summary, with the parts largest first and the remainder last;
- the keyboard and `select`;
- folding without a capacity;
- going over the capacity;
- the error state and `refresh`.

The Tier 1 browser probe adds the parts bar, in light and dark at 375, 768
and 1,280 px and at each size rung:

- the bar is the rung's thickness (6, 12 and 20 px);
- no part leaves the bar, and nothing leaves the list or the page;
- one box per part in reading order, with the remainder last;
- the first three parts differ and hold at least 3:1 against the page:
  4.48–4.49 in light, 5.96–5.98 in dark.

The free remainder is 1.29:1 (light) and 1.44:1 (dark) against the page. It
is the empty track, and the head, the list and the summary say it in words.

The probe also checks three more things:

- **Keyboard:**
  - «Приложения: 13 (13 %)» after two arrows;
  - «Свободно: 55 (55 %)» on End;
  - Enter on the remainder sends nothing.
- **Right to left:** the first part is at the right, and Left walks forward.
- **Forced colours:** the parts are solid CanvasText and the remainder is
  Canvas.

## Build

ui-builder `verify-package-reproducibility.cjs` from commit `44a1db1`, over
ui-source at the pin, gave **PASS**:

- two builds are byte-identical;
- 314 files;
- output manifest sha256
  `b19b602bbbb79a206eb43db9ff4acafda7b67f8682250b155237b453a69c8b22`.

The package receipt names framework `ui-2d39b617a719` and archive sha256
`43970126eb5d2888526931d4c6a3e052958a502e6530d6e045cc61a1da590a35`.

Checks on the release build:

| Check | Result |
|---|---|
| Manifest probes | 32/32 |
| First paint | 72 unchanged |
| First-paint gate | 132/132, CLS 0 |
| Browser probes | 2/2 |
| Suite | 124/0 |

## Size

| Chart | JS, gzip | CSS, gzip |
|---|---|---|
| `parts-bar` | 8.2 KB | 2.1 KB |

The chart core (data reading, number and time formats, the cursor, the
settled table) is bundled into each chart, as in every other chart, and is
most of the 8.2 KB. The bar's own code is small: no SVG, no geometry and no
ResizeObserver. A shared package module (M1 part 10) loads the core once.
The parts bar is not in Tier 1, so the Tier 1 sum of 51.7 kB is unchanged.
