# Pin ui-c3015f76bcc2: evidence

On 2026-11-03 the dispatcher released pair `ui-bf406c268546`, which brought
core.runtime 1.20.0 with `SF.format`. The same pair recorded
`chart-heatmap.scheme` as exempt from the status axis, as this package had
ordered (bus `msg-4445239656ac4dc3b461`). Six more pairs followed by
2026-11-04. The pin moved to the newest one, `ui-c3015f76bcc2`, in commit
`28a0908`; it carries everything since `ui-de2b4437234a`.

## The pin

| | Before | Now |
|---|---|---|
| Pair | `ui-de2b4437234a` | `ui-c3015f76bcc2` |
| ui-source | `5776ff08` | `4863a40e221cba7684cd0c7d860b286613d3e8c4` (74 commits on) |
| npm | `@simai-studio/ui@5.20261102.2243` | `@simai-studio/ui@5.20261104.451` |
| Tarball sha256 | `521ebc96…bdd5` | `5932d6cb4c1ee928f58b4e08d47122d3d492dc180e2080b18d6794e3269f4fa8` |
| ui-builder | `a89508ce28ac` | `9c9c1b151039` |
| Ledger | `framework_pair_ui_de2b4437234a_scrim_chart_colours_loader_ensure_2026_11_03` | `framework_pair_ui_c3015f76bcc2_editor_parity_2026_11_04` |

The tarball was downloaded from the npm registry. Its sha512 matches the
registry's `dist.integrity`.

## What changed here

- **chart-core 0.3.0.** `chart-core/format.js` now formats numbers and
  dates through the core's `SF.format`. The core took its number words
  from this file:
  - `formatNumber` and `numberOptions` are the core's;
  - the axis-tick and full-date forms stay the chart's own, drawn through
    the core's `formatDate`;
  - the arguments keep the chart's order, so no chart changed.

  The one difference is that `decimal-<n>` now reads two digits.
- **`chart-heatmap.scheme`** is recorded by ui-source now. It leaves the
  package's pending exemptions in
  `tests/package-public-api-axes.contract.test.mjs`. The charts'
  `data-state` stays pending.
- **What did not change.**
  - Surfaces 0–2 are the same in the new pair, so the generated palettes
    are unchanged.
  - The pairs in between renamed tags. Neither tag a chart draws,
    `sf-empty-state` and `sf-progress-bar`, is among them.
  - The component set standard (`simai.component-set` 1.0.0) concerns how
    a package is published. It is the dispatcher's release route and asks
    nothing of this repository yet.
- **The text is the same.** The first paint of every example is unchanged
  (216 of 216), so every number and date a chart prints reads as before.

## The cost, and the order

Each chart bundle grew by 1.3–1.4 KB gzip (minified JS):

| Chart | Before | Now |
|---|---|---|
| chart-metric | 4.2 KB | 5.6 KB |
| chart-sparkline | 7.0 KB | 8.4 KB |
| chart-bar | 15.7 KB | 17.1 KB |
| chart-waterfall | 10.4 KB | 11.7 KB |

The rest grew alike. `format.js` publishes `globalThis.SF.format` when it
loads. That side effect keeps the whole `Format` object in every bundle that
imports one function from it: relative days, relative time and file sizes
along with numbers and dates. The Framework's own `input-quantity` and
`input-image` pay the same.

The fix belongs to the Framework. It was ordered from the dispatcher on
2026-11-05 (bus `msg-e286033548774367a6f4`): a side-effect-free way to
import the number and date helpers alone. On that pair the package moves its
import, and its evidence records the size coming back. The package is
correct as it is meanwhile; the size gates pass.

## Build

ui-builder `verify-package-reproducibility.cjs` ran from commit `28a0908`
over ui-source `4863a40e`, the pin. The result was **PASS**:

- two builds are byte-identical;
- 826 files;
- the output manifest sha256 is
  `fd249a0f27993a899465f33e45004f0dc1a30ea8b173760bcf4f633dc6bb11d2`.

The package receipt names framework `ui-c3015f76bcc2`. The archive sha256 is
`528857d1d9a094fe49ad94da12d89f039cde48e27dedcf86e523b58378c07052`.

| Check | Result |
|---|---|
| Manifest probes | 68/68 |
| First paint | 216 unchanged |
| First-paint gate | 404/404, CLS 0 |
| Browser probes | 2/2 |
| Browser, tier one (blocks 1–3k) | pass |
| Suite | 142/0 |
