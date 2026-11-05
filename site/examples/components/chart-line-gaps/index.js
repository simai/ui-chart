// Пропуски в данных: the example «gaps» of package/src/smart/chart-line/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-line').then(() => {
  const chart = document.getElementById('chart');
  chart.names = {"visits":"Посещения"};
  chart.items = [
    {"day":"2026-10-01","visits":340},
    {"day":"2026-10-02","visits":362},
    {"day":"2026-10-03","visits":null},
    {"day":"2026-10-04","visits":null},
    {"day":"2026-10-05","visits":401},
    {"day":"2026-10-06","visits":395},
    {"day":"2026-10-07","visits":410},
    {"day":"2026-10-08","visits":null},
    {"day":"2026-10-09","visits":430},
    {"day":"2026-10-10","visits":452},
    {"day":"2026-10-11","visits":440},
    {"day":"2026-10-12","visits":461},
    {"day":"2026-10-13","visits":470},
    {"day":"2026-10-14","visits":488},
  ];
});
