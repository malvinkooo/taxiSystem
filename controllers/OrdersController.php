<?php
class OrdersController {
  function __construct($db) {
    $this->ordersRepository = new OrdersRepository($db);
  }

  public function getOrder($id) {
    $order = $this->ordersRepository->queryOrder($id);
    // var_dump($order);
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
    //
  }

  public function updateOrder($id, $params) {
    //
  }
}
?>