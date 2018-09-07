<?php
use Respect\Validation\Validator as v;
use Respect\Validation\Exceptions\NestedValidationException;

class OrdersController {
  function __construct($db) {
    $this->ordersRepository = new OrdersRepository($db);
  }

  public function getOrders($req, $res) {
    $ordersList = $this->ordersRepository->queryAllOrders();
    $data = array();
    foreach ($ordersList as $order) {
      $data[] = $order->toJSON();
    }

    return $res->withStatus(200)->withJson( $data );
  }

  public function getOrder($req, $res, $args) {
    V::intVal()->min(1)->assert($args['id']);
    $order = $this->ordersRepository->queryOrder($args['id']);

    return $res->withStatus(200)->withJson( $order->toJSON() );
  }

  public function addOrder($req, $res) {
    $params = $req->getParsedBody();

    $orderValidator = v::key('driver', v::intVal()->min(1))
    ->key('clientName', v::stringType()->length(2, 20))
    ->key('clientSurname', v::stringType()->length(2, 20))
    ->key('clientPhone', v::stringType()->length(10))
    ->key('dateOfCreation', v::date())
    ->key('destination', v::stringType()->max(30))
    ->key('destinationLng', v::floatVal())
    ->key('destinationLat', v::floatVal())
    ->key('carFeedPoint', v::stringType()->max(30))
    ->key('carFeedPointLng', v::floatval())
    ->key('carFeedPointLat', v::floatval())
    ->key('distance', v::intVal())
    ->key('rate', v::floatval());
    $orderValidator->assert($params);

    $order = $this->ordersRepository->queryAddOrder($params);

    return $res->withStatus(200)->withJson( $order->toJSON() );
  }

  public function updateOrder($req, $res, $args) {
    $params = $req->getParsedBody();

    v::intVal()->min(1)->assert($args['id']);
    $orderValidator = v::key('driver', v::intVal()->min(1))
    ->key('clientName', v::stringType()->length(2, 20))
    ->key('clientSurname', v::stringType()->length(2, 20))
    ->key('clientPhone', v::stringType()->length(10))
    ->key('destination', v::stringType()->max(30))
    ->key('destinationLng', v::floatVal())
    ->key('destinationLat', v::floatVal())
    ->key('carFeedPoint', v::stringType()->max(30))
    ->key('carFeedPointLng', v::floatval())
    ->key('carFeedPointLat', v::floatval())
    ->key('distance', v::intVal())
    ->key('status', v::stringType()->max(20))
    ->key('rate', v::floatval());
    $orderValidator->assert($params);

    $order = $this->ordersRepository->queryUpdateOrder($args['id'], $params);

    return $res->withStatus(200)->withJson( $order->toJSON() );
  }
}
?>