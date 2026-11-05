// Система нейтральным, остальное своими цветами: the example «colors» of package/src/smart/chart-parts/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-parts').then(() => {
  const chart = document.getElementById('chart');
  chart.names = {"system":"Система","apps":"Приложения","docs":"Документы","photos":"Фото"};
  chart.items = [
    {"kind":"system","size":22},
    {"kind":"apps","size":13},
    {"kind":"docs","size":7},
    {"kind":"photos","size":3},
  ];
  chart.colors = {"system":"neutral","apps":"primary","docs":"tertiary","photos":"secondary"};
});
