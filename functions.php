<?php

try {
  $db = new PDO('mysql:host=localhost;dbname=taxi_system', 'root', '', array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET CHARSET utf8'));
  $stm = $db->prepare("SET SESSION sql_mode = 'STRICT_ALL_TABLES'");
  $stm->execute();

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

class DBException extends Exception {
  function __construct($message, $code) {
    parent::__construct($message, $code);
  }
}

class NotFoundException extends Exception {
  function __construct($message, $code) {
    parent::__construct($message, $code);
  }
}

?>