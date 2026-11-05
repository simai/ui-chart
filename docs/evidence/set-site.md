# The set chart and its site: evidence

The owner asked on 2026-11-05 to lay ui-chart out by the standard of
component sets, as the Framework had done for ui-view, and to build its
site on the local host ui-chart.test: «сделай все по стандарту, а потом мы с
тобой, может, модернизируем стандарт». The decision is recorded in
`docs/DECISIONS.md` D17.

The standard and the reference followed:

- `simai.component-set` 1.0.0, ui-source `docs/developer/component-sets.md`;
- the owner's decisions on sets and on the set site, ui-control
  `control/decisions/2026-11-03-component-sets.md`, including «The set site»
  and its review of ui-view.test;
- the reference set simai/ui-view: `docs/SET-TEMPLATE.md`, its `package/`
  and its `site/`.

## The set

- **Layout.** The package folder is `package/` (it was `components/`), as
  in the template. The live references moved with it; the evidence of
  earlier stages keeps the old path it was written with.
- **Passport.** `package/set.json` in the form `simai.framework.component-set`:
  - id `chart`, title SIMAI Chart, repository simai/ui-chart;
  - licence class `simai-pro`;
  - `core.runtime` >=1.25.0 over ui-source `ec2f29df`, the pin;
  - family `chart`, no required sets, docs `https://chart.simai.io/`;
  - the 19 components with their rules, folders and needed rules, each
    `preview` (they are 0.x).
- **Names.** `package.json` is `@simai-studio/chart`, and `framework.lock.json`
  names the package `chart`.
- **Checks**, from ui-view:
  - `tests/set-passport.contract.test.mjs`: the passport against the
    schema of the pinned Framework, against the folders and rule files, and
    against the registry at the pin. The chart core is a module folder with
    no element and is not a component;
  - `scripts/check-registry.mjs`: the passport against the registry at
    ui-source main;
  - `scripts/gates.sh`: every gate of the set over the commit at HEAD.
- **Registry.** The registry lists 11 of the 19 names. The other 8 were
  reserved by the dispatcher in ui-control and are pending in
  `tests/set-registry.mjs`; the registry entries were ordered from the
  dispatcher (bus `msg-d5774938bd5645768fd5`). The pending list only
  shrinks: a name the registry lists fails the test until it is removed.

## The site

`site/` is a Docara 3.11.1 site laid out as ui-view's, on the set site scheme
the owner agreed on 2026-11-05:

- **Home** (`/ru/`): hero with «Начать» and «Компоненты»; eight live charts
  in Framework pill tabs, one frame (dynamics, fact and plan, structure,
  flows, schedule, load, map, indicators); the connection line as its own
  block after the examples; six advantages; a footer with version,
  compatibility, licence and links.
- **Руководство** (`/ru/guide/`): introduction, quick start, connection,
  concepts, recipes (among them «Как выбрать график»), server side,
  appearance, keyboard and accessibility, large data, upgrading, change
  history, FAQ.
- **Компоненты** (`/ru/components/`): an overview and six groups by purpose
  (dynamics and comparison, parts and structure, distribution and relation,
  processes and flows, grids and maps, indicators), a page per component.

What differs from ui-view, and why:

- **Component pages are written from the set.** `scripts/build-pages.mjs`
  takes each page's top from the component's own `docs.md`, which is
  already Russian, and its live examples from its `examples.json`. The
  reference part comes from the manifests as in ui-view. Nothing on a
  component page is typed twice; `--check` fails on drift.
- **The reference reads a build's receipt.** The set is not released, so
  `build-reference.mjs` takes `--receipt` of a gates run instead of
  `package/dist/`.
- **Placeholders as code.** A format word such as `decimal-<n>` is set as
  code, since Docara forbids raw HTML in Markdown.
- **No own section after the Guide.** ui-view adds «Поля»; the chart set
  needs none.

The site is local only: nothing is published, chart.simai.io is not set
up, and the connection line works from the set's first release, as the
site says.

## Checks

The set's gates (`package/scripts/gates.sh`) ran over commit `166cbbc`
(ui-source `ec2f29df`, pair `ui-62b1d9b6dc8d`):

| Gate | Result |
|---|---|
| Two builds | **PASS**, byte-identical, 1083 files, output manifest sha256 `d6b999d19af9725d6d2e6bd45b44cb9ce4c81b04e5bcf630097f5496032255a9` |
| Receipt | framework `ui-62b1d9b6dc8d`, package reference `set-passport`, archive sha256 `1c71e3502678c7660b2e354f64fd30238dfecd793fe2646c25ef1be3629714f8` |
| Unit suite | 160 pass, 0 fail (4 skipped: the free axes test the package half stands in for), with the 3 passport tests |
| Registry at main | 0 problems, 8 names pending |
| Manifest probes | 88/88 |
| Browser probes | pass |
| First paint | 510/510, CLS 0 |

The site was built over that build (`site/scripts/build.sh`):

- **Static check.** Docara `verify-static` passed: 47 pages, 5047 local
  references, none broken.
- **Generators.** `build-pages.mjs --check` is clean. `build-reference.mjs`
  wrote 19 pages with every manifest string translated.

The site was published to the local host ui-chart.test
(`site/scripts/publish-local.sh`), and `site/scripts/evidence.mjs` took 42
screenshots into `docs/evidence/site-2026-11-05/`:

- every home tab at 1280 and 390 px, light and dark;
- the quick start, the components overview, and the bar, Sankey and map
  pages at 1280 and 390 px.

Its findings:

- **No problems.** No page or console error. Every set element on screen is
  defined and has drawn its plot. Every home tab draws all its charts: one
  each, and four on «Показатели».
- **Reloads.** Three cold reloads of the home page each end on `/ru/` with
  11 charts and no error.

The check itself needed three fixes on the way, recorded in the script:

- it counted the charts' inner elements as charts;
- it waited for a silent network on the bar page, which has ten example
  frames;
- it asked for a live chart on the components overview, which is a table
  of links.

The verdict above comes from the final rules over the final run's
`screenshots.json`.

## For the standard

The owner wants the standard reviewed after this first pass. Points seen
while following it:

1. **Sections come before pages in the sidebar.** In the Guide, Docara lists
   the subsections («Основы», «Рецепты», «Серверная часть») above «Быстрый
   старт», whatever the order says. ui-view.test shows the same. It belongs
   to Docara or to the shared template.
2. **Component pages from the set.** A set already has a Russian `docs.md`
   and `examples.json` per component. Generating the page top and its live
   examples from them, as here, removes a second copy that would drift.
   This could join the shared template beside the reference generator.
3. **An unreleased set.** The standard's reference generator reads
   `package/dist/` of a release. A set before its first release needs a
   build's receipt. The template could accept either.
4. **Literals.** The set id is still typed in about ten places across
   `gates.sh`, the materializer, `build.sh`, `publish-local.sh` and the
   evidence script, as `SET-TEMPLATE.md` lists. Reading it from `set.json`
   would make the scripts generic.
5. **Playwright.** `gates.sh` takes the browsers path from a sibling folder
   that may hold another Playwright version. This set adds
   `PLAYWRIGHT_MODULES`; one documented way for every set would help.

