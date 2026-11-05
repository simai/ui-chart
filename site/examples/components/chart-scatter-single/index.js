// Один ряд без названий точек: the example «single» of package/src/smart/chart-scatter/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-scatter').then(() => {
  const chart = document.getElementById('chart');
  chart.items = [
    {"managers":4,"revenue":18},
    {"managers":7,"revenue":31},
    {"managers":5,"revenue":26},
    {"managers":3,"revenue":12},
    {"managers":9,"revenue":44},
    {"managers":6,"revenue":24},
    {"managers":2,"revenue":9},
    {"managers":8,"revenue":35},
  ];
});
