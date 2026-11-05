// Посещения за 12 недель: the example «reference» of package/src/smart/chart-sparkline/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-sparkline').then(() => {
  const chart = document.getElementById('chart');
  chart.items = [340,362,355,401,395,410,430,452,440,461,470,488];
});
