<?php
class CarsRepository {

  function __construct($db) {
    $this->db = $db;
  }

  public function queryAllCars() {
    $stm = $this->db->prepare("SELECT * FROM cars_list");
    $stm->execute();
    $queryResult = $stm->fetchAll(PDO::FETCH_ASSOC);
    $carsList = array();
    foreach ($queryResult as $car) {
      $carsList[] = new Car($car);
    }

    return $carsList;
  }

  public function queryCar($id) {
    $stm = $this->db->prepare("SELECT * FROM cars_list WHERE id = ?");
    $stm->execute(array($id));
    $queryResult = $stm->fetchAll(PDO::FETCH_ASSOC)[0];

    return new Car($queryResult);
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