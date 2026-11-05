// Площадь и крайние значения: the example «area» of package/src/smart/chart-sparkline/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-sparkline').then(() => {
  const chart = document.getElementById('chart');
  chart.items = [0.42,0.48,0.51,0.47,0.63,0.71,0.66,0.58,0.52,0.49];
});
