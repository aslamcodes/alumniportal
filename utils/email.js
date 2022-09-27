import { createTransport } from "nodemailer";
import path from "path";
import ejs from "ejs";

const sendEmail = async (email, subject, payload, template) => {
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
    let error;

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
        };
      };
      transporter.sendMail(options(), (errorOnMail, info) => {
        if (errorOnMail) {
          error = errorOnMail;
        }
        console.log("Message sent: %s", info.messageId);
      });
    });
    if (error) {
      throw new Error(error);
    }
  } catch (error) {
    return { error };
  }
};

export default sendEmail;
