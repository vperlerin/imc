import PageContain from "components/page-contain";
import React from "react";
import GoogleMap from "components/g-map";
import { Link } from 'react-router-dom';


const Travel = () => {
  return (
    <PageContain title="Travel Information">
      <h3>How to travel to Barcelonnette</h3>
      <div className="ps-md-3 md-5">
        <p>
          The location of IMC 2026 will be the town of Barcelonnette, situated in the Ubaye Valley in the department of Alpes-de-Haute-Provence, southeastern France.
          Barcelonnette is a beautiful mountain town — but it is relatively remote and requires some planning to reach.
        </p>
      </div>

      <h4 className="mt-4">By Airplane</h4>
      <div className="ps-md-3">
        <p className="mb-0">The most convenient airports are:</p>
        <ul>
          <li><strong>Marseille Provence Airport (MRS)</strong></li>
          <li><strong>Nice Côte d’Azur Airport (NCE)</strong></li>
        </ul>

        <p>
          From <strong>Marseille Airport</strong>, the drive to Barcelonnette takes approximately <strong>2h30 to 3h</strong> (around 160 km).
            <br/>
          From <strong>Nice Airport</strong>, the drive takes approximately <strong>3h30 to 4h</strong> depending on traffic and mountain road conditions.
          <br/>
          Car rental is strongly recommended from either airport, as public transport connections to Barcelonnette are limited and time-consuming.
        </p>
      </div>

      <h4 className="mt-4">By Train</h4>
      <div className="ps-md-3">
        <p className="mb-0">
          There is no train station in Barcelonnette. The closest main railway stations are:
        </p>

        <ul>
          <li><strong>Aix-en-Provence TGV</strong></li>
          <li><strong>Marseille Saint-Charles</strong></li>
          <li><strong>Gap</strong> (regional trains)</li>
        </ul>

        <p>
          From Paris, a TGV train to Aix-en-Provence TGV takes about <strong>3 hours</strong>. From there, the onward journey by bus to Barcelonnette takes approximately <strong>3h30 to 4h</strong>.
          <br/>
          Alternatively, you may travel via <strong>Gap</strong>. From Gap, Barcelonnette is about <strong>1h30 by car</strong> or regional bus.
          <br/>
          Overall travel time from Paris to Barcelonnette by train and bus is typically <strong>6h30 to 8h</strong>, depending on connections.
        </p>
      </div>

      <h4 className="mt-4">By Car</h4>
      <div className="ps-md-3">
        <p className="mb-0">
          Driving is often the most practical option.
        </p>

        <ul>
          <li>From Marseille / Aix-en-Provence: approximately <strong>2h30-3h</strong></li>
          <li>From Grenoble: approximately <strong>2h30-3h</strong></li>
          <li>From Nice: approximately <strong>3h30-4h</strong></li>
          <li>From Gap: approximately <strong>1h30</strong></li>
        </ul>

        <p>
          Please note that access roads are mountain roads (mainly the D900). Travel times may vary depending on traffic and weather conditions. Outside the summer season, certain mountain passes near the Italian border may be subject to restrictions.
        </p>
      </div>

      <h4 className="mt-4">Parking</h4>
      <div className="ps-md-3">
        <p>???</p>
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
 
    </PageContain>
  );
};



export default Travel;