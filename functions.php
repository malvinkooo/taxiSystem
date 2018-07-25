<?php

try {
  $db = new PDO('mysql:host=localhost;dbname=taxi_system', 'root', '', array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET CHARSET utf8'));
} catch(PDOException $e) {
  http_response_code(500);
  header('Content-Type', 'application/json');
  $erroObject = array(
    'error' => 'Не удалось подключиться к БД',
    'details' => $e->getMessage()
  );
  echo json_encode($erroObject);
  exit();
}

function getDrivers() {
  global $db;
  $stm = $db->prepare("SELECT * FROM drivers_list dl
                      LEFT OUTER JOIN cars_list cl
                      ON dl.car_id = cl.car_id");
  $stm->execute();
  return $stm->fetchAll(PDO::FETCH_ASSOC);
}

function getDriver($id) {
  global $db;
  $stm = $db->prepare("SELECT * FROM drivers_list dl
                      LEFT OUTER JOIN cars_list cl
                      ON dl.car_id = cl.car_id
                      WHERE dl.driver_id = ?");
  $stm->execute(array($id));
  return $stm->fetchAll(PDO::FETCH_ASSOC)[0];
}

function getCars() {
  global $db;
  $stm = $db->prepare("SELECT * FROM cars_list");
  $stm->execute();
  return $stm->fetchAll(PDO::FETCH_ASSOC);
}

function getCar($id) {
  global $db;
  $stm = $db->prepare("SELECT * FROM cars_list WHERE car_id = ?");
  $stm->execute(array($id));
  return $stm->fetchAll(PDO::FETCH_ASSOC)[0];
}

function getOrders() {
  global $db;
  $stm = $db->prepare("SELECT * FROM orders_list ol
                       LEFT OUTER JOIN drivers_list dl
                       ON ol.driver_id = dl.driver_id
                       LEFT OUTER JOIN cars_list cl
                       ON dl.car_id = cl.car_id");
  $stm->execute();
  return $stm->fetchAll(PDO::FETCH_ASSOC);
}

function getOrder($id) {
  global $db;
  $stm = $db->prepare("SELECT * FROM orders_list ol
                       LEFT OUTER JOIN drivers_list dl
                       ON ol.driver_id = dl.driver_id
                       LEFT OUTER JOIN cars_list cl
                       ON dl.car_id = cl.car_id
                       WHERE id = ?");
  $stm->execute(array($id));
  return $stm->fetchAll(PDO::FETCH_ASSOC)[0];
}

?>