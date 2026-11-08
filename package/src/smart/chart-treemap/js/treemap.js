// The parts of a treemap (docs/research/catalogue.md, Treemap): values as
// areas of rectangles that tile a box, one level or two (parts in groups).
// The rectangles are laid out squarified -- each row of them along the
// shorter side, kept while it makes their worst aspect ratio no worse
// (Bruls, Huizing and van Wijk, 2000) -- so they stay near square and an
// area is easy to compare.
import {readNumber, readRows} from '../../chart-core/data.js';

/**
 * The parts of rows: {xField, yField, groupField, groups, missing, dropped,
 * total}. A group is {key, value, leaves}, a leaf {row, label, value, group};
 * the groups go largest first and so do the leaves in each. Without a group
 * field every leaf is in one group whose key is ''. A row without a value is
 * left out as missing, one with zero or less as dropped: an area cannot show
 * it.
 */
export function treemapRows(items, {x = '', y = '', group = ''} = {}) {
  const rows = readRows(items);
  const fields = rows.length ? Object.keys(rows[0]) : [];
  const xField = x || fields.find((name) => name !== y && name !== group) || '';
  const yField = y || fields.find((name) => name !== xField && name !== group && rows.some((row) => readNumber(row[name]) !== null)) || '';
  const byKey = new Map();
  let missing = 0;
  let dropped = 0;
  rows.forEach((row, index) => {
    const value = readNumber(row[yField]);
    if (value === null) {
      missing += 1;
      return;
    }
    if (value <= 0) {
      dropped += 1;
      return;
    }
    const key = group && row[group] !== undefined && row[group] !== null ? String(row[group]) : '';
    if (!byKey.has(key)) byKey.set(key, {key, value: 0, leaves: []});
    const one = byKey.get(key);
    one.value += value;
    one.leaves.push({row: index, label: row[xField] === undefined || row[xField] === null ? '' : String(row[xField]), value, group: key});
  });
  const groups = [...byKey.values()].sort((a, b) => b.value - a.value);
  for (const one of groups) one.leaves.sort((a, b) => b.value - a.value);
  const total = groups.reduce((sum, one) => sum + one.value, 0);
  return {xField, yField, groupField: group, groups, missing, dropped, total};
}

// The worst aspect ratio of a row of areas laid along a side of `side`.
function worst(sum, max, min, side) {
  const square = side * side;
  return Math.max((square * max) / (sum * sum), (sum * sum) / (square * min));
}

/**
 * Rectangles {x, y, w, h} that tile `box` in proportion to `values`, in
 * their order (largest first reads best). Each row goes along the box's
 * shorter side and takes the next value while that does not worsen its
 * worst aspect ratio.
 */
export function squarify(values, {x, y, w, h}) {
  const total = values.reduce((sum, value) => sum + value, 0);
  if (!(total > 0) || w <= 0 || h <= 0) return values.map(() => ({x, y, w: 0, h: 0}));
  const scale = (w * h) / total;
  const areas = values.map((value) => value * scale);
  const out = [];
  const rest = {x, y, w, h};
  let at = 0;
  while (at < areas.length) {
    const side = Math.min(rest.w, rest.h);
    const row = [areas[at]];
    let sum = areas[at];
    at += 1;
    while (at < areas.length) {
      const next = areas[at];
      const before = worst(sum, Math.max(...row), Math.min(...row), side);
      const after = worst(sum + next, Math.max(...row, next), Math.min(...row, next), side);
      if (after > before) break;
      row.push(next);
      sum += next;
      at += 1;
    }
    // The row is a column at the left when the box is wide, a strip at the
    // top when it is tall.
    if (rest.w >= rest.h) {
      const width = rest.h ? sum / rest.h : 0;
      let top = rest.y;
      for (const area of row) {
        const height = width ? area / width : 0;
        out.push({x: rest.x, y: top, w: width, h: height});
        top += height;
      }
      rest.x += width;
      rest.w -= width;
    } else {
      const height = rest.w ? sum / rest.w : 0;
      let left = rest.x;
      for (const area of row) {
        const width = height ? area / height : 0;
        out.push({x: left, y: rest.y, w: width, h: height});
        left += width;
      }
      rest.y += height;
      rest.h -= height;
    }
  }
  return out;
}

// A rectangle drawn `by` px inside its place, never below nothing.
const inset = (box, by) => ({x: box.x + by, y: box.y + by, w: Math.max(0, box.w - by * 2), h: Math.max(0, box.h - by * 2)});

/**
 * The groups and the leaves laid out in `box`: a group's rectangle in its
 * share of the box, its leaves in its share of the group. With more than one
 * group, a group whose rectangle is tall enough keeps a band of `header` px
 * at its top for its name. Every rectangle is drawn `gap` / 2 inside its
 * place, so neighbours stand `gap` apart. The leaves come out in the
 * groups' order, then their own: the order the keyboard walks.
 */
export function treemapLayout(groups, box, {gap = 2, header = 0} = {}) {
  const half = gap / 2;
  const places = squarify(groups.map((one) => one.value), box);
  const outGroups = [];
  const leaves = [];
  groups.forEach((one, place) => {
    const frame = inset(places[place], groups.length > 1 ? half : 0);
    const named = groups.length > 1 && header > 0 && frame.h >= header * 2.5 ? header : 0;
    const area = {x: frame.x, y: frame.y + named, w: frame.w, h: Math.max(0, frame.h - named)};
    outGroups.push({...one, place, ...frame, header: named ? {x: frame.x, y: frame.y, w: frame.w, h: named} : null});
    squarify(one.leaves.map((leaf) => leaf.value), area).forEach((rect, index) => {
      leaves.push({...one.leaves[index], place: place, ...inset(rect, half)});
    });
  });
  return {groups: outGroups, leaves};
}
