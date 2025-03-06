const year = process.env.REACT_APP_YEAR || "2025";

const registrationDetails = (
    curParticipant,
    curParticipantAccomodation,
    curParticipantWorkshops,
    curParticipantContributions,
    curParticipantOptions,
    curParticipantArrival,
    workshops,
    paymentMethods,
    registrationTypes
) => {  
    const totalDue = parseFloat(curParticipant.total_due) || 0;
    const paypalFee = curParticipant.payment_method_id === "1" ? (parseFloat(curParticipant.paypal_fee) || 0) : 0;
 
    return `
        <h3 style="margin-bottom:5px;">Personal Details</h3>
        <strong>Name:</strong> ${curParticipant.title} ${curParticipant.first_name} ${curParticipant.last_name}<br>
        <strong>Email:</strong> ${curParticipant.email}<br>
        <strong>Phone:</strong> ${curParticipant.phone}<br>
        <strong>Address:</strong> ${curParticipant.address}, ${curParticipant.postal_code} ${curParticipant.city}, ${curParticipant.country}<br>
        ${curParticipant.organization ? `<strong>Organization:</strong> ${curParticipant.organization}<br>` : ""}
        <strong>Date of Birth:</strong> ${curParticipant.dob}<br> 

        <h3 style="margin-bottom:5px;">Arrival & Departure</h3>
        <strong>Locamotion:</strong>  by ${curParticipantArrival.travelling}
        <strong>Arrival:</strong> ${curParticipantArrival.arrival_date} at ${curParticipantArrival.arrival_hour}:${curParticipantArrival.arrival_minute}<br>
        <strong>Departure:</strong> ${curParticipantArrival.departure_date} at ${curParticipantArrival.departure_hour}:${curParticipantArrival.departure_minute}<br>
        ${curParticipantArrival.travelling_details ? `<strong>Details:</strong> ${curParticipantArrival.travelling_details}<br>` : ""} 

        <h3 style="margin-bottom:5px;">Workshops</h3>
        ${curParticipantWorkshops.length > 0 ? `
            <ul style="margin-top:0; padding-left:15px;">
                ${curParticipantWorkshops.map(workshop => `
                    <li>
                        <strong>${workshop.title}</strong> on ${workshop.date} (${workshop.period})<br>
                        Responsible: ${workshop.responsible_name}</a>)
                    </li>
                `).join("")}
            </ul>
        ` : "No workshops selected.<br>"} 


        <h3 style="margin-bottom:5px;">Contributions</h3>
        ${curParticipantContributions.length > 0 ? `
            <h4 style="margin-bottom:5px;">Talks</h4>
            ${curParticipantContributions.filter(c => c.type === "talk").length > 0 ? `
                <ul style="margin-top:0; padding-left:15px;">
                    ${curParticipantContributions.filter(c => c.type === "talk").map(talk => `
                        <li><strong>${talk.title}</strong> by ${talk.authors} (${talk.duration})<br>${talk.abstract}<br>Session: ${talk.session_name}</li>
                    `).join("")}
                </ul>
            ` : "No talks submitted."}
            
           <h4 style="margin-bottom:5px;">Posters</h4>
            ${curParticipantContributions.filter(c => c.type === "poster").length > 0 ? `
                <ul style="margin-top:0; padding-left:15px;">
                    ${curParticipantContributions.filter(c => c.type === "poster").map(poster => `
                        <li>
                            <strong>${poster.title}</strong> by ${poster.authors}<br>
                            ${poster.abstract}<br>
                            ${poster.print === "1" ? "<strong>The poster will be printed on site by the LOC.</strong><br>" : ""}
                        </li>
                    `).join("")}
                </ul>
            ` : "No posters submitted."}

        ` : "No contributions."} 

        <h3 style="margin-bottom:5px;">Additional Information</h3>
        <strong>Excursion:</strong> ${curParticipantOptions.excursion === "1" ? "Yes" : "No"}<br>
        <strong>T-Shirt:</strong> ${curParticipantOptions.buy_tshirt === "1" ? `Yes (Size: ${curParticipantOptions.tshirt_size})` : "No"}<br>
        <strong>Comments:</strong> ${curParticipantOptions.comments || "No comments provided."}<br><br>

        <h3 style="margin-bottom:5px;">Payment Details</h3>
        <strong>Accommodation Type:</strong> ${curParticipantAccomodation.registration_type === 'no' ? 'No Accommodation' : `${curParticipantAccomodation.registration_type} room`}<br>
       <strong>Payment Method:</strong>  
        ${paymentMethods.find(method => method.id === curParticipant.payment_method_id)?.method || "Unknown"}<br>

        <strong>Total Due:</strong> 
        ${curParticipant.payment_method_id === "1"
                    ? (parseFloat(totalDue) + parseFloat(paypalFee)).toFixed(2)
                    : totalDue.toFixed(2)}€<br>

        ${curParticipant.payment_method_id === "1" ? `including ${paypalFee.toFixed(2)}€ of PayPal fees<br>` : ""} 
    `;
};


export const registrationEmailToWorkshopRep = (participant, workshop) => {

};

export const registrationEmailToTeam = (participant, workshops, paymentMethods, registrationTypes) => {

    const {
        participant: curParticipant,
        workshops: curParticipantWorkshops,
        accommodation: curParticipantAccomodation,
        arrival: curParticipantArrival,
        extra_options: curPariticipantOptions,
        contributions: curPariticipantContributions
    } = participant;


    const isOnline = curParticipant.is_online === '1';
    return `
        Hey the IMC ${year} Team, <br><br>
        Good news: a new Participant has just registered for <strong>${isOnline ? 'ONLINE' : 'ON SITE'}</strong> IMC ${year}!<br><br>

        Here is a summary of the registration:<br>
        ${participantIntro(curParticipant, curParticipantAccomodation, curParticipantWorkshops, curPariticipantContributions, curPariticipantOptions)}
        <br>
        Below are the details of the registration: <hr>
    ` + registrationDetails(curParticipant, curParticipantAccomodation, curParticipantWorkshops, curPariticipantContributions, curPariticipantOptions, curParticipantArrival, workshops, paymentMethods, registrationTypes);
};

export const registrationEmailToParticipant = (participant, workshops, paymentMethods, registrationTypes, password) => {

    const {
        participant: curParticipant,
        workshops: curParticipantWorkshops,
        accommodation: curParticipantAccomodation,
        arrival: curParticipantArrival,
        extra_options: curPariticipantOptions,
        contributions: curPariticipantContributions
    } = participant;

    const paymentInstructions = curParticipant.payment_method_id === "1"
        ? `<strong>${(parseFloat(curParticipant.total_due) + parseFloat(curParticipant.paypal_fee)).toFixed(2)}€</strong> 
        (including ${parseFloat(curParticipant.paypal_fee).toFixed(2)}€ of Paypal fees).<br>`
        : curParticipant.payment_method_id === "2"
            ? `<strong>${parseFloat(curParticipant.total_due).toFixed(2)}€</strong><br>
           Bank transfers are usually free for EU and EEA countries. However, any costs are always at the participant's expense.<br>`
            : `<strong>${parseFloat(curParticipant.total_due).toFixed(2)}€</strong><br>
           Since you haven't selected a payment method, <strong>please contact the IMO Treasurer Marc Gyssens immediately</strong>.<br>`;

    const isOnline = curParticipant.is_online === '1';
    const version = isOnline ? 'ONLINE version' : 'ON SITE version';

    return `
        Dear ${curParticipant.title} ${curParticipant.first_name} ${curParticipant.last_name},<br><br>

        <strong>Congratulations! You have successfully registered for the ${version} of the ${year} International Meteor Conference!</strong><br><br>
        Your registration is nearly complete — only one step remains: submitting the required payment of 

        ${paymentInstructions} 

        ${curParticipant.payment_method_id === "1" ? (
            `If you have not paid immediately after submitting your registration, you can find the necessary payment instructions <a href="https://${year}.imo.net/register/payment">on our website</a>.<br>`
        ) : (
            ` The necessary payment instructions can be found <a href="https://${year}.imo.net/register/payment">on our website</a>.<br>`
        )}
        
        The registration fee must be sent to the IMO Treasurer <strong>IMMEDIATELY</strong>. Failure to make payment will result in the <strong>cancellation of your registration</strong>.<br><br>

        You can update some of your registration details using the password below on our <a href="https://${year}.imo.net/login">login page</a>:<br>
        <strong>${password}</strong><br><br>

        We look forward to meeting you at the conference!<br><br>
        <strong>The IMC ${year} Team</strong><br>---------<br><br>

        Below are the details you provided during registration. If you notice any discrepancies, please contact us immediately.<br>

        <h3 style="margin-bottom:5px;">Summary</h3>
        ${participantIntro(
            curParticipant, curParticipantAccomodation, curParticipantWorkshops, curPariticipantContributions, curPariticipantOptions, true
        )}
        <hr>
        ${registrationDetails(curParticipant, curParticipantAccomodation, curParticipantWorkshops, curPariticipantContributions, curPariticipantOptions, curParticipantArrival, workshops, paymentMethods, registrationTypes)}
    `;
};


const participantIntro = (curParticipant, curParticipantAccomodation, curParticipantWorkshops, curParticipantContributions, curParticipantOptions, you = false) => {
    const _pronoun = you ? 'you' : (curParticipant.gender === "Female" ? 'she' : 'he');
    const _pronoun2 = you ? 'yourself' : (curParticipant.gender === "Female" ? 'herself' : 'himself');

    const _accomodation1 = curParticipantAccomodation.registration_type === 'no' ? 'not to stay' : 'to stay';
    const _accomodation2 = curParticipantAccomodation.registration_type === 'no' ?
        `. So, ${_pronoun.charAt(0).toUpperCase() + _pronoun.slice(1)} will take care of ${_pronoun2} accommodation.` :
        ` in a <strong>${curParticipantAccomodation.registration_type} room</strong>.`;

    let _workshopDetails = '';

    if (curParticipantWorkshops.length === 0) {
        _workshopDetails = `${_pronoun.charAt(0).toUpperCase() + _pronoun.slice(1)} won't participate in any workshops.<br>`;
    } else {
        _workshopDetails = `${_pronoun.charAt(0).toUpperCase() + _pronoun.slice(1)} will participate in the following workshop${curParticipantWorkshops.length > 1 ? 's' : ''}:<br>`;
        curParticipantWorkshops.forEach(workshop => {
            _workshopDetails += `- <strong>${workshop.title}</strong> on ${workshop.date} (${workshop.period}).<br>`;
        });
    }

    let _contributionDetails = '';

    if (curParticipantContributions.length === 0) {
        _contributionDetails = `<br>${_pronoun.charAt(0).toUpperCase() + _pronoun.slice(1)} won't present anything during the conference.<br>`;
    } else {
        _contributionDetails = `<br>${_pronoun.charAt(0).toUpperCase() + _pronoun.slice(1)} will present:<br>`;
        curParticipantContributions.forEach(contribution => {
            _contributionDetails += `- ${contribution.type === "talk" ?
                `a talk titled <strong>"${contribution.title}"</strong>` :
                `a poster titled <strong>"${contribution.title}"</strong>`
                }`;

            if (contribution.type === "poster" && contribution.print === "1") {
                _contributionDetails += `, and ${_pronoun} would like this poster to be printed on-site by the LOC.`;
            }

            _contributionDetails += "<br>";
        });
    }

    let _extraDetails = '';

    if (curParticipantOptions.excursion === "1") {
        _extraDetails += `${_pronoun.charAt(0).toUpperCase() + _pronoun.slice(1)} will be part of the excursion.<br>`;
    } else {
        _extraDetails += `${_pronoun.charAt(0).toUpperCase() + _pronoun.slice(1)} won't be part of the excursion.<br>`;
    }

    if (curParticipantOptions.buy_tshirt === "1") {
        _extraDetails += `${_pronoun.charAt(0).toUpperCase() + _pronoun.slice(1)} would like a t-shirt (size: ${curParticipantOptions.tshirt_size}).<br>`;
    }

    const title = you ? 'You' : `${curParticipant.title} ${curParticipant.first_name} ${curParticipant.last_name}`;

    return `
        ${title} chose <strong>${_accomodation1}</strong> at the LOC${_accomodation2}<br><br>
        ${_workshopDetails} 
        ${_contributionDetails} 
        ${_extraDetails}
    `;
};

