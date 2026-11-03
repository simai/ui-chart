# Candlestick 0.1.0: evidence

`sf-chart-candlestick` is the first chart after the M2 plan. The owner
chose «Candlesticks» on 2026-11-03. It shows the open, high, low and close
of each period. Its form was decided by the recommendation under the
owner's delegation and is recorded in `docs/DECISIONS.md` D10.

## What it is

- **Data** (`chart-core/ohlc.js`).
  - One row per period. `x` is the period's field (the first field that is
    not a price, by default); `open`, `high`, `low` and `close` name the
    prices.
  - When every `x` reads as a time, the candles go in time order.
    Otherwise they keep the data's order as categories.
  - A row missing one of the four prices is left out and counted. A high
    below the open or the close is raised to it, and a low is lowered.
- **Form.**
  - The candles stand one beside the next, so a day without trading
    leaves no hole.
  - Dates are labelled at the first candle of a month, a week or a day,
    whichever fits.
  - A rising body is hollow and a falling one filled. The tones are the
    `success` and `error` roles, and `colors {up, down}` can swap them.
  - `shape="bar"` draws OHLC bars: a line from low to high, a tick left
    for the open and right for the close.
  - The scale fits the data and does not start at zero. `y-zero`, `y-min`
    and `y-max` are kept.
  - Below 3 px per candle, neighbours merge as a longer period.
  - All wicks (or bars) of one direction are one path, which keeps 20
    candles' first paint at 7.8 KB.
- **Reading.**
  - The summary gives the span and the count, the first open and the last
    close with the change, the highest high and lowest low with their
    dates, and how many periods rose and fell.
  - The tooltip names the period, its four prices and the change. A
    merged candle is named «from – to».
  - The table has a row per period with every price and the change. It
    always lists every row, merged or not.
- **Keyboard.**
  - The plot is one Tab stop. The legend is a plain list, not a stop.
  - Left and Right go candle by candle. Up and Down stay put.
  - Home, End, Page Up and Page Down jump.
  - Every move is said.
  - Enter and Space select (`select {index, row, x, open, high, low,
    close}`).
  - Escape clears.
- **Forced colours.** Both directions are the system colour. A rising
  body stays hollow (Canvas) and a falling one filled.

## Fixed during the work

- **Four charts lost their size after being moved in the page.** Line,
  scatter, box and radar forgot the plot they watched only when they were
  removed. A chart put back in the same place therefore never measured
  itself again. They now forget it on removal, as bar, pie, heatmap and
  sparkline already did, and the candlestick does the same.
  - The search started from a stand where the candlestick drew nothing.
    That case turned out to be the browser pane being hidden: a hidden
    pane draws no frames, so no size is reported to any chart. The
    removal fault was found along the way and is real.
- **The summary ended in «г..».** A date in Russian ends in «г.», so the
  span sentence no longer ends on a date: «С 1 октября 2026 г. по 28
  октября 2026 г. — свечей: 20.»
- **The legend's swatches are counted as bodies.** They share the body's
  class, so the tests count the plot's bodies inside the plot.
- **The reference example passed 8 KB of first paint** (8.7 KB) while each
  candle had its own wick. With one wick path per direction, it prints
  7.8 KB.
- **`style` was not used as a prop name**, because it would clash with
  the element's own `style`. The prop is `shape`.

## Checks

Unit tests (`tests/chart-core.test.mjs`):

- reading the candles: time order, categories, a missing price, a high
  and low held round the body;
- merging candles, their extent, and where the date ticks land.

The core suite now passes 37.

Manifest probes (`examples.json`, page `conformance`), all four pass:

- **p1:** a figure named by its label, and the plot a group «свечной
  график». It draws 20 bodies, 7 of them falling, and two legend items.
  The summary reads:

  > «С 1 октября 2026 г. по 28 октября 2026 г. — свечей: 20. Открытие
  > 101,0, закрытие 118,1: +17,1 (+16,9 %). Максимум 119,4 (28 октября
  > 2026 г.), минимум 100,1 (1 октября 2026 г.). Рост: 13, падение: 7.»
- **p2:** the keyboard.
  - Right says «1 октября 2026 г.: открытие 101,0, максимум 103,6, минимум
    100,1, закрытие 102,4, +1,4 (+1,4 %)», then the 2nd of October.
  - End says the 28th of October, and the cursor draws one ring.
  - Enter selects `{index: 19, x: '2026-10-28', close: 118.1}`.
  - Escape clears.
- **p3:** quarters as categories.
  - The ticks are «I кв.» to «IV кв.», with four bodies.
  - The table's head is «Квартал|Открытие|Максимум|Минимум|Закрытие|
    Изменение».
  - Its second row is «II кв.|92|99|81|85|−7 (−7,6 %)».
- **p4:** the error state offers a retry that sends `refresh`.

Browser (`tests/browser/tier-one.browser.mjs`, block 3j):

| Case | Result |
|---|---|
| Plot, light and dark, 375 and 1280 px | Heights are ½: 160 px, 1: 240 px and 2: 384 px. All 20 bodies are drawn, every mark and tick stays inside the plot, and the page does not scroll sideways |
| Up and down against the page | Light 4.46 and 4.46:1, dark 5.97 and 5.95:1 (3:1 required). Each direction has its own tone. A rising body is filled with the surface and a falling one with its tone |
| Keyboard | Tab lands on the plot after the table button. Right, Right and End are each said, and Down stays on the 2nd of October. Enter selects index 19. The tooltip reads «28 октября 2026 г. Открытие 116,8 Максимум 119,4 Минимум 115,7 Закрытие 118,1 Изменение +1,3 (+1,1 %)». Escape clears and Tab leaves |
| Pointer | Over the fifth rising candle the tooltip names the 12th of October |
| Forced colours | Both strokes are `rgb(0, 0, 0)`. The rising body is filled `rgb(255, 255, 255)` and the falling one `rgb(0, 0, 0)` |

The stand was also checked by eye in the dark theme at 760 px:

- the October trading days;
- the OHLC bars;
- the quarters as categories.

## Build

ui-builder `verify-package-reproducibility.cjs` ran from commit `5f513be`
over ui-source `5776ff08`, the pin. The result was **PASS**:

- two builds are byte-identical;
- 774 files, up from 718 with the candlestick;
- the output manifest sha256 is
  `b9cb4abf97450ab0a3c0f57602fe89593e873fc39dcb91693365248dc02da254`.

The package receipt names framework `ui-de2b4437234a`. The archive sha256 is
`449e4a884e03a2abfed61be0b140d2172decf1e9d19f782b6d16c41b7b1866f1`.

| Check | Result |
|---|---|
| Manifest probes | 64/64 |
| First paint | 204 unchanged |
| First-paint gate | 382/382, CLS 0 |
| Browser probes | 2/2 |
| Suite | 141/0 |

## Size

`chart-candlestick` is 12.0 KB of JS and 2.0 KB of CSS, gzip (minified).
Line, scatter, box and radar each grew by one line, the removal fix.

## Next

The name `sf-chart-candlestick` was reserved by the dispatcher in ui-control
`control/decisions/2026-11-02-ui-chart-package.md` (`402a5ac`, bus
`msg-b88db530428847a0bdcb`), checked free in ui-source and ui-pro. Bus
`msg-0f3755db543d4dd08047` reported the chart done. It enters the registry
with the package's first release.

Volume and moving averages are outside 0.1.0. Today a bar chart with the
same periods under the candles serves for volume.
