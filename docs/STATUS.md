# Status

| Stage | State | Result |
|---|---|---|
| R. Research | done (2026-11-02): systems, catalogue, parameters, rendering, with a measured SVG/Canvas bench | `docs/research/` |
| D. Decisions for the owner | decided (2026-11-02): D1 by the dispatcher; D2, D3, D5 by recommendation under the owner's delegation; the D4 token order taken by the dispatcher | `docs/DECISIONS.md` |
| M0. Package skeleton and the first chart | done (2026-11-02), accepted by the dispatcher: the chart core and `sf-line-chart` 0.1.0 | `components/`, `examples/`, `docs/evidence/M0.md` |
| M1. The rest of Tier 1 | done (2026-11-02), handed to the dispatcher: `sf-bar-chart`, `sf-pie-chart`, `sf-sparkline`, `sf-metric` 0.1.0, built reproducibly | `components/`, `examples/dashboard.html`, `docs/evidence/M1.md` |
| M2+. The catalogue by tiers | — | — |
| Release | waits for the Framework pair with parts 1–7 of the M0 evidence (the dispatcher's order) | — |

Pinned SIMAI Framework release: `ui-2d39b617a719` (ui-source `426123e2`, npm
`@simai-studio/ui@5.20261102.1106`), in `components/framework.lock.json`.
