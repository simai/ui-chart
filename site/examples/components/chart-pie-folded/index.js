// Много частей: «Другое»: the example «folded» of package/src/smart/chart-pie/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-pie').then(() => {
  const chart = document.getElementById('chart');
  chart.items = [
    {"os":"Windows","share":61},
    {"os":"macOS","share":17},
    {"os":"Linux","share":9},
    {"os":"Android","share":6},
    {"os":"iOS","share":4},
    {"os":"ChromeOS","share":1.5},
    {"os":"FreeBSD","share":0.8},
    {"os":"Другие","share":0.7},
    {"os":"Неизвестно","share":null},
  ];
});
