// sf-chart-metric: one number that matters, with its change, its limit and its
// status (docs/DECISIONS.md D1; docs/research/parameters.md §15). The
// catalogue's KPI and Larena's metric tile: server load, storage, traffic,
// queue depth, licence limits.
//
// The element formats the value (chart-core/format), works out the change
// from the previous value when the page gives no delta, and draws the limit
// as a meter with sf-progress-bar's look. The meaning of a change (is up
// good?) and the status are the page's; the tile never infers them.
//
// It renders into its own light DOM, like every Smart component.
import SfBaseElement from '../../core/js/smart-base';
import {elementFromManifest} from '../../core/js/element-manifest';
import {pageLocale} from '../../core/js/page-language';
import {formatNumber} from '../chart-core/format.js';
import {renderChartMetricTemplate} from './js/templates/default';
import manifest from './component.json';
import en from './lang/en.json';
import ru from './lang/ru.json';

const ChartMetricElement = elementFromManifest(manifest, {
  base: SfBaseElement,
  lang: {en, ru},
  source: 'ru',
});

let instances = 0;

class SfChartMetric extends ChartMetricElement {
  static get props() {
    return {...super.props, rootClass: {default: ''}};
  }

  onConnected() {
    this._uid = this.id || `sf-chart-metric-${(instances += 1)}`;
  }

  words(key, vars) {
    return this.sfWord(key, vars ? {vars} : undefined);
  }

  // A number setting holds only when the page set it: an unset number reads 0.
  given(name, attribute) {
    return this.hasAttribute(attribute) && Number.isFinite(this[name]) ? this[name] : null;
  }

  state() {
    const asked = this.dataState;
    if (asked && asked !== 'auto') return asked;
    return this.given('value', 'value') === null ? 'empty' : 'ready';
  }

  say(value, format = this.format) {
    return formatNumber(value, pageLocale(this), format, {gap: this.words('no-value')});
  }

  // The change against the previous period: given as delta, or worked out
  // from previous. Its tone follows its meaning (better), not its sign.
  change(value) {
    const previous = this.given('previous', 'previous');
    let change = this.given('delta', 'delta');
    if (change === null && previous !== null && value !== null) change = value - previous;
    if (change === null) return null;
    const base = previous ?? (value !== null ? value - change : null);
    const share = base ? change / Math.abs(base) : null;
    const direction = change > 0 ? 'up' : change < 0 ? 'down' : 'flat';
    const tone = direction === 'flat' || this.better === 'none' ? 'neutral' : direction === this.better ? 'positive' : 'negative';
    const sign = change > 0 ? '+' : change < 0 ? '−' : '';
    const absolute = `${sign}${this.say(Math.abs(change))}`;
    const percent = share === null ? '' : `${sign}${formatNumber(Math.abs(share), pageLocale(this), 'percent')}`;
    const text = this.deltaFormat === 'absolute' || !percent ? absolute
      : this.deltaFormat === 'both' ? `${percent} (${absolute})` : percent;
    return {direction, tone, text, word: this.words(`change-${direction}`)};
  }

  // The limit as a meter: «45 ГБ из 100 ГБ», 45 %.
  meter(value) {
    const max = this.given('max', 'max');
    if (max === null || max <= 0 || value === null) return null;
    const text = this.limitText || this.words('limit', {value: this.say(value), max: this.say(max)});
    return {
      max,
      value: Math.max(0, Math.min(max, value)),
      percent: Math.round(Math.max(0, Math.min(1, value / max)) * 100),
      text,
      said: text,
      name: this.words('limit-name', {label: this.label || this.words('untitled')}),
      status: this.status,
    };
  }

  open() {
    this.sfEmit('open', {});
  }

  templateContext() {
    const state = this.state();
    const value = state === 'ready' ? this.given('value', 'value') : null;
    const target = this.href ? 'link' : this.openable ? 'button' : '';
    return this.createTemplateContext({
      ...this.getPropsContext(),
      component: this,
      uid: this._uid,
      size: this.size,
      state,
      target,
      href: this.href,
      label: this.label || this.words('untitled'),
      valueText: state === 'empty' ? this.words('no-value') : this.say(value),
      delta: state === 'ready' ? this.change(value) : null,
      periodText: this.periodText,
      meter: state === 'ready' ? this.meter(value) : null,
      status: this.status,
      statusWord: this.status === 'neutral' ? '' : this.words(`status-${this.status}`),
      hint: this.hint,
      hasChart: this.hasSlotContent?.('chart') ?? false,
      chart: this.hasSlotContent?.('chart') ? this.getSlotContent('chart') : null,
      rootClass: this.getRootClass(),
    });
  }

  template() {
    return renderChartMetricTemplate(this.templateContext());
  }
}

SfChartMetric.define('sf-chart-metric');
