// The home page: one live chart per tab, with the data of the charts' own
// examples (package/src/smart/<folder>/examples.json). Lists and objects are
// properties, set once the element is defined.
const set = (selector, values) => {
  const element = document.querySelector(selector);
  customElements.whenDefined(element.localName).then(() => Object.assign(element, values));
};

set('#home-dynamics', {
  names: {"sales": "Продажи", "plan": "План"},
  items: [
    {"month": "2026-01", "sales": 120, "plan": 125},
    {"month": "2026-02", "sales": 132, "plan": 130},
    {"month": "2026-03", "sales": 128, "plan": 135},
    {"month": "2026-04", "sales": 150, "plan": 145},
    {"month": "2026-05", "sales": 171, "plan": 160},
    {"month": "2026-06", "sales": 165, "plan": 165},
    {"month": "2026-07", "sales": 180, "plan": 175},
    {"month": "2026-08", "sales": 176, "plan": 180},
    {"month": "2026-09", "sales": 190, "plan": 185},
    {"month": "2026-10", "sales": 204, "plan": 195},
    {"month": "2026-11", "sales": 198, "plan": 205},
    {"month": "2026-12", "sales": 221, "plan": 215},
  ],
});

set('#home-plan', {
  names: {"fact": "Факт", "plan": "План"},
  items: [
    {"month": "Янв", "fact": 180, "plan": 175},
    {"month": "Фев", "fact": 176, "plan": 180},
    {"month": "Мар", "fact": 190, "plan": 185},
    {"month": "Апр", "fact": 204, "plan": 195},
    {"month": "Май", "fact": 198, "plan": 205},
    {"month": "Июн", "fact": 221, "plan": 215},
  ],
});

set('#home-structure', {
  items: [
    {"id": "Электроника"},
    {"id": "Смартфоны", "parent": "Электроника", "value": 420},
    {"id": "Ноутбуки", "parent": "Электроника", "value": 310},
    {"id": "Наушники", "parent": "Электроника", "value": 120},
    {"id": "Планшеты", "parent": "Электроника", "value": 90},
    {"id": "Дом"},
    {"id": "Мебель", "parent": "Дом", "value": 260},
    {"id": "Посуда", "parent": "Дом", "value": 110},
    {"id": "Текстиль", "parent": "Дом", "value": 70},
    {"id": "Одежда"},
    {"id": "Обувь", "parent": "Одежда", "value": 180},
    {"id": "Верхняя одежда", "parent": "Одежда", "value": 150},
    {"id": "Аксессуары", "parent": "Одежда", "value": 60},
  ],
});

set('#home-flows', {
  items: [
    {"from": "Продукты", "to": "Выручка", "amount": 520},
    {"from": "Услуги", "to": "Выручка", "amount": 280},
    {"from": "Выручка", "to": "Зарплаты", "amount": 360},
    {"from": "Выручка", "to": "Маркетинг", "amount": 140},
    {"from": "Выручка", "to": "Аренда", "amount": 90},
    {"from": "Выручка", "to": "Прибыль", "amount": 210},
    {"from": "Маркетинг", "to": "Поиск", "amount": 80},
    {"from": "Маркетинг", "to": "Соцсети", "amount": 60},
  ],
});

set('#home-schedule', {
  items: {"task": ["Анализ", "Дизайн", "Разработка", "Тестирование", "Обучение", "Запуск"], "start": ["2026-03-02", "2026-03-09", "2026-03-23", "2026-04-13", "2026-04-27", "2026-05-15"], "end": ["2026-03-13", "2026-03-27", "2026-04-24", "2026-05-08", "2026-05-15", "2026-05-15"], "status": ["готово", "готово", "в работе", "план", "план", "план"]},
});

set('#home-load', {
  names: {"mon": "Пн", "tue": "Вт", "wed": "Ср", "thu": "Чт", "fri": "Пт", "sat": "Сб", "sun": "Вс"},
  items: [
    {"hour": "9:00", "day": "mon", "load": 32},
    {"hour": "10:00", "day": "mon", "load": 44},
    {"hour": "11:00", "day": "mon", "load": 60},
    {"hour": "12:00", "day": "mon", "load": 74},
    {"hour": "13:00", "day": "mon", "load": 80},
    {"hour": "14:00", "day": "mon", "load": 74},
    {"hour": "15:00", "day": "mon", "load": 60},
    {"hour": "16:00", "day": "mon", "load": 44},
    {"hour": "17:00", "day": "mon", "load": 32},
    {"hour": "18:00", "day": "mon", "load": 25},
    {"hour": "9:00", "day": "tue", "load": 34},
    {"hour": "10:00", "day": "tue", "load": 46},
    {"hour": "11:00", "day": "tue", "load": 62},
    {"hour": "12:00", "day": "tue", "load": 76},
    {"hour": "13:00", "day": "tue", "load": 82},
    {"hour": "14:00", "day": "tue", "load": 76},
    {"hour": "15:00", "day": "tue", "load": 62},
    {"hour": "16:00", "day": "tue", "load": 46},
    {"hour": "17:00", "day": "tue", "load": 34},
    {"hour": "18:00", "day": "tue", "load": 27},
    {"hour": "9:00", "day": "wed", "load": 36},
    {"hour": "10:00", "day": "wed", "load": 48},
    {"hour": "11:00", "day": "wed", "load": 64},
    {"hour": "12:00", "day": "wed", "load": 78},
    {"hour": "13:00", "day": "wed", "load": 84},
    {"hour": "14:00", "day": "wed", "load": 78},
    {"hour": "15:00", "day": "wed", "load": 64},
    {"hour": "16:00", "day": "wed", "load": 48},
    {"hour": "17:00", "day": "wed", "load": 36},
    {"hour": "18:00", "day": "wed", "load": 29},
    {"hour": "9:00", "day": "thu", "load": 38},
    {"hour": "10:00", "day": "thu", "load": 50},
    {"hour": "11:00", "day": "thu", "load": 66},
    {"hour": "12:00", "day": "thu", "load": 80},
    {"hour": "13:00", "day": "thu", "load": 86},
    {"hour": "14:00", "day": "thu", "load": 80},
    {"hour": "15:00", "day": "thu", "load": 66},
    {"hour": "16:00", "day": "thu", "load": 50},
    {"hour": "17:00", "day": "thu", "load": 38},
    {"hour": "18:00", "day": "thu", "load": 31},
    {"hour": "9:00", "day": "fri", "load": 40},
    {"hour": "10:00", "day": "fri", "load": 52},
    {"hour": "11:00", "day": "fri", "load": 68},
    {"hour": "12:00", "day": "fri", "load": 82},
    {"hour": "13:00", "day": "fri", "load": 88},
    {"hour": "14:00", "day": "fri", "load": 82},
    {"hour": "15:00", "day": "fri", "load": 68},
    {"hour": "16:00", "day": "fri", "load": 52},
    {"hour": "17:00", "day": "fri", "load": 40},
    {"hour": "18:00", "day": "fri", "load": 33},
    {"hour": "9:00", "day": "sat", "load": 34},
    {"hour": "10:00", "day": "sat", "load": 39},
    {"hour": "11:00", "day": "sat", "load": 44},
    {"hour": "12:00", "day": "sat", "load": 49},
    {"hour": "13:00", "day": "sat", "load": 51},
    {"hour": "14:00", "day": "sat", "load": 49},
    {"hour": "15:00", "day": "sat", "load": 44},
    {"hour": "16:00", "day": "sat", "load": 39},
    {"hour": "17:00", "day": "sat", "load": 34},
    {"hour": "18:00", "day": "sat", "load": 32},
    {"hour": "9:00", "day": "sun", "load": 36},
    {"hour": "10:00", "day": "sun", "load": 41},
    {"hour": "11:00", "day": "sun", "load": 46},
    {"hour": "12:00", "day": "sun", "load": 51},
    {"hour": "13:00", "day": "sun", "load": 53},
    {"hour": "14:00", "day": "sun", "load": 51},
    {"hour": "15:00", "day": "sun", "load": 46},
    {"hour": "16:00", "day": "sun", "load": 41},
    {"hour": "17:00", "day": "sun", "load": 36},
    {"hour": "18:00", "day": "sun", "load": 34},
  ],
});

set('#home-map', {
  shapes: {"type": "FeatureCollection", "features": [{"type": "Feature", "id": "Лесной", "properties": {"name": "Лесной"}, "geometry": {"type": "Polygon", "coordinates": [[[36, 57], [37.102, 56.895], [38.205, 57], [38.272, 56.475], [38.169, 55.965], [37.169, 55.923], [36, 55.896], [36.002, 56.448], [36, 57]]]}}, {"type": "Feature", "id": "Северный", "properties": {"name": "Северный"}, "geometry": {"type": "Polygon", "coordinates": [[[38.205, 57], [39.046, 56.991], [39.887, 57], [39.823, 56.508], [40.095, 56.085], [38.964, 55.99], [38.169, 55.965], [38.272, 56.475], [38.205, 57]]]}}, {"type": "Feature", "id": "Озёрный", "properties": {"name": "Озёрный"}, "geometry": {"type": "MultiPolygon", "coordinates": [[[[39.887, 57], [40.944, 56.957], [42, 57], [42.028, 56.408], [42, 55.816], [41.07, 55.972], [40.095, 56.085], [39.823, 56.508], [39.887, 57]]], [[[42.3, 56.4], [42.8, 56.5], [42.7, 56.8], [42.35, 56.75], [42.3, 56.4]]]]}}, {"type": "Feature", "id": "Западный", "properties": {"name": "Западный"}, "geometry": {"type": "Polygon", "coordinates": [[[36, 55.896], [37.169, 55.923], [38.169, 55.965], [37.775, 55.37], [37.717, 54.844], [36.69, 54.829], [36, 54.884], [36.106, 55.39], [36, 55.896]]]}}, {"type": "Feature", "id": "Центральный", "properties": {"name": "Центральный"}, "geometry": {"type": "Polygon", "coordinates": [[[38.169, 55.965], [38.964, 55.99], [40.095, 56.085], [40.233, 55.588], [40.327, 55.048], [39.044, 54.968], [37.717, 54.844], [37.775, 55.37], [38.169, 55.965]], [[38.79, 55.382], [39.19, 55.332], [39.34, 55.532], [38.99, 55.632], [38.79, 55.382]]]}}, {"type": "Feature", "id": "Восточный", "properties": {"name": "Восточный"}, "geometry": {"type": "Polygon", "coordinates": [[[40.095, 56.085], [41.07, 55.972], [42, 55.816], [42.247, 55.367], [42, 54.917], [41.361, 55.002], [40.327, 55.048], [40.233, 55.588], [40.095, 56.085]]]}}, {"type": "Feature", "id": "Речной", "properties": {"name": "Речной"}, "geometry": {"type": "Polygon", "coordinates": [[[36, 54.884], [36.69, 54.829], [37.717, 54.844], [38.073, 54.444], [38.384, 54], [37.192, 54.027], [36, 54], [35.79, 54.442], [36, 54.884]]]}}, {"type": "Feature", "id": "Южный", "properties": {"name": "Южный"}, "geometry": {"type": "Polygon", "coordinates": [[[37.717, 54.844], [39.044, 54.968], [40.327, 55.048], [40.303, 54.544], [39.884, 54], [39.134, 54.025], [38.384, 54], [38.073, 54.444], [37.717, 54.844]]]}}, {"type": "Feature", "id": "Степной", "properties": {"name": "Степной"}, "geometry": {"type": "Polygon", "coordinates": [[[40.327, 55.048], [41.361, 55.002], [42, 54.917], [41.833, 54.459], [42, 54], [40.942, 53.975], [39.884, 54], [40.303, 54.544], [40.327, 55.048]]]}}]},
  items: [
    {"district": "Лесной", "rate": 4.1},
    {"district": "Северный", "rate": 3.2},
    {"district": "Озёрный", "rate": 5.6},
    {"district": "Западный", "rate": 2.8},
    {"district": "Центральный", "rate": 1.9},
    {"district": "Восточный", "rate": 3.7},
    {"district": "Речной", "rate": 6.4},
    {"district": "Южный", "rate": 4.8},
    {"district": "Горный", "rate": 5.0},
  ],
});

set('#home-gauge', {bands: [{"to": 70, "role": "success"}, {"to": 90, "role": "warning"}, {"to": 100, "role": "error"}]});
set('#home-queue', {items: [18, 22, 25, 21, 30, 34, 29, 27, 24, 20, 16, 14]});
