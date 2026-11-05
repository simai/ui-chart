// The colour scale of a heatmap: values cut into steps, each step a fill and
// an ink on one role family's tone ladder (docs/research/parameters.md §8.4,
// docs/DECISIONS.md D8).
//
// A step's fill is light-dark(<light tone>, <dark tone>) of the family: in
// the light theme the strongest value is the darkest tone, in the dark theme
// the lightest, so the strongest is the most contrasting in either. Tone 50
// is never used: no text keeps 4.5:1 on it, and a step carries its value as
// text. A step's ink is the neutral tone that keeps 4.5:1 on its fill.
//
//   sequential  one family, weak → strong
//   diverging   two families meeting at a neutral middle: better="up" is
//               error below the middle and success above, "down" the other
//               way, "none" tertiary and primary (no meaning)

// The ladder from weak to strong: light-theme tones, dark-theme tones.
const LIGHT = [90, 85, 80, 70, 60, 40, 35, 30, 25];
const DARK = [20, 25, 30, 35, 40, 60, 70, 80, 85];
const MIDDLE = 'var(--sf-chart-midpoint)';
const MIDDLE_INK = 'light-dark(var(--sf-neutral-10), var(--sf-neutral-95))';

export const FAMILIES = ['primary', 'secondary', 'tertiary', 'neutral', 'success', 'warning', 'error', 'info'];

// light tone ≥ 60 takes the dark ink, ≤ 40 the light one; the dark theme
// the other way (tones ≤ 40 are dark there).
const inkOf = (light, dark) => `light-dark(var(--sf-neutral-${light >= 60 ? 10 : 98}), var(--sf-neutral-${dark <= 40 ? 95 : 10}))`;

// `count` tones of the ladder, spread from weak to strong.
function ladder(family, count) {
  const out = [];
  for (let step = 0; step < count; step += 1) {
    const at = count === 1 ? LIGHT.length - 1 : Math.round((step * (LIGHT.length - 1)) / (count - 1));
    out.push({
      fill: `light-dark(var(--sf-${family}-${LIGHT[at]}), var(--sf-${family}-${DARK[at]}))`,
      ink: inkOf(LIGHT[at], DARK[at]),
    });
  }
  return out;
}

// The steps' colours, weak → strong (sequential) or low → high (diverging).
export function heatColours({scale = 'sequential', scheme = 'primary', better = 'up', steps = 5} = {}) {
  if (scale !== 'diverging') return ladder(FAMILIES.includes(scheme) ? scheme : 'primary', steps);
  const [low, high] = better === 'down' ? ['success', 'error'] : better === 'none' ? ['tertiary', 'primary'] : ['error', 'success'];
  const side = Math.floor(steps / 2);
  // The side ladders skip their weakest tone, so the first step off the
  // middle is told from the middle.
  const lowSide = ladder(low, side + 1).slice(1).reverse();
  const highSide = ladder(high, side + 1).slice(1);
  return [...lowSide, {fill: MIDDLE, ink: MIDDLE_INK, middle: true}, ...highSide];
}

// A diverging scale has a middle step, so its step count is odd.
export const stepCount = (steps, scale) => {
  const count = Math.min(9, Math.max(3, Math.round(Number.isFinite(steps) ? steps : 5)));
  return scale === 'diverging' && count % 2 === 0 ? count + 1 : count;
};

// The step bounds: count steps of equal width over [min, max]. Diverging,
// the range is made even around the middle (as far below it as the data
// reach above, or the other way), so a step is the same distance from the
// middle on either side and the middle step holds the middle value.
export function heatSteps({min, max, middle = 0, count, scale = 'sequential'}) {
  if (!(Number.isFinite(min) && Number.isFinite(max))) return [];
  let [low, high] = [min, max];
  if (scale === 'diverging') {
    const reach = Math.max(Math.abs(min - middle), Math.abs(max - middle)) || 1;
    [low, high] = [middle - reach, middle + reach];
  }
  const width = (high - low) / count || 1;
  return Array.from({length: count}, (_, step) => ({from: low + step * width, to: step === count - 1 ? high : low + (step + 1) * width}));
}

// The step a value falls in, or -1 for a gap. A value on a bound belongs to
// the step above it; the top bound to the last step.
export function stepOf(steps, value) {
  if (value === null || !Number.isFinite(value) || !steps.length) return -1;
  for (let step = steps.length - 1; step >= 0; step -= 1) if (value >= steps[step].from) return step;
  return 0;
}
