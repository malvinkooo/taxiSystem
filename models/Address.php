<?php
class Address {
  function __construct($params) {
    $this->id = $params['id'];
    $this->title = $params['title'];
    $this->lat = $params['lat'];
    $this->lng = $params['lng'];
  }

  public function toJSON() {
    return array(
      'id' => $this->id,
      'title' => $this->title,
      'lat' => $this->lat,
      'lng' => $this->lng
    );
  }
}
?>