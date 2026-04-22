/**
 * Interpret stored is_early_bird from API/DB (0/1, "0"/"1", booleans, common string forms).
 * Matches PHP FILTER_VALIDATE_BOOLEAN-style truthiness used when saving participants.
 *
 * @param {unknown} value Raw field from participant row or form
 * @returns {boolean} true = registered during early-bird window (no late booking surcharge on room rate)
 */
export function isParticipantEarlyBird(value) {
  if (value === false || value === 0) return false;
  if (value === true || value === 1) return true;
  if (value === undefined || value === null) return true; // legacy / missing: do not surcharge (see doc_receipt.php)

  const s = String(value).trim().toLowerCase();
  if (s === "0" || s === "false" || s === "no" || s === "off" || s === "") return false;
  if (s === "1" || s === "true" || s === "yes" || s === "on") return true;

  const n = Number(value);
  if (Number.isFinite(n)) return n !== 0;
  return true;
}
