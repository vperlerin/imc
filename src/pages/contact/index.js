import classNames from "classnames";
import css from './index.module.scss';
import Loader from "components/loader";
import PageContain from "components/page-contain";
import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
import { sendEmail } from "hooks/send-email";
import { useForm } from "react-hook-form";
import { conferenceData as cd } from 'data/conference-data';

const AccordionItem = ({ title, children, id, isOpen, toggle }) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className={`accordion-button ${isOpen ? "" : "collapsed"}`}
          type="button"
          onClick={() => toggle(id)}
          aria-expanded={isOpen}
          aria-controls={id}
        >
          {title}
        </button>
      </h2>
      <div id={id} className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}>
        <div className="accordion-body">{children}</div>
      </div>
    </div>
  );
};

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const recaptchaRef = useRef(null);
  const [openItem, setOpenItem] = useState(null);
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
   
    const selectedRecipient = JSON.parse(data.recipient);
  
    try {
      const response = await sendEmail({
        subject: data.subject,
        message: `This message has been sent from the IMC${process.env.YEAR} contact form<br><br>
                  Name: ${data.name}<br>
                  Email: ${data.email}<br>
                  Recipient: ${selectedRecipient.name} (${selectedRecipient.email})<br>
                  Message: ${data.message}<br>`,
        to: selectedRecipient.email,  
        toName: selectedRecipient.name,
        fromName: "IMC 2025",
        replyTo: data.email,
        replyName: data.name,
        bcc: process.env.REACT_APP_BCC_ALL ? process.env.REACT_APP_BCC_ALL.split(',').map(email => ({ email, name: 'BCC Recipient' })) : [],
        token,
      });
  
      if (response.success) {
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
  

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

 

  return (
    <PageContain title="Contact">
      {responseMessage && (
        <div className={responseMessage.includes("successfully") ? "alert alert-success fw-bolder text-center" : "alert alert-danger fw-bolder text-center"}>{responseMessage}</div>
      )}

      <div className={classNames(css.form, 'position-relative d-flex flex-column flex-md-row gap-md-5 gap-3 mt-2')}>
        <div className={css.faqCol}>
          <h4 className="mb-md-4 mb-3">We'd love to hear from you! But have you checked our FAQ first?</h4>
          <div className="accordion accordion-flush mt-2 mb-4" id="customAccordion">
            <AccordionItem
              title="I didn't receive a confirmation email."
              id="item2"
              isOpen={openItem === "item2"}
              toggle={toggleItem}
            >
              <p>If you submitted the registration form less than 20 minutes ago, don't worry—the email may still be on its way. Also, check your "Spam" folder just in case.</p>
              <p className="mb-0">If you submitted your registration more than 20 minutes ago, you're in the right place—please contact us immediately.</p>
            </AccordionItem>

            <AccordionItem
              title="I'd like to add or delete a talk or poster."
              id="item1"
              isOpen={openItem === "item1"}
              toggle={toggleItem}
            >
              You should have received a password in your registration email. You can use this password to{" "}
              <Link aria-label="Login Page" to="/login">log in here</Link>.
            </AccordionItem>

            <AccordionItem
              title="How do I pay my fees?"
              id="item3"
              isOpen={openItem === "item3"}
              toggle={toggleItem}
            >
              Everything is explained here: <Link aria-label="Payment Information" to="/payment">Payment Information</Link>.
            </AccordionItem>

            <AccordionItem
              title="I lost my password."
              id="item4"
              isOpen={openItem === "item4"}
              toggle={toggleItem}
            >
              If you are registered, please go to <Link aria-label="Forgot Password" to="/forgot-password">Forgot Password</Link>, enter the email you used during registration, and follow the instructions.
            </AccordionItem>

            <AccordionItem
              title="Can I bring my partner or children?"
              id="item5"
              isOpen={openItem === "item5"}
              toggle={toggleItem}
            >
              Yes. A passion for meteors knows no age, gender, or boundaries. However, you may need to contact the LOC to arrange accommodation details.
            </AccordionItem>

            <AccordionItem
              title="What do SOC & LOC mean?"
              id="item6"
              isOpen={openItem === "item6"}
              toggle={toggleItem}
            >
              SOC stands for Scientific Organizing Committee, and LOC stands for Local Organizing Committee.
            </AccordionItem>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={classNames(css.form, 'position-relative flex-grow-1')}>
          <h4 className="mb-md-4 mb-3">Contact</h4>
          {loading && <Loader />}

          <div className="mb-3">
            <label htmlFor="recipient" className="form-label">You have…</label>
            <select
              className="form-control"
              id="recipient"
              {...register("recipient", { required: "Please select a recipient" })}
            >
              <option value="">-- … --</option>
              {cd.contact.map((contact, index) => (
                <option key={index} value={JSON.stringify(contact)}>
                  {contact.q} 
                </option>
              ))}
            </select>
            {errors.recipient && <p className="text-danger">{errors.recipient.message}</p>}
          </div>


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

          <button type="submit" className="btn fw-bolder btn-outline-primary fw-bolder" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </PageContain>
  );
};

export default Contact;
