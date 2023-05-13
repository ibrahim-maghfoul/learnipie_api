const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  let transporter = nodemailer.createTransport({
    // host: process.env.SMTP_HOST,
    // port: process.env.SMTP_PORT,
    service: 'gmail',
    auth: {
      user: process.env.SMTP_SENDER_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const message = {
    from: `${options.name} <${process.env.SMTP_SENDER_EMAIL}>`,
    to:process.env.SMTP_RECIEVER_EMAIL,
    subject: options.subject,
    text: options.message,
  };
console.log(message);
  transporter.sendMail(message, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
};

module.exports = sendEmail;
