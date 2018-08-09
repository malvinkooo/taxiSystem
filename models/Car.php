<?php
class Car {
  function __construct($params) {
    $this->id = $params['id'];
    $this->stateCarNumber = $params['stateCarNumber'];
    $this->gasolineConsumptionRatio = $params['gasolineConsumptionRatio'];
    $this->brand = $params['brand'];
    $this->description = $params['description'];
  }

  public function toJSON() {
    return array(
      'id' => $this->id,
      'stateCarNumber' => $this->stateCarNumber,
      'gasolineConsumptionRatio' => $this->gasolineConsumptionRatio,
      'brand' => $this->brand,
      'description' => $this->description
    );
  }
}
?>