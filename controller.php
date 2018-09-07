<?php
use Psr\Http\Message\RequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Respect\Validation\Validator as v;
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

$container = $app->getContainer();
$container['db'] = $db;
$container['DriversController'] = function($c) {
    return new DriversController($c->get('db'));
};
$container['CarsController'] = function($c) {
    return new CarsController($c->get('db'));
};
$container['OrdersController'] = function($c) {
    return new OrdersController($c->get('db'));
};


$app->get('/api/drivers', 'DriversController:getDrivers');
$app->get('/api/drivers/{id}', 'DriversController:getDriver');
$app->post('/api/drivers', 'DriversController:addDriver');
$app->put('/api/drivers/{id}', 'DriversController:updateDriver');
$app->delete('/api/drivers/{id}', 'DriversController:deleteDriver');

$app->get('/api/cars', 'CarsController:getCars');
$app->get('/api/cars/{id}', 'CarsController:getCar');
$app->post('/api/cars', 'CarsController:addCar');
$app->put('/api/cars/{id}', 'CarsController:updateCar');
$app->delete('/api/cars/{id}', 'CarsController:deleteCar');

$app->get('/api/orders', 'OrdersController:getOrders');
$app->get('/api/orders/{id}', 'OrdersController:getOrder');
$app->post('/api/orders', 'OrdersController:addOrder');
$app->put('/api/orders/{id}', 'OrdersController:updateOrder');

$app->run();

?>