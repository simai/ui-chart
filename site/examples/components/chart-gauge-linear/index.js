// Полосой: для строки или тесного места: the example «linear» of package/src/smart/chart-gauge/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-gauge').then(() => {
  const chart = document.getElementById('chart');
  chart.bands = [{"to":70,"role":"success"},{"to":90,"role":"warning"},{"to":100,"role":"error"}];
});
