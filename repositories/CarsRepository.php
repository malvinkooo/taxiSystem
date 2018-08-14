<?php
class CarsRepository {

  function __construct($db) {
    $this->db = $db;
  }

  public function queryAllCars() {
    $stm = $this->db->prepare("SELECT * FROM cars_lis");
    if(!$stm->execute()) {
      throw new DBException('Ошибка в SQL запросе при получении списка машин.');
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
      throw new DBException('Ошибка в SQL запросе при попытке получить машину с id '.$id);
    }
    $queryResult = $stm->fetchAll(PDO::FETCH_ASSOC);
    if(count($queryResult) == 0) {
      throw new NotFoundException('Неудалось получить машину с id '.$id);
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
    $stm->execute($params);

    return $this->queryCar( $this->db->lastInsertId() );
  }

  public function queryUpdateCar($id, $params) {
    $stm = $this->db->prepare("UPDATE cars_list SET
      stateCarNumber = :stateCarNumber,
      gasolineConsumptionRatio = :gasolineConsumptionRatio,
      brand = :brand,
      description = :description
      WHERE id = :id");
    $stm->execute(array(
      ':stateCarNumber' => $params['stateCarNumber'],
      ':gasolineConsumptionRatio' => $params['gasolineConsumptionRatio'],
      ':brand' => $params['brand'],
      ':description' => $params['description'],
      ':id' => $id
    ));

    return $this->queryCar( $id );
  }

  public function queryDeleteCar($id) {
    $stm = $this->db->prepare("DELETE FROM cars_list WHERE id = ?");
    return $stm->execute(array($id));
  }
}
?>