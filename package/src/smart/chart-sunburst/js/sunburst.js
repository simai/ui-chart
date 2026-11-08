// The tree of a sunburst (docs/research/catalogue.md, Sunburst): a
// hierarchy as rings round a centre, a ring per level, each arc its share
// of its parent's. The rows give the hierarchy shape of
// docs/research/parameters.md §2.1: an id and a parent per row, or a path
// (a field holding the list of names from the top down). Own
// implementation: the tree, the values summed up it, the arcs.
import {readNumber, readRows} from '../../chart-core/data.js';

const TURN = Math.PI * 2;
const text = (value) => (value === undefined || value === null ? '' : String(value));

/**
 * The tree of rows: {mode, idField, parentField, pathField, valueField,
 * nameField, roots, nodes, depth, total, missing, dropped, looped}.
 *
 * With `path` set (or a `path` field holding a list) a row is a leaf at the
 * end of its path, and the names before it are made as they come; the same
 * path twice sums. Otherwise a row is a node with its `id` (by default `id`)
 * and its `parent`; a parent that is not among the ids makes the node a top
 * one, an id named twice keeps the first row (dropped), and a chain of
 * parents that comes back to itself is left out (looped).
 *
 * A node is {key, id, name, path, depth, own, value, parent, children,
 * place, row}: `own` is its row's value, `value` the own value with its
 * children's (what is left of a parent beyond its children is its own).
 * Children go largest first; `nodes` is every node, the top ones first,
 * then depth by depth. A node with no value of its own and no children is
 * left out (missing): an arc cannot show it.
 */
export function sunburstRows(items, {id = '', parent = '', path = '', value = '', name = ''} = {}) {
  const rows = readRows(items);
  // Every field any row has: a top node's row may hold no value.
  const fields = [...new Set(rows.flatMap((row) => Object.keys(row)))];
  const listField = path || (!parent && !id && fields.find((field) => rows.some((row) => Array.isArray(row[field])))) || '';
  const mode = listField ? 'path' : 'tree';
  const idField = mode === 'tree' ? id || 'id' : '';
  const parentField = mode === 'tree' ? parent || 'parent' : '';
  const taken = new Set([listField, idField, parentField, name]);
  const valueField = value || fields.find((field) => !taken.has(field) && rows.some((row) => readNumber(row[field]) !== null)) || 'value';
  let missing = 0;
  let dropped = 0;
  let looped = 0;
  const made = [];
  const make = (key, label, row) => {
    const one = {key, id: key, name: label, path: [], depth: 0, own: 0, value: 0, parent: null, children: [], place: 0, row};
    made.push(one);
    return one;
  };

  if (mode === 'path') {
    const byKey = new Map();
    rows.forEach((row, index) => {
      const names = (Array.isArray(row[listField]) ? row[listField] : [row[listField]]).map(text).filter(Boolean);
      const amount = readNumber(row[valueField]);
      if (!names.length || amount === null || amount <= 0) {
        missing += 1;
        return;
      }
      let up = null;
      names.forEach((label, at) => {
        const key = names.slice(0, at + 1).join('\u0000');
        if (!byKey.has(key)) {
          const one = make(key, label, index);
          one.parent = up;
          if (up) up.children.push(one);
          byKey.set(key, one);
        }
        up = byKey.get(key);
      });
      up.own += amount;
    });
  } else {
    const byId = new Map();
    rows.forEach((row, index) => {
      const key = text(row[idField]);
      if (!key) {
        missing += 1;
        return;
      }
      if (byId.has(key)) {
        dropped += 1;
        return;
      }
      const amount = readNumber(row[valueField]);
      const one = make(key, text(row[name]) || key, index);
      one.own = amount !== null && amount > 0 ? amount : 0;
      one.up = text(row[parentField]);
      byId.set(key, one);
    });
    // A node whose chain of parents never reaches a top one (it comes back
    // to itself, or hangs from such a loop) has no ring to stand in and is
    // left out; a parent not among the ids makes a top node.
    const free = new Map();
    const reaches = (one) => {
      const seen = [];
      let at = one;
      while (at && !free.has(at)) {
        if (seen.includes(at)) break;
        seen.push(at);
        at = at.up && at.up !== at.key ? byId.get(at.up) ?? null : at.up === at.key ? at : null;
      }
      const ok = at === null || (free.has(at) && free.get(at));
      for (const one of seen) free.set(one, ok);
      return ok;
    };
    for (const one of made) {
      if (!reaches(one)) {
        looped += 1;
        one.lost = true;
        continue;
      }
      const up = one.up ? byId.get(one.up) : null;
      if (up) {
        one.parent = up;
        up.children.push(one);
      }
    }
  }

  // Values up the tree, the paths and the depths down it; a node with
  // nothing to show goes, and its parent may follow.
  const sum = (one) => {
    one.children = one.children.filter((child) => sum(child) > 0);
    one.value = one.own + one.children.reduce((all, child) => all + child.value, 0);
    return one.value;
  };
  let roots = made.filter((one) => !one.parent && !one.lost);
  const before = made.filter((one) => !one.lost).length;
  roots = roots.filter((one) => sum(one) > 0);
  const order = (list) => list.sort((a, b) => b.value - a.value || a.row - b.row);
  const nodes = [];
  let level = order(roots);
  let depth = 0;
  roots.forEach((one, place) => {
    one.place = place;
  });
  while (level.length) {
    const next = [];
    for (const one of level) {
      one.depth = depth;
      one.path = one.parent ? [...one.parent.path, one.name] : [one.name];
      if (one.parent) one.place = one.parent.place;
      nodes.push(one);
      next.push(...order(one.children));
    }
    level = next;
    depth += 1;
  }
  missing += before - nodes.length;
  for (const one of made) delete one.up;
  const total = roots.reduce((all, one) => all + one.value, 0);
  return {mode, idField, parentField, pathField: listField, valueField, nameField: name, roots, nodes, depth, total, missing, dropped, looped};
}

/**
 * Where a sunburst's arcs go round (cx, cy): {arcs, rings, hole, outer}.
 * The top nodes share the whole turn clockwise from twelve o'clock, a
 * child its parent's angle by its share; ring `d` runs from hole + d * ring
 * to hole + (d + 1) * ring. An arc is {node, index, start, end, inner,
 * outer}, in `model.nodes` order (ring after ring, clockwise in each).
 * An arc narrower than `least` radians is kept, but drawn as nothing.
 */
export function sunburstLayout(model, {cx, cy, radius}, {hole = 0.32} = {}) {
  const rings = Math.max(1, model.depth);
  const inner = radius * hole;
  const ring = (radius - inner) / rings;
  const at = new Map();
  const arcs = [];
  const angleOf = (one) => at.get(one);
  const spread = (list, start, end, of) => {
    let angle = start;
    for (const one of list) {
      const span = of > 0 ? ((end - start) * one.value) / of : 0;
      at.set(one, {start: angle, end: angle + span});
      angle += span;
    }
  };
  spread(model.roots, 0, TURN, model.total);
  for (const one of model.nodes) {
    const {start, end} = angleOf(one);
    spread(one.children, start, start + ((end - start) * (one.value - one.own)) / (one.value || 1), one.value - one.own);
  }
  model.nodes.forEach((one, index) => {
    const {start, end} = angleOf(one);
    arcs.push({node: one, index, start, end, inner: inner + one.depth * ring, outer: inner + (one.depth + 1) * ring, cx, cy});
  });
  return {arcs, rings, ring, hole: inner, outer: radius, cx, cy};
}

/** The arc under the point (px, py), or null: by its radius and its angle. */
export function arcAt(layout, px, py) {
  const dx = px - layout.cx;
  const dy = py - layout.cy;
  const r = Math.hypot(dx, dy);
  if (r < layout.hole || r > layout.outer) return null;
  let angle = Math.atan2(dx, -dy);
  if (angle < 0) angle += TURN;
  return layout.arcs.find((one) => r >= one.inner && r <= one.outer && angle >= one.start && angle < one.end) ?? null;
}
