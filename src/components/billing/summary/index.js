import classNames from "classnames";
import css from "./index.module.scss";
import React, { useEffect } from "react";
import { getPaymentMethodById } from 'utils/payment_method';

const getPaypalPrice = (price) => {
  return Math.round((price + (0.034 * price + 0.35) / 0.966) * 100) / 100;
};

const getRegInfo = (id, registrationTypes) => {
  const registration = registrationTypes.find(item => item.id === id);

  if (!registration) return "Description not found";

  // Check if it's the last item in the array
  const isLastItem = registrationTypes[registrationTypes.length - 1].id === id;
  return {
    description: isLastItem ? "(no accommodation)" : "+ " + registration.description,
    price: parseFloat(registration.price)
  };
};

const getSelectedWorkshops = (selectedWorkshopIds = [], workshops = [], isOnline) => {
  if (!Array.isArray(selectedWorkshopIds)) {
    selectedWorkshopIds = [];
  }

  const selected = workshops
    .filter(workshop => selectedWorkshopIds.includes(String(workshop.id)))
    .map(workshop => ({
      title: workshop.title,
      price: isOnline ? parseFloat(workshop.price_online) : parseFloat(workshop.price)
    }));

  const totalPrice = selected.reduce((sum, workshop) => sum + workshop.price, 0);

  return { selected, totalPrice };
};

 

const Summary = ({
  isOnline = false,
  isAdmin = false,
  getValues,
  isEarlyBird,
  conferenceData,
  showInfo = true,
  setTotal,
  setPaypalFee,
  workshops,
  registrationTypes,
  paymentMethods,
  watch,
}) => {
  const allValues = getValues();
 
  // Registration & Accommodation Cost
  const registration_type = allValues.registration_type_id;
  const { description: registration_description, price: registration_price } = getRegInfo(registration_type, registrationTypes);
  const lateFee = !isEarlyBird ? conferenceData.costs.after_early_birds : 0;
  const totalRoomCost = registration_price + lateFee;

  // Workshops Costs   
  const selectedWorkshopIds = watch("workshops") || [];
  const { selected: selectedWorkshops, totalPrice: workshopCost } = getSelectedWorkshops(selectedWorkshopIds, workshops, isOnline);

  // T-shirt Cost 
  const tshirtCost = allValues.buy_tshirt === "1" || allValues.buy_tshirt === "true" ? parseFloat(conferenceData.costs.tshirts.price) : 0;

  // Printed Posters Cost
  const printedPosters = allValues.posters ? allValues.posters.filter(poster => poster.print === "true" || poster.print === "1") : [];

  const numberOfPrintedPosters = printedPosters.length;
  const printedPostersCost = numberOfPrintedPosters * conferenceData.poster_print.price;

  // Payment Method
  const paymentMethodName = getPaymentMethodById(allValues.payment_method_id, paymentMethods);
  const isPaypal = paymentMethodName === 'paypal';

  let totalCost = totalRoomCost + workshopCost + tshirtCost + printedPostersCost; 
  const paypalFee = isPaypal ? getPaypalPrice(totalCost) - totalCost : 0; 
  totalCost += paypalFee;

  // Online conference cost calculation 
  const onlineConferenceCost = conferenceData.costs.online;
  let totalOnlineCost = workshopCost + onlineConferenceCost;
  const onlinePaypalFee = isPaypal ? getPaypalPrice(totalOnlineCost) - totalOnlineCost : 0;
  totalOnlineCost += onlinePaypalFee;

  
  useEffect(() => {
    if (isOnline) {
      if (paymentMethodName === 'paypal') {
        setTotal(totalOnlineCost - onlinePaypalFee);
        setPaypalFee(onlinePaypalFee);
      } else {
        setTotal(totalOnlineCost);
      }
    } else {
      if (paymentMethodName === 'paypal') {
        setTotal(totalCost - paypalFee);
        setPaypalFee(paypalFee);
      } else {
        setTotal(totalCost);
      }
    }
  }, [isOnline, totalCost, totalOnlineCost, setTotal, onlinePaypalFee, paypalFee, setPaypalFee, allValues.buy_tshirt, allValues.tshirt_size]);

  return (
    <>
      {!isAdmin && showInfo && (
        <p className="fw-bolder alert alert-info">
          Please review your registration details and total cost carefully before submitting. If any changes are needed, go back and update your selections. Once registered, you will receive a password that allows you to update only your travel details and contributions (talks & posters).
        </p>
      )}

      <div className={classNames(!isAdmin && css.maxW, "p-2 border rounded")}>
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
                  Conference registration {' '} {registration_description}
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
            {selectedWorkshops.length > 0 &&
              selectedWorkshops.map((workshop, index) => (
                <tr key={index}>
                  <td className="ps-3 text-muted">{workshop.title}</td>
                  <td className="text-end">
                    {workshop.price.toFixed(2)}€
                  </td>
                </tr>
              ))}

            {/* Printed posters */}
            {numberOfPrintedPosters > 0 && (
              <tr>
                <td className="ps-3 text-muted">
                  Poster{numberOfPrintedPosters > 1 && "s"} to print x {numberOfPrintedPosters}
                </td>
                <td className="text-end">{printedPostersCost.toFixed(2)}€</td>
              </tr>
            )}

            {/* T-shirt */}
            {tshirtCost > 0 && !!allValues.tshirt_size && (
              <tr>
                <td className="ps-3 text-muted">T-Shirt ({allValues.tshirt_size})</td>
                <td className="text-end">{tshirtCost.toFixed(2)}€</td>
              </tr>
            )} 

            {/* PayPal Fee */}
            {isPaypal && (
              <tr>
                <td className="ps-3 text-muted">PayPal Fee (3.4% + 0.35€)</td>
                <td className="text-end">
                  {!isOnline ? <>{paypalFee.toFixed(2)}€</> : <>{onlinePaypalFee.toFixed(2)}€</>}
                </td>
              </tr>
            )}

            {/* Total */}
            <tr>
              <td>
                <strong>TOTAL</strong>
              </td>
              <td className="text-end">
                {!isOnline ? (
                  <strong>{totalCost.toFixed(2)}€</strong>
                ) : (
                  <strong>{totalOnlineCost.toFixed(2)}€</strong>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Summary;
