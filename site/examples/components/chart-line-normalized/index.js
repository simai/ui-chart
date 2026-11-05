// Доли каналов, 100 %: the example «normalized» of package/src/smart/chart-line/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-line').then(() => {
  const chart = document.getElementById('chart');
  chart.names = {"web":"Сайт","shop":"Магазин","partners":"Партнёры"};
  chart.items = [
    {"month":"2026-07","web":42,"shop":30,"partners":12},
    {"month":"2026-08","web":45,"shop":28,"partners":15},
    {"month":"2026-09","web":51,"shop":null,"partners":14},
    {"month":"2026-10","web":55,"shop":25,"partners":18},
    {"month":"2026-11","web":58,"shop":24,"partners":20},
    {"month":"2026-12","web":66,"shop":29,"partners":22},
  ];
});
