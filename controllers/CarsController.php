<?php
class CarsController {

  function __construct($db) {
    $this->carsRepository = new CarsRepository($db);
  }

  public function getCar($id) {
    $car = $this->carsRepository->queryCar($id);
    return $car->toJSON();
  }

  public function getCars() {
    $carsList = $this->carsRepository->queryAllCars();
    $data = array();
    foreach ($carsList as $car) {
      $data[] = $car->toJSON();
    }
    return $data;
  }

  public function addCar($id, $params) {
    //
  }

  public function deleteCar($id) {
    //
  }

  public function updateCar($id, $params) {
    //
  }
}
?>