<?php

/**
 * Live registration_types with computed room_left (same logic as get_specific_data.php).
 *
 * @return array<int, array<string, mixed>>
 */
function fetchRegistrationTypesLive(PDO $pdo): array
{
    $sql = "
    SELECT
      rt.id,
      rt.type,
      rt.price,
      rt.description,
      rt.sort_order,
      rt.total,
      rt.room_left AS room_left_stored,
      COALESCE(x.used, 0) AS used,
      CASE
        WHEN rt.total > 0 THEN GREATEST(rt.total - COALESCE(x.used, 0), 0)
        ELSE 0
      END AS room_left
    FROM registration_types rt
    LEFT JOIN (
      SELECT
        a.registration_type_id,
        COUNT(*) AS used
      FROM accommodation a
      JOIN participants p ON p.id = a.participant_id
      WHERE p.deleted_at IS NULL
        AND p.status = 'active'
        AND p.is_online = 0
      GROUP BY a.registration_type_id
    ) x ON x.registration_type_id = rt.id
    ORDER BY rt.sort_order ASC, rt.id ASC
  ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return array_map(function ($r) {
        return [
            "id" => (int) $r["id"],
            "type" => (string) $r["type"],
            "price" => isset($r["price"]) ? (float) $r["price"] : 0.0,
            "description" => isset($r["description"]) ? (string) $r["description"] : "",
            "sort_order" => isset($r["sort_order"]) ? (int) $r["sort_order"] : 0,
            "total" => isset($r["total"]) ? (int) $r["total"] : 0,
            "used" => isset($r["used"]) ? (int) $r["used"] : 0,
            "room_left" => isset($r["room_left"]) ? (int) $r["room_left"] : 0,
            "room_left_stored" => isset($r["room_left_stored"]) ? (int) $r["room_left_stored"] : null,
        ];
    }, $rows);
}
