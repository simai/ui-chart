---
description: Что такое SIMAI Chart, какие графики в него входят, как график работает с данными страницы и с чего начать.
profile: landing
---

# Введение

SIMAI Chart — набор компонентов `chart` для SIMAI Framework: девятнадцать
графиков, от линии и столбцов до воронки, диаграммы Ганта и карты по
областям. Страница отдаёт графику данные, а он рисует их, объясняет словами
и показывает те же данные таблицей.

Набор ещё не выпущен: все компоненты — предварительные версии 0.x. Как
подключить набор и когда заработает строка подключения, рассказано в
разделе [Подключение](connection/).

## Что входит в набор

Каждый график — свой тег `sf-chart-*`. Виды одного графика — настройки, а не
отдельные теги: стопка площадей — это `stack` у линейного графика,
гистограмма — `bin` у столбчатой диаграммы.

| Группа | Графики |
|:---|:---|
| Динамика и сравнение | [`sf-chart-line`](/ru/components/trends/chart-line/), [`sf-chart-bar`](/ru/components/trends/chart-bar/), [`sf-chart-sparkline`](/ru/components/trends/chart-sparkline/), [`sf-chart-candlestick`](/ru/components/trends/chart-candlestick/), [`sf-chart-waterfall`](/ru/components/trends/chart-waterfall/) |
| Доли и состав | [`sf-chart-pie`](/ru/components/parts/chart-pie/), [`sf-chart-parts`](/ru/components/parts/chart-parts/), [`sf-chart-treemap`](/ru/components/parts/chart-treemap/), [`sf-chart-sunburst`](/ru/components/parts/chart-sunburst/) |
| Распределение и связь | [`sf-chart-scatter`](/ru/components/relations/chart-scatter/), [`sf-chart-box`](/ru/components/relations/chart-box/), [`sf-chart-radar`](/ru/components/relations/chart-radar/) |
| Процессы и потоки | [`sf-chart-funnel`](/ru/components/flows/chart-funnel/), [`sf-chart-sankey`](/ru/components/flows/chart-sankey/), [`sf-chart-timeline`](/ru/components/flows/chart-timeline/) |
| Сетки и карты | [`sf-chart-heatmap`](/ru/components/grids/chart-heatmap/), [`sf-chart-map`](/ru/components/grids/chart-map/) |
| Показатели | [`sf-chart-metric`](/ru/components/indicators/chart-metric/), [`sf-chart-gauge`](/ru/components/indicators/chart-gauge/) |

Графики рисует сам набор, без чужих библиотек. Цвета, шрифты и отступы
берутся из темы SIMAI Framework, поэтому график выглядит как остальная
страница — и в светлой, и в тёмной теме.

## Как работает график

:::diagram {engine=mermaid title="Страница, график и человек"}
flowchart LR
  S["Сервер или страница"] -- "items: записи" --> C["sf-chart-*"]
  C --> P["рисунок: оси, отметки, легенда"]
  C --> W["описание словами"]
  C --> T["таблица с теми же данными"]
  H["Человек: указатель и клавиатура"] <--> C
:::

1. **Данные приходят от страницы.** Страница кладёт в свойство `items`
   список записей, а атрибуты называют поля: `x="month"`, `y="sales"`.
   График сам в сеть не ходит.
2. **График рисует.** Оси, сетку, отметки и легенду он строит сам по
   данным. Пропущенное значение остаётся пропуском и никогда не
   рисуется нулём.
3. **Подсказка.** Под указателем — значения в этой точке.
4. **Клавиатура.** Область графика — одна остановка `Tab`, по точкам,
   столбцам и частям ходят стрелками. Каждый шаг произносит экранный
   диктор — программа, которая читает страницу вслух.
5. **Описание.** График говорит словами, что показывают данные: диапазон,
   наибольшее и наименьшее, итог.
6. **Таблица.** Те же данные всегда есть таблицей: по кнопке, под графиком
   или только для экранного диктора.

## С чего начать

1. [Быстрый старт](quick-start/) — рабочий график за пять минут.
2. [Подключение](connection/) — одна строка, версии и лицензия.
3. [Основы](concepts/) — данные, настройки, цвета, описание и таблица.
4. [Рецепты](recipes/) — как выбрать график, загрузить данные, собрать
   панель.
5. [Серверная часть](server/) — как сервер отдаёт графику данные.

## См. также

- [Компоненты](/ru/components/) — справочник каждого графика.
- [Как выбрать график](recipes/choose/)
- [Вопросы и ответы](faq/)
