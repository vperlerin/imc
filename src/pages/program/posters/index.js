import PageContain from "components/page-contain";
import React from "react";
import { postersData as participants, demosData as demos } from "data/posters";
import { conferenceData as cf } from "data/conference-data";


const Posters = () => {
  return (
    <PageContain title="Posters & Demos">
      <p className="fw-bolder"> Friendly reminder: the maximum poster dimensions at the conference venue are {cf.poster_dim}.</p>

      {participants.length > 0 ? (
        <>
          <h3>Posters </h3>
          <ol className="mt-3">
            {participants.map((poster, index) => (
              <li key={index}>
                <h5 className="mb-1">{poster.title}</h5>
                <p>By: {poster.authors}</p>
              </li>
            ))}
          </ol>
        </>
      ) : (
        <p>No posters available.</p>
      )}

      {demos.length > 0 ? (
        <>
          <h3>Demos </h3>
          <ol className="mt-3">
            {demos.map((demo, index) => (
              <li key={index}>
                <h5 className="mb-1">{demo.title}</h5>
                <p>By: {demo.authors}</p>
              </li>
            ))}
          </ol>
        </>
      ) : (
        <p>No demos available.</p>
      )}
    </PageContain>
  );
};

export default Posters;
