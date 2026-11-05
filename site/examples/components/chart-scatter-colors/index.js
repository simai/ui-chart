// Свои цвета рядов: the example «colors» of package/src/smart/chart-scatter/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-scatter').then(() => {
  const chart = document.getElementById('chart');
  chart.names = {"electronics":"Электроника","accessories":"Аксессуары"};
  chart.colors = {"electronics":"tertiary","accessories":"neutral"};
  chart.items = [
    {"product":"Наушники","kind":"electronics","price":1200,"sold":340},
    {"product":"Часы","kind":"electronics","price":3900,"sold":210},
    {"product":"Телефон","kind":"electronics","price":7800,"sold":120},
    {"product":"Ноутбук","kind":"electronics","price":9900,"sold":80},
    {"product":"Чехол","kind":"accessories","price":300,"sold":520},
    {"product":"Зарядка","kind":"accessories","price":900,"sold":390},
    {"product":"Сумка","kind":"accessories","price":1500,"sold":350},
    {"product":"Клавиатура","kind":"accessories","price":2900,"sold":230},
  ];
});
