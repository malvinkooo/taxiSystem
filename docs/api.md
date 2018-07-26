# Работа с водителями

## Получение списка всех водителей

GET /api/drivers/

Параметры: -

Возвращаемое значение:

200 ОК

    [
      {
        'id': 1,
        'name': 'Василий',
        'surname': 'Пупкин',
        'phone': '0999999999',
        'car': {
          'id': 1,
          'stateCarNumber': 'BY454545',
          'gasolineConsumtionRatio': 0.77,
          'brand': 'Nissan x45',
          'description': 'Комментарий о машине'
        },
        'description': 'Комментарий о водителе'
      },
      ...
    ]

500 Internal Server Error - при внутренней ошибке сервера

## Получить информацию об одном водителе

GET /api/drivers/{DRIVER_ID}

Параметры:

DRIVER_ID - идентификатор водителя

Возвращаемое значение:

200 ОК

    {
      'driver_id': 1,
      'name': 'Василий',
      'surname': 'Пупкин',
      'phone': '0999999999',
      'currentLocation': 'ул. Марсельская, 12',
      'car': {
        'id': 1,
        'stateCarNumber': 'BY454545',
        'gasolineConsumtionRatio': 0.77,
        'brand': 'Nissan x45',
        'description': 'Комментарий о машине'
      },
      'description': 'Комментарий о водителе'
    }

400 Bad Request - при ошибке валидации

404 Not Found - если объект не найден

500 Internal Server Error - при внутренней ошибке сервера

## Добавить водителя

POST /api/drivers/

Параметры:

    {
      'name': 'Никита',
      'surname': 'Сидоров',
      'phone': '0998888888',
      'car': 1,
      'description': 'Комментарий о водителе'
    }

Возвращаемое значение:

200 ОК

    {
      'driver_id': 2,
      'name': 'Никита',
      'surname': 'Сидоров',
      'phone': '0998888888',
      'car': {
        'id': 1,
        'stateCarNumber': 'BY454545',
        'gasolineConsumtionRatio': 0.77,
        'brand': 'Nissan x45',
        'description': 'Комментарий о машине'
      },
      'description': 'Комментарий о водителе'
    }

400 Bad Request - при ошибке валидации

500 Internal Server Error - при внутренней ошибке сервера

## Редактировать информацию о водителе

PUT /api/drivers/{DRIVER_ID}

Параметры:

DRIVER_ID - идентификатор водителя.

    {
      'driver_id': 2,
      'name': 'Сергей',
      'surname': 'Макаренко',
      'phone': '0777777777',
      'car': 3,
      'description': 'Комментарий о водителе'
    }


Возвращаемое значение:

200 ОК

    {
      'driver_id': 2,
      'name': 'Сергей',
      'surname': 'Макаренко',
      'phone': '0777777777',
      'car': {
        'id': 1,
        'stateCarNumber': 'BY454545',
        'gasolineConsumtionRatio': 0.77,
        'brand': 'Nissan x45',
        'description': 'Комментарий о машине'
      },
      'description': 'Комментарий о водителе'
    }

400 Bad Request - при ошибке валидации

404 Not Found - если объект не найден

500 Internal Server Error - при внутренней ошибке сервера

## Удалить водителя

DELETE /api/drivers/{DRIVER_ID}

Параметры:

DRIVER_ID - идентификатор водителя

Возвращаемое значение:

200 ОК

400 Bad Request - при ошибке валидации

404 Not Found - если объект не найден

500 Internal Server Error - при внутренней ошибке сервера

# Работа с машинами

## Получить список всех машин

GET /api/cars/

Параметры: -

Возвращаемое значение:

200 ОК

    [
      {
        'car_id': 1,
        'stateCarNumber': 'BY454545',
        'gasolineConsumtionRatio': 0.77,
        'brand': 'Nissan x45',
        'description': 'Комментарий о машине'
      },
      ...
    ]

500 Internal Server Error - привнутренней ошибке сервера

## Получить информацию об одной машине

GET /api/cars/{CAR_ID}

Параметры:

CAR_ID - идентификатор машины

Возвращаемое значение:

    {
      'car_id': 1,
      'stateCarNumber': 'BY454545',
      'gasolineConsumtionRatio': 0.77,
      'brand': 'Nissan x45',
      'description': 'Комментарий о машине'
    }

400 Bad Request - при ошибке валидации

404 Not Found - если объект не найден

500 Internal Server Error - при внутренней ошибке сервера

## Добавить машину

POST /api/cars/

Параметры:

    {
      'stateCarNumber': 'BY454545',
      'gasolineConsumtionRatio': 0.77,
      'brand': 'Nissan x45',
      'description': 'Комментарий о машине'
    }

Возвращаемое значение:

200 ОК

    {
      'car_id': 1,
      'stateCarNumber': 'BY454545',
      'gasolineConsumtionRatio': 0.77,
      'brand': 'Nissan x45',
      'description': 'Комментарий о машине'
    }

400 Bad Request - при ошибке валидации

500 Internal Server Error - при внутренней ошибке сервера

## Редактировать информацию о машине

PUT /api/cars/{CAR_ID}

Параметры:

CAR_ID - идентификатор машины

    {
      'car_id': 2,
      'stateCarNumber': 'BY454545',
      'gasolineConsumtionRatio': 0.77,
      'brand': 'Nissan x45',
      'description': 'Комментарий о машине'
    }

Возвращаемое значение:

200 ОК

    {
      'car_id': 2,
      'stateCarNumber': 'BY121212',
      'gasolineConsumtionRatio': 2.77,
      'brand': 'Nissan x45',
      'description': 'Комментарий о машине'
    }

400 Bad Request - при ошибке валидации

404 Not Found - если объект не найден

500 Internal Server Error - при внутренней ошибке сервера

## Удалить машину

DELETE /api/cars/{CAR_ID}

Параметры:

CAR_ID - идентификатор машины

Возвращаемое значение:

200 ОК

400 Bad Request - при ошибкевалидации

404 Not Found - если объект не найден

500 Internal Server Error - при внутренней ошибке сервера

# Работа с заказами

## Получить список всех заказов

GET /api/orders/

Параметры: -

Возвращаемое значение:

200 ОК

    [
      {
        'order_id': 1,
        'driver': {
          'driver_id': 2,
          'name': 'Sergey',
          'surname': 'Makarenko',
          'phone': '0777777777',
          'car': {
            'car_id': 1,
            'stateCarNumber': 'BY454545',
            'gasolineConsumtionRatio': 0.77,
            'brand': 'Nissan x45',
            'description': 'Комментарий о машине'
          },
          'description': 'About driver'
         },
        'clientName': 'Егор',
        'clientSurname': 'Савченко',
        'clientPhone': '0777777777',
        'dateOfCreation': '12.12.2018',
        'dateOfCompletion': '12.12.2018',
        'carFeedPont': {
          'id': 1,
          'lat': 12.1111111111,
          'lng': 12.2222222222,
          'title': 'ул. Марсельская, 45'
        },
        'destination': {
          'id': 1,
          'lat': 12.1111111111,
          'lng': 12.2222222222,
          'title': 'ул. Марсельская, 45'
        },
        'distance': '1200м',
        'rate': 1.00,
        'status': 'Отменен'
      },
      ...
    ]

500 Internal Server Error - при внутренней ошибке сервера

## Получить информацию о заказе

GET /api/orders/{ORDER_ID}

Параметры:

ORDER_ID - идентификатор заказа

Возвращаемое значение:

200 ОК

    {
      'order_id': 1,
      'driver': {
        'driver_id': 2,
        'name': 'Sergey',
        'surname': 'Makarenko',
        'phone': '0777777777',
        'car': {
          'car_id': 1,
          'stateCarNumber': 'BY454545',
          'gasolineConsumtionRatio': 0.77,
          'brand': 'Nissan x45',
          'description': 'Комментарий о машине'
        },
        'description': 'About driver'
      },
      'clientName': 'Егор',
      'clientSurname': 'Савченко',
      'clientPhone': '0777777777',
      'dateOfCreation': '12.12.2018',
      'dateOfCompletion': '12.12.2018',
      'carFeedPont': {
          'id': 1,
          'lat': 12.1111111111,
          'lng': 12.2222222222,
          'title': 'ул. Марсельская, 45'
        },
      'destination': {
        'id': 1,
        'lat': 12.1111111111,
        'lng': 12.2222222222,
        'title': 'ул. Марсельская, 45'
      },
      'distance': '1200м',
      'rate': 1.00,
      'status': 'Отменен'
    }

400 Bad Request - при ошибке валидации

404 Not Found - если объект не найден

500 Internal Server Error - при внутренней ошибке сервера

## Добавить заказ

POST /api/orders/

Параметры:

    {
      'driver': 2,
      'clientName': 'Егор',
      'clientSurname': 'Савченко',
      'clientPhone': '0777777777',
      'dateOfCreation': '12.12.2018',
      'dateOfCompletion': '12.12.2018',
      'carFeedPont': {
          'id': 1,
          'lat': 12.1111111111,
          'lng': 12.2222222222,
          'title': 'ул. Марсельская, 45'
        },
      'destination': {
        'id': 1,
        'lat': 12.1111111111,
        'lng': 12.2222222222,
        'title': 'ул. Марсельская, 45'
      },
      'distance': '1200м',
      'rate': 1.00,
      'status': 'Отменен'
    }

Возвращаемое значение:

200 ОК

    {
      'car_id': 2,
      'driver': {
        'driver_id': 2,
        'name': 'Sergey',
        'surname': 'Makarenko',
        'phone': '0777777777',
        'car': 1
      },
      'clientName': 'Егор',
      'clientSurname': 'Савченко',
      'clientPhone': '0777777777',
      'dateOfCreation': '12.12.2018',
      'dateOfCompletion': '12.12.2018',
      'carFeedPont': {
          'id': 1,
          'lat': 12.1111111111,
          'lng': 12.2222222222,
          'title': 'ул. Марсельская, 45'
        },
      'destination': {
        'id': 1,
        'lat': 12.1111111111,
        'lng': 12.2222222222,
        'title': 'ул. Марсельская, 45'
      },
      'distance': '1200м',
      'rate': 1.00,
      'status': 'Отменен'
    }

400 Bad Request - при ошибке валидации

404 Not Found - если объект не найден

500 Internal Server Error - при внутренней ошибке сервера

## Редактировать заказ

PUT /api/orders/{ORDER_ID}

Параметры:

ORDER_ID - идентификатор заказа

    {
      'order_id': 2,
      'driver': 2,
      'clientName': 'Егор',
      'clientSurname': 'Савченко',
      'clientPhone': '0777777777',
      'dateOfCreation': '12.12.2018',
      'dateOfCompletion': '12.12.2018',
      'carFeedPont': {
          'id': 1,
          'lat': 12.1111111111,
          'lng': 12.2222222222,
          'title': 'ул. Марсельская, 45'
        },
      'destination': {
        'id': 1,
        'lat': 12.1111111111,
        'lng': 12.2222222222,
        'title': 'ул. Марсельская, 45'
      },
      'distance': '1200м',
      'rate': 1.00,
      'status': 'Отменен'
    }

Возвращаемое значение:

200 ОК

    {
      'order_id': 2,
      'driver': {
        'driver_id': 2,
        'name': 'Sergey',
        'surname': 'Makarenko',
        'phone': '0777777777',
        'car': {
          'car_id': 1,
          'stateCarNumber': 'BY454545',
          'gasolineConsumtionRatio': 0.77,
          'brand': 'Nissan x45',
          'description': 'Комментарий о машине'
        },
        'description': 'About driver'
      },
      'clientName': 'Егор',
      'clientSurname': 'Савченко',
      'clientPhone': '0777777777',
      'dateOfCreation': '12.12.2018',
      'dateOfCompletion': '12.12.2018',
      'carFeedPont': {
          'id': 1,
          'lat': 12.1111111111,
          'lng': 12.2222222222,
          'title': 'ул. Марсельская, 45'
        },
      'destination': {
        'id': 1,
        'lat': 12.1111111111,
        'lng': 12.2222222222,
        'title': 'ул. Марсельская, 45'
      },
      'distance': '1200м',
      'rate': 1.00,
      'status': 'Отменен'
    }

400 Bad Request - при ошибке валдиации

404 Not Found - если объект не найден

500 Internal Server Error - при внутренней ошибке сервера