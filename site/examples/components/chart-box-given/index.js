// Готовая статистика и среднее: the example «given» of package/src/smart/chart-box/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-box').then(() => {
  const chart = document.getElementById('chart');
  chart.items = [
    {"department":"Продажи","min":60,"q1":85,"median":110,"q3":150,"max":260,"mean":124},
    {"department":"ИТ","min":90,"q1":130,"median":160,"q3":200,"max":320,"mean":172},
    {"department":"Склад","min":45,"q1":55,"median":62,"q3":70,"max":95,"mean":64},
    {"department":"Бухгалтерия","min":55,"q1":70,"median":80,"q3":92,"max":130,"mean":84},
    {"department":"Маркетинг","min":60,"q1":80,"median":95,"q3":120,"max":190,"mean":104},
  ];
});
