-- Run once on existing databases: dedupe "room type sold out" team emails (one row per registration type).
-- To allow a new alert after reopening capacity, DELETE the row for that registration_type_id.

CREATE TABLE IF NOT EXISTS sold_out_room_alert_sent (
    registration_type_id INT NOT NULL PRIMARY KEY,
    sent_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_sold_out_alert_registration_type
        FOREIGN KEY (registration_type_id) REFERENCES registration_types(id) ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
