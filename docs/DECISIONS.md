# Decisions for the owner

Stage D. Each section below:

- opens with two lines in Russian for the owner;
- gives the options;
- gives the recommendation and the reason.

The evidence is in `docs/research/`: [systems](research/systems.md),
[catalogue](research/catalogue.md), [parameters](research/parameters.md) and
[rendering](research/rendering.md).

**How the decisions are asked.**

- **Names (D2), the data contract (D3) and the renderer (D5)** are names,
  public API and architecture, so they go to the owner as critical
  questions (`simai ask-owner`).
- **The Tier 1 list (D1) and the colour order (D4)** go through the
  dispatcher (`task-fcda784dfeba45c1bf64`). D4 is an order for Framework
  tokens, not something made here.

| # | Decision | Recommendation | Asked through |
|---|---|---|---|
| D1 | Tier 1 list and the first chart | 5 components; `line` first | dispatcher |
| D2 | Tag names | one tag per chart, head noun last: `sf-line-chart` … | owner, critical |
| D3 | Data contract | rows + a field mapping, `items` | owner, critical |
| D4 | Colour schemes | order 8 categorical roles from the Framework | dispatcher (token order) |
| D5 | Renderer | own; SVG, Canvas for the marks layer past 2,000 marks | owner, critical |

## D1. Tier 1 list and the first chart

> **Кратко.** Первый уровень — пять компонентов: линия (с площадью), столбцы
> (со стопкой), круговая, мини-график и плитка показателя. Первым делаем линию.

**Options:**

- **A. Five components.** `line` (with `area` and `stack` as settings),
  `bar` (with `stack`, `orientation`), `pie` (with `hole`), `sparkline`,
  `metric` (a KPI with a delta and a sparkline).
- **B. A plus scatter.** Scatter is in 13 of 18 systems, but dashboards
  ship without it ([catalogue](research/catalogue.md#summary)).
- **C. Line, bar and pie only.** Sparkline and the metric are left for
  later.

**Recommendation: A, with `line` as the M0 chart.**

Why five:

- These are the five the handoff names as "a dashboard cannot ship without
  it".
- Area and stacking are settings, not tags, so A covers the seven forms in
  the handoff with five components.
- Sparkline and metric are what most dashboard rows are made of (Power BI
  card and KPI, Grafana stat, Superset big number).

Why `line` first:

- It is in 18 of 18 systems.
- It needs the most of the core (time scale, decimation, crosshair, the
  keyboard cursor), so M0 proves the core, not only one chart.
- `sparkline` and `metric` then reuse it.

**Not in Tier 1:**

- **Progress.** The Framework already has `sf-progress-bar`,
  `sf-progress-ring` and `sf-progress-scale`.
- **The map.** Map borders and map-data licences need a separate owner
  decision before any work. (Decided on 2026-11-05: the page gives the
  boundaries, D16.)

## D2. Tag names

> **Superseded on 2026-11-02.** The owner settled one naming rule for every
> Smart tag, `sf-[set]-<block>[-<variant>]`, from the general to the specific
> (ui-control `control/decisions/2026-11-02-smart-component-naming.md`). The
> charts are block `chart`: `sf-chart-line`, `sf-chart-bar`, `sf-chart-pie`,
> `sf-chart-sparkline`, `sf-chart-parts`, `sf-chart-metric`. Nothing of the
> package was released, so they were renamed outright, with no aliases. The
> reasoning below is kept as it was decided then; one tag per chart and
> variants as settings still hold.

> **Кратко.** Отдельный тег на каждый вид графика, главное слово в конце:
> `sf-line-chart`, `sf-bar-chart`, `sf-pie-chart`, `sf-sparkline`, `sf-metric`.
> Вариант из задания `sf-chart-line` нарушает правило имён Framework (§21.1),
> а один тег `sf-chart type="…"` смешал бы разные интерфейсы в одном.

**Options:**

- **A. One tag per chart, head noun last** (recommended):

  | Chart | Tag | Family |
  |---|---|---|
  | line | `sf-line-chart` | `chart` |
  | bar | `sf-bar-chart` | `chart` |
  | pie | `sf-pie-chart` | `chart` |
  | sparkline | `sf-sparkline` | `chart` |
  | metric | `sf-metric` | `chart` |
  | parts of a whole in one bar | `sf-parts-bar` | `chart` |

  `sf-parts-bar` was added on 2026-11-02 by the owner's decision in chat:
  one thin bar split into the parts of a whole, with a remainder when a
  capacity is set (disk, quota, a model's context). Its head noun is
  *bar*, as in `sf-progress-bar`.

  Bars with lines (a combination chart) are a setting of `sf-bar-chart`
  (`lines`), not a tag of their own: the owner's decision of 2026-11-02, as
  the standard keeps a new tag for a new interface.

  Later tiers follow the same pattern: `sf-scatter-chart`, `sf-heatmap`,
  `sf-box-plot`, `sf-funnel-chart`, `sf-gauge`, `sf-radar-chart`,
  `sf-treemap`, `sf-sankey-chart`, `sf-timeline-chart`,
  `sf-candlestick-chart`.
- **B. `sf-chart-line`, `sf-chart-bar`, …** This is the handoff's wording.
- **C. One tag:** `sf-chart type="line"`.

**Recommendation: A.**

1. **The Smart standard names by the head noun, last.** §21.1 of
   `simai.smart-component` 1.3.14 says a tag is `sf-<qualifier>-<head>`,
   "head noun last", for example `sf-context-menu`. A line chart is a
   *chart*, so `sf-line-chart`.
   - `sf-chart-line` makes "line" the head noun and reads as a kind of
     line.
   - Gate 30 lints names, and the family `chart` groups them in the
     catalogue and the Studio (§21.3), as `menu` groups every menu.
2. **Different charts have different interfaces.**
   - A pie has no axes, scales or crosshair. A metric has a delta and a
     status, and no plot.
   - The standard says a different interface is a new component, while a
     different look is a setting (§6, D7).
   - One `sf-chart type=…` (C) would carry the union of all interfaces in
     one manifest, and settings that mean nothing for half the types.
3. **Loading.** With A the Loader fetches only the charts on the page,
   over one shared core. C loads the dispatcher of all types.
4. **The studied systems split the same way.**
   - Component systems give one component per chart: Recharts, Nivo,
     Carbon, Fluent, Tremor
     ([systems.md §4–5](research/systems.md#4-design-system-charts)).
   - Variants inside a chart are settings: Tremor `type`, our `stack`.
   - The one-option-object systems (ECharts, Highcharts) are libraries,
     not tag sets.

**Two points for the dispatcher, whatever the owner chooses:**

- **The registry.** These are `sf-` names in the one registry (§21.4). The
  `chart` package is a SIMAI package beside ui-pro, so the dispatcher
  registers the names when the package is released.
- **Licence for free products.** §21.4 has an exception for a name a free
  SIMAI product consumes. If Docara (free) should show charts, the licence
  of the `chart` package (the same as SIMAI Pro) needs a look for that case.

## D3. Data contract

> **Кратко.** Все графики принимают одно и то же: список записей (`items`) и
> указание, какое поле — ось X, значение, серия. Принимаются и «длинная»
> таблица из базы, и «широкая» из Excel; пропуски остаются пропусками.

**Options:**

- **A. Rows + a field mapping** (recommended).
  - `items` is a list of records, or columns for large data.
  - The page names the fields: `x`, `y` (one field or a list), `series`,
    `value`, `category`, `size`, `id`, with an optional `fields`
    description (type, label, unit, format).
  - Other shapes are the same rows with other field names: hierarchy,
    flow, ranges, OHLC.
  - The details are in [parameters.md §2](research/parameters.md#2-data).
- **B. Series arrays.** `series: [{name, data: [...]}]`, as Chart.js,
  Highcharts and ApexCharts do.
- **C. A full grammar spec,** as Vega-Lite does: data, mark and encoding
  as one JSON.

**Recommendation: A.**

1. **One source feeds many charts.**
   - `items` is the vocabulary's own key (`simai.smart-vocabulary` §2.1). A
     chart binds to `sf-source` `values.items` in an assembly without a
     rename, and to the same rows a `sf-table` shows.
   - B would need a transform per chart.
2. **It is how product data arrives.**
   - SQL gives long rows, so `series` is a field.
   - Spreadsheets give wide rows, so `y` is a list of fields.
   - A accepts both. ECharts `dataset` + `encode`, Vega-Lite `encoding` and
     Tremor `index` + `categories` are the same idea.
3. **Grammar (C) is more than a product page needs.** It moves chart
   design into data. The Smart surface stays settings, values, events and
   actions.
4. **Rules that come with A:**
   - a missing value is never zero and never interpolated;
   - drawing may decimate, but the table and the CSV always hold every row.

## D4. Colour schemes

> **Кратко.** Цвета подписей, сетки, наведения и статусов берём из готовых
> ролей Framework. Для серий нужен набор из 8 цветов — его во Framework нет;
> заказываем у диспетчера, сами не придумываем.

**What already works with no new tokens**
([parameters.md §8](research/parameters.md#8-colour)):

| Part | Framework role |
|---|---|
| ink | `--sf-on-surface`, `--sf-on-surface-variant`, `--sf-on-disable` |
| lines | `--sf-outline-variant` for the grid, `--sf-outline` (3:1) for the zero line |
| states | the surface state layers 4, 8 and 12 |
| focus | the `--sf-focus` set |
| status | success, error, warning, info and neutral, on their graphic tones |
| sequential and diverging | the existing 16-tone families |

**What is missing.** The Framework has three brand families and four status
families. A chart needs about 8 categorical hues
([Carbon](https://carbondesignsystem.com/data-visualization/color-palettes/),
[Atlassian](https://atlassian.design/foundations/color/data-visualization-color)),
and status hues cannot serve as categories because they carry meaning.

**Options:**

- **A. Order categorical roles from the Framework** (recommended):
  - `--sf-chart-1` … `--sf-chart-8` as `light-dark()` pairs, with alpha
    steps 12–32;
  - each at least 3:1 against surfaces 0–2 in both themes;
  - roles 1–5 told apart under the three common colour-vision deficiencies;
  - role 1 = the brand's primary graphic tone.

  The same order asks for the diverging midpoint step.
- **B. Use the brand and status families for series.** There are only
  three neutral hues, and a green series would read as "good".
- **C. A local palette in `ui-chart`.** The handoff and the repository rule
  forbid it.

**Recommendation: A.**

- Until the tokens arrive, M0 draws at most 3 series on the primary,
  secondary and tertiary graphic tones, and refuses more with a console
  report.
- **Colour follows the category, not the order.** A category keeps its
  colour across charts that share a `palette-key`.
- **Colour is never the only cue.** Line series get marker shapes and
  optional dashes; bars and slices get a 1 px gap and optional patterns.

## D5. Renderer

> **Кратко.** Рисуем сами, без чужих библиотек: обычный SVG, а для точек и
> столбцов больше 2 000 штук — быстрый Canvas, только для самих отметок.
> Замер подтвердил: чужой движок не нужен ни по скорости, ни по лицензии.

**Options:**

- **A. An own renderer** (recommended), on browser APIs and Lit, as the
  Framework allows. Details:
  - one shared core: data, scales, Intl formats, layout, axes, marks,
    decimation, colour, pointer, keyboard, tooltip, description, table,
    export, motion;
  - SVG by default;
  - **Canvas for the marks layer only** past 2,000 per-point marks, while
    axes, text, legend and focus stay in the accessible tree;
  - lines always SVG, decimated (min-max by default, LTTB as an option).
- **B. Wrap Apache ECharts** (Apache-2.0).
- **C. Wrap Highcharts.**

**Recommendation: A.**

1. **Licence.**
   - Highcharts, amCharts and ApexCharts are proprietary or tiered by
     revenue ([systems.md §3](research/systems.md#3-full-libraries)), so C
     is out.
   - B is open, but it brings its own theme system and locale files, and it
     has no documented keyboard support, table or reduced motion. We would
     patch all of that from outside.
2. **Measured, not assumed**
   ([rendering.md §2](research/rendering.md#2-measurement-svg-against-canvas)).
   In headless Chrome at a 4× slowed CPU, as gate 17 measures:
   - one SVG element per mark passes a 16.7 ms frame between 2,000 marks
     (14.7 ms) and 5,000 marks (33 ms);
   - a line as one SVG path stays at 7.9 ms with 10,000 points;
   - Canvas marks stay at 5.2 ms with 10,000 marks.

   So performance gives no reason for an engine, and it sets the Canvas
   threshold at 2,000.
3. **Budgets.** The core is at most 25 KB gzip and Tier 1 at most 50 KB.
   First paint is the build snapshot (at most 8 KB) with zero layout shift,
   and the Framework gate 17 timings apply
   ([rendering.md §4–5](research/rendering.md#4-size-budget)).
4. **No new runtime dependency** is needed, so no separate owner decision
   on one.

## D6. A page's own series colours

> **Кратко.** Владелец разрешил задавать цвет ряда или части прямо в графике:
> настройка `colors` — «ключ → роль или CSS-цвет». Палитра `--sf-chart-1…8`
> (D4) по-прежнему заказана и придёт как цвета по умолчанию.

D4 keeps the palette a Framework matter. A page still needs to say "plan is
grey, errors are red" today, and a palette alone cannot say which series is
which. So every chart with more than one series takes a `colors` setting:

- **Shape.** An object of key → colour, keyed like `names`: a series' key for
  the line and bar charts, a category for the pie chart and the parts bar.
- **Values.** A Framework role (`primary`, `secondary`, `tertiary`,
  `neutral`, `success`, `warning`, `error`, `info`) takes its graphic tone, so
  it follows the theme. Any CSS colour or variable is the fallback. Anything
  else is dropped with a console report.
- **By key, not by place.** A category keeps its colour when the data is
  reordered, and across the charts of a page that give the same map.
- **Contrast.** A page's colour under 3:1 against the chart's background is
  reported in the console once; the chart still draws it.
- **Forced colours** are unchanged: there a series is told by its dash and
  shape, not by its colour.
- **Sparkline** has one series, so it takes one `color`. **Metric** has no
  series: its colours carry meaning (better, worse, status) and stay its
  CSS variables and `status`.
- **No palette is invented here.** A series without a colour keeps the
  palette by its place, which becomes `--sf-chart-1…8` when D4 arrives.

## D7. Palettes made in the package

> **Кратко.** Владелец решил: готовые наборы цветов делаем у себя, не дожидаясь
> Фреймворка. Наборы не придуманы на глаз и не взяты у других: их строит наш
> генератор на лестнице тонов Фреймворка, поэтому они сами переходят в тёмную
> тему.

This changes D4 option C ("no local palette") for named sets.

- **Generator.** `components/scripts/chart-palettes.mjs` builds every colour
  as a hue at a light tone (CIELAB L* 40–55) and a dark tone 10 above it,
  the step the Framework takes from tone 50 to 60 for its graphic colours.
  Every next colour is the candidate farthest from the chosen ones, in
  both themes. For the first five it is also farthest under protanopia,
  deuteranopia and tritanopia. Every colour holds 3:1 against surfaces 0–2
  in its theme. It writes `chart-core/palettes.js`, and a test fails when
  that file is stale.
- **Sets**, chosen by `palette` on the line, bar, pie and parts charts:
  - `vivid`: 8 colours, the first being the brand's graphic tone. Each
    colour is `var(--sf-chart-<n>, …)`, so the Framework's roles take its
    place when D4 delivers them.
  - `soft`: 8 muted colours.
  - `warm`: 6 colours.
  - `cool`: 6 colours.
  - `brand`: 4 steps of the theme's primary family, for ordered data.
  - `theme` is the default and draws as before.
- **`colors` still wins** for the series it names (D6).
- **Status hues are not categories.** The sets are hues for telling
  series apart, not meanings.

## D8. The heatmap's colour scale

> **Кратко.** Тепловая карта красит ячейки ступенчатой шкалой на тонах темы
> Фреймворка. Новых токенов нет; нейтральную середину расходящейся шкалы мы
> сначала выбрали сами, с версии 0.1.1 это роль Фреймворка `--sf-chart-midpoint`.

- **Stepped, not continuous.** There are 3 to 9 steps of equal width, 5 by
  default. A diverging scale is made even around its middle and has an odd
  number of steps.
- **The theme's tone ladders.** A sequential step is
  `light-dark(<family>-<light tone>, <family>-<dark tone>)`:
  - the light tones run 90 to 25, the dark tones 20 to 85;
  - the strongest value is the most contrasting tone in either theme
    (parameters.md §8.4).
- **Tone 50 is skipped.** No neutral text keeps 4.5:1 on it, and a cell
  carries its value as text. Every other step has an ink that does.
- **Diverging scale.**
  - `better` sets the meaning: error ↔ success for `up` and `down`,
    tertiary ↔ primary for `none`.
  - The middle step is `neutral-90` (light) and `neutral-25` (dark).
  - This settles the open midpoint question of §8.4 locally. If the
    dispatcher gives a midpoint role, it replaces these two tones.
  - The dispatcher has since released `--sf-chart-midpoint` in pair
    `ui-de2b4437234a`. Since heatmap 0.1.1 and that pin, the middle step is
    that role.
- **Colour is never the only cue.** The value is written in the cell, said
  in the tooltip and the live line, and kept in the table. A gap is an
  outlined empty cell.

## D9. The M2 plan and the funnel's form

> **Кратко.** M2 — шесть графиков второго уровня по одному: воронка, шкала с
> зонами, точечный, гистограмма, «ящик с усами», радар. Воронка — полосы от
> одного края с долей перехода рядом с каждым этапом.

- **The order** is by use on working dashboards first, then analytics:
  1. `sf-chart-funnel`;
  2. `sf-chart-gauge`;
  3. `sf-chart-scatter`, with bubbles through a `size` field;
  4. the histogram as a `bin` setting of `sf-chart-bar`;
  5. `sf-chart-box`;
  6. `sf-chart-radar`.

  Heatmap and combo, the rest of Tier 2, are already done.
- **The names** follow the owner's rule `sf-chart-<block>`. Each name is
  sent to the dispatcher as its work starts.
- **The funnel's form.**
  - Stepped bars on a common baseline (`align="start"`), centred on request.
    No trapezoid: its slanted sides carry no data (catalogue.md, Funnel).
  - The stages keep the data's order, since that order is the process.
  - One colour, since a funnel is one measure.
  - The conversion written beside a stage is of the previous stage by
    default (`conversion="previous"`), or of the first. The tooltip, the
    live line, the summary and the table say both.
  - A gap has no bar and no conversion across it. A stage wider than the
    one before is drawn as given, and the summary says the stages are not
    nested.

- **The gauge's form** (`sf-chart-gauge`, the second chart).
  - One value with `min` and `max` as numbers, like `sf-chart-metric`'s
    value, since a gauge has no rows.
  - `bands` and `target` are the annotations of parameters.md §6 under the
    gauge's own names.
  - A band's role is a Framework role. Its colour follows the theme, and
    its name comes from the role («Норма», «Внимание», «Критично») when the
    page gives none.
  - The shape is a half circle (`arc`) or a bar (`linear`). A half circle
    reads left to right and needs the least height.
  - The value fills the track in its band's colour, and the band's name is
    written under the value. A value past the scale is in the band at that
    end.
  - It is a `meter`, takes no focus and has no `select`.
  - Its table is hidden by default, since the value is written on the
    gauge.

- **The scatter's form** (`sf-chart-scatter`, the third chart).
  - One point per row, at the `x` and `y` fields; a row without both is
    left out and counted in the summary.
  - Bubbles through a field named `bubble`, not `size` as parameters.md
    first named it: `size` is the size rung on every chart of the package.
    A bubble's area, not its radius, follows its value.
  - `series` splits the points by a field, `point` names them. A series
    past the first has its own mark's shape, so colour is never the only
    cue; bubbles stay circles and differ by an outline's dash in forced
    colours.
  - `trend="linear"` draws each series' least-squares line. The summary
    always says each relation in words with Pearson's r.
  - The arrows: Left and Right walk the points by x, then y, so every point
    is reached; Up and Down go to the nearest point above or below.
  - Past 2,000 marks the marks are drawn on a canvas under the SVG (D5).
    The axes, the cursor and every text stay in the SVG.

- **The histogram's form** (`bin` on `sf-chart-bar`, the fourth chart).
  - A setting, not a tag: the axes, the cursor, the legend and the table
    are the bar chart's.
  - `bin="auto"` takes about Sturges' count of intervals on a round width
    (1, 2, 2.5 or 5 times a power of ten), so the edges read at a glance; a
    number is the width. The edges fall on multiples of the width.
  - An interval holds its start and not its end; the last holds both.
  - `y` is a weight summed per interval, or a count when unset; `series`
    splits the rows and `stack` stacks them.
  - The bars touch and the axis is marked at the edges, since x is a
    measure. The summary says the median of each series and its fullest
    interval.

- **The box plot's form** (`sf-chart-box`, the fifth chart).
  - `x` names the groups and `y` the measure. `stats="raw"` (the default)
    works the statistics out of the rows; `stats="given"` takes `min`,
    `q1`, `median`, `q3`, `max` and `mean` from one row per group, for data
    worked out on a server.
  - The quartiles are linear between the two nearest values, as R's type
    7, NumPy's and a spreadsheet's, so a page's people can check them.
  - The whiskers are Tukey's 1.5 interquartile ranges by default, with the
    values past them drawn as outliers; `whiskers="range"` takes them to
    the extremes.
  - `series` puts a box per series side by side in a group, in the
    legend's order; in forced colours a series past the first has its own
    outline's dash.
  - `mean` adds a diamond at the mean. The keyboard is the bar chart's:
    Left and Right over the groups, Up and Down across the series.
  - SVG only: a box plot draws a few marks per group. A violin is a later
    variant of the same data.

- **The radar's form** (`sf-chart-radar`, the sixth chart).
  - The data mapping of the line and bar charts: `x` names the spokes, `y`
    the series' fields or `series` the long form.
  - One scale for every spoke, from `min` (zero by default) to `max` (the
    data's, rounded up, or given). Measures on different scales are the
    misuse the catalogue names; the docs send them to a grouped bar.
  - The first spoke points straight up and the rest go clockwise.
  - A gap breaks the ring and its fill, so it never reads as zero.
  - A series past the first has its own values' mark shape and, in forced
    colours, its ring's dash. `fill="none"` keeps three overlapping series
    apart; `grid` is polygon, circle or none.
  - The keyboard is the bar chart's: Left and Right round the spokes, Up
    and Down across the series. The summary compares the first two series
    spoke by spoke.

## D10. The candlestick chart

After M2 the owner chose «Candlesticks» (2026-11-03) as the next chart. Its
form was decided by the recommendation under the owner's delegation.

- **Own tag.** `sf-chart-candlestick`: four prices per period (`open`,
  `high`, `low`, `close`) do not fit the box plot's quartiles or the bar
  chart's single value, so the chart is a component of its own. Its core is
  `chart-core/ohlc.js`.
- **Time without holes.** The candles stand in order, one beside the next,
  so weekends leave no gap, as on trading charts. Dates are labelled at the
  first candle of a month, a week or a day, whichever fits. A row whose `x`
  is not a time keeps the data's order as categories.
- **Direction without colour.** A rising body is hollow and a falling one is
  filled, so the direction reads in print and in forced colours. The tones
  are those of the `success` and `error` roles. `colors {up, down}` swaps
  them for markets where rising is red.
- **The scale fits the data.** It does not start at zero, because a
  candle's length is a change and not a total. `y-zero`, `y-min` and
  `y-max` are kept for the cases that need them.
- **Merging.** Below 3 px per candle, neighbours merge as a longer period.
  The tooltip, the cursor and the event name the merged span. The table
  always lists every row.
- **`shape="bar"`** draws OHLC bars instead of candles. The prop is not
  named `style`, which would clash with the element's own.
- **Out of 0.1.0.** Volume (a bar chart under the candles serves) and
  moving averages.

## D11. The waterfall chart

After the candlestick the owner chose «Каскадный график» (2026-11-04) as
the next chart. Its form was decided by the recommendation under the
owner's delegation.

- **Own tag, not a bar setting.** The catalogue proposed `accumulate` on
  `sf-chart-bar`. The chart is `sf-chart-waterfall` instead, with its core
  in `chart-core/waterfall.js`:
  - its colours go by direction (rise, fall, total), not by series;
  - it has total rows, lines joining the bars and a closing total;
  - the bar's series, `stack`, `bin`, `sort` and `lines` have no meaning
    on it, and would each need a rule for what they do there.
- **Data.** `x` and `y` as on the bar chart, and a `total` field marking
  the rows that stand on zero. A total row without a value shows the
  running total. With a value, the running total starts again from it, as
  an opening balance does.
- **A closing total**, «Итого», is added unless the last row is a total.
  `end="none"` draws the rows only.
- **Zero is always on the axis.** A total is an amount, drawn from zero,
  as a bar is.
- **Direction without colour.** Each bar's value is written with its sign
  when every value fits its band. In forced colours a rise is hollow, a
  fall filled and a total dashed. The tones are those of the `success`,
  `error` and `neutral` roles; `colors {up, down, total}` sets a page's
  own.
- **Out of 0.1.0.** Horizontal bars and steps of several parts.

## D12. The treemap

After the waterfall the owner asked for «Следующий график» (2026-11-05)
without naming one. The treemap was chosen as the most cited chart not yet
built (11 of 18 libraries, catalogue Tier 3). Its form was decided by the
recommendation under the owner's delegation.

- **Tag.** `sf-chart-treemap`, with its core in `chart-core/treemap.js`.
- **Two levels through a group field, not id and parent.** The catalogue
  proposed the hierarchy contract (id, parent, value, or a path) shared
  with a sunburst. 0.1.0 takes `x` and `y` as on the bar chart and an
  optional `group` field:
  - two levels cover the uses the catalogue names (budget by department,
    revenue by category and product), and the rows are the same rows the
    other charts read;
  - deeper trees need drill-down to stay readable, which 0.1.0 does not
    have. The id-and-parent contract stays the plan for the sunburst and a
    deeper treemap.
- **Layout.** Squarified (Bruls, Huizing and van Wijk, 2000), own
  implementation: groups and parts largest first, 2 px between
  neighbours, a band naming a group when it is tall enough.
- **Values.** A row without a value, or with zero or less, is left out
  and counted: an area cannot show it.
- **Colour.** A group takes the chart colour of its place
  (`--sf-chart-N`): its light fill inside each part and its line round it.
  The text is the page's ink, which reads on every fill. `colors` by group
  key sets a page's own.
- **Words.** A part's name, cut with an ellipsis, and its value under it
  where there is room. The tooltip, the live line and the table give the
  share.
- **Keyboard.** Left and Right walk the parts in their order, Up and Down
  go to the first part of the group before or after.
- **Out of 0.1.0.** More than two levels, zoom into a group, and the
  sunburst.

## D13. The timeline

After the treemap the owner chose «Гант / таймлайн» (2026-11-05) as the
next chart. Its form was decided by the recommendation under the owner's
delegation.

- **Tag.** `sf-chart-timeline`, the catalogue's name, with its core in
  `chart-core/timeline.js`. One tag serves a plan's Gantt chart and a
  service's state history: both are ranges of time on rows.
- **Data.** The ranges shape of `parameters.md` §2.1: `row`, `start` and
  `end` fields, and an optional `status`.
  - A row is a lane across the plot. It holds one range (a task) or many
    (the states of a service through a day).
  - A range whose start and end are one moment is a milestone, drawn as a
    diamond.
  - A row without a start or an end, or ending before it starts, is left
    out and counted.
- **Time.** One calendar axis from the first start to the last end, ticks
  on calendar units. Dates are said in the unit the data is given in; a
  range within one day says its end by the time only.
- **Rows.** They share the plot's height, which is the size rung's, as on
  every chart. A row's name stands at its start when the row is tall
  enough for a line, cut to three tenths of the width at most. With many
  rows the names go to the tooltip and the table, and a page sets
  `--sf-chart-timeline-height`.
- **Colour.** A status takes the chart colour of its place
  (`--sf-chart-N`) as a solid bar; `colors` by status key sets a page's
  own (`success`, `warning`, `error` for states). In forced colours each
  status keeps a line of its own: whole, dashed, dotted.
- **Keyboard.** Left and Right walk the ranges row after row, by start in
  each. Up and Down go to the range of the row above or below nearest in
  time.
- **Reuse.** The dispatcher reserved the name (ui-control `3bb85b5`) with a
  boundary: the view set (`simai/ui-view`) plans an editable Gantt chart
  that draws its rows with this timeline and adds editing and dependencies
  on top. So the rows (`timelineRows`), the layout and the time scale
  (`timelineLayout`) are in the chart core, and the marks' markup
  (`timelineMarks`) is exported by the template.
- **Out of 0.1.0.** Dependencies between tasks, editing by drag, a today
  line, zoom, and rows grouped under headings.

## D14. The Sankey diagram

After the timeline the owner chose «Sankey» (2026-11-05) as the next
chart. Its form was decided by the recommendation under the owner's
delegation.

- **Tag.** `sf-chart-sankey`, the catalogue's name, with its core in
  `chart-core/sankey.js` (own implementation).
- **Data.** The flow shape of `parameters.md` §2.1: `source`, `target` and
  `value` fields.
  - The same pair named twice is one flow with the sum.
  - A row without a source, a target or a positive value, or from a node
    to itself, is left out and counted.
  - A flow that would close a loop is left out and counted. The diagram
    runs one way, and a loop has no column to stand in.
- **Columns.** A node's column is its longest path from a node that
  nothing flows into. A node that flows nowhere stands in the last column,
  where the flows end.
- **Layout.** One scale for every column, each column centred. The order
  in a column starts as the rows give it, then is sorted a few times by
  the weighted middle of the joined nodes, so the bands cross less.
- **Colour.** A node takes the chart colour of its place
  (`--sf-chart-N`). Its outgoing bands take the colour's light fill, so a
  flow reads by where it comes from. `colors` by node name sets a page's
  own.
- **Words.** A node's name and value stand beside it, before it in the
  last column. They are cut to the room between the columns, and a name
  that would touch the name across the last gap is cut or left out.
- **Keyboard.** The cursor is on the nodes. Up and Down move within a
  column. Right follows the node's largest outgoing flow and Left its
  largest incoming one. Each node is said with what comes in from where
  and what goes out to where. The pointer reaches a band, and the table
  has a row per flow.
- **Out of 0.1.0.** Loops, nodes placed by hand, and drill-down.

## D15. The sunburst

After the Sankey diagram the owner chose «Солнечные круги» (2026-11-05)
as the next chart. Its form was decided by the recommendation under the
owner's delegation.

- **Tag.** `sf-chart-sunburst`, the catalogue's name, with its core in
  `chart-core/sunburst.js` (own implementation).
- **Data.** The hierarchy shape of `parameters.md` §2.1, the contract the
  catalogue shares with the treemap. It comes in two forms:
  - an id and a parent per row. The id field is named by `node`, because
    `id` is the element's own attribute. A parent not among the ids makes
    a top node, and `name` can give a name apart from the id;
  - a path per row, a field holding the list of names from the top down.
    The nodes on the way are made as they come, and the same path twice
    sums.
- **Values.** A parent's value is its own with its children's. Its own
  part stays as room after its children on the next ring. What cannot be
  drawn is left out and counted:
  - a row without an id or a path;
  - a node with no positive value and no children;
  - an id named twice;
  - a chain of parents that comes back to itself.
- **Layout.**
  - The top nodes share the turn clockwise from twelve o'clock, largest
    first. A child takes its parent's angle by its share.
  - The rings share the radius outside a hole of three tenths, which
    holds the total.
  - The plot is the size rung's height, as the pie's.
- **Colour.** A top node takes the chart colour of its place
  (`--sf-chart-N`) and its branch keeps it:
  - each arc has the colour's light fill with its line round it, lighter
    past the first ring;
  - the names are in the page's ink, as on the treemap;
  - `colors` by the top node's name sets a page's own.
- **Words.** A name stands along the middle of its arc. It is a straight
  line, or a curve along the arc when the arc holds more that way. Below
  the middle it is turned round so it never reads upside down. It is cut
  with an ellipsis to the room.
- **Keyboard.**
  - Left and Right go round a ring, going round at the ends.
  - Down goes out to the largest child, and Up back to the parent.
  - Each arc is said with its path, its value and its shares of the
    parent and the whole.
  - The table has a row per node, each branch under its parent.
- **Out of 0.1.0.** Drill-down into a branch, a legend, and arcs placed by
  hand.

## D16. The map

After the sunburst the owner chose the map (2026-11-05) and decided where
its boundaries come from (owner question `q-f136944dd5`): **the page gives
them**. The rest of its form was decided by the recommendation under the
owner's delegation.

- **Tag.** `sf-chart-map`, with its core in `chart-core/geo.js` (own
  implementation).
- **Boundaries.** The page sets them as GeoJSON in the `shapes` property:
  a FeatureCollection or a list of Features with Polygon or MultiPolygon
  geometry. Islands and holes, such as lakes, are kept.
  - The package holds no map. No third-party geometry or licence enters
    it, and the borders, disputed ones included, are the host's.
  - The examples and tests draw an invented map of nine districts and a
    warehouse scheme, not a real boundary.
  - A feature's key is its id (or `shape-key`), its name `name` (or
    `shape-name`).
- **Data.** The rows give a region's key and value (`region`, `value`).
  - A row naming no region on the map is counted in the summary.
  - A region without a value is drawn as the empty surface with a dashed
    line, and the legend names it.
- **Projection.** It is set by `projection`:
  - `mercator`, the default, keeps angles (a city, a small country);
  - `albers` keeps areas through two parallels of the map (a wide country
    such as Russia);
  - `equirectangular` takes the degrees as they are;
  - `plane` takes the coordinates as they are (a floor plan, a scheme).
  - The map is fitted into the plot with its proportions, and a map across
    the 180th meridian is kept whole.
- **Colour.** The heatmap's stepped scale on the theme's tone ladders
  (D8), sequential or diverging, with the same settings and a legend of
  the steps. A choropleth shows a rate or a ratio; the docs say to divide
  counts.
- **Words.** A region's name stands in its middle, cut to its width, when
  the region is tall enough.
- **Keyboard.**
  - The cursor walks the regions in reading order, top to bottom and left
    to right.
  - Up and Down go to the nearest region above or below.
  - Each region is said with its value and its place among the regions.
  - The table has a row per region, largest first, with its place.
- **Out of 0.1.0.**
  - Maps in the package.
  - Zoom and pan.
  - Points or proportional symbols on the map, which the catalogue names
    for counts.
  - A continuous colour ramp.

## D17. The set and its site

The owner asked (2026-11-05) to lay the repository out by the standard of
component sets, as ui-view was, and to build its site on the local host
ui-chart.test: «сделай все по стандарту, а потом мы с тобой, может,
модернизируем стандарт».

- **The set.** `chart` is a component set (standard `simai.component-set`
  1.0.0, ui-control `decisions/2026-11-03-component-sets.md`). The package
  folder is `package/` (was `components/`), with the passport `set.json`
  (licence simai-pro, `core.runtime` >=1.25.0 over the pinned ui-source,
  family `chart`, the 19 components as `preview`), the npm name
  `@simai-studio/chart`, the passport test, the registry check and the
  gates script of the reference set ui-view.
- **Registry.** The registry at ui-source main lists 11 of the 19 names.
  The other 8, reserved by the dispatcher in ui-control, are pending in
  `tests/set-registry.mjs` and ordered into the registry from the
  dispatcher.
- **The site.** `site/`, built with Docara as ui-view's, on the set site
  scheme the owner agreed on 2026-11-05: a home page (hero, the charts in
  tabs, the connection line, advantages, footer), the Guide and the
  Components reference, Russian under `/ru/`. Local only: nothing is
  published, and chart.simai.io is not set up.

## Answers

| # | Answer | Date | Record |
|---|---|---|---|
| D1 | A: line, bar, pie, sparkline, metric; `line` is M0. `sf-metric` also serves as Larena's metric tile (parameters.md §15) | 2026-11-02 | dispatcher, bus `msg-d0bbcfb263ca49d2ba05` |
| D2 | A: `sf-line-chart`, `sf-bar-chart`, `sf-pie-chart`, `sf-sparkline`, `sf-metric`, family `chart` | 2026-11-02 | `q-3c406a3c9e`, decided by the recommendation under the owner's delegation |
| D3 | A: rows + a field mapping, `items` | 2026-11-02 | `q-13d6497296`, decided by the recommendation under the owner's delegation |
| D4 | A: the token order sent to the dispatcher | 2026-11-02 | bus `msg-a61844188d13497380fd` |
| D5 | A: own renderer, SVG, Canvas for the marks layer past 2,000 | 2026-11-02 | `q-3197850dc8`, decided by the recommendation under the owner's delegation |
| D6 | `colors` on every chart with series, `color` on the sparkline | 2026-11-02 | the owner's «да» in the chat to the proposal of `colors` |
| D7 | Named palettes made by the package's generator on the Framework's tone ladder, `palette` setting | 2026-11-03 | the owner's «Yes, into the package» in the chat |
| D8 | Heatmap: stepped scale on the theme's tone ladders, local diverging midpoint | 2026-11-03 | the owner's «Heatmap» as the next chart; the scale decided by the recommendation under the owner's delegation |
| D9 | M2 plan and tag names as proposed; the funnel first, on a common baseline | 2026-11-03 | the owner's «Да, начинай с воронки» in the chat; the funnel's form decided by the recommendation under the owner's delegation |
| D9 | The scatter: bubbles through the `bubble` field, shapes per series, the relation in words | 2026-11-03 | the owner's «Да, делай точечный» in the chat; the form decided by the recommendation under the owner's delegation |
| D9 | The histogram: `bin` on `sf-chart-bar` (auto or a width), touching bars, edges on the axis | 2026-11-03 | the owner's «Да, гистограмму» in the chat; the form decided by the recommendation under the owner's delegation |
| D9 | The box plot: `sf-chart-box`, raw or given statistics, linear quartiles, Tukey's whiskers by default, series side by side | 2026-11-03 | the owner's «Да, ящик с усами» in the chat; the form decided by the recommendation under the owner's delegation; the name reserved by the dispatcher (ui-control `2d3fb38`) |
| D9 | The radar: `sf-chart-radar`, one scale from the centre, the first spoke up and clockwise, a gap breaks the ring, marks of their own shape per series | 2026-11-03 | the owner's «давай дальше … радар?» in the chat; the form decided by the recommendation under the owner's delegation |
| D10 | The candlestick: `sf-chart-candlestick`, candles in order without holes, hollow rise and filled fall, a scale fitting the data, merging below 3 px, `shape="bar"` | 2026-11-03 | the owner's «Candlesticks» in the chat; the form decided by the recommendation under the owner's delegation; the name reserved by the dispatcher (ui-control `402a5ac`, bus `msg-b88db530428847a0bdcb`) |
| D11 | The waterfall: `sf-chart-waterfall` (not `accumulate` on bar), total rows on zero, a closing total, joining lines, signed values, the success, error and neutral tones | 2026-11-04 | the owner's «Каскадный график» in the chat; the form decided by the recommendation under the owner's delegation; the name reserved by the dispatcher (ui-control `c8a67cb`, bus `msg-7a432f38a14e4db9ad8d`) |
| D12 | The treemap: `sf-chart-treemap`, two levels through a `group` field (not id and parent), squarified, groups in the chart colours with light fills, names and values inside where they fit | 2026-11-05 | the owner's «Следующий график» in the chat; the chart and its form decided by the recommendation under the owner's delegation; the name reserved by the dispatcher (ui-control `e79bd7f`, bus `msg-f886b54bb51d4e05a312`) |
| D13 | The timeline: `sf-chart-timeline`, row, start, end and status fields, a row holding one range or many, milestones as diamonds, a status in a chart colour, the rows, layout and time scale in the core for reuse | 2026-11-05 | the owner's «Гант / таймлайн» in the chat; the form decided by the recommendation under the owner's delegation; the name reserved by the dispatcher (ui-control `3bb85b5`, bus `msg-6a10fbed66144c44b6ba`) |
| D14 | The Sankey diagram: `sf-chart-sankey`, source, target and value fields, a pair summed, loops left out and counted, columns by the longest path with the ends last, a node in a chart colour and its bands in its light fill, the keyboard along the largest flows | 2026-11-05 | the owner's «Sankey» in the chat; the form decided by the recommendation under the owner's delegation; the name reserved by the dispatcher (ui-control `4a70440`, bus `msg-d8408d476f8b4d55b157`) |
| D15 | The sunburst: `sf-chart-sunburst`, an id and a parent per row (`node`, `parent`) or a path of names, a parent's value its own with its children's, rings round a hole with the total, a branch in its top node's chart colour, names along the arcs, the keyboard round the rings and in and out | 2026-11-05 | the owner's «Солнечные круги» in the chat; the form decided by the recommendation under the owner's delegation; the name reserved by the dispatcher (ui-control `868426b`, bus `msg-285614a61887494785a1`) |
| D16 | The map: `sf-chart-map`, the boundaries given by the page as GeoJSON with no map in the package, values joined by key, mercator, albers, equirectangular or plane projection, the heatmap's stepped scale with a legend, the keyboard in reading order | 2026-11-05 | the owner's «Да, карта» and «Границы даёт сайт» in the chat (owner question `q-f136944dd5`); the rest decided by the recommendation under the owner's delegation; the name reserved by the dispatcher (ui-control `906d127`, bus `msg-02933d743db64e92b1e1`) |
| D17 | The set `chart` laid out by `simai.component-set` 1.0.0 and its site on the agreed scheme, local | 2026-11-05 | the owner in the chat: «подготовить сайт на локалке ui-chart.test … сделай все по стандарту» |

The owner may overturn any of these. The decision is then recorded here
with its new date.

## After the decisions

1. **The answers go into this file**, each with its date and its decision
   id.
2. **M0 starts.**
   - The package skeleton is shaped like `simai/ui-pro/components/`.
   - The Framework pair is pinned from `control/COMPATIBILITY_LEDGER.yaml`.
   - The core and the first chart are built with their passport,
     manifest, journal entry, tests and browser probes.
3. **The colour order (D4) runs in parallel.** M0 does not wait for it.

## D18. One chart core per page

The Framework dispatcher built a package's shared core into the runtime
(ui-source core.runtime 1.38.0, `SF.runtimeModule`; ui-builder `1608b36`) at
the set's order (item 10), and handed the set its steps on 2026-11-09
(room ui-control, handoff `ho-fd5d69462fd6`). Decided by the recommendation
under the owner's delegation:

- **The core.** `package.json` `simai.core` names `chart-core` with ABI 1.
  ui-builder builds it once as its own bundle that registers its modules,
  and every chart takes them from the runtime. Every chart's rule relates to
  `cl-chart-core`, so the Loader fetches the core once for all charts.
- **What it holds** (the dispatcher's option C, measured in ui-control
  `control/evidence/2026-11-08-chart-core/`): the modules two or more charts
  use, and `timeline`, which the view set's Gantt chart is to reuse (D13).
  The twelve single-chart modules move into their chart's `js/` folder. All
  charts together and a four-chart dashboard get lighter; a page with one
  chart grows a little (bar: 46.8 to 59.5 KB measured).
- **ABI.** `abi` is the version of chart-core's exports: removing or
  changing an export raises it, adding one keeps it. All bundles of a
  release come from one build.
- **Runtime.** The set needs `core.runtime` 1.38.0 or newer, so an older
  page refuses the bundles instead of breaking.
