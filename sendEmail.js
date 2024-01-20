const nodemailer = require('nodemailer');
require('dotenv').config();
module.exports = {
  sendEmail(email, joke) {

    var transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: '465',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
      }
    });

    var mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Dienos Juokas',
      text: 'Dienos Juokas!',
      html: "<h1>Šiandienos juokas</h1>" +
        "<p>" + joke + "</p>" +
        "<span>" + "Dienos juokas kiekvieną dieną!" + "</span>" +
        "<br>" +
        "<a href=\"https://www.dienosjuokas.online\"><big>dienosjuokas.online</big></a>" +
        "<br>" +
        "<br>" +
        "<br>" +
        "<a href=\"" + process.env.BACKEND_LINK + "unsubscribe?email=" + email + "\"><small>Unsubscribe</small></a>",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}