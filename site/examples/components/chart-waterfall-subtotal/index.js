// Промежуточный итог: the example «subtotal» of package/src/smart/chart-waterfall/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-waterfall').then(() => {
  const chart = document.getElementById('chart');
  chart.items = [
    {"line":"Выручка","value":1200,"total":true},
    {"line":"Себестоимость","value":-640},
    {"line":"Валовая прибыль","value":null,"total":true},
    {"line":"Маркетинг","value":-180},
    {"line":"Зарплаты","value":-220},
    {"line":"Налоги","value":-40},
  ];
});
