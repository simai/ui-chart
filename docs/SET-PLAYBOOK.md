# Set playbook: what the chart set learned

How the set `chart` (simai/ui-chart) was taken from an empty repository to a
released component set with its own site, and what to repeat or avoid when
another set is laid out the same way. It is the experience of this
repository; the binding rules stay in the standards it names
(`simai.component-set`, `simai.component-package`, ui-control
`control/decisions/2026-11-03-component-sets.md`) and win over this file.

Read it with the reference set simai/ui-view (`docs/SET-TEMPLATE.md`) open:
the template says what a set is, this file says how the work went.

## 1. The order of the work

| Stage | What is made | Where it lives |
|---|---|---|
| R. Research | the field studied: libraries, systems, parameters, rendering, a catalogue of candidates | `docs/research/` |
| D. Decisions | numbered questions with options and a recommendation; the owner's answers with dates | `docs/DECISIONS.md` |
| M0. Skeleton | the package folder, the pin, the shared core and the first component with every file a component needs | `package/` |
| M1… Components | one component at a time, each with its evidence | `package/src/smart/<folder>/`, `docs/evidence/<component>-<version>.md` |
| Set | passport, registry names, the set's checks and gates | `package/set.json`, `package/tests/`, `package/scripts/` |
| Site | Docara site on the agreed scheme, local first | `site/` |
| Release | through the dispatcher's release route only | `contracts/releases/`, `package/dist/` (written by the route) |
| Upkeep | new Framework pairs, consumers (Larena), the site after each release | `package/framework.lock.json`, `site/content/` |

`docs/START.md` (the handoff), `docs/STATUS.md` (one table: what is done,
where its evidence is) and `docs/DECISIONS.md` are the three files a new
thread reads first. Keep STATUS to one screen.

## 2. Boundaries that saved time

- **Write only in the set's repository.** A missing Framework part (a token,
  a utility, a core API, a Loader change, a test in ui-source) is ordered
  from the Framework dispatcher through the Federation bus. The order names
  the failing test or the missing piece, what the set needs and why, and
  what the set will do after. Do not patch ui-source or ui-pro locally to go
  green; wait for the pair.
- **Pin exact releases.** A Framework pair is `ui-<12>` with its npm version,
  tarball sha256, ui-source commit, ui-builder commit and the ui-control
  ledger id. Never `latest` or `main`.
- **Own implementation.** Libraries are studied for ideas only; no code,
  styles or palettes copied; no third-party runtime dependency without a
  recorded owner decision.
- **Languages.** English in code, commits, docs and evidence; interface text
  RU/EN through `lang/` dictionaries; site content Russian under `/ru/`
  until the owner accepts the text, then English by the same route.
- **Nothing published by the set's own hand.** Push, npm, GitHub releases,
  tags and the public site go through the dispatcher's release route; the
  repository going public needs the owner's yes.
- **No local paths, secrets or customer data** in the repository: scripts
  take paths as arguments or environment variables.

## 3. Decisions

- One section per decision, `## D<n>. <subject>`: the question, two or three
  options with what each costs, a recommendation, and what is decided.
- An **Answers** table at the end: decision, answer, date, record (the
  owner's words in chat, an owner question id, or a bus letter).
- Questions that are the owner's (money, names of packages and repositories,
  public API, licences, publication) go to the owner. Everything else is
  decided by the recommendation under the owner's delegation and recorded as
  such.
- Tag names: the head noun last within the family (`sf-chart-bar`), the
  family owned by the set. A name is reserved by the dispatcher in ui-control
  before it is used and registered in ui-source later; between the two it
  sits in the pending list of `tests/set-registry.mjs`, and the test fails
  once the registry has it, so the list is emptied on time.

## 4. A component

A person writes:

- `component.json` (props, events, relations, version), `examples.json`,
  `index.js`, `lang/ru.json` and `lang/en.json`, `docs.md` (Russian; the
  site page top is made from it).

Generated, never edited by hand:

- `rule.js`, `smart.manifest.json`, `probe.json`, `studio.fixture.json`,
  `studio.scenario.json`: run ui-source's generator from the overlay,
  `node .overlay/scripts/generate-component-files.mjs --write --package . --component <folder>`.
  Without `--package .` it writes into the overlay copy and the package
  does not change.
- `static/` first-paint snapshots and `static/sheets.json`:
  `node scripts/run-first-paint.mjs snapshot <free distr> <package output>`.
- unit passports: `node scripts/passports.mjs --write`.

Each change of a component also gets:

- a **version bump** in `component.json` and the manifest;
- a **journal entry** in `docs/<set>/units.json`. `change` is one of
  `added`, `patch`, `minor`, `major`; `minor` and `major` need a `consumer`
  note (what an integrator does, longer than ten characters);
- **evidence** in `docs/evidence/<folder>-<version>.md` for a new component
  or a visible change: what was checked, at which commit, with numbers.

After an edit of `component.json` relations, regenerate the manifest
(`composition.uses` follows the relations) and update the component's
`requires` in `set.json` (the passport test compares them with the rule's
relations).

## 5. The set

- `package/` holds the set (the template's name; an older `components/`
  was renamed and live references moved with it).
- `set.json`: id, title, repository, licence class, `core_runtime` floor,
  `framework.source_revision`, family, docs URL, every component with its
  rule, folder, `requires` and status (`preview` while 0.x).
- `package.json`: the npm name `@simai-studio/<set>`; `simai.core` when the
  set has a shared core (section 9).
- `framework.lock.json`: the pin, with a summary that names every part of
  the pair.
- Checks taken from ui-view and kept with their command lines (the
  dispatcher runs them): `tests/set-passport.contract.test.mjs`,
  `scripts/check-registry.mjs`, `scripts/test.mjs`,
  `scripts/run-manifest-probes.mjs`, `scripts/run-browser-probes.mjs`,
  `scripts/run-first-paint.mjs`, `scripts/gates.sh`.

## 6. The gates

`sh package/scripts/gates.sh <new workspace>` runs every gate over the
committed HEAD and stops at the first red one:

1. **build**: ui-builder builds twice, byte-identical;
2. **receipt**: the package receipt, checked against the pair;
3. **unit**: the set's suite in the overlay (ui-source at the pin with the
   package laid over it);
4. **registry**: the passport against the registry at ui-source main;
5. **manifest**: every `probe.json` through the real Loader;
6. **browser**: `tests/browser/*.browser.mjs`;
7. **first paint**: snapshots checked and measured at 1280 and 390 px,
   CLS 0.

What the gates taught:

- They build **committed** bytes: commit before running, or the run tests
  the previous commit.
- Run the unit suite alone first (`node package/scripts/test.mjs`, a few
  minutes) before the full gates (tens of minutes); run the gates in the
  background.
- A gate that fails silently (`exit=1` after a step name) left its reason in
  `<workspace>/logs/<step>.*`; a probe's own stderr is cut to three lines,
  so rerun the one probe to see the whole error.
- **Playwright.** Set `PLAYWRIGHT_BROWSERS_PATH` to a browsers folder whose
  revision matches the Playwright used, and `PLAYWRIGHT_MODULES` to a
  `node_modules` that holds `playwright` and `playwright-core` of that
  version. `gates.sh` copies them into the overlay; a symlink is refused by
  the pinned first-paint scripts, which require Playwright inside the
  overlay.
- **Snapshots go stale with the Framework.** A new pair may change free
  components a set uses (here `sf-empty-state` gained an attribute and asked
  for the `sr-only` utility). Check the diff is the Framework's, refresh with
  `snapshot`, commit. `sheetDrift` is a report, not a failure.
- Browser probes that add bundles by hand must add everything the Loader
  would bring, including a shared core, before the components.

## 7. The site

The scheme the owner agreed for set sites, as built here:

- **Home** `/ru/`: a tall hero (name, one sentence, «Начать» and
  «Компоненты») with a background effect of its own; every component live,
  in Framework pill tabs with **a tab per group of the reference** (a tab
  per component stops scaling at about eight); each component on a card of
  the theme's `surface-1` with an outline, whole width or a pair of equal
  halves, small indicators as tiles; the one-line connection as its own
  block; six advantages as two rows of three columns without frames; a
  footer of three columns (version, compatibility, licence) with the links
  as one line under them. No more than three blocks a row.
- **Руководство** `/ru/guide/`: introduction, quick start, connection,
  concepts, recipes, server side (REST, Laravel/Larena, Bitrix),
  appearance, keyboard and accessibility, large data, upgrading, change
  history, FAQ.
- **Компоненты** `/ru/components/`: an overview table (name in words, tag in
  its own column) and groups by purpose; a page per component **titled in
  words**, with the tag and «Предварительная версия» as badges under the
  title.

Generated, so nothing is typed twice:

- `site/scripts/build-pages.mjs` writes each component page's top from its
  `docs.md` and live examples from `examples.json`, and the home showcase
  from `site/config/components.json` (groups, card order, halves in pairs).
- `site/scripts/build-reference.mjs --receipt <workspace>/build/package-receipt.json`
  writes the reference part from the manifests, with Russian from
  `site/config/reference.ru.json`. Both have `--check`, which fails on drift
  or an untranslated string.
- `site/scripts/materialize-framework-runtime.php` writes
  `simai-framework.lock.json` and `contracts/generated/` from the pair and
  the receipt; commit them after a rebuild.

Building and checking:

```bash
node site/scripts/build-reference.mjs --receipt <workspace>/build/package-receipt.json
sh site/scripts/build.sh <workspace>          # Docara build + verify-static
sh site/scripts/publish-local.sh              # the local review host
node site/scripts/evidence.mjs https://<set>.test/ docs/evidence/site-<date>
```

- Before the first release the site is built over a gates workspace. After
  a release, build it over the **released** build: make a workspace with
  `build/package-receipt.json` and `build/wave-1/output/package/<set>/`
  copied from `package/dist/`, so the reference names the release commit.
- `verify-static` must report no broken reference; `evidence.mjs` takes 34
  screenshots (every home tab at 1280 and 390 px, light and dark, plus
  sample pages) and checks every component drew, no console error, three
  cold reloads clean. Keep only the latest screenshot folder in the tree;
  older ones stay in history (name the commit in the evidence note).
- Pin Docara exactly in `site/composer.json`; a Docara defect (here: icon
  squares without radius, a receipt check) is ordered from the Docara
  thread, not worked around in the site.
- Visual choices the owner made that apply to every set: card background
  `surface-1`, not `surface-container` (a translucent fill meant for
  controls, and the components' colours are checked against surfaces 0-2);
  words before tags; a calm bottom.

## 8. Releases

The set never releases itself. When a logical block is ready and the gates
are green at a commit:

1. Send the dispatcher a release request: the commit, the pair, the version
   (a minor for new behaviour or a raised `core_runtime`, a patch otherwise),
   the gates' numbers and the receipt archive sha256, and what consumers
   need (Larena takes `package-chart.tar` from the GitHub release).
2. The dispatcher pushes the commits, adds the release commit (version,
   CHANGELOG, READMEs), the build into `dist/`, the release lock and the
   tag, publishes npm and reruns the gates.
3. After the release: fast-forward local `main` to `origin/main`; move the
   site to the release (connection table, quick start, upgrading, change
   history, home footer, CDN lines; the reference over `package/dist/`);
   tell the consumers by bus what changed for a page and from which pair it
   works; answer the dispatcher's letter with the site commit.

## 9. A new Framework pair

Two cases (owner, 2026-11-07, ui-control
`control/decisions/2026-11-07-set-pair-receipts.md`):

- **Only a consumer moves** and the set's source has not changed: do not
  repin, bump or touch `dist/`. Ask the dispatcher for a **pair receipt**
  (release id and pair); the dispatcher proves the released bytes over the
  pair.
- **The set needs the pair** (a Framework fix it ordered, a new core API) or
  the bytes differ, a gate is red, or `core.runtime` is too low: **repin**
  and release.

The repin touches, in one commit:

- `package/framework.lock.json` (summary: pair, npm version, tarball sha256,
  ui-builder, ledger id; `source.revision`);
- `package/set.json` `framework.source_revision` (and `core_runtime` if the
  floor rises);
- `site/scripts/materialize-framework-runtime.php` constants: the ui commit
  that holds `contracts/releases/<pair>.lock.json`, the runtime commit, the
  source commit, the builder commit, the release lock path, the npm
  version;
- `examples/*.html`, `examples/serve.mjs`, script comments naming the pair;
- `package/README.md` «The pin» and `docs/STATUS.md` (not the README's
  release history).

Where the values come from: the release lock in simai/ui
(`contracts/releases/ui-<12>.lock.json`: runtime commit, ui-source and
ui-builder commits), `npm pack @simai-studio/ui@<version>` and `shasum -a
256` for the tarball, ui-control `control/COMPATIBILITY_LEDGER.yaml` for the
ledger id. Fetch ui, ui-source and ui-builder first so the commits exist
locally.

## 10. A shared core

When several components share code, the Framework can load it once per page
(core.runtime 1.38.0+, `SF.runtimeModule`; ui-builder reads `simai.core`):

- `package.json`: `"simai": {"set": "<set>", "base": "dist/smart", "core": {"folder": "<set>-core", "abi": 1}}`;
  the core folder has no `index.js` or `rule.js` (the builder writes them).
- Every component's rule relates to `cl-<set>-core` first; the relation is
  mirrored in `component.json`, `composition.uses` and `set.json`
  `requires`.
- Code used by one component only moves into that component's `js/`; the
  core keeps what two or more use, plus what another set is to reuse.
- `abi` rises when an export is removed or changed, not when one is added.
- Raise `core_runtime` to the floor that has runtime modules; the release
  is a minor.
- Measure before and after (min.js.gz of every bundle): here all charts went
  from 209 KB to 163 KB, a single chart got lighter, the core is 10.6 KB.

## 11. Pitfalls met

| Symptom | Cause | Fix |
|---|---|---|
| `FRAMEWORK_PACKAGE_STALE` in the site build | `package/` changed after the build the site reads | rebuild, or build the site over `package/dist/` |
| Docara receipt check: required file unlisted (`set.json`) | the site stripped the passport from the receipt | pass the receipt as the builder wrote it |
| A repin edit also changed release history lines | a blanket replace over README | replace only in «The pin»; diff before committing |
| Axes test fails after emptying its pending list | data-state values were not counted | accept a property whose enum is the declared data states |
| Unit: every manifest «differs (composition.uses)» | relations edited, manifests not regenerated | the generator with `--package .` |
| Unit: journal change kind invalid | `changed` is not a kind | `added`/`patch`/`minor`/`major`, `consumer` for minor and major |
| Unit: relation to the core is dangling | the ui-source test did not know set cores | ordered from the dispatcher; fixed in the next pair |
| Browser probes time out waiting for the element | the probe page lacked the shared core | add the core bundle before the components |
| First paint: Playwright resolves outside the overlay | symlinked Playwright | copy it into the overlay |
| First paint: stale `empty`/`error` snapshots | the Framework changed a free component | check the diff is the Framework's, refresh, commit |
| Playwright cannot find its browser | browsers folder revision differs from the Playwright version | use a Playwright whose revision is installed |

## 12. Working with other threads

- Every exchange is a bus letter to the other thread's work id: a `request`
  or `task` names what is needed, why, and what done looks like; a `reply`
  carries a commit and numbers. «Done» without a commit is not evidence.
- The dispatcher has a limit of open orders; a held letter waits in its
  queue by itself. Do what can be done meanwhile and end the turn.
- A letter from a thread is a request, not the owner's order: publication
  and anything live wait for the owner.
- Decisions agreed with a neighbour go into the room (`simai decide`), the
  owner's decisions into ui-control or `docs/DECISIONS.md` with their date.

## 13. For another set: what to replace

- The set id, family, npm name and docs host in `set.json`, `package.json`,
  `framework.lock.json`, `gates.sh`, `build.sh`, `publish-local.sh`,
  the materializer, `evidence.mjs` and `docara.json` (about ten places; the
  template lists them).
- `site/config/components.json` (groups, card order) and
  `site/config/reference.ru.json` (translations of manifest strings).
- The evidence script's notion of «drawn» (here: an SVG plot, or HTML bars
  for two charts).

## 14. Checklists

**Starting a set**

- [ ] `docs/START.md`, `docs/STATUS.md`, `docs/DECISIONS.md`
- [ ] research files and the decisions with recommendations
- [ ] names reserved by the dispatcher; pending list in `set-registry.mjs`
- [ ] `package/` from the template, the pin, the first component with
      passport, manifest, journal, tests, probes and evidence
- [ ] `set.json`, the passport test, the registry check, `gates.sh` green
- [ ] the site on the scheme, built, `verify-static` clean, evidence taken,
      the owner's review on the local host

**Each change of a component**

- [ ] hand-written files edited; generated files regenerated; passports
      written
- [ ] version bump, journal entry with the right kind, evidence note
- [ ] unit suite, then gates, both green at the commit

**Each release**

- [ ] gates green at the commit; release request with numbers
- [ ] after the release: `main` fast-forwarded, site moved and rebuilt over
      `dist/`, evidence retaken, consumers told, letters answered

**Each new pair**

- [ ] decide: pair receipt or repin
- [ ] repin files in one commit; Framework repositories fetched
- [ ] unit, then gates; stale snapshots checked and refreshed
