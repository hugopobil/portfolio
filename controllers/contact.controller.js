require('dotenv').config();

module.exports.render = (req, res, next) => {
    res.render('contact');
};

// gmail form contact
module.exports.send = (req, res, next) => {

    const { name, email, company, position, message } = req.body;
    
    const {
        transporter,
        createEmailTemplate,
      } = require('../config/nodemailer.config');
      
      transporter.sendMail(
        {
          from: process.env.NODEMAILER_EMAIL,
          to: process.env.NODEMAILER_EMAIL,
          subject: 'Portfolio - Validation email',
          html: createEmailTemplate(email, name, company, position, message),
        },
        function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
          res.redirect('/');
        })    
};