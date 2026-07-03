-- =============================================================================
-- Carpooling simplification migration
-- Removes ride requests, passengers, and contact preferences.
-- Keeps only the simplified carpooling_offers table.
-- =============================================================================
--
-- Run with:
--   mysql -u MYSQL_USER -p MYSQL_DATABASE < fix_carpooling_simplify.sql
--
-- =============================================================================

-- 1. Drop tables that are no longer needed (order matters due to FK constraints)
DROP TABLE IF EXISTS carpooling_offer_passengers;
DROP TABLE IF EXISTS carpooling_requests;

-- 2. Remove contact-related columns from carpooling_offers
ALTER TABLE carpooling_offers
    DROP COLUMN IF EXISTS contact_phone,
    DROP COLUMN IF EXISTS contact_preference;

-- 3. Update default destination value
ALTER TABLE carpooling_offers
    ALTER COLUMN destination SET DEFAULT 'Conference venue';
