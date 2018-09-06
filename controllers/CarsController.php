<?php
use Respect\Validation\Validator as v;
use Respect\Validation\Exceptions\NestedValidationException;

class CarsController {

  function __construct($db) {
    $this->carsRepository = new CarsRepository($db);
  }

  public function getCar($req, $res, $args) {
    v::intVal()->min(0)->assert($args['id']);
    $car = $this->carsRepository->queryCar($args['id']);

    return $res->withStatus(200)->withJson( $car->toJSON() );
  }

  public function getCars($req, $res) {
    $carsList = $this->carsRepository->queryAllCars();
    $data = array();
    foreach ($carsList as $car) {
      $data[] = $car->toJSON();
    }

    return $res->withStatus(200)->withJson( $data );
  }

  public function addCar($req, $res) {
    $params = $req->getParsedBody();
    $carsValidator = v::key('stateCarNumber', v::length(5, 20))
    ->key('brand', v::stringType()->length(2, 20))
    ->key('gasolineConsumptionRatio', v::floatVal()->max(12.00))
    ->key('description', v::stringType()->max(255));
    $carsValidator->assert($params);

    $car = $this->carsRepository->queryAddCar($params);

    return $res->withStatus(200)->withJson( $car->toJSON() );
  }

  public function deleteCar($req, $res, $args) {
    v::intVal()->min(1)->assert($args['id']);
    $result = $this->carsRepository->queryDeleteCar($args['id']);

    return $res->withStatus(200)->withJson( $result );
  }

  public function updateCar($req, $res, $args) {
   $params = $req->getParsedBody();

   v::intVal()->min(1)->assert($args['id']);
   $carsValidator = v::key('stateCarNumber', v::length(5, 20))
   ->key('brand', v::stringType()->length(2, 20))
   ->key('gasolineConsumptionRatio', v::floatVal()->max(12.00))
   ->key('description', v::stringType()->max(255));
   $carsValidator->assert($params);

   $car = $this->carsRepository->queryUpdateCar($args['id'], $params);

   return $res->withStatus(200)->withJson( $car->toJSON() );
 }
}
?>