// The candles of a candlestick chart (docs/research/catalogue.md,
// Candlestick): each row a period with its open, high, low and close
// (parameters.md §2, OHLC). The candles stand in their periods' order, one
// beside the next, so a day without trading leaves no hole; when they are
// more than the width holds, neighbours are merged as a longer period is.
import {readNumber, readRows, readTime} from './data.js';

/**
 * The candles of rows: {xField, kind, candles, missing}. kind is 'time'
 * when every x reads as a time (the candles then go in time order), else
 * 'category'. A candle is {row, x, label, open, high, low, close, up}; a
 * row without all four prices is left out and counted. high and low are
 * held to take in the open and the close.
 */
export function ohlcRows(items, {x = '', open = 'open', high = 'high', low = 'low', close = 'close'} = {}) {
  const rows = readRows(items);
  const fields = rows.length ? Object.keys(rows[0]) : [];
  const xField = x || fields.find((name) => ![open, high, low, close].includes(name)) || '';
  const times = rows.map((row) => readTime(row[xField]));
  const kind = rows.length && times.every((time) => time !== null) ? 'time' : 'category';
  const candles = [];
  let missing = 0;
  rows.forEach((row, index) => {
    const prices = [open, high, low, close].map((name) => readNumber(row[name]));
    if (prices.some((value) => value === null)) {
      missing += 1;
      return;
    }
    const [o, h, l, c] = prices;
    candles.push({
      row: index,
      x: kind === 'time' ? times[index] : index,
      label: row[xField] === undefined || row[xField] === null ? '' : String(row[xField]),
      open: o, high: Math.max(h, o, c), low: Math.min(l, o, c), close: c, up: c >= o,
    });
  });
  if (kind === 'time') candles.sort((a, b) => a.x - b.x);
  return {xField, kind, candles, missing};
}

/**
 * Neighbouring candles merged `size` at a time, as a longer period: the
 * first's open, the last's close, the highest high, the lowest low. A
 * merged candle keeps its first's x and label, the place of its first
 * candle (`from`) and how many it holds (`count`).
 */
export function mergeCandles(candles, size) {
  if (size <= 1) return candles.map((one, index) => ({...one, from: index, count: 1}));
  const out = [];
  for (let from = 0; from < candles.length; from += size) {
    const part = candles.slice(from, from + size);
    const first = part[0];
    const last = part[part.length - 1];
    out.push({
      ...first,
      high: Math.max(...part.map((one) => one.high)),
      low: Math.min(...part.map((one) => one.low)),
      close: last.close,
      up: last.close >= first.open,
      from,
      count: part.length,
    });
  }
  return out;
}

/** The lowest low and the highest high, or null without candles. */
export function ohlcExtent(candles) {
  if (!candles.length) return null;
  let low = Infinity;
  let high = -Infinity;
  for (const one of candles) {
    if (one.low < low) low = one.low;
    if (one.high > high) high = one.high;
  }
  return [low, high];
}

/** The places of the first candle at or after each tick time, each once. */
export function tickPlaces(times, ticks) {
  const out = [];
  let at = 0;
  for (const tick of ticks) {
    while (at < times.length && times[at] < tick) at += 1;
    if (at >= times.length) break;
    if (out[out.length - 1] !== at) out.push(at);
  }
  return out;
}
