import React from "react";
import { getPaymentMethodById } from "utils/payment_method";

const getPaypalPrice = (price) => {
  return Math.round((price + (0.034 * price + 0.35) / 0.966) * 100) / 100;
};

const getRegInfo = (id, registrationTypes) => {
  const registration = registrationTypes.find(item => item.id === id);
  if (!registration) return "Description not found";

  const isLastItem = registrationTypes[registrationTypes.length - 1].id === id;
  return {
    description: isLastItem ? "(no accommodation)" : "+ " + registration.description,
    price: parseFloat(registration.price),
  };
};

const getSelectedWorkshops = (participantWorkshops = [], isOnline) => {
  if (!Array.isArray(participantWorkshops)) return { selected: [], totalPrice: 0 };

  const selected = participantWorkshops
    .filter(workshop => workshop.attending === "1") // Only include attended workshops
    .map(workshop => ({
      title: workshop.title,
      price: isOnline ? parseFloat(workshop.price_online) : parseFloat(workshop.price),
    }));

  const totalPrice = selected.reduce((sum, workshop) => sum + workshop.price, 0);
  return { selected, totalPrice };
};

const StaticSummary = ({ isOnline, conferenceData, participantData, registrationTypes, paymentMethods }) => {
  if (!participantData || !participantData.participant) {
    return <div className="alert alert-danger">No participant data available.</div>;
  }

  const { participant, accommodation, workshops: participantWorkshops, extra_options, contributions = [], payments = [] } = participantData;

  // Registration & Accommodation
  const { description: registration_description, price: registrationPrice } = getRegInfo(accommodation.registration_type_id, registrationTypes);
  const lateFee = participant.is_early_bird === "0" ? conferenceData.costs.after_early_birds : 0;
  const totalRoomCost = registrationPrice + lateFee;

  // Selected Workshops
  const { selected: selectedWorkshops, totalPrice: workshopCost } = getSelectedWorkshops(participantWorkshops, isOnline);

  // T-shirt Cost
  const buyTShirt = extra_options?.buy_tshirt === "1" || extra_options?.buy_tshirt === "true";
  const tshirtCost = buyTShirt ? parseFloat(conferenceData.costs.tshirts.price) : 0;

  // Printed Posters Cost
  const printedPosters = contributions.filter(contribution => contribution.print === "1" || contribution.print === "true");
  const numberOfPrintedPosters = printedPosters.length;
  const printedPostersCost = numberOfPrintedPosters * conferenceData.poster_print.price;

  // Payment Method 
  const paymentMethodName = payments.length > 0 ? getPaymentMethodById(accommodation.payment_method_id, paymentMethods) : "Unknown";
  const isPaypal = paymentMethodName.toLowerCase() === "paypal"; 

  // Total Calculation
  let totalCost = totalRoomCost + workshopCost + tshirtCost + printedPostersCost;
  const paypalFee = isPaypal ? getPaypalPrice(totalCost) - totalCost : 0;
  totalCost += paypalFee;

  // Online Conference Cost Calculation
  const onlineConferenceCost = conferenceData.costs.online;
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
            <th scope="col" className="text-end">Price</th>
          </tr>
        </thead>
        <tbody>
          {/* Registration & Accommodation */}
          {!isOnline ? (
            <tr>
              <td className="ps-3 text-muted">
                Conference Registration {registration_description}
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
