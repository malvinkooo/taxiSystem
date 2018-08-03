<?php
class Generic {
  private $someVar;
  public function __construct($someVar) {
    $this->someVar = $someVar;
  }

  public function testValue($someOtherVar) {
    if($someOtherVar > 3) {
      throw new Exception('Значение параметра не может быть больше 3!');
    } else {
      echo $this->someVar + $someOtherVar;
    }
  }
}

$gen = new Generic(3);
try {
  $gen->testValue(4);
} catch(Exception  $e) {
  echo 'Error :' . $e->getMessage() . '<br />';
  echo 'Code :' . $e->getCode() . '<br />';
  echo 'File :' . $e->getFile() . '<br />';
  echo 'Line :' . $e->getLine() . '<br />';
  exit();
}

?>