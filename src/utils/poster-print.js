/**
 * On-site poster printing is only offered when conference data defines a positive price.
 */
export const offersOnsitePosterPrint = (conferenceData) => {
  const p = Number(conferenceData?.poster_print?.price);
  return Number.isFinite(p) && p > 0;
};
