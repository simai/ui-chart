// A gauge's scale (docs/research/catalogue.md, Gauge): one measured value on
// a fixed scale from min to max, with bands (normal, warning, critical) and
// a target. The scale is a share 0..1 of its length; an arc turns the share
// into an angle over the upper half circle, clockwise from nine o'clock.

import {ROLES} from './colors.js';

/** The share of the scale a value stands at, kept to 0..1. */
export function gaugeShare(value, {min, max}) {
  if (value === null || !Number.isFinite(value) || !(max > min)) return 0;
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
}

/** The angle of a share on the arc, in radians from twelve o'clock. */
export const gaugeAngle = (share) => -Math.PI / 2 + share * Math.PI;

/**
 * The bands as given ({from?, to, role, label}), in order and inside the
 * scale: a band without from starts where the one before ends (min for the
 * first); a band that is empty inside the scale is dropped. A role that is
 * not a Framework role is neutral.
 */
export function gaugeBands(raw, {min, max}) {
  const list = Array.isArray(raw) ? raw : [];
  const out = [];
  let edge = min;
  for (const one of list) {
    if (!one || typeof one !== 'object') continue;
    const to = Number(one.to);
    if (!Number.isFinite(to)) continue;
    const from = Number.isFinite(Number(one.from)) && one.from !== null && one.from !== '' ? Number(one.from) : edge;
    edge = to;
    const lo = Math.max(min, Math.min(from, to));
    const hi = Math.min(max, Math.max(from, to));
    if (!(hi > lo)) continue;
    out.push({from: lo, to: hi, role: ROLES.includes(one.role) ? one.role : 'neutral', label: typeof one.label === 'string' ? one.label : '', index: out.length});
  }
  return out.sort((a, b) => a.from - b.from).map((band, index) => ({...band, index}));
}

/** The band a value falls in: from inclusive, to exclusive but for the last band; null outside every band. */
export function bandOf(bands, value) {
  if (value === null || !Number.isFinite(value)) return null;
  const last = bands.at(-1);
  return bands.find((band) => value >= band.from && (value < band.to || (band === last && value === band.to))) ?? null;
}
