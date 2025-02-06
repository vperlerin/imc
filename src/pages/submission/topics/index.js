import PageContain from "components/page-contain";
import React from "react";

const Topics = () => {
  return (
    <PageContain title="Topics">
      <p className="fw-bolder">
        Topics must relate to meteor astronomy and include - but are not restricted to - the following:
      </p>
      <div>

      <h5>A - Meteor showers & sporadic background</h5>
      <ul>
        <li>Results from visual, video, radio observations</li>
        <li>Distribution, activity of showers and background</li>
        <li>Analysis reports, results</li>
        <li>Discoveries of new showers</li>
      </ul>

      <h5>B - Fireballs, meteorite recovery</h5>
      <ul>
        <li>Exceptional fireball reports</li>
        <li>Collecting observations from the public</li>
        <li>Camera networks</li>
        <li>Analysis reports, results</li>
        <li>Meteorite recoveries, search activities</li>
        <li>Meteorite studies</li>
      </ul>

      <h5>C - Parent bodies, meteoroids, meteorites, planets and their relation</h5>
      <ul>
        <li>Relation between parent bodies, meteoroids and meteorites</li>
        <li>Parent body dynamics & fragmentation</li>
        <li>Parent body observations</li>
      </ul>

      <h5>D - Numeric modeling</h5>
      <ul>
        <li>Predictions of future meteor showers</li>
        <li>Algorithms, models, methods</li>
        <li>Testing of theoretical models</li>
        <li>Etc.</li>
      </ul>

      <h5>E - Atmospheric processes and phenomena</h5>
      <ul>
        <li>Ablation processes</li>
        <li>Deceleration of meteors</li>
        <li>Dark flights</li>
        <li>Ionization of meteor trails</li>
        <li>Meteors in atmospheres of other planets</li>
      </ul>

      <h5>F - Observing techniques</h5>
      <ul>
        <li>Visual</li>
        <li>Video</li>
        <li>Photographic</li>
        <li>Spectroscopic</li>
        <li>Telescopic</li>
        <li>Radio</li>
        <li>Seismic</li>
        <li>Lunar</li>
        <li>Observing from space</li>
        <li>Very low frequency radio observation</li>
      </ul>

      <h5>G - Instruments, data pipelines, software</h5>
      <ul>
        <li>Camera systems</li>
        <li>Lenses</li>
        <li>Spectroscopes</li>
        <li>Radio antennas, receivers</li>
        <li>(Automatic) reduction software</li>
        <li>(Image) acquisition software</li>
        <li>Orbit calculation algorithms</li>
        <li>Control electronics</li>
      </ul>

      <h5>H - Observing campaigns</h5>
      <ul>
        <li>Citizen science & outreach</li>
        <li>Reports</li>
        <li>Anecdotes</li>
        <li>Future plans</li>
        <li>Ideas</li>
      </ul>
      </div>
    </PageContain>
  );
};

export default Topics;
