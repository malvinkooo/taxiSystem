<?php
use Psr\Http\Message\RequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
require 'vendor/autoload.php';
require 'functions.php';
require 'DriversList.php';
require 'CarsList.php';
require 'OrdersList.php';
$driversList = new DriversList();
$carsList = new CarsList();
$ordersList = new OrdersList();

$app = new \Slim\App();

$app->get('/api/drivers', function(Request $req, Response $res){
  global $driversList;
  $result = $driversList->prepareDrivers( $driversList->getDrivers() );

  return $res->withStatus(200)->withJson($result);
});

$app->get('/api/drivers/{id}', function(Request $req, Response $res, $args){
  global $driversList;
  $driver = $driversList->prepareDrivers( $driversList->getDriver($args['id']) )[0];

  return $res->withStatus(200)->withJson($driver);
});

$app->post('/api/drivers', function(Request $req, Response $res){
  global $driversList;
  $params = $req->getParsedBody();
  $lastId = $driversList->addDriver($params);

  return $res->withStatus(200)->withJson( $driversList->getDriver($lastId) );
});

$app->get('/api/cars', function(Request $req, Response $res){
  global $carsList;
  return $res->withStatus(200)->withJson( $carsList->getCars() );
});

$app->get('/api/cars/{id}', function(Request $req, Response $res, $args){
  global $carsList;
  return $res->withStatus(200)->withJson( $carsList->getCar($args['id']) );
});

$app->post('/api/cars', function(Request $req, Response $res){
  $params = $req->getParsedBody();
  $lastId = $carsList->addCar($params);

  return $res->withStatus(200)->withJson( $carsList->getCar($lastId) );
});

$app->get('/api/orders', function(Request $req, Response $res){
  global $ordersList;
  $result = $ordersList->prepareOrders( $ordersList->getOrders() );

  return $res->withStatus(200)->withJson($result);
});

$app->get('/api/orders/{id}', function(Request $req, Response $res, $args){
  global $ordersList;
  $order =  $ordersList->prepareOrders( $ordersList->getOrder($args['id']) )[0];

  return $res->withStatus(200)->withJson($order);
});

$app->post('/api/orders', function(Request $req, Response $res){
  $params = $req->getParsedBody();
  $lastId = $ordersList->addOrder($params);

  return $res->withStatus(200)->withJson( $ordersList->getOrder($lastId) );
});

$app->run();

?>