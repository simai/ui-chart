// Три ряда линиями, круглая сетка: the example «lines» of package/src/smart/chart-radar/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-radar').then(() => {
  const chart = document.getElementById('chart');
  chart.names = {"north":"Север","south":"Юг","west":"Запад"};
  chart.items = {"month":["Скорость","Качество","Срок","Бюджет","Клиенты","Риски","Скорость","Качество","Срок","Бюджет","Клиенты","Риски","Скорость","Качество","Срок","Бюджет","Клиенты","Риски"],"team":["north","north","north","north","north","north","south","south","south","south","south","south","west","west","west","west","west","west"],"score":[6,7,5,8,6,7,8,5,7,6,7,4,5,8,6,5,8,6]};
});
