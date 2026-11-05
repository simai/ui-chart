// Готовый набор vivid: the example «palette» of package/src/smart/chart-pie/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-pie').then(() => {
  const chart = document.getElementById('chart');
  chart.names = {"web":"Сайт","shop":"Магазин","partners":"Партнёры","phone":"Телефон"};
  chart.items = [
    {"channel":"web","orders":540},
    {"channel":"shop","orders":310},
    {"channel":"partners","orders":120},
    {"channel":"phone","orders":30},
  ];
});
