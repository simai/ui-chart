// Два профиля навыков: the example «reference» of package/src/smart/chart-radar/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-radar').then(() => {
  const chart = document.getElementById('chart');
  chart.names = {"anna":"Анна","boris":"Борис"};
  chart.items = [
    {"skill":"Аналитика","anna":8,"boris":5},
    {"skill":"Код","anna":9,"boris":6},
    {"skill":"Дизайн","anna":4,"boris":8},
    {"skill":"Общение","anna":6,"boris":9},
    {"skill":"Тесты","anna":7,"boris":4},
    {"skill":"Планирование","anna":5,"boris":7},
  ];
});
