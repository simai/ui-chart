// The steps of a waterfall chart (docs/research/catalogue.md, Waterfall):
// how a start value becomes an end value through positive and negative
// changes. Each row is a change from the running total, or a total that
// stands on zero; a closing total is added when the last row is not one.
import {readNumber, readRows} from '../../chart-core/data.js';

const TRUE = new Set(['true', 'yes', '1', 'да']);

/** Whether a total field's value marks its row as a total. */
export function isTotal(value) {
  if (value === true) return true;
  if (typeof value === 'number') return value !== 0;
  return typeof value === 'string' && TRUE.has(value.trim().toLowerCase());
}

/**
 * The steps of rows: {xField, yField, steps, missing, start, finish}. A
 * step is {row, label, value, kind, from, to}: kind 'up' or 'down' for a
 * change from the running total (from) to the new one (to), 'total' for a
 * bar from zero to the total. A total row without a value takes the
 * running total; with one, the running total starts again from it. A
 * change row without a value is left out and counted. With `end`, a total
 * labelled `endLabel` closes the steps unless the last is a total already;
 * it has row -1.
 */
export function waterfallSteps(items, {x = '', y = '', total = 'total', end = true, endLabel = ''} = {}) {
  const rows = readRows(items);
  const fields = rows.length ? Object.keys(rows[0]) : [];
  const xField = x || fields.find((name) => name !== y && name !== total) || '';
  const yField = y || fields.find((name) => name !== xField && name !== total && rows.some((row) => readNumber(row[name]) !== null)) || '';
  const steps = [];
  let missing = 0;
  let level = 0;
  rows.forEach((row, index) => {
    const label = row[xField] === undefined || row[xField] === null ? '' : String(row[xField]);
    const value = readNumber(row[yField]);
    if (isTotal(row[total])) {
      if (value !== null) level = value;
      steps.push({row: index, label, value: level, kind: 'total', from: 0, to: level});
      return;
    }
    if (value === null) {
      missing += 1;
      return;
    }
    steps.push({row: index, label, value, kind: value < 0 ? 'down' : 'up', from: level, to: level + value});
    level += value;
  });
  if (end && steps.length && steps[steps.length - 1].kind !== 'total') {
    steps.push({row: -1, label: endLabel, value: level, kind: 'total', from: 0, to: level, added: true});
  }
  const first = steps[0];
  const start = first ? (first.kind === 'total' ? first.to : first.from) : 0;
  return {xField, yField, steps, missing, start, finish: level};
}

/** The lowest and highest level the steps reach, zero always in. */
export function waterfallExtent(steps) {
  let low = 0;
  let high = 0;
  for (const one of steps) {
    low = Math.min(low, one.from, one.to);
    high = Math.max(high, one.from, one.to);
  }
  return [low, high];
}
