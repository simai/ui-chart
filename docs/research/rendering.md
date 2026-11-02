# Rendering: renderer, shared core, budgets, print and export

Stage R, file 4 of 4. This file proposes how SIMAI Chart draws. In short:

- an own renderer, with no third-party engine;
- SVG by default, with Canvas for the data layer past a **measured**
  threshold;
- one shared chart core that every chart component uses;
- size and first-paint budgets;
- how a chart prints and exports.

The proposal rests on four sources:

- the comparison in [systems.md](systems.md);
- the parameter model in [parameters.md](parameters.md);
- the Framework rules: `simai.smart-component` 1.3.14, and the `simai/ui-source`
  docs `docs/developer/pure-javascript-runtime.md` and
  `docs/developer/smart-component-authoring.md`;
- one measurement, described in §2.

## 1. Own renderer, not a third-party engine

**Recommendation:** an own renderer on browser APIs. Lit is used for
templates, which the Framework already allows for Smart components
("Smart Components may use Lit…; no other third-party JavaScript library is
part of the default runtime contract", `pure-javascript-runtime.md`).

**Reasons:**

1. **Licence.** The engines with the strongest accessibility are
   proprietary or revenue-tiered: Highcharts, amCharts, ApexCharts
   ([systems.md §3](systems.md#3-full-libraries)). The licence of SIMAI
   Chart (PolyForm or SIMAI Commercial) cannot carry them.
2. **Gaps.** The open engines (ECharts, Chart.js, G2, Vega-Lite) lack
   keyboard navigation and a data table, and none of them handles reduced
   motion. Most lack RTL as well
   ([systems.md §9](systems.md#9-across-the-study)). We would patch them
   from outside and own the patches anyway.
3. **The Framework already holds most of a chart system:**
   - tokens and themes (`light-dark()`);
   - `lang` dictionaries and the language order;
   - logical sides;
   - the size ladder;
   - the popover layer;
   - the interaction rules;
   - `sf-table` for the table;
   - `sf-empty-state` for the empty state.

   An engine would bring a second copy of each, with its own theme and
   locale system.
4. **Performance gives no reason for an engine.** The measurement in §2
   shows that a plain SVG path stays well inside the Framework budget for
   the sizes a product dashboard draws.

No third-party runtime dependency is proposed, so no owner decision on one
is needed. If M0 or a later tier finds a case that cannot be drawn within
the budgets in §5, work stops and the dispatcher hears it, as the handoff
asks.

## 2. Measurement: SVG against Canvas

**What was measured.** One plot box, 800 × 400 CSS px, drawn four ways,
each N times:

| Way | Meaning |
|---|---|
| `svg-marks` | one SVG element per point: a scatter, or bars |
| `svg-path` | one SVG path through all points: a line |
| `canvas-marks` | one Canvas arc per point |
| `canvas-path` | one Canvas stroke through all points |

- Each cell is the median of 5 runs and has two numbers:
  - **sync**: building the elements plus layout, in ms;
  - **frame**: until two animation frames have passed, in ms. The floor
    here is about 33 ms, two frames at 60 Hz, so it shows only what spills
    past the frame.
- Headless Chrome 156, device pixel ratio 1, on 2026-11-02.
- The CPU was slowed 4× through the DevTools protocol, as gate 17 of the
  Smart standard measures (§18, "at a 4× slowed CPU").
- Files: [bench/render-bench.html](bench/render-bench.html),
  [bench/run-bench.mjs](bench/run-bench.mjs), and the raw results in
  [bench/result-cpu1x.json](bench/result-cpu1x.json) and
  [bench/result-cpu4x.json](bench/result-cpu4x.json).

**Results at 4× slowdown** (sync / frame, ms):

| N | svg-marks | svg-path | canvas-marks | canvas-path |
|---:|---:|---:|---:|---:|
| 100 | 1.7 / 33 | 0.8 / 33 | 0.9 / 34 | 0.8 / 34 |
| 1 000 | 7.8 / 34 | 1.0 / 34 | 1.0 / 34 | 0.7 / 34 |
| 2 000 | 14.7 / 33 | 1.9 / 34 | 1.3 / 34 | 0.6 / 33 |
| 5 000 | **33.3 / 50** | 3.8 / 33 | 2.9 / 34 | 1.0 / 34 |
| 10 000 | **60.2 / 84** | 7.9 / 33 | 5.2 / 34 | 1.1 / 33 |
| 50 000 | **335 / 433** | 36.2 / 50 | 24.2 / 49 | 2.5 / 33 |
| 100 000 | not run | 74.6 / 84 | 47.9 / 67 | 4.7 / 33 |

**What it shows:**

1. **One SVG element per mark** passes a 16.7 ms frame between 2,000 marks
   (14.7 ms) and 5,000 marks (33 ms). This is where SVG gets expensive, and
   it matches the ECharts advice of Canvas "above about 1,000" for its
   heavier marks
   ([canvas vs svg](https://echarts.apache.org/handbook/en/best-practices/canvas-vs-svg/)).
2. **A line as one SVG path stays under a frame up to 10,000 points**
   (7.9 ms). With decimation to about 2 points per horizontal pixel, a line
   never draws more than a few thousand points. So a **line never needs
   Canvas**: it needs decimation.
3. **Canvas stays flat** until about 50,000 marks.

**What was not measured**, and is measured in M0 on the real core:

- hover and hit testing;
- a redraw after a legend toggle;
- device pixel ratio 2;
- Firefox and Safari.

### 2.1 The rule that follows

| Mark kind | Renderer |
|---|---|
| paths (line, area, the step forms) | always SVG; decimated past **2 × plot width** points per series |
| per-point marks (scatter, bubble, bar, heatmap cell, box) | SVG up to **2,000** marks in the plot; Canvas for the **marks layer only** above that |
| everything else (axes, grid, labels, legend, annotations, focus ring, crosshair) | always SVG or HTML, in both modes |

- **Only the data layer moves to Canvas**, and the axes, focus and text stay
  in the accessible tree. This is the ApexCharts idea of moving "only the
  series layer"
  ([renderer](https://apexcharts.com/docs/options/chart/renderer/)).
- **The threshold is a setting with a measured default:**
  `renderer="auto"` (default), `svg` or `canvas`, and `canvas-from="2000"`.
- **Nothing is lost silently when the mode switches.** Stacking, dashes and
  patterns all keep working in Canvas. This is unlike the Highcharts boost
  mode, which drops them
  ([boost](https://www.highcharts.com/docs/advanced-chart-features/boost-module)).

### 2.2 Decimation

- **Line and area: min-max per pixel bucket by default.** It keeps peaks
  and dips, which a monitoring chart must not lose. LTTB is an option for
  smooth trends. Both are the algorithms Chart.js, ECharts and G2 document
  ([Chart.js](https://www.chartjs.org/docs/latest/configuration/decimation.html),
  [ECharts](https://raw.githubusercontent.com/apache/echarts-doc/master/en/option/series/line.md),
  [G2](https://g2.antv.antgroup.com/en/manual/core/transform/sample)).
  The setting is `decimate="minmax|lttb|none"`.
- **Decimation is for drawing only.** The table, the export, the tooltip
  value and the description read the full rows. Datawrapper's row caps hide
  data, which this avoids
  ([max size](https://www.datawrapper.de/academy/max-size-for-data-upload)).
- **When decimation is active,** the description says so: "Drawn from N
  points; every point is in the table".
- **Bars do not decimate.** Past about 100 bars the chart groups by the
  axis unit, a week instead of a day, if the page allows `bin`. Otherwise
  it scrolls (parameters.md §9).

## 3. One shared chart core

Every chart component is a thin Smart component: its manifest, its mapping
and its mark drawer. Everything else is the core, built once and loaded
once by the Loader as part of the `chart` package. This is the visx idea of
a core plus an accessibility layer under every chart
([visx-chart](https://github.com/airbnb/visx/tree/master/packages/visx-chart),
[visx-a11y](https://github.com/airbnb/visx/tree/master/packages/visx-a11y)),
done on the Framework.

| Core module | Does | Parameters (parameters.md) |
|---|---|---|
| `data` | turns `items` (records or columns, long or wide) into typed series; marks missing values; keeps ids | §2 |
| `scale` | linear, log, time (calendar ticks), band, ordinal; nice domains and ticks | §3 |
| `format` | `Intl.NumberFormat` and `Intl.DateTimeFormat`, cached per locale and options; compact tick format and full value format; follows `lang` | §10 |
| `layout` | measures label text, places axes, legend and direct labels; works from the container size (ResizeObserver plus container queries); reflow below the minimum width | §4, §9 |
| `axis` | axes, grid, zero line, tick thinning; logical sides for RTL | §4 |
| `marks` | one drawing interface with two back ends, SVG and Canvas; the chart's own drawer calls it | §2.1 |
| `decimate` | min-max and LTTB per series | §2.2 |
| `colour` | resolves series to `--sf-chart-N` roles by category, with colour memory per `palette-key`; status, sequential and diverging scales from Framework tones; patterns and marker shapes | §8 |
| `pointer` | hit testing (binary search on x; a grid index for scatter), crosshair, tooltip anchoring | §5 |
| `keyboard` | the three-level model below | §5, §11 |
| `tooltip` | content from the row or the `tooltip` slot, shown in the Framework popover layer | §5 |
| `describe` | the generated summary from the dictionary; live-region announcements | §11 |
| `table` | builds the read-only rows and columns for `sf-table`, annotations included | §11 |
| `export` | PNG, SVG and CSV (§6) | §12 |
| `motion` | enter and update transitions on Framework duration tokens; off under `prefers-reduced-motion` | below |

### 3.1 Keyboard model (one model in the core)

This combines Power BI, Datawrapper, Grafana and Highcharts
([systems.md §8](systems.md#8-accessibility-sources)):

1. **One Tab stop for the plot.** The legend's buttons and the chart's
   buttons ("Show as table", export) are ordinary Tab stops after it.
2. **Arrow keys on the plot move a cursor:**
   - Left and Right move along x;
   - Up and Down switch series;
   - in a scatter the arrows move to the nearest point in that direction;
   - Home and End go to the ends;
   - Page Up and Page Down jump by a tick step;
   - Enter or Space selects (when `selectable`) or opens (drill-down);
   - Escape closes the tooltip first, then leaves the cursor.
3. **Each move announces** the point through a polite live region: series,
   x, value and the delta from the previous point. The tooltip shows the
   same point.
4. **Past the point-navigation threshold** (the Highcharts idea of a
   threshold,
   [seriesNavigation](https://api.highcharts.com/highcharts/accessibility.keyboardNavigation.seriesNavigation)),
   the cursor moves by bucket and announces the bucket's range and min and
   max. The table is offered as the full route. The default is 200 points
   per series.
5. **The model works the same in SVG and Canvas.** The cursor and focus
   ring are drawn in the SVG overlay, so Canvas mode loses no keyboard
   access.
6. **No keys are taken from assistive technology.** The plot uses
   `role="group"` with a `aria-roledescription` from the dictionary, not
   `role="application"`
   ([Chartability](https://chartability.github.io/POUR-CAF/)).

`simai.interaction-rules` applies throughout. The M0 probe checks it with
keyboard only and with a screen reader.

### 3.2 Motion

- **Transitions only for object constancy:** enter, update, a toggle of
  a series. The duration comes from the Framework tokens
  (`--sf-duration-normal`), within the 250 ms–2 s band
  ([Chartability](https://chartability.github.io/POUR-CAF/)).
- **`prefers-reduced-motion: reduce` turns them off** by default
  (ApexCharts and Recharts do the same:
  [ApexCharts](https://apexcharts.com/docs/options/chart/animations/),
  [Recharts](https://recharts.github.io/en-US/guide/animations/)).
- **Nothing loops.**
- **No information is carried by motion alone**
  ([Apple HIG](https://developer.apple.com/tutorials/data/design/human-interface-guidelines/charts.json)).
- **No transition past a measured mark count.** ECharts turns animation
  off above 2,000 elements
  ([option](https://echarts.apache.org/en/llms-documents/option.md)); our
  default is the Canvas threshold.

### 3.3 Document structure

```
<sf-chart-line label="…">            Smart host (display: contents)
  <figure>
    <figcaption>                     label, the description slot, the summary
    <div class="plot">               the one Tab stop, role="group"
      <canvas>                       only in Canvas mode, aria-hidden
      <svg>                          axes, grid, marks (SVG mode), overlay
    <div class="legend">             HTML buttons on the size ladder
    <div class="actions">            Show as table, export
    <sf-table>                       the table (hidden, toggled or visible)
```

- **The legend and the buttons are HTML, not SVG text**, so they sit on the
  control ladder (parameters.md §9) and are real buttons.
- **Visible tick text is `aria-hidden`.** The table and the summary carry
  the values.

## 4. Size budget

The targets below are gzip sizes of the package's built files. They are
measured by the package build in M0 and fail the build when exceeded.

| Part | Target | Why this number |
|---|---|---|
| chart core | ≤ 25 KB | the Framework's shared Smart base is about 26 KB minified (`shared-runtime.md`); the core should not cost a page more than the Framework base itself |
| each Tier 1 chart beyond the core | ≤ 6 KB | a chart is a manifest, a mapping and a drawer |
| all of Tier 1 (core + 5 charts) | ≤ 50 KB | |
| the table | 0 KB | `sf-table` is SIMAI Pro's and is loaded only when the table is opened or shown |
| lang dictionaries | ≤ 2 KB per language | loaded with the package, the RU and EN files only |

**Loading:**

- The Loader loads the core once per page, the first time a `sf-chart-*` tag
  appears, and each chart's own module only for the tags on the page.
- A page holds its first paint for none of them, as for any component
  package (`component-packages.md`).

## 5. First-paint and runtime budgets

| Budget | Value | Source |
|---|---|---|
| layout shift from the chart | **0**: the box is reserved before code arrives, through `height` or `aspect` and the published `--sf-<tag>-height` | standard §5.4 (reserve the box); authoring guide "late data has a skeleton" |
| first paint | the build snapshot: figure, caption and an empty plot frame with the axes skeleton. **≤ 8 KB**, the snapshot limit. The data is drawn after the code and the data arrive | authoring guide, "every component's first paint is a build snapshot" |
| first render, 1,000 points | ≤ 1.5 s at 4× slowdown; §2 measured a 1,000-point path at about 1 ms sync | gate 17 |
| first render, 100 points | ≤ 1 s at 4× slowdown | gate 17 |
| one point changed | ≤ 50 ms | gate 17 |
| hover to tooltip | ≤ 1 frame (16 ms) at 1×; measured in M0 | own target |
| DOM nodes | ≤ 30 per entry (gate 17); Canvas mode keeps the node count flat however many marks | gate 17 |

**Why the snapshot has no data in it.** A chart with data in its snapshot
would go over 8 KB at a few hundred points. It would also show stale data
between first paint and the real data. So the snapshot is the frame, in the
same box, and the marks appear on the frame without moving it.

## 6. Print and export

### 6.1 Print

- **SVG prints as vector**, with no work.
- **The Canvas layer** is redrawn at print resolution on `beforeprint`. The
  `print` media query hides the screen-size canvas and shows the print-size
  one.
- **Removed in print:** the tooltip, crosshair, focus ring and the chart's
  buttons.
- **The table prints** when `table="visible"`, and the page may force it
  with a print-only attribute.
- **A chart in a document preview** (`--sf-paper`, which never flips to
  dark) uses the light branch of every token, for the same reason the paper
  does. This is a rule for M0's print probe.

### 6.2 Export

The `download` action and the export buttons with `export="png,svg,csv"`
produce three formats:

| Format | How |
|---|---|
| **SVG** | a serialised copy of the chart's own SVG, with every CSS variable resolved to its computed colour (variables do not travel in a file), the Canvas layer drawn back as SVG marks, and the title and the description in `<title>` and `<desc>` |
| **PNG** | the SVG above, drawn to a canvas at 2× the CSS size, with the Canvas layer composited in; a white or surface-0 background |
| **CSV** | the full rows, never decimated; one column per field with the `label` as the header; numbers unformatted with a dot decimal and dates in ISO 8601, so the file reads back into any tool. The locale-formatted table is for reading; the CSV is data |

- **File name:** the chart's `label` plus the date, made safe for a file
  system.
- **The page can take over the file.** The request is a cancelable event
  (`sf-<tag>-download`), and `preventDefault()` lets the page make the file
  itself, for example a branded PDF.

## 7. What M0 must prove

1. **The core and `line`** (the likely first Tier 1 chart) meet the budgets
   in §4 and §5. §2's numbers are re-measured with real hover and toggle at
   DPR 1 and 2.
2. **The keyboard model (§3.1) passes:**
   - with a keyboard only;
   - with VoiceOver and NVDA reading the announcements;
   - with the table as the full route.
3. **Light and dark, at 375, 768 and 1280 px:**
   - every part on the ladder (the geometry probe);
   - reflow below the minimum width;
   - no layout shift from first paint to data.
4. **Reduced motion and forced colours** both give a complete chart.
5. **Print:**
   - an SVG chart prints as vector;
   - a Canvas chart prints its print-size redraw;
   - the table prints when asked.
6. **Export:**
   - SVG and PNG open in a browser and an image viewer with the theme
     colours resolved;
   - the CSV reads back with the same row count as `items`.
