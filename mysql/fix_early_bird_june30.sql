-- Fix for early bird date comparison bug (off-by-one).
-- People who registered on June 30th were incorrectly marked as non-early-bird
-- because `new Date() < new Date("2026-06-30")` evaluated to false during
-- that entire day (JS parses date-only strings as UTC midnight at the START).
--
-- This script:
--   1. Corrects is_early_bird for all June 30th registrants
--   2. Subtracts the 30€ late fee from total_due for affected onsite registrants
--      (online registrations don't include a late fee in their total)

-- Step 1: Fix is_early_bird for ALL June 30th registrants (onsite + online)
UPDATE participants SET is_early_bird = 1, updated_at = NOW() WHERE DATE(created_at) = '2026-06-30'  AND is_early_bird = 0;

-- Step 2: Fix total_due for ONSITE June 30th registrants (subtract the 30€ late fee)
UPDATE participants SET total_due = total_due - 30, updated_at = NOW() WHERE DATE(created_at) = '2026-06-30' AND is_early_bird = 1 AND is_online = 0;
