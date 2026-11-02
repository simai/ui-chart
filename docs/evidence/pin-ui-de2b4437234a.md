# Pin ui-de2b4437234a: evidence

On 2026-11-03 the dispatcher released pair `ui-de2b4437234a`, which carries
two orders of this package:

- the chart colour roles `--sf-chart-1..8`, their fills and
  `--sf-chart-midpoint` (bus `msg-914b0d6059624cebb8d7`);
- start visible for a printed part with `display: contents` (bus
  `msg-11cb117f922f40239ba1`).

The pin moved to that pair in commit `a0eff68`.

## The pin

| | Before | Now |
|---|---|---|
| Pair | `ui-2d39b617a719` | `ui-de2b4437234a` |
| ui-source | `426123e2` | `5776ff08067265336316958fba53e76230ea5acb` |
| npm | `@simai-studio/ui@5.20261102.1106` | `@simai-studio/ui@5.20261102.2243` |
| Tarball sha256 | `084c2e9d…8175` | `521ebc96859e2db9ad155a4e1442b006aac5c3cb1a7050117a4b1a223fd5bdd5` |
| Ledger | | `framework_pair_ui_de2b4437234a_scrim_chart_colours_loader_ensure_2026_11_03` |

The tarball was downloaded from the npm registry. Its sha512 matches the
registry's `dist.integrity`.

## What changed here

- **Heatmap 0.1.1.** The diverging middle step is `--sf-chart-midpoint`
  (D8). In the dark theme it is now `neutral-20` (`rgb(47, 48, 53)`)
  instead of the package's own `neutral-25` (`rgb(58, 59, 64)`). The light
  middle is unchanged, `rgb(227, 226, 231)`. The ink contrast on the middle
  step still holds: the lowest written value is 5.45:1 light and 5.72:1
  dark.
- **Palettes.** `vivid`'s `var(--sf-chart-<n>, …)` now resolves to the
  Framework roles. Surfaces 0–2 are the same in the new pair, so the
  generated palettes are unchanged.
- **`examples/staged.html`.** The workaround for the start visible defect
  is removed. The page prints the host as the snapshot does, with
  `display: contents`.

## Start visible, checked in the browser

`examples/staged.html` was served with the release build of `a0eff68` over
`ui/distr` at the pair:

| Place | Start | Result |
|---|---|---|
| metric ×2, line | `now` | started on load; 2 of 5 chart modules fetched |
| bar, pie | `visible` | not fetched until scrolled into view, then started (bar at 8.9 s, pie at 9.7 s) |
| sparkline ×2 | `opened` | started when the section was opened; 5 of 5 fetched |

Each host stayed `display: contents` throughout.

## Build

ui-builder `verify-package-reproducibility.cjs` ran from commit `a0eff68`
over ui-source `5776ff08`. The result was **PASS**:

- two builds are byte-identical;
- 414 files;
- the output manifest sha256 is
  `4de8ff29515e06f64347118df1886ac1969064b1a3d181072d0be6b7ddabe7be`.

The package receipt names framework `ui-de2b4437234a`. The archive sha256 is
`50f4145b8dbc4c56c80fc8a41c38a7d9f2b25644569aff87f72d4c09af9b6ce1`.

| Check | Result |
|---|---|
| Manifest probes | 37/37 |
| First paint | 108 unchanged |
| First-paint gate | 202/202, CLS 0 |
| Browser probes | 2/2 |
| Suite | 127/0 |
