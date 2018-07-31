<?php
class Address {

  function __construct($db) {
    $this->db = $db;
  }

  public function addAddress($title, $lng, $lat) {
    $stm = $this->db->prepare("INSERT INTO address
      (title, lng, lat)
      VALUES
      (:title, :lng, :lat)");
    $addressParams = array(
      ':title' => $title,
      ':lng' => $lng,
      ':lat' => $lat
    );
    $stm->execute($addressParams);
    return $this->db->lastInsertId();
  }
}
?>