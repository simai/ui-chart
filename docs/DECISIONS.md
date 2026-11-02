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
  decision before any work.

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
