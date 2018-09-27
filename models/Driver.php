<?php
class Driver {
  function __construct($params) {
    $this->id = $params['id'];
    $this->name = $params['name'];
    $this->surname = $params['surname'];
    $this->phone = $params['phone'];
    $this->status = $params['status'];
    $this->isDeleted = $params['isDeleted'];
    $this->description = $params['description'];
    $this->car = Car::fromDriverParams($params);
  }

  public function toJSON() {
    return array(
      'id' => $this->id,
      'name' => $this->name,
      'surname' => $this->surname,
      'phone' => $this->phone,
      'status' => $this->status,
      'isDeleted' => $this->isDeleted,
      'description' => $this->description,
      'car' => !is_null($this->car) ? $this->car->toJSON() : null
    );
  }

  static function fromOrderParams($params) {
    $result = null;
    if( !is_null($params['driverId']) ) {
      $result = new Driver(array(
        'id' => $params['driverId'],
        'name' => $params['driverName'],
        'surname' => $params['driverSurname'],
        'phone' => $params['driverPhone'],
        'status' => $params['driverStatus'],
        'isDeleted' => $params['driverIsDeleted'],
        'description' => $params['driverDescription'],
        'carId' => $params['carId'],
        'stateCarNumber' => $params['stateCarNumber'],
        'brand' => $params['brand'],
        'gasolineConsumptionRatio' => $params['gasolineConsumptionRatio'],
        'carDescription' => $params['carDescription'],
        'carIsDeleted' => $params['carIsDeleted']
      ));
    }

    return $result;
  }
}
?>