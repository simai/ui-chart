// Маленький: the example «small» of package/src/smart/chart-treemap/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-treemap').then(() => {
  const chart = document.getElementById('chart');
  chart.items = [
    {"item":"Зарплаты","amount":5200},
    {"item":"Аренда","amount":1400},
    {"item":"Реклама","amount":900},
    {"item":"Программы","amount":450},
    {"item":"Обучение","amount":300},
    {"item":"Связь","amount":120},
    {"item":"Прочее","amount":80},
    {"item":"Возврат","amount":null},
  ];
});
