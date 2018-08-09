<?php
class DriversRepository {

  function __construct($db) {
    $this->db = $db;
  }

  public function queryAllDrivers() {
    $stm = $this->db->prepare("SELECT
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
      ON drivers.carId = cars.id");
    $stm->execute();
    $queryResult = $stm->fetchAll(PDO::FETCH_ASSOC);
    $driversList = array();
    foreach ($queryResult as $driver) {
      $driversList[] = new Driver($driver);
    }

    return $driversList;
  }

  public function queryDriver($id) {
    $stm = $this->db->prepare("SELECT
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
      ON drivers.carId = cars.id
      WHERE drivers.id = ?");
    $stm->execute(array($id));
    $queryResult = $stm->fetchAll(PDO::FETCH_ASSOC)[0];

    return new Driver($queryResult);
  }

  public function addDriver($driver) {
    $stm = $this->db->prepare("INSERT INTO drivers_list
      (name, surname, phone, carId, description)
      VALUES
      (:name, :surname, :phone, :carId, :description)");
    $params = array(
      ':name' => $driver['name'],
      ':surname' => $driver['surname'],
      ':phone' => $driver['phone'],
      ':carId' => (int) $driver['car'],
      ':description' => $driver['description']
    );
    $stm->execute($params);

    return (int) $this->db->lastInsertId();
  }

  public function updateDriver($id, $params) {
    $stm = $this->db->prepare("UPDATE drivers_list SET
      name = :name,
      surname = :surname,
      phone = :phone,
      description = :description,
      carId = :car,
      status = :status
      WHERE id = :id");
    return $stm->execute(array(
      ':name' => $params['name'],
      ':surname' => $params['surname'],
      ':phone' => $params['phone'],
      ':description' => $params['description'],
      ':car' => $params['car'],
      ':status' => $params['status'],
      ':id' => (int) $id
    ));
  }

  public function deleteDriver($id) {
    $stm = $this->db->prepare("DELETE FROM drivers_list WHERE id = ?");
    return $stm->execute(array($id));
  }

  public function prepareDrivers($drivers) {
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
}
?>