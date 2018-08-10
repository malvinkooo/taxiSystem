<?php
class OrdersController {
  function __construct($db) {
    $this->ordersRepository = new OrdersRepository($db);
  }

  public function getOrder($id) {
    $order = $this->ordersRepository->queryOrder($id);
    return $order->toJSON();
  }

  public function getOrders() {
    $ordersList = $this->ordersRepository->queryAllOrders();
    $data = array();
    foreach ($ordersList as $order) {
      $data[] = $order->toJSON();
    }
    return $data;
  }

  public function addOrder($params) {
    $order = $this->ordersRepository->queryAddOrder($params);
    return $order->toJSON();
  }

  public function updateOrder($id, $params) {
    $order = $this->ordersRepository->queryUpdateOrder($id, $params);
    return $order->toJSON();
  }
}
?>