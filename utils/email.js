import { createTransport } from "nodemailer";
import path from "path";
import ejs from "ejs";

const sendEmail = async (
  email,
  subject,
  payload,
  template,
  option_config = {}
) => {
  let error;
  try {
    const transporter = createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });

    ejs.renderFile(template, payload, {}, (err, data) => {
      if (err) {
        error = err;
        return;
      }

      const options = () => {
        return {
          from: process.env.FROM_EMAIL,
          to: email,
          subject: subject,
          html: data,
          attachDataUrls: true,
          ...option_config,
        };
      };

      transporter.sendMail(options(), (errorOnMail, info) => {
        if (errorOnMail) {
          error = errorOnMail;
          console.log(error);
          return;
        }
        console.log("Message sent: %s", info.messageId);
      });
    });
    if (error) {
      console.log(error);
      throw new Error(error);
    }
  } catch (err) {
    error = err;
  }

  return { error };
};

export const base64ToDirect = (base) => {
  let base64 = base.split("base64,")[1];
  let hex = [...atob(base64)].map((c) =>
    c.charCodeAt(0).toString(16).padStart(2, 0)
  );
  let imgSrc = "data:image/png,%" + hex.join("%");
  return imgSrc;
};

export default sendEmail;
