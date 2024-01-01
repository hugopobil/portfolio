const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
require('dotenv').config();


module.exports.render = (req, res, next) => {
    res.render('contact');
};

// gmail form contact
module.exports.send = (req, res, next) => {
    const { name, email, company, position, message } = req.body;

    const createTransporter = async () => {
        const oauth2Client = new OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            "https://developers.google.com/oauthplayground"
        );
    
        oauth2Client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN
        });
    
        const accessToken = await new Promise((resolve, reject) => {
            oauth2Client.getAccessToken((err, token) => {
                if (err) {
                    reject();
                }
                resolve(token);
            });
        });
    
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.EMAIL,
                accessToken,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN
            }
        });
    
        return transporter;
    };
    
    const emailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: "Contact",
        text: `from: ${name} - ${company} - ${position} - ${email} - ${message}`,
        html: `<p>from: ${name} - ${company} - ${position} - ${email} - ${message}</p>`
    };
    
    const sendEmail = async (emailOptions) => {
        let emailTransporter = await createTransporter();
        await emailTransporter.sendMail(emailOptions);
    };

    sendEmail(emailOptions)
        .then(() => {
            res.redirect('home');
        })
        .catch((err) => next(err));
};