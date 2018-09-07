<?php
class ClientRepository {

  function __construct($db) {
    $this->db = $db;
  }

  public function addClient($params) {
    $stm = $this->db->prepare("INSERT INTO client_list
      (name, surname, phone)
      VALUES
      (:name, :surname, :phone)");
    $clientParams = array(
      ':name' => $params['clientName'],
      ':surname' => $params['clientSurname'],
      ':phone' => $params['clientPhone']
    );
    $stm->execute($clientParams);

    return $this->db->lastInsertId();
  }
}
?>