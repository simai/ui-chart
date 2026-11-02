# Start handoff: SIMAI Chart

From: SIMAI Framework dispatcher (`task-fcda784dfeba45c1bf64`), 2026-11-02.
Owner request (2026-11-02, in the dispatcher chat): a repository of its own
for charts; study the best charts in the world, choose from them which charts
to make and what parameters they take; everything tied to SIMAI Framework,
working by the Framework standards, built as Smart components.

## Goal

A catalogue of Smart chart components (`sf-chart-*`) that a SIMAI product
(Docara docs, Larena, Bitrix solutions, ui-admin dashboards, chat, mail)
drops onto a page like any other Smart component: same Loader, same tokens,
same themes, same sizes, same accessibility, same release route. It is
chosen from a study of the best chart systems and is not a wrapper around
one of them.

## Done when (this handoff)

1. **Research** (`docs/research/`) is written and every claim has a source
   link.
2. **Decisions** (`docs/DECISIONS.md`) list what the owner must accept, each
   with a recommendation.
3. **The owner accepts the decisions.**
4. **M0 ships:**
   - The package skeleton is built over a pinned Framework pair.
   - The first chart passes its tests and browser probes in both themes.
   - The dispatcher takes it through the package route; the dispatcher
     releases it, not you.

## Stage R: research

Study at least these, from their docs, galleries and source, for ideas only:

| Group | What to study |
|---|---|
| Grammar and declarative | Vega-Lite, Observable Plot, ggplot2 |
| Full libraries | Apache ECharts, Highcharts (its accessibility module especially), amCharts, Chart.js, AntV G2 / G2Plot |
| Design-system charts | IBM Carbon Charts, Material 3 data visualisation, Atlassian, Salesforce Lightning, Fluent, Apple Swift Charts and the HIG on charts |
| Component libraries | Recharts, Nivo, visx, Tremor, Apex |
| Editorial | Datawrapper, Flourish, FT Visual Vocabulary, The Economist and NYT graphics |
| BI and monitoring | Tableau, Power BI, Looker / Google Charts, Grafana panels, Superset |
| Accessibility | W3C WAI on complex images, Chartability, sonification and data-table fallbacks |

### Output files

- **`docs/research/systems.md`.** A comparison matrix. Rows are the systems; columns:
  - chart types;
  - data model;
  - how a chart is declared;
  - theming;
  - interaction (tooltip, legend toggle, zoom/brush, crosshair, drill-down);
  - accessibility (keyboard, screen reader, table fallback, patterns besides colour);
  - responsiveness;
  - large data (SVG versus Canvas, decimation);
  - animation and reduced motion;
  - export (PNG, SVG, CSV);
  - localisation of numbers and dates;
  - RTL;
  - licence.

  End with what each system does best and what to avoid.
- **`docs/research/catalogue.md`.** The candidate charts, tiered:
  - **Tier 1:** a dashboard cannot ship without it, e.g. line, area, bar/column, stacked and grouped, pie/donut, sparkline, KPI with trend.
  - **Tier 2:** common analytics, e.g. scatter/bubble, combo, heatmap, histogram, box plot, funnel, gauge/progress, radar.
  - **Tier 3:** specialised, e.g. treemap, sunburst, sankey, gantt/timeline, candlestick, choropleth map.

  For each chart give:
  - when to use it and when not;
  - the usage evidence (how many systems have it);
  - whether it is one component or a variant of another (a stacked bar is a `stack` setting, not a tag).
- **`docs/research/parameters.md`.** The parameter model:
  - **Data:** one tabular data contract shared by every chart: fields, types, a `series` / `x` / `y` / `value` / `category` mapping, missing values, time and number formats.
  - **Encodings.** Scales: linear, log, time, band, ordinal.
  - **Axes, grid and legend.**
  - **Tooltip.**
  - **Annotations:** reference line, band, label.
  - **Stacking and normalising.**
  - **Sizes on the Framework size ladder.**
  - **Colour.** The colour schemes:
    - categorical;
    - sequential;
    - diverging;
    - status (positive / negative / neutral).

    Each scheme sits on Framework colour roles and the alpha scale, in light and dark.
  - **Number and date formatting through Intl.**
  - **Events.**
  - **Public CSS variables:** 5–10 per component.

  Map each parameter to the attribute, property, event, slot or CSS variable that carries it.
- **`docs/research/rendering.md`.**
  - Own renderer: SVG by default, Canvas past a measured point-count threshold.
  - One shared chart core (scales, axes, layout, tooltip, keyboard, data table) that each chart component uses.
  - Bundle-size and first-paint targets.
  - How a chart prints and exports.

  If you recommend a third-party engine instead, give the measured reasons; a runtime dependency needs the owner's yes.

## Stage D: decisions for the owner

Write `docs/DECISIONS.md`: one short section per decision, each with options,
a recommendation and its reason. In plain words: the owner reads it in Russian, so
put a two-line Russian summary on top of each. At least:

- Tier 1 list.
- Tag names: `sf-chart-line` and so on, or one `sf-chart type="line"`. Recommend one with reasons from the study and the Smart standard.
- The data contract.
- The colour schemes. These may need new Framework tokens: order them from the dispatcher, do not invent them locally.
- The renderer.

Send the owner the decisions through the dispatcher (bus letter to
`task-fcda784dfeba45c1bf64`, type `request`), or through `simai ask-owner` for the
critical ones (names, architecture, new packages).

## Stage M0: package skeleton and the first chart

- **Package skeleton.** Copy the shape of `simai/ui-pro/components/` (package.json, overlay, test runner, browser probes, framework.lock.json), with the package named `chart`.
- **Pin.** Pin the current Framework pair. At the time of writing that is `ui-2d39b617a719`, npm `@simai-studio/ui@5.20261102.1106`, ui-source `426123e2`. Take the current one from `simai/ui-control` `control/COMPATIBILITY_LEDGER.yaml`.
- **First chart.** The chart core plus the first Tier 1 chart the owner accepts, with:
  - a passport (`simai.linkage` 1.0.0);
  - its manifest (`smart-component-manifest` 2.5.0);
  - a change-journal entry;
  - unit tests;
  - browser probes in light and dark at 375 / 768 / 1280;
  - keyboard and screen-reader checks;
  - the data-table fallback;
  - reduced-motion checks;
  - a geometry check on the size ladder.
- **Reference page.** A local example page (examples/) that loads the chart through `SF_BOOT_CONFIG.packages.chart` over the pinned pair, as a product would.
- **Hand-over to the dispatcher.** Send the dispatcher a `result` with the commit, the evidence and the list of Framework parts you needed. The dispatcher adds the `chart` package to the release route (package build, release asset, package index) and releases it.

## Standards to follow

All in `simai/ui-source` unless named otherwise. Read the current version; when
these and a studied library disagree, the standard wins.

- **`simai.smart-component` 1.3.14.** `simai/ui-control` `control/smart-architecture/standard/`: layers, manifest, ports, public surface, prefixes and the one registry. Also `smart-components-short-ru.md` there, and `simai.smart-vocabulary` 1.1.5.
- **`simai.component-package` 1.1.1.** `contracts/standards/simai.component-package/`. Also `docs/developer/component-packages.md`.
- **`simai.linkage` 1.0.0:** passports, inventory, change report.
- **`simai.change-lifecycle` 1.0.0:** the journal and the dated stages.
- **`simai.interaction-rules`:** keyboard, focus, hover, touch, Escape.
- **`simai.ai-development` 1.0.0:**
  - contracts before code;
  - public surface only;
  - English Framework text;
  - names carry no version;
  - reproducible builds.
- **`docs/developer/smart-component-authoring.md`** and **`docs/developer/smart-component-terminology.md`.**
- **Foundations:** `docs/foundation-*.md`, covering geometry, control spacing, layout tokens, logical sides (RTL) and touch fields.
- **Colour:** three icon/ink roles (on-surface, on-surface-variant, on-disable).
- **The alpha scale:** state 4/8/12, fill 12–32 (dark +12 for same-tone fills), ink 48/64/80; nothing outside it.
- **One size ladder:** sub-elements on the ladder.
- **Light and dark themes** from the theme tokens, never hard-coded colours.

## Boundaries and stop conditions

- **Write scope:** `simai/ui-chart` only. Framework gaps are orders to the
  dispatcher. The ui-pro components are not edited from here; if a chart needs one (e.g. `sf-data-view` for the table fallback), use its public surface.
- **Licence:** the same as SIMAI Pro (PolyForm Small Business or Noncommercial, or the SIMAI Commercial License; owner, 2026-11-02); `components/package.json` carries `PolyForm-Small-Business-1.0.0 OR PolyForm-Noncommercial-1.0.0 OR LicenseRef-SIMAI-Commercial`. Copy no code, styles, palettes or icons from any studied library. Record every external idea with its source link.
- **Publishing:** keep the repository private until the first release (then it opens). Do not publish a package, release or docs page; the dispatcher's route does that.
- **Stop and report to the dispatcher if:**
  - a chart cannot be made without a third-party runtime;
  - the Smart standard cannot express a chart (a new port kind, a new manifest field);
  - a needed token or core API is missing.
- **Evidence:** every stage ends with its files committed and a bus `result`.
  Carry the commit sha and what was checked.

## First steps

1. Restore your state: `simai continue --repo "$PWD" --client claude`, or
   start the work with `simai run --task "SIMAI Chart: research, decisions, M0"`.
2. Read the standards above and `simai/ui-pro/components/` (shape only).
3. Write `docs/research/systems.md` first, then the catalogue, parameters and
   rendering; commit each.
4. Write `docs/DECISIONS.md` and send it to the dispatcher.
