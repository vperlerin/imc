<?php

class ExtraOptionsManager
{
  private $pdo;

  public function __construct(PDO $pdo)
  {
    $this->pdo = $pdo;
  }

  public function saveExtraOptions($participantId, $data)
  {
    $stmt = $this->pdo->prepare("
            INSERT INTO extra_options (participant_id, excursion, buy_tshirt, tshirt_size, proceedings, created_at, updated_at)
            VALUES (?, ?, ?, ?, 'pdf', NOW(), NOW())
        ");
    $stmt->execute([
      $participantId,
      filter_var($data['excursion'], FILTER_VALIDATE_BOOLEAN),
      filter_var($data['buy_tshirt'], FILTER_VALIDATE_BOOLEAN),
      $data['tshirt_size']
    ]);
  }
}
