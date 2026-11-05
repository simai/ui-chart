// The chart's data states, set by the page: data-state="loading" before a
// request, "error" when it fails, "auto" once the rows are in (with rows the
// chart, without them «Нет данных»). The retry button of the error state
// sends sf-chart-bar-refresh, and the page loads again. The rows are the
// example «reference» of package/src/smart/chart-bar/examples.json.
const initializeStates = async () => {
  const root = document.querySelector('[data-guide-states]');
  if (!root || root.dataset.exampleReady === 'true') return;
  await customElements.whenDefined('sf-chart-bar');
  root.dataset.exampleReady = 'true';
  const chart = root.querySelector('#guide-states-chart');
  const log = root.querySelector('[data-log]');
  const rows = [
    {city: 'Москва', q1: 420, q2: 465},
    {city: 'Санкт-Петербург', q1: 310, q2: 298},
    {city: 'Казань', q1: 180, q2: 214},
    {city: 'Новосибирск', q1: 150, q2: 171},
    {city: 'Екатеринбург', q1: 164, q2: 159},
    {city: 'Нижний Новгород', q1: 120, q2: null},
  ];
  chart.names = {q1: 'I квартал', q2: 'II квартал'};
  const show = (state) => {
    chart.items = state === 'auto' ? rows : [];
    chart.setAttribute('data-state', state === 'empty' ? 'auto' : state);
    root.querySelectorAll('[data-state-choice]').forEach((button) => {
      const pressed = button.dataset.stateChoice === state;
      button.classList.toggle('active', pressed);
      button.setAttribute('aria-pressed', String(pressed));
    });
  };
  root.querySelector('[data-states]').addEventListener('click', (event) => {
    const button = event.target.closest('[data-state-choice]');
    if (button) { log.textContent = ''; show(button.dataset.stateChoice); }
  });
  chart.addEventListener('sf-chart-bar-refresh', () => {
    log.textContent = 'Повторная загрузка…';
    show('loading');
    setTimeout(() => { show('auto'); log.textContent = 'Загружено.'; }, 800);
  });
  show('auto');
};

initializeStates();
