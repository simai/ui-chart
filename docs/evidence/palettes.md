# Palettes: evidence

On 2026-11-03 the owner chose «Yes, into the package» (`docs/DECISIONS.md`
D7). The named colour sets are made here, by the package's own generator,
and the charts take them with `palette`. `colors` (D6) still wins for the
series it names. The Framework order for `--sf-chart-1…8` (D4) stands: when
those roles come, `vivid` takes them.

## The generator

`components/scripts/chart-palettes.mjs` writes
`src/smart/chart-core/palettes.js`. With `--check` it fails when that file
is stale.

- **Light and dark.** A colour is a hue at a light tone (CIELAB L* 40–55)
  and a dark tone ten above it. Ten up is the step the Framework itself
  takes from tone 50 to 60 for its graphic colours. Each colour is a
  `light-dark()` pair, so it changes with the theme as the theme's own
  colours do.
- **Contrast.** Every colour holds 3:1 against surfaces 0–2 of the pinned
  Framework in its theme.
- **Picking.**
  - The first colour sits near the seed hue.
  - Each next one is the candidate farthest from those already chosen, in
    both themes.
  - For the first five, "farthest" also holds under protanopia,
    deuteranopia and tritanopia (Machado et al. 2009, severity 1).
- **No yellow or olive** (CIELAB hue 70–125). These hues cannot hold 3:1 on
  white without turning muddy.
- **Nothing is taken from another palette.** The only inputs are these
  rules and the Framework's surfaces.

| Set | Colours | Lowest contrast, light / dark | Closest of the first five (ΔE): normal, protan, deutan, tritan |
|---|---|---|---|
| `vivid` | 8 | 3.32 / 3.38 | 21.9, 17.7, 23.2, 18.6 |
| `soft` | 8 | 3.32 / 4.03 | 20.9, 15.4, 12.6, 12.8 |
| `warm` | 6 | 3.32 / 3.38 | 15.8, 15.9, 12.7, 16.3 |
| `cool` | 6 | 3.32 / 3.38 | 15.0, 10.9, 15.0, 15.0 |
| `brand` | 4 | primary 20–50 / 85–60 | ordered steps, not categories |

Three sets are not plain generated pairs:

- **`vivid`.** Colour 1 is the brand's own graphic tone. Each colour is
  `var(--sf-chart-<n>, …)`, so the Framework's roles take over when they
  exist.
- **`brand`.** It is steps of the theme's primary family, so it follows a
  project's own brand.
- **`theme`.** It is the default and draws as before.

## Checks

Unit tests (`tests/chart-core.test.mjs`):

- the palettes are what the generator writes;
- every colour is a `light-dark()` pair or the brand's tone;
- the set sizes.

The freshness test is skipped in the build overlay, which does not carry
`scripts/`. It runs beside the source and in the release check below.

Browser (`tests/browser/tier-one.browser.mjs`):

| Case | Result |
|---|---|
| bar `palette="warm"` with `colors: {q2: '#0a7f6f'}`, light theme | q1 = `rgb(213, 66, 52)` (warm 1, light tone), q2 = `rgb(10, 127, 111)` |
| the same, dark theme | q1 = `rgb(245, 95, 75)` (warm 1, dark tone) |

`examples/palettes.html` shows every set on a bar chart and a ring chart.
Both themes were checked there by hand, in the browser:

- every set draws;
- the dark theme takes the dark tones, for example vivid 2 is
  `rgb(203, 79, 28)` dark and `#ac3500` light.

## Build

ui-builder `verify-package-reproducibility.cjs` ran from commit `d9e796a`
over ui-source at the pin. The result was **PASS**:

- two builds are byte-identical;
- 358 files;
- the output manifest sha256 is
  `a5487ab2e513c412cde977ee2fcbd606c7f0c6cf47dd478f89a75d32595c479c`.

The package receipt names framework `ui-2d39b617a719`. The archive sha256 is
`4b25913efd859845dfb586e11e6bdc3f370fc664380ccb9ac34b87de07fd8d7b`.

| Check | Result |
|---|---|
| Manifest probes | 33/33 |
| First paint | 94 unchanged, among them 4 new `palette` examples |
| First-paint gate | 176/176, CLS 0 |
| Browser probes | 2/2 |
| Suite | 126/0 |
| `chart-palettes.mjs --check` | fresh |

## Size

| Chart | Before, JS gzip | After |
|---|---|---|
| `chart-line` | 13.4 KB | 14.1 KB |
| `chart-bar` | 13.6 KB | 14.3 KB |
| `chart-pie` | 10.6 KB | 11.2 KB |
| `chart-parts` | 9.4 KB | 10.1 KB |
| `chart-sparkline` | 7.0 KB | 7.0 KB |
| `chart-metric` | 4.2 KB | 4.2 KB |

The six now sum to about 60.8 kB. Each chart carries its own copy of the
palettes, like the rest of the core, until the shared module (part 10).
