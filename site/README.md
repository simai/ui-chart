# The site of the set chart

Documentation and demonstrations of SIMAI Chart, built with Docara 3.11.1
(`composer.json` pins it). Its live examples run the set's own build over the
SIMAI Framework pair the set is built on. The layout follows the set site
scheme the owner agreed on 2026-11-05 (ui-control
`control/decisions/2026-11-03-component-sets.md`, «The set site») and the
reference set site of simai/ui-view (`docs/SET-TEMPLATE.md` there):

- **Home** (`/ru/`): hero (name, sentence, two buttons), every chart of the
  set in Framework pill tabs, a tab per group of the reference (one frame,
  `examples/home/showcase/`, written by `scripts/build-pages.mjs` from
  `config/components.json`), the one-line connection, advantages in three
  columns and a footer with version, compatibility and licence.
- **Руководство** (`/ru/guide/`): introduction, quick start, connection, core
  concepts, recipes, server side (REST, Laravel/Larena, Bitrix), appearance,
  keyboard and accessibility, large data, upgrading, change history, FAQ.
- **Компоненты** (`/ru/components/`): the reference, by purpose
  (`config/components.json`). A page is titled in words, with the tag and
  the state as badges. Each page is written from the set itself: the
  top from the component's `docs.md` with its live examples from
  `examples.json` (`scripts/build-pages.mjs`), the reference part between
  `## Параметры` and `## См. также` from its manifest
  (`scripts/build-reference.mjs`).

```bash
sh package/scripts/gates.sh <workspace>     # build and check the set
node site/scripts/build-pages.mjs           # rewrite the component pages and their examples
node site/scripts/build-reference.mjs --receipt <workspace>/build/package-receipt.json
sh site/scripts/build.sh <workspace>        # build the site over that build
node site/scripts/serve.mjs                 # http://127.0.0.1:8790/
sh site/scripts/publish-local.sh            # copy the build to ~/Sites/ui-chart.test
node site/scripts/evidence.mjs https://ui-chart.test/ docs/evidence/site-<date>
```

`build-pages.mjs --check` and `build-reference.mjs --check` fail on drift
(and the latter on a manifest string without a translation).

- `content/ru/` — the pages; `examples/` — the live examples.
- `config/reference.ru.json` — Russian for every manifest string the
  reference shows (`css:<variable>` keys for CSS variables).
- `scripts/landing-transform.mjs` — hides the code tabs of the home page's
  live example in the local review copy only (`publish-local.sh`), as in
  ui-view (Docara requests 14 and 15 there).
- `simai-framework.lock.json` and `contracts/generated/` are written by
  `scripts/materialize-framework-runtime.php` (the pair the set build names and
  the set's receipt); commit them after a rebuild.
- `vendor/`, `.docara/`, `.framework/` and `build_production/` are local.
- The site is not deployed anywhere; chart.simai.io is not set up. The set is
  not released: the connection line works from its first release.

## Languages

Content is Russian only, under the locale prefix `/ru/` (`docara.json`:
`ru` with `public_prefix: "ru"`, `locale_routing` `prefixed`, `root:
"redirect"`). English is added by the same route as in ui-view's site
README, once the owner has accepted the Russian text; the site is not
published outside before its English translation exists.
