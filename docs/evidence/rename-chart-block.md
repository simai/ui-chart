# Rename to block chart: evidence

The dispatcher sent an order (bus `msg-bd86f1c876a1465ca5d4`, 2026-11-02)
that follows the owner's naming rule for every Smart tag:
`sf-[set]-<block>[-<variant>]`, from the general to the specific (ui-control
`control/decisions/2026-11-02-smart-component-naming.md`, commit `262bd1e`).
The charts are block `chart`. Nothing of the package was released, so the
names changed outright, with no aliases.

| Before | After |
|---|---|
| `sf-line-chart` | `sf-chart-line` |
| `sf-bar-chart` | `sf-chart-bar` |
| `sf-pie-chart` | `sf-chart-pie` |
| `sf-sparkline` | `sf-chart-sparkline` |
| `sf-parts-bar` | `sf-chart-parts` |
| `sf-metric` | `sf-chart-metric` |

## What was renamed

The rename covers:

- the folders under `components/src/smart/`;
- the ids (`smart.chart-*`), tags, events (`sf-chart-bar-select` and so on),
  CSS classes and public variables (`--sf-chart-bar-height` and so on);
- the rule names (`cl-chart-*`) and the JS names (`SfChartBar`, `renderChartBarTemplate`);
- the journal's unit ids;
- the examples: `examples/chart-line.html` and every page's markup;
- the tests: `tests/browser/chart-line.browser.mjs` and the package lists;
- the README and STATUS, the evidence file names and the references in them.

The generated files and the first-paint snapshots were made again from the
renamed sources.

Two places keep the old names on purpose:

- **`docs/DECISIONS.md` D2** keeps its reasoning as it was decided, with a
  note at the top that the owner's rule replaced it. One tag per chart and
  variants as settings still hold under the new rule; the bar chart's
  `lines` is one such setting.
- **`docs/research/`** is left as written.

The `x-decisions` of each manifest now give the new rule as the reason for
its name.

Versions are unchanged: nothing was released, so no consumer has the old
names.

`chart-core/format.js` imports nothing. It can be moved to the shared core
format module the reuse audit names as it is.

## Build

ui-builder `verify-package-reproducibility.cjs` from commit `48c2a57`, over
ui-source at the pin, gave **PASS**:

- two builds are byte-identical;
- 322 files;
- output manifest sha256
  `ccd69428b9609975e2aaa80a3e7aab1ab4c0c5a7de579a66b1331453f5fad7eb`.

The package receipt names framework `ui-2d39b617a719` and archive sha256
`86ea1530604bb5ca5bd06429c7a394d3c19503124f9c73499df326579f65b268`. No file
of the build output holds an old tag.

Checks on the release build:

| Check | Result |
|---|---|
| Manifest probes | 33/33 |
| First paint | 76 unchanged |
| First-paint gate | 140/140, CLS 0 |
| Browser probes | 2/2 |
| Suite | 124/0 |

The pages were also checked in the browser:

- **Dashboard:** every chart is defined and drawn under its new tag.
- **Staged dashboard:** the first screen starts at once, and the other parts
  wait for scroll or for their section to open, as before.
- **Line chart, live and stand pages:** they draw.

## Size

Size is the same within a few bytes.

| Chart | JS, gzip |
|---|---|
| `chart-line` | 12.2 KB |
| `chart-bar` | 12.5 KB |
| `chart-pie` | 9.5 KB |
| `chart-sparkline` | 6.1 KB |
| `chart-metric` | 4.2 KB |
| `chart-parts` | 8.2 KB |
