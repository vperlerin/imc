/**
 * Label for /community/participants when API may anonymize opted-out rows (last_name "Anonymous", empty first/title).
 */
export const getPublicParticipantLabel = (participant) => {
  const first = String(participant?.first_name ?? "").trim();
  const last = String(participant?.last_name ?? "").trim();
  if (last.toLowerCase() === "anonymous" && !first) {
    return "Anonymous";
  }
  const parts = [participant?.title, participant?.first_name, participant?.last_name]
    .map((p) => (p == null ? "" : String(p).trim()))
    .filter(Boolean);
  return parts.join(" ") || "Anonymous";
};
