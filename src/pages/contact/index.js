import PageContain from "components/page-contain";
import React, { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
 

const Contact = () => {
  const recaptchaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = recaptchaRef.current?.getValue(); 
  };

  console.log("process ", process);

  return (
    <PageContain title="Contact">

      <form onSubmit={handleSubmit}>
        {/* ...form fields... */}
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
        />
        <button type="submit">Submit</button>
      </form>
    </PageContain>
  );
};

export default Contact;
