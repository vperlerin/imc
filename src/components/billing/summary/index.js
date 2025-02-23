import classNames from 'classnames';
import css from './index.module.scss';
import React, { useEffect } from "react";

const getPaypalPrice = (price) => {
  return Math.round((price + (0.034 * price + 0.35) / 0.966) * 100) / 100;
};

const Summary = ({
  initialData,
  isOnline = false,
  isForAdmin = false,
  getValues,
  isEarlyBird,
  conferenceData,
  setTotal,
  setPaypalFee,
}) => {
  const allValues = initialData || getValues();

  // Registration & Accommodation Cost
  const registrationType = allValues.registrationType || "no"; // Default to "no"
  const selectedRoom = conferenceData.costs.rooms.find(room => room.type === registrationType);
  const roomCost = selectedRoom ? selectedRoom.price : 0;
  const lateFee = !isEarlyBird ? conferenceData.costs.after_early_birds : 0;
  const totalRoomCost = roomCost + lateFee;

  // Workshops Cost
  const selectedWorkshops = Object.entries(allValues)
    .filter(([key, value]) => conferenceData.workshops.some(w => w.title === key) && value === "true")
    .map(([key]) => conferenceData.workshops.find(w => w.title === key));
  const workshopCost = selectedWorkshops.reduce((sum, workshop) => sum + (workshop?.cost || 0), 0);

  // T-shirt Cost
  const tshirtCost = allValues.buyTShirt ? conferenceData.costs.tshirts.price : 0;

  // Printed Posters Cost
  // Count and cost of printed posters
  const printedPosters = allValues.posters
    ? allValues.posters.filter(poster => poster.printOnSite === "true")
    : [];

  const numberOfPrintedPosters = printedPosters.length;
  const printedPostersCost = numberOfPrintedPosters * conferenceData.poster_print.price;


  // Printed Proceedings Cost
  const proceedingsPrintedCost = allValues.proceedings === "pdf_printed" ? conferenceData.costs.printed_proceedings : 0;

  // Payment Method Fee (PayPal)
  const paymentMethod = allValues.paymentMethod || "bank"; // Default to bank transfer
  let totalCost = totalRoomCost + workshopCost + tshirtCost + proceedingsPrintedCost + printedPostersCost;
  const paypalFee = paymentMethod.toLowerCase() === "paypal" ? getPaypalPrice(totalCost) - totalCost : 0;
  totalCost += paypalFee;

  // Online conference 
  const workshopOnlineCost = selectedWorkshops.reduce((sum, workshop) => sum + (workshop?.cost_online || 0), 0);
  const onlineConferenceCost = conferenceData.costs.online;
  let totalOnlineCost = workshopOnlineCost + onlineConferenceCost;
  const onlinePaypalFee = paymentMethod.toLowerCase() === "paypal" ? getPaypalPrice(totalOnlineCost) - totalOnlineCost : 0;
  totalOnlineCost += onlinePaypalFee;

  useEffect(() => {
    if (isOnline) {
      setTotal(totalOnlineCost);
      setPaypalFee(onlinePaypalFee);
    } else {
      setTotal(totalCost);
      setPaypalFee(paypalFee);
    }
  }, [isOnline, totalCost, totalOnlineCost, setTotal, onlinePaypalFee, paypalFee, setPaypalFee]);

  return (
    <>
      {!isForAdmin && (
        <p className="fw-bolder">
          Please review your registration details and total cost carefully before submitting. If anything needs to be changed, go back and update your selections
        </p>
      )}

      <div className={classNames(!isForAdmin && css.maxW, 'p-2 border rounded')}>
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
                  {registrationType !== "no" ? (
                    <>
                      Conference Registration and {registrationType.charAt(0).toUpperCase() + registrationType.slice(1)} Room
                    </>
                  ) : (
                    <>Conference Registration</>
                  )}
                </td>
                <td className="text-end">{totalRoomCost.toFixed(2)}€</td>
              </tr>
            ) : (
              <tr>
                <td className="ps-3 text-muted">
                  <>Online Conference Registration</>
                </td>
                <td className="text-end">{onlineConferenceCost.toFixed(2)}€</td>
              </tr>
            )}


            {/* Workshops */}
            {selectedWorkshops.length > 0 && !isOnline &&
              selectedWorkshops.map((workshop, index) => (
                <tr key={index}>
                  <td className="ps-3 text-muted">{workshop.title}</td>
                  <td className="text-end">{workshop.cost.toFixed(2)}€</td>
                </tr>
              ))}


            {/* Online Workshops */}
            {selectedWorkshops.length > 0 && isOnline &&
              selectedWorkshops.map((workshop, index) => (
                <tr key={index}>
                  <td className="ps-3 text-muted">{workshop.title}</td>
                  <td className="text-end">{workshop.cost_online.toFixed(2)}€</td>
                </tr>
              ))}

            {/* Printed posters */}
            {numberOfPrintedPosters > 0 && (
              <tr>
                <td className="ps-3 text-muted">
                  Poster{numberOfPrintedPosters > 1 && 's'} to print x {numberOfPrintedPosters}
                </td>
                <td className="text-end">{printedPostersCost.toFixed(2)}€</td>
              </tr>
            )}


            {/* T-shirt */}
            {allValues.buyTShirt && (
              <tr>
                <td className="ps-3 text-muted">T-Shirt</td>
                <td className="text-end">{tshirtCost.toFixed(2)}€</td>
              </tr>
            )}

            {/* Proceedings (Printed) */}
            {allValues.proceedings === "pdf_printed" && (
              <tr>
                <td className="ps-3 text-muted">Proceedings (Printed)</td>
                <td className="text-end">{proceedingsPrintedCost.toFixed(2)}€</td>
              </tr>
            )}

            {/* PayPal Fee */}
            {paymentMethod.toLowerCase() === "paypal" && (
              <tr>
                <td className="ps-3 text-muted">PayPal Fee (3.4% + 0.35€)</td>
                <td className="text-end">
                  {!isOnline ? <>{paypalFee.toFixed(2)}€</> : <>{onlinePaypalFee.toFixed(2)}€</>}
                </td>
              </tr>
            )}

            {/* Total */}
            <tr>
              <td><strong>TOTAL</strong></td>
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
