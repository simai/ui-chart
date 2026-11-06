# The chart set

The Smart chart components of SIMAI Chart, the component set `chart`
(standard `simai.component-set` 1.0.0, and `simai.component-package` 1.1.1
for the package folder). `set.json` is the set's passport: its licence, the
SIMAI Framework it is built over and every component it holds. One folder per
component in `src/smart/<name>/`, built and tested over the free Framework
release pinned in `framework.lock.json` (the same revision as
`set.json` `framework.source_revision`).

- `sh scripts/gates.sh <new workspace>`: every gate of the set over the
  commit at HEAD (two builds, the receipt, the unit suite, the registry,
  the manifest and browser probes, the first paint).
- `node scripts/check-registry.mjs`: the passport against the shared name
  registry at ui-source main; names the dispatcher reserved and the registry
  does not list yet are reported as pending (`tests/set-registry.mjs`).

| Folder | What it is |
|---|---|
| `src/smart/chart-line/` | `sf-chart-line`, one or more series over time, a number or categories, as lines or stacked areas |
| `src/smart/chart-bar/` | `sf-chart-bar`, values by category: grouped, stacked or shares, vertical or horizontal |
| `src/smart/chart-pie/` | `sf-chart-pie`, the parts of one whole as a circle or a ring |
| `src/smart/chart-sparkline/` | `sf-chart-sparkline`, one series word-sized, for tables and tiles |
| `src/smart/chart-metric/` | `sf-chart-metric`, one number with its change, limit and status (the KPI and Larena's metric tile) |
| `src/smart/chart-parts/` | `sf-chart-parts`, the parts of one whole in one thin bar, with the free remainder of a capacity (a disk, a quota, a model's context) |
| `src/smart/chart-heatmap/` | `sf-chart-heatmap`, a measure over two categories as a grid of cells on a stepped scale of the theme's tones (load by weekday and hour, a change by region and month) |
| `src/smart/chart-funnel/` | `sf-chart-funnel`, the stages of a process as bars on a common baseline with the conversion beside each stage (a sales funnel, a sign-up, an order's path) |
| `src/smart/chart-scatter/` | `sf-chart-scatter`, points at two measures to show how they go together, with a third as bubbles' area, series by colour and mark shape, a trend line and the relation said in words |
| `src/smart/chart-box/` | `sf-chart-box`, a box plot: the median, quartiles, whiskers and outliers of one measure per group, from raw rows or given statistics, series side by side and the spread said in words |
| `src/smart/chart-radar/` | `sf-chart-radar`, a radar chart: a spoke per measure from a centre and each series a ring through its values on one scale, marks of their own shape per series, gaps that break the ring |
| `src/smart/chart-candlestick/` | `sf-chart-candlestick`, a candlestick chart: the open, high, low and close per period in time order, rises hollow and falls filled in the success and error tones, neighbours merged as a longer period when they crowd |
| `src/smart/chart-waterfall/` | `sf-chart-waterfall`, a waterfall chart: how a start value becomes an end value through rises and falls, a change floating from the running total and a total standing on zero, joined by thin lines, each value written with its sign |
| `src/smart/chart-treemap/` | `sf-chart-treemap`, a treemap: how a whole is made of parts, values as the areas of rectangles laid out squarified, one level or parts in groups under the group's name, a group in a chart colour |
| `src/smart/chart-timeline/` | `sf-chart-timeline`, a timeline (Gantt chart): tasks or states as ranges of time on rows, a bar from each range's start to its end on a calendar axis, a diamond for a milestone, a status in a chart colour |
| `src/smart/chart-sankey/` | `sf-chart-sankey`, a Sankey diagram: quantities flowing between stages or categories, nodes in columns by their longest path, a band from node to node as wide as its flow, a node in a chart colour and its bands in its light fill |
| `src/smart/chart-sunburst/` | `sf-chart-sunburst`, a sunburst: a hierarchy as rings round a centre, a ring per level and each arc its share of its parent's, read from ids and parents or from paths, a branch in its top node's chart colour |
| `src/smart/chart-map/` | `sf-chart-map`, a choropleth map: a rate or a ratio by region, the regions given by the page as GeoJSON (the package holds no map), projected to fit, each filled by the step of its value on the theme's tone ladders, with a legend |
| `src/smart/chart-gauge/` | `sf-chart-gauge`, one measured value on a fixed scale as a half circle or a bar, with bands (normal, warning, critical) and a target (a server's load, a score, a plan's fulfilment) |
| `src/smart/chart-core/` | the chart core every chart shares: data, scales and bands, stacks, slices, formats, paths, decimation, the words and the keyboard cursor; a helper folder (no rule file), its passport `src/core/passports/module.chart-core.json` |
| `docs/chart/` | the unit journal (one entry per version of each unit) and the change journal (renames and removals) |
| `tests/` | the package's unit and contract tests; `tests/browser/` its browser probes |
| `scripts/` | the overlay, the test runner, the probe runners, the passports |

## The pin

`framework.lock.json` pins ui-source `5443d10d`, the free release
`ui-e7b79c3a9e05` (npm `@simai-studio/ui@5.20261105.2041`). A package is
built and tested against exactly one Framework revision; moving to a newer one
is a change of the lock, a run of the suite and the probes, and a build.

## Tests and probes

They run in an **overlay**: ui-source at the pinned revision with this
folder's `src/`, `tests/` and `docs/` laid over it. A package file may not
replace a ui-source file. ui-source is looked for beside this repository, at
`UI_SOURCE_ROOT`, or wherever `--ui-source` says.

```bash
node scripts/test.mjs                    # the package suite plus the free cross-cutting checks
node scripts/passports.mjs --check       # the unit passports (simai.linkage)
node scripts/run-browser-probes.mjs <free output> <package output>
node scripts/run-manifest-probes.mjs <free output> <package output>
node scripts/run-first-paint.mjs snapshot|check|gate <free output> <package output>
```

`<free output>` is the `distr` of the ui distribution at the pinned release
(or a product output root); `<package output>` is the build below. The browser
probes need `playwright` where the overlay resolves it.

A person writes `component.json`, `examples.json`, `index.js`, `lang/` and
`docs.md`; the other files of a component folder are generated by ui-source's
`scripts/generate-component-files.mjs` (run it from the overlay with
`--write --package <this folder> --component <name>`), and the manifest's
digests are refreshed after an edit. `run-first-paint.mjs snapshot` writes the
first-paint snapshots into `static/`; commit what it wrote.

## Building

ui-builder builds the package over the pinned ui-source, from committed bytes,
twice, byte for byte:

```bash
node <ui-builder>/scripts/verify-package-reproducibility.cjs <ui-source> <new workspace> \
  --package chart --package-source <ui-chart checkout> --package-path components --package-revision <commit>
```

The output, `wave-1/output/package/chart`, is `smart/chart-line/…` and
`smart/rule.js`, one `SF.RuleLoader.registerPackage("chart", {rules})` call.
A page declares the package before the Framework core starts:

```js
window.SF_BOOT_CONFIG = {packages: {chart: {base: '/assets/ui-chart/smart/'}}};
```

`../examples/stand.html` is the stand: any chart, any of its examples, every
setting as a field (read from the built `component.json` and `examples.json`,
so a new setting shows without a change to the page), four ways to deliver
the data (the `items` property, a `data-sf-settings` island, late data after
a loading state, an error and a refresh), width, language and theme, the
markup that makes the same chart and the events it sends.
`../examples/live.html` brings data while the page is open: a monitor stream
the page appends to (a sliding window, a rate, the cost of each update) and
rows asked from a stand-in server (`/demo/orders` in `serve.mjs`) when the
query changes, with loading, a cancelled request, an error and a refresh.
`../examples/staged.html` loads a dashboard in stages with the Framework's
own means: an assembly defined on the page, each place starting `now`,
`visible` or `opened` (standard §7.2.1), over a printed first paint of the
charts' shipped skeletons; a panel counts what the page fetched.
`../examples/chart-line.html` is the line chart's reference page and
`../examples/dashboard.html` every Tier 1 chart on one dashboard.
`../examples/serve.mjs` serves them over a Framework `distr` and a package
build, the stand at `/`:

```bash
node examples/serve.mjs <ui distr at the pin> <package build output>
```

## Releases

**Version 1.0.0, released 2026-11-06** ([CHANGELOG.md](CHANGELOG.md)) through
the dispatcher's release route as the sets `view` and `editor` were: the build
committed under `dist/` with its receipt, the release lock
`contracts/releases/chart-<12>.lock.json`, the tag `chart-<12>` with a GitHub
release, and `npm publish` of `@simai-studio/chart` from the staged folder
(`node scripts/stage-npm.mjs`). Paid sets publish on the public npm registry
(owner, 2026-11-05); nothing here is published by this repository's own hand.
One line connects it:

```html
<script src="https://cdn.jsdelivr.net/npm/@simai-studio/ui@5.20261105.2041/distr/core/js/core.min.js" data-sf-sets="chart@1.0.0"></script>
```
