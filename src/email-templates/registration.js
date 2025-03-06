const year = process.env.REACT_APP_YEAR || "2025"; 

const registrationDetails = (participant, workshops) => {
    const totalDue = parseFloat(participant.total_due) || 0;
    const paypalFee = participant.payment_method_id === "1" ? (parseFloat(participant.paypal_fee) || 0) : 0;

    return `
        <h3 style="margin-bottom:5px;">Personal Details</h3>
        <strong>Name:</strong> ${participant.title} ${participant.first_name} ${participant.last_name}<br>
        <strong>Email:</strong> ${participant.email}<br>
        <strong>Phone:</strong> ${participant.phone}<br>
        <strong>Address:</strong> ${participant.address}, ${participant.postal_code} ${participant.city}, ${participant.country}<br>
        ${participant.organization ? `<strong>Organization:</strong> ${participant.organization}<br>` : ""}
        <strong>Date of Birth:</strong> ${participant.dob}<br><br>

        <h3 style="margin-bottom:5px;">Arrival & Departure</h3>
        <strong>Arrival:</strong> ${participant.arrival_date} at ${participant.arrival_hour}:${participant.arrival_minute} by ${participant.travelling}<br>
        <strong>Departure:</strong> ${participant.departure_date} at ${participant.departure_hour}:${participant.departure_minute}<br>
        ${participant.travelling_details ? `<strong>Details:</strong> ${participant.travelling_details}<br>` : ""}<br>

        <h3 style="margin-bottom:5px;">Workshops</h3>
        ${participant.workshops?.length > 0 ? `
            <ul style="margin-top:0; padding-left:15px;">
                ${participant.workshops.map(workshop => `<li>Workshop ID: ${workshop}</li>`).join("")}
            </ul>
        ` : "No workshops selected.<br>"}<br>

        <h3 style="margin-bottom:5px;">Contributions</h3>
        ${participant.wantsToContribute === "yes" ? `
            <h4 style="margin-bottom:5px;">Talks</h4>
            ${participant.talks?.length > 0 ? `
                <ul style="margin-top:0; padding-left:15px;">
                    ${participant.talks.map(talk => `<li><strong>${talk.title}</strong> by ${talk.authors} (${talk.duration})<br>${talk.abstract}</li>`).join("")}
                </ul>
            ` : "No talks submitted.<br>"}
            
            <h4 style="margin-bottom:5px;">Posters</h4>
            ${participant.posters?.length > 0 ? `
                <ul style="margin-top:0; padding-left:15px;">
                    ${participant.posters.map(poster => `<li><strong>${poster.title}</strong> by ${poster.authors}<br>${poster.abstract}</li>`).join("")}
                </ul>
            ` : "No posters submitted.<br>"}
        ` : "No contributions.<br>"}<br>

        <h3 style="margin-bottom:5px;">Additional Information</h3>
        <strong>Excursion:</strong> ${participant.excursion === "1" ? "Yes" : "No"}<br>
        <strong>T-Shirt:</strong> ${participant.buy_tshirt === "1" ? `Yes (Size: ${participant.tshirt_size})` : "No"}<br>
        <strong>Comments:</strong> ${participant.comments || "No comments provided."}<br><br>

        <h3 style="margin-bottom:5px;">Payment Details</h3>
        <strong>Registration Type:</strong> ${participant.registration_type_id}<br>
        <strong>Payment Method:</strong> ${participant.payment_method_id}<br>
        <strong>Total Due:</strong> €${totalDue}<br>
        ${participant.payment_method_id === "1" ? `<strong>PayPal Fee:</strong> €${paypalFee}<br>` : ""}
        <strong>Total Amount Payable:</strong> €${totalDue + paypalFee}<br>
    `;
};

export const registrationEmailToWorkshopRep = (participant, workshop) => {

};
 
export const registrationEmailToTeam = (participant, workshops) => {
    const isOnline = participant.is_online === '1';
    return `
        Hey the IMC ${year} Team, <br><br>
        Good news: a new IMC ${isOnline ? 'ONLINE' : 'ON SITE'} Participant has just registered for IMC ${year}!<br>
        Below are the details of the registration: <hr>
    ` + registrationDetails(participant, workshops);
};

export const registrationEmailToParticipant = (participant, workshops, paymentMethods,  registrationTypes, password) => {

    const curParticipant = participant.participant;
    const curParticipantWorkshops = participant.workshops;
    const curParticipantAccomodation = participant.accommodation;
    const curParticipantArrival = participant.arrival;
    const curPariticipantOptions = participant.extra_options;
    const curPariticipantContributions = participant.contributions;
 

    const paymentInstructions = curParticipant.payment_method_id === "1"
        ? `<strong>${(parseFloat(curParticipant.total_due) + parseFloat(curParticipant.paypal_fee)).toFixed(2)}€</strong><br>
           Including ${parseFloat(curParticipant.paypal_fee).toFixed(2)}€ of Paypal fees.<br>`
        : curParticipant.payment_method_id === "2"
        ? `<strong>${parseFloat(curParticipant.total_due).toFixed(2)}€</strong><br>
           Bank transfers are usually free for EU and EEA countries. However, any costs are always at the participant's expense.<br>`
        : `<strong>${parseFloat(curParticipant.total_due).toFixed(2)}€</strong><br>
           Since you haven't selected a payment method, <strong>please contact the IMO Treasurer Marc Gyssens immediately</strong>.<br>`;

    const isOnline = curParticipant.is_online === '1';
    const version = isOnline ? 'ON SITE version' : 'ONLINE version';

    return `
        Dear ${curParticipant.title} ${curParticipant.first_name} ${curParticipant.last_name},<br><br>

        <strong>Congratulations! You have successfully registered for the ${version} of the ${year} International Meteor Conference!</strong><br>
        Your registration is nearly complete — only one step remains: submitting the required payment of 

        ${paymentInstructions}

        ${curParticipant.payment_method_id === "1" ? (
            `If you have paid immediately after submitting your registration, you can find the necessary payment instructions <a href="https://${year}.imo.net/register/payment">on our website</a><br>`
        ) : (
            ` The necessary payment instructions can be found <a href="https://${year}.imo.net/register/payment">on our website</a>.<br>`
        )}
        
        The registration fee must be sent to the IMO Treasurer <strong>IMMEDIATELY</strong>. Failure to make payment will result in the <strong>cancellation of your registration</strong>.<br><br>

        You can update some of your registration details using the password below on our <a href="https://${year}.imo.net/login">login page</a>:<br>
        <strong>${password}</strong><br><br>

        We look forward to meeting you at the conference!<br>
        <strong>The IMC ${year} Team</strong><br><br>

        Below are the details you provided during registration. If you notice any discrepancies, please contact us immediately.<br><hr>

        ${registrationDetails(participant, workshops, isOnline)}
    `; 
};



