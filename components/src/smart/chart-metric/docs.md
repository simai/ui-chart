# Smart Metric

`<sf-chart-metric>` — плитка показателя: одно важное число с подписью, изменение к
прошлому периоду, предел со шкалой, статус с подсказкой и мини-график. Это KPI
каталога и плитка метрики Larena (нагрузка сервера, хранилище, трафик,
очередь, лимиты лицензии).

```html
<sf-chart-metric label="Выручка за неделю" value="1250000" previous="1100000"
           format="currency-RUB" period-text="к прошлой неделе"></sf-chart-metric>
```

## Значение

- `value` — число; без него плитка пишет «—».
- `format` — `number`, `integer`, `decimal-<n>`, `percent` (доля 0..1),
  `compact`, `currency-<КОД>` или `unit-<единица Intl>` (`unit-gigabyte`,
  `unit-megabit-per-second`), на языке страницы. Строка значения не
  переносится посреди числа.

## Изменение

- `previous` — значение прошлого периода; изменение считается от него.
- `delta` — само изменение, если оно уже есть; важнее `previous`.
- `delta-format` — `percent` (доля от прошлого), `absolute` (разница) или `both`.
- `period-text` — к чему изменение: «к прошлой неделе».
- `better` — хорош ли рост: `up` (выручка), `down` (нагрузка, ошибки), `none`.
  Тон изменения следует смыслу, а не знаку. Направление видно стрелкой и звучит
  словом («рост», «снижение»), так что цвет — не единственный признак.

## Предел

`max` показывает «45,3 ГБ из 100 ГБ» и шкалу. Для чтения с экрана это `meter`
со значением; полоса внутри — `sf-progress-bar`, скрытая от дерева
доступности. `limit-text` заменяет подпись под шкалой.

## Статус

`status` — `neutral`, `success`, `warning`, `error` или `info` (общий словарь
статусов) и `hint` — короткая строка рядом. Статус — утверждение страницы:
пороги задаёт страница, плитка не выводит статус из значения. Перед подсказкой
звучит слово статуса («Внимание:»).

## Нажатие

- `href` делает всю плитку одной ссылкой.
- `openable` (без `href`) — одной кнопкой, которая шлёт `sf-chart-metric-open`.
- Внутри нет других элементов управления.

## График

Слот `chart` принимает график под числом, обычно `sf-chart-sparkline` того же ряда.
Он растягивается по ширине плитки.

```html
<sf-chart-metric label="Очередь заданий" value="14" delta="-6" delta-format="absolute" better="down" format="integer">
  <sf-chart-sparkline slot="chart" label="Очередь за день" summary="none"></sf-chart-sparkline>
</sf-chart-metric>
```

## Состояния и размеры

- `data-state`: `auto` (со значением — готово, без — «—»), `loading` (тот же
  размер, заглушка вместо числа), `empty`. Ошибку загрузки страница показывает
  статусом `error` с подсказкой.
- `size`: `1/2` (плотный ряд), `1`, `2` (главная цифра страницы).
- Плитка тянется по ширине, страница раскладывает плитки сама; самая узкая
  ширина — `--sf-chart-metric-min-inline-size`.

## Переменные CSS

`--sf-chart-metric-background-color`, `--sf-chart-metric-label-color`,
`--sf-chart-metric-value-color`, `--sf-chart-metric-positive-color`,
`--sf-chart-metric-negative-color`, `--sf-chart-metric-meter-color`,
`--sf-chart-metric-hover-background-color`, `--sf-chart-metric-min-inline-size`.
