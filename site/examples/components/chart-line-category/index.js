// Категории по оси X: the example «category» of package/src/smart/chart-line/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-line').then(() => {
  const chart = document.getElementById('chart');
  chart.items = [
    {"city":"Москва","share":0.31},
    {"city":"Санкт-Петербург","share":0.18},
    {"city":"Казань","share":0.09},
    {"city":"Новосибирск","share":0.08},
    {"city":"Екатеринбург","share":0.07},
  ];
});
