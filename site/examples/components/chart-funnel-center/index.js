// По центру: привычная форма воронки: the example «center» of package/src/smart/chart-funnel/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-funnel').then(() => {
  const chart = document.getElementById('chart');
  chart.names = {"visit":"Визиты","catalog":"Каталог","cart":"Корзина","checkout":"Оформление","paid":"Оплата"};
  chart.items = [
    {"step":"visit","people":12400},
    {"step":"catalog","people":7800},
    {"step":"cart","people":2900},
    {"step":"checkout","people":1300},
    {"step":"paid","people":860},
  ];
});
