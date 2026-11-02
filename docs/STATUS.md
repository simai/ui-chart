# Status

| Stage | State | Result |
|---|---|---|
| R. Research | done (2026-11-02): systems, catalogue, parameters, rendering, with a measured SVG/Canvas bench | `docs/research/` |
| D. Decisions for the owner | decided (2026-11-02): D1 by the dispatcher; D2, D3, D5 by recommendation under the owner's delegation; the D4 token order taken by the dispatcher | `docs/DECISIONS.md` |
| M0. Package skeleton and the first chart | done (2026-11-02), accepted by the dispatcher: the chart core and `sf-chart-line` 0.1.0 | `components/`, `examples/`, `docs/evidence/M0.md` |
| M1. The rest of Tier 1 | done (2026-11-02), accepted by the dispatcher: `sf-chart-bar`, `sf-chart-pie`, `sf-chart-sparkline`, `sf-chart-metric` 0.1.0, built reproducibly | `components/`, `examples/dashboard.html`, `docs/evidence/M1.md` |
| Line chart 0.2.0 | done (2026-11-02), handed to the dispatcher: `stack` (stacked and normalized areas) on `sf-chart-line`, the core's `bandPath`, built reproducibly | `components/src/smart/chart-line/`, `docs/evidence/chart-line-0.2.0.md` |
| Stand and live data | done (2026-11-02): the chart stand, the live data page; the data table no longer rebuilds on every update (line 0.2.1, bar and pie 0.1.1) | `examples/stand.html`, `examples/live.html`, `docs/evidence/table-settle.md` |
| Parts bar 0.1.0 | done (2026-11-02), to hand to the dispatcher: `sf-chart-parts`, the parts of one whole in one thin bar with the free remainder of a capacity (the owner's decision of the name) | `components/src/smart/chart-parts/`, `docs/evidence/chart-parts-0.1.0.md` |
| Bar chart 0.2.0 | done (2026-11-02), to hand to the dispatcher: `lines` on `sf-chart-bar` (bars and lines in one chart, the lines on the shared axis or their own; the owner's decision of the form) | `components/src/smart/chart-bar/`, `docs/evidence/chart-bar-0.2.0.md` |
| Rename to block `chart` | done (2026-11-02), on the dispatcher's order from the owner's naming rule `sf-[set]-<block>[-<variant>]`: `sf-chart-line`, `-bar`, `-pie`, `-sparkline`, `-parts`, `-metric`; folders, ids, tags, events, classes, variables, examples and docs renamed, no aliases | `docs/evidence/rename-chart-block.md` |
| Page colours | done (2026-11-02), to hand to the dispatcher: `colors` (key → Framework role or CSS colour) on line 0.3.0, bar 0.3.0, pie 0.2.0 and parts 0.2.0, `color` on sparkline 0.2.0; the shared `chart-core/colors.js` (the owner's decision D6) | `components/src/smart/chart-core/colors.js`, `docs/evidence/page-colours.md` |
| Palettes | done (2026-11-03), to hand to the dispatcher: `palette` (`vivid`, `soft`, `warm`, `cool`, `brand`) on line 0.4.0, bar 0.4.0, pie 0.3.0 and parts 0.3.0, made by `scripts/chart-palettes.mjs` on the Framework's tone ladder (the owner's decision D7); `examples/palettes.html` | `components/src/smart/chart-core/palettes.js`, `docs/evidence/palettes.md` |
| M2+. The catalogue by tiers | — | — |
| Release | waits for the Framework pair with parts 1–10 of the M0 and M1 evidence (the dispatcher's order) | — |

Pinned SIMAI Framework release: `ui-2d39b617a719` (ui-source `426123e2`, npm
`@simai-studio/ui@5.20261102.1106`), in `components/framework.lock.json`.
