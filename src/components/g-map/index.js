import React from "react";

const GoogleMap = () => {
  return (
    <div className="w-100 mx-auto my-3 rounded-2" style={{ maxWidth: "1200px" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50774.16652932315!2d5.250788306598889!3d52.17042682540704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c6418f36a42261%3A0x61467da7804d2d7!2sStayokay%20Hostel%20Soest!5e0!3m2!1sen!2sfr!4v1742292407025!5m2!1sen!2sfr"
        width="100%"
        height="450"
        className="rounded-2"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Stayokay Hostel Soest"
      ></iframe>
    </div>
  );
};

export default GoogleMap;