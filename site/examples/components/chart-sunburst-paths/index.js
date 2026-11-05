// Место на диске: the example «paths» of package/src/smart/chart-sunburst/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-sunburst').then(() => {
  const chart = document.getElementById('chart');
  chart.items = [
    {"path":["Документы","Работа"],"size":40},
    {"path":["Документы","Личное"],"size":15},
    {"path":["Фото","2025"],"size":60},
    {"path":["Фото","2026","Отпуск"],"size":35},
    {"path":["Фото","2026","Семья"],"size":20},
    {"path":["Видео"],"size":90},
    {"path":["Программы","Офис"],"size":12},
    {"path":["Программы","Графика"],"size":25},
    {"path":[],"size":5},
  ];
});
