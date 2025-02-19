import PageContain from "components/page-contain";
import React from "react";

const Workshops = () => {
  return (
    <PageContain title="Workshops">
      <p>In case participants wish to stay at the Stayokay hostel before the start of the IMC, they should book a room themselves at the hostel.</p>
      <h3>Spectroscopy workshop</h3>
      <p>
        This year, ahead of the IMC there will be a half-day workshop on spectroscopy. The idea was born based on the fact that the amount of work done on spectroscopy is increasing, but for many a relatively new field. In this workshop, we will focus on the basics of spectroscopy and will focus on two main goals:
      </p>
      <ol>
        <li>
          Learn how to build a spectrograph and doing a spectral measurement yourself, (e.g. by making a picture via a camera with a grating);
        </li>
        <li>
          Having a deeper look at the results and interpretation of a meteor spectrum. You will learn what you can derive from it.
        </li>
      </ol>

      <p>The workshop will have a practical part (making a spectrum, analysing) and a little bit of deeper insight in theory and its challenges. At the end we will devote some time for discussion and exchanging experience.</p>

      <p> The workshop is aimed at non-specialists in the spectral field (amateurs and professionals) and will take place on Thursday morning from 09:30 to 12:30  CEST. There is a maximum of 15 participants. Coffee and tea will be provided.</p>

      <h3 className="mt-3"> Radio workshop</h3>
      <p>
        This year, the radio workshop will mainly focus on head echoes produced by scattering of the radio waves on the ionized region moving in front of the incoming meteoroid.  However, any other topic related to radio observations of meteors is very welcome.  The final program will become available a few weeks before the event.
      </p>

      <p> The  workshop will take place on Thursday morning from 09:30 to 12:30 CEST. Coffee and tea will be provided.</p>
    </PageContain>
  );
};

export default Workshops;
