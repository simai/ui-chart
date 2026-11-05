// Продажи и план по месяцам: the example «reference» of package/src/smart/chart-line/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-line').then(() => {
  const chart = document.getElementById('chart');
  chart.names = {"sales":"Продажи","plan":"План"};
  chart.items = [
    {"month":"2026-01","sales":120,"plan":125},
    {"month":"2026-02","sales":132,"plan":130},
    {"month":"2026-03","sales":128,"plan":135},
    {"month":"2026-04","sales":150,"plan":145},
    {"month":"2026-05","sales":171,"plan":160},
    {"month":"2026-06","sales":165,"plan":165},
    {"month":"2026-07","sales":180,"plan":175},
    {"month":"2026-08","sales":176,"plan":180},
    {"month":"2026-09","sales":190,"plan":185},
    {"month":"2026-10","sales":204,"plan":195},
    {"month":"2026-11","sales":198,"plan":205},
    {"month":"2026-12","sales":221,"plan":215},
  ];
});
