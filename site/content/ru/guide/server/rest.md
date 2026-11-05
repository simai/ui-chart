---
description: Как отдать графику SIMAI Chart данные из обычного REST API — адрес, который отвечает списком записей в JSON, и вызов со страницы — на примере простого PHP.
profile: how_to
---

# Обычный REST

Графику подходит любой адрес, который отвечает списком записей в JSON.
Если такой адрес уже есть в API, ничего заводить не нужно: страница
загружает его ответ и кладёт в `items`.

## Перед началом

- Решите, какие поля нужны графику. Для линии продаж и плана это `month`,
  `sales` и `plan`.
- Данные уже посчитаны на сервере: одна запись на месяц, а не все продажи
  по отдельности.

## Шаги

1. Сделайте адрес, который отвечает списком записей. Пример на простом PHP
   без библиотек; `readSalesByMonth` — ваша функция, которая читает базу:

   ```php
   <?php
   // /api/sales.php?year=2026
   $year = (int) ($_GET['year'] ?? date('Y'));
   $rows = readSalesByMonth($year); // [['month' => '2026-01', 'sales' => 120, 'plan' => 125], …]

   header('Content-Type: application/json; charset=utf-8');
   echo json_encode(array_map(fn (array $row) => [
       'month' => $row['month'],
       'sales' => $row['sales'] === null ? null : (float) $row['sales'],
       'plan' => $row['plan'] === null ? null : (float) $row['plan'],
   ], $rows), JSON_UNESCAPED_UNICODE);
   ```

   Пропуск остаётся `null`: график нарисует разрыв, а не ноль.

2. На странице загрузите ответ и отдайте его графику, как в рецепте
   [Данные с сервера](../../recipes/load-from-server/):

   ```js
   const response = await fetch('/api/sales.php?year=2026');
   chart.items = await response.json();
   chart.setAttribute('data-state', 'auto');
   ```

3. Если API отдаёт записи с другими именами полей, менять ответ не нужно:
   назовите поля атрибутами графика — `x="period"`, `y="revenue"`.

4. Если в API данные лежат столбцами (`{"month": [...], "sales": [...]}`),
   отдайте их как есть: `items` принимает и объект столбцов.

5. Если данные известны при отрисовке страницы, напечатайте их в разметке,
   и второй запрос не понадобится. `JSON_HEX_TAG` не даст тексту данных
   закрыть блок `<script>`:

   ```php
   <sf-chart-line label="Продажи и план, 2026" x="month" y="sales,plan">
     <script type="application/json" data-sf-settings><?= json_encode(['items' => $rows], JSON_UNESCAPED_UNICODE | JSON_HEX_TAG) ?></script>
   </sf-chart-line>
   ```

## Результат

График показывает ответ существующего API. Права и подсчёты остаются на
сервере, а страница только передаёт ответ графику.

## См. также

- [Laravel и Larena](../laravel/)
- [1С-Битрикс](../bitrix/)
- [Настройки](../../concepts/settings/) — JSON-блок в разметке.
