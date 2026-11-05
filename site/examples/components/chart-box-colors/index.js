// Свои цвета рядов: the example «colors» of package/src/smart/chart-box/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-box').then(() => {
  const chart = document.getElementById('chart');
  chart.names = {"standard":"Обычная","express":"Срочная"};
  chart.colors = {"standard":"neutral","express":"primary"};
  chart.items = {"warehouse":["Москва","Москва","Казань","Казань","Самара","Самара","Москва","Москва","Казань","Казань","Самара","Самара","Москва","Москва","Казань","Казань","Самара","Самара","Москва","Москва","Казань","Казань","Самара","Самара","Москва","Москва","Казань","Казань","Самара","Самара","Москва","Москва","Казань","Казань","Самара","Самара"],"kind":["standard","express","standard","express","standard","express","standard","express","standard","express","standard","express","standard","express","standard","express","standard","express","standard","express","standard","express","standard","express","standard","express","standard","express","standard","express","standard","express","standard","express","standard","express"],"hours":[18,6,24,8,14,5,20,7,26,9,16,6,22,8,28,11,17,6,24,9,31,12,19,7,26,10,33,14,21,8,30,12,36,15,23,9]};
});
