import PageContain from "components/page-contain";
import React from "react";

const Extra = () => {
  return (
    <PageContain title="Extra Accommodations">
      <div className="mx-md-3">
        <p>If for whatever reason you cannot or do not wish to use the accommodation offered by the conference, you are welcome to arrange your own accommodation. In that case, check the "no accommodation" option on the registration form. Then, the registration fee will not include accommodation. </p>

        <p>There are various accommodation facilities in the surrounding area, and in the cities Utrecht and Amersfoort. Here are just some of the closest ones, including directions to the conference venue. Price indications are best obtained via the respective websites or via Booking.com. </p>

        <ul>
          <li className="mb-3">
            <a className="d-block" href="https://www.fletcherhotelhetwittehuis.nl/en/" target="_blank" rel="noopener noreferrer">Fletcher Hotel-Restaurant Het Witte Huis</a>
            Distance to conference venue 9 min by car, 15 min by bike
          </li>
          <li>
            <a className="d-block" href="https://www.hilton.com/nl/hotels/splsodi-doubletree-royal-parc-soestduinen/" target="_blank" rel="noopener noreferrer"> DoubleTree by Hilton Royal Parc Soestduinen</a>
            Distance to conference venue 8 min by car, 14 min by bike
          </li>
        </ul>
      </div>
    </PageContain>
  );
};

export default Extra;
