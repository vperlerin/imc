/**
 * Turn DB slug (e.g. single_reduced_mobility) into readable text: underscores → spaces.
 * Does not change semantics for comparisons (still use raw `type` with toLowerCase() === "no", etc.).
 */
export const formatRegistrationTypeForDisplay = (type) => {
  if (type == null || type === "") return "";
  return String(type).replace(/_/g, " ");
};

/** Same as {@link formatRegistrationTypeForDisplay} with the first character uppercased (list labels, emails). */
export const formatRegistrationTypeTitle = (type) => {
  const s = formatRegistrationTypeForDisplay(type);
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};
