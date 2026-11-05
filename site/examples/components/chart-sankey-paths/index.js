// Пути посетителей: the example «paths» of package/src/smart/chart-sankey/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-sankey').then(() => {
  const chart = document.getElementById('chart');
  chart.items = [
    {"source":"Главная","target":"Каталог","value":500},
    {"source":"Главная","target":"Поиск","value":300},
    {"source":"Каталог","target":"Корзина","value":220},
    {"source":"Поиск","target":"Корзина","value":120},
    {"source":"Каталог","target":"Уход","value":280},
    {"source":"Поиск","target":"Уход","value":180},
    {"source":"Корзина","target":"Заказ","value":210},
    {"source":"Корзина","target":"Уход","value":130},
    {"source":"Корзина","target":"Каталог","value":40},
    {"source":"Главная","target":"","value":15},
  ];
});
