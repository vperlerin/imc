import React from "react";

const GoogleMap = () => {
  return (
    <div className="w-100 mx-auto my-3 rounded-2" style={{ maxWidth: "1200px" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d45629.2063176138!2d6.605128783249598!3d44.375173946212904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12cc91992a2e9357%3A0xbcf809d3270f6cbe!2s04400%20Barcelonnette!5e0!3m2!1sen!2sfr!4v1770913318724!5m2!1sen!2sfr"
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
