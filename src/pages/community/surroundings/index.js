import sur1 from 'assets/img/illus/surroundings/sur1.jpg';
import sur2 from 'assets/img/illus/surroundings/sur2.jpg';
import sur3 from 'assets/img/illus/surroundings/sur3.jpg';
import sur4 from 'assets/img/illus/surroundings/sur4.jpg';

import classNames from 'classnames';
import css from './index.module.scss';
import PageContain from "components/page-contain";
import React from "react";

const Surroundings = () => {
  return (
    <PageContain title="Sights & Surroundings">  
      <p>
        <b>
         Do you want to stretch your legs or simply enjoy some downtime from the programme? The immediate surroundings of Barcelonnette offer a spectacular alpine environment with a wealth of natural and cultural sights.
        </b>
      </p>

      <p>Just a few minutes' walk from the conference venue, you will find yourself immersed in the <a href="https://en.wikipedia.org/wiki/Ubaye_Valley" className="fw-bolder" target="_bkank">Ubaye Valley</a>, renowned for its unspoiled mountain landscapes. Meadows, larch forests, and the Ubaye River itself provide an ideal setting for a short walk or a longer hike, with impressive views of the surrounding peaks of the southern Alps.</p>

      <p>A pleasant stroll through <a href="https://www.ubaye.com/en/discover/barcelonnette/" className="fw-bolder" target="_blank">Barcelonnette</a> brings you to its historic centre, characterized by colorful façades and elegant villas built by locals who made their fortunes in Mexico during the 19th century. This unique architectural heritage gives the town a distinctive character, blending alpine traditions with unexpected transatlantic influences.</p>

      <p>Within a short distance from Barcelonnette lies the impressive <a href="https://en.wikipedia.org/wiki/Fort_de_Tournoux" className="fw-bolder" target="_blank">Fort de Tournoux</a>, perched high above the Ubaye Valley. Often referred to as the “Versailles of military fortresses,” this 19th-century defensive complex offers striking views and a fascinating insight into Alpine military history.</p>

     <p>For nature lovers, the nearby <a href="https://en.wikipedia.org/wiki/Mercantour_National_Park" target="_blank" className="fw-bolder">Mercantour National Park</a> provides endless opportunities for exploration. Easily accessible from Barcelonnette, the park is home to remarkable biodiversity, dramatic mountain scenery, and well-marked trails suitable for walking or cycling, with or without a guide. Whether you seek a gentle outing or a more adventurous excursion, the Ubaye region offers a refreshing alpine escape just outside the conference programme.</p>


      <div className={classNames('d-flex gap-3 mt-4', css.gallery)}>
        <img src={sur1} className=' rounded-2' />
        <img src={sur2} className=' rounded-2' />
        <img src={sur3} className=' rounded-2' />
        <img src={sur4} className=' rounded-2' />
      </div>


    </PageContain>
  );
};

export default Surroundings;
