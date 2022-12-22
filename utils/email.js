import { createTransport } from "nodemailer";
import path from "path";
import ejs from "ejs";
import { __dirname } from "../index.js";

const sendEmail = async (email, subject, payload, template, _options = {}) => {
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
          ..._options,
        };
      };

      transporter.sendMail(options(), (errorOnMail, info) => {
        console.log("Email Request");

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

export default sendEmail;
