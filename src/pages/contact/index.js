import classNames from "classnames";
import css from './index.module.scss';
import Loader from "components/loader";
import PageContain from "components/page-contain";
import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import axios from "axios";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const recaptchaRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  console.log("process.env.REACT_APP_CONTACT_EMAI ", process.env.REACT_APP_CONTACT_EMAIL);
  console.log("process.env.REACT_APP_RECAPTCHA_SITE_KEY? ", process.env.REACT_APP_RECAPTCHA_SITE_KEY);
 
  const onSubmit = async (data) => {
    const token = recaptchaRef.current?.getValue();
    if (!token) {
      alert("Please complete the reCAPTCHA verification.");
      return;
    }

    setLoading(true);
    setResponseMessage("");
    try {
      const response = await axios.post("https://www.imo.net/members/api/imc_mailer_api/send_email", {
        subject: data.subject,
        message: `This message has been sent from the IMC2025 contact form<br><br>
                  Name: ${data.name}<br>
                  Email: ${data.email}<br>
                  Message: ${data.message}<br>` ,
        to: process.env.REACT_APP_CONTACT_EMAIL,
        to_name: process.env.REACT_APP_CONTACT_NAME,
        from_name: "IMC 2025",
        reply_to: data.email,
        reply_name: data.name,
        bcc: process.env.REACT_APP_BCC_ALL ? process.env.REACT_APP_BCC_ALL.split(',').map(email => ({ email, name: 'BCC Recipient' })) : [],
        token,
      });

      if (response.data.status === "success") {
        setResponseMessage("Your message has been sent successfully. We will get back to you ASAP.");
        reset();
        recaptchaRef.current.reset();
      } else {
        setResponseMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      setResponseMessage("An error occurred while sending your message. Please, try again later.");
    }

    setLoading(false);
  };

  return (
    <PageContain title="Contact">
      {responseMessage && (
        <div className={responseMessage.includes("successfully") ? "alert alert-success fw-bolder text-center" : "alert alert-danger fw-bolder text-center"}>{responseMessage}</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className={classNames(css.form, 'mx-auto w-100 position-relative')}>
        {loading && <Loader/>}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Your name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Enter a valid email" }
            })}
          />
          {errors.email && <p className="text-danger">{errors.email.message}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="subject" className="form-label">Subject</label>
          <input
            type="text"
            className="form-control"
            id="subject"
            placeholder="Subject"
            {...register("subject", { required: "Subject is required" })}
          />
          {errors.subject && <p className="text-danger">{errors.subject.message}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="message" className="form-label">Your message</label>
          <textarea
            className="form-control"
            id="message"
            placeholder="Your message"
            style={{ minHeight: '7rem' }}
            {...register("message", { required: "Message is required" })}
          />
          {errors.message && <p className="text-danger">{errors.message.message}</p>}
        </div>

        <div className="my-3">
          <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} theme="dark" />
        </div>

        <button type="submit" className="btn fw-bolder btn-primary" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </PageContain>
  );
};

export default Contact;
