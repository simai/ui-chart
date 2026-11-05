// Свои цвета: the example «colors» of package/src/smart/chart-waterfall/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-waterfall').then(() => {
  const chart = document.getElementById('chart');
  chart.colors = {"up":"primary","down":"warning","total":"secondary"};
  chart.items = {"step":["Выручка 2025","Новые клиенты","Повышение цен","Отток","Скидки","Курс валют"],"value":[820,240,95,-130,-60,35],"total":[true,false,false,false,false,false]};
});
