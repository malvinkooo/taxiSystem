<?php
class DriversController {
  function __construct($db) {
    $this->driversRepository = new DriversRepository($db);
  }

  public function getDriver($id) {
    $driver = $this->driversRepository->queryDriver($id);
    return $driver->toJSON();
  }

  public function getDrivers() {
    $driversList = $this->driversRepository->queryAllDrivers();
    $data = array();
    foreach ($driversList as $driver) {
      $data[] = $driver->toJSON();
    }
    return $data;
  }

  public function AddDriver($params) {
    $driver = $this->driversRepository->queryAddDriver($params);
    return $driver->toJSON();
  }

  public function deleteDriver($id) {
    return $this->driversRepository->queryDeleteDriver($id);
  }

  public function updateDriver($id, $params) {
    $driver = $this->driversRepository->queryUpdateDriver($id, $params);
    return $driver->toJSON();
  }
}
?>