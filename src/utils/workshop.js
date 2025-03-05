export const getWorkshopById = (id, workshops) => {
  if (!Array.isArray(workshops)) return "Unknown Workshop (not an array)";

  const workshop = workshops.find((pm) => String(pm.id) === String(id));
  return workshop ? workshop : "Unknown Workshop";
};
