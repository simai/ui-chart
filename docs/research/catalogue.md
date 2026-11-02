# Chart catalogue: candidates by tier

Stage R, file 2 of 4. This file lists the charts SIMAI Chart could make, in
three tiers. For each chart it says:

- when to use it and when not;
- how many of the studied systems have it;
- whether it is a component of its own or a variant of another.

The tag names here are working names. The naming scheme itself
(`sf-chart-line` and so on, or one `sf-chart type="line"`) is decided in
`docs/DECISIONS.md`.

## How the evidence is counted

18 systems in [systems.md](systems.md) publish a list of chart types:

| Code | System | Type list |
|---|---|---|
| E | Apache ECharts | [series index](https://echarts.apache.org/en/llms.txt) |
| H | Highcharts | [demo gallery](https://www.highcharts.com/demo/highcharts) |
| A | amCharts 5 | [demos](https://www.amcharts.com/demos/) |
| C | Chart.js | [chart types](https://www.chartjs.org/docs/latest/charts/area.html) |
| X | ApexCharts | [demos](https://apexcharts.com/javascript-chart-demos/) |
| Cb | IBM Carbon Charts | [repo](https://github.com/carbon-design-system/carbon-charts), [guidance](https://carbondesignsystem.com/data-visualization/getting-started/) |
| At | Atlassian UI Kit | [bar chart](https://developer.atlassian.com/platform/forge/ui-kit/components/bar-chart/) |
| S | Salesforce Lightning | [charts](https://spring-20.lightningdesignsystem.com/guidelines/data-visualization/charts/) |
| F | Fluent UI charts | [components](https://github.com/microsoft/fluentui/tree/master/packages/charts/react-charts/library/src/components) |
| Sw | Apple Swift Charts | [Charts](https://developer.apple.com/tutorials/data/documentation/charts.json) |
| R | Recharts | [API](https://recharts.github.io/en-US/api) |
| N | Nivo | [nivo.rocks](https://nivo.rocks/) |
| T | Tremor | [installation](https://tremor.so/docs/getting-started/installation) |
| D | Datawrapper | [charts](https://www.datawrapper.de/charts) |
| P | Power BI | [visuals](https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualizations-overview) |
| G | Google Charts | [gallery](https://developers.google.com/chart/interactive/docs/gallery) |
| Gr | Grafana | [visualizations](https://grafana.com/docs/grafana/latest/panels-visualizations/visualizations/) |
| Su | Apache Superset | [charts](https://preset.io/blog/2021-6-14-superset-nine-new-charts/) |

The three grammar systems, Vega-Lite, Observable Plot and ggplot2, can
build almost any chart from marks, so they are not counted. The "Relation"
lines use the FT Visual Vocabulary groups: deviation, correlation, ranking,
distribution, change over time, magnitude, part-to-whole, spatial, flow
([chart-doctor](https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary)).

**The counts are lower bounds.** A system is counted only where the type
list read on 2026-11-02 names the chart. A gallery that says "and more"
may have it too. For example, ECharts draws an area as a line with a fill,
and this list does not name it, so ECharts is not counted for area.

## What the Framework already has

Three Smart components already show progress, and SIMAI Chart does not
duplicate them:

- `sf-progress-bar`: continuous completion;
- `sf-progress-ring`: a value in the room of a control;
- `sf-progress-scale`: ten segments.

All three carry `status` roles, and the ring may be a `meter`. They live in
`simai/ui-source` `src/smart/`. A chart gauge is only for a measured value
on a scale with bands or a target, which progress does not show (see
[Gauge](#gauge)).

The table fallback uses the public surface of `sf-table` from SIMAI Pro and
does not draw its own grid (handoff rule, `docs/START.md`).

## Summary

| Tier | Chart | Evidence (of 18) | Component or variant |
|---|---|---|---|
| 1 | Line | 18 | **component** `line` |
| 1 | Area | 12 | variant of `line`: `area` setting |
| 1 | Bar / column | 18 | **component** `bar` |
| 1 | Stacked, grouped, 100 % | in every bar system | variant of `bar` / `line`: `stack` setting |
| 1 | Pie / donut | 18 | **component** `pie`: `hole` setting |
| 1 | Sparkline | 2 named, 4 more as KPI tiles | **component** `sparkline` |
| 1 | KPI with trend | 4 | **component** `kpi` (uses `sparkline`) |
| 2 | Scatter / bubble | 13 / 6 | **component** `scatter`: `size` field |
| 2 | Combo (bar + line) | 7 | variant: a per-series `mark` on the cartesian core |
| 2 | Heatmap | 6 | **component** `heatmap` |
| 2 | Histogram | 2 (+ all grammars) | variant of `bar`: `bin` setting |
| 2 | Box plot | 3 (+ all grammars) | **component** `box` |
| 2 | Funnel | 7 | **component** `funnel` |
| 2 | Gauge | 11 | **component** `gauge` |
| 2 | Radar | 8 | **component** `radar` |
| 3 | Treemap | 11 | **component** `treemap` |
| 3 | Sunburst | 5 | **component** `sunburst` |
| 3 | Sankey | 6 | **component** `sankey` |
| 3 | Gantt / timeline | 6 | **component** `timeline` |
| 3 | Candlestick | 6 | **component** `candlestick` |
| 3 | Waterfall | 4 | variant of `bar`: `accumulate` setting |
| 3 | Choropleth map | 10 | **component** `map` |

Tier 1 is **5 components** with 2 variant settings (`area`, `stack`). All
of Tier 1 except `kpi` draws on one shared cartesian or polar core (see
`rendering.md`).

## Tier 1: a dashboard cannot ship without it

### Line

- **Use for:** change over time. Also for a continuous x with a few series
  in the same unit.
- **Not for:**
  - categories with no order (use a bar);
  - more than about 4–5 series on one plot, where the lines tangle: use
    small multiples or highlight one series
    ([SLDS](https://spring-20.lightningdesignsystem.com/guidelines/data-visualization/charts/));
  - two different units on two y-axes, which SLDS forbids for very
    different scales.
- **Evidence:** 18 of 18 (E H A C X Cb At S F Sw R N T D P G Gr Su).
- **Relation:** change over time.
- **Component.** Its variants are settings:
  - `curve`: linear, step, smooth;
  - `markers`;
  - `area`;
  - `stack`.
- **Gaps:** gaps in the data stay gaps. The line is not drawn through
  them, because missing data is never interpolated
  ([Carbon axes](https://carbondesignsystem.com/data-visualization/axes-and-labels/)).

### Area

- **Use for:**
  - one or a few series where the volume matters;
  - a stacked area for a whole split into parts over time.
- **Not for:**
  - many overlapping series, where the fills hide each other;
  - exact comparison of middle layers in a stack, since only the bottom
    layer has a flat baseline.
- **Evidence:** 12 (H A C X Cb F Sw R T D P G). ECharts draws it as a line
  with a fill.
- **Relation:** change over time, part-to-whole.
- **Variant of `line`**, through the `area` setting. Most systems name it a
  separate type in the gallery, but in the code it is a line with a fill.
  Chart.js documents it under line, and Tremor gives it the same props as
  line ([Tremor area](https://tremor.so/docs/visualizations/area-chart)).
- **Baseline:** always starts at zero
  ([Carbon axes](https://carbondesignsystem.com/data-visualization/axes-and-labels/)).

### Bar / column

- **Use for:** comparing magnitudes across categories, ranking, and counts
  per period.
- **Bars or columns:** horizontal bars for long category names; columns
  for time.
- **Not for:**
  - a continuous x with many points (use a line);
  - more than about 12–15 bars before scrolling or grouping into "other".
    This limit is our working value, to be tested in M0.
- **Evidence:** 18 of 18.
- **Relation:** magnitude, ranking, change over time.
- **Component.** Settings:
  - `orientation`: vertical or horizontal; under RTL a horizontal bar grows
    toward the start side
    ([Datawrapper RTL](https://www.datawrapper.de/blog/right-to-left-visualizations));
  - `stack`;
  - `bin` (histogram);
  - `accumulate` (waterfall).
- **Baseline:** zero, always
  ([Carbon](https://carbondesignsystem.com/data-visualization/axes-and-labels/),
  [SLDS](https://spring-20.lightningdesignsystem.com/guidelines/data-visualization/charts/),
  [Apple HIG](https://developer.apple.com/tutorials/data/design/human-interface-guidelines/charts.json)).

### Stacked, grouped and normalised (100 %)

- **Use for:**
  - grouped: comparing series within each category;
  - stacked: the total and its parts;
  - normalised: the share of each part.
- **Not for:**
  - comparing middle segments of a stack precisely;
  - more than about 5 parts, where colours stop separating
    ([Atlassian](https://atlassian.design/foundations/color/data-visualization-color)).
- **Evidence.** It appears as a variant in every bar-capable system. Only
  three list it as a type of its own (At, S, F). Tremor makes it one prop,
  `type` (default, stacked or percent)
  ([Tremor](https://tremor.so/docs/visualizations/area-chart)).
- **Relation:** part-to-whole, magnitude.
- **Variant, not a tag.** The `stack` setting takes `none`, `stacked` or
  `normalized`, on `bar` and on `line` with `area`. The handoff names this
  case explicitly.

### Pie / donut

- **Use for:** the parts of one whole, with 2–5 parts
  ([SLDS](https://spring-20.lightningdesignsystem.com/guidelines/data-visualization/charts/)).
- **Rules:**
  - slices in descending order, from 12 o'clock, clockwise (counter-clockwise
    under RTL is a decision for `parameters.md`);
  - a donut's hole may hold the total;
  - slices need a 3:1 edge or border against each other
    ([WCAG 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)).
- **Not for:**
  - more than 5 parts;
  - parts that do not add up to a whole;
  - comparing two pies;
  - values close to each other.

  Use a bar in all these cases. Some style guides avoid pies altogether
  ([Economist summary](https://slidespeak.co/slide-design-prompts/prompts/economist-style),
  *(3rd-party)*). Carbon drops slices under 1°, which can then be reached
  only in the table
  ([Carbon anatomy](https://carbondesignsystem.com/data-visualization/chart-anatomy/)).
- **Evidence:** 18 of 18. Fluent ships the donut only
  ([README](https://cdn.jsdelivr.net/npm/@fluentui/react-charts@9.3.13/README.md)).
- **Relation:** part-to-whole.
- **Component.** Settings:
  - `hole`: 0 is a pie, and anything above it is a donut;
  - `arc`: full or half circle.

### Sparkline

- **Use for:** a word-sized trend inside text, a table cell or a KPI tile,
  where shape matters and exact values do not.
- **Not for:** reading values. It has no axes, no legend and no point
  tooltips by default.
- **Evidence:** named as a type in Fluent and Tremor. Shown inside KPI
  tiles in Power BI, Grafana and Superset. Datawrapper draws sparklines in
  tables
  ([Datawrapper RTL](https://www.datawrapper.de/blog/right-to-left-visualizations)).
- **Relation:** change over time.
- **Component of its own**, not a variant of `line`. The reason is that it
  sits in the text-line and control size ladder rather than the plot area.
  It also has one focus stop with a text summary instead of point
  navigation, and is decorative when the value is stated beside it.
- **Settings:**
  - `kind`: line, area or bar;
  - a reference band;
  - marking the last, min and max point.

### KPI with trend

- **Use for:** one number that matters, with its change against a
  comparison (the previous period or a target) and an optional sparkline.
- **Not for:** several numbers of equal weight (use a table), or a value
  with no comparison (use plain text).
- **Evidence:** Power BI card and KPI, Grafana stat, Superset big number,
  and Tremor's dashboard widgets
  ([Power BI](https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualizations-overview),
  [Grafana](https://grafana.com/docs/grafana/latest/panels-visualizations/visualizations/),
  [Superset](https://preset.io/blog/2021-6-14-superset-nine-new-charts/)).
- **Relation:** magnitude, deviation.
- **Component** (`kpi`). It is a small assembly:
  - the value, formatted through Intl;
  - the delta, as an absolute value and/or a percentage;
  - a status role (positive, negative or neutral), chosen by the page. Up
    is not always good, so the component never infers it, the same rule as
    `sf-progress-ring`;
  - a `sparkline`.
- **Not colour alone:** the direction is also shown as an arrow and in
  words, for example "+12 % to last month"
  ([WCAG 1.4.1](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)).

## Tier 2: common analytics

### Scatter / bubble

- **Use for:**
  - correlation between two measures;
  - outliers;
  - bubbles add a third measure as area.
- **Not for:**
  - a time series (use a line);
  - many thousands of points without Canvas and decimation;
  - bubble sizes read precisely, since area is judged poorly.
- **Evidence:** scatter 13 (E H A C Cb S F Sw R D P G Gr); bubble 6 (H A C
  Cb P G).
- **Relation:** correlation.
- **Component.** Bubble is a variant of scatter through a `size` field.
  The keyboard moves in two dimensions here
  ([Datawrapper](https://www.datawrapper.de/blog/keyboard-navigation-dynamic-font-scaling)).

### Combo (bar + line)

- **Use for:**
  - a volume and a rate over the same x, for example orders as bars and
    conversion as a line;
  - an actual against a plan.
- **Not for:** two unrelated measures on two y-axes. SLDS rules out dual
  axes for very different scales, so a second axis needs a strong reason
  ([SLDS](https://spring-20.lightningdesignsystem.com/guidelines/data-visualization/charts/)).
- **Evidence:** 7: Highcharts combinations, Chart.js mixed, Recharts
  composed, Tremor combo, Datawrapper dual-axis, Power BI combo, Google
  combo.
- **Relation:** correlation, change over time.
- **Variant, not a tag.** The cartesian core lets one series override its
  `mark` (bar or line). Which tag carries it, `bar` with a line series or a
  general cartesian chart, is part of the naming decision.

### Heatmap

- **Use for:**
  - a measure over two categorical or binned dimensions, for example
    weekday × hour;
  - a calendar of activity, as a `layout: calendar` variant (Nivo
    calendar, FT calendar heatmap).
- **Not for:** exact values. It needs a sequential or diverging scale and a
  legend for the scale, and colour alone does not give exact values. The
  table and the tooltip carry them.
- **Evidence:** 6 (E H X S F Gr).
- **Relation:** correlation, change over time.
- **Component.**

### Histogram

- **Use for:** the distribution of one measure, as counts per bin.
- **Not for:** categories (use a bar), or a comparison of many
  distributions (use a box plot).
- **Evidence:** 2 named (G Gr). Every grammar system builds it from a bar
  plus binning (Vega-Lite, Plot, ggplot2).
- **Relation:** distribution.
- **Variant of `bar`** through the `bin` setting (bin count or width).
  Bars touch, because x is continuous.

### Box plot

- **Use for:** comparing distributions (median, quartiles, outliers)
  across groups.
- **Not for:** general audiences who do not read the box. Show a histogram
  or a dot strip first.
- **Evidence:** 3 named (E X Cb). It is also a composite mark in Vega-Lite
  ([mark](https://vega.github.io/vega-lite/docs/mark.html)), Plot and
  ggplot2.
- **Relation:** distribution.
- **Component.** It needs a statistical summary: computed from raw values,
  or given as min, q1, median, q3, max. Violin may be a later variant.

### Funnel

- **Use for:** the stages of a process where each stage is a subset of the
  last, for example sales or sign-up.
- **Not for:** stages that are not nested (use a bar), or exact comparisons
  (show the numbers and conversion beside each stage).
- **Evidence:** 7 (E A S F R P Su).
- **Relation:** flow, magnitude.
- **Component.** It can render as stepped bars with stage-to-stage
  conversion labels. That form keeps a common baseline and reads better
  than a trapezoid.

### Gauge

- **Use for:** one measured value on a fixed scale with **bands** (normal,
  warning, critical) or a **target**. For example, a server load or a
  score.
- **Not for:**
  - task progress: that is `sf-progress-bar`, `sf-progress-ring` or
    `sf-progress-scale`;
  - a value with no meaningful scale;
  - more than one value.
- **Rules:**
  - a reference value (target or average) is always shown
    ([SLDS](https://spring-20.lightningdesignsystem.com/guidelines/data-visualization/charts/));
  - in tight spaces, use the flat (linear) form.
- **Evidence:** 11 (E H A X Cb S F P G Gr Su).
- **Relation:** magnitude, deviation.
- **Component.** Settings:
  - `shape`: arc or linear. Linear is a bullet chart in effect;
  - `bands`;
  - `target`.

  It uses ARIA `meter` semantics, like the ring.

### Radar

- **Use for:** comparing a few items over 3–8 measures on the same scale,
  for example skill profiles.
- **Not for:**
  - measures on different scales;
  - more than 2–3 items;
  - precise reading, since area grows with the square and axis order
    changes the shape.

  A grouped bar is often better. Tier 2 because 8 systems have it, not
  because it is a strong chart.
- **Evidence:** 8 (E A C X Cb R N F).
- **Relation:** magnitude.
- **Component** on the polar core.

## Tier 3: specialised

### Treemap

- **Use for:** a hierarchy of parts with size, for example disk usage or
  budget by department.
- **Not for:** precise comparison, or hierarchies deeper than 2–3 levels
  without drill-down.
- **Evidence:** 11 (E H A X Cb S R N P G Su).
- **Relation:** part-to-whole.
- **Component.** It shares the hierarchy data contract (id, parent, value,
  or a path) with `sunburst`.

### Sunburst

- **Use for:** a hierarchy where the levels matter more than precise size.
- **Not for:** precise comparison. It has the problems of a pie, ring after
  ring.
- **Evidence:** 5 (E A X R N).
- **Relation:** part-to-whole.
- **Component.** It shares the hierarchy contract with `treemap`.

### Sankey

- **Use for:** quantities flowing between stages or categories, for example
  budget allocation or user paths.
- **Not for:**
  - flows with many crossings and no ordering;
  - stage counts only (use a funnel).
- **Evidence:** 6 (E A S F R N).
- **Relation:** flow.
- **Component.** It needs a flow data contract of source, target and value.

### Gantt / timeline

- **Use for:** tasks or states over time as start and end ranges per row.
  Projects, schedules, service state history (Grafana state timeline).
- **Not for:** a measure over time (use a line).
- **Evidence:** 6 (H A F P G Gr).
- **Relation:** change over time.
- **Component** (`timeline`), with a range data contract (row, start, end,
  status). Dependencies and editing are out of scope for the first version.

### Candlestick

- **Use for:** open, high, low and close per period, for prices.
- **Not for:** general audiences (use a line of close prices).
- **Evidence:** 6 (E H A X G Gr).
- **Relation:** change over time.
- **Component.** It needs an OHLC data contract. It shares the time axis
  and decimation with `line`.

### Waterfall

- **Use for:** how a start value becomes an end value through positive and
  negative steps, for example a profit bridge.
- **Not for:** independent values (use a bar).
- **Evidence:** 4 (X S D P).
- **Relation:** deviation, part-to-whole, flow.
- **Variant of `bar`.** The `accumulate` setting draws running totals with
  floating bars. Increase and decrease use the status roles, plus a sign
  and a label, not colour alone.

### Choropleth map

- **Use for:** a rate or ratio by region.
- **Not for:** counts, which favour big regions. Use proportional symbols
  for counts (FT Visual Vocabulary, spatial).
- **Evidence:** 10 (E H A Cb S N D P G Gr).
- **Relation:** spatial.
- **Component.** It needs geometry data (regions) and a decision on where
  the map files come from and under which licence. Map borders are
  politically sensitive. This is a separate owner decision before any work
  on it.

## Left out, and why

| Chart | Why it is not in the catalogue |
|---|---|
| 3D charts of any kind | Depth distorts the values. Style guides avoid them ([Economist summary](https://slidespeak.co/slide-design-prompts/prompts/economist-style), *(3rd-party)*). |
| Word cloud | Size of text is a poor encoding of value, and the layout is random (Carbon has it; [Carbon](https://carbondesignsystem.com/data-visualization/getting-started/)). |
| Pictorial / isotype bars | Decoration over data; better done as page content than as a chart. |
| Radial bar | A bar bent into a circle: harder to compare, no benefit (Recharts, Nivo have it). |
| Chord, network graph | A different data model (graph); a separate product if it is ever needed. |
| Polar area | Area grows with the square; a bar reads better (Chart.js has it). |
| Stream graph, bump chart | Editorial forms; low use in product dashboards (Nivo). |

Any of these can come back later, if a SIMAI product names a real case for
it.

## Data contracts the catalogue needs

The catalogue sorts into seven data shapes. `parameters.md` defines them on
one tabular base:

| Shape | Fields | Charts |
|---|---|---|
| Tabular | `x`, `y`, `series`, `value`, `category` | line, area, bar, pie, sparkline, kpi, scatter, combo, heatmap, histogram, funnel, gauge, radar, waterfall |
| Statistical summary | group + min, q1, median, q3, max (or raw values) | box |
| Hierarchy | id, parent, value (or a path) | treemap, sunburst |
| Flow | source, target, value | sankey |
| Ranges | row, start, end, status | timeline |
| OHLC | x, open, high, low, close | candlestick |
| Geo | region id, value, plus geometry | map |

All of them arrive as rows: an array of records, or columns. A chart
declares which fields it maps, so one data source can feed several charts.
