<?php
class OrdersList {

  function __construct($db) {
    $this->db = $db;
  }

  public function getOrders() {
    $stm = $this->db->prepare("SELECT
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
      drivers.status AS driverStatus,
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

  public function getOrder($id) {
    $stm = $this->db->prepare("SELECT
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
      drivers.status AS driverStatus,
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
      ON orders.DriverId = drivers.id
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

  public function addOrder($order) {
    $addClient = $this->db->prepare("INSERT INTO client_list
      (name, surname, phone)
      VALUES
      (:name, :surname, :phone)");
    $clientParams = array(
      ':name' => $order['clientName'],
      ':surname' => $order['clientSurname'],
      ':phone' => $order['clientPhone']
    );
    $addClient->execute($clientParams);
    $clientId = (int) $this->db->lastInsertId();

    $addAddress = $this->db->prepare("INSERT INTO address
      (title, lng, lat)
      VALUES
      (:title, :lng, :lat)");
    $destinationParams = array(
      ':title' => $order['destination'],
      ':lng' => $order['destinationLng'],
      ':lat' => $order['destinationLat']
    );
    $addAddress->execute($destinationParams);
    $destinationId = $this->db->lastInsertId();

    $carFeedPointParams = array(
      ':title' => $order['carFeedPoint'],
      ':lng' => $order['carFeedPointLng'],
      ':lat' => $order['carFeedPointLat']
    );
    $addAddress->execute($carFeedPointParams);
    $carFeedPointId = $this->db->lastInsertId();

    $addOrder = $this->db->prepare("INSERT INTO orders_list
      (driverId, clientId, dateOfCreation, carFeedPoint, destination, distance, rate, status)
      VALUES
      (:driverId, :clientId, :dateOfCreation, :carFeedPoint, :destination, :distance, :rate, :status)");
    $orderParams = array(
      ':driverId' => $order['driver'],
      ':clientId' => $clientId,
      ':dateOfCreation' => $order['dateOfCreation'],
      ':carFeedPoint' => $carFeedPointId,
      ':destination' => $destinationId,
      ':distance' => $order['distance'],
      ':rate' => $order['rate'],
      ':status' => 'Новый'
    );
    $addOrder->execute($orderParams);

    return (int) $this->db->lastInsertId();
  }

  public function updateOrder($id, $params) {
    $addClient = $this->db->prepare("INSERT INTO client_list
      (name, surname, phone)
      VALUES
      (:name, :surname, :phone)");
    $clientParams = array(
      ':name' => $params['clientName'],
      ':surname' => $params['clientSurname'],
      ':phone' => $params['clientPhone']
    );
    $addClient->execute($clientParams);
    $clientId = (int) $this->db->lastInsertId();

    $addAddress = $this->db->prepare("INSERT INTO address
      (title, lng, lat)
      VALUES
      (:title, :lng, :lat)");
    $destinationParams = array(
      ':title' => $params['destination'],
      ':lng' => $params['destinationLng'],
      ':lat' => $params['destinationLat']
    );
    $addAddress->execute($destinationParams);
    $destinationId = $this->db->lastInsertId();

    $carFeedPointParams = array(
      ':title' => $params['carFeedPoint'],
      ':lng' => $params['carFeedPointLng'],
      ':lat' => $params['carFeedPointLat']
    );
    $addAddress->execute($carFeedPointParams);
    $carFeedPointId = $this->db->lastInsertId();

    $addOrder = $this->db->prepare("UPDATE orders_list SET
      driverId = :driverId,
      clientId = :clientId,
      dateOfCreation = :dateOfCreation,
      carFeedPoint = :carFeedPoint,
      destination = :destination,
      distance = :distance,
      rate = :rate,
      status = :status
      WHERE id = :id");
    $orderParams = array(
      ':driverId' => $params['driver'],
      ':clientId' => $clientId,
      ':dateOfCreation' => $params['dateOfCreation'],
      ':carFeedPoint' => $carFeedPointId,
      ':destination' => $destinationId,
      ':distance' => $params['distance'],
      ':rate' => $params['rate'],
      ':status' => $params['status'],
      ':id' => $id
    );
    return $addOrder->execute($orderParams);
  }

  public function prepareOrders($orders) {
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
      $order_driver['status'] = $val['driverStatus'];
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
}
?>