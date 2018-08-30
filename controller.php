<?php
use Psr\Http\Message\RequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Respect\Validation\Validator as v;
// use Respect\Validation\Exceptions\ValidationException;
use Respect\Validation\Exceptions\NestedValidationException;
require 'vendor/autoload.php';
require 'functions.php';
require 'repositories/DriversRepository.php';
require 'controllers/DriversController.php';
require 'models/Driver.php';
require 'repositories/CarsRepository.php';
require 'controllers/CarsController.php';
require 'models/Car.php';
require 'repositories/OrdersRepository.php';
require 'repositories/AddressRepository.php';
require 'repositories/ClientRepository.php';
require 'controllers/OrdersController.php';
require 'models/Order.php';
require 'models/Client.php';
require 'models/Address.php';
$driversController = new DriversController($db);
$carsController = new CarsController($db);
$ordersController = new OrdersController($db);

$c = new \Slim\Container();
$c['errorHandler'] = function($c) {
  return function ($req, $res, $e) use ($c) {
    try {
      throw $e;
    } catch (NestedValidationException $e) {
      return $res->withStatus(400)->withJson(array(
        'code' => 400,
        'message' => $e->getMessage()
      ));
    } catch (Exception $e) {
      return $res->withStatus($e->getCode())->withJson(array(
        'code' => $e->getCode(),
        'message' => $e->getMessage()
      ));
    }
  };
};
$c['phpErrorHandler'] = function ($c) {
  return function ($req, $res, $error) use ($c) {
    return $res->withStatus(500)->write($error->getMessage());
  };
};
$app = new \Slim\App($c);

$app->get('/api/drivers', function(Request $req, Response $res){
  global $driversController;

  $driversList = $driversController->getDrivers();
  return $res->withStatus(200)->withJson( $driversList );
});

$app->get('/api/drivers/{id}', function(Request $req, Response $res, $args){
  global $driversController;

  V::intVal()->min(1)->assert($args['id']);
  $driver = $driversController->getDriver($args['id']);
  return $res->withStatus(200)->withJson( $driver );
});

$app->post('/api/drivers', function(Request $req, Response $res){
  global $driversController;

  $driverValidator = v::key('name', v::stringType()->length(2, 20))
    ->key('surname', v::stringType()->length(2, 20))
    ->key('phone', v::stringType()->length(10))
    ->key('car', v::intval()->min(1))
    ->key('description', v::stringType()->length(0, 255))
    ->key('status', v::stringType()->length(4, 20));
  $driverValidator->assert($req->getParsedBody());

  $driver = $driversController->addDriver( $req->getParsedBody() );
  return $res->withStatus(200)->withJson( $driver );
});

$app->put('/api/drivers/{id}', function(Request $req, Response $res, $args){
  global $driversController;
  $driver = $driversController->updateDriver($args['id'], $req->getParsedBody());
  return $res->withStatus(200)->withJson( $driver );
});

$app->delete('/api/drivers/{id}', function(Request $req, Response $res, $args){
  global $driversController;

  v::intVal()->min(1)->assert($args['id']);

  $result = $driversController->deleteDriver($args['id']);
  return $res->withStatus(200)->withJson( $result );
});



$app->get('/api/cars', function(Request $req, Response $res){
  global $carsController;

  $carsList = $carsController->getCars();
  return $res->withStatus(200)->withJson( $carsList );
});

$app->get('/api/cars/{id}', function(Request $req, Response $res, $args){
  global $carsController;

  v::intVal()->min(0)->check($args['id']);
  $car = $carsController->getCar($args['id']);
  return $res->withStatus(200)->withJson( $car );
});

$app->post('/api/cars', function(Request $req, Response $res){
  global $carsController;
  $car = $carsController->addCar( $req->getParsedBody() );
  return $res->withStatus(200)->withJson( $car );
});

$app->put('/api/cars/{id}', function(Request $req, Response $res, $args){
  global $carsController;
  $car = $carsController->updateCar($args['id'], $req->getParsedBody());
  return $res->withStatus(200)->withJson( $car );
});

$app->delete('/api/cars/{id}', function(Request $req, Response $res, $args){
  global $carsController;
  $result = $carsController->deleteCar($args['id']);
  return $res->withStatus(200)->withJson( $result );
});



$app->get('/api/orders', function(Request $req, Response $res){
  global $ordersController;
  $ordersList = $ordersController->getOrders();
  return $res->withStatus(200)->withJson( $ordersList );
});

$app->get('/api/orders/{id}', function(Request $req, Response $res, $args){
  global $ordersController;
  $order = $ordersController->getOrder($args['id']);
  return $res->withStatus(200)->withJson( $order );
});

$app->post('/api/orders', function(Request $req, Response $res){
  global $ordersController;
  $order = $ordersController->addOrder( $req->getParsedBody() );
  return $res->withStatus(200)->withJson( $order );
});

$app->put('/api/orders/{id}', function(Request $req, Response $res, $args){
  global $ordersController;
  $order = $ordersController->updateOrder($args['id'], $req->getParsedBody());
  return $res->withStatus(200)->withJson( $order );
});

$app->run();

?>