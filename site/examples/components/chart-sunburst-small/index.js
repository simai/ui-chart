// Маленький: the example «small» of package/src/smart/chart-sunburst/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-sunburst').then(() => {
  const chart = document.getElementById('chart');
  chart.items = [
    {"id":"Электроника"},
    {"id":"Смартфоны","parent":"Электроника","value":420},
    {"id":"Ноутбуки","parent":"Электроника","value":310},
    {"id":"Наушники","parent":"Электроника","value":120},
    {"id":"Планшеты","parent":"Электроника","value":90},
    {"id":"Дом"},
    {"id":"Мебель","parent":"Дом","value":260},
    {"id":"Посуда","parent":"Дом","value":110},
    {"id":"Текстиль","parent":"Дом","value":70},
    {"id":"Одежда"},
    {"id":"Обувь","parent":"Одежда","value":180},
    {"id":"Верхняя одежда","parent":"Одежда","value":150},
    {"id":"Аксессуары","parent":"Одежда","value":60},
  ];
});
