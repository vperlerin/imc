export const getWorkshopById = (id, workshops) => {
  if (!Array.isArray(workshops)) return { id: null, title: "Unknown Workshop" };

  const workshop = workshops.find((pm) => String(pm.id) === String(id));
  return workshop || { id: null, title: "Unknown Workshop" };
};
