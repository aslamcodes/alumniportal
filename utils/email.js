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
    });

    ejs.renderFile(template, payload, {}, (err, data) => {
      if (err) {
        console.log(err);
        return err;
      }

      const options = () => {
        return {
          from: process.env.FROM_EMAIL,
          to: email,
          subject: subject,
          html: data,
        };
      };

      transporter.sendMail(options(), (error, info) => {
        if (error) {
          console.log(error);
          return;
        }
        console.log("Message sent: %s", info.messageId);
      });
    });
  } catch (error) {
    return error;
  }
};

/*
Example:
sendEmail(
  "youremail@gmail.com,
  "Email subject",
  { name: "Eze" },
  "./templates/layouts/main.handlebars"
);
*/

export default sendEmail;
