// Один ряд: оценка товара: the example «single» of package/src/smart/chart-radar/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-radar').then(() => {
  const chart = document.getElementById('chart');
  chart.items = [
    {"criterion":"Цена","score":7},
    {"criterion":"Качество","score":9},
    {"criterion":"Доставка","score":6},
    {"criterion":"Сервис","score":8},
    {"criterion":"Упаковка","score":5},
  ];
});
