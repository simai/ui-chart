// Состояние сервисов: the example «states» of package/src/smart/chart-timeline/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-timeline').then(() => {
  const chart = document.getElementById('chart');
  chart.items = [
    {"service":"API","from":"2026-11-04T00:00","to":"2026-11-04T09:40","state":"работает"},
    {"service":"API","from":"2026-11-04T09:40","to":"2026-11-04T10:25","state":"с ошибками"},
    {"service":"API","from":"2026-11-04T10:25","to":"2026-11-05T00:00","state":"работает"},
    {"service":"База данных","from":"2026-11-04T00:00","to":"2026-11-04T03:00","state":"работает"},
    {"service":"База данных","from":"2026-11-04T03:00","to":"2026-11-04T03:30","state":"недоступна"},
    {"service":"База данных","from":"2026-11-04T03:30","to":"2026-11-05T00:00","state":"работает"},
    {"service":"Очередь","from":"2026-11-04T00:00","to":"2026-11-04T14:10","state":"работает"},
    {"service":"Очередь","from":"2026-11-04T14:10","to":"2026-11-04T16:40","state":"с ошибками"},
    {"service":"Очередь","from":"2026-11-04T16:40","to":"2026-11-05T00:00","state":"работает"},
    {"service":"Почта","from":"2026-11-04T00:00","to":"2026-11-05T00:00","state":"работает"},
    {"service":"Почта","from":"2026-11-05T00:00","to":null,"state":"работает"},
  ];
});
