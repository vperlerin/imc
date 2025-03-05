export const onlineRegistrationTemplate() {
  
    $year = process.env.REACT_APP_YEAR;
    $paymentLink = "https://imc{$year}.imo.net/payment";

    $message = "
        <p>Hello <b>{$data['first_name']} {$data['last_name']}</b>,</p>
        <p>Thank you for registering for IMC <b>{$year}</b>. Your registration is nearly complete.</p>
    ";

    // TODO: get the payment_method from paymentè_id!!!!
    /*
    if (strtolower($data['payment_method']) == 'paypal') {
        $message .= "<p>If you haven't paid already, all";
    } else {
        $message .= "<p>All";
    }
        */

    $message .= " you need to do now is send the required payment of:</p>
        <p><b>{$data['total_due']} €</b></p>";

    $message .= "
        <p>The necessary instructions for making your payment can be found 
        <a href='{$paymentLink}'>on this page</a>.</p>

        <p>The registration fee should be sent to the IMO Treasurer 
        <b style='color:red'>IMMEDIATELY</b>. Delaying payment will result in the 
        <b>cancellation of your registration</b>.</p>

        <p>Best regards,</p>
        <p><b>IMC {$year} Team</b></p>

        <hr>

        <h3>Billing Details</h3>
        <h3>Registration Details</h3>
        {$summary}
    ";

    return $message;
}
}