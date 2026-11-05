// Подписи вместо дат: the example «quarters» of package/src/smart/chart-candlestick/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-candlestick').then(() => {
  const chart = document.getElementById('chart');
  chart.items = [
    {"q":"I кв.","open":80,"high":96,"low":74,"close":92},
    {"q":"II кв.","open":92,"high":99,"low":81,"close":85},
    {"q":"III кв.","open":85,"high":104,"low":84,"close":101},
    {"q":"IV кв.","open":101,"high":118,"low":97,"close":114},
  ];
});
