<?php
class CarsList {

  function __construct($db) {
    $this->db = $db;
  }

  public function getCars() {
    $stm = $this->db->prepare("SELECT * FROM cars_list");
    $stm->execute();
    return $stm->fetchAll(PDO::FETCH_ASSOC);
  }

  public function getCar($id) {
    $stm = $this->db->prepare("SELECT * FROM cars_list WHERE id = ?");
    $stm->execute(array($id));
    return $stm->fetchAll(PDO::FETCH_ASSOC)[0];
  }

  public function addCar($car) {
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

    return (int) $this->db->lastInsertId();
  }

  public function updatecar($id, $params) {
    $stm = $this->db->prepare("UPDATE cars_list SET
      stateCarNumber = :stateCarNumber,
      gasolineConsumptionRatio = :gasolineConsumptionRatio,
      brand = :brand,
      description = :description
      WHERE id = :id");
    return $stm->execute(array(
      ':stateCarNumber' => $params['stateCarNumber'],
      ':gasolineConsumptionRatio' => $params['gasolineConsumptionRatio'],
      ':brand' => $params['brand'],
      ':description' => $params['description'],
      ':id' => $id
    ));
  }

  public function deleteCar($id) {
    $stm = $this->db->prepare("DELETE FROM cars_list WHERE id = ?");
    return $stm->execute(array($id));
  }
}
?>