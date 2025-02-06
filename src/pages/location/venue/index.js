import classNames from 'classnames';
import css from './index.module.scss';
import PageContain from "components/page-contain";
import React from "react";
import { Link } from 'react-router-dom';

// Import images statically
import ven1 from 'assets/img/illus/venue/ven1.jpg';
import ven2 from 'assets/img/illus/venue/ven2.jpg';
import ven3 from 'assets/img/illus/venue/ven3.jpg';

// Store images in an array for dynamic access
const images = [ven1, ven2, ven3];

const Venue = () => {
  return (
    <PageContain title="Location Venue">
      <div
        className="mt-3 mb-4 d-flex flex-column gap-3 align-items-stretch flex-md-row-reverse"
      >

        <p>
          The IMC 2025 will take place in the cozy and spacious <a href="https://www.stayokay.com/en/hostel/soest" target="_blank" rel="noopener noreferrer">Stayokay Soest</a> venue that combines the architecture of a historical school building with modern facilities, creating a vibrant conference atmosphere in a green and forested area. Nature-minded delegates will be able to absorb the sandy expanse of the nearby stunning Soesterduinen inland dune complex. The venue accommodates meeting rooms for plenary sessions with smaller rooms for ad hoc meetings, poster sessions or other activities. It will be available entirely for the conference and offers everything for a comfortable stay. From rooms with private bathrooms, a breakfast and dinner, to a nice terrace with a campfire. The venue is also a sustainable choice thanks to its sustainable solutions to facilitate our conference. Check out the <a href="https://vimeo.com/175690257" target="_blank" rel="noopener noreferrer">venue's video</a> for an impression.   </p>
          
          <div
            className={classNames(css.illusBg, 'rounded-2')}
            style={{ backgroundImage: `url(${images[0]})` }}
          />
     
      </div>

      <div
        className="mt-3 mb-4 d-flex flex-column gap-3 align-items-stretch flex-md-row"
      >
        <div>
          <h2>Accommodation</h2>
          <p>
            The sleeping accommodation is situated in a separate building that can be accessed via the inner courtyard of the Stakokay venue. The hostel offers various 2, 4 and 6-person rooms with en-suite bathrooms. The available rooms will be used to offer single room options, double and quadruple room occupancy. A total of 106 persons can be accommodated on site. More single and double rooms can be found of course at nearby hotels (see also
            {' '}
            <Link
              aria-label="Extra accodommation"
              to="/location/extra"
              title="Extra accodommation"
            >
              Extra accommodation
            </Link>
            ).
          </p>
        </div>
        <div
          className={classNames(css.illusBg, 'rounded-2')}
          style={{ backgroundImage: `url(${images[1]})` }}
        />

      </div>



      <div
        className="mt-3 mb-4 d-flex flex-column gap-3 align-items-stretch flex-md-row-reverse"
      >
        <div>
          <h2>Venue and conference rooms</h2>
          <p>The main entrance of the venue is via the historic school building, which houses the restaurant, bar and working rooms for IMC organisers. The building connects to the inner courtyard and gives access to several terraces around the building. From the inner courtyard you can access the various conference rooms and the sleeping accommodations in two detached buildings that were constructed more recently. Several conference rooms are available during IMC 2025; the main room can house up to 140 attendees, while two smaller rooms are available for convening poster sessions and workshops.</p>
        </div>
        <div
          className={classNames(css.illusBg, 'rounded-2')}
          style={{ backgroundImage: `url(${images[2]})` }}
        />

      </div>

    </PageContain>
  );
};

export default Venue;
