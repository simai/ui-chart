// Выручка с изменением: the example «reference» of package/src/smart/chart-metric/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-sparkline').then(() => {
  const chart = document.getElementById('chart-chart');
  chart.items = [1100000,1080000,1135000,1120000,1170000,1155000,1210000,1195000,1230000,1250000];
});
