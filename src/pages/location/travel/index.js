import PageContain from "components/page-contain";
import React from "react";
import GoogleMap from "components/g-map";
import { Link } from 'react-router-dom';


const Travel = () => {
  return (
    <PageContain title="Travel Information">
      <div className="ps-md-3 mb-5">

        <h3>How to reach Barcelonnette</h3>
        <p>Barcelonnette is located in the Ubaye Valley, in the Alpes-de-Haute-Provence, in southeastern France. As there is no railway station in Barcelonnette itself, most public-transport journeys finish with a bus, taxi, or rental car from Gap or Marseille.</p>

        <div className="alert alert-success fw-bolder">
          In the context of climate change and the necessity to reduce fossil-fuel use, we strongly encourage participants to choose lower-carbon travel options whenever possible. Please consider travelling by train and/or carpooling with other participants, especially for the final part of the journey to Barcelonnette.
        </div>


        <p>The address of the LOC venue is:</p>
        <p><strong>Pôle d'accueil universitaire Séolane</strong><br />
          Quartier du 11è BCA, Chemin des Casernes<br />
          04400 Barcelonnette<br />
          France
          <br /><br />
          44.3900, 6.6423  /  44°23'24"N, 6°38'32"E
        </p>
 

        <h4>By plane</h4>
        <p>The most convenient airport is usually <a href="https://www.marseille-airport.com/" target="_blank" rel="noopener noreferrer">Marseille Provence Airport (MRS)</a>. From there, you can either rent a car and drive to Barcelonnette, or continue by public transport via Marseille Saint-Charles and the regional ZOU! bus network.</p>

        Possible airport options:
        <ul>
          <li><a href="https://www.marseille-airport.com/" target="_blank" rel="noopener noreferrer">Marseille Provence Airport (MRS)</a>: the most practical airport for reaching Barcelonnette. By car, the journey takes about 3 hours (~230 km) via the A51 motorway (toll highway).
          </li>
          <li><a href="https://www.lyonaeroports.com/" target="_blank" rel="noopener noreferrer">Lyon Saint-Exupéry Airport (LYS)</a>: convenient for many international flights. From the airport's TGV station, or after transferring to Lyon Part-Dieu station, you can take a regional train to Gap, then continue by bus, taxi, or rental car.
          </li>
          <li>Paris airports (<a href="https://www.parisaeroport.fr/en/passengers/charles-de-gaulle-airport" target="_blank" rel="noopener noreferrer">CDG</a> / <a href="https://www.parisaeroport.fr/en/passengers/orly-airport" target="_blank" rel="noopener noreferrer">ORY</a>): useful for long-haul international flights. From CDG or Orly, go to Paris <a href="https://www.garesetconnexions.sncf/en/stations-services/paris-gare-lyon" target="_blank" rel="noopener noreferrer">Gare de Lyon</a> and take a train to Gap, then continue by bus, taxi, or rental car.
          </li>
          <li>From <a href="https://www.marseille-airport.com/" target="_blank" rel="noopener noreferrer">Marseille Provence Airport</a>, regular <a href="https://www.marseille-airport.com/access-car-parks/access/bus/marseille-st-charles-station" target="_blank" rel="noopener noreferrer">airport shuttles</a> connect the airport to Marseille Saint-Charles station in about 25-50 minutes depending on traffic.
          </li>
          <li>
            From Marseille Saint-Charles, take <a href="https://zou.maregionsud.fr/en/" target="_blank" rel="noopener noreferrer">ZOU!</a> Express line 68 toward Digne-les-Bains / Barcelonnette. Some connections may instead require line 69 to Gap, followed by line 535 to Barcelonnette. The journey takes between 5 and 6 hours and costs around €25 (as of June 2026).
          </li>
        </ul>


        <h4>By train</h4>
        <p>The nearest practical railway station is Gap Gare SNCF. From Gap, Barcelonnette can be reached by bus line 535 (around 1 hour 30 minutes — although we do not yet know if this option will still be available in September), taxi, or rental car.</p>

        <p><b>Important:</b> the earlier you buy your train tickets, the cheaper they usually are.</p>

        <p><a href="https://www.sncf-connect.com/en-en" target="_blank" rel="noopener noreferrer">Suggested train routes:</a></p>
        <ul>
          <li>From Paris: take a daytime train from Paris Gare de Lyon, usually with a connection in Valence-Ville or Grenoble. Duration: between 5h40 and 8h30. Prices from around €60.</li>
          <li>From Marseille: take a regional TER train from Marseille Saint-Charles to Gap Gare SNCF. Duration: between 3h15 and 5h50. Prices from around €34.</li>
          <li>From Lyon: take a regional train from Lyon Part-Dieu to Gap Gare SNCF, usually with a connection in Grenoble or Valence. Duration: between 4h30 and 5h45. Prices vary; check <a href="https://www.sncf-connect.com/en-en" target="_blank" rel="noopener noreferrer">SNCF Connect</a> for the latest prices.</li>
          <li>The bus journey on line 535 from Gap Gare SNCF to Barcelonnette takes around 1 hour 25 minutes. The bus leaves from Gap Gare SNCF / Quai 3 and arrives at Place Aimé Gassier in Barcelonnette, about a 20-minute walk from the conference venue.</li>
        </ul>


        <h4>By car</h4>
        <p>Approximate driving times to Barcelonnette:</p>
        <ul>
          <li><a href="https://www.google.fr/maps/dir/Marseille+Provence+Airport,+rd+20,+13700+Marignane/Barcelonnette,+04400/@43.9674956,5.2732107,207722m/data=!3m1!1e3!4m14!4m13!1m5!1m1!1s0x12c9e5fde9ee1837:0xe273ff8b8f69ff2e!2m2!1d5.2144565!2d43.4383502!1m5!1m1!1s0x12cc91992a2e9357:0xbcf809d3270f6cbe!2m2!1d6.6503651!2d44.3857245!3e0?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">From Marseille</a>: about 3 hours / 210 km</li>
          <li><a href="https://www.google.fr/maps/dir/Lyon+Arpt,+A%C3%A9roport+Lyon+Saint-Exup%C3%A9ry,+69125+Colombier-Saugnieu/Barcelonnette,+04400/@45.0532433,5.1879125,203888m/data=!3m2!1e3!4b1!4m14!4m13!1m5!1m1!1s0x47f4c92b009f84cd:0x86dc510cc9b255f0!2m2!1d5.0887768!2d45.7234181!1m5!1m1!1s0x12cc91992a2e9357:0xbcf809d3270f6cbe!2m2!1d6.6503651!2d44.3857245!3e0?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">From Lyon</a>: about 4 hours / 280 km</li>
          <li><a href="https://www.google.fr/maps/dir/A%C3%A9roport+de+Paris-Charles+de+Gaulle,+95700+Roissy-en-France/Barcelonnette,+04400/@46.6731437,1.6063124,792127m/data=!3m2!1e3!4b1!4m14!4m13!1m5!1m1!1s0x47e63e038e4ccf5b:0x42be0982f5ba62c!2m2!1d2.5507855!2d49.0078827!1m5!1m1!1s0x12cc91992a2e9357:0xbcf809d3270f6cbe!2m2!1d6.6503651!2d44.3857245!3e0?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">From Paris</a>: about 8 hours / 740 km</li>
          <li><a href="https://www.google.fr/maps/dir/Gap,+05000/Barcelonnette,+04400/@44.4735538,6.1900986,51486m/data=!3m2!1e3!4b1!4m14!4m13!1m5!1m1!1s0x12cb3f78d8a213d5:0x40819a5fd97a760!2m2!1d6.079758!2d44.559638!1m5!1m1!1s0x12cc91992a2e9357:0xbcf809d3270f6cbe!2m2!1d6.6503651!2d44.3857245!3e0?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">From Gap</a>: about 1 hour 15 minutes / 72 km</li>
        </ul>
        <p>Routes from Marseille, Lyon, and Paris include toll motorways. From Gap, the route is by mountain road.</p>
        <p>From the south, the usual route is via Aix-en-Provence, then the A51 toll motorway north toward Tallard/Gap, followed by the D900 into the Ubaye Valley toward Barcelonnette.</p>





        <h4 className="mt-4">Parking</h4>
        <div className="ps-md-3">
          <p>You can park for free in front of the venue. </p>
        </div>


        <GoogleMap />

        <p>
          If you require assistance with travel planning, the Local Organising Committee (LOC) will be happy to help. Please contact us via the {' '}
          <Link
            aria-label="Contact"
            className="fw-bolder"
            to="/contact"
            title="Contact"
          >
            contact page
          </Link>.
        </p>
      </div>

    </PageContain >
  );
};



export default Travel;