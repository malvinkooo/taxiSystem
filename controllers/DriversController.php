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

  public function AddDriver($id, $params) {
    //
  }

  public function deleteDriver($id) {
    //
  }

  public function updateDriver($id, $params) {
    //
  }
}
?>