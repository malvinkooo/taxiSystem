<?php
class Car {
  function __construct($params) {
    foreach ($params as $key => $value) {
      $this->$key = $value;
    }
  }

  public function toJSON() {
    return get_object_vars($this);
  }

  static function fromDriverParams($params) {
    $result = null;
    if( !is_null($params['carId']) ) {
      $result = new Car(array(
        'id' => $params['carId'],
        'stateCarNumber' => $params['stateCarNumber'],
        'brand' => $params['brand'],
        'isDeleted' => $params['carIsDeleted'],
        'gasolineConsumptionRatio' => $params['gasolineConsumptionRatio'],
        'description' => $params['carDescription']
      ));
    }

    return $result;
  }
}
?>