# Chart systems: comparison

Stage R, file 1 of 4. This file compares 25 chart systems and 4 chart guides
on 13 points, then names what each does best and what to avoid. It is study
material only. SIMAI Chart copies no code, styles, palettes or icons from
any of them. Every idea taken from here keeps its source link when it moves
into `catalogue.md`, `parameters.md` or `rendering.md`.

- **Checked:** 2026-11-02, from official docs, galleries, source repositories
  and licence files. Versions read are named in each section.
- **Sources:** every claim in the system sections carries its link. A link
  marked *(3rd-party)* is not the vendor's own page and should be re-checked
  before it backs a decision.
- **Gaps:** "not found" means the docs read did not confirm the point. It
  does not mean the system lacks it.
- **The matrix:** each cell is a summary of the system section below, and
  the links are in that section.

## Contents

1. [Matrix](#1-matrix)
2. [Grammar and declarative](#2-grammar-and-declarative): Vega-Lite, Observable Plot, ggplot2
3. [Full libraries](#3-full-libraries): ECharts, Highcharts, amCharts 5, Chart.js, AntV G2, ApexCharts
4. [Design-system charts](#4-design-system-charts): Carbon, Material 3, Atlassian, Salesforce Lightning, Fluent, Apple Swift Charts
5. [Component libraries](#5-component-libraries): Recharts, Nivo, visx, Tremor
6. [Editorial](#6-editorial): Datawrapper, Flourish, FT Visual Vocabulary, The Economist, NYT
7. [BI and monitoring](#7-bi-and-monitoring): Tableau, Power BI, Looker / Google Charts, Grafana, Superset
8. [Accessibility sources](#8-accessibility-sources)
9. [Across the study: what to take, what to avoid](#9-across-the-study)

## 1. Matrix

Marks: ● built in and documented; ◐ partial, a plugin or extension, or left
to the developer; ○ not found; — does not apply (a guide or a static tool).

### 1a. Model and behaviour

| System | Types | Data model | Declared as | Theming | Tooltip | Legend toggle | Zoom / brush | Crosshair | Drill-down |
|---|---|---|---|---|---|---|---|---|---|
| Vega-Lite | 11 marks + 3 composite | records | JSON grammar | config, presets | ● | ● | ● | ◐ | ○ |
| Observable Plot | ~30 marks | records / columns / Arrow | JS grammar | `currentColor`, CSS | ● | ○ | ○ | ● | ○ |
| ggplot2 | 50 geoms | data frame | R grammar | ink / paper / accent | — | — | — | — | — |
| ECharts | 23 series | series or `dataset` | option object | tokens, `setTheme` | ● | ● | ● | ● | ● |
| Highcharts | broad | arrays, points, `dataTable` | option object | CSS vars, auto dark | ● | ● | ● | ● | ● |
| amCharts 5 | broad (303 demos) | records | object tree | themes, rules | ● | ◐ | ● | ● | ○ |
| Chart.js | 9 | labels + datasets | config object | defaults, 7 colours | ● | ● | ◐ | ○ | ○ |
| AntV G2 | marks (grammar) | records | spec or chain | 5 themes | ● | ● | ● | ● | ○ |
| ApexCharts | ~32 | series arrays | option object | CSS vars, OS follow | ● | ● | ● | ● | ● |
| Carbon Charts | 26 | records + group key | class per type | 14-colour ordered set | ● | ● | ● | ○ | ○ |
| Atlassian | 7 | arrays + accessors | React props | `color.chart.*` tokens | ◐ | ○ | ○ | ○ | ○ |
| Salesforce Lightning | guide only | — | — | 6-hue palette | — | — | — | — | — |
| Fluent charts | ~16 | typed props, Plotly JSON | React, JSON spec | 40 colours, 7 status | ● | ● | ○ | ○ | ○ |
| Swift Charts | 7 marks + plots | collections | SwiftUI marks | style scale | ● | ○ | ◐ | ○ | ○ |
| Recharts | 12 | records + `dataKey` | composable React | CSS vars, `light-dark()` | ● | ◐ | ◐ | ○ | ○ |
| Nivo | ~25 | per chart | React per chart | theme object | ● | ◐ | ○ | ○ | ○ |
| visx | primitives | any + accessors | composition kit | CSS vars from tokens | ● | ○ | ● | ● | ○ |
| Tremor | 11 | records + `index`/`categories` | React props | Tailwind | ● | ● | ○ | ○ | ○ |
| Datawrapper | 23 | flat table | editor, API | paid themes | ● | ◐ | ◐ | ○ | ○ |
| Flourish | 50+ templates | CSV + bindings | editor, `template.yml` | paid themes | ● | ○ | ○ | ○ | ○ |
| Tableau | ~24 (Show Me) | logical + physical | shelves | ○ | ● | ● | ● | ○ | ● |
| Power BI | broad | semantic model | wells | theme JSON, named roles | ● | ● | ● | ○ | ● |
| Google Charts | broad | DataTable | JS options | ○ | ○ | ○ | ○ | ○ | ○ |
| Grafana | ~20 panels | data frames (Arrow) | panel JSON | light / dark | ● | ● | ● | ● | ○ |
| Superset | ECharts plugins | SQL datasets | plugin per type | Ant tokens | ● | ○ | ○ | ○ | ○ |

### 1b. Access, scale, output and licence

| System | Keyboard | Screen reader | Table fallback | Not colour alone | Responsive | Renderer / large data | Reduced motion | Export | Number / date locale | RTL | Licence |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vega-Lite | ○ | ● auto ARIA (SVG) | ○ | ○ | ◐ container | SVG / Canvas, no decimation | ○ | PNG, SVG | d3 locale | ◐ text `dir` | BSD-3-Clause |
| Observable Plot | ○ | ◐ labels | ○ | ○ | ◐ max-width | SVG only | ○ | SVG | Intl | ○ | ISC |
| ggplot2 | — | ◐ alt text | ○ | ● patterns | — | device | — | PNG, SVG, PDF | scales | ○ | MIT |
| ECharts | ○ | ◐ generated label | ◐ data view | ● decal | ◐ manual `resize` | Canvas / SVG, LTTB, `large` | ○ | PNG, SVG | own files | ○ | Apache-2.0 |
| Highcharts | ● | ● | ● | ● patterns | ● rules | SVG + WebGL boost | ○ | PNG, SVG, PDF, CSV | Intl | ◐ manual | proprietary |
| amCharts 5 | ● | ● | ○ | ● patterns | ● rules | Canvas / SVG, grouping | ○ | PNG, PDF, CSV | Intl | ● | linkware / paid |
| Chart.js | ○ | ◐ developer's job | ○ | ◐ canvas patterns | ● | Canvas, LTTB / min-max | ○ | PNG | Intl | ◐ legend, tooltip | MIT |
| AntV G2 | ○ | ○ | ○ | ◐ example | ◐ `autoFit` | Canvas / SVG / WebGL, sampling | ○ | ◐ canvas | ○ | ○ | MIT |
| ApexCharts | ● | ● | ○ | ◐ | ● breakpoints | SVG, Canvas past 8000 | ● | PNG, SVG, CSV | own files | ○ | revenue-tiered |
| Carbon Charts | ◐ | ◐ label | ● | ● textures | ● | SVG (D3) | ○ | PNG, JPG, CSV | `locale` | ○ | Apache-2.0 |
| Atlassian | ○ | ◐ | ○ | ● rule | ◐ | ○ | ○ | ○ | ○ | ○ | ○ |
| Salesforce Lightning | ◐ rule | ○ | ○ | ● rule | ◐ rule | — | — | — | — | — | — |
| Fluent charts | ● | ● | ● ChartTable | ● shapes | ● reflow | SVG (D3) | ○ | image | Intl | ● | ○ (repo MIT) |
| Swift Charts | ● | ● audio graphs | ◐ guidance | ● rule | ● rules | vectorised plots | ◐ rule | ○ | ◐ | ◐ SwiftUI | platform SDK |
| Recharts | ● arrows | ◐ | ○ | ○ | ● | SVG only | ● auto | ○ | ◐ formatter | ◐ manual | MIT |
| Nivo | ◐ focusable | ◐ | ○ | ● patterns | ● | SVG / Canvas variants | ○ | server image | ◐ formatter | ○ | MIT |
| visx | ● roving focus | ● live region | ● | ● pattern pkg | ● | SVG | ○ | server table | ○ | ○ | MIT |
| Tremor | ◐ legend | ◐ | ○ | ○ | ● | SVG (Recharts) | ○ | ○ | ◐ formatter | ○ | Apache-2.0 |
| Datawrapper | ● explorer | ● generated | ◐ CSV link | ◐ checker | ● mobile rules | SVG, row caps | ○ | PNG, SVG, PDF, CSV | ● | ● by locale | SaaS |
| Flourish | ● | ● description | ◐ CSV | ○ | ○ | ○ | ● | PNG, SVG, HTML | ◐ modules | ○ | SaaS |
| Tableau | ◐ | ● tooltips read | ● View Data | ● rule | ● device layouts | server past 1,000 marks | ○ | PNG, SVG, PDF | ● locale | ○ | per seat |
| Power BI | ● 3 levels | ● | ● Show data | ● colour-blind theme | ◐ mobile layout | point caps 3,500–30,000 | ○ | PDF, PNG, CSV | ○ | ○ | per seat |
| Google Charts | ○ | ○ | ○ | ○ | ○ | SVG | ○ | ○ | ○ | ○ | API terms |
| Grafana | ● cursor | ◐ | ◐ inspect | ○ | ○ | Canvas | ○ | CSV, PNG | ◐ UI only | ○ | AGPL-3.0 |
| Superset | ○ | ○ | ○ | ○ | ○ | ECharts | ○ | PNG, CSV | d3-format | ○ | Apache-2.0 |

## 2. Grammar and declarative

### Vega-Lite

Version 6.5.0, released 2026-10-08
([releases](https://github.com/vega/vega-lite/releases)).

1. **Chart types.**
   - 11 primitive marks (area, bar, circle, line, point, rect, rule, square,
     text, tick, geoshape) and 3 composite marks (boxplot, errorband,
     errorbar) ([mark](https://vega.github.io/vega-lite/docs/mark.html)).
   - Marks combine through layer, facet, repeat and concat. The gallery has
     about 220 examples in about 17 sections
     ([examples](https://vega.github.io/vega-lite/examples/)).
2. **Data model.** Records with named fields. Data comes inline, from a URL
   (JSON, CSV, TSV, TopoJSON), from a named runtime source or from
   generators ([data](https://vega.github.io/vega-lite/docs/data.html)).
3. **Declaration.** A JSON spec of data + mark + encoding, compiled to Vega
   and drawn through vega-embed
   ([vega-embed](https://github.com/vega/vega-embed)).
4. **Theming.**
   - A `config` object sets defaults for marks, axes, range schemes,
     background and font, with named styles
     ([config](https://vega.github.io/vega-lite/docs/config.html)).
   - vega-themes ships 14 presets, a dark one among them
     ([vega-themes](https://github.com/vega/vega-themes)).
   - No CSS variables and no automatic `prefers-color-scheme`: not found.
5. **Interaction.**
   - Tooltip through a channel
     ([tooltip](https://vega.github.io/vega-lite/docs/tooltip.html)).
   - Point and interval selections, which give a brush
     ([selection](https://vega.github.io/vega-lite/docs/selection.html)).
   - The legend toggles series and the scales pan and zoom, both through
     `bind` ([bind](https://vega.github.io/vega-lite/docs/bind.html)).
   - A crosshair is built by hand from selections and rules. Drill-down:
     not found.
6. **Accessibility.**
   - `config.aria` (on by default) puts ARIA on marks and guides, with
     automatic descriptions, in SVG output only
     ([config](https://vega.github.io/vega-lite/docs/config.html)).
   - Keyboard, table fallback, patterns: not found.
7. **Responsiveness.** `width: "container"` follows the container through
   ResizeObserver, for single and layered views only, not facet or concat
   ([size](https://vega.github.io/vega-lite/docs/size.html)).
8. **Large data.**
   - SVG or Canvas renderer
     ([vega-embed](https://github.com/vega/vega-embed)). No built-in
     decimation.
   - Scaling moves to a server (VegaFusion) on the Python side
     ([Altair](https://altair-viz.github.io/user_guide/large_datasets.html)).
9. **Animation.** None in core. Animated Vega-Lite is a research paper
   ([MIT vis](https://vis.mit.edu/pubs/animated-vega-lite)). Reduced
   motion: not found.
10. **Export.** PNG and SVG from the embed menu and the View API. No CSV
    export ([View API](https://vega.github.io/vega/docs/api/view/)).
11. **Localisation.** `config.locale` takes number and time locale
    definitions on d3-format and d3-time-format, not Intl
    ([config](https://vega.github.io/vega-lite/docs/config.html)).
12. **RTL.** Only the Vega text mark has `dir`
    ([Vega text](https://vega.github.io/vega/docs/marks/text/)). Mirrored
    layout: not found.
13. **Licence.** BSD-3-Clause
    ([LICENSE](https://github.com/vega/vega-lite/blob/main/LICENSE)).

**Best at:**
- A serialisable, generatable spec that composes views
  ([examples](https://vega.github.io/vega-lite/examples/)).
- Interaction declared rather than coded: selections, legend binding,
  scale zoom ([selection](https://vega.github.io/vega-lite/docs/selection.html)).
- ARIA descriptions without author work
  ([config](https://vega.github.io/vega-lite/docs/config.html)).

**Avoid:**
- Browser-side large data
  ([Altair](https://altair-viz.github.io/user_guide/large_datasets.html)).
- Responsive faceted layouts
  ([size](https://vega.github.io/vega-lite/docs/size.html)).

### Observable Plot

Version 0.6.17 ([releases](https://github.com/observablehq/plot/releases)).
The site was rate-limited, so the facts come from the Markdown docs in the
repository.

1. **Chart types.** About 30 marks: area, bar, box, cell, contour, density,
   dot, geo, hexgrid, line, raster, rect, rule, text, tick, tip, tree,
   vector, waffle and others
   ([docs/marks](https://github.com/observablehq/plot/tree/main/docs/marks)).
2. **Data model.** Tidy records first. Parallel column arrays and Apache
   Arrow tables also work. A channel is a field name, an accessor or an
   array
   ([marks](https://raw.githubusercontent.com/observablehq/plot/main/docs/features/marks.md)).
3. **Declaration.** JS calls: one plot function with a list of mark
   constructors.
4. **Theming.** Marks and axes default to `currentColor`, so they follow
   the page text colour, and dark mode works without a theme. Styling goes
   through `style` and `className`
   ([plots](https://raw.githubusercontent.com/observablehq/plot/main/docs/features/plots.md)).
5. **Interaction.**
   - Pointer transforms drive a tip and a crosshair
     ([pointer](https://raw.githubusercontent.com/observablehq/plot/main/docs/interactions/pointer.md)).
   - Brush is still an open issue
     ([#5](https://github.com/observablehq/plot/issues/5)), and so is
     pan/zoom ([#1590](https://github.com/observablehq/plot/issues/1590)).
6. **Accessibility.**
   - `ariaLabel` channel and mark descriptions
     ([marks](https://raw.githubusercontent.com/observablehq/plot/main/docs/features/marks.md)).
   - Title, subtitle and caption render as `h2`, `h3` and `figcaption`
     ([plots](https://raw.githubusercontent.com/observablehq/plot/main/docs/features/plots.md)).
   - Keyboard and table: not found.
7. **Responsiveness.** 640 px default width with `max-width: 100%`, and no
   re-render on resize
   ([plots](https://raw.githubusercontent.com/observablehq/plot/main/docs/features/plots.md)).
8. **Large data.** SVG only. Maintainers name SVG paths as the bottleneck
   and suggest decimation
   ([discussion #947](https://github.com/observablehq/plot/discussions/947)).
9. **Animation.** Not found.
10. **Export.** Returns an SVG element, and can render without a browser
    DOM
    ([plots](https://raw.githubusercontent.com/observablehq/plot/main/docs/features/plots.md)).
11. **Localisation.** Number, month and weekday formats take BCP 47 tags
    and use Intl
    ([formats](https://raw.githubusercontent.com/observablehq/plot/main/docs/features/formats.md)).
12. **RTL.** Not found.
13. **Licence.** ISC
    ([LICENSE](https://raw.githubusercontent.com/observablehq/plot/main/LICENSE)).

**Best at:**
- Short, expressive charts with statistical transforms
  ([docs/marks](https://github.com/observablehq/plot/tree/main/docs/marks)).
- Fitting into the page through `currentColor` and semantic headings
  ([plots](https://raw.githubusercontent.com/observablehq/plot/main/docs/features/plots.md)).

**Avoid:**
- Dashboard interaction: no brush, zoom or legend toggle yet
  ([#5](https://github.com/observablehq/plot/issues/5)).
- Large data
  ([discussion #947](https://github.com/observablehq/plot/discussions/947)).

### ggplot2

Version 4.0.3, published 2026-04-22
([CRAN](https://cran.r-project.org/package=ggplot2)). R, static output.

1. **Chart types.** 50 geoms, 19 stats, 9 coordinate systems and 2 facets
   ([reference](https://ggplot2.tidyverse.org/reference/index.html)).
2. **Data model.** A data frame. `aes()` maps variables to aesthetics, and
   each layer may bring its own data
   ([ggplot](https://ggplot2.tidyverse.org/reference/ggplot.html)).
3. **Declaration.** Layers added with `+`: data, aesthetics, geom, stat,
   scale, coord, facet, theme.
4. **Theming.**
   - Since 4.0 complete themes take `ink`, `paper` and `accent`. These are
     role tokens: a dark theme is ink and paper swapped.
   - Layer defaults come from the theme
     ([4.0.0](https://tidyverse.org/blog/2025/09/ggplot2-4-0-0/)).
5. **Interaction.** None in core. It lives in a GPL-3 extension
   ([ggiraph](https://davidgohel.github.io/ggiraph/)).
6. **Accessibility.**
   - Alt text in `labs(alt = …)`
     ([labs](https://ggplot2.tidyverse.org/reference/labs.html)).
   - Pattern fills since 3.5
     ([3.5.0](https://tidyverse.org/blog/2024/02/ggplot2-3-5-0/)).
7. **Responsiveness.** Does not apply: the size is fixed when the image is
   drawn ([ggsave](https://ggplot2.tidyverse.org/reference/ggsave.html)).
8. **Large data.** Binning geoms (hex, 2D bins) for dense data
   ([reference](https://ggplot2.tidyverse.org/reference/index.html)).
9. **Animation.** Lives in an extension.
10. **Export.** PNG, SVG, PDF and more at a set DPI
    ([ggsave](https://ggplot2.tidyverse.org/reference/ggsave.html)).
11. **Localisation.** Through the scales package: date locale, and
    decimal and grouping marks
    ([label_number](https://scales.r-lib.org/reference/label_number.html)).
12. **RTL.** Not found.
13. **Licence.** MIT ([CRAN](https://cran.r-project.org/package=ggplot2)).

**Best at:**
- The reference grammar of graphics
  ([reference](https://ggplot2.tidyverse.org/reference/index.html)).
- A theme model built on roles (ink, paper, accent), close to the
  Framework's colour roles
  ([4.0.0](https://tidyverse.org/blog/2025/09/ggplot2-4-0-0/)).

**Avoid:**
- As a model for web behaviour. It is static, and its interaction comes
  from a GPL extension
  ([ggiraph](https://davidgohel.github.io/ggiraph/)).

## 3. Full libraries

### Apache ECharts

Version 6.1.0 ([releases](https://github.com/apache/echarts/releases)).

1. **Chart types.**
   - 23 core series: bar, boxplot, candlestick, chord, custom, funnel,
     gauge, graph, heatmap, line, lines, map, parallel, pictorialBar, pie,
     radar, sankey, scatter, sunburst, themeRiver, tree, treemap and others
     ([index](https://echarts.apache.org/en/llms.txt)).
   - Version 6 added a broken axis, beeswarm and a matrix coordinate system
     ([v6](https://echarts.apache.org/handbook/en/basics/release-note/v6-feature/)).
2. **Data model.**
   - Per-series arrays, or one shared `dataset` as a 2D array, object rows
     or columns.
   - `encode` maps dimensions to x, y, tooltip and name
     ([dataset](https://echarts.apache.org/handbook/en/concepts/dataset/)).
3. **Declaration.** One option object of components (title, legend, grid,
   axes, dataZoom, visualMap, tooltip, toolbox, brush, aria) plus a series
   list ([option](https://echarts.apache.org/en/llms-documents/option.md)).
4. **Theming.** The v6 default theme is built on design tokens. Themes
   switch at runtime, and the docs show how to follow
   `prefers-color-scheme`. No CSS variables
   ([v6](https://echarts.apache.org/handbook/en/basics/release-note/v6-feature/)).
5. **Interaction.**
   - Tooltip with an axis pointer; `cross` mode is a crosshair, and axes
     can be linked across grids
     ([axisPointer](https://echarts.apache.org/en/llms-documents/option-parts/option.axisPointer.md)).
   - The legend toggles series by default
     ([legend](https://echarts.apache.org/en/llms-documents/option-parts/option.legend.md)).
   - dataZoom, brush and toolbox zoom
     ([toolbox](https://echarts.apache.org/en/llms-documents/option-parts/option.toolbox.md)).
   - Drill-down through group ids and a universal transition
     ([5.2](https://echarts.apache.org/handbook/en/basics/release-note/5-2-0/)).
6. **Accessibility.**
   - `aria` (off by default) generates a label from templates.
   - `aria.decal` adds pattern fills besides colour
     ([aria](https://echarts.apache.org/handbook/en/best-practices/aria/)).
   - Keyboard: not found.
7. **Responsiveness.** Manual: the page calls `resize()`
   ([chart size](https://echarts.apache.org/handbook/en/concepts/chart-size/)).
8. **Large data.**
   - Canvas by default, with an SVG renderer. The docs advise Canvas above
     about 1,000 points and SVG for low memory and mobile
     ([canvas vs svg](https://echarts.apache.org/handbook/en/best-practices/canvas-vs-svg/)).
   - Line sampling: LTTB, average, min, max, minmax, sum
     ([line](https://raw.githubusercontent.com/apache/echarts-doc/master/en/option/series/line.md)).
   - `large` mode past 2,000 points
     ([scatter](https://echarts.apache.org/en/llms-documents/option-parts/option.series-scatter.md)).
9. **Animation.** On by default, 1,000 ms. Switched off above 2,000
   elements ([option](https://echarts.apache.org/en/llms-documents/option.md)).
   Reduced motion: not found.
10. **Export.** PNG or SVG (following the renderer), a data view, and SVG
    rendered on a server
    ([toolbox](https://echarts.apache.org/en/llms-documents/option-parts/option.toolbox.md)).
    CSV: not found.
11. **Localisation.** Its own language files and `registerLocale`, not
    Intl ([init](https://echarts.apache.org/en/llms-documents/api-parts/api.echarts.md)).
12. **RTL.** Not found.
13. **Licence.** Apache-2.0
    ([LICENSE](https://github.com/apache/echarts/blob/master/LICENSE)).

**Best at:**
- Breadth together with large data: sampling, `large` mode, Canvas
  ([line](https://raw.githubusercontent.com/apache/echarts-doc/master/en/option/series/line.md)).
- A full dashboard interaction set, including drill-down
  ([axisPointer](https://echarts.apache.org/en/llms-documents/option-parts/option.axisPointer.md)).
- Pattern fills besides colour
  ([aria](https://echarts.apache.org/handbook/en/best-practices/aria/)).

**Avoid:**
- No keyboard and no reduced motion
  ([aria](https://echarts.apache.org/handbook/en/best-practices/aria/)).
- Manual resize
  ([chart size](https://echarts.apache.org/handbook/en/concepts/chart-size/)).
- Locale files of its own instead of Intl
  ([init](https://echarts.apache.org/en/llms-documents/api-parts/api.echarts.md)).

### Highcharts

Core 13.1.1, 2026-09-20 ([changelog](https://changelog.highcharts.com/)).

1. **Chart types.** Line, area, column, pie, scatter, gauges, heat and tree
   maps, networks and more. Stock, Maps, Gantt and Dashboards are separate
   products ([demo](https://www.highcharts.com/demo/highcharts)).
2. **Data model.**
   - Arrays of numbers, `[x, y]` pairs or point objects.
   - Since v13 a shared `dataTable` with column mapping
     ([series](https://www.highcharts.com/docs/chart-concepts/series)).
3. **Declaration.** One JS option object.
4. **Theming.**
   - Styled mode is pure CSS with `--highcharts-color-N` variables.
   - It follows `prefers-color-scheme`, and a class forces the mode
     ([style by CSS](https://www.highcharts.com/docs/chart-design-and-style/style-by-css)).
5. **Interaction.**
   - Crosshair ([xAxis.crosshair](https://api.highcharts.com/highcharts/xAxis.crosshair)).
   - Zoom by x/y/xy, wheel and pinch
     ([zooming](https://api.highcharts.com/highcharts/chart.zooming)).
   - A drill-down module with async loading
     ([drilldown](https://www.highcharts.com/docs/chart-concepts/drilldown)).
6. **Accessibility.** The strongest of the libraries.
   - Keyboard navigation with a set order and wrap-around, and point
     navigation switched off past a point-count threshold
     ([seriesNavigation](https://api.highcharts.com/highcharts/accessibility.keyboardNavigation.seriesNavigation)).
   - A screen-reader information region (title, type, axes, description),
     series as landmarks, and announcements when data changes
     ([features](https://www.highcharts.com/docs/accessibility/accessibility-module-feature-overview)).
   - A visible caption is preferred over a hidden description, and a
     description element next to the chart is linked automatically
     ([module](https://www.highcharts.com/docs/accessibility/accessibility-module)).
   - A data table under the chart
     ([showTable](https://api.highcharts.com/highcharts/exporting.showTable)).
   - Pattern fills, dash styles and marker shapes, plus Windows High
     Contrast ([patterns](https://www.highcharts.com/docs/accessibility/patterns-and-contrast)).
   - Sonification: pitch tracks, speech tracks, earcons, scrubbing
     ([sonification](https://www.highcharts.com/docs/sonification/getting-started)).
7. **Responsiveness.** `responsive.rules`: a width condition plus option
   overrides ([responsive](https://www.highcharts.com/docs/chart-concepts/responsive)).
8. **Large data.**
   - SVG. The Boost module draws with WebGL past 5,000 points per series or
     50 series.
   - Boost drops dashes, stacking and markers other than circles
     ([boost](https://www.highcharts.com/docs/advanced-chart-features/boost-module)).
9. **Animation.** 500 ms by default
   ([animation](https://api.highcharts.com/highcharts/chart.animation)).
   Reduced motion: not found.
10. **Export.** PNG, JPG, PDF, SVG and print in the browser. Data as CSV,
    XLS or an HTML table
    ([export](https://www.highcharts.com/docs/export-module/export-module-overview)).
11. **Localisation.** `lang.locale` formats dates and numbers through Intl
    and falls back to `html[lang]`
    ([i18n](https://www.highcharts.com/docs/advanced-chart-features/internationalization)).
12. **RTL.** Manual: HTML labels plus reversed and opposite axes. No global
    switch ([i18n](https://www.highcharts.com/docs/advanced-chart-features/internationalization)).
13. **Licence.** Proprietary. Free only for personal use or accredited
    education; any organisation needs a paid licence
    ([EULA](https://shop.highcharts.com/license-eula)).

**Best at:**
- Accessibility as a whole system: keyboard, information region, linked
  description, table, patterns, sound
  ([features](https://www.highcharts.com/docs/accessibility/accessibility-module-feature-overview)).
- CSS-variable styled mode with automatic dark mode
  ([style by CSS](https://www.highcharts.com/docs/chart-design-and-style/style-by-css)).
- Declarative responsive rules
  ([responsive](https://www.highcharts.com/docs/chart-concepts/responsive)).

**Avoid:**
- The licence ([EULA](https://shop.highcharts.com/license-eula)).
- A fast mode that drops features silently
  ([boost](https://www.highcharts.com/docs/advanced-chart-features/boost-module)).

### amCharts 5

Version 5.21.5, 2026-10-26
([releases](https://github.com/amcharts/amcharts5/releases)).

1. **Chart types.** 303 demos: column, line, pie, XY, maps, candlestick,
   stock, Gantt, gauges, radar, hierarchy, flow, funnel
   ([demos](https://www.amcharts.com/demos/)).
2. **Data model.** Records in a list object, with series mapping fields by
   name. A data processor converts dates and numbers
   ([data](https://docs.amcharts.com/v5/concepts/data/)).
3. **Declaration.** An imperative object tree: root, chart, axes and series
   ([root](https://docs.amcharts.com/v5/getting-started/root-element/)).
4. **Theming.** Animated, Responsive, Dark and about 24 palette themes, plus
   rule-based custom themes. No CSS variables
   ([themes](https://docs.amcharts.com/v5/concepts/themes/)).
5. **Interaction.** An XY cursor gives the crosshair, zoom and select, snap
   to series, and sync across charts
   ([cursor](https://docs.amcharts.com/v5/charts/xy-chart/cursor/)).
6. **Accessibility.**
   - Focus order and focus groups moved with the arrow keys, Enter, Space
     and Escape.
   - ARIA roles and labels with data placeholders, and announcements for
     tooltips.
   - Forced colours followed by default
     ([accessibility](https://docs.amcharts.com/v5/concepts/accessibility/)).
   - Eight pattern kinds
     ([patterns](https://docs.amcharts.com/v5/concepts/colors-gradients-and-patterns/patterns/)).
7. **Responsiveness.** Auto-resize to the parent, and named breakpoints
   with rules ([responsive](https://docs.amcharts.com/v5/concepts/responsive/)).
8. **Large data.**
   - Canvas by default, with an SVG option
     ([root](https://docs.amcharts.com/v5/getting-started/root-element/)).
   - The date axis groups data past 500 intervals (open, close, average,
     sum, extreme)
     ([date axis](https://docs.amcharts.com/v5/charts/xy-chart/axes/date-axis/)).
9. **Animation.** Opt-in through a theme. Reduced motion: not found
   ([animations](https://docs.amcharts.com/v5/concepts/animations/)).
10. **Export.** PNG, JPG, PDF and print; data as XLSX, CSV, JSON or HTML
    ([exporting](https://docs.amcharts.com/v5/concepts/exporting/)).
11. **Localisation.** Locale objects and Intl formatting
    ([numbers](https://docs.amcharts.com/v5/concepts/formatters/formatting-numbers/)).
12. **RTL.** A root-level RTL switch, label direction and reversed legends
    ([rtl](https://docs.amcharts.com/v5/concepts/locales/right-to-left-support/)).
13. **Licence.** Free with a visible branding link; paid licences remove it
    ([LICENSE](https://github.com/amcharts/amcharts5/blob/master/LICENSE)).

**Best at:**
- Fine keyboard and ARIA control of any element
  ([accessibility](https://docs.amcharts.com/v5/concepts/accessibility/)).
- Real RTL
  ([rtl](https://docs.amcharts.com/v5/concepts/locales/right-to-left-support/)).
- Patterns besides colour
  ([patterns](https://docs.amcharts.com/v5/concepts/colors-gradients-and-patterns/patterns/)).

**Avoid:**
- A verbose imperative API
  ([data](https://docs.amcharts.com/v5/concepts/data/)).
- No table fallback and no reduced motion
  ([animations](https://docs.amcharts.com/v5/concepts/animations/)).

### Chart.js

Version 4.6.1 ([releases](https://github.com/chartjs/Chart.js/releases)).

1. **Chart types.** 9: area, bar, bubble, doughnut/pie, line, mixed, polar
   area, radar, scatter
   ([docs](https://www.chartjs.org/docs/latest/charts/area.html)).
2. **Data model.** Labels plus datasets. Points are numbers, tuples or
   objects, with configurable keys
   ([data structures](https://www.chartjs.org/docs/latest/general/data-structures.html)).
3. **Declaration.** A config object (type, data, options, plugins) drawn
   on a canvas.
4. **Theming.** Global defaults and a 7-colour plugin. No dark mode
   ([colors](https://www.chartjs.org/docs/latest/general/colors.html)).
5. **Interaction.**
   - Tooltip, with an HTML option
     ([tooltip](https://www.chartjs.org/docs/latest/configuration/tooltip.html)).
   - The legend toggles series
     ([legend](https://www.chartjs.org/docs/latest/configuration/legend.html)).
   - Zoom is a separate plugin
     ([zoom](https://www.chartjs.org/chartjs-plugin-zoom/latest/)).
6. **Accessibility.** Left to the developer: the canvas needs its own role
   and label ([a11y](https://www.chartjs.org/docs/latest/general/accessibility.html)).
7. **Responsiveness.** Responsive with aspect ratio. It needs a dedicated
   relatively positioned container
   ([responsive](https://www.chartjs.org/docs/latest/configuration/responsive.html)).
8. **Large data.**
   - Canvas. A decimation plugin with LTTB or min-max, with a threshold
     tied to the canvas width (line charts only)
     ([decimation](https://www.chartjs.org/docs/latest/configuration/decimation.html)).
   - OffscreenCanvas in a worker
     ([performance](https://www.chartjs.org/docs/latest/general/performance.html)).
9. **Animation.** Per property. Reduced motion: not found
   ([animations](https://www.chartjs.org/docs/latest/configuration/animations.html)).
10. **Export.** A PNG data URL only
    ([API](https://www.chartjs.org/docs/latest/developers/api.html)).
11. **Localisation.** `locale` uses Intl for numbers. Time needs a date
    adapter ([locale](https://www.chartjs.org/docs/latest/configuration/locale.html)).
12. **RTL.** On the legend and the tooltip
    ([legend](https://www.chartjs.org/docs/latest/configuration/legend.html)).
13. **Licence.** MIT.

**Best at:**
- Small and simple ([docs](https://www.chartjs.org/docs/latest/)).
- Clear decimation rules for long lines
  ([decimation](https://www.chartjs.org/docs/latest/configuration/decimation.html)).

**Avoid:**
- Canvas-only accessibility
  ([a11y](https://www.chartjs.org/docs/latest/general/accessibility.html)).
- Few types, PNG-only export
  ([API](https://www.chartjs.org/docs/latest/developers/api.html)).

### AntV G2 (v5) and G2Plot

G2 docs 5.4.8
([what is G2](https://g2.antv.antgroup.com/en/manual/introduction/what-is-g2)).

1. **Chart types.** Composed from marks. About 420 examples in 21
   categories ([examples](https://g2.antv.antgroup.com/en/examples)).
2. **Data model.** Records, inline or fetched, with transforms (fold,
   filter, join, kde). `encode` maps fields to channels
   ([data](https://g2.antv.antgroup.com/en/manual/core/data/overview)).
3. **Declaration.** A grammar (mark, encode, scale, transform, coordinate,
   composition), written as a spec or a chained API
   ([chart](https://g2.antv.antgroup.com/en/manual/core/chart/chart-component)).
4. **Theming.** Light, dark, classic and academy themes, registered by name
   ([theme](https://g2.antv.antgroup.com/en/manual/core/theme/overview)).
5. **Interaction.** The richest vocabulary studied: brush highlight and
   filter, element highlight and select, legend filter, slider and
   scrollbar filters, fisheye, chart index
   ([interaction](https://g2.antv.antgroup.com/en/manual/core/interaction/overview)).
   A tooltip with crosshairs and a shared mode
   ([tooltip](https://g2.antv.antgroup.com/en/manual/component/tooltip)).
6. **Accessibility.** Nearly absent. One plugin makes canvas text
   searchable ([a11y](https://g2.antv.antgroup.com/en/manual/extra-topics/plugin/a11y)).
7. **Responsiveness.** `autoFit` to the container, off by default
   ([chart](https://g2.antv.antgroup.com/en/manual/core/chart/chart-component)).
8. **Large data.**
   - Swappable renderers: Canvas, SVG, WebGL
     ([renderer](https://g2.antv.antgroup.com/en/manual/extra-topics/plugin/renderer)).
   - A sample transform with a 2,000 threshold and LTTB, median, min, max,
     first or last ([sample](https://g2.antv.antgroup.com/en/manual/core/transform/sample)).
9. **Animation.** Enter, update and exit stages, 300 ms. Reduced motion:
   not found ([animate](https://g2.antv.antgroup.com/en/manual/core/animate/overview)).
10. **Export.** None built in; you take the canvas yourself
    ([#6531](https://github.com/antvis/G2/issues/6531)).
11. **Localisation.** Not found.
12. **RTL.** Not found.
13. **Licence.** MIT. G2Plot stays on G2 4 and gets no G2 5 version
    ([G2Plot](https://github.com/antvis/G2Plot)).

**Best at:**
- Composition: the most expressive grammar
  ([what is G2](https://g2.antv.antgroup.com/en/manual/introduction/what-is-g2)).
- Interactions as named, reusable behaviours
  ([interaction](https://g2.antv.antgroup.com/en/manual/core/interaction/overview)).
- One renderer interface with three back ends
  ([renderer](https://g2.antv.antgroup.com/en/manual/extra-topics/plugin/renderer)).

**Avoid:**
- Accessibility, localisation, RTL, export
  ([a11y](https://g2.antv.antgroup.com/en/manual/extra-topics/plugin/a11y)).
- G2Plot as a base ([G2Plot](https://github.com/antvis/G2Plot)).

### ApexCharts

Version 8.7.0
([releases](https://github.com/apexcharts/apexcharts.js/releases)).

1. **Chart types.** About 32: line, area, bar, range, waterfall,
   candlestick, boxplot, violin, heatmap, treemap, sunburst, radar, gauge,
   waffle and others
   ([demos](https://apexcharts.com/javascript-chart-demos/)).
2. **Data model.** Series arrays of numbers with categories, `{x, y}`
   objects, pairs or timestamped pairs
   ([series](https://apexcharts.com/docs/series/)).
3. **Declaration.** A JS option object, with optional feature imports for
   slim builds ([chart](https://apexcharts.com/docs/options/chart/)).
4. **Theming.** Light and dark modes and palettes. Tokens read `--apx-*`
   CSS variables, a mode follows the OS dark and contrast settings, and
   there are colour-blind modes
   ([theme](https://apexcharts.com/docs/options/theme/)).
5. **Interaction.**
   - Zoom, and a brush that drives another chart
     ([chart](https://apexcharts.com/docs/options/chart/)).
   - The legend toggles series
     ([legend](https://apexcharts.com/docs/options/legend/)).
   - Crosshairs ([xaxis](https://apexcharts.com/docs/options/xaxis/)).
   - Drill-down with breadcrumbs
     ([drilldown](https://apexcharts.com/docs/drilldown/)).
6. **Accessibility.** On by default: Tab into the SVG; arrows, Home/End,
   Enter/Space; `+`, `-`, `0` to zoom. A description, live-region
   announcements and a high-contrast mode
   ([a11y](https://apexcharts.com/docs/accessibility/)). Table: not found.
7. **Responsiveness.** A breakpoint list of option overrides
   ([responsive](https://apexcharts.com/docs/options/responsive/)).
8. **Large data.** SVG, with only the series layer moved to Canvas past
   8,000 points ("auto" mode). No decimation
   ([renderer](https://apexcharts.com/docs/options/chart/renderer/)).
9. **Animation.** Reduced motion is respected by default
   ([animations](https://apexcharts.com/docs/options/chart/animations/)).
10. **Export.** SVG, PNG and CSV from the toolbar
    ([chart](https://apexcharts.com/docs/options/chart/)).
11. **Localisation.** Its own locale objects. Intl numbers: not found
    ([localization](https://apexcharts.com/docs/localization/)).
12. **RTL.** Not found for the core library.
13. **Licence.** Since 2025, free only under $2M revenue; paid per
    developer above that
    ([licensing](https://apexcharts.com/blog/new-licencing-model/)).

**Best at:**
- Keyboard and reduced motion on by default
  ([a11y](https://apexcharts.com/docs/accessibility/)).
- CSS-variable tokens that follow the OS
  ([theme](https://apexcharts.com/docs/options/theme/)).
- SVG by default with an automatic switch to Canvas for the data layer only
  ([renderer](https://apexcharts.com/docs/options/chart/renderer/)).

**Avoid:**
- The licence change
  ([licensing](https://apexcharts.com/blog/new-licencing-model/)).
- No table, no RTL, no decimation.

## 4. Design-system charts

### IBM Carbon Charts and Carbon data-visualisation guidance

1. **Chart types.**
   - 26 in the library
     ([repo](https://github.com/carbon-design-system/carbon-charts)).
   - The guidance groups charts as simple, flow and spatial. Some are
     design-only, with no code
     ([getting started](https://carbondesignsystem.com/data-visualization/getting-started/)).
2. **Data model.** Flat records grouped by a key. Options name the group
   field, the selected groups and a loading state
   ([options](https://charts.carbondesignsystem.com/api/interfaces/barchartoptions)).
3. **Declaration.** One chart per type for vanilla JS, React, Angular, Vue
   and Svelte, each taking `data` and `options`.
4. **Theming.** Palette logic
   ([palettes](https://carbondesignsystem.com/data-visualization/color-palettes/)):
   - Categorical: 14 colours in a fixed order, so neighbours contrast.
     Smaller preset sets for a known count.
   - Sequential: one hue, about 10 steps. The darkest step means the
     largest value in light themes; dark themes reverse this.
   - Diverging: one palette for hot/cold data and one for neutral data.
   - Status: danger, serious warning, warning, success.
   - Gradients discouraged.
5. **Interaction.**
   - The tooltip repeats both axis values
     ([anatomy](https://carbondesignsystem.com/data-visualization/chart-anatomy/)).
   - Clicking a legend item isolates that series
     ([legends](https://carbondesignsystem.com/data-visualization/legends/)).
   - Zoom bar and toolbar
     ([toolbar](https://charts.carbondesignsystem.com/api/enums/toolbarcontroltypes)).
6. **Accessibility.**
   - A "Show as table" toolbar control
     ([toolbar](https://charts.carbondesignsystem.com/api/enums/toolbarcontroltypes)).
   - Textures instead of or with colour
     ([legends](https://carbondesignsystem.com/data-visualization/legends/)).
   - Pie slices under 1° are not drawn and are reachable only in the table
     ([anatomy](https://carbondesignsystem.com/data-visualization/chart-anatomy/)).
7. **Responsiveness.** Resizable by default. On mobile, a "View legends"
   button may replace the legend
   ([legends](https://carbondesignsystem.com/data-visualization/legends/)).
8. **Large data.** SVG through D3. Canvas: not found.
9. **Animation.** On, with an off switch. Reduced motion: not found.
10. **Export.** CSV, PNG, JPG
    ([toolbar](https://charts.carbondesignsystem.com/api/enums/toolbarcontroltypes)).
11. **Localisation.** A `locale` option. Dates in local formats, with a
    bold label where a new day, month or year starts
    ([axes](https://carbondesignsystem.com/data-visualization/axes-and-labels/)).
12. **RTL.** Not found.
13. **Licence.** Apache-2.0
    ([repo](https://github.com/carbon-design-system/carbon-charts)).

**Rules a design-system chart should follow** (Carbon):
- Bars and areas start at zero; lines and scatter may crop the axis.
- Never interpolate missing data. Never bend tick steps to fit the data
  ([axes](https://carbondesignsystem.com/data-visualization/axes-and-labels/)).
- The title states the insight
  ([anatomy](https://carbondesignsystem.com/data-visualization/chart-anatomy/)).
- Prefer direct labels. No legend for one series. The legend sits at the
  bottom, wraps at 2 lines and takes at most 30 % of the height
  ([legends](https://carbondesignsystem.com/data-visualization/legends/)).

**Best at:**
- The most complete written guidance, plus a shipped library
  ([getting started](https://carbondesignsystem.com/data-visualization/getting-started/)).
- Palette roles that react to the theme
  ([palettes](https://carbondesignsystem.com/data-visualization/color-palettes/)).
- Table view and export as standard controls
  ([toolbar](https://charts.carbondesignsystem.com/api/enums/toolbarcontroltypes)).

**Avoid:**
- Design-only chart types that have no code.
- No RTL and no large-data mode.

### Material Design 3

- **No M3 data-visualisation guidance or chart component was found.** The
  legacy M2 page exists but would not render for reading
  ([M2 data visualization](https://m2.material.io/design/communication/data-visualization.html)).
- All 13 points: not confirmed.
- **Verdict:** not a reference source for SIMAI Chart.

### Atlassian Design System and Forge UI Kit charts

1. **Chart types.** 7: bar, horizontal bar, stacked bar, horizontal
   stacked bar, line, pie, donut
   ([bar chart](https://developer.atlassian.com/platform/forge/ui-kit/components/bar-chart/)).
2. **Data model.** Arrays or objects read through x, y and colour
   accessors.
3. **Declaration.** React props: title, subtitle, height (400 px default),
   palette.
4. **Theming.** From
   [data visualization color](https://atlassian.design/foundations/color/data-visualization-color):
   - `color.chart.*` tokens, each with light and dark values.
   - 8 categorical tokens in a fixed order, and about 5–6 colours at most.
     Group the rest.
   - Chart colours reach 3:1 against the surface but not against each
     other, so adjacent marks get a gap or a border.
   - Labels need 4.5:1, so they sit next to marks, not on them.
   - A neutral token for de-emphasised data.
   - Status roles (success, warning, danger, information, discovery), each
     with a bold variant.
   - Hover uses hovered tokens, or fades the rest with the disabled
     opacity.
   - No sequential or diverging palettes.
5. **Interaction.** Hover values were planned
   ([RFC-49](https://community.developer.atlassian.com/t/rfc-49-chart-components-for-ui-kit/79552.md)).
   Other interactions: not found.
6. **Accessibility.** Add cues besides colour, above all where colour
   order cannot be controlled
   ([data visualization color](https://atlassian.design/foundations/color/data-visualization-color)).
7. **Responsiveness.** Width is fluid unless set.
8. **Large data:** not found.
9. **Animation:** not found.
10. **Export:** not found.
11. **Localisation:** not found.
12. **RTL:** not found.
13. **Licence:** not found.

A known issue: pie slice order and colour are assigned inside the
component, not from the data order
([forum](https://community.developer.atlassian.com/t/forge-pie-donut-charts-don-t-guarantee-slice-order-or-color-consistency/99685)).

**Best at:**
- Colour roles as theme tokens, with stated contrast reasoning.
- A default of one accent colour plus neutral for a single series.

**Avoid:**
- Colour not tied to the data order: the same category changes colour
  between charts.

### Salesforce Lightning Design System

The current site would not render. The archived Spring '20 guidance
was read instead
([charts](https://spring-20.lightningdesignsystem.com/guidelines/data-visualization/charts/)).

1. **Chart types, by purpose.**

   | Purpose | Charts |
   |---|---|
   | Comparison | bar or column, stacked, dot plot |
   | Trend | line |
   | Relationship | scatter |
   | Composition | pie, treemap |
   | Distribution | heatmap, matrix |
   | Metric | flat gauge, polar gauge, ratings |
   | Location | maps |
   | Pipeline | funnel, waterfall, sankey |

2. **Data model:** none; SLDS ships no chart component. Salesforce points
   to a third-party library loaded as a static resource
   ([third-party libraries](https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/js_libs_platform.htm)).
3. **Declaration:** none, for the same reason.
4. **Theming.** From
   [palettes](https://spring-20.lightningdesignsystem.com/guidelines/color/color-palettes/):
   - Six mid-tone hues, plus a colour-safe theme.
   - Categories get different hues; continuous data gets one hue.
   - About 5 colours. One colour per value across all charts.
   - Red and green carry meanings that depend on culture.
   - Functional elements need 3:1.
5. **Interaction:** not covered.
6. **Accessibility.** Add symbols or text where colour distinguishes
   elements, and use the colour-safe theme.
7. **Responsiveness.** Use a flat gauge where space is short.
8–13. **Large data, animation, export, localisation, RTL, licence:** do
   not apply.

**Rules:**
- Bars and both scatter axes start at zero.
- Lines: 4 series at most, all in the same unit, and no dual axes.
- Pie: 2–5 slices, in descending order, starting at 12 o'clock and going
  clockwise.
- A gauge always shows a reference value (target or average).
- The caption reads "Chart type: measure by dimension".

**Best at:**
- A purpose-to-chart map with hard series limits.

**Avoid:**
- No component, and the current guidance is not public.

### Microsoft Fluent UI charts (v9)

1. **Chart types.** About 16: area, donut, funnel, Gantt, gauge, grouped
   bar, heatmap, horizontal bar, line, polar, sankey, scatter, sparkline,
   vertical bar, stacked bar, plus a declarative chart and a chart table
   ([components](https://github.com/microsoft/fluentui/tree/master/packages/charts/react-charts/library/src/components)).
   There is no pie: the README says to use the donut
   ([README](https://cdn.jsdelivr.net/npm/@fluentui/react-charts@9.3.13/README.md)).
2. **Data model.** Typed props per chart. The declarative chart takes a
   Plotly figure JSON
   ([DeclarativeChart](https://github.com/microsoft/fluentui/blob/master/packages/charts/react-charts/library/src/components/DeclarativeChart/DeclarativeChart.tsx)).
3. **Declaration.** React components, or a JSON spec.
4. **Theming.**
   - 40 qualitative colours in a fixed order, and 7 semantic roles (high
     error, error, warning, success, high success, disabled, info)
     ([colors](https://microsoft.github.io/fluentui-charting-contrib/docs/colors)).
   - Palette colours reach 4.5:1 against the background and 3:1 against
     each other
     ([accessibility](https://microsoft.github.io/fluentui-charting-contrib/docs/Accessibility)).
5. **Interaction.**
   - Tooltip ("callout"), with per-point overrides
     ([cartesian types](https://github.com/microsoft/fluentui/blob/master/packages/charts/react-charts/library/src/components/CommonComponents/CartesianChart.types.ts)).
   - Single or multiple legend selection
     ([legends](https://github.com/microsoft/fluentui/blob/master/packages/charts/react-charts/library/src/components/Legends/Legends.types.ts)).
6. **Accessibility.** Claimed compliant with Microsoft's WCAG 2.1 bar:
   keyboard, screen readers, high contrast, 400 % zoom, voice access
   ([accessibility](https://microsoft.github.io/fluentui-charting-contrib/docs/Accessibility)).
   Legend markers can use shapes.
7. **Responsiveness.**
   - A responsive container.
   - A reflow mode that scrolls instead of shrinking under a minimum width.
   - Overlapping ticks are hidden
     ([cartesian types](https://github.com/microsoft/fluentui/blob/master/packages/charts/react-charts/library/src/components/CommonComponents/CartesianChart.types.ts)).
8. **Large data:** not found.
9. **Animation:** not found.
10. **Export.** Image export, including the legend
    ([DeclarativeChart](https://github.com/microsoft/fluentui/blob/master/packages/charts/react-charts/library/src/components/DeclarativeChart/DeclarativeChart.tsx)).
11. **Localisation.** Culture, Intl date options, UTC by default.
12. **RTL.** An RTL flag reaches the styles and the export
    ([cartesian types](https://github.com/microsoft/fluentui/blob/master/packages/charts/react-charts/library/src/components/CommonComponents/CartesianChart.types.ts)).
13. **Licence.** Not confirmed (the repository is generally MIT).

**Best at:**
- Contrast commitments stated as numbers
  ([accessibility](https://microsoft.github.io/fluentui-charting-contrib/docs/Accessibility)).
- Reflow by scrolling below a minimum width.
- Intl and RTL as chart props.

**Avoid:**
- Uneven maturity: many types are late or in preview
  ([README](https://cdn.jsdelivr.net/npm/@fluentui/react-charts@9.3.13/README.md)).

### Apple Swift Charts and the HIG on charts

1. **Chart types.** Marks for bar, line, point, area, rule, rectangle and
   sector; vectorised plots; function plots; 3D
   ([Charts](https://developer.apple.com/tutorials/data/documentation/charts.json)).
2. **Data model.** Collections of identifiable values
   ([creating a chart](https://developer.apple.com/tutorials/data/documentation/charts/creating-a-chart-using-swift-charts.json)).
3. **Declaration.** Marks inside a chart view. Styling by series builds the
   legend on its own.
4. **Theming.** No chart palette. Colour is never the only cue; add shapes,
   patterns and separators
   ([HIG charts](https://developer.apple.com/tutorials/data/design/human-interface-guidelines/charts.json)).
5. **Interaction.** Scrubbing over the whole plot when marks are too small
   to hit. A logical keyboard and Switch Control path, for example along
   the x-axis
   ([HIG charts](https://developer.apple.com/tutorials/data/design/human-interface-guidelines/charts.json)).
6. **Accessibility.**
   - Audio graphs and an accessibility element per mark by default.
   - Labels with concrete values in unambiguous formats ("June 6", not
     "6/6").
   - Visible axis text hidden from assistive technology.
   - Changes shown in more ways than animation
     ([HIG charts](https://developer.apple.com/tutorials/data/design/human-interface-guidelines/charts.json)).
   - Use a list or table when the data needs no visual message
     ([charting data](https://developer.apple.com/tutorials/data/design/human-interface-guidelines/charting-data.json)).
7. **Responsiveness.** In compact layouts: widest plot, short y labels,
   units in the title, labels on the trailing side
   ([HIG charts](https://developer.apple.com/tutorials/data/design/human-interface-guidelines/charts.json)).
8. **Large data.** Vectorised plots for large sets; per-mark styling for
   small ones ([WWDC24](https://developer.apple.com/videos/play/wwdc2024/10155/)).
9. **Animation.** Do not rely on it alone.
10. **Export:** not found.
11. **Localisation.** Supported; no API detail found.
12. **RTL.** Through SwiftUI mirroring
    ([mirrors](https://developer.apple.com/documentation/swiftui/layoutdirectionbehavior/mirrors.md)).
13. **Licence:** does not apply; part of the platform SDK.

**Rules** (HIG):
- Prefer common chart types.
- Use a fixed range when the bounds always matter (0–100 %), a dynamic
  range otherwise.
- Bars start at zero.
- Use familiar tick steps (0, 5, 10).
- Use fewer, lighter gridlines on interactive charts.
- Never hide critical information behind interaction.

**Best at:**
- Accessibility by default.
- Concrete axis and compact-size rules
  ([HIG charts](https://developer.apple.com/tutorials/data/design/human-interface-guidelines/charts.json)).

**Avoid:**
- Using it as a source for anything outside Apple platforms (export,
  web).

## 5. Component libraries

### Recharts

1. **Chart types.** 12: area, bar, line, composed, pie, radar, radial bar,
   scatter, funnel, treemap, sankey, sunburst
   ([API](https://recharts.github.io/en-US/api)).
2. **Data model.** Records; a series picks a field by `dataKey`
   ([performance](https://recharts.github.io/en-US/guide/performance/)).
3. **Declaration.** Composable React parts (container, axis, grid, line,
   tooltip), drawn in SVG
   ([repo](https://github.com/recharts/recharts)).
4. **Theming.** An optional provider whose values may be CSS variables. An
   auto mode uses `light-dark()` and follows `color-scheme`
   ([theming](https://recharts.github.io/en-US/guide/theming/)).
5. **Interaction.**
   - Tooltip, brush, reference lines
     ([API](https://recharts.github.io/en-US/api)).
   - The legend toggle is the developer's job
     ([Legend](https://recharts.github.io/en-US/api/Legend)).
6. **Accessibility.**
   - An accessibility layer on by default in v3
     ([3.0 migration](https://github.com/recharts/recharts/wiki/3.0-migration-guide)).
   - A VoiceOver focus issue is reported
     ([#4662](https://github.com/recharts/recharts/discussions/4662)).
7. **Responsiveness.** A responsive container, or plain CSS sizing.
8. **Large data.** SVG only. The docs advise binning, sampling and
   throttled handlers
   ([performance](https://recharts.github.io/en-US/guide/performance/)).
9. **Animation.** "auto" by default, which respects reduced motion
   ([animations](https://recharts.github.io/en-US/guide/animations/)).
10. **Export:** not found.
11. **Localisation.** Through tick formatters only.
12. **RTL.** Manual, by reversing the axis
    ([XAxis](https://recharts.github.io/en-US/api/XAxis)).
13. **Licence.** MIT.

**Best at:**
- Simple composition of chart parts.
- Reduced motion handled by default
  ([animations](https://recharts.github.io/en-US/guide/animations/)).
- Theming through CSS variables and `light-dark()`
  ([theming](https://recharts.github.io/en-US/guide/theming/)).

**Avoid:**
- SVG-only large data.
- No export and no i18n
  ([performance](https://recharts.github.io/en-US/guide/performance/)).

### Nivo

1. **Chart types.** About 25: bar, line, pie, bump, stream, radar, calendar,
   chord, circle packing, treemap, sunburst, sankey, swarm, marimekko,
   choropleth and others ([nivo.rocks](https://nivo.rocks/)).
2. **Data model.** Shaped per chart. Lines are series of `{x, y}` points,
   and a null leaves a gap ([line](https://nivo.rocks/line/)).
3. **Declaration.** A React component per chart, in SVG, Canvas and
   server-image variants.
4. **Theming.** One theme object that works in SVG, HTML and Canvas
   ([theming](https://nivo.rocks/guides/theming/)). Categorical, sequential
   and diverging schemes ([colors](https://nivo.rocks/guides/colors/)).
5. **Interaction.** Series can start hidden from the legend
   ([bar types](https://raw.githubusercontent.com/plouc/nivo/master/packages/bar/src/types.ts)).
6. **Accessibility.** A role, labels and focusable bars, opt-in per chart;
   patterns besides colour ([repo](https://github.com/plouc/nivo)).
7. **Responsiveness.** Responsive wrappers.
8. **Large data.** Canvas variants with a pixel ratio.
9. **Animation.** Spring motion. Reduced motion: not found.
10. **Export.** Images rendered on a server.
11. **Localisation.** A value format only.
12. **RTL:** not found.
13. **Licence.** MIT.

**Best at:**
- SVG and Canvas from one theme
  ([theming](https://nivo.rocks/guides/theming/)).
- Breadth of chart types.

**Avoid:**
- Accessibility left as opt-in per chart.

### visx (v4)

1. **Chart types.** Low-level parts in 44 packages, including shape, axis,
   grid, brush, zoom, legend, pattern, hierarchy, geo, sankey and xychart
   ([packages](https://github.com/airbnb/visx/tree/master/packages)).
2. **Data model.** Any array read through accessors, with a key per series
   ([xychart](https://raw.githubusercontent.com/airbnb/visx/master/packages/visx-xychart/README.md)).
3. **Declaration.** A kit for building your own charts
   ([repo](https://github.com/airbnb/visx)).
4. **Theming.** Token config that generates `--color-*` CSS variables
   ([visx-chart](https://github.com/airbnb/visx/tree/master/packages/visx-chart)).
5. **Interaction.** A tooltip with a crosshair and snapping; brush and zoom
   packages.
6. **Accessibility.** The best reusable layer studied:
   - generated descriptions;
   - a data-table fallback;
   - a live-region announcer;
   - roving-focus keyboard navigation (arrows, Home/End, Escape, "?" for
     help);
   - a summary instead of point-by-point text when a chart is dense.

   Source: [visx-a11y](https://github.com/airbnb/visx/tree/master/packages/visx-a11y).
7. **Responsiveness.** ResizeObserver.
8. **Large data.** SVG.
9. **Animation.** Spring-animated series. Reduced motion: not found.
10. **Export.** The data table can also be rendered on a server.
11. **Localisation:** not found.
12. **RTL:** not found.
13. **Licence.** MIT.

**Best at:**
- An accessibility core shared by every chart
  ([visx-a11y](https://github.com/airbnb/visx/tree/master/packages/visx-a11y)).
- A shared chart core (scales, dimensions, ticks) under every chart
  ([visx-chart](https://github.com/airbnb/visx/tree/master/packages/visx-chart)).

**Avoid:**
- Using it as a product catalogue: every chart has to be built.

### Tremor

1. **Chart types.** Area, bar, combo, line, donut, spark chart, bar list,
   category bar, progress bar, progress circle, tracker
   ([installation](https://tremor.so/docs/getting-started/installation)).
2. **Data model.** Records, with `index` (the x field) and `categories`
   (the series fields)
   ([area chart](https://tremor.so/docs/visualizations/area-chart)).
3. **Declaration.** High-level props: colours, a value formatter, legend
   and tooltip switches, and `type` (default, stacked or percent), set as
   one value rather than as separate tags.
4. **Theming.** Tailwind classes with dark variants.
5. **Interaction.** Tooltip, click and a legend slider.
6. **Accessibility.** A focusable legend.
7. **Responsiveness.** Inherited from Recharts.
8. **Large data.** Inherited from Recharts (SVG).
9. **Animation.** Inherited from Recharts.
10. **Export:** not found.
11. **Localisation.** A value formatter.
12. **RTL:** not found.
13. **Licence.** Apache-2.0
    ([repo](https://github.com/tremorlabs/tremor)). Vercel acquired it in
    2025 ([Vercel](https://vercel.com/blog/vercel-acquires-tremor)).

**Best at:**
- A dashboard set that includes KPI and progress widgets.
- Stacking as one setting
  ([area chart](https://tremor.so/docs/visualizations/area-chart)).

**Avoid:**
- A thin wrapper, so it inherits Recharts' limits.

## 6. Editorial

### Datawrapper

1. **Chart types.** 23 chart types; maps and tables are separate products
   ([charts](https://www.datawrapper.de/charts)).
2. **Data model.** One flat table. Display caps: 300 rows for time series,
   100 for categories
   ([max size](https://www.datawrapper.de/academy/max-size-for-data-upload)).
3. **Declaration.** An editor. Through the API, a chart type plus a
   metadata object
   ([chart properties](https://developer.datawrapper.de/docs/chart-properties)).
4. **Theming.** Themes are a paid add-on
   ([pricing](https://www.datawrapper.de/pricing)). Relative units let
   chart text follow the reader's font size
   ([keyboard and font scaling](https://www.datawrapper.de/blog/keyboard-navigation-dynamic-font-scaling)).
5. **Interaction.** Tooltips. From the keyboard: legend highlight, zoom,
   search.
6. **Accessibility.**
   - Author alt text hides the chart body from screen readers. Without it,
     a generated summary gives the type, series count and axes
     ([accessible charts](https://www.datawrapper.de/academy/how-we-make-sure-our-charts-maps-and-tables-are-accessible)).
   - A keyboard explorer that moves by chart type: any direction in
     scatter, along a series in lines, across in columns
     ([keyboard and font scaling](https://www.datawrapper.de/blog/keyboard-navigation-dynamic-font-scaling)).
   - Labels darkened or whitened automatically for contrast.
   - A colour-blind checker.
7. **Responsiveness.** On small screens, labels turn into a legend and
   annotations move below the chart
   ([charts](https://www.datawrapper.de/charts)).
8. **Large data.** SVG, with the row caps above.
9. **Animation:** not found.
10. **Export.** PNG, SVG, PDF. CSV through "Get the data"
    ([accessibility](https://www.datawrapper.de/accessibility)).
11. **Localisation.** Output locales and number-format tokens
    ([number formats](https://www.datawrapper.de/academy/custom-number-formats-that-you-can-display-in-datawrapper)).
12. **RTL.** Arabic, Persian and Hebrew locales flip the whole chart: bars
    grow left, the x-axis runs right to left, tables flip
    ([RTL](https://www.datawrapper.de/blog/right-to-left-visualizations)).
13. **Licence.** SaaS.

**Best at:**
- RTL taken from the locale for every chart type
  ([RTL](https://www.datawrapper.de/blog/right-to-left-visualizations)).
- A keyboard explorer that moves differently per chart type.
- Mobile rules that change the layout, not only the scale.

**Avoid:**
- Hard row caps
  ([max size](https://www.datawrapper.de/academy/max-size-for-data-upload)).

### Flourish

1. **Chart types.** 50+ templates, including bar chart race and
   scrollytelling ([gallery](https://flourish.studio/visualisations/index.html)).
2. **Data model.** CSV columns mapped to the template through data bindings
   ([working with data](https://developers.flourish.studio/sdk/getting-started/working-with-data)).
3. **Declaration.** Templates declare their settings and bindings in a
   manifest file
   ([template.yml](https://developers.flourish.studio/sdk/api-reference/template-yml)).
4. **Theming.** Paid themes ([pricing](https://flourish.studio/pricing/)).
5. **Interaction.** Filters, popups, chart switching.
6. **Accessibility.** Keyboard navigation of points, a screen-reader
   description, CSV download, automatic label contrast
   ([accessibility](https://flourish.studio/accessibility)).
7. **Responsiveness:** not found.
8. **Large data:** not found.
9. **Animation.** Central to the product, and reduced for people who ask
   for less motion ([accessibility](https://flourish.studio/accessibility)).
10. **Export.** By plan: image, SVG, HTML.
11. **Localisation.** Number and date localisation modules
    ([number localization](https://npmjs.com/package/@flourish/number-localization)).
12. **RTL:** not found.
13. **Licence.** SaaS.

**Best at:**
- Settings kept apart from data bindings in a manifest, a model close to a
  component's settings and data ports
  ([settings](https://developers.flourish.studio/sdk/getting-started/working-with-settings)).
- Animation that respects reduced motion.

**Avoid:**
- Accessibility that varies per template.

### FT Visual Vocabulary

A chart-selection guide, not software
([chart-doctor](https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary)).
It groups charts by the relationship they show:

| Relationship | Charts under it |
|---|---|
| Deviation | diverging bar, diverging stacked bar, surplus/deficit line |
| Correlation | scatter, line + column, connected scatter, bubble, XY heatmap |
| Ranking | ordered bar or column, dot strip, slope, lollipop |
| Distribution | histogram, box plot, violin, population pyramid, dot plot, cumulative curve |
| Change over time | line, column, line + column, stock price, slope, area, fan chart, calendar heatmap |
| Magnitude | column, bar, paired bars, proportional symbol, isotype, lollipop, radar |
| Part-to-whole | stacked column, proportional bar, pie, donut, treemap, waterfall |
| Spatial | choropleth, proportional symbol map, flow map, dot density |
| Flow | sankey, waterfall, chord, network |

- **Licence.** All rights reserved by the Financial Times. The categories
  are used as an idea; `catalogue.md` writes its own list.
- **Best at:** choosing a chart by the question it answers, and showing
  that one chart can serve several relationships.
- **Weak at:** no guidance on interaction or accessibility.

### The Economist

The primary style guide could not be reached. Both points below are
third-party and are not used as evidence until re-checked:
- No pies, no 3D, no vertical gridlines on line charts, value axis on the
  right, direct labels instead of legend boxes
  ([summary](https://slidespeak.co/slide-design-prompts/prompts/economist-style),
  *(3rd-party)*).
- Their own review of chart mistakes groups them into misleading, unclear
  and missing the point
  ([FlowingData](https://flowingdata.com/2019/03/29/remaking-charts-from-the-economist-by-a-journalist-at-the-economist),
  *(3rd-party)*).

### The New York Times

- ai2html converts an Illustrator file to HTML and CSS
  ([ai2html](https://github.com/newsdev/ai2html)).
- A graphic has one artboard per viewport width, so small screens get their
  own layout, not a scaled-down one
  ([gist](https://gist.github.com/DanielJWood/da486ff4b9eddc48e45e6b61021544aa),
  *(3rd-party)*).
- **Best at:** designing per breakpoint.
- **Weak at:** the output is static art, with no data model.

## 7. BI and monitoring

### Tableau

1. **Chart types.** Show Me suggests about 24 types from the chosen fields
   ([Show Me](https://help.tableau.com/current/pro/desktop/en-us/buildauto_showme.htm)).
2. **Data model.** A logical layer of related tables over a physical layer
   of joins
   ([data model](https://help.tableau.com/current/pro/desktop/en-us/datasource_datamodel.htm)).
3. **Declaration.** Fields dragged onto shelves.
4. **Theming:** not covered.
5. **Interaction.** Tooltips, which are also read to screen readers
   ([accessible views](https://help.tableau.com/current/pro/desktop/en-us/accessibility_create_view.htm)).
6. **Accessibility.**
   - Tab into the view, then Enter opens View Data, a table
     ([keyboard](https://help.tableau.com/current/pro/desktop/en-us/access_keyboard_navigation.htm)).
   - Authoring rules:
     - under 1,000 marks, so the view renders in the browser;
     - at most 10 colours or shapes;
     - colour paired with another cue;
     - text at 4.5:1;
     - tested at 200 % zoom.

     Source: [accessible views](https://help.tableau.com/current/pro/desktop/en-us/accessibility_create_view.htm).
7. **Responsiveness.** Desktop, tablet and phone layouts behind one URL
   ([device layouts](https://help.tableau.com/current/pro/desktop/en-us/dashboards_dsd_create.htm)).
8. **Large data.** Past 1,000 marks the view may render on the server,
   which is less accessible.
9. **Animation.** Up to 10 s, and it can be turned off. The OS
   reduced-motion setting: not found
   ([animations](https://help.tableau.com/current/pro/desktop/en-gb/formatting_animations.htm)).
10. **Export.** PNG, SVG, PDF, PowerPoint
    ([export](https://help.tableau.com/current/pro/desktop/en-us/save_export_image.htm)).
11. **Localisation.** A workbook locale, automatic or fixed. Currency
    symbols are never swapped
    ([language](https://help.tableau.com/current/pro/desktop/en-us/workbook_language.htm)).
12. **RTL:** not found.
13. **Licence.** Per seat.

**Best at:**
- Hard, testable authoring rules for accessible views.

**Avoid:**
- No keyboard path to single marks; the table is the only route.

### Power BI

1. **Chart types.** Broad: bar, line, area, combo, ribbon, waterfall, pie,
   donut, treemap, funnel, scatter, gauge, card, KPI, small multiples
   ([overview](https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualizations-overview)).
2. **Data model.** A semantic model with measures.
3. **Declaration.** Fields placed in wells.
4. **Theming.** A theme file with data colours and named roles (good, bad,
   neutral), plus a colour-blind theme. Series colours follow order, so
   one category can change colour between visuals
   ([themes](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-report-themes)).
5. **Interaction.** Cross-filtering, cross-highlighting, drill-through.
6. **Accessibility.** The most complete keyboard model studied
   ([accessibility tools](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-accessibility-consuming-tools)):
   - enter a visual, then Tab between plot area, axis and legend;
   - Enter goes into an area, Tab moves between points, Up/Down switches
     series, Esc leaves;
   - a shortcut shows the visual as an HTML table;
   - high contrast is detected.
7. **Responsiveness.** Separate mobile layouts, shown in the apps only
   ([mobile](https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-create-mobile-optimized-report-about)).
8. **Large data.** Per-visual reduction rules: windowing, TopN, sampling,
   high-density line sampling. Many visuals cap at 3,500 points, scatter at
   10,000 ([data points](https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-data-points)).
9. **Animation:** not found.
10. **Export.** PDF, PPTX and PNG; visual data as CSV
    ([export API](https://powerbi.microsoft.com/blog/export-report-to-pdf-pptx-and-png-files-using-power-bi-rest-api)).
11. **Localisation:** not read.
12. **RTL.** None in visuals
    ([community](https://community.fabric.microsoft.com/t5/Desktop/Format-Slicer-to-display-Hebrew-Right-To-Left/td-p/3688590),
    *(3rd-party)*).
13. **Licence.** Per seat.

**Best at:**
- A keyboard model in three levels, with a table on demand.
- Data-reduction rules written down per chart type.
- Colours named by role in the theme.

**Avoid:**
- Colour assigned by order instead of by category
  ([themes](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-report-themes)).
- No RTL.

### Looker and Google Charts

1. **Chart types.**
   - Google Charts: geo, scatter, column, histogram, bar, combo, area, line,
     pie, bubble, org, treemap, table, timeline, gauge, candlestick
     ([gallery](https://developers.google.com/chart/interactive/docs/gallery)).
   - Looker: cartesian, pie, progression, tables, maps
     ([types](https://docs.cloud.google.com/looker/docs/visualization-types)).
2. **Data model.** Looker has a semantic layer. The Google Charts DataTable
   was not read.
3. **Declaration.** Looker's chart editor exposes the options of the
   library underneath as an escape hatch
   ([chart config editor](https://docs.cloud.google.com/looker/docs/chart-config-editor)).
4–12. **Theming, interaction, accessibility, responsiveness, motion,
   export, localisation, RTL:** not found.
8. **Large data.** Google Charts renders in SVG.
13. **Licence.** Google Charts falls under Google API terms, whose
    deprecation guarantee expired in 2015
    ([terms](https://developers.google.com/chart/terms)).

**Avoid:**
- Google Charts as a base: no stability guarantee.

### Grafana

1. **Chart types.** Time series, state timeline, status history, bar,
   histogram, heatmap, pie, candlestick, gauge, stat, bar gauge, table,
   geomap and others
   ([visualizations](https://grafana.com/docs/grafana/latest/panels-visualizations/visualizations/)).
2. **Data model.** Data frames: columns of equal length, one type each,
   with Apache Arrow underneath
   ([data frames](https://grafana.com/developers/plugin-tools/key-concepts/data-frames)).
3. **Declaration.** Panel JSON with options and overrides.
4. **Theming.** Light and dark, chosen per user.
5. **Interaction.** From
   [time series](https://grafana.com/docs/grafana/latest/panels-visualizations/visualizations/time-series/):
   - tooltip mode single, all or hidden;
   - drag to zoom the time range, double-click to zoom out;
   - series visibility;
   - thresholds and annotations.

   A crosshair shared across the dashboard
   ([community](https://community.grafana.com/t/will-the-timeseries-panel-support-shared-crosshairs-tooltips-in-the-future/44153),
   *(3rd-party)*).
6. **Accessibility.**
   - Partly WCAG 2.1 AA
     ([accessibility](https://grafana.com/developers/saga/foundations/accessibility/accessibility-overview/)).
   - A keyboard cursor for time series: the arrows move it, Shift speeds it
     up, Space selects a range
     ([v8.4](https://grafana.com/docs/grafana/next/whatsnew/whats-new-in-v8-4.md)).
7. **Responsiveness:** not found.
8. **Large data.** Canvas.
9. **Animation:** not found.
10. **Export.** CSV and JSON from panel inspect; PNG and PDF through a
    render service
    ([image rendering](https://grafana.com/docs/grafana/latest/setup-grafana/image-rendering.md)).
11. **Localisation.** The UI language only.
12. **RTL:** not found.
13. **Licence.** AGPL-3.0 ([licensing](https://grafana.com/licensing/)).
    Ideas only.

**Best at:**
- Monitoring time series: shared crosshair, zoom to range, thresholds.
- A keyboard cursor for continuous series.

**Avoid:**
- The AGPL licence: no code.

### Apache Superset

1. **Chart types.** Mostly ECharts plugins: bar, big number, funnel, gauge,
   graph, pie, pivot table, treemap, time series
   ([new charts](https://preset.io/blog/2021-6-14-superset-nine-new-charts/)).
2. **Data model.** SQL datasets.
3. **Declaration.** A plugin per chart type
   ([discussion](https://github.com/apache/superset/discussions/41663)).
4. **Theming.** Version 6 uses Ant Design tokens: system and dark themes,
   per-dashboard themes, and option overrides per chart type
   ([theming](https://preset.io/blog/superset-6-theming/)).
5. **Interaction:** not read.
6. **Accessibility:** no documentation found.
7. **Responsiveness:** not found.
8. **Large data.** ECharts underneath.
9. **Animation:** not found.
10. **Export.** Image, CSV, JSON, Excel
    ([export](https://superset.apache.org/user-docs/using-superset/exporting-dashboard-data)).
11. **Localisation.** d3-format number presets
    ([number formatting](https://superset.apache.org/user-docs/using-superset/number-formatting)).
12. **RTL:** not found.
13. **Licence.** Apache-2.0.

**Best at:**
- A registry of chart plugins.
- Theme tokens shared with the app around the charts.

**Avoid:**
- No accessibility.

## 8. Accessibility sources

The requirements below come from WAI, WCAG 2.2, Chartability and the tools
above. They feed the keyboard, table and colour rules in `parameters.md`
and `rendering.md`.

1. **Short alternative.** Chart type, data, period and entities, plus a
   pointer to the long description
   ([WAI complex images](https://www.w3.org/WAI/tutorials/images/complex/)).
   When the author writes a description, hide the decorative body.
   Otherwise generate one from type, series count and axes
   ([Datawrapper](https://www.datawrapper.de/academy/how-we-make-sure-our-charts-maps-and-tables-are-accessible)).
2. **Long description.**
   - Scales, units, values, trends; visible to everyone.
   - Placed in `figure` / `figcaption`.
   - `aria-describedby` only for plain text, since it drops headings and
     tables ([WAI complex images](https://www.w3.org/WAI/tutorials/images/complex/)).
3. **Title, summary or caption: required.** Explain how to read the chart
   ([Chartability](https://chartability.github.io/POUR-CAF/)).
4. **Data table: required**
   ([Chartability](https://chartability.github.io/POUR-CAF/)). A table also
   exempts the graphic from the 3:1 non-text contrast rule
   ([WCAG 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)).
   Offer CSV as well.
5. **Keyboard.**
   - One Tab stop into the chart. Inside: regions, then points; Up/Down
     between series; Esc to leave
     ([Power BI](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-accessibility-consuming-tools)).
   - Movement fitted to the chart type
     ([Datawrapper](https://www.datawrapper.de/blog/keyboard-navigation-dynamic-font-scaling)).
   - A cursor for continuous series
     ([Grafana](https://grafana.com/docs/grafana/next/whatsnew/whats-new-in-v8-4.md)).
   - Not too many tab stops, and no overridden assistive-technology keys
     ([Chartability](https://chartability.github.io/POUR-CAF/)).
6. **Structure.**
   - An information region (title, type, axes, description), series as
     regions, and changes announced
     ([Highcharts](https://www.highcharts.com/docs/accessibility/accessibility-module-feature-overview)).
   - Graphics ARIA roles exist
     ([Graphics ARIA](https://www.w3.org/TR/graphics-aria-1.0/)), but screen
     readers support them weakly
     ([Datawrapper](https://www.datawrapper.de/blog/better-accessibility-for-datawrapper-visualizations)).
7. **Not colour alone (WCAG 1.4.1, level A).**
   - A lightness difference of 3:1 counts as a second cue. A meaningful hue
     always gets a non-colour cue
     ([WCAG 1.4.1](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)).
   - Patterns, marker shapes, dash styles.
8. **Contrast (WCAG 1.4.11).**
   - Marks needed to read the chart reach 3:1 against their neighbours.
   - Pie slices need 3:1 edges or a border.
   - Avoid very thin lines; text follows 4.5:1
     ([WCAG 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)).
   - No text under 12 px, and at least 1 px between adjacent marks
     ([Chartability](https://chartability.github.io/POUR-CAF/)).
9. **Focus.**
   - Visible, with 3:1 contrast
     ([WCAG 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)).
   - Not covered by tooltips
     ([WCAG 2.4.11](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)).
10. **Tooltips.** Shown on focus as well as hover. Escape dismisses them.
    The pointer can move onto them, and they stay until dismissed
    ([WCAG 1.4.13](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html)).
11. **Targets.** At least 24×24 px
    ([WCAG 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)).
12. **Motion.**
    - Honour `prefers-reduced-motion`.
    - Transitions of 250 ms–2 s; anything longer or looping can be paused
      ([Chartability](https://chartability.github.io/POUR-CAF/),
      [WCAG 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)).
13. **Zoom and reflow.** Works at 320 CSS px and 400 % zoom
    ([WCAG 1.4.10](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)).
    Text in relative units.
14. **Forced colours.** Support Windows High Contrast
    ([Highcharts](https://www.highcharts.com/docs/accessibility/accessibility-module-feature-overview)).
15. **Sound (optional).** Values played as pitch, with play, stop and
    scrubbing ([Highcharts](https://www.highcharts.com/docs/sonification/getting-started)).
    Apple's audio graphs carry a descriptor of title, axes and series
    ([Apple](https://developer.apple.com/documentation/accessibility/representing-chart-data-as-an-audio-graph.md)).
16. **Translatable announcements.** Every announcement comes from the
    dictionary
    ([Highcharts](https://www.highcharts.com/docs/accessibility/accessibility-module-feature-overview)).

## 9. Across the study

### Where the field is weak, and where SIMAI Chart can be better

| Gap | Who does it at all | Evidence |
|---|---|---|
| Keyboard navigation of data | Highcharts, amCharts, ApexCharts, Fluent, visx, Power BI, Datawrapper; not ECharts, Vega-Lite, Plot, Chart.js, G2 | sections 2–7 |
| A data table as a built-in fallback | Highcharts, Carbon, Fluent, visx, Tableau, Power BI | sections 3–7 |
| `prefers-reduced-motion` | ApexCharts, Recharts, Flourish only | sections 3, 5, 6 |
| Real RTL | amCharts, Datawrapper, Fluent; partial in Chart.js and Highcharts | sections 3, 4, 6 |
| Intl for numbers and dates | Highcharts, amCharts, Chart.js, Plot, Fluent; not ECharts, ApexCharts, Vega-Lite | sections 2–4 |
| Theming by CSS variables | Highcharts, ApexCharts, Recharts, visx | sections 3, 5 |
| A permissive licence | only open-source systems (MIT, BSD, ISC, Apache) | sections 2–7 |

None of the studied systems has all seven. That is the main reason to build
an own implementation on the Framework rather than wrap a library: the
Framework already gives tokens, themes, `lang` dictionaries, logical sides
and the interaction rules, and these cover most of the gaps.

### Take (ideas, each to be re-described in our own words)

1. **One tabular data contract with a field mapping.** Records plus a mapping
   from fields to `x`, `y`, `series` and `value`: ECharts `dataset` +
   `encode`, Vega-Lite `encoding`, Tremor `index` + `categories`. Columnar
   input as a fast path, as in Plot's Arrow input and Grafana's data frames.
2. **Variants as settings, not new tags.** Stacking, normalising and
   orientation are values of one setting (Tremor `type`; Carbon's groups).
   This matches the Smart rule that a change of look is a setting, not a
   new name.
3. **Colour as roles on theme tokens.** An ordered categorical set, a
   neutral role for de-emphasised data, status roles, and sequential and
   diverging scales that reverse in dark themes. The models are Carbon,
   Atlassian, Fluent and Power BI, and ggplot2's ink and paper. Colour is
   bound to the category, not to the series order (the Power BI and
   Atlassian failure).
4. **Contrast stated as numbers.** Marks 3:1 against the surface; labels
   4.5:1 and placed beside marks; a gap or border between adjacent marks
   (Atlassian, Fluent, WCAG 1.4.11).
5. **Accessibility as one shared core, not per chart.** visx-a11y and
   Highcharts: generated summary, linked visible description, an
   information region, a data table, live announcements, translatable
   strings.
6. **A keyboard model in three levels.** Enter the chart, move between
   regions, move between points, switch series, Esc out (Power BI). Movement
   fitted to the chart type (Datawrapper). A cursor for long series
   (Grafana). Point navigation switched off past a threshold, with the table
   taking over (Highcharts).
7. **SVG by default, Canvas for the data layer past a measured threshold.**
   ApexCharts moves only the series layer (past 8,000 points), and ECharts
   advises Canvas above about 1,000. LTTB and min-max decimation (Chart.js,
   ECharts, G2). Per-chart reduction rules written down (Power BI).
8. **Responsiveness by rules, not only scaling.** Labels become a legend,
   annotations move below, the legend collapses behind a button, and the
   chart scrolls below a minimum width. Sources: Datawrapper, Carbon,
   Fluent, Highcharts rules, NYT per-breakpoint layouts. On the Framework
   this means container queries and the size ladder.
9. **Reduced motion on by default.** Transitions short and optional
   (ApexCharts, Recharts, Chartability).
10. **Intl for every number and date, and the locale from `lang`.** As in
    Highcharts, which falls back to `html[lang]`. This maps onto the
    Framework's language order.
11. **RTL from the page direction.** Mirror the axes and legends, and let
    bars grow toward the start side (Datawrapper, amCharts), using the
    Framework's logical sides.
12. **Export as standard actions.** PNG, SVG and CSV (Carbon, ApexCharts,
    Highcharts).
13. **Axis rules written down.** Zero baseline for bars and areas, nice tick
    steps, no interpolation of missing data, light gridlines (Carbon, Apple,
    SLDS).
14. **Series limits as guidance.** About 5–8 categorical colours before
    grouping into "other" (Atlassian, SLDS, Tableau). Pie with 2–5 slices
    (SLDS).

### Avoid

1. **Wrapping a third-party engine.** The strong ones are proprietary or
   revenue-tiered (Highcharts, amCharts, ApexCharts). The open ones lack
   keyboard support, tables and reduced motion (ECharts, Chart.js, G2,
   Vega-Lite). Either way the gaps above would be ours to patch from
   outside.
2. **Canvas-only output.** It loses the accessibility tree (Chart.js, G2).
3. **A fast mode that silently drops features**, as Highcharts boost drops
   stacking and dashes. If a chart degrades past a threshold, it says so
   and the table stays complete.
4. **Hard caps that hide data**, as Datawrapper does at 300 and 100 rows.
   Reduce for drawing, never for the table or export.
5. **Colour by order.** The same category must keep its colour across
   charts (Power BI, Atlassian).
6. **A locale system of our own beside Intl** (ECharts, ApexCharts).
7. **Manual resize** (ECharts). Charts follow their container.
8. **An imperative object tree as the public API** (amCharts). The Smart
   surface is settings, values, events and actions.
9. **Copying from all-rights-reserved or copyleft sources.** FT Visual
   Vocabulary is all rights reserved and Grafana is AGPL: ideas only, never
   code. The same holds for every system here, by the repository rule.
