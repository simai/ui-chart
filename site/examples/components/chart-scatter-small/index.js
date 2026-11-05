// Маленький размер: the example «small» of package/src/smart/chart-scatter/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-scatter').then(() => {
  const chart = document.getElementById('chart');
  chart.items = [
    {"region":"Север","managers":4,"revenue":18,"clients":120},
    {"region":"Юг","managers":7,"revenue":31,"clients":260},
    {"region":"Запад","managers":5,"revenue":26,"clients":180},
    {"region":"Восток","managers":3,"revenue":12,"clients":90},
    {"region":"Центр","managers":9,"revenue":44,"clients":410},
    {"region":"Урал","managers":6,"revenue":24,"clients":150},
    {"region":"Сибирь","managers":2,"revenue":9,"clients":60},
    {"region":"Волга","managers":8,"revenue":35,"clients":300},
  ];
});
