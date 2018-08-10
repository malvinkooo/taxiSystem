<?php
class Client {
  function __construct($params) {
    $this->id = $params['clientId'];
    $this->name = $params['clientName'];
    $this->surname = $params['clientSurname'];
    $this->phone = $params['clientPhone'];
  }

  public function toJSON() {
    return array(
      'id' => $this->id,
      'name' => $this->name,
      'surname' => $this->surname,
      'phone' => $this->phone
    );
  }
}
?>