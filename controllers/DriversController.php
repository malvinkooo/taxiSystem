<?php
class DriversController {
  protected $view;

  public function __construct(\Slim\Views\Twig $view, $db) {
    $this->view = $view;
    $this->driversRepository = new DriversRepository($db);
  }

  public function getDrivers($req, $res) {
    $driversList = $this->driversRepository->queryAllDrivers();
    $data = array();
    foreach ($driversList as $driver) {
      $data[] = $driver->toJSON();
    }

    return $res->withStatus(200)->withJson( $data );
  }

  public function getDriver($id) {
    $driver = $this->driversRepository->queryDriver($id);
    return $driver->toJSON();
  }

  public function addDriver($params) {
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