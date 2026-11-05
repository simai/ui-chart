// Много частей: «Другое»: the example «folded» of package/src/smart/chart-parts/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-parts').then(() => {
  const chart = document.getElementById('chart');
  chart.items = [
    {"lang":"JavaScript","lines":48200},
    {"lang":"CSS","lines":12100},
    {"lang":"HTML","lines":6400},
    {"lang":"JSON","lines":3100},
    {"lang":"Shell","lines":800},
    {"lang":"Python","lines":650},
    {"lang":"Прочее","lines":null},
  ];
});
