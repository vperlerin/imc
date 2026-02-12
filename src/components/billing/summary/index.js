import classNames from "classnames";
import css from "./index.module.scss";
import React, { useEffect, useMemo } from "react";
import { getPaymentMethodById } from "utils/payment_method";

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
    return { description: "", price: 0 };
  }

  const isNoAccommodation = String(registration.type).toLowerCase() === "no";

  return {
    description: isNoAccommodation ? "(no accommodation)" : `+ ${registration.description}`,
    price: toNumber(registration.price, 0),
    type: String(registration.type || ""),
  };
};

const getSelectedWorkshops = (selectedWorkshopIds = [], workshops = [], isOnline) => {
  if (!Array.isArray(selectedWorkshopIds)) selectedWorkshopIds = [];

  const selected = (workshops || [])
    .filter((workshop) => selectedWorkshopIds.includes(String(workshop.id)))
    .map((workshop) => ({
      title: workshop.title,
      price: isOnline ? toNumber(workshop.price_online, 0) : toNumber(workshop.price, 0),
    }));

  const totalPrice = selected.reduce((sum, workshop) => sum + workshop.price, 0);
  return { selected, totalPrice };
};

const Summary = ({
  isOnline = false,
  isAdmin = false,
  watch,
  isEarlyBird,
  conferenceData,
  showInfo = true,
  setTotal,
  setPaypalFee,
  workshops,
  registrationTypes,
  paymentMethods,
}) => {
  // Watch form changes dynamically
  const registration_type = watch("registration_type_id");
  const selectedWorkshopIds = watch("workshops") || [];
  const buyTShirt = watch("buy_tshirt") === "true" || watch("buy_tshirt") === true;
  const tshirtSize = watch("tshirt_size") || "";
  const paymentMethodId = watch("payment_method_id");
  const posters = watch("posters") || [];

  // Registration & Accommodation Cost
  const { description: registration_description, price: registration_price } = useMemo(
    () => getRegInfo(registration_type, registrationTypes),
    [registration_type, registrationTypes]
  );

  const lateFee = !isEarlyBird || isEarlyBird === "0" ? toNumber(conferenceData?.costs?.after_early_birds, 0) : 0;
  const totalRoomCost = registration_price + lateFee;

  // Workshops Costs
  const { selected: selectedWorkshops, totalPrice: workshopCost } = useMemo(
    () => getSelectedWorkshops(selectedWorkshopIds, workshops, isOnline),
    [selectedWorkshopIds, workshops, isOnline]
  );

  // T-shirt Cost
  const tshirtCost = buyTShirt ? toNumber(conferenceData?.costs?.tshirts?.price, 0) : 0;

  // Printed Posters Cost
  const printedPosters = (posters || []).filter((poster) => poster.print === "true" || poster.print === "1");
  const numberOfPrintedPosters = printedPosters.length;
  const printedPostersCost = numberOfPrintedPosters * toNumber(conferenceData?.poster_print?.price, 0);

  // Payment Method
  const paymentMethodName = getPaymentMethodById(paymentMethodId, paymentMethods);
  const isPaypal = paymentMethodName === "paypal";

  // Compute totals (memoized)
  const { totalCost, paypalFee, totalOnlineCost, onlinePaypalFee } = useMemo(() => {
    let totalCostLocal = totalRoomCost + workshopCost + tshirtCost + printedPostersCost;
    const paypalFeeLocal = isPaypal ? getPaypalPrice(totalCostLocal) - totalCostLocal : 0;
    totalCostLocal += paypalFeeLocal;

    const onlineConferenceCost = toNumber(conferenceData?.costs?.online, 0);
    let totalOnlineCostLocal = workshopCost + onlineConferenceCost;
    const onlinePaypalFeeLocal = isPaypal ? getPaypalPrice(totalOnlineCostLocal) - totalOnlineCostLocal : 0;
    totalOnlineCostLocal += onlinePaypalFeeLocal;

    return {
      totalCost: totalCostLocal,
      paypalFee: paypalFeeLocal,
      totalOnlineCost: totalOnlineCostLocal,
      onlinePaypalFee: onlinePaypalFeeLocal,
    };
  }, [
    totalRoomCost,
    workshopCost,
    tshirtCost,
    printedPostersCost,
    isPaypal,
    conferenceData,
  ]);

  const onlineConferenceCost = toNumber(conferenceData?.costs?.online, 0);

  // Automatically update total and PayPal fee when form values change
  useEffect(() => {
    if (isOnline) {
      if (isPaypal) {
        setTotal(totalOnlineCost - onlinePaypalFee);
        setPaypalFee(onlinePaypalFee);
      } else {
        setTotal(totalOnlineCost);
        setPaypalFee(0);
      }
    } else {
      if (isPaypal) {
        setTotal(totalCost - paypalFee);
        setPaypalFee(paypalFee);
      } else {
        setTotal(totalCost);
        setPaypalFee(0);
      }
    }
  }, [
    isOnline,
    isPaypal,
    totalCost,
    paypalFee,
    totalOnlineCost,
    onlinePaypalFee,
    setTotal,
    setPaypalFee,
  ]);

  return (
    <>
      {!isAdmin && showInfo && (
        <p className="fw-bolder alert alert-info">
          {!isOnline ? (
            <>
              Please review your registration details and total cost carefully before submitting. If any changes are
              needed, go back and update your selections. Once registered, you will receive a password that allows you
              to update only your travel details and contributions (talks & posters).
            </>
          ) : (
            <>
              Please review your registration details before submitting. If any changes are needed, go back and update
              your selections. Once registered, you will receive a password that allows you to update only your eventual
              contributions (talks).
            </>
          )}
        </p>
      )}

      <div className={classNames(!isAdmin && css.maxW, "p-2 border rounded")}>
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
            {!isOnline ? (
              <tr>
                <td className="ps-3 text-muted">Conference registration {registration_description}</td>
                <td className="text-end">{totalRoomCost.toFixed(2)}€</td>
              </tr>
            ) : (
              <tr>
                <td className="ps-3 text-muted">Online Conference Registration</td>
                <td className="text-end">{onlineConferenceCost.toFixed(2)}€</td>
              </tr>
            )}

            {selectedWorkshops.map((workshop, index) => (
              <tr key={index}>
                <td className="ps-3 text-muted">{workshop.title}</td>
                <td className="text-end">{workshop.price.toFixed(2)}€</td>
              </tr>
            ))}

            {numberOfPrintedPosters > 0 && (
              <tr>
                <td className="ps-3 text-muted">
                  Poster{numberOfPrintedPosters > 1 && "s"} to print x {numberOfPrintedPosters}
                </td>
                <td className="text-end">{printedPostersCost.toFixed(2)}€</td>
              </tr>
            )}

            {tshirtCost > 0 && !!tshirtSize && (
              <tr>
                <td className="ps-3 text-muted">T-Shirt ({tshirtSize})</td>
                <td className="text-end">{tshirtCost.toFixed(2)}€</td>
              </tr>
            )}

            {isPaypal && (
              <tr>
                <td className="ps-3 text-muted">PayPal Fee (3.4% + 0.35€)</td>
                <td className="text-end">{isOnline ? onlinePaypalFee.toFixed(2) : paypalFee.toFixed(2)}€</td>
              </tr>
            )}

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
    </>
  );
};

export default Summary;
