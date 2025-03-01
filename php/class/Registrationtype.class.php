<?php

class RegistrationtypeManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function getRegistrationTypes() {
      $stmt = $this->pdo->query("SELECT * FROM registration_types");
      return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

?>