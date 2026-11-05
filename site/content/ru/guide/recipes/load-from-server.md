---
description: Как показать в графике SIMAI Chart данные с сервера и обновлять их — загрузка, ответ JSON, ошибка с повтором, смена фильтра и первая отрисовка из разметки — по шагам.
profile: how_to
---

# Данные с сервера

График сам в сеть не ходит: данные загружает страница и кладёт их в
`items`. Так права, фильтры и подсчёты остаются на сервере, а график только
рисует ответ.

## Перед началом

- Набор подключён к странице ([Подключение](../../connection/)).
- На сервере есть адрес, который отвечает списком записей в JSON, — здесь
  это `GET /api/sales?year=2026`, ответ
  `[{"month": "2026-01", "sales": 120, "plan": 125}, …]`. Как сделать такой
  адрес, рассказано в разделе [Серверная часть](../../server/).

## Шаги

1. Поставьте график в состоянии загрузки. Он сразу держит свою высоту, и
   когда данные придут, на странице ничего не сдвинется:

   ```html
   <sf-chart-line id="sales" label="Продажи и план, 2026" x="month" y="sales,plan"
     y-format="integer" data-state="loading"></sf-chart-line>
   ```

2. Загрузите данные и отдайте их графику. После загрузки верните
   `data-state="auto"`: с записями график нарисует их, без записей покажет
   «Нет данных». Если запрос не удался, поставьте `data-state="error"`:

   ```js
   await customElements.whenDefined('sf-chart-line');
   const chart = document.querySelector('#sales');
   chart.names = {sales: 'Продажи', plan: 'План'};
   let request = null;

   async function load(year) {
     request?.abort();
     request = new AbortController();
     chart.setAttribute('data-state', 'loading');
     try {
       const response = await fetch(`/api/sales?year=${year}`, {signal: request.signal});
       if (!response.ok) throw new Error(String(response.status));
       chart.items = await response.json();
       chart.setAttribute('data-state', 'auto');
     } catch (error) {
       if (error.name !== 'AbortError') chart.setAttribute('data-state', 'error');
     }
   }

   load(2026);
   ```

   `AbortController` отменяет прежний запрос, когда начинается новый.
   Так медленный старый ответ не перепишет свежий.

3. Ответьте на просьбу повторить. В состоянии ошибки у графика есть
   кнопка «Повторить»; она отправляет событие `sf-chart-line-refresh`:

   ```js
   chart.addEventListener('sf-chart-line-refresh', () => load(2026));
   ```

4. Обновляйте данные, когда человек меняет фильтр или пришли новые
   значения: просто вызовите `load` снова или присвойте `items` новый
   список. Таблица
   догоняет поток данных не чаще раза в секунду.

5. Если сервер знает данные уже при отрисовке страницы, напечатайте их в
   разметке JSON-блоком. График нарисует их сразу, без состояния загрузки,
   а скрипт потом может обновить их тем же `load`:

   ```html
   <sf-chart-line id="sales" label="Продажи и план, 2026" x="month" y="sales,plan">
     <script type="application/json" data-sf-settings>
       {"names": {"sales": "Продажи", "plan": "План"},
        "items": [{"month": "2026-01", "sales": 120, "plan": 125}]}
     </script>
   </sf-chart-line>
   ```

## Результат

График показывает данные сервера, держит место, пока они идут, и
предлагает повторить, если сервер не ответил. Как выглядят эти состояния,
можно попробовать в рецепте [Загрузка, пусто и ошибка](../states/).

Ответ сервера — те же записи, что описаны в разделе
[Данные](../../concepts/data/): числа числами, даты в ISO 8601, пропуск как
`null`.

## См. также

- [Серверная часть](../../server/)
- [Настройки](../../concepts/settings/) — JSON-блок и `data-state`.
- [Большие данные](../../large-data/)
