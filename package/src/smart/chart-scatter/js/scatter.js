// The points of a scatter chart (docs/research/catalogue.md, Scatter /
// bubble): one point per row, at two measures, with an optional third as a
// bubble's area. A row without both measures is no point; it is counted, so
// the summary can say how many were left out.
import {readNumber, readRows} from '../../chart-core/data.js';

/**
 * {xField, yField, bubbleField, pointField, series: [{key, name}], points, missing}.
 *
 * Each point is {row, series, x, y, size, name}: row is its place in the
 * data, size the bubble field's value (null without one), name the point
 * field's text ('' without one). Unset, x and y are the first two numeric
 * fields that name no series, point or bubble.
 */
export function scatterPoints(items, {x = '', y = '', bubble = '', series = '', point = '', names = {}} = {}) {
  const rows = readRows(items);
  const fields = rows.length ? Object.keys(rows[0]) : [];
  const numeric = fields.filter((name) => ![series, point, bubble].includes(name)
    && rows.some((row) => readNumber(row[name]) !== null));
  const xField = x || numeric[0] || '';
  const yField = y || numeric.find((name) => name !== xField) || '';
  const groups = new Map();
  const points = [];
  let missing = 0;
  rows.forEach((row, index) => {
    const px = readNumber(row[xField]);
    const py = readNumber(row[yField]);
    if (px === null || py === null) {
      missing += 1;
      return;
    }
    const key = series ? (row[series] === undefined || row[series] === null ? '' : String(row[series])) : yField;
    if (!groups.has(key)) groups.set(key, {key, name: names[key] ?? key});
    points.push({
      row: index,
      series: key,
      x: px,
      y: py,
      size: bubble ? readNumber(row[bubble]) : null,
      name: point && row[point] !== undefined && row[point] !== null ? String(row[point]) : '',
    });
  });
  return {xField, yField, bubbleField: bubble, pointField: point, series: [...groups.values()], points, missing};
}

/** [min, max] of one measure over the points, or null when there are none. */
export function measureExtent(points, measure) {
  let min = Infinity;
  let max = -Infinity;
  for (const one of points) {
    const value = one[measure];
    if (value === null) continue;
    if (value < min) min = value;
    if (value > max) max = value;
  }
  return min === Infinity ? null : [min, max];
}

/** The least-squares line {slope, intercept, r} of the points, or null under three points or with no spread. */
export function linearFit(points) {
  const n = points.length;
  if (n < 3) return null;
  let sx = 0;
  let sy = 0;
  for (const one of points) {
    sx += one.x;
    sy += one.y;
  }
  const mx = sx / n;
  const my = sy / n;
  let xx = 0;
  let yy = 0;
  let xy = 0;
  for (const one of points) {
    const dx = one.x - mx;
    const dy = one.y - my;
    xx += dx * dx;
    yy += dy * dy;
    xy += dx * dy;
  }
  if (xx === 0 || yy === 0) return null;
  const slope = xy / xx;
  return {slope, intercept: my - slope * mx, r: xy / Math.sqrt(xx * yy)};
}

/** How strong a correlation reads: none under 0.1, weak under 0.3, moderate under 0.7, else strong. */
export function strengthOf(r) {
  const size = Math.abs(r);
  if (size < 0.1) return 'none';
  if (size < 0.3) return 'weak';
  if (size < 0.7) return 'moderate';
  return 'strong';
}

/**
 * A bubble's radius: its area is in proportion to the value, against the
 * largest value, which takes `largest` px. A value of zero, below zero or
 * missing has no area and is drawn at `least` px, hollow.
 */
export function bubbleRadius(value, top, {least = 2, largest = 24} = {}) {
  if (value === null || !(value > 0) || !(top > 0)) return least;
  return Math.max(least, largest * Math.sqrt(value / top));
}

/** The points' places in reading order: by x, then by y. */
export function readingOrder(points) {
  return points.map((_, index) => index).sort((a, b) => points[a].x - points[b].x || points[a].y - points[b].y);
}

/**
 * The next cursor for a key, or null when the key is not the cursor's. The
 * cursor is a place in `order` (the reading order). Left and Right go to the
 * point before and after in that order, so every point is reached; Up and
 * Down to the nearest point above or below on the plot (`at`, the points'
 * [x, y] in px, y down), sideways distance counted twice; Home and End to the
 * ends; Page Up and Page Down a tenth. Past `bucketFrom` points Left and
 * Right move a hundredth.
 */
export function moveScatter(cursor, key, {order, at, bucketFrom = 200}) {
  const count = order.length;
  if (!count) return null;
  const clamp = (place) => Math.max(0, Math.min(count - 1, place));
  if (cursor === null && ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(key)) return 0;
  const from = cursor ?? 0;
  const step = count > bucketFrom ? Math.ceil(count / 100) : 1;
  const page = Math.max(1, Math.round(count / 10));
  switch (key) {
    case 'ArrowRight': return clamp(from + step);
    case 'ArrowLeft': return clamp(from - step);
    case 'Home': return 0;
    case 'End': return count - 1;
    case 'PageDown': return clamp(from + page);
    case 'PageUp': return clamp(from - page);
    case 'ArrowUp':
    case 'ArrowDown': {
      const [cx, cy] = at[order[from]];
      const up = key === 'ArrowUp';
      let best = from;
      let bestScore = Infinity;
      order.forEach((index, place) => {
        const [px, py] = at[index];
        if (up ? py >= cy : py <= cy) return;
        const score = Math.abs(py - cy) + 2 * Math.abs(px - cx);
        if (score < bestScore) {
          bestScore = score;
          best = place;
        }
      });
      return best;
    }
    default: return null;
  }
}

/** The place of the point nearest to (x, y) px within `reach` px, or -1. */
export function nearestPoint(at, x, y, reach = Infinity) {
  let best = -1;
  let bestDistance = reach * reach;
  at.forEach(([px, py], index) => {
    const distance = (px - x) ** 2 + (py - y) ** 2;
    if (distance <= bestDistance) {
      bestDistance = distance;
      best = index;
    }
  });
  return best;
}
