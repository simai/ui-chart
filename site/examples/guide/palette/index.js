// A named palette with one colour of the page's own: the example «stacked»
// of package/src/smart/chart-bar/examples.json, palette="vivid", and the
// partners' series on the neutral role (colors wins over the palette).
customElements.whenDefined('sf-chart-bar').then(() => {
  const chart = document.getElementById('guide-palette');
  chart.names = {web: 'Сайт', shop: 'Магазин', partners: 'Партнёры'};
  chart.colors = {partners: 'neutral'};
  chart.items = [
    {month: '2026-07', web: 42, shop: 30, partners: 12},
    {month: '2026-08', web: 45, shop: 28, partners: 15},
    {month: '2026-09', web: 51, shop: 26, partners: 14},
    {month: '2026-10', web: 55, shop: 25, partners: 18},
    {month: '2026-11', web: 58, shop: 24, partners: 20},
    {month: '2026-12', web: 66, shop: 29, partners: 22},
  ];
});
