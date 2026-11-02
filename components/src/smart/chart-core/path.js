// Line and area paths (docs/research/parameters.md §6): straight, step and a
// smooth curve that never overshoots the data (a monotone cubic), with a gap
// wherever a value is missing unless `gaps="connect"`.

const round = (value) => Math.round(value * 10) / 10;

/** Runs of consecutive points; a null point ends a run (or is dropped with connect). */
export function runs(points, gaps = 'break') {
  const out = [];
  let current = [];
  for (const point of points) {
    if (point === null) {
      if (gaps === 'connect') continue;
      if (current.length) out.push(current);
      current = [];
      continue;
    }
    current.push(point);
  }
  if (current.length) out.push(current);
  return out;
}

// Tangents of a monotone cubic through the run: each is the harmonic mean of
// the slopes beside it, zero at a turn, so the curve stays between its points.
function tangents(run) {
  const n = run.length;
  const slopes = [];
  for (let i = 0; i < n - 1; i += 1) {
    const dx = run[i + 1][0] - run[i][0];
    slopes.push(dx === 0 ? 0 : (run[i + 1][1] - run[i][1]) / dx);
  }
  const out = new Array(n).fill(0);
  out[0] = slopes[0] ?? 0;
  out[n - 1] = slopes[n - 2] ?? 0;
  for (let i = 1; i < n - 1; i += 1) {
    const a = slopes[i - 1];
    const b = slopes[i];
    out[i] = a * b <= 0 ? 0 : (2 * a * b) / (a + b);
  }
  return out;
}

function segment(run, curve) {
  if (run.length === 1) {
    const [x, y] = run[0];
    return `M${round(x)} ${round(y)}h0`;
  }
  let d = `M${round(run[0][0])} ${round(run[0][1])}`;
  if (curve === 'step') {
    for (let i = 1; i < run.length; i += 1) {
      const middle = (run[i - 1][0] + run[i][0]) / 2;
      d += `H${round(middle)}V${round(run[i][1])}H${round(run[i][0])}`;
    }
    return d;
  }
  if (curve === 'smooth' && run.length > 2) {
    const m = tangents(run);
    for (let i = 1; i < run.length; i += 1) {
      const [x0, y0] = run[i - 1];
      const [x1, y1] = run[i];
      const third = (x1 - x0) / 3;
      d += `C${round(x0 + third)} ${round(y0 + m[i - 1] * third)} ${round(x1 - third)} ${round(y1 - m[i] * third)} ${round(x1)} ${round(y1)}`;
    }
    return d;
  }
  for (let i = 1; i < run.length; i += 1) d += `L${round(run[i][0])} ${round(run[i][1])}`;
  return d;
}

/** The `d` of a line through [x, y] points (null for a gap). */
export function linePath(points, {curve = 'linear', gaps = 'break'} = {}) {
  return runs(points, gaps).map((run) => segment(run, curve)).join('');
}

/** The `d` of the area under the line down to the baseline y, per run. */
export function areaPath(points, baseline, {curve = 'linear', gaps = 'break'} = {}) {
  return runs(points, gaps).map((run) => {
    const line = segment(run, curve);
    const first = run[0][0];
    const last = run[run.length - 1][0];
    return `${line}L${round(last)} ${round(baseline)}L${round(first)} ${round(baseline)}Z`;
  }).join('');
}
