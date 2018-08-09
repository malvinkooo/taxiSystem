<?php
use Psr\Http\Message\RequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
require 'vendor/autoload.php';
require 'functions.php';
// require 'DriversRepository.php';
require 'repositories/CarsRepository.php';
require 'controllers/CarsController.php';
require 'models/Car.php';
// require 'ClientRepository.php';
// require 'AddressRepository.php';
// require 'OrdersRepository.php';
// $driversList = new DriversRepository($db);
$carsController = new CarsController($db);
// $ordersList = new OrdersRepository($db);

$app = new \Slim\App();

// $app->get('/api/drivers', function(Request $req, Response $res){
//   global $driversList;
//   $result = $driversList->prepareDrivers( $driversList->getDrivers() );

//   return $res->withStatus(200)->withJson($result);
// });

// $app->get('/api/drivers/{id}', function(Request $req, Response $res, $args){
//   global $driversList;
//   $driver = $driversList->prepareDrivers( $driversList->getDriver($args['id']) )[0];

//   return $res->withStatus(200)->withJson($driver);
// });

// $app->post('/api/drivers', function(Request $req, Response $res){
//   global $driversList;
//   $params = $req->getParsedBody();
//   $lastId = $driversList->addDriver($params);

//   return $res->withStatus(200)->withJson( $driversList->getDriver($lastId) );
// });

// $app->put('/api/drivers/{id}', function(Request $req, Response $res, $args){
//   global $driversList;
//   $params = $req->getParsedBody();
//   $driversList->updateDriver($args['id'], $params);
//   $driver = $driversList->prepareDrivers( $driversList->getDriver($args['id']) )[0];

//   return $res->withStatus(200)->withJson($driver);
// });

// $app->delete('/api/drivers/{id}', function(Request $req, Response $res, $args){
//   global $driversList;
//   $driversList->deleteDriver($args['id']);

//   return $res->withStatus(200);
// });



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

// $app->post('/api/cars', function(Request $req, Response $res){
//   $params = $req->getParsedBody();
//   $lastId = $carsList->addCar($params);

//   return $res->withStatus(200)->withJson( $carsList->getCar($lastId) );
// });

// $app->put('/api/cars/{id}', function(Request $req, Response $res, $args){
//   global $carsList;
//   $params = $req->getParsedBody();
//   $carsList->updateCar($args['id'], $params);
//   $car = $carsList->getCar($args['id']);

//   return $res->withStatus(200)->withJson($car);
// });

// $app->delete('/api/cars/{id}', function(Request $req, Response $res, $args){
//   global $carsList;
//   $result = $carsList->deleteCar($args['id']);

//   return $res->withStatus(200)->withJson($result);
// });



// $app->get('/api/orders', function(Request $req, Response $res){
//   global $ordersList;
//   $result = $ordersList->prepareOrders( $ordersList->getOrders() );

//   return $res->withStatus(200)->withJson($result);
// });

// $app->get('/api/orders/{id}', function(Request $req, Response $res, $args){
//   global $ordersList;
//   $order =  $ordersList->prepareOrders( $ordersList->getOrder($args['id']) )[0];

//   return $res->withStatus(200)->withJson($order);
// });

// $app->post('/api/orders', function(Request $req, Response $res){
//   $params = $req->getParsedBody();
//   $lastId = $ordersList->addOrder($params);

//   return $res->withStatus(200)->withJson( $ordersList->getOrder($lastId) );
// });

// $app->put('/api/orders/{id}', function(Request $req, Response $res, $args){
//   global $ordersList;
//   $params = $req->getParsedBody();
//   $ordersList->updateOrder($args['id'], $params);
//   $order = $ordersList->prepareOrders( $ordersList->getOrder($args['id']) )[0];

//   return $res->withStatus(200)->withJson($order);
// });

$app->run();

?>