import cssWarning from "pages/register/onsite/index.module.scss";
import PageContain from "components/page-contain";
import React from "react";
import PayPalForm from 'components/paypal';
import { CiWarning } from "react-icons/ci";
import { conferenceData as cd } from "data/conference-data";
import { formatFullDate, formatFullDatePlusXDays } from 'utils/date';
import { Link } from 'react-router-dom';

const Payment = () => {
  const hasWorkShops = cd.workshops?.length > 0;

  const formatWorkshop = (workshop) => {
    const onsite = `onsite: €${workshop.cost.toFixed(2)}`;
    const online = workshop.cost_online ? `, online: €${workshop.cost_online.toFixed(2)}` : "";
    return `${workshop.title} ${onsite}${online}`;
  };


  return (
    <PageContain title="Payment">

      <p className="d-flex border rounded-2 p-3 border-info text-info gap-2 mb-3">
        <CiWarning className={cssWarning.warning} />
        <span>
          {new Date() < new Date(cd.deadlines.early_birds) && (
            <span className="d-block fw-bolder">After {formatFullDate(cd.deadlines.early_birds)}, a late booking fee of {cd.costs.after_early_birds}€ is added to the registration fee.</span>
          )}
          Registration deadline: <span className="fw-bolder">{formatFullDate(cd.deadlines.reg)}</span>
        </span>
      </p>

      <h3>Registration fees</h3>
      <p>
        Together with the IMC registration form, the full IMC registration fee together with supplements for T-shirt ({cd.costs.tshirts.price}€), printed posters ({cd.poster_print.price}€ per poster) {!hasWorkShops ? <>,</> : <>and</>}
        {hasWorkShops && (<>, and any workshop participation ( {cd.workshops.map((workshop, index) => (
          <span key={index}>
            {index > 0 && " – "}
            {formatWorkshop(workshop)}
          </span>
        ))}),</>)} must be paid.
      </p>

      <p>Please note that the LOC cannot print posters larger than {cd.poster_print.size}.</p>

      <p>
        The IMC onsite registration fee is either:
      </p>

      <ul className="d-flex flex-column gap-2">
        {cd.costs.rooms.map((room, index) => (
          <li key={index}>
            <strong>{room.price}€</strong> - {room.description} - <span>({room.price + cd.costs.after_early_birds}€ after {formatFullDate(cd.deadlines.early_birds)})</span>
            <span className="d-block">
              {room.number
                ? `Standard accommodation in a ${room.type} room for 3 nights (only) with full board + participation in the conference, conference materials, coffee breaks, and excursion (price per person).`
                : `All meals except breakfasts + participation in the conference, conference materials, coffee breaks, and excursion (price per person).`}
            </span>
          </li>
        ))}
      </ul>

      <p>
        The IMC online registration fee is <b>{cd.costs.online}€</b>.
      </p>

      <p className="text-danger fw-bolder">
        Be aware that you are responsible for finding {' '}
        <Link
          aria-label="Extra accomodations"
          to="/location/extra"
        >
          suitable accommodation
        </Link>  {' '}
        as well transportation to and from the conference venue if you choose the “no-accommodation” option.
      </p>

      <p>
        Accompanying persons sharing a room with a participant must also register as a participant.
      </p>

      <h3 className="mt-3">Payment</h3>
      <p>You can pay in one of the following ways:</p>
      <h4>1. PayPal payments or credit card Payments through PayPal</h4>
      <p>
        We use PayPal for credit or debit card payments, but they charge a transaction fee. To keep the conference fee low, we pass this cost to participants using PayPal. Please ensure you pay the full amount, including fees, as shown on your registration confirmation. To pay, click the PayPal logo on the confirmation screen after registration or below to complete the payment securely. Your payment will go to the IMO (payment@imo.net).
      </p>

      <PayPalForm className="mb-5" year={cd.year} />

      <h4>2. International bank transfer</h4>

      <p>International bank transfer payments should be made to:</p>
      <blockquote className="border rounded-2 p-3">
        International Meteor Organization, Jozef Mattheessensstraat 60, 2540 Hove, Belgium<br />
        Bank account at BNP Paribas Fortis Bank Belgium<br />
        BIC bank code: GEBABEBB<br />
        IBAN account number: BE30 0014 7327 5911<br />
        e-mail: treasurer@imo.net
      </blockquote>

      <p>
        When paying, make sure that the IBAN account number and BIC bank code are both mentioned! Always contact your local bank to verify charges for international transfers, which are at the participant's expense.
      </p>

      <p>Transfers in Euro from an EU member state or another EEA country (Norway, Iceland, and Liechtenstein) should be free, however, or at least no more expensive than a domestic bank transfer, provided they are done correctly.</p>

      <h4>3. Other payment methods</h4>
      <p>If you cannot use either the international bank transfer or the PayPal service, please contact the <a href="mailto:treasurer@imo.net" rel="noopener noreferrer">IMO Treasurer</a> for instructions.</p>


      <h3 className="mt-3">Cancellation Policy</h3>
      <p>The cancellation policy for the IMC{cd.year} is as follows: </p>
      <ul>
        <li>
          <b>Until {formatFullDate(cd.deadlines.full_reimbursement_before)}:</b>  full reimbursement, except for {cd.costs.admin} administrative costs.
        </li>
        <li>
          <b>Between {formatFullDatePlusXDays(cd.deadlines.full_reimbursement_before, 1)}{' '}
            and {formatFullDate(cd.deadlines.half_reimbursement_before)}:</b> partial reimbursement of half of the registration fee;
        </li>
        <li>
          After <b>{formatFullDatePlusXDays(cd.deadlines.half_reimbursement_before, 1)}{' '}</b>: no reimbursement.
        </li>
      </ul>


    </PageContain >
  );
};

export default Payment;
