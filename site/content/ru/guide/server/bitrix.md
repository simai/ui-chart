---
description: Как отдать графику SIMAI Chart данные из 1С-Битрикса — контроллер модуля, вызов через BX.ajax.runAction и данные первой отрисовки в шаблоне компонента.
profile: how_to
---

# 1С-Битрикс

В Битриксе данные для графика удобно отдавать контроллером модуля: он сам
проверяет сессию, а страница вызывает его через `BX.ajax.runAction`.

## Перед началом

- Свой модуль, например `vendor.shop`, с таблицей сумм по месяцам на ORM D7
  (`SalesMonthTable` с полями `MONTH`, `SALES`, `PLAN`).
- Права на просмотр продаж, которые модуль умеет проверять.

## Шаги

1. Создайте контроллер в модуле. Он отвечает списком записей:

   ```php
   // /local/modules/vendor.shop/lib/Controller/Charts.php
   namespace Vendor\Shop\Controller;

   use Bitrix\Main\Engine\Controller;
   use Vendor\Shop\SalesMonthTable;

   final class Charts extends Controller
   {
       public function salesAction(int $year): array
       {
           $rows = [];
           $result = SalesMonthTable::getList([
               'select' => ['MONTH', 'SALES', 'PLAN'],
               'filter' => ['%=MONTH' => $year . '-%'],
               'order' => ['MONTH' => 'ASC'],
           ]);
           while ($row = $result->fetch()) {
               $rows[] = [
                   'month' => $row['MONTH'],
                   'sales' => $row['SALES'] === null ? null : (float) $row['SALES'],
                   'plan' => $row['PLAN'] === null ? null : (float) $row['PLAN'],
               ];
           }

           return $rows;
       }
   }
   ```

   Ключи записей пишутся строчными буквами, как их называют атрибуты
   графика; поля ORM — заглавными, как принято в Битриксе.

   Чтобы контроллер вызывался по короткому имени, укажите его пространство
   имён в `.settings.php` модуля:

   ```php
   return ['controllers' => ['value' => ['defaultNamespace' => '\\Vendor\\Shop\\Controller'], 'readonly' => true]];
   ```

2. На странице вызовите действие контроллера. Битрикс оборачивает ответ в
   `{status, data}`, поэтому графику отдают `data`:

   ```js
   BX.ajax.runAction('vendor:shop.charts.sales', {data: {year: 2026}})
     .then((response) => {
       chart.items = response.data;
       chart.setAttribute('data-state', 'auto');
     })
     .catch(() => chart.setAttribute('data-state', 'error'));
   ```

3. Проверяйте права в контроллере перед выборкой. Если их нет, не отдавайте
   данных: страница покажет ошибку.

4. Если данные нужны сразу, напечатайте их в шаблоне компонента JSON-блоком:

   ```php
   <sf-chart-line label="Продажи и план, 2026" x="month" y="sales,plan">
     <script type="application/json" data-sf-settings><?= json_encode(['items' => $arResult['SALES']], JSON_UNESCAPED_UNICODE | JSON_HEX_TAG) ?></script>
   </sf-chart-line>
   ```

## Результат

График показывает суммы из таблицы модуля: при открытии страницы — из
шаблона, при смене года — через контроллер.

## См. также

- [Обычный REST](../rest/)
- [Laravel и Larena](../laravel/)
