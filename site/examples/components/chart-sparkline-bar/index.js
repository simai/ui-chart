// Столбики: the example «bar» of package/src/smart/chart-sparkline/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-sparkline').then(() => {
  const chart = document.getElementById('chart');
  chart.items = [
    {"day":"2026-10-01","orders":12},
    {"day":"2026-10-02","orders":15},
    {"day":"2026-10-03","orders":null},
    {"day":"2026-10-04","orders":9},
    {"day":"2026-10-05","orders":18},
    {"day":"2026-10-06","orders":21},
    {"day":"2026-10-07","orders":17},
  ];
});
