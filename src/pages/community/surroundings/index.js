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

      <div className="mx-md-3">

        <p>
          <b>
            Do you want to stretch your legs or just want to enjoy some downtime from the programme? The immediate surrounding of Soest offers a unique natural environment with some notable sights.
          </b>
        </p>

        <p>At a few minutes walking distance from the venue you can enjoy a stretch of unspoiled nature: the <a href="https://www.stayokay.com/en/tips/striding-in-the-loose-sand" target="_blank" rel="noopener noreferrer">Soesterduinen</a> are one of the most beautiful inland dunes in the Netherlands. It was marked as a Geological Monument by the province of Utrecht in 1997 and is part of the <a href="https://en.wikipedia.org/wiki/Utrecht_Hill_Ridge" target="_blank" rel="noopener noreferrer">Utrecht Hill</a>, a push-morainic ridge from the Saalian ice age that stretches across the Utrecht province for some 50 kilometers.</p>

        <p>At a half hour's walk from the conference venue you can find the <a href="https://www.windhond.nl/en-gb" target="_blank" rel="noopener noreferrer">'Windhond' corn mill</a>, which has been rendered in the logo of the IMC 2025. Mills for centuries determined the Dutch landscape and nearly all the polders have been dried with the help of watermills. Industry was also dependent on wind-power, leveraging the wind with mills to saw timber and grind corn for people and animals. The windmill in Soest was rebuilt in 2008, but its history can be traced back to the fifteenth century.</p>

        <p>Situated at the northern outskirts of Soest, you can visit the <a href="https://www.stayokay.com/en/tips/original-orange-palace" target="_blank" rel="noopener noreferrer">Soestdijk Palace</a>: from hunting lodge to French barracks and from summer retreat to the permanent residence of the late Princess Juliana and late Prince Bernhard: Soestdijk Palace has a long and interesting history.</p>

        <p>The nearby Airbase Park Soesterberg on the Utrecht Ridge is an unusual <a href="https://www.stayokay.com/en/tips/roe-deer-and-radar" target="_blank" rel="noopener noreferrer">nature reserve</a>. After being an airbase for more than a century, the area was returned to nature in 2008. You can explore the former airbase on foot or by bicycle with or without a guide. The information centre for the nature reserve is situated in the <a href="https://www.stayokay.com/en/tips/dutch-fighting-forces" target="_blank" rel="noopener noreferrer">National Military Museum.</a></p>


        <div className={classNames('d-flex gap-3 mt-4', css.gallery)}>
          <img src={sur1} className=' rounded-2' />
          <img src={sur2} className=' rounded-2' />
          <img src={sur3} className=' rounded-2' />
          <img src={sur4} className=' rounded-2' />
        </div>

      </div>

    </PageContain>
  );
};

export default Surroundings;
