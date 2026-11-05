// Без ёмкости: доли суммы, для плитки: the example «sum» of package/src/smart/chart-parts/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-parts').then(() => {
  const chart = document.getElementById('chart');
  chart.items = [
    {"item":"Аренда","sum":120000},
    {"item":"Зарплаты","sum":410000},
    {"item":"Реклама","sum":65000},
    {"item":"Сервисы","sum":18000},
  ];
});
