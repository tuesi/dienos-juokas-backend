const nodemailer = require('nodemailer');
require('dotenv').config();
module.exports = {
  async sendEmail(email, joke) {

    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
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
        "<a href=\"https://www.dienosjuokas.site\"><big>dienosjuokas.site</big></a>" +
        "<br>" +
        "<br>" +
        "<br>" +
        "<a href=\"" + process.env.BACKEND_LINK + "unsubscribe?email=" + email + "\"><small>Unsubscribe</small></a>",
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log('Email sent: ' + info.response);
        resolve(true);
      });
    })
  }
}