# SIMAI Chart

Smart chart components for SIMAI Framework, the component package `chart`.
Read `README.md`, `docs/START.md` and `docs/STATUS.md` first.

- Write only in this repository. A missing Framework part (a token, a
  utility, a core API, a Loader change) is ordered from the SIMAI Framework
  dispatcher (work `task-fcda784dfeba45c1bf64`) through the Federation bus,
  never written in `simai/ui-source` or `simai/ui-pro` from here.
- Follow the Framework standards named in `docs/START.md`; when a standard
  and a library you study disagree, the standard wins.
- Pin exact Framework releases (`ui-<12>`, npm version, sha256); never
  `latest` or `main`.
- Own implementation only. Libraries and articles are studied for ideas; no
  code, styles or palettes are copied, and no third-party runtime dependency
  enters without a recorded owner decision.
- English in code, commits, docs and evidence; interface text RU/EN through
  dictionaries.
- No secrets, `.env`, real customer data or local paths in the repository.
- Nothing is published (package, release, docs, public repository) without
  the dispatcher's release route and, for opening the repository, the
  owner's yes.
