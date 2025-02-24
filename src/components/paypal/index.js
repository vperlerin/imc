import css from './index.module.scss';
import classNames from 'classnames';
import React from "react";

const PayPalForm = ({ className, year, amount }) => {
  return (
    <form action="https://www.paypal.com/cgi-bin/webscr" method="post">
      <input type="hidden" name="cmd" value="_xclick" />
      <input type="hidden" name="business" value="payment@imo.net" />
      <input type="hidden" name="item_name" value={`IMC ${year} Registration`} />
      <input type="hidden" name="no_note" value="1" />
      <input type="hidden" name="currency_code" value="EUR" />
      <input type="hidden" name="tax" value="0" />
      <input type="hidden" name="lc" value="GB" />

      {!!amount && (
        <input type="hidden" name="amount" value={amount} />
      )}

      <button type="submit" className={classNames('btn btn-default border rounded-2 d-flex align-items-center gap-2 fw-bolder pe-4', css.paypal, className)}>
        <img
          src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-mark-color.svg"
          alt={`Make your IMC ${year} payment with PayPal`}
          border="0"
          style={{"width": "4rem"}}
        />
        Make your IMC {year}<br/>payment with PayPal
      </button>
    </form>
  );
};

export default PayPalForm;