import React from "react";

const getPaypalPrice = (price) => {
  return Math.round((price + (0.034 * price + 0.35) / 0.966) * 100) / 100;
};

const toNumber = (v, fallback = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

const getRegInfo = (id, registrationTypes) => {
  const regId = toNumber(id, null);
  const registration = (registrationTypes || []).find((item) => toNumber(item.id) === regId);

  if (!registration) {
    return { description: "", price: 0, type: "" };
  }

  const type = String(registration.type || "").toLowerCase();
  const isNoAccommodation = type === "no";

  return {
    description: isNoAccommodation ? "(no accommodation)" : `+ ${registration.description}`,
    price: toNumber(registration.price, 0),
    type,
  };
};

const getSelectedWorkshops = (participantWorkshops = [], isOnline) => {
  if (!Array.isArray(participantWorkshops)) return { selected: [], totalPrice: 0 };

  const selected = participantWorkshops.map((workshop) => ({
    title: workshop.title,
    price: isOnline ? toNumber(workshop.price_online, 0) : toNumber(workshop.price, 0),
  }));

  const totalPrice = selected.reduce((sum, workshop) => sum + workshop.price, 0);
  return { selected, totalPrice };
};

const StaticSummary = ({ isOnline, conferenceData, participantData, registrationTypes }) => {
  if (!participantData || !participantData.participant) {
    return <div className="alert alert-danger">No participant data available.</div>;
  }

  const {
    participant,
    accommodation,
    workshops: participantWorkshops,
    extra_options,
    contributions = [],
  } = participantData;

  // Registration & Accommodation Cost
  let totalRoomCost = 0;
  let registrationDescription = "";

  if (!isOnline) {
    const regInfo = getRegInfo(accommodation?.registration_type_id, registrationTypes);
    registrationDescription = regInfo.description;

    const lateFee =
      participant?.is_early_bird === "0" ? toNumber(conferenceData?.costs?.after_early_birds, 0) : 0;

    totalRoomCost = regInfo.price + lateFee;
  }

  // Selected Workshops
  const { selected: selectedWorkshops, totalPrice: workshopCost } = getSelectedWorkshops(
    participantWorkshops,
    isOnline
  );

  // T-shirt Cost
  const buyTShirt = extra_options?.buy_tshirt === "1" || extra_options?.buy_tshirt === "true";
  const tshirtCost = buyTShirt ? toNumber(conferenceData?.costs?.tshirts?.price, 0) : 0;

  // Printed Posters Cost
  const printedPosters = (contributions || []).filter(
    (contribution) => contribution.print === "1" || contribution.print === "true"
  );
  const numberOfPrintedPosters = printedPosters.length;
  const printedPostersCost = numberOfPrintedPosters * toNumber(conferenceData?.poster_print?.price, 0);

  // Payment Method
  const paymentMethodName = participant?.payment_method_name || "Unknown";
  const isPaypal = String(paymentMethodName).toLowerCase() === "paypal";

  // Total Calculation
  let totalCost = totalRoomCost + workshopCost + tshirtCost + printedPostersCost;
  const paypalFee = isPaypal ? getPaypalPrice(totalCost) - totalCost : 0;
  totalCost += paypalFee;

  // Online Conference Cost Calculation
  const onlineConferenceCost = toNumber(conferenceData?.costs?.online, 0);
  let totalOnlineCost = workshopCost + onlineConferenceCost;
  const onlinePaypalFee = isPaypal ? getPaypalPrice(totalOnlineCost) - totalOnlineCost : 0;
  totalOnlineCost += onlinePaypalFee;

  return (
    <div className="p-2 border rounded flex-shrink-0">
      <h4 className="mb-3">Invoice Summary</h4>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col" className="text-end">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Registration & Accommodation */}
          {!isOnline ? (
            <tr>
              <td className="ps-3 text-muted">Conference Registration {registrationDescription}</td>
              <td className="text-end">{totalRoomCost.toFixed(2)}€</td>
            </tr>
          ) : (
            <tr>
              <td className="ps-3 text-muted">Online Conference Registration</td>
              <td className="text-end">{onlineConferenceCost.toFixed(2)}€</td>
            </tr>
          )}

          {/* Workshops */}
          {selectedWorkshops.map((workshop, index) => (
            <tr key={index}>
              <td className="ps-3 text-muted">{workshop.title}</td>
              <td className="text-end">{workshop.price.toFixed(2)}€</td>
            </tr>
          ))}

          {/* Printed Posters */}
          {numberOfPrintedPosters > 0 && (
            <tr>
              <td className="ps-3 text-muted">
                Printed Poster{numberOfPrintedPosters > 1 ? "s" : ""} x {numberOfPrintedPosters}
              </td>
              <td className="text-end">{printedPostersCost.toFixed(2)}€</td>
            </tr>
          )}

          {/* T-shirt */}
          {tshirtCost > 0 && extra_options?.tshirt_size && (
            <tr>
              <td className="ps-3 text-muted">T-Shirt ({extra_options.tshirt_size})</td>
              <td className="text-end">{tshirtCost.toFixed(2)}€</td>
            </tr>
          )}

          {/* PayPal Fee */}
          {isPaypal && (
            <tr>
              <td className="ps-3 text-muted">PayPal Fee (3.4% + 0.35€)</td>
              <td className="text-end">
                {isOnline ? onlinePaypalFee.toFixed(2) : paypalFee.toFixed(2)}€
              </td>
            </tr>
          )}

          {/* Total */}
          <tr>
            <td>
              <strong>TOTAL</strong>
            </td>
            <td className="text-end">
              <strong>{(isOnline ? totalOnlineCost : totalCost).toFixed(2)}€</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StaticSummary;
