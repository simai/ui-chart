# Chart parameters: the model

Stage R, file 3 of 4. This file defines the parameters every SIMAI Chart
component shares, and maps each one to the Smart surface that carries it:
an attribute, a property, a value, an event, an action, a slot or a public
CSS variable.

Where a parameter rests on the Framework, the Framework source is named:

- a token in `simai/ui-source` `src/core/scss/_sf_css__theme.scss`;
- a rule in the `simai.smart-component` 1.3.14 standard or the
  `simai.smart-vocabulary` 1.1.5 vocabulary (`simai/ui-control`
  `control/smart-architecture/standard/`).

Where an idea comes from a studied system, the link points to
[systems.md](systems.md) or to the system's own page.

Tag names below use the working names from [catalogue.md](catalogue.md):
`sf-chart-line`, `sf-chart-bar` and so on. The naming scheme is decision D2
in `docs/DECISIONS.md`. Nothing here depends on it, except the tag part of
event and variable names.

## 1. The Smart surface in one table

A chart has the same four lists as every Smart component (standard,
`smart-components-short-ru.md` §1).

| List | What a chart puts there |
|---|---|
| **Settings** (in) | data, field mapping, scales, axes, legend, tooltip, annotations, stacking, size, colour scheme, formats, description |
| **Values** (out) | `state`, `selection`, `hidden` (the series switched off), `domain` (the visible range after zoom) |
| **Events** (out) | `select`, `toggle`, `open` (drill-down), `query` (zoom changes the range), `download` |
| **Actions** (in) | `select`, `toggle`, `reset` (zoom and hidden series), `download`, `refresh` |

Scalars are attributes. Lists and objects are properties (standard §2: "lists
and objects are passed as properties"). Every object setting also has a
JSON-attribute form for server-rendered pages, as other Smart components do.

## 2. Data

### 2.1 One tabular contract

Every chart reads **rows**: records with named fields. This is the model
shared by most studied systems:

- ECharts `dataset` + `encode`
  ([dataset](https://echarts.apache.org/handbook/en/concepts/dataset/));
- Vega-Lite records + `encoding`
  ([data](https://vega.github.io/vega-lite/docs/data.html));
- Carbon records + group key
  ([options](https://charts.carbondesignsystem.com/api/interfaces/barchartoptions));
- Tremor `index` + `categories`
  ([area chart](https://tremor.so/docs/visualizations/area-chart)).

| Parameter | Carrier | Type | Meaning |
|---|---|---|---|
| `items` | property (value of the vocabulary key `items`) | list of records, or a columns object `{field: [values]}` | the rows. The key name is the vocabulary's own (`simai.smart-vocabulary` §2.1), so a chart binds to `sf-source` `values.items` in an assembly without a rename |
| `fields` | property | object `{name: {type, label, unit, format}}` | the field list. `type` is `number`, `time`, `category` or `text`. `label` is the human name from a dictionary key or plain text. Without `fields`, types are inferred from the first non-empty values |
| `x` | attribute | field name | the position along the main axis (time, category or number) |
| `y` | attribute | field name, or a comma list of fields | the measure. A list makes one series per field (the **wide** form: `y="plan,fact"`) |
| `series` | attribute | field name | splits rows into series by this field's value (the **long** form) |
| `value` | attribute | field name | the measure where there is no x: pie, gauge, kpi, treemap |
| `category` | attribute | field name | the slice or tile name where there is no x: pie, funnel, treemap |
| `size` | attribute | field name | the third measure: bubble area |
| `id` | attribute | field name | the stable id of a row, used for `selection`, drill-down and colour memory. Defaults to `x` + `series` |

Both the long form (`series`) and the wide form (a `y` list) are accepted.
They are the two shapes in which product data arrives: long from SQL, wide
from spreadsheets. The core turns both into one internal series list.
Columnar input is a fast path for large data, the idea of Plot's Arrow
input and Grafana's data frames
([Grafana data frames](https://grafana.com/developers/plugin-tools/key-concepts/data-frames)).

Other data shapes from [catalogue.md](catalogue.md#data-contracts-the-catalogue-needs)
are the same rows with other mappings:

| Shape | Mapping attributes |
|---|---|
| hierarchy | `id`, `parent`, `value` (or `path` = a field holding a list) |
| flow | `source`, `target`, `value` |
| ranges | `row`, `start`, `end`, `status` |
| OHLC | `x`, `open`, `high`, `low`, `close` |
| summary | `category`, then `min`, `q1`, `median`, `q3`, `max` (or raw values with `value`) |

### 2.2 Where the data comes from

| Way | How |
|---|---|
| Inline | the page sets `items` (property), or puts a JSON `<script type="application/json">` child, as server-rendered Smart components do |
| Assembly | a `sf-source` writes `items`; the chart's `settings.items` is bound to it (standard §7; vocabulary §2.1) |
| Port | the chart declares a data port the way `sf-table` does, and the host answers `applied`, `refused`, `unavailable` or `conflict` |

### 2.3 Data state

The chart shows the vocabulary's seven states (`simai.smart-vocabulary` §3):
`idle`, `loading`, `ready`, `empty`, `error`, `refused`, `unavailable`.

- **`loading`:** a skeleton of the same size: axes and a muted plot
  (standard §11, initial view).
- **`empty`:** `sf-empty-state` inside the plot box. The box keeps its size,
  so nothing shifts.
- **`error`, `refused`, `unavailable`:** the host's `message` in the plot
  box, with a `refresh` action where it makes sense.

### 2.4 Missing values

- A `null` or absent value is **missing**. It is never zero and never
  interpolated
  ([Carbon axes](https://carbondesignsystem.com/data-visualization/axes-and-labels/)).
- A line breaks at a missing value. `gaps="connect"` draws a dashed bridge
  that is marked as such in the table and the description (Chart.js
  `spanGaps`, Tremor `connectNulls`).
- A bar or slice for a missing value is not drawn. Its table row shows the
  missing-value word from the dictionary.
- A non-numeric value in a number field counts as missing. It is reported
  once in the console with the row id.

### 2.5 Time and number input

- **Time input:** an ISO 8601 string, a `Date`, or epoch milliseconds.
- **Time zone:** `time-zone="UTC|local|<IANA>"`, default `local`. Fluent
  defaults to UTC
  ([cartesian types](https://github.com/microsoft/fluentui/blob/master/packages/charts/react-charts/library/src/components/CommonComponents/CartesianChart.types.ts));
  a product UI reads in the viewer's zone, so the default here is local.
- **Number input:** a JS number, or a numeric string with a dot as the
  decimal sign. Locale-formatted strings are not parsed: formatting is
  output, not input.

## 3. Encodings and scales

| Scale | Used for | Parameter |
|---|---|---|
| `band` | categories on x or y (bars, heatmap rows) | inferred from a `category` field |
| `ordinal` | categories mapped to colour or shape | the series colour, the marker shape |
| `linear` | numbers | default for `number` fields |
| `log` | numbers over several orders of magnitude | `y-scale="log"`; values ≤ 0 count as missing and are reported |
| `time` | dates | default for `time` fields; ticks on calendar units (day, week, month, quarter, year) |

| Parameter | Carrier | Values |
|---|---|---|
| `x-scale`, `y-scale` | attribute | `linear`, `log`, `time`, `band`; default: inferred |
| `y-min`, `y-max` | attribute | a number, or `auto` |
| `y-zero` | attribute | `true`, `false`. Bars and areas are always `true` and ignore `false` ([Carbon](https://carbondesignsystem.com/data-visualization/axes-and-labels/), [Apple HIG](https://developer.apple.com/tutorials/data/design/human-interface-guidelines/charts.json)). Line and scatter default to `false` |
| `nice` | attribute | `true` (default): round domain ends to familiar steps (0, 5, 10) ([Apple HIG](https://developer.apple.com/tutorials/data/design/human-interface-guidelines/charts.json)); tick steps are never bent to fit the data ([Carbon](https://carbondesignsystem.com/data-visualization/axes-and-labels/)) |
| `y2` | attribute | a field list that goes to a second axis; combo only, and discouraged ([SLDS](https://spring-20.lightningdesignsystem.com/guidelines/data-visualization/charts/)) |

## 4. Axes, grid and legend

### 4.1 Axes

| Parameter | Carrier | Values |
|---|---|---|
| `x-label`, `y-label` | attribute | the axis title. Default: the field's `label` and `unit`. In compact sizes the unit moves to the chart title ([Apple HIG](https://developer.apple.com/tutorials/data/design/human-interface-guidelines/charts.json)) |
| `x-ticks`, `y-ticks` | attribute | `auto` or a target count. Overlapping labels are thinned, never rotated past 45° ([Fluent](https://github.com/microsoft/fluentui/blob/master/packages/charts/react-charts/library/src/components/CommonComponents/CartesianChart.types.ts) hides overlapping ticks) |
| `axes` | attribute | `both`, `x`, `y`, `none` (`none` is the sparkline default) |
| `y-side` | attribute | `start`, `end`, a **logical** side. Under RTL `start` is the right (`foundation-logical-sides.md`; [Datawrapper RTL](https://www.datawrapper.de/blog/right-to-left-visualizations)) |

- **Time axis.** A tick where a new day, month or year begins is set in the
  semibold text weight
  ([Carbon axes](https://carbondesignsystem.com/data-visualization/axes-and-labels/)).
- **Visible tick text** is hidden from assistive technology, which reads the
  table and the description instead
  ([Apple HIG](https://developer.apple.com/tutorials/data/design/human-interface-guidelines/charts.json)).

### 4.2 Grid

| Parameter | Carrier | Values |
|---|---|---|
| `grid` | attribute | `y` (default for vertical bars and lines), `x`, `both`, `none` |

- **Lines are light and few:** at most the y ticks, and none for x on line
  and column charts ([Apple HIG](https://developer.apple.com/tutorials/data/design/human-interface-guidelines/charts.json)).
- **The zero line is stronger** than the grid, because it is part of the
  reading.

### 4.3 Legend

| Parameter | Carrier | Values |
|---|---|---|
| `legend` | attribute | `auto` (default), `top`, `bottom`, `start`, `end`, `direct`, `none` |
| `legend-toggle` | attribute | `true` (default when there are 2+ series), `false` |

`auto`:
- **No legend for one series**
  ([Carbon legends](https://carbondesignsystem.com/data-visualization/legends/)).
- **Direct labels at line ends** when there is room. Otherwise the legend
  goes at the bottom.
- **Long legends** wrap to 2 lines, then collapse behind a "show all"
  button. The legend never takes more than 30 % of the height
  ([Carbon legends](https://carbondesignsystem.com/data-visualization/legends/)).

Each legend item is a real button:

- `aria-pressed` gives its state; the switched-off state uses the
  `--sf-on-disable` ink and a struck marker, not colour alone.
- Pressing it toggles the series and emits `toggle`.
- The last visible series cannot be switched off.

Legend toggling is the default in ECharts, Chart.js and ApexCharts
([systems.md §1a](systems.md#1a-model-and-behaviour)).

## 5. Tooltip and crosshair

| Parameter | Carrier | Values |
|---|---|---|
| `tooltip` | attribute | `item` (one point), `axis` (all series at one x, the default for line and bar), `none` |
| `crosshair` | attribute | `true` (default on `time` and `linear` x), `false` |

The tooltip follows WCAG 1.4.13
([understanding](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html)):

- it opens on focus as well as hover;
- Escape closes it;
- the pointer can move onto it;
- it stays until it is dismissed or the focus leaves.

It never covers the focused point
([WCAG 2.4.11](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)).

The tooltip is the Framework popover layer, not a new floating layer, so
there is one stacking order and Escape closes only the topmost
(`simai.interaction-rules`).

A `tooltip` slot (a `<template>`) lets the page lay out the tooltip content
from the hovered row. Without it, the tooltip shows each series as a marker
shape and a colour swatch, the series name and the formatted value.

## 6. Annotations

| Parameter | Carrier | Type |
|---|---|---|
| `annotations` | property | list of `{kind, …}` |

| Kind | Fields | Example |
|---|---|---|
| `line` | `axis: x \| y`, `value`, `label`, `role` | a target, an average, a date of a release |
| `band` | `axis`, `from`, `to`, `label`, `role` | a normal range, a holiday period |
| `label` | `x`, `y` (or a row `id`), `text` | a callout on one point |

`role` is a colour role from §8.4 (default `neutral`).

- **Every annotation appears in the table and the description.** A target
  line, for example, is a row "Target: 100".
- **The gauge's `target` and `bands`** are annotations under other names.
  A reference value is always shown on a gauge
  ([SLDS](https://spring-20.lightningdesignsystem.com/guidelines/data-visualization/charts/)).

## 7. Stacking and normalising

| Parameter | Carrier | Values |
|---|---|---|
| `stack` | attribute | `none` (default), `stacked`, `normalized` |
| `orientation` | attribute | `vertical` (default), `horizontal`; bar only |
| `area` | attribute | `false` (default), `true`; line only |
| `curve` | attribute | `linear` (default), `step`, `smooth`; `smooth` never overshoots the data (a monotone curve) |

- **`normalized`** shows each value as a share of its stack's total. The
  axis then reads 0–100 %, and the tooltip shows both the share and the raw
  value.
- **One setting with three values** follows Tremor's `type`
  ([Tremor](https://tremor.so/docs/visualizations/area-chart)). It also
  follows the Smart rule that a change of look is a setting, not a new tag
  (standard §6).
- **Missing values in a stack** count as missing, not zero. The stack shows
  a gap, and the table says so.

## 8. Colour

### 8.1 What the Framework already has

From `_sf_css__theme.scss`, one token set covers both themes through
`light-dark()`:

| Family | Tones | Roles a chart can use today |
|---|---|---|
| `primary`, `secondary`, `tertiary` | 16 tones (5…98) | `--sf-<role>`, `--sf-on-<role>-container-graphic` (tone 50 light / 60 dark), `--sf-outline-<role>`, `--sf-<role>-container` (alpha 12 / 24) |
| `success`, `warning`, `error`, `info` | 16 tones | the same set |
| `neutral` | 16 tones | `--sf-on-surface`, `--sf-on-surface-variant`, `--sf-on-disable`, `--sf-outline` (3:1), `--sf-outline-variant`, the surfaces `--sf-surface-0…5` |
| alpha | `--alfa-4 … 32` on tones 50 and 90; `48`, `64`, `80` for ink | state 4/8/12; fill 12–32 (dark +12); ink 48/64/80 |

### 8.2 Ink and lines (no new tokens)

| Chart part | Token |
|---|---|
| title, values in the tooltip and table | `--sf-on-surface` |
| axis labels, axis titles, legend labels | `--sf-on-surface-variant` |
| a hidden series in the legend, a disabled control | `--sf-on-disable` |
| grid lines | `--sf-outline-variant`, the edge of a region (authoring guide, "Surfaces and lines") |
| the zero line, the axis domain line | `--sf-outline` (3:1) |
| the plot background | inherits the surface it sits on; no fill of its own |
| crosshair band, hovered category | `--sf-surface-transparent-hover` (state 4) |
| selected category or point plate | `--sf-surface-transparent-select` (state 8) |
| focus ring around a point or a legend item | `--sf-focus--color`, `--sf-focus--width`, `--sf-focus--offset` |

### 8.3 Series colour (needs Framework tokens)

**The gap.** A categorical scheme needs about 8 distinct hues. The
evidence:

- Carbon orders 14 colours and smaller preset sets
  ([palettes](https://carbondesignsystem.com/data-visualization/color-palettes/)).
- Atlassian has 8 tokens and advises 5–6 in use
  ([data visualization color](https://atlassian.design/foundations/color/data-visualization-color)).
- SLDS advises about 5
  ([palettes](https://spring-20.lightningdesignsystem.com/guidelines/color/color-palettes/)).

The Framework has three brand families (`primary`, `secondary`,
`tertiary`) and four status families. The status hues cannot be reused for
categories, because they carry meaning: a green series would read as
"good". So there is no categorical set today. **SIMAI Chart does not
invent one locally. It orders it from the dispatcher.**

What the order asks for:

1. **Eight categorical roles, one per series in order:** `--sf-chart-1` …
   `--sf-chart-8` (working name). Each is a `light-dark()` pair.
2. **Contrast:**
   - each role reaches **3:1** against `--sf-surface-0` … `--sf-surface-2`
     in both themes (WCAG 1.4.11; Atlassian and Fluent state the same bar,
     [Fluent](https://microsoft.github.io/fluentui-charting-contrib/docs/Accessibility));
   - roles 1–5 are told apart under the three common colour-vision
     deficiencies. A simulation report goes with the order.
3. **Order:** neighbours in the order contrast strongly, as in Carbon. Role
   1 is the brand's `primary` graphic tone, so a one-series chart is the
   brand colour ([Atlassian](https://atlassian.design/foundations/color/data-visualization-color)).
4. **Fills:** each role has alpha steps for area fills on the existing
   scale (12, 16, 20, 24, 28, 32), in the same `--alfa-N` form as the other
   families.
5. **Themes:** a project theme can override the eight roles like any other
   token.

**Until the tokens exist**, the first chart (M0) uses series 1 =
`--sf-on-primary-container-graphic`, series 2 = secondary and series 3 =
tertiary, and it refuses more than 3 series with a console report. The test
then covers the real contract, and nothing local stands in for the missing
tokens.

**Colour belongs to the category, not to the series order.**

- A series keeps its colour when others are hidden, filtered or reordered.
- Two charts on one page give the same category the same colour when they
  share a `palette-key` (an attribute naming the colour memory).

This avoids the Power BI and Atlassian failure, where colour follows order
([Power BI themes](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-report-themes),
[Atlassian forum](https://community.developer.atlassian.com/t/forge-pie-donut-charts-don-t-guarantee-slice-order-or-color-consistency/99685)).
A page may also map categories to roles itself:
`colors = {"Plan": "neutral", "Fact": 1}`.

**More than 8 categories:**

- the smallest are grouped into "Other", using the `neutral` role and a
  dictionary word;
- the full list stays in the table;
- `max-series` sets the limit, default 8
  ([Atlassian](https://atlassian.design/foundations/color/data-visualization-color),
  [Tableau](https://help.tableau.com/current/pro/desktop/en-us/accessibility_create_view.htm)).

### 8.4 Schemes

| Scheme | Built from | New tokens? |
|---|---|---|
| **categorical** | `--sf-chart-1…8` (§8.3) | **yes, ordered** |
| **sequential** | one family's tone ladder, for example primary 90 → 30 in light and 30 → 90 in dark: the strongest value is the most contrasting tone in either theme ([Carbon](https://carbondesignsystem.com/data-visualization/color-palettes/)) | no: the tones exist; a `scheme-family` attribute picks the family |
| **diverging** | two families meeting at a neutral midpoint: `error` ↔ `success` for good and bad data, `primary` ↔ `tertiary` for neutral data (Carbon keeps the same two kinds) | no; but the midpoint step should be confirmed by the dispatcher (see below) |
| **status** | `positive` = success, `negative` = error, `warning` = warning, `neutral` = `--sf-on-surface-variant`, `info` = info; graphic tone `--sf-on-<role>-container-graphic` | no |

- **Status is never inferred from the value.** The page says which
  direction is good. This is the same rule as `sf-progress-ring`, where
  thresholds are the page's.
- **Sequential and diverging cells may fall under 3:1** against the
  surface, because the scale is continuous. The heatmap therefore always
  has a scale legend and the table, and every cell's value is in the
  tooltip. A table exempts the graphic from 1.4.11
  ([WCAG 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)).
- **Red and green carry meanings that depend on culture**
  ([SLDS](https://spring-20.lightningdesignsystem.com/guidelines/color/color-palettes/)).
  So `positive` and `negative` always come with a sign, an arrow or a word.

**The open point on diverging.** The midpoint step of a diverging scale is
a token question. Which neutral tone sits between the two families in each
theme is part of the same order to the dispatcher, so the step is defined
once and not per chart.

### 8.5 Not colour alone

WCAG 1.4.1 requires a second cue beside colour
([understanding](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)):

| Mark | Second cue |
|---|---|
| line | marker shape per series (circle, square, triangle, diamond, …); `dash` per series with `patterns="true"` |
| bar, area, slice | a 1 px gap of the surface colour between adjacent marks ([Atlassian](https://atlassian.design/foundations/color/data-visualization-color), [Chartability](https://chartability.github.io/POUR-CAF/)); pattern fills with `patterns="true"` ([Highcharts](https://www.highcharts.com/docs/accessibility/patterns-and-contrast), [ECharts decal](https://echarts.apache.org/handbook/en/best-practices/aria/)) |
| legend | the swatch shows the shape and pattern too |

In forced-colours mode (Windows High Contrast), marks take `CanvasText`
with their patterns, and the focus ring takes `Highlight`
([Highcharts](https://www.highcharts.com/docs/accessibility/accessibility-module-feature-overview),
[amCharts](https://docs.amcharts.com/v5/concepts/accessibility/)).

## 9. Size

| Parameter | Carrier | Values |
|---|---|---|
| `size` | attribute | `1/2`, `1` (default), `2`: the Framework rung. It sets the text of ticks, legend and tooltip, the legend swatch, the marker size and the paddings |
| `height` | attribute or `--sf-chart-<tag>-height` | the plot box height, a CSS length; default an aspect ratio |
| `aspect` | attribute | `2` (default for line, bar and area), `1` (pie, radar), `auto` (from `height`) |

What each part takes at rung `S` (`foundation-composition-geometry.md` §1):

| Part | Size at rung `S` |
|---|---|
| tick labels, legend labels, tooltip text | the text of rung `S` (`--sf-text-height-S` line) |
| axis title | the same text, with the label role |
| legend swatch and marker in the legend | the colour-dot size of rung `S`, scaled to its glyph area like an icon |
| legend item, "show all" and other chart buttons | a control of rung `S` (`--sf-ui-S--control-height`), so a legend button is as tall as any button beside it |
| step from swatch to label | `--sf-ui-S--text-space-x` |
| point markers in the plot | not on the ladder: a data mark, sized by the data density (a fixed small diameter, larger on focus) |
| line width | 2 px (above the thin-line warning in [WCAG 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)); 1 px for grid lines |

- **Sparkline** takes the text line height of the surrounding text, so it
  fits a sentence or a table cell.
- **KPI** follows the type scale, with the value one display step above the
  label.

The geometry probe in M0 measures these against the ladder at 375, 768 and
1280 px.

**Below a minimum width**, the chart does not squeeze its plot. Instead:

1. direct labels give way to the legend;
2. ticks thin out;
3. under the minimum plot width (rung-dependent) the plot scrolls inline
   inside its box, and the legend and table stay outside the scroller
   ([Fluent reflow](https://github.com/microsoft/fluentui/blob/master/packages/charts/react-charts/library/src/components/CommonComponents/CartesianChart.types.ts),
   [Datawrapper](https://www.datawrapper.de/charts)).

The chart reacts to its **container** (a container query plus
ResizeObserver), never to the window (the ECharts failure; see
[chart size](https://echarts.apache.org/handbook/en/concepts/chart-size/)).

## 10. Number and date formatting

All output formatting goes through `Intl`
([Highcharts i18n](https://www.highcharts.com/docs/advanced-chart-features/internationalization)
uses Intl and falls back to `html[lang]`):

| Parameter | Carrier | Values |
|---|---|---|
| `locale` | the Framework language order: the element's `lang`, then the nearest `lang`, then the page language, then `en` (standard §8) | |
| `format` (per field, in `fields`) | property | an `Intl.NumberFormat` options object (`style`, `currency`, `unit`, `notation: compact`, `maximumFractionDigits`, `signDisplay`), or for time an `Intl.DateTimeFormat` options object |
| `y-format`, `x-format` | attribute | short names for the common cases: `number`, `percent`, `compact`, `currency:<ISO>`, `unit:<unit>`; `date`, `month`, `datetime`, `time` |

- **Axis ticks** use a compact form with a step-aware precision (1 k,
  1.5 k). Tooltips and the table use the full form. One value, two formats.
- **Dates on ticks** use the shortest unambiguous form for the tick step
  ("Jun 6", not "6/6") ([Apple HIG](https://developer.apple.com/tutorials/data/design/human-interface-guidelines/charts.json)).
  The table uses the full date.
- **Currency** comes from the field's `format`, never from the locale. The
  locale changes the grouping and the decimal sign, not the currency (the
  Tableau rule, [language](https://help.tableau.com/current/pro/desktop/en-us/workbook_language.htm)).
- **Words** ("Other", "Missing", "Target", the table's column heads, the
  generated description, every announcement) come from
  `lang/<language>.json`. RU and EN ship. A missing word falls back to
  English, never to the key (standard §8).
- **A change of `lang`** on the fly re-formats without reloading data.

## 11. Description and table (the accessible text)

| Parameter | Carrier | Meaning |
|---|---|---|
| `label` | attribute | the chart's accessible name; required, as for `sf-progress-scale` |
| `description` slot | slot | a visible description written by the page. It sits in the chart's `figcaption` ([WAI complex images](https://www.w3.org/WAI/tutorials/images/complex/), [Highcharts linked description](https://www.highcharts.com/docs/accessibility/accessibility-module)) |
| `summary` | attribute | `auto` (default): when there is no description, a short summary is generated from the dictionary: type, series count, x range, min and max per series ([Datawrapper](https://www.datawrapper.de/academy/how-we-make-sure-our-charts-maps-and-tables-are-accessible)). `none` turns it off |
| `table` | attribute | `toggle` (default): a "Show as table" button; `visible`: the table is shown under the chart; `hidden`: the table exists for assistive technology only. There is never "none" ([Chartability](https://chartability.github.io/POUR-CAF/), [Carbon](https://charts.carbondesignsystem.com/api/enums/toolbarcontroltypes)) |

The table:

- is `sf-table` from SIMAI Pro, used through its public surface;
- always holds **all** rows, even when the plot draws a decimated set;
- holds the annotations as rows.

## 12. Events, actions and values

Event names follow `sf-<component>-<verb>` and `sf-<component>-<verb>ed`
(`simai.smart-vocabulary` §7). Verbs come from vocabulary §5. No new verb
is needed.

| Verb | Kind | Detail | When |
|---|---|---|---|
| `select` | request + value `selection` | `{ids}` | a point, bar or slice is chosen by click, Enter or Space. With `selectable="single\|multiple"`; off by default |
| `toggle` | request + value `hidden` | `{id}` (the series) | a legend item is pressed. `preventDefault()` keeps the series visible |
| `open` | request | `{id}` | drill-down: the page opens the next level; the chart does not fetch it itself ([ApexCharts drilldown](https://apexcharts.com/docs/drilldown/), [Highcharts drilldown](https://www.highcharts.com/docs/chart-concepts/drilldown)) |
| `query` | request + value `domain` | `{query: {x: {from, to}}}` | zoom or brush changes the visible range. The page may load more data for it, as `query` does for a list |
| `reset` | action + request | — | zoom and hidden series go back to the initial state |
| `download` | action + request | `{id: png \| svg \| csv}` | export; `preventDefault()` lets the page make the file itself |
| `refresh` | action | — | re-read the data (`error`, `unavailable` states) |

Native events stay native. `focus` and `blur` on the chart's focus target
are ordinary events (standard §4).

## 13. Public CSS variables

The standard asks for 5–10 per component, one variable per state a page
may recolour, each read with the role token as its fallback (standard §6).
The proposed set for the cartesian charts (`line`, `bar`; `<tag>` is the
part after `sf-`):

| Variable | State it colours | Fallback |
|---|---|---|
| `--sf-<tag>-height` | the plot box height (also the box a page reserves before load, standard §5.4) | aspect ratio |
| `--sf-<tag>-grid-color` | grid lines | `--sf-outline-variant` |
| `--sf-<tag>-baseline-color` | the zero line and the axis domain | `--sf-outline` |
| `--sf-<tag>-label-color` | axis and legend labels | `--sf-on-surface-variant` |
| `--sf-<tag>-hover-background-color` | the crosshair band, the hovered category | `--sf-surface-transparent-hover` |
| `--sf-<tag>-selected-background-color` | the selected category plate | `--sf-surface-transparent-select` |
| `--sf-<tag>-hidden-color` | a switched-off series in the legend | `--sf-on-disable` |
| `--sf-<tag>-line-width` | the series line width (line only) | 2 px |

Series colours are **not** component variables. They are the theme roles
`--sf-chart-1…8` (§8.3), set once per theme, so every chart on a page
agrees.

Pie, gauge, sparkline and kpi take the subset that applies (pie has no
grid), plus at most two of their own, for example `--sf-pie-gap-color`.

## 14. Parameter map

| Parameter | Attr | Prop | Value | Event | Action | Slot | CSS var |
|---|---|---|---|---|---|---|---|
| data `items` | JSON child | ● | | | | | |
| `fields` | JSON | ● | | | | | |
| `x`, `y`, `series`, `value`, `category`, `size`, `id` | ● | ● | | | | | |
| hierarchy, flow, range and OHLC mappings | ● | ● | | | | | |
| `state` | | | ● | | `refresh` | | |
| `gaps` | ● | | | | | | |
| `time-zone` | ● | | | | | | |
| `x-scale`, `y-scale`, `y-min`, `y-max`, `y-zero`, `nice`, `y2` | ● | | | | | | |
| `x-label`, `y-label`, `x-ticks`, `y-ticks`, `axes`, `y-side` | ● | | | | | | |
| `grid` | ● | | | | | | `-grid-color`, `-baseline-color` |
| `legend`, `legend-toggle` | ● | | `hidden` | `toggle` | `toggle` | | `-label-color`, `-hidden-color` |
| `tooltip`, `crosshair` | ● | | | | | `tooltip` | `-hover-background-color` |
| `annotations` | JSON | ● | | | | | |
| `stack`, `orientation`, `area`, `curve` | ● | | | | | | `-line-width` |
| `colors`, `palette-key`, `max-series`, `scheme`, `scheme-family`, `patterns` | ● | ● | | | | | theme `--sf-chart-1…8` |
| `size`, `height`, `aspect` | ● | | | | | | `-height` |
| `locale` (via `lang`), `format`, `x-format`, `y-format` | ● | ● | | | | | |
| `label`, `summary`, `table` | ● | | | | | `description` | |
| `selectable` | ● | | `selection` | `select` | `select` | | `-selected-background-color` |
| zoom | ● (`zoom="x"`) | | `domain` | `query` | `reset` | | |
| drill-down | | | | `open` | | | |
| export | ● (`export="png,svg,csv"`) | | | `download` | `download` | | |

## 15. What this needs from the Framework

These go to the dispatcher as orders, not local code (`CLAUDE.md`, write
scope):

1. **Categorical chart colour roles** `--sf-chart-1…8`, with their alpha
   steps and the contrast and colour-vision evidence (§8.3).
2. **The diverging midpoint step** in each theme (§8.4).
3. **A check that `sf-table`'s public surface can take a chart's rows and
   columns as a read-only table** (§11). This is a question to SIMAI Pro's
   owner through the dispatcher, not an edit.

Nothing else in this model needs a new token, port kind or manifest field.
The chart's settings, values, events and actions all fit the existing
Smart surface and vocabulary.
