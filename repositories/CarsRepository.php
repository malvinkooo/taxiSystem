<?php
class CarsRepository {

  function __construct($db) {
    $this->db = $db;
  }

  public function queryAllCars() {
    $stm = $this->db->prepare("SELECT * FROM cars_list /*WHERE isDeleted = 0*/");
    if(!$stm->execute()) {
      throw new DBException('Ошибка в SQL запросе при получении списка машин.', 500);
    }
    $queryResult = $stm->fetchAll(PDO::FETCH_ASSOC);
    $carsList = array();
    foreach ($queryResult as $car) {
      $carsList[] = new Car($car);
    }

    return $carsList;
  }

  public function queryCar($id) {
    $stm = $this->db->prepare("SELECT * FROM cars_list WHERE id = ?");
    if(!$stm->execute(array($id))) {
      throw new DBException('Ошибка в SQL запросе при получении записи из таблицы машин с id '.$id, 500);
    }
    $queryResult = $stm->fetchAll(PDO::FETCH_ASSOC);
    if(count($queryResult) == 0) {
      throw new NotFoundException('Неудалось получить запись из таблицы машин с id '.$id, 404);
    }

    return new Car($queryResult[0]);
  }

  public function queryAddCar($car) {
    $stm = $this->db->prepare("INSERT INTO cars_list
      (stateCarNumber, gasolineConsumptionRatio, brand, description)
      VALUES
      (:stateCarNumber, :gasolineConsumptionRatio, :brand, :description)");
    $params = array(
      ':stateCarNumber' => $car['stateCarNumber'],
      ':gasolineConsumptionRatio' => $car['gasolineConsumptionRatio'],
      ':brand' => $car['brand'],
      ':description' => $car['description']
    );
    if(!$stm->execute($params)) {
      throw new DBException('Ошибка в SQL запросе при добавлении записи в таблицу машин.', 500);
    }

    return $this->queryCar( $this->db->lastInsertId() );
  }

  public function queryUpdateCar($id, $params) {
    $stm = $this->db->prepare("UPDATE cars_list SET
      stateCarNumber = :stateCarNumber,
      gasolineConsumptionRatio = :gasolineConsumptionRatio,
      brand = :brand,
      description = :description
      WHERE id = :id");
    $params = array(
      ':stateCarNumber' => $params['stateCarNumber'],
      ':gasolineConsumptionRatio' => $params['gasolineConsumptionRatio'],
      ':brand' => $params['brand'],
      ':description' => $params['description'],
      ':id' => $id
    );
    if($stm->execute($params)) {
      return $this->queryCar($id);
    } else {
      throw new DBException('Ошибка в SQL запросе при попытке редактирования записи из таблицы машин с id '.$id, 500);
    }
  }

  public function queryDeleteCar($id) {
    $stm = $this->db->prepare("UPDATE cars_list SET
      isDeleted = 1
      WHERE id = ?");
    if($stm->execute(array($id))) {
      $this ->queryCar($id);
      return true;
    } else {
      throw new DBException('Ошибка в SQL запросе при попытке удалить машину с id '.$id, 500);
    }
  }
}
?>