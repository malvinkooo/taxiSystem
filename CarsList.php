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

    return (int) $db->lastInsertId();
  }
}
?>