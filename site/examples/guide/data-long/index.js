// The long form: one record per month and channel, the series named by a
// field (series="channel"). The data is the example «stacked» of
// package/src/smart/chart-line/examples.json, laid out long; the shop's
// September is a gap (null), drawn as a break and never as zero.
customElements.whenDefined('sf-chart-line').then(() => {
  const chart = document.getElementById('guide-data-long');
  const wide = [
    {month: '2026-07', web: 42, shop: 30, partners: 12},
    {month: '2026-08', web: 45, shop: 28, partners: 15},
    {month: '2026-09', web: 51, shop: null, partners: 14},
    {month: '2026-10', web: 55, shop: 25, partners: 18},
    {month: '2026-11', web: 58, shop: 24, partners: 20},
    {month: '2026-12', web: 66, shop: 29, partners: 22},
  ];
  chart.names = {web: 'Сайт', shop: 'Магазин', partners: 'Партнёры'};
  chart.items = wide.flatMap(({month, ...channels}) =>
    Object.entries(channels).map(([channel, orders]) => ({month, channel, orders})));
});
