// Для плитки: the example «small» of package/src/smart/chart-funnel/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-funnel').then(() => {
  const chart = document.getElementById('chart');
  chart.items = [
    {"stage":"Лиды","deals":420},
    {"stage":"Квалификация","deals":180},
    {"stage":"КП","deals":64},
    {"stage":"Договор","deals":21},
  ];
});
