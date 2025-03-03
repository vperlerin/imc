import classNames from "classnames";
import css from "../summary/index.module.scss";
import React from "react";

const getPaypalPrice = (price) => {
  return Math.round((price + (0.034 * price + 0.35) / 0.966) * 100) / 100;
};

const StaticSummary = ({ isOnline, conferenceData, participantData, workshops, registrationTypes, paymentMethods }) => {
  if (!participantData || !participantData.participant) {
    return <div className="alert alert-danger">No participant data available.</div>;
  }

  const { participant, accommodation, extra_options, contributions = [], payments = [] } = participantData;

  // Registration & Accommodation
  const registrationType = accommodation?.registration_type || "Unknown";
  const registrationPrice = parseFloat(accommodation?.registration_price || 0);
  const lateFee = participant.is_early_bird === "0" ? conferenceData.costs.after_early_birds : 0;
  const totalRoomCost = registrationPrice + lateFee;

  // Selected Workshops
  const selectedWorkshops = workshops.map(workshop => ({
    title: workshop.title,
    price: isOnline ? parseFloat(workshop.price_online) : parseFloat(workshop.price)
  }));
  const workshopCost = selectedWorkshops.reduce((sum, w) => sum + w.price, 0);

  // T-shirt Cost
  const tshirtCost = extra_options?.buy_tshirt === "1" ? parseFloat(conferenceData.costs.tshirts.price) : 0;

  // Printed Posters Cost
  const printedPosters = contributions.filter(contribution => contribution.print === "1");
  const printedPostersCost = printedPosters.length * conferenceData.poster_print.price;

  // Payment Method
  const paymentMethodName = payments.length > 0 ? payments[0].payment_method : "Unknown";
  const isPaypal = paymentMethodName === "Paypal";

  // Total Calculation
  let totalCost = totalRoomCost + workshopCost + tshirtCost + printedPostersCost;
  const paypalFee = isPaypal ? getPaypalPrice(totalCost) - totalCost : 0;
  totalCost += paypalFee;

  // Online conference cost calculation
  const onlineConferenceCost = conferenceData.costs.online;
  let totalOnlineCost = workshopCost + onlineConferenceCost;
  const onlinePaypalFee = isPaypal ? getPaypalPrice(totalOnlineCost) - totalOnlineCost : 0;
  totalOnlineCost += onlinePaypalFee;

  return (
    <div className="p-2 border rounded flex-shrink-0">
      <h4 className="mb-3">Billing Summary</h4>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col" className="text-end">Price</th>
          </tr>
        </thead>
        <tbody>
          {/* Registration & Accommodation */}
          {!isOnline ? (
            <tr>
              <td className="ps-3 text-muted">
                Conference Registration {registrationType !== "Unknown" ? `(${registrationType})` : ""}
              </td>
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
          {printedPosters.length > 0 && (
            <tr>
              <td className="ps-3 text-muted">
                Printed Poster{printedPosters.length > 1 ? "s" : ""} x {printedPosters.length}
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
              <td className="text-end">{isOnline ? onlinePaypalFee.toFixed(2) : paypalFee.toFixed(2)}€</td>
            </tr>
          )}

          {/* Total */}
          <tr>
            <td>
              <strong>TOTAL</strong>
            </td>
            <td className="text-end">
              <strong>{isOnline ? totalOnlineCost.toFixed(2) : totalCost.toFixed(2)}€</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StaticSummary;
