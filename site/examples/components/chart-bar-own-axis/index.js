// Линия на своей шкале: маржа над выручкой: the example «own-axis» of package/src/smart/chart-bar/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-bar').then(() => {
  const chart = document.getElementById('chart');
  chart.names = {"revenue":"Выручка","margin":"Маржа"};
  chart.items = [
    {"q":"I кв.","revenue":1200,"margin":0.18},
    {"q":"II кв.","revenue":1350,"margin":0.21},
    {"q":"III кв.","revenue":1280,"margin":0.17},
    {"q":"IV кв.","revenue":1500,"margin":0.24},
  ];
});
