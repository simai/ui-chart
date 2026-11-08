// The spokes of a radar chart (docs/research/catalogue.md, Radar): one spoke
// per measure from a centre, the first straight up and the rest clockwise,
// and each series a ring through its values. A gap breaks the ring, so a
// missing value is never drawn as zero.

/** The angle of a spoke, in radians: the first points up, the rest go clockwise. */
export function spokeAngle(index, count) {
  return -Math.PI / 2 + (2 * Math.PI * index) / Math.max(1, count);
}

/** The point at `distance` from the centre along a spoke. */
export function spokePoint([cx, cy], distance, index, count) {
  const angle = spokeAngle(index, count);
  return [cx + Math.cos(angle) * distance, cy + Math.sin(angle) * distance];
}

/**
 * A series' ring: {closed, runs}, each run the points of neighbouring
 * spokes with a value. Without a gap it is one closed ring; with gaps the
 * runs go round from the spoke after the first gap, so a run across the
 * first spoke stays whole. `distanceOf` maps a value to its distance.
 */
export function radarRuns(values, center, distanceOf) {
  const count = values.length;
  const gap = values.findIndex((value) => value === null);
  const at = (index) => spokePoint(center, distanceOf(values[index]), index, count);
  if (gap < 0) return {closed: count > 2, runs: count ? [values.map((_, index) => at(index))] : []};
  const runs = [];
  let current = [];
  for (let step = 1; step <= count; step += 1) {
    const index = (gap + step) % count;
    if (values[index] === null) {
      if (current.length) runs.push(current);
      current = [];
      continue;
    }
    current.push(at(index));
  }
  if (current.length) runs.push(current);
  return {closed: false, runs};
}

/** Where a spoke's label stands from its end: {anchor, baseline}, by the spoke's direction. */
export function labelPlace(index, count) {
  const angle = spokeAngle(index, count);
  const across = Math.cos(angle);
  const down = Math.sin(angle);
  return {
    anchor: across > 0.2 ? 'start' : across < -0.2 ? 'end' : 'middle',
    baseline: down > 0.2 ? 'hanging' : down < -0.2 ? 'auto' : 'middle',
  };
}

/** On how many spokes a is above b and b above a, both given. */
export function compareRings(a, b) {
  let above = 0;
  let below = 0;
  a.forEach((value, index) => {
    if (value === null || b[index] === null) return;
    if (value > b[index]) above += 1;
    if (value < b[index]) below += 1;
  });
  return {above, below};
}
