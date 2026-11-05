// Arcs (docs/research/parameters.md §14, the pie): parts of a whole as
// slices of a circle, clockwise from twelve o'clock, with an optional hole.
// Only positive parts make a slice; a zero, a negative or a gap is said in
// the table and drawn as nothing.

const TURN = Math.PI * 2;

/**
 * Slices of `values`: [{index, value, share, start, end}] in radians from
 * twelve o'clock, clockwise. `pad` is the gap between slices in radians.
 */
export function pieSlices(values, {pad = 0} = {}) {
  const parts = values.map((value, index) => ({index, value})).filter(({value}) => value !== null && value > 0);
  const total = parts.reduce((sum, {value}) => sum + value, 0);
  if (!total) return [];
  const gap = parts.length > 1 ? pad : 0;
  let angle = 0;
  return parts.map(({index, value}) => {
    const share = value / total;
    const start = angle;
    angle += share * TURN;
    return {index, value, share, start: start + gap / 2, end: Math.max(start + gap / 2, angle - gap / 2)};
  });
}

const round = (value) => Math.round(value * 100) / 100;
const point = (cx, cy, r, angle) => [round(cx + r * Math.sin(angle)), round(cy - r * Math.cos(angle))];

/** The SVG path of one slice between `inner` and `outer` radii. */
export function arcPath({start, end}, {cx, cy, outer, inner = 0}) {
  // A whole circle is two half arcs: one arc with the same ends draws nothing.
  if (end - start >= TURN - 1e-6) {
    const [tx, ty] = point(cx, cy, outer, 0);
    const [bx, by] = point(cx, cy, outer, Math.PI);
    let d = `M${tx},${ty}A${outer},${outer} 0 1 1 ${bx},${by}A${outer},${outer} 0 1 1 ${tx},${ty}Z`;
    if (inner > 0) {
      const [ix, iy] = point(cx, cy, inner, 0);
      const [jx, jy] = point(cx, cy, inner, Math.PI);
      d += `M${ix},${iy}A${inner},${inner} 0 1 0 ${jx},${jy}A${inner},${inner} 0 1 0 ${ix},${iy}Z`;
    }
    return d;
  }
  const large = end - start > Math.PI ? 1 : 0;
  const [ax, ay] = point(cx, cy, outer, start);
  const [bx, by] = point(cx, cy, outer, end);
  if (inner <= 0) return `M${round(cx)},${round(cy)}L${ax},${ay}A${outer},${outer} 0 ${large} 1 ${bx},${by}Z`;
  const [cx2, cy2] = point(cx, cy, inner, end);
  const [dx, dy] = point(cx, cy, inner, start);
  return `M${ax},${ay}A${outer},${outer} 0 ${large} 1 ${bx},${by}L${cx2},${cy2}A${inner},${inner} 0 ${large} 0 ${dx},${dy}Z`;
}

/** The point in the middle of a slice at radius `r`, for its label. */
export function arcMiddle({start, end}, {cx, cy}, r) {
  return point(cx, cy, r, (start + end) / 2);
}
