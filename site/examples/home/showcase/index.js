// The home page: every chart of the set, a tab per group of
// config/components.json, each with the data of one of its own examples
// (written by scripts/build-pages.mjs). Lists and objects are properties,
// set once the element is defined.

// Линейный график: «reference» of package/src/smart/chart-line/examples.json.
customElements.whenDefined('sf-chart-line').then(() => {
  const chart = document.getElementById('home-line');
  chart.names = {"sales":"Продажи","plan":"План"};
  chart.items = [
    {"month":"2026-01","sales":120,"plan":125},
    {"month":"2026-02","sales":132,"plan":130},
    {"month":"2026-03","sales":128,"plan":135},
    {"month":"2026-04","sales":150,"plan":145},
    {"month":"2026-05","sales":171,"plan":160},
    {"month":"2026-06","sales":165,"plan":165},
    {"month":"2026-07","sales":180,"plan":175},
    {"month":"2026-08","sales":176,"plan":180},
    {"month":"2026-09","sales":190,"plan":185},
    {"month":"2026-10","sales":204,"plan":195},
    {"month":"2026-11","sales":198,"plan":205},
    {"month":"2026-12","sales":221,"plan":215},
  ];
});

// Столбчатая диаграмма: «lines» of package/src/smart/chart-bar/examples.json.
customElements.whenDefined('sf-chart-bar').then(() => {
  const chart = document.getElementById('home-bar');
  chart.names = {"fact":"Факт","plan":"План"};
  chart.items = [
    {"month":"Янв","fact":180,"plan":175},
    {"month":"Фев","fact":176,"plan":180},
    {"month":"Мар","fact":190,"plan":185},
    {"month":"Апр","fact":204,"plan":195},
    {"month":"Май","fact":198,"plan":205},
    {"month":"Июн","fact":221,"plan":215},
  ];
});

// Свечной график: «reference» of package/src/smart/chart-candlestick/examples.json.
customElements.whenDefined('sf-chart-candlestick').then(() => {
  const chart = document.getElementById('home-candlestick');
  chart.items = {"day":["2026-10-01","2026-10-02","2026-10-05","2026-10-06","2026-10-07","2026-10-08","2026-10-09","2026-10-12","2026-10-13","2026-10-14","2026-10-15","2026-10-16","2026-10-19","2026-10-20","2026-10-21","2026-10-22","2026-10-23","2026-10-26","2026-10-27","2026-10-28"],"open":[101,102.4,104.1,103.2,105.8,107.3,106.1,104.9,106.6,108.9,110.2,109.4,111.8,113.5,112.1,110.6,112.9,115.3,114.2,116.8],"high":[103.6,105.6,104.9,107.7,108.4,107.9,107,108.3,110.2,111.8,110.9,113.6,114.7,114,112.9,114.5,116.7,116.2,118.3,119.4],"low":[100.1,101.8,101.6,102.5,105,104.4,103.5,104.4,105.7,107.8,107.9,108.8,110.9,110.3,109.2,109.9,111.9,112.5,113.4,115.7],"close":[102.4,104.1,103.2,105.8,107.3,106.1,104.9,106.6,108.9,110.2,109.4,111.8,113.5,112.1,110.6,112.9,115.3,114.2,116.8,118.1]};
});

// Каскадный график: «reference» of package/src/smart/chart-waterfall/examples.json.
customElements.whenDefined('sf-chart-waterfall').then(() => {
  const chart = document.getElementById('home-waterfall');
  chart.items = {"step":["Выручка 2025","Новые клиенты","Повышение цен","Отток","Скидки","Курс валют"],"value":[820,240,95,-130,-60,35],"total":[true,false,false,false,false,false]};
});

// Круговая диаграмма: «ring» of package/src/smart/chart-pie/examples.json.
customElements.whenDefined('sf-chart-pie').then(() => {
  const chart = document.getElementById('home-pie');
  chart.names = {"web":"Сайт","shop":"Магазин","partners":"Партнёры","phone":"Телефон"};
  chart.items = [
    {"channel":"web","orders":540},
    {"channel":"shop","orders":310},
    {"channel":"partners","orders":120},
    {"channel":"phone","orders":30},
  ];
});

// Солнечные круги: «reference» of package/src/smart/chart-sunburst/examples.json.
customElements.whenDefined('sf-chart-sunburst').then(() => {
  const chart = document.getElementById('home-sunburst');
  chart.items = [
    {"id":"Электроника"},
    {"id":"Смартфоны","parent":"Электроника","value":420},
    {"id":"Ноутбуки","parent":"Электроника","value":310},
    {"id":"Наушники","parent":"Электроника","value":120},
    {"id":"Планшеты","parent":"Электроника","value":90},
    {"id":"Дом"},
    {"id":"Мебель","parent":"Дом","value":260},
    {"id":"Посуда","parent":"Дом","value":110},
    {"id":"Текстиль","parent":"Дом","value":70},
    {"id":"Одежда"},
    {"id":"Обувь","parent":"Одежда","value":180},
    {"id":"Верхняя одежда","parent":"Одежда","value":150},
    {"id":"Аксессуары","parent":"Одежда","value":60},
  ];
});

// Плиточная диаграмма: «reference» of package/src/smart/chart-treemap/examples.json.
customElements.whenDefined('sf-chart-treemap').then(() => {
  const chart = document.getElementById('home-treemap');
  chart.items = {"name":["Смартфоны","Ноутбуки","Наушники","Планшеты","Мебель","Посуда","Текстиль","Обувь","Верхняя одежда","Аксессуары"],"value":[420,310,120,90,260,110,70,180,150,60],"area":["Электроника","Электроника","Электроника","Электроника","Дом","Дом","Дом","Одежда","Одежда","Одежда"]};
});

// Полоса частей: «reference» of package/src/smart/chart-parts/examples.json.
customElements.whenDefined('sf-chart-parts').then(() => {
  const chart = document.getElementById('home-parts');
  chart.names = {"system":"Система","apps":"Приложения","docs":"Документы","photos":"Фото"};
  chart.items = [
    {"kind":"system","size":22},
    {"kind":"apps","size":13},
    {"kind":"docs","size":7},
    {"kind":"photos","size":3},
  ];
});

// Точечная диаграмма: «bubble» of package/src/smart/chart-scatter/examples.json.
customElements.whenDefined('sf-chart-scatter').then(() => {
  const chart = document.getElementById('home-scatter');
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

// Ящик с усами: «reference» of package/src/smart/chart-box/examples.json.
customElements.whenDefined('sf-chart-box').then(() => {
  const chart = document.getElementById('home-box');
  chart.items = [
    {"warehouse":"Москва","hours":12},
    {"warehouse":"Казань","hours":20},
    {"warehouse":"Самара","hours":4},
    {"warehouse":"Пермь","hours":26},
    {"warehouse":"Москва","hours":14},
    {"warehouse":"Казань","hours":22},
    {"warehouse":"Самара","hours":9},
    {"warehouse":"Пермь","hours":30},
    {"warehouse":"Москва","hours":15},
    {"warehouse":"Казань","hours":25},
    {"warehouse":"Самара","hours":11},
    {"warehouse":"Пермь","hours":31},
    {"warehouse":"Москва","hours":16},
    {"warehouse":"Казань","hours":27},
    {"warehouse":"Самара","hours":12},
    {"warehouse":"Пермь","hours":33},
    {"warehouse":"Москва","hours":18},
    {"warehouse":"Казань","hours":28},
    {"warehouse":"Самара","hours":13},
    {"warehouse":"Пермь","hours":36},
    {"warehouse":"Москва","hours":19},
    {"warehouse":"Казань","hours":30},
    {"warehouse":"Самара","hours":14},
    {"warehouse":"Пермь","hours":38},
    {"warehouse":"Москва","hours":21},
    {"warehouse":"Казань","hours":33},
    {"warehouse":"Самара","hours":15},
    {"warehouse":"Пермь","hours":40},
    {"warehouse":"Москва","hours":24},
    {"warehouse":"Казань","hours":35},
    {"warehouse":"Самара","hours":16},
    {"warehouse":"Пермь","hours":44},
    {"warehouse":"Москва","hours":48},
    {"warehouse":"Казань","hours":38},
    {"warehouse":"Самара","hours":18},
    {"warehouse":"Пермь","hours":52},
  ];
});

// Лепестковая диаграмма: «reference» of package/src/smart/chart-radar/examples.json.
customElements.whenDefined('sf-chart-radar').then(() => {
  const chart = document.getElementById('home-radar');
  chart.names = {"anna":"Анна","boris":"Борис"};
  chart.items = [
    {"skill":"Аналитика","anna":8,"boris":5},
    {"skill":"Код","anna":9,"boris":6},
    {"skill":"Дизайн","anna":4,"boris":8},
    {"skill":"Общение","anna":6,"boris":9},
    {"skill":"Тесты","anna":7,"boris":4},
    {"skill":"Планирование","anna":5,"boris":7},
  ];
});

// Диаграмма Санки: «reference» of package/src/smart/chart-sankey/examples.json.
customElements.whenDefined('sf-chart-sankey').then(() => {
  const chart = document.getElementById('home-sankey');
  chart.items = [
    {"from":"Продукты","to":"Выручка","amount":520},
    {"from":"Услуги","to":"Выручка","amount":280},
    {"from":"Выручка","to":"Зарплаты","amount":360},
    {"from":"Выручка","to":"Маркетинг","amount":140},
    {"from":"Выручка","to":"Аренда","amount":90},
    {"from":"Выручка","to":"Прибыль","amount":210},
    {"from":"Маркетинг","to":"Поиск","amount":80},
    {"from":"Маркетинг","to":"Соцсети","amount":60},
  ];
});

// Воронка: «reference» of package/src/smart/chart-funnel/examples.json.
customElements.whenDefined('sf-chart-funnel').then(() => {
  const chart = document.getElementById('home-funnel');
  chart.names = {"visit":"Визиты","catalog":"Каталог","cart":"Корзина","checkout":"Оформление","paid":"Оплата"};
  chart.items = [
    {"step":"visit","people":12400},
    {"step":"catalog","people":7800},
    {"step":"cart","people":2900},
    {"step":"checkout","people":1300},
    {"step":"paid","people":860},
  ];
});

// Диаграмма Ганта: «reference» of package/src/smart/chart-timeline/examples.json.
customElements.whenDefined('sf-chart-timeline').then(() => {
  const chart = document.getElementById('home-timeline');
  chart.items = {"task":["Анализ","Дизайн","Разработка","Тестирование","Обучение","Запуск"],"start":["2026-03-02","2026-03-09","2026-03-23","2026-04-13","2026-04-27","2026-05-15"],"end":["2026-03-13","2026-03-27","2026-04-24","2026-05-08","2026-05-15","2026-05-15"],"status":["готово","готово","в работе","план","план","план"]};
});

// Тепловая карта: «reference» of package/src/smart/chart-heatmap/examples.json.
customElements.whenDefined('sf-chart-heatmap').then(() => {
  const chart = document.getElementById('home-heatmap');
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
    {"hour":"9:00","day":"thu","load":38},
    {"hour":"10:00","day":"thu","load":50},
    {"hour":"11:00","day":"thu","load":66},
    {"hour":"12:00","day":"thu","load":80},
    {"hour":"13:00","day":"thu","load":86},
    {"hour":"14:00","day":"thu","load":80},
    {"hour":"15:00","day":"thu","load":66},
    {"hour":"16:00","day":"thu","load":50},
    {"hour":"17:00","day":"thu","load":38},
    {"hour":"18:00","day":"thu","load":31},
    {"hour":"9:00","day":"fri","load":40},
    {"hour":"10:00","day":"fri","load":52},
    {"hour":"11:00","day":"fri","load":68},
    {"hour":"12:00","day":"fri","load":82},
    {"hour":"13:00","day":"fri","load":88},
    {"hour":"14:00","day":"fri","load":82},
    {"hour":"15:00","day":"fri","load":68},
    {"hour":"16:00","day":"fri","load":52},
    {"hour":"17:00","day":"fri","load":40},
    {"hour":"18:00","day":"fri","load":33},
    {"hour":"9:00","day":"sat","load":34},
    {"hour":"10:00","day":"sat","load":39},
    {"hour":"11:00","day":"sat","load":44},
    {"hour":"12:00","day":"sat","load":49},
    {"hour":"13:00","day":"sat","load":51},
    {"hour":"14:00","day":"sat","load":49},
    {"hour":"15:00","day":"sat","load":44},
    {"hour":"16:00","day":"sat","load":39},
    {"hour":"17:00","day":"sat","load":34},
    {"hour":"18:00","day":"sat","load":32},
    {"hour":"9:00","day":"sun","load":36},
    {"hour":"10:00","day":"sun","load":41},
    {"hour":"11:00","day":"sun","load":46},
    {"hour":"12:00","day":"sun","load":51},
    {"hour":"13:00","day":"sun","load":53},
    {"hour":"14:00","day":"sun","load":51},
    {"hour":"15:00","day":"sun","load":46},
    {"hour":"16:00","day":"sun","load":41},
    {"hour":"17:00","day":"sun","load":36},
    {"hour":"18:00","day":"sun","load":34},
  ];
});

// Карта по областям: «reference» of package/src/smart/chart-map/examples.json.
customElements.whenDefined('sf-chart-map').then(() => {
  const chart = document.getElementById('home-map');
  chart.shapes = {"type":"FeatureCollection","features":[{"type":"Feature","id":"Лесной","properties":{"name":"Лесной"},"geometry":{"type":"Polygon","coordinates":[[[36,57],[37.102,56.895],[38.205,57],[38.272,56.475],[38.169,55.965],[37.169,55.923],[36,55.896],[36.002,56.448],[36,57]]]}},{"type":"Feature","id":"Северный","properties":{"name":"Северный"},"geometry":{"type":"Polygon","coordinates":[[[38.205,57],[39.046,56.991],[39.887,57],[39.823,56.508],[40.095,56.085],[38.964,55.99],[38.169,55.965],[38.272,56.475],[38.205,57]]]}},{"type":"Feature","id":"Озёрный","properties":{"name":"Озёрный"},"geometry":{"type":"MultiPolygon","coordinates":[[[[39.887,57],[40.944,56.957],[42,57],[42.028,56.408],[42,55.816],[41.07,55.972],[40.095,56.085],[39.823,56.508],[39.887,57]]],[[[42.3,56.4],[42.8,56.5],[42.7,56.8],[42.35,56.75],[42.3,56.4]]]]}},{"type":"Feature","id":"Западный","properties":{"name":"Западный"},"geometry":{"type":"Polygon","coordinates":[[[36,55.896],[37.169,55.923],[38.169,55.965],[37.775,55.37],[37.717,54.844],[36.69,54.829],[36,54.884],[36.106,55.39],[36,55.896]]]}},{"type":"Feature","id":"Центральный","properties":{"name":"Центральный"},"geometry":{"type":"Polygon","coordinates":[[[38.169,55.965],[38.964,55.99],[40.095,56.085],[40.233,55.588],[40.327,55.048],[39.044,54.968],[37.717,54.844],[37.775,55.37],[38.169,55.965]],[[38.79,55.382],[39.19,55.332],[39.34,55.532],[38.99,55.632],[38.79,55.382]]]}},{"type":"Feature","id":"Восточный","properties":{"name":"Восточный"},"geometry":{"type":"Polygon","coordinates":[[[40.095,56.085],[41.07,55.972],[42,55.816],[42.247,55.367],[42,54.917],[41.361,55.002],[40.327,55.048],[40.233,55.588],[40.095,56.085]]]}},{"type":"Feature","id":"Речной","properties":{"name":"Речной"},"geometry":{"type":"Polygon","coordinates":[[[36,54.884],[36.69,54.829],[37.717,54.844],[38.073,54.444],[38.384,54],[37.192,54.027],[36,54],[35.79,54.442],[36,54.884]]]}},{"type":"Feature","id":"Южный","properties":{"name":"Южный"},"geometry":{"type":"Polygon","coordinates":[[[37.717,54.844],[39.044,54.968],[40.327,55.048],[40.303,54.544],[39.884,54],[39.134,54.025],[38.384,54],[38.073,54.444],[37.717,54.844]]]}},{"type":"Feature","id":"Степной","properties":{"name":"Степной"},"geometry":{"type":"Polygon","coordinates":[[[40.327,55.048],[41.361,55.002],[42,54.917],[41.833,54.459],[42,54],[40.942,53.975],[39.884,54],[40.303,54.544],[40.327,55.048]]]}}]};
  chart.items = [
    {"district":"Лесной","rate":4.1},
    {"district":"Северный","rate":3.2},
    {"district":"Озёрный","rate":5.6},
    {"district":"Западный","rate":2.8},
    {"district":"Центральный","rate":1.9},
    {"district":"Восточный","rate":3.7},
    {"district":"Речной","rate":6.4},
    {"district":"Южный","rate":4.8},
    {"district":"Горный","rate":5},
  ];
});

// Шкала: «reference» of package/src/smart/chart-gauge/examples.json.
customElements.whenDefined('sf-chart-gauge').then(() => {
  const chart = document.getElementById('home-gauge');
  chart.bands = [{"to":70,"role":"success"},{"to":90,"role":"warning"},{"to":100,"role":"error"}];
});

// Мини-график: «tile» of package/src/smart/chart-sparkline/examples.json.
customElements.whenDefined('sf-chart-sparkline').then(() => {
  const chart = document.getElementById('home-sparkline');
  chart.items = [18,22,25,21,30,34,29,27,24,20,16,14];
});
