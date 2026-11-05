// Свои цвета: the example «colors» of package/src/smart/chart-sankey/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-sankey').then(() => {
  const chart = document.getElementById('chart');
  chart.colors = {"Продукты":"primary","Услуги":"tertiary","Прибыль":"success"};
  chart.items = [
    {"from":"Продукты","to":"Выручка","amount":520},
    {"from":"Услуги","to":"Выручка","amount":280},
    {"from":"Выручка","to":"Зарплаты","amount":360},
    {"from":"Выручка","to":"Маркетинг","amount":140},
    {"from":"Выручка","to":"Аренда","amount":90},
    {"from":"Выручка","to":"Прибыль","amount":210},
    {"from":"Маркетинг","to":"Поиск","amount":80},
    {"from":"Маркетинг","to":"Соцсети","amount":60},
  ];
});
