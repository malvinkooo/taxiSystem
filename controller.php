<?php
use Psr\Http\Message\RequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Respect\Validation\Validator as v;
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

$app = new \Slim\App();

$app->get('/api/drivers', function(Request $req, Response $res){
  global $driversController;

  try {
    $driversList = $driversController->getDrivers();
    return $res->withStatus(200)->withJson( $driversList );
  } catch (DBException $e) {
    return $res->withStatus(500)->withJson($e->getError());
  } catch (Exception $e) {
    $erroObject = array(
      'error' => 'Внутренняя ошибка сервера.',
      'message' => $e->getMessage()
    );
    return $res->withStatus(500)->withJson($erroObject);
  }
});

$app->get('/api/drivers/{id}', function(Request $req, Response $res, $args){
  global $driversController;

  if(V::intVal()->validate($args['id']) && v::min(0)->validate($args['id'])) {
    try {
      $driver = $driversController->getDriver($args['id']);
      return $res->withStatus(200)->withJson( $driver );
    } catch (DBException $e) {
      return $res->withStatus(500)->withJson($e->getError());
    } catch (BadRequestException $e) {
      return $res->withStatus(404)->withJson($e->getError());
    }
  } else {
    return $res->withStatus(401)->withJson('Переданное значение id не валидно.');
  }
});

$app->post('/api/drivers', function(Request $req, Response $res){
  global $driversController;
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