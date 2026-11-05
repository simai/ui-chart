// Выручка по направлениям: the example «reference» of package/src/smart/chart-treemap/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-treemap').then(() => {
  const chart = document.getElementById('chart');
  chart.items = {"name":["Смартфоны","Ноутбуки","Наушники","Планшеты","Мебель","Посуда","Текстиль","Обувь","Верхняя одежда","Аксессуары"],"value":[420,310,120,90,260,110,70,180,150,60],"area":["Электроника","Электроника","Электроника","Электроника","Дом","Дом","Дом","Одежда","Одежда","Одежда"]};
});
