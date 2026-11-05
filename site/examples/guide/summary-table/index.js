// The table under the chart (table="visible") and the page's own words in
// the description slot. The data is the example «reference» of
// package/src/smart/chart-bar/examples.json; Нижний Новгород's second
// quarter is a gap (null): no bar, and a gap in the table.
customElements.whenDefined('sf-chart-bar').then(() => {
  const chart = document.getElementById('guide-summary-table');
  chart.names = {q1: 'I квартал', q2: 'II квартал'};
  chart.items = [
    {city: 'Москва', q1: 420, q2: 465},
    {city: 'Санкт-Петербург', q1: 310, q2: 298},
    {city: 'Казань', q1: 180, q2: 214},
    {city: 'Новосибирск', q1: 150, q2: 171},
    {city: 'Екатеринбург', q1: 164, q2: 159},
    {city: 'Нижний Новгород', q1: 120, q2: null},
  ];
});
