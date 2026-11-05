// Контекст модели: the example «context» of package/src/smart/chart-parts/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-parts').then(() => {
  const chart = document.getElementById('chart');
  chart.names = {"system":"Системный промпт","tools":"Инструменты","memory":"Память","messages":"Сообщения"};
  chart.items = [
    {"part":"system","tokens":3200},
    {"part":"tools","tokens":14800},
    {"part":"memory","tokens":1200},
    {"part":"messages","tokens":26400},
  ];
});
