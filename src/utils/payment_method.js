export const getPaymentMethodById = (id, paymentMethods) => {
  if (!Array.isArray(paymentMethods)) return "Unknown Method";

  const method = paymentMethods.find((pm) => String(pm.id) === String(id));
  return method ? method.method.toLowerCase() : "Unknown Method";
};
