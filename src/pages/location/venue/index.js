import classNames from 'classnames';
import css from './index.module.scss';
import PageContain from "components/page-contain";
import React from "react";
import { Link } from 'react-router-dom';
import GoogleMap from "components/g-map";

// Import images statically
import ven1 from 'assets/img/illus/venue/ven1.jpg';
import ven2 from 'assets/img/illus/venue/ven2.jpg';
import ven3 from 'assets/img/illus/venue/ven3.jpg';
import ven4 from 'assets/img/illus/venue/ven4.jpg';

// Store images in an array for dynamic access
const images = [ven1, ven2, ven3, ven4];

const Venue = () => {
  return (
    <PageContain title="Location Venue">
      <div
        className="mt-3 mb-4 d-flex flex-column flex-md-row-reverse gap-3 align-items-stretch flex-md-row"
      >
        <div>
        <p>
          The International Meteor Conference 2026 will take place at Séolane, a university and scientific hosting center located in Barcelonnette, in the heart of the Ubaye Valley in the French Alps. Séolane is designed for scientific schools, conferences, seminars, and residential events, making it a particularly fitting setting for IMC 2026.

          The center combines accommodation, catering, conference spaces, and work rooms in one place, which will allow participants to stay, meet, and attend the conference in a single venue. Séolane can host up to 70 people in residence and around 100 people for conferences and working sessions.
        </p>
 
        More rooms can be found of course at nearby hotels (see also
        {' '}
        <Link
          aria-label="Extra accodommation"
          className="fw-bolder"
          to="/location/extra"
          title="Extra accodommation"
        >
          Extra accommodation
        </Link>
        ).
        </div>
        <div
          className={classNames(css.illusBg, 'rounded-2')}
          style={{ backgroundImage: `url(${images[0]})` }}
        />

      </div>

      <p>
          <b>Barcelonnette is located at an altitude of 1,100 m. Although it lies in Provence, nights can be chilly even in September, so participants are encouraged to bring warm clothing!</b>
        </p>

      <div
        className="mt-3 mb-4 d-flex flex-column gap-3 align-items-stretch flex-md-row"
      >
        <div>
          <h2>Accommodation and catering</h2>
          <p>
            Séolane has a dedicated accommodation building with 31 rooms, all equipped with private bathrooms and toilets. The rooms are arranged as single, double, and triple rooms, including accessible rooms for people with reduced mobility.

            Catering is also available on site. The restaurant room can welcome up to 80 people, and the venue offers an integrated residential setup that is especially convenient for a multi-day conference. Wi-Fi is available throughout the buildings.

          </p>
        </div>
        <div
          className={classNames(css.illusBg, 'rounded-2')}
          style={{ backgroundImage: `url(${images[1]})` }}
        />

      </div>

      <div
        className="mt-3 mb-4 d-flex flex-column flex-md-row-reverse gap-3 align-items-stretch flex-md-row"
      >
        <div>
          <h2>Conference and working facilities</h2>
          <p>
            Séolane offers facilities well suited to a scientific meeting such as IMC. These include a 100-seat conference room, three meeting rooms, a lounge/bar area suitable for informal exchanges or poster-style sessions, and two laboratory rooms equipped with scientific benches. The venue also provides the usual seminar equipment such as whiteboards, paperboards, digital projectors, screens, badges, and sound equipment.
          </p>
          <p>
            An additional point of interest for IMC participants is that Séolane is part of the FRIPON meteor observation network, with a fish-eye meteor camera installed on the central building.
          </p>
        </div>
        <div
          className={classNames(css.illusBg, 'rounded-2')}
          style={{ backgroundImage: `url(${images[2]})` }}
        />
      </div>


      <div
        className="mt-3 mb-4 d-flex flex-column  gap-3 align-items-stretch flex-md-row"
      >
        <div>
          <h2>Setting</h2>
          <p>
            Séolane is located at Pôle d’accueil universitaire Séolane, Quartier du 11ème BCA, Chemin des casernes, 04400 Barcelonnette, France.

          </p>
          <p>
            Barcelonnette lies in the Ubaye Valley, a mountain region known for both its scientific interest and its outdoor environment. The valley offers a rich Alpine setting, with opportunities for hiking and other nature activities in summer, while the town itself provides a pleasant small-mountain atmosphere for a conference stay.
            {' '}
            <Link
              aria-label="Travel information"
              className="fw-bolder"
              to="/location/travel"
              title="Travel information"
            >
              Travel information
            </Link>
          </p>
        </div>
        <div
          className={classNames(css.illusBg, 'rounded-2')}
          style={{ backgroundImage: `url(${images[3]})` }}
        />
      </div>



      {/*flex-md-row-reverse
        <p>
          The IMC 2026 will take place in the cozy and spacious <a className="fw-bolder" href="https://www.stayokay.com/en/hostel/soest" target="_blank" rel="noopener noreferrer">Stayokay Soest</a> venue that combines the architecture of a historical school building with modern facilities, creating a vibrant conference atmosphere in a green and forested area. Nature-minded delegates will be able to absorb the sandy expanse of the nearby stunning Soesterduinen inland dune complex. The venue accommodates meeting rooms for plenary sessions with smaller rooms for ad hoc meetings, poster sessions or other activities. It will be available entirely for the conference and offers everything for a comfortable stay. From rooms with private bathrooms, a breakfast and dinner, to a nice terrace with a campfire. The venue is also a sustainable choice thanks to its sustainable solutions to facilitate our conference. Check out the <a className="fw-bolder" href="https://vimeo.com/175690257" target="_blank" rel="noopener noreferrer">venue's video</a> for an impression.   </p>
          
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
              className="fw-bolder"
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
          <p>The main entrance of the venue is via the historic school building, which houses the restaurant, bar and working rooms for IMC organisers. The building connects to the inner courtyard and gives access to several terraces around the building. From the inner courtyard you can access the various conference rooms and the sleeping accommodations in two detached buildings that were constructed more recently. Several conference rooms are available during IMC 2026; the main room can house up to 140 attendees, while two smaller rooms are available for convening poster sessions and workshops.</p>
        </div>
        <div
          className={classNames(css.illusBg, 'rounded-2')}
          style={{ backgroundImage: `url(${images[2]})` }}
        />

      </div>

       <GoogleMap/>
       */}

    </PageContain>
  );
};

export default Venue;
