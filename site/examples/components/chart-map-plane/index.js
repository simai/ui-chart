// Схема склада: the example «plane» of package/src/smart/chart-map/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-map').then(() => {
  const chart = document.getElementById('chart');
  chart.shapes = {"type":"FeatureCollection","features":[{"type":"Feature","id":"Приёмка","properties":{"name":"Приёмка"},"geometry":{"type":"Polygon","coordinates":[[[0,0],[40,0],[40,30],[0,30],[0,0]]]}},{"type":"Feature","id":"Хранение A","properties":{"name":"Хранение A"},"geometry":{"type":"Polygon","coordinates":[[[40,0],[100,0],[100,30],[40,30],[40,0]]]}},{"type":"Feature","id":"Хранение B","properties":{"name":"Хранение B"},"geometry":{"type":"Polygon","coordinates":[[[40,30],[100,30],[100,60],[40,60],[40,30]]]}},{"type":"Feature","id":"Отгрузка","properties":{"name":"Отгрузка"},"geometry":{"type":"Polygon","coordinates":[[[0,30],[40,30],[40,60],[0,60],[0,30]]]}},{"type":"Feature","id":"Офис","properties":{"name":"Офис"},"geometry":{"type":"Polygon","coordinates":[[[100,0],[120,0],[120,20],[100,20],[100,0]]]}},{"type":"Feature","id":"Зарядка","properties":{"name":"Зарядка"},"geometry":{"type":"Polygon","coordinates":[[[100,20],[120,20],[120,60],[100,60],[100,20]]]}}]};
  chart.items = [
    {"zone":"Приёмка","change":8},
    {"zone":"Хранение A","change":-12},
    {"zone":"Хранение B","change":15},
    {"zone":"Отгрузка","change":3},
    {"zone":"Офис","change":0},
    {"zone":"Зарядка","change":-4},
  ];
});
