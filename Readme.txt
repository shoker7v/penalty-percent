>>>Приложение открывать через запуск LiveServer в VS Code по index.html<<<

**Логику расчета не обновлял после изменений от 07.2020**

Приложение позволяет рассчитать, сколько ты переплатишь/уже переплатил 
процентов по неустойке по кредитной карте Тинькофф, если пропустил платеж

Укажи вводные данные

"Текущий долг" - укажи текущий долг по карте
"Прошлый долг/Прошлые проценты" - укажи данные из последней уже сформированной выписки,
в которой неустойки не было
"Тариф" - укажи тариф в том же формате, что в подсказке
"До 01.07.2014" - отметь чек-бокс, если подал заявку до этой даты (влияет на ставку
с неустойкой)

Нажми "Рассчитать"

Ты узнаешь:
1. Реальную ставку. Так как долг может состоять из покупок и снятия наличных, а на
эти операции действует разная ставка
2. Общую ставку с неустойкой по тарифу
3. "Сумма к возврату" - это сумма переплаты процентов в следующем периоде из-за действия
неустойки (именно переплаты, а не общей суммы процентов)

*Если хочешь узнать переплату по неустойке в какой-то из прошлых выписок, то:
1. "Текущий долг" - укажи входящий баланс в выписке с неустойкой
2. "Прошлый долг/Прошлые проценты" - укажи суммы из ближайшей предыдущей выписки
до выписки с неустойкой

**Некоторые функции приложения для удобства:
1. Удалит лишние символы в суммах по долгам и процентам (пробелы, запятые, точки)
2. Найдет все необходимые процентные ставки из указанного тарифа
3. Визуально напомнит, надо ли при указанном тарифе проверять дату заявки
