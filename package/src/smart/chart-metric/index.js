// sf-chart-metric 1.0.0: a dated alias of SIMAI Framework's sf-tile-metric
// (decision C168; docs/DECISIONS.md D19). The metric tile moved to the
// Framework as sf-tile-metric, which took over this element's settings by
// name and has a chart slot for an sf-chart-sparkline; this element is now
// its heir under the former tag, until 2027-01-01:
//
//   - the element is a subclass of the class that defines sf-tile-metric, so
//     it draws the tile's markup (.sf-tile-metric, .sf-tile-metric-*) and its
//     stylesheet; three former public variables (--sf-chart-metric-*) still
//     feed the tile's (js/templates/default.css);
//   - the former names keep working: the settings are the tile's own; the
//     state setting data-state is mapped (loading is the tile's loading,
//     empty draws no value); the tile's open event also goes out under its
//     former name sf-chart-metric-open (aliases.json, installed by the Smart
//     base);
//   - the first <sf-chart-metric> a page connects is noted in SF.deprecations
//     and named once on the console, as every dated tag alias is.
//
// The Framework's sf-tile-metric is the one source: this bundle carries none
// of its code. The rule relates cl-tile-metric, so the Loader fetches the tile
// with this element; the subclass is defined once the tile is. The same way
// sf-message-log 2.0.0 became sf-list-feed's heir (ui-source 2874cb5d).
import {noteTagAlias, registerTagAliasRows} from '../../core/js/tag-aliases.js';
import aliases from './aliases.json';
import './js/templates/default.css';

const TAG = 'sf-chart-metric';
const TO = 'sf-tile-metric';
const ROW = Object.freeze({from: TAG, to: TO, since: '2026-11-17', remove_after: '2027-01-01'});

function defineChartMetric(Tile) {
  const registry = globalThis.customElements;
  if (!Tile || !registry || registry.get(TAG)) return;

  class SfChartMetric extends Tile {
    static get aliases() {
      return aliases;
    }

    // data-state is the one former setting the tile does not have.
    static get observedAttributes() {
      return [...new Set([...super.observedAttributes, 'data-state'])];
    }

    get dataState() {
      const state = this.getAttribute('data-state');
      return ['loading', 'ready', 'empty'].includes(state) ? state : 'auto';
    }

    set dataState(value) {
      if (value === null || value === undefined || value === 'auto') this.removeAttribute('data-state');
      else this.setAttribute('data-state', String(value));
    }

    // data-state loading is the tile's loading.
    get loading() {
      return Boolean(super.loading) || this.dataState === 'loading';
    }

    set loading(value) {
      super.loading = value;
    }

    // data-state empty draws the tile without its value («—»).
    given(attribute) {
      if (attribute === 'value' && this.dataState === 'empty') return null;
      return super.given(attribute);
    }

    connectedCallback() {
      noteTagAlias(ROW);
      super.connectedCallback?.();
    }
  }

  Object.defineProperty(SfChartMetric, 'sfTagAliasOf', {value: TO});
  registry.define(TAG, SfChartMetric);
  // The row is given once the element is defined: given before the tile is,
  // the Smart base would define a bare subclass under the former tag first.
  registerTagAliasRows([ROW]);
}

const registry = globalThis.customElements;
if (registry) {
  const defined = registry.get(TO);
  if (defined) defineChartMetric(defined);
  else {
    registry.whenDefined(TO).then(defineChartMetric);
    // The rule relates cl-tile-metric; a page whose Loader has not fetched it
    // yet (the element came before its rule) asks for it here.
    globalThis.SF?.Loader?.ensure?.([TO], {timeout: Infinity});
  }
}
