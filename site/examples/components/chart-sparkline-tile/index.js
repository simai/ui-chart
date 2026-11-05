// Для плитки показателя: the example «tile» of package/src/smart/chart-sparkline/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-sparkline').then(() => {
  const chart = document.getElementById('chart');
  chart.items = [18,22,25,21,30,34,29,27,24,20,16,14];
});
