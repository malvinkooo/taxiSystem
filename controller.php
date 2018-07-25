<?php
use Psr\Http\Message\RequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
require 'vendor/autoload.php';
require 'functions.php';

$app = new \Slim\App();

$app->get('/api/drivers', function(Request $req, Response $res){
  $data = getDrivers();
  $result = array();
  foreach ($data as $val) {
    $driver = array();
    $driver_car = array();

    $driver['driver_id'] = $val['driver_id'];
    $driver['name'] = $val['name'];
    $driver['surname'] = $val['surname'];
    $driver['phone'] = $val['phone'];
    $driver['description'] = $val['description'];

    $driver_car['car_id'] = $val['car_id'];
    $driver_car['stateCarNumber'] = $val['state_car_number'];
    $driver_car['gasolineConsumptionRatio'] = $val['gasoline_consumption_ratio'];
    $driver_car['brand'] = $val['brand'];
    $driver_car['description'] = $val['description'];
    $driver['car'] = $driver_car;
    $result[] = $driver;
  }
  return $res->withStatus(200)->withJson($result);
});

$app->get('/api/drivers/{id}', function(Request $req, Response $res, $args){
  return $res->withStatus(200)->withJson(getDriver($args['id']));
});

$app->get('/api/cars', function(Request $req, Response $res){
  return $res->withStatus(200)->withJson(getCars());
});

$app->get('/api/cars/{id}', function(Request $req, Response $res, $args){
  return $res->withStatus(200)->withJson(getCar($args['id']));
});

$app->get('/api/orders', function(Request $req, Response $res){
  return $res->withStatus(200)->withJson(getOrders());
});

$app->get('/api/orders/{id}', function(Request $req, Response $res, $args){
  return $res->withStatus(200)->withJson(getOrder($args['id']));
});

$app->run();
?>