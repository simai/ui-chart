---
description: SIMAI Chart — графики для SIMAI Framework, подключаются одной строкой; живые примеры, руководство и справочник.
profile: landing
---

:::hero {layout=centered padding=2xl effect=chart-recorder}
# SIMAI Chart

Графики для SIMAI Framework: страница отдаёт данные, а график сам рисует себя, подсказывает значения, говорит с клавиатурой и показывает те же данные таблицей.

[Начать](/ru/guide/)

[Компоненты](/ru/components/)
:::

## Примеры

Все девятнадцать графиков набора по шести вкладкам — так же, как они
сгруппированы в справочнике. Все примеры живые: наведите указатель, нажмите
Tab и стрелки или откройте таблицу; название над графиком ведёт на его
страницу.

:::example {id="home/showcase" label="Живые примеры" fullscreen=false wrap=false}
:::

## Подключение

Набор подключается одной строкой рядом с SIMAI Framework — Loader сам
загрузит только те графики, что есть на странице:

```html
<script src="https://cdn.jsdelivr.net/npm/@simai-studio/ui@5.20261106.1926/distr/core/js/core.min.js" data-sf-sets="chart"></script>
```

Версия набора — 1.0.1, сами графики пока предварительные (0.x). Версии, другие
способы и лицензия — в разделе [Подключение](/ru/guide/connection/).

## Почему SIMAI Chart

:::columns
:icon[bolt]{size=2 container=square variant=tonal scheme=primary}

### Одна строка

`data-sf-sets="chart"` рядом с SIMAI Framework — и девятнадцать графиков готовы на странице.

---

:icon[table_rows]{size=2 container=square variant=tonal scheme=primary}

### Данные как есть

Строки из базы или столбцы, поля называют атрибуты — переделывать ответ сервера не нужно.

---

:icon[palette]{size=2 container=square variant=tonal scheme=primary}

### Цвета темы

Роли цвета Framework, светлая и тёмная тема, готовые палитры и свои цвета без потери контраста.
:::

:::columns
:icon[accessibility_new]{size=2 container=square variant=tonal scheme=primary}

### Видно и слышно

Курсор с клавиатуры, описание данных словами и та же таблица для программ чтения с экрана.

---

:icon[devices]{size=2 container=square variant=tonal scheme=primary}

### Любой экран

График подстраивается под ширину: подписи прореживаются, а не налезают друг на друга.

---

:icon[speed]{size=2 container=square variant=tonal scheme=primary}

### Без лишнего

Своя отрисовка без сторонних библиотек; на странице грузится только тот график, который на ней есть.
:::

:::::surface {width=full tone=muted padding=lg}
::::grid {columns=3 gap=4}
:::card {variant=plain}
### Версия
Набор 1.0.1 от 7 ноября 2026 года, графики в нём — предварительные версии 0.x. [История изменений](/ru/guide/changes/)
:::
:::card {variant=plain}
### Совместимость
Собран и проверен над выпуском SIMAI Framework `ui-1ec283e856cd`; нужен Core `core.runtime` 1.25.0 или новее. [Подключение](/ru/guide/connection/)
:::
:::card {variant=plain}
### Лицензия
Бесплатно для малого бизнеса и некоммерческого использования, остальным — коммерческая лицензия SIMAI. [Условия лицензии](/ru/guide/connection/#лицензия)
:::
::::

[Руководство](/ru/guide/) · [Компоненты](/ru/components/) · [SIMAI Framework](https://ui.simai.io/)
:::::
