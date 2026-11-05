# Pin ui-62b1d9b6dc8d: evidence

The pin moves from `ui-c3015f76bcc2` to the Framework pair
`ui-62b1d9b6dc8d`:

- ui-source `ec2f29df`;
- npm `@simai-studio/ui@5.20261105.1447`, tarball sha256
  `92b9b87b1c28d4ebb619dfd9365fbd8ddd678f9c48261b77990daf2e86bd013c`;
- ui-builder `9c9c1b15`;
- ui-control COMPATIBILITY_LEDGER
  `framework_pair_ui_62b1d9b6dc8d_wave_2_2026_11_05`.

It answers the package's order for a format import without side effects
(bus `msg-e286033548774367a6f4`, answered in `msg-c604fade08424a509be2`).
Since the previous pin (`docs/evidence/pin-ui-c3015f76bcc2.md`), each chart
has carried the core's whole format module, about 1.3 KB gzip.

## What changed

- **chart-core 0.3.1.**
  - `format.js` imports `formatNumber` and `numberOptions` from
    `core/js/format-number.js` and `formatDate` from
    `core/js/format-date.js`. These are core.runtime 1.28.0 modules
    without top-level side effects.
  - It no longer imports the whole `core/js/format.js`, so a chart's
    bundle does not carry the relative-date and file-size formats.
  - The passport's core.runtime range is now `^1.28.0`.
- **Nothing a chart says changes.** The 76 manifest probes check the same
  summaries, live lines and tables word for word, and they all pass.
- The lock, the README, STATUS, the palette script's comment and the
  examples name the new pair. Surfaces 0–2 are unchanged, so the palettes
  stay as generated.

## Size

JS of each chart, minified and gzip, in the release build from the same
tree before (`a91075c` over `ui-c3015f76bcc2`) and after (`25d50bf` over
`ui-62b1d9b6dc8d`):

| Chart | Before | After | Change |
|---|---|---|---|
| `chart-bar` | 16.7 KB | 15.9 KB | −821 B |
| `chart-box` | 13.6 KB | 12.7 KB | −980 B |
| `chart-candlestick` | 13.0 KB | 12.3 KB | −769 B |
| `chart-funnel` | 10.1 KB | 9.3 KB | −784 B |
| `chart-gauge` | 9.0 KB | 8.1 KB | −972 B |
| `chart-heatmap` | 9.8 KB | 8.8 KB | −975 B |
| `chart-line` | 15.0 KB | 14.2 KB | −754 B |
| `chart-metric` | 5.4 KB | 4.4 KB | −1007 B |
| `chart-parts` | 11.1 KB | 10.3 KB | −775 B |
| `chart-pie` | 12.2 KB | 11.5 KB | −784 B |
| `chart-radar` | 13.3 KB | 12.4 KB | −947 B |
| `chart-scatter` | 14.2 KB | 13.2 KB | −961 B |
| `chart-sparkline` | 8.1 KB | 7.2 KB | −951 B |
| `chart-timeline` | 12.6 KB | 11.9 KB | −744 B |
| `chart-treemap` | 10.9 KB | 9.9 KB | −967 B |
| `chart-waterfall` | 11.4 KB | 10.5 KB | −951 B |
| All sixteen | 186.5 KB | 172.7 KB | −13.8 KB |

Each chart is 0.7–1.0 KB lighter, close to the dispatcher's measure on a
chart-like probe (1933 → 1010 B for the same three functions). The CSS is
unchanged.

## Build

ui-builder `verify-package-reproducibility.cjs` ran from commit `25d50bf`
over ui-source `ec2f29df`, the pin. The result was **PASS**:

- two builds are byte-identical;
- 930 files;
- the output manifest sha256 is
  `5f9a6a31126f4e6b9ebf3e7d49044a0ad8249bf7b562394aa8a87f7d0111cc38`.

The package receipt names framework `ui-62b1d9b6dc8d`. The archive sha256 is
`71dc6889fbd0455504871a7600699e39ca501d434a97e7f225d7b923620d852a`.

| Check | Result |
|---|---|
| Manifest probes | 76/76 |
| First paint | 240 unchanged |
| First-paint gate | 448/448, CLS 0 |
| Browser probes | pass |
| Browser, tier one (blocks 1–3m) | pass |
| Suite | 146/0 |
