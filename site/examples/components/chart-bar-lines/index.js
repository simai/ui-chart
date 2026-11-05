// Факт столбцами, план линией: the example «lines» of package/src/smart/chart-bar/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-bar').then(() => {
  const chart = document.getElementById('chart');
  chart.names = {"fact":"Факт","plan":"План"};
  chart.items = [
    {"month":"Янв","fact":180,"plan":175},
    {"month":"Фев","fact":176,"plan":180},
    {"month":"Мар","fact":190,"plan":185},
    {"month":"Апр","fact":204,"plan":195},
    {"month":"Май","fact":198,"plan":205},
    {"month":"Июн","fact":221,"plan":215},
  ];
});
