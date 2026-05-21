<?php

/**
 * Live registration_types with bed-accurate capacity computation.
 *
 * Capacity model:
 *   - `total`            : number of physical rooms for this type (legacy column).
 *   - `beds_per_room`    : beds per room (triple=3, double=2, single=1, ...).
 *   - `beds_total`       : total * beds_per_room (= bookable seats for the type).
 *   - `used`             : COUNT(*) of active on-site accommodation rows for this type.
 *   - `beds_left`        : max(beds_total - used, 0).
 *   - `rooms_left`       : floor(beds_left / beds_per_room) -- fully untouched rooms.
 *   - `partial_beds_left`: beds_left mod beds_per_room -- free beds inside a partially-used room.
 *
 * Back-compat: `room_left` is returned equal to `beds_left` so existing consumers
 * (sold-out detection in register_onsite.php, hide-filter in accomodation.js) keep
 * working correctly without any change of their own logic.
 *
 * Deploy safety: if the `beds_per_room` column does not exist yet (code deployed
 * before the mysql/add_beds_per_room.sql migration is run), the query transparently
 * falls back to a hardcoded CASE expression by `type`. Same behavior either way.
 *
 * @return array<int, array<string, mixed>>
 */
function fetchRegistrationTypesLive(PDO $pdo): array
{
  // Detect once per request whether the new column exists.
  $hasBedsCol = false;
  try {
    $check = $pdo->query(
      "SELECT 1 FROM information_schema.COLUMNS
             WHERE TABLE_SCHEMA = DATABASE()
               AND TABLE_NAME   = 'registration_types'
               AND COLUMN_NAME  = 'beds_per_room'
             LIMIT 1"
    );
    $hasBedsCol = $check && (bool) $check->fetchColumn();
  } catch (Throwable $e) {
    $hasBedsCol = false;
  }

  // $bedsExpr is composed only of fixed strings (never user input) -> safe to interpolate.
  $bedsExpr = $hasBedsCol
    ? "rt.beds_per_room"
    : "CASE rt.type
             WHEN 'septuple' THEN 7
             WHEN 'sextuple' THEN 6
             WHEN 'quintuple' THEN 5
             WHEN 'quadruple' THEN 4
             WHEN 'triple' THEN 3
             WHEN 'double' THEN 2
             WHEN 'single' THEN 1
             WHEN 'single_accessible' THEN 1
             ELSE 1
           END";

  // CAST to SIGNED avoids MySQL "BIGINT UNSIGNED out of range" when used > beds_total.
  // GREATEST(..., 0) then clamps to zero for the sold-out case.
  $sql = "
    SELECT
      rt.id,
      rt.type,
      rt.price,
      rt.description,
      rt.sort_order,
      rt.total                                                                        AS total_rooms,
      ({$bedsExpr})                                                                   AS beds_per_room,
      (CAST(rt.total AS SIGNED) * CAST(({$bedsExpr}) AS SIGNED))                      AS beds_total,
      COALESCE(x.used, 0)                                                             AS used,
      GREATEST(CAST(rt.total AS SIGNED) * CAST(({$bedsExpr}) AS SIGNED)
               - CAST(COALESCE(x.used, 0) AS SIGNED), 0)                              AS beds_left,
      FLOOR(GREATEST(CAST(rt.total AS SIGNED) * CAST(({$bedsExpr}) AS SIGNED)
                     - CAST(COALESCE(x.used, 0) AS SIGNED), 0)
            / GREATEST(CAST(({$bedsExpr}) AS SIGNED), 1))                              AS rooms_left,
      (GREATEST(CAST(rt.total AS SIGNED) * CAST(({$bedsExpr}) AS SIGNED)
                - CAST(COALESCE(x.used, 0) AS SIGNED), 0)
            MOD GREATEST(CAST(({$bedsExpr}) AS SIGNED), 1))                            AS partial_beds_left,
      rt.room_left                                                                     AS room_left_stored
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
    $totalRooms      = isset($r["total_rooms"]) ? (int) $r["total_rooms"] : 0;
    $bedsPerRoom     = isset($r["beds_per_room"]) ? (int) $r["beds_per_room"] : 1;
    $bedsTotal       = isset($r["beds_total"]) ? (int) $r["beds_total"] : 0;
    $used            = isset($r["used"]) ? (int) $r["used"] : 0;
    $bedsLeft        = isset($r["beds_left"]) ? (int) $r["beds_left"] : 0;
    $roomsLeft       = isset($r["rooms_left"]) ? (int) $r["rooms_left"] : 0;
    $partialBedsLeft = isset($r["partial_beds_left"]) ? (int) $r["partial_beds_left"] : 0;

    return [
      "id"                => (int) $r["id"],
      "type"              => (string) $r["type"],
      "price"             => isset($r["price"]) ? (float) $r["price"] : 0.0,
      "description"       => isset($r["description"]) ? (string) $r["description"] : "",
      "sort_order"        => isset($r["sort_order"]) ? (int) $r["sort_order"] : 0,
      // Keep `total` = number of rooms (matches existing JSON shape).
      "total"             => $totalRooms,
      "total_rooms"       => $totalRooms,
      "beds_per_room"     => $bedsPerRoom,
      "beds_total"        => $bedsTotal,
      "used"              => $used,
      "beds_left"         => $bedsLeft,
      "rooms_left"        => $roomsLeft,
      "partial_beds_left" => $partialBedsLeft,
      // Legacy field: now expresses remaining BEDS so existing `<= 0` sold-out
      // checks (PHP register_onsite, JS hide-filter) keep working.
      "room_left"         => $bedsLeft,
      "room_left_stored"  => isset($r["room_left_stored"]) ? (int) $r["room_left_stored"] : null,
    ];
  }, $rows);
}
