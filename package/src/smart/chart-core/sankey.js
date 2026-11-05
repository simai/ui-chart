// The flows of a Sankey diagram (docs/research/catalogue.md, Sankey):
// quantities flowing between stages or categories, the flow data shape of
// docs/research/parameters.md §2.1 (source, target, value). The nodes stand
// in columns by their longest path from a node that nothing flows into;
// a band joins two nodes and is as wide as its flow. Own implementation:
// the columns, the order in each by the weighted middle of the neighbours,
// the bands' places along their nodes.
import {readNumber, readRows} from './data.js';

const text = (value) => (value === undefined || value === null ? '' : String(value));

/**
 * The flows of rows: {sourceField, targetField, valueField, nodes, links,
 * total, missing, dropped, looped}.
 *
 * A node is {key, place, in, out, value, column, links: {in, out}}, in the
 * order the rows first name it; `value` is the larger of what comes in and
 * what goes out. A link is {row, index, source, target, value} with the
 * nodes' places; the same pair named twice is one link with the sum. A row
 * without a source, a target or a positive value is left out as missing;
 * one from a node to itself as dropped; a flow that would close a loop
 * (its target already leads to its source) as looped, because a Sankey
 * diagram runs one way.
 */
export function sankeyRows(items, {source = '', target = '', value = ''} = {}) {
  const rows = readRows(items);
  const fields = rows.length ? Object.keys(rows[0]) : [];
  const sourceField = source || 'source';
  const targetField = target || 'target';
  const valueField = value || fields.find((name) => name !== sourceField && name !== targetField && rows.some((row) => readNumber(row[name]) !== null)) || 'value';
  const nodes = new Map();
  const pairs = new Map();
  let missing = 0;
  let dropped = 0;
  let looped = 0;
  const node = (key) => {
    if (!nodes.has(key)) nodes.set(key, {key, place: nodes.size, in: 0, out: 0, value: 0, column: 0, links: {in: [], out: []}});
    return nodes.get(key);
  };
  // What each node leads to, to find a loop before a flow is taken.
  const next = new Map();
  const leads = (from, to) => {
    const seen = new Set([from]);
    const stack = [from];
    while (stack.length) {
      const one = stack.pop();
      if (one === to) return true;
      for (const after of next.get(one) ?? []) {
        if (!seen.has(after)) {
          seen.add(after);
          stack.push(after);
        }
      }
    }
    return false;
  };
  rows.forEach((row, index) => {
    const from = text(row[sourceField]);
    const to = text(row[targetField]);
    const amount = readNumber(row[valueField]);
    if (!from || !to || amount === null || amount <= 0) {
      missing += 1;
      return;
    }
    if (from === to) {
      dropped += 1;
      return;
    }
    const pair = `${from}\u0000${to}`;
    if (!pairs.has(pair) && leads(to, from)) {
      looped += 1;
      return;
    }
    const a = node(from);
    const b = node(to);
    if (pairs.has(pair)) {
      pairs.get(pair).value += amount;
    } else {
      pairs.set(pair, {row: index, source: a.place, target: b.place, value: amount});
      if (!next.has(from)) next.set(from, new Set());
      next.get(from).add(to);
    }
  });
  const list = [...nodes.values()];
  const links = [...pairs.values()];
  links.forEach((one, index) => {
    one.index = index;
    list[one.source].out += one.value;
    list[one.source].links.out.push(one);
    list[one.target].in += one.value;
    list[one.target].links.in.push(one);
  });
  for (const one of list) one.value = Math.max(one.in, one.out);

  // Columns: the longest path from a node nothing flows into; a node that
  // flows nowhere stands in the last column, where the flows end.
  const indegree = list.map((one) => one.links.in.length);
  const queue = list.filter((one) => !one.links.in.length);
  while (queue.length) {
    const one = queue.shift();
    for (const link of one.links.out) {
      const after = list[link.target];
      after.column = Math.max(after.column, one.column + 1);
      indegree[after.place] -= 1;
      if (!indegree[after.place]) queue.push(after);
    }
  }
  const last = Math.max(0, ...list.map((one) => one.column));
  for (const one of list) if (!one.links.out.length && one.links.in.length) one.column = last;
  const total = list.filter((one) => !one.links.in.length).reduce((sum, one) => sum + one.out, 0);
  return {sourceField, targetField, valueField, nodes: list, links, columns: last + 1, total, missing, dropped, looped};
}

// The middle of a node, by the weighted middles of the nodes it joins.
function middleOf(one, side, nodes) {
  let sum = 0;
  let weight = 0;
  for (const link of one.links[side]) {
    const other = nodes[side === 'in' ? link.source : link.target];
    sum += (other.y0 + other.y1) / 2 * link.value;
    weight += link.value;
  }
  return weight ? sum / weight : null;
}

/**
 * Where a Sankey diagram's marks go in `box` {x, y, w, h}: {nodes, links,
 * scale}. A node gets {x0, x1, y0, y1}, `width` px wide, its column's place
 * along the width; its height is its value at one scale for every column,
 * the columns `gap` apart inside and each centred. The order in a column is
 * the rows' at first, then sorted a few times by the weighted middle of the
 * nodes each joins, so the bands cross less. A link gets {x0, x1, sy0, sy1,
 * ty0, ty1}: where it leaves its source and where it reaches its target,
 * its bands stacked along each node in the order of the other ends.
 */
export function sankeyLayout(model, {x, y, w, h}, {width = 12, gap = 8, passes = 6} = {}) {
  const nodes = model.nodes.map((one) => ({...one, x0: 0, x1: 0, y0: 0, y1: 0}));
  const columns = Array.from({length: model.columns}, () => []);
  for (const one of nodes) columns[one.column].push(one);
  const step = model.columns > 1 ? (w - width) / (model.columns - 1) : 0;
  const scale = Math.min(...columns.filter((column) => column.length).map((column) => {
    const sum = column.reduce((all, one) => all + one.value, 0);
    return sum > 0 ? Math.max(0, h - gap * (column.length - 1)) / sum : Infinity;
  }));
  const ky = Number.isFinite(scale) ? scale : 0;
  const stack = (column) => {
    const height = column.reduce((all, one) => all + one.value * ky, 0) + gap * (column.length - 1);
    let top = y + Math.max(0, (h - height) / 2);
    for (const one of column) {
      one.y0 = top;
      one.y1 = top + one.value * ky;
      top = one.y1 + gap;
    }
  };
  columns.forEach((column, index) => {
    for (const one of column) {
      one.x0 = x + index * step;
      one.x1 = one.x0 + width;
    }
    stack(column);
  });
  for (let pass = 0; pass < passes; pass += 1) {
    const forward = pass % 2 === 0;
    const order = forward ? columns : [...columns].reverse();
    for (const column of order) {
      const middles = new Map(column.map((one) => [one, middleOf(one, forward ? 'in' : 'out', nodes) ?? (one.y0 + one.y1) / 2]));
      column.sort((a, b) => middles.get(a) - middles.get(b) || a.place - b.place);
      stack(column);
    }
  }

  const links = model.links.map((one) => ({...one, x0: nodes[one.source].x1, x1: nodes[one.target].x0, width: one.value * ky}));
  for (const one of nodes) {
    let down = one.y0;
    const outs = links.filter((link) => link.source === one.place).sort((a, b) => nodes[a.target].y0 - nodes[b.target].y0 || a.index - b.index);
    for (const link of outs) {
      link.sy0 = down;
      link.sy1 = down + link.width;
      down = link.sy1;
    }
    down = one.y0;
    const ins = links.filter((link) => link.target === one.place).sort((a, b) => nodes[a.source].y0 - nodes[b.source].y0 || a.index - b.index);
    for (const link of ins) {
      link.ty0 = down;
      link.ty1 = down + link.width;
      down = link.ty1;
    }
  }
  return {nodes, links, scale: ky};
}

/** A band's outline as an SVG path: two curves between its ends, closed. */
export function bandPathOf(link) {
  const middle = (link.x0 + link.x1) / 2;
  const r = (value) => Math.round(value * 10) / 10;
  return `M${r(link.x0)} ${r(link.sy0)}C${r(middle)} ${r(link.sy0)} ${r(middle)} ${r(link.ty0)} ${r(link.x1)} ${r(link.ty0)}`
    + `L${r(link.x1)} ${r(link.ty1)}C${r(middle)} ${r(link.ty1)} ${r(middle)} ${r(link.sy1)} ${r(link.x0)} ${r(link.sy1)}Z`;
}

/**
 * Whether the point (px, py) is on a band: its top and bottom at px follow
 * the same curve the path draws (control points at the middle), found by
 * halving the curve's parameter.
 */
export function onBand(link, px, py) {
  if (px < link.x0 || px > link.x1) return false;
  const middle = (link.x0 + link.x1) / 2;
  const along = (t) => (1 - t) ** 3 * link.x0 + 3 * (1 - t) ** 2 * t * middle + 3 * (1 - t) * t ** 2 * middle + t ** 3 * link.x1;
  let low = 0;
  let high = 1;
  for (let step = 0; step < 24; step += 1) {
    const t = (low + high) / 2;
    if (along(t) < px) low = t;
    else high = t;
  }
  const t = (low + high) / 2;
  const ease = 3 * t ** 2 - 2 * t ** 3;
  const top = link.sy0 + (link.ty0 - link.sy0) * ease;
  return py >= top - 1 && py <= top + Math.max(link.width, 2) + 1;
}
