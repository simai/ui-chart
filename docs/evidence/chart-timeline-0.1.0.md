# Timeline 0.1.0: evidence

`sf-chart-timeline` is the chart after the treemap. The owner chose
«Гант / таймлайн» on 2026-11-05. It shows tasks or states as ranges of
time on rows: a project's plan, a schedule, or the history of a service's
states. Its form was decided by the recommendation under the owner's
delegation and is recorded in `docs/DECISIONS.md` D13.

## What it is

- **Data** (`chart-core/timeline.js`). It reads the ranges shape of
  `parameters.md` §2.1:
  - `row` names the row, and `start` and `end` (by default `start` and
    `end`) give the times as ISO dates, `Date` objects or milliseconds;
  - the optional `status` field gives each range a colour and a line of
    the key;
  - a row is a lane that holds one range (a task) or many (a service's
    states through a day);
  - a range whose start and end are one moment is a milestone;
  - a row without a start or an end, or ending before it starts, is left
    out and counted.
- **Layout.**
  - The rows share the plot's height, which is the size rung's.
  - A row's name stands at its start when the row is tall enough for a
    line, cut with an ellipsis to three tenths of the width at most.
  - The time runs on one calendar axis from the first start to the last
    end. Half a bar is kept at each end, so a milestone there is whole.
  - Neighbours that touch stand a pixel apart, and no range is thinner
    than a pixel.
- **Colour.**
  - A status takes the chart colour of its place (`--sf-chart-1..8`) as a
    solid bar.
  - `colors` by status key sets a page's own colours, such as `success`,
    `warning` and `error` for states.
  - In forced colours each status keeps a line of its own: whole, dashed
    or dotted.
- **Reading.**
  - The summary gives:
    - the rows, the ranges and the whole span with its length;
    - the longest range;
    - the status that takes the most time;
    - the milestones;
    - the rows left out.
  - Dates are said in the unit the data is given in. A range within one
    day says its end by the time only: «4 нояб. 2026 г., 09:40 – 10:25».
  - The tooltip gives the row, the status, the start, the end and the
    length, or the date of a milestone.
  - The table has a row per range with its status, start, end and length.
- **Keyboard.**
  - The plot is one Tab stop.
  - Left and Right walk the ranges row after row, by start in each.
  - Up and Down go to the range of the row above or below that is nearest
    in time.
  - Home, End, Page Up and Page Down jump.
  - Every move is said.
  - Enter and Space select (`select {index, row, lane, status, start,
    end}`), and Escape clears.
- **Reuse.** The dispatcher reserved the name (ui-control `3bb85b5`) with
  a boundary: the view set's editable Gantt chart draws its rows with this
  timeline. These parts can be composed:
  - `timelineRows` and `timelineLayout` in the chart core;
  - `timelineMarks` from the template.

## Fixed during the work

- **A milestone at the last moment was cut in half** at the plot's right
  edge. The plot now keeps half a bar at each end.
- **The summary said «32 дн..».** The short unit ends with its own point.
  A sentence now keeps one point.
- **A range within one day repeated its date**, as in «4 нояб. 2026 г.,
  00:00 – 4 нояб. 2026 г., 09:40». Its end is now said by the time only.

## Checks

Unit tests (`tests/chart-core.test.mjs`) cover:

- the ranges row after row by start, with what is left out counted and
  the statuses in order;
- the time per status, the nearest range of a row and the lengths in
  days, hours and minutes;
- the layout:
  - bars stay in their rows;
  - touching neighbours stay apart;
  - a milestone is whole;
  - names are cut to their room;
  - no names when the rows are too many.

The core suite now passes 146.

Manifest probes (`examples.json`, page `conformance`), all four pass:

- **p1:** a figure named by its label, and the plot is a group described
  as a «диаграмма Ганта».
  - The statuses are «готово», «в работе» and «план», with 2, 1 and 3
    marks (one a diamond); the same three are in the key.
  - The six names stand at the start.
  - The summary reads:

    > «Рядов: 6, отрезков: 6, 2 марта 2026 г. – 15 мая 2026 г. (74 дн.).
    > Дольше всего — «Разработка»: 32 дн. Больше всего времени —
    > «план»: 41,3 %. Вех: 1.»
- **p2:** the keyboard.
  - Right says «Анализ, готово: 2 марта 2026 г. – 13 марта 2026 г.,
    11 дн.», then «Дизайн».
  - Down says «Разработка, в работе: … 32 дн.».
  - End says «Запуск, план: 15 мая 2026 г., веха».
  - Up goes to «Обучение».
  - Enter selects `{index: 4, row: 4, lane: 'Обучение', status: 'план'}`
    with its times.
  - Escape clears.
- **p3:** a service's states through a day.
  - There are ten ranges on four rows, and a row without an end is
    counted.
  - The hidden table's head is «Сервис|Статус|Начало|Конец|Длительность».
  - The keyboard says «API, с ошибками: 4 нояб. 2026 г., 09:40 – 10:25,
    45 мин».
- **p4:** the error state offers a retry that sends `refresh`.

Browser (`tests/browser/tier-one.browser.mjs`, block 3m):

| Case | Result |
|---|---|
| Plot, light and dark, 375 and 1280 px | Heights are ½: 160 px, 1: 240 px and 2: 384 px. There are five bars and a diamond on each. Every mark and name stays in the plot, every name ends before the bars start, and the page does not scroll sideways. All six names are written at every rung and width |
| Bars against the page | The three statuses are light 4.49, 4.49 and 9.3:1, dark 5.98, 5.96 and 12.77:1 (3:1 required), each in a colour of its own |
| Names and ticks against the page | Light 6.47:1, dark 5.95:1 (4.5:1 required) |
| Keyboard | Tab lands on the plot after the table button. Right and Right are said, Down goes to «Разработка» and Up comes back to «Дизайн». End says «Запуск, план: 15 мая 2026 г., веха» and Enter selects index 5. The tooltip reads «Запуск Статус план Дата 15 мая 2026 г.». Escape clears and Tab leaves |
| Pointer | Over «Разработка» the tooltip reads «Разработка Статус в работе Начало 23 марта 2026 г. Конец 24 апреля 2026 г. Длительность 32 дн.» |
| Forced colours | The first status is filled with the text colour. The others are the canvas with a dashed (4 2) and a dotted (1 2) line |

The stand was also checked by eye in light and dark at 760 px:

- the project plan with its milestone;
- the services' states in the default and the page's own colours
  (`success`, `warning`, `error`).

## Build

ui-builder `verify-package-reproducibility.cjs` ran from commit `a91075c`
over ui-source `4863a40e`, the pin. The result was **PASS**:

- two builds are byte-identical;
- 930 files;
- the output manifest sha256 is
  `431d76abddb7e42b9b5f8629d8d9a5376581b7339b4a99a1e574f47e8ac1656c`.

The package receipt names framework `ui-c3015f76bcc2`. The archive sha256 is
`fac4ae1d319d0a49eec6536c292a4948462ad013d2703295ad21c9b500418e84`.

| Check | Result |
|---|---|
| Manifest probes | 76/76 |
| First paint | 240 unchanged |
| First-paint gate | 448/448, CLS 0 |
| Browser probes | pass |
| Browser, tier one (blocks 1–3m) | pass |
| Suite | 146/0 |

## Size

`chart-timeline` is 12.6 KB of JS and 2.0 KB of CSS, gzip (minified). The
JS carries the core's whole format module, as every chart does since the
pin (`docs/evidence/pin-ui-c3015f76bcc2.md`). The other charts are
unchanged.

## Next

The name `sf-chart-timeline` was reserved by the dispatcher in ui-control
`3bb85b5` (bus `msg-6a10fbed66144c44b6ba`), checked free in ui-source and
ui-pro. It enters the registry with the package's first release.

Dependencies between tasks, editing by drag, a today line, zoom and rows
grouped under headings are outside 0.1.0.
