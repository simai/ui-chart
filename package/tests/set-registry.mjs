// The shared name registry's view of one set (standard simai.component-set
// 1.0.0, family-has-one-owner, names-start-with-owned-family), shared by
// tests/set-passport.contract.test.mjs and scripts/check-registry.mjs.
export function registryProblems(registry, passport) {
  const problems = [];
  const owner = registry.owners.find((entry) => entry.id === passport.id);
  if (!owner) return [`the registry has no owner ${passport.id}`];
  if (owner.kind !== 'set') problems.push(`owner ${passport.id} is a ${owner.kind}, not a set`);
  if (owner.repository !== passport.repository) problems.push(`owner ${passport.id} names ${owner.repository}`);
  if (JSON.stringify([...owner.families].sort()) !== JSON.stringify([...passport.families].sort())) {
    problems.push(`families: the registry gives ${owner.families.join(', ')}, the passport lists ${passport.families.join(', ')}`);
  }
  for (const family of passport.families) {
    const others = registry.owners.filter((entry) => entry.id !== passport.id && entry.families.includes(family));
    if (others.length) problems.push(`family ${family} is also owned by ${others.map((entry) => entry.id).join(', ')}`);
  }
  const names = new Set((owner.names ?? []).map((entry) => entry.element));
  for (const component of passport.components) {
    if (!names.has(component.element)) problems.push(`${component.element} is not a registered name of ${passport.id}`);
  }
  return problems;
}

// Names of the set the dispatcher reserved in ui-control but the registry at
// the pinned revision does not list yet (ordered from the SIMAI Framework
// dispatcher with the set's passport). The list only shrinks: a name the
// registry lists is removed from it in the commit that moves the pin.
export const PENDING_NAMES = [
  {element: 'sf-chart-radar', reserved: 'ui-control, 2026-11-03'},
  {element: 'sf-chart-candlestick', reserved: 'ui-control, 2026-11-04 (D10)'},
  {element: 'sf-chart-waterfall', reserved: 'ui-control, 2026-11-04 (D11)'},
  {element: 'sf-chart-treemap', reserved: 'ui-control, 2026-11-05 (D12)'},
  {element: 'sf-chart-timeline', reserved: 'ui-control, 2026-11-05 (D13)'},
  {element: 'sf-chart-sankey', reserved: 'ui-control, 2026-11-05 (D14)'},
  {element: 'sf-chart-sunburst', reserved: 'ui-control 868426b (D15)'},
  {element: 'sf-chart-map', reserved: 'ui-control 906d127 (D16)'},
];
