---
description: Плитка показателя sf-tile-metric из SIMAI Framework — одно важное число с изменением, пределом, статусом и мини-графиком; sf-chart-metric — её псевдоним до 2027-01-01.
profile: reference
---

# Плитка показателя

:badge[sf-tile-metric]{variant=main scheme=on-surface size=1} :badge[sf-chart-metric — псевдоним до 2027-01-01]{variant=tonal scheme=warning size=1}

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

## Примеры

### Выручка с изменением

:::example {id="components/chart-metric-reference" label="Выручка с изменением"}
:::

### Нагрузка: рост — это плохо

:::example {id="components/chart-metric-load" label="Нагрузка: рост — это плохо"}
:::

### Хранилище с пределом

:::example {id="components/chart-metric-storage" label="Хранилище с пределом"}
:::

### Плитка-ссылка

:::example {id="components/chart-metric-link" label="Плитка-ссылка"}
:::

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

## Параметры

Справочник собран из манифеста компонента в сборке набора с коммита `f5bff4e90a69` и обновляется вместе с ней. Каждому атрибуту соответствует свойство элемента с тем же именем в camelCase: `y-format` — `yFormat`.

| | |
|:---|:---|
| Тег | `<sf-chart-metric>` |
| Назначение | Псевдоним плитки показателя SIMAI Framework sf-tile-metric до 2027-01-01 (решение C168): те же настройки, слот chart для sf-chart-sparkline, прежние data-state, имя события и публичные переменные переведены на плитку. На новых страницах пишите `<sf-tile-metric>`. |
| Контракт | `smart.chart-metric`, версия `1.0.0` |
| Жизненный цикл | экспериментальный: API может меняться между выпусками |

### Атрибуты

- `template` — `string`, по умолчанию `default`. Имя варианта шаблона для внешних шаблонов SfBaseElement.
- `root-class` — `string`, по умолчанию пусто. Классы, которые добавляются корневому элементу, который рисует компонент.
- `root-style` — `string`, по умолчанию пусто. Встроенные стили корневого элемента, который рисует компонент, включая пользовательские свойства.
- `label` — `string`, по умолчанию пусто. Что это за число, в нескольких словах: доступное имя плитки. label плитки sf-tile-metric: без него плитка называется «Показатель».
- `value` — `number`. Само число. Без него плитка показывает «—». value плитки sf-tile-metric.
- `format` — `string`, по умолчанию `number`. format плитки sf-tile-metric: number, integer, `decimal-<n>`, percent (доля 0..1), compact, `currency-<CODE>` или `unit-<Intl unit>`, на языке страницы; деньги пишутся целыми, если не задана точность (currency-RUB decimal-2). Изменение и предел пишутся так же.
- `previous` — `number`. Значение прошлого периода; изменение считается от него, если delta не задано. Та же настройка, что у sf-tile-metric.
- `delta` — `number`. Само изменение, если оно есть у страницы; оно главнее previous. Та же настройка, что у sf-tile-metric.
- `delta-format` — `string`, по умолчанию `percent`, значения: `percent`, `absolute`, `both`. Как писать изменение: долей от прошлого значения, разницей в формате значения или обоими. Без прошлого значения — разницей. Та же настройка, что у sf-tile-metric.
- `period-text` — `string`, по умолчанию пусто. С чем сравнивается изменение, после него: «к прошлой неделе». Та же настройка, что у sf-tile-metric.
- `better` — `string`, по умолчанию `up`, значения: `up`, `down`, `none`. Хорош ли рост: up для продаж, down для нагрузки на сервер или ошибок, none, если ни то ни другое. Тон изменения следует смыслу, а не знаку. Та же настройка, что у sf-tile-metric.
- `max` — `number`. Предел: плитка показывает «значение из предела» с полосой (хранилище, лицензия, квота). Та же настройка, что у sf-tile-metric.
- `limit-text` — `string`, по умолчанию пусто. Слова под полосой вместо «45 ГБ из 100 ГБ». Та же настройка, что у sf-tile-metric.
- `status` — `string`, по умолчанию `neutral`, значения: `neutral`, `success`, `warning`, `error`, `info`. Что страница говорит о числе, в общем словаре состояний: status плитки sf-tile-metric, значок состояния этого тона перед подсказкой. Пороги задаёт страница (warning-at и error-at плитки sf-tile-metric).
- `hint` — `string`, по умолчанию пусто. Короткая строка рядом с состоянием. Та же настройка, что у sf-tile-metric.
- `href` — `string`, по умолчанию пусто. Делает всю плитку одной ссылкой на этот адрес. Та же настройка, что у sf-tile-metric.
- `openable` — `boolean`, по умолчанию `false`. Без href: делает всю плитку одной кнопкой, которая отправляет open. Та же настройка, что у sf-tile-metric.
- `size` — `string`, по умолчанию `1`, значения: `1/2`, `1`, `2`. Ступень шкалы размеров: текст значения, отступы. 1/2 для плотного ряда, 2 для главного числа страницы. Та же настройка, что у sf-tile-metric.
- `data-state` — `string`, по умолчанию `auto`, значения: `auto`, `loading`, `ready`, `empty`. Прежняя настройка состояния, действует до 2027-01-01: loading — это loading плитки sf-tile-metric (подпись остаётся, строки ожидания держат место, aria-busy); empty рисует плитку без значения («—»); auto и ready следуют значению. Вместо неё пишите loading у sf-tile-metric.

## События

События приходят на сам элемент и всплывают.

- `sf-chart-metric-open` — `detail`: `{ id: string }`. Человек нажал на открываемую плитку (щелчок, Enter или пробел): open {id} плитки sf-tile-metric, отправляется как sf-tile-metric-open и до 2027-01-01 также как sf-chart-metric-open с тем же detail; страница открывает подробности.

## Методы

Публичных методов нет.

## CSS-переменные

Задаются на элементе или на любом предке.

| Переменная | Тип | Что задаёт |
|:---|:---|:---|
| `--sf-chart-metric-background-color` | `color` | Цвет фона плитки. |
| `--sf-chart-metric-value-color` | `color` | Цвет числа. |
| `--sf-chart-metric-hover-background-color` | `color` | Цвет фона плитки при наведении. |
| `--sf-chart-metric-min-inline-size` | `length` | Минимальная ширина плитки. |

## Доступность

- Роль: `group`.
- Доступное имя: обязательно.
- Клавиши: `Tab`, `Enter`, `Space`.
- Фокус: Для обычной плитки нет; одна остановка Tab для плитки-ссылки или плитки-кнопки.

## Источник

- `simai/ui-chart@f5bff4e90a69:package/src/smart/chart-metric`

## См. также

- [Шкала](../chart-gauge/)
- [Подключение](/ru/guide/connection/)
