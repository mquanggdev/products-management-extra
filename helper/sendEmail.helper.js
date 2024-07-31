const nodemailer = require('nodemailer');

module.exports.sendMail = (email , subject , html) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SEND_MAIL.EMAIL,
          pass: process.env.SEND_MAIL.PASSWORD
        }
      });
      
      const mailOptions = {
        from: process.env.SEND_MAIL.EMAIL,
        to: email,
        subject: subject,
        html: html
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
       console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}