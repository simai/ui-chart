# Changes

The set `chart`, by its npm version `@simai-studio/chart`; component
versions in brackets.

## 1.3.0 — 2026-11-22

- Series apart without hue (DSA-1, decision D20): in forced colours and
  under a display-settings scheme on the root (`data-sf-scheme`) every
  series past the first carries its own cue, and the legend and tooltip
  swatches show the same cue. Lines: a dash per series and a mark shape per
  series; bars and the histogram, slices and parts: a hatch per series;
  box, scatter bubbles, radar rings and waterfall take their forced-colours
  cues in a scheme too. A pie share takes the first ink that holds 4.5:1
  against its own slice as drawn, in both themes and every scheme. The
  shared core `chart-core` 0.5.0 (ABI 1, unchanged) holds the detection
  and one page watcher (sf-chart-line 0.5.0, sf-chart-bar 0.6.0,
  sf-chart-pie 0.4.0, sf-chart-parts 0.4.0, sf-chart-box,
  sf-chart-scatter, sf-chart-radar, sf-chart-waterfall 0.2.0).
- Over the same SIMAI Framework pair `ui-078a4b4c6f6e` (ui-source
  `10145e63b9dc`, npm `@simai-studio/ui@5.20261116.1505`). Still needs
  core.runtime 1.38.0 or newer. The pie's first-paint snapshots follow the
  share inks; no other chart changed.

## 1.2.0 — 2026-11-17

- `sf-chart-metric` is no longer a chart of its own: it is the dated alias
  of SIMAI Framework's metric tile `sf-tile-metric` until 2027-01-01
  (decision C168; smart.chart-metric 1.0.0, a major of the unit). The
  element is the tile's heir: the former `data-state` (`loading`, `empty`),
  the `sf-chart-metric-open` event (it follows `sf-tile-metric-open` with
  its detail) and three public variables are mapped; the bundle carries
  none of the tile's code and its rule relates `cl-tile-metric`. Write
  `sf-tile-metric` with an `sf-chart-sparkline` in its `chart` slot. The
  set's change journal records `tag-sf-chart-metric-to-sf-tile-metric`,
  remove_after 2027-01-01.
- Over SIMAI Framework `ui-078a4b4c6f6e` (ui-source `10145e63b9dc`, npm
  `@simai-studio/ui@5.20261116.1505`). Still needs core.runtime 1.38.0 or
  newer. The first-paint snapshots follow the pair: `sf-empty-state`'s
  featured icon writes its attributes in another order and the map's
  skeletons carry `data-sf-late`; percents follow the pair's spelling
  («12.5 %» with a no-break space, C203). No other chart changed.

## 1.1.0 — 2026-11-09

- One chart core per page: `chart-core` is the set's shared core
  (`package.json` `simai.core` names the folder `chart-core` with ABI 1),
  so a page that shows several charts loads it once. Every chart rule
  relates to `cl-chart-core` first; the twelve modules only one chart used
  moved into that chart's `js/` folder, and the timeline module stays in the
  core for the view set's Gantt chart (module.chart-core 0.4.0, each chart a
  patch). Nothing a chart draws or says changes.
- Over SIMAI Framework `ui-cb287da78ab1` (ui-source `44a5efda6649`, npm
  `@simai-studio/ui@5.20261109.559`). Needs core.runtime 1.38.0 or newer
  (it was 1.25.0): the Loader loads a set's core before its charts.

## 1.0.3 — 2026-11-08

- The same nineteen charts, repinned to ui-0c23f6a0af12 (ui-source
  `da48ba8fde77`, npm `@simai-studio/ui@5.20261108.1449`), the pair Larena
  moves to. Released rather than re-receipted: over this pair
  `sf-progress-bar` writes `data-status` beside `status`, so the first-paint
  snapshots of the metric tile's `storage` example
  (`chart-metric/static/default/storage.html` and `storage.skeleton.html`)
  changed. No chart source changed. Still needs core.runtime 1.25.0 or newer.

## 1.0.2 — 2026-11-07

- The same nineteen charts, unchanged, repinned to ui-b58b5dec35e4
  (ui-source `195fc22bad4b`, npm `@simai-studio/ui@5.20261107.829`), the
  pair Larena moves to. Still needs core.runtime 1.25.0 or newer.

## 1.0.1 — 2026-11-07

- The same nineteen charts, unchanged, rebuilt over SIMAI Framework
  `ui-1ec283e856cd` (ui-source `82cf89e23ce8`, npm
  `@simai-studio/ui@5.20261106.1926`), so a product whose lock runs that
  pair (Larena) can pin the set: its receipt names the pair it was built
  over. Between the two pins ui-source changed no token, style or source a
  chart uses. Still needs core.runtime 1.25.0 or newer.

## 1.0.0 — 2026-11-06

- First version of the set: nineteen chart components, every one a 0.x
  preview — `sf-chart-line` (0.4.0), `sf-chart-bar` (0.5.0),
  `sf-chart-pie` (0.3.0), `sf-chart-parts` (0.3.0), `sf-chart-sparkline`
  (0.2.0), `sf-chart-heatmap` (0.1.1), `sf-chart-metric`, `sf-chart-funnel`,
  `sf-chart-gauge`, `sf-chart-scatter`, `sf-chart-box`, `sf-chart-radar`,
  `sf-chart-candlestick`, `sf-chart-waterfall`, `sf-chart-treemap`,
  `sf-chart-timeline`, `sf-chart-sankey`, `sf-chart-sunburst` and
  `sf-chart-map` (0.1.0 each), over the shared `chart-core` folder. Each has
  a tooltip, a keyboard cursor, a summary in words and its data as a table.
- Built over SIMAI Framework `ui-e7b79c3a9e05` (ui-source `5443d10d710b`);
  needs core.runtime 1.25.0 or newer.
