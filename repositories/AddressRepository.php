<?php
class AddressRepository {

  function __construct($db) {
    $this->db = $db;
  }

  public function addAddress($params) {
    $stm = $this->db->prepare("INSERT INTO address
      (title, lng, lat)
      VALUES
      (:title, :lng, :lat)");
    $addressParams = array(
      ':title' => $params['text'],
      ':lng' => $params['lng'],
      ':lat' => $params['lat']
    );
    $stm->execute($addressParams);
    return $this->db->lastInsertId();
  }
}
?>