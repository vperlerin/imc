-- IMC 2026: introduce beds_per_room for capacity computation.
-- Run once on the live DB. Safe to re-run (idempotent).
--
-- Background:
--   `registration_types.total` stores the number of physical ROOMS for each type.
--   The accommodation table stores ONE row per registered person (= one BED used).
--   The live availability query needs beds-per-room to translate between the two.
--
-- After running this migration:
--   - `registration_types.beds_per_room` exists with sensible values per known room type.
--   - PHP (php/lib/registration_types_live.php) automatically starts using the column.
--   - If you run the code BEFORE this migration, it falls back to a hardcoded
--     CASE expression by `type`, so behavior is already correct in either order.

ALTER TABLE registration_types
  ADD COLUMN IF NOT EXISTS beds_per_room INT UNSIGNED NOT NULL DEFAULT 1 AFTER total;

UPDATE registration_types SET beds_per_room = 3 WHERE type = 'triple';
UPDATE registration_types SET beds_per_room = 2 WHERE type = 'double';
UPDATE registration_types SET beds_per_room = 1 WHERE type IN ('single', 'single_accessible');
-- 'no' (no accommodation) stays at default 1; capacity checks skip it when total = 0.

-- Optional one-shot reset.
-- Only run this if a spurious "sold out" team alert was sent under the old buggy
-- formula and you want a fresh alert to fire when that type ACTUALLY sells out:
--
-- DELETE FROM sold_out_room_alert_sent;
