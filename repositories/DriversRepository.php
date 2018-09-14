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
      drivers.isDeleted,
      drivers.status,
      cars.id AS carId,
      cars.stateCarNumber,
      cars.gasolineConsumptionRatio,
      cars.brand,
      cars.isDeleted AS carIsDeleted,
      cars.description AS carDescription
      FROM drivers_list AS drivers
      LEFT OUTER JOIN cars_list AS cars
      ON drivers.carId = cars.id
      /*WHERE drivers.isDeleted = 0*/");
    if(!$stm->execute()){
      throw new DBException('Ошибка в SQL запросе при получении списка водителей.', 500);
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
      drivers.isDeleted,
      drivers.status,
      cars.id AS carId,
      cars.stateCarNumber,
      cars.gasolineConsumptionRatio,
      cars.brand,
      cars.isDeleted AS carIsDeleted,
      cars.description AS carDescription
      FROM drivers_list AS drivers
      LEFT OUTER JOIN cars_list AS cars
      ON drivers.carId = cars.id
      WHERE drivers.id = ?");
    if(!$stm->execute(array($id))) {
      throw new DBException('Ошибка в SQL запросе при попытке получить водителя с id '.$id, 500);
    }
    $queryResult = $stm->fetchAll(PDO::FETCH_ASSOC);
    if(count($queryResult) == 0) {
      throw new NotFoundException('Неудалось получить запись водителя с id '.$id, 404);
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
      ':carId' => ((int) $driver['car']) ? ((int) $driver['car']) : NULL,
      ':description' => $driver['description']
    );
    if(!$stm->execute($params)) {
      throw new DBException('Ошибка в SQL запросе при попытке добавить водителя', 500);
    }

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
    $params = array(
      ':name' => $params['name'],
      ':surname' => $params['surname'],
      ':phone' => $params['phone'],
      ':description' => $params['description'],
      ':car' => $params['car'],
      ':status' => $params['status'],
      ':id' => (int) $id
    );

    if($stm->execute($params)) {
      return $this->queryDriver($id);
    } else {
      throw new DBException('Ошибка в SQL запросе при попытке редактирования записи из таблицы водителей с id '.$id, 500);
    }

  }

  public function queryDeleteDriver($id) {
    $stm = $this->db->prepare("UPDATE drivers_list
      SET isDeleted = 1
      WHERE id = ?");
    if($stm->execute(array($id))) {
      $this->queryDriver($id);
      return true;
    } else {
      throw new DBException('Ошибка в SQL запросе при попытке удалить водителя с id '.$id, 500);
    }
  }
}
?>