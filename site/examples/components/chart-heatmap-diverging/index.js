// Изменение к прошлому году по регионам: the example «diverging» of package/src/smart/chart-heatmap/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-heatmap').then(() => {
  const chart = document.getElementById('chart');
  chart.items = [
    {"month":"Янв","region":"Центр","change":-0.04},
    {"month":"Фев","region":"Центр","change":0.046},
    {"month":"Мар","region":"Центр","change":0.08},
    {"month":"Апр","region":"Центр","change":0.041},
    {"month":"Май","region":"Центр","change":-0.047},
    {"month":"Июн","region":"Центр","change":-0.131},
    {"month":"Янв","region":"Северо-Запад","change":0.096},
    {"month":"Фев","region":"Северо-Запад","change":0.084},
    {"month":"Мар","region":"Северо-Запад","change":0.009},
    {"month":"Апр","region":"Северо-Запад","change":-0.084},
    {"month":"Май","region":"Северо-Запад","change":-0.137},
    {"month":"Июн","region":"Северо-Запад","change":-0.12},
    {"month":"Янв","region":"Юг","change":0.062},
    {"month":"Фев","region":"Юг","change":-0.031},
    {"month":"Мар","region":"Юг","change":-0.105},
    {"month":"Апр","region":"Юг","change":-0.115},
    {"month":"Май","region":"Юг","change":-0.056},
    {"month":"Июн","region":"Юг","change":0.037},
    {"month":"Янв","region":"Урал","change":-0.063},
    {"month":"Фев","region":"Урал","change":-0.1},
    {"month":"Мар","region":"Урал","change":-0.065},
    {"month":"Апр","region":"Урал","change":0.022},
    {"month":"Май","region":"Урал","change":0.107},
    {"month":"Июн","region":"Урал","change":0.14},
    {"month":"Янв","region":"Сибирь","change":-0.066},
    {"month":"Фев","region":"Сибирь","change":0.006},
    {"month":"Мар","region":"Сибирь","change":0.099},
    {"month":"Апр","region":"Сибирь","change":0.156},
    {"month":"Май","region":"Сибирь","change":0.143},
    {"month":"Июн","region":"Сибирь","change":0.067},
  ];
});
