import classNames from "classnames";
import css from './index.module.scss';
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
 
  const onSubmit = async (data) => {
    const token = recaptchaRef.current?.getValue();
    if (!token) {
      alert("Please complete the reCAPTCHA verification.");
      return;
    }

    setLoading(true);
    setResponseMessage("");
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/contact.php`, {
        ...data,
        token,
      });

      if (response.data.success) {
        setResponseMessage("Your message has been sent successfully!");
        reset();
        recaptchaRef.current.reset();
      } else {
        setResponseMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error sending contact form:", error);
      setResponseMessage("An error occurred while sending your message.");
    }

    setLoading(false);
  };

  return (
    <PageContain title="Contact">

      {responseMessage && (
        <p className={responseMessage.includes("successfully") ? "text-success fw-bolder text-center" : "text-danger fw-bolder text-center"}>{responseMessage}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className={classNames(css.form, 'mx-auto w-100')}>
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
