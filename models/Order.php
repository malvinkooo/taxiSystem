<?php
class Order {
  function __construct($params) {
    $this->id = $params['id'];
    $this->dateOfCreation = $params['dateOfCreation'];
    $this->dateOfCompletion = $params['dateOfCompletion'];
    $this->distance = $params['distance'];
    $this->rate = $params['rate'];
    $this->status = $params['status'];
    $this->driver = Driver::fromOrderParams($params);
    $this->client = new Client($params);
    $this->carFeedPoint = new Address(array(
      'id' => $params['carFeedPointId'],
      'title' => $params['carFeedPointTitle'],
      'lat' => $params['carFeedPointLat'],
      'lng' => $params['carFeedPointLng']
    ));
    $this->destination = new Address(array(
      'id' => $params['destinationId'],
      'title' => $params['destinationTitle'],
      'lat' => $params['destinationLat'],
      'lng' => $params['destinationLng']
    ));
  }

  public function toJSON() {
    return array(
      'id' => $this->id,
      'dateOfCreation' => $this->dateOfCreation,
      'dateOfCompletion' => $this->dateOfCompletion,
      'distance' => $this->distance,
      'rate' => $this->rate,
      'status' => $this->status,
      'driver' => !is_null($this->driver) ? $this->driver->toJSON() : null,
      'client' => $this->client->toJSON(),
      'carFeedPoint' => $this->carFeedPoint->toJSON(),
      'destination' => $this->destination->toJSON()
    );
  }
}
?>