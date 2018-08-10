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

  public function addCar($params) {
    $car = $this->carsRepository->queryAddCar($params);
    return $car->toJSON();
  }

  public function deleteCar($id) {
    return $this->carsRepository->queryDeleteCar($id);
  }

  public function updateCar($id, $params) {
    $car = $this->carsRepository->queryUpdateCar($id, $params);
    return $car->toJSON();
  }
}
?>