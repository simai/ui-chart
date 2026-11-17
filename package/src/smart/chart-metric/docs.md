# Smart Metric

Плитка показателя — это `<sf-tile-metric>` из SIMAI Framework: одно важное
число с подписью, изменение к прошлому периоду, предел со шкалой, статус с
подсказкой и мини-график в слоте `chart`. Для мини-графика набор даёт
`sf-chart-sparkline`.

`<sf-chart-metric>` — прежнее имя этой плитки в наборе. Теперь это
**псевдоним `sf-tile-metric` до 2027-01-01**: старая разметка продолжает
работать и рисуется плиткой Framework, но новых возможностей у неё не будет.
Пишите `<sf-tile-metric>`.

```html
<sf-tile-metric label="Выручка за неделю" value="1250000" previous="1100000"
                format="currency-RUB" period-text="к прошлой неделе">
  <sf-chart-sparkline slot="chart" label="Выручка по дням" shape="area"></sf-chart-sparkline>
</sf-tile-metric>
```

## Переход с sf-chart-metric

- Тег: `<sf-chart-metric>` → `<sf-tile-metric>`. Параметры называются так же:
  `label`, `value`, `format`, `previous`, `delta`, `delta-format`,
  `period-text`, `better`, `max`, `limit-text`, `status`, `hint`, `href`,
  `openable`, `size`.
- Загрузка: `data-state="loading"` → `loading`. `data-state="empty"` не нужен:
  без `value` плитка и так пишет «—».
- Событие: `sf-chart-metric-open` → `sf-tile-metric-open`; в `detail` теперь
  `id` элемента. До 2027-01-01 старое имя приходит вместе с новым.
- Переменные CSS: `--sf-chart-metric-background-color`,
  `--sf-chart-metric-value-color` и `--sf-chart-metric-hover-background-color`
  → `--sf-tile-metric-background-color`, `--sf-tile-metric-value-color`,
  `--sf-tile-metric-hover-background-color`. Ширину ряда плиток задаёт класс
  `sf-tile-metric-grid` на родителе и `--sf-tile-metric-min-width`. Цвета
  подписи, изменения и шкалы плитка берёт из ролей статуса: прежние
  `-label-color`, `-positive-color`, `-negative-color`, `-meter-color` больше
  не читаются.
- Плитка Framework пишет деньги целыми («1 250 000 ₽»); копейки — с
  `format="currency-RUB decimal-2"`, «1,3 млн ₽» — с `compact`. Пороги шкалы
  задают `warning-at` и `error-at`, единицу, которую не знает Intl, — `unit`.

## Мини-график

Слот `chart` принимает `sf-chart-sparkline` того же ряда. Плитка кладёт его
под числами на всю ширину, высотой 32 px и цветом подсказки, без осей и
подписей. Данные мини-графику страница передаёт сама, как обычно:

```js
document.querySelector('sf-tile-metric sf-chart-sparkline').items = [980, 1040, 1110, 1250];
```

## Что осталось за набором

Плитку, её параметры, доступность и вид описывает SIMAI Framework
(`sf-tile-metric`). Набор отвечает за мини-график `sf-chart-sparkline` и до
2027-01-01 — за псевдоним `sf-chart-metric`.

## Переменные CSS

`--sf-chart-metric-background-color`, `--sf-chart-metric-value-color`,
`--sf-chart-metric-hover-background-color`, `--sf-chart-metric-min-inline-size`
(только у псевдонима, до 2027-01-01).
