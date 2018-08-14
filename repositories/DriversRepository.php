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
    if(!$stm->execute()){
      throw new DBException('Ошибка в SQL запросе при получении списка водителей.');
    }
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
    if(!$stm->execute(array($id))) {
      throw new DBException('Ошибка в SQL запросе при попытке получить водителя с id '.$id);
    }
    $queryResult = $stm->fetchAll(PDO::FETCH_ASSOC);
    if(count($queryResult) == 0) {
      throw new NotFoundException('Неудалось получить запись водителя с id '.$id);
    }

    return new Driver($queryResult[0]);
  }

  public function queryAddDriver($driver) {
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

    return $this->queryDriver( $this->db->lastInsertId() );
  }

  public function queryUpdateDriver($id, $params) {
    $stm = $this->db->prepare("UPDATE drivers_list SET
      name = :name,
      surname = :surname,
      phone = :phone,
      description = :description,
      carId = :car,
      status = :status
      WHERE id = :id");
    $stm->execute(array(
      ':name' => $params['name'],
      ':surname' => $params['surname'],
      ':phone' => $params['phone'],
      ':description' => $params['description'],
      ':car' => $params['car'],
      ':status' => $params['status'],
      ':id' => (int) $id
    ));

    return $this->queryDriver($id);
  }

  public function queryDeleteDriver($id) {
    $stm = $this->db->prepare("DELETE FROM drivers_list WHERE id = ?");
    return $stm->execute(array($id));
  }
}
?>