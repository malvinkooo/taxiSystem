<?php
use Psr\Http\Message\RequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
require 'vendor/autoload.php';
require 'functions.php';

$app = new \Slim\App();

$app->get('/api/drivers', function(Request $req, Response $res){
  $result = prepareDrivers( getDrivers() );

  return $res->withStatus(200)->withJson($result);
});

$app->get('/api/drivers/{id}', function(Request $req, Response $res, $args){
  $driver = prepareDrivers( getDriver($args['id']) )[0];

  return $res->withStatus(200)->withJson($driver);
});

$app->get('/api/cars', function(Request $req, Response $res){
  return $res->withStatus(200)->withJson(getCars());
});

$app->get('/api/cars/{id}', function(Request $req, Response $res, $args){
  return $res->withStatus(200)->withJson(getCar($args['id']));
});

$app->get('/api/orders', function(Request $req, Response $res){
  $result = prepareOrders( getOrders() );

  return $res->withStatus(200)->withJson($result);
});

$app->get('/api/orders/{id}', function(Request $req, Response $res, $args){
  $order =  prepareOrders( getOrder($args['id']) )[0];

  return $res->withStatus(200)->withJson($order);
});

$app->run();

?>