<?php
class DriversList {

  public function getDrivers() {
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
      ON drivers.carId = cars.id");
    $stm->execute();
    return $stm->fetchAll(PDO::FETCH_ASSOC);
  }

  public function getDriver($id) {
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
      ON drivers.carId = cars.id
      WHERE drivers.id = ?");
    $stm->execute(array($id));
    return $stm->fetchAll(PDO::FETCH_ASSOC);
  }

  public function addDriver($driver) {
    global $db;
    $stm = $db->prepare("INSERT INTO drivers_list
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

    return (int) $db->lastInsertId();
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