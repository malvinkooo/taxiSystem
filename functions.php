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

class DBException extends Exception {
  function __construct($error, $errorObject) {
    $this->code = $errorObject[0];
    $this->message = $errorObject[2];
    $this->error = $error;
  }

  public function getError() {
    return array(
      'error' => $this->error,
      'code' => $this->code,
      'message' => $this->message
    );
  }
}

class BadRequestException extends Exception {
  function __construct($message) {
    $this->message = $message;
  }

  public function getError() {
    return $this->message;
  }
}

?>