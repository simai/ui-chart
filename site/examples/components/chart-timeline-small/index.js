// Маленький: the example «small» of package/src/smart/chart-timeline/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-timeline').then(() => {
  const chart = document.getElementById('chart');
  chart.items = {"task":["Анализ","Дизайн","Разработка","Тестирование","Обучение","Запуск"],"start":["2026-03-02","2026-03-09","2026-03-23","2026-04-13","2026-04-27","2026-05-15"],"end":["2026-03-13","2026-03-27","2026-04-24","2026-05-08","2026-05-15","2026-05-15"],"status":["готово","готово","в работе","план","план","план"]};
});
