import React from "react";

const GoogleMap = () => {
  return (
    <div className="w-100 mx-auto my-3 rounded-2" style={{ maxWidth: "1200px" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.1967052196733!2d6.639749076659508!3d44.38994620446928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12cc91a30426d69f%3A0xc62b1b01e6b58d91!2sP%C3%B4le%20d&#39;accueil%20universitaire%20S%C3%A9olane!5e1!3m2!1sen!2sfr!4v1776175771409!5m2!1sen!2sfr"
        width="100%"
        height="450"
        className="rounded-2"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Barcelonette"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
