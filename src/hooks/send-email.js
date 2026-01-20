import axios from "axios";

const API_URL = "https://www.imo.net/members/api/imc_mailer_api/send_email";

export const sendEmail = async ({
  subject,
  message,
  to,
  toName,
  fromName,
  replyTo,
  replyName,
  bcc = [],
  token = null,
}) => {
  console.log("EMAIL ",  {
        subject,
        message,
        to,
        to_name: toName,
        from_name: fromName,
        reply_to: replyTo,
        reply_name: replyName,
        bcc,
        token,
      });
      return;


  try {
    const response = await axios.post(
      API_URL,
      {
        subject,
        message,
        to,
        to_name: toName,
        from_name: fromName,
        reply_to: replyTo,
        reply_name: replyName,
        bcc,
        token,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.data.status === "success") {
      return { success: true, message: "Email sent successfully." };
    } else {
      return { success: false, message: "Failed to send email." };
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "An error occurred while sending the email.",
    };
  }
};
