<?php
use Respect\Validation\Validator as v;
use Respect\Validation\Exceptions\NestedValidationException;

class DriversController {

  public function __construct($db) {
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

  public function getDriver($req, $res, $args) {
    v::intVal()->min(1)->assert($args['id']);
    $driver = $this->driversRepository->queryDriver($args['id']);

    return $res->withStatus(200)->withJson( $driver->toJSON() );
  }

  public function addDriver($req, $res) {
    $params = $req->getParsedBody();

    $driverValidator = v::key('name', v::stringType()->length(2, 20))
    ->key('surname', v::stringType()->length(2, 20))
    ->key('phone', v::stringType()->length(10))
    ->key('car', v::intval()->min(1))
    ->key('description', v::stringType()->max(255))
    ->key('status', v::stringType()->length(4, 20));
    $driverValidator->assert($params);

    $driver = $this->driversRepository->queryAddDriver($params);

    return $res->withStatus(200)->withJson( $driver->toJSON() );
  }

  public function deleteDriver($req, $res, $args) {
    v::intVal()->min(1)->assert($args['id']);
    $result = $this->driversRepository->queryDeleteDriver($args['id']);
    return $res->withStatus(200)->withJson( $result );
  }

  public function updateDriver($req, $res, $args) {
    $params = $req->getParsedBody();

    v::intVal()->min(1)->assert($args['id']);
    $driverValidator = v::key('name', v::stringType()->length(2, 20))
    ->key('surname', v::stringType()->length(2, 20))
    ->key('phone', v::stringType()->length(10))
    ->key('car', v::intval()->min(1))
    ->key('description', v::stringType()->max(255))
    ->key('status', v::stringType()->length(4, 20));
    $driverValidator->assert($params);

    $driver = $this->driversRepository->queryUpdateDriver($args['id'], $params);

    return $res->withStatus(200)->withJson( $driver->toJSON() );
  }
}
?>