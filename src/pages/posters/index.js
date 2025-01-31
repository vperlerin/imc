import PageContain from "components/page-contain";
import React from "react";
import { postersData as participants } from "data/posters";

const Posters = () => {
  return (
    <PageContain title="Posters">
      {participants.length > 0 ? (
        <ol className="mt-3">
          {participants.map((poster, index) => (
            <li key={index}>
              <h5 className="mb-1">{poster.title}</h5>
              <p>By: {poster.authors}</p>
            </li>
          ))}
        </ol>
      ) : (
        <p>No posters available.</p>
      )}
    </PageContain>
  );
};

export default Posters;
