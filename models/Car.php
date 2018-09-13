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
    if( is_null($params['id']) ) {
      return null;
    } else {
      return new Car(array(
        'id' => $params['carId'],
        'stateCarNumber' => $params['stateCarNumber'],
        'brand' => $params['brand'],
        'gasolineConsumptionRatio' => $params['gasolineConsumptionRatio'],
        'description' => $params['carDescription']
      ));
    }
  }
}
?>