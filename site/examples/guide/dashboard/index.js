// A row of tiles: three metrics (the examples «reference», «load» and
// «storage» of package/src/smart/chart-metric/examples.json), a sparkline in
// the first tile's chart slot and a gauge with its bands (the example
// «reference» of package/src/smart/chart-gauge/examples.json).
customElements.whenDefined('sf-chart-sparkline').then(() => {
  document.getElementById('guide-dashboard-revenue').items =
    [0.98, 1.02, 1.0, 1.05, 1.08, 1.04, 1.1, 1.12, 1.1, 1.15, 1.1, 1.25].map((value) => value * 1000000);
});
customElements.whenDefined('sf-chart-gauge').then(() => {
  document.getElementById('guide-dashboard-cpu').bands = [
    {to: 70, role: 'success'},
    {to: 90, role: 'warning'},
    {to: 100, role: 'error'},
  ];
});
