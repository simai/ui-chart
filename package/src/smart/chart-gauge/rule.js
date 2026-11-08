// Generated from component.json by scripts/generate-component-files.mjs; do not edit.
// The chart draws its empty and error states as sf-empty-state; a tag it renders is a tag it fetches.
// Its table toggle is a native button, so it fetches no sf-button.
SF.RuleLoader['cl-chart-gauge'] = {
  tags: ['sf-chart-gauge'],
  type: 'smart',
  mode: 'smart',
  js: true,
  css: true,
  relation: [
    { name: 'cl-chart-core' },
    { name: 'cl-empty-state' },
  ],
};
