import classNames from "classnames";
import css from './index.module.scss';
import PageContain from "components/page-contain";
import React, { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
 

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const recaptchaRef = useRef(null);

  const onSubmit = (data) => {
    const token = recaptchaRef.current?.getValue();
    if (!token) {
      alert("Please complete the reCAPTCHA verification.");
      return;
    }

    console.log({ ...data, token });
  };

  return (
    <PageContain title="Contact">
      <form onSubmit={handleSubmit(onSubmit)} className={classNames(css.form, 'mx-auto')}>
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

        <button type="submit" className="btn fw-bolder btn-primary">Submit</button>
      </form>
    </PageContain>
  );
};

export default Contact;