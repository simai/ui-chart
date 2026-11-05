// Один ряд с заливкой: the example «area» of package/src/smart/chart-line/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-line').then(() => {
  const chart = document.getElementById('chart');
  chart.items = [
    {"month":"2026-01","sales":120},
    {"month":"2026-02","sales":132},
    {"month":"2026-03","sales":128},
    {"month":"2026-04","sales":150},
    {"month":"2026-05","sales":171},
    {"month":"2026-06","sales":165},
    {"month":"2026-07","sales":180},
    {"month":"2026-08","sales":176},
    {"month":"2026-09","sales":190},
    {"month":"2026-10","sales":204},
    {"month":"2026-11","sales":198},
    {"month":"2026-12","sales":221},
  ];
});
