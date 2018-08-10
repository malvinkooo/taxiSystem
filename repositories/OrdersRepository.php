<?php
class OrdersRepository {

  function __construct($db) {
    $this->db = $db;
    $this->address = new AddressRepository($db);
    $this->clients = new ClientRepository($db);
  }

  public function queryAllOrders() {
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
      ON orders.driverId = drivers.id
      LEFT OUTER JOIN cars_list AS cars
      ON drivers.carId = cars.id
      LEFT OUTER JOIN client_list clients
      ON orders.clientId = clients.id
      LEFT OUTER JOIN address AS carFeedPoint
      ON orders.carFeedPoint = carFeedPoint.id
      LEFT OUTER JOIN address AS destination
      ON orders.destination = destination.id");
    $stm->execute();
    $queryResult = $stm->fetchAll(PDO::FETCH_ASSOC);
    $ordersList = array();
    foreach ($queryResult as $order) {
      $ordersList[] = new Order($order);
    }

    return $ordersList;
  }

  public function queryOrder($id) {
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
    $queryResult = $stm->fetchAll(PDO::FETCH_ASSOC)[0];

    return new Order($queryResult);
  }

  public function queryAddOrder($order) {
    $clientId = $this->clients->addClient($order);

    $destinationId = $this->address->addAddress(
      $order['destination'],
      $order['destinationLng'],
      $order['destinationLat']
    );
    $carFeedPointId = $this->address->addAddress(
      $order['carFeedPoint'],
      $order['carFeedPointLng'],
      $order['carFeedPointLat']
    );

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

    return $this->queryOrder( $this->db->lastInsertId() );
  }

  public function queryUpdateOrder($id, $params) {
    $clientId = $this->clients->addClient($params);

    $destinationId = $this->address->addAddress(
      $params['destination'],
      $params['destinationLng'],
      $params['destinationLat']
    );
    $carFeedPointId = $this->address->addAddress(
      $params['carFeedPoint'],
      $params['carFeedPointLng'],
      $params['carFeedPointLat']
    );

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
    $addOrder->execute($orderParams);

    return $this->queryOrder($id);
  }
}
?>