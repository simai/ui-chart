// The stages of a funnel (docs/research/catalogue.md, Funnel): each stage's
// share of the widest, its conversion from the stage before and from the
// first, and where the most is lost. A stage with no value is a gap: it has
// no bar and no conversion, and the stage after it has none from it either.

/** The stages with share, fromPrevious, fromFirst and drop, and the facts of the whole. */
export function funnelStages(rows) {
  const known = rows.filter((row) => row.value !== null);
  const widest = Math.max(0, ...known.map((row) => row.value));
  const first = rows.find((row) => row.value !== null && row.value > 0) ?? null;
  const stages = rows.map((row, index) => {
    const before = index > 0 ? rows[index - 1].value : null;
    const has = row.value !== null;
    return {
      ...row,
      share: has && widest > 0 ? Math.max(0, row.value) / widest : 0,
      fromPrevious: has && before !== null && before > 0 && index > 0 ? row.value / before : null,
      fromFirst: has && first && index > first.index ? row.value / first.value : null,
      drop: has && before !== null && index > 0 ? before - row.value : null,
    };
  });
  const last = [...stages].reverse().find((stage) => stage.value !== null) ?? null;
  const lost = stages.filter((stage) => stage.fromPrevious !== null && stage.fromPrevious < 1);
  const worst = lost.length ? lost.reduce((most, stage) => (stage.fromPrevious < most.fromPrevious ? stage : most)) : null;
  // A stage wider than the one before means the stages are not nested.
  const grows = stages.some((stage) => stage.fromPrevious !== null && stage.fromPrevious > 1);
  return {
    stages,
    first,
    last,
    overall: first && last && last.index > first.index ? last.value / first.value : null,
    worst,
    grows,
    gaps: stages.filter((stage) => stage.value === null).length,
  };
}
