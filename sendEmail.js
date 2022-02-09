const nodemailer = require('nodemailer');
module.exports = {
    sendEmail (email, joke) {

        var transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com',
            port: '465',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        });
    
        var mailOptions = {
            from: 'gyvunuerotika@thehorsehat.com',
            to: email,
            subject: 'Dienos Juokas',
            text: 'Dienos Juokas!',
            html: "<h1>Šiandienos juokas</h1>" +
            "<p>"+ joke + "</p>" +
            "<a href=\"https://gyvunuerotika.herokuapp.com/unsubscribe?email="+email+"\"><small>Unsubscribe</small></a>",
        };
    
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
}