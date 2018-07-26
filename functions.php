<?php

try {
  $db = new PDO('mysql:host=localhost;dbname=taxi_system', 'root', '', array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET CHARSET utf8'));
} catch(PDOException $e) {
  http_response_code(500);
  header('Content-Type', 'application/json');
  $erroObject = array(
    'error' => 'Не удалось подключиться к БД',
    'details' => $e->getMessage()
  );
  echo json_encode($erroObject);
  exit();
}

function getDrivers() {
  global $db;
  $stm = $db->prepare("SELECT
                        drivers.id,
                        drivers.name,
                        drivers.surname,
                        drivers.phone,
                        drivers.description,
                        drivers.status,
                        cars.id AS carId,
                        cars.stateCarNumber,
                        cars.gasolineConsumptionRatio,
                        cars.brand,
                        cars.description AS carDescription
                      FROM drivers_list AS drivers
                      LEFT OUTER JOIN cars_list AS cars
                      ON drivers.id = cars.id");
  $stm->execute();
  return $stm->fetchAll(PDO::FETCH_ASSOC);
}

function getDriver($id) {
  global $db;
  $stm = $db->prepare("SELECT
                        drivers.id,
                        drivers.name,
                        drivers.surname,
                        drivers.phone,
                        drivers.description,
                        drivers.status,
                        cars.id AS carId,
                        cars.stateCarNumber,
                        cars.gasolineConsumptionRatio,
                        cars.brand,
                        cars.description AS carDescription
                      FROM drivers_list AS drivers
                      LEFT OUTER JOIN cars_list AS cars
                      ON drivers.id = cars.id
                      WHERE drivers.id = ?");
  $stm->execute(array($id));
  return $stm->fetchAll(PDO::FETCH_ASSOC);
}

function getCars() {
  global $db;
  $stm = $db->prepare("SELECT * FROM cars_list");
  $stm->execute();
  return $stm->fetchAll(PDO::FETCH_ASSOC);
}

function getCar($id) {
  global $db;
  $stm = $db->prepare("SELECT * FROM cars_list WHERE id = ?");
  $stm->execute(array($id));
  return $stm->fetchAll(PDO::FETCH_ASSOC)[0];
}

function getOrders() {
  global $db;
  $stm = $db->prepare("SELECT
                        orders.id,
                        orders.dateOfCreation,
                        orders.dateOfCompletion,
                        orders.distance,
                        orders.rate,
                        orders.status,
                        drivers.id AS driverId,
                        drivers.name AS driverName,
                        drivers.surname AS driverSurname,
                        drivers.phone AS driverPhone,
                        drivers.description AS driverDescription,
                        drivers.status,
                        cars.id AS carId,
                        cars.stateCarNumber,
                        cars.gasolineConsumptionRatio,
                        cars.brand,
                        cars.description AS carDescription,
                        clients.id AS clientId,
                        clients.name AS clientName,
                        clients.surname AS clientSurname,
                        clients.phone AS clientPhone,
                        carFeedPoint.id AS carFeedPointId,
                        carFeedPoint.title AS carFeedPointTitle,
                        carFeedPoint.lng AS carFeedPointLng,
                        carFeedPoint.lat AS carFeedPointLat,
                        destination.id AS destinationId,
                        destination.title AS destinationTitle,
                        destination.lng AS destinationLng,
                        destination.lat AS destinationLat
                      FROM orders_list AS orders
                      LEFT OUTER JOIN drivers_list AS drivers
                      ON orders.id = drivers.id
                      LEFT OUTER JOIN cars_list AS cars
                      ON drivers.carId = cars.id
                      LEFT OUTER JOIN client_list clients
                      ON orders.clientId = clients.id
                      LEFT OUTER JOIN address AS carFeedPoint
                      ON orders.carFeedPoint = carFeedPoint.id
                      LEFT OUTER JOIN address AS destination
                      ON orders.destination = destination.id");
  $stm->execute();
  return $stm->fetchAll(PDO::FETCH_ASSOC);
}

function getOrder($id) {
  global $db;
  $stm = $db->prepare("SELECT
                        orders.id,
                        orders.dateOfCreation,
                        orders.dateOfCompletion,
                        orders.distance,
                        orders.rate,
                        orders.status,
                        drivers.id AS driverId,
                        drivers.name AS driverName,
                        drivers.surname AS driverSurname,
                        drivers.phone AS driverPhone,
                        drivers.description AS driverDescription,
                        drivers.status,
                        cars.id AS carId,
                        cars.stateCarNumber,
                        cars.gasolineConsumptionRatio,
                        cars.brand,
                        cars.description AS carDescription,
                        clients.id AS clientId,
                        clients.name AS clientName,
                        clients.surname AS clientSurname,
                        clients.phone AS clientPhone,
                        carFeedPoint.id AS carFeedPointId,
                        carFeedPoint.title AS carFeedPointTitle,
                        carFeedPoint.lng AS carFeedPointLng,
                        carFeedPoint.lat AS carFeedPointLat,
                        destination.id AS destinationId,
                        destination.title AS destinationTitle,
                        destination.lng AS destinationLng,
                        destination.lat AS destinationLat
                      FROM orders_list AS orders
                      LEFT OUTER JOIN drivers_list AS drivers
                      ON orders.id = drivers.id
                      LEFT OUTER JOIN cars_list AS cars
                      ON drivers.carId = cars.id
                      LEFT OUTER JOIN client_list clients
                      ON orders.clientId = clients.id
                      LEFT OUTER JOIN address AS carFeedPoint
                      ON orders.carFeedPoint = carFeedPoint.id
                      LEFT OUTER JOIN address AS destination
                      ON orders.destination = destination.id
                      WHERE orders.id = ?");
  $stm->execute(array($id));
  return $stm->fetchAll(PDO::FETCH_ASSOC);
}

function prepareDrivers($drivers) {
  $result = array();
  foreach ($drivers as $val) {
    $driver = array();
    $driver_car = array();

    $driver['id'] = $val['id'];
    $driver['name'] = $val['name'];
    $driver['surname'] = $val['surname'];
    $driver['phone'] = $val['phone'];
    $driver['description'] = $val['description'];

    $driver_car['id'] = $val['carId'];
    $driver_car['stateCarNumber'] = $val['stateCarNumber'];
    $driver_car['gasolineConsumptionRatio'] = $val['gasolineConsumptionRatio'];
    $driver_car['brand'] = $val['brand'];
    $driver_car['description'] = $val['carDescription'];
    $driver['car'] = $driver_car;

    $result[] = $driver;
  }

  return $result;
}

function prepareOrders($orders) {
  $result = array();
  foreach($orders as $val) {
    $order = array();
    $order_driver = array();
    $driver_car = array();
    $carFeedPoint = array();
    $destination = array();

    $order['id'] = $val['id'];
    $order['dateOfCreation'] = $val['dateOfCreation'];
    $order['dateOfCompletion'] = $val['dateOfCompletion'];
    $order['distance'] = $val['distance'];
    $order['rate'] = $val['rate'];
    $order['status'] = $val['status'];
    $order['clientName'] = $val['clientName'];
    $order['clientSurname'] = $val['clientSurname'];
    $order['clientPhone'] = $val['clientPhone'];

    $order_driver['id'] = $val['driverId'];
    $order_driver['name'] = $val['driverName'];
    $order_driver['surname'] = $val['driverSurname'];
    $order_driver['phone'] = $val['driverPhone'];
    $order_driver['description'] = $val['driverDescription'];
    $order_driver['status'] = $val['status'];
    $order['driver'] = $order_driver;

    $driver_car['id'] = $val['carId'];
    $driver_car['stateCarNumber'] = $val['stateCarNumber'];
    $driver_car['gasolineConsumptionRatio'] = $val['gasolineConsumptionRatio'];
    $driver_car['brand'] = $val['brand'];
    $driver_car['description'] = $val['carDescription'];
    $order['driver']['car'] = $driver_car;

    $carFeedPoint['id'] = $val['carFeedPointId'];
    $carFeedPoint['lng'] = $val['carFeedPointLng'];
    $carFeedPoint['lat'] = $val['carFeedPointLat'];
    $carFeedPoint['title'] = $val['carFeedPointTitle'];
    $order['carFeedPoint'] = $carFeedPoint;

    $destination['id'] = $val['destinationId'];
    $destination['lng'] = $val['destinationLng'];
    $destination['lat'] = $val['destinationLat'];
    $destination['title'] = $val['destinationTitle'];
    $order['destination'] = $destination;

    $result[] = $order;
  }

  return $result;
}

?>