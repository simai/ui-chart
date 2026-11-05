// I квартал нейтральным, II фирменным: the example «colors» of package/src/smart/chart-bar/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-bar').then(() => {
  const chart = document.getElementById('chart');
  chart.names = {"q1":"I квартал","q2":"II квартал"};
  chart.items = [
    {"city":"Москва","q1":420,"q2":465},
    {"city":"Санкт-Петербург","q1":310,"q2":298},
    {"city":"Казань","q1":180,"q2":214},
    {"city":"Новосибирск","q1":150,"q2":171},
    {"city":"Екатеринбург","q1":164,"q2":159},
    {"city":"Нижний Новгород","q1":120,"q2":null},
  ];
  chart.colors = {"q1":"neutral","q2":"primary"};
});
