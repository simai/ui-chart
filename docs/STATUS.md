# Status

| Stage | State | Result |
|---|---|---|
| R. Research | done (2026-11-02): systems, catalogue, parameters, rendering, with a measured SVG/Canvas bench | `docs/research/` |
| D. Decisions for the owner | decided (2026-11-02): D1 by the dispatcher; D2, D3, D5 by recommendation under the owner's delegation; the D4 token order taken by the dispatcher | `docs/DECISIONS.md` |
| M0. Package skeleton and the first chart | done (2026-11-02), accepted by the dispatcher: the chart core and `sf-line-chart` 0.1.0 | `components/`, `examples/`, `docs/evidence/M0.md` |
| M1. The rest of Tier 1 | done (2026-11-02), accepted by the dispatcher: `sf-bar-chart`, `sf-pie-chart`, `sf-sparkline`, `sf-metric` 0.1.0, built reproducibly | `components/`, `examples/dashboard.html`, `docs/evidence/M1.md` |
| Line chart 0.2.0 | done (2026-11-02), handed to the dispatcher: `stack` (stacked and normalized areas) on `sf-line-chart`, the core's `bandPath`, built reproducibly | `components/src/smart/line-chart/`, `docs/evidence/line-chart-0.2.0.md` |
| Stand and live data | done (2026-11-02): the chart stand, the live data page; the data table no longer rebuilds on every update (line 0.2.1, bar and pie 0.1.1) | `examples/stand.html`, `examples/live.html`, `docs/evidence/table-settle.md` |
| M2+. The catalogue by tiers | — | — |
| Release | waits for the Framework pair with parts 1–10 of the M0 and M1 evidence (the dispatcher's order) | — |

Pinned SIMAI Framework release: `ui-2d39b617a719` (ui-source `426123e2`, npm
`@simai-studio/ui@5.20261102.1106`), in `components/framework.lock.json`.
