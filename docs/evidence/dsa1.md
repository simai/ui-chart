# DSA-1: series without hue, shares on their slices

Request DSA-1 of the SIMAI Framework thread (acceptance of
`sf-display-settings`, ui-control
`control/evidence/2026-11-22-ds-roles-acceptance/README.md` at `769fc883`).
Design: `docs/DECISIONS.md` D20. Date: 2026-11-22.

## What changed

| Chart | Cue in forced colours and in a display-settings scheme | Version |
|---|---|---|
| chart-core | `cues.js` (detection, watcher, mark shapes, seven hatches), `colors.js` label ink (`pickInk`, `composite`, `inkLabels`) | 0.5.0 |
| sf-chart-line | a dash per series past the first, a mark shape per series (about a dozen on a long line), the legend and tooltip swatch: dash and mark | 0.5.0 |
| sf-chart-bar, its histogram | a hatch per series past the first (SVG pattern), the swatch the same hatch; a series in lines dashed | 0.6.0 |
| sf-chart-pie | a hatch per slice past the first, the swatch the same; every share inked against its own slice | 0.4.0 |
| sf-chart-parts | a hatch per part past the first (CSS background), the list swatch the same | 0.4.0 |
| sf-chart-box | the box's dash per series, in a scheme too | 0.2.0 |
| sf-chart-scatter | bubbles' dash per series, in a scheme too (points already had shapes) | 0.2.0 |
| sf-chart-radar | the ring's dash per series, in a scheme too (marks already had shapes) | 0.2.0 |
| sf-chart-waterfall | a rise hollow, a total dashed, in a scheme too | 0.2.0 |

Checked under yellow-on-black, blue-on-sky and forced colours with every
chart's first example (scratch screenshots, not kept) and left as they are:
candlestick (hollow rise, filled fall), funnel and sparkline (one series),
gauge (the band's name written), treemap, sunburst, Sankey and timeline (each
group, node or status keeps its `--sf-chart-N` hue, which the scheme does not
remap; names in the page's ink on light washes), heatmap and map (the value
written in each cell; the stepped scale keeps two tones under a scheme, an
open point for the Framework, D20).

## Shares on their slices (pie, five parts 40/22/16/12/10 %)

Contrast of each share's ink against its own slice as drawn (the slice colour,
or a hatch's tile, at its opacity over the ground), measured by the probe's
own reading of the computed colours. The schemes are the real sheet of
ui-source `feat/display-settings-ds` 08f6ed93f; light, dark and forced
colours are the pinned pair `ui-078a4b4c6f6e`.

| Look | 40 % | 22 % | 16 % | 12 % | 10 % | Before (DSA-1) |
|---|---|---|---|---|---|---|
| light | 4.68 | 4.69 | 4.68 | 4.70 | 7.71 | 3.85-4.49 on lighter slices |
| dark | 8.24 | 8.23 | 8.22 | 8.26 | 5.78 | |
| forced colours | 21 | 21 | 21 | 21 | 21 | |
| black-on-white | 21 | 21 | 21 | 21 | 21 | 12 %: 1:1 |
| white-on-black | 21 | 21 | 21 | 21 | 21 | 12 %: 1:1 |
| yellow-on-black | 14.16 | 14.16 | 14.16 | 14.16 | 14.16 | 12 %: 1:1, 10 %: 3.14-4.43 |
| blue-on-sky | 13.28 | 13.28 | 13.28 | 13.28 | 13.28 | 12 %: 1:1 |
| brown-on-cream | 15.06 | 15.06 | 15.06 | 15.06 | 15.06 | 12 %: 1:1 |

The choice itself is held by the unit test «a label on a fill takes the first
ink that holds 4.5:1 against that fill» (`package/tests/chart-core.test.mjs`):
the scheme case, the lighter second round, both themes, and every opaque
colour of a 16×16×6 grid reaching 4.5:1.

## Series apart

`package/tests/browser/chart-cues.browser.mjs` (a gate browser probe) draws
line (3 series), bar (3), a histogram (2), pie (5) and parts (4) under forced
colours, under a yellow-on-black scheme (a fixture shaped like the
Framework's sheet, since the pinned pair has none), and in light and dark:

- cue mode on in forced colours and the scheme, off in light and dark, and
  following a scheme chosen and left after the charts drew;
- every series of every chart has its own signature (line: dash and mark
  shape `none circle`, `6px, 3px path3`, `2px, 3px path2`; fills: solid,
  then the 45° hatch, the across hatch, dots, the other 45° hatch), and each
  legend swatch the same cue;
- no hatch and no change of look in light and dark;
- every share at or above 4.5:1 on its slice.

## Screenshots

`dsa1/<look>-<chart>.png` for line, bar and pie: `forced-colours`,
`scheme-yellow-on-black`, `scheme-blue-on-sky`, and `light` for comparison
(1100 px page, device scale 2).

## Notes

- The pie's first-paint snapshots now carry each share's ink in its style
  (the ink the snapshot browser chose); the chart chooses again on its first
  render on the page.
- Commit: the branch's DSA-1 commit (see `git log`); gates in the release
  request.
