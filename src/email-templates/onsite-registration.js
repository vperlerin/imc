import React from "react";

const year = process.env.REACT_APP_YEAR;
const payment_link = `https://imc{$year}.imo.net/payment`;

const RegistrationDetails = ({ participant, workshops }) => {
    return (
        <>
            <h3>Personal Details</h3>
            <p><strong>Name:</strong> {participant.title}{' '}{participant.first_name}{' '}{participant.last_name}</p>
            <p><strong>Email:</strong> {participant.email}</p>
            <p><strong>Phone:</strong> {participant.phone}</p>
            <p><strong>Address:</strong> {participant.address},{' '}{participant.postal_code}{' '}{participant.city},{' '}{participant.country}</p>
            {!!participant.organization && (
                <p><strong>Organization:</strong> {participant.organization}</p>
            )}
            <p><strong>Date of Birth:</strong> {participant.dobDay}/{participant.dobMonth}/{participant.dobYear}</p>

            <h3>Arrival & Departure</h3>
            <p><strong>Arrival:</strong> {participant.arrival_date}{' '}at{' '}{participant.arrival_hour}:{participant.arrival_minute}{' '}by{' '}{participant.travelling}</p>
            <p><strong>Departure:</strong> {participant.departure_date} at {participant.departure_hour}:{participant.departure_minute}</p>
            {!!participant.travelling_details && (
                <p><strong>Details:</strong> {participant.travelling_details}</p>
            )}
 
            <h3>Workshops</h3>
            {participant.workshops.length > 0 ? (
                <ul>
                    {participant.workshops.map((workshop, index) => (
                        <li key={index}>Workshop ID: {workshop}</li>
                    ))}
                </ul>
            ) : (<p>No workshops selected.</p>)}
 

            <h3>Contributions</h3>
            {participant.wantsToContribute === "yes" ? (
                <>
                    <h4>Talks</h4>
                    {participant.talks.length > 0 ? (
                        <ul>
                            {participant.talks.map((talk, index) => (
                                <li key={index}><strong>{talk.title}</strong> by {talk.authors} ({talk.duration})<br />{talk.abstract}</li>
                            ))}
                        </ul>
                    ) : (<p>No talks submitted.</p>)}

                    <h4>Posters</h4>
                    {participant.posters.length > 0 ? (
                        <ul>
                            {participant.posters.map((poster, index) => (
                                <li key={index}><strong>{poster.title}</strong> by {poster.authors}<br />{poster.abstract}</li>
                            ))}
                        </ul>
                    ) : (<p>No posters submitted.</p>)}
                </>
            ) : (
                <p>No contribution</p>
            )}

            <h3>Additional Information</h3>
            <p><strong>Excursion:</strong> {participant.excursion === "1" ? "Yes" : "No"}</p>
            <p><strong>T-Shirt:</strong> {participant.buy_tshirt === "1" ? `Yes (Size: ${participant.tshirt_size})` : "No"}</p>
            <p><strong>Comments:</strong> {participant.comments || "No comments provided."}</p>

            <h3>Payment Details</h3>
            <p><strong>Registration Type:</strong> {participant.registration_type_id}</p>
            <p><strong>Payment Method:</strong> {participant.payment_method_id}</p>
            <p><strong>Total Due:</strong> €{participant.total_due}</p>
            {participant.payment_method_id === "1" && (
                <p><strong>PayPal Fee:</strong> €{participant.paypal_fee}</p>
            )}
            <p><strong>Total Amount Payable:</strong> €{parseFloat(participant.total_due) + (participant.payment_method_id === "1" ? parseFloat(participant.paypal_fee) : 0)}</p>
 
        </>
    );
};

export default RegistrationDetails;
