// Маленький, без чисел: the example «small» of package/src/smart/chart-heatmap/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-heatmap').then(() => {
  const chart = document.getElementById('chart');
  chart.names = {"mon":"Пн","tue":"Вт","wed":"Ср","thu":"Чт","fri":"Пт","sat":"Сб","sun":"Вс"};
  chart.items = [
    {"hour":"9:00","day":"mon","load":32},
    {"hour":"10:00","day":"mon","load":44},
    {"hour":"11:00","day":"mon","load":60},
    {"hour":"12:00","day":"mon","load":74},
    {"hour":"13:00","day":"mon","load":80},
    {"hour":"14:00","day":"mon","load":74},
    {"hour":"15:00","day":"mon","load":60},
    {"hour":"16:00","day":"mon","load":44},
    {"hour":"17:00","day":"mon","load":32},
    {"hour":"18:00","day":"mon","load":25},
    {"hour":"9:00","day":"tue","load":34},
    {"hour":"10:00","day":"tue","load":46},
    {"hour":"11:00","day":"tue","load":62},
    {"hour":"12:00","day":"tue","load":76},
    {"hour":"13:00","day":"tue","load":82},
    {"hour":"14:00","day":"tue","load":76},
    {"hour":"15:00","day":"tue","load":62},
    {"hour":"16:00","day":"tue","load":46},
    {"hour":"17:00","day":"tue","load":34},
    {"hour":"18:00","day":"tue","load":27},
    {"hour":"9:00","day":"wed","load":36},
    {"hour":"10:00","day":"wed","load":48},
    {"hour":"11:00","day":"wed","load":64},
    {"hour":"12:00","day":"wed","load":78},
    {"hour":"13:00","day":"wed","load":84},
    {"hour":"14:00","day":"wed","load":78},
    {"hour":"15:00","day":"wed","load":64},
    {"hour":"16:00","day":"wed","load":48},
    {"hour":"17:00","day":"wed","load":36},
    {"hour":"18:00","day":"wed","load":29},
  ];
});
