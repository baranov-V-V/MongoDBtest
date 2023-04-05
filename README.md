# MongoDBtest

Проведем небольшое ознакомление с документоориентированной базой данных MongoDB.
Поднием базу данных `test` и созданим коллекцию `air_bnb` через MongoDB Compass.
Это база данных из жилых объектов и отзывах о них.

## INSERT

Импортируем основную часть из json-файла (в директории `data`). Также добавим свою запись через insert скрипт:

```shell
mongosh> db.air_bnb.insertOne(
  {
    "_id": "999666",
    "listing_url": "https://2ka.mipt.ru/",
    ...more data
  }  
)
mongosh>
```

## UPDATE

Добавим по чайнику в каждое жилое помещение с ценой > 150:

```shell
mongosh> db.test.air_bnb.updateMany({ price: { $gt: 150 } }, { $push: { amenities: "kettle" } })
mongosh>
```

Увеличим цену на 5 если в помещение есть вайфай:

```shell
mongosh> db.test.air_bnb.updateMany({ "amenities": "Wifi" }, { $inc: { "price": 5 } })
mongosh>
```

## DELETE

Удалим все помещения с множественными спальнями и ценой меньше 20 (звучит как чтото нелегальное)

```shell
mongosh> db.test.air_bnb.deleteMany({ "price": { $lt: "20.00" }, "bedrooms": { $gte: 2 }})
mongosh>
```

## READ

Напишем несколько запросов на чтение с индексами и без и замерим их время работы с помощью `.explain()` \
Все запросы можно посмотреть в файле `scripts/find.js`

Краткое описание запросов и индексов к ним:

1. * Выбираем все помещения с ценой < 200, индекс по цене
   * Выбираем все помещения с ценой > 100 и < 105, индекс по цене
2. Выбираем все помещения с ценой < 60, имеющими телевизор и wifi, а также находящиеся в италии, индекс по цене
3. Выбираем все помещения с property_type: "Apartment", где last_review было не позже 2017 года, индекс по property_type и last_review

Таблица скорости:

| Номер запроса | Без индекса COLLSCAN (ms) |Без индекса FULL QUERY (ms) | С индексом FETHC + SCAN (ms) |C индексом FULL QUERY (ms) |
|---------------|---------------------------|----------------------------|------------------------------|---------------------------|
| `1.1`         |          30               |             320            |               50             |           330             |
| `1.2`         |          30               |             320            |               2              |           6               |
| `2`           |          40               |             410            |               22             |           150             |
| `3`           |          25               |             320            |               30             |           240             |

## Вывод

Индексы могут как и ускорить поиск (когда записей для поиска мало), или даже замедлить (когда отбирается много записей, например половина). \
Нужно подходить осмысленно к выборам полей для индексов.
