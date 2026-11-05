// Пропуск в данных: the example «gaps» of package/src/smart/chart-funnel/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-funnel').then(() => {
  const chart = document.getElementById('chart');
  chart.items = [
    {"step":"Открыли форму","n":5200},
    {"step":"Ввели почту","n":3100},
    {"step":"Подтвердили","n":null},
    {"step":"Заполнили профиль","n":1400},
  ];
});
