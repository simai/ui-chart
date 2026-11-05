---
description: Как отдать графику SIMAI Chart данные из Laravel или Larena — маршрут, который возвращает записи в JSON, и данные первой отрисовки в шаблоне Blade.
profile: how_to
---

# Laravel и Larena

В Laravel графику достаточно маршрута, который возвращает список записей.
Laravel сам превращает массив или коллекцию в ответ JSON.

## Перед началом

- Таблица `sales_months` с полями `month` (`2026-01`), `sales` и `plan` —
  уже посчитанные суммы по месяцам.
- Пользователь входит на сайт: маршрут закрыт `auth`.

## Шаги

1. Заведите маршрут, который отвечает записями:

   ```php
   // routes/web.php
   use Illuminate\Http\Request;
   use Illuminate\Support\Facades\DB;
   use Illuminate\Support\Facades\Route;

   Route::get('/charts/sales', function (Request $request) {
       $year = (int) $request->query('year', now()->year);

       return DB::table('sales_months')
           ->where('month', 'like', "{$year}-%")
           ->orderBy('month')
           ->get(['month', 'sales', 'plan']);
   })->middleware('auth');
   ```

   Ответ — `[{"month": "2026-01", "sales": 120, "plan": 125}, …]`. Пустое
   значение в базе приходит как `null` и станет пропуском на графике.

2. На странице загрузите его и отдайте графику:

   ```js
   const response = await fetch('/charts/sales?year=2026', {headers: {Accept: 'application/json'}});
   chart.items = await response.json();
   chart.setAttribute('data-state', 'auto');
   ```

   Запрос `GET` не меняет данных, поэтому токен CSRF ему не нужен.

3. Если данные нужны сразу при открытии страницы, передайте их в шаблон и
   напечатайте JSON-блоком. Директива `@json` экранирует текст так, что он
   не закроет блок `<script>`:

   ```blade
   <sf-chart-line label="Продажи и план, {{ $year }}" x="month" y="sales,plan" y-format="integer">
     <script type="application/json" data-sf-settings>@json(['items' => $sales])</script>
   </sf-chart-line>
   ```

## Результат

График показывает суммы из базы Laravel: при открытии страницы — из
разметки, при смене года — из маршрута `/charts/sales`.

### Larena

Larena — система управления сайтом SIMAI на Laravel. Свой маршрут или
шаблон Blade на сайте Larena делается так же, как выше: графику нужен
только ответ JSON со списком записей.

## См. также

- [Обычный REST](../rest/)
- [1С-Битрикс](../bitrix/)
- [Данные с сервера](../../recipes/load-from-server/)
