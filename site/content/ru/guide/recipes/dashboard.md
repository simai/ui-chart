---
description: Как собрать панель из плиток — плитка показателя SIMAI Framework с изменением и статусом, мини-график SIMAI Chart в плитке и шкала с зонами — по шагам.
profile: how_to
---

# Панель из плиток

Верхний ряд панели — несколько важных чисел: выручка, нагрузка, место на
диске. Для них три компонента: плитка показателя `sf-tile-metric` из
SIMAI Framework, мини-график `sf-chart-sparkline` и шкала `sf-chart-gauge`
из набора. Прежняя плитка набора `sf-chart-metric` — псевдоним
`sf-tile-metric` до 2027-01-01: она работает, но новые страницы пишут
`sf-tile-metric`.

## Перед началом

- Набор подключён к странице ([Подключение](../../connection/)).
- Известны числа: текущее значение, прошлое значение или изменение, пределы
  и пороги — что считать нормой, а что тревогой.

## Шаги

1. Поставьте плитку показателя. `value` — число, `format` — как его
   показать, `previous` — значение прошлого периода, от которого плитка
   считает изменение, `period-text` — к чему изменение:

   ```html
   <sf-tile-metric label="Выручка за неделю" value="1250000" previous="1100000"
     format="currency-RUB" period-text="к прошлой неделе"></sf-tile-metric>
   ```

2. Скажите, хорош ли рост. У выручки рост — хорошо, у нагрузки и ошибок —
   плохо: `better="down"`. Тон изменения следует смыслу, а не знаку, а
   направление звучит словом — «рост», «снижение». Статус и подсказку
   задаёт страница — плитка не выводит статус из значения сама (пороги
   шкалы — `warning-at` и `error-at`):

   ```html
   <sf-tile-metric label="Нагрузка CPU" value="0.82" previous="0.64" format="percent"
     better="down" status="warning" hint="Выше 80 % пятнадцать минут" period-text="за час"></sf-tile-metric>
   ```

3. Для значения из предела задайте `max`: плитка напишет «45,3 ГБ из
   100 ГБ» и нарисует шкалу:

   ```html
   <sf-tile-metric label="Хранилище" value="45.25" max="100" format="unit-gigabyte"
     status="success" hint="Свободно 55 %"></sf-tile-metric>
   ```

4. Положите мини-график в слот `chart` плитки — он встанет под числами,
   растянется по её ширине и возьмёт высоту 32 px. `summary="none"`, потому что плитка уже говорит
   число словами:

   ```html
   <sf-tile-metric label="Выручка за неделю" value="1250000" previous="1100000" format="currency-RUB">
     <sf-chart-sparkline id="revenue-trend" slot="chart" label="Выручка за 12 недель"
       shape="area" summary="none"></sf-chart-sparkline>
   </sf-tile-metric>
   ```

   Значения мини-графика — список чисел в `items`.

5. Для измеренного значения с зонами нормы поставьте шкалу. Зоны — свойство
   `bands`, роль зоны даёт и цвет, и название («Норма», «Внимание»,
   «Критично»); `target` — отметка цели:

   ```html
   <sf-chart-gauge id="cpu" label="Загрузка процессора" value="72" target="80"
     value-format="unit-percent" size="1/2"></sf-chart-gauge>
   <script>
     customElements.whenDefined('sf-chart-gauge').then(() => {
       document.querySelector('#cpu').bands = [
         {to: 70, role: 'success'}, {to: 90, role: 'warning'}, {to: 100, role: 'error'},
       ];
     });
   </script>
   ```

6. Разложите плитки сеткой. Плитка тянется по ширине, а раскладку делает
   страница:

   ```css
   .tiles {
     display: grid;
     gap: var(--sf-space-1);
     grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
   }
   ```

   Для одних только плиток подойдёт и готовый класс `sf-tile-metric-grid`
   на родителе; самую узкую колонку задаёт `--sf-tile-metric-min-width`.

## Результат

Ряд из трёх плиток и шкалы. Сузьте окно — плитки перестроятся в столбец.

:::example {id="guide/dashboard" label="Ряд плиток: выручка, нагрузка, хранилище и шкала"}
:::

Плитку можно сделать ссылкой на подробный отчёт (`href`) или кнопкой
(`openable`, событие `sf-tile-metric-open`). `size="1/2"` подходит для
плотного ряда, `size="2"` — для главной цифры страницы.

## См. также

- [Плитка показателя sf-tile-metric](/ru/components/indicators/chart-metric/)
- [Шкала sf-chart-gauge](/ru/components/indicators/chart-gauge/)
- [Мини-график sf-chart-sparkline](/ru/components/trends/chart-sparkline/)
- [Форматы чисел и дат](../formats/)
